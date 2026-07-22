import Link from "next/link";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-sm tracking-tight text-text-primary flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-text-primary rounded-full" />
          margaret // ee
        </Link>

        <nav className="flex items-center gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-hover px-3 py-1.5 rounded-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="Search"
            className="ml-1 font-mono text-[13px] text-text-secondary hover:text-text-primary border border-border hover:border-border-strong px-3 py-1.5 rounded-sm transition-colors"
          >
            /search
          </Link>
        </nav>
      </div>
    </header>
  );
}
