import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Trash2, ArrowRight, SlidersHorizontal, X, MapPin,
  Clock, DollarSign, Globe, Plane, ArrowLeft
} from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import destinations, { destinationMap } from "@/data/destinations";
import StickyHeader from "@/pages/home/StickyHeader";
import Footer from "@/pages/home/Footer";

const flags: Record<string, string> = {
  bali: "🇮🇩", santorini: "🇬🇷", tokyo: "🇯🇵", maldives: "🇲🇻", paris: "🇫🇷",
  bangkok: "🇹🇭", barcelona: "🇪🇸", dubai: "🇦🇪", rome: "🇮🇹", kyoto: "🇯🇵",
  phuket: "🇹🇭", amsterdam: "🇳🇱", "cape-town": "🇿🇦", "new-york": "🇺🇸", lisbon: "🇵🇹",
  "amalfi-coast": "🇮🇹", marrakech: "🇲🇦", singapore: "🇸🇬", prague: "🇨🇿", ibiza: "🇪🇸",
  "bora-bora": "🇵🇫", istanbul: "🇹🇷", queenstown: "🇳🇿", hawaii: "🇺🇸", hanoi: "🇻🇳",
  reykjavik: "🇮🇸", "mexico-city": "🇲🇽", "rio-de-janeiro": "🇧🇷", dubrovnik: "🇭🇷", miami: "🇺🇸",
};

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-28 text-center px-4"
    >
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Heart className="h-9 w-9 text-accent/60" />
      </div>
      <h2 className="font-display font-bold text-2xl text-foreground mb-2">Your wishlist is empty</h2>
      <p className="text-muted-foreground text-base max-w-sm mb-8">
        Save destinations you're dreaming about and compare them side by side.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-accent hover:bg-[#E85D6A] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
      >
        Browse Destinations <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

function ComparePanel({ slugs, onClear, onRemove }: {
  slugs: string[];
  onClear: () => void;
  onRemove: (s: string) => void;
}) {
  const dests = slugs.map((s) => destinationMap[s]).filter(Boolean);
  if (dests.length < 2) return null;

  const fields: { label: string; icon: React.ReactNode; key: keyof typeof dests[0]["quickFacts"] }[] = [
    { label: "Best time", icon: <Clock className="h-3.5 w-3.5" />, key: "bestTime" },
    { label: "Budget/day", icon: <DollarSign className="h-3.5 w-3.5" />, key: "avgBudget" },
    { label: "Currency", icon: <Globe className="h-3.5 w-3.5" />, key: "currency" },
    { label: "Visa", icon: <Plane className="h-3.5 w-3.5" />, key: "visaRequired" },
    { label: "Flight from", icon: <Plane className="h-3.5 w-3.5" />, key: "flightFrom" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      className="bg-white border border-border rounded-2xl shadow-lg overflow-hidden mb-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground text-sm">Side-by-side comparison</span>
          <span className="text-xs text-muted-foreground">({dests.length} destinations)</span>
        </div>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Clear
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          {/* Destination headers */}
          <thead>
            <tr className="border-b border-border">
              <th className="w-32 px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Factor
              </th>
              {dests.map((d) => (
                <th key={d.slug} className="px-4 py-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <div className="relative w-full h-24 rounded-xl overflow-hidden">
                      <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <button
                        onClick={() => onRemove(d.slug)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        aria-label={`Remove ${d.name} from compare`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="absolute bottom-2 left-3 text-white font-display font-bold text-base">
                        {flags[d.slug]} {d.name}
                      </p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={f.key} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                <td className="px-5 py-3 text-xs text-muted-foreground flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-primary/60">{f.icon}</span>
                  {f.label}
                </td>
                {dests.map((d) => (
                  <td key={d.slug} className="px-4 py-3 text-sm text-foreground font-medium">
                    {d.quickFacts[f.key]}
                  </td>
                ))}
              </tr>
            ))}
            {/* Hotels row */}
            <tr>
              <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap">Hotels reviewed</td>
              {dests.map((d) => (
                <td key={d.slug} className="px-4 py-3">
                  <span className="text-sm font-semibold text-primary">{d.hotels.length} hotels</span>
                </td>
              ))}
            </tr>
            {/* CTA row */}
            <tr className="border-t border-border">
              <td className="px-5 py-4" />
              {dests.map((d) => (
                <td key={d.slug} className="px-4 py-4">
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-accent hover:bg-[#E85D6A] px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function WishlistCard({ slug, inCompare, onToggleCompare, onRemove }: {
  slug: string;
  inCompare: boolean;
  onToggleCompare: (s: string) => void;
  onRemove: (s: string) => void;
}) {
  const dest = destinationMap[slug];
  if (!dest) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-200 ${
        inCompare ? "border-primary ring-2 ring-primary/20" : "border-border hover:shadow-md hover:border-primary/25"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Remove from wishlist */}
        <button
          onClick={() => onRemove(slug)}
          className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>

        {/* Compare toggle */}
        <button
          onClick={() => onToggleCompare(slug)}
          className={`absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-full transition-all ${
            inCompare
              ? "bg-primary text-white"
              : "bg-black/50 text-white hover:bg-primary/80"
          }`}
        >
          <SlidersHorizontal className="h-3 w-3" />
          {inCompare ? "In compare" : "Compare"}
        </button>

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">{dest.country}</p>
          <h3 className="font-display font-bold text-xl text-white">
            {flags[slug]} {dest.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{dest.tagline}</p>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-primary/50" />
            {dest.quickFacts.bestTime}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-primary/50" />
            {dest.quickFacts.avgBudget}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-border">
          <Link
            href={`/destinations/${dest.slug}`}
            className="flex items-center justify-center gap-2 w-full bg-primary/8 hover:bg-primary/15 text-primary font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            View Full Guide <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function WishlistPage() {
  const { saved, compare, removeFromWishlist, toggleCompare, inCompare, clearCompare } = useWishlist();
  const [, navigate] = useLocation();

  const savedDests = saved.filter((s) => destinationMap[s]);

  return (
    <>
      <StickyHeader />
      <main className="pt-[72px] min-h-screen bg-[#F7F6F2]">
        {/* Header band */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-accent fill-accent" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">My Wishlist</h1>
                <p className="text-sm text-muted-foreground">
                  {savedDests.length === 0
                    ? "No saved destinations yet"
                    : `${savedDests.length} saved destination${savedDests.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {savedDests.length >= 2 && compare.length < 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-primary/80 bg-primary/6 border border-primary/15 rounded-xl px-4 py-2.5 inline-flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Tip: click <strong>Compare</strong> on 2–3 destinations to see them side by side
              </motion.p>
            )}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-10">
          {/* Compare panel */}
          <AnimatePresence>
            {compare.length >= 2 && (
              <ComparePanel
                slugs={compare}
                onClear={clearCompare}
                onRemove={(s) => toggleCompare(s)}
              />
            )}
          </AnimatePresence>

          {savedDests.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {savedDests.map((slug) => (
                  <WishlistCard
                    key={slug}
                    slug={slug}
                    inCompare={inCompare(slug)}
                    onToggleCompare={toggleCompare}
                    onRemove={removeFromWishlist}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Suggestions — destinations not yet saved */}
          {savedDests.length > 0 && savedDests.length < destinations.length && (
            <div className="mt-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/60 mb-4">
                You might also like
              </p>
              <div className="flex flex-wrap gap-3">
                {destinations
                  .filter((d) => !saved.includes(d.slug))
                  .map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-primary/30 hover:shadow-sm text-sm font-medium text-foreground transition-all"
                    >
                      <span>{flags[d.slug]}</span>
                      {d.name}
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
