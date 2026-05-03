import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, ChevronUp, Volume2, Copy, Check, Info } from "lucide-react";
import { getPhrasesData } from "@/data/phrasesData";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      title="Copy phrase"
      className="p-1 rounded hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
    >
      {copied
        ? <Check className="h-3.5 w-3.5 text-emerald-500" />
        : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

const LANG_BCP: Record<string, string> = {
  "Balinese / Indonesian": "id-ID",
  "Greek":                 "el-GR",
  "Japanese":              "ja-JP",
  "Dhivehi":               "dv",
  "French":                "fr-FR",
};

export default function LocalPhrases({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const data = getPhrasesData(slug);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  if (!data) return null;

  const langCode = LANG_BCP[data.language] ?? "en";

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
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <MessageCircle className="h-4.5 w-4.5 text-violet-700" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-foreground">
              Useful Local Phrases
            </h2>
            <p className="text-xs text-muted-foreground">
              {data.flag} {data.language} · {data.phrases.length} phrases with pronunciation
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
            <div className="p-5 space-y-3">

              {/* Intro tip */}
              <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                <Volume2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-violet-500" />
                Tap the speaker icon to hear the pronunciation. Tap a phrase row for insider tips.
              </p>

              {/* Phrase list */}
              <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                {data.phrases.map((phrase, i) => (
                  <div key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                        phrase.tip ? "hover:bg-violet-50/60" : "hover:bg-muted/20"
                      } ${expandedTip === i ? "bg-violet-50/60" : ""}`}
                      onClick={() => phrase.tip && setExpandedTip(expandedTip === i ? null : i)}
                    >
                      {/* Emoji */}
                      <span className="text-xl shrink-0 mt-0.5">{phrase.emoji}</span>

                      {/* Text block */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground leading-none">
                          {phrase.english}
                        </p>
                        <p className="font-semibold text-foreground text-sm leading-snug">
                          {phrase.local}
                        </p>
                        <p className="text-xs text-violet-600 font-medium tracking-wide">
                          /{phrase.pronunciation}/
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {phrase.tip && (
                          <span className="text-[9px] font-bold uppercase tracking-wide text-violet-500 bg-violet-100 px-1.5 py-0.5 rounded-full">
                            tip
                          </span>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); speak(phrase.local, langCode); }}
                          title="Hear pronunciation"
                          className="p-1.5 rounded-lg hover:bg-violet-100 transition-colors text-muted-foreground hover:text-violet-700"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                        <CopyButton text={phrase.local} />
                      </div>
                    </motion.div>

                    {/* Expanded tip */}
                    <AnimatePresence>
                      {expandedTip === i && phrase.tip && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 pl-12">
                            <div className="bg-violet-100/70 border border-violet-200 rounded-lg px-3 py-2 flex items-start gap-2">
                              <Info className="h-3.5 w-3.5 text-violet-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-violet-800 leading-relaxed">{phrase.tip}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Cultural note */}
              {data.culturalNote && (
                <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="text-xl shrink-0">🌍</span>
                  <div>
                    <p className="text-xs font-bold text-amber-800 mb-0.5">Cultural note</p>
                    <p className="text-xs text-amber-700 leading-relaxed">{data.culturalNote}</p>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-muted-foreground/60 text-center pt-1">
                A few words in the local language go a long way — locals genuinely appreciate the effort.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
