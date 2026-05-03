import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, DollarSign, MapPin, ExternalLink, SlidersHorizontal, ChevronDown } from "lucide-react";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";
import destinations from "@/data/destinations";

type Tier = "all" | "budget" | "mid" | "luxury";
type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const TIER_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid-Range",
  luxury: "Luxury",
};

const TIER_COLORS: Record<string, string> = {
  budget: "bg-emerald-100 text-emerald-700",
  mid: "bg-blue-100 text-blue-700",
  luxury: "bg-amber-100 text-amber-700",
};

const PRICE_ICONS: Record<string, string> = {
  budget: "$",
  mid: "$$",
  luxury: "$$$",
};

type FlatHotel = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  tier: "budget" | "mid" | "luxury";
  badge?: string;
  pricePerNight: number;
  stars: number;
  reviewScore: number;
  reviewCount: number;
  bookUrl: string;
  destSlug: string;
  destName: string;
  destCountry: string;
  destHero: string;
};

function buildHotelList(): FlatHotel[] {
  const list: FlatHotel[] = [];
  for (const dest of destinations) {
    for (const h of dest.hotels) {
      list.push({
        ...h,
        destSlug: dest.slug,
        destName: dest.name,
        destCountry: dest.country,
        destHero: dest.heroImage,
      });
    }
  }
  return list;
}

const ALL_HOTELS = buildHotelList();

function StarRow({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < count ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30 fill-muted-foreground/10"}`}
        />
      ))}
    </span>
  );
}

export default function WhereToStay() {
  const [tier, setTier] = useState<Tier>("all");
  const [destFilter, setDestFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("recommended");

  const destOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { slug: string; name: string }[] = [];
    for (const h of ALL_HOTELS) {
      if (!seen.has(h.destSlug)) {
        seen.add(h.destSlug);
        opts.push({ slug: h.destSlug, name: h.destName });
      }
    }
    return opts.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    let list = ALL_HOTELS;
    if (tier !== "all") list = list.filter((h) => h.tier === tier);
    if (destFilter !== "all") list = list.filter((h) => h.destSlug === destFilter);
    switch (sort) {
      case "price-asc":  return [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
      case "price-desc": return [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
      case "rating":     return [...list].sort((a, b) => b.reviewScore - a.reviewScore);
      default:           return [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.reviewScore - a.reviewScore);
    }
  }, [tier, destFilter, sort]);

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/90 to-primary pt-28 pb-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">Travel Guides</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Where to Stay
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Hand-picked hotels across every budget — from social hostels under $30 to overwater villas pushing $400. Real picks, real prices.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-primary-foreground/70">
            <span>🛏️ {ALL_HOTELS.length} hotels</span>
            <span>·</span>
            <span>🌍 {destOptions.length} destinations</span>
            <span>·</span>
            <span>✅ Verified picks</span>
          </div>
        </div>
      </div>

      {/* Tier tabs */}
      <div className="sticky top-[64px] z-30 bg-surface/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            {(["all", "budget", "mid", "luxury"] as Tier[]).map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  tier === t
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {t === "all" ? "All tiers" : t === "mid" ? "Mid-Range" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              {/* Destination filter */}
              <div className="relative">
                <select
                  value={destFilter}
                  onChange={(e) => setDestFilter(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="all">All destinations</option>
                  {destOptions.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
              {/* Sort */}
              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none pl-8 pr-7 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Cheapest first</option>
                  <option value="price-desc">Priciest first</option>
                  <option value="rating">Top rated</option>
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
          <span className="font-semibold text-foreground">{filtered.length}</span> hotel{filtered.length !== 1 ? "s" : ""}
          {tier !== "all" ? ` · ${tier === "mid" ? "Mid-Range" : tier.charAt(0).toUpperCase() + tier.slice(1)}` : ""}
          {destFilter !== "all" ? ` · ${destOptions.find((d) => d.slug === destFilter)?.name}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-foreground mb-1">No hotels match your filters</p>
            <p className="text-sm">Try a different tier or destination.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((hotel, i) => (
              <motion.div
                key={`${hotel.destSlug}-${hotel.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.4) }}
                className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Destination image strip */}
                <div className="relative h-32 overflow-hidden bg-muted">
                  <img
                    src={hotel.destHero}
                    alt={hotel.destName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Tier badge */}
                  <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${TIER_COLORS[hotel.tier]}`}>
                    {TIER_LABELS[hotel.tier]}
                  </span>

                  {/* Editor badge */}
                  {hotel.badge && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-white">
                      {hotel.badge}
                    </span>
                  )}

                  {/* Destination label */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-white/70" />
                    <Link
                      href={`/destinations/${hotel.destSlug}`}
                      className="text-xs text-white/90 font-semibold hover:text-white transition-colors"
                    >
                      {hotel.destName}, {hotel.destCountry}
                    </Link>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1">
                    <span className="text-white font-bold text-sm">${hotel.pricePerNight}</span>
                    <span className="text-white/60 text-[10px]">/night</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-foreground text-sm leading-snug">{hotel.name}</h3>
                    <span className="shrink-0 text-[11px] font-bold text-muted-foreground">{PRICE_ICONS[hotel.tier]}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <StarRow count={hotel.stars} />
                    <span className="text-xs font-bold text-foreground">{hotel.reviewScore.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">({hotel.reviewCount.toLocaleString()} reviews)</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{hotel.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.highlights.map((h) => (
                      <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={hotel.bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-bold py-2 rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      Book now <ExternalLink className="h-3 w-3" />
                    </a>
                    <Link
                      href={`/destinations/${hotel.destSlug}`}
                      className="px-3 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      Destination →
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
          <p className="text-lg font-bold text-foreground mb-2">Not sure where to go?</p>
          <p className="text-sm text-muted-foreground mb-6">Compare destinations side by side, check the best time to visit, or build a full itinerary.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/compare" className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
              Compare destinations
            </Link>
            <Link href="/when-to-go" className="flex items-center gap-2 border border-border bg-background text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 hover:text-primary transition-colors">
              When to go
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
