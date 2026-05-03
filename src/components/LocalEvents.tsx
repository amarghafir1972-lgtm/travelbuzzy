import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Lightbulb, AlertCircle } from "lucide-react";
import { getDestinationEvents, EVENT_TYPE_CONFIG } from "@/data/eventsData";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function LocalEvents({
  slug,
  destinationName,
}: {
  slug: string;
  destinationName: string;
}) {
  const events = getDestinationEvents(slug);
  if (events.length === 0) return null;

  const currentMonth = new Date().getMonth();
  // Pick initial month: prefer current month if it has events, else first event's month
  const firstEventMonth = events.reduce<number | null>((acc, e) => {
    if (acc !== null) return acc;
    return e.month;
  }, null);
  const hasEventThisMonth = events.some(e => e.month === currentMonth);
  const [activeMonth, setActiveMonth] = useState(hasEventThisMonth ? currentMonth : (firstEventMonth ?? currentMonth));
  const [expanded, setExpanded] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Months that have events
  const eventMonths = new Set(events.map(e => e.month));
  const activeEvents = events.filter(e => e.month === activeMonth);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" });
  }

  // Scroll active month pill into view
  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-month="${activeMonth}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeMonth]);

  function prevEventMonth() {
    const sorted = [...eventMonths].sort((a, b) => a - b);
    const idx = sorted.indexOf(activeMonth);
    const prev = idx > 0 ? sorted[idx - 1] : sorted[sorted.length - 1];
    setActiveMonth(prev);
  }

  function nextEventMonth() {
    const sorted = [...eventMonths].sort((a, b) => a - b);
    const idx = sorted.indexOf(activeMonth);
    const next = idx < sorted.length - 1 ? sorted[idx + 1] : sorted[0];
    setActiveMonth(next);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <CalendarDays className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-lg text-foreground leading-tight">
            Events & Festivals
          </h2>
          <p className="text-xs text-muted-foreground">
            {events.length} annual {events.length === 1 ? "event" : "events"} — pick a month
          </p>
        </div>
      </div>

      {/* Month selector */}
      <div className="relative flex items-center gap-1">
        <button
          onClick={prevEventMonth}
          className="shrink-0 w-7 h-7 rounded-full border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors bg-background z-10"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <div ref={scrollRef} className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1 scroll-smooth">
          {MONTHS.map((name, i) => {
            const hasEvents = eventMonths.has(i);
            const isActive = i === activeMonth;
            const isNow = i === currentMonth;

            return (
              <button
                key={i}
                data-month={i}
                onClick={() => hasEvents && setActiveMonth(i)}
                disabled={!hasEvents}
                className={`relative shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150 ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm scale-105"
                    : hasEvents
                    ? "bg-background border-border text-foreground hover:border-primary/50 hover:text-primary"
                    : "bg-muted/20 border-border/30 text-muted-foreground/30 cursor-not-allowed"
                }`}
              >
                {SHORT[i]}
                {/* Event dot */}
                {hasEvents && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
                {/* Current month dot */}
                {isNow && !isActive && !hasEvents && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/40" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={nextEventMonth}
          className="shrink-0 w-7 h-7 rounded-full border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors bg-background z-10"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Event cards for active month */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMonth}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {activeEvents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-8 text-center">
              <p className="text-sm text-muted-foreground">No events listed for {MONTHS[activeMonth]}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try a different month using the selector above</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground font-medium">
                {activeEvents.length} {activeEvents.length === 1 ? "event" : "events"} in{" "}
                <span className="text-foreground font-semibold">{MONTHS[activeMonth]}</span>
                {activeMonth === currentMonth && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-full">
                    This month
                  </span>
                )}
              </p>

              {activeEvents.map((event, i) => {
                const cfg = EVENT_TYPE_CONFIG[event.type];
                const eventKey = `${event.name}-${i}`;
                const isOpen = expanded === eventKey;

                return (
                  <motion.div
                    key={eventKey}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.06 }}
                    className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                      isOpen ? `${cfg.border} shadow-sm` : "border-border hover:border-border/80"
                    }`}
                  >
                    <button
                      onClick={() => setExpanded(isOpen ? null : eventKey)}
                      className="w-full text-left px-4 py-3.5 flex items-start gap-3"
                    >
                      {/* Type badge */}
                      <span className={`shrink-0 mt-0.5 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        {cfg.label}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-snug">{event.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="h-3 w-3" /> {event.duration}
                          </span>
                          {event.bookEarly && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                              Book early
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRight className={`h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3 border-t border-border/60 pt-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {event.description}
                            </p>
                            {event.tip && (
                              <div className="flex items-start gap-2 bg-primary/5 border border-primary/15 rounded-lg p-3">
                                <Lightbulb className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-foreground leading-relaxed">
                                  <span className="font-semibold text-primary">Tip: </span>
                                  {event.tip}
                                </p>
                              </div>
                            )}
                            {event.bookEarly && (
                              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 leading-relaxed">
                                  <span className="font-semibold">Book accommodation early</span> — this event significantly increases demand in {MONTHS[event.month]}.
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
