import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, ChevronDown, ChevronUp, Info, ExternalLink, Syringe, Lightbulb
} from "lucide-react";
import {
  getVisaData,
  NATIONALITY_LABELS,
  STATUS_CONFIG,
} from "@/data/visaData";
import type { Nationality } from "@/data/visaData";

const NATIONALITIES: Nationality[] = ["uk", "us", "eu", "au"];

export default function VisaEntry({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const data = getVisaData(slug);
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState<Nationality>("uk");

  if (!data) return null;

  const entry = data.nationalities[selected];
  const status = STATUS_CONFIG[entry.status];

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
          <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center">
            <ShieldCheck className="h-4.5 w-4.5 text-sky-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">
              Visa &amp; Entry Requirements
            </h2>
            <p className="text-xs text-muted-foreground">
              {destinationName} · {data.destinationCountry}
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
            <div className="p-5 space-y-5">

              {/* Nationality selector */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Select your passport
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {NATIONALITIES.map((nat) => {
                    const cfg = NATIONALITY_LABELS[nat];
                    const natStatus = STATUS_CONFIG[data.nationalities[nat].status];
                    const isSelected = selected === nat;
                    return (
                      <button
                        key={nat}
                        onClick={() => setSelected(nat)}
                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-sky-400 bg-sky-50 shadow-sm"
                            : "border-border hover:border-sky-300 hover:bg-muted/30"
                        }`}
                      >
                        <span className="text-xl">{cfg.flag}</span>
                        <span className={`text-xs font-bold ${isSelected ? "text-sky-700" : "text-foreground"}`}>
                          {cfg.label}
                        </span>
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${natStatus.bg}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${natStatus.dot}`} />
                          <span className={`text-[9px] font-bold ${natStatus.color} leading-none`}>
                            {natStatus.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-xl border p-4 space-y-3 ${
                    entry.status === "visa-free" || entry.status === "visa-on-arrival"
                      ? "border-emerald-200 bg-emerald-50"
                      : entry.status === "e-visa" || entry.status === "e-visa-or-voa"
                      ? "border-amber-200 bg-amber-50"
                      : "border-rose-200 bg-rose-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color} mb-2`}>
                        <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                        {status.label}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        {entry.stayDays && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-bold">Max stay</p>
                            <p className="font-display font-bold text-xl text-foreground">{entry.stayDays} days</p>
                          </div>
                        )}
                        {entry.cost && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-bold">Cost</p>
                            <p className="font-display font-bold text-xl text-foreground">{entry.cost}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-3xl">{NATIONALITY_LABELS[selected].flag}</span>
                  </div>

                  {entry.note && (
                    <p className="text-sm text-foreground/80 leading-relaxed border-t border-black/5 pt-3">
                      {entry.note}
                    </p>
                  )}

                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:underline"
                    >
                      Official visa portal <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Passport validity */}
              <div className="flex items-start gap-2.5 p-3 bg-muted/40 border border-border rounded-xl">
                <span className="text-lg shrink-0">🛂</span>
                <div>
                  <p className="text-xs font-bold text-foreground mb-0.5">Passport validity</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{data.passportValidity}</p>
                </div>
              </div>

              {/* Health requirements */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Syringe className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Health &amp; vaccinations
                  </p>
                </div>
                <div className="space-y-2">
                  {data.health.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 px-3 rounded-lg border border-border bg-surface">
                      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                        h.required ? "bg-rose-500" : h.recommended ? "bg-amber-400" : "bg-muted-foreground/30"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{h.label}</span>
                          {h.required && (
                            <span className="text-[9px] font-bold uppercase tracking-wide text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full">
                              Required
                            </span>
                          )}
                          {!h.required && h.recommended && (
                            <span className="text-[9px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full">
                              Recommended
                            </span>
                          )}
                          {!h.required && !h.recommended && (
                            <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                              Not required
                            </span>
                          )}
                        </div>
                        {h.note && (
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{h.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entry tips */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Entry tips
                  </p>
                </div>
                <div className="space-y-2">
                  {data.entryTips.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                    >
                      <span className="text-base shrink-0">{tip.emoji}</span>
                      <p>{tip.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 pt-2 border-t border-border">
                <Info className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                  {data.disclaimer}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
