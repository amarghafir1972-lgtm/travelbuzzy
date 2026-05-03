import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, ChevronDown, ChevronUp, Star, Leaf, Flame, Wine, Wallet, Info } from "lucide-react";
import { getFoodData } from "@/data/foodData";

const DIET_RATING_CONFIG = {
  easy:       { label: "Easy",       color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-200" },
  manageable: { label: "Manageable", color: "text-amber-700",   bg: "bg-amber-100",   border: "border-amber-200"   },
  difficult:  { label: "Difficult",  color: "text-rose-700",    bg: "bg-rose-100",    border: "border-rose-200"    },
};

const TIER_CONFIG = {
  budget:  { emoji: "🎒", color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200" },
  mid:     { emoji: "✈️", color: "text-sky-700",     bg: "bg-sky-50",      border: "border-sky-200"     },
  luxury:  { emoji: "🥂", color: "text-violet-700",  bg: "bg-violet-50",   border: "border-violet-200"  },
};

export default function FoodDrink({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const data = getFoodData(slug);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"dishes" | "drinks" | "budget" | "dietary">("dishes");

  if (!data) return null;

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
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Utensils className="h-4.5 w-4.5 text-yellow-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">Food &amp; Drink Guide</h2>
            <p className="text-xs text-muted-foreground">{data.cuisine} · {data.dishes.filter(d => d.mustTry).length} must-try dishes</p>
          </div>
        </div>
        {collapsed
          ? <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
          : <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />}
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
            <div className="p-5 space-y-4">

              {/* Summary */}
              <p className="text-sm text-muted-foreground leading-relaxed">{data.summary}</p>

              {/* Tab bar */}
              <div className="flex gap-1 bg-muted/40 p-1 rounded-xl overflow-x-auto">
                {(["dishes", "drinks", "budget", "dietary"] as const).map((tab) => {
                  const labels = { dishes: "🍽️ Dishes", drinks: "🍷 Drinks", budget: "💰 Where to eat", dietary: "🥦 Dietary" };
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`shrink-0 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-surface shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">

                {/* Dishes tab */}
                {activeTab === "dishes" && (
                  <motion.div
                    key="dishes"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {data.dishes.map((dish, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                          dish.mustTry ? "border-yellow-200 bg-yellow-50/60" : "border-border bg-surface hover:bg-muted/20"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{dish.emoji}</span>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-semibold text-sm text-foreground">{dish.name}</span>
                            {dish.mustTry && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wide text-yellow-800 bg-yellow-200 px-1.5 py-0.5 rounded-full">
                                <Star className="h-2.5 w-2.5" /> Must try
                              </span>
                            )}
                            {dish.vegetarian && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                <Leaf className="h-2.5 w-2.5" /> Veggie
                              </span>
                            )}
                            {dish.spicy && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full">
                                <Flame className="h-2.5 w-2.5" /> Spicy
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{dish.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Drinks tab */}
                {activeTab === "drinks" && (
                  <motion.div
                    key="drinks"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Wine className="h-3 w-3 text-rose-500" /> Alcoholic</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Non-alcoholic</span>
                    </div>
                    {data.drinks.map((drink, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-surface hover:bg-muted/20 transition-colors"
                      >
                        <span className="text-2xl shrink-0">{drink.emoji}</span>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{drink.name}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                              drink.alcoholic
                                ? "text-rose-700 bg-rose-100"
                                : "text-emerald-700 bg-emerald-100"
                            }`}>
                              {drink.alcoholic ? "Alcoholic" : "Non-alcoholic"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{drink.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Budget tab */}
                {activeTab === "budget" && (
                  <motion.div
                    key="budget"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {data.byBudget.map((tier, i) => {
                      const cfg = TIER_CONFIG[tier.tier];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className={`p-4 rounded-xl border ${cfg.border} ${cfg.bg} space-y-2`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{cfg.emoji}</span>
                              <span className={`font-bold text-sm ${cfg.color}`}>{tier.label}</span>
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/70 ${cfg.color}`}>
                              {tier.priceRange}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            <strong>Where:</strong> {tier.where}
                          </p>
                          <div className="flex items-start gap-1.5 text-xs text-foreground/70 border-t border-black/5 pt-2">
                            <Wallet className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                            <span>{tier.tip}</span>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Market tip */}
                    {data.marketTip && (
                      <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                        <span className="text-lg shrink-0">🛒</span>
                        <p className="text-xs text-amber-800 leading-relaxed">{data.marketTip}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Dietary tab */}
                {activeTab === "dietary" && (
                  <motion.div
                    key="dietary"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {data.dietary.map((d, i) => {
                      const cfg = DIET_RATING_CONFIG[d.rating];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-surface"
                        >
                          <span className="text-xl shrink-0">{d.emoji}</span>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-sm text-foreground">{d.diet}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                                {cfg.label}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{d.note}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Food tip */}
              <div className="flex items-start gap-2.5 p-3.5 bg-yellow-50 border border-yellow-200 rounded-xl">
                <Info className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800 leading-relaxed">{data.foodTip}</p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
