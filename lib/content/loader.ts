import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  projectSchema,
  journalEntrySchema,
  noteSchema,
  pageSchema,
  type ProjectFrontmatter,
  type JournalFrontmatter,
  type NoteFrontmatter,
  type PageFrontmatter,
} from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// ---------------------------------------------------------------------------
// Low-level fs helpers
// ---------------------------------------------------------------------------

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // journal/ and assets/ are handled by their own loaders, skip here
      files = files.concat(walk(full));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function readMdx(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content };
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
  filePath: string;
  journal: JournalEntry[];
}

export interface JournalEntry {
  slug: string; // project slug this belongs to
  entrySlug: string; // filename without extension, e.g. "2026-01"
  frontmatter: JournalFrontmatter;
  body: string;
  filePath: string;
}

function loadJournalForProject(projectSlug: string, projectDir: string): JournalEntry[] {
  const journalDir = path.join(projectDir, "journal");
  if (!fs.existsSync(journalDir)) return [];

  const entries = fs
    .readdirSync(journalDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(journalDir, file);
      const { data, content } = readMdx(filePath);
      const frontmatter = journalEntrySchema.parse(data);
      return {
        slug: projectSlug,
        entrySlug: file.replace(/\.mdx?$/, ""),
        frontmatter,
        body: content,
        filePath,
      };
    });

  return entries.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(CONTENT_ROOT, "projects");
  if (!fs.existsSync(projectsDir)) return [];

  const projectSlugs = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  const projects = projectSlugs.map((slug) => {
    const projectDir = path.join(projectsDir, slug);
    const indexPath = path.join(projectDir, "index.mdx");
    const { data, content } = readMdx(indexPath);
    const frontmatter = projectSchema.parse(data);
    return {
      slug,
      frontmatter,
      body: content,
      filePath: indexPath,
      journal: loadJournalForProject(slug, projectDir),
    };
  });

  return projects.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getProject(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Notes (arbitrarily nested)
// ---------------------------------------------------------------------------

export interface Note {
  slug: string[]; // path segments, e.g. ["ros2", "nodes"]
  frontmatter: NoteFrontmatter;
  body: string;
  filePath: string;
}

export function getAllNotes(): Note[] {
  const notesDir = path.join(CONTENT_ROOT, "notes");
  const files = walk(notesDir);

  return files.map((filePath) => {
    const relative = path.relative(notesDir, filePath);
    const slug = relative.replace(/\.mdx?$/, "").split(path.sep);
    const { data, content } = readMdx(filePath);
    const frontmatter = noteSchema.parse(data);
    return { slug, frontmatter, body: content, filePath };
  });
}

export function getNote(slug: string[]): Note | null {
  return getAllNotes().find((n) => n.slug.join("/") === slug.join("/")) ?? null;
}

/**
 * Builds a nested tree from the flat note list, mirroring the folder
 * structure exactly. This is what drives the sidebar nav - there is no
 * separate nav config to keep in sync with the filesystem.
 */
export interface NoteTreeNode {
  name: string;
  path: string[]; // full slug path up to this node
  note?: Note; // present if this node is itself a page (has an .mdx file)
  children: NoteTreeNode[];
}

export function buildNoteTree(): NoteTreeNode {
  const root: NoteTreeNode = { name: "notes", path: [], children: [] };
  for (const note of getAllNotes()) {
    let cursor = root;
    for (let i = 0; i < note.slug.length; i++) {
      const segment = note.slug[i];
      const isLeaf = i === note.slug.length - 1;
      let child = cursor.children.find((c) => c.name === segment);
      if (!child) {
        child = { name: segment, path: note.slug.slice(0, i + 1), children: [] };
        cursor.children.push(child);
      }
      if (isLeaf) child.note = note;
      cursor = child;
    }
  }
  return root;
}

// ---------------------------------------------------------------------------
// Static pages (about, etc.)
// ---------------------------------------------------------------------------

export function getPage(slug: string): { frontmatter: PageFrontmatter; body: string } | null {
  const filePath = path.join(CONTENT_ROOT, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdx(filePath);
  return { frontmatter: pageSchema.parse(data), body: content };
}
