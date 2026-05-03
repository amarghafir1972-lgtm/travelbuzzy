import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import {
  Home, Tag, MapPin, Users, Mail, FileText, Shield, ScrollText,
  Cookie, Map, Globe, ChevronRight, ExternalLink, Clock, TrendingUp
} from "lucide-react";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";

type SitemapEntry = {
  label: string;
  href: string;
  description: string;
  changefreq: string;
  priority: string;
  external?: boolean;
};

type SitemapSection = {
  title: string;
  icon: typeof Home;
  color: string;
  entries: SitemapEntry[];
};

const sections: SitemapSection[] = [
  {
    title: "Main Pages",
    icon: Home,
    color: "bg-primary/10 text-primary",
    entries: [
      { label: "Homepage", href: "/", description: "Curated travel deals, destination guides, and hotel picks — updated daily.", changefreq: "Daily", priority: "1.0" },
      { label: "Deals of the Week", href: "/deals", description: "8 handpicked hotel deals, flight sales, and vacation packages — updated every Monday.", changefreq: "Weekly", priority: "0.9" },
    ],
  },
  {
    title: "Destination Guides",
    icon: Globe,
    color: "bg-accent/10 text-accent",
    entries: [
      { label: "Bali, Indonesia", href: "/destinations/bali", description: "Rice terraces, temples, beach clubs, and the best hotels for every budget.", changefreq: "Monthly", priority: "0.85" },
      { label: "Santorini, Greece", href: "/destinations/santorini", description: "Caldera views, whitewashed villages, wine, and where to stay for every budget.", changefreq: "Monthly", priority: "0.85" },
      { label: "Tokyo, Japan", href: "/destinations/tokyo", description: "Neon skylines, ancient shrines, and the world's best food city — fully covered.", changefreq: "Monthly", priority: "0.85" },
      { label: "Maldives", href: "/destinations/maldives", description: "Overwater bungalows, local guesthouses, and honest resort comparisons.", changefreq: "Monthly", priority: "0.85" },
      { label: "Paris, France", href: "/destinations/paris", description: "Arrondissements, gastronomy, and the hotels locals actually use.", changefreq: "Monthly", priority: "0.85" },
    ],
  },
  {
    title: "Company",
    icon: Users,
    color: "bg-emerald-100 text-emerald-700",
    entries: [
      { label: "About TravelBuzzy", href: "/about", description: "Our mission, editorial standards, team, and values.", changefreq: "Monthly", priority: "0.6" },
      { label: "Contact Us", href: "/contact", description: "Reader questions, press enquiries, and affiliate partnership applications.", changefreq: "Monthly", priority: "0.5" },
    ],
  },
  {
    title: "Legal",
    icon: Shield,
    color: "bg-slate-100 text-slate-600",
    entries: [
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure", description: "How TravelBuzzy earns commissions and our editorial independence policy.", changefreq: "Yearly", priority: "0.3" },
      { label: "Privacy Policy", href: "/privacy-policy", description: "How we collect, use, and protect your personal data.", changefreq: "Yearly", priority: "0.3" },
      { label: "Terms of Use", href: "/terms-of-use", description: "Terms governing your use of TravelBuzzy and its content.", changefreq: "Yearly", priority: "0.3" },
      { label: "Cookie Policy", href: "/cookie-policy", description: "What cookies we use, why, and how to control them.", changefreq: "Yearly", priority: "0.3" },
    ],
  },
];

const priorityColor = (p: string) => {
  const n = parseFloat(p);
  if (n >= 0.9) return "bg-primary text-white";
  if (n >= 0.8) return "bg-accent text-white";
  if (n >= 0.6) return "bg-amber-500 text-white";
  return "bg-muted text-muted-foreground";
};

export default function SitemapPage() {
  useSeo({
    title: "Sitemap",
    description: "Every page on TravelBuzzy — destination guides, deals, company pages, and legal documents — organised by section.",
    url: "/sitemap",
  });

  return (
    <>
      <StickyHeader />

      <main className="pt-[72px]">
        {/* Hero */}
        <div className="bg-primary text-white py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ChevronRight className="h-4 w-4 rotate-180" /> Back to TravelBuzzy
            </Link>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl shrink-0">
                <Map className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="font-display text-4xl font-bold mb-2">Site Map</h1>
                <p className="text-white/75 text-lg max-w-xl">
                  Every page on TravelBuzzy — organised by section so you can find what you're looking for, or so Google can.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="bg-muted/60 border-b border-border">
          <div className="container mx-auto max-w-5xl px-4 py-4 flex flex-wrap gap-6">
            {[
              { icon: FileText, label: "Total pages", value: `${sections.reduce((a, s) => a + s.entries.length, 0) + 1}` },
              { icon: Globe, label: "Destination guides", value: "5" },
              { icon: Tag, label: "Deals updated", value: "Weekly" },
              { icon: Clock, label: "Last updated", value: "2 May 2026" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{label}:</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener"
              data-testid="link-xml-sitemap"
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              XML Sitemap
            </a>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 py-12 space-y-10">
          {sections.map((section, si) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: si * 0.07 }}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${section.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground">{section.title}</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-semibold">
                    {section.entries.length} page{section.entries.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Entries table */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden divide-y divide-border">
                  {section.entries.map((entry, ei) => (
                    <motion.div
                      key={entry.href}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: si * 0.07 + ei * 0.04 }}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors group"
                    >
                      {/* Page info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={entry.href}
                          data-testid={`link-sitemap-${entry.href.replace(/\//g, "-")}`}
                          className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 text-sm"
                        >
                          {entry.label}
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{entry.description}</p>
                      </div>

                      {/* Meta */}
                      <div className="hidden sm:flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Crawl</p>
                          <p className="text-xs font-semibold text-foreground">{entry.changefreq}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority</p>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${priorityColor(entry.priority)}`}>
                            {entry.priority}
                          </span>
                        </div>
                        <div className="text-right w-40">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">URL</p>
                          <p className="text-xs font-mono text-muted-foreground truncate">travelbuzzy.com{entry.href}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* SEO note */}
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">For search engines</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The machine-readable XML sitemap is available at{" "}
                  <a href="/sitemap.xml" target="_blank" rel="noopener" className="text-primary font-semibold hover:underline font-mono">
                    travelbuzzy.com/sitemap.xml
                  </a>
                  . Submit it in{" "}
                  <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="text-primary font-semibold hover:underline">
                    Google Search Console
                  </a>{" "}
                  and{" "}
                  <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener" className="text-primary font-semibold hover:underline">
                    Bing Webmaster Tools
                  </a>{" "}
                  after deploying to production to accelerate indexing of all destination and deals pages.
                </p>
                <p className="text-xs text-muted-foreground">
                  Priority values range from 0.0 (lowest) to 1.0 (highest). The homepage and Deals page are marked 1.0 and 0.9 — the two most important pages for affiliate conversion and SEO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
