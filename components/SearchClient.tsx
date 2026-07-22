"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchDocs, type SearchDoc } from "@/lib/search";

const KIND_LABEL: Record<string, string> = {
  project: "project",
  note: "note",
  journal: "journal",
};

export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchDocs(docs, query), [docs, query]);

  return (
    <div>
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects, notes, journals — e.g. UART, CAN, ESC..."
        className="w-full bg-bg-elevated border border-border focus:border-border-strong rounded-sm px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary font-mono outline-none"
      />

      <div className="mt-6">
        {query && results.length === 0 && (
          <p className="text-sm text-text-tertiary font-mono">
            no matches for &ldquo;{query}&rdquo;
          </p>
        )}
        <ul className="divide-y divide-border border-t border-border">
          {results.map((doc) => (
            <li key={doc.href}>
              <Link
                href={doc.href}
                className="flex items-start justify-between gap-4 py-4 group"
              >
                <div>
                  <p className="text-sm text-text-primary group-hover:underline underline-offset-4">
                    {doc.title}
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">{doc.excerpt}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary border border-border px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                  {KIND_LABEL[doc.kind]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
