export type SearchResult = {
  id: string;
  type: "destination" | "deal" | "guide" | "tip";
  title: string;
  subtitle: string;
  badge?: string;
  href: string;
};

export const searchData: SearchResult[] = [
  // Destinations
  { id: "bali", type: "destination", title: "Bali, Indonesia", subtitle: "Temples, rice terraces, and beach clubs", href: "/destinations/bali" },
  { id: "santorini", type: "destination", title: "Santorini, Greece", subtitle: "Caldera views, whitewashed villages, wine", href: "/destinations/santorini" },
  { id: "tokyo", type: "destination", title: "Tokyo, Japan", subtitle: "Street food, temples, and neon nightlife", href: "/destinations/tokyo" },
  { id: "maldives", type: "destination", title: "Maldives", subtitle: "Overwater bungalows and crystal lagoons", href: "/destinations/maldives" },
  { id: "paris", type: "destination", title: "Paris, France", subtitle: "Art, gastronomy, and the Seine", href: "/destinations/paris" },
  { id: "lisbon", type: "destination", title: "Lisbon, Portugal", subtitle: "Trams, Fado, and Atlantic seafood", href: "/destinations/lisbon" },
  { id: "bangkok", type: "destination", title: "Bangkok, Thailand", subtitle: "Street markets, temples, and rooftop bars", href: "/destinations/bangkok" },
  { id: "barcelona", type: "destination", title: "Barcelona, Spain", subtitle: "Gaudí, tapas, and Mediterranean beaches", href: "/destinations/barcelona" },
  { id: "dubai", type: "destination", title: "Dubai, UAE", subtitle: "Luxury hotels, desert safaris, and skyline dining", href: "/destinations/dubai" },
  { id: "new-york", type: "destination", title: "New York City, USA", subtitle: "Manhattan skyline, Broadway, Central Park", href: "/destinations/new-york" },
  { id: "rome", type: "destination", title: "Rome, Italy", subtitle: "Colosseum, Vatican, and the best pasta", href: "/destinations/rome" },
  { id: "kyoto", type: "destination", title: "Kyoto, Japan", subtitle: "Bamboo forests, geisha districts, and zen gardens", href: "/destinations/kyoto" },
  { id: "phuket", type: "destination", title: "Phuket, Thailand", subtitle: "Limestone cliffs, turquoise water, island hopping", href: "/destinations/phuket" },
  { id: "amsterdam", type: "destination", title: "Amsterdam, Netherlands", subtitle: "Canals, museums, and cycling culture", href: "/destinations/amsterdam" },
  { id: "cape-town", type: "destination", title: "Cape Town, South Africa", subtitle: "Table Mountain, winelands, and ocean views", href: "/destinations/cape-town" },
  { id: "amalfi-coast", type: "destination", title: "Amalfi Coast, Italy", subtitle: "Cliffside villages, limoncello, and turquoise coves", href: "/destinations/amalfi-coast" },
  { id: "marrakech", type: "destination", title: "Marrakech, Morocco", subtitle: "Souks, riads, and the Atlas Mountains", href: "/destinations/marrakech" },
  { id: "singapore", type: "destination", title: "Singapore", subtitle: "Hawker food, Gardens by the Bay, and Asia's finest hub", href: "/destinations/singapore" },
  { id: "prague", type: "destination", title: "Prague, Czech Republic", subtitle: "Medieval bridges, Baroque spires, and tank beer", href: "/destinations/prague" },
  { id: "ibiza", type: "destination", title: "Ibiza, Spain", subtitle: "Club culture, hidden coves, and extraordinary sunsets", href: "/destinations/ibiza" },
  { id: "bora-bora", type: "destination", title: "Bora Bora, French Polynesia", subtitle: "The most beautiful lagoon on earth", href: "/destinations/bora-bora" },
  { id: "istanbul", type: "destination", title: "Istanbul, Turkey", subtitle: "Mosques, hammams, and the Bosphorus", href: "/destinations/istanbul" },
  { id: "queenstown", type: "destination", title: "Queenstown, New Zealand", subtitle: "Fjords, skiing, and bungee jumping", href: "/destinations/queenstown" },
  { id: "hawaii", type: "destination", title: "Hawaii, USA", subtitle: "Active volcanoes, world-class surf, and aloha spirit", href: "/destinations/hawaii" },
  { id: "hanoi", type: "destination", title: "Hanoi, Vietnam", subtitle: "Lantern-lit old quarter, pho at dawn, Ha Long Bay", href: "/destinations/hanoi" },
  { id: "reykjavik", type: "destination", title: "Reykjavik, Iceland", subtitle: "Northern lights, geysers, and the midnight sun", href: "/destinations/reykjavik" },
  { id: "mexico-city", type: "destination", title: "Mexico City, Mexico", subtitle: "Aztec ruins, world-class tacos, and the best food city", href: "/destinations/mexico-city" },
  { id: "rio-de-janeiro", type: "destination", title: "Rio de Janeiro, Brazil", subtitle: "Carnival, Cristo Redentor, and Copacabana", href: "/destinations/rio-de-janeiro" },
  { id: "dubrovnik", type: "destination", title: "Dubrovnik, Croatia", subtitle: "Medieval walls and the bluest Adriatic sea", href: "/destinations/dubrovnik" },
  { id: "miami", type: "destination", title: "Miami, USA", subtitle: "Art Deco, Latin energy, and South Beach", href: "/destinations/miami" },

  // Deals
  { id: "deal-maldives", type: "deal", title: "Maldives Overwater Villa — $389/night", subtitle: "Anantara Veli · All-inclusive · Editor's Pick", badge: "Editor's Pick", href: "#deals" },
  { id: "deal-santorini", type: "deal", title: "Santorini Boutique Hotel — $299/night", subtitle: "Canaves Oia · Caldera view · Best Value", badge: "Best Value", href: "#deals" },
  { id: "deal-tokyo", type: "deal", title: "Andaz Tokyo — $198/night", subtitle: "Toranomon Hills · Rooftop pool · Top Pick", badge: "Top Pick", href: "#deals" },
  { id: "deal-bali", type: "deal", title: "Bali Villa with Pool — $145/night", subtitle: "Ubud · Private pool · Breakfast included", href: "#deals" },
  { id: "deal-paris", type: "deal", title: "Paris Boutique Hotel — $189/night", subtitle: "6th Arrondissement · Seine views · Curated pick", href: "#deals" },
  { id: "deal-dubai", type: "deal", title: "Dubai Desert Resort — $225/night", subtitle: "Al Maha · All-inclusive safari experience", href: "#deals" },
  { id: "deal-barcelona", type: "deal", title: "Barcelona Seafront Hotel — $165/night", subtitle: "Barceloneta · Pool · Best summer rate", href: "#deals" },

  // Guides
  { id: "guide-bali", type: "guide", title: "The Complete Bali Travel Guide 2025", subtitle: "Where to stay, eat, and save in Bali", href: "/destinations/bali" },
  { id: "guide-paris", type: "guide", title: "Paris Without the Tourist Tax", subtitle: "Hotels and neighbourhoods locals use", href: "/destinations/paris" },
  { id: "guide-maldives", type: "guide", title: "Maldives on a Budget", subtitle: "Guesthouses vs resorts — honest comparison", href: "/destinations/maldives" },
  { id: "guide-tokyo", type: "guide", title: "First Timer's Guide to Tokyo", subtitle: "Neighbourhoods, transport, and must-eats", href: "/destinations/tokyo" },
  { id: "guide-santorini", type: "guide", title: "Santorini Travel Guide", subtitle: "Best villages, hotels, and when to visit", href: "/destinations/santorini" },
  { id: "guide-lisbon", type: "guide", title: "Lisbon on $100/Day", subtitle: "Budget-friendly Lisbon travel guide", href: "#destinations" },
  { id: "guide-thailand", type: "guide", title: "Thailand Island Hopping Guide", subtitle: "Koh Lanta, Koh Tao, Koh Samui compared", href: "#destinations" },

  // Tips
  { id: "tip-booking", type: "tip", title: "Best time to book a hotel", subtitle: "How far in advance to get the lowest price", href: "#tips" },
  { id: "tip-points", type: "tip", title: "Earning travel points for free flights", subtitle: "Which credit cards actually deliver value", href: "#tips" },
  { id: "tip-packing", type: "tip", title: "Carry-on only packing list", subtitle: "Pack smarter for any trip length", href: "#tips" },
  { id: "tip-insurance", type: "tip", title: "Do you actually need travel insurance?", subtitle: "When it's worth it and when it's not", href: "#tips" },
  { id: "tip-currency", type: "tip", title: "Best ways to exchange currency abroad", subtitle: "Avoid airport rates and bank fees", href: "#tips" },
];

export function searchResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return searchData
    .filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q)
    )
    .slice(0, 12);
}

export const typeLabels: Record<SearchResult["type"], string> = {
  destination: "Destination",
  deal: "Deal",
  guide: "Guide",
  tip: "Travel Tip",
};

export const typeOrder: SearchResult["type"][] = ["destination", "deal", "guide", "tip"];
