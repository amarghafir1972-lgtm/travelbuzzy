import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Users, DollarSign, Star, ArrowLeftRight, Plane,
  ChevronRight, MapPin, Trophy, Sparkles, Filter,
} from "lucide-react";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import { useSeo } from "@/hooks/use-seo";
import { destinationMap } from "@/data/destinations";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";

const FULL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const CONTINENT_ORDER = ["All","Asia","Oceania","Middle East","Europe","Americas","Africa"];

const CONTINENT: Record<string, string> = {
  queenstown: "Oceania", "bora-bora": "Oceania", hawaii: "Oceania",
  tokyo: "Asia", kyoto: "Asia", hanoi: "Asia", bangkok: "Asia", phuket: "Asia",
  bali: "Asia", singapore: "Asia", maldives: "Asia",
  dubai: "Middle East", istanbul: "Middle East",
  marrakech: "Africa", "cape-town": "Africa",
  reykjavik: "Europe", amsterdam: "Europe", prague: "Europe", paris: "Europe",
  barcelona: "Europe", ibiza: "Europe", rome: "Europe", "amalfi-coast": "Europe",
  santorini: "Europe", dubrovnik: "Europe", lisbon: "Europe",
  "new-york": "Americas", miami: "Americas", "mexico-city": "Americas", "rio-de-janeiro": "Americas",
};

const WEATHER_LABEL: Record<number, { label: string; color: string }> = {
  5: { label: "Perfect", color: "text-emerald-600" },
  4: { label: "Great", color: "text-emerald-500" },
  3: { label: "Good", color: "text-amber-600" },
  2: { label: "Mixed", color: "text-orange-500" },
  1: { label: "Poor", color: "text-rose-500" },
};
const CROWDS_LABEL: Record<number, { label: string; color: string }> = {
  5: { label: "Very quiet", color: "text-emerald-600" },
  4: { label: "Quiet", color: "text-emerald-500" },
  3: { label: "Moderate", color: "text-amber-600" },
  2: { label: "Busy", color: "text-orange-500" },
  1: { label: "Peak season", color: "text-rose-500" },
};
const PRICE_LABEL: Record<number, { label: string; color: string }> = {
  5: { label: "Great value", color: "text-emerald-600" },
  4: { label: "Good value", color: "text-emerald-500" },
  3: { label: "Average", color: "text-amber-600" },
  2: { label: "Pricier", color: "text-orange-500" },
  1: { label: "Peak pricing", color: "text-rose-500" },
};

function scoreColor(s: number) {
  if (s >= 4.2) return "bg-emerald-500";
  if (s >= 3.5) return "bg-emerald-400";
  if (s >= 2.8) return "bg-amber-400";
  if (s >= 2) return "bg-orange-400";
  return "bg-rose-400";
}
function scoreBg(s: number) {
  if (s >= 4.2) return "bg-emerald-50 border-emerald-200 text-emerald-700";
  if (s >= 3.5) return "bg-emerald-50/70 border-emerald-200 text-emerald-600";
  if (s >= 2.8) return "bg-amber-50 border-amber-200 text-amber-700";
  if (s >= 2) return "bg-orange-50 border-orange-200 text-orange-600";
  return "bg-rose-50 border-rose-200 text-rose-600";
}

function rankBadge(rank: number) {
  if (rank === 1) return { bg: "bg-yellow-400 text-yellow-900", icon: "🥇" };
  if (rank === 2) return { bg: "bg-slate-300 text-slate-700", icon: "🥈" };
  if (rank === 3) return { bg: "bg-orange-300 text-orange-800", icon: "🥉" };
  return { bg: "bg-muted text-muted-foreground", icon: `${rank}` };
}

function parseMonthFromUrl(): number {
  const p = new URLSearchParams(window.location.search);
  const m = parseInt(p.get("m") ?? "");
  if (!isNaN(m) && m >= 0 && m <= 11) return m;
  return new Date().getMonth();
}

export default function BestInMonth() {
  const [month, setMonth] = useState<number>(parseMonthFromUrl);
  const [continent, setContinent] = useState("All");

  useSeo({
    title: `Best Places to Travel in ${FULL_MONTHS[month]} — TravelBuzzy`,
    description: `Discover the top destinations to visit in ${FULL_MONTHS[month]}, ranked by weather, value, and crowds.`,
    url: "/when-to-go",
  });

  const allDests = Object.values(destinationMap);

  const ranked = useMemo(() => {
    return allDests
      .map(dest => {
        const cal = getMonthCalendar(dest.slug);
        const rating = cal?.[month] ?? null;
        const score = rating ? overallScore(rating) : null;
        return { dest, rating, score };
      })
      .filter(d => d.score !== null)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }, [month]);

  const noData = useMemo(() => {
    return allDests.filter(d => getMonthCalendar(d.slug) === null);
  }, []);

  const filtered = useMemo(() => {
    if (continent === "All") return ranked;
    return ranked.filter(d => CONTINENT[d.dest.slug] === continent);
  }, [ranked, continent]);

  const topScore = filtered[0]?.score ?? 5;

  function changeMonth(m: number) {
    setMonth(m);
    const p = new URLSearchParams(window.location.search);
    p.set("m", String(m));
    window.history.replaceState(null, "", `${window.location.pathname}?${p}`);
  }

  return (
    <>
      <StickyHeader />
      <main className="pt-[72px] min-h-screen bg-background">

        {/* Page hero + month picker */}
        <div className="bg-surface border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">When to Go</p>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
              Best Places to Travel in{" "}
              <span className="text-primary">{FULL_MONTHS[month]}</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mb-6">
              All {ranked.length} destinations ranked by weather, value, and crowd levels — updated monthly.
            </p>

            {/* Month pill selector */}
            <div className="flex gap-1.5 flex-wrap">
              {FULL_MONTHS.map((name, i) => {
                const isNow = i === new Date().getMonth();
                return (
                  <button
                    key={i}
                    onClick={() => changeMonth(i)}
                    className={`relative px-3.5 py-1.5 rounded-full text-sm font-semibold border-2 transition-all duration-150 ${
                      month === i
                        ? "bg-primary text-white border-primary shadow-sm scale-105"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-background"
                    }`}
                  >
                    {SHORT_MONTHS[i]}
                    {isNow && month !== i && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent border border-background" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8">

          {/* Continent filter */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {CONTINENT_ORDER.map(c => (
              <button
                key={c}
                onClick={() => setContinent(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  continent === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-background"
                }`}
              >
                {c}
                {c !== "All" && (
                  <span className="ml-1 opacity-50">
                    {ranked.filter(d => CONTINENT[d.dest.slug] === c).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${month}-${continent}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <MapPin className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
                  <p className="font-semibold text-foreground mb-1">No ranked destinations in {continent}</p>
                  <p className="text-sm text-muted-foreground">Try a different region or month</p>
                </div>
              ) : (
                filtered.map(({ dest, rating, score }, i) => {
                  const rank = i + 1;
                  const badge = rankBadge(rank);
                  const s = score!;
                  const r = rating!;
                  const bar = topScore > 0 ? (s / 5) * 100 : 0;

                  return (
                    <motion.div
                      key={dest.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.25) }}
                      className="group flex flex-col sm:flex-row bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-200"
                    >
                      {/* Rank badge (left side, desktop) */}
                      <div className="hidden sm:flex items-center justify-center w-14 shrink-0 bg-muted/30">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${badge.bg}`}>
                          {rank <= 3 ? badge.icon : rank}
                        </div>
                      </div>

                      {/* Hero image */}
                      <div className="relative w-full sm:w-36 md:w-44 h-32 sm:h-auto shrink-0 overflow-hidden">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Mobile rank badge */}
                        <div className="sm:hidden absolute top-2 left-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow ${badge.bg}`}>
                            {rank <= 3 ? badge.icon : rank}
                          </div>
                        </div>
                        {/* Continent tag */}
                        <span className="absolute bottom-2 left-2 text-[9px] font-bold bg-black/50 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                          {CONTINENT[dest.slug]}
                        </span>
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0 p-4 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="font-display font-bold text-base text-foreground leading-tight">
                              {dest.name}
                            </h2>
                            <p className="text-xs text-muted-foreground">{dest.country}</p>
                          </div>
                          {/* Score badge */}
                          <div className={`shrink-0 px-2.5 py-1 rounded-lg border text-sm font-bold ${scoreBg(s)}`}>
                            {s.toFixed(1)}<span className="text-[10px] font-normal opacity-70">/5</span>
                          </div>
                        </div>

                        {/* Score bar */}
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${bar}%` }}
                            transition={{ duration: 0.5, delay: i * 0.03 }}
                            className={`h-full rounded-full ${scoreColor(s)}`}
                          />
                        </div>

                        {/* Ratings row */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <span className="flex items-center gap-1 text-[11px]">
                            <Sun className="h-3 w-3 text-amber-500" />
                            <span className={`font-semibold ${WEATHER_LABEL[r.weather].color}`}>
                              {WEATHER_LABEL[r.weather].label}
                            </span>
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Users className="h-3 w-3 text-blue-500" />
                            <span className={`font-semibold ${CROWDS_LABEL[r.crowds].color}`}>
                              {CROWDS_LABEL[r.crowds].label}
                            </span>
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <DollarSign className="h-3 w-3 text-emerald-500" />
                            <span className={`font-semibold ${PRICE_LABEL[r.price].color}`}>
                              {PRICE_LABEL[r.price].label}
                            </span>
                          </span>
                        </div>

                        {/* Tagline */}
                        <p className="text-xs text-muted-foreground line-clamp-1">{dest.tagline}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex sm:flex-col items-center justify-end gap-2 px-4 pb-4 sm:py-4 sm:pl-2 sm:pr-4 sm:border-l sm:border-border shrink-0">
                        <Link
                          href={`/destinations/${dest.slug}`}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                        >
                          View guide <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/compare?a=${dest.slug}`}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors whitespace-nowrap"
                        >
                          <ArrowLeftRight className="h-3 w-3" /> Compare
                        </Link>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {/* Destinations without data */}
          {noData.length > 0 && continent === "All" && (
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50 mb-4">
                More destinations (not yet rated for this month)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {noData.map(dest => (
                  <Link
                    key={dest.slug}
                    href={`/destinations/${dest.slug}`}
                    className="flex items-center gap-2.5 p-3 bg-surface border border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                      <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{dest.name}</p>
                      <p className="text-[10px] text-muted-foreground">{dest.country}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Trip planner CTA */}
          <div className="mt-10 bg-gradient-to-r from-primary/5 via-background to-accent/5 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="font-display font-bold text-base text-foreground">
                  Know your month — now build your itinerary
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Pick up to 5 top destinations for {FULL_MONTHS[month]} and get a full route + budget breakdown.
              </p>
            </div>
            <Link
              href="/trip-planner"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Open Trip Planner <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
