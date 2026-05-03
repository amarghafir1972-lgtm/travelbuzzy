import { motion } from "framer-motion";
import { Sun, Users, DollarSign, Info } from "lucide-react";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";
import type { MonthRating } from "@/data/monthCalendar";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Score = 1 | 2 | 3 | 4 | 5;

const overallColors: Record<number, string> = {
  5: "bg-emerald-500 text-white",
  4: "bg-emerald-300 text-emerald-900",
  3: "bg-amber-300 text-amber-900",
  2: "bg-orange-400 text-white",
  1: "bg-rose-500 text-white",
};

const overallBg: Record<number, string> = {
  5: "bg-emerald-500",
  4: "bg-emerald-300",
  3: "bg-amber-300",
  2: "bg-orange-400",
  1: "bg-rose-500",
};

const rowColors: Record<string, Record<Score, string>> = {
  weather: {
    5: "bg-sky-500",
    4: "bg-sky-300",
    3: "bg-amber-300",
    2: "bg-orange-300",
    1: "bg-rose-400",
  },
  crowds: {
    5: "bg-emerald-400",
    4: "bg-emerald-300",
    3: "bg-amber-300",
    2: "bg-orange-300",
    1: "bg-rose-500",
  },
  price: {
    5: "bg-violet-400",
    4: "bg-violet-300",
    3: "bg-amber-300",
    2: "bg-orange-300",
    1: "bg-rose-400",
  },
};

const labels: Record<string, Record<Score, string>> = {
  weather: { 5: "Great", 4: "Good", 3: "Okay", 2: "Rainy", 1: "Bad" },
  crowds: { 5: "Quiet", 4: "Calm", 3: "Moderate", 2: "Busy", 1: "Packed" },
  price: { 5: "Cheapest", 4: "Good value", 3: "Moderate", 2: "Pricey", 1: "Peak rates" },
};

const overallLabel: Record<number, { text: string; emoji: string }> = {
  5: { text: "Sweet spot", emoji: "✦" },
  4: { text: "Great time", emoji: "✓" },
  3: { text: "Decent", emoji: "~" },
  2: { text: "Avoid if possible", emoji: "↓" },
  1: { text: "Not recommended", emoji: "✕" },
};

function Cell({
  value,
  colorMap,
  delay,
  tooltip,
}: {
  value: Score;
  colorMap: Record<Score, string>;
  delay: number;
  tooltip: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay }}
      title={tooltip}
      className={`h-5 rounded-sm ${colorMap[value]} cursor-default`}
    />
  );
}

export default function BestTimeCalendar({ slug }: { slug: string }) {
  const data = getMonthCalendar(slug);
  if (!data) return null;

  const currentMonth = new Date().getMonth();
  const scores = data.map(overallScore);
  const sweetSpotMonths = MONTHS.filter((_, i) => scores[i] >= 4);

  const rows: { key: keyof MonthRating; label: string; icon: React.ReactNode }[] = [
    { key: "weather", label: "Weather", icon: <Sun className="h-3.5 w-3.5" /> },
    { key: "crowds", label: "Crowds", icon: <Users className="h-3.5 w-3.5" /> },
    { key: "price", label: "Price", icon: <DollarSign className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-base text-foreground">Best Time to Visit</h3>
          {sweetSpotMonths.length > 0 && (
            <p className="text-xs text-emerald-600 font-medium mt-0.5">
              ✦ Sweet spot: {sweetSpotMonths.join(", ")}
            </p>
          )}
        </div>
        <div className="group relative">
          <Info className="h-4 w-4 text-muted-foreground/50 cursor-help" />
          <div className="absolute right-0 top-6 z-10 w-52 bg-foreground text-background text-xs rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Ratings combine weather, tourist crowds, and hotel prices to show the best overall months.
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-5 space-y-4">
        {/* Overall heatmap row */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Overall</p>
          <div className="grid grid-cols-12 gap-1">
            {data.map((m, i) => {
              const score = overallScore(m);
              const isNow = i === currentMonth;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-full h-8 rounded-lg flex items-center justify-center text-[10px] font-bold cursor-default transition-all relative ${overallColors[score]} ${isNow ? "ring-2 ring-primary ring-offset-1" : ""}`}
                    title={`${MONTHS[i]}: ${overallLabel[score].text}`}
                  >
                    {overallLabel[score].emoji}
                    {isNow && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className={`text-[9px] font-medium ${isNow ? "text-primary font-bold" : "text-muted-foreground"}`}>
                    {MONTHS[i]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-border" />

        {/* Per-factor rows */}
        <div className="space-y-2.5">
          {rows.map((row, rowIdx) => (
            <div key={row.key}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-muted-foreground/70">{row.icon}</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{row.label}</p>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {data.map((m, i) => (
                  <Cell
                    key={i}
                    value={m[row.key] as Score}
                    colorMap={rowColors[row.key] as Record<Score, string>}
                    delay={rowIdx * 0.05 + i * 0.02}
                    tooltip={`${MONTHS[i]}: ${labels[row.key][m[row.key] as Score]}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="border-t border-dashed border-border pt-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Legend (overall)</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {([5, 4, 3, 2, 1] as const).map((s) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-sm ${overallBg[s]}`} />
                <span className="text-[10px] text-muted-foreground">{overallLabel[s].text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current month note */}
        {(() => {
          const score = scores[currentMonth];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`flex items-start gap-2 rounded-xl p-3 text-xs ${
                score >= 4 ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : score === 3 ? "bg-amber-50 border border-amber-200 text-amber-800"
                : "bg-orange-50 border border-orange-200 text-orange-800"
              }`}
            >
              <span className="text-base leading-none">
                {score >= 4 ? "🟢" : score === 3 ? "🟡" : "🔴"}
              </span>
              <div>
                <p className="font-bold">{MONTHS[currentMonth]} — {overallLabel[score].text}</p>
                <p className="opacity-80 mt-0.5 leading-relaxed">
                  {score >= 4
                    ? "This month is one of the best times to visit."
                    : score === 3
                    ? "An okay time — not peak, not ideal."
                    : "This month is generally not recommended. Consider adjusting your dates."}
                </p>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
}
