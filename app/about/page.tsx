import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  CircuitBoard,
  Code2,
  Cpu,
  GitFork,
  GraduationCap,
  Mail,
  Radio,
  Wrench,
} from "lucide-react";

const interests = [
  "Embedded systems and firmware development",
  "Robotics and autonomous systems",
  "PCB design, bring-up, and hardware debugging",
  "Embedded Linux and Raspberry Pi",
  "Hardware communication protocols",
  "Hardware–software system integration",
];

const skills = [
  { icon: Code2, label: "Programming", items: ["C", "C++", "Python", "MATLAB", "RISC-V Assembly", "VHDL"] },
  { icon: Cpu, label: "Embedded Platforms", items: ["STM32", "ESP32", "Raspberry Pi", "Arduino"] },
  { icon: CircuitBoard, label: "Hardware & PCB", items: ["KiCad", "Altium Designer · Learning", "Schematic Design", "PCB Layout", "PCB Assembly & Bring-up", "Circuit Prototyping"] },
  { icon: Radio, label: "Communication", items: ["UART", "SPI", "I²C", "CAN · Learning"] },
  { icon: Wrench, label: "Robotics & Tools", items: ["ROS 2", "Pixhawk", "Mission Planner", "Git", "Linux", "STM32CubeIDE", "VS Code"] },
];

export default function AboutPage() {
  return <main className="about-page">
    <section className="about-hero">
      <div className="about-wrap about-hero-grid">
        <div>
          <p className="about-eyebrow"><GraduationCap size={15} /> Electrical Engineering · University of Waterloo</p>
          <h1>Building at the intersection of hardware and firmware.</h1>
        </div>
        <div className="about-intro">
          <p>I&rsquo;m an Electrical Engineering student at the University of Waterloo with a primary interest in embedded systems, robotics, and hardware design. I enjoy building complete systems that integrate electronics, firmware, and mechanical components—from custom PCBs and microcontrollers to autonomous robotic platforms.</p>
          <p>This portfolio documents my engineering journey through project development, technical journals, and engineering notes. It serves as both a personal engineering knowledge base and a record of how I approach design, debugging, and continuous learning.</p>
        </div>
      </div>
      <div className="about-wrap about-signal" aria-hidden="true"><span>Electronics</span><i /><span>Firmware</span><i /><span>Integration</span><i /><span>Validation</span></div>
    </section>

    <section className="about-section about-focus">
      <div className="about-wrap about-two-col">
        <header><p>01 / Current interests</p><h2>What I&rsquo;m exploring now.</h2></header>
        <div className="about-interest-grid">{interests.map((interest, index) => <article key={interest}><span>{String(index + 1).padStart(2, "0")}</span><strong>{interest}</strong>{index === 4 && <small>UART · SPI · I²C · CAN</small>}</article>)}</div>
      </div>
    </section>

    <section className="about-section about-goals">
      <div className="about-wrap about-two-col">
        <header><p>02 / Career goals</p><h2>Contributing across the full development cycle.</h2></header>
        <div className="about-goal-copy">
          <Boxes size={30} />
          <p>I&rsquo;m pursuing opportunities in embedded systems, robotics, and hardware engineering where I can contribute across the full development cycle—from electronics and PCB design to firmware development, testing, and system integration.</p>
          <div><span>Design</span><i>→</i><span>Build</span><i>→</i><span>Test</span><i>→</i><span>Integrate</span></div>
        </div>
      </div>
    </section>

    <section className="about-section about-skills">
      <div className="about-wrap">
        <header className="about-section-heading"><div><p>03 / Technical skills</p><h2>Tools I use to build systems.</h2></div><span>Learning-stage skills are marked clearly.</span></header>
        <div className="about-skill-grid">{skills.map(({ icon: Icon, label, items }) => <article key={label}><Icon size={21} /><h3>{label}</h3><div>{items.map((item) => {
          const learning = item.includes("· Learning");
          return <span key={item} className={learning ? "learning" : ""}>{item.replace(" · Learning", "")}{learning && <small>Learning</small>}</span>;
        })}</div></article>)}</div>
      </div>
    </section>

    <section className="about-contact">
      <div className="about-wrap about-contact-grid">
        <div><p>04 / Contact</p><h2>Get in touch.</h2><span>I&rsquo;m always happy to connect about embedded systems, robotics, hardware design, or internship opportunities.</span></div>
        <div className="about-contact-links">
          <Link href="mailto:y54ma@uwaterloo.ca"><Mail size={18} /><span><small>Email</small><strong>y54ma@uwaterloo.ca</strong></span><ArrowUpRight size={17} /></Link>
          <Link href="https://github.com/lnyijxxx" target="_blank" rel="noreferrer"><GitFork size={18} /><span><small>GitHub</small><strong>github.com/lnyijxxx</strong></span><ArrowUpRight size={17} /></Link>
        </div>
      </div>
    </section>
  </main>;
}
