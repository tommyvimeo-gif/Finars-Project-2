import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-xs font-semibold tracking-wide text-primary-foreground">
            FA
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            Fin Ars
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {t.nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <LangSwitch locale={locale} setLocale={setLocale} label={t.langLabel} />
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {t.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-lg text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function LangSwitch({
  locale,
  setLocale,
  label,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  label: string;
}) {
  return (
    <div className="flex items-center" role="group" aria-label={label}>
      {(["sl", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          className={cn(
            "min-h-11 min-w-11 text-xs font-medium tracking-[0.16em] uppercase",
            locale === code ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}