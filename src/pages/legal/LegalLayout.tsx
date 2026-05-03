import { Link } from "wouter";
import { Plane, ArrowLeft } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const legalNav = [
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, subtitle, lastUpdated, children }: LegalLayoutProps) {
  useSeo({ title, description: subtitle, url: undefined });
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Plane className="h-5 w-5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl text-primary">TravelBuzzy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                data-testid={`link-legal-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero band */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            data-testid="link-legal-back-home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to TravelBuzzy
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{title}</h1>
          <p className="text-white/65 text-base max-w-2xl leading-relaxed">{subtitle}</p>
          <p className="mt-4 text-white/40 text-xs">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16">
          {/* Sidebar nav (desktop) */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Legal Pages</p>
              <nav className="flex flex-col gap-1">
                {legalNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    data-testid={`link-legal-sidebar-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="prose prose-slate max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[0.9375rem]
            prose-li:text-muted-foreground prose-li:text-[0.9375rem]
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
          ">
            {children}
          </article>
        </div>
      </div>

      {/* Mini footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TravelBuzzy. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
