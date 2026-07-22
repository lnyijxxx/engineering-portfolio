import { getAllProjects, getAllNotes } from "./content/loader";
import type { SearchDoc } from "./search";

/** Server-only: walks all content and builds the search index. */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const project of getAllProjects()) {
    docs.push({
      kind: "project",
      title: project.frontmatter.title,
      href: `/projects/${project.slug}`,
      tags: project.frontmatter.tags,
      excerpt: project.frontmatter.summary,
      body: (project.frontmatter.title + " " + project.body).toLowerCase(),
    });

    for (const entry of project.journal) {
      docs.push({
        kind: "journal",
        title: entry.frontmatter.title,
        href: `/projects/${entry.slug}#journal-${entry.entrySlug}`,
        tags: [],
        excerpt: `Journal entry \u2014 ${project.frontmatter.title}`,
        body: (entry.frontmatter.title + " " + entry.body).toLowerCase(),
      });
    }
  }

  for (const note of getAllNotes()) {
    docs.push({
      kind: "note",
      title: note.frontmatter.title,
      href: `/notes/${note.slug.join("/")}`,
      tags: note.frontmatter.tags,
      excerpt: note.slug.slice(0, -1).join(" / ") || "Notes",
      body: (
        note.frontmatter.title +
        " " +
        note.frontmatter.tags.join(" ") +
        " " +
        note.body
      ).toLowerCase(),
    });
  }

  return docs;
}
