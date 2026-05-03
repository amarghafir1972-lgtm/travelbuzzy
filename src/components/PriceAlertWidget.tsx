import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, CheckCircle, X, Plane, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePriceAlerts } from "@/hooks/use-price-alerts";
import { getMonthCalendar, overallScore } from "@/data/monthCalendar";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function PriceAlertWidget({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const currentMonth = new Date().getMonth();
  const { existing, addAlert, removeAlert } = usePriceAlerts(slug);

  const [email, setEmail] = useState(existing?.email ?? "");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    existing?.month ?? currentMonth
  );
  const [submitted, setSubmitted] = useState(!!existing);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const calData = getMonthCalendar(slug);
  const sweetSpotIndices = calData
    ? calData.map((m, i) => (overallScore(m) >= 4 ? i : -1)).filter((i) => i !== -1)
    : [];
  const cheapIndices = calData
    ? calData.map((m, i) => (m.price >= 4 ? i : -1)).filter((i) => i !== -1)
    : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    addAlert(email.trim(), selectedMonth, destinationName);
    setSubmitted(true);
    setEditing(false);
  }

  function handleRemove() {
    removeAlert();
    setSubmitted(false);
    setEditing(false);
    setEmail("");
    setSelectedMonth(currentMonth);
  }

  function handleEdit() {
    setSubmitted(false);
    setEditing(true);
  }

  const showForm = !submitted || editing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      {/* Decorative background ring */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/8 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative px-6 py-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-foreground leading-snug">
              Get Price Alerts for {destinationName}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              We'll notify you when flight or hotel prices drop for your chosen month.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Success state */}
          {submitted && !editing ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-800">
                    Alert set for {FULL_MONTHS[existing?.month ?? selectedMonth]}
                  </p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    We'll email <span className="font-medium">{existing?.email ?? email}</span> when prices drop.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-2 transition-colors"
                >
                  <Plane className="h-3.5 w-3.5" /> Change month or email
                </button>
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-rose-500 transition-colors ml-auto"
                >
                  <BellOff className="h-3.5 w-3.5" /> Remove alert
                </button>
              </div>
            </motion.div>
          ) : (
            /* Form state */
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Month picker */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Which month are you thinking of?
                  </p>
                  {sweetSpotIndices.length > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-yellow-700 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full font-semibold">
                      <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" /> = best value
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {MONTHS.map((m, i) => {
                    const isSweetSpot = sweetSpotIndices.includes(i);
                    const isCheap = cheapIndices.includes(i);
                    const isSelected = selectedMonth === i;
                    const isNow = i === currentMonth;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedMonth(i)}
                        className={`relative flex flex-col items-center gap-0.5 py-2.5 rounded-xl text-[11px] font-semibold border-2 transition-all duration-150 ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm scale-105"
                            : isSweetSpot
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-400"
                            : "bg-muted/40 text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
                        }`}
                      >
                        {isSweetSpot && !isSelected && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                            <Star className="h-2 w-2 fill-yellow-900 text-yellow-900" />
                          </span>
                        )}
                        {m}
                        {isCheap && !isSelected && (
                          <span className="text-[8px] font-bold text-emerald-600 leading-none">$</span>
                        )}
                        {isNow && !isSelected && (
                          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  {isNow(selectedMonth, currentMonth)
                    ? "This month selected · "
                    : ""}
                  {sweetSpotIndices.includes(selectedMonth)
                    ? "✦ Sweet spot month — great overall value"
                    : cheapIndices.includes(selectedMonth)
                    ? "$ Cheaper flights expected this month"
                    : ""}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground block mb-2">
                  Your email
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      required
                      className={`h-11 pr-10 ${error ? "border-rose-400 focus-visible:ring-rose-400" : ""}`}
                    />
                    {error && (
                      <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-500" />
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="h-11 px-5 bg-primary hover:bg-primary/90 text-white font-semibold shrink-0 gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline">Notify me</span>
                    <span className="sm:hidden">Set</span>
                  </Button>
                </div>
                {error && (
                  <p className="text-xs text-rose-500 mt-1">{error}</p>
                )}
              </div>

              {editing && (
                <button
                  type="button"
                  onClick={() => { setSubmitted(true); setEditing(false); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Cancel
                </button>
              )}

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                No spam. We'll only email when we spot a genuine price drop for{" "}
                <span className="font-medium text-foreground">{destinationName}</span> in{" "}
                <span className="font-medium text-foreground">{FULL_MONTHS[selectedMonth]}</span>.
                Unsubscribe anytime.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function isNow(selected: number, current: number) {
  return selected === current;
}
