import Link from "next/link";
import { getAllProjects } from "@/lib/content/loader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { Starfield } from "@/components/ui/Starfield";
import { MeteorShower } from "@/components/ui/MeteorShower";

export default function Home() {
  const projects = getAllProjects().slice(0, 4);

  return (
    <div className="home-page">
      <MeteorShower />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
      <section className="relative overflow-hidden pt-20 pb-14">
        <Starfield />
        <div className="relative z-10">
          <p className="font-mono text-[13px] text-text-tertiary mb-4">
            university of waterloo &mdash; electrical engineering
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-medium leading-[1.15] text-text-primary max-w-2xl">
            Margaret&rsquo;s Journey in EE
          </h1>
          <p className="text-text-secondary max-w-xl mt-4 leading-relaxed">
            Building robotics, embedded systems, and PCB designs &mdash; and
            documenting everything I learn along the way.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              href="/projects"
              className="font-mono text-[13px] bg-text-primary text-bg px-4 py-2 rounded-sm hover:opacity-85 transition-opacity"
            >
              View projects
            </Link>
            <Link
              href="/resume"
              className="font-mono text-[13px] border border-border-strong text-text-primary px-4 py-2 rounded-sm hover:bg-bg-hover transition-colors"
            >
              Resume
            </Link>
          </div>
        </div>
      </section>

      <TraceDivider />

      <section className="py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-lg font-medium text-text-primary">
            Margaret&rsquo;s Projects
          </h2>
          <Link
            href="/projects"
            className="font-mono text-[12px] text-text-tertiary hover:text-text-primary transition-colors"
          >
            all projects -&gt;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      </div>
    </div>
  );
}
