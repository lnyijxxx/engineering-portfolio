import { z } from "zod";

/**
 * Every content type in the knowledge base validates against one of these
 * schemas at build/dev time. A typo in frontmatter fails loudly here instead
 * of silently breaking a page (or worse, quietly rendering "undefined")
 * three years from now.
 */

export const projectSchema = z.object({
  title: z.string(),
  date: z.string(), // ISO date - when the project started. Feeds the timeline.
  status: z.enum(["active", "complete", "archived"]),
  tags: z.array(z.string()).default([]),
  github: z.string().url().optional(),
  summary: z.string(), // one-liner used on home + project index cards
});
export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export const journalEntrySchema = z.object({
  date: z.string(), // ISO date
  title: z.string(), // e.g. "Q1 2026 — first flight, vibration debugging"
});
export type JournalFrontmatter = z.infer<typeof journalEntrySchema>;

export const noteSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).optional(), // slugs of related notes, manual cross-links
});
export type NoteFrontmatter = z.infer<typeof noteSchema>;

export const pageSchema = z.object({
  title: z.string(),
});
export type PageFrontmatter = z.infer<typeof pageSchema>;

/**
 * A single unified shape every piece of content gets normalized into,
 * regardless of source schema. This is what the timeline, search index,
 * and cross-linking all operate on.
 */
export type ContentKind = "project" | "journal" | "note" | "page";

export interface ContentItem<F = Record<string, unknown>> {
  kind: ContentKind;
  slug: string; // url-safe path, e.g. "notes/ros2/nodes"
  filePath: string; // absolute path on disk, for editing / debugging
  frontmatter: F;
  body: string; // raw MDX source, compiled lazily by the page that needs it
}
