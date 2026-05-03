import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bestTimeData, { MONTHS, MONTHS_FULL, type MonthData } from "@/data/bestTimeData";

const overallColor = (r: number) => {
  if (r >= 5) return "bg-emerald-500";
  if (r >= 4) return "bg-lime-400";
  if (r >= 3) return "bg-yellow-400";
  if (r >= 2) return "bg-orange-400";
  return "bg-red-400";
};

const overallTextColor = (r: number) => {
  if (r >= 5) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (r >= 4) return "text-lime-700 bg-lime-50 border-lime-200";
  if (r >= 3) return "text-yellow-700 bg-yellow-50 border-yellow-200";
  if (r >= 2) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-red-700 bg-red-50 border-red-200";
};

const overallLabel = (r: number) => {
  if (r >= 5) return "Perfect";
  if (r >= 4) return "Great";
  if (r >= 3) return "Good";
  if (r >= 2) return "Mixed";
  return "Avoid";
};

const crowdIcon = (label: string) => {
  const map: Record<string, string> = { Empty: "👤", Quiet: "👥", Moderate: "👥👥", Busy: "👥👥👥", Packed: "🚶🚶🚶🚶" };
  return map[label] ?? "👥";
};

const priceIcon = (label: string) => {
  const map: Record<string, string> = { Cheapest: "$", Budget: "$$", Moderate: "$$$", Pricey: "$$$$", Premium: "$$$$$" };
  return map[label] ?? "$$$";
};

interface TooltipProps { month: MonthData; monthName: string; dest: string; }

function CellTooltip({ month, monthName, dest }: TooltipProps) {
  return (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-foreground text-background rounded-xl shadow-xl p-3 text-left pointer-events-none">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-bold">{dest} · {monthName}</p>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${overallTextColor(month.overall)}`}>
          {overallLabel(month.overall)}
        </span>
      </div>
      <p className="text-[11px] text-background/75 leading-snug mb-2">{month.weatherNote}</p>
      <div className="flex gap-3 text-[11px] mb-2">
        <span title="Crowds">{crowdIcon(month.crowdLabel)} {month.crowdLabel}</span>
        <span title="Price">{priceIcon(month.priceLabel)} {month.priceLabel}</span>
      </div>
      {month.tip && (
        <p className="text-[11px] text-background/60 border-t border-background/20 pt-2 leading-snug">
          💡 {month.tip}
        </p>
      )}
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
    </div>
  );
}

export default function BestTimeSection() {
  const [hoveredCell, setHoveredCell] = useState<{ destIdx: number; monthIdx: number } | null>(null);
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const currentMonthIdx = new Date().getMonth();

  const filteredData = bestTimeData;

  return (
    <section id="best-time" className="py-16 md:py-24 bg-[#F7F6F2] border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">
              Plan Your Trip
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Best time to visit — all destinations
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-xl">
              Hover any cell for weather, crowd levels, and price. Click a month to highlight it across all destinations.
            </p>
          </div>
        </div>

        {/* Month filter pills */}
        <div className="flex gap-1.5 flex-wrap mb-6">
          <button
            onClick={() => setActiveMonth(null)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              activeMonth === null
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            All months
          </button>
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => setActiveMonth(activeMonth === i ? null : i)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeMonth === i
                  ? "bg-foreground text-background border-foreground"
                  : i === currentMonthIdx
                  ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {m}
              {i === currentMonthIdx && activeMonth !== i && (
                <span className="ml-1 text-[9px] text-primary font-bold">NOW</span>
              )}
            </button>
          ))}
        </div>

        {/* Heat-map grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="overflow-x-auto rounded-2xl border border-border bg-background shadow-sm"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-28 sticky left-0 bg-background z-10">
                  Destination
                </th>
                {MONTHS.map((m, i) => (
                  <th
                    key={m}
                    className={`text-center py-3 text-xs font-semibold transition-colors ${
                      activeMonth === i
                        ? "text-foreground bg-muted/60"
                        : i === currentMonthIdx
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    style={{ minWidth: "46px" }}
                  >
                    {m}
                    {i === currentMonthIdx && (
                      <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-0.5" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dest, dIdx) => (
                <tr key={dest.slug} className={`border-b border-border last:border-0 ${dIdx % 2 === 0 ? "" : "bg-muted/20"}`}>
                  {/* Destination label */}
                  <td className="px-4 py-2 sticky left-0 z-10 bg-background" style={{ background: dIdx % 2 === 0 ? "var(--background)" : undefined }}>
                    <Link href={`/destinations/${dest.slug}`} className="group flex items-center gap-1.5">
                      <span className="text-base">{dest.flag}</span>
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        {dest.name}
                      </span>
                    </Link>
                  </td>

                  {/* Month cells */}
                  {dest.months.map((month, mIdx) => {
                    const isHovered = hoveredCell?.destIdx === dIdx && hoveredCell?.monthIdx === mIdx;
                    const isActiveMonth = activeMonth === mIdx;
                    const isDimmed = activeMonth !== null && !isActiveMonth;

                    return (
                      <td
                        key={mIdx}
                        className="text-center py-2 px-0.5 relative"
                        onMouseEnter={() => setHoveredCell({ destIdx: dIdx, monthIdx: mIdx })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div
                          className={`relative mx-auto rounded-lg transition-all duration-150 cursor-pointer ${
                            isDimmed ? "opacity-20" : ""
                          } ${isHovered ? "scale-110 shadow-md z-10" : ""} ${
                            isActiveMonth ? "ring-2 ring-foreground/40 ring-offset-1" : ""
                          }`}
                          style={{ width: 32, height: 32 }}
                        >
                          <div
                            className={`w-full h-full rounded-lg ${overallColor(month.overall)} flex items-center justify-center`}
                          >
                            <span className="text-[10px] font-bold text-white drop-shadow-sm">
                              {month.overall}
                            </span>
                          </div>

                          {/* Tooltip */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                              >
                                <CellTooltip
                                  month={month}
                                  monthName={MONTHS_FULL[mIdx]}
                                  dest={dest.name}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="text-xs text-muted-foreground font-medium">Rating:</span>
          {[
            { label: "Perfect", color: "bg-emerald-500" },
            { label: "Great",   color: "bg-lime-400" },
            { label: "Good",    color: "bg-yellow-400" },
            { label: "Mixed",   color: "bg-orange-400" },
            { label: "Avoid",   color: "bg-red-400" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={`w-3 h-3 rounded-sm ${l.color}`} />
              {l.label}
            </span>
          ))}
          <span className="ml-auto text-xs text-muted-foreground hidden sm:block">
            Hover any cell for weather, crowd &amp; price details
          </span>
        </div>

        {/* Month highlight panel */}
        <AnimatePresence>
          {activeMonth !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {bestTimeData
                  .slice()
                  .sort((a, b) => b.months[activeMonth].overall - a.months[activeMonth].overall)
                  .map((dest) => {
                    const m = dest.months[activeMonth];
                    return (
                      <Link key={dest.slug} href={`/destinations/${dest.slug}`}>
                        <div className="rounded-xl border border-border bg-background p-3 hover:shadow-md transition-shadow cursor-pointer group">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{dest.flag}</span>
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {dest.name}
                            </span>
                            <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full border ${overallTextColor(m.overall)}`}>
                              {overallLabel(m.overall)}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-snug mb-2">{m.weatherNote}</p>
                          <div className="flex gap-2 text-[11px] text-muted-foreground">
                            <span>{crowdIcon(m.crowdLabel)} {m.crowdLabel}</span>
                            <span className="ml-auto">{priceIcon(m.priceLabel)}</span>
                          </div>
                          {m.tip && (
                            <p className="text-[10px] text-muted-foreground/70 mt-2 pt-2 border-t border-border leading-snug">
                              💡 {m.tip}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
