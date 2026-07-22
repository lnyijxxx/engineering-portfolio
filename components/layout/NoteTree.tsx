import Link from "next/link";
import type { NoteTreeNode } from "@/lib/content/loader";

function formatLabel(name: string) {
  return name.replace(/-/g, " ");
}

export function NoteTreeView({
  node,
  activePath,
  depth = 0,
}: {
  node: NoteTreeNode;
  activePath?: string[];
  depth?: number;
}) {
  const isActive = activePath && activePath.join("/") === node.path.join("/");
  const sortedChildren = [...node.children].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <ul className={depth === 0 ? "space-y-0.5" : "space-y-0.5 ml-3 border-l border-border pl-3 mt-0.5 mb-1"}>
      {sortedChildren.map((child) => (
        <li key={child.path.join("/")}>
          {child.note ? (
            <Link
              href={`/notes/${child.path.join("/")}`}
              className={`block text-sm py-1 capitalize transition-colors ${
                activePath && activePath.join("/") === child.path.join("/")
                  ? "text-text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {formatLabel(child.note.frontmatter.title || child.name)}
            </Link>
          ) : (
            <span className="block text-sm py-1 capitalize text-text-tertiary font-mono text-[12px] tracking-wide">
              {formatLabel(child.name)}
            </span>
          )}
          {child.children.length > 0 && (
            <NoteTreeView node={child} activePath={activePath} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}
