export type Tier = "budget" | "mid" | "luxury";
export type Origin = "uk" | "us";

export type TierCosts = {
  hotelPerNight: number;
  foodPerDay: number;
  activitiesPerDay: number;
  transportPerDay: number;
};

export type DestinationBudget = {
  tiers: Record<Tier, TierCosts>;
  flightEstimate: Record<Origin, { min: number; max: number }>;
  currency: string;
  note?: string;
};

const budgetData: Record<string, DestinationBudget> = {
  bali: {
    tiers: {
      budget:  { hotelPerNight: 22,  foodPerDay: 12, activitiesPerDay: 8,  transportPerDay: 7  },
      mid:     { hotelPerNight: 85,  foodPerDay: 35, activitiesPerDay: 25, transportPerDay: 15 },
      luxury:  { hotelPerNight: 170, foodPerDay: 80, activitiesPerDay: 60, transportPerDay: 30 },
    },
    flightEstimate: {
      uk: { min: 580,  max: 900  },
      us: { min: 750,  max: 1100 },
    },
    currency: "USD",
    note: "Prices in USD. Bali is one of Asia's best value destinations.",
  },
  santorini: {
    tiers: {
      budget:  { hotelPerNight: 72,  foodPerDay: 30, activitiesPerDay: 15, transportPerDay: 10 },
      mid:     { hotelPerNight: 145, foodPerDay: 65, activitiesPerDay: 35, transportPerDay: 20 },
      luxury:  { hotelPerNight: 340, foodPerDay: 130, activitiesPerDay: 70, transportPerDay: 30 },
    },
    flightEstimate: {
      uk: { min: 140,  max: 320  },
      us: { min: 700,  max: 1100 },
    },
    currency: "USD",
    note: "Santorini is one of Europe's pricier island destinations.",
  },
  tokyo: {
    tiers: {
      budget:  { hotelPerNight: 28,  foodPerDay: 18, activitiesPerDay: 10, transportPerDay: 8  },
      mid:     { hotelPerNight: 68,  foodPerDay: 50, activitiesPerDay: 35, transportPerDay: 15 },
      luxury:  { hotelPerNight: 244, foodPerDay: 120, activitiesPerDay: 70, transportPerDay: 25 },
    },
    flightEstimate: {
      uk: { min: 480,  max: 750  },
      us: { min: 600,  max: 950  },
    },
    currency: "USD",
    note: "Tokyo offers great value at budget and mid tiers. Luxury escalates quickly.",
  },
  maldives: {
    tiers: {
      budget:  { hotelPerNight: 65,  foodPerDay: 30, activitiesPerDay: 25, transportPerDay: 15 },
      mid:     { hotelPerNight: 175, foodPerDay: 80, activitiesPerDay: 50, transportPerDay: 20 },
      luxury:  { hotelPerNight: 450, foodPerDay: 200, activitiesPerDay: 100, transportPerDay: 50 },
    },
    flightEstimate: {
      uk: { min: 550,  max: 900  },
      us: { min: 900,  max: 1400 },
    },
    currency: "USD",
    note: "Budget = local island guesthouses. Luxury = resort island (seaplane transfer ~$400 extra).",
  },
  paris: {
    tiers: {
      budget:  { hotelPerNight: 75,  foodPerDay: 28, activitiesPerDay: 15, transportPerDay: 10 },
      mid:     { hotelPerNight: 135, foodPerDay: 70, activitiesPerDay: 40, transportPerDay: 15 },
      luxury:  { hotelPerNight: 250, foodPerDay: 150, activitiesPerDay: 80, transportPerDay: 25 },
    },
    flightEstimate: {
      uk: { min: 60,   max: 180  },
      us: { min: 450,  max: 750  },
    },
    currency: "USD",
    note: "Paris is expensive — but mid-range dining is excellent value at lunch.",
  },
  bangkok: {
    tiers: {
      budget:  { hotelPerNight: 15,  foodPerDay: 8,  activitiesPerDay: 5,  transportPerDay: 3  },
      mid:     { hotelPerNight: 65,  foodPerDay: 30, activitiesPerDay: 20, transportPerDay: 8  },
      luxury:  { hotelPerNight: 180, foodPerDay: 80, activitiesPerDay: 50, transportPerDay: 15 },
    },
    flightEstimate: { uk: { min: 480, max: 750 }, us: { min: 700, max: 1100 } },
    currency: "USD",
    note: "Bangkok is extraordinary value. Budget travellers eat street food for $2–4 per meal.",
  },
  barcelona: {
    tiers: {
      budget:  { hotelPerNight: 45,  foodPerDay: 22, activitiesPerDay: 12, transportPerDay: 8  },
      mid:     { hotelPerNight: 110, foodPerDay: 55, activitiesPerDay: 30, transportPerDay: 12 },
      luxury:  { hotelPerNight: 280, foodPerDay: 130, activitiesPerDay: 65, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 60, max: 180 }, us: { min: 480, max: 750 } },
    currency: "USD",
    note: "Barcelona is mid-range by European standards. Set lunch menus ($13–20) are the best value.",
  },
  dubai: {
    tiers: {
      budget:  { hotelPerNight: 55,  foodPerDay: 20, activitiesPerDay: 15, transportPerDay: 8  },
      mid:     { hotelPerNight: 130, foodPerDay: 60, activitiesPerDay: 40, transportPerDay: 15 },
      luxury:  { hotelPerNight: 450, foodPerDay: 200, activitiesPerDay: 120, transportPerDay: 30 },
    },
    flightEstimate: { uk: { min: 280, max: 550 }, us: { min: 700, max: 1100 } },
    currency: "USD",
    note: "Dubai has no VAT on most retail purchases. Mid-range is surprisingly affordable; luxury has no ceiling.",
  },
  rome: {
    tiers: {
      budget:  { hotelPerNight: 40,  foodPerDay: 20, activitiesPerDay: 10, transportPerDay: 5  },
      mid:     { hotelPerNight: 110, foodPerDay: 55, activitiesPerDay: 30, transportPerDay: 10 },
      luxury:  { hotelPerNight: 300, foodPerDay: 140, activitiesPerDay: 70, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 60, max: 200 }, us: { min: 500, max: 800 } },
    currency: "USD",
    note: "Rome's lunch menus ($13–20) are extraordinary value. Dinner is the more expensive meal.",
  },
  kyoto: {
    tiers: {
      budget:  { hotelPerNight: 30,  foodPerDay: 15, activitiesPerDay: 8,  transportPerDay: 6  },
      mid:     { hotelPerNight: 90,  foodPerDay: 50, activitiesPerDay: 30, transportPerDay: 12 },
      luxury:  { hotelPerNight: 500, foodPerDay: 180, activitiesPerDay: 80, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 500, max: 800 }, us: { min: 650, max: 1000 } },
    currency: "USD",
    note: "Kyoto: budget and mid tiers are very reasonable. Luxury (ryokan + kaiseki) escalates dramatically.",
  },
  phuket: {
    tiers: {
      budget:  { hotelPerNight: 18,  foodPerDay: 10, activitiesPerDay: 8,  transportPerDay: 5  },
      mid:     { hotelPerNight: 75,  foodPerDay: 35, activitiesPerDay: 25, transportPerDay: 10 },
      luxury:  { hotelPerNight: 350, foodPerDay: 100, activitiesPerDay: 60, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 500, max: 800 }, us: { min: 800, max: 1200 } },
    currency: "USD",
    note: "Phuket offers outstanding value at budget and mid tiers. Island hopping adds significant cost.",
  },
  amsterdam: {
    tiers: {
      budget:  { hotelPerNight: 35,  foodPerDay: 25, activitiesPerDay: 12, transportPerDay: 8  },
      mid:     { hotelPerNight: 115, foodPerDay: 65, activitiesPerDay: 35, transportPerDay: 12 },
      luxury:  { hotelPerNight: 280, foodPerDay: 130, activitiesPerDay: 65, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 45, max: 130 }, us: { min: 450, max: 750 } },
    currency: "USD",
    note: "Amsterdam is expensive by Northern European standards. Museum cards save significantly.",
  },
  "cape-town": {
    tiers: {
      budget:  { hotelPerNight: 18,  foodPerDay: 12, activitiesPerDay: 8,  transportPerDay: 5  },
      mid:     { hotelPerNight: 65,  foodPerDay: 40, activitiesPerDay: 25, transportPerDay: 12 },
      luxury:  { hotelPerNight: 280, foodPerDay: 100, activitiesPerDay: 60, transportPerDay: 25 },
    },
    flightEstimate: { uk: { min: 550, max: 900 }, us: { min: 900, max: 1400 } },
    currency: "USD",
    note: "Cape Town is exceptional value in USD/GBP terms due to the favourable ZAR exchange rate.",
  },
  "new-york": {
    tiers: {
      budget:  { hotelPerNight: 90,  foodPerDay: 35, activitiesPerDay: 15, transportPerDay: 10 },
      mid:     { hotelPerNight: 180, foodPerDay: 80, activitiesPerDay: 40, transportPerDay: 15 },
      luxury:  { hotelPerNight: 450, foodPerDay: 200, activitiesPerDay: 100, transportPerDay: 30 },
    },
    flightEstimate: { uk: { min: 280, max: 600 }, us: { min: 0, max: 0 } },
    currency: "USD",
    note: "NYC is one of the most expensive cities on earth. Budget options exist but require commitment.",
  },
  lisbon: {
    tiers: {
      budget:  { hotelPerNight: 28,  foodPerDay: 15, activitiesPerDay: 8,  transportPerDay: 5  },
      mid:     { hotelPerNight: 85,  foodPerDay: 45, activitiesPerDay: 22, transportPerDay: 10 },
      luxury:  { hotelPerNight: 220, foodPerDay: 110, activitiesPerDay: 50, transportPerDay: 18 },
    },
    flightEstimate: { uk: { min: 55, max: 180 }, us: { min: 420, max: 700 } },
    currency: "USD",
    note: "Lisbon remains one of Western Europe's best value capitals — a full dinner with wine for $20–25.",
  },
  "amalfi-coast": {
    tiers: {
      budget:  { hotelPerNight: 70,  foodPerDay: 30, activitiesPerDay: 20, transportPerDay: 15 },
      mid:     { hotelPerNight: 180, foodPerDay: 80, activitiesPerDay: 45, transportPerDay: 25 },
      luxury:  { hotelPerNight: 650, foodPerDay: 200, activitiesPerDay: 100, transportPerDay: 50 },
    },
    flightEstimate: { uk: { min: 80, max: 220 }, us: { min: 550, max: 900 } },
    currency: "USD",
    note: "One of Italy's priciest destinations. Budget is relative — even simple meals cost $25+.",
  },
  marrakech: {
    tiers: {
      budget:  { hotelPerNight: 22,  foodPerDay: 12, activitiesPerDay: 8,  transportPerDay: 5  },
      mid:     { hotelPerNight: 80,  foodPerDay: 35, activitiesPerDay: 20, transportPerDay: 10 },
      luxury:  { hotelPerNight: 350, foodPerDay: 100, activitiesPerDay: 50, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 80, max: 220 }, us: { min: 600, max: 950 } },
    currency: "USD",
    note: "Excellent value overall. Hammam experiences ($15–30) and souk shopping add cost to the mid-tier.",
  },
  singapore: {
    tiers: {
      budget:  { hotelPerNight: 30,  foodPerDay: 10, activitiesPerDay: 10, transportPerDay: 5  },
      mid:     { hotelPerNight: 90,  foodPerDay: 45, activitiesPerDay: 30, transportPerDay: 10 },
      luxury:  { hotelPerNight: 350, foodPerDay: 130, activitiesPerDay: 80, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 500, max: 800 }, us: { min: 750, max: 1100 } },
    currency: "USD",
    note: "Hawker centre meals ($3–8) make Singapore affordable at street level. Luxury has no ceiling.",
  },
  prague: {
    tiers: {
      budget:  { hotelPerNight: 22,  foodPerDay: 15, activitiesPerDay: 8,  transportPerDay: 4  },
      mid:     { hotelPerNight: 75,  foodPerDay: 40, activitiesPerDay: 22, transportPerDay: 8  },
      luxury:  { hotelPerNight: 220, foodPerDay: 100, activitiesPerDay: 50, transportPerDay: 15 },
    },
    flightEstimate: { uk: { min: 40, max: 130 }, us: { min: 480, max: 750 } },
    currency: "USD",
    note: "Prague is Central Europe's best value city. Tank beer for $1.50 and full Czech dinners for $12.",
  },
  ibiza: {
    tiers: {
      budget:  { hotelPerNight: 55,  foodPerDay: 25, activitiesPerDay: 20, transportPerDay: 8  },
      mid:     { hotelPerNight: 140, foodPerDay: 65, activitiesPerDay: 60, transportPerDay: 15 },
      luxury:  { hotelPerNight: 450, foodPerDay: 180, activitiesPerDay: 150, transportPerDay: 30 },
    },
    flightEstimate: { uk: { min: 60, max: 200 }, us: { min: 500, max: 850 } },
    currency: "USD",
    note: "Club entry ($50–100) and drinks ($15–25 each) make nightlife the major cost driver.",
  },
  "bora-bora": {
    tiers: {
      budget:  { hotelPerNight: 95,  foodPerDay: 30, activitiesPerDay: 25, transportPerDay: 10 },
      mid:     { hotelPerNight: 350, foodPerDay: 90, activitiesPerDay: 60, transportPerDay: 20 },
      luxury:  { hotelPerNight: 1100, foodPerDay: 250, activitiesPerDay: 120, transportPerDay: 40 },
    },
    flightEstimate: { uk: { min: 1200, max: 2000 }, us: { min: 800, max: 1400 } },
    currency: "USD",
    note: "One of the world's most expensive destinations. Budget = pension guesthouse + local food.",
  },
  istanbul: {
    tiers: {
      budget:  { hotelPerNight: 22,  foodPerDay: 10, activitiesPerDay: 8,  transportPerDay: 4  },
      mid:     { hotelPerNight: 75,  foodPerDay: 35, activitiesPerDay: 22, transportPerDay: 8  },
      luxury:  { hotelPerNight: 280, foodPerDay: 100, activitiesPerDay: 55, transportPerDay: 15 },
    },
    flightEstimate: { uk: { min: 80, max: 250 }, us: { min: 500, max: 850 } },
    currency: "USD",
    note: "Istanbul is outstanding value for Western visitors. The TRY exchange rate makes everything cheap.",
  },
  queenstown: {
    tiers: {
      budget:  { hotelPerNight: 30,  foodPerDay: 20, activitiesPerDay: 30, transportPerDay: 10 },
      mid:     { hotelPerNight: 100, foodPerDay: 55, activitiesPerDay: 80, transportPerDay: 20 },
      luxury:  { hotelPerNight: 380, foodPerDay: 130, activitiesPerDay: 150, transportPerDay: 35 },
    },
    flightEstimate: { uk: { min: 1100, max: 1700 }, us: { min: 900, max: 1400 } },
    currency: "USD",
    note: "Activities (bungee, skydive, ski passes) are the major cost driver — budget accordingly.",
  },
  hawaii: {
    tiers: {
      budget:  { hotelPerNight: 55,  foodPerDay: 25, activitiesPerDay: 20, transportPerDay: 15 },
      mid:     { hotelPerNight: 185, foodPerDay: 70, activitiesPerDay: 55, transportPerDay: 25 },
      luxury:  { hotelPerNight: 550, foodPerDay: 160, activitiesPerDay: 110, transportPerDay: 40 },
    },
    flightEstimate: { uk: { min: 800, max: 1300 }, us: { min: 350, max: 700 } },
    currency: "USD",
    note: "Hawaii is expensive within the US — but the plate lunch culture keeps food costs manageable.",
  },
  hanoi: {
    tiers: {
      budget:  { hotelPerNight: 12,  foodPerDay: 7,  activitiesPerDay: 5,  transportPerDay: 3  },
      mid:     { hotelPerNight: 45,  foodPerDay: 25, activitiesPerDay: 20, transportPerDay: 8  },
      luxury:  { hotelPerNight: 150, foodPerDay: 70, activitiesPerDay: 50, transportPerDay: 15 },
    },
    flightEstimate: { uk: { min: 480, max: 750 }, us: { min: 750, max: 1100 } },
    currency: "USD",
    note: "Hanoi is one of the cheapest capitals in Asia. Ha Long Bay cruise adds $80–450 per person.",
  },
  reykjavik: {
    tiers: {
      budget:  { hotelPerNight: 45,  foodPerDay: 30, activitiesPerDay: 25, transportPerDay: 12 },
      mid:     { hotelPerNight: 120, foodPerDay: 70, activitiesPerDay: 60, transportPerDay: 30 },
      luxury:  { hotelPerNight: 280, foodPerDay: 150, activitiesPerDay: 100, transportPerDay: 50 },
    },
    flightEstimate: { uk: { min: 80, max: 250 }, us: { min: 350, max: 650 } },
    currency: "USD",
    note: "Iceland is expensive — car rental ($60–100/day) is essential for the Ring Road and adds significantly.",
  },
  "mexico-city": {
    tiers: {
      budget:  { hotelPerNight: 20,  foodPerDay: 10, activitiesPerDay: 8,  transportPerDay: 3  },
      mid:     { hotelPerNight: 65,  foodPerDay: 35, activitiesPerDay: 22, transportPerDay: 8  },
      luxury:  { hotelPerNight: 160, foodPerDay: 90, activitiesPerDay: 50, transportPerDay: 15 },
    },
    flightEstimate: { uk: { min: 550, max: 900 }, us: { min: 200, max: 500 } },
    currency: "USD",
    note: "Mexico City is exceptional value. World-class tacos for $1–2, Michelin-level meals for $80.",
  },
  "rio-de-janeiro": {
    tiers: {
      budget:  { hotelPerNight: 22,  foodPerDay: 12, activitiesPerDay: 8,  transportPerDay: 5  },
      mid:     { hotelPerNight: 80,  foodPerDay: 40, activitiesPerDay: 25, transportPerDay: 10 },
      luxury:  { hotelPerNight: 300, foodPerDay: 120, activitiesPerDay: 60, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 600, max: 950 }, us: { min: 550, max: 900 } },
    currency: "USD",
    note: "Good value overall. Use Uber exclusively — unofficial taxis are overpriced and sometimes unsafe.",
  },
  dubrovnik: {
    tiers: {
      budget:  { hotelPerNight: 45,  foodPerDay: 22, activitiesPerDay: 12, transportPerDay: 8  },
      mid:     { hotelPerNight: 130, foodPerDay: 60, activitiesPerDay: 30, transportPerDay: 12 },
      luxury:  { hotelPerNight: 380, foodPerDay: 140, activitiesPerDay: 65, transportPerDay: 20 },
    },
    flightEstimate: { uk: { min: 80, max: 220 }, us: { min: 550, max: 900 } },
    currency: "USD",
    note: "Dubrovnik is one of Croatia's most expensive destinations — budget here means private room, not backpacker.",
  },
  miami: {
    tiers: {
      budget:  { hotelPerNight: 55,  foodPerDay: 25, activitiesPerDay: 12, transportPerDay: 12 },
      mid:     { hotelPerNight: 160, foodPerDay: 70, activitiesPerDay: 35, transportPerDay: 18 },
      luxury:  { hotelPerNight: 450, foodPerDay: 180, activitiesPerDay: 80, transportPerDay: 30 },
    },
    flightEstimate: { uk: { min: 350, max: 650 }, us: { min: 0, max: 0 } },
    currency: "USD",
    note: "Miami requires a car or heavy Uber use — transport costs are higher than most US cities.",
  },
};

export function getDestinationBudget(slug: string): DestinationBudget | null {
  return budgetData[slug] ?? null;
}
