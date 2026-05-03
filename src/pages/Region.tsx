import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { destinationMap } from "@/data/destinations";
import { regionMap } from "@/data/regionsData";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import { MapPin, Clock, DollarSign, ChevronRight } from "lucide-react";

export default function Region() {
  const { slug } = useParams<{ slug: string }>();
  const region = regionMap[slug ?? ""];

  useSeo(
    region
      ? `${region.name} Travel Guide — Best Destinations | TravelBuzzy`
      : "Region Not Found | TravelBuzzy",
    region?.description ?? ""
  );

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-3">Region not found</h1>
          <Link href="/" className="text-primary underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const destinations = region.destinationSlugs
    .map((s) => destinationMap[s])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${region.heroGradient} pt-24 pb-16`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Regions</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium">{region.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-4">{region.emoji}</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              {region.name}
            </h1>
            <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
              {region.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                About {region.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {region.description}
              </p>
            </section>

            {/* Featured destinations */}
            {destinations.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Our {region.name} Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {destinations.map((dest, i) => (
                    <motion.div
                      key={dest.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <Link href={`/destinations/${dest.slug}`}>
                        <div className="group rounded-2xl border border-border overflow-hidden bg-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <div className="relative h-44 overflow-hidden bg-muted">
                            <img
                              src={dest.heroImage}
                              alt={dest.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <p className="text-white font-display font-bold text-xl leading-tight">
                                {dest.name}
                              </p>
                              <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                                <MapPin className="h-3 w-3" />
                                {dest.country}
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground mb-3 leading-snug">
                              {dest.tagline}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                <Clock className="h-3 w-3" />
                                {dest.quickFacts.bestTime}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                <DollarSign className="h-3 w-3" />
                                {dest.quickFacts.avgBudget}
                              </span>
                            </div>
                          </div>
                          <div className="px-4 pb-4">
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                              Read the full guide <ChevronRight className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Coming soon */}
            {region.comingSoon.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Coming Soon
                </h2>
                <p className="text-muted-foreground text-sm mb-5">
                  We're working on full destination guides for these — check back soon.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {region.comingSoon.map((dest) => (
                    <div
                      key={dest.name}
                      className="flex items-start gap-3 p-4 rounded-xl border border-dashed border-border bg-muted/30"
                    >
                      <span className="text-2xl shrink-0">{dest.emoji}</span>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {dest.name}
                          <span className="ml-2 text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                            Soon
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{dest.country}</p>
                        <p className="text-xs text-muted-foreground mt-1">{dest.tagline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Why visit highlights */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display font-bold text-base text-foreground mb-4">
                Why visit {region.shortName}?
              </h3>
              <ul className="space-y-3">
                {region.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0 font-bold">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other regions */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display font-bold text-base text-foreground mb-4">
                Explore other regions
              </h3>
              <ul className="space-y-2">
                {[
                  { slug: "southeast-asia", label: "Southeast Asia", emoji: "🌴" },
                  { slug: "europe", label: "Europe", emoji: "🏛️" },
                  { slug: "americas", label: "Americas", emoji: "🌎" },
                  { slug: "middle-east-africa", label: "Middle East & Africa", emoji: "🦁" },
                ]
                  .filter((r) => r.slug !== slug)
                  .map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/regions/${r.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 group"
                      >
                        <span>{r.emoji}</span>
                        <span className="group-hover:underline underline-offset-2">{r.label}</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Destinations count */}
            <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
              <p className="font-display text-3xl font-bold text-foreground">
                {destinations.length + region.comingSoon.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                destinations covered or coming soon
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                {destinations.length} full guide{destinations.length !== 1 ? "s" : ""} ·{" "}
                {region.comingSoon.length} in progress
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
