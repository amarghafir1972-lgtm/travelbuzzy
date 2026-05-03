import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X, Plane, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "@/components/SearchOverlay";


const continentGroups = [
  {
    name: "Asia",
    emoji: "🌏",
    destinations: [
      { slug: "tokyo",      name: "Tokyo",      flag: "🇯🇵" },
      { slug: "bali",       name: "Bali",       flag: "🇮🇩" },
      { slug: "kyoto",      name: "Kyoto",      flag: "🇯🇵" },
      { slug: "bangkok",    name: "Bangkok",    flag: "🇹🇭" },
      { slug: "phuket",     name: "Phuket",     flag: "🇹🇭" },
      { slug: "maldives",   name: "Maldives",   flag: "🇲🇻" },
      { slug: "singapore",  name: "Singapore",  flag: "🇸🇬" },
      { slug: "hanoi",      name: "Hanoi",      flag: "🇻🇳" },
      { slug: "dubai",      name: "Dubai",      flag: "🇦🇪" },
    ],
  },
  {
    name: "Europe",
    emoji: "🏛️",
    destinations: [
      { slug: "paris",        name: "Paris",        flag: "🇫🇷" },
      { slug: "barcelona",    name: "Barcelona",    flag: "🇪🇸" },
      { slug: "rome",         name: "Rome",         flag: "🇮🇹" },
      { slug: "amsterdam",    name: "Amsterdam",    flag: "🇳🇱" },
      { slug: "santorini",    name: "Santorini",    flag: "🇬🇷" },
      { slug: "lisbon",       name: "Lisbon",       flag: "🇵🇹" },
      { slug: "amalfi-coast", name: "Amalfi Coast", flag: "🇮🇹" },
      { slug: "prague",       name: "Prague",       flag: "🇨🇿" },
      { slug: "ibiza",        name: "Ibiza",        flag: "🇪🇸" },
      { slug: "istanbul",     name: "Istanbul",     flag: "🇹🇷" },
      { slug: "reykjavik",    name: "Reykjavik",    flag: "🇮🇸" },
      { slug: "dubrovnik",    name: "Dubrovnik",    flag: "🇭🇷" },
    ],
  },
  {
    name: "Americas",
    emoji: "🌎",
    destinations: [
      { slug: "new-york",       name: "New York",       flag: "🇺🇸" },
      { slug: "hawaii",         name: "Hawaii",         flag: "🇺🇸" },
      { slug: "mexico-city",    name: "Mexico City",    flag: "🇲🇽" },
      { slug: "rio-de-janeiro", name: "Rio de Janeiro", flag: "🇧🇷" },
      { slug: "miami",          name: "Miami",          flag: "🇺🇸" },
    ],
  },
  {
    name: "Africa",
    emoji: "🌍",
    destinations: [
      { slug: "cape-town", name: "Cape Town", flag: "🇿🇦" },
      { slug: "marrakech", name: "Marrakech", flag: "🇲🇦" },
    ],
  },
  {
    name: "Oceania",
    emoji: "🌊",
    destinations: [
      { slug: "queenstown", name: "Queenstown", flag: "🇳🇿" },
      { slug: "bora-bora",  name: "Bora Bora",  flag: "🇵🇫" },
    ],
  },
];

const destinationCategories = [
  {
    slug: "beach-islands",
    label: "Beach & Islands",
    emoji: "🏖️",
    destinations: [
      { slug: "bali",         name: "Bali",         flag: "🇮🇩" },
      { slug: "maldives",     name: "Maldives",     flag: "🇲🇻" },
      { slug: "santorini",    name: "Santorini",    flag: "🇬🇷" },
      { slug: "phuket",       name: "Phuket",       flag: "🇹🇭" },
      { slug: "ibiza",        name: "Ibiza",        flag: "🇪🇸" },
      { slug: "bora-bora",    name: "Bora Bora",    flag: "🇵🇫" },
    ],
  },
  {
    slug: "city-breaks",
    label: "City Breaks",
    emoji: "🏙️",
    destinations: [
      { slug: "tokyo",        name: "Tokyo",        flag: "🇯🇵" },
      { slug: "paris",        name: "Paris",        flag: "🇫🇷" },
      { slug: "barcelona",    name: "Barcelona",    flag: "🇪🇸" },
      { slug: "new-york",     name: "New York",     flag: "🇺🇸" },
      { slug: "amsterdam",    name: "Amsterdam",    flag: "🇳🇱" },
      { slug: "dubai",        name: "Dubai",        flag: "🇦🇪" },
    ],
  },
  {
    slug: "adventure-nature",
    label: "Adventure & Nature",
    emoji: "🌿",
    destinations: [
      { slug: "queenstown",   name: "Queenstown",   flag: "🇳🇿" },
      { slug: "reykjavik",    name: "Reykjavik",    flag: "🇮🇸" },
      { slug: "cape-town",    name: "Cape Town",    flag: "🇿🇦" },
      { slug: "hawaii",       name: "Hawaii",       flag: "🇺🇸" },
      { slug: "bali",         name: "Bali",         flag: "🇮🇩" },
      { slug: "marrakech",    name: "Marrakech",    flag: "🇲🇦" },
    ],
  },
  {
    slug: "food-culture",
    label: "Food & Culture",
    emoji: "🍜",
    destinations: [
      { slug: "bangkok",      name: "Bangkok",      flag: "🇹🇭" },
      { slug: "singapore",    name: "Singapore",    flag: "🇸🇬" },
      { slug: "rome",         name: "Rome",         flag: "🇮🇹" },
      { slug: "hanoi",        name: "Hanoi",        flag: "🇻🇳" },
      { slug: "lisbon",       name: "Lisbon",       flag: "🇵🇹" },
      { slug: "mexico-city",  name: "Mexico City",  flag: "🇲🇽" },
    ],
  },
  {
    slug: "luxury-romance",
    label: "Luxury & Romance",
    emoji: "💎",
    destinations: [
      { slug: "maldives",     name: "Maldives",     flag: "🇲🇻" },
      { slug: "bora-bora",    name: "Bora Bora",    flag: "🇵🇫" },
      { slug: "santorini",    name: "Santorini",    flag: "🇬🇷" },
      { slug: "dubai",        name: "Dubai",        flag: "🇦🇪" },
      { slug: "amalfi-coast", name: "Amalfi Coast", flag: "🇮🇹" },
      { slug: "kyoto",        name: "Kyoto",        flag: "🇯🇵" },
    ],
  },
  {
    slug: "budget-escapes",
    label: "Budget Escapes",
    emoji: "💸",
    destinations: [
      { slug: "hanoi",        name: "Hanoi",        flag: "🇻🇳" },
      { slug: "bangkok",      name: "Bangkok",      flag: "🇹🇭" },
      { slug: "lisbon",       name: "Lisbon",       flag: "🇵🇹" },
      { slug: "marrakech",    name: "Marrakech",    flag: "🇲🇦" },
      { slug: "mexico-city",  name: "Mexico City",  flag: "🇲🇽" },
      { slug: "prague",       name: "Prague",       flag: "🇨🇿" },
    ],
  },
];

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRegionsOpen, setMobileRegionsOpen] = useState(false);
  const [mobileDestsOpen, setMobileDestsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [destsOpen, setDestsOpen] = useState(false);
  const regionsRef = useRef<HTMLDivElement>(null);
  const destsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (regionsRef.current && !regionsRef.current.contains(e.target as Node)) {
        setRegionsOpen(false);
      }
      if (destsRef.current && !destsRef.current.contains(e.target as Node)) {
        setDestsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface/95 backdrop-blur-md ${
          isScrolled ? "border-b border-border shadow-sm py-3" : "py-5 border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Plane className="h-6 w-6 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-primary">TravelBuzzy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">

            {/* Destinations dropdown */}
            <div ref={destsRef} className="relative">
              <button
                onClick={() => { setDestsOpen(!destsOpen); setRegionsOpen(false); }}
                className={`flex items-center gap-1 font-medium transition-colors text-sm ${destsOpen ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                Destinations
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${destsOpen ? "rotate-180" : ""}`} />
              </button>

              {destsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] bg-surface rounded-2xl border border-border shadow-xl overflow-hidden z-50">
                  <div className="px-5 pt-3 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">Browse by continent</p>
                  </div>
                  <div className="grid grid-cols-5 gap-px bg-border mx-3 mb-3 rounded-xl overflow-hidden border border-border">
                    {continentGroups.map((continent) => (
                      <div key={continent.name} className="bg-surface p-3">
                        <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-border">
                          <span className="text-sm">{continent.emoji}</span>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-foreground">{continent.name}</p>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {continent.destinations.map((d) => (
                            <Link
                              key={d.slug}
                              href={`/destinations/${d.slug}`}
                              onClick={() => setDestsOpen(false)}
                              className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg hover:bg-muted transition-colors group"
                            >
                              <span className="text-sm leading-none">{d.flag}</span>
                              <span className="text-[12px] text-foreground group-hover:text-primary transition-colors font-medium leading-tight">{d.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border px-4 py-2.5 bg-muted/40 flex items-center justify-between gap-4">
                    <Link
                      href="/#destinations"
                      onClick={() => setDestsOpen(false)}
                      className="text-[11px] text-primary font-semibold hover:underline underline-offset-2"
                    >
                      View all 30 destinations →
                    </Link>
                    <Link
                      href="/when-to-go"
                      onClick={() => setDestsOpen(false)}
                      className="text-[11px] text-muted-foreground font-semibold hover:text-primary hover:underline underline-offset-2 whitespace-nowrap"
                    >
                      When to go →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Regions dropdown */}
            <div ref={regionsRef} className="relative">
              <button
                onClick={() => setRegionsOpen(!regionsOpen)}
                className={`flex items-center gap-1 font-medium transition-colors text-sm ${regionsOpen ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                Travel
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${regionsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {regionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-surface rounded-2xl border border-border shadow-xl overflow-hidden z-50">
                  {/* Topic quick-links */}
                  <div className="px-3 pt-3 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60 mb-2">Explore</p>
                    <div className="grid grid-cols-5 gap-1">
                      {[
                        { label: "Where to Stay",       icon: "🛏️", href: "/where-to-stay" },
                        { label: "Eat & Drink",         icon: "🍽️", href: "/where-to-eat"  },
                        { label: "Spa",                 icon: "💆", href: "/spa"           },
                        { label: "Travel Guides",       icon: "🗺️", href: "/guides"        },
                        { label: "Tips & Hacks",        icon: "💡", href: "/tips"          },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setRegionsOpen(false)}
                          className="flex flex-col items-center gap-1 px-1.5 py-2 rounded-xl bg-muted/50 hover:bg-primary/8 hover:border-primary/20 border border-transparent transition-colors group text-center"
                        >
                          <span className="text-lg leading-none">{item.icon}</span>
                          <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors leading-tight">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/hotels" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Hotels</Link>
            <Link href="/deals" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Deals</Link>
            <Link href="/tips" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Tips</Link>
            <Link href="/trip-planner" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Plan</Link>

            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={() => setSearchOpen(true)}
                data-testid="button-header-search"
                aria-label="Search"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-bold bg-surface border border-border rounded px-1.5 py-0.5 ml-1">
                  <span>⌘</span>K
                </kbd>
              </button>

              <Link href="/affiliate-disclosure" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                *Affiliate Disclosure
              </Link>
              <Button
                className="bg-accent hover:bg-[#E85D6A] text-white font-semibold shadow-sm transition-all"
                data-testid="button-nav-deals"
                asChild
              >
                <Link href="/#deals">See Today's Deals</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              data-testid="button-mobile-search"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-border shadow-md animate-in slide-in-from-top-2 p-4">
            <nav className="flex flex-col gap-1">
              {[
                { label: "Destinations", href: "/#destinations" },
                { label: "Hotels", href: "/hotels" },
                { label: "Deals", href: "/deals" },
                { label: "Tips", href: "/tips" },
                { label: "Plan", href: "/trip-planner" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground font-medium px-3 py-2.5 hover:bg-muted rounded-lg transition-colors text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Destinations accordion in mobile */}
              <div>
                <button
                  onClick={() => setMobileDestsOpen(!mobileDestsOpen)}
                  className="w-full flex items-center justify-between text-foreground font-medium px-3 py-2.5 hover:bg-muted rounded-lg transition-colors text-sm"
                >
                  <span>Destinations</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileDestsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileDestsOpen && (
                  <div className="ml-3 mt-1 border-l-2 border-primary/20 pl-3 space-y-3">
                    {continentGroups.map((continent) => (
                      <div key={continent.name}>
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
                          <span>{continent.emoji}</span>{continent.name}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {continent.destinations.map((d) => (
                            <Link
                              key={d.slug}
                              href={`/destinations/${d.slug}`}
                              onClick={() => { setMobileMenuOpen(false); setMobileDestsOpen(false); }}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                            >
                              <span>{d.flag}</span>
                              <span>{d.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/#destinations"
                      onClick={() => { setMobileMenuOpen(false); setMobileDestsOpen(false); }}
                      className="block text-xs text-primary font-semibold pt-1"
                    >
                      All 30 destinations →
                    </Link>
                  </div>
                )}
              </div>

            {/* Regions accordion in mobile */}
              <div>
                <button
                  onClick={() => setMobileRegionsOpen(!mobileRegionsOpen)}
                  className="w-full flex items-center justify-between text-foreground font-medium px-3 py-2.5 hover:bg-muted rounded-lg transition-colors text-sm"
                >
                  <span>Travel</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileRegionsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileRegionsOpen && (
                  <div className="ml-3 mt-1 border-l-2 border-primary/20 pl-3 space-y-3">
                    {/* Topic quick-links */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1.5">Explore</p>
                      <div className="flex flex-col gap-0.5">
                        {[
                          { label: "Where to Stay",   icon: "🛏️", href: "/where-to-stay" },
                          { label: "Eat & Drink",     icon: "🍽️", href: "/where-to-eat"  },
                          { label: "Spa",             icon: "💆", href: "/spa"           },
                          { label: "Travel Guides",   icon: "🗺️", href: "/guides"        },
                          { label: "Tips & Hacks",    icon: "💡", href: "/tips"          },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => { setMobileMenuOpen(false); setMobileRegionsOpen(false); }}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                          >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 mt-1 border-t border-border flex flex-col gap-2">
                <Button
                  className="w-full bg-accent hover:bg-[#E85D6A] text-white font-semibold"
                  data-testid="button-mobile-deals"
                  asChild
                >
                  <Link href="/#deals" onClick={() => setMobileMenuOpen(false)}>See Today's Deals</Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground">*Prices may include affiliate commissions</p>
              </div>
            </nav>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
