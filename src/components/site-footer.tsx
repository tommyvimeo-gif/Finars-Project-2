import { useLocale } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:text-left sm:px-6">
        <p className="font-[family-name:var(--font-display)] text-lg">Fin Ars d.o.o.</p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t.footer}
        </p>
      </div>
    </footer>
  );
}