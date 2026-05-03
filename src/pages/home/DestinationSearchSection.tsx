import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import destinations, { destinationMap } from "@/data/destinations";
import type { Destination } from "@/data/destinations";
import { ArrowRight, Clock, MapPin, Search, TrendingUp, X } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";

const flags: Record<string, string> = {
  bali: "🇮🇩",
  santorini: "🇬🇷",
  tokyo: "🇯🇵",
  maldives: "🇲🇻",
  paris: "🇫🇷",
};

const trending = new Set(["bali", "tokyo", "santorini"]);

function FloatingBlob({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none select-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: "blur(60px)",
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.55, 0.4, 0.55, 0],
        scale: [0.95, 1.08, 1, 1.08, 0.95],
        y: [0, -18, 0, 18, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function AnimatedPlane() {
  const ref = useRef<SVGCircleElement>(null);
  const tRef = useRef(0);

  useAnimationFrame((time) => {
    tRef.current = (time / 4000) % 1;
    const t = tRef.current;
    const x0 = 10, y0 = 80, cx = 60, cy = 10, x1 = 150, y1 = 30;
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;
    if (ref.current) {
      ref.current.setAttribute("cx", String(x));
      ref.current.setAttribute("cy", String(y));
    }
  });

  return (
    <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden sm:block">
      <svg width="180" height="100" viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 10 80 Q 60 10 150 30"
          stroke="#0F4C81"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          fill="none"
          opacity="0.3"
        />
        <circle ref={ref} r="0" fill="none" />
        <g transform="translate(130, 18) rotate(-20)">
          <text fontSize="28" textAnchor="middle" dominantBaseline="middle">✈️</text>
        </g>
      </svg>
    </div>
  );
}

function BalloonDecoration() {
  return (
    <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden sm:block">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="180" height="100" viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 150 80 Q 100 10 10 30"
            stroke="#0F4C81"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            fill="none"
            opacity="0.3"
          />
          <g transform="translate(10, 18)">
            <text fontSize="28" textAnchor="middle" dominantBaseline="middle">🎈</text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

function FloatingDestinationCards() {
  const cards = [
    { slug: "bali", name: "Bali", emoji: "🇮🇩", left: "2%", top: "12%", rotate: -6, delay: 0 },
    { slug: "paris", name: "Paris", emoji: "🇫🇷", right: "2%", top: "10%", rotate: 5, delay: 0.3 },
    { slug: "maldives", name: "Maldives", emoji: "🇲🇻", left: "5%", bottom: "8%", rotate: 4, delay: 0.6 },
    { slug: "tokyo", name: "Tokyo", emoji: "🇯🇵", right: "4%", bottom: "10%", rotate: -4, delay: 0.9 },
  ];

  return (
    <>
      {cards.map((c) => (
        <motion.div
          key={c.slug}
          className="absolute hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-white/60 pointer-events-none select-none"
          style={{ left: c.left, right: (c as { right?: string }).right, top: c.top, bottom: (c as { bottom?: string }).bottom, rotate: c.rotate }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: c.delay + 0.3 }}
          animate={{ y: [0, -6, 0] }}
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
            <img
              src={`/images/${c.slug}.jpg`}
              alt={c.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold text-foreground leading-none">{c.emoji} {c.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Explore →</p>
          </div>
        </motion.div>
      ))}
    </>
  );
}

const allFlags: Record<string, string> = {
  bali: "🇮🇩", santorini: "🇬🇷", tokyo: "🇯🇵", maldives: "🇲🇻", paris: "🇫🇷",
  bangkok: "🇹🇭", barcelona: "🇪🇸", dubai: "🇦🇪", rome: "🇮🇹", kyoto: "🇯🇵",
  phuket: "🇹🇭", amsterdam: "🇳🇱", "cape-town": "🇿🇦", "new-york": "🇺🇸", lisbon: "🇵🇹",
  "amalfi-coast": "🇮🇹", marrakech: "🇲🇦", singapore: "🇸🇬", prague: "🇨🇿", ibiza: "🇪🇸",
  "bora-bora": "🇵🇫", istanbul: "🇹🇷", queenstown: "🇳🇿", hawaii: "🇺🇸", hanoi: "🇻🇳",
  reykjavik: "🇮🇸", "mexico-city": "🇲🇽", "rio-de-janeiro": "🇧🇷", dubrovnik: "🇭🇷", miami: "🇺🇸",
};

export default function DestinationSearchSection() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { slugs: recentSlugs, clear: clearRecent } = useRecentlyViewed();

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setActiveIdx(-1);
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q)
    );
    setSuggestions(matches);
    setActiveIdx(-1);
  }, [query]);

  function go(dest: Destination) {
    setQuery(dest.name);
    setSuggestions([]);
    setFocused(false);
    navigate(`/destinations/${dest.slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIdx >= 0 && suggestions[activeIdx]) {
      go(suggestions[activeIdx]);
      return;
    }
    if (suggestions.length === 1) {
      go(suggestions[0]);
      return;
    }
    const exact = destinations.find(
      (d) => d.name.toLowerCase() === query.toLowerCase().trim()
    );
    if (exact) {
      go(exact);
    } else if (suggestions.length > 0) {
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setFocused(false);
    }
  }

  const showDropdown = focused && (suggestions.length > 0 || query.trim().length > 0);
  const noMatch = focused && query.trim().length > 0 && suggestions.length === 0;

  return (
    <section
      id="destinations"
      className="relative overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #C8E8F8 0%, #D9EFF9 30%, #EAF6FF 60%, #F0E9FF 100%)",
      }}
    >
      {/* Animated blobs */}
      <FloatingBlob x="5%" y="10%" size={260} color="rgba(59,130,246,0.18)" delay={0} />
      <FloatingBlob x="70%" y="5%" size={200} color="rgba(139,92,246,0.15)" delay={1.5} />
      <FloatingBlob x="55%" y="55%" size={240} color="rgba(236,72,153,0.10)" delay={3} />
      <FloatingBlob x="15%" y="60%" size={180} color="rgba(16,185,129,0.12)" delay={2} />

      {/* Floating destination cards */}
      <FloatingDestinationCards />

      <AnimatedPlane />
      <BalloonDecoration />

      <div className="container mx-auto max-w-2xl text-center relative z-10">

        {/* Recently Viewed */}
        <AnimatePresence>
          {recentSlugs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl px-4 py-3 shadow-sm">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/40 shrink-0">
                  <Clock className="h-3 w-3" />
                  Recently viewed
                </span>
                {recentSlugs.map((slug) => {
                  const d = destinationMap[slug];
                  if (!d) return null;
                  return (
                    <motion.button
                      key={slug}
                      onClick={() => navigate(`/destinations/${slug}`)}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-primary/5 border border-white/90 hover:border-primary/20 text-xs text-foreground/75 hover:text-primary font-medium transition-all shadow-sm"
                    >
                      <span>{allFlags[slug] ?? "🌍"}</span>
                      {d.name}
                    </motion.button>
                  );
                })}
                <button
                  onClick={clearRecent}
                  aria-label="Clear recently viewed"
                  className="ml-1 p-1 rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-black/5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.2em]">
            <MapPin className="h-3 w-3" />
            Destinations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-display font-bold text-3xl md:text-4xl text-[#1a1a2e] mb-3 leading-tight"
        >
          What is your next destination?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-sm text-foreground/60 mb-8"
        >
          Search {destinations.length} curated destinations with guides, deals &amp; hotels.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="relative"
        >
          <form onSubmit={handleSubmit} className="flex items-center gap-0">
            <div className="relative flex-1">
              {/* Glow ring on focus */}
              <AnimatePresence>
                {focused && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
                      filter: "blur(8px)",
                      zIndex: -1,
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4.5 w-4.5 text-muted-foreground/50 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your dream destination..."
                  className="w-full h-14 pl-11 pr-4 rounded-l-xl border-2 border-r-0 border-white bg-white/95 text-foreground text-base placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 shadow-sm transition-all backdrop-blur-sm"
                  autoComplete="off"
                  aria-label="Search destinations"
                  aria-autocomplete="list"
                  aria-controls="destination-suggestions"
                  aria-expanded={showDropdown}
                />
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-14 px-5 shrink-0 bg-accent hover:bg-[#E85D6A] text-white rounded-r-xl flex items-center justify-center gap-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 font-semibold text-sm"
              aria-label="Search"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </form>

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                id="destination-suggestions"
                ref={listRef}
                role="listbox"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl border border-border/60 shadow-xl overflow-hidden z-50 text-left"
              >
                {noMatch ? (
                  <li className="px-5 py-4 text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    No destination found for &ldquo;{query}&rdquo;
                    <span className="ml-auto text-xs text-primary/70">Try: Bali, Paris, Tokyo…</span>
                  </li>
                ) : (
                  suggestions.map((d, i) => (
                    <motion.li
                      key={d.slug}
                      role="option"
                      aria-selected={i === activeIdx}
                      onMouseDown={() => go(d)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: i * 0.05 }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-border/30 last:border-0 ${
                        i === activeIdx ? "bg-primary/8" : "hover:bg-muted/50"
                      }`}
                    >
                      {/* Destination thumbnail */}
                      <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm">
                        <img
                          src={d.heroImage}
                          alt={d.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{flags[d.slug]}</span>
                          <p className="font-semibold text-sm text-foreground">{d.name}</p>
                          {trending.has(d.slug) && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wide text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                              <TrendingUp className="h-2.5 w-2.5" />
                              Trending
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{d.tagline}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground">{d.country}</p>
                        <p className="text-[10px] font-semibold text-primary mt-0.5">{d.quickFacts.avgBudget.split("–")[0]}+/day</p>
                      </div>
                    </motion.li>
                  ))
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Top 5 quick-pick chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="flex flex-wrap justify-center gap-2 mt-5"
        >
          {[
            { slug: "bali",     name: "Bali",     flag: "🇮🇩", dot: true  },
            { slug: "tokyo",    name: "Tokyo",    flag: "🇯🇵", dot: true  },
            { slug: "paris",    name: "Paris",    flag: "🇫🇷", dot: false },
            { slug: "dubai",    name: "Dubai",    flag: "🇦🇪", dot: false },
            { slug: "new-york", name: "New York", flag: "🇺🇸", dot: false },
          ].map((d, i) => (
            <motion.button
              key={d.slug}
              onClick={() => navigate(`/destinations/${d.slug}`)}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: 0.3 + i * 0.07 }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white border border-white/90 text-sm text-foreground/80 hover:text-primary font-medium transition-all shadow-sm hover:shadow-md"
            >
              <span className="text-base">{d.flag}</span>
              {d.name}
              {d.dot && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
            </motion.button>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="mt-3 text-[11px] text-muted-foreground/60 flex items-center justify-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Trending this week
        </motion.p>

      </div>
    </section>
  );
}
