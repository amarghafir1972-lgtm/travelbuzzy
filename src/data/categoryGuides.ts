export type CategoryGuide = {
  slug: string;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  accentColor: string;
  destinations: string[]; // destination slugs
};

export const categoryGuides: CategoryGuide[] = [
  {
    slug: "beach-islands",
    label: "Beach & Islands",
    emoji: "🏖️",
    tagline: "Sun, sand, and turquoise water",
    description: "The world's finest beaches and island escapes — from overwater bungalows in the Maldives to rice-paddy-backed shores in Bali. Whether you want seclusion, nightlife, or snorkelling reefs, these destinations deliver.",
    accentColor: "from-sky-400 to-cyan-600",
    destinations: ["bali", "maldives", "santorini", "phuket", "ibiza", "bora-bora", "hawaii", "amalfi-coast"],
  },
  {
    slug: "city-breaks",
    label: "City Breaks",
    emoji: "🏙️",
    tagline: "World-class cities for every kind of traveller",
    description: "From the neon-lit streets of Tokyo to the sun-drenched boulevards of Barcelona — these cities reward long weekends and extended stays equally. Museums, food scenes, nightlife, and culture at their very best.",
    accentColor: "from-violet-500 to-indigo-600",
    destinations: ["tokyo", "paris", "barcelona", "new-york", "amsterdam", "dubai", "rome", "istanbul", "prague", "singapore", "kyoto", "lisbon", "dubrovnik", "reykjavik"],
  },
  {
    slug: "adventure-nature",
    label: "Adventure & Nature",
    emoji: "🌿",
    tagline: "Wilderness, wildlife, and the great outdoors",
    description: "Bungee jump above Queenstown's fjords, chase the Northern Lights across Iceland, or watch southern right whales breach off Cape Town. These destinations are defined by the natural world rather than the built one.",
    accentColor: "from-emerald-500 to-green-700",
    destinations: ["queenstown", "reykjavik", "cape-town", "hawaii", "bali", "marrakech"],
  },
  {
    slug: "food-culture",
    label: "Food & Culture",
    emoji: "🍜",
    tagline: "Eat, explore, and immerse",
    description: "The world's great food cities and cultural capitals — where the market stall is as important as the museum, and every meal tells a story. From Bangkok's street food sois to Rome's trattorias, these destinations feed body and soul.",
    accentColor: "from-orange-400 to-rose-500",
    destinations: ["bangkok", "singapore", "rome", "hanoi", "lisbon", "mexico-city", "marrakech", "tokyo", "barcelona", "istanbul"],
  },
  {
    slug: "luxury-romance",
    label: "Luxury & Romance",
    emoji: "💎",
    tagline: "Exceptional hotels, private beaches, and unforgettable settings",
    description: "Overwater villas, cliffside suites, and Michelin-starred dining in the world's most beautiful places. Whether it's a honeymoon or simply a trip that demands the very best, these destinations set the standard.",
    accentColor: "from-rose-400 to-pink-600",
    destinations: ["maldives", "bora-bora", "santorini", "dubai", "amalfi-coast", "kyoto", "paris", "rio-de-janeiro"],
  },
  {
    slug: "budget-escapes",
    label: "Budget Escapes",
    emoji: "💸",
    tagline: "Incredible experiences for less",
    description: "World-class destinations where your money goes further — exceptional food, rich culture, and stunning scenery without the premium price tag. Southeast Asia, Eastern Europe, and beyond.",
    accentColor: "from-amber-400 to-yellow-500",
    destinations: ["hanoi", "bangkok", "lisbon", "marrakech", "mexico-city", "prague", "bali", "istanbul"],
  },
];

export function getCategoryGuide(slug: string): CategoryGuide | undefined {
  return categoryGuides.find((c) => c.slug === slug);
}
