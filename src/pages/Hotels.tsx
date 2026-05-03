import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import {
  Star, ExternalLink, MapPin, ChevronRight, Hotel,
  ArrowUpDown, TrendingUp, BadgeDollarSign, Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import destinations from "@/data/destinations";
import type { Hotel as HotelType, Destination } from "@/data/destinations";

type RegionSlug = "all" | string;
type TierFilter = "all" | "budget" | "mid" | "luxury";
type SortOrder = "rating" | "price-asc" | "price-desc";

interface FlatHotel extends HotelType {
  destination: Destination;
}

const allHotels: FlatHotel[] = destinations.flatMap((d) =>
  d.hotels.map((h) => ({ ...h, destination: d }))
);

const tierLabel: Record<string, string> = { budget: "Budget", mid: "Mid-range", luxury: "Luxury" };

const tierBadge: Record<string, string> = {
  budget: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  mid: "bg-sky-50 text-sky-700 border border-sky-200",
  luxury: "bg-amber-50 text-amber-700 border border-amber-200",
};

const tierIcon: Record<string, typeof BadgeDollarSign> = {
  budget: BadgeDollarSign,
  mid: TrendingUp,
  luxury: Crown,
};

const destFlags: Record<string, string> = {
  bali: "🇮🇩", santorini: "🇬🇷", tokyo: "🇯🇵", maldives: "🇲🇻", paris: "🇫🇷",
  bangkok: "🇹🇭", barcelona: "🇪🇸", dubai: "🇦🇪", rome: "🇮🇹", kyoto: "🇯🇵",
  phuket: "🇹🇭", amsterdam: "🇳🇱", "cape-town": "🇿🇦", "new-york": "🇺🇸", lisbon: "🇵🇹",
  "amalfi-coast": "🇮🇹", marrakech: "🇲🇦", singapore: "🇸🇬", prague: "🇨🇿", ibiza: "🇪🇸",
  "bora-bora": "🇵🇫", istanbul: "🇹🇷", queenstown: "🇳🇿", hawaii: "🇺🇸", hanoi: "🇻🇳",
  reykjavik: "🇮🇸", "mexico-city": "🇲🇽", "rio-de-janeiro": "🇧🇷", dubrovnik: "🇭🇷", miami: "🇺🇸",
};

const regions: { slug: RegionSlug; label: string; flag: string }[] = [
  { slug: "all", label: "All Destinations", flag: "🌍" },
  ...destinations.map((d) => ({ slug: d.slug, label: d.name, flag: destFlags[d.slug] ?? "🌍" })),
];

const tiers: { slug: TierFilter; label: string }[] = [
  { slug: "all",     label: "All" },
  { slug: "budget",  label: "Budget" },
  { slug: "mid",     label: "Mid-range" },
  { slug: "luxury",  label: "Luxury" },
];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "rating",     label: "Highest rated" },
  { value: "price-asc",  label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function HotelCard({ hotel, index }: { hotel: FlatHotel; index: number }) {
  const TierIcon = tierIcon[hotel.tier];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-surface rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group"
    >
      {/* Header band */}
      <div className="relative bg-primary/5 px-5 pt-5 pb-4">
        {hotel.badge && (
          <span className="absolute top-4 right-4 bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-full leading-none">
            {hotel.badge}
          </span>
        )}
        <Link
          href={`/destinations/${hotel.destination.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/80 hover:text-primary mb-2 transition-colors"
        >
          <MapPin className="h-3 w-3" />
          {hotel.destination.name}, {hotel.destination.country}
          <ChevronRight className="h-3 w-3" />
        </Link>
        <h3 className="font-display font-bold text-foreground text-[17px] leading-snug group-hover:text-primary transition-colors">
          {hotel.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${tierBadge[hotel.tier]}`}>
            <TierIcon className="h-3 w-3" />
            {tierLabel[hotel.tier]}
          </span>
          <span className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex-1 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{hotel.description}</p>

        {/* Highlights */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
          {hotel.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-[12px] text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border bg-muted/30 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-xl text-foreground">${hotel.pricePerNight}</span>
            <span className="text-xs text-muted-foreground">/ night</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="bg-primary text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
              {hotel.reviewScore}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {hotel.reviewScore >= 9 ? "Exceptional" : hotel.reviewScore >= 8.5 ? "Excellent" : "Very Good"}
            </span>
            <span className="text-[11px] text-muted-foreground">·</span>
            <span className="text-[11px] text-muted-foreground">{hotel.reviewCount.toLocaleString()} reviews</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-end">
          <Button
            size="sm"
            className="bg-accent hover:bg-[#E85D6A] text-white text-xs font-semibold h-8 px-3 gap-1"
            asChild
          >
            <a href={hotel.bookUrl} target="_blank" rel="noopener noreferrer nofollow">
              View Deal <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <Link
            href={`/destinations/${hotel.destination.slug}`}
            className="text-[11px] text-primary hover:underline font-medium"
          >
            Full guide →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function HotelsPage() {
  useSeo({
    title: "Best Hotels by Destination & Budget",
    description: "20 handpicked hotels across Bali, Santorini, Tokyo, the Maldives, and Paris — filtered by budget, mid-range, and luxury. All reviewed by the TravelBuzzy team.",
    image: "/images/santorini.jpg",
    url: "/hotels",
  });

  const [region, setRegion] = useState<RegionSlug>("all");
  const [tier, setTier] = useState<TierFilter>("all");
  const [sort, setSort] = useState<SortOrder>("rating");

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best Hotels by Destination — TravelBuzzy",
      description: "Handpicked hotels across top travel destinations, curated by the TravelBuzzy editorial team.",
      numberOfItems: allHotels.length,
      itemListElement: allHotels.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: h.name,
        description: h.description,
        url: `https://travelbuzzy.com/destinations/${h.destination.slug}`,
      })),
    };
    const script = document.createElement("script");
    script.id = "hotels-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById("hotels-schema")?.remove(); };
  }, []);

  const filtered = allHotels
    .filter((h) => region === "all" || h.destination.slug === region)
    .filter((h) => tier === "all" || h.tier === tier)
    .sort((a, b) => {
      if (sort === "rating")     return b.reviewScore - a.reviewScore;
      if (sort === "price-asc")  return a.pricePerNight - b.pricePerNight;
      if (sort === "price-desc") return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  return (
    <>
      <StickyHeader />

      <main className="pt-[72px] min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary text-white py-14 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-4">
                <Hotel className="h-4 w-4" />
                <span>Curated by the TravelBuzzy team</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
                Best Hotels for<br className="hidden sm:block" /> Every Budget
              </h1>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                {allHotels.length} handpicked hotels across {destinations.length} destinations —
                budget hostels, mid-range boutiques, and splurge-worthy luxury resorts all included.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[72px] z-30 bg-surface border-b border-border shadow-sm">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              {/* Region tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                {regions.map((r) => (
                  <button
                    key={r.slug}
                    onClick={() => setRegion(r.slug)}
                    className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      region === r.slug
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{r.flag}</span>
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Tier + Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                  {tiers.map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => setTier(t.slug)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        tier === t.slug
                          ? "bg-surface text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOrder)}
                  className="text-xs font-medium border border-border rounded-lg px-3 py-1.5 bg-surface text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label="Sort hotels"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results summary */}
        <section className="container mx-auto max-w-7xl px-4 pt-8 pb-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              hotel{filtered.length !== 1 ? "s" : ""} found
              {region !== "all" && ` in ${regions.find((r) => r.slug === region)?.label}`}
              {tier !== "all" && ` · ${tierLabel[tier]}`}
            </p>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sortOptions.find((o) => o.value === sort)?.label}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="container mx-auto max-w-7xl px-4 pb-20 pt-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <Hotel className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground text-sm">No hotels match your filters.</p>
              <button
                onClick={() => { setRegion("all"); setTier("all"); }}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${region}-${tier}-${sort}`}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filtered.map((h, i) => (
                  <HotelCard key={`${h.destination.slug}-${h.id}`} hotel={h} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </section>

        {/* Destination CTA strip */}
        <section className="bg-muted/50 border-t border-border py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">Browse by destination</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Each guide includes local tips, when to visit, and our full hotel shortlist.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-surface border border-border hover:border-primary/40 transition-all hover:shadow-md p-4 flex flex-col gap-1"
                >
                  <span className="text-2xl">{regions.find((r) => r.slug === d.slug)?.flag}</span>
                  <span className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                    {d.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{d.country}</span>
                  <span className="text-xs text-primary/80 mt-1 font-medium">
                    {d.hotels.length} hotels →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial note */}
        <section className="py-8 px-4 border-t border-border">
          <div className="container mx-auto max-w-7xl">
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              <span className="font-semibold text-foreground">How we pick hotels:</span>{" "}
              Every hotel on TravelBuzzy is researched independently. We evaluate location, value for money,
              review score consistency, and whether we'd actually stay there. Some links are affiliate
              links — if you book, we may earn a small commission at no extra cost to you.{" "}
              <Link href="/affiliate-disclosure" className="text-primary hover:underline">
                Read our full disclosure →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
