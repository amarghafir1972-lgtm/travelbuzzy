import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert, ChevronDown, ChevronUp, Droplets, Phone,
  Hospital, AlertTriangle, Lightbulb, CheckCircle2
} from "lucide-react";
import {
  getSafetyData,
  SAFETY_LEVEL_CONFIG,
  OVERALL_SAFETY_CONFIG,
} from "@/data/safetyData";
import type { SafetyLevel } from "@/data/safetyData";

const LEVEL_ORDER: SafetyLevel[] = ["low", "moderate", "high", "very-high"];

function RiskBar({ level }: { level: SafetyLevel }) {
  const steps: SafetyLevel[] = ["low", "moderate", "high"];
  const idx = steps.indexOf(level);
  const filled = idx === -1 ? 0 : idx + 1;
  return (
    <div className="flex gap-1 mt-1">
      {steps.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < filled
              ? i === 0 ? "bg-emerald-400" : i === 1 ? "bg-amber-400" : "bg-orange-500"
              : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function SafetyHealth({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const data = getSafetyData(slug);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"risks" | "emergency" | "tips">("risks");

  if (!data) return null;

  const overallCfg = OVERALL_SAFETY_CONFIG[data.overallSafety];

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
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
            <ShieldAlert className="h-4.5 w-4.5 text-rose-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">Safety &amp; Health</h2>
            <p className={`text-xs font-semibold ${overallCfg.color}`}>
              {overallCfg.emoji} {overallCfg.label}
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

              {/* Overall summary */}
              <div className={`p-3.5 rounded-xl border ${overallCfg.border} ${overallCfg.bg}`}>
                <p className={`text-xs leading-relaxed ${overallCfg.color}`}>{data.overallNote}</p>
              </div>

              {/* Tap water */}
              <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                data.tapWater.safe
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-rose-50 border-rose-200"
              }`}>
                <Droplets className={`h-4 w-4 shrink-0 mt-0.5 ${data.tapWater.safe ? "text-emerald-600" : "text-rose-600"}`} />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-xs font-bold ${data.tapWater.safe ? "text-emerald-800" : "text-rose-800"}`}>
                      Tap water: {data.tapWater.safe ? "✓ Safe to drink" : "✗ Not safe to drink"}
                    </p>
                  </div>
                  <p className={`text-xs leading-relaxed ${data.tapWater.safe ? "text-emerald-700" : "text-rose-700"}`}>
                    {data.tapWater.note}
                  </p>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex gap-1.5 bg-muted/40 p-1 rounded-xl">
                {(["risks", "emergency", "tips"] as const).map((tab) => {
                  const labels = { risks: "⚠️ Risk guide", emergency: "🆘 Emergency", tips: "💡 Safety tips" };
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
                {/* Risk guide tab */}
                {activeTab === "risks" && (
                  <motion.div
                    key="risks"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {data.risks.map((risk, i) => {
                      const cfg = SAFETY_LEVEL_CONFIG[risk.level];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="p-3.5 rounded-xl border border-border bg-surface"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <span className="text-sm font-semibold text-foreground leading-tight">{risk.label}</span>
                            <span className={`shrink-0 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                              {cfg.label}
                            </span>
                          </div>
                          <RiskBar level={risk.level} />
                          <p className="text-xs text-muted-foreground leading-relaxed mt-2">{risk.note}</p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* Emergency tab */}
                {activeTab === "emergency" && (
                  <motion.div
                    key="emergency"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Numbers */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Emergency numbers in {destinationName}
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {data.emergency.map((e, i) => (
                          <motion.a
                            key={i}
                            href={`tel:${e.number.replace(/\s/g, "")}`}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface hover:bg-muted/30 transition-colors"
                          >
                            <span className="text-xl shrink-0">{e.emoji}</span>
                            <div className="min-w-0">
                              <p className="text-xs text-muted-foreground leading-none mb-0.5">{e.service}</p>
                              <p className="font-display font-bold text-lg text-foreground leading-none">{e.number}</p>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Hospital quality */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hospital className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Healthcare quality
                        </p>
                      </div>
                      <div className={`p-3.5 rounded-xl border space-y-2 ${
                        data.hospital.quality === "excellent" ? "bg-emerald-50 border-emerald-200" :
                        data.hospital.quality === "good"      ? "bg-sky-50 border-sky-200" :
                        data.hospital.quality === "adequate"  ? "bg-amber-50 border-amber-200" :
                                                                 "bg-rose-50 border-rose-200"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                            data.hospital.quality === "excellent" ? "bg-emerald-200 text-emerald-800" :
                            data.hospital.quality === "good"      ? "bg-sky-200 text-sky-800" :
                            data.hospital.quality === "adequate"  ? "bg-amber-200 text-amber-800" :
                                                                     "bg-rose-200 text-rose-800"
                          }`}>
                            {data.hospital.quality.charAt(0).toUpperCase() + data.hospital.quality.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed">{data.hospital.note}</p>
                        <div className="flex items-start gap-2 border-t border-black/5 pt-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-foreground/70 leading-relaxed">{data.hospital.tip}</p>
                        </div>
                      </div>
                    </div>

                    {/* Insurance tip */}
                    <div className="flex items-start gap-2.5 p-3.5 bg-violet-50 border border-violet-200 rounded-xl">
                      <AlertTriangle className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-violet-800 leading-relaxed">
                        <strong>Travel insurance:</strong> {data.insuranceTip}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Safety tips tab */}
                {activeTab === "tips" && (
                  <motion.div
                    key="tips"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Local safety advice
                      </p>
                    </div>
                    {data.safetyTips.map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-surface"
                      >
                        <span className="text-xl shrink-0">{tip.emoji}</span>
                        <p className="text-sm text-foreground/80 leading-relaxed">{tip.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
