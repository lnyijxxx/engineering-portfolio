import Link from "next/link";

const resumePath = "/Margaret-Ma-Resume.pdf";

export default function ResumePage() {
  return <main className="resume-page">
    <div className="resume-wrap">
      <header className="resume-header">
        <div>
          <p>Electrical Engineering · University of Waterloo</p>
          <h1>Resume</h1>
          <span>Embedded systems, robotics, PCB design, and hardware integration.</span>
        </div>
        <div className="resume-actions">
          <Link href={resumePath} target="_blank" rel="noreferrer">Open PDF <span aria-hidden="true">↗</span></Link>
          <a href={resumePath} download="Margaret-Ma-Resume.pdf" className="primary">Download PDF <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <section className="resume-viewer" aria-label="Resume preview">
        <div className="resume-viewer-bar">
          <span><i /> Current resume</span>
          <small>Updated July 2026 · 1 page · PDF</small>
        </div>
        <iframe src={`${resumePath}#view=FitH&toolbar=0`} title="Margaret Ma resume PDF" />
        <div className="resume-mobile-fallback">
          <p>Your browser may open PDF files in a separate viewer.</p>
          <Link href={resumePath} target="_blank" rel="noreferrer">View resume</Link>
        </div>
      </section>
    </div>
  </main>;
}
