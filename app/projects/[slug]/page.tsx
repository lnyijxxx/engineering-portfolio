import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProject } from "@/lib/content/loader";
import { mdxOptions } from "@/lib/content/mdx";
import { Tag } from "@/components/ui/Tag";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { QuadrupedCaseStudy } from "@/components/projects/QuadrupedCaseStudy";
import { DroneCaseStudy } from "@/components/projects/DroneCaseStudy";
import { STM32BoardCaseStudy } from "@/components/projects/STM32BoardCaseStudy";
import { SmartGlassesCaseStudy } from "@/components/projects/SmartGlassesCaseStudy";
import { RISCVFirmwareCaseStudy } from "@/components/projects/RISCVFirmwareCaseStudy";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  if (slug === "quadruped-robot") return <QuadrupedCaseStudy />;
  if (slug === "drone") return <DroneCaseStudy />;
  if (slug === "stm32-minimum-system-pcb") return <STM32BoardCaseStudy />;
  if (slug === "esp32-project") return <SmartGlassesCaseStudy />;
  if (slug === "riscv-interrupt-firmware") return <RISCVFirmwareCaseStudy />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
          {project.frontmatter.status}
        </span>
        <span className="text-text-tertiary">·</span>
        <span className="font-mono text-[11px] text-text-tertiary">
          started {project.frontmatter.date}
        </span>
      </div>

      <h1 className="font-display text-3xl font-medium text-text-primary mb-3">
        {project.frontmatter.title}
      </h1>
      <p className="text-text-secondary mb-4 max-w-2xl">
        {project.frontmatter.summary}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-10">
        {project.frontmatter.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {project.frontmatter.github && (
          <a
            href={project.frontmatter.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[12px] text-text-primary border border-border-strong px-2.5 py-1 rounded-sm hover:bg-bg-hover transition-colors ml-1"
          >
            github ↗
          </a>
        )}
      </div>

      <article className="kb-prose">
        <MDXRemote source={project.body} options={mdxOptions} />
      </article>

      {project.journal.length > 0 && (
        <>
          <div className="my-16">
            <TraceDivider />
          </div>
          <h2 className="font-display text-xl font-medium text-text-primary mb-6">
            Journal
          </h2>
          <div className="space-y-10">
            {project.journal.map((entry) => (
              <div key={entry.entrySlug} id={`journal-${entry.entrySlug}`}>
                <div className="flex items-baseline gap-3 mb-2 scroll-mt-24">
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {entry.frontmatter.date}
                  </span>
                  <h3 className="font-display text-base font-medium text-text-primary">
                    {entry.frontmatter.title}
                  </h3>
                </div>
                <article className="kb-prose">
                  <MDXRemote source={entry.body} options={mdxOptions} />
                </article>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
