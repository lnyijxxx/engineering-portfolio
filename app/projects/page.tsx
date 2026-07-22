import { getAllProjects } from "@/lib/content/loader";
import { ProjectCard } from "@/components/ui/ProjectCard";

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="font-mono text-[13px] text-text-tertiary mb-2">
        {projects.length} project{projects.length !== 1 ? "s" : ""}
      </p>
      <h1 className="font-display text-3xl font-medium text-text-primary mb-10">
        Margaret&rsquo;s Projects
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
