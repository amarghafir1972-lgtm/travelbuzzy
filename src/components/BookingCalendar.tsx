import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Users, Sun, DollarSign, Info, Star, TrendingDown } from "lucide-react";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";
import type { MonthRating } from "@/data/monthCalendar";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

type Score = 1 | 2 | 3 | 4 | 5;

const cardBg: Record<number, string> = {
  5: "bg-emerald-500 border-emerald-600",
  4: "bg-emerald-300 border-emerald-400",
  3: "bg-amber-300 border-amber-400",
  2: "bg-orange-400 border-orange-500",
  1: "bg-rose-500 border-rose-600",
};
const cardText: Record<number, string> = {
  5: "text-white", 4: "text-emerald-950", 3: "text-amber-950", 2: "text-white", 1: "text-white",
};
const overallLabel: Record<number, string> = {
  5: "Sweet spot", 4: "Great time", 3: "Decent", 2: "Not ideal", 1: "Avoid",
};

const priceLabel: Record<Score, string> = {
  5: "Cheapest", 4: "Good value", 3: "Moderate", 2: "Pricey", 1: "Peak rates",
};
const priceColor: Record<Score, string> = {
  5: "text-emerald-600", 4: "text-emerald-500", 3: "text-amber-600", 2: "text-orange-500", 1: "text-rose-500",
};

const demandLabel: Record<Score, string> = {
  1: "Very busy", 2: "High demand", 3: "Moderate", 4: "Light traffic", 5: "Very quiet",
};
const demandColor: Record<Score, string> = {
  1: "text-rose-500", 2: "text-orange-500", 3: "text-amber-600", 4: "text-emerald-500", 5: "text-emerald-600",
};

const weatherLabel: Record<Score, string> = {
  1: "Bad", 2: "Poor", 3: "Mixed", 4: "Good", 5: "Excellent",
};
const weatherColor: Record<Score, string> = {
  1: "text-rose-500", 2: "text-orange-500", 3: "text-amber-600", 4: "text-sky-500", 5: "text-sky-600",
};

function getDollars(price: Score): string {
  return "$".repeat(6 - price);
}

function getMonthTip(m: MonthRating, monthName: string): string {
  const { price, crowds, weather } = m;
  if (price >= 4 && weather >= 4 && crowds >= 4)
    return `${monthName} is a genuine sweet spot — good weather, lighter crowds, and below-peak prices. Book 6–10 weeks ahead to lock in rates before they rise.`;
  if (price <= 1 && crowds <= 1)
    return `${monthName} is peak season. Flights and hotels hit maximum prices — book at least 4–6 months ahead, or shift to shoulder months to save significantly.`;
  if (price >= 4 && weather <= 2)
    return `${monthName} is cheap for a reason — weather is not ideal. If budget matters more than sunshine, it can still be a rewarding trip with fewer tourists.`;
  if (weather >= 4 && price <= 2)
    return `${monthName} has great weather but premium prices. Book well in advance and compare across multiple platforms to limit costs.`;
  if (crowds <= 2 && weather >= 4)
    return `${monthName} combines great weather with high visitor numbers. Sights will be packed and hotels fill up fast — book accommodation early.`;
  if (crowds >= 4 && price >= 4)
    return `${monthName} is quieter than peak with better prices. A solid choice if your dates are flexible — you'll notice the difference in atmosphere.`;
  if (weather <= 2)
    return `${monthName} has challenging weather. Some travellers enjoy the quieter, cheaper atmosphere — just pack accordingly and have backup plans.`;
  return `${monthName} is an average time to visit. Prices and conditions are neither at their best nor worst — a flexible choice for most travellers.`;
}

export default function BookingCalendar({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const data = getMonthCalendar(slug);
  if (!data) return null;

  const currentMonth = new Date().getMonth();
  const [selected, setSelected] = useState<number>(currentMonth);

  const scores = data.map(overallScore);
  const sweetSpots = MONTHS.filter((_, i) => scores[i] >= 4);
  const cheapestMonths = MONTHS.filter((_, i) => data[i].price >= 4);

  const sel = data[selected];

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-1">Price Calendar</p>
            <h3 className="font-display font-bold text-xl text-foreground">Best Month to Book</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Flight prices & hotel demand for {destinationName} — click any month for details
            </p>
          </div>
          {sweetSpots.length > 0 && (
            <div className="flex items-center gap-2 shrink-0 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-400 shrink-0" />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-0.5">Sweet spots</p>
                <p className="text-xs font-semibold text-emerald-700 leading-none">{sweetSpots.slice(0, 5).join(" · ")}</p>
              </div>
            </div>
          )}
        </div>
        {cheapestMonths.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <TrendingDown className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Cheapest flights: <span className="font-semibold text-emerald-700">{cheapestMonths.join(", ")}</span>
            </p>
          </div>
        )}
      </div>

      <div className="px-5 pt-5 pb-6 space-y-5">
        {/* Month grid — 6 cols on sm+, 4 cols on xs */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
          {data.map((m, i) => {
            const score = scores[i];
            const isSelected = selected === i;
            const isNow = i === currentMonth;

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.22, delay: i * 0.025 }}
                onClick={() => setSelected(i)}
                className={`relative flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all duration-200 select-none
                  ${cardBg[score]} ${cardText[score]}
                  ${isSelected ? "ring-2 ring-primary ring-offset-2 scale-[1.08] shadow-md z-10" : "hover:scale-[1.04] hover:shadow-sm"}
                `}
              >
                {score >= 4 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                    <Star className="h-2.5 w-2.5 fill-yellow-900 text-yellow-900" />
                  </span>
                )}
                <span className="text-[11px] font-bold leading-none">{MONTHS[i]}</span>
                <span className="text-[9px] font-mono font-semibold opacity-75 leading-none tracking-tighter">
                  {getDollars(m.price as Score)}
                </span>
                {isNow && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-muted-foreground">
          {([5, 4, 3, 2, 1] as const).map((s) => (
            <span key={s} className="flex items-center gap-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-sm ${cardBg[s].split(" ")[0]}`} />
              {overallLabel[s]}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> Sweet spot
          </span>
          <span className="text-muted-foreground/60">· $ = cheapest &nbsp; $$$$$ = peak price</span>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Detail header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display font-bold text-lg text-foreground">
                  {FULL_MONTHS[selected]}
                  {selected === currentMonth && (
                    <span className="ml-2 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full align-middle">
                      This month
                    </span>
                  )}
                </p>
                <p className={`text-xs font-semibold mt-0.5 ${
                  scores[selected] >= 4 ? "text-emerald-600" :
                  scores[selected] >= 3 ? "text-amber-600" : "text-rose-500"
                }`}>
                  {overallLabel[scores[selected]]}
                </p>
              </div>
              {scores[selected] >= 4 && (
                <span className="flex items-center gap-1 text-xs font-bold text-yellow-800 bg-yellow-100 border border-yellow-300 px-2.5 py-1 rounded-full">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> Sweet spot
                </span>
              )}
            </div>

            {/* 3-metric cards */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {/* Flight price */}
              <div className="bg-muted/50 border border-border rounded-xl p-3 text-center">
                <Plane className="h-4 w-4 mx-auto mb-1.5 text-primary" />
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Flight price</p>
                <p className={`text-xs font-bold ${priceColor[sel.price as Score]}`}>
                  {priceLabel[sel.price as Score]}
                </p>
                <p className={`text-[11px] font-mono font-bold mt-1 ${priceColor[sel.price as Score]}`}>
                  {getDollars(sel.price as Score)}
                </p>
              </div>

              {/* Hotel demand */}
              <div className="bg-muted/50 border border-border rounded-xl p-3 text-center">
                <Users className="h-4 w-4 mx-auto mb-1.5 text-primary" />
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Hotel demand</p>
                <p className={`text-xs font-bold ${demandColor[sel.crowds as Score]}`}>
                  {demandLabel[sel.crowds as Score]}
                </p>
                {/* Demand bar — high crowds = high demand = more filled bars */}
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className={`w-2 h-3 rounded-sm transition-colors ${
                        j < (6 - sel.crowds)
                          ? sel.crowds <= 2 ? "bg-rose-400" : sel.crowds === 3 ? "bg-amber-400" : "bg-emerald-400"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Weather */}
              <div className="bg-muted/50 border border-border rounded-xl p-3 text-center">
                <Sun className="h-4 w-4 mx-auto mb-1.5 text-primary" />
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Weather</p>
                <p className={`text-xs font-bold ${weatherColor[sel.weather as Score]}`}>
                  {weatherLabel[sel.weather as Score]}
                </p>
                {/* Weather bar */}
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className={`w-2 h-3 rounded-sm ${j < sel.weather ? "bg-sky-400" : "bg-border"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tip box */}
            <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3">
              <Info className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">
                {getMonthTip(sel, FULL_MONTHS[selected])}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Month navigator arrows row */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setSelected((s) => (s - 1 + 12) % 12)}
            className="text-xs text-muted-foreground hover:text-primary font-medium flex items-center gap-1 transition-colors"
          >
            ← {MONTHS[(selected - 1 + 12) % 12]}
          </button>
          <span className="text-[10px] text-muted-foreground/50">Click any month above or use arrows</span>
          <button
            onClick={() => setSelected((s) => (s + 1) % 12)}
            className="text-xs text-muted-foreground hover:text-primary font-medium flex items-center gap-1 transition-colors"
          >
            {MONTHS[(selected + 1) % 12]} →
          </button>
        </div>
      </div>
    </div>
  );
}
