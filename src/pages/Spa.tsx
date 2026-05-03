import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, SlidersHorizontal, ChevronDown, Star, Clock } from "lucide-react";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";
import { spaData, SPA_TYPES, type SpaType } from "@/data/spaData";

type SortKey = "recommended" | "price-asc" | "price-desc";

const PRICE_LABELS: Record<number, string> = { 1: "$", 2: "$$", 3: "$$$" };
const PRICE_DESC: Record<number, string> = { 1: "Budget", 2: "Mid-range", 3: "Luxury" };
const PRICE_COLORS: Record<number, string> = {
  1: "bg-emerald-100 text-emerald-700",
  2: "bg-blue-100 text-blue-700",
  3: "bg-amber-100 text-amber-700",
};

const TYPE_COLORS: Record<string, string> = {
  "resort-spa":       "bg-purple-100 text-purple-700",
  "thermal":          "bg-orange-100 text-orange-700",
  "wellness-retreat": "bg-teal-100 text-teal-700",
  "hammam":           "bg-rose-100 text-rose-700",
  "traditional":      "bg-lime-100 text-lime-700",
  "day-spa":          "bg-sky-100 text-sky-700",
};

const TYPE_ICONS: Record<string, string> = {
  "resort-spa":       "🏨",
  "thermal":          "♨️",
  "wellness-retreat": "🧘",
  "hammam":           "🕌",
  "traditional":      "🌿",
  "day-spa":          "✨",
};

const TYPE_LABELS: Record<string, string> = {
  "resort-spa":       "Resort Spa",
  "thermal":          "Thermal & Onsen",
  "wellness-retreat": "Wellness Retreat",
  "hammam":           "Hammam",
  "traditional":      "Traditional",
  "day-spa":          "Day Spa",
};

export default function Spa() {
  const [typeFilter, setTypeFilter] = useState<SpaType | "all">("all");
  const [destFilter, setDestFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("recommended");

  const destOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { slug: string; name: string }[] = [];
    for (const e of spaData) {
      if (!seen.has(e.destSlug)) {
        seen.add(e.destSlug);
        opts.push({ slug: e.destSlug, name: e.destName });
      }
    }
    return opts.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    let list = spaData;
    if (typeFilter !== "all") list = list.filter((e) => e.type === typeFilter);
    if (destFilter !== "all") list = list.filter((e) => e.destSlug === destFilter);
    switch (sort) {
      case "price-asc":  return [...list].sort((a, b) => a.priceLevel - b.priceLevel);
      case "price-desc": return [...list].sort((a, b) => b.priceLevel - a.priceLevel);
      default:           return [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    }
  }, [typeFilter, destFilter, sort]);

  const activeTypeLabel = SPA_TYPES.find((t) => t.value === typeFilter);

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 pt-28 pb-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">Travel Guides</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Spa & Wellness
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            From ancient hammams and mountain onsen to overwater treatment villas and volcanic thermal pools — the world's most restorative experiences, curated across 30 destinations.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/70 flex-wrap">
            <span>💆 {spaData.length} experiences</span>
            <span>·</span>
            <span>🌍 {destOptions.length} destinations</span>
            <span>·</span>
            <span>♨️ Thermal · Hammam · Retreat · Resort</span>
          </div>
        </div>
      </div>

      {/* Type tabs + filters */}
      <div className="sticky top-[64px] z-30 bg-surface/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            {SPA_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTypeFilter(t.value)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  typeFilter === t.value
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <span className="text-base leading-none">{t.icon}</span>
                {t.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 shrink-0">
              <div className="relative">
                <select
                  value={destFilter}
                  onChange={(e) => setDestFilter(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400/30"
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
                  className="appearance-none pl-8 pr-7 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400/30"
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
          <span className="font-semibold text-foreground">{filtered.length}</span> experience{filtered.length !== 1 ? "s" : ""}
          {typeFilter !== "all" ? ` · ${activeTypeLabel?.icon} ${activeTypeLabel?.label}` : ""}
          {destFilter !== "all" ? ` · ${destOptions.find((d) => d.slug === destFilter)?.name}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">💆</p>
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
                <div className="relative h-36 overflow-hidden bg-muted">
                  <img
                    src={entry.destHero}
                    alt={entry.destName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Type pill */}
                  <span className={`absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[entry.type]}`}>
                    <span>{TYPE_ICONS[entry.type]}</span>
                    {TYPE_LABELS[entry.type]}
                  </span>

                  {/* Badge */}
                  {entry.badge && (
                    <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-600 text-white">
                      <Star className="h-2.5 w-2.5 fill-white" />
                      {entry.badge}
                    </span>
                  )}

                  {/* Bottom row */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 flex items-end justify-between">
                    <Link
                      href={`/destinations/${entry.destSlug}`}
                      className="flex items-center gap-1 text-xs text-white/90 font-semibold hover:text-white transition-colors"
                    >
                      <MapPin className="h-3 w-3 shrink-0" />
                      {entry.destName}, {entry.destCountry}
                    </Link>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${PRICE_COLORS[entry.priceLevel]}`}>
                      {PRICE_LABELS[entry.priceLevel]} · {PRICE_DESC[entry.priceLevel]}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-1">{entry.name}</h3>

                  {/* Duration */}
                  {entry.duration && (
                    <div className="flex items-center gap-1 mb-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground font-medium">{entry.duration}</span>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{entry.description}</p>

                  {/* Must-try treatments */}
                  <div className="mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1.5">Signature experiences</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.mustTry.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking flag */}
                  {entry.bookingRequired && (
                    <p className="text-[10px] text-amber-600 font-semibold mb-3 flex items-center gap-1">
                      📅 Advance booking required
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/destinations/${entry.destSlug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-violet-600 text-white text-xs font-bold py-2 rounded-xl hover:bg-violet-700 transition-colors"
                    >
                      View destination <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/trip-planner"
                      className="px-3 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-violet-600 hover:border-violet-300 transition-colors"
                      title="Add to trip"
                    >
                      + Trip
                    </Link>
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
          <p className="text-lg font-bold text-foreground mb-2">Planning a wellness trip?</p>
          <p className="text-sm text-muted-foreground mb-6">Find the best time to visit, compare destinations, or build a full relaxation itinerary.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/where-to-stay" className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
              🛏️ Where to stay
            </Link>
            <Link href="/when-to-go" className="flex items-center gap-2 border border-border bg-background text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 hover:text-primary transition-colors">
              Best time to visit
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
