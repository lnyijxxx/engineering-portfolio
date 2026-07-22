/**
 * Client-safe search utilities - no filesystem access, so this can be
 * imported from client components. The index itself is built server-side
 * in lib/search-index.ts and passed down as a plain prop.
 */

export interface SearchDoc {
  kind: "project" | "note" | "journal";
  title: string;
  href: string;
  tags: string[];
  excerpt: string;
  body: string;
}

/**
 * Simple relevance scoring: tag exact match > title match > body match.
 * Deliberately not a fuzzy/vector search - a personal knowledge base of a
 * few hundred pages doesn't need one, and a dumb scorer is something you
 * can read and modify in five minutes a decade from now.
 */
export function searchDocs(docs: SearchDoc[], query: string): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return docs
    .map((doc) => {
      let score = 0;
      if (doc.tags.some((t) => t.toLowerCase() === q)) score += 10;
      if (doc.tags.some((t) => t.toLowerCase().includes(q))) score += 5;
      if (doc.title.toLowerCase().includes(q)) score += 8;
      if (doc.body.includes(q)) score += 2;
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.doc);
}
