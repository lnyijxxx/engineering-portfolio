import { Check, CircuitBoard, Code2, Cpu, Gauge, PlugZap, RadioTower, Usb, Wrench } from "lucide-react";

const stages = [
  ["Project planning", "Complete", "Defined the learning goals, robotics use cases, and development workflow."],
  ["System requirements", "Complete", "Established power, programming, communication, expansion, and mechanical requirements."],
  ["Component selection", "In progress", "Evaluating parts for performance, availability, cost, and manufacturability."],
  ["Schematic design", "In progress", "Developing the MCU, power, boot, programming, and expansion circuits."],
  ["PCB layout + review", "Planned", "Route the two-layer board, run design checks, and inspect the 3D assembly."],
  ["Fabrication + assembly", "Planned", "Generate manufacturing files, order boards, solder parts, and inspect assembly."],
  ["Bring-up + firmware", "Planned", "Verify rails and SWD before testing GPIO, PWM, UART, I²C, and SPI."],
  ["Hardware validation", "Planned", "Document measurements and confirm readiness for robotics experiments."],
];
const interfaces = ["PWM / servo", "UART", "I²C", "SPI", "GPIO", "Sensor expansion"];

export function STM32BoardCaseStudy() {
  return <div className="quad-case stm32-case">
    <section className="quad-hero stm32-hero"><div className="quad-wrap">
      <p className="quad-status"><i/> In development · July 2026 — present</p>
      <div className="quad-hero-grid">
        <div className="quad-rise"><p className="quad-kicker">Embedded hardware / PCB development</p><h1>STM32 robotics development board.</h1><p className="quad-lede">A custom STM32F411 controller designed for sensors, actuators, companion computers, and future real-time robotics experiments.</p><a href="#board-architecture">View board architecture ↓</a></div>
        <div className="relative min-h-[460px] overflow-hidden border border-white/15 bg-[#0c1715] p-8 md:p-12 quad-rise" aria-label="Conceptual STM32 board architecture">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#66d9a333_1px,transparent_1px),linear-gradient(90deg,#66d9a333_1px,transparent_1px)] [background-size:28px_28px]"/>
          <div className="relative h-full min-h-[360px] rounded-[24px] border-2 border-[#6bcda1]/40 bg-[#123d31] shadow-[0_30px_80px_#0008]">
            {[["left-5 top-5"],["right-5 top-5"],["bottom-5 left-5"],["bottom-5 right-5"]].map(([p])=><span key={p} className={`absolute ${p} size-4 rounded-full border-2 border-[#8fb8a8] bg-[#09140f]`}/>)}
            <div className="absolute left-1/2 top-1/2 grid h-32 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center border border-[#8be5bc] bg-[#14231f]"><div className="text-center"><Cpu className="mx-auto mb-2 text-[#70dda9]"/><strong className="block font-display text-lg">STM32F411</strong><small className="font-mono text-[9px] text-[#7ca693]">MAIN CONTROLLER</small></div></div>
            <div className="absolute left-5 top-1/2 -translate-y-1/2 border border-[#5b9d80] bg-[#10271f] px-4 py-3 text-center"><Usb className="mx-auto text-[#70dda9]" size={18}/><small className="font-mono text-[9px]">USB-C</small></div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 border border-[#5b9d80] bg-[#10271f] px-4 py-3 text-center"><PlugZap className="mx-auto text-[#70dda9]" size={18}/><small className="font-mono text-[9px]">3V3</small></div>
            <div className="absolute left-1/2 top-7 -translate-x-1/2 border border-[#5b9d80] bg-[#10271f] px-5 py-2 font-mono text-[9px]">SWD DEBUG</div>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-wider text-[#8fc2a9]">CONCEPT / ARCHITECTURE</span>
          </div>
        </div>
      </div>
      <dl className="quad-metrics"><div><dt>STM32F411</dt><dd>Microcontroller</dd></div><div><dt>2</dt><dd>PCB layers</dd></div><div><dt>3.3 V</dt><dd>Logic rail</dd></div><div><dt>SWD</dt><dd>Debug interface</dd></div></dl>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>01 / Project scope</p><h2>Complete embedded hardware workflow.</h2></header><div className="quad-copy"><p>The project follows a custom controller from requirements and schematic capture through PCB layout, manufacturing, assembly, firmware bring-up, and electrical validation.</p><p>The board is currently in the requirements, component-selection, and schematic phase. Physical hardware does not exist yet, so manufacturing and validation results are intentionally not shown.</p><aside><strong>Current boundary</strong><span>Planning and requirements complete · component selection and schematic design in progress</span><small>Layout, fabrication, assembly, firmware, and validation are planned.</small></aside></div></div></section>

    <section id="board-architecture" className="quad-section quad-dark"><div className="quad-wrap"><header className="quad-heading"><div><p>02 / Planned architecture</p><h2>Core control, power, and robotics interfaces.</h2></div><span>The design is organized around a small set of testable subsystems.</span></header><div className="quad-specs">
      <article><Cpu/><small>Controller</small><h3>STM32F411</h3><p>Embedded firmware, timing, communication, and real-time control.</p></article><article><PlugZap/><small>Power</small><h3>USB-C → 3.3 V</h3><p>Input, regulation, decoupling, and indicator circuitry.</p></article><article><Wrench/><small>Programming</small><h3>SWD + boot control</h3><p>Programming, debugging, reset, and structured bring-up.</p></article><article><RadioTower/><small>Expansion</small><h3>Robotics I/O</h3><p>PWM, UART, I²C, SPI, GPIO, and sensor connections.</p></article>
    </div><div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px border border-white/10 bg-white/10">{interfaces.map(x=><div key={x} className="bg-[#101923] px-4 py-5 text-center font-mono text-[10px] uppercase tracking-[.08em] text-[#b1c7bc]">{x}</div>)}</div></div></section>

    <section className="quad-section quad-light"><div className="quad-wrap"><header className="quad-heading"><div><p>03 / Development timeline</p><h2>Current engineering status.</h2></div><span>Only demonstrated work is marked complete.</span></header><div className="quad-timeline">{stages.map(([title,status,text],i)=><article key={title}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{title}</h3><p>{text}</p></div><span className={status === "Complete" ? "done" : ""}>{status === "Complete" && <Check size={12}/>} {status}</span></article>)}</div></div></section>

    <section className="quad-section bg-[#172820]"><div className="quad-wrap quad-split"><header><p className="text-[#72d9a8]">04 / Validation plan</p><h2>Bring-up in controlled stages.</h2></header><div className="grid gap-3">
      {[[Gauge,"Power verification","Check USB-C input, measure the 3.3 V output, and confirm stable rails."],[Code2,"Programming and debug","Establish SWD communication, flash minimal firmware, and verify debugging."],[CircuitBoard,"Peripheral testing","Test LED, button, GPIO, PWM, UART, I²C, and SPI independently."]].map(([Icon,title,text])=>{const I=Icon as typeof Gauge;return <article key={String(title)} className="grid grid-cols-[44px_1fr] gap-4 border border-white/15 bg-black/10 p-5"><I className="text-[#72d9a8]"/><div><h3 className="font-display text-lg font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-relaxed text-[#a8bbb2]">{String(text)}</p></div></article>})}
    </div></div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>05 / Skills and applications</p><h2>Embedded hardware for future robotics work.</h2></header><div><div className="quad-skills">{["KiCad","STM32","Schematic capture","PCB layout","Component selection","Power design","SWD debugging","Hardware bring-up","Soldering","Embedded firmware"].map(x=><span key={x}>{x}</span>)}</div><div className="quad-next"><small>Intended applications</small><h3>Reusable robotics controller.</h3><p>Mobile robots, sensor integration, servo control, companion-computer communication, and real-time firmware experiments.</p></div></div></div></section>
  </div>;
}
