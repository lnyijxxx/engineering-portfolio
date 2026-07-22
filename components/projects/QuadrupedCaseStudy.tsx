"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BatteryCharging, BrainCircuit, Check, ChevronLeft, ChevronRight, Cpu, Expand, Network, X } from "lucide-react";

const images = [
  { src: "/projects/quadruped-robot/electronics-layout.png", alt: "Top and bottom deck electrical layout of the quadruped", label: "Integration", title: "Two-deck electronics layout", text: "Compute and power are physically separated, with accessible harness runs to each hip actuator." },
  { src: "/projects/quadruped-robot/power-architecture.png", alt: "Quadruped power and servo communication schematic", label: "Electrical design", title: "Power and communication architecture", text: "A 12 V source feeds regulated servo and compute rails; UART connects the Pi to the eight-servo bus." },
  { src: "/projects/quadruped-robot/industrial-design-concept.png", alt: "Annotated quadruped protective shell concept", label: "Mechanical collaboration", title: "Protective shell concept", text: "An early study of a recognizable dog silhouette that preserves leg motion and maintenance access." },
];

const stages = [
  ["01", "Architecture", "Complete", "Defined the compute, actuator, power, and communication topology."],
  ["02", "Hardware integration", "Complete", "Assembled the chassis, wired both decks, and commissioned all eight servos."],
  ["03", "Servo control", "Complete", "Established serial communication and Python joint control."],
  ["04", "Kinematics", "In progress", "Modeling leg geometry in MATLAB before physical deployment."],
  ["05", "Walking gait", "Next", "Translate validated foot trajectories into coordinated locomotion."],
  ["06", "Autonomy", "Planned", "Add ROS 2, vision, stabilization, and navigation."],
];

export function QuadrupedCaseStudy() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((open + 1) % images.length);
      if (e.key === "ArrowLeft") setOpen((open - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", key); };
  }, [open]);

  return <div className="quad-case">
    <section className="quad-hero"><div className="quad-wrap">
      <p className="quad-status"><i /> Active development · May 2026 — present</p>
      <div className="quad-hero-grid">
        <div className="quad-rise"><p className="quad-kicker">Embedded robotics / personal R&amp;D</p><h1>Building a robotic platform for autonomous locomotion.</h1><p className="quad-lede">An eight-degree-of-freedom quadruped designed from individual components to explore embedded control, inverse kinematics, and multidisciplinary system integration.</p><a href="#system">Explore the system ↓</a></div>
        <button className="quad-hero-image quad-rise" onClick={() => setOpen(0)} aria-label="Open electronics layout"><Image src={images[0].src} alt={images[0].alt} fill priority sizes="(max-width:900px) 100vw,50vw"/><span>SYSTEM LAYOUT / REV 01</span><b><Expand size={14}/> Inspect</b></button>
      </div>
      <dl className="quad-metrics"><div><dt>8</dt><dd>Actuated joints</dd></div><div><dt>4</dt><dd>Articulated legs</dd></div><div><dt>12 V</dt><dd>Primary power</dd></div><div><dt>2</dt><dd>Control languages</dd></div></dl>
    </div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>01 / Overview</p><h2>From components to a complete robotic system.</h2></header><div className="quad-copy"><p>This project began with a deliberate constraint: build the platform from the ground up rather than assemble a commercial kit. That meant owning the electrical architecture, component selection, wiring, embedded Linux environment, servo communication, and validation strategy.</p><p>The current phase uses MATLAB to validate inverse-kinematics models before physical deployment—creating a measured path from individual joint control to coordinated walking.</p><aside><strong>My scope</strong><span>Electrical architecture · embedded software · integration · testing</span><small>Mechanical CAD and chassis fabrication were completed with mechanical engineering collaborators.</small></aside></div></div></section>

    <section id="system" className="quad-section quad-dark"><div className="quad-wrap"><header className="quad-heading"><div><p>02 / System architecture</p><h2>Four tightly coupled subsystems.</h2></div><span>Designed for clear power boundaries, debuggable communication, and future expansion.</span></header><div className="quad-specs">
      <article><Cpu/><small>Compute · headless SSH</small><h3>Raspberry Pi 4</h3><p>Configured for remote control from a single laptop—no dedicated monitor, keyboard, or mouse required.</p></article>
      <article><Network/><small>Actuation</small><h3>8 × LX-16A</h3><p>Serial bus servos control the hip and knee joints across all four legs.</p></article>
      <article><BatteryCharging/><small>Power</small><h3>12 V / 3000 mAh</h3><p>Dedicated regulation supports stable compute and changing actuator loads.</p></article>
      <article><BrainCircuit/><small>Motion</small><h3>MATLAB → Python</h3><p>Kinematics are validated in simulation before joint targets reach hardware.</p></article>
    </div><div className="quad-flow"><span>12 V battery</span>→<span>regulated rails</span>→<span>Raspberry Pi</span>→<span>UART bridge</span>→<span>8-servo bus</span></div></div></section>

    <section className="quad-section quad-light"><div className="quad-wrap"><header className="quad-heading"><div><p>03 / Development timeline</p><h2>Built in deliberate, testable stages.</h2></div><span>Each phase closes a technical risk before the next layer of complexity.</span></header><div className="quad-timeline">{stages.map(([n,t,s,d])=><article key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div><span className={s === "Complete" ? "done" : ""}>{s === "Complete" && <Check size={12}/>} {s}</span></article>)}</div></div></section>

    <section className="quad-section quad-challenge"><div className="quad-wrap quad-split"><header><p>04 / Engineering challenge</p><h2>Reliable motion starts with disciplined power design.</h2></header><div className="quad-copy"><p>Eight servos create dynamic current demands that can destabilize the onboard computer if power distribution is treated as an afterthought. The architecture separates regulated actuator and compute rails while preserving a shared reference for communication.</p><div className="quad-points"><span><b>Load-aware</b>Designed around changing multi-servo demand.</span><span><b>Testable</b>Subsystem boundaries support bench validation.</span><span><b>Expandable</b>Headroom for sensors, vision, and ROS 2.</span></div></div></div></section>

    <section className="quad-section quad-gallery"><div className="quad-wrap"><header className="quad-heading"><div><p>05 / Engineering gallery</p><h2>Inside the design process.</h2></div><span>Schematics, system layouts, and concept development from the build.</span></header><div className="quad-gallery-grid">{images.map((im,i)=><button key={im.src} onClick={()=>setOpen(i)} className={`quad-shot shot-${i}`}><span className="quad-shot-image"><Image src={im.src} alt={im.alt} fill sizes="(max-width:800px) 100vw,55vw"/></span><span className="quad-shot-copy"><small>{im.label}</small><strong>{im.title}</strong><span>{im.text}</span></span><Expand size={18}/></button>)}</div></div></section>

    <section className="quad-section quad-light"><div className="quad-wrap quad-split"><header><p>06 / Capabilities</p><h2>Across hardware, software, and motion.</h2></header><div><div className="quad-skills">{["Robotics","Embedded systems","Python","MATLAB","Inverse kinematics","UART","Servo control","Power electronics","Embedded Linux","System integration"].map(x=><span key={x}>{x}</span>)}</div><div className="quad-next"><small>Next technical milestone</small><h3>Close the simulation-to-hardware loop.</h3><p>Complete inverse kinematics, validate joint targets on the physical robot, then progress to coordinated walking gaits.</p></div></div></div></section>

    {open !== null && <div className="quad-modal" role="dialog" aria-modal="true" aria-label={images[open].title} onClick={()=>setOpen(null)}><button className="close" onClick={()=>setOpen(null)} aria-label="Close"><X/></button><button className="prev" onClick={e=>{e.stopPropagation();setOpen((open-1+images.length)%images.length)}} aria-label="Previous"><ChevronLeft/></button><figure onClick={e=>e.stopPropagation()}><div><Image src={images[open].src} alt={images[open].alt} fill sizes="95vw"/></div><figcaption><small>{images[open].label}</small><strong>{images[open].title}</strong><span>{images[open].text}</span></figcaption></figure><button className="next" onClick={e=>{e.stopPropagation();setOpen((open+1)%images.length)}} aria-label="Next"><ChevronRight/></button></div>}
  </div>;
}
