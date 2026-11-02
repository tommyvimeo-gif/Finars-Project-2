import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProject, projects } from "@/lib/projects";
import { localizeProject, useLocale } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/projekti/$slug")({
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) throw notFound();
  const { locale, t } = useLocale();
  const text = localizeProject(project, locale);
  const [active, setActive] = useState(project.images[0] ?? project.cover);
  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6">
        <Link
          to="/"
          hash="projekti"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> {t.back}
        </Link>
        <div className="mt-8 overflow-hidden rounded-xl bg-card">
          <img src={active} alt={text.title} className="aspect-[16/9] w-full object-cover" />
        </div>
        {project.images.length > 1 ? (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {project.images.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                className={`overflow-hidden rounded-md ${
                  active === src ? "ring-2 ring-ring" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-10 max-w-3xl">
          <p className="text-xs tracking-[0.18em] uppercase text-primary">
            {project.year} · {text.location} · {text.category}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {text.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {t.authors}: {project.authors}
          </p>
          <p className="mt-6 font-light leading-relaxed text-muted-foreground">{text.summary}</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}