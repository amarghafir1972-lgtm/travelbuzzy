import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Backpack, ChevronDown, ChevronUp, Check, Copy, Printer,
  CheckCheck, Star, RotateCcw, Info
} from "lucide-react";
import { buildPackingList } from "@/data/packingData";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function usePackingState(categories: ReturnType<typeof buildPackingList>) {
  const allIds = useMemo(
    () => categories.flatMap((c) => c.items.map((i) => i.id)),
    [categories]
  );
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = (categoryId: string, catItems: { id: string }[]) => {
    const ids = catItems.map((i) => i.id);
    const allChecked = ids.every((id) => checked.has(id));
    setChecked((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (allChecked ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  const reset = () => setChecked(new Set());

  const totalChecked = allIds.filter((id) => checked.has(id)).length;
  const totalItems = allIds.length;
  const pct = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  return { checked, toggle, toggleAll, reset, totalChecked, totalItems, pct };
}

export default function PackingList({
  slug,
  destinationName,
  departureMonth,
  nights,
}: {
  slug: string;
  destinationName: string;
  departureMonth: number;
  nights: number;
}) {
  const calendar = getMonthCalendar(slug);
  const weatherScore = calendar ? calendar[departureMonth].weather : 3;

  const categories = useMemo(
    () => buildPackingList(slug, weatherScore, nights),
    [slug, weatherScore, nights]
  );

  const { checked, toggle, toggleAll, reset, totalChecked, totalItems, pct } =
    usePackingState(categories);

  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  );
  const [selectedMonth, setSelectedMonth] = useState(departureMonth);
  const [selectedNights, setSelectedNights] = useState(nights);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCategory = (id: string) =>
    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Recalculate when month/nights changes
  const activeWeather = calendar ? calendar[selectedMonth].weather : 3;
  const activeCategories = useMemo(
    () => buildPackingList(slug, activeWeather, selectedNights),
    [slug, activeWeather, selectedNights]
  );

  const essentialCount = activeCategories.flatMap((c) =>
    c.items.filter((i) => i.essential)
  ).length;

  const copyList = () => {
    const lines = activeCategories.flatMap((cat) => [
      `\n${cat.emoji} ${cat.label.toUpperCase()}`,
      ...cat.items.map((item) => `  ${checked.has(item.id) ? "✓" : "○"} ${item.label}`),
    ]);
    navigator.clipboard.writeText(
      `Packing list for ${destinationName} (${MONTHS[selectedMonth]}, ${selectedNights} nights)\n${lines.join("\n")}`
    );
  };

  const printList = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    const rows = activeCategories
      .map(
        (cat) =>
          `<h3>${cat.emoji} ${cat.label}</h3><ul>${cat.items
            .map((i) => `<li style="list-style:${i.essential ? "disc" : "circle"}">${i.label}${i.note ? ` <small>(${i.note})</small>` : ""}</li>`)
            .join("")}</ul>`
      )
      .join("");
    w.document.write(
      `<html><head><title>Packing list — ${destinationName}</title><style>body{font-family:system-ui,sans-serif;max-width:600px;margin:auto;padding:24px}h1{font-size:20px}h3{margin-top:16px;font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#666}ul{margin:8px 0;padding-left:20px}li{margin:4px 0;font-size:14px}</style></head><body><h1>Packing list for ${destinationName}</h1><p style="color:#666;font-size:13px">${MONTHS[selectedMonth]} · ${selectedNights} nights</p>${rows}</body></html>`
    );
    w.print();
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-6 py-4 border-b border-border hover:bg-muted/30 transition-colors text-left"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Backpack className="h-4.5 w-4.5 text-emerald-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">Packing List</h2>
            <p className="text-xs text-muted-foreground">
              Personalised for {destinationName} · {essentialCount} essentials
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!collapsed && totalChecked > 0 && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              {pct}% packed
            </span>
          )}
          {collapsed
            ? <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
            : <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-5">

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                {/* Month selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Departure month
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Nights */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Trip length
                    </label>
                    <span className="text-[10px] font-bold text-primary">{selectedNights}n</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={21}
                    value={selectedNights}
                    onChange={(e) => setSelectedNights(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer mt-2"
                  />
                </div>

                {/* Weather context badge */}
                <div className="col-span-2 flex items-center gap-2 text-xs">
                  <span>
                    {activeWeather >= 4 ? "☀️" : activeWeather === 3 ? "⛅" : "🌧️"}
                  </span>
                  <span className="text-muted-foreground">
                    {MONTHS[selectedMonth]} in {destinationName}:{" "}
                    <span className={`font-semibold ${activeWeather >= 4 ? "text-emerald-600" : activeWeather === 3 ? "text-amber-600" : "text-orange-600"}`}>
                      {activeWeather >= 4 ? "Great weather — sunny & warm" : activeWeather === 3 ? "Mixed — pack a light layer" : "Rainy season — pack accordingly"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              {totalChecked > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{totalChecked} of {totalItems} items packed</span>
                    <span className={`font-bold ${pct === 100 ? "text-emerald-600" : "text-primary"}`}>
                      {pct === 100 ? "✓ All packed!" : `${pct}%`}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full transition-all ${pct === 100 ? "bg-emerald-500" : "bg-primary"}`}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Categories */}
              <div className="space-y-3">
                {activeCategories.map((cat, catIdx) => {
                  const isOpen = openCategories.has(cat.id);
                  const catChecked = cat.items.filter((i) => checked.has(i.id)).length;
                  const catTotal = cat.items.length;
                  const allCatChecked = catChecked === catTotal;

                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: catIdx * 0.04 }}
                      className="border border-border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                          allCatChecked ? "bg-emerald-50" : "bg-muted/20 hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{cat.emoji}</span>
                          <span className="font-semibold text-sm text-foreground">{cat.label}</span>
                          {allCatChecked && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                              <CheckCheck className="h-3 w-3" /> Done
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {catChecked}/{catTotal}
                          </span>
                          {isOpen
                            ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3 space-y-1.5 border-t border-border">
                              {/* Check all button */}
                              <button
                                onClick={() => toggleAll(cat.id, cat.items)}
                                className="text-[10px] font-bold uppercase tracking-wide text-primary hover:text-primary/70 transition-colors mb-2 flex items-center gap-1"
                              >
                                <Check className="h-3 w-3" />
                                {allCatChecked ? "Uncheck all" : "Check all"}
                              </button>

                              {cat.items.map((item) => {
                                const isChecked = checked.has(item.id);
                                return (
                                  <label
                                    key={item.id}
                                    className={`flex items-start gap-3 cursor-pointer py-1.5 px-2 rounded-lg transition-colors ${
                                      isChecked ? "bg-emerald-50" : "hover:bg-muted/30"
                                    }`}
                                  >
                                    <div
                                      onClick={() => toggle(item.id)}
                                      className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                        isChecked
                                          ? "bg-emerald-500 border-emerald-500"
                                          : "border-border hover:border-primary/50"
                                      }`}
                                    >
                                      {isChecked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span
                                          className={`text-sm leading-snug ${
                                            isChecked ? "line-through text-muted-foreground" : "text-foreground"
                                          }`}
                                        >
                                          {item.label}
                                        </span>
                                        {item.essential && !isChecked && (
                                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full shrink-0">
                                            <Star className="h-2.5 w-2.5" /> Essential
                                          </span>
                                        )}
                                      </div>
                                      {item.note && (
                                        <p className="text-[11px] text-muted-foreground mt-0.5">{item.note}</p>
                                      )}
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                <button
                  onClick={copyList}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface hover:bg-muted/50 text-sm font-medium text-foreground transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy list
                </button>
                <button
                  onClick={printList}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface hover:bg-muted/50 text-sm font-medium text-foreground transition-colors"
                >
                  <Printer className="h-3.5 w-3.5" /> Print
                </button>
                {totalChecked > 0 && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                )}
                <p className="ml-auto text-[11px] text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Items adapt to weather &amp; trip length
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
