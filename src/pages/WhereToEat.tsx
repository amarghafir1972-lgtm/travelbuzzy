import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, SlidersHorizontal, ChevronDown, Star, Bookmark } from "lucide-react";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";
import { whereToEatData, EAT_TYPES, type EatType } from "@/data/whereToEatData";

type SortKey = "recommended" | "price-asc" | "price-desc";

const TYPE_ICONS: Record<string, string> = {
  restaurant:  "🍽️",
  "fine-dining": "⭐",
  "street-food": "🌮",
  bar:         "🍸",
  cafe:        "☕",
};

const PRICE_LABELS: Record<number, string> = { 1: "$", 2: "$$", 3: "$$$" };
const PRICE_COLORS: Record<number, string> = {
  1: "text-emerald-600",
  2: "text-blue-600",
  3: "text-amber-600",
};

const TYPE_PILL_COLORS: Record<string, string> = {
  restaurant:    "bg-orange-100 text-orange-700",
  "fine-dining": "bg-purple-100 text-purple-700",
  "street-food": "bg-lime-100 text-lime-700",
  bar:           "bg-blue-100 text-blue-700",
  cafe:          "bg-amber-100 text-amber-700",
};

export default function WhereToEat() {
  const [typeFilter, setTypeFilter] = useState<EatType | "all">("all");
  const [destFilter, setDestFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("recommended");

  const destOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { slug: string; name: string }[] = [];
    for (const e of whereToEatData) {
      if (!seen.has(e.destSlug)) {
        seen.add(e.destSlug);
        opts.push({ slug: e.destSlug, name: e.destName });
      }
    }
    return opts.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    let list = whereToEatData;
    if (typeFilter !== "all") list = list.filter((e) => e.type === typeFilter);
    if (destFilter !== "all") list = list.filter((e) => e.destSlug === destFilter);
    switch (sort) {
      case "price-asc":  return [...list].sort((a, b) => a.priceLevel - b.priceLevel);
      case "price-desc": return [...list].sort((a, b) => b.priceLevel - a.priceLevel);
      default:           return [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    }
  }, [typeFilter, destFilter, sort]);

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-rose-500 pt-28 pb-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">Travel Guides</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Where to Eat & Drink
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            From Michelin-starred tasting menus to $1 street food stalls — the best places to eat and drink across 30 destinations, curated by people who've actually been.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/70 flex-wrap">
            <span>🍽️ {whereToEatData.length} picks</span>
            <span>·</span>
            <span>🌍 {destOptions.length} destinations</span>
            <span>·</span>
            <span>⭐ Michelin stars to street stalls</span>
          </div>
        </div>
      </div>

      {/* Type filter tabs + controls */}
      <div className="sticky top-[64px] z-30 bg-surface/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            {EAT_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTypeFilter(t.value)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  typeFilter === t.value
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {t.value !== "all" && <span className="text-base leading-none">{TYPE_ICONS[t.value]}</span>}
                {t.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 shrink-0">
              <div className="relative">
                <select
                  value={destFilter}
                  onChange={(e) => setDestFilter(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400/30"
                >
                  <option value="all">All destinations</option>
                  {destOptions.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none pl-8 pr-7 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400/30"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Budget first</option>
                  <option value="price-desc">Luxury first</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-muted-foreground mb-6">
          <span className="font-semibold text-foreground">{filtered.length}</span> place{filtered.length !== 1 ? "s" : ""}
          {typeFilter !== "all" ? ` · ${EAT_TYPES.find((t) => t.value === typeFilter)?.label}` : ""}
          {destFilter !== "all" ? ` · ${destOptions.find((d) => d.slug === destFilter)?.name}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-semibold text-foreground mb-1">No results match your filters</p>
            <p className="text-sm">Try a different type or destination.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.035, 0.4) }}
                className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Hero image */}
                <div className="relative h-32 overflow-hidden bg-muted">
                  <img
                    src={entry.destHero}
                    alt={entry.destName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Type pill */}
                  <span className={`absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_PILL_COLORS[entry.type]}`}>
                    <span>{TYPE_ICONS[entry.type]}</span>
                    {entry.type === "fine-dining" ? "Fine Dining" : entry.type === "street-food" ? "Street Food" : entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                  </span>

                  {/* Badge */}
                  {entry.badge && (
                    <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-white">
                      <Star className="h-2.5 w-2.5 fill-white" />
                      {entry.badge}
                    </span>
                  )}

                  {/* Destination + price */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 flex items-end justify-between">
                    <Link
                      href={`/destinations/${entry.destSlug}`}
                      className="flex items-center gap-1 text-xs text-white/90 font-semibold hover:text-white transition-colors"
                    >
                      <MapPin className="h-3 w-3 shrink-0" />
                      {entry.destName}, {entry.destCountry}
                    </Link>
                    <span className={`text-sm font-bold ${PRICE_COLORS[entry.priceLevel]} bg-white/90 rounded-full px-2 py-0.5 text-[11px]`}>
                      {PRICE_LABELS[entry.priceLevel]}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-1">
                    <h3 className="font-bold text-foreground text-sm leading-snug">{entry.name}</h3>
                    <p className="text-[11px] text-muted-foreground font-medium">{entry.cuisine}</p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed my-2.5 flex-1">{entry.description}</p>

                  {/* Must-try chips */}
                  <div className="mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1.5">Must try</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.mustTry.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flags */}
                  <div className="flex items-center gap-2 mb-3">
                    {entry.reservationRequired && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100 font-semibold">
                        📅 Reservation required
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/destinations/${entry.destSlug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 text-white text-xs font-bold py-2 rounded-xl hover:bg-orange-600 transition-colors"
                    >
                      View destination <ExternalLink className="h-3 w-3" />
                    </Link>
                    <button
                      className="px-3 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                      title="Save"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-muted/50 border-t border-border py-12 px-4 mt-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-lg font-bold text-foreground mb-2">Find the perfect place to sleep, too</p>
          <p className="text-sm text-muted-foreground mb-6">Browse hand-picked hotels across every budget across all 30 destinations.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/where-to-stay" className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
              🛏️ Where to stay
            </Link>
            <Link href="/compare" className="flex items-center gap-2 border border-border bg-background text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 hover:text-primary transition-colors">
              Compare destinations
            </Link>
            <Link href="/trip-planner" className="flex items-center gap-2 border border-border bg-background text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 hover:text-primary transition-colors">
              Build an itinerary
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  );
}
