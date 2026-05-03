import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Search, X, MapPin, Tag, BookOpen, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import { searchResults, typeLabels, typeOrder, type SearchResult } from "@/data/searchData";

const typeIcons: Record<SearchResult["type"], typeof MapPin> = {
  destination: MapPin,
  deal: Tag,
  guide: BookOpen,
  tip: Lightbulb,
};

const popularSearches = ["Bali", "Maldives", "Tokyo deals", "Paris hotels", "Budget Thailand", "Santorini guide"];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchResults(query);

  // Group results by type in preferred order
  const grouped = typeOrder
    .map((type) => ({ type, items: results.filter((r) => r.type === type) }))
    .filter((g) => g.items.length > 0);

  // Flat list for keyboard nav
  const flatResults = grouped.flatMap((g) => g.items);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const item = flatResults[activeIndex];
      if (item) { handleSelect(item); }
    }
  }, [flatResults, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelect(item: SearchResult) {
    if (item.href.startsWith("/")) {
      navigate(item.href);
    } else if (item.href.startsWith("#")) {
      const el = document.querySelector(item.href);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-foreground/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Search TravelBuzzy"
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[201] w-full max-w-2xl px-4"
          >
            <div className="bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search destinations, deals, guides..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
                  data-testid="input-search"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); setActiveIndex(-1); inputRef.current?.focus(); }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                    data-testid="button-search-clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="ml-1 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border rounded px-2 py-0.5 transition-colors"
                  aria-label="Close search"
                  data-testid="button-search-close"
                >
                  Esc
                </button>
              </div>

              <div id="search-results" className="max-h-[60vh] overflow-y-auto">
                {/* No query — show popular searches */}
                {!query && (
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Popular searches</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          data-testid={`button-search-popular-${term.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-3 py-1.5 text-sm font-medium bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-lg border border-border transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {query && results.length > 0 && (
                  <div className="py-2">
                    {grouped.map(({ type, items }) => {
                      const Icon = typeIcons[type];
                      return (
                        <div key={type}>
                          <div className="flex items-center gap-2 px-5 py-2 mt-1">
                            <Icon className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {typeLabels[type]}s
                            </p>
                          </div>
                          {items.map((item) => {
                            const flatIdx = flatResults.indexOf(item);
                            const isActive = flatIdx === activeIndex;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                data-testid={`result-search-${item.id}`}
                                className={`w-full flex items-center justify-between gap-4 px-5 py-3 text-left transition-colors
                                  ${isActive ? "bg-primary/8 text-primary" : "hover:bg-muted"}`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                                    ${isActive ? "bg-primary/15" : "bg-muted"}`}>
                                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className={`text-sm font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                                      {item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                                  </div>
                                </div>
                                {item.badge && (
                                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                                    {item.badge}
                                  </span>
                                )}
                                <ArrowRight className={`shrink-0 h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* No results */}
                {query && results.length === 0 && (
                  <div className="py-10 text-center">
                    <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-foreground mb-1">No results for "{query}"</p>
                    <p className="text-xs text-muted-foreground">Try a destination name, hotel type, or travel tip topic.</p>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3 border-t border-border bg-muted/40 flex items-center gap-4">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-surface border border-border rounded">↑↓</kbd>
                  Navigate
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-surface border border-border rounded">↵</kbd>
                  Select
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-surface border border-border rounded">Esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
