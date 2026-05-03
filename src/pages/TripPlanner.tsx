import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Plus, Minus, X, Check, Copy, CheckCircle2,
  Plane, Calendar, DollarSign, Clock, ChevronRight,
  Search, Sparkles, ArrowRight, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import { useSeo } from "@/hooks/use-seo";
import { destinationMap } from "@/data/destinations";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";
import { getDestinationBudget, type Tier, type Origin } from "@/data/budgetData";

const MAX = 5;
const FULL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const GEO_ORDER: Record<string, number> = {
  queenstown: 1, "bora-bora": 2, hawaii: 3,
  tokyo: 4, kyoto: 5, hanoi: 6, bangkok: 7, phuket: 8, bali: 9, singapore: 10, maldives: 11,
  dubai: 12, istanbul: 13,
  marrakech: 14, "cape-town": 15,
  reykjavik: 16, amsterdam: 17, prague: 18, paris: 19, barcelona: 20, ibiza: 21,
  rome: 22, "amalfi-coast": 23, santorini: 24, dubrovnik: 25, lisbon: 26,
  "new-york": 27, miami: 28, "mexico-city": 29, "rio-de-janeiro": 30,
};

const CONTINENT: Record<string, string> = {
  queenstown: "Oceania", "bora-bora": "Oceania", hawaii: "Oceania",
  tokyo: "Asia", kyoto: "Asia", hanoi: "Asia", bangkok: "Asia", phuket: "Asia",
  bali: "Asia", singapore: "Asia", maldives: "Asia",
  dubai: "Mid East", istanbul: "Mid East",
  marrakech: "Africa", "cape-town": "Africa",
  reykjavik: "Europe", amsterdam: "Europe", prague: "Europe", paris: "Europe",
  barcelona: "Europe", ibiza: "Europe", rome: "Europe", "amalfi-coast": "Europe",
  santorini: "Europe", dubrovnik: "Europe", lisbon: "Europe",
  "new-york": "Americas", miami: "Americas", "mexico-city": "Americas", "rio-de-janeiro": "Americas",
};

function sortByGeo(slugs: string[]) {
  return [...slugs].sort((a, b) => (GEO_ORDER[a] ?? 99) - (GEO_ORDER[b] ?? 99));
}

function bestSharedMonth(slugs: string[]) {
  const avgs = Array.from({ length: 12 }, (_, m) => {
    const scores = slugs
      .map(s => getMonthCalendar(s)?.[m])
      .filter(Boolean)
      .map(r => overallScore(r!));
    return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  });
  const max = Math.max(...avgs);
  return { month: avgs.indexOf(max), avgScore: max };
}

function cheapestSharedMonth(slugs: string[]) {
  const avgs = Array.from({ length: 12 }, (_, m) => {
    const prices = slugs
      .map(s => getMonthCalendar(s)?.[m]?.price)
      .filter((p): p is number => p !== undefined);
    return prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
  });
  return avgs.indexOf(Math.max(...avgs));
}

function calcBudget(slugs: string[], nights: Record<string, number>, tier: Tier, origin: Origin) {
  let stay = 0;
  let flights = 0;
  const perDest: Record<string, { stay: number; flight: number; daily: number }> = {};
  slugs.forEach(slug => {
    const d = getDestinationBudget(slug);
    if (!d) return;
    const n = nights[slug] ?? 5;
    const t = d.tiers[tier];
    const daily = t.hotelPerNight + t.foodPerDay + t.activitiesPerDay + t.transportPerDay;
    const s = daily * n;
    const f = d.flightEstimate[origin];
    const flight = f ? Math.round((f.min + f.max) / 2) : 0;
    stay += s;
    flights += flight;
    perDest[slug] = { stay: s, flight, daily };
  });
  return { stay, flights, total: stay + flights, perDest };
}

function encodeUrl(slugs: string[], nights: Record<string, number>, tier: Tier, origin: Origin) {
  const d = slugs.map(s => `${s}:${nights[s] ?? 5}`).join(",");
  const p = new URLSearchParams({ d, tier, from: origin });
  return `${window.location.origin}${window.location.pathname}?${p}`;
}

function parseUrl() {
  const p = new URLSearchParams(window.location.search);
  const raw = p.get("d") ?? "";
  const slugs: string[] = [];
  const nights: Record<string, number> = {};
  if (raw) {
    raw.split(",").forEach(part => {
      const [slug, n] = part.split(":");
      if (slug && destinationMap[slug]) {
        slugs.push(slug);
        nights[slug] = Math.max(2, Math.min(21, parseInt(n ?? "5") || 5));
      }
    });
  }
  const tier = (["budget","mid","luxury"].includes(p.get("tier") ?? "") ? p.get("tier") : "mid") as Tier;
  const origin = (["uk","us"].includes(p.get("from") ?? "") ? p.get("from") : "uk") as Origin;
  return { slugs, nights, tier, origin };
}

const TIER_LABELS: Record<Tier, string> = { budget: "Budget", mid: "Mid-range", luxury: "Luxury" };
const ORIGIN_LABELS: Record<Origin, string> = { uk: "🇬🇧 UK", us: "🇺🇸 US" };

const allDests = Object.values(destinationMap);

export default function TripPlanner() {
  useSeo({
    title: "Trip Planner — Build Your Multi-Destination Itinerary",
    description: "Pick up to 5 destinations, get the optimal route, best shared travel month, and a full budget breakdown. Free trip planner from TravelBuzzy.",
    url: "/trip-planner",
  });

  const init = useMemo(parseUrl, []);
  const [selected, setSelected] = useState<string[]>(init.slugs);
  const [nights, setNights] = useState<Record<string, number>>(
    Object.fromEntries(allDests.map(d => [d.slug, init.nights[d.slug] ?? 5]))
  );
  const [tier, setTier] = useState<Tier>(init.tier);
  const [origin, setOrigin] = useState<Origin>(init.origin);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const route = useMemo(() => sortByGeo(selected), [selected]);
  const { month: bestMonth, avgScore } = useMemo(() => bestSharedMonth(selected), [selected]);
  const cheapMonth = useMemo(() => cheapestSharedMonth(selected), [selected]);
  const budget = useMemo(() => calcBudget(route, nights, tier, origin), [route, nights, tier, origin]);

  const totalNights = route.reduce((s, slug) => s + (nights[slug] ?? 5), 0);

  const filtered = useMemo(() => {
    if (!query.trim()) return allDests;
    const q = query.toLowerCase();
    return allDests.filter(d =>
      d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
    );
  }, [query]);

  function toggle(slug: string) {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= MAX) return prev;
      return [...prev, slug];
    });
  }

  function changeNights(slug: string, delta: number) {
    setNights(prev => ({
      ...prev,
      [slug]: Math.max(2, Math.min(21, (prev[slug] ?? 5) + delta)),
    }));
  }

  function handleCopy() {
    const url = encodeUrl(selected, nights, tier, origin);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function scrollToSummary() {
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const scoreColor = avgScore >= 4 ? "text-emerald-600" : avgScore >= 3 ? "text-amber-600" : "text-orange-500";

  return (
    <>
      <StickyHeader />

      <main className="pt-[72px] min-h-screen bg-background">
        {/* Page hero */}
        <div className="bg-surface border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">Free Tool</p>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                  Trip Planner
                </h1>
                <p className="text-muted-foreground text-base max-w-xl">
                  Pick up to {MAX} destinations and we'll work out the optimal route, best shared month to travel, and a full budget breakdown.
                </p>
              </div>
              {selected.length > 0 && (
                <div className="shrink-0 flex gap-2 md:hidden">
                  <Button
                    onClick={scrollToSummary}
                    className="bg-primary text-white font-semibold gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    View itinerary ({selected.length})
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

            {/* LEFT — Destination Picker */}
            <div>
              <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className="font-display font-bold text-xl text-foreground">
                  Choose Destinations
                </h2>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${
                  selected.length >= MAX
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-muted text-muted-foreground border-border"
                }`}>
                  {selected.length}/{MAX} selected
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search by city or country…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="pl-9 h-10"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <AnimatePresence>
                  {filtered.map(dest => {
                    const isSelected = selected.includes(dest.slug);
                    const isDisabled = !isSelected && selected.length >= MAX;
                    return (
                      <motion.button
                        key={dest.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: isDisabled ? 0.45 : 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => !isDisabled && toggle(dest.slug)}
                        disabled={isDisabled}
                        className={`relative rounded-xl overflow-hidden text-left group transition-all duration-200 ${
                          isSelected
                            ? "ring-2 ring-primary ring-offset-2 shadow-md"
                            : isDisabled
                            ? "cursor-not-allowed"
                            : "hover:shadow-md hover:ring-1 hover:ring-border"
                        }`}
                      >
                        <div className="aspect-[3/2] relative overflow-hidden">
                          <img
                            src={dest.heroImage}
                            alt={dest.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Selected overlay */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}

                          {/* Continent badge */}
                          <span className="absolute top-2 left-2 text-[9px] font-bold bg-black/40 text-white/90 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                            {CONTINENT[dest.slug]}
                          </span>

                          <div className="absolute bottom-2 left-2.5 right-2.5">
                            <p className="text-white font-display font-bold text-sm leading-tight truncate">
                              {dest.name}
                            </p>
                            <p className="text-white/70 text-[10px] truncate">{dest.country}</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Globe className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No destinations match "{query}"</p>
                </div>
              )}
            </div>

            {/* RIGHT — Itinerary Summary */}
            <div ref={summaryRef} className="lg:sticky lg:top-[88px] space-y-4">

              {selected.length === 0 ? (
                /* Empty state */
                <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
                  <MapPin className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="font-display font-bold text-base text-foreground mb-1">
                    Your itinerary is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click destinations on the left to start building your trip
                  </p>
                </div>
              ) : (
                <>
                  {/* Route card */}
                  <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-bold text-base text-foreground">Optimal Route</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {totalNights} nights · {selected.length} {selected.length === 1 ? "destination" : "destinations"}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                        Geo-ordered ✈
                      </span>
                    </div>

                    <div className="divide-y divide-border">
                      <AnimatePresence>
                        {route.map((slug, i) => {
                          const dest = destinationMap[slug];
                          if (!dest) return null;
                          const bd = budget.perDest[slug];
                          return (
                            <motion.div
                              key={slug}
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -12, height: 0 }}
                              transition={{ duration: 0.22, delay: i * 0.04 }}
                              className="px-4 py-3"
                            >
                              <div className="flex items-center gap-3">
                                {/* Step number */}
                                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                  <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                                </div>

                                {/* Image */}
                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                  <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-semibold text-foreground truncate">{dest.name}</p>
                                    <span className="text-[9px] text-muted-foreground/50 shrink-0">{CONTINENT[slug]}</span>
                                  </div>
                                  {bd && (
                                    <p className="text-xs text-muted-foreground">
                                      ~${bd.stay.toLocaleString()} stay + ${bd.flight.toLocaleString()} flight
                                    </p>
                                  )}
                                </div>

                                {/* Nights control */}
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => changeNights(slug, -1)}
                                    className="w-6 h-6 rounded-full border border-border hover:border-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="text-sm font-bold text-foreground w-6 text-center">
                                    {nights[slug] ?? 5}
                                  </span>
                                  <button
                                    onClick={() => changeNights(slug, +1)}
                                    className="w-6 h-6 rounded-full border border-border hover:border-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                {/* Remove */}
                                <button
                                  onClick={() => toggle(slug)}
                                  className="w-6 h-6 rounded-full text-muted-foreground/50 hover:text-rose-500 hover:bg-rose-50 transition-colors flex items-center justify-center ml-1"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              {/* Connector arrow (not last) */}
                              {i < route.length - 1 && (
                                <div className="flex items-center gap-2 mt-2 pl-9">
                                  <div className="flex-1 h-px bg-border" />
                                  <Plane className="h-3 w-3 text-muted-foreground/40" />
                                  <div className="flex-1 h-px bg-border" />
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Best month */}
                  <div className="bg-surface border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <h3 className="font-display font-bold text-sm text-foreground">Best Month for All Destinations</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {/* Overall best */}
                      <div className={`col-span-2 rounded-xl border p-3 ${
                        avgScore >= 4 ? "bg-emerald-50 border-emerald-200" :
                        avgScore >= 3 ? "bg-amber-50 border-amber-200" :
                        "bg-orange-50 border-orange-200"
                      }`}>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Best overall</p>
                        <p className={`font-display font-bold text-2xl ${scoreColor}`}>
                          {FULL_MONTHS[bestMonth]}
                        </p>
                        <p className={`text-[10px] font-semibold ${scoreColor}`}>
                          avg score {avgScore.toFixed(1)}/5
                        </p>
                      </div>
                      {/* Cheapest */}
                      <div className="rounded-xl border bg-muted/30 border-border p-3">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Cheapest</p>
                        <p className="font-display font-bold text-xl text-foreground">{MONTHS[cheapMonth]}</p>
                        <DollarSign className="h-3.5 w-3.5 text-emerald-500 mt-0.5" />
                      </div>
                    </div>
                    {/* Month mini heatmap */}
                    <div className="grid grid-cols-12 gap-0.5 mt-3">
                      {Array.from({ length: 12 }, (_, m) => {
                        const scores = selected
                          .map(s => getMonthCalendar(s)?.[m])
                          .filter(Boolean)
                          .map(r => overallScore(r!));
                        const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                        const bg = avg >= 4 ? "bg-emerald-400" : avg >= 3 ? "bg-amber-300" : avg >= 2 ? "bg-orange-300" : "bg-rose-400";
                        return (
                          <div key={m} className="flex flex-col items-center gap-0.5">
                            <div
                              className={`h-6 w-full rounded-sm ${bg} ${m === bestMonth ? "ring-1 ring-primary ring-offset-1" : ""}`}
                              title={`${FULL_MONTHS[m]}: ${avg.toFixed(1)}/5`}
                            />
                            <span className={`text-[8px] font-medium ${m === bestMonth ? "text-primary font-bold" : "text-muted-foreground/60"}`}>
                              {MONTHS[m][0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget card */}
                  <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <h3 className="font-display font-bold text-sm text-foreground">Budget Estimate</h3>
                      </div>

                      {/* Tier selector */}
                      <div className="flex gap-1.5 mb-3">
                        {(["budget","mid","luxury"] as Tier[]).map(t => (
                          <button
                            key={t}
                            onClick={() => setTier(t)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              tier === t
                                ? "bg-foreground text-background border-foreground"
                                : "border-border text-muted-foreground hover:border-foreground/30"
                            }`}
                          >
                            {TIER_LABELS[t]}
                          </button>
                        ))}
                      </div>

                      {/* Origin selector */}
                      <div className="flex gap-1.5">
                        {(["uk","us"] as Origin[]).map(o => (
                          <button
                            key={o}
                            onClick={() => setOrigin(o)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              origin === o
                                ? "bg-foreground text-background border-foreground"
                                : "border-border text-muted-foreground hover:border-foreground/30"
                            }`}
                          >
                            {ORIGIN_LABELS[o]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="px-5 py-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> Accommodation + living
                        </span>
                        <span className="font-semibold text-foreground">${budget.stay.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Plane className="h-3.5 w-3.5" /> Flights (est. avg)
                        </span>
                        <span className="font-semibold text-foreground">${budget.flights.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-border pt-3 flex items-center justify-between">
                        <span className="font-bold text-foreground">Total estimate</span>
                        <span className="font-display font-bold text-2xl text-foreground">
                          ${budget.total.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed pt-1">
                        Estimates based on typical {TIER_LABELS[tier].toLowerCase()} costs. Flights are one-way averages per leg. Actual prices vary — always compare across booking platforms.
                      </p>
                    </div>
                  </div>

                  {/* Share / CTA */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border font-semibold text-sm transition-all ${
                        copied
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-surface border-border text-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {copied ? (
                        <><CheckCircle2 className="h-4 w-4" /> Copied!</>
                      ) : (
                        <><Copy className="h-4 w-4" /> Share itinerary</>
                      )}
                    </button>
                    <Link
                      href="/deals"
                      className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-accent hover:bg-[#E85D6A] text-white font-semibold text-sm transition-colors shrink-0"
                    >
                      Find deals <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Per-destination guide links */}
                  <div className="bg-muted/30 rounded-xl border border-border p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Destination guides
                    </p>
                    <div className="space-y-1.5">
                      {route.map(slug => {
                        const dest = destinationMap[slug];
                        if (!dest) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/destinations/${slug}`}
                            className="flex items-center justify-between group py-1"
                          >
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors font-medium">
                              {dest.name} Guide
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
