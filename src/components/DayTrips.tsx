import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayTripsData, { DayTrip } from "../data/dayTripsData";

interface Props {
  slug: string;
  destinationName: string;
}

const costColors: Record<DayTrip["costTier"], string> = {
  budget: "bg-green-100 text-green-800",
  mid: "bg-blue-100 text-blue-800",
  splurge: "bg-purple-100 text-purple-800",
};
const costLabels: Record<DayTrip["costTier"], string> = {
  budget: "Budget-friendly",
  mid: "Mid-range",
  splurge: "Splurge",
};

function TripCard({ trip }: { trip: DayTrip }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{trip.name}</h3>
              {trip.mustBook && (
                <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  Pre-book
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{trip.tagline}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground shrink-0 mt-0.5"
          >
            ▾
          </motion.span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
            📍 {trip.distance}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
            ⏱ {trip.travelTime}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${costColors[trip.costTier]}`}>
            {costLabels[trip.costTier]}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  Cost
                </p>
                <p className="text-sm text-foreground">{trip.cost}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  How to get there
                </p>
                <p className="text-sm text-foreground">{trip.howToGetThere}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Highlights
                </p>
                <ul className="space-y-1.5">
                  {trip.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5 shrink-0">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mr-1">
                  Best for:
                </span>
                {trip.bestFor.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {trip.tip && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                  <span className="text-amber-500 shrink-0">💡</span>
                  <p className="text-sm text-amber-900">{trip.tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DayTrips({ slug, destinationName }: Props) {
  const [open, setOpen] = useState(false);
  const data = dayTripsData[slug];
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/40 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🗺️</span>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground leading-tight">
              Day Trips from {destinationName}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {data.trips.length} excursions · distances, costs &amp; how to get there
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-xl text-muted-foreground shrink-0"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
              <p className="text-sm text-muted-foreground">{data.intro}</p>
              <div className="space-y-3">
                {data.trips.map((trip) => (
                  <TripCard key={trip.name} trip={trip} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
