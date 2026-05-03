export interface RegionDestinationCard {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  avgBudget: string;
  bestTime: string;
}

export interface ComingSoonCard {
  name: string;
  country: string;
  tagline: string;
  emoji: string;
}

export interface Region {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroGradient: string;
  emoji: string;
  highlights: string[];
  destinationSlugs: string[];
  comingSoon: ComingSoonCard[];
}

const regionsData: Region[] = [
  {
    slug: "southeast-asia",
    name: "Southeast Asia",
    shortName: "SE Asia",
    tagline: "Ancient temples, jungle rice terraces, and some of the world's best beaches",
    description:
      "Southeast Asia offers extraordinary value, extraordinary food, and a density of memorable experiences that no other region on earth can match. From Bali's Hindu temples and volcanic mountains to the neon-lit streets of Bangkok, the limestone karsts of Ha Long Bay, and the white-sand beaches of the Philippines — this is the region that turns first-time travellers into lifelong ones.",
    heroGradient: "from-emerald-900 via-teal-800 to-emerald-700",
    emoji: "🌴",
    highlights: [
      "World's best value for money — eat, sleep, and travel well on $50–80/day",
      "Extraordinary food diversity: Thai, Vietnamese, Indonesian, Malaysian, Cambodian",
      "Ancient temple complexes — Angkor Wat, Borobudur, Prambanan, Bagan",
      "Island-hopping across thousands of miles of coastline",
      "Year-round warm weather — just pick your dry season by country",
    ],
    destinationSlugs: ["bali", "tokyo", "bangkok", "phuket", "kyoto", "hanoi", "singapore"],
    comingSoon: [
      { name: "Hoi An", country: "Vietnam", tagline: "Lantern-lit old town, tailor shops, and rice paddies", emoji: "🏮" },
      { name: "Chiang Mai", country: "Thailand", tagline: "Elephant sanctuaries, night markets, and Doi Inthanon", emoji: "🐘" },
      { name: "Bali (Lombok)", country: "Indonesia", tagline: "Quieter neighbour with Mount Rinjani and pristine beaches", emoji: "🌋" },
      { name: "Luang Prabang", country: "Laos", tagline: "Buddhist monks at dawn, waterfalls, and slow river life", emoji: "🙏" },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    shortName: "Europe",
    tagline: "Millennia of art, architecture, and coastline — with excellent train connections",
    description:
      "Europe packs more UNESCO World Heritage Sites, Michelin-starred restaurants, and ancient ruins into a compact landmass than anywhere on earth. The real advantage for travellers is the rail network — Santorini to Paris to Bruges to the Amalfi Coast, all without a single connecting flight. Whether you want caldera-view cocktails in Greece, croissants on the Seine, or Gothic cathedrals in Bruges, Europe rewards the traveller who goes slowly.",
    heroGradient: "from-blue-900 via-indigo-800 to-violet-700",
    emoji: "🏛️",
    highlights: [
      "World's finest rail network — city-centre to city-centre without airports",
      "Unmatched food culture: French, Italian, Spanish, Greek — each region has its own",
      "Mediterranean climate: hot dry summers, mild winters on the southern coasts",
      "Art and architecture spanning 3,000 years in a single continent",
      "Schengen Zone — one visa covers 27 countries for 90 days",
    ],
    destinationSlugs: ["santorini", "paris", "barcelona", "rome", "amsterdam", "lisbon", "amalfi-coast", "prague", "ibiza", "dubrovnik", "istanbul"],
    comingSoon: [
      { name: "Bruges", country: "Belgium", tagline: "Medieval canal city, Belgian chocolate, and world-class beer", emoji: "🍺" },
      { name: "Athens", country: "Greece", tagline: "The Acropolis, street food revival, and rooftop bars", emoji: "🏛️" },
      { name: "Amalfi (Ravello)", country: "Italy", tagline: "The quietest, most elevated village on the coast", emoji: "🍋" },
      { name: "Seville", country: "Spain", tagline: "Flamenco, tapas, and Andalusian architecture at its finest", emoji: "💃" },
    ],
  },
  {
    slug: "americas",
    name: "Americas",
    shortName: "Americas",
    tagline: "From Patagonian glaciers to Caribbean beaches — the western hemisphere at its best",
    description:
      "The Americas stretch from the Arctic tundra to the tip of Patagonia, taking in the Amazon rainforest, the Atacama Desert, Machu Picchu, the Canadian Rockies, the beaches of Mexico's Yucatán, and the jazz clubs of New Orleans along the way. North America's national parks and South America's ancient civilisations sit on the same continent — giving travellers an extraordinary range of landscapes and cultures within a single hemisphere.",
    heroGradient: "from-orange-900 via-red-800 to-rose-700",
    emoji: "🌎",
    highlights: [
      "Diverse climates in a single hemisphere — glaciers, deserts, rainforests, and beaches",
      "Ancient civilisations: Machu Picchu, Chichen Itza, Tikal, and the Nazca Lines",
      "World-class national parks — Patagonia, Yellowstone, the Canadian Rockies",
      "Caribbean island-hopping from Cuba to Barbados to the Dominican Republic",
      "Latin American food renaissance — Lima's ceviche, Mexico City's tacos, Buenos Aires' steak",
    ],
    destinationSlugs: ["new-york", "miami", "hawaii", "mexico-city", "rio-de-janeiro"],
    comingSoon: [
      { name: "Cartagena", country: "Colombia", tagline: "Colourful colonial streets, Caribbean coast, and coffee country day trips", emoji: "🌺" },
      { name: "Machu Picchu", country: "Peru", tagline: "The Incan citadel above the Sacred Valley — one of the world's great sights", emoji: "🏔️" },
      { name: "Buenos Aires", country: "Argentina", tagline: "Tango, steak, and the Paris of the Southern Hemisphere", emoji: "🥩" },
      { name: "Patagonia", country: "Chile / Argentina", tagline: "Torres del Paine, glaciers, and the end of the world", emoji: "🏔️" },
    ],
  },
  {
    slug: "middle-east-africa",
    name: "Middle East & Africa",
    shortName: "ME & Africa",
    tagline: "Ancient civilisations, safari landscapes, and the world's clearest turquoise waters",
    description:
      "The Middle East and Africa together hold some of the planet's most extraordinary experiences: the Serengeti Migration, the pyramids at Giza, the rock-hewn churches of Lalibela, the rose-red city of Petra, the white-sand overwater bungalows of the Maldives, and the spice markets of Marrakech. The region rewards travellers willing to step outside the comfort zone of the familiar — and the returns are unlike anywhere else.",
    heroGradient: "from-amber-900 via-orange-800 to-yellow-700",
    emoji: "🦁",
    highlights: [
      "The Serengeti Migration — 1.5 million wildebeest crossing the Mara River (July–October)",
      "Ancient Egypt — the Pyramids of Giza, Luxor's temples, and Nile river cruises",
      "The Maldives — the clearest water and most pristine coral reefs on earth",
      "Petra, Jordan — the Rose City carved into red sandstone cliffs by the Nabataeans",
      "Marrakech — souks, riads, and the Atlas Mountains one hour away",
    ],
    destinationSlugs: ["maldives", "dubai", "marrakech", "cape-town"],
    comingSoon: [
      { name: "Serengeti", country: "Tanzania", tagline: "The greatest wildlife show on earth — the Great Migration", emoji: "🦒" },
      { name: "Zanzibar", country: "Tanzania", tagline: "Spice island with white-sand beaches and Swahili stone town", emoji: "🌊" },
      { name: "Petra", country: "Jordan", tagline: "The rose-red city carved into sandstone cliffs by the Nabataeans", emoji: "🏛️" },
      { name: "Nairobi", country: "Kenya", tagline: "Safari gateway, world-class coffee, and tech hub of Africa", emoji: "☕" },
    ],
  },
  {
    slug: "oceania-pacific",
    name: "Oceania & Pacific",
    shortName: "Oceania",
    tagline: "Remote islands, ancient Māori culture, and the world's most extraordinary natural wonders",
    description:
      "Oceania stretches across the world's largest ocean, encompassing Australia's Great Barrier Reef and Red Centre, New Zealand's fjords and ski fields, and the remote paradise islands of French Polynesia, Fiji, and the Cook Islands. It is the region that most rewards the long-haul journey — the landscapes, wildlife, and cultures found here exist nowhere else on earth.",
    heroGradient: "from-teal-900 via-cyan-800 to-sky-700",
    emoji: "🌊",
    highlights: [
      "Bora Bora — the world's most perfect lagoon and overwater bungalow destination",
      "Queenstown — the global adventure capital with four-season appeal",
      "Great Barrier Reef — the largest coral reef system on earth, best dived from Cairns",
      "New Zealand's Fiordland — Milford Sound ranks among the world's ten great landscapes",
      "Hawaii — the most geologically active island chain, with active lava and world-class surf",
    ],
    destinationSlugs: ["bora-bora", "queenstown", "hawaii"],
    comingSoon: [
      { name: "Fiji", country: "Fiji", tagline: "600 islands of coral reef, overwater bures, and Fijian warmth", emoji: "🏝️" },
      { name: "Cook Islands", country: "Cook Islands", tagline: "Aitutaki's lagoon is arguably more beautiful than Bora Bora", emoji: "🪸" },
      { name: "Sydney", country: "Australia", tagline: "Opera House, Bondi Beach, and Harbour Bridge at sunset", emoji: "🦘" },
      { name: "Cairns", country: "Australia", tagline: "Gateway to the Great Barrier Reef and the Daintree Rainforest", emoji: "🐠" },
    ],
  },
];

export const regionMap: Record<string, Region> = Object.fromEntries(
  regionsData.map((r) => [r.slug, r])
);

export default regionsData;
