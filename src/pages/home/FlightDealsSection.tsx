import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plane, Clock, AlertCircle } from "lucide-react";
import flightData, { type Continent } from "@/data/flightData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const CONTINENTS: { label: string; value: Continent | "All" }[] = [
  { label: "🌍 All",      value: "All" },
  { label: "🌏 Asia",     value: "Asia" },
  { label: "🏛️ Europe",  value: "Europe" },
  { label: "🌎 Americas", value: "Americas" },
  { label: "🦁 Africa",   value: "Africa" },
  { label: "🌊 Oceania",  value: "Oceania" },
];

function PriceBar({ priceLow, cityId }: { priceLow: number; cityId: string }) {
  const maxMap: Record<string, number> = {
    london: 1850, "new-york": 2100, sydney: 2400,
  };
  const max = maxMap[cityId] ?? 2000;
  const pct = Math.min(100, Math.round((priceLow / max) * 100));
  const color =
    pct < 25 ? "bg-emerald-500" : pct < 50 ? "bg-lime-400" : pct < 70 ? "bg-yellow-400" : "bg-orange-400";
  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function FlightDealsSection() {
  const [activeCity, setActiveCity] = useState(flightData[0].id);
  const [activeContinent, setActiveContinent] = useState<Continent | "All">("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const city = flightData.find((c) => c.id === activeCity) ?? flightData[0];
  const routes =
    activeContinent === "All"
      ? city.routes
      : city.routes.filter((r) => r.continent === activeContinent);

  return (
    <section id="flights" className="py-16 md:py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">
            Flight Prices
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                How much does it cost to fly?
              </h2>
              <p className="text-muted-foreground mt-2 text-sm max-w-xl">
                Typical economy fares, best airlines, and cheapest months — updated regularly. Click any card for tips.
              </p>
            </div>

            {/* Departure city tabs */}
            <div className="flex gap-2 shrink-0">
              {flightData.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setActiveCity(c.id); setExpanded(null); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    activeCity === c.id
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/30"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span className="hidden sm:inline">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continent filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CONTINENTS.map((c) => {
            const count =
              c.value === "All"
                ? city.routes.length
                : city.routes.filter((r) => r.continent === c.value).length;
            const active = activeContinent === c.value;
            return (
              <button
                key={c.value}
                onClick={() => { setActiveContinent(c.value); setExpanded(null); }}
                disabled={count === 0}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "bg-primary text-white border-primary shadow-sm"
                    : count === 0
                    ? "opacity-30 cursor-not-allowed border-border text-muted-foreground"
                    : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
                }`}
              >
                {c.label}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCity}-${activeContinent}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {routes.length === 0 ? (
              <motion.div
                variants={cardAnim}
                className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground gap-2"
              >
                <span className="text-4xl">✈️</span>
                <p className="text-sm font-medium">No routes from {city.label} to {activeContinent} yet</p>
                <p className="text-xs">Try a different departure city or continent</p>
              </motion.div>
            ) : (
              routes.map((route) => {
                const isOpen = expanded === route.destSlug;
                return (
                  <motion.div key={route.destSlug} variants={cardAnim}>
                    <div
                      className={`rounded-2xl border bg-card overflow-hidden cursor-pointer transition-shadow duration-200 ${
                        isOpen ? "shadow-lg border-foreground/20" : "hover:shadow-md border-border"
                      }`}
                      onClick={() => setExpanded(isOpen ? null : route.destSlug)}
                    >
                      {/* Hero image */}
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={route.destImage}
                          alt={route.destName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-1">
                          <p className="text-white font-display font-bold text-base leading-tight">
                            {route.destFlag} {route.destName}
                          </p>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            {route.directAvailable && (
                              <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">
                                Direct
                              </span>
                            )}
                            <span className="text-[9px] font-bold bg-black/40 text-white/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                              {route.continent}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price block */}
                      <div className="p-3">
                        <div className="flex items-baseline justify-between mb-1.5">
                          <p className="font-display font-bold text-xl text-foreground">
                            {route.priceRange}
                          </p>
                        </div>
                        <PriceBar priceLow={route.priceLow} cityId={city.id} />

                        <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />{route.durationHrs}
                          </span>
                          <span className="flex items-center gap-1 ml-auto">
                            <Plane className="h-3 w-3" />
                            {route.directAvailable ? "Direct available" : "Via connection"}
                          </span>
                        </div>

                        {/* Cheapest months */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {route.cheapestMonths.map((m) => (
                            <span key={m} className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                              {m}
                            </span>
                          ))}
                          <span className="text-[10px] text-muted-foreground self-center ml-1">cheapest</span>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3 border-t border-border pt-3 space-y-3">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Route</p>
                                <p className="text-xs text-foreground">{city.flag} {city.label} → {route.destFlag} {route.destName}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{route.directNote}</p>
                              </div>

                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">Top airlines</p>
                                <div className="flex flex-wrap gap-1">
                                  {route.airlines.map((a) => (
                                    <span key={a} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                      {a}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex gap-2">
                                <span className="text-amber-500 shrink-0 text-sm">💡</span>
                                <p className="text-[11px] text-amber-900 leading-snug">{route.tip}</p>
                              </div>

                              <div className="flex items-center justify-between pt-0.5">
                                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
                                  💰 {route.saving}
                                </span>
                                <a
                                  href={route.searchUrl}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1 text-xs font-medium text-primary hover:gap-1.5 transition-all"
                                >
                                  Search flights <ArrowRight className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Collapse/expand hint */}
                      <div className="px-3 pb-2.5 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">
                          {isOpen ? "Click to collapse" : "Click for airlines & tips"}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-muted-foreground text-xs"
                        >
                          ▾
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-2 p-4 rounded-xl bg-muted/50 border border-border">
          <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Prices are indicative.</strong> Fares shown are typical economy class ranges based on historical data and are not live quotes. Actual prices vary with demand, booking time, and availability. Always search multiple booking platforms. Some links may be affiliate links — see our{" "}
            <a href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-foreground">
              Affiliate Disclosure
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
