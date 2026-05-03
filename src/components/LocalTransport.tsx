import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, ChevronDown, ChevronUp, Plane, MapPin, Smartphone, AlertTriangle, Lightbulb, Star } from "lucide-react";
import { getTransportData } from "@/data/transportData";

export default function LocalTransport({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const data = getTransportData(slug);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"airport" | "around" | "apps">("airport");

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
          <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
            <Bus className="h-4.5 w-4.5 text-orange-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">Getting Around</h2>
            <p className="text-xs text-muted-foreground">
              {data.airport} · {data.airportCode}
            </p>
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

              {/* Tab bar */}
              <div className="flex gap-1.5 bg-muted/40 p-1 rounded-xl">
                {(["airport", "around", "apps"] as const).map((tab) => {
                  const labels = { airport: "✈️ From airport", around: "🗺️ Getting around", apps: "📱 Apps" };
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
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
                {/* Airport transfers tab */}
                {activeTab === "airport" && (
                  <motion.div
                    key="airport"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Plane className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Airport → {destinationName}
                      </p>
                    </div>
                    {data.transfers.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-surface hover:bg-muted/20 transition-colors"
                      >
                        <span className="text-xl shrink-0">{t.emoji}</span>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{t.option}</span>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              ⏱ {t.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                              {t.cost}
                            </span>
                          </div>
                          {t.tip && (
                            <p className="text-xs text-muted-foreground leading-relaxed pt-0.5 border-t border-border/60 mt-1.5">
                              💡 {t.tip}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Getting around tab */}
                {activeTab === "around" && (
                  <motion.div
                    key="around"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Transport options in {destinationName}
                      </p>
                    </div>
                    {data.gettingAround.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                          m.recommended
                            ? "border-orange-200 bg-orange-50/50"
                            : "border-border bg-surface hover:bg-muted/20"
                        }`}
                      >
                        <span className="text-xl shrink-0">{m.emoji}</span>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{m.label}</span>
                            {m.recommended && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wide text-orange-700 bg-orange-200 px-1.5 py-0.5 rounded-full">
                                <Star className="h-2.5 w-2.5" /> Recommended
                              </span>
                            )}
                            <span className="text-xs font-semibold text-primary ml-auto">{m.cost}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{m.note}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Driving side */}
                    <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-muted/30 rounded-xl border border-border text-xs text-muted-foreground">
                      <span className="text-base">🚗</span>
                      <span>
                        Drive on the <strong className="text-foreground">{data.drivingSide} side</strong> of the road in {destinationName}.
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Apps tab */}
                {activeTab === "apps" && (
                  <motion.div
                    key="apps"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Download before you go
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {data.apps.map((app, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface"
                        >
                          <span className="text-2xl shrink-0">{app.emoji}</span>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-foreground leading-tight">{app.name}</p>
                            <p className="text-xs text-muted-foreground leading-snug">{app.use}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tip */}
              <div className="flex items-start gap-2.5 p-3.5 bg-orange-50 border border-orange-200 rounded-xl">
                <Lightbulb className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-800 leading-relaxed">{data.tip}</p>
              </div>

              {/* Warning */}
              {data.warning && (
                <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-800 leading-relaxed">{data.warning}</p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
