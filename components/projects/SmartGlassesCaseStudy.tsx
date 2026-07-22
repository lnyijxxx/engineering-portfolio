import { BatteryCharging, Check, Cpu, Eye, Layers3, Mic2, Radio, Route, Wrench } from "lucide-react";
import Image from "next/image";

const stages = [
  ["System architecture", "Complete", "Defined processing, audio, display, wireless, and power subsystems."],
  ["Component selection", "Complete", "Selected the ESP32-S3, OLED, INMP441 microphone, communication hardware, and regulator."],
  ["Schematic design", "Complete", "Integrated the MCU, peripherals, interface buses, and power circuitry."],
  ["PCB layout", "Complete", "Routed the compact board in KiCad with wearable size constraints in mind."],
  ["Manufacturing preparation", "Complete", "Prepared the completed PCB design for fabrication outputs and review."],
  ["PCB fabrication", "Not completed", "Physical board manufacturing is outside the completed project scope."],
  ["Assembly + bring-up", "Not completed", "Soldering, firmware bring-up, and electrical validation have not been claimed."],
];

export function SmartGlassesCaseStudy() {
  return <div className="quad-case glasses-case">
    <section className="quad-hero glasses-hero"><div className="quad-wrap">
      <p className="quad-status"><i/> PCB design completed · Sep — Nov 2025</p>
      <div className="quad-hero-grid">
        <div className="quad-rise"><p className="quad-kicker">Wearable electronics / embedded hardware</p><h1>AI-ready smart safety glasses electronics.</h1><p className="quad-lede">A compact ESP32-S3 system integrating display, audio capture, wireless communication, and battery-powered operation for future wearable tools.</p><a href="#glasses-architecture">View system architecture ↓</a></div>
        <div className="relative min-h-[460px] overflow-hidden border border-white/15 bg-[#0b1119] p-7 md:p-12 quad-rise" aria-label="Conceptual smart glasses electronics architecture">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#7dc8ff22_1px,transparent_1px),linear-gradient(90deg,#7dc8ff22_1px,transparent_1px)] [background-size:32px_32px]"/>
          <div className="relative mx-auto mt-12 flex max-w-[520px] items-center justify-center gap-5"><div className="h-36 flex-1 rounded-[55%_45%_42%_58%] border-2 border-[#69b9ef]/50 bg-[#112b40]"/><div className="h-2 w-12 bg-[#69b9ef]/50"/><div className="h-36 flex-1 rounded-[45%_55%_58%_42%] border-2 border-[#69b9ef]/50 bg-[#112b40]"/></div>
          <div className="relative mx-auto -mt-20 grid w-[74%] grid-cols-3 gap-3 rounded-md border border-[#70bdf0]/50 bg-[#0c1b27]/95 p-4 shadow-[0_20px_70px_#000b]">
            <div className="col-span-2 grid place-items-center border border-[#6cb9ea]/30 bg-[#122b3e] p-6 text-center"><Cpu className="mb-2 text-[#74c8ff]"/><strong className="font-display">ESP32-S3-WROOM-1</strong><small className="font-mono text-[8px] text-[#7d9db4]">PROCESSING + WIRELESS</small></div>
            <div className="grid place-items-center border border-[#6cb9ea]/30 bg-[#122b3e] p-3 text-center"><Eye className="text-[#74c8ff]" size={20}/><small className="font-mono text-[8px]">OLED / I²C</small></div>
            <div className="grid place-items-center border border-[#6cb9ea]/30 bg-[#122b3e] p-3 text-center"><Mic2 className="text-[#74c8ff]" size={20}/><small className="font-mono text-[8px]">MIC / I²S</small></div>
            <div className="grid place-items-center border border-[#6cb9ea]/30 bg-[#122b3e] p-3 text-center"><Radio className="text-[#74c8ff]" size={20}/><small className="font-mono text-[8px]">BT / UART</small></div>
            <div className="grid place-items-center border border-[#6cb9ea]/30 bg-[#122b3e] p-3 text-center"><BatteryCharging className="text-[#74c8ff]" size={20}/><small className="font-mono text-[8px]">3.3 V POWER</small></div>
          </div>
          <span className="absolute bottom-5 left-7 font-mono text-[8px] tracking-[.15em] text-[#7598af]">CONCEPTUAL ELECTRONICS MAP</span>
        </div>
      </div>
      <dl className="quad-metrics"><div><dt>ESP32-S3</dt><dd>Microcontroller</dd></div><div><dt>3</dt><dd>Digital interfaces</dd></div><div><dt>3.3 V</dt><dd>Power rail</dd></div><div><dt>KiCad</dt><dd>PCB workflow</dd></div></dl>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>01 / Project scope</p><h2>Electronics for a wearable safety device.</h2></header><div className="quad-copy"><p>The board was designed as an electronics foundation for smart safety glasses intended for electricians and field technicians. It combines local processing, visual feedback, audio capture, wireless communication, and battery-powered operation in a compact PCB design.</p><p>The completed scope covers architecture, component selection, schematic design, PCB routing, and manufacturing preparation. It does not claim fabricated hardware, firmware, AI functionality, or physical wearable validation.</p><aside><strong>Completed boundary</strong><span>System design · component integration · schematic · PCB layout · manufacturing preparation</span><small>Fabrication, assembly, bring-up, firmware, and device-level validation are not presented as completed.</small></aside></div></div></section>

    <section id="glasses-architecture" className="quad-section quad-dark"><div className="quad-wrap"><header className="quad-heading"><div><p>02 / System architecture</p><h2>Four subsystems around the ESP32-S3.</h2></div><span>Each peripheral uses a dedicated embedded communication interface.</span></header><div className="quad-specs">
      <article><Cpu/><small>Processing</small><h3>ESP32-S3-WROOM-1</h3><p>Central controller for peripheral coordination and future embedded workloads.</p></article><article><Eye/><small>Visual output · I²C</small><h3>OLED display</h3><p>Compact visual-feedback interface for wearable information display.</p></article><article><Mic2/><small>Digital audio · I²S</small><h3>INMP441 microphone</h3><p>MEMS audio input connected through a dedicated digital audio bus.</p></article><article><Radio/><small>Communication · UART</small><h3>Bluetooth link</h3><p>Serial-connected wireless communication for external device connectivity.</p></article>
    </div><div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 border border-white/10 bg-[#101923] p-5"><div className="border border-white/15 p-4 text-center"><small className="font-mono text-[9px] text-[#7192ad]">BATTERY INPUT</small></div><span className="text-center text-[#6fa9d0]">→</span><div className="border border-[#69b9ef]/40 bg-[#10263a] p-4 text-center"><strong className="font-display">AMS1117 · 3.3 V</strong></div><span className="text-center text-[#6fa9d0]">→</span><div className="border border-white/15 p-4 text-center"><small className="font-mono text-[9px] text-[#7192ad]">MCU + PERIPHERALS</small></div></div></div></section>

    <section className="quad-section quad-light"><div className="quad-wrap"><header className="quad-heading"><div><p>03 / Development timeline</p><h2>Completed design scope.</h2></div><span>Downstream hardware work is intentionally shown as not completed.</span></header><div className="quad-timeline">{stages.map(([title,status,text],i)=><article key={title}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{title}</h3><p>{text}</p></div><span className={status === "Complete" ? "done" : ""}>{status === "Complete" && <Check size={12}/>} {status}</span></article>)}</div></div></section>

    <section className="quad-section bg-[#152330]"><div className="quad-wrap quad-split"><header><p className="text-[#79c6f8]">04 / Engineering constraints</p><h2>Compact integration across multiple buses.</h2></header><div className="grid gap-3">{[[Layers3,"Board density","Arrange the MCU, regulator, display, microphone, and wireless connections within a wearable form factor."],[Route,"Interface routing","Keep I²C, I²S, and UART signals organized while maintaining connector access."],[BatteryCharging,"Power distribution","Provide a stable 3.3 V rail for the controller and onboard peripherals."],[Wrench,"Manufacturability","Balance board size, component placement, routing access, and fabrication constraints."]].map(([Icon,title,text])=>{const I=Icon as typeof Layers3;return <article key={String(title)} className="grid grid-cols-[42px_1fr] gap-4 border border-white/15 bg-black/10 p-5"><I className="text-[#79c6f8]"/><div><h3 className="font-display text-lg font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-relaxed text-[#a7b7c4]">{String(text)}</p></div></article>})}</div></div></section>

    <section className="quad-section quad-gallery"><div className="quad-wrap"><header className="quad-heading"><div><p>05 / Design documentation</p><h2>Schematic and system planning.</h2></div><span>Open either image to inspect the full-resolution source.</span></header>
      <div className="grid grid-cols-1 gap-5">
        <a href="/projects/smart-glasses/electrical-schematic.png" target="_blank" rel="noreferrer" className="group overflow-hidden border border-[#b9c2c9] bg-[#f4f5f5] transition-colors hover:border-[#788894]">
          <span className="relative block h-[360px] sm:h-[520px] lg:h-[680px] overflow-hidden bg-white"><Image src="/projects/smart-glasses/electrical-schematic.png" alt="KiCad schematic showing the ESP32-S3, OLED display, INMP441 microphone, Bluetooth module, battery, and 3.3 volt regulator" fill sizes="100vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.01]"/></span>
          <span className="block p-5 md:p-6"><small className="font-mono text-[10px] uppercase tracking-[.12em] text-[#2874b5]">Completed electrical design</small><strong className="mt-1.5 block font-display text-xl font-semibold text-[#101820]">ESP32-S3 wearable electronics schematic</strong><span className="mt-2 block text-sm leading-relaxed text-[#64717b]">Battery regulation, processing, OLED over I²C, INMP441 audio over I²S, and Bluetooth communication over UART.</span></span>
        </a>
        <a href="/projects/smart-glasses/future-software-architecture.png" target="_blank" rel="noreferrer" className="group overflow-hidden border border-[#b9c2c9] bg-[#f4f5f5] transition-colors hover:border-[#788894]">
          <span className="relative block h-[420px] sm:h-[600px] overflow-hidden bg-white"><Image src="/projects/smart-glasses/future-software-architecture.png" alt="Future software architecture concept for the smart glasses system" fill sizes="100vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.01]"/></span>
          <span className="block p-5 md:p-6"><small className="font-mono text-[10px] uppercase tracking-[.12em] text-[#7d6b9d]">Future concept · not implemented</small><strong className="mt-1.5 block font-display text-xl font-semibold text-[#101820]">Proposed software and AI architecture</strong><span className="mt-2 block text-sm leading-relaxed text-[#64717b]">Exploratory planning for mobile communication, control software, hardware abstraction, and phone-offloaded AI. These capabilities are not presented as completed work.</span></span>
        </a>
      </div>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>06 / Skills</p><h2>Wearable embedded-hardware design.</h2></header><div><div className="quad-skills">{["ESP32-S3","KiCad","Wearable electronics","Schematic design","PCB layout","Component selection","I²C","I²S","UART","Power distribution"].map(x=><span key={x}>{x}</span>)}</div><div className="quad-next"><small>Project outcome</small><h3>Manufacturing-ready PCB design.</h3><p>A completed ESP32-S3 electronics design integrating display, audio, wireless communication, and regulated battery power.</p></div></div></div></section>
  </div>;
}
