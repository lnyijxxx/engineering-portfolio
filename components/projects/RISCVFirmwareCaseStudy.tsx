import { Binary, Check, CircuitBoard, Cpu, Gauge, GitBranch, MemoryStick, RadioTower, TerminalSquare, Workflow } from "lucide-react";
import fs from "node:fs";
import path from "node:path";

const stages = [
  ["Register map", "Complete", "Defined memory-mapped GPIO and PLIC control addresses for the target platform."],
  ["GPIO configuration", "Complete", "Configured the S1 button as input and the eight-segment LED bar as output."],
  ["Machine interrupts", "Complete", "Set mtvec, enabled external machine interrupts, and enabled global MIE."],
  ["PLIC routing", "Complete", "Enabled source ID 20, assigned priority 7, and configured threshold 6."],
  ["Interrupt service routine", "Complete", "Implemented claim, register preservation, countdown output, completion, and mret."],
  ["Hardware validation", "Complete", "Successfully tested button-triggered interrupt behavior and LED countdown on the board."],
];

const codeLines = [
  "la   t0, S1_interrupt",
  "csrw mtvec, t0",
  "csrs mie, t0",
  "csrw mstatus, t0",
  "lw   t2, 0(t1)    # PLIC claim",
  "sw   t2, 0(t1)    # PLIC complete",
  "mret",
];

const fullSource = fs.readFileSync(
  path.join(process.cwd(), "public", "projects", "riscv-interrupt-firmware", "full-source.txt"),
  "utf8",
);

export function RISCVFirmwareCaseStudy() {
  return <div className="quad-case riscv-case">
    <section className="quad-hero riscv-hero"><div className="quad-wrap">
      <p className="quad-status"><i/> Hardware validated · March 2026</p>
      <div className="quad-hero-grid">
        <div className="quad-rise"><p className="quad-kicker">Bare-metal firmware / RISC-V assembly</p><h1>Interrupt-driven RISC-V firmware.</h1><p className="quad-lede">Register-level assembly for machine-mode interrupts, PLIC routing, memory-mapped GPIO, and deterministic LED control on the SparkFun RED-V Thing Plus.</p><a href="#riscv-architecture">Trace the interrupt path ↓</a></div>
        <div className="riscv-terminal quad-rise" aria-label="Animated RISC-V assembly terminal">
          <div className="riscv-terminal-bar"><span/><span/><span/><b>interrupt.s — rv32imac</b></div>
          <div className="riscv-code-stream">{[...codeLines,...codeLines].map((line,i)=><code key={`${line}-${i}`}><span>{String((i%codeLines.length)+1).padStart(2,"0")}</span>{line}</code>)}</div>
          <div className="riscv-registers"><div><small>mtvec</small><strong>ISR_ADDR</strong></div><div><small>mie[11]</small><strong>1</strong></div><div><small>mstatus[3]</small><strong>1</strong></div><div><small>PLIC ID</small><strong>20</strong></div></div>
        </div>
      </div>
      <dl className="quad-metrics"><div><dt>RV32</dt><dd>Instruction set</dd></div><div><dt>PLIC</dt><dd>Interrupt controller</dd></div><div><dt>8</dt><dd>LED outputs</dd></div><div><dt>ASM</dt><dd>Implementation</dd></div></dl>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>01 / Project overview</p><h2>Bare-metal control without an operating system.</h2></header><div className="quad-copy"><p>The firmware configures a complete external-interrupt path directly in RISC-V assembly. A falling edge from the S1 GPIO enters the Platform-Level Interrupt Controller, traps into machine mode, and runs an interrupt service routine that produces a pseudo-random LED-bar countdown.</p><p>The implementation was developed in PlatformIO with the Freedom E SDK and successfully tested on a SparkFun RED-V Thing Plus.</p><aside><strong>My scope</strong><span>Register mapping · CSR configuration · PLIC setup · GPIO control · ISR implementation · hardware testing</span><small>No operating system, HAL, or high-level interrupt framework was used for the core logic.</small></aside></div></div></section>

    <section id="riscv-architecture" className="quad-section quad-dark"><div className="quad-wrap"><header className="quad-heading"><div><p>02 / Interactive system architecture</p><h2>From button edge to machine-mode handler.</h2></div><span>Open each processor block to inspect its responsibility.</span></header>
      <div className="riscv-flow"><div><small>01 / GPIO 12</small><strong>S1 falling edge</strong><span>0x10012020</span></div><i>→</i><div><small>02 / PLIC</small><strong>Source ID 20</strong><span>priority 7 · threshold 6</span></div><i>→</i><div><small>03 / CPU</small><strong>Machine trap</strong><span>mtvec → ISR</span></div><i>→</i><div><small>04 / ISR</small><strong>Claim + execute</strong><span>save · handle · restore</span></div><i>→</i><div><small>05 / Return</small><strong>Complete + mret</strong><span>resume main loop</span></div></div>
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[[Cpu,"CSR control","mtvec stores the handler address; mie enables machine external interrupts; mstatus enables interrupts globally."],[RadioTower,"PLIC routing","The source enable register, priority register, threshold, and claim/complete interface route GPIO source 20."],[MemoryStick,"Memory-mapped I/O","GPIO input, output, edge-enable, and pending registers are accessed through fixed physical addresses."],[Workflow,"ISR discipline","Temporary and saved registers are pushed to the stack, restored in reverse order, and execution returns with mret."]].map(([Icon,title,text])=>{const I=Icon as typeof Cpu;return <details key={String(title)} className="group border border-white/15 bg-[#111417] p-5 open:border-[#ff9d3d]/50"><summary className="cursor-pointer list-none"><I className="mb-8 text-[#ff9d3d]"/><small className="font-mono text-[9px] uppercase tracking-[.1em] text-[#8e8277]">Select to inspect</small><h3 className="mt-2 font-display text-xl font-semibold">{String(title)}</h3></summary><p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-[#a89e94]">{String(text)}</p></details>})}
      </div>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap"><header className="quad-heading"><div><p>03 / Firmware execution</p><h2>Interrupt handling sequence.</h2></div><span>The handler acknowledges the source before modifying shared hardware state.</span></header><div className="quad-timeline">{[["Main loop","Flash the LED bar at 10 Hz while waiting for an external event."],["Trap entry","The processor uses mtvec to branch to S1_interrupt in machine mode."],["Context save","Allocate 32 bytes and save the working registers used by the handler."],["PLIC claim","Read the claim register to acknowledge and identify the interrupt source."],["Countdown","Scale the LFSR value, map it across non-contiguous LED GPIO bits, and decrement it."],["Completion","Clear the GPIO pending flag, write the claimed ID back to PLIC, restore context, and execute mret."]].map(([title,text],i)=><article key={title}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{title}</h3><p>{text}</p></div><span>{i===0?"Continuous":"Interrupt path"}</span></article>)}</div></div></section>

    <section className="quad-section riscv-memory"><div className="quad-wrap quad-split"><header><p>04 / Memory map</p><h2>Hardware controlled through physical addresses.</h2></header><div className="riscv-memory-map">
      {[['0x10012000','GPIO input value'],['0x10012004','GPIO input enable'],['0x10012008','GPIO output enable'],['0x1001200C','GPIO output value'],['0x10012020','Falling-edge enable'],['0x10012024','Falling-edge pending'],['0x0C002000','PLIC source enable'],['0x0C200004','PLIC claim / complete']].map(([addr,label],i)=><div key={addr} style={{'--memory-width':`${96-i*6}%`} as React.CSSProperties}><code>{addr}</code><span>{label}</span></div>)}
    </div></div></section>

    <section className="quad-section quad-light"><div className="quad-wrap"><header className="quad-heading"><div><p>05 / Development timeline</p><h2>Implementation and validation.</h2></div><span>All listed stages were completed and tested on the target board.</span></header><div className="quad-timeline">{stages.map(([title,status,text],i)=><article key={title}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{title}</h3><p>{text}</p></div><span className="done"><Check size={12}/> {status}</span></article>)}</div></div></section>

    <section className="quad-section bg-[#18120d]"><div className="quad-wrap quad-split"><header><p className="text-[#ff9d3d]">06 / Engineering challenges</p><h2>Correctness across hardware and processor state.</h2></header><div className="grid gap-3">{[[GitBranch,"Non-contiguous GPIO mapping","The countdown value is split, shifted, and recombined to match LED pins located in different register bit ranges."],[Gauge,"Interrupt ordering","GPIO edge detection, PLIC enable, priority, threshold, CSR enables, claim, and completion must all agree."],[Binary,"Register preservation","The ISR must preserve every register it modifies so the interrupted main loop resumes correctly."],[TerminalSquare,"Timing without an OS","Software delay loops provide visible timing without a scheduler, timer driver, or runtime service."]].map(([Icon,title,text])=>{const I=Icon as typeof Cpu;return <article key={String(title)} className="grid grid-cols-[42px_1fr] gap-4 border border-[#ff9d3d]/20 bg-black/10 p-5"><I className="text-[#ff9d3d]"/><div><h3 className="font-display text-lg font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-relaxed text-[#baaa9b]">{String(text)}</p></div></article>})}</div></div></section>

    <section className="quad-section bg-[#0e0c0a]"><div className="quad-wrap"><header className="quad-heading"><div><p className="text-[#ff9d3d]">07 / Complete source</p><h2>Read the full assembly program.</h2></div><span className="text-[#9b8d80]">The complete source is preserved exactly as provided, including comments and register definitions.</span></header>
      <details className="group overflow-hidden border border-[#ff9d3d]/30 bg-[#090807]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 md:p-7 font-mono text-[12px] text-[#ffad5c] hover:bg-[#ff9d3d]/5"><span>interrupt.s · full source · 11.3 KB</span><span className="rounded-sm border border-[#ff9d3d]/40 px-3 py-1.5 text-[10px] uppercase tracking-wider group-open:hidden">Open viewer</span><span className="hidden rounded-sm border border-[#ff9d3d]/40 px-3 py-1.5 text-[10px] uppercase tracking-wider group-open:inline">Close viewer</span></summary>
        <div className="border-t border-[#ff9d3d]/20 p-3 md:p-5"><pre className="h-[70vh] min-h-[520px] overflow-auto whitespace-pre p-5 font-mono text-[12px] leading-relaxed text-[#e8a25c] border border-[#ff9d3d]/15 bg-[#0b0a09]"><code>{fullSource}</code></pre><div className="mt-4 flex flex-wrap gap-3"><a href="/projects/riscv-interrupt-firmware/full-source.txt" target="_blank" rel="noreferrer" className="inline-flex bg-[#ff9d3d] px-4 py-2.5 font-mono text-[11px] font-semibold text-[#160d06] transition-colors hover:bg-[#ffb566]">Open raw source in new tab ↗</a><a href="/projects/riscv-interrupt-firmware/full-source.txt" download="interrupt.s" className="inline-flex border border-[#ff9d3d]/40 px-4 py-2.5 font-mono text-[11px] text-[#ffad5c] transition-colors hover:bg-[#ff9d3d]/10">Download interrupt.s</a></div></div>
      </details>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>08 / Skills and outcomes</p><h2>Processor architecture made tangible.</h2></header><div><div className="quad-skills">{["RISC-V assembly","Bare-metal firmware","Freedom E SDK","PlatformIO","PLIC","Machine CSRs","Memory-mapped I/O","GPIO interrupts","ISR design","Stack management","Hardware debugging"].map(x=><span key={x}>{x}</span>)}</div><div className="quad-next"><small>Key learning outcome</small><h3>Interrupts are a complete hardware-to-software path.</h3><p>The project connected GPIO edge detection, interrupt-controller routing, processor CSR state, stack discipline, peripheral output, and trap return into one working system.</p></div></div></div></section>
  </div>;
}
