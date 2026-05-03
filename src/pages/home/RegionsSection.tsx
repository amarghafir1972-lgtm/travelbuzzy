import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import regionsData from "@/data/regionsData";

const gradientClasses: Record<string, string> = {
  "southeast-asia":    "from-emerald-900 via-teal-800 to-emerald-700",
  "europe":            "from-blue-900 via-indigo-800 to-violet-700",
  "americas":          "from-orange-900 via-red-800 to-rose-700",
  "middle-east-africa":"from-amber-900 via-orange-800 to-yellow-700",
};

const accentClasses: Record<string, string> = {
  "southeast-asia":    "bg-white/15 text-white",
  "europe":            "bg-white/15 text-white",
  "americas":          "bg-white/15 text-white",
  "middle-east-africa":"bg-white/15 text-white",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function RegionsSection() {
  return (
    <section id="regions" className="py-16 md:py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">
              Browse by Region
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Where do you want to go?
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-xl">
              Explore our destination guides and hotel picks by region — from Southeast Asian temples to European coastlines.
            </p>
          </div>
          <Link
            href="/regions/southeast-asia"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all shrink-0"
          >
            All regions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Region cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {regionsData.map((region) => {
            const totalCount = region.destinationSlugs.length + region.comingSoon.length;
            const liveCount = region.destinationSlugs.length;
            return (
              <motion.div key={region.slug} variants={item}>
                <Link href={`/regions/${region.slug}`}>
                  <div
                    className={`group relative bg-gradient-to-br ${gradientClasses[region.slug]} rounded-2xl overflow-hidden cursor-pointer h-52 flex flex-col justify-between p-5 hover:shadow-xl transition-shadow duration-300`}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <span className="text-3xl drop-shadow-sm">{region.emoji}</span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${accentClasses[region.slug]}`}>
                        {totalCount} destination{totalCount !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Bottom */}
                    <div>
                      <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">
                        {region.name}
                      </h3>
                      <p className="text-white/70 text-xs leading-snug line-clamp-2 mb-3">
                        {region.tagline}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {region.destinationSlugs.length > 0 ? (
                            <span className="text-[11px] text-white/60">
                              {liveCount} guide{liveCount !== 1 ? "s" : ""} ready
                            </span>
                          ) : (
                            <span className="text-[11px] text-white/60">Coming soon</span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-white text-xs font-medium group-hover:gap-2 transition-all">
                          Explore <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-2xl" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile "all regions" link */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/regions/southeast-asia"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            View all regions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
