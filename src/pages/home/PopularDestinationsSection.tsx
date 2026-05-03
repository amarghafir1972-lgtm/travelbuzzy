import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Star, Heart } from "lucide-react";
import destinations from "@/data/destinations";
import { useWishlist } from "@/hooks/use-wishlist";

const flags: Record<string, string> = {
  bali:            "🇮🇩",
  santorini:       "🇬🇷",
  tokyo:           "🇯🇵",
  maldives:        "🇲🇻",
  paris:           "🇫🇷",
  bangkok:         "🇹🇭",
  barcelona:       "🇪🇸",
  dubai:           "🇦🇪",
  rome:            "🇮🇹",
  kyoto:           "🇯🇵",
  phuket:          "🇹🇭",
  amsterdam:       "🇳🇱",
  "cape-town":     "🇿🇦",
  "new-york":      "🇺🇸",
  lisbon:          "🇵🇹",
  "amalfi-coast":  "🇮🇹",
  marrakech:       "🇲🇦",
  singapore:       "🇸🇬",
  prague:          "🇨🇿",
  ibiza:           "🇪🇸",
  "bora-bora":     "🇵🇫",
  istanbul:        "🇹🇷",
  queenstown:      "🇳🇿",
  hawaii:          "🇺🇸",
  hanoi:           "🇻🇳",
  reykjavik:       "🇮🇸",
  "mexico-city":   "🇲🇽",
  "rio-de-janeiro":"🇧🇷",
  dubrovnik:       "🇭🇷",
  miami:           "🇺🇸",
};

const highlights: Record<string, { icon: string; label: string }[]> = {
  bali:            [{ icon: "🌿", label: "Rice terraces" }, { icon: "🏄", label: "Surf beaches" }, { icon: "🛕", label: "Ancient temples" }],
  santorini:       [{ icon: "🌊", label: "Caldera views" }, { icon: "🍷", label: "Assyrtiko wine" }, { icon: "🌅", label: "Oia sunsets" }],
  tokyo:           [{ icon: "🍜", label: "World's best food" }, { icon: "🌸", label: "Cherry blossom" }, { icon: "🚅", label: "Bullet trains" }],
  maldives:        [{ icon: "🤿", label: "Crystal lagoons" }, { icon: "🏝️", label: "Overwater villas" }, { icon: "🦈", label: "Whale sharks" }],
  paris:           [{ icon: "🥐", label: "Café culture" }, { icon: "🗼", label: "Iconic landmarks" }, { icon: "🎨", label: "World-class art" }],
  bangkok:         [{ icon: "🛕", label: "Grand Palace" }, { icon: "🍜", label: "Street food" }, { icon: "🌃", label: "Rooftop bars" }],
  barcelona:       [{ icon: "🏛️", label: "Gaudí architecture" }, { icon: "🍷", label: "Catalan cuisine" }, { icon: "🏖️", label: "City beach" }],
  dubai:           [{ icon: "🏙️", label: "Burj Khalifa" }, { icon: "🏜️", label: "Desert safaris" }, { icon: "🛍️", label: "Tax-free shopping" }],
  rome:            [{ icon: "🏛️", label: "Colosseum" }, { icon: "🍝", label: "Best pasta" }, { icon: "⛪", label: "The Vatican" }],
  kyoto:           [{ icon: "🎋", label: "Bamboo groves" }, { icon: "🌸", label: "Cherry blossom" }, { icon: "⛩️", label: "1,600 temples" }],
  phuket:          [{ icon: "🏖️", label: "Andaman beaches" }, { icon: "🚤", label: "Island hopping" }, { icon: "🤿", label: "Coral reefs" }],
  amsterdam:       [{ icon: "🚲", label: "Cycling culture" }, { icon: "🏛️", label: "Rijksmuseum" }, { icon: "🌷", label: "Tulip season" }],
  "cape-town":     [{ icon: "⛰️", label: "Table Mountain" }, { icon: "🍷", label: "Cape Winelands" }, { icon: "🐧", label: "Penguins" }],
  "new-york":      [{ icon: "🗽", label: "Manhattan skyline" }, { icon: "🎭", label: "Broadway" }, { icon: "🍕", label: "NYC food scene" }],
  lisbon:          [{ icon: "🚃", label: "Tram 28" }, { icon: "🎵", label: "Fado music" }, { icon: "🥐", label: "Pastéis de nata" }],
  "amalfi-coast":  [{ icon: "🍋", label: "Limoncello" }, { icon: "⛵", label: "Coastal ferries" }, { icon: "🌊", label: "Cliffside villages" }],
  marrakech:       [{ icon: "🏺", label: "Medina souks" }, { icon: "🛁", label: "Hammams" }, { icon: "⛰️", label: "Atlas Mountains" }],
  singapore:       [{ icon: "🌿", label: "Gardens by the Bay" }, { icon: "🍜", label: "Hawker centres" }, { icon: "✈️", label: "World's best airport" }],
  prague:          [{ icon: "🏰", label: "Prague Castle" }, { icon: "🌉", label: "Charles Bridge" }, { icon: "🍺", label: "World's best beer" }],
  ibiza:           [{ icon: "🎵", label: "Club culture" }, { icon: "🏖️", label: "Hidden coves" }, { icon: "🌅", label: "Café del Mar sunsets" }],
  "bora-bora":     [{ icon: "🏝️", label: "Overwater bungalows" }, { icon: "🤿", label: "Manta rays" }, { icon: "🌊", label: "Turquoise lagoon" }],
  istanbul:        [{ icon: "🕌", label: "Hagia Sophia" }, { icon: "🛁", label: "Turkish hammams" }, { icon: "⛴️", label: "Bosphorus ferry" }],
  queenstown:      [{ icon: "🎿", label: "World-class ski" }, { icon: "🪂", label: "Bungee jumping" }, { icon: "⛰️", label: "Milford Sound" }],
  hawaii:          [{ icon: "🌋", label: "Active volcanoes" }, { icon: "🏄", label: "World-class surf" }, { icon: "🐋", label: "Whale watching" }],
  hanoi:           [{ icon: "🍜", label: "Pho at dawn" }, { icon: "🏛️", label: "Old Quarter" }, { icon: "⛵", label: "Ha Long Bay" }],
  reykjavik:       [{ icon: "🌌", label: "Northern Lights" }, { icon: "♨️", label: "Blue Lagoon" }, { icon: "🌅", label: "Midnight Sun" }],
  "mexico-city":   [{ icon: "🌮", label: "World-class tacos" }, { icon: "🏛️", label: "Aztec ruins" }, { icon: "🎨", label: "Frida Kahlo Museum" }],
  "rio-de-janeiro":[{ icon: "⛪", label: "Cristo Redentor" }, { icon: "🏖️", label: "Copacabana" }, { icon: "🎉", label: "Carnaval" }],
  dubrovnik:       [{ icon: "🏰", label: "City walls walk" }, { icon: "⛵", label: "Adriatic islands" }, { icon: "🌊", label: "Crystal-clear sea" }],
  miami:           [{ icon: "🏛️", label: "Art Deco district" }, { icon: "🎨", label: "Wynwood murals" }, { icon: "🕺", label: "Latin nightlife" }],
};

const hotelCount: Record<string, number> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.hotels.length])
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PopularDestinationsSection() {
  const { isSaved, toggle } = useWishlist();
  const [featured, ...rest] = destinations;

  return (
    <section className="py-16 md:py-24 bg-[#F7F6F2] border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">
              Most Popular
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              World's Top Destinations
            </h2>
            <p className="mt-2 text-muted-foreground text-base max-w-xl">
              The destinations travellers search most — with our honest, in-depth guides for every budget.
            </p>
          </div>
          <Link
            href="/hotels"
            className="text-sm font-semibold text-primary hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1"
          >
            Browse all hotels <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Featured card — full width */}
          <motion.div variants={item} className="mb-5">
            <Link
              href={`/destinations/${featured.slug}`}
              className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative md:w-[55%] aspect-[16/9] md:aspect-auto md:min-h-[320px] overflow-hidden shrink-0">
                <img
                  src={featured.heroImage}
                  alt={featured.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                {/* Flag + badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-3xl drop-shadow">{flags[featured.slug]}</span>
                  <span className="bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                    #1 Most Searched
                  </span>
                </div>
                {/* Save button */}
                <button
                  onClick={(e) => { e.preventDefault(); toggle(featured.slug); }}
                  aria-label={isSaved(featured.slug) ? "Remove from wishlist" : "Save to wishlist"}
                  className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all ${
                    isSaved(featured.slug)
                      ? "bg-accent text-white border-accent shadow-md"
                      : "bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-sm"
                  }`}
                >
                  <Heart className={`h-4 w-4 transition-all ${isSaved(featured.slug) ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-7 md:p-10 gap-5 flex-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    {featured.country}
                  </p>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-snug group-hover:text-primary transition-colors mb-3">
                    {featured.name}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {featured.tagline}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {(highlights[featured.slug] ?? []).map((h) => (
                    <span
                      key={h.label}
                      className="flex items-center gap-1.5 bg-primary/8 text-foreground text-sm px-3 py-1.5 rounded-full border border-primary/15"
                    >
                      <span>{h.icon}</span>
                      {h.label}
                    </span>
                  ))}
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary/50" />
                    Best: {featured.quickFacts.bestTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary/50" />
                    {featured.quickFacts.avgBudget}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    {hotelCount[featured.slug]} hotels reviewed
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-primary font-semibold group-hover:gap-3 transition-all">
                  Explore Bali Guide
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 4 remaining cards — 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((dest, i) => (
              <motion.div key={dest.slug} variants={item}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300 h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    {/* Rank badge */}
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      #{i + 2}
                    </div>
                    {/* Flag */}
                    <span className="absolute top-3 right-11 text-2xl drop-shadow">
                      {flags[dest.slug]}
                    </span>
                    {/* Save button */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggle(dest.slug); }}
                      aria-label={isSaved(dest.slug) ? "Remove from wishlist" : "Save to wishlist"}
                      className={`absolute top-3 right-3 p-1.5 rounded-full border transition-all ${
                        isSaved(dest.slug)
                          ? "bg-accent text-white border-accent"
                          : "bg-black/40 hover:bg-black/60 text-white border-white/20"
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isSaved(dest.slug) ? "fill-white" : ""}`} />
                    </button>
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">
                        {dest.country}
                      </p>
                      <h3 className="font-display font-bold text-xl text-white leading-tight group-hover:text-accent transition-colors">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {dest.tagline}
                    </p>

                    {/* Highlights chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {(highlights[dest.slug] ?? []).slice(0, 2).map((h) => (
                        <span
                          key={h.label}
                          className="flex items-center gap-1 text-[11px] bg-muted text-foreground/70 px-2 py-0.5 rounded-full"
                        >
                          {h.icon} {h.label}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-500" />
                        {hotelCount[dest.slug]} hotels
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all">
                        View guide <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
