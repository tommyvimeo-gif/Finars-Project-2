import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [sent, setSent] = useState(false);
  const { t } = useLocale();

  return (
    <div className="relative z-[1] min-h-screen bg-transparent text-foreground">
      <SiteHeader />

      <section className="relative min-h-[100dvh] overflow-hidden pt-16">
        <img
          src="/projects/hisa-v-gozdu/01.jpg"
          alt=""
          className="hero-drift absolute inset-[-4%] size-[108%] object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 sm:pb-24">
          <p className="mb-4 text-xs font-medium tracking-[0.18em] uppercase text-primary">
            {t.kicker}
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            {t.heroTitleBefore}
            <em className="italic text-primary">{t.heroTitleEm}</em>
            {t.heroTitleAfter}
          </h1>
          <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            {t.lede}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projekti">{t.viewProjects}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#kontakt">{t.getInTouch}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {t.stats.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-4xl tabular-nums sm:text-5xl">
                {n}
              </div>
              <div className="mt-2 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projekti" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary">
            {t.projectsKicker}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {t.projectsTitle}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="storitve" className="scroll-mt-20 bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary">
            {t.servicesKicker}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {t.servicesTitle}
          </h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((s) => (
              <article
                key={s[0]}
                className="rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-ring/40"
              >
                <p className="font-[family-name:var(--font-display)] text-sm text-primary">{s[0]}</p>
                <h3 className="mt-3 text-lg font-medium">{s[1]}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  {s[2]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="o-nas" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-center sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary">{t.aboutKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-6 font-light leading-relaxed text-muted-foreground">{t.aboutLead}</p>
            <p className="mt-4 font-light leading-relaxed text-muted-foreground">{t.aboutTeam}</p>
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="/brand/office.jpg"
              alt="Fin Ars"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="novice" className="scroll-mt-20 border-y border-border bg-secondary py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-[1.2fr_1fr] sm:items-center sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary">{t.newsKicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
              {t.newsTitle}
            </h2>
            <p className="mt-4 font-light leading-relaxed text-muted-foreground">{t.newsBody}</p>
            <a
              href="https://www.eu-skladi.si/"
              className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              eu-skladi.si <ArrowRight className="size-4" />
            </a>
          </div>
          <img
            src="/brand/news.jpg"
            alt="EU"
            className="w-full rounded-lg object-contain"
          />
        </div>
      </section>

      <section id="kontakt" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary">{t.contactKicker}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            {t.contactTitle}
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8 text-muted-foreground">
              <div>
                <p className="text-xs tracking-[0.12em] uppercase">{t.addressLabel}</p>
                <p className="mt-2 text-foreground">
                  Podvine 36
                  <br />
                  1410 Zagorje ob Savi
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.12em] uppercase">{t.phoneLabel}</p>
                <p className="mt-2">
                  <a className="text-foreground hover:text-primary" href="tel:+38641686959">
                    +386 41 686 959
                  </a>
                  <br />
                  <a className="text-foreground hover:text-primary" href="tel:+38631370172">
                    +386 31 370 172
                  </a>
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.12em] uppercase">{t.emailLabel}</p>
                <p className="mt-2">
                  <a className="text-foreground hover:text-primary" href="mailto:info@finars.si">
                    info@finars.si
                  </a>
                  <br />
                  <a
                    className="text-foreground hover:text-primary"
                    href="mailto:kristijan.cuk@finars.si"
                  >
                    kristijan.cuk@finars.si
                  </a>
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.12em] uppercase">{t.companyLabel}</p>
                <p className="mt-2 text-sm whitespace-pre-line">{t.companyBody}</p>
              </div>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">{t.nameLabel}</Label>
                <Input id="name" name="name" required placeholder={t.namePlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.emailField}</Label>
                <Input id="email" name="email" type="email" required placeholder={t.emailPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.messageLabel}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={t.messagePlaceholder}
                />
              </div>
              <Button type="submit" className="w-full" disabled={sent}>
                {sent ? t.sent : t.send}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
