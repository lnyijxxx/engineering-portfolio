import Link from "next/link";
import { Tag } from "./Tag";
import type { Project } from "@/lib/content/loader";

const STATUS_LABEL: Record<string, string> = {
  active: "active",
  complete: "complete",
  archived: "archived",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="bracket-card block border border-border hover:border-border-strong bg-bg-elevated/40 hover:bg-bg-elevated transition-colors p-5 rounded-sm"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-display text-base font-medium text-text-primary">
          {project.frontmatter.title}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary whitespace-nowrap pt-1">
          {STATUS_LABEL[project.frontmatter.status]}
        </span>
      </div>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {project.frontmatter.summary}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.frontmatter.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
