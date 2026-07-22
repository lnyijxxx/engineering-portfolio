"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Cpu, Expand, Gauge, Navigation, Radio, X, Zap } from "lucide-react";

const heroImage = { src: "/projects/drone/assembled-platform.jpg", alt: "Assembled quadcopter with Pixhawk flight controller, motors, wiring, and GPS mast", label: "Hardware assembly", title: "Integrated UAV platform", text: "The assembled airframe with propulsion, power distribution, Pixhawk, receiver, and GPS hardware installed." };

const gallery = [
  { src: "/projects/drone/wiring-architecture.png", alt: "Annotated UAV wiring diagram connecting motors, ESC, Pixhawk, receiver, GPS, power, and safety hardware", label: "Avionics integration", title: "System wiring map", text: "A working integration reference for motor direction, ESC outputs, radio, telemetry, GPS, safety hardware, and power." },
];

const lightboxImages = [heroImage, ...gallery];

const milestones = [
  { title: "Hardware assembly", status: "Complete", text: "Frame, motors, ESC, power, flight controller, receiver, and GPS integrated." },
  { title: "Pixhawk setup", status: "Complete", text: "ArduPilot installed and connected to Mission Planner for configuration." },
  { title: "Sensor + radio calibration", status: "Complete", text: "Accelerometer, compass, transmitter inputs, flight modes, and safety parameters configured." },
  { title: "ESC configuration", status: "In progress", text: "Motor response and ESC setup are being validated before powered flight." },
  { title: "Flight testing", status: "In progress", text: "Bench validation precedes controlled outdoor flight tests." },
  { title: "Raspberry Pi integration", status: "Planned", text: "Companion-computer link over MAVLink for higher-level autonomy." },
];

export function DroneCaseStudy() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((open + 1) % lightboxImages.length);
      if (e.key === "ArrowLeft") setOpen((open - 1 + lightboxImages.length) % lightboxImages.length);
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", onKey); };
  }, [open]);

  return <div className="quad-case drone-case">
    <section className="quad-hero drone-hero"><div className="quad-wrap">
      <p className="quad-status"><i/> Active development · May 2026 — present</p>
      <div className="quad-hero-grid">
        <div className="quad-rise"><p className="quad-kicker">UAV systems / avionics integration</p><h1>Autonomous drone platform.</h1><p className="quad-lede">A modular quadcopter built around Pixhawk and ArduPilot to develop practical experience in flight-control integration, calibration, avionics, and future companion-computer autonomy.</p><a href="#drone-system">View system architecture ↓</a></div>
        <button className="quad-hero-image drone-hero-image quad-rise" onClick={()=>setOpen(0)} aria-label="Open assembled drone image"><Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width:900px) 100vw,50vw"/><span>AIRFRAME / CURRENT BUILD</span><b><Expand size={14}/> Inspect</b></button>
      </div>
      <dl className="quad-metrics"><div><dt>Pixhawk</dt><dd>Flight controller</dd></div><div><dt>ArduPilot</dt><dd>Flight firmware</dd></div><div><dt>4</dt><dd>Motor channels</dd></div><div><dt>MAVLink</dt><dd>Planned Pi link</dd></div></dl>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>01 / Project scope</p><h2>UAV hardware and flight-control integration.</h2></header><div className="quad-copy"><p>The platform was assembled from individual components rather than purchased ready-to-fly. Current work covers electrical integration, ArduPilot configuration, radio setup, sensor calibration, ESC setup, and structured system validation.</p><p>The flight controller remains responsible for time-critical stabilization and safety. A Raspberry Pi companion computer is a planned expansion for computer vision, ROS 2, and higher-level autonomous behavior after the airframe is proven.</p><aside><strong>Current boundary</strong><span>Pixhawk integration and calibration completed · ESC configuration and flight testing in progress</span><small>Raspberry Pi, ROS 2, computer vision, and autonomous navigation are planned—not presented as completed work.</small></aside></div></div></section>

    <section id="drone-system" className="quad-section quad-dark drone-system"><div className="quad-wrap"><header className="quad-heading"><div><p>02 / System architecture</p><h2>Flight-critical control with room for autonomy.</h2></div><span>The architecture separates stabilization, operator control, propulsion, and future autonomy responsibilities.</span></header>
      <div className="quad-specs"><article><Gauge/><small>Flight control</small><h3>Pixhawk</h3><p>Runs ArduPilot stabilization, flight modes, sensor fusion, and safety functions.</p></article><article><Radio/><small>Operator link</small><h3>FlySky FS-i6X</h3><p>Manual control and flight-mode input through the paired radio receiver.</p></article><article><Zap/><small>Propulsion</small><h3>4-in-1 ESC</h3><p>Commands four brushless motors from Pixhawk actuator outputs.</p></article><article><Cpu/><small>Future companion</small><h3>Raspberry Pi</h3><p>Planned MAVLink endpoint for ROS 2, perception, and navigation workloads.</p></article></div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1.15fr_auto_1fr] items-stretch gap-3 md:gap-4 border border-white/10 bg-[#101923] p-4 md:p-7" aria-label="Drone system architecture">
        <div className="grid content-center gap-1.5 border border-white/15 bg-[#0b1219] p-5">
          <small className="font-mono text-[9px] uppercase tracking-[.12em] text-[#7192ad]">Ground station</small><strong className="font-display text-[18px] font-semibold">Mission Planner</strong><span className="text-[12px] text-[#8394a3]">Configuration · telemetry</span>
        </div>
        <i className="self-center text-center font-mono text-[9px] not-italic text-[#628caf]">USB / telemetry <span className="block text-base md:inline">→</span></i>
        <div className="grid content-center gap-1.5 border border-[#61afff]/50 bg-[#10263a] p-5">
          <small className="font-mono text-[9px] uppercase tracking-[.12em] text-[#87b7dd]">Flight computer</small><strong className="font-display text-[18px] font-semibold">Pixhawk + ArduPilot</strong><span className="text-[12px] text-[#9caebd]">Stabilization · safety · mixing</span>
        </div>
        <i className="self-center text-center font-mono text-[9px] not-italic text-[#628caf]">Motor outputs <span className="block text-base md:inline">→</span></i>
        <div className="grid content-center gap-1.5 border border-white/15 bg-[#0b1219] p-5">
          <small className="font-mono text-[9px] uppercase tracking-[.12em] text-[#7192ad]">Propulsion</small><strong className="font-display text-[18px] font-semibold">ESC + 4 motors</strong><span className="text-[12px] text-[#8394a3]">Thrust generation</span>
        </div>
        <div className="md:col-start-3 grid gap-1.5 border border-dashed border-[#61afff]/50 bg-[#0d1d2a] p-5 opacity-80">
          <small className="font-mono text-[9px] uppercase tracking-[.12em] text-[#87b7dd]">Planned companion computer</small><strong className="font-display text-[18px] font-semibold">Raspberry Pi</strong><span className="text-[12px] text-[#8394a3]">MAVLink · ROS 2 · vision</span>
        </div>
      </div>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap"><header className="quad-heading"><div><p>03 / Engineering progress</p><h2>Current integration status.</h2></div><span>Completed work, active validation, and future expansion are shown separately.</span></header>
      <div className="quad-timeline">
        {milestones.map((m,i)=><article key={m.title}>
          <b>{String(i+1).padStart(2,"0")}</b>
          <div><h3>{m.title}</h3><p>{m.text}</p></div>
          <span className={m.status === "Complete" ? "done" : ""}>{m.status === "Complete" && <Check size={12}/>} {m.status}</span>
        </article>)}
      </div>
    </div></section>

    <section className="quad-section drone-avionics"><div className="quad-wrap quad-split"><header><p>04 / Avionics workflow</p><h2>Configuration before flight.</h2></header><div className="quad-copy"><p>Mission Planner provides the ground-control interface for firmware configuration, accelerometer and compass calibration, transmitter mapping, flight modes, ESC setup, and safety checks. The workflow is intentionally staged so wiring and configuration problems are resolved before propellers and outdoor testing add risk.</p><div className="quad-points"><span><b>Calibrate</b>Sensors, radio endpoints, and motor outputs.</span><span><b>Validate</b>Direction, arming logic, failsafes, and telemetry.</span><span><b>Test</b>Move from restrained bench checks to controlled flight.</span></div></div></div></section>

    <section className="quad-section quad-gallery drone-gallery"><div className="quad-wrap"><header className="quad-heading"><div><p>05 / Project gallery</p><h2>Airframe and avionics integration.</h2></div><span>Select an image to inspect the build and wiring details.</span></header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {gallery.map((im,i)=><button key={im.src} onClick={()=>setOpen(i+1)} className="group relative overflow-hidden border border-[#b9c2c9] bg-[#f4f5f5] text-left transition-colors hover:border-[#788894] lg:col-span-2">
          <span className="relative block h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden bg-[#e5e8ea]"><Image src={im.src} alt={im.alt} fill sizes="(max-width:1024px) 100vw,50vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"/></span>
          <span className="block min-h-[150px] p-5 md:p-6 pr-16"><small className="block font-mono text-[10px] uppercase tracking-[.12em] text-[#2874b5]">{im.label}</small><strong className="mt-1.5 block font-display text-[20px] font-semibold text-[#101820]">{im.title}</strong><span className="mt-2 block text-[13px] leading-relaxed text-[#64717b]">{im.text}</span></span>
          <span className="absolute bottom-5 right-5 grid size-10 place-items-center bg-[#18232d] text-white transition-colors group-hover:bg-[#2874b5]"><Expand size={17}/></span>
        </button>)}
      </div>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>06 / Skills and next steps</p><h2>Embedded systems applied to aerial robotics.</h2></header><div><div className="quad-skills">{["UAV systems","Pixhawk","ArduPilot","Mission Planner","Sensor calibration","ESC configuration","Radio systems","Avionics integration","MAVLink","Hardware debugging"].map(x=><span key={x}>{x}</span>)}</div><div className="quad-next"><small>Planned development</small><h3>Companion-computer integration.</h3><p>After flight validation, connect a Raspberry Pi over MAVLink and establish the foundation for ROS 2, waypoint missions, perception, and autonomous navigation.</p></div></div></div></section>

    {open !== null && <div className="quad-modal" role="dialog" aria-modal="true" aria-label={lightboxImages[open].title} onClick={()=>setOpen(null)}><button className="close" onClick={()=>setOpen(null)} aria-label="Close"><X/></button><button className="prev" onClick={e=>{e.stopPropagation();setOpen((open-1+lightboxImages.length)%lightboxImages.length)}} aria-label="Previous"><ChevronLeft/></button><figure onClick={e=>e.stopPropagation()}><div><Image src={lightboxImages[open].src} alt={lightboxImages[open].alt} fill sizes="95vw"/></div><figcaption><small>{lightboxImages[open].label}</small><strong>{lightboxImages[open].title}</strong><span>{lightboxImages[open].text}</span></figcaption></figure><button className="next" onClick={e=>{e.stopPropagation();setOpen((open+1)%lightboxImages.length)}} aria-label="Next"><ChevronRight/></button></div>}
  </div>;
}
