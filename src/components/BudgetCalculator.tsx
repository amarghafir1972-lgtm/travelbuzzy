import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble, UtensilsCrossed, Ticket, Bus, Plane, Calculator,
  ChevronDown, ChevronUp, Info
} from "lucide-react";
import { getDestinationBudget } from "@/data/budgetData";
import type { Tier, Origin } from "@/data/budgetData";

const TIER_CONFIG: { key: Tier; label: string; emoji: string; desc: string }[] = [
  { key: "budget",  label: "Budget",    emoji: "🎒", desc: "Hostels, street food, local transport" },
  { key: "mid",     label: "Mid-range", emoji: "✈️", desc: "Boutique hotels, restaurants, day trips" },
  { key: "luxury",  label: "Luxury",    emoji: "🥂", desc: "5-star hotels, fine dining, private tours" },
];

const ORIGIN_CONFIG: { key: Origin; label: string }[] = [
  { key: "uk", label: "From UK" },
  { key: "us", label: "From US" },
];

const SEGMENT_COLORS = [
  { key: "hotel",      label: "Hotel",       color: "bg-primary",     textColor: "text-primary"     },
  { key: "food",       label: "Food",        color: "bg-sky-500",     textColor: "text-sky-600"     },
  { key: "activities", label: "Activities",  color: "bg-violet-500",  textColor: "text-violet-600"  },
  { key: "transport",  label: "Transport",   color: "bg-amber-400",   textColor: "text-amber-600"   },
  { key: "flights",    label: "Flights",     color: "bg-rose-500",    textColor: "text-rose-600"    },
];

function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const startRef = useRef<{ value: number; time: number } | null>(null);

  useEffect(() => {
    const startValue = display;
    startRef.current = { value: startValue, time: performance.now() };

    const animate = (now: number) => {
      if (!startRef.current) return;
      const elapsed = now - startRef.current.time;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startRef.current.value + (target - startRef.current.value) * ease));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

function AnimatedTotal({ value }: { value: number }) {
  const displayed = useAnimatedNumber(value);
  return <span>${displayed.toLocaleString()}</span>;
}

export default function BudgetCalculator({ slug, destinationName }: { slug: string; destinationName: string }) {
  const data = getDestinationBudget(slug);
  const [nights, setNights] = useState(7);
  const [tier, setTier] = useState<Tier>("mid");
  const [origin, setOrigin] = useState<Origin>("uk");
  const [includeFlights, setIncludeFlights] = useState(true);
  const [expanded, setExpanded] = useState(true);

  if (!data) return null;

  const costs = data.tiers[tier];
  const flightAvg = Math.round((data.flightEstimate[origin].min + data.flightEstimate[origin].max) / 2);

  const hotelTotal       = costs.hotelPerNight * nights;
  const foodTotal        = costs.foodPerDay * nights;
  const activitiesTotal  = costs.activitiesPerDay * nights;
  const transportTotal   = costs.transportPerDay * nights;
  const flightsTotal     = includeFlights ? flightAvg : 0;
  const grandTotal       = hotelTotal + foodTotal + activitiesTotal + transportTotal + flightsTotal;

  const segments = [
    { key: "hotel",      value: hotelTotal      },
    { key: "food",       value: foodTotal       },
    { key: "activities", value: activitiesTotal  },
    { key: "transport",  value: transportTotal   },
    { key: "flights",    value: flightsTotal     },
  ];

  const perDay = Math.round(grandTotal / nights);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-surface border border-border rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-6 py-4 border-b border-border hover:bg-muted/30 transition-colors text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calculator className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">Trip Budget Calculator</h2>
            <p className="text-xs text-muted-foreground">Estimate your total cost for {destinationName}</p>
          </div>
        </div>
        {expanded
          ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
          : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">

              {/* Controls */}
              <div className="grid sm:grid-cols-3 gap-4">

                {/* Nights slider */}
                <div className="sm:col-span-3 md:col-span-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Trip length
                    </label>
                    <span className="text-sm font-bold text-primary bg-primary/8 px-2.5 py-0.5 rounded-full">
                      {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={21}
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>2</span><span>7</span><span>14</span><span>21</span>
                  </div>
                </div>

                {/* Tier */}
                <div className="sm:col-span-3 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Travel style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIER_CONFIG.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTier(t.key)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all ${
                          tier === t.key
                            ? "border-primary bg-primary/8 shadow-sm"
                            : "border-border hover:border-primary/40 hover:bg-muted/40"
                        }`}
                      >
                        <span className="text-xl">{t.emoji}</span>
                        <span className={`text-xs font-bold ${tier === t.key ? "text-primary" : "text-foreground"}`}>
                          {t.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                          {t.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flight option */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setIncludeFlights(!includeFlights)}
                    className={`w-10 h-5.5 rounded-full relative transition-colors cursor-pointer ${includeFlights ? "bg-primary" : "bg-muted-foreground/30"}`}
                  >
                    <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all ${includeFlights ? "left-[22px]" : "left-0.5"}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">Include return flights</span>
                </label>

                {includeFlights && (
                  <div className="flex gap-1.5">
                    {ORIGIN_CONFIG.map((o) => (
                      <button
                        key={o.key}
                        onClick={() => setOrigin(o.key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          origin === o.key ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <Plane className="h-3 w-3" />
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Stacked bar */}
              <div className="space-y-2">
                <div className="h-5 rounded-full overflow-hidden flex">
                  {segments.map((seg, i) => {
                    const pct = grandTotal > 0 ? (seg.value / grandTotal) * 100 : 0;
                    const config = SEGMENT_COLORS.find((c) => c.key === seg.key)!;
                    return (
                      <motion.div
                        key={seg.key}
                        title={`${config.label}: $${seg.value.toLocaleString()}`}
                        className={`h-full ${config.color} transition-all duration-300 cursor-default`}
                        animate={{ width: `${pct}%` }}
                        initial={false}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ minWidth: pct > 0.5 ? undefined : 0 }}
                      />
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {segments.map((seg) => {
                    const config = SEGMENT_COLORS.find((c) => c.key === seg.key)!;
                    const icons: Record<string, React.ReactNode> = {
                      hotel:      <BedDouble className="h-3 w-3" />,
                      food:       <UtensilsCrossed className="h-3 w-3" />,
                      activities: <Ticket className="h-3 w-3" />,
                      transport:  <Bus className="h-3 w-3" />,
                      flights:    <Plane className="h-3 w-3" />,
                    };
                    return (
                      <div key={seg.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className={`w-2.5 h-2.5 rounded-sm ${config.color}`} />
                        <span className={`${config.textColor}`}>{icons[seg.key]}</span>
                        <span>{config.label}</span>
                        <span className="font-semibold text-foreground">${seg.value.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gradient-to-br from-primary/6 to-primary/3 border border-primary/15 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-0.5">Estimated total</p>
                  <p className="font-display font-bold text-3xl text-foreground">
                    <AnimatedTotal value={grandTotal} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ≈ <AnimatedTotal value={perDay} /> per day · {nights} nights · {TIER_CONFIG.find(t => t.key === tier)?.label}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5" />
                    Based on real hotel prices in our guide
                  </div>
                  {includeFlights && (
                    <p className="text-xs text-muted-foreground">
                      Flights: ${data.flightEstimate[origin].min.toLocaleString()}–${data.flightEstimate[origin].max.toLocaleString()} est.
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground/60 max-w-[200px] text-right">
                    Estimates only — prices vary by season and availability.
                  </p>
                </div>
              </div>

              {/* Tier comparison mini-table */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Compare travel styles ({nights} nights{includeFlights ? " + flights" : ""})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TIER_CONFIG.map((t) => {
                    const c = data.tiers[t.key];
                    const total = (c.hotelPerNight + c.foodPerDay + c.activitiesPerDay + c.transportPerDay) * nights
                      + (includeFlights ? Math.round((data.flightEstimate[origin].min + data.flightEstimate[origin].max) / 2) : 0);
                    const isActive = t.key === tier;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setTier(t.key)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isActive ? "border-primary bg-primary text-white" : "border-border hover:border-primary/40 bg-surface"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wide mb-1 opacity-70">{t.label}</p>
                        <p className={`font-display font-bold text-lg ${isActive ? "text-white" : "text-foreground"}`}>
                          ${total.toLocaleString()}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${isActive ? "text-white/70" : "text-muted-foreground"}`}>
                          ${Math.round(total / nights)}/day
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {data.note && (
                <p className="text-xs text-muted-foreground/70 border-t border-border pt-3 flex items-start gap-1.5">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />
                  {data.note}
                </p>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
