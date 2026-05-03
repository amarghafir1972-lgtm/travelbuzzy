import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ArrowRight } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { destinationMap } from "@/data/destinations";

export default function RecentlyViewedBar({ excludeSlug }: { excludeSlug?: string }) {
  const { slugs } = useRecentlyViewed();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const items = slugs
    .filter((s) => s !== excludeSlug)
    .slice(0, 4)
    .map((s) => destinationMap[s])
    .filter(Boolean);

  // Slide in after 1.2 s once we know there are items
  useEffect(() => {
    if (items.length === 0 || dismissed) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, [items.length, dismissed]);

  function dismiss() {
    setVisible(false);
    setTimeout(() => setDismissed(true), 400);
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && items.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
          <div className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Recently viewed
              </div>
              <button
                onClick={dismiss}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Destination chips */}
            <div className="flex items-stretch divide-x divide-border">
              {items.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  onClick={dismiss}
                  className="flex-1 group relative overflow-hidden"
                >
                  {/* Hero image */}
                  <div className="relative h-20 overflow-hidden bg-muted">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2">
                      <p className="text-white text-xs font-semibold leading-tight truncate">{dest.name}</p>
                      <p className="text-white/60 text-[10px] truncate">{dest.country}</p>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <span className="flex items-center gap-1 text-white text-[11px] font-bold">
                        View guide <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
