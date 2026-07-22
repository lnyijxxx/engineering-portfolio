import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarDays, FolderTree } from "lucide-react";
import { getAllNotes } from "@/lib/content/loader";
import { KnowledgeBaseNav, type KnowledgeNote } from "@/components/notes/KnowledgeBaseNav";

export default function NotesIndex() {
  const notes: KnowledgeNote[] = getAllNotes().map((note) => ({
    slug: note.slug.join("/"), title: note.frontmatter.title, date: note.frontmatter.date,
    tags: note.frontmatter.tags, body: note.body,
  }));
  const recent = [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return <main className="kb-page"><div className="kb-page-grid">
    <aside><KnowledgeBaseNav notes={notes} /></aside>
    <div className="kb-home">
      <header className="kb-home-hero">
        <p className="kb-eyebrow"><BookOpen size={14} /> Knowledge Base</p>
        <h1>Engineering notes,<br />built through practice.</h1>
        <p className="kb-home-intro">Personal engineering references developed while learning embedded systems, robotics, PCB design, Linux, and firmware. This library grows alongside the systems I design and test.</p>
      </header>
      <div className="kb-stats" aria-label="Knowledge base statistics">
        <div><BookOpen size={17} /><strong>{notes.length}</strong><span>Articles</span></div>
        <div><FolderTree size={17} /><strong>5</strong><span>Categories</span></div>
        <div><CalendarDays size={17} /><strong>July 2026</strong><span>Last updated</span></div>
      </div>
      <section className="kb-recent">
        <div className="kb-section-heading"><div><p>Recently documented</p><h2>Latest notes</h2></div><span>{String(recent.length).padStart(2, "0")} references</span></div>
        <div className="kb-recent-list">{recent.map((note, index) => <Link href={`/notes/${note.slug}`} key={note.slug}>
          <span className="kb-note-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="kb-note-main"><strong>{note.title}</strong><small>{note.tags.slice(0, 3).join(" · ")}</small></span>
          <time>{new Date(`${note.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</time><ArrowUpRight size={17} />
        </Link>)}</div>
      </section>
    </div>
  </div></main>;
}
