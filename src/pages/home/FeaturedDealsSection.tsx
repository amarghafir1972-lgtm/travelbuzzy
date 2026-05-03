import { motion } from "framer-motion";
import { Star, ExternalLink, Clock, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import cmsData from "../../data/cms-overrides.json";

type CmsDeal = {
  id: string;
  title: string;
  destination: string;
  dealType?: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  priceUsd?: number;
  originalPriceUsd?: number;
  imageUrl?: string;
  reviewScore?: number;
  reviewCount?: number;
  ctaText?: string;
  bookUrl?: string;
  validUntil?: string;
};

// CMS deals from Airtable (first 3 published deals shown on homepage)
const cmsDeals: CmsDeal[] = (cmsData as any).deals ?? [];

// Fallback hardcoded deals shown if Airtable has none yet
const FALLBACK_DEALS: CmsDeal[] = [
  {
    id: "maldives-overwater",
    title: "Overwater Villa at Anantara Veli",
    destination: "Maldives",
    badge: "Editor's Pick",
    badgeColor: "bg-primary text-white",
    description: "All-inclusive overwater bungalow with direct lagoon access. Snorkelling, sunset cruises, and private deck included.",
    priceUsd: 389,
    originalPriceUsd: 680,
    imageUrl: "/images/maldives.jpg",
    reviewScore: 4.9,
    reviewCount: 312,
    ctaText: "Check Availability",
    bookUrl: "#",
  },
  {
    id: "santorini-cave",
    title: "Canaves Oia Boutique Hotel",
    destination: "Santorini, Greece",
    badge: "Best Value",
    badgeColor: "bg-accent text-white",
    description: "Iconic caldera views, private plunge pool, and breakfast included. Book 21 days ahead for this rate.",
    priceUsd: 299,
    originalPriceUsd: 540,
    imageUrl: "/images/santorini.jpg",
    reviewScore: 4.8,
    reviewCount: 208,
    ctaText: "Compare Prices",
    bookUrl: "#",
  },
  {
    id: "tokyo-shibuya",
    title: "Andaz Tokyo Toranomon Hills",
    destination: "Tokyo, Japan",
    badge: "Top Pick",
    badgeColor: "bg-secondary text-white",
    description: "Sleek rooftop pool with Shinjuku skyline views. Walking distance to Shibuya and Harajuku — perfect city base.",
    priceUsd: 198,
    originalPriceUsd: 320,
    imageUrl: "/images/tokyo.jpg",
    reviewScore: 4.7,
    reviewCount: 441,
    ctaText: "See Today's Deals",
    bookUrl: "#",
  },
];

const displayDeals = cmsDeals.length >= 1 ? cmsDeals.slice(0, 3) : FALLBACK_DEALS;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function savingsPct(deal: CmsDeal) {
  if (deal.originalPriceUsd && deal.priceUsd && deal.originalPriceUsd > deal.priceUsd) {
    return Math.round(((deal.originalPriceUsd - deal.priceUsd) / deal.originalPriceUsd) * 100);
  }
  return 0;
}

export default function FeaturedDealsSection() {
  return (
    <section id="deals" className="py-16 md:py-24 bg-card border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Today's Featured Deals
            </h2>
            <p className="mt-2 text-muted-foreground text-base max-w-xl">
              Hand-selected offers updated regularly — prices won't last.
            </p>
          </div>
          <Link
            href="/deals"
            className="text-sm font-semibold text-primary hover:text-secondary underline-offset-4 hover:underline transition-colors whitespace-nowrap"
          >
            View all deals →
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {displayDeals.map((deal) => {
            const pct = savingsPct(deal);
            return (
              <motion.div
                key={deal.id}
                variants={item}
                className="group flex flex-col bg-background border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={deal.imageUrl ?? "/images/bali.jpg"}
                    alt={`${deal.destination} travel deal`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {deal.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${deal.badgeColor ?? "bg-primary text-white"}`}>
                      {deal.badge}
                    </span>
                  )}
                  {pct > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <TrendingDown className="h-3 w-3" />
                      {pct}% off
                    </div>
                  )}
                  {deal.validUntil && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      Expires {deal.validUntil}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {deal.destination}
                    </p>
                    <h3 className="font-display font-bold text-lg text-foreground leading-snug">
                      {deal.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {deal.description}
                  </p>

                  {(deal.reviewScore ?? 0) > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-foreground">{deal.reviewScore}</span>
                      {(deal.reviewCount ?? 0) > 0 && (
                        <span className="text-xs text-muted-foreground">({deal.reviewCount?.toLocaleString()} reviews)</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-border">
                    <div className="flex items-baseline gap-2">
                      {deal.originalPriceUsd && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPriceUsd}
                        </span>
                      )}
                      {deal.priceUsd && (
                        <>
                          <span className="text-xl font-display font-bold text-primary">
                            ${deal.priceUsd}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {deal.dealType === "flight" ? "/person" : "/night"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-accent hover:bg-[#E85D6A] text-white font-semibold transition-all group/btn"
                    asChild
                  >
                    <a href={deal.bookUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                      {deal.ctaText ?? "Check Availability"}
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-70 group-hover/btn:opacity-100" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          * Prices are per night and may include affiliate commissions. Availability subject to change.
        </p>
      </div>
    </section>
  );
}
