"use client";

import Link from "next/link";
import { BookOpen, Boxes, ChevronDown, CircuitBoard, Cpu, Gauge, Search, TerminalSquare } from "lucide-react";
import { useMemo, useState } from "react";

export type KnowledgeNote = { slug: string; title: string; date: string; tags: string[]; body: string };
type CategoryKey = "embedded" | "linux" | "pcb" | "robotics" | "control";

const categories: Array<{ key: CategoryKey; label: string; icon: typeof Cpu }> = [
  { key: "embedded", label: "Embedded Systems", icon: Cpu },
  { key: "linux", label: "Linux & Raspberry Pi", icon: TerminalSquare },
  { key: "pcb", label: "PCB Design", icon: CircuitBoard },
  { key: "robotics", label: "Robotics", icon: Boxes },
  { key: "control", label: "Control Systems", icon: Gauge },
];

function categoryFor(note: KnowledgeNote): CategoryKey {
  const root = note.slug.split("/")[0];
  if (root === "linux" || root === "raspberry-pi") return "linux";
  if (root === "pcb-design" || root === "power-electronics") return "pcb";
  if (["ros2", "mavlink", "mission-planner"].includes(root)) return "robotics";
  if (root === "control-systems") return "control";
  return "embedded";
}

export function KnowledgeBaseNav({ notes, activeSlug, compact = false }: { notes: KnowledgeNote[]; activeSlug?: string; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<CategoryKey>>(() => new Set(categories.map((category) => category.key)));
  const grouped = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return categories.map((category) => ({
      ...category,
      notes: notes.filter((note) => categoryFor(note) === category.key).filter((note) => !normalized || `${note.title} ${note.tags.join(" ")} ${note.body}`.toLowerCase().includes(normalized)).sort((a, b) => a.title.localeCompare(b.title)),
      total: notes.filter((note) => categoryFor(note) === category.key).length,
    })).filter((category) => category.total > 0);
  }, [notes, query]);

  function toggle(key: CategoryKey) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  return (
    <section className={`kb-nav ${compact ? "kb-nav-compact" : ""}`} aria-label="Engineering notes">
      <Link href="/notes" className="kb-nav-brand">
        <span><BookOpen size={17} /></span>
        <span><strong>Engineering Knowledge Base</strong><small>Personal technical references</small></span>
      </Link>
      <label className="kb-search">
        <Search size={15} aria-hidden="true" />
        <span className="sr-only">Search all engineering notes</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all notes" />
        {query && <kbd>{grouped.reduce((sum, group) => sum + group.notes.length, 0)}</kbd>}
      </label>
      <div className="kb-category-list">
        {grouped.map((category) => {
          const Icon = category.icon;
          const expanded = query ? true : open.has(category.key);
          return <div className="kb-category" key={category.key}>
            <button type="button" className="kb-category-toggle" onClick={() => toggle(category.key)} aria-expanded={expanded}>
              <Icon size={16} aria-hidden="true" /><span>{category.label}</span><b>{category.total}</b><ChevronDown className={expanded ? "is-open" : ""} size={14} />
            </button>
            <div className={`kb-category-notes ${expanded ? "is-open" : ""}`}><div>
              {category.notes.map((note) => <Link key={note.slug} href={`/notes/${note.slug}`} className={activeSlug === note.slug ? "is-active" : ""}><span>{note.title}</span></Link>)}
              {query && category.notes.length === 0 && <p>No matching notes in this category</p>}
            </div></div>
          </div>;
        })}
      </div>
      {query && grouped.every((category) => category.notes.length === 0) && <div className="kb-empty-search">No notes match “{query}”.</div>}
      <div className="kb-coming-soon"><span aria-hidden="true" />More notes coming soon</div>
    </section>
  );
}
