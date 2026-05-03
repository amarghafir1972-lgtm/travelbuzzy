import { motion } from "framer-motion";
import { MapPin, Building2, Tag, Lightbulb, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "destinations",
    icon: MapPin,
    title: "Destinations",
    description: "Handpicked destination guides from travelers who've been there.",
    href: "/destinations/bali",
  },
  {
    id: "hotels",
    icon: Building2,
    title: "Hotels",
    description: "Honest hotel reviews and best-value picks across all budgets.",
    href: "/deals",
  },
  {
    id: "deals",
    icon: Tag,
    title: "Deals",
    description: "Today's best flight and hotel deals, curated before they sell out.",
    href: "/deals",
  },
  {
    id: "tips",
    icon: Lightbulb,
    title: "Travel Tips",
    description: "Practical advice to help you travel smarter and spend less.",
    href: "#tips",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CategorySection() {
  return (
    <section id="categories" className="py-16 md:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Browse by Category
          </h2>
          <p className="mt-2 text-muted-foreground text-base max-w-xl">
            Everything you need to plan a better trip — all in one place.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.id}
                variants={item}
                href={cat.href}
                data-testid={`card-category-${cat.id}`}
                className="group flex flex-col gap-4 p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
