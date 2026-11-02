import { Link } from "@tanstack/react-router";
import { localizeProject, useLocale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const text = localizeProject(project, locale);

  return (
    <Link
      to="/projekti/$slug"
      params={{ slug: project.slug }}
      className="group block"
    >
      <div className="overflow-hidden rounded-xl bg-card">
        <img
          src={project.cover}
          alt={text.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-xl leading-snug">
          {text.title}
        </h3>
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {text.location} · {text.category}
      </p>
    </Link>
  );
}