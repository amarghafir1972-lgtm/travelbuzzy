import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const guides = [
  {
    id: "bali-guide",
    image: "/images/bali.jpg",
    destination: "Bali, Indonesia",
    title:
      "The Complete Bali Travel Guide: Where to Stay, Eat, and Save in 2025",
    teaser:
      "From Ubud's rice terraces to Seminyak's sunset bars — a practical breakdown of Bali's best areas and honest hotel picks for every budget.",
    readTime: "12 min read",
    href: "/destinations/bali",
  },
  {
    id: "paris-guide",
    image: "/images/paris.jpg",
    destination: "Paris, France",
    title:
      "Paris Without the Tourist Tax: Hotels and Neighborhoods Locals Actually Use",
    teaser:
      "Skip the overpriced arrondissements. Here's where to stay near the Seine without paying central-Paris prices, plus the best-value dining near every major sight.",
    readTime: "9 min read",
    href: "/destinations/paris",
  },
  {
    id: "maldives-guide",
    image: "/images/maldives.jpg",
    destination: "Maldives",
    title:
      "Maldives on a Budget: Guesthouses vs Resorts — An Honest Comparison",
    teaser:
      "You don't need $1,000/night to experience turquoise water. We compared 6 budget-friendly options with the luxury resorts to see what you actually get.",
    readTime: "14 min read",
    href: "/destinations/maldives",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function DestinationGuidesSection() {
  return (
    <section
      id="destinations"
      className="py-16 md:py-24 bg-background border-b border-border"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Popular Destination Guides
            </h2>
            <p className="mt-2 text-muted-foreground text-base max-w-xl">
              In-depth guides that actually help you make a decision — not just
              filler content.
            </p>
          </div>
          <a
            href="/destinations/bali"
            className="text-sm font-semibold text-primary hover:text-secondary underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            data-testid="link-all-guides"
          >
            Browse all guides
          </a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {guides.map((guide) => (
            <motion.a
              key={guide.id}
              variants={item}
              href={guide.href}
              data-testid={`card-guide-${guide.id}`}
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={guide.image}
                  alt={`${guide.destination} destination guide`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {guide.destination}
                </p>
                <h3 className="font-display font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {guide.teaser}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Read Guide
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
