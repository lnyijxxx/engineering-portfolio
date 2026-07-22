import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllNotes, getNote } from "@/lib/content/loader";
import { mdxOptions } from "@/lib/content/mdx";
import { KnowledgeBaseNav, type KnowledgeNote } from "@/components/notes/KnowledgeBaseNav";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const notes: KnowledgeNote[] = getAllNotes().map((item) => ({
    slug: item.slug.join("/"),
    title: item.frontmatter.title,
    date: item.frontmatter.date,
    tags: item.frontmatter.tags,
    body: item.body,
  }));

  return (
    <div className="kb-article-layout">
      <aside className="hidden md:block">
        <KnowledgeBaseNav notes={notes} activeSlug={slug.join("/")} compact />
      </aside>
      <div className="kb-article-content">
        <div className="font-mono text-[11px] text-text-tertiary mb-3">
          {slug.slice(0, -1).map((seg, i) => (
            <span key={seg}>
              <Link
                href={`/notes/${slug.slice(0, i + 1).join("/")}`}
                className="hover:text-text-primary transition-colors capitalize"
              >
                {seg.replace(/-/g, " ")}
              </Link>
              <span className="mx-1.5">/</span>
            </span>
          ))}
          <span className="text-text-secondary">{note.frontmatter.title}</span>
        </div>

        <h1 className="font-display text-3xl font-medium text-text-primary mb-3">
          {note.frontmatter.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="font-mono text-[11px] text-text-tertiary mr-1">
            {note.frontmatter.date}
          </span>
          {note.frontmatter.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <article className="kb-prose">
          <MDXRemote source={note.body} options={mdxOptions} />
        </article>

        {note.frontmatter.related && note.frontmatter.related.length > 0 && (
          <div className="mt-14 pt-8 border-t border-border">
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary mb-3">
              Related
            </p>
            <div className="flex flex-wrap gap-2">
              {note.frontmatter.related.map((rel) => (
                <Link
                  key={rel}
                  href={`/notes/${rel}`}
                  className="font-mono text-[12px] text-text-primary border border-border hover:border-border-strong px-2.5 py-1 rounded-sm transition-colors"
                >
                  {rel} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
