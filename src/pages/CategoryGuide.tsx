import { useMemo, useState } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp, Star, DollarSign, Calendar, SlidersHorizontal } from "lucide-react";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getCategoryGuide, categoryGuides } from "@/data/categoryGuides";
import { destinationMap } from "@/data/destinations";
import { getDestinationBudget } from "@/data/budgetData";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type SortKey = "score" | "cost-asc" | "cost-desc";

function midDailyCost(slug: string): number | null {
  const b = getDestinationBudget(slug);
  if (!b) return null;
  const m = b.tiers.mid;
  return m.hotelPerNight + m.foodPerDay + m.activitiesPerDay + m.transportPerDay;
}

function bestMonth(slug: string): { monthIdx: number; score: number } | null {
  const cal = getMonthCalendar(slug);
  if (!cal) return null;
  let best = { monthIdx: 0, score: 0 };
  cal.forEach((m, i) => {
    const s = overallScore(m);
    if (s > best.score) best = { monthIdx: i, score: s };
  });
  return best;
}

function avgScore(slug: string): number {
  const cal = getMonthCalendar(slug);
  if (!cal) return 0;
  return Math.round((cal.reduce((acc, m) => acc + overallScore(m), 0) / cal.length) * 10) / 10;
}

function budgetBadge(cost: number | null): { label: string; color: string } {
  if (cost === null) return { label: "—", color: "text-muted-foreground" };
  if (cost < 100) return { label: "$", color: "text-emerald-600" };
  if (cost < 200) return { label: "$$", color: "text-amber-600" };
  return { label: "$$$", color: "text-rose-600" };
}

export default function CategoryGuide() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryGuide(slug);
  const [sort, setSort] = useState<SortKey>("score");

  const cards = useMemo(() => {
    if (!category) return [];
    return category.destinations
      .map((dSlug) => {
        const dest = destinationMap[dSlug];
        if (!dest) return null;
        const cost = midDailyCost(dSlug);
        const best = bestMonth(dSlug);
        const score = avgScore(dSlug);
        return { dest, cost, best, score };
      })
      .filter(Boolean) as { dest: (typeof destinationMap)[string]; cost: number | null; best: { monthIdx: number; score: number } | null; score: number }[];
  }, [category]);

  const sorted = useMemo(() => {
    return [...cards].sort((a, b) => {
      if (sort === "score") return b.score - a.score;
      if (sort === "cost-asc") return (a.cost ?? 9999) - (b.cost ?? 9999);
      return (b.cost ?? 0) - (a.cost ?? 0);
    });
  }, [cards, sort]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Category not found</h1>
          <p className="text-muted-foreground mb-8">This travel guide category doesn't exist yet.</p>
          <Link href="/" className="text-primary font-semibold hover:underline">← Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const avgCost = Math.round(
    cards.reduce((acc, c) => acc + (c.cost ?? 0), 0) / cards.filter((c) => c.cost !== null).length
  );

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <CookieBanner />

      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${category.accentColor} text-white`}>
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="flex items-start gap-4">
            <span className="text-5xl leading-none">{category.emoji}</span>
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-[0.18em] mb-1">Travel Guides</p>
              <h1 className="font-display text-4xl font-bold leading-tight mb-2">{category.label}</h1>
              <p className="text-white/80 text-base max-w-xl leading-relaxed">{category.description}</p>
              <div className="flex flex-wrap gap-4 mt-5 text-sm font-medium text-white/90">
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-white/60 text-white/60" />
                  {cards.length} destinations
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-white/60" />
                  Avg ~${avgCost}/day mid-range
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other categories strip */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {categoryGuides.filter(c => c.slug !== slug).map((c) => (
            <Link
              key={c.slug}
              href={`/guides/${c.slug}`}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 hover:text-primary text-sm text-muted-foreground font-medium transition-colors"
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{sorted.length} destinations</span> · {category.tagline}
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Sort by</span>
          {(["score", "cost-asc", "cost-desc"] as SortKey[]).map((key) => {
            const labels: Record<SortKey, string> = { score: "Best overall", "cost-asc": "Cheapest first", "cost-desc": "Priciest first" };
            return (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all ${
                  sort === key
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destination grid */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map(({ dest, cost, best, score }, i) => {
            const badge = budgetBadge(cost);
            const isTopPick = i === 0;
            return (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                className={`group relative rounded-2xl border overflow-hidden bg-surface hover:shadow-lg transition-all duration-200 ${isTopPick ? "ring-2 ring-primary/30" : "border-border"}`}
              >
                {isTopPick && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                    <Star className="h-2.5 w-2.5 fill-white" /> Top pick
                  </div>
                )}

                {/* Hero image */}
                <div className="relative h-44 overflow-hidden bg-muted">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-white font-display font-bold text-lg leading-tight">{dest.name}</p>
                      <p className="text-white/75 text-xs">{dest.country}</p>
                    </div>
                    <span className={`text-sm font-bold px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm ${badge.color.replace("text-", "text-")} text-white`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 space-y-3">
                  {/* Score bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground font-medium">Overall score</span>
                      <span className="text-sm font-bold text-foreground">{score}/5</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / 5) * 100}%` }}
                        transition={{ duration: 0.6, delay: i * 0.04 + 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.accentColor}`}
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {best && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span>Best in <strong className="text-foreground">{MONTHS[best.monthIdx]}</strong></span>
                      </span>
                    )}
                    {cost !== null && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-emerald-500" />
                        <span><strong className="text-foreground">${cost}</strong>/day</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{dest.tagline}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      View guide <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href={`/compare?a=${dest.slug}`}
                      className="px-3 py-2 border border-border rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                      Compare
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-muted/50 border border-border p-8 text-center">
          <p className="text-lg font-display font-bold text-foreground mb-2">Ready to plan your trip?</p>
          <p className="text-sm text-muted-foreground mb-5">
            Compare multiple {category.label.toLowerCase()} destinations side-by-side, or build a full multi-stop itinerary.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/trip-planner"
              className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Build an itinerary <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-2 border border-border bg-background text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 hover:text-primary transition-colors"
            >
              Compare destinations
            </Link>
            <Link
              href="/when-to-go"
              className="flex items-center gap-2 border border-border bg-background text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 hover:text-primary transition-colors"
            >
              When to go <Calendar className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
