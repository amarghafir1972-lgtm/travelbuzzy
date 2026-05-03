export type Hotel = {
  id: string;
  name: string;
  tier: "budget" | "mid" | "luxury";
  badge?: string;
  pricePerNight: number;
  stars: number;
  reviewScore: number;
  reviewCount: number;
  highlights: string[];
  description: string;
  bookUrl: string;
};

export type DestinationSection = {
  heading: string;
  body: string;
  tips?: string[];
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  updated: string;
  metaDescription: string;

  quickFacts: {
    bestTime: string;
    currency: string;
    language: string;
    timezone: string;
    avgBudget: string;
    visaRequired: string;
    flightFrom: string;
  };

  intro: string;

  sections: DestinationSection[];

  hotels: Hotel[];

  relatedSlugs: string[];
};

const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Rice terraces, temples, and beach clubs",
    heroImage: "/images/bali.jpg",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Bali? Our 2025 guide covers the best hotels, when to visit, top things to do, and how to save money — written by people who have actually been.",

    quickFacts: {
      bestTime: "April – June, September – October",
      currency: "Indonesian Rupiah (IDR)",
      language: "Balinese, Indonesian",
      timezone: "WITA (UTC+8)",
      avgBudget: "$60–$300 per day",
      visaRequired: "Visa on Arrival (30 days, most nationalities)",
      flightFrom: "~15 hrs from London, ~18 hrs from New York",
    },

    intro: "Bali has been the world's most searched travel destination for years running — and for good reason. The Indonesian island packs volcanic mountains, ancient rice terraces, surf beaches, world-class restaurants, and some of the most creative hotels on the planet into a single compact destination. The challenge isn't finding things to do in Bali; it's choosing which version of Bali you want.",

    sections: [
      {
        heading: "Overview: Which part of Bali is right for you?",
        body: "Bali is best understood as several destinations in one. Ubud is the cultural heart — rice paddies, yoga retreats, and incredible food. Seminyak and Canggu attract the beach club and digital-nomad crowd. Nusa Dua is where the big resort complexes sit, perfect for families or anyone who wants an all-inclusive feel. Uluwatu is for serious surfers and clifftop sunset seekers. Choosing where to base yourself first shapes the whole trip.",
        tips: [
          "Stay at least 2 nights in Ubud even if you're a beach person — it's culturally unmissable",
          "Canggu has better coffee and restaurant variety than Seminyak for longer stays",
          "Avoid Kuta unless you're on a strict budget — Legian is a quieter, cheaper alternative nearby",
        ],
      },
      {
        heading: "When to visit Bali",
        body: "Bali has a dry season (April–October) and a wet season (November–March). The dry season is when you want to be there — lower humidity, reliable beach weather, and manageable crowds outside of July–August peak. April–June and September are the sweet spots: dry, warm, and quieter than school-holiday months. The wet season isn't a write-off — showers are usually afternoon-only, and prices drop significantly.",
        tips: [
          "July and August are the most expensive and crowded months — book 3–4 months ahead",
          "Nyepi (Balinese New Year, March) closes the island entirely — plan around it or embrace it",
          "Shoulder season (April–May) is the best value, with full dry-season weather",
        ],
      },
      {
        heading: "Getting around Bali",
        body: "Bali has no public transport worth relying on. Most travellers hire a driver for day trips ($30–50 for a full day, negotiated directly), use Grab or Gojek for short rides in towns, or rent a scooter (about $7/day) for maximum flexibility. The roads between Ubud and the south can be gridlocked around Kuta — budget extra time. Renting a car with a driver for airport transfers and inter-region days is the smoothest approach.",
      },
      {
        heading: "Where to eat in Bali",
        body: "The food scene in Ubud and Canggu rivals capital cities. Indonesian staples like nasi goreng, mie goreng, and babi guling are best tried at local warungs (family restaurants) for $2–4. The midrange scene has exploded — Locavore in Ubud is one of Southeast Asia's best restaurants. Beach clubs like Potato Head and Ku De Ta have made Seminyak a credible food destination. Budget travellers will eat very well on $10–15 per day.",
        tips: [
          "Babi guling (suckling pig) at Ibu Oka in Ubud is a rite of passage",
          "Most warungs don't accept cards — keep small IDR notes for local meals",
          "The smoothie bowl trend started here — Canggu's café scene is genuinely world-class",
        ],
      },
    ],

    hotels: [
      {
        id: "komaneka",
        name: "Komaneka at Bisma",
        tier: "luxury",
        badge: "Editor's Pick",
        pricePerNight: 145,
        stars: 5,
        reviewScore: 9.3,
        reviewCount: 908,
        description: "A jungle hideaway perched above the Campuhan Ridge in Ubud. Rice terrace views, a treetop infinity pool, and one of the island's best spa programmes.",
        highlights: ["Treetop infinity pool", "Rice terrace views", "Daily breakfast", "Shuttle to Ubud centre"],
        bookUrl: "#",
      },
      {
        id: "potato-head-suites",
        name: "Potato Head Suites & Studios",
        tier: "luxury",
        badge: "Best Design Hotel",
        pricePerNight: 195,
        stars: 5,
        reviewScore: 9.0,
        reviewCount: 542,
        description: "The coolest hotel in Seminyak, attached to the iconic beach club. Raw concrete, upcycled materials, and direct beach access in Seminyak's best location.",
        highlights: ["Beach club access", "Design-forward rooms", "3 pool areas", "Seminyak beach front"],
        bookUrl: "#",
      },
      {
        id: "alaya-ubud",
        name: "Alaya Resort Ubud",
        tier: "mid",
        pricePerNight: 85,
        stars: 4,
        reviewScore: 8.8,
        reviewCount: 1204,
        description: "Excellent value boutique resort in the heart of Ubud. Contemporary rooms, a good pool, and walking distance to the monkey forest and central market.",
        highlights: ["Central Ubud location", "Rooftop pool", "Free cooking class", "Breakfast included"],
        bookUrl: "#",
      },
      {
        id: "canggu-hostel",
        name: "The Farm Hostel Canggu",
        tier: "budget",
        pricePerNight: 22,
        stars: 3,
        reviewScore: 8.6,
        reviewCount: 3140,
        description: "The best social hostel in Canggu — pool, co-working space, and great breakfast. 10 minutes' walk to Echo Beach.",
        highlights: ["Pool & co-working", "Social vibe", "Near Echo Beach", "Free breakfast"],
        bookUrl: "#",
      },
    ],

    relatedSlugs: ["maldives", "santorini", "tokyo"],
  },

  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    tagline: "Caldera views, whitewashed villages, and Aegean sunsets",
    heroImage: "/images/santorini.jpg",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Santorini? Our 2025 guide covers the best hotels with caldera views, when to visit, where to eat, and how to avoid the tourist crowds.",

    quickFacts: {
      bestTime: "May – June, September – October",
      currency: "Euro (EUR)",
      language: "Greek",
      timezone: "EET (UTC+3 summer)",
      avgBudget: "$150–$500 per day",
      visaRequired: "Schengen (90-day visa-free for most)",
      flightFrom: "~3.5 hrs from London, ~11 hrs from New York",
    },

    intro: "Santorini is one of the most photographed places on earth — and it lives up to the pictures. The crescent-shaped caldera, created by one of history's largest volcanic eruptions, is genuinely jaw-dropping from any vantage point. The catch: it's expensive, popular, and best understood as a place for a short, well-planned stay rather than a backpacker's beach holiday.",

    sections: [
      {
        heading: "Oia vs Fira: Which village should you stay in?",
        body: "Oia is the famous village — the blue domes, the narrow alleyways, the sunset crowds. It's quieter, more upscale, and home to the best hotels on the island. Fira is the main town: more restaurants, more nightlife, more affordable. Pyrgos is a third option if you want to escape the tourist trail entirely — medieval, quiet, and 10 minutes from everywhere by car. For a caldera-view hotel, you have to stay in Oia or Fira.",
        tips: [
          "Sunset in Oia is packed — arrive 2 hours early or watch from Imerovigli for a similar view with fewer people",
          "Fira is better for budget travellers — Oia hotels command a significant premium for the view",
          "Rent an ATV for a day to reach the less-visited beaches on the east coast",
        ],
      },
      {
        heading: "When to visit Santorini",
        body: "The peak season runs July–August and is genuinely overwhelming: cruise ships dock daily, the narrow paths of Oia become shoulder-to-shoulder, and hotels charge their highest rates. May, June, and September are objectively better months — still warm, beautiful, but noticeably calmer and 30–40% cheaper. October is the last reliable warm month and increasingly popular. Winter (November–April) sees most businesses close.",
        tips: [
          "Book hotels 6+ months ahead for July–August — the best caldera-view rooms sell out by February",
          "May is ideal: fewer tourists, wildflowers everywhere, sea warm enough to swim",
          "Shoulder season deals can cut hotel costs in half compared to August",
        ],
      },
      {
        heading: "Getting around Santorini",
        body: "Santorini is small — the whole island is about 30km from end to end. The public bus (KTEL) is cheap and connects Fira to Oia, Perissa, and Kamari. Taxis are expensive and scarce in peak season. Renting an ATV ($25–35/day) or car ($40–60/day) gives the most freedom and is how locals navigate. Donkeys are still used on the famous steps from Fira to the old port — tourists are allowed to ride them, though it's discouraged by animal welfare groups.",
      },
      {
        heading: "Food and drink in Santorini",
        body: "Santorini's volcanic soil produces distinctive local products: the island's cherry tomatoes are world-famous, the white eggplant is unlike anything grown elsewhere, and the assyrtiko white wine is genuinely one of Greece's best varieties. Splurging at a caldera-view restaurant once is worth it for the experience. For everyday eating, the village squares away from the main tourist drag serve much better food at half the price.",
        tips: [
          "Tomatokeftedes (tomato fritters) are the must-try local dish — every taverna does them differently",
          "Santo Wines winery has one of the best caldera views on the island and a free tasting",
          "Avoid restaurants right on the caldera edge in Oia — you're paying for the view, not the food",
        ],
      },
    ],

    hotels: [
      {
        id: "canaves-oia",
        name: "Canaves Oia Suites",
        tier: "luxury",
        badge: "Best View",
        pricePerNight: 299,
        stars: 5,
        reviewScore: 9.2,
        reviewCount: 674,
        description: "The benchmark caldera-view property in Oia. Cave-style suites carved into the cliff face, infinity pool, private terraces, and the island's best breakfast.",
        highlights: ["Caldera infinity pool", "Private terrace", "Breakfast included", "Cave-style suites"],
        bookUrl: "#",
      },
      {
        id: "andronis-luxury",
        name: "Andronis Luxury Suites",
        tier: "luxury",
        badge: "Editor's Pick",
        pricePerNight: 380,
        stars: 5,
        reviewScore: 9.4,
        reviewCount: 318,
        description: "Ultra-luxe suites in Oia with private plunge pools, butler service, and arguably the most dramatic sunset views on the island.",
        highlights: ["Private plunge pool", "Butler service", "Sunset views", "Adults only"],
        bookUrl: "#",
      },
      {
        id: "aressana-fira",
        name: "Aressana Spa Hotel & Suites",
        tier: "mid",
        pricePerNight: 145,
        stars: 4,
        reviewScore: 8.7,
        reviewCount: 1890,
        description: "Well-priced Fira hotel with caldera views, a full spa, and pool. Better value than anything comparable in Oia, with a 15-minute walk to the main sights.",
        highlights: ["Caldera views", "Full spa", "Pool", "Central Fira"],
        bookUrl: "#",
      },
      {
        id: "villa-roussa",
        name: "Villa Roussa",
        tier: "budget",
        pricePerNight: 72,
        stars: 3,
        reviewScore: 8.5,
        reviewCount: 920,
        description: "One of the best budget options in Santorini. Clean, simple rooms in Fira with a small pool, 5 minutes' walk from the caldera edge.",
        highlights: ["Small pool", "Fira location", "Free breakfast", "Family-run"],
        bookUrl: "#",
      },
    ],

    relatedSlugs: ["paris", "bali", "maldives"],
  },

  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    tagline: "Neon skylines, ancient shrines, and the world's best food city",
    heroImage: "/images/tokyo.jpg",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Tokyo? Our 2025 guide covers the best neighbourhoods to stay in, when to visit, what to eat, and how to navigate the city like a local.",

    quickFacts: {
      bestTime: "March – May (cherry blossom), October – November",
      currency: "Japanese Yen (JPY)",
      language: "Japanese",
      timezone: "JST (UTC+9)",
      avgBudget: "$80–$300 per day",
      visaRequired: "Visa-free (90 days, most Western nationalities)",
      flightFrom: "~12 hrs from London, ~14 hrs from New York",
    },

    intro: "Tokyo is the most complex city in the world to visit, and also one of the most rewarding. It has more Michelin stars than any other city on earth, a train system so reliable it's measured in seconds, and enough neighbourhoods — each with a distinct identity — to fill a month of exploration. The good news: it's also one of the safest, cleanest, and most foreigner-friendly cities on the planet once you get past the language barrier.",

    sections: [
      {
        heading: "Which neighbourhood should you stay in?",
        body: "Tokyo's scale is intimidating but its transport network means the neighbourhood you choose matters less than in most cities. Shinjuku is the easiest for first-timers — central, enormous, and with the best transport connections. Shibuya suits people who want to be in the thick of modern Tokyo. Asakusa is the historic neighbourhood, excellent for culture and with more affordable hotels. Harajuku and Omotesando are the fashion and architecture quarters. Ginza is expensive and business-focused.",
        tips: [
          "Get a Suica or IC card at the airport — it works on virtually every train, bus, and many vending machines",
          "Google Maps gives accurate transit directions in English — download offline maps before you go",
          "Shinjuku has two very different sides: the east exit (entertainment, Kabukicho) and west exit (skyscrapers, quieter hotels)",
        ],
      },
      {
        heading: "When to visit Tokyo",
        body: "Cherry blossom season (late March – early April) is the most famous time to visit Tokyo — and for good reason. The parks transform completely. Book 6+ months ahead. Autumn foliage (October–November) is equally beautiful, less overcrowded, and often overlooked by Western tourists. July–August is hot, humid, and packed with domestic tourists. Winter (December–February) has crisp air, no crowds, and some of the year's lowest hotel prices.",
        tips: [
          "Cherry blossom timing shifts by a week year to year — follow Japan Meteorological Corporation forecasts",
          "Golden Week (late April to early May) is Japan's busiest holiday week — avoid or book very early",
          "November is arguably the best all-round month: mild weather, autumn leaves, manageable crowds",
        ],
      },
      {
        heading: "Getting around Tokyo",
        body: "Tokyo's train network is extensive and intimidating on a map but extremely easy in practice. The JR Yamanote Line loops around the main districts. The Tokyo Metro covers everything in between. An IC card (Suica or Pasmo) handles all of it with a tap. Taxis exist but are expensive — only use them after midnight when trains stop. Cycling is increasingly viable in some neighbourhoods. A 7-day unlimited subway pass is good value for heavy users.",
      },
      {
        heading: "Where to eat in Tokyo",
        body: "Tokyo has more restaurants per capita than any other city. The benchmark is consistently high — even a convenience store onigiri from 7-Eleven beats many restaurants elsewhere. For a structured approach: sushi breakfast at Tsukiji Outer Market, ramen lunch in a standing noodle bar, tempura dinner in Asakusa, izakaya drinks in Shinjuku. One Michelin-starred meal is achievable at $50–80 per person at lunch. Budget travellers eat extraordinarily well on $15–20 per day.",
        tips: [
          "Lunch at Michelin-starred restaurants is often 60–70% cheaper than the same restaurant at dinner",
          "Depachika (department store basement food halls) are the best single food destination in any neighbourhood",
          "Most ramen shops and sushi counters only accept cash — carry yen at all times",
        ],
      },
    ],

    hotels: [
      {
        id: "andaz-tokyo",
        name: "Andaz Tokyo Toranomon Hills",
        tier: "luxury",
        badge: "Editor's Pick",
        pricePerNight: 198,
        stars: 5,
        reviewScore: 9.1,
        reviewCount: 2310,
        description: "Tokyo's most architecturally interesting luxury hotel, occupying floors 47–52 of Toranomon Hills tower. Rooftop infinity pool, panoramic city views, free minibar.",
        highlights: ["47th-floor pool", "Free minibar", "City panorama", "6 restaurants"],
        bookUrl: "#",
      },
      {
        id: "park-hyatt-tokyo",
        name: "Park Hyatt Tokyo",
        tier: "luxury",
        badge: "Lost in Translation Hotel",
        pricePerNight: 290,
        stars: 5,
        reviewScore: 9.3,
        reviewCount: 1840,
        description: "The famous hotel from Lost in Translation, still delivering one of the most atmospheric Tokyo experiences available. Floors 39–52, sky-high pool, extraordinary service.",
        highlights: ["Rooftop pool", "New York Bar", "40th-floor rooms", "Iconic status"],
        bookUrl: "#",
      },
      {
        id: "via-inn-asakusa",
        name: "Via Inn Asakusa",
        tier: "mid",
        pricePerNight: 68,
        stars: 3,
        reviewScore: 8.8,
        reviewCount: 3420,
        description: "Reliable and well-priced business hotel in the historic Asakusa district. Clean, compact rooms, excellent transit connections, and next to the Sensoji temple complex.",
        highlights: ["Asakusa location", "Near Sensoji", "Great transit links", "Free WiFi"],
        bookUrl: "#",
      },
      {
        id: "khaosan-tokyo",
        name: "Khaosan Tokyo Ninja",
        tier: "budget",
        pricePerNight: 28,
        stars: 2,
        reviewScore: 8.5,
        reviewCount: 2100,
        description: "The most characterful budget stay in Tokyo — ninja-themed capsule beds, social common areas, and a great Asakusa location at a price that lets you spend your money on food.",
        highlights: ["Ninja theme", "Capsule beds", "Social lounge", "Asakusa"],
        bookUrl: "#",
      },
    ],

    relatedSlugs: ["bali", "santorini", "maldives"],
  },

  {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    tagline: "Overwater bungalows and the clearest water on earth",
    heroImage: "/images/maldives.jpg",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to the Maldives? Our honest guide covers overwater vs beach villas, budget vs luxury resorts, which atolls to choose, and how to save money on your trip.",

    quickFacts: {
      bestTime: "November – April (dry season)",
      currency: "Maldivian Rufiyaa (MVR) / USD accepted everywhere",
      language: "Dhivehi, English widely spoken",
      timezone: "MVT (UTC+5)",
      avgBudget: "$300–$1,500+ per day",
      visaRequired: "Visa on Arrival (30 days, free)",
      flightFrom: "~10 hrs from London, ~20 hrs from New York",
    },

    intro: "The Maldives is the most successful single-image destination in the world: overwater bungalow, turquoise lagoon, sunrise. The reality is more varied — and more accessible — than most people think. Yes, luxury resorts charge $800+ per night. But there's also a thriving local island scene with guesthouses under $100, and mid-range resorts have proliferated since the government opened ownership to international operators.",

    sections: [
      {
        heading: "Overwater villas vs beach villas: which is worth it?",
        body: "Overwater bungalows are the iconic Maldives image, but they're not always the better option. They're more expensive, more exposed to wind, and offer less privacy on some resorts. Beach villas often have better direct snorkelling, more space, and garden privacy. The sweet spot is a water bungalow with direct lagoon steps — you get the overwater experience with direct water access. Sunrise-facing overwater rooms are slightly cheaper than sunset-facing ones at most resorts.",
        tips: [
          "Ask specifically which overwater rooms have the clearest reef below — many don't",
          "Beach villas at the right resort often have better snorkelling than the overwater options",
          "Sunrise-facing rooms are 15–20% cheaper at most resorts for the same room category",
        ],
      },
      {
        heading: "Choosing the right resort vs local island",
        body: "The Maldives has two very distinct travel modes. Resort islands are private — one resort per island, no public access, everything handled for you, everything charged to your room. Local islands (Maafushi, Dhigurah, Thulusdhoo) are inhabited Maldivian communities with guesthouses, local restaurants, and alcohol-free public beaches. The local island experience is 60–80% cheaper, culturally richer, and increasingly well-set-up for travellers. Many people combine both: a few nights on a local island, then splurge on a resort.",
        tips: [
          "Maafushi is the best-developed local island for tourism — good snorkelling, multiple guesthouses, day trip options",
          "Combine local island nights with a liveaboard diving trip for the best budget Maldives experience",
          "Most resorts require a seaplane transfer ($300–500 return) — factor this into your total cost",
        ],
      },
      {
        heading: "When to visit the Maldives",
        body: "The dry season (November–April) is when you want to be there: calm seas, clear visibility for snorkelling and diving, minimal rain, lower humidity. December and January are the peak months — prices are highest and availability tightest. The wet season (May–October) brings rain, rougher seas, and discounts of 30–50% at most resorts. Diving is often better in the wet season due to different current patterns bringing whale sharks and manta rays.",
        tips: [
          "November is the best month: dry season starts, prices haven't peaked yet",
          "Whale sharks are most reliably seen May–November around South Ari Atoll",
          "If diving is your priority, the wet season is often better — but check with your specific resort",
        ],
      },
      {
        heading: "Getting around the Maldives",
        body: "Getting between Male (the capital) and your resort is the most important logistical question in Maldives trip planning. Speedboat transfers reach atolls within 30–60 minutes of Male and cost $30–80 return per person. Seaplane transfers reach the outer atolls and cost $300–500 return per person — they're included at some ultra-luxury resorts. Domestic flights serve the furthest atolls. Build transfer costs into your budget from the start.",
      },
    ],

    hotels: [
      {
        id: "anantara-veli",
        name: "Anantara Veli Resort",
        tier: "luxury",
        badge: "Editor's Pick",
        pricePerNight: 389,
        stars: 5,
        reviewScore: 9.4,
        reviewCount: 1842,
        description: "Adults-only overwater resort with direct lagoon access, a house reef ideal for snorkelling, and optional all-inclusive. Speedboat transfer from Male.",
        highlights: ["Overwater bungalow", "House reef", "Adults-only", "All-inclusive option"],
        bookUrl: "#",
      },
      {
        id: "six-senses-laamu",
        name: "Six Senses Laamu",
        tier: "luxury",
        badge: "Best Sustainability",
        pricePerNight: 620,
        stars: 5,
        reviewScore: 9.5,
        reviewCount: 712,
        description: "The only resort in the pristine Laamu atoll — 97 villas on stilts above a lagoon with some of the most untouched reef in the Maldives. Solar powered, plastic-free.",
        highlights: ["Laamu Atoll exclusivity", "Solar powered", "Best reef snorkelling", "Zero plastic policy"],
        bookUrl: "#",
      },
      {
        id: "meeru-resort",
        name: "Meeru Maldives Resort Island",
        tier: "mid",
        pricePerNight: 195,
        stars: 4,
        reviewScore: 8.6,
        reviewCount: 3140,
        description: "The best value full-resort experience in the Maldives. One of the largest islands, with a dive centre, 30+ water sports, multiple pools, and an excellent house reef.",
        highlights: ["Large island", "Full dive centre", "30+ water sports", "All-inclusive option"],
        bookUrl: "#",
      },
      {
        id: "maafushi-inn",
        name: "Summer View Guesthouse, Maafushi",
        tier: "budget",
        pricePerNight: 65,
        stars: 3,
        reviewScore: 8.4,
        reviewCount: 580,
        description: "The most popular guesthouse on Maafushi local island. Clean rooms, rooftop terrace, snorkel hire, and access to the best local island experience in the Maldives.",
        highlights: ["Local island", "Rooftop terrace", "Snorkel hire", "Day trips from $25"],
        bookUrl: "#",
      },
    ],

    relatedSlugs: ["bali", "santorini", "tokyo"],
  },

  {
    slug: "paris",
    name: "Paris",
    country: "France",
    tagline: "Art, gastronomy, and the art of doing nothing particularly well",
    heroImage: "/images/paris.jpg",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Paris? Our guide covers the best neighbourhoods to stay in, which arrondissements to avoid as a tourist, where to eat well for any budget, and our hotel picks.",

    quickFacts: {
      bestTime: "April – June, September – October",
      currency: "Euro (EUR)",
      language: "French (English widely spoken in tourist areas)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$150–$400 per day",
      visaRequired: "Schengen (visa-free 90 days for most nationalities)",
      flightFrom: "~1.5 hrs from London, ~7 hrs from New York",
    },

    intro: "Paris is the most visited city in the world. It's also one of the most misunderstood — the version most tourists experience (Eiffel Tower queue, tourist-trap café near the Louvre, overpriced hotel in the 1st arrondissement) is a pale shadow of what the city actually is. The real Paris is a city of neighbourhoods, each with its own cafés, markets, and rhythms, and the best version of a Paris trip is one that treats the postcard sights as context rather than the whole story.",

    sections: [
      {
        heading: "Which arrondissement should you stay in?",
        body: "Paris has 20 arrondissements arranged in a clockwise snail pattern from the centre. The 1st–4th are central and convenient but expensive — the 3rd (Le Marais) is the best of these, with excellent restaurants, gay-friendly, and architecturally beautiful. The 6th (Saint-Germain-des-Prés) has the famous literary café culture and is walkable to most major sights. The 9th and 10th are the best value for central stays — gentrified but not overcrowded, excellent restaurants per square metre. Montmartre (18th) is charming but hilly and further from the centre than it looks.",
        tips: [
          "Avoid the 8th unless you have a specific reason — it's expensive, corporate, and lacks neighbourhood character",
          "The 11th is becoming one of Paris's best neighbourhoods for food and bars without the tourist mark-up",
          "Book hotels with a direct view of a Haussmann courtyard — the noise situation changes everything",
        ],
      },
      {
        heading: "When to visit Paris",
        body: "Paris is a genuinely year-round destination. Spring (April–June) is the classic choice: mild weather, chestnut trees in bloom, café terraces at their best. September–October is arguably better: the tourists of summer have left, fashion week brings energy, and the light is remarkable. July–August sees many Parisians leave the city themselves — the city slows down pleasantly, but some restaurants and shops close. December is beautiful with Christmas markets and lights, but cold.",
        tips: [
          "Late September and October are the best months most people don't know about",
          "Paris in July is surprisingly calm — locals leave, prices drop, queues shorten",
          "Bastille Day (July 14) has the best fireworks in Europe — worth planning a Paris trip around",
        ],
      },
      {
        heading: "Getting around Paris",
        body: "Paris has one of the world's best metro systems — 16 lines, every 2–3 minutes in peak hours, covering everything within the périphérique. A Navigo Découverte weekly pass ($25–30) covers unlimited metro, RER, and bus travel — worth it from day 3 onwards. Walking is viable between most tourist areas. The Vélib' bike-share system is excellent for daytime use. Taxis and Uber are available but the metro is almost always faster.",
      },
      {
        heading: "Where to eat in Paris",
        body: "Eating well in Paris requires ignoring every restaurant with an English menu displayed outside and a photo menu. The best food is in neighbourhood bistros where a $16–20 set lunch includes starter, main, and a glass of wine. For market shopping, the Marché d'Aligre in the 12th and Marché Bastille are the best. Boulangerie quality is universally high — eat a croissant at the counter of any local bakery at 8am. For splurging, the $49 lunch menus at one- and two-star Michelin restaurants are genuinely extraordinary value.",
        tips: [
          "Never eat at a restaurant displaying English translations of dish names — find one with a handwritten menu",
          "A carafe d'eau (tap water) is always free and perfectly safe to drink",
          "The best croissant in the city changes every year — current consensus is at Du Pain et des Idées in the 10th",
        ],
      },
    ],

    hotels: [
      {
        id: "grands-boulevards",
        name: "Hôtel des Grands Boulevards",
        tier: "luxury",
        badge: "Editor's Pick",
        pricePerNight: 189,
        stars: 4,
        reviewScore: 8.9,
        reviewCount: 1120,
        description: "A Soho House-era boutique hotel in the 2nd arrondissement. Rooftop bar, garden courtyard, excellent brasserie, walking distance from Le Marais and the Centre Pompidou.",
        highlights: ["Rooftop bar", "Garden courtyard", "Brasserie on-site", "Near Le Marais"],
        bookUrl: "#",
      },
      {
        id: "le-roch",
        name: "Le Roch Hotel & Spa",
        tier: "luxury",
        badge: "Best Spa",
        pricePerNight: 245,
        stars: 5,
        reviewScore: 9.1,
        reviewCount: 680,
        description: "Intimate 37-room hotel near the Tuileries Garden. All-white interiors, a full underground spa, and an extraordinary breakfast buffet — one of Paris's best small hotels.",
        highlights: ["Underground spa", "Near Tuileries", "37 rooms only", "Best breakfast"],
        bookUrl: "#",
      },
      {
        id: "hotel-amour",
        name: "Hôtel Amour",
        tier: "mid",
        pricePerNight: 135,
        stars: 4,
        reviewScore: 8.6,
        reviewCount: 2240,
        description: "The original artsy Paris boutique hotel in Pigalle. Each room decorated by a different artist, excellent garden restaurant, and great access to the 9th's café scene.",
        highlights: ["Artist-designed rooms", "Garden restaurant", "Pigalle location", "Neighbourhood feel"],
        bookUrl: "#",
      },
      {
        id: "generator-paris",
        name: "Generator Paris",
        tier: "budget",
        pricePerNight: 35,
        stars: 3,
        reviewScore: 8.3,
        reviewCount: 4100,
        description: "The best design hostel in Paris, near Canal Saint-Martin in the 10th. Rooftop bar, strong social scene, private rooms available, and excellent value for the location.",
        highlights: ["Rooftop bar", "Canal Saint-Martin", "Private rooms", "Strong social scene"],
        bookUrl: "#",
      },
    ],

    relatedSlugs: ["santorini", "bali", "maldives"],
  },

  {
    slug: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    tagline: "Street food, golden temples, and electrifying nightlife",
    heroImage: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Bangkok? Our 2025 guide covers the best neighbourhoods, street food, temples, when to visit, and our top hotel picks for every budget.",
    quickFacts: {
      bestTime: "November – February (cool season)",
      currency: "Thai Baht (THB)",
      language: "Thai (English spoken in tourist areas)",
      timezone: "ICT (UTC+7)",
      avgBudget: "$40–$200 per day",
      visaRequired: "Visa-free 30 days (most nationalities) or e-Visa",
      flightFrom: "~11 hrs from London, ~18 hrs from New York",
    },
    intro: "Bangkok is one of the most visited cities in the world — and one of the most misunderstood. It's not just a transit hub or a gateway to the islands: the Thai capital is a world-class city in its own right, with the finest street food scene in Southeast Asia, a rooftop bar for every taste, ancient royal temples, and a nocturnal energy that doesn't quit until well past dawn. Get past the tourist-trap areas around Khao San Road and you'll find a city of extraordinary depth.",
    sections: [
      {
        heading: "Bangkok's best neighbourhoods",
        body: "Sukhumvit is the expat and tourist hub — enormous, walkable via BTS Skytrain, and full of international restaurants and rooftop bars. Silom/Sathorn is Bangkok's financial district with excellent dining. The Old Town (Rattanakosin) clusters the main temples and palaces. Ari and Thonglor are where Bangkok's creative class eats and drinks — local-feeling, design-forward, and increasingly excellent. Banglamphu (near Khao San Road) is budget central.",
        tips: [
          "Stay along the BTS Skytrain or MRT lines — heat and traffic make walking between areas painful",
          "Thonglor (Sukhumvit Soi 55) has the best concentration of high-end Thai restaurants",
          "The Chaophraya River ferry (Chao Phraya Express) is a cheap, cool way to see the city",
        ],
      },
      {
        heading: "When to visit Bangkok",
        body: "Bangkok has three seasons: cool (November–February), hot (March–May), and wet (June–October). The cool season is when you want to be there — 28–32°C with manageable humidity, clear skies, and the city at its most liveable. March–May is brutal — 38–40°C and intensely humid. The wet season brings afternoon downpours but the city stays functional and prices drop significantly. Songkran (Thai New Year, mid-April) is a city-wide water fight worth experiencing despite the heat.",
        tips: [
          "November and December are peak season — book ahead, especially for the good hotels",
          "Songkran (13–15 April) is chaotic and joyful — expect to get drenched citywide",
          "The wet season (June–October) cuts prices by 30–40% — afternoon showers rarely last more than 2 hours",
        ],
      },
      {
        heading: "Getting around Bangkok",
        body: "The BTS Skytrain and MRT Metro are the backbone of sensible Bangkok travel — air-conditioned, reliable, and covering most tourist areas. Outside the rail network, Grab (the regional Uber) is cheap, safe, and air-conditioned. Tuk-tuks are a fun experience for short tourist rides but agree the price first. The Chao Phraya Express Boat is a scenic and cheap river taxi. Avoid metered taxis in heavy traffic — the BTS almost always wins.",
      },
      {
        heading: "Where to eat in Bangkok",
        body: "Bangkok may be the greatest street food city on earth. The classics — pad Thai, khao man gai, boat noodles, som tam, mango sticky rice — are best eaten at the stalls that have been doing one thing for 20+ years. The Michelin-starred scene is world-class and affordable by Western standards: Gaggan Anand has repeatedly topped Asia's 50 Best. Night markets (Chatuchak, Rod Fai Ratchada, Or Tor Kor for fresh produce) are the best single-venue food experiences. Budget travellers eat extraordinarily well on $10–15/day.",
        tips: [
          "Pad Thai on Khao San Road is a tourist trap — eat it at Thip Samai near Golden Mount instead",
          "Or Tor Kor Market is the finest food market in Bangkok — upscale, clean, and extraordinary",
          "Eating from street stalls with long local queues is always the right call",
        ],
      },
    ],
    hotels: [
      { id: "capella-bangkok", name: "Capella Bangkok", tier: "luxury", badge: "Editor's Pick", pricePerNight: 320, stars: 5, reviewScore: 9.6, reviewCount: 820, description: "The finest hotel on the Chao Phraya River. Two restored colonial-era buildings, riverfront infinity pool, and possibly the best service in Southeast Asia.", highlights: ["Riverfront infinity pool", "Colonial architecture", "River views", "World-class spa"], bookUrl: "#" },
      { id: "rosewood-bangkok", name: "Rosewood Bangkok", tier: "luxury", badge: "Best Design", pricePerNight: 265, stars: 5, reviewScore: 9.4, reviewCount: 640, description: "A soaring tower in Ploenchit with some of the most striking interiors in Bangkok. Thai botanical art, exceptional F&B, and a sky-high pool.", highlights: ["Sky-high pool", "Ploenchit location", "Thai botanical interiors", "Michelin-starred dining"], bookUrl: "#" },
      { id: "mode-sathorn", name: "Mode Sathorn Hotel", tier: "mid", pricePerNight: 65, stars: 4, reviewScore: 8.7, reviewCount: 2100, description: "Stylish mid-range hotel in the Silom/Sathorn district. Great value, rooftop pool, walking distance to BTS, excellent breakfast.", highlights: ["Rooftop pool", "BTS access", "Good breakfast", "Silom location"], bookUrl: "#" },
      { id: "nap-krungthep", name: "Nap Krung Thep Hostel", tier: "budget", pricePerNight: 18, stars: 2, reviewScore: 8.5, reviewCount: 3400, description: "Social hostel near the Silom BTS stop. Clean, social, great rooftop, and a perfect location for exploring the city without breaking the bank.", highlights: ["Rooftop terrace", "Silom BTS access", "Social vibe", "Walking tours"], bookUrl: "#" },
    ],
    relatedSlugs: ["bali", "phuket", "hanoi"],
  },

  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Spain",
    tagline: "Gaudí, tapas, and the Mediterranean at its liveliest",
    heroImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Barcelona? Our guide covers Gaudí's architecture, the best tapas bars, when to go, neighbourhoods to stay in, and honest hotel picks.",
    quickFacts: {
      bestTime: "May – June, September – October",
      currency: "Euro (EUR)",
      language: "Catalan, Spanish (English widely spoken)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$100–$300 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~2 hrs from London, ~8 hrs from New York",
    },
    intro: "Barcelona is the most architecturally interesting city in Europe — possibly the world. The work of Antoni Gaudí alone would justify a visit: the Sagrada Família is the most visited building in Spain and still unfinished after 140 years. Beyond the architecture, the city has some of Europe's best beaches, a food scene running from $3 tapas to three-star Michelin, and the peculiar energy of a city that considers itself a nation (Catalonia) within a nation. It runs on its own clock — dinner starts at 9pm at the earliest.",
    sections: [
      {
        heading: "Which neighbourhood should you stay in?",
        body: "The Gothic Quarter (Barri Gòtic) is the most central and historic — atmospheric medieval streets, but very touristy and expensive. El Born/Sant Pere is adjacent and better: excellent restaurants, local feel, more affordable. Eixample is Barcelona's Modernista grid neighbourhood — wide streets, the best restaurants, and the most convenient for Gaudí sights. Gràcia is a village-within-the-city, great for longer stays. Barceloneta is the beach neighbourhood — loud, fun, and popular with younger travellers. Avoid staying on Las Ramblas — it's a tourist trap with pickpocket problems.",
        tips: [
          "El Born is consistently the best balance of character, food, and access for first-timers",
          "Eixample is best for serious food lovers and repeat visitors who want to cook and eat like a local",
          "Las Ramblas looks impressive but all the best bars and restaurants are in the side streets off it",
        ],
      },
      {
        heading: "When to visit Barcelona",
        body: "May–June and September–October are peak-shoulder months: warm (22–27°C), Mediterranean seas swimmable, and crowds below the July–August peak. July and August are hot (30–35°C), packed with international tourists, and expensive. Winter (November–February) is mild (12–15°C), uncrowded, and very affordable — the city is fully open and the food scene is at its local best. Easter week (Semana Santa) sees prices spike briefly.",
        tips: [
          "September is often the best month — hot enough to swim, post-tourist-season prices, harvest season food",
          "Booking Sagrada Família is mandatory regardless of when you visit — walk-ups are nearly impossible",
          "Catalan holidays (Diada, 11 Sept; Sant Joan, 23 June) add great local atmosphere to any trip",
        ],
      },
      {
        heading: "Getting around Barcelona",
        body: "Barcelona's metro is excellent — 12 lines covering the entire city. A T-Casual 10-trip card saves money over single tickets. The city is also very walkable between Gothic Quarter, El Born, and Barceloneta. Cycling is good along the seafront and in Eixample. Avoid taxis for short inner-city trips — the metro is almost always faster. The Aerobus runs from both airport terminals to Plaça Catalunya in 35 minutes for $7.",
      },
      {
        heading: "Where to eat in Barcelona",
        body: "Barcelona's food scene spans everything from the world's best seafood paella to experimental Catalan cuisine. La Boqueria market is best for a quick morning feed (locals use it at 8am, tourists jam it by 11am). The best tapas are in El Born and Eixample — patatas bravas, pan con tomate, croquetas, and jamón ibérico. Brunch doesn't exist — locals eat a coffee and croissant at 9am, big lunch at 2pm, and dinner at 9:30pm. Match their schedule for the best tables.",
        tips: [
          "La Boqueria is great at 8–9am — avoid it from 11am onwards when it becomes a tourist scrum",
          "For the best paella, go to Barceloneta on a Sunday — but avoid the seafront tourist traps",
          "Vermouth hour (La Hora del Vermut) at 1pm Saturday in any bar in El Born is non-negotiable",
        ],
      },
    ],
    hotels: [
      { id: "hotel-arts", name: "Hotel Arts Barcelona", tier: "luxury", badge: "Best View", pricePerNight: 350, stars: 5, reviewScore: 9.2, reviewCount: 1820, description: "The definitive luxury address in Barcelona — a 44-storey tower overlooking the Olympic port, beach, and city. Two pools, Frank Gehry's fish sculpture at your door.", highlights: ["Beachfront location", "Two pools", "Sky Bar", "Olympic Port views"], bookUrl: "#" },
      { id: "mandarin-barcelona", name: "Mandarin Oriental Barcelona", tier: "luxury", badge: "Editor's Pick", pricePerNight: 420, stars: 5, reviewScore: 9.5, reviewCount: 980, description: "The best luxury hotel on Passeig de Gràcia — rooftop pool with city panorama, world-class spa, and the finest location for Gaudí architecture.", highlights: ["Rooftop pool", "Passeig de Gràcia", "City panorama", "Spa"], bookUrl: "#" },
      { id: "hotel-brummell", name: "Hotel Brummell", tier: "mid", pricePerNight: 110, stars: 4, reviewScore: 9.0, reviewCount: 1340, description: "Boutique design hotel in the bohemian Poble Sec neighbourhood, near Montjuïc. Pool, yoga, great breakfast, and a local neighbourhood feel.", highlights: ["Rooftop pool", "Poble Sec location", "Yoga classes", "Design-forward"], bookUrl: "#" },
      { id: "st-christophers-barcelona", name: "St Christopher's Inn Barcelona", tier: "budget", pricePerNight: 25, stars: 2, reviewScore: 8.4, reviewCount: 2800, description: "Europe's best-known hostel chain. Gothic Quarter location, bar downstairs, social scene, private rooms available.", highlights: ["Gothic Quarter", "Bar on-site", "Private rooms", "Social scene"], bookUrl: "#" },
    ],
    relatedSlugs: ["ibiza", "paris", "rome"],
  },

  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    tagline: "Desert skyline, world records, and tax-free luxury",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Dubai? Our guide covers when to visit, the best hotels, desert safaris, skyline experiences, and how to navigate the city's extremes.",
    quickFacts: {
      bestTime: "November – March (cool season)",
      currency: "UAE Dirham (AED)",
      language: "Arabic (English almost universally spoken)",
      timezone: "GST (UTC+4)",
      avgBudget: "$150–$600 per day",
      visaRequired: "Visa on Arrival or e-Visa (60–90 days, most nationalities)",
      flightFrom: "~7 hrs from London, ~12 hrs from New York",
    },
    intro: "Dubai is the most ambitious city-building project in human history — a desert fishing village that transformed into a global metropolis of 3.5 million people in under 70 years. It holds more world records than any other city: tallest building (Burj Khalifa at 828m), largest mall, busiest airport, longest automated metro. The result is a city of jaw-dropping spectacle, ultra-luxury hotels, and a complex cultural layering of Emirati tradition, South Asian labour, and Western expat life. It's worth understanding before you arrive.",
    sections: [
      {
        heading: "Dubai's key areas: where to base yourself",
        body: "Downtown Dubai is ground zero — Burj Khalifa, Dubai Mall, and the Dubai Fountain are all here. Jumeirah Beach Residence (JBR) is where the beach and marina hotels cluster, with a liveable outdoor strip of restaurants. Palm Jumeirah is for the big-name ultra-luxury resort stays. Deira and Bur Dubai are the older, more characterful parts of the city — excellent traditional souks and far cheaper hotels. Dubai Creek (Old Town) gives a genuine sense of what Dubai looked like before the towers came.",
        tips: [
          "Book Burj Khalifa 'At the Top' observation deck at least a week ahead — it sells out constantly",
          "The metro's Red Line connects the airport, Downtown, and JBR — use it to avoid taxi traffic",
          "Friday and Saturday are the UAE weekend — museums and malls are packed, Sunday morning is quiet",
        ],
      },
      {
        heading: "When to visit Dubai",
        body: "November–March is the only sensible window for most visitors: temperatures of 22–28°C, low humidity, and comfortable for outdoor activity. April and October are transition months — warm but manageable. May–September is brutal: 40–48°C with high humidity, outdoor activity is genuinely dangerous, and the city moves entirely indoors. If you go in summer, hotel prices fall by 60–70% and indoor attractions (malls, aquariums, ski slopes) are actually better value than in winter.",
        tips: [
          "February is the sweet spot: perfect weather, Dubai Food Festival, and post-peak prices",
          "Ramadan (dates shift yearly) is a unique experience — respectful dress required, no eating/drinking in public during daylight",
          "UAE National Day (December 2) brings extraordinary fireworks and displays citywide",
        ],
      },
      {
        heading: "Getting around Dubai",
        body: "Dubai's metro covers the main tourist corridor — Red Line from the airport through Downtown, Marina, and JBR. The metro is air-conditioned, punctual, and cheap. Women-only carriages exist (Gold Class at front). Uber and Careem (the local equivalent) are ubiquitous and cheap. Taxis are metered and honest. The city is not walkable outside of specific areas (JBR Walk, Downtown Fountain area) — distances are large and heat is real.",
      },
      {
        heading: "Beyond the malls: Dubai's authentic experiences",
        body: "Dubai's most interesting experiences are often the ones tourists skip. The Deira Gold Souk and Spice Souk are genuinely photogenic and fascinating. An abra (traditional wooden boat) ride across Dubai Creek costs $0.30 and feels completely unchanged from the 1960s. Al Fahidi Historical Neighbourhood is the best-preserved pre-oil architecture in the UAE. Desert safari (evening dune-bashing, camel rides, dinner under the stars) is a cliché for good reason — find an operator that goes to the Liwa Oasis rather than the crowded red dunes near the city.",
        tips: [
          "The Dubai Creek abra boats are the best $0.30 you'll spend in the city",
          "Book a desert safari with a reputable operator — quality varies enormously",
          "Miracle Garden (October–April) is genuinely extraordinary and completely overlooked by serious travellers",
        ],
      },
    ],
    hotels: [
      { id: "burj-al-arab", name: "Burj Al Arab Jumeirah", tier: "luxury", badge: "Most Iconic", pricePerNight: 1100, stars: 5, reviewScore: 9.4, reviewCount: 1240, description: "The most recognisable hotel on earth. A sail-shaped island tower with butler service, helicopter landing pad, and rooms starting on the 18th floor. An experience rather than just a hotel.", highlights: ["Butler service", "Private beach", "9 restaurants", "Island location"], bookUrl: "#" },
      { id: "address-downtown", name: "Address Downtown Dubai", tier: "luxury", badge: "Best Fountain View", pricePerNight: 280, stars: 5, reviewScore: 9.3, reviewCount: 2100, description: "The finest address for watching the Dubai Fountain from your room. Steps from the Burj Khalifa and Dubai Mall, with a rooftop pool and remarkable service.", highlights: ["Fountain views", "Burj Khalifa proximity", "Rooftop pool", "Dubai Mall access"], bookUrl: "#" },
      { id: "rove-downtown", name: "Rove Downtown Dubai", tier: "mid", pricePerNight: 90, stars: 4, reviewScore: 8.8, reviewCount: 3100, description: "Dubai's best mid-range brand — clean, design-forward, and superbly located near Downtown. Pool, free wi-fi, and a relaxed vibe that doesn't feel budget.", highlights: ["Downtown location", "Rooftop pool", "Stylish rooms", "Good value"], bookUrl: "#" },
      { id: "ibis-deira", name: "ibis Dubai Deira City Centre", tier: "budget", pricePerNight: 40, stars: 2, reviewScore: 8.2, reviewCount: 4200, description: "Reliable budget choice near Deira City Centre Mall and the souks. Clean, functional, and close to the metro for easy city access.", highlights: ["Metro access", "Near souks", "Budget-friendly", "Reliable chain"], bookUrl: "#" },
    ],
    relatedSlugs: ["maldives", "marrakech", "singapore"],
  },

  {
    slug: "rome",
    name: "Rome",
    country: "Italy",
    tagline: "The Colosseum, the Vatican, and the world's best pasta",
    heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Rome? Our guide covers the Colosseum, Vatican, best neighbourhoods, when to visit, where to eat pasta, and our honest hotel picks.",
    quickFacts: {
      bestTime: "April – May, September – October",
      currency: "Euro (EUR)",
      language: "Italian (English spoken in tourist areas)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$100–$350 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~2.5 hrs from London, ~9 hrs from New York",
    },
    intro: "Rome is the most historically dense city on earth — a 2,800-year palimpsest of civilisations where you can walk from a classical temple to a Baroque piazza to a Renaissance palazzo without crossing a road. The challenge is not finding things to see but managing the extraordinary volume of them. The Colosseum, the Vatican, the Pantheon, the Trevi Fountain, the Borghese Gallery — each would anchor an entire day in a lesser city. In Rome, they're just the beginning.",
    sections: [
      {
        heading: "Which neighbourhood should you stay in?",
        body: "The Historic Centre (around the Pantheon and Campo de' Fiori) is the most central, atmospheric, and expensive. Trastevere is the most romantic — ivy-covered buildings, excellent trattorias, and a neighbourhood feel that the centre lacks. Prati (near the Vatican) is quieter and more affordable, excellent for Vatican-day bases. Monti is Rome's hippest neighbourhood — good restaurants, bars, and boutiques. Testaccio is where Romans eat — no-tourist-markup trattorias and a famous food market.",
        tips: [
          "Book Colosseum and Vatican Museums at least 2–3 weeks ahead — sold-out dates are common",
          "Staying in Trastevere means a 25–30 minute walk to most major sights — worth it for the ambience",
          "Monti is the best value neighbourhood for eating and drinking with a genuinely local crowd",
        ],
      },
      {
        heading: "When to visit Rome",
        body: "April–May and September–October are the classic windows: 18–25°C, major sights open, outdoor dining beautiful. June–August is hot (32–38°C), crowded, and slightly oppressive — though Ferragosto (mid-August) sees many Romans leave and the city quietens. November–March is cool (8–15°C), often rainy, but uncrowded and excellent for museums and restaurants. Christmas in Rome is genuinely beautiful. Easter week is popular but very crowded.",
        tips: [
          "May is the best month overall: mild weather, olive groves in bloom, crowds manageable",
          "Book Vatican Museums for 8am opening to get 2 hours with minimal crowds before tour groups arrive",
          "October is underrated — harvest season, truffle dishes on menus, and 30% cheaper hotels than summer",
        ],
      },
      {
        heading: "Getting around Rome",
        body: "Rome's historic centre is compact and best explored on foot — the best discoveries happen down alleys you didn't plan to enter. The metro has only 3 lines and deliberately avoids the ancient centre (excavation difficulties). Buses cover the rest. Walking between major sights is realistic: Pantheon to Colosseum is 30 minutes on foot through beautiful streets. Taxis (white, metered, app-bookable via itTaxi) are honest and reliable. Avoid tourist tuk-tuks and electric scooters.",
      },
      {
        heading: "Where to eat in Rome",
        body: "Roman food is all about technique applied to a narrow set of ingredients: pasta alla carbonara, cacio e pepe, amatriciana, and gricia are the canon. Each dish uses 3–5 ingredients and depends entirely on execution. A great cacio e pepe in a neighbourhood trattoria costs $13–16. Avoid the tourist-trap restaurants with laminated photo menus and waiters hustling outside — find the place that's full of Italians at 1:30pm on a Tuesday. Jewish-Roman cuisine (in the Ghetto neighbourhood) is one of Italy's most underrated food traditions: artichokes alla giudia, fried baccalà.",
        tips: [
          "Never order carbonara or cacio e pepe in a restaurant with an English menu — you'll be disappointed",
          "Suppli (fried rice balls) from Supplì Roma in Campo de' Fiori are the city's best street snack",
          "Lunch (12:30–2pm) is the best value meal in Rome — the same restaurant is 30–40% cheaper at lunch",
        ],
      },
    ],
    hotels: [
      { id: "portrait-roma", name: "Portrait Roma", tier: "luxury", badge: "Editor's Pick", pricePerNight: 480, stars: 5, reviewScore: 9.6, reviewCount: 680, description: "Salvatore Ferragamo's 14-suite boutique on Via Condotti. Steps from the Spanish Steps, rooftop terrace, and the most personal service in the city.", highlights: ["Via Condotti location", "Rooftop terrace", "14 suites only", "Spanish Steps"], bookUrl: "#" },
      { id: "hotel-eden-rome", name: "Hotel Eden Rome", tier: "luxury", badge: "Best View", pricePerNight: 520, stars: 5, reviewScore: 9.4, reviewCount: 820, description: "A Dorchester Collection property on the Via Veneto with the finest rooftop terrace view in Rome — city panorama, Borghese Gardens, and St Peter's dome.", highlights: ["Panoramic rooftop", "Via Veneto", "Dorchester Collection", "City views"], bookUrl: "#" },
      { id: "hotel-campo-de-fiori", name: "Hotel Campo de' Fiori", tier: "mid", pricePerNight: 120, stars: 3, reviewScore: 8.6, reviewCount: 1900, description: "Rooftop terrace above the famous market square. Characterful, no lift (it's Rome), but extraordinary location and a morning view that's hard to beat.", highlights: ["Rooftop terrace", "Campo de' Fiori", "Market below", "Central location"], bookUrl: "#" },
      { id: "the-beehive-rome", name: "The Beehive", tier: "budget", pricePerNight: 28, stars: 2, reviewScore: 8.7, reviewCount: 2400, description: "The finest budget guesthouse in Rome — American-owned, beautifully designed, with a café, garden, and a community feel. Near Termini but a world away in quality.", highlights: ["Garden terrace", "Café on-site", "Design-focused", "Near Termini"], bookUrl: "#" },
    ],
    relatedSlugs: ["amalfi-coast", "paris", "barcelona"],
  },

  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Bamboo groves, geisha districts, and a thousand temples",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Kyoto? Our guide covers the best temples, geisha districts, when to visit for cherry blossom, and our honest hotel picks for every budget.",
    quickFacts: {
      bestTime: "March – May (cherry blossom), October – November (autumn)",
      currency: "Japanese Yen (JPY)",
      language: "Japanese (some English in tourist areas)",
      timezone: "JST (UTC+9)",
      avgBudget: "$80–$350 per day",
      visaRequired: "Visa-free (90 days, most Western nationalities)",
      flightFrom: "~12 hrs from London (via Tokyo), ~14 hrs from New York",
    },
    intro: "Kyoto was Japan's imperial capital for over a thousand years, and it shows. While Tokyo pulsed forward into the 21st century, Kyoto preserved — 1,600 Buddhist temples, 400 Shinto shrines, 17 UNESCO World Heritage Sites, and enough kaiseki restaurants and machiya townhouses to fill a lifetime of visits. It is the Japan most people imagine before they arrive: bamboo groves, torii gates, geisha glimpsed on a lantern-lit street, and cherry blossom falling through temple gardens. The reality is even better.",
    sections: [
      {
        heading: "Kyoto's key districts",
        body: "Downtown (Kawaramachi/Gion) is the most convenient base — restaurants, transport, and within walking distance of Gion, Pontocho, and the Nishiki Market. Gion is the geisha district — atmospheric at night, best explored on foot after 7pm when the streets quieten. Arashiyama in the west holds the bamboo grove, Tenryuji temple garden, and the monkey park. Higashiyama is the best temple-crawl district — Kiyomizudera, Sanjusangendo, the Philosopher's Path in cherry blossom season. Fushimi Inari (the thousand torii gates) is in the south.",
        tips: [
          "Fushimi Inari: go at dawn or after 6pm — the famous gate corridor is shoulder-to-shoulder during the day",
          "Gion Matsuri (July) is Kyoto's greatest festival — book months ahead, prices triple",
          "The Philosopher's Path in early April during cherry blossom is one of Japan's most beautiful walks",
        ],
      },
      {
        heading: "When to visit Kyoto",
        body: "Cherry blossom (late March – early April) and autumn foliage (mid-November) are the peak periods — spectacularly beautiful but expensive and crowded. Book 6+ months ahead for these windows. May and October are excellent: mild weather, no school holidays, and the city at a liveable pace. Summer (July–August) is hot and humid, but Gion Matsuri in July is worth it for the spectacle. Winter (December–February) is cold but magical — snow-dusted temple gardens with almost no crowds.",
        tips: [
          "Cherry blossom peak shifts by 1–2 weeks year to year — check Japan Meteorological forecasts by January",
          "November foliage is often better than cherry blossom for photographers — warmer light, less pink overwhelm",
          "January–February has no tourists and occasionally snow-dusted temples — deeply atmospheric",
        ],
      },
      {
        heading: "Getting around Kyoto",
        body: "Kyoto's bus network is excellent and covers the whole city — a day pass ($6) is usually the best value. The subway runs north-south and east-west. Cycling is ideal for the flat downtown and river areas — rental shops are everywhere for $7–10/day. Walking between Higashiyama temples is the best way to experience the district. Taxis are available but expensive. The JR Pass covers the Shinkansen from Tokyo but not Kyoto's local buses.",
      },
      {
        heading: "Food and ryokan culture in Kyoto",
        body: "Kyoto's food culture centres on kaiseki — the traditional multi-course meal that is Japan's answer to haute cuisine. A kaiseki lunch at a second-tier establishment costs $50–80 and is extraordinary. Nishiki Market (the 'Kitchen of Kyoto') is four blocks of food stalls selling pickles, tofu, street snacks, and green tea everything. Staying in a ryokan (traditional inn) is Kyoto's version of the experience economy — tatami floors, yukata robes, futon beds, and a multi-course dinner included.",
        tips: [
          "Book ryokan dinner in advance — capacity is limited and kaiseki requires preparation",
          "Kyoto tofu (kyo-tofu) is completely different from what you've eaten elsewhere — silky, delicate, extraordinary",
          "Nishiki Market is best at 9–10am before the tourist crowds. The pickled vegetables are the highlight.",
        ],
      },
    ],
    hotels: [
      { id: "aman-kyoto", name: "Aman Kyoto", tier: "luxury", badge: "Most Extraordinary", pricePerNight: 1600, stars: 5, reviewScore: 9.8, reviewCount: 290, description: "Hidden in a forested garden on the way to Kinkakuji. Possibly the most serene hotel in Japan — stone paths, a secret forest garden, and hot spring baths.", highlights: ["Secret forest garden", "Hot spring baths", "40 rooms only", "Temple proximity"], bookUrl: "#" },
      { id: "tawaraya-kyoto", name: "Tawaraya Ryokan", tier: "luxury", badge: "World's Best Inn", pricePerNight: 900, stars: 5, reviewScore: 9.7, reviewCount: 180, description: "The most celebrated ryokan in Japan — 300 years old, 18 rooms, tatami floors, kaiseki dinner, and dawn tea ceremony. Guests have included world leaders and film directors.", highlights: ["300 years old", "18 rooms", "Kaiseki dinner", "Tea ceremony"], bookUrl: "#" },
      { id: "piece-hostel-kyoto", name: "Piece Hostel Kyoto", tier: "mid", pricePerNight: 45, stars: 3, reviewScore: 8.8, reviewCount: 2800, description: "Kyoto's best mid-range hostel — private rooms, excellent common areas, expert local staff, and perfect location for temple access.", highlights: ["Private rooms", "Temple access", "Expert local staff", "Excellent value"], bookUrl: "#" },
      { id: "hafh-kyoto", name: "Gion Hatanaka", tier: "budget", pricePerNight: 35, stars: 2, reviewScore: 8.5, reviewCount: 1900, description: "Traditional machiya (townhouse) guesthouse in Gion. Tatami rooms, shared facilities, and an authentic neighbourhood experience at a fraction of ryokan prices.", highlights: ["Gion location", "Tatami rooms", "Machiya townhouse", "Authentic atmosphere"], bookUrl: "#" },
    ],
    relatedSlugs: ["tokyo", "bali", "singapore"],
  },

  {
    slug: "phuket",
    name: "Phuket",
    country: "Thailand",
    tagline: "Limestone cliffs, turquoise bays, and world-class island hopping",
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Phuket? Our guide covers the best beaches, when to visit, island hopping to Phi Phi and James Bond Island, and honest hotel picks.",
    quickFacts: {
      bestTime: "November – April (dry season)",
      currency: "Thai Baht (THB)",
      language: "Thai (English spoken in tourist areas)",
      timezone: "ICT (UTC+7)",
      avgBudget: "$60–$250 per day",
      visaRequired: "Visa-free 30 days (most nationalities) or e-Visa",
      flightFrom: "~13 hrs from London, ~20 hrs from New York",
    },
    intro: "Phuket is Thailand's largest island and its most visited beach destination. The west coast beaches — Patong, Kamala, Surin, Bang Tao, Kata — run one after another along 30km of Andaman Sea coastline, each with a different character. The island's real attraction is as a base for the wider Andaman region: Phang Nga Bay with its James Bond limestone karsts, the Phi Phi Islands, the Similan Islands for diving, and Ko Racha for snorkelling are all within day-trip or overnight range.",
    sections: [
      {
        heading: "Phuket's beaches: which is right for you?",
        body: "Patong is the famous party beach — loud, neon, full of Bangla Road bars, and absolutely not for everyone. Kata and Karon are more family-friendly and have the best surf. Kamala is mid-range and increasingly boutique. Surin is the prestige beach — upscale beach clubs, quieter, and the best swimming. Bang Tao (Laguna resort area) is where the high-end five-star hotels sit. Old Phuket Town (the east side) is the cultural heart of the island — stunning Sino-Portuguese architecture, great coffee shops, and almost no beach tourists.",
        tips: [
          "Stay on the west coast for beaches but visit Phuket Town for the authentic culture",
          "Surin and Kamala give the best balance of quality beach, good food, and manageable crowds",
          "Patong is worth one night for the spectacle — but don't stay there for a week",
        ],
      },
      {
        heading: "When to visit Phuket",
        body: "The dry season (November–April) is peak Phuket — the Andaman Sea is calm, blue, and perfect for snorkelling and diving. December and January are the coolest and most popular months. The wet season (May–October) brings the SW monsoon: rough seas, frequent heavy rain, and significantly cheaper hotels. May and October are the transition months — hit-and-miss weather but often sunny mornings. The Gulf coast (Ko Samui, Ko Pha-ngan) is the alternative if you want to travel in the wet season months.",
        tips: [
          "November is the best month to arrive — dry season just starting, prices haven't peaked yet",
          "The Similan Islands are closed May–October — don't plan diving trips in those months",
          "Low season (June–September) cuts resort prices by 30–50% — the tradeoff is real monsoon weather",
        ],
      },
      {
        heading: "Island hopping from Phuket",
        body: "Phuket is the launch pad for the Andaman's best islands. Phi Phi Islands (1.5 hr speedboat): Maya Bay from The Beach is now open again after ecological restoration. Ko Racha (45 min): the best snorkelling day trip from Phuket. Phang Nga Bay (half-day): James Bond Island, sea caves, kayaking through limestone karsts. Similan Islands (liveaboard required): some of Southeast Asia's best diving at 9/10 sites around granite boulders. Ko Lanta (3 hr ferry): quieter, more local feel, good long-stay base.",
        tips: [
          "Book Phi Phi day trips directly with a longtail boat owner from the beach — much cheaper than agencies",
          "A liveaboard Similan Islands trip (3 days/2 nights) is the best diving in the region",
          "Phang Nga Bay by private longtail (vs big tour boat) is worth the extra $30",
        ],
      },
      {
        heading: "Where to eat in Phuket",
        body: "Phuket's food scene is outstanding at every price point. Southern Thai cuisine is distinct from Bangkok's — massaman curry, yellow curry, and crab-based dishes are the local speciality. The best eating is in Phuket Town: Roti Talay for breakfast roti, the weekend walking street for $2 street food, and Ko Ang Seafood for the Phuket crab curry. On the beaches, most beach clubs serve reasonable Thai food — Sam's Seafood at Surin and La Plage at Bang Tao are the best beach restaurants.",
        tips: [
          "Phuket Town's Sunday Walking Street (Thalang Road, 4–10pm) is the best street food event on the island",
          "Massaman curry originated in southern Thailand — it's richer, more aromatic, and better here than anywhere",
          "Avoid any restaurant with English photos outside and a waiter flagging you down",
        ],
      },
    ],
    hotels: [
      { id: "trisara-phuket", name: "Trisara", tier: "luxury", badge: "Editor's Pick", pricePerNight: 680, stars: 5, reviewScore: 9.7, reviewCount: 420, description: "39 private pool villas above a secluded bay north of Phuket. One of Asia's great hideaway hotels — the snorkelling off the private beach is outstanding.", highlights: ["Private pool villas", "Private beach", "Snorkelling reef", "39 villas only"], bookUrl: "#" },
      { id: "amanpuri", name: "Amanpuri", tier: "luxury", badge: "The Original", pricePerNight: 950, stars: 5, reviewScore: 9.6, reviewCount: 310, description: "The hotel that launched the Aman brand in 1988. 40 Thai pavilion suites in a coconut grove above Surin Beach — still the benchmark for understated luxury in Asia.", highlights: ["The original Aman", "Surin Beach", "Thai pavilion suites", "Private beach club"], bookUrl: "#" },
      { id: "kata-rocks", name: "Kata Rocks", tier: "mid", pricePerNight: 165, stars: 5, reviewScore: 9.2, reviewCount: 880, description: "Clifftop infinity-pool suites above Kata Noi with panoramic Andaman views. Excellent value for the quality — private pools at mid-range prices.", highlights: ["Clifftop infinity pool", "Kata Noi views", "Private pools", "Andaman panorama"], bookUrl: "#" },
      { id: "lub-d-phuket", name: "Lub d Phuket Patong", tier: "budget", pricePerNight: 20, stars: 2, reviewScore: 8.6, reviewCount: 3200, description: "Thailand's best design hostel brand. Pool, great common areas, private rooms, and the only budget stay in Patong worth recommending.", highlights: ["Pool", "Private rooms", "Design-forward", "Patong location"], bookUrl: "#" },
    ],
    relatedSlugs: ["bangkok", "bali", "maldives"],
  },

  {
    slug: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    tagline: "Canal houses, world-class museums, and cycling culture",
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5702?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Amsterdam? Our guide covers the Rijksmuseum, Anne Frank House, best neighbourhoods, cycling, when to visit, and our hotel picks.",
    quickFacts: {
      bestTime: "April – May (tulips), June – August (long days)",
      currency: "Euro (EUR)",
      language: "Dutch (English almost universally spoken)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$120–$350 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~1.5 hrs from London, ~7.5 hrs from New York",
    },
    intro: "Amsterdam is one of the world's great small cities — compact enough to explore entirely on foot or bicycle over a long weekend, yet dense with world-class museums, architectural beauty, and a liberal cultural scene that shaped the modern world. The canal ring is a UNESCO World Heritage Site, the Rijksmuseum holds the greatest collection of Dutch Golden Age painting, and the Anne Frank House is among the most important WWII sites in Europe. The city has changed dramatically in the 2020s as it actively discourages mass tourism — which has made it considerably better for the visitors who come anyway.",
    sections: [
      {
        heading: "Amsterdam's best neighbourhoods",
        body: "The Canal Ring (Grachtengordel) is the postcard Amsterdam — 17th-century merchant houses on tree-lined canals. Jordaan is the most charming neighbourhood: narrow streets, independent shops, and excellent neighbourhood cafés (bruine kroegen — brown pubs). De Pijp is the multicultural, younger neighbourhood with the Albert Cuyp market, the city's best street food, and a local café culture. Oud-West and De Baarsjes are where Amsterdammers who can't afford Jordaan actually live — great restaurants, cheap. Avoid staying in the Red Light District area — it's noisy and overpriced.",
        tips: [
          "Book Anne Frank House 2–3 months ahead — tickets sell out completely and you cannot queue",
          "Jordaan is the best base for first-timers — central, beautiful, and walkable to all major sights",
          "De Pijp on a Saturday morning (Albert Cuyp market, Brouwerij 't IJ at noon) is Amsterdam at its local best",
        ],
      },
      {
        heading: "When to visit Amsterdam",
        body: "April–May is peak season for good reason: Keukenhof tulip gardens, cherry blossom along the canals, and the city warming up for summer. Koningsdag (King's Day, 27 April) is an extraordinary city-wide orange party worth visiting for. June–August has the longest days, canal swimming, and outdoor terraces at their best — but hotel prices peak. September–October is excellent shoulder season. November–March is cold (3–8°C), grey, and often rainy — but the museums are quiet, prices are 30–40% lower, and Amsterdam's café culture shines.",
        tips: [
          "Koningsdag (27 April) is one of Europe's great street parties — the entire city turns orange",
          "Keukenhof tulip garden (late March–mid May) is 30 minutes from Amsterdam and genuinely spectacular",
          "The Rijksmuseum is quieter Monday mornings and first thing on weekday afternoons",
        ],
      },
      {
        heading: "Getting around Amsterdam",
        body: "Amsterdam is Europe's cycling capital — the entire city is connected by separated cycle paths, and bikes have right of way over everything except trams. Renting a bike ($15–20/day from MacBike or Yellow Bike) is the ideal way to explore. The tram network covers anything the bike doesn't. Walking is viable for the canal ring. There are no metered taxis on the street — order via the Uber or Bolt apps. Canal boats are available for tours or as a day-pass hop-on transport.",
      },
      {
        heading: "Where to eat and drink in Amsterdam",
        body: "The traditional Dutch eating experience — stamppot, bitterballen, herring from street stands — is authentic and underrated. The modern Amsterdam food scene is genuinely excellent: Indonesian-Dutch (rijsttafel) cuisine is the great fusion food of the city, born from colonial history. Café terraces (and their heated wintergarden equivalents) are the social architecture of Dutch life. The best concentrated restaurant streets are Utrechtsestraat, Haarlemmerstraat, and around Noordermarkt in Jordaan.",
        tips: [
          "Haring (raw herring) from a street stall is mandatory — eaten with onions and pickles, standing up",
          "Rijsttafel at a good Indonesian restaurant is Amsterdam's defining culinary experience",
          "Jenever (Dutch gin) at an old proeflokaal (tasting house) is a living piece of Amsterdam's drinking history",
        ],
      },
    ],
    hotels: [
      { id: "pulitzer-amsterdam", name: "Pulitzer Amsterdam", tier: "luxury", badge: "Most Charming", pricePerNight: 310, stars: 5, reviewScore: 9.2, reviewCount: 1600, description: "25 interconnected 17th-century canal houses transformed into 225 rooms. The most characterful luxury stay in Amsterdam — private gardens, canal suites, world-class bar.", highlights: ["25 canal houses", "Private gardens", "Canal-view rooms", "Central Jordaan"], bookUrl: "#" },
      { id: "soho-house-amsterdam", name: "Soho House Amsterdam", tier: "luxury", badge: "Best Design", pricePerNight: 220, stars: 5, reviewScore: 8.9, reviewCount: 920, description: "Former bank converted into a members' club with hotel. Rooftop pool, inventive food, and the most stylish crowd in the city.", highlights: ["Rooftop pool", "Former bank", "Members-club energy", "De Pijp location"], bookUrl: "#" },
      { id: "conscious-hotel-vondelpark", name: "Conscious Hotel Vondelpark", tier: "mid", pricePerNight: 95, stars: 3, reviewScore: 8.7, reviewCount: 2200, description: "Sustainable design hotel opposite Vondelpark. Smart rooms, great breakfast, eco-credentials, and excellent value for an Amsterdam city break.", highlights: ["Vondelpark opposite", "Eco-certified", "Design rooms", "Good breakfast"], bookUrl: "#" },
      { id: "clink-amsterdam", name: "ClinkNOORD", tier: "budget", pricePerNight: 25, stars: 2, reviewScore: 8.3, reviewCount: 3100, description: "Waterfront hostel in Amsterdam Noord — excellent design, bar, rooftop terrace, and free ferry to Central Station.", highlights: ["Waterfront location", "Free ferry", "Rooftop terrace", "Bar on-site"], bookUrl: "#" },
    ],
    relatedSlugs: ["paris", "prague", "barcelona"],
  },

  {
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    tagline: "Table Mountain, winelands, and two oceans",
    heroImage: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Cape Town? Our guide covers Table Mountain, the Cape Winelands, when to visit, the best neighbourhoods, and our honest hotel picks.",
    quickFacts: {
      bestTime: "November – March (Southern Hemisphere summer)",
      currency: "South African Rand (ZAR)",
      language: "Afrikaans, English, Xhosa",
      timezone: "SAST (UTC+2)",
      avgBudget: "$80–$300 per day",
      visaRequired: "Visa-free (90 days, UK/US/EU/AU)",
      flightFrom: "~11 hrs from London, ~17 hrs from New York",
    },
    intro: "Cape Town is one of the most beautiful cities on earth — a point almost every visitor agrees on within hours of arrival. The flat-topped Table Mountain rising 1,086 metres above the city, the two oceans meeting at Cape Point, the vineyards of Stellenbosch 40 minutes inland, and the penguins at Boulders Beach create a backdrop that no amount of tourism-brochure photography quite prepares you for. The city also has complexity and contrast that every thoughtful visitor encounters — wealth and inequality exist in closer proximity here than almost anywhere.",
    sections: [
      {
        heading: "Cape Town's best areas",
        body: "The City Bowl (CBD) is the base for most sights — Table Mountain gondola, V&A Waterfront, and De Waterkant. Camps Bay is the glamour beach suburb — stunning setting against the Twelve Apostles mountains, excellent restaurants, slightly LA in feel. Constantia is the old-money suburb with the best wine estates. Sea Point is where young Cape Town actually lives — great seafood, coastal walking path, and affordable restaurants. Green Point and De Waterkant are the design and LGBTQ+ neighbourhoods. Bo-Kaap is the brightly painted Cape Malay neighbourhood, historically and culinarily fascinating.",
        tips: [
          "Table Mountain cable car: buy tickets online, go on the clearest day, book the first cable car at 8am",
          "Uber is the safest way to get around — do not hail taxis from the street",
          "Cape Point and Boulders Beach are best combined in a single full-day coastal drive",
        ],
      },
      {
        heading: "When to visit Cape Town",
        body: "Cape Town has a Mediterranean climate — warm, dry summers (November–March) and cool, wet winters (June–August). Summer is the prime time: 25–30°C, long days, all activities running, and the winelands at their most scenic. December and January are the most expensive and crowded months (South African school holidays). March–April is the sweet spot: still warm, quieter, and shoulder-season prices. Winter (June–August) is mild (12–18°C) but can be persistently rainy — good for whale watching (October–November) is actually spring.",
        tips: [
          "March is the best month: grape harvest, golden light, quieter than Jan/Feb, still warm",
          "Southern right whales are best seen October–November at Hermanus (2 hrs from Cape Town)",
          "July–August is the cheapest month — cool and occasionally rainy but the city is fully open",
        ],
      },
      {
        heading: "Getting around Cape Town",
        body: "Cape Town is not a walkable city beyond specific areas — distances between attractions are significant. Uber is safe, cheap, and reliable — use it exclusively rather than street taxis. Renting a car gives the most freedom for Winelands day trips, Cape Point, and the Garden Route if you extend your stay. The MyCiTi bus covers some routes but is not comprehensive. Never walk with valuables in the CBD after dark — situational awareness is important, particularly around Greenpoint and Long Street.",
      },
      {
        heading: "The Cape Winelands",
        body: "Stellenbosch, Franschhoek, and Paarl are 30–60 minutes from Cape Town and among the New World's finest wine regions. Stellenbosch has the greatest concentration of estates, best restaurants, and most visitor infrastructure. Franschhoek is smaller, more French-influenced, and home to The Test Kitchen (long ranked Africa's best restaurant). The Franschhoek Wine Tram does a hop-on circuit of the valley and is good for solo travellers without a car. Book wine estate lunches in advance for the better Stellenbosch farms.",
        tips: [
          "Hire a driver for a Winelands day — DUI laws are strict and the wine is excellent",
          "Franschhoek has better restaurants than Stellenbosch; Stellenbosch has more estates",
          "Jordan Wine Estate's restaurant does one of the best vineyard lunches in Africa",
        ],
      },
    ],
    hotels: [
      { id: "silo-hotel", name: "The Silo Hotel", tier: "luxury", badge: "Most Spectacular", pricePerNight: 580, stars: 5, reviewScore: 9.6, reviewCount: 560, description: "Six floors atop the converted Zeitz MOCAA museum — the most dramatic hotel in Africa. Blown-glass windows, pillow-menu, and Table Mountain views from the rooftop pool.", highlights: ["Rooftop pool", "Above Zeitz MOCAA", "Table Mountain views", "Unique architecture"], bookUrl: "#" },
      { id: "ellerman-house", name: "Ellerman House", tier: "luxury", badge: "Editor's Pick", pricePerNight: 640, stars: 5, reviewScore: 9.7, reviewCount: 340, description: "A 1912 mansion above Bantry Bay with 13 rooms, private art collection, two pools, and arguably the best panoramic view in Cape Town.", highlights: ["Private art collection", "Two pools", "Ocean panorama", "13 rooms only"], bookUrl: "#" },
      { id: "the-cape-milner", name: "The Cape Milner", tier: "mid", pricePerNight: 85, stars: 3, reviewScore: 8.6, reviewCount: 1800, description: "Well-priced boutique hotel in Tamboerskloof with Table Mountain views, rooftop pool, and an easy walk to Kloof Street's restaurants.", highlights: ["Table Mountain views", "Rooftop pool", "Kloof Street", "Good value"], bookUrl: "#" },
      { id: "long-street-backpackers", name: "Long Street Backpackers", tier: "budget", pricePerNight: 15, stars: 1, reviewScore: 8.2, reviewCount: 2100, description: "Cape Town's most social budget stay — Long Street location, rooftop braai, good security, and well-maintained dorms and private rooms.", highlights: ["Long Street", "Rooftop braai", "Good security", "Social vibe"], bookUrl: "#" },
    ],
    relatedSlugs: ["marrakech", "dubai", "bali"],
  },

  {
    slug: "new-york",
    name: "New York City",
    country: "USA",
    tagline: "Manhattan, Brooklyn, and the city that never sleeps",
    heroImage: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to New York City? Our guide covers the best neighbourhoods, when to visit, what to eat, and our hotel picks for every budget.",
    quickFacts: {
      bestTime: "April – May, September – October",
      currency: "US Dollar (USD)",
      language: "English",
      timezone: "EST (UTC−5), EDT summer",
      avgBudget: "$200–$600 per day",
      visaRequired: "ESTA (visa waiver, most nationalities) or B visa",
      flightFrom: "~7 hrs from London, domestic from anywhere in the US",
    },
    intro: "New York City is the most intense urban experience on earth — a 13,000km² metropolitan area of 20 million people that operates at a pace no other city quite matches. Manhattan alone contains more restaurants than most countries have fine-dining establishments, more museums than most European capitals, and a skyline that remains the defining image of modernity. The challenge of visiting is not finding things to do but making meaningful choices about which New York to inhabit — food city, art city, music city, architecture city, or neighbourhood-by-neighbourhood social portrait.",
    sections: [
      {
        heading: "Which borough and neighbourhood?",
        body: "Manhattan is the obvious base — Midtown for Times Square proximity (useful, not enjoyable), Midtown East for Grand Central and museum access, Upper West Side for Central Park and the Natural History Museum. Lower Manhattan/Tribeca is quiet, excellent restaurants. The West Village and Chelsea are the most beautiful Manhattan neighbourhoods. Brooklyn is increasingly the answer to 'where does the interesting New York actually happen' — Williamsburg for restaurants, Dumbo for views, Park Slope for families, Crown Heights for Caribbean food.",
        tips: [
          "Stay within a 10-minute walk of a subway line — Manhattan is not walkable at scale without it",
          "The West Village is the most beautiful Manhattan neighbourhood to explore on foot",
          "Brooklyn Bridge walk at dawn or dusk gives the best Manhattan skyline view in the city",
        ],
      },
      {
        heading: "When to visit New York",
        body: "Spring (April–May) and autumn (September–October) are the classic windows: 15–22°C, the parks in bloom or autumn colour, and the cultural season in full swing. Summer (June–August) is hot and humid but the city's energy is at its peak — outdoor concerts, Governors Island, rooftop bars, Smorgasburg food markets. Winter (December–February) is cold (−2–7°C) but Central Park in snow and the Christmas window displays on Fifth Avenue create a magical atmosphere. January and February are the cheapest months.",
        tips: [
          "New York in late September/early October is exceptional — Hudson Valley foliage day trips, outdoor dining in autumn light",
          "Christmas in New York (Rockefeller tree lighting, Macy's windows) is worth the December crowds if booked well in advance",
          "January is the cheapest month for hotels — the city is fully open and post-holiday quiet",
        ],
      },
      {
        heading: "Getting around New York",
        body: "The subway is the spine of New York life — 472 stations, 24/7 service, and $2.90 per ride (or unlimited weekly MetroCard). It's the fastest way to travel any distance over about 10 blocks. Walking is essential and central to the experience — Manhattan's grid makes it impossible to get lost. Taxis are abundant in Manhattan but increasingly replaced by Uber. Citi Bike (dock-to-dock bike share) is excellent for the West Village, Williamsburg, Central Park. Avoid renting a car — parking in Manhattan is $50–80/day.",
      },
      {
        heading: "Where to eat in New York",
        body: "New York is the most culinarily diverse city on earth: authentic Jewish delis, Sichuan in Flushing, Naples-quality pizza in Brooklyn, ramen shops that outperform Tokyo, and tasting menus that rival Paris. The restaurant scene moves relentlessly — today's hottest table is tomorrow's old news. Some constants: Peter Luger for steakhouse (need a reservation), Di Fara for slice pizza in Midwood, Russ & Daughters for smoked fish bagels, J.G. Melon for burgers, Balthazar for French brasserie, anything in Flushing for authentic Chinese. Budget travellers eat well on $25–35/day if they eat slices and food-hall meals.",
        tips: [
          "Eat a Russ & Daughters smoked salmon bagel at the Orchard Street café on a Sunday morning",
          "Flushing (Queens) is the best Chinese food outside China — a 30-minute subway ride from Manhattan",
          "OpenTable and Resy reservations for hot restaurants fill weeks ahead — book before you fly",
        ],
      },
    ],
    hotels: [
      { id: "the-mark-ny", name: "The Mark", tier: "luxury", badge: "Best Address", pricePerNight: 680, stars: 5, reviewScore: 9.4, reviewCount: 1100, description: "The finest hotel on the Upper East Side — across from the Met, Jean-Georges restaurant, and a lobby that functions as the best people-watching in the neighbourhood.", highlights: ["Opposite the Met", "Jean-Georges restaurant", "Upper East Side", "Design by Jacques Grange"], bookUrl: "#" },
      { id: "soho-grand", name: "SoHo Grand Hotel", tier: "luxury", badge: "Most Stylish", pricePerNight: 390, stars: 4, reviewScore: 9.0, reviewCount: 2100, description: "SoHo's defining luxury hotel — dog-friendly, industrial design, rooftop bar, and the best location for exploring downtown Manhattan.", highlights: ["SoHo location", "Dog-friendly", "Rooftop bar", "Industrial design"], bookUrl: "#" },
      { id: "arlo-nomad", name: "Arlo NoMad", tier: "mid", pricePerNight: 150, stars: 3, reviewScore: 8.7, reviewCount: 2800, description: "Smart, compact rooms in NoMad with a rooftop bar and great location for both Midtown and Downtown. New York hotel value rarely gets better than this.", highlights: ["Rooftop bar", "NoMad location", "Smart rooms", "Good value for NYC"], bookUrl: "#" },
      { id: "pod-51", name: "Pod 51", tier: "budget", pricePerNight: 95, stars: 2, reviewScore: 8.5, reviewCount: 4200, description: "NYC's best budget pod hotel — compact but well-designed, excellent location in Midtown East, rooftop terrace, and the only budget hotel in Manhattan worth recommending.", highlights: ["Midtown East", "Rooftop terrace", "Compact design", "Best NYC budget option"], bookUrl: "#" },
    ],
    relatedSlugs: ["miami", "paris", "tokyo"],
  },

  {
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    tagline: "Trams, Fado music, and Atlantic light unlike anywhere else",
    heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Lisbon? Our guide covers the best neighbourhoods, Fado music, pastéis de nata, the Sintra day trip, and our hotel picks for 2025.",
    quickFacts: {
      bestTime: "April – June, September – October",
      currency: "Euro (EUR)",
      language: "Portuguese (English widely spoken)",
      timezone: "WET (UTC+0, UTC+1 summer)",
      avgBudget: "$80–$250 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~2.5 hrs from London, ~7 hrs from New York",
    },
    intro: "Lisbon has been Europe's most interesting capital city for the better part of a decade — and unlike most cities that peak in hype before disappointing, it keeps delivering. The city sits on seven hills above the Tagus estuary, bathed in an Atlantic light that painters have celebrated for centuries. The old neighbourhoods — Alfama, Mouraria, Mouraria — are UNESCO-worthy without the designation, laced with azulejo-tiled churches and Fado bars. The food is extraordinary and underpriced by any European comparison. And despite a surge of tourism, the soul of the place remains stubbornly, charmingly Portuguese.",
    sections: [
      {
        heading: "Lisbon's best neighbourhoods",
        body: "Alfama is the oldest neighbourhood — Moorish streets, Fado bars, and the São Jorge Castle on the hill. Atmospheric but touristy and difficult to navigate by day. Mouraria is adjacent and more authentically local — multicultural, great street food. Bairro Alto is the nightlife neighbourhood — bars open at 10pm, streets packed by midnight. Chiado is Lisbon's most refined neighbourhood — independent bookshops, excellent cafés, A Brasileira coffee house. Príncipe Real is the best food and design neighbourhood for repeat visitors. Belém (30 min by tram) has the Jerónimos Monastery and the original pastéis de nata.",
        tips: [
          "Tram 28 is a tourist attraction but also genuinely useful — ride it through Alfama at 7am before the crowds",
          "Belém is best in the morning: Jerónimos Monastery opens at 9:30am, buy the fresh pastéis de nata at Pastéis de Belém",
          "The Miradouros (viewpoints) at sunset are non-negotiable — best are Portas do Sol and Santa Luzia",
        ],
      },
      {
        heading: "When to visit Lisbon",
        body: "April–June and September–October are the classic months: 20–26°C, warm enough for outdoor dining, long evenings, and crowds manageable. July and August are hot (30–35°C) and more crowded — still enjoyable but busier and pricier. Santo António Festival (June 12–13) is Lisbon's greatest street party — sardines, wine, and dancing in the streets of Alfama. November–March is cool (12–16°C), very quiet, and surprisingly beautiful — the city's character is most visible when the tourism noise drops.",
        tips: [
          "June 12–13 (Festa de Santo António) is the greatest neighbourhood street party in southern Europe",
          "October is underrated — near-summer weather, vintage wine season, and 30% cheaper hotels than summer",
          "January–February: cheapest flights and hotels of the year, cool but mostly dry",
        ],
      },
      {
        heading: "Getting around Lisbon",
        body: "Lisbon is compact but extremely hilly — the trams, funiculars (elevadores), and metro exist specifically to address this. Tram 28 is the famous scenic route through the historic neighbourhoods. The metro covers the main areas efficiently. Uber is cheap and reliable for cross-city trips. Walking is the best way to discover Lisbon's side streets, but wear comfortable shoes — the hills and cobblestones are genuinely challenging. Car hire is unnecessary in the city but excellent for day trips to Sintra, Cascais, and Setúbal.",
      },
      {
        heading: "Fado, food, and pastéis de nata",
        body: "Lisbon's culinary identity is defined by three things: petiscos (Portuguese tapas — clams, cod fritters, cured meats), bacalhau (salt cod in any of its 365 traditional preparations), and the pastel de nata. The original pastéis de nata were created at Jerónimos Monastery and the original bakery in Belém still makes them the best. Fado — Portugal's haunting national music tradition — is best experienced in a small, authentic house in Alfama (book ahead), not in a tourist restaurant. Market lunch at Mercado da Ribeira (Time Out Market) is the best single food experience in the city for first-timers.",
        tips: [
          "The original Pastéis de Belém in Belém has been making pastéis de nata since 1837 — always a queue, always worth it",
          "For authentic Fado, book Tasca do Chico or Mesa de Frades in Alfama — arrive before 9pm",
          "Bacalhau com natas (salt cod with cream) is the dish Lisbon does better than anywhere — try it at a neighbourhood tasca",
        ],
      },
    ],
    hotels: [
      { id: "bairro-alto-hotel", name: "Bairro Alto Hotel", tier: "luxury", badge: "Editor's Pick", pricePerNight: 280, stars: 5, reviewScore: 9.5, reviewCount: 780, description: "A 55-room boutique hotel in Chiado with a rooftop terrace offering the best view of the Tagus. Impeccable service and the finest address in Lisbon.", highlights: ["Tagus River views", "Rooftop terrace", "55 rooms", "Chiado location"], bookUrl: "#" },
      { id: "verride-palacio", name: "Verride Palácio Santa Catarina", tier: "luxury", badge: "Most Beautiful", pricePerNight: 320, stars: 5, reviewScore: 9.6, reviewCount: 560, description: "A restored 18th-century palace in Santa Catarina with a spectacular rooftop pool, azulejo tile interiors, and Tagus panorama.", highlights: ["18th-century palace", "Rooftop pool", "Azulejo tiles", "Tagus panorama"], bookUrl: "#" },
      { id: "lx-boutique-lisbon", name: "LX Boutique Hotel", tier: "mid", pricePerNight: 95, stars: 3, reviewScore: 8.7, reviewCount: 2100, description: "Each floor themed around a different facet of Portuguese culture — poetry, Fado, wine, cinema. Excellent location in Chiado/Bica.", highlights: ["Themed floors", "Chiado/Bica", "River views", "Cultural design"], bookUrl: "#" },
      { id: "living-lounge-lisbon", name: "Living Lounge Hostel", tier: "budget", pricePerNight: 22, stars: 2, reviewScore: 8.8, reviewCount: 3400, description: "Consistently rated Lisbon's best hostel — beautiful tiled interiors, central Chiado location, and expert local advice from the staff.", highlights: ["Azulejo-tiled interiors", "Chiado location", "Expert staff", "Social vibe"], bookUrl: "#" },
    ],
    relatedSlugs: ["barcelona", "marrakech", "paris"],
  },

  {
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    tagline: "Cliffside villages, limoncello, and the Mediterranean at its most dramatic",
    heroImage: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to the Amalfi Coast? Our guide covers Positano, Ravello, Amalfi, when to visit, getting around, and our honest hotel picks.",
    quickFacts: {
      bestTime: "May – June, September – October",
      currency: "Euro (EUR)",
      language: "Italian (English in tourist areas)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$200–$600 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~2.5 hrs to Naples from London, ~9 hrs to Naples from New York",
    },
    intro: "The Amalfi Coast is 50 kilometres of vertical Mediterranean drama — 13 villages perched on cliffs above a cobalt sea, connected by a single switchback road that was carved into the rock face in the 1800s. It is one of Italy's most photographed and most expensive destinations, and the logistics of visiting require more thought than most Italian trips. But the reward — morning light on Positano's pastel houses, a boat to the Emerald Grotto, limoncello from a lemon grove in Ravello — is genuinely among the finest coastal experiences in the world.",
    sections: [
      {
        heading: "Which town should you base yourself in?",
        body: "Positano is the most famous — a vertical village of pink and white houses cascading to a pebble beach. Expensive, very beautiful, and best experienced early morning. Ravello sits 350m above the sea on a promontory — less beach but the finest gardens (Villa Cimbrone, Villa Rufolo) and the most peaceful atmosphere. Amalfi town is the largest — a historic republic with a cathedral, more affordable options, and boat access across the coast. Praiano is a quieter alternative to Positano, 10 minutes along the road, with better value and a small beach.",
        tips: [
          "Positano is best enjoyed early — the main beach and streets are uncomfortably crowded by 11am in summer",
          "Ravello is the only town where you can escape the traffic noise entirely — worth the altitude",
          "Stay at least 3 nights — the coast rewards those who slow down, boat around, and eat dinner late",
        ],
      },
      {
        heading: "When to visit the Amalfi Coast",
        body: "May–June and September–October are far superior to the July–August peak. The famous coast road has been closed to private cars in summer since 2022 — you must use buses, ferries, or organised transfers. Hotel prices in July and August can be extraordinary ($500–800/night for basic rooms). May is the best month: lemons ripe, wisteria blooming, sea warming up, and the road fully accessible. October is also excellent — local life resumes, prices drop, and the Mediterranean light in autumn is remarkable.",
        tips: [
          "The coast road is closed to private cars July–August — plan to use the ferry between towns",
          "May sees the lemons at their peak and the spring flowers — the most beautiful time to visit",
          "Book September ferry schedules in advance — ferries are often the best way to move along the coast",
        ],
      },
      {
        heading: "Getting around the Amalfi Coast",
        body: "The coast road (SS163) is notoriously narrow, winding, and congested. The ferry service between towns is the best solution in high season — Positano to Amalfi takes 35 minutes and avoids the traffic entirely. Public buses (SITA) run frequently but require patience and are extremely crowded in peak season. Water taxis are available for private hire between any two points. Walking is possible on the path network above the road — the Sentiero degli Dei (Path of the Gods) is one of Italy's finest walks.",
        tips: [
          "Take the ferry between Positano and Amalfi in both directions — the views from the sea are the best",
          "The Sentiero degli Dei (Path of the Gods) hike from Agerola to Nocelle is 8km and spectacular",
          "Private water taxi Positano to Amalfi is $80–100 and genuinely the finest way to travel the coast",
        ],
      },
      {
        heading: "Food and drink on the Amalfi Coast",
        body: "Amalfi Coast cuisine is defined by its lemons, its seafood, and its pasta. The Sfusato Amalfitano lemon is a DOP-protected variety — enormous, sweet, and the basis for the best limoncello in Italy. Freselle (dried bread rings with tomatoes, olive oil, and seafood) is the region's snack. Fresh pasta with swordfish, sea urchin, or clams at a clifftop restaurant overlooking the sea is the quintessential Amalfi experience. Budget here is relative — even simple meals cost $30+ per person.",
        tips: [
          "Buy limoncello only from family producers selling their own lemons — the commercial brands are inferior",
          "The terrace at Le Sirenuse hotel in Positano does the finest pasta lunch on the coast",
          "Eat dinner at 8pm minimum — before then you're eating with tourists, not Italians",
        ],
      },
    ],
    hotels: [
      { id: "le-sirenuse", name: "Le Sirenuse", tier: "luxury", badge: "Most Iconic", pricePerNight: 1100, stars: 5, reviewScore: 9.7, reviewCount: 480, description: "Positano's defining hotel — a family-run palazzo of extraordinary taste, overlooking the bay. The rooftop pool and La Sponda restaurant are pilgrimage destinations.", highlights: ["Rooftop pool", "Positano panorama", "Family-run", "La Sponda restaurant"], bookUrl: "#" },
      { id: "belmond-caruso", name: "Belmond Hotel Caruso", tier: "luxury", badge: "Best Pool", pricePerNight: 980, stars: 5, reviewScore: 9.5, reviewCount: 520, description: "An 11th-century palazzo in Ravello with an infinity pool that appears to hang over the sea. The most spectacular pool view in Italy.", highlights: ["Cliff-edge infinity pool", "Ravello gardens", "11th-century palazzo", "Sea panorama"], bookUrl: "#" },
      { id: "hotel-luna-amalfi", name: "Hotel Luna Convento", tier: "mid", pricePerNight: 185, stars: 4, reviewScore: 8.8, reviewCount: 1200, description: "A converted 13th-century convent in Amalfi town with sea-view pool, cloister gardens, and the best value caldera-view property on the coast.", highlights: ["13th-century convent", "Sea-view pool", "Cloister garden", "Amalfi town"], bookUrl: "#" },
      { id: "pensione-maria-luisa", name: "Pensione Maria Luisa", tier: "budget", pricePerNight: 75, stars: 2, reviewScore: 8.5, reviewCount: 890, description: "The best budget option on the coast — family-run, sea views from most rooms, excellent home-cooked breakfast, and a genuinely warm welcome in Praiano.", highlights: ["Sea views", "Family-run", "Home breakfast", "Praiano location"], bookUrl: "#" },
    ],
    relatedSlugs: ["rome", "dubrovnik", "santorini"],
  },

  {
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    tagline: "Souks, riads, and the Atlas Mountains one hour away",
    heroImage: "https://images.unsplash.com/photo-1539637116277-4db20889f2d4?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Marrakech? Our guide covers the Medina souks, best riads, Jemaa el-Fna square, when to visit, and day trips to the Atlas Mountains.",
    quickFacts: {
      bestTime: "March – May, September – November",
      currency: "Moroccan Dirham (MAD)",
      language: "Darija Arabic, Tamazight, French",
      timezone: "WET (UTC+0, UTC+1 summer)",
      avgBudget: "$60–$250 per day",
      visaRequired: "Visa-free (90 days, UK/US/EU/AU)",
      flightFrom: "~3.5 hrs from London, ~10 hrs from New York",
    },
    intro: "Marrakech is one of the world's great sensory experiences — a 11th-century Berber city where the medieval Medina is still very much the beating heart of daily life. The labyrinthine souks sell everything from hand-hammered copper lanterns to argan oil to live chickens. Jemaa el-Fna square transforms from a market by day into one of the world's great outdoor performance stages by night. And on the city's edge, the Atlas Mountains rise to over 4,000 metres — visible from rooftop terraces and accessible for day trips or trekking.",
    sections: [
      {
        heading: "The Medina and the souks",
        body: "The Medina is a UNESCO World Heritage Site — 19 km² of alleyways, workshops, and bazaars largely unchanged in their spatial logic since the 12th century. The souks are divided by trade: leather at Souk Chebbakine, dyers at the Dyers' Quarter (Souk Sabbaghin), spice merchants near the Rahba Kedima. The Tanneries are visible from rooftop terraces above the leather souk — genuinely extraordinary, though the viewing decks come with a soft-sell carpet pitch. Getting lost in the Medina is the point — the riad-filled residential quarter is the most beautiful and peaceful part.",
        tips: [
          "The tanneries are best seen in the morning when the vats are most active — afternoon light is also dramatic",
          "Agree prices before bargaining in the souks — most traders start 3–4× the fair price",
          "The best way to navigate the Medina is with a local guide for the first morning, then independently",
        ],
      },
      {
        heading: "When to visit Marrakech",
        body: "March–May and September–November are the prime seasons: 20–28°C, manageable humidity, and the mountains accessible for day trips or overnight trekking. June–August is brutal: 38–42°C with a heat that makes afternoon sightseeing genuinely difficult. The Medina's narrow streets offer shade but the heat is still intense. December–February is mild (15–18°C) and uncrowded — evenings can be cold in the desert. Ramadan (dates shift yearly) is a unique experience — daytime quiet followed by festive evenings.",
        tips: [
          "April is the best month: spring flowers in the Majorelle Garden, Atlas still snow-capped, comfortable temperatures",
          "Ramadan evenings at Jemaa el-Fna are the most atmospheric nights of the year — plan around it rather than avoiding it",
          "July is genuinely dangerously hot — if you go, plan all activity before 10am and after 5pm",
        ],
      },
      {
        heading: "Getting around Marrakech",
        body: "The Medina is navigated on foot — the alleyways are too narrow for cars. Google Maps works reasonably well but the Medina's spatial logic defeats it in places — hire a guide for the first day. The Ville Nouvelle (Guéliz) is the French-colonial new town, 20 minutes from the Medina by petit taxi (agree price before entering). Petit taxis are colour-coded red and very cheap. Uber and Careem also operate in Marrakech. The Atlas Mountains are best reached by rented car or organised day trip.",
      },
      {
        heading: "Food and hammam culture",
        body: "Moroccan cuisine is among the world's great food traditions: tagine, couscous on Fridays, bastilla (pigeon pie in a flaky pastry), and harira soup are the classics. The street food at Jemaa el-Fna is theatrical and genuinely good — snail soup, merguez sausages, fried sheep heads (for the adventurous). The hammam (Moroccan bathhouse) experience is essential: a traditional hammam scrub takes 45 minutes and leaves the skin transformed. La Maison Arabe's hammam and Hammam de la Rose are the best options for first-timers.",
        tips: [
          "Eat at Chez Chegrouni on Jemaa el-Fna for an honest Moroccan lunch with locals — no tourist markup",
          "Book the traditional hammam at La Mamounia or La Maison Arabe in advance — the experience is transformative",
          "Mint tea with absurd amounts of sugar is a ritual of welcome — declining is impolite",
        ],
      },
    ],
    hotels: [
      { id: "la-mamounia", name: "La Mamounia", tier: "luxury", badge: "Most Legendary", pricePerNight: 680, stars: 5, reviewScore: 9.5, reviewCount: 1420, description: "Churchill's favourite hotel — a Moroccan palace surrounded by 8 hectares of garden that have been here since the 18th century. The benchmark for Moroccan luxury.", highlights: ["Churchill's retreat", "8ha gardens", "Three pools", "Moroccan palais"], bookUrl: "#" },
      { id: "royal-mansour", name: "Royal Mansour Marrakech", tier: "luxury", badge: "Most Opulent", pricePerNight: 1100, stars: 5, reviewScore: 9.8, reviewCount: 680, description: "53 private riads in a self-contained city-within-a-city, created by royal command. Personal butler per riad, private plunge pools, and the finest spa in Africa.", highlights: ["Private riad per guest", "Personal butler", "Royal commission", "World's best spa"], bookUrl: "#" },
      { id: "riad-yasmine", name: "Riad Yasmine", tier: "mid", pricePerNight: 80, stars: 3, reviewScore: 9.0, reviewCount: 1900, description: "The most-photographed plunge pool in Marrakech — emerald water, rose petals, white arches. Small, intimate, beautifully maintained riad in the Medina.", highlights: ["Famous emerald pool", "Medina location", "Rose petal service", "10 rooms only"], bookUrl: "#" },
      { id: "equity-point-marrakech", name: "Equity Point Marrakech", tier: "budget", pricePerNight: 20, stars: 2, reviewScore: 8.4, reviewCount: 2600, description: "The best budget riad-hostel in the Medina. Rooftop terrace, pool, excellent location, and a reliable place to meet fellow travellers heading to the Atlas.", highlights: ["Rooftop pool", "Medina location", "Social vibe", "Atlas tours"], bookUrl: "#" },
    ],
    relatedSlugs: ["lisbon", "dubai", "cape-town"],
  },

  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    tagline: "Garden city, world-class food, and Asia's most efficient hub",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Singapore? Our guide covers Gardens by the Bay, the hawker centre food scene, the best neighbourhoods, and our hotel picks for every budget.",
    quickFacts: {
      bestTime: "February – April, July – September (relatively drier)",
      currency: "Singapore Dollar (SGD)",
      language: "English, Mandarin, Malay, Tamil",
      timezone: "SGT (UTC+8)",
      avgBudget: "$80–$350 per day",
      visaRequired: "Visa-free (90 days, most nationalities)",
      flightFrom: "~13 hrs from London, ~19 hrs from New York",
    },
    intro: "Singapore is the most efficiently functioning city on earth — and a far more interesting one than its reputation for orderliness suggests. The city-state packs more culinary diversity into its 720km² than most countries manage at continental scale, with a hawker centre food culture recognised by UNESCO as intangible cultural heritage. The Marina Bay Sands skyline, Gardens by the Bay's supertrees, and the botanical gardens make it architecturally distinctive. It's also the best transit hub in Asia — combining a Singapore stop with a regional itinerary adds little time and extraordinary value.",
    sections: [
      {
        heading: "Singapore's key neighbourhoods",
        body: "Marina Bay is the modern skyline — Marina Bay Sands, Gardens by the Bay, and the financial district. The Civic District has Singapore's colonial core: Raffles Hotel, the Esplanade, the Singapore River. Chinatown is a UNESCO streetscape of shophouses with some of the city's best hawker food. Little India (Serangoon Road) is the most atmospherically dense neighbourhood — flower garlands, temple rituals, and South Indian food that rivals the subcontinent. Kampong Gelam/Arab Street has Islamic heritage, independent boutiques, and Singapore's best Turkish coffee. Clarke Quay is the tourist nightlife strip — skip it for the Keong Saik Road and Tiong Bahru café scene instead.",
        tips: [
          "The MRT reaches virtually everywhere — taxis and Grab are for the gaps the train doesn't cover",
          "Little India on a weekday evening is the most immersive neighbourhood experience in Singapore",
          "Tiong Bahru is where Singapore's design and food culture is currently most interesting for visitors",
        ],
      },
      {
        heading: "When to visit Singapore",
        body: "Singapore is equatorial — 28–32°C and humid year-round with no true dry season. February–April is slightly drier (northeast monsoon ending). July–August is also drier. The wettest months are November–January (northeast monsoon) and May–June (transition). Rain is heavy but short — rarely lasts more than an hour. Singapore Chinese New Year (January/February) is the most atmospheric time — Chinatown transforms completely. Singapore Grand Prix (September) is the world's only night race and creates extraordinary city atmosphere.",
        tips: [
          "Singapore Chinese New Year transforms Chinatown into one of Southeast Asia's greatest festivals",
          "F1 Singapore Grand Prix (September) turns the city into an outdoor festival — book months ahead",
          "Rain comes fast and heavy but passes quickly — carry a compact umbrella always",
        ],
      },
      {
        heading: "Getting around Singapore",
        body: "Singapore's MRT is the gold standard of urban rail — clean, air-conditioned, punctual, and covering virtually everywhere a visitor needs to go. An EZ-Link card (loaded with credit) handles trains and buses. Singapore is also exceptionally walkable within each neighbourhood — the underground networks at City Hall, Orchard, and Raffles Place are their own climate-controlled worlds. Grab is the local Uber and fills every gap. Taxis are plentiful and honest (metered). Cycling is emerging along the park connectors.",
      },
      {
        heading: "Singapore's hawker centres",
        body: "The hawker centre is Singapore's greatest social institution — a government-subsidised open-air food court where every stall has perfected one dish over decades. Tian Tian Hainanese Chicken Rice at Maxwell Food Centre, Liao Fan Hong Kong Soya Sauce Chicken Rice & Noodle (the world's cheapest Michelin star), Ah Heng's curry fish head at Hong Lim Complex, and laksa at Sungei Road Laksa are all $3–8 masterclasses. A full meal at a hawker centre costs $5–10. This is the primary reason to visit Singapore.",
        tips: [
          "Hawker centres open early and close by 2–3pm for lunch — arrive at 11:30am before the queue builds",
          "Old Airport Road Food Centre has the most old-school Singapore hawker stalls in a single location",
          "The $3 Michelin-starred chicken rice at Maxwell Food Centre is the city's most famous dish — always a queue",
        ],
      },
    ],
    hotels: [
      { id: "marina-bay-sands", name: "Marina Bay Sands", tier: "luxury", badge: "Most Iconic", pricePerNight: 380, stars: 5, reviewScore: 9.0, reviewCount: 5200, description: "The infinity pool on the 57th-floor SkyPark is the most famous image in Singapore. Three towers connected by the world's largest rooftop public space.", highlights: ["57th-floor infinity pool", "SkyPark", "City panorama", "Casino on-site"], bookUrl: "#" },
      { id: "capella-singapore", name: "Capella Singapore", tier: "luxury", badge: "Editor's Pick", pricePerNight: 520, stars: 5, reviewScore: 9.7, reviewCount: 820, description: "A colonial estate on Sentosa Island surrounded by rainforest. The most serene luxury hotel in Singapore — two pools, three restaurants, and extraordinary service.", highlights: ["Colonial estate", "Rainforest setting", "Two pools", "Sentosa Island"], bookUrl: "#" },
      { id: "hotel-fort-canning", name: "Hotel Fort Canning", tier: "mid", pricePerNight: 120, stars: 4, reviewScore: 9.0, reviewCount: 2100, description: "1926 colonial building in Fort Canning Park — one of Singapore's most characterful hotels. Good food, outdoor pool, and an extraordinary historical setting.", highlights: ["1926 colonial building", "Fort Canning Park", "Outdoor pool", "Historical atmosphere"], bookUrl: "#" },
      { id: "bunc-hostel-singapore", name: "BUNC @ Radius", tier: "budget", pricePerNight: 30, stars: 2, reviewScore: 8.7, reviewCount: 2800, description: "Singapore's best hostel — rooftop bar, social events, excellent location near Clarke Quay, and private rooms available.", highlights: ["Rooftop bar", "Clarke Quay", "Social events", "Private rooms"], bookUrl: "#" },
    ],
    relatedSlugs: ["bali", "kyoto", "bangkok"],
  },

  {
    slug: "prague",
    name: "Prague",
    country: "Czech Republic",
    tagline: "Medieval bridges, Baroque spires, and Europe's finest castle district",
    heroImage: "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Prague? Our guide covers the Old Town, Charles Bridge, Prague Castle, the best Czech food, when to visit, and our honest hotel picks.",
    quickFacts: {
      bestTime: "May – June, September – October",
      currency: "Czech Koruna (CZK)",
      language: "Czech (English widely spoken)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$70–$200 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~2 hrs from London, ~9 hrs from New York",
    },
    intro: "Prague is the best-preserved medieval city in Europe — it largely escaped the bombing of WWII, which means the Gothic, Baroque, and Art Nouveau architecture stands as it was built across 10 centuries. The Staroměstské náměstí (Old Town Square), the Vltava River, and the Hradčany castle district form one of the world's most photogenic urban landscapes. The city is also excellent value by Western European standards — good Czech beer at $1.50/pint, traditional svíčková for $8, and mid-range hotels for $80–120/night.",
    sections: [
      {
        heading: "Prague's key districts",
        body: "Staré Město (Old Town) is the historic heart — Old Town Square, the Astronomical Clock, and most major sights. Very touristy but unavoidably beautiful. Malá Strana (Lesser Town) sits below the castle — the most architecturally beautiful neighbourhood, Baroque palaces and quiet cobblestone squares. Vinohrady is where the young, creative Prague lives — Art Nouveau apartment buildings, excellent restaurants, and the best café scene. Žižkov has the most authentic local bars. Josefov (Jewish Quarter) has Europe's finest preserved Jewish heritage and is now a luxury shopping enclave.",
        tips: [
          "Prague Castle (Pražský hrad) is best at 9am before tour groups arrive — the views of the city are extraordinary",
          "Charles Bridge is spectacular at dawn (6am) when it's almost empty — avoid the midday scrum",
          "Vinohrady and Žižkov have the best local restaurants and bars — Prague's real neighbourhood character",
        ],
      },
      {
        heading: "When to visit Prague",
        body: "May–June and September–October are the best months: 18–22°C, long evenings, outdoor terraces in full swing, and crowds manageable. July and August are hot and packed with tourists — the Old Town is shoulder-to-shoulder. December is magical: Prague's Christmas markets are among Europe's finest, with glühwein and trdelník in the snow. January–February is the cheapest window, cold (−2–4°C) but atmospheric and almost crowd-free.",
        tips: [
          "Prague Christmas markets (late November–January 6) are Europe's most beautiful — the Old Town Square market is the centrepiece",
          "May: lilac trees in bloom in Petřín Hill park, outdoor concerts starting, ideal temperatures",
          "January–February is 40% cheaper than summer — cold but manageable with good clothing",
        ],
      },
      {
        heading: "Getting around Prague",
        body: "Prague's tram network is excellent and the most pleasant way to move around the city. The metro (3 lines) covers longer distances. Night trams run after midnight. Buy a 24-hour or 72-hour pass (about $4/$8) for unlimited tram/metro/bus travel. Walking is viable between Old Town, Malá Strana, and Vinohrady — and is how you discover the hidden courtyards and passages. Uber and Bolt operate and are cheap. Avoid taxi hailing from the street — use apps only.",
      },
      {
        heading: "Czech food, beer, and culture",
        body: "Czech cuisine is hearty, meat-centred, and underrated: svíčková na smetaně (sirloin in cream sauce with bread dumplings), vepřo-knedlo-zelo (roast pork with dumplings and sauerkraut), and trdelník (chimney cake) at every Christmas market corner. Czech beer is genuinely world-class — Pilsner Urquell invented the pilsner style, Kozel dark is a masterclass, and the local unpasteurised 'tank beer' (tankové pivo) found in traditional pivnice pubs is the finest beer in Central Europe. Budget: you can eat and drink extraordinarily well on $25–30/day.",
        tips: [
          "Lokál (Lokál Dlouhá) is the best tank beer bar in Prague — order the Pilsner Urquell unpasteurised on tap",
          "Svíčková at Café Savoy or U Kroka is the definitive Czech comfort food experience",
          "Prague's pub culture (pivnice) requires ordering by holding up fingers — asking for the bill is 'zaplatím'",
        ],
      },
    ],
    hotels: [
      { id: "four-seasons-prague", name: "Four Seasons Prague", tier: "luxury", badge: "Best View", pricePerNight: 450, stars: 5, reviewScore: 9.5, reviewCount: 1120, description: "Three interconnected buildings — Renaissance, Baroque, and contemporary — on the Vltava riverbank directly below Prague Castle. The finest address in the city.", highlights: ["Prague Castle views", "Riverside location", "Three buildings", "Legendary service"], bookUrl: "#" },
      { id: "aria-hotel-prague", name: "Aria Hotel Prague", tier: "luxury", badge: "Most Charming", pricePerNight: 290, stars: 5, reviewScore: 9.4, reviewCount: 780, description: "A music-themed boutique in Malá Strana — each floor dedicated to a different genre, with a garden overlooking the castle and one of the city's best rooftop terraces.", highlights: ["Music-themed rooms", "Castle-view rooftop", "Malá Strana", "Garden terrace"], bookUrl: "#" },
      { id: "hotel-icon-prague", name: "Hotel ICON", tier: "mid", pricePerNight: 90, stars: 4, reviewScore: 8.8, reviewCount: 1900, description: "Design hotel in a renovated 1920s building in the New Town. Pool, sauna, excellent breakfast, and walking distance to Old Town Square.", highlights: ["1920s building", "Pool and sauna", "New Town", "Good value"], bookUrl: "#" },
      { id: "sophie-hostel-prague", name: "Sophie's Hostel", tier: "budget", pricePerNight: 20, stars: 2, reviewScore: 8.9, reviewCount: 3800, description: "Consistently rated Europe's best budget hostel. Vintage design, free breakfast, central location, and a rooftop terrace overlooking the city.", highlights: ["Free breakfast", "Rooftop terrace", "Vintage design", "Central location"], bookUrl: "#" },
    ],
    relatedSlugs: ["amsterdam", "budapest", "vienna"],
  },

  {
    slug: "ibiza",
    name: "Ibiza",
    country: "Spain",
    tagline: "Club culture, hidden coves, and extraordinary sunsets",
    heroImage: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Ibiza? Our guide covers the best clubs, beaches, and hidden coves, when to visit for sun vs nightlife, and our honest hotel picks.",
    quickFacts: {
      bestTime: "May – June (beach + quiet), July – September (full season)",
      currency: "Euro (EUR)",
      language: "Spanish, Catalan (Ibizan dialect) — English widely spoken",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$150–$500 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~2.5 hrs from London, ~9 hrs from New York",
    },
    intro: "Ibiza is two islands in one — the world's most legendary electronic music destination, home to clubs that invented the form (Pacha, DC-10, Amnesia, Hi Ibiza), and a quieter island of pine-covered hills, whitewashed villages, hidden coves, and the UNESCO-listed Dalt Vila old town. Both versions coexist on the same 572km² without particular friction. The key is understanding which version you want — and ideally combining both, because the beach coves of the northwest and the all-night energy of the clubs are each extraordinary in their own right.",
    sections: [
      {
        heading: "Ibiza for clubbing: what to know",
        body: "The club season runs mid-June to early October. The biggest nights are at Pacha (Thursday, house classics), Amnesia (Tuesday, Cream; Thursday, DC-10 Circoloco), Hi Ibiza (Friday, Resistance), and DC-10 (Monday, Circoloco). Tickets cost $44–110 for major nights — buy online weeks ahead for sold-out nights. Drinks inside clubs are $16–27. Pre-parties at hotel pools or beach bars run from 8–11pm. The Ibiza party circuit runs Sunday–Sunday and keeping up with it for more than 3 nights requires real stamina.",
        tips: [
          "DC-10's Monday Circoloco is the most legendary club morning in the world — nothing else compares",
          "Buy club tickets before you fly — sold-out nights are genuinely sold out",
          "The pre-party at Café del Mar for the sunset (7–9pm) is the best free entertainment on the island",
        ],
      },
      {
        heading: "Ibiza's beaches and hidden coves",
        body: "The northwest of Ibiza — from Cala Salada to Portinatx — has the best coves: small, crystalline, and far from the club crowd. Cala d'Hort has views of Es Vedrà (a dramatic limestone stack rising from the sea). Ses Salines is the most beautiful main beach. Cala Conta (Platjes de Comte) has the finest water on the island — turquoise, shallow, and surrounded by flat rocks for sunbathing. The east coast (Santa Eulàlia, Cala Nova) is quieter and more family-oriented.",
        tips: [
          "Rent a small boat for a day (from $87–165) to access the coves that have no road access",
          "Cala Conta is the most beautiful beach — arrive before 10am or after 5pm to get a spot in July/August",
          "Es Vedrà at sunset from Cala d'Hort is one of the most dramatic natural scenes in the Mediterranean",
        ],
      },
      {
        heading: "When to visit Ibiza",
        body: "The island is only truly itself June–September. July–August is peak club season, peak prices, and peak crowds. May–June is better for beaches — warm enough to swim, the clubs just opening, and much cheaper. September is the best of all worlds: summer heat, club season in full swing, and the tourist peak past. October sees the clubs close one by one (season ends with DC-10's closing party, usually mid-October). November–April: the island is quiet, windy, and closed — a very different experience.",
        tips: [
          "September is the best month: warm sea, clubs at their peak, post-August prices",
          "June is the best month for beaches without the nightlife overload",
          "DC-10's closing party in October is one of the most emotional nights in the club calendar",
        ],
      },
      {
        heading: "Dalt Vila and the quieter side of Ibiza",
        body: "Dalt Vila — Ibiza's UNESCO-listed fortified old town above Eivissa harbour — is one of the Mediterranean's finest walled cities. The cathedral, the ramparts walk at sunset, and the narrow streets of the Penya neighbourhood reward slow exploration. Sant Antoni de Portmany (the sunset strip) has reinvented itself as a higher-quality destination than its Brit-holiday reputation suggested — Café Mambo and Café del Mar set the global template for sunset bar culture. The inland villages (Santa Gertrudis, Sant Joan) have the island's best local restaurants and a rural pace entirely at odds with the clubs on the coast.",
        tips: [
          "Dalt Vila at sunset is the best free experience on the island — climb to the cathedral ramparts",
          "Santa Gertrudis has the best non-club restaurants: Bar Costa, Bambuddha, and the village square",
          "Walk the Dalt Vila ramparts at golden hour for the best view of the harbour and Es Vedrà",
        ],
      },
    ],
    hotels: [
      { id: "lio-ibiza", name: "Gran Hotel Montesol", tier: "luxury", badge: "Most Historic", pricePerNight: 320, stars: 5, reviewScore: 9.2, reviewCount: 640, description: "Ibiza's oldest hotel (1933) on the Vara de Rey promenade — beautifully restored with harbour views, rooftop bar, and the most central location on the island.", highlights: ["1933 original hotel", "Harbour views", "Rooftop bar", "Historic location"], bookUrl: "#" },
      { id: "seven-pines-ibiza", name: "Seven Pines Resort", tier: "luxury", badge: "Best Pool", pricePerNight: 580, stars: 5, reviewScore: 9.5, reviewCount: 520, description: "Clifftop resort above Cala Conta with infinity pools at different levels, suites overlooking Es Vedrà, and the finest spa on the island.", highlights: ["Clifftop infinity pools", "Es Vedrà views", "Private cove", "World-class spa"], bookUrl: "#" },
      { id: "hotel-cala-llenya", name: "Hotel Cala Llenya", tier: "mid", pricePerNight: 110, stars: 4, reviewScore: 8.7, reviewCount: 1400, description: "Family-friendly resort directly on the beach at Cala Llenya on the quieter east coast. Excellent value for Ibiza, pool, and genuinely beautiful cove.", highlights: ["Beachfront", "Quiet east coast", "Pool", "Excellent Ibiza value"], bookUrl: "#" },
      { id: "hostal-la-torre", name: "Hostal La Torre", tier: "budget", pricePerNight: 85, stars: 2, reviewScore: 8.8, reviewCount: 920, description: "A clifftop guesthouse in Sant Antoni with legendary sunset views — the best value sunset-watching spot on the island, with a bar and small rooms.", highlights: ["Clifftop sunset views", "Sant Antoni", "Bar on-site", "Classic Ibiza spot"], bookUrl: "#" },
    ],
    relatedSlugs: ["barcelona", "santorini", "miami"],
  },

  {
    slug: "bora-bora",
    name: "Bora Bora",
    country: "French Polynesia",
    tagline: "The most beautiful lagoon on earth — and overwater bungalows done right",
    heroImage: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Bora Bora? Our honest guide covers overwater bungalows, the best resorts, when to visit, how to save money, and what to actually do there.",
    quickFacts: {
      bestTime: "May – October (dry season)",
      currency: "CFP Franc (XPF) — credit cards widely accepted",
      language: "French, Tahitian (some English at resorts)",
      timezone: "TAHT (UTC−10)",
      avgBudget: "$600–$2,000+ per day (resort) / $150–300 (guesthouse)",
      visaRequired: "Visa-free (90 days, most Western nationalities) via French Polynesia",
      flightFrom: "~22 hrs from London, ~8 hrs from LA/NYC via Tahiti",
    },
    intro: "Bora Bora may be the single most photographed island in the world — the emerald peak of Mount Otemanu rising above a perfectly circular lagoon of every shade of blue and green, surrounded by a string of motu (coral islets). The reality matches the postcard. The island is small enough to circumnavigate by bicycle in three hours, its underwater world is extraordinary (with the world's calmest and clearest snorkelling conditions), and the overwater bungalow concept was essentially invented here. It is expensive — extravagantly so — but there are ways to experience it without the resort price tag.",
    sections: [
      {
        heading: "Overwater bungalows: what to know",
        body: "Bora Bora pioneered the overwater bungalow concept in 1961, and the island remains its finest expression. The best overwater rooms have glass-floor panels for watching reef life, direct lagoon access via steps into calm, clear water, and sunrise/sunset views across the lagoon to Mount Otemanu. The Conrad Bora Bora Nui and Four Seasons have the finest overwater products. The St Regis (now Le Bora Bora by Pearl Resorts) has the largest lagoon. Book 6+ months ahead for the best water bungalows.",
        tips: [
          "Request a water bungalow with Mount Otemanu views — the angle matters enormously for photography",
          "The clearest water for snorkelling is from the eastside bungalows at the Four Seasons and Conrad",
          "Sunrise-facing overwater rooms are 10–15% cheaper with equally dramatic light",
        ],
      },
      {
        heading: "When to visit Bora Bora",
        body: "The dry season (May–October) is when Bora Bora is at its finest: lower humidity, less cloud, and calmer lagoon conditions. July–August are the most popular months — school holidays worldwide. May, June, and September offer the best combination of good weather and manageable crowds. The wet season (November–April) brings more rain, higher humidity, and notably cheaper rates (30–50% less). Some rainy-season storms can be intense, but sunny periods are still the majority.",
        tips: [
          "July 14 (Bastille Day/Heiva festival) is spectacular — traditional dance, outrigger racing on the lagoon",
          "September and October are exceptional: post-peak quiet, warm sea, still dry season",
          "November–April wet season prices can make a previously unaffordable resort possible",
        ],
      },
      {
        heading: "How to visit Bora Bora on a budget",
        body: "The standard resort experience starts at $600–800/night before food and activities. But the island has another mode: pension guesthouses on the main island and motus, accessible by small boat ferries (the only public transport). Chez Rosine, Rohotu Fare Lodge, and Motu Tapu offer authentic Polynesian guesthouses for $120–200/night with breakfast. Renting a bicycle ($10/day) to circumnavigate the main island, snorkelling from public beach access points, and eating at the snack bars on Vaitape are all genuinely excellent experiences that cost $20–50/day.",
        tips: [
          "Stay in a pension guesthouse and book a half-day snorkel tour — you see the same lagoon for 10% of the price",
          "Bicycle around the main island (32km) in a single morning — the views are extraordinary",
          "The 4WD mountain tour to the WWII gun emplacements above Fitiiu Point is the best land activity",
        ],
      },
      {
        heading: "What to do beyond the bungalow",
        body: "Bora Bora's lagoon is one of the finest snorkelling environments on earth — manta rays, lemon sharks, eagle rays, and blacktip reef sharks are commonly seen in the shallow sandy areas. The Coral Garden (snorkel by boat) is excellent. Deep-sea fishing, kitesurfing (the lagoon is ideal), and outrigger canoe tours all operate from the main island. The interior of the main island has excellent 4WD tours. Swimming with sharks at the Sand Bora sand bar is a genuinely unmissable experience — the sharks are completely harmless in the shallow water.",
        tips: [
          "The shark and ray snorkel tour in the lagoon is Bora Bora's single best activity — book via any pension",
          "Manta rays are most reliably seen at Manta Point on the eastern barrier reef, May–July",
          "The helicopter tour over the lagoon is expensive ($300–400) but gives the definitive perspective",
        ],
      },
    ],
    hotels: [
      { id: "four-seasons-bora-bora", name: "Four Seasons Bora Bora", tier: "luxury", badge: "Editor's Pick", pricePerNight: 1400, stars: 5, reviewScore: 9.6, reviewCount: 720, description: "The finest overwater resort on the island. Private beach motu, exceptional snorkelling directly from the water bungalows, and a spa that is among the world's best.", highlights: ["Private motu", "Best snorkelling", "World-class spa", "Overwater bungalows"], bookUrl: "#" },
      { id: "st-regis-bora-bora", name: "Le Bora Bora by Pearl Resorts", tier: "luxury", badge: "Largest Lagoon", pricePerNight: 900, stars: 5, reviewScore: 9.3, reviewCount: 980, description: "The widest lagoon frontage of any Bora Bora resort. Overwater bungalows with private pools, butler service, and views of Mount Otemanu from every room.", highlights: ["Private pool bungalows", "Butler service", "Mount Otemanu views", "Widest lagoon"], bookUrl: "#" },
      { id: "rohotu-fare", name: "Rohotu Fare Lodge", tier: "mid", pricePerNight: 185, stars: 3, reviewScore: 9.4, reviewCount: 380, description: "Authentic overwater bungalows at a fraction of resort prices. Family-run, genuinely Polynesian experience, and extraordinary lagoon access.", highlights: ["Overwater bungalows", "Family-run", "Authentic", "Lagoon access"], bookUrl: "#" },
      { id: "chez-rosine", name: "Chez Rosine", tier: "budget", pricePerNight: 95, stars: 2, reviewScore: 9.0, reviewCount: 290, description: "The best budget pension in Bora Bora — warm welcome, good breakfast, beach access, and all the lagoon tours bookable from the front desk.", highlights: ["Beach access", "Good breakfast", "Tour booking", "Authentic welcome"], bookUrl: "#" },
    ],
    relatedSlugs: ["maldives", "hawaii", "phuket"],
  },

  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    tagline: "Where Europe meets Asia — mosques, hammams, and the Bosphorus",
    heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Istanbul? Our guide covers the Blue Mosque, Grand Bazaar, Bosphorus cruise, when to visit, and our honest hotel picks for 2025.",
    quickFacts: {
      bestTime: "April – May, September – October",
      currency: "Turkish Lira (TRY)",
      language: "Turkish (English in tourist areas)",
      timezone: "TRT (UTC+3)",
      avgBudget: "$60–$200 per day (excellent value)",
      visaRequired: "e-Visa required (UK, US, EU, AU — approx $35–50, apply online)",
      flightFrom: "~3.5 hrs from London, ~10 hrs from New York",
    },
    intro: "Istanbul is the only city in the world that spans two continents — the Bosphorus strait separates European Istanbul (Sultanahmet, Beyoğlu) from Asian Istanbul (Kadıköy, Üsküdar), with a ferry crossing of 15 minutes between them. The city was the capital of three of history's greatest empires: Roman (Byzantium), Byzantine, and Ottoman. The Hagia Sophia alone would justify the trip — 1,500 years old, converted mosque-cathedral-museum-mosque again, and still breathtaking. Istanbul is also exceptional value by European standards, with extraordinary food, hospitality, and culture.",
    sections: [
      {
        heading: "Istanbul's key areas",
        body: "Sultanahmet is the historic heart — Hagia Sophia, Blue Mosque, Topkapi Palace, and the Grand Bazaar are all within walking distance. Very touristy but unavoidably magnificent. Beyoğlu (across the Golden Horn) is the modern, cosmopolitan quarter — İstiklal Avenue, Cihangir neighbourhood, Taksim Square, and the best restaurants and bars. Karaköy is the design and coffee neighbourhood — rapidly gentrifying, Istanbul's most interesting area for food right now. Crossing to the Asian side (Kadıköy by ferry) reveals a more local Istanbul — excellent markets, cafés, and the best street food.",
        tips: [
          "Book Hagia Sophia and Topkapi Palace online — the queues for walk-up tickets are brutally long in peak season",
          "Cross to Kadıköy on the Asian side for lunch — 20-minute ferry and the best köfte and börek in the city",
          "Cihangir neighbourhood in Beyoğlu is where expats and creative Istanbullus live — the best breakfast spots",
        ],
      },
      {
        heading: "When to visit Istanbul",
        body: "April–May and September–October are the ideal months: 18–24°C, the city fully energised, and crowds manageable. July and August are hot (30–33°C) and crowded with international tourists — still fine but not the best experience. January–February is cool (6–10°C) and occasionally rainy but prices drop 30–40% and the major sights are almost crowd-free. Ramadan evenings transform the area around the Blue Mosque into an extraordinary festival — the İftar meal at dusk is a highlight.",
        tips: [
          "April sees tulips blooming across the city — Istanbul's Ottoman heritage includes an obsession with tulips",
          "September is the best overall month: warm sea, summer crowds gone, Istanbul at its most civilised pace",
          "Ramadan İftar in Sultanahmet (timing shifts yearly) is one of the most atmospheric dining experiences in the world",
        ],
      },
      {
        heading: "Getting around Istanbul",
        body: "Istanbul's transport system is extensive but complex. The metro covers Taksim and the main European districts. The nostalgic tramway (Tram 1) runs down İstiklal Avenue to Sultanahmet. The Marmaray tunnel crosses under the Bosphorus to the Asian side. But the true Istanbul transport is the ferry — the Şehir Hatları ferries crossing the Bosphorus, to the Princes' Islands, and along the Golden Horn are cheap, scenic, and a genuine urban experience. The İstanbulkart (transport card) covers all public transport modes.",
      },
      {
        heading: "Turkish food, çay, and the Grand Bazaar",
        body: "Turkish cuisine is one of the world's great food traditions — köfte, döner (the original version bears no resemblance to the European export), lahmacun (Turkish flatbread pizza), meze arrays, fresh-caught Bosphorus fish at Karaköy, and baklava made fresh at every patisserie. Breakfast (kahvaltı) is a full table spread — cheeses, olives, eggs, and çay (tea) in small tulip-shaped glasses. The Grand Bazaar (4,000 shops, 500 years old) is for jewellery, ceramics, leather, and spices — bargain for everything. The Spice Bazaar (Egyptian Market) is smaller and more atmospheric for food shopping.",
        tips: [
          "Breakfast at Van Kahvaltı Evi in Cihangir is the definitive Istanbul kahvaltı experience — 2-hour spread, arrive early",
          "Karaköy Güllüoğlu is the finest baklava in Istanbul — buy by the kilo and eat immediately",
          "Fish sandwiches (balık ekmek) from the boats beneath the Galata Bridge cost $2 and are genuinely delicious",
        ],
      },
    ],
    hotels: [
      { id: "four-seasons-istanbul-bosphorus", name: "Four Seasons Bosphorus", tier: "luxury", badge: "Best View", pricePerNight: 480, stars: 5, reviewScore: 9.5, reviewCount: 1340, description: "A 19th-century Ottoman palace on the European shore of the Bosphorus. Room views of the strait, ferries passing below, and suites opening onto private terraces.", highlights: ["Bosphorus views", "19th-century palace", "Private terraces", "Waterfront pool"], bookUrl: "#" },
      { id: "ciragan-palace", name: "Çırağan Palace Kempinski", tier: "luxury", badge: "Most Opulent", pricePerNight: 520, stars: 5, reviewScore: 9.4, reviewCount: 1890, description: "A restored 1860s Ottoman sultan's palace on the Bosphorus — the most historically significant hotel in Istanbul, with the most dramatic outdoor pool in the city.", highlights: ["1860s Sultan's palace", "Bosphorus pool", "Ottoman heritage", "Historic suites"], bookUrl: "#" },
      { id: "witt-istanbul", name: "Witt Istanbul Suites", tier: "mid", pricePerNight: 95, stars: 4, reviewScore: 9.0, reviewCount: 1600, description: "Suite-only boutique in Cihangir — Bosphorus views from every suite, self-catering kitchen, and the best location for exploring the non-touristy Istanbul.", highlights: ["Suite-only", "Bosphorus views", "Cihangir location", "Self-catering"], bookUrl: "#" },
      { id: "marmara-guesthouse", name: "Marmara Guesthouse", tier: "budget", pricePerNight: 30, stars: 2, reviewScore: 8.6, reviewCount: 2100, description: "Well-run budget guesthouse in Sultanahmet, rooftop terrace with Blue Mosque views, and genuinely helpful family management.", highlights: ["Blue Mosque views", "Rooftop terrace", "Sultanahmet location", "Family-run"], bookUrl: "#" },
    ],
    relatedSlugs: ["marrakech", "santorini", "dubai"],
  },

  {
    slug: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    tagline: "The adventure capital of the world — fjords, skiing, and bungee jumping",
    heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Queenstown? Our guide covers Milford Sound, skiing at Remarkables, bungee jumping, Fiordland, when to visit, and hotel picks.",
    quickFacts: {
      bestTime: "December – February (summer), June – September (ski season)",
      currency: "New Zealand Dollar (NZD)",
      language: "English, Māori",
      timezone: "NZST (UTC+12), NZDT (UTC+13 summer)",
      avgBudget: "$120–$350 per day",
      visaRequired: "NZeTA required (UK/US/EU/AU — NZD $23, apply online)",
      flightFrom: "~24 hrs from London, ~20 hrs from New York (via Sydney/Auckland)",
    },
    intro: "Queenstown sits on the shores of Lake Wakatipu beneath the jagged Remarkables mountain range — a setting so dramatically beautiful that it has become the world's adventure tourism capital entirely on merit. Bungee jumping was invented here (AJ Hackett, 1988). The world's greatest skydive (over the Remarkables) operates year-round. Milford Sound — universally described as the 'eighth wonder of the world' — is four hours away by car or 45 minutes by scenic flight. Queenstown is also the gateway to the Otago wine region (Pinot Noir of extraordinary quality) and the Fiordland National Park.",
    sections: [
      {
        heading: "Summer vs winter: which season is right for you?",
        body: "Queenstown is genuinely excellent in both seasons. Summer (December–February) brings hiking, lake swimming, wine country cycling, and outdoor adventures in long daylight (up to 16 hours). The Milford Sound drive and the Routeburn Track are best in summer. Winter (June–September) brings world-class skiing at Coronet Peak, The Remarkables, Cardrona, and Treble Cone — four excellent ski areas within 30–60 minutes of town. Winter also has its own beauty — snow-dusted mountains, warm bars, and a cosy intimacy in the town.",
        tips: [
          "July and August offer the best snow conditions at the four ski areas — book lift passes and accommodation months ahead",
          "December and January are the longest days and warmest water for lake swimming and kayaking",
          "The shoulder seasons (March–May, October–November) have the best prices and fewest crowds",
        ],
      },
      {
        heading: "Milford Sound and Fiordland",
        body: "Milford Sound is a non-negotiable on any South Island itinerary. The classic approach is the 4-hour drive from Queenstown through Fiordland National Park — the last 30km through the Homer Tunnel is itself extraordinary. Book a cruise on the fiord (2 hours, multiple operators) and stay overnight if possible: Milford Sound Lodge is the only accommodation, and the fiord at dawn after the day-trippers leave is genuinely otherworldly. Alternatively, fly (30 min scenic flight from Queenstown, $230–300) — the aerial view of Fiordland is unmissable.",
        tips: [
          "Overnight in Milford Sound Lodge — the fiord at dawn with no day tourists is the finest experience in New Zealand",
          "Kayaking on Milford Sound (full day, $190–220) gets you closer to the waterfalls and cliff faces than any cruise",
          "The scenic helicopter to Milford and cruise back by coach is the perfect combination",
        ],
      },
      {
        heading: "Adventures in Queenstown",
        body: "Queenstown offers almost every adventure activity in a single small town: bungee jumping (original Kawarau Bridge, 43m or Nevis, 134m), skydiving (from 4,500m over the Remarkables), jetboating (Shotover Canyon), white-water rafting (Shotover River), paragliding (from Coronet Peak), and canyon swinging (Nevis Canyon). A full day of adventure activities costs $300–500. AJ Hackett is the bungee operator — the original Kawarau Bridge bungee is more scenic, the Nevis more extreme.",
        tips: [
          "Book all adventure activities online before you arrive — sold-out days are common in summer",
          "The Nevis Bungee (134m) is the most extreme experience in New Zealand — not for the mildly curious",
          "Paragliding from Coronet Peak (tandem, $199) gives the best Queenstown aerial perspective",
        ],
      },
      {
        heading: "Otago Pinot and the food scene",
        body: "The Otago wine region produces some of the Southern Hemisphere's finest Pinot Noir — the combination of altitude, schist soils, and diurnal temperature variation creates wines of extraordinary precision. Amisfield, Peregrine, and Rippon are the three best estates with excellent restaurants. Queenstown's own food scene has grown with the tourism — Rata (by Josh Emett) and Flame are serious restaurants. The Remarkables Park Town Centre and the Lakefront boardwalk have the best casual dining. Budget travellers eat well on $25–35/day at the burger joints and food trucks.",
        tips: [
          "Book an Amisfield winery lunch in advance — the courtyard in summer is one of the finest dining settings in the country",
          "Peregrine winery has the most architectural cellar door in the region — worth visiting for the building alone",
          "Fergburger (the legendary Queenstown burger institution) has a 30-minute queue but genuinely justifies it",
        ],
      },
    ],
    hotels: [
      { id: "matakauri-lodge", name: "Matakauri Lodge", tier: "luxury", badge: "Editor's Pick", pricePerNight: 720, stars: 5, reviewScore: 9.8, reviewCount: 290, description: "New Zealand's finest lodge — 12 suites above Lake Wakatipu with the Remarkables as a backdrop. Extraordinary service, private lake access, and the best view in Queenstown.", highlights: ["Lake Wakatipu views", "12 suites only", "Remarkables backdrop", "Private lake access"], bookUrl: "#" },
      { id: "eichardt-queenstown", name: "Eichardt's Private Hotel", tier: "luxury", badge: "Most Historic", pricePerNight: 420, stars: 5, reviewScore: 9.5, reviewCount: 480, description: "Queenstown's most atmospheric hotel — an 1860s lakefront building with 5 suites and a legendary lakefront bar. The finest address in the town centre.", highlights: ["1860s lakefront", "5 suites only", "Legendary bar", "Town centre"], bookUrl: "#" },
      { id: "heartland-queenstown", name: "Heartland Hotel Queenstown", tier: "mid", pricePerNight: 95, stars: 3, reviewScore: 8.6, reviewCount: 1900, description: "Good value hotel with mountain views, walking distance to the main street, and the best-priced pool with lake panorama in town.", highlights: ["Mountain views", "Pool", "Central location", "Good value"], bookUrl: "#" },
      { id: "absoloot-hostel", name: "Absoloot Value Accommodation", tier: "budget", pricePerNight: 22, stars: 2, reviewScore: 8.5, reviewCount: 2800, description: "Consistently rated the best hostel in Queenstown — lake views, great common areas, and the best location for the town centre and adventure booking offices.", highlights: ["Lake views", "Central location", "Adventure booking", "Social atmosphere"], bookUrl: "#" },
    ],
    relatedSlugs: ["bora-bora", "bali", "cape-town"],
  },

  {
    slug: "hawaii",
    name: "Hawaii",
    country: "USA",
    tagline: "Active volcanoes, world-class surf, and the most remote island chain on earth",
    heroImage: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Hawaii? Our guide covers which island to choose, when to visit, the Big Island volcanoes, Maui beaches, and our honest hotel picks.",
    quickFacts: {
      bestTime: "April – May, September – November (shoulder season)",
      currency: "US Dollar (USD)",
      language: "English, Hawaiian",
      timezone: "HST (UTC−10)",
      avgBudget: "$200–$600 per day",
      visaRequired: "US entry requirements apply (ESTA for most; Green Card / US citizens no visa)",
      flightFrom: "~17 hrs from London (via LAX), ~5.5 hrs from Los Angeles",
    },
    intro: "Hawaii sits in the middle of the Pacific, further from any continent than any other island group on earth — and this isolation has produced ecosystems, cultures, and landscapes found nowhere else. Choosing which island to visit is the first and most important decision: Maui has the best beaches and whale watching; the Big Island has active lava flows and the world's most accessible astronomical observatories; O'ahu has Honolulu, Diamond Head, and the North Shore's legendary surf. Kauai is the most dramatic landscape. Each is a destination in itself.",
    sections: [
      {
        heading: "Which Hawaiian island should you visit?",
        body: "O'ahu: the most accessible and most visited — Honolulu, Waikiki, Pearl Harbor, and the North Shore (the world's most famous surfing destination, Banzai Pipeline). Maui: the best all-round island — Road to Hana, Haleakalā volcano at sunrise, Lahaina town, and the finest whale watching (November–April) in the USA. Big Island: the most geologically active — Kīlauea volcano (Hawai'i Volcanoes National Park), Mauna Kea stargazing, black sand beaches, and manta ray night dives. Kaua'i: the most dramatically beautiful — the Nā Pali Coast, Waimea Canyon, and the most rugged landscapes in the archipelago.",
        tips: [
          "First-timers: split 7 nights between O'ahu (3) and Maui (4) or go Big Island for something completely different",
          "Inter-island flights are cheap and frequent — 40-minute hops make island-hopping easy",
          "Do not rent a car on O'ahu in Honolulu — public transit and rideshare is more practical in the city",
        ],
      },
      {
        heading: "When to visit Hawaii",
        body: "Hawaii is a year-round destination — temperatures range only between 24–31°C depending on season. April–May and September–November are the best shoulder months: fewer tourists, lower prices (20–30% less than peak), and still excellent weather. Peak summer (June–August) and Christmas (mid-December–January) are the most expensive and crowded periods. Winter (November–April) is whale season on Maui — humpbacks migrate from Alaska to Hawaii waters to breed, and viewing from shore or short boat trips is extraordinary.",
        tips: [
          "Humpback whales on Maui: peak season January–March — a near-guaranteed sighting from Maalaea Harbor",
          "North Shore O'ahu surf season (November–February) brings the world's biggest swells — Banzai Pipeline is unmissable",
          "Mauna Kea summit (4,205m) in the Big Island is always cold — bring proper layers even in summer",
        ],
      },
      {
        heading: "Hawaiian food and culture",
        body: "Hawaiian plate lunch culture is the food DNA of the islands: a plate with rice, macaroni salad, and a main — kalua pork, laulau, or chicken katsu — for $12–16 at any local spot. Poke (marinated raw fish in a bowl) originated here and the best poke bowls bear no resemblance to the mainland US version. Shave ice (snow cone taken to a serious art form, with real fruit syrups, ice cream base, and mochi) is the essential Hawaiian sweet. The Hawaiian food truck and plate lunch culture is the best value eating on any island.",
        tips: [
          "Poke at Foodland Farms or any local fish market costs $14–18 and is the best version you'll eat",
          "Plate lunch at Rainbow Drive-In in Honolulu is a 70-year island institution — always a queue",
          "Shave ice at Matsumoto's in Haleiwa (North Shore O'ahu) is the definitive version — go before 10am",
        ],
      },
      {
        heading: "Outdoor adventures in Hawaii",
        body: "Hawaii's outdoor activities are exceptional across all islands. Big Island: Kīlauea Caldera night glow (incredible), snorkelling with manta rays in Kona Bay (evening tour, $90–120), and Mauna Kea summit for stargazing (best telescope access in the Northern Hemisphere). Maui: Road to Hana (3-hour drive, 620 curves, 59 bridges, numerous waterfalls), Haleakalā sunrise (reserve 6 months ahead for sunrise viewing), and whale watching November–April. Kaua'i: Nā Pali Coast by zodiac boat (the most dramatic coastline in the USA, $150–200), and the Kalalau Trail (11 miles, permit required).",
        tips: [
          "Haleakalā sunrise requires a reservation (Recreation.gov) — apply 60 days ahead, they sell out instantly",
          "Manta ray night snorkel in Kona is guaranteed sightings (or refund) — one of the world's best wildlife encounters",
          "Nā Pali Coast zodiac tour from Port Allen (Kaua'i south shore) gives the best views regardless of season",
        ],
      },
    ],
    hotels: [
      { id: "four-seasons-maui", name: "Four Seasons Maui at Wailea", tier: "luxury", badge: "Editor's Pick", pricePerNight: 680, stars: 5, reviewScore: 9.5, reviewCount: 2100, description: "The benchmark Hawaiian luxury resort — on Wailea Beach, multiple pools, extraordinary whale-watching from the beach November–April, and the best service in the state.", highlights: ["Wailea Beach", "Whale watching", "Multiple pools", "Maui's best service"], bookUrl: "#" },
      { id: "hana-maui", name: "Travaasa Hana", tier: "luxury", badge: "Most Remote", pricePerNight: 380, stars: 4, reviewScore: 9.2, reviewCount: 620, description: "The only hotel at the end of the Road to Hana — a working farm, healing arts centre, and the most peaceful hotel in Hawaii. Miles from the nearest traffic.", highlights: ["End of Road to Hana", "Working farm", "Healing arts", "Complete isolation"], bookUrl: "#" },
      { id: "courtyard-oahu", name: "Courtyard Waikiki Beach", tier: "mid", pricePerNight: 185, stars: 3, reviewScore: 8.6, reviewCount: 3400, description: "Reliable mid-range option on Waikiki — steps from the beach, rooftop pool, and the most practical base for O'ahu with the best price-to-location ratio.", highlights: ["Waikiki Beach steps", "Rooftop pool", "O'ahu access", "Practical base"], bookUrl: "#" },
      { id: "polynesian-hostel-hawaii", name: "Polynesian Hostel Beach Club", tier: "budget", pricePerNight: 55, stars: 2, reviewScore: 8.4, reviewCount: 1800, description: "The best budget option in Waikiki — direct beach access, social vibe, surfboard rental, and the cheapest dorm beds you'll find anywhere near Waikiki.", highlights: ["Beach access", "Surfboard rental", "Social vibe", "Waikiki"], bookUrl: "#" },
    ],
    relatedSlugs: ["bora-bora", "queenstown", "maldives"],
  },

  {
    slug: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    tagline: "Lantern-lit old quarter, pho at dawn, and the gateway to Ha Long Bay",
    heroImage: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Hanoi? Our guide covers the Old Quarter, Hoan Kiem Lake, Ha Long Bay cruises, Vietnamese food, when to visit, and our hotel picks.",
    quickFacts: {
      bestTime: "October – April (cooler and drier)",
      currency: "Vietnamese Dong (VND)",
      language: "Vietnamese (some English in tourist areas)",
      timezone: "ICT (UTC+7)",
      avgBudget: "$35–$150 per day",
      visaRequired: "e-Visa (most nationalities, $25, 90 days) or visa-free eligible",
      flightFrom: "~11 hrs from London, ~22 hrs from New York",
    },
    intro: "Hanoi is Vietnam's capital — a city of lakes, French colonial boulevards, and a 36-street Old Quarter that maps directly onto a medieval trading city of guilds and workshops. The city operates at a rhythm that rewards slow exploration: pho for breakfast at 6am from a street stall with four plastic stools, coffee in a centuries-old Vietnamese café, the Old Quarter's architecture absorbing the chaos of motorbikes below. It is also the launch point for the Vietnamese north's greatest natural spectacle — Ha Long Bay, three hours east, where 3,000 limestone karst islands rise from an emerald sea.",
    sections: [
      {
        heading: "The Old Quarter and Hoan Kiem Lake",
        body: "Hanoi's 36 Streets Old Quarter — each street historically named for the guild it hosted (Silk Street, Paper Street, Tin Street) — is one of Southeast Asia's most atmospheric urban environments. It is genuinely hectic by day; the motorbike density requires a different mode of pedestrian movement. Hoan Kiem Lake at the Old Quarter's edge is the city's spiritual and social centre — the Turtle Tower in its middle, the Ngoc Son Temple on an island connected by the red Huc Bridge. The lake's perimeter at dawn (6am, Vietnamese exercise culture in full swing) and dusk is the finest free experience in Hanoi.",
        tips: [
          "Walk the Old Quarter at 6am — the light is extraordinary, the traffic manageable, and the breakfast stalls just opening",
          "The weekend night market (Friday–Sunday evening, Hang Dao Street) is the Old Quarter at its most festive",
          "The Huc Bridge at sunrise takes 3 minutes to cross and is one of the most photogenic spots in Vietnam",
        ],
      },
      {
        heading: "When to visit Hanoi",
        body: "October–April is the prime window. October–December: warm and mostly dry (24–28°C), considered the best months. January–February: cool (15–18°C) and dry, excellent for sightseeing though Tết (Vietnamese New Year, late January/February) closes much of the city for a week. March–April: warming up, occasional light rain, and spring blossom. May–September: hot (35–38°C) and the rainy season — heavy but unpredictable downpours. Tết is the most important Vietnamese festival — the week before is the most festive, the week of is very quiet.",
        tips: [
          "October is the best month overall — dry, not too hot, after summer tourist peak",
          "Tết timing shifts yearly — the week before is the most atmospheric time to visit Hanoi",
          "Avoid August — the hottest, most humid, and wettest month",
        ],
      },
      {
        heading: "Ha Long Bay: which cruise to book",
        body: "Ha Long Bay (UNESCO World Heritage since 1994) is Vietnam's most visited natural site — 3,000 limestone islands rising from an emerald bay, some hiding cave systems. The quality of cruises varies enormously: a 2-day/1-night cruise (the minimum worth doing) ranges from $80 (budget party boat) to $450 (boutique junk with kayaking, cooking class, and cave exploration). Cat Ba Island (in the middle of the bay) offers an alternative base for day boat trips at a fraction of cruise prices. Lan Ha Bay (adjacent, less visited) is increasingly the insider choice for fewer crowds.",
        tips: [
          "Book a mid-range cruise ($180–300 for 2 days) — the budget boats are overcrowded and the cheap food is poor",
          "Lan Ha Bay is quieter and equally beautiful to Ha Long — and 30% cheaper",
          "Kayaking through the floating fishing villages at dawn is the single best experience on any Ha Long cruise",
        ],
      },
      {
        heading: "Vietnamese food in Hanoi",
        body: "Hanoi's food culture is distinct from Ho Chi Minh City's — northern Vietnamese cuisine is less sweet, more restrained, and refined. Pho bò (beef noodle soup) originated in Hanoi; the best is at Pho Bat Dan and Pho Thin on Dinh Tien Hoang Street, where it has been served the same way for 60+ years. Bún chả (the dish Obama ate with Anthony Bourdain) is the iconic Hanoian lunch — grilled pork with vermicelli and dipping sauce. Banh mi is the French colonial legacy done perfectly. Budget: $5–8 per meal at street level, $15–25 at a reputable restaurant.",
        tips: [
          "Pho Thin (Dinh Tien Hoang St) serves the most famous pho in Hanoi — arrive before 7am or queue",
          "The Obama/Bourdain bún chả spot (Bún Chả Hương Liên) has been preserved as a shrine — genuinely good food too",
          "Egg coffee (cà phê trứng) at Cafe Giang on Nguyen Huu Huan is Hanoi's most distinctive drink",
        ],
      },
    ],
    hotels: [
      { id: "sofitel-metropole", name: "Sofitel Legend Metropole Hanoi", tier: "luxury", badge: "Most Historic", pricePerNight: 280, stars: 5, reviewScore: 9.5, reviewCount: 2100, description: "Built in 1901 — the most historically significant hotel in Southeast Asia. Graham Greene wrote part of The Quiet American here. Underground WWII bunker tours included.", highlights: ["1901 colonial", "Graham Greene's hotel", "WWII bunker", "Old Quarter edge"], bookUrl: "#" },
      { id: "lotte-hanoi", name: "Lotte Hotel Hanoi", tier: "luxury", badge: "Best View", pricePerNight: 155, stars: 5, reviewScore: 9.0, reviewCount: 3400, description: "65-storey tower with a rooftop observation deck and pool. Panoramic views of the entire city and West Lake — excellent value for the standard of luxury.", highlights: ["65th-floor pool", "City panorama", "West Lake views", "Great value luxury"], bookUrl: "#" },
      { id: "hanoi-la-siesta", name: "Hanoi La Siesta Hotel & Spa", tier: "mid", pricePerNight: 55, stars: 4, reviewScore: 9.2, reviewCount: 2800, description: "Excellent boutique hotel in the Old Quarter — consistently one of Hanoi's best value mid-range stays. Spa, rooftop bar, and genuinely attentive service.", highlights: ["Old Quarter", "Spa", "Rooftop bar", "Best value mid-range"], bookUrl: "#" },
      { id: "hanoi-backpackers", name: "Hanoi Backpackers' Hostel", tier: "budget", pricePerNight: 10, stars: 1, reviewScore: 8.5, reviewCount: 4200, description: "Hanoi's legendary backpacker institution — excellent Ha Long Bay tour desk, great social scene, and the cheapest beds in the Old Quarter.", highlights: ["Old Quarter", "Ha Long Bay tours", "Social scene", "Best value"], bookUrl: "#" },
    ],
    relatedSlugs: ["bangkok", "bali", "singapore"],
  },

  {
    slug: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    tagline: "Northern lights, geysers, and the midnight sun at the edge of the Arctic",
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Reykjavik and Iceland? Our guide covers the Northern Lights, Golden Circle, Blue Lagoon, when to visit, and our honest hotel picks.",
    quickFacts: {
      bestTime: "June – August (midnight sun), September – March (Northern Lights)",
      currency: "Icelandic Króna (ISK)",
      language: "Icelandic (English universally spoken)",
      timezone: "GMT (UTC+0, no summer time)",
      avgBudget: "$200–$500 per day",
      visaRequired: "Schengen (visa-free 90 days for most)",
      flightFrom: "~3 hrs from London, ~6 hrs from New York",
    },
    intro: "Iceland is one of the most extraordinary landscapes on earth — a country formed by active volcanism and covered in glaciers, lava fields, geysers, hot springs, and waterfalls. Reykjavik, the world's most northerly capital, is a compact, design-forward city of 130,000 that serves as the base for exploring the island. The question is not whether Iceland is worth visiting — it is — but choosing the right season. The midnight sun of summer (June–August) and the Northern Lights of winter (September–March) are equally compelling, and completely different experiences.",
    sections: [
      {
        heading: "Northern Lights vs Midnight Sun: which season?",
        body: "The Northern Lights (aurora borealis) are visible September–March in Iceland — you need clear skies, darkness, and solar activity. September and October have longer nights than summer but before the deepest winter, and are statistically good for sightings. January–February has the most darkness but also the harshest weather. The Midnight Sun (June–August) gives 24 hours of usable daylight — hiking waterfalls at midnight, driving the Ring Road without needing to stop, and a landscape bathed in golden light at 2am. Choose based on which experience means more to you.",
        tips: [
          "Download the Vedur.is app for Northern Lights forecasts — it gives real-time cloud cover and solar activity",
          "Drive 30+ minutes from Reykjavik to escape light pollution for Northern Lights viewing",
          "The Midnight Sun in June means you genuinely need blackout curtains to sleep",
        ],
      },
      {
        heading: "The Golden Circle and beyond",
        body: "The Golden Circle is Iceland's most accessible day trip from Reykjavik — 300km loop covering Þingvellir National Park (where the North American and Eurasian tectonic plates meet at the surface), Geysir (the original geyser, erupting every 5–10 minutes), and Gullfoss (a double-tiered waterfall of extraordinary power). Other essential Iceland experiences: the Blue Lagoon geothermal spa (book months ahead), the South Coast (Seljalandsfoss, Skógafoss, Reynisfjara black sand beach), and the Snæfellsnes Peninsula (the most diverse landscapes in a single day's drive).",
        tips: [
          "Book Blue Lagoon months in advance — it sells out constantly and walk-up is not possible",
          "The Golden Circle self-drive takes 7–8 hours at a comfortable pace — leave Reykjavik by 8am",
          "Seljalandsfoss waterfall (South Coast) can be walked behind — bring waterproofs, go at golden hour",
        ],
      },
      {
        heading: "Getting around Iceland",
        body: "Reykjavik itself is walkable for the compact city centre. Beyond the city, a rental car is the only way to experience Iceland's landscape with any freedom. The Ring Road (Route 1) circles the entire country — 1,332km, typically done in 7–10 days. Petrol/gas stations are sparse in the highlands — fill up whenever you can. Winter driving requires proper tyres (studded or all-terrain) and more time — ice and snow change everything. Organised tours operate from Reykjavik for the main sites if you prefer not to drive. Domestic flights (Air Iceland) reach the north and east quickly.",
      },
      {
        heading: "Reykjavik's food and bar scene",
        body: "Reykjavik's restaurant scene punches far above its small population. Dill (Nordic cuisine, Michelin-starred), Fiskfélagið (the Fish Company, excellent seafood), and Matur og Drykkur (traditional Icelandic reimagined) are the three best. Icelandic lamb is world-class — farmed free-range on the highland interior. Arctic char, langoustine, and skyr (Icelandic yogurt) are the local specialities. The hot dog from Bæjarins Beztu Pylsur (the stand outside the bus station) is Iceland's most loved quick meal — Bill Clinton ate one in 2004, creating a minor national moment.",
        tips: [
          "Bæjarins Beztu hot dog stand has been at the bus station since 1937 — order with 'everything' (with remoulade, mustard, ketchup, fried onion, raw onion)",
          "Book Dill restaurant 6+ weeks ahead — it's Iceland's most celebrated restaurant and fills completely",
          "Icelandic lamb skewer at Grillmarket is the best single plate of food in the city",
        ],
      },
    ],
    hotels: [
      { id: "ion-adventure", name: "ION Adventure Hotel", tier: "luxury", badge: "Most Dramatic", pricePerNight: 380, stars: 4, reviewScore: 9.4, reviewCount: 680, description: "Perched on a lava field 45 minutes from Reykjavik — the Northern Lights visible from the hot tubs, surrounded by Þingvellir National Park. Extraordinary.", highlights: ["Northern Lights hot tubs", "Lava field setting", "Þingvellir proximity", "Restaurant"], bookUrl: "#" },
      { id: "hotel-borg", name: "Hotel Borg", tier: "luxury", badge: "Most Iconic", pricePerNight: 280, stars: 5, reviewScore: 9.1, reviewCount: 1200, description: "Reykjavik's oldest luxury hotel (1930), directly on Austurvöllur Square. Art Deco interiors, impeccable service, and the most central address in the city.", highlights: ["1930 Art Deco", "Austurvöllur Square", "Central address", "Historic prestige"], bookUrl: "#" },
      { id: "center-hotels-reykjavik", name: "Center Hotels Miðgarður", tier: "mid", pricePerNight: 130, stars: 3, reviewScore: 8.7, reviewCount: 1900, description: "Centrally located mid-range hotel on Laugavegur — the main shopping and restaurant street. Practical, clean, and the best value for the location.", highlights: ["Laugavegur location", "Central", "Good value", "Clean rooms"], bookUrl: "#" },
      { id: "kex-hostel", name: "KEX Hostel", tier: "budget", pricePerNight: 35, stars: 2, reviewScore: 8.6, reviewCount: 2800, description: "Reykjavik's most characterful hostel — a former biscuit factory on the harbour, with a bar, live music, excellent food, and private rooms available.", highlights: ["Former biscuit factory", "Harbour location", "Live music bar", "Private rooms"], bookUrl: "#" },
    ],
    relatedSlugs: ["amsterdam", "cape-town", "queenstown"],
  },

  {
    slug: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    tagline: "Aztec ruins, world-class tacos, and the Americas' most dynamic food city",
    heroImage: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Mexico City? Our guide covers Roma, Condesa, the best tacos, Teotihuacán, when to visit, and our honest hotel picks.",
    quickFacts: {
      bestTime: "November – April (dry season)",
      currency: "Mexican Peso (MXN)",
      language: "Spanish (some English in tourist areas)",
      timezone: "CST (UTC−6), CDT summer",
      avgBudget: "$60–$200 per day",
      visaRequired: "Visa-free (180 days, US, Canada, EU, UK, AU)",
      flightFrom: "~11 hrs from London, ~5 hrs from New York",
    },
    intro: "Mexico City is the Americas' most exciting food destination and one of its great cultural capitals — a megacity of 22 million people that contains Aztec ruins beneath its colonial centre, the world's largest urban museum (the Anthropology Museum), a taco culture of extraordinary depth and seriousness, and a neighbourhood-by-neighbourhood creative energy that has attracted a wave of international artists, chefs, and travellers. The city sits at 2,240 metres altitude — jet-lagged visitors feel the thin air the first day, then acclimatise and never want to leave.",
    sections: [
      {
        heading: "Mexico City's best neighbourhoods",
        body: "Roma Norte is the most fashionable neighbourhood right now — Art Nouveau houses converted into excellent coffee shops, galleries, and restaurants. Condesa is Roma's tree-lined sibling — Art Deco buildings, outdoor café culture, and the best park (Parque España) for people-watching. Polanco is Mexico City's Beverly Hills equivalent — luxury hotels, Avenida Presidente Masaryk boutiques, and the Antara mall. Centro Histórico is the historic core — the Zócalo, the Metropolitan Cathedral, the Templo Mayor Aztec ruins, and the best taco markets. Coyoacán is where Frida Kahlo lived and still preserves a village-within-the-city character.",
        tips: [
          "Roma Norte and Condesa are the two best bases — walkable between each other, excellent food and café culture",
          "Coyoacán on a Sunday (Mercado de Artesanías, Frida Kahlo Museum area) is Mexico City's finest afternoon",
          "Centro Histórico is best explored Monday–Friday when it operates as a real city rather than just a tourist zone",
        ],
      },
      {
        heading: "When to visit Mexico City",
        body: "The dry season (November–April) is the best period: clear skies, minimal rain, and 18–24°C temperatures. November, February, and March are the sweet spots — after the rainy season and before the hottest months. The rainy season (June–October) brings afternoon downpours (rarely all-day rain) and grey skies — perfectly manageable but less beautiful. Día de Muertos (November 1–2) is one of Mexico City's most spectacular celebrations — the Mixquic neighbourhood and the Zócalo transform completely.",
        tips: [
          "Día de Muertos (November 1–2) in Mexico City is one of the world's great living cultural experiences",
          "March is ideal: dry, mild, and the city's best restaurant season as chefs return from winter travels",
          "Altitude note: drink extra water, avoid alcohol the first 24 hours, and take it easy on arrival",
        ],
      },
      {
        heading: "The taco and food culture",
        body: "Mexico City's food scene is the best in the Americas. The taco culture alone would justify the visit: tacos al pastor (spit-roasted pork with pineapple, originated in the city), birria, carnitas, and barbacoa are the canonical forms. El Vilsito (a mechanic's workshop by day, legendary taco al pastor stand by night) and Los Cocuyos in the Centro Histórico are two of the most famous. At the restaurant level, Quintonil and Pujol have repeatedly placed in the World's 50 Best — extraordinary Mexican fine dining that costs a fraction of equivalent European restaurants.",
        tips: [
          "El Vilsito (Narvarte neighbourhood) at midnight serves the finest tacos al pastor in the city",
          "Mercado de San Juan is the best single food market in the city — Japanese wagyu beef, quesillo, and ceviche tostadas",
          "Pujol book 2 months ahead for the Taco Omakase bar — $80 per person, genuinely revelatory",
        ],
      },
      {
        heading: "Teotihuacán and day trips",
        body: "Teotihuacán — the pre-Aztec city of the gods, 50km northeast of Mexico City — is the most important archaeological site in North America. The Pyramid of the Sun (the third-largest pyramid on earth) and the Avenue of the Dead are extraordinary at any time, but dawn (before the tour buses arrive) transforms the site entirely. Take an early bus from Terminal del Norte (1 hour, $5) and be at the Pyramid of the Sun steps by 8am. The Anthropology Museum in Chapultepec Park is the world's finest collection of Mesoamerican artefacts — allow a full day.",
        tips: [
          "Teotihuacán at 8am is one of the finest experiences in Mexico — tour buses don't arrive until 10am",
          "Take the public bus from Terminal del Norte rather than an organised tour — faster, cheaper, and more authentic",
          "The Anthropology Museum (Museo Nacional de Antropología) requires at least 4 hours — visit on a Tuesday when free for Mexicans (still open to all)",
        ],
      },
    ],
    hotels: [
      { id: "hotel-carlota", name: "Hotel Carlota", tier: "luxury", badge: "Editor's Pick", pricePerNight: 175, stars: 4, reviewScore: 9.4, reviewCount: 780, description: "The finest boutique hotel in Roma Norte — pool lined with murals, Mexico City's best hotel garden, and a restaurant that anchors the neighbourhood's creative scene.", highlights: ["Mural-lined pool", "Garden restaurant", "Roma Norte", "Design masterpiece"], bookUrl: "#" },
      { id: "downtown-hotel-cdmx", name: "Downtown Mexico", tier: "luxury", badge: "Most Historic", pricePerNight: 145, stars: 4, reviewScore: 9.3, reviewCount: 1200, description: "A 17th-century palace in the Centro Histórico converted into a design hotel with a rooftop bar overlooking the Metropolitan Cathedral. The most atmospheric address in the city.", highlights: ["17th-century palace", "Cathedral views", "Rooftop bar", "Centro location"], bookUrl: "#" },
      { id: "chaya-condesa", name: "Chaya Hotel Boutique Condesa", tier: "mid", pricePerNight: 80, stars: 3, reviewScore: 8.9, reviewCount: 980, description: "Excellent value boutique in Condesa — beautiful Art Deco building, small pool, rooftop terrace, and the best location for exploring Roma and Condesa.", highlights: ["Art Deco building", "Pool", "Rooftop terrace", "Condesa location"], bookUrl: "#" },
      { id: "hostel-suites-df", name: "Hostel Suites DF", tier: "budget", pricePerNight: 15, stars: 1, reviewScore: 8.5, reviewCount: 2400, description: "Mexico City's best-reviewed budget hostel — safe, social, excellent staff, and a rooftop terrace with city views in the Zona Rosa neighbourhood.", highlights: ["Rooftop terrace", "City views", "Safe location", "Expert local advice"], bookUrl: "#" },
    ],
    relatedSlugs: ["havana", "rio-de-janeiro", "miami"],
  },

  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    tagline: "Carnival, Cristo Redentor, and the world's most dramatic city beaches",
    heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Rio de Janeiro? Our guide covers Carnaval, Copacabana, Ipanema, Sugarloaf, Cristo Redentor, when to visit, and our honest hotel picks.",
    quickFacts: {
      bestTime: "May – October (cooler and less rainy)",
      currency: "Brazilian Real (BRL)",
      language: "Portuguese",
      timezone: "BRT (UTC−3)",
      avgBudget: "$80–$300 per day",
      visaRequired: "Visa-free (90 days, US, UK, EU, AU from 2024)",
      flightFrom: "~11 hrs from London, ~10 hrs from New York",
    },
    intro: "Rio de Janeiro is one of the world's most dramatically beautiful cities — Sugarloaf Mountain rising from Guanabara Bay, Cristo Redentor on Corcovado Mountain overlooking everything, and Copacabana and Ipanema beaches stretching in perfect arcs against the Atlantic. It is also a city of extraordinary contrasts: beachfront luxury alongside some of Latin America's most densely populated favelas, a sophisticated Zona Sul cultural life alongside the raw exuberance of Carnaval. Understanding that contrast, rather than avoiding it, is the key to a meaningful visit.",
    sections: [
      {
        heading: "Rio's key areas and neighbourhoods",
        body: "Zona Sul is where most visitors live: Ipanema (more upscale, sophisticated, the best beach for swimming and people-watching), Copacabana (more democratic, noisier, great people-watching of a different kind), Leblon (the most affluent, quietest, and best restaurants), and Barra da Tijuca (modern suburb, less atmospheric). Santa Teresa is Rio's most characterful neighbourhood — a hillside village of colonial houses, art galleries, and excellent bars, reached by historic tram. Lapa is the nightlife neighbourhood — forró, samba bars, and the famous Escadaria Selarón mosaic staircase.",
        tips: [
          "Stay in Ipanema or Leblon — they have the best beaches, best restaurants, and are safest for visitors",
          "The Lapa Arches (Saturday night, from 10pm) is the most electric free nightlife in South America",
          "Santa Teresa by tram on a Sunday morning, ending at Bar do Mineiro for feijoada, is Rio at its most authentic",
        ],
      },
      {
        heading: "When to visit Rio",
        body: "May–October is the cooler, drier shoulder and low season — 22–28°C, less humidity, and lower prices. November–April is the hot, rainy season — intense afternoon storms but also Carnaval (February/March). Carnaval timing shifts yearly (before Ash Wednesday) — the sambadrome parade is the ticket event of the year for any visitor willing to pay. December and January are expensive and humid. The best balance is September–October: warm beach weather, minimal rain, and 30–40% cheaper than Carnaval season.",
        tips: [
          "Carnaval tickets for the Sambadrome sell out months in advance — buy through official sources only (Rio Carnival official website)",
          "June/July is Rio's winter — the beach is still excellent (25°C) but the nightlife slows slightly",
          "New Year's Eve on Copacabana (Réveillon) draws 3 million people in white to the world's largest NYE party",
        ],
      },
      {
        heading: "Safety in Rio de Janeiro",
        body: "Rio has a reputation for crime that requires calibration — the Zona Sul tourist areas (Ipanema, Copacabana, Leblon) are generally safe during daylight hours and manageable at night with the right precautions. The key rules: do not carry your passport (carry a photocopy), use only Uber or authorised taxis (never hail from the street), leave all jewellery in the hotel safe, and avoid walking through unfamiliar areas after dark. Favela visits are possible and rewarding through reputable operators — do not try to enter any favela independently. The beach requires attention — do not leave bags unattended.",
        tips: [
          "Use Uber exclusively — never hail a taxi from the street in Rio",
          "Leave all jewellery, including watches, in the hotel safe before going to the beach",
          "Favela Santa Marta or Rocinha through a reputable community operator is a worthwhile cultural experience — never independently",
        ],
      },
      {
        heading: "Cristo Redentor, Sugarloaf, and beach culture",
        body: "Cristo Redentor (Christ the Redeemer) on Corcovado Mountain is Rio's defining image — book the train or van up 2 weeks ahead and go at 8am for clear skies and no crowds. Sugarloaf (Pão de Açúcar) gives the best city panorama — two cable car stages, both extraordinary. Rio's beach culture is its own social institution: Ipanema has marked sections for families, volleyball, football, and different communities. The beach's kiosks serve fresh coconut water and caipirinhas — the order in which they are consumed is a matter of personal choice.",
        tips: [
          "Cristo Redentor at sunrise (tickets for the first 7am entry) with cloud-free views is the finest 2 hours in Rio",
          "Sugarloaf at sunset is the most photographed image in Brazil — arrive 1 hour before sunset for the best spot",
          "Ipanema beach post 4pm (when the sun drops behind the hills) is the golden hour of Rio's social beach life",
        ],
      },
    ],
    hotels: [
      { id: "belmond-copacabana", name: "Belmond Copacabana Palace", tier: "luxury", badge: "Most Iconic", pricePerNight: 580, stars: 5, reviewScore: 9.3, reviewCount: 1680, description: "The most iconic hotel in South America — a 1923 white palace directly on Copacabana Beach. The pool overlooking the beach is one of the world's great hotel views.", highlights: ["1923 white palace", "Copacabana Beach", "Pool with beach view", "South America icon"], bookUrl: "#" },
      { id: "fasano-rio", name: "Fasano Rio de Janeiro", tier: "luxury", badge: "Editor's Pick", pricePerNight: 420, stars: 5, reviewScore: 9.6, reviewCount: 920, description: "The finest hotel in Ipanema — Philippe Starck interiors, rooftop pool with Sugarloaf views, and the most sophisticated atmosphere in Rio.", highlights: ["Rooftop pool", "Sugarloaf views", "Philippe Starck", "Best Ipanema location"], bookUrl: "#" },
      { id: "arpoador-inn", name: "Arpoador Inn", tier: "mid", pricePerNight: 110, stars: 3, reviewScore: 8.8, reviewCount: 1600, description: "The only hotel directly on the Arpoador promontory — stunning views of both Copacabana and Ipanema beaches from the front rooms. Excellent value for the uniqueness of position.", highlights: ["Two-beach views", "Arpoador point", "Sunset spot", "Unique position"], bookUrl: "#" },
      { id: "mango-tree-hostel", name: "Mango Tree Hostel", tier: "budget", pricePerNight: 20, stars: 1, reviewScore: 8.6, reviewCount: 3100, description: "Rio's most-reviewed budget hostel in Botafogo — rooftop bar with Sugarloaf views, social scene, and the best free city advice in Rio.", highlights: ["Sugarloaf views", "Rooftop bar", "Social atmosphere", "Botafogo location"], bookUrl: "#" },
    ],
    relatedSlugs: ["mexico-city", "miami", "buenos-aires"],
  },

  {
    slug: "dubrovnik",
    name: "Dubrovnik",
    country: "Croatia",
    tagline: "The Pearl of the Adriatic — medieval walls and the bluest sea in Europe",
    heroImage: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Dubrovnik? Our guide covers the Old Town walls, the best beaches, island hopping, when to visit, and honest hotel picks away from the crowds.",
    quickFacts: {
      bestTime: "May – June, September – October",
      currency: "Euro (EUR) — adopted 2023",
      language: "Croatian (English widely spoken)",
      timezone: "CET (UTC+1, UTC+2 summer)",
      avgBudget: "$130–$400 per day",
      visaRequired: "Schengen (visa-free 90 days for most) — Croatia joined Schengen January 2023",
      flightFrom: "~2.5 hrs from London, ~10 hrs from New York",
    },
    intro: "Dubrovnik is the most perfectly preserved medieval walled city in the world — a fortress-city of limestone streets and Gothic, Renaissance, and Baroque architecture contained within walls that are 6 metres thick and 2km in circumference. The Game of Thrones production team used it as King's Landing because it was already more dramatic than any set they could have built. The Adriatic Sea outside the walls is the clearest and most intensely blue in Europe. The challenge: it is also one of the most overcrowded tourist destinations in the world in July and August.",
    sections: [
      {
        heading: "The Old Town and city walls",
        body: "The Stari Grad (Old Town) is a UNESCO World Heritage Site — the main pedestrian artery Stradun runs 300 metres from Pile Gate to the Clock Tower, flanked by palaces and churches. The city walls walk (2km, 1–2 hours) is the greatest single experience in Dubrovnik — the view of the terracotta rooftops, the Adriatic, and the offshore island of Lokrum from the highest point is extraordinary. Walk the walls at opening (8am) or closing (before sunset) to minimise the July–August crowds. Cable car to Mount Srđ gives an even more dramatic aerial perspective.",
        tips: [
          "Walk the city walls at 8am (when they open) — by 10am in summer the walls are genuinely uncomfortably crowded",
          "Lokrum Island (15-minute ferry, $10 return) has a naturist beach, peacocks, and Game of Thrones's Iron Throne replica",
          "The cable car to Mount Srđ at sunset gives a view that rivals Santorini for sheer Mediterranean drama",
        ],
      },
      {
        heading: "When to visit Dubrovnik",
        body: "May–June and September–October are far superior to the summer peak. July and August see up to 10,000 cruise ship passengers descending simultaneously on a walled city of 1,500 residents — the Old Town becomes nearly impossible. The city imposed visitor caps and cruise ship restrictions from 2024, which helps, but the summer months remain extreme. May is ideal: warm (22–26°C), sea swimmable from late May, and the city operating at a civilised pace. October is equally excellent — warm, quieter, and the Adriatic still swimmable.",
        tips: [
          "Visitor caps now apply in summer — book well ahead as the Old Town accommodation is limited",
          "May is the finest month: wildflowers, manageable crowds, and warm enough to swim by late May",
          "September is the best beach month — sea at its warmest (25°C) after summer heating, crowds dropping",
        ],
      },
      {
        heading: "Island hopping from Dubrovnik",
        body: "Dubrovnik is the southern terminus of the Dalmatian ferry network, making island hopping easy. Hvar (2–3 hours by ferry/catamaran): the most glamorous island in Croatia — medieval Old Town, lavender fields, celebrity yachts. Korčula (2–2.5 hours): quieter, more authentic, supposedly Marco Polo's birthplace — excellent wine and seafood. Mljet: a national park island of two interconnected lakes — one of Croatia's finest landscapes. Lokrum: 15 minutes offshore from Dubrovnik Old Town — botanical garden, peacocks, naturist beach.",
        tips: [
          "Hvar is the obvious day trip but stay overnight (or two nights) to experience it properly without the day-tripper crowd",
          "Korčula is significantly less crowded than Hvar with equally good wine — the better choice for anti-cruise-ship travellers",
          "Book ferry tickets in advance in June–August — they sell out, particularly to Hvar",
        ],
      },
      {
        heading: "Where to stay: avoiding the worst of the crowds",
        body: "Staying inside the Old Town walls is the most atmospheric option — but Old Town accommodation is limited, expensive, and the narrow streets echo with noise until late in peak season. The Lapad peninsula (15 minutes by bus) offers the best value hotels with beach access and a quieter atmosphere. Babin Kuk is the resort area — more removed but quiet. The most interesting option is to stay in a private apartment outside the walls and walk the Old Town in the early morning and late evening, when the cruise-ship visitors have gone.",
        tips: [
          "Book Old Town accommodation (very limited) 6+ months ahead for June–August",
          "Stay in Lapad or Babin Kuk for beach access and quiet evenings — bus to Old Town is 15 minutes",
          "Pile Gate area (just outside the walls) has several excellent boutique hotels with no parking issues",
        ],
      },
    ],
    hotels: [
      { id: "villa-dubrovnik", name: "Villa Dubrovnik", tier: "luxury", badge: "Editor's Pick", pricePerNight: 580, stars: 5, reviewScore: 9.7, reviewCount: 560, description: "A cliffside hotel of extraordinary taste 10 minutes' walk from the Old Town. Every room faces the Adriatic, private beach, boat shuttle to the Old Town gates.", highlights: ["Adriatic cliff views", "Private beach", "Boat shuttle", "Every room sea-facing"], bookUrl: "#" },
      { id: "hotel-excelsior-dubrovnik", name: "Hotel Excelsior Dubrovnik", tier: "luxury", badge: "Best View", pricePerNight: 460, stars: 5, reviewScore: 9.2, reviewCount: 1200, description: "5-star hotel directly below the city walls with a private beach platform and Old Town views. Swimming literally beneath the medieval walls.", highlights: ["Under the city walls", "Private beach", "Old Town views", "Walking distance to Pile Gate"], bookUrl: "#" },
      { id: "hotel-stari-grad-dubrovnik", name: "Hotel Stari Grad", tier: "mid", pricePerNight: 165, stars: 3, reviewScore: 8.9, reviewCount: 1100, description: "Inside the Old Town walls — 8 rooms in a restored 16th-century building on the Stradun. The most atmospheric mid-range option in Dubrovnik.", highlights: ["Inside the Old Town", "16th-century building", "Stradun location", "8 rooms only"], bookUrl: "#" },
      { id: "hostel-old-town-dubrovnik", name: "Hostel Marina Dubrovnik", tier: "budget", pricePerNight: 25, stars: 1, reviewScore: 8.7, reviewCount: 1900, description: "Dubrovnik's best budget hostel — outside the Old Town in Gruž harbour, with excellent ferry access for island hopping and a genuine local neighbourhood feel.", highlights: ["Ferry terminal access", "Island hopping base", "Local neighbourhood", "Good value"], bookUrl: "#" },
    ],
    relatedSlugs: ["santorini", "amalfi-coast", "ibiza"],
  },

  {
    slug: "miami",
    name: "Miami",
    country: "USA",
    tagline: "Art Deco, Latin energy, and the most glamorous beach in the USA",
    heroImage: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80",
    updated: "2 May 2026",
    metaDescription: "Planning a trip to Miami? Our guide covers South Beach, Wynwood, Little Havana, the best Cuban food, when to visit, and our honest hotel picks.",
    quickFacts: {
      bestTime: "November – April (cool and dry)",
      currency: "US Dollar (USD)",
      language: "English, Spanish",
      timezone: "EST (UTC−5), EDT summer",
      avgBudget: "$200–$600 per day",
      visaRequired: "US entry requirements apply (ESTA for most nationalities)",
      flightFrom: "~9 hrs from London, ~3 hrs from New York",
    },
    intro: "Miami is the most Latin city in the United States — a cultural crossroads of Cuban, Venezuelan, Colombian, Caribbean, and Brazilian influences that has produced one of the country's most distinctive urban identities. South Beach's Art Deco Historic District is the world's largest collection of 1930s architecture, Wynwood is a world-class outdoor street art gallery, and Little Havana is a living Cuban neighbourhood that survived the exile community's half-century of homesickness. The beaches are excellent, the nightlife is extraordinary, and the food — particularly the Cuban and Colombian scenes — is genuinely world-class.",
    sections: [
      {
        heading: "Miami's best areas",
        body: "South Beach (SoBe) is the famous strip — Ocean Drive's pastel Art Deco hotels, Lincoln Road's pedestrian mall, and the widest beach in Miami. Very touristy but genuinely beautiful and architecturally extraordinary. Wynwood has become Miami's most visited neighbourhood — 30 blocks of warehouse walls converted into outdoor murals by the world's top street artists, with excellent restaurants and galleries. Brickell is Miami's financial district — sleek, new, excellent rooftop bars. Little Havana (8th Street/Calle Ocho) is the Cuban neighbourhood — domino parks, ventanitas (walk-up coffee windows), and the best Cuban food in the city.",
        tips: [
          "South Beach Art Deco at 7am (before the beach crowds) is a genuinely extraordinary architectural experience",
          "Wynwood Walls (the curated mural park at NW 2nd Ave) is the centrepiece but the best murals extend 3–4 blocks north and south",
          "Calle Ocho on a Saturday afternoon (dominos at Maximo Gomez Park, café cubano at a ventanita) is the most authentic Miami experience",
        ],
      },
      {
        heading: "When to visit Miami",
        body: "November–April is peak season for good reason — 22–28°C, low humidity, and the best beach weather. December–February is the most popular and most expensive window. April and November are excellent shoulder months: still warm but cheaper. May–October is hot (32–35°C) and intensely humid, with hurricane season (June–November) adding real risk. The summer hotel prices drop 40–50% but the heat and humidity require commitment. Art Basel Miami Beach (early December) is the most significant art fair in the Americas and transforms the city for one week.",
        tips: [
          "Art Basel Miami Beach (first week of December) is one of the most extraordinary cultural events in the USA — book 6+ months ahead",
          "March is the sweet spot: warm, dry, post-spring break crowds, and hotel prices still reasonable",
          "Hurricane season (June–November) is real — check NOAA forecasts and ensure your travel insurance covers cancellation",
        ],
      },
      {
        heading: "Getting around Miami",
        body: "Miami is a car city — designed entirely around the automobile, with limited public transport between its main areas. Uber and Lyft are the practical solution for most trips. The Miami Metromover (free elevated train) covers the downtown and Brickell areas. The Miami Beach trolley (free) covers South Beach's main strip. Walking is viable within South Beach, Wynwood, and the Brickell waterfront. Driving and parking in South Beach is genuinely painful — stay in a hotel with self-parking or valet and use Uber for everything.",
      },
      {
        heading: "Miami's food scene",
        body: "Miami's food identity is built on Cuban and Latin cuisine — the café cubano (an espresso so sweet it's almost a dessert) from a ventanita, the media noche sandwich at 2am after clubbing, and a proper Cuban plate lunch at Versailles Restaurant on Calle Ocho. The upscale scene has grown dramatically — José Andrés's Bazaar at the SLS Hotel, Zuma Miami, and Carbone Miami (the most glamorous restaurant in the city) are the power-dining choices. The Design District and Wynwood have the best independent restaurants. For beach cocktails, the Broken Shaker at the Freehand Hotel is the finest outdoor bar in Miami.",
        tips: [
          "Café cubano (sweet Cuban espresso) from the window of Versailles at 8am is the essential first Miami experience",
          "The Broken Shaker's outdoor cocktail garden at the Freehand Hotel is the best bar atmosphere in Miami",
          "Joe's Stone Crab (mid-October to mid-May) is Miami's most famous restaurant — book weeks ahead or eat at the takeaway counter",
        ],
      },
    ],
    hotels: [
      { id: "faena-miami", name: "Faena Hotel Miami Beach", tier: "luxury", badge: "Most Spectacular", pricePerNight: 680, stars: 5, reviewScore: 9.4, reviewCount: 1200, description: "The most theatrical hotel in the USA — designed by Baz Luhrmann, with a taxidermied mammoth in gold leaf in the lobby, the finest pool on Miami Beach, and extraordinary service.", highlights: ["Baz Luhrmann design", "Gold mammoth", "Miami's best pool", "Beach frontage"], bookUrl: "#" },
      { id: "delano-miami", name: "Delano South Beach", tier: "luxury", badge: "Most Iconic", pricePerNight: 350, stars: 4, reviewScore: 9.0, reviewCount: 2200, description: "The hotel that defined the Miami Beach design revival in 1995. Philippe Starck interiors, the famous pool at the edge of the beach, and a place where the design still holds up 30 years later.", highlights: ["Philippe Starck", "Famous pool", "SoBe icon", "Beach position"], bookUrl: "#" },
      { id: "freehand-miami", name: "Freehand Miami Beach", tier: "mid", pricePerNight: 120, stars: 3, reviewScore: 8.9, reviewCount: 2800, description: "The most social hotel in Miami — the Broken Shaker cocktail bar and garden terrace are the best in the city, with hostel dormitories and private rooms at excellent value.", highlights: ["Broken Shaker bar", "Garden terrace", "Mid Beach location", "Best social scene"], bookUrl: "#" },
      { id: "beds-miami", name: "Beds Hostel Miami Beach", tier: "budget", pricePerNight: 35, stars: 1, reviewScore: 8.3, reviewCount: 2100, description: "South Beach's most reliable budget option — well-maintained, social vibe, rooftop terrace, and 3 blocks from the beach.", highlights: ["3 blocks to beach", "Rooftop terrace", "Social atmosphere", "South Beach"], bookUrl: "#" },
    ],
    relatedSlugs: ["new-york", "rio-de-janeiro", "ibiza"],
  },
];

// CMS overrides — edited via Airtable dashboard, synced by running:
//   pnpm --filter @workspace/scripts exec tsx src/sync-from-airtable.ts
import cmsData from "./cms-overrides.json";

type CmsDestination = Partial<Destination> & { quickFacts?: Partial<Destination["quickFacts"]>; budgetOverride?: Record<string, number> };
const cmsDestinations = (cmsData as any).destinations as Record<string, CmsDestination>;

const mergedDestinations: Destination[] = destinations.map(d => {
  const o = cmsDestinations?.[d.slug];
  if (!o) return d;
  return {
    ...d,
    ...(o.name ? { name: o.name } : {}),
    ...(o.tagline ? { tagline: o.tagline } : {}),
    ...(o.intro ? { intro: o.intro } : {}),
    ...(o.heroImage ? { heroImage: o.heroImage } : {}),
    quickFacts: { ...d.quickFacts, ...(o.quickFacts ?? {}) },
  };
});

export const destinationMap = Object.fromEntries(mergedDestinations.map((d) => [d.slug, d]));
export default mergedDestinations;
