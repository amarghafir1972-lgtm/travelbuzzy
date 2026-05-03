import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ChevronRight, Plane, Calendar, DollarSign,
  ArrowLeftRight, Check, Star, TrendingDown, MapPin, Sparkles,
  Share2, Globe, Languages, BadgeCheck, ShieldCheck, Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import { useSeo } from "@/hooks/use-seo";
import { destinationMap } from "@/data/destinations";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";
import { getDestinationBudget, type Tier, type Origin } from "@/data/budgetData";

const DEST_BEST_FOR: Record<string, string[]> = {
  bali:          ["budget retreats", "surf & beaches", "yoga & wellness"],
  santorini:     ["romantic escapes", "sunset views", "island luxury"],
  tokyo:         ["food & culture", "city exploration", "safety & transit"],
  maldives:      ["overwater villas", "snorkelling & diving", "total seclusion"],
  paris:         ["romance & art", "fine dining", "fashion & shopping"],
  bangkok:       ["street food", "budget city breaks", "temple hopping"],
  barcelona:     ["beach & nightlife", "architecture", "tapas & wine"],
  dubai:         ["luxury shopping", "desert adventures", "family attractions"],
  rome:          ["ancient history", "world-class cuisine", "art & museums"],
  kyoto:         ["traditional Japan", "temple & shrine walks", "autumn foliage"],
  phuket:        ["island hopping", "beach parties", "budget sun holidays"],
  amsterdam:     ["cycling & canals", "museums & art", "vibrant nightlife"],
  "cape-town":   ["outdoor adventures", "wine country", "scenic drives"],
  "new-york":    ["city energy", "food & Broadway", "iconic landmarks"],
  lisbon:        ["budget Europe", "fado & culture", "coastal day trips"],
  "amalfi-coast":["scenic road trips", "clifftop dining", "Mediterranean luxury"],
  marrakech:     ["souk shopping", "riad stays", "desert excursions"],
  singapore:     ["food paradise", "family-friendly", "seamless travel"],
  prague:        ["budget city breaks", "Gothic architecture", "craft beer"],
  ibiza:         ["world-class clubs", "hidden coves", "sunset bars"],
  "bora-bora":   ["ultimate honeymoons", "lagoon diving", "over-water luxury"],
  istanbul:      ["East meets West", "bazaar shopping", "Ottoman history"],
  queenstown:    ["adventure sports", "bungee & skydive", "alpine scenery"],
  hawaii:        ["volcanos & hiking", "surf culture", "family beach breaks"],
  hanoi:         ["street food trails", "cultural immersion", "ultra-budget travel"],
  reykjavik:     ["Northern Lights", "geothermal spas", "midnight sun"],
  "mexico-city": ["food & art", "ancient ruins", "vibrant neighbourhoods"],
  "rio-de-janeiro": ["carnival vibes", "iconic beaches", "samba & culture"],
  dubrovnik:     ["Game of Thrones sites", "Adriatic sailing", "walled city walks"],
  miami:         ["Art Deco & nightlife", "luxury beach clubs", "year-round sunshine"],
};

const POPULAR_PAIRS: { a: string; b: string; label: string }[] = [
  { a: "bali",      b: "phuket",    label: "Bali vs Phuket" },
  { a: "paris",     b: "rome",      label: "Paris vs Rome" },
  { a: "tokyo",     b: "kyoto",     label: "Tokyo vs Kyoto" },
  { a: "santorini", b: "amalfi-coast", label: "Santorini vs Amalfi" },
  { a: "maldives",  b: "bora-bora", label: "Maldives vs Bora Bora" },
  { a: "dubai",     b: "singapore", label: "Dubai vs Singapore" },
  { a: "barcelona", b: "lisbon",    label: "Barcelona vs Lisbon" },
  { a: "new-york",  b: "miami",     label: "New York vs Miami" },
  { a: "tokyo",     b: "bangkok",   label: "Tokyo vs Bangkok" },
  { a: "cape-town", b: "marrakech", label: "Cape Town vs Marrakech" },
];

const FULL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const ALL_DESTS = Object.values(destinationMap);
const TIER_LABELS: Record<Tier, string> = { budget: "Budget", mid: "Mid-range", luxury: "Luxury" };
const ORIGIN_LABELS: Record<Origin, string> = { uk: "🇬🇧 UK", us: "🇺🇸 US" };

function parseUrlParams() {
  const p = new URLSearchParams(window.location.search);
  const a = p.get("a") ?? "";
  const b = p.get("b") ?? "";
  const tier = (["budget","mid","luxury"].includes(p.get("tier") ?? "") ? p.get("tier") : "mid") as Tier;
  const origin = (["uk","us"].includes(p.get("from") ?? "") ? p.get("from") : "uk") as Origin;
  return {
    slugA: destinationMap[a] ? a : "",
    slugB: destinationMap[b] ? b : "",
    tier,
    origin,
  };
}

function getBestMonth(slug: string) {
  const cal = getMonthCalendar(slug);
  if (!cal) return null;
  const scores = cal.map(overallScore);
  const max = Math.max(...scores);
  return { month: scores.indexOf(max), score: max };
}

function getGreenMonths(slug: string) {
  const cal = getMonthCalendar(slug);
  if (!cal) return null;
  return cal.filter(m => overallScore(m) >= 4).length;
}

function getDailyTotal(slug: string, tier: Tier) {
  const d = getDestinationBudget(slug);
  if (!d) return null;
  const t = d.tiers[tier];
  return t.hotelPerNight + t.foodPerDay + t.activitiesPerDay + t.transportPerDay;
}

function getFlightAvg(slug: string, origin: Origin) {
  const d = getDestinationBudget(slug);
  if (!d) return null;
  const f = d.flightEstimate[origin];
  return f ? Math.round((f.min + f.max) / 2) : null;
}

function monthColor(score: number) {
  if (score >= 4.2) return "bg-emerald-500";
  if (score >= 3.5) return "bg-emerald-300";
  if (score >= 2.8) return "bg-amber-300";
  if (score >= 2) return "bg-orange-300";
  return "bg-rose-400";
}

function WinBadge({ win }: { win: boolean }) {
  if (!win) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
      <Check className="h-2.5 w-2.5" /> Better
    </span>
  );
}

function DestPicker({
  selected,
  onSelect,
  label,
  exclude,
}: {
  selected: string;
  onSelect: (slug: string) => void;
  label: string;
  exclude: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const dest = selected ? destinationMap[selected] : null;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ALL_DESTS.filter(d =>
      d.slug !== exclude &&
      (d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q))
    );
  }, [query, exclude]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${
          open ? "border-primary shadow-md" : "border-border hover:border-primary/40"
        }`}
      >
        {dest ? (
          <div className="relative h-36">
            <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="font-display font-bold text-white text-xl leading-tight">{dest.name}</p>
              <p className="text-white/70 text-xs">{dest.country}</p>
            </div>
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Search className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        ) : (
          <div className="h-36 bg-muted/30 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-7 w-7 opacity-30" />
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs opacity-70">Click to pick a destination</p>
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 bg-background border border-border rounded-2xl shadow-xl overflow-hidden"
            style={{ minWidth: 280 }}
          >
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  autoFocus
                  placeholder="Search destinations…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-border/50">
              {filtered.map(d => (
                <button
                  key={d.slug}
                  onClick={() => { onSelect(d.slug); setOpen(false); setQuery(""); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted/40 transition-colors ${
                    d.slug === selected ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="w-10 h-7 rounded-md overflow-hidden shrink-0">
                    <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
                    <p className="text-[11px] text-muted-foreground">{d.country}</p>
                  </div>
                  {d.slug === selected && <Check className="h-4 w-4 text-primary shrink-0" />}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No results for "{query}"</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompareRow({
  label,
  icon,
  cellA,
  cellB,
}: {
  label: string;
  icon: React.ReactNode;
  cellA: React.ReactNode;
  cellB: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-px bg-border">
      <div className="bg-background p-4">{cellA}</div>
      <div className="bg-muted/30 px-3 flex flex-col items-center justify-center gap-1 text-center min-w-[80px]">
        <div className="text-muted-foreground">{icon}</div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-tight">{label}</p>
      </div>
      <div className="bg-background p-4">{cellB}</div>
    </div>
  );
}

export default function ComparePage() {
  useSeo({
    title: "Compare Destinations — TravelBuzzy",
    description: "Compare two travel destinations side-by-side: budget, best month, flights, and more.",
    url: "/compare",
  });

  const init = useMemo(parseUrlParams, []);
  const [slugA, setSlugA] = useState(init.slugA);
  const [slugB, setSlugB] = useState(init.slugB);
  const [tier, setTier] = useState<Tier>(init.tier);
  const [origin, setOrigin] = useState<Origin>(init.origin);
  const [tripNights, setTripNights] = useState(7);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams();
    if (slugA) p.set("a", slugA);
    if (slugB) p.set("b", slugB);
    p.set("tier", tier);
    p.set("from", origin);
    const url = `${window.location.pathname}?${p}`;
    window.history.replaceState(null, "", url);
  }, [slugA, slugB, tier, origin]);

  const destA = slugA ? destinationMap[slugA] : null;
  const destB = slugB ? destinationMap[slugB] : null;

  const bestA = useMemo(() => slugA ? getBestMonth(slugA) : null, [slugA]);
  const bestB = useMemo(() => slugB ? getBestMonth(slugB) : null, [slugB]);
  const greenA = useMemo(() => slugA ? getGreenMonths(slugA) : null, [slugA]);
  const greenB = useMemo(() => slugB ? getGreenMonths(slugB) : null, [slugB]);
  const dailyA = useMemo(() => slugA ? getDailyTotal(slugA, tier) : null, [slugA, tier]);
  const dailyB = useMemo(() => slugB ? getDailyTotal(slugB, tier) : null, [slugB, tier]);
  const flightA = useMemo(() => slugA ? getFlightAvg(slugA, origin) : null, [slugA, origin]);
  const flightB = useMemo(() => slugB ? getFlightAvg(slugB, origin) : null, [slugB, origin]);
  const calA = useMemo(() => slugA ? getMonthCalendar(slugA) : null, [slugA]);
  const calB = useMemo(() => slugB ? getMonthCalendar(slugB) : null, [slugB]);
  const budA = useMemo(() => slugA ? getDestinationBudget(slugA) : null, [slugA]);
  const budB = useMemo(() => slugB ? getDestinationBudget(slugB) : null, [slugB]);

  const bothSelected = !!destA && !!destB;

  const verdict = useMemo(() => {
    if (!destA || !destB || !bothSelected) return null;

    function visaScore(v: string) {
      const lc = v.toLowerCase();
      if (lc.includes("visa-free") || lc.includes("visa free")) return 2;
      if (lc.includes("on arrival") || lc.includes("e-visa") || lc.includes("evisa")) return 1;
      return 0;
    }

    const dims: { label: string; aWins: boolean | null; reason: string }[] = [];

    if (dailyA !== null && dailyB !== null && dailyA !== dailyB) {
      dims.push({
        label: "Daily cost",
        aWins: dailyA < dailyB,
        reason: dailyA < dailyB
          ? `${destA.name} saves $${dailyB - dailyA}/day`
          : `${destB.name} saves $${dailyA - dailyB}/day`,
      });
    }

    if (flightA !== null && flightB !== null && flightA !== flightB) {
      dims.push({
        label: "Flights",
        aWins: flightA < flightB,
        reason: flightA < flightB
          ? `${destA.name} flights avg $${flightB - flightA} cheaper`
          : `${destB.name} flights avg $${flightA - flightB} cheaper`,
      });
    }

    if (bestA && bestB && bestA.score !== bestB.score) {
      dims.push({
        label: "Peak weather",
        aWins: bestA.score > bestB.score,
        reason: bestA.score > bestB.score
          ? `${destA.name} peaks at ${bestA.score}/5 vs ${bestB.score}/5`
          : `${destB.name} peaks at ${bestB.score}/5 vs ${bestA.score}/5`,
      });
    }

    if (greenA !== null && greenB !== null && greenA !== greenB) {
      dims.push({
        label: "Good months",
        aWins: greenA > greenB,
        reason: greenA > greenB
          ? `${destA.name} has ${greenA} great months vs ${greenB}`
          : `${destB.name} has ${greenB} great months vs ${greenA}`,
      });
    }

    const vsA = visaScore(destA.quickFacts.visaRequired);
    const vsB = visaScore(destB.quickFacts.visaRequired);
    if (vsA !== vsB) {
      dims.push({
        label: "Visa ease",
        aWins: vsA > vsB,
        reason: vsA > vsB
          ? `${destA.name} is easier to enter (${destA.quickFacts.visaRequired})`
          : `${destB.name} is easier to enter (${destB.quickFacts.visaRequired})`,
      });
    }

    const aPoints = dims.filter(d => d.aWins === true).length;
    const bPoints = dims.filter(d => d.aWins === false).length;
    const winner = aPoints > bPoints ? destA : bPoints > aPoints ? destB : null;
    const topReason = winner
      ? (winner === destA ? dims.find(d => d.aWins === true) : dims.find(d => d.aWins === false))?.reason ?? ""
      : "";

    return { dims, aPoints, bPoints, winner, topReason };
  }, [destA, destB, bothSelected, dailyA, dailyB, flightA, flightB, bestA, bestB, greenA, greenB]);

  function swap() {
    setSlugA(slugB);
    setSlugB(slugA);
  }

  function shareLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <StickyHeader />
      <main className="pt-[72px] min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl py-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">Side-by-side</p>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">Compare Destinations</h1>
            <p className="text-muted-foreground text-base max-w-xl">
              Pick any two destinations and compare budget, best travel month, flights, and more — all in one view.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-5xl py-8 space-y-6">
          {/* Pickers */}
          <div className="flex items-center gap-3">
            <DestPicker
              selected={slugA}
              onSelect={setSlugA}
              label="Destination A"
              exclude={slugB}
            />
            <button
              onClick={swap}
              title="Swap destinations"
              className="shrink-0 w-10 h-10 rounded-full border-2 border-border hover:border-primary/50 bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:rotate-180 duration-300"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
            <DestPicker
              selected={slugB}
              onSelect={setSlugB}
              label="Destination B"
              exclude={slugA}
            />
          </div>

          {/* Settings strip */}
          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget tier:</span>
              <div className="flex gap-1">
                {(["budget","mid","luxury"] as Tier[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      tier === t ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {TIER_LABELS[t]}
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">Flying from:</span>
              <div className="flex gap-1">
                {(["uk","us"] as Origin[]).map(o => (
                  <button
                    key={o}
                    onClick={() => setOrigin(o)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      origin === o ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {ORIGIN_LABELS[o]}
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2">Nights:</span>
              <div className="flex gap-1">
                {[5, 7, 10, 14].map(n => (
                  <button
                    key={n}
                    onClick={() => setTripNights(n)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      tripNights === n ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                onClick={shareLink}
                className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </motion.div>
          )}

          {/* Verdict card */}
          {bothSelected && verdict && verdict.dims.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-border overflow-hidden"
            >
              {/* Winner banner */}
              <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                verdict.winner ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" : "bg-muted/30"
              }`}>
                <div className="flex-1 min-w-0">
                  {verdict.winner ? (
                    <>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Overall winner</span>
                      </div>
                      <p className="font-display font-bold text-xl text-foreground">
                        {verdict.winner.name}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          wins {Math.max(verdict.aPoints, verdict.bPoints)}–{Math.min(verdict.aPoints, verdict.bPoints)}
                        </span>
                      </p>
                      {verdict.topReason && (
                        <p className="text-xs text-muted-foreground mt-0.5">{verdict.topReason}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-0.5">
                        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Verdict</span>
                      </div>
                      <p className="font-display font-bold text-xl text-foreground">
                        It's a Tie — {verdict.aPoints}–{verdict.bPoints}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Both destinations are evenly matched. Choose your vibe.</p>
                    </>
                  )}
                </div>
                {/* Score badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`flex flex-col items-center px-4 py-2 rounded-xl border ${
                    verdict.aPoints > verdict.bPoints ? "border-primary/40 bg-primary/10" : "border-border bg-muted/30"
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{destA!.name.split(" ")[0]}</span>
                    <span className="font-display font-bold text-2xl text-foreground">{verdict.aPoints}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-bold">vs</span>
                  <div className={`flex flex-col items-center px-4 py-2 rounded-xl border ${
                    verdict.bPoints > verdict.aPoints ? "border-primary/40 bg-primary/10" : "border-border bg-muted/30"
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{destB!.name.split(" ")[0]}</span>
                    <span className="font-display font-bold text-2xl text-foreground">{verdict.bPoints}</span>
                  </div>
                </div>
              </div>

              {/* Dimension pills */}
              <div className="px-5 py-3 flex flex-wrap gap-2 border-t border-border bg-muted/10">
                {verdict.dims.map(dim => (
                  <div
                    key={dim.label}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      dim.aWins === true
                        ? "bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300"
                        : "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300"
                    }`}
                  >
                    <span>{dim.label}</span>
                    <span className="opacity-60">→</span>
                    <span className="font-bold">
                      {dim.aWins === true ? destA!.name.split(" ")[0] : destB!.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Best For */}
              {(DEST_BEST_FOR[slugA!] || DEST_BEST_FOR[slugB!]) && (
                <div className="grid grid-cols-[1fr_auto_1fr] gap-px bg-border border-t border-border">
                  <div className="bg-background px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      {destA!.name} is best for
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(DEST_BEST_FOR[slugA!] ?? []).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/10 w-[1px]" />
                  <div className="bg-background px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      {destB!.name} is best for
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(DEST_BEST_FOR[slugB!] ?? []).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Comparison table */}
          {bothSelected ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border overflow-hidden"
            >
              {/* Header row */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-px bg-border">
                <div className="bg-primary px-5 py-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold text-white shrink-0">A</div>
                  <p className="font-display font-bold text-white text-lg truncate">{destA.name}</p>
                </div>
                <div className="bg-primary/80 px-3 flex items-center justify-center min-w-[80px]">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">vs</span>
                </div>
                <div className="bg-primary/90 px-5 py-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold text-white shrink-0">B</div>
                  <p className="font-display font-bold text-white text-lg truncate">{destB.name}</p>
                </div>
              </div>

              {/* Best month */}
              <CompareRow
                label="Best Month"
                icon={<Calendar className="h-4 w-4" />}
                cellA={
                  bestA ? (
                    <div>
                      <p className={`font-display font-bold text-xl ${bestA.score >= 4 ? "text-emerald-600" : bestA.score >= 3 ? "text-amber-600" : "text-orange-500"}`}>
                        {FULL_MONTHS[bestA.month]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Score {bestA.score.toFixed(1)}/5</p>
                      <WinBadge win={!!bestB && bestA.score > bestB.score} />
                    </div>
                  ) : <p className="text-sm text-muted-foreground">—</p>
                }
                cellB={
                  bestB ? (
                    <div>
                      <p className={`font-display font-bold text-xl ${bestB.score >= 4 ? "text-emerald-600" : bestB.score >= 3 ? "text-amber-600" : "text-orange-500"}`}>
                        {FULL_MONTHS[bestB.month]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Score {bestB.score.toFixed(1)}/5</p>
                      <WinBadge win={!!bestA && bestB.score > bestA.score} />
                    </div>
                  ) : <p className="text-sm text-muted-foreground">—</p>
                }
              />

              {/* Monthly heatmap */}
              {(calA || calB) && (
                <CompareRow
                  label="Year-round"
                  icon={<Star className="h-4 w-4" />}
                  cellA={
                    calA ? (
                      <div>
                        <div className="flex gap-0.5 mb-1">
                          {calA.map((m, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-5 rounded-sm ${monthColor(overallScore(m))} ${i === bestA?.month ? "ring-1 ring-primary ring-offset-1" : ""}`}
                              title={`${MONTHS[i]}: ${overallScore(m).toFixed(1)}/5`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-0.5">
                          {MONTHS.map((m, i) => (
                            <div key={i} className={`flex-1 text-center text-[7px] font-medium ${i === bestA?.month ? "text-primary font-bold" : "text-muted-foreground/40"}`}>{m[0]}</div>
                          ))}
                        </div>
                      </div>
                    ) : <p className="text-sm text-muted-foreground">No data</p>
                  }
                  cellB={
                    calB ? (
                      <div>
                        <div className="flex gap-0.5 mb-1">
                          {calB.map((m, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-5 rounded-sm ${monthColor(overallScore(m))} ${i === bestB?.month ? "ring-1 ring-primary ring-offset-1" : ""}`}
                              title={`${MONTHS[i]}: ${overallScore(m).toFixed(1)}/5`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-0.5">
                          {MONTHS.map((m, i) => (
                            <div key={i} className={`flex-1 text-center text-[7px] font-medium ${i === bestB?.month ? "text-primary font-bold" : "text-muted-foreground/40"}`}>{m[0]}</div>
                          ))}
                        </div>
                      </div>
                    ) : <p className="text-sm text-muted-foreground">No data</p>
                  }
                />
              )}

              {/* Green months */}
              {(greenA !== null || greenB !== null) && (
                <CompareRow
                  label="Good Months"
                  icon={<span className="text-xs">✦</span>}
                  cellA={
                    greenA !== null ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-2xl text-foreground">{greenA}</span>
                        <span className="text-xs text-muted-foreground">of 12 months</span>
                        <WinBadge win={greenB !== null && greenA > greenB} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                  cellB={
                    greenB !== null ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-bold text-2xl text-foreground">{greenB}</span>
                        <span className="text-xs text-muted-foreground">of 12 months</span>
                        <WinBadge win={greenA !== null && greenB > greenA} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                />
              )}

              {/* Daily cost */}
              {(dailyA !== null || dailyB !== null) && (
                <CompareRow
                  label="Daily Cost"
                  icon={<DollarSign className="h-4 w-4" />}
                  cellA={
                    dailyA !== null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-foreground">${dailyA}</span>
                          <span className="text-xs text-muted-foreground">/day</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{TIER_LABELS[tier]} tier</p>
                        <WinBadge win={dailyB !== null && dailyA < dailyB} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                  cellB={
                    dailyB !== null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-foreground">${dailyB}</span>
                          <span className="text-xs text-muted-foreground">/day</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{TIER_LABELS[tier]} tier</p>
                        <WinBadge win={dailyA !== null && dailyB < dailyA} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                />
              )}

              {/* Budget breakdown */}
              {(budA || budB) && (
                <CompareRow
                  label="Breakdown"
                  icon={<TrendingDown className="h-4 w-4" />}
                  cellA={
                    budA ? (
                      <div className="space-y-1 text-xs">
                        {[
                          ["Hotel/night", budA.tiers[tier].hotelPerNight],
                          ["Food/day", budA.tiers[tier].foodPerDay],
                          ["Activities", budA.tiers[tier].activitiesPerDay],
                          ["Transport", budA.tiers[tier].transportPerDay],
                        ].map(([label, val]) => (
                          <div key={label as string} className="flex items-center justify-between gap-2">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-semibold text-foreground">${val}</span>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                  cellB={
                    budB ? (
                      <div className="space-y-1 text-xs">
                        {[
                          ["Hotel/night", budB.tiers[tier].hotelPerNight],
                          ["Food/day", budB.tiers[tier].foodPerDay],
                          ["Activities", budB.tiers[tier].activitiesPerDay],
                          ["Transport", budB.tiers[tier].transportPerDay],
                        ].map(([label, val]) => (
                          <div key={label as string} className="flex items-center justify-between gap-2">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-semibold text-foreground">${val}</span>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                />
              )}

              {/* Flights */}
              {(flightA !== null || flightB !== null) && (
                <CompareRow
                  label="Flight Est."
                  icon={<Plane className="h-4 w-4" />}
                  cellA={
                    flightA !== null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-foreground">${flightA.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{ORIGIN_LABELS[origin]} avg one-way</p>
                        {budA && (
                          <p className="text-[11px] text-muted-foreground">
                            ${budA.flightEstimate[origin]?.min}–${budA.flightEstimate[origin]?.max} range
                          </p>
                        )}
                        <WinBadge win={flightB !== null && flightA < flightB} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                  cellB={
                    flightB !== null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-foreground">${flightB.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{ORIGIN_LABELS[origin]} avg one-way</p>
                        {budB && (
                          <p className="text-[11px] text-muted-foreground">
                            ${budB.flightEstimate[origin]?.min}–${budB.flightEstimate[origin]?.max} range
                          </p>
                        )}
                        <WinBadge win={flightA !== null && flightB < flightA} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                />
              )}

              {/* Trip cost estimate */}
              {(dailyA !== null || dailyB !== null) && (
                <CompareRow
                  label={`${tripNights}-Night Trip`}
                  icon={<Clock className="h-4 w-4" />}
                  cellA={
                    dailyA !== null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-foreground">
                            ${((dailyA * tripNights) + (flightA ?? 0)).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          ${(dailyA * tripNights).toLocaleString()} living + ${(flightA ?? 0).toLocaleString()} flight est.
                        </p>
                        <WinBadge win={dailyB !== null && (dailyA * tripNights + (flightA ?? 0)) < (dailyB * tripNights + (flightB ?? 0))} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                  cellB={
                    dailyB !== null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-2xl text-foreground">
                            ${((dailyB * tripNights) + (flightB ?? 0)).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          ${(dailyB * tripNights).toLocaleString()} living + ${(flightB ?? 0).toLocaleString()} flight est.
                        </p>
                        <WinBadge win={dailyA !== null && (dailyB * tripNights + (flightB ?? 0)) < (dailyA * tripNights + (flightA ?? 0))} />
                      </div>
                    ) : <p className="text-sm text-muted-foreground">—</p>
                  }
                />
              )}

              {/* Quick facts */}
              <CompareRow
                label="Quick Facts"
                icon={<Globe className="h-4 w-4" />}
                cellA={
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Best time: <span className="text-foreground font-medium">{destA.quickFacts.bestTime}</span></span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Visa: <span className="text-foreground font-medium">{destA.quickFacts.visaRequired}</span></span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Languages className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Language: <span className="text-foreground font-medium">{destA.quickFacts.language}</span></span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Currency: <span className="text-foreground font-medium">{destA.quickFacts.currency}</span></span>
                    </div>
                  </div>
                }
                cellB={
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Best time: <span className="text-foreground font-medium">{destB.quickFacts.bestTime}</span></span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Visa: <span className="text-foreground font-medium">{destB.quickFacts.visaRequired}</span></span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Languages className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Language: <span className="text-foreground font-medium">{destB.quickFacts.language}</span></span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Currency: <span className="text-foreground font-medium">{destB.quickFacts.currency}</span></span>
                    </div>
                  </div>
                }
              />

              {/* Intro snippet */}
              <CompareRow
                label="About"
                icon={<MapPin className="h-4 w-4" />}
                cellA={
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    {destA.intro}
                  </p>
                }
                cellB={
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    {destB.intro}
                  </p>
                }
              />

              {/* CTA row */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-px bg-border">
                <div className="bg-muted/20 p-4">
                  <Link
                    href={`/destinations/${slugA}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Full {destA.name} guide <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-muted/10 px-3 flex items-center justify-center min-w-[80px]" />
                <div className="bg-muted/20 p-4">
                  <Link
                    href={`/destinations/${slugB}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Full {destB.name} guide <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="rounded-2xl border border-dashed border-border bg-muted/20 py-10 text-center">
                <ArrowLeftRight className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <p className="font-display font-bold text-base text-foreground mb-1">Select both destinations to compare</p>
                <p className="text-sm text-muted-foreground">Use the pickers above — or try a popular match-up below</p>
              </div>

              {/* Popular pairs */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" /> Popular comparisons
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {POPULAR_PAIRS.map(pair => {
                    const da = destinationMap[pair.a];
                    const db = destinationMap[pair.b];
                    if (!da || !db) return null;
                    return (
                      <button
                        key={pair.label}
                        onClick={() => { setSlugA(pair.a); setSlugB(pair.b); }}
                        className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md text-left"
                      >
                        <div className="flex h-16">
                          <img src={da.heroImage} alt={da.name} className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <img src={db.heroImage} alt={db.name} className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <p className="absolute bottom-1.5 left-0 right-0 text-center text-[10px] font-bold text-white px-1 leading-tight">
                          {pair.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Trip planner CTA */}
          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="font-display font-bold text-base text-foreground">Want to visit both?</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Open the Trip Planner with {destA.name} and {destB.name} pre-loaded — get an optimal route and budget breakdown.
                </p>
              </div>
              <Link
                href={`/trip-planner?d=${slugA}:7,${slugB}:7&tier=${tier}&from=${origin}`}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Open Trip Planner <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
