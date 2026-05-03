import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, CheckCircle2, ExternalLink, Clock, MapPin,
  DollarSign, Globe, Landmark, ChevronRight, Lightbulb, Calendar,
  Plane, ChevronDown, ChevronUp, Heart, ArrowLeftRight
} from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { useState } from "react";
import { destinationMap } from "@/data/destinations";
import type { Destination, Hotel } from "@/data/destinations";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";
import BestTimeCalendar from "@/components/BestTimeCalendar";
import BookingCalendar from "@/components/BookingCalendar";
import LocalEvents from "@/components/LocalEvents";
import PriceAlertWidget from "@/components/PriceAlertWidget";
import BudgetCalculator from "@/components/BudgetCalculator";
import PackingList from "@/components/PackingList";
import LocalPhrases from "@/components/LocalPhrases";
import VisaEntry from "@/components/VisaEntry";
import LocalTransport from "@/components/LocalTransport";
import SafetyHealth from "@/components/SafetyHealth";
import FoodDrink from "@/components/FoodDrink";
import DayTrips from "@/components/DayTrips";

const tierLabel: Record<Hotel["tier"], string> = {
  budget: "Budget",
  mid: "Mid-range",
  luxury: "Luxury",
};

const tierColor: Record<Hotel["tier"], string> = {
  budget: "bg-emerald-100 text-emerald-700",
  mid: "bg-blue-100 text-blue-700",
  luxury: "bg-amber-100 text-amber-700",
};

function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="bg-surface border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
      itemScope
      itemType="https://schema.org/Hotel"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierColor[hotel.tier]}`}>
              {tierLabel[hotel.tier]}
            </span>
            {hotel.badge && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {hotel.badge}
              </span>
            )}
          </div>
          <h3 className="text-base font-display font-bold text-foreground leading-snug" itemProp="name">
            {hotel.name}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-display font-bold text-foreground">${hotel.pricePerNight}</p>
          <p className="text-xs text-muted-foreground">per night</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3">{hotel.description}</p>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {hotel.reviewScore} · {hotel.reviewCount.toLocaleString()} reviews
        </span>
      </div>

      <ul className="flex flex-wrap gap-1.5 mb-4">
        {hotel.highlights.map((h) => (
          <li key={h} className="flex items-center gap-1 text-xs text-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
            <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <a
        href={hotel.bookUrl}
        rel="nofollow noopener sponsored"
        target="_blank"
        data-testid={`button-hotel-book-${hotel.id}`}
        className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-[#E85D6A] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
      >
        Check Availability <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </motion.article>
  );
}

function Section({ section, index }: { section: Destination["sections"][0]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="border border-border rounded-2xl overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between px-6 py-4 bg-surface hover:bg-muted/50 transition-colors text-left"
        onClick={() => setOpen(!open)}
        data-testid={`button-section-${index}`}
        aria-expanded={open}
      >
        <h2 className="font-display font-bold text-foreground text-base pr-4">{section.heading}</h2>
        {open ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-6 pb-6 pt-2 bg-surface space-y-4 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
          {section.tips && section.tips.length > 0 && (
            <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="h-4 w-4 text-primary" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">TravelBuzzy Tips</p>
              </div>
              {section.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function DestinationPage() {
  const params = useParams<{ slug: string }>();
  const dest = destinationMap[params.slug ?? ""];
  const { isSaved, toggle } = useWishlist();
  const { record } = useRecentlyViewed();

  useSeo(dest ? {
    title: `${dest.name} Travel Guide 2025`,
    description: dest.metaDescription,
    image: dest.heroImage,
    url: `/destinations/${dest.slug}`,
    type: "article",
  } : {
    title: "Destination Not Found",
    description: "We don't have a guide for that destination yet.",
  });

  useEffect(() => {
    if (dest) record(dest.slug);
  }, [dest?.slug]);

  useEffect(() => {
    if (!dest) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: dest.name,
      description: dest.metaDescription,
      url: `https://travelbuzzy.com/destinations/${dest.slug}`,
      containedInPlace: { "@type": "Country", name: dest.country },
    };
    const script = document.createElement("script");
    script.id = "destination-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("destination-schema")?.remove();
    };
  }, [dest]);

  if (!dest) {
    return (
      <>
        <StickyHeader />
        <main className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4 px-4">
          <MapPin className="h-12 w-12 text-muted-foreground/40" />
          <h1 className="font-display text-2xl font-bold text-foreground">Destination not found</h1>
          <p className="text-muted-foreground text-sm">We don't have a guide for that destination yet.</p>
          <Link href="/" className="text-primary font-semibold text-sm hover:underline">← Back to TravelBuzzy</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <StickyHeader />

      <main className="pt-[72px]">
        {/* Hero */}
        <div className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img
            src={dest.heroImage}
            alt={`${dest.name}, ${dest.country}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-6 left-0 right-0 container mx-auto max-w-6xl px-4">
            <nav className="flex items-center gap-2 text-white/70 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">{dest.name}</span>
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 container mx-auto max-w-6xl px-4 pb-10">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-accent text-sm font-bold uppercase tracking-wider">{dest.country}</span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
                  {dest.name}
                </h1>
                <p className="text-white/80 text-lg">{dest.tagline}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Clock className="h-3.5 w-3.5 text-white/50" />
                  <span className="text-white/50 text-xs">Guide updated {dest.updated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/compare?a=${dest.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-sm transition-all"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  <span className="hidden sm:inline">Compare</span>
                </Link>
                <button
                  onClick={() => toggle(dest.slug)}
                  aria-label={isSaved(dest.slug) ? "Remove from wishlist" : "Save to wishlist"}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
                    isSaved(dest.slug)
                      ? "bg-accent text-white border-accent"
                      : "bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-sm"
                  }`}
                >
                  <Heart className={`h-4 w-4 transition-all ${isSaved(dest.slug) ? "fill-white" : ""}`} />
                  {isSaved(dest.slug) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-base text-muted-foreground leading-relaxed">{dest.intro}</p>
              </motion.div>

              {/* Guide sections */}
              <div className="space-y-3">
                {dest.sections.map((section, i) => (
                  <Section key={section.heading} section={section} index={i} />
                ))}
              </div>

              {/* Booking Calendar */}
              <BookingCalendar slug={dest.slug} destinationName={dest.name} />

              {/* Events & Festivals */}
              <LocalEvents slug={dest.slug} destinationName={dest.name} />

              {/* Price Alert */}
              <PriceAlertWidget slug={dest.slug} destinationName={dest.name} />

              {/* Budget Calculator */}
              <BudgetCalculator slug={dest.slug} destinationName={dest.name} />

              {/* Packing List */}
              <PackingList
                slug={dest.slug}
                destinationName={dest.name}
                departureMonth={new Date().getMonth()}
                nights={7}
              />

              {/* Local Phrases */}
              <LocalPhrases slug={dest.slug} destinationName={dest.name} />

              {/* Visa & Entry */}
              <VisaEntry slug={dest.slug} destinationName={dest.name} />

              {/* Local Transport */}
              <LocalTransport slug={dest.slug} destinationName={dest.name} />

              {/* Safety & Health */}
              <SafetyHealth slug={dest.slug} destinationName={dest.name} />

              {/* Food & Drink */}
              <FoodDrink slug={dest.slug} destinationName={dest.name} />

              {/* Day Trips */}
              <DayTrips slug={dest.slug} destinationName={dest.name} />

              {/* Hotels */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Where to stay in {dest.name}
                  </h2>
                  <Link href="/deals" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                    All deals <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {dest.hotels.map((hotel, i) => (
                    <HotelCard key={hotel.id} hotel={hotel} index={i} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5">*</span>
                  Prices shown are indicative and may vary. TravelBuzzy earns a commission on bookings made through these links, at no extra cost to you.{" "}
                  <Link href="/affiliate-disclosure" className="text-primary hover:underline">Full disclosure</Link>
                </p>
              </div>

              {/* Related destinations */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">You might also like</h2>
                <div className="grid grid-cols-3 gap-3">
                  {dest.relatedSlugs.map((slug) => {
                    const related = destinationMap[slug];
                    if (!related) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/destinations/${slug}`}
                        data-testid={`link-related-${slug}`}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <img
                          src={related.heroImage}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <p className="absolute bottom-3 left-3 text-white font-display font-bold text-sm">{related.name}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Quick facts */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-surface border border-border rounded-2xl overflow-hidden"
              >
                <div className="bg-primary px-5 py-4">
                  <h3 className="font-display font-bold text-white">Quick Facts</h3>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { icon: Calendar, label: "Best time", value: dest.quickFacts.bestTime },
                    { icon: DollarSign, label: "Currency", value: dest.quickFacts.currency },
                    { icon: Globe, label: "Language", value: dest.quickFacts.language },
                    { icon: Clock, label: "Timezone", value: dest.quickFacts.timezone },
                    { icon: DollarSign, label: "Avg budget", value: dest.quickFacts.avgBudget },
                    { icon: Landmark, label: "Visa", value: dest.quickFacts.visaRequired },
                    { icon: Plane, label: "Flight time", value: dest.quickFacts.flightFrom },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 px-5 py-3.5">
                      <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{label}</p>
                        <p className="text-sm text-foreground font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Best time calendar heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <BestTimeCalendar slug={dest.slug} />
              </motion.div>

              {/* Deals CTA */}
              <div className="bg-primary text-white rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Ready to book?</p>
                <p className="font-display font-bold text-base mb-2">See deals for {dest.name}</p>
                <p className="text-white/70 text-sm mb-4">
                  Our editorial team curates the best hotel and flight deals — updated daily.
                </p>
                <Link
                  href="/deals"
                  data-testid="button-sidebar-deals-cta"
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-[#E85D6A] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors w-full"
                >
                  See current deals <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* All destinations */}
              <div className="bg-surface border border-border rounded-2xl p-5">
                <h3 className="font-display font-bold text-foreground mb-3 text-sm">All destination guides</h3>
                <div className="space-y-1">
                  {Object.values(destinationMap).map(({ slug }) => {
                    const d = destinationMap[slug];
                    if (!d) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/destinations/${slug}`}
                        data-testid={`link-sidebar-dest-${slug}`}
                        className={`flex items-center justify-between py-2 text-sm transition-colors border-b border-border/50 last:border-0
                          ${slug === dest.slug ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                      >
                        {d.name}, {d.country}
                        {slug === dest.slug ? (
                          <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Current</span>
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
