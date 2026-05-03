export type TransportMode = {
  emoji: string;
  label: string;
  cost: string;
  note: string;
  recommended?: boolean;
};

export type AirportTransfer = {
  option: string;
  emoji: string;
  duration: string;
  cost: string;
  tip?: string;
};

export type AppTip = {
  name: string;
  emoji: string;
  use: string;
  available: boolean;
};

export type TransportData = {
  airport: string;
  airportCode: string;
  transfers: AirportTransfer[];
  gettingAround: TransportMode[];
  apps: AppTip[];
  drivingSide: "left" | "right";
  tip: string;
  warning?: string;
};

const transportData: Record<string, TransportData> = {
  bali: {
    airport: "Ngurah Rai International Airport",
    airportCode: "DPS",
    transfers: [
      { option: "Grab / Gojek (ride-hail)", emoji: "📱", duration: "30–60 min", cost: "~$5–10 USD", tip: "Best value — order inside the terminal, drivers meet you at Arrivals." },
      { option: "Metered taxi (Bluebird)", emoji: "🚕", duration: "30–60 min", cost: "~$10–15 USD", tip: "Only use the official Bluebird taxis inside the terminal — avoid touts." },
      { option: "Pre-booked hotel shuttle", emoji: "🏨", duration: "30–90 min", cost: "Often free", tip: "Most resorts offer complimentary airport transfers — check when booking." },
      { option: "Private car hire", emoji: "🚗", duration: "30–60 min", cost: "~$20–30 USD/day", tip: "Flexible if you want a driver for the whole trip. Negotiate the day before." },
    ],
    gettingAround: [
      { emoji: "🛵", label: "Scooter rental",   cost: "$5–10/day",   note: "The most popular way to get around. International driving licence required. Wear a helmet — it's the law.",    recommended: true },
      { emoji: "📱", label: "Grab / Gojek",     cost: "$1–5/trip",   note: "App-based ride-hailing. GrabCar or GrabBike. Cheap, safe, and no haggling.",                                     recommended: true },
      { emoji: "🚗", label: "Private driver",   cost: "$40–60/day",  note: "Hire a driver + car for the full day — great for multi-stop trips (temples, rice terraces, market)."              },
      { emoji: "🚖", label: "Metered taxi",     cost: "$3–10/trip",  note: "Bluebird taxis are reliable and metered. Avoid unmarked cabs." },
      { emoji: "🚐", label: "Tourist shuttle",  cost: "$5–15/trip",  note: "Shared shuttles run between major areas (Kuta, Ubud, Seminyak, Canggu). Perama is a well-known operator."         },
    ],
    apps: [
      { name: "Grab",   emoji: "🟢", use: "Ride-hailing & food delivery",  available: true  },
      { name: "Gojek",  emoji: "🟢", use: "Ride-hailing, delivery, errands", available: true },
      { name: "Google Maps", emoji: "🗺️", use: "Navigation (works well offline too)", available: true },
      { name: "Klook",  emoji: "🎟️", use: "Book activities & tours",        available: true  },
    ],
    drivingSide: "left",
    tip: "Traffic in South Bali (Kuta, Seminyak, Canggu) can be severe in the afternoon. Plan sightseeing before 10am or after 5pm.",
    warning: "Scooter accidents are the #1 cause of tourist injuries in Bali. Only ride if you're confident — many travel insurers won't cover you without a valid motorbike licence.",
  },

  santorini: {
    airport: "Santorini (Thira) International Airport",
    airportCode: "JTR",
    transfers: [
      { option: "Taxi",             emoji: "🚕", duration: "10–25 min", cost: "$16–33",    tip: "Fixed fares to major villages — ask for the rate before getting in." },
      { option: "Bus (KTEL)",       emoji: "🚌", duration: "20–40 min", cost: "$2",        tip: "Very cheap — main bus station is in Fira. Buy tickets on board." },
      { option: "Pre-booked transfer", emoji: "🚗", duration: "15–30 min", cost: "$27–55", tip: "Smart for late arrivals or if you have a lot of luggage to Oia." },
    ],
    gettingAround: [
      { emoji: "🚌", label: "KTEL public bus",  cost: "$2/trip",     note: "Runs between Fira, Oia, Perissa, and Kamari. Reliable and very cheap. Times are posted at bus stops.", recommended: true },
      { emoji: "🚕", label: "Taxi",             cost: "$11–27/trip", note: "Taxis in Santorini are fixed-rate, not metered. Agree the price before the journey." },
      { emoji: "🛵", label: "ATV / scooter",   cost: "$22–38/day",  note: "Popular with tourists for coastal roads. Roads are narrow — drive slowly and carefully.",  recommended: true },
      { emoji: "🚗", label: "Rental car",       cost: "$44–76/day",  note: "Useful for reaching quieter beaches. Parking can be tight in Oia and Fira." },
      { emoji: "⛵", label: "Ferry / boat",     cost: "$11–65",      note: "Ferries link Santorini to other islands (Mykonos, Naxos, Crete). Book in advance in summer." },
    ],
    apps: [
      { name: "Google Maps",  emoji: "🗺️", use: "Navigation — essential on winding caldera roads", available: true },
      { name: "Ferryhopper",  emoji: "⛵", use: "Book inter-island ferry tickets",                   available: true },
      { name: "Beat (Taxibeat)", emoji: "🚕", use: "Taxi app — available in Greece",                available: true },
      { name: "Klook / GetYourGuide", emoji: "🎟️", use: "Pre-book boat tours and day trips",       available: true },
    ],
    drivingSide: "right",
    tip: "The caldera path from Fira to Oia is a stunning 10km walk (3–4 hours) along the clifftop — one of the best ways to explore the island. Wear good shoes and go early.",
    warning: "Taxis are scarce in high season and can't be hailed on the street in Oia. Book your return taxi in advance or you may wait a long time.",
  },

  tokyo: {
    airport: "Narita International (NRT) or Haneda (HND)",
    airportCode: "TYO",
    transfers: [
      { option: "Narita Express (N'EX)",  emoji: "🚄", duration: "60 min",     cost: "~$20", tip: "Fastest from Narita — goes directly to Shinjuku, Shibuya, and Tokyo Station. Book online." },
      { option: "Limousine Bus",          emoji: "🚌", duration: "75–120 min", cost: "~$22", tip: "Comfortable, no changes. Goes directly to major hotels. Good if you have heavy luggage." },
      { option: "Haneda Monorail",        emoji: "🚝", duration: "25 min",     cost: "~$3",  tip: "From Haneda it's a very short trip to Hamamatsucho — then straight onto the JR lines." },
      { option: "Taxi",                   emoji: "🚕", duration: "60–90 min", cost: "$100–170", tip: "Expensive but useful late at night when trains stop." },
    ],
    gettingAround: [
      { emoji: "🚃", label: "Tokyo Metro & JR trains", cost: "$1.15–2.15/trip", note: "The best way to get around. Get a Suica IC card at the airport — tap in and out of every station.",  recommended: true },
      { emoji: "💳", label: "Suica / Pasmo IC card",   cost: "$3.35 deposit",   note: "Rechargeable card that works on all trains, buses, and convenience stores. Get one first thing.",      recommended: true },
      { emoji: "🚕", label: "Taxi",                    cost: "$5 base + meter", note: "Clean and reliable but expensive. Flag one down or use the Uber or S.RIDE app." },
      { emoji: "🚲", label: "Bicycle (Docomo Bikes)",  cost: "$1.10/30 min",    note: "Bike share available in central Tokyo. Great for flat areas like Asakusa or Yanaka." },
      { emoji: "🚌", label: "City bus",                cost: "$1.40/ride",      note: "Less tourist-friendly than trains but IC card works. Useful for Asakusa ↔ Ueno route." },
    ],
    apps: [
      { name: "Google Maps",    emoji: "🗺️", use: "Best for train route planning in Tokyo",   available: true },
      { name: "Suica App",      emoji: "💳", use: "Manage your IC card digitally (iPhone/Android)", available: true },
      { name: "Uber / S.RIDE",  emoji: "🚕", use: "Ride-hailing — useful late night",          available: true },
      { name: "Japan Official Travel App", emoji: "🗾", use: "Route planning + disaster info", available: true },
    ],
    drivingSide: "left",
    tip: "The Tokyo train network is huge but very logical. Download a offline metro map before you arrive. Avoid rush hour (7:30–9am and 5:30–8pm) — carriages are genuinely packed.",
    warning: "Last trains run around midnight. If you miss the last train, a taxi home can cost $35–100. Check your last train time in Google Maps before a night out.",
  },

  maldives: {
    airport: "Velana International Airport",
    airportCode: "MLE",
    transfers: [
      { option: "Seaplane (Twin Otter)", emoji: "🛥️", duration: "15–45 min", cost: "$300–700 return", tip: "Required for most atolls. Stunning views — the best arrival experience in travel. Book with your resort." },
      { option: "Speedboat",             emoji: "⚡",  duration: "20–90 min", cost: "$50–200 return",  tip: "For atolls within 90 min of Malé. Transfers are nearly always arranged by the resort — confirm when booking." },
      { option: "Domestic flight",       emoji: "✈️",  duration: "30–50 min", cost: "$100–300 return", tip: "Flies to outer atolls where seaplanes can't land at night. Maldivian Airlines operates most routes." },
      { option: "Ferry to local island", emoji: "⛴️",  duration: "30–90 min", cost: "~$2",             tip: "Budget option — public ferries from Malé to nearby inhabited islands like Maafushi. Very slow." },
    ],
    gettingAround: [
      { emoji: "🏝️", label: "Resort transfers",   cost: "Usually included", note: "Your resort arranges all inter-island transfers. Confirm what's included and what isn't before arriving.", recommended: true },
      { emoji: "⛵", label: "Dhow / boat excursion", cost: "$30–150",      note: "Day trips to sandbanks, snorkel spots, and uninhabited islands are usually booked through your resort." },
      { emoji: "🛻", label: "Bike on local islands", cost: "$5–10/day",   note: "On inhabited islands, bikes are the main form of transport. Most guesthouses rent them." },
      { emoji: "⛴️", label: "Public ferry",          cost: "$1–5",        note: "Very cheap but infrequent and slow. Good for budget island-hopping between inhabited islands near Malé." },
    ],
    apps: [
      { name: "WhatsApp",     emoji: "💬", use: "Most Maldivian guesthouses communicate via WhatsApp", available: true },
      { name: "Google Maps",  emoji: "🗺️", use: "Limited coverage outside Malé — use offline maps",   available: true },
      { name: "Maldives Booking", emoji: "🏨", use: "Local island guesthouse search",                 available: true },
    ],
    drivingSide: "left",
    tip: "Seaplanes only fly during daylight hours. If your flight arrives late, you'll stay in Malé overnight and transfer the next morning — factor this into your first night's booking.",
    warning: "Seaplane and speedboat transfers can be cancelled in bad weather. Build buffer days into your trip and get travel insurance that covers disrupted transfers.",
  },

  paris: {
    airport: "Charles de Gaulle (CDG) or Orly (ORY)",
    airportCode: "CDG/ORY",
    transfers: [
      { option: "RER B train (CDG)",     emoji: "🚆", duration: "35–45 min", cost: "$13",                          tip: "Fastest from CDG — runs every 10–15 min to Châtelet-Les Halles, St Michel, and Gare du Nord." },
      { option: "Orlyval + RER B (ORY)", emoji: "🚆", duration: "35–45 min", cost: "$14",                          tip: "Take the Orlyval shuttle to Antony station, then hop the RER B into the city." },
      { option: "Roissybus (CDG)",       emoji: "🚌", duration: "60–75 min", cost: "$18",                          tip: "Direct bus from CDG to Opéra — comfortable and no changes. Good for heavy luggage." },
      { option: "Taxi (fixed fare)",     emoji: "🚕", duration: "30–60 min", cost: "$38 (Left Bank) / $55 (Right Bank)", tip: "Fixed fares apply from CDG and ORY. Only use official taxis from the designated ranks." },
      { option: "Uber",                  emoji: "📱", duration: "30–60 min", cost: "$38–76",                       tip: "Reliable — meet in the 'Uber' zone outside arrivals. Often similar price to a taxi." },
    ],
    gettingAround: [
      { emoji: "🚇", label: "Métro",             cost: "$2.35/trip or Navigo pass", note: "16 lines covering virtually everywhere. A weekly Navigo pass ($33) is the best value if staying 5+ days.", recommended: true },
      { emoji: "🚶", label: "Walking",            cost: "Free",                      note: "Paris is very walkable between major attractions. The Marais to Notre-Dame is a 15-min stroll.",             recommended: true },
      { emoji: "🚲", label: "Vélib' bike share",  cost: "$3.30/30 min",             note: "Paris has 20,000+ shared bikes and well-marked cycle lanes. Great for the Seine riverbanks." },
      { emoji: "🛴", label: "Lime / Dott scooter", cost: "~$0.27/min",             note: "Dockless electric scooters — useful for short trips. Helmet laws apply." },
      { emoji: "🚕", label: "Taxi / Uber",         cost: "$11–27/trip",             note: "Use for late-night trips or airport runs. Uber is reliable. Avoid unlicensed cabs." },
      { emoji: "🚌", label: "Bus",                 cost: "$2.35 or Navigo",         note: "Great for sightseeing — bus 69 and 72 are scenic routes through central Paris." },
    ],
    apps: [
      { name: "Bonjour RATP",  emoji: "🚇", use: "Official Métro & bus journey planner", available: true },
      { name: "Navigo App",    emoji: "💳", use: "Manage weekly/monthly travel pass",    available: true },
      { name: "Uber",          emoji: "🚕", use: "Ride-hailing — works well in Paris",   available: true },
      { name: "Vélib'",        emoji: "🚲", use: "Paris bike share app",                 available: true },
      { name: "Google Maps",   emoji: "🗺️", use: "Navigation + Metro directions",        available: true },
    ],
    drivingSide: "right",
    tip: "A weekly Navigo pass (Monday–Sunday, $33) gives unlimited Métro, RER, and bus travel across Paris. If you arrive mid-week, it still pays off from 3+ days of use.",
    warning: "Pickpockets operate heavily on the RER B from CDG, the Métro line 1, and near the Eiffel Tower. Keep bags in front of you and use an anti-theft crossbody bag.",
  },
};

export function getTransportData(slug: string): TransportData | null {
  return transportData[slug] ?? null;
}
