import { Plane } from "lucide-react";
import { Link } from "wouter";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

const navColumns = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "#destinations" },
      { label: "Hotels", href: "#hotels" },
      { label: "Deals of the Week", href: "/deals", internal: true },
      { label: "Travel Tips", href: "#tips" },
    ],
  },
  {
    title: "Top Regions",
    links: [
      { label: "Southeast Asia", href: "/regions/southeast-asia", internal: true },
      { label: "Europe", href: "/regions/europe", internal: true },
      { label: "Americas", href: "/regions/americas", internal: true },
      { label: "Middle East & Africa", href: "/regions/middle-east-africa", internal: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About TravelBuzzy", href: "/about", internal: true },
      { label: "Contact Us", href: "/contact", internal: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure", internal: true },
      { label: "Privacy Policy", href: "/privacy-policy", internal: true },
      { label: "Terms of Use", href: "/terms-of-use", internal: true },
      { label: "Cookie Policy", href: "/cookie-policy", internal: true },
      { label: "Sitemap", href: "/sitemap", internal: true },
    ],
  },
];

export default function Footer() {
  const { resetConsent } = useCookieConsent();

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="pt-14 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <div className="bg-white/10 p-2 rounded-lg">
                <Plane className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl text-white">TravelBuzzy</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Curated travel deals, destination guides, and honest hotel picks — for travelers who do their research.
            </p>
          </div>

          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/40 mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 hover:text-white transition-colors"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/65 hover:text-white transition-colors"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-white/35">
              &copy; {new Date().getFullYear()} TravelBuzzy. All rights reserved.
            </p>
            <button
              onClick={resetConsent}
              className="text-xs text-white/30 hover:text-white/60 underline underline-offset-2 transition-colors cursor-pointer"
              data-testid="button-footer-cookie-preferences"
            >
              Cookie Preferences
            </button>
          </div>
          <p className="text-xs text-white/30 max-w-lg leading-relaxed" id="disclosure">
            Affiliate Disclosure: TravelBuzzy may earn a commission when you book through links on this site, at no extra cost to you. We only recommend hotels and destinations we genuinely believe in.{" "}
            <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-white/60 transition-colors">
              Full disclosure
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
