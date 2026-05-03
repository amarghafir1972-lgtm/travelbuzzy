export type Rating = 1 | 2 | 3 | 4 | 5;
export type CrowdLevel = "Empty" | "Quiet" | "Moderate" | "Busy" | "Packed";
export type PriceTier = "Cheapest" | "Budget" | "Moderate" | "Pricey" | "Premium";

export interface MonthData {
  weather: Rating;
  crowds: Rating;      // 5 = empty, 1 = packed
  price: Rating;       // 5 = cheapest, 1 = most expensive
  overall: Rating;
  crowdLabel: CrowdLevel;
  priceLabel: PriceTier;
  weatherNote: string;
  tip?: string;
}

export interface DestinationSeasons {
  slug: string;
  name: string;
  flag: string;
  months: MonthData[]; // index 0 = January
}

const bestTimeData: DestinationSeasons[] = [
  {
    slug: "bali",
    name: "Bali",
    flag: "🇮🇩",
    months: [
      { weather: 2, crowds: 4, price: 4, overall: 2, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Wet season. Daily downpours, high humidity.",                  tip: "Ubud stays lush and green — good for culture, bad for beaches." },
      { weather: 2, crowds: 4, price: 4, overall: 2, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Still wet. Fewer tourists, lower prices.",                     tip: "Cheapest month for hotels if you don't mind afternoon rain." },
      { weather: 3, crowds: 3, price: 3, overall: 3, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Wet season ending. Nyepi (New Year) closes the island.",      tip: "Nyepi is unique — 24hrs of silence, no flights in or out. Plan around it." },
      { weather: 4, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Dry season begins. Good beach weather, manageable crowds.",   tip: "Sweet spot — reliable sun, no school holidays yet." },
      { weather: 5, crowds: 4, price: 4, overall: 5, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Dry, warm, clear skies. Best weather of the year.",            tip: "The best month in Bali. Book ahead — it's increasingly popular." },
      { weather: 5, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Dry season peak. Slight haze building in south Bali.",         tip: "European summer holiday crowds start arriving. Still very good." },
      { weather: 4, crowds: 1, price: 1, overall: 3, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "Dry but peak tourist season. Beaches and restaurants rammed.", tip: "Book everything months ahead or you'll pay double and queue everywhere." },
      { weather: 4, crowds: 1, price: 1, overall: 3, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "Dry and hot. The most crowded and expensive month.",             tip: "Great weather, terrible value. Avoid unless flights are already booked." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Dry season finale. Excellent weather, crowds thinning.",       tip: "One of the best months. Crowd levels dropping while weather stays perfect." },
      { weather: 4, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Transition month. Occasional showers starting late October.",  tip: "Good value. Last of the reliable dry weather." },
      { weather: 2, crowds: 3, price: 3, overall: 2, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Wet season arrives. Daily rain, lush landscapes.",              tip: "Ubud's temples look spectacular in the rain — if that's your thing." },
      { weather: 2, crowds: 2, price: 2, overall: 2, crowdLabel: "Busy",     priceLabel: "Pricey",   weatherNote: "Wet and expensive. Christmas/NYE spike in prices.",            tip: "Worst combination — heavy rain and holiday surcharges. Skip unless NYE is the plan." },
    ],
  },
  {
    slug: "santorini",
    name: "Santorini",
    flag: "🇬🇷",
    months: [
      { weather: 2, crowds: 5, price: 5, overall: 2, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "Cold, windy, grey. Most hotels and restaurants closed.",       tip: "Almost nothing open. Not worth coming unless you love empty caldera walks." },
      { weather: 2, crowds: 5, price: 5, overall: 2, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "Still cold. Some restaurants opening for the season.",         tip: "Bare-bones island. A handful of year-round spots open." },
      { weather: 3, crowds: 5, price: 4, overall: 3, crowdLabel: "Empty",    priceLabel: "Budget",   weatherNote: "Warming up. Most hotels reopen mid-March.",                    tip: "First month worth considering — prices low, island quiet, spring flowers." },
      { weather: 4, crowds: 4, price: 4, overall: 4, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Pleasant, 18–22°C. Everything open, very manageable.",         tip: "Great for photographers — Oia without the selfie crowds." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "25°C, sunny, calm seas. Almost perfect.",                      tip: "Best balance of good weather and manageable crowds." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "28°C and beautiful. Peak season starting.",                    tip: "Still manageable before the July–August rush. Book 2–3 months ahead." },
      { weather: 4, crowds: 1, price: 1, overall: 2, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "31°C, very sunny, but Oia at sunset is standing-room-only.",   tip: "Cruise ships disgorge 10,000 people daily. Oia sunset is a organised chaos." },
      { weather: 4, crowds: 1, price: 1, overall: 2, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "The hottest and most crowded month.",                           tip: "The worst month to visit Santorini. Book September instead." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "27°C, sea warm, crowds thinning after 15 Sept.",               tip: "The best month of the year. Warm sea, manageable crowds, golden light." },
      { weather: 4, crowds: 4, price: 4, overall: 4, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "22°C, quieter island, many places still open.",                tip: "Underrated month. Great weather, prices dropping, fewer tourists." },
      { weather: 2, crowds: 5, price: 5, overall: 2, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "Season ending. Many hotels closing for winter.",               tip: "Shoulder — only go if you specifically want the empty-island experience." },
      { weather: 2, crowds: 5, price: 5, overall: 2, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "Winter. Cold, windy, very few places open.",                   tip: "Avoid." },
    ],
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    flag: "🇯🇵",
    months: [
      { weather: 2, crowds: 4, price: 4, overall: 3, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Cold (5°C), clear skies, few tourists, great museums.",       tip: "New Year (1–3 Jan) is busy then very quiet. Good for temples and hot food." },
      { weather: 2, crowds: 4, price: 4, overall: 3, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Cold but sunny. Early plum blossoms in late February.",        tip: "Excellent value, almost no queues. Plum blossom festivals are underrated." },
      { weather: 4, crowds: 2, price: 2, overall: 4, crowdLabel: "Busy",     priceLabel: "Pricey",   weatherNote: "Cherry blossom season. 15–18°C, spectacular.",                tip: "Book 6 months ahead for cherry blossom dates — hotels sell out completely." },
      { weather: 5, crowds: 2, price: 2, overall: 4, crowdLabel: "Busy",     priceLabel: "Pricey",   weatherNote: "Peak cherry blossom. 18–22°C. Incredibly beautiful.",          tip: "The most magical time — and the most chaotic. Ueno Park is shoulder-to-shoulder." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "22–26°C, Golden Week holiday rush (29 Apr–5 May), then quiet.",tip: "Avoid Golden Week (massive domestic travel). First week of May is excellent." },
      { weather: 3, crowds: 4, price: 4, overall: 3, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Rainy season (tsuyu). Humid, grey, 27°C.",                    tip: "Cheapest month. Hydrangeas bloom beautifully despite the rain." },
      { weather: 2, crowds: 3, price: 3, overall: 2, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Hot (33°C) and extremely humid. Heat advisories common.",      tip: "Brutal. If you must go, wake at 6am and be indoors by 1pm." },
      { weather: 2, crowds: 3, price: 3, overall: 2, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Peak heat and humidity. Typhoon season begins.",               tip: "Worst month. Same as July but with typhoon risk added." },
      { weather: 4, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Cooling down (25°C). Silver Week holiday in mid-Sept.",       tip: "Great month. Avoid Silver Week (23–25 Sept) for domestic crowd surge." },
      { weather: 5, crowds: 2, price: 2, overall: 5, crowdLabel: "Busy",     priceLabel: "Pricey",   weatherNote: "Peak autumn colours. 18°C, stunning reds and oranges.",       tip: "Second-best time after cherry blossom. Nikko and Kyoto are unmissable in October." },
      { weather: 4, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Autumn colours peak, then fade. Cooling quickly.",             tip: "Early November still has excellent leaf colours. Great food festivals." },
      { weather: 3, crowds: 3, price: 3, overall: 3, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Cold (8°C) but festive. Christmas illuminations city-wide.",   tip: "Tokyo's winter illuminations are genuinely spectacular — Roppongi, Marunouchi." },
    ],
  },
  {
    slug: "maldives",
    name: "Maldives",
    flag: "🇲🇻",
    months: [
      { weather: 5, crowds: 2, price: 1, overall: 4, crowdLabel: "Busy",     priceLabel: "Premium",  weatherNote: "Peak dry season. Calm, clear, sunny. Best diving visibility.", tip: "Christmas/NYE rates carry into early January. Book 6+ months ahead." },
      { weather: 5, crowds: 3, price: 2, overall: 5, crowdLabel: "Moderate", priceLabel: "Pricey",   weatherNote: "Best weather of the year. Flat seas, stunning visibility.",    tip: "Perfect diving and snorkelling. Manta rays in the North Malé Atoll." },
      { weather: 5, crowds: 3, price: 2, overall: 5, crowdLabel: "Moderate", priceLabel: "Pricey",   weatherNote: "Excellent dry season. Clear skies, calm lagoons.",             tip: "Whale sharks appear in South Ari Atoll year-round, best visibility now." },
      { weather: 4, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Dry season ending. Still beautiful, occasional cloud.",        tip: "Good value window as dry season winds down — weather still mostly great." },
      { weather: 3, crowds: 4, price: 4, overall: 3, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Wet season transition. Squalls build, afternoons can be grey.", tip: "Budget-friendly. Mornings usually sunny — go early for watersports." },
      { weather: 3, crowds: 5, price: 5, overall: 3, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "SW monsoon arrives. Rougher seas, shorter dives possible.",    tip: "Cheapest rates. Surfing season begins at Chickens and Cokes." },
      { weather: 3, crowds: 5, price: 5, overall: 3, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "Monsoon season. Overcast with sunny breaks. Good surfing.",   tip: "Bioluminescent plankton peaks July–Sept. Night snorkelling is magical." },
      { weather: 3, crowds: 4, price: 4, overall: 3, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "SW monsoon continuing but improving.",                         tip: "Discount rates, bioluminescence, and fewer crowds — underrated month." },
      { weather: 3, crowds: 4, price: 4, overall: 3, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "Transition to dry season. Hit-and-miss weather.",              tip: "Prices still low but weather improving. Good gamble for budget travellers." },
      { weather: 4, crowds: 3, price: 3, overall: 4, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "Dry season begins again. Good weather returning.",             tip: "Sweet spot — reasonable rates, improving weather, less competition for dive spots." },
      { weather: 5, crowds: 2, price: 2, overall: 4, crowdLabel: "Busy",     priceLabel: "Pricey",   weatherNote: "Peak dry season. Excellent for diving and beaches.",           tip: "Manta rays peak in South Malé Atoll November–May." },
      { weather: 5, crowds: 1, price: 1, overall: 3, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "Best weather but peak prices. Christmas and NYE surcharges.",  tip: "The most expensive week of the year globally for Maldives resorts." },
    ],
  },
  {
    slug: "paris",
    name: "Paris",
    flag: "🇫🇷",
    months: [
      { weather: 2, crowds: 5, price: 5, overall: 3, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "5°C, grey, occasional snow. Very few tourists.",              tip: "Best time for museums — no queues at the Louvre, cheap flights, cosy bistros." },
      { weather: 2, crowds: 5, price: 5, overall: 3, crowdLabel: "Empty",    priceLabel: "Cheapest", weatherNote: "Still cold but days getting longer. Fashion Week late Feb.",   tip: "Cheap and quiet. Fashion Week creates a brief buzz if that's your scene." },
      { weather: 3, crowds: 4, price: 4, overall: 4, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "10°C, spring flowers. Crowds building but still manageable.", tip: "Brasseries put out heaters and terraces. Great month for neighbourhood walks." },
      { weather: 4, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "16°C, cherry blossoms in the parks, terraces packed.",        tip: "Paris at its most beautiful. Book restaurants a week ahead minimum." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "20°C, long evenings, al fresco everything.",                  tip: "The best month. Versailles gardens at their finest, river banks humming." },
      { weather: 5, crowds: 2, price: 2, overall: 4, crowdLabel: "Busy",     priceLabel: "Pricey",   weatherNote: "24°C, school holidays starting. Getting crowded.",            tip: "Book key sights ahead. Last good month before peak summer crowds." },
      { weather: 4, crowds: 1, price: 1, overall: 3, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "26°C and peak tourist season. Locals mostly leave for August.", tip: "Many neighbourhood restaurants close for August. Tourist-trap risk very high." },
      { weather: 4, crowds: 1, price: 1, overall: 2, crowdLabel: "Packed",   priceLabel: "Premium",  weatherNote: "Hot and overrun. The worst month for an authentic Paris experience.", tip: "Avoid. Most real Parisians leave, many local spots close, prices peak." },
      { weather: 5, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "21°C, locals return. Genuine Paris energy resumes.",           tip: "Rentrée magic — city comes back to life. September may be Paris at its best." },
      { weather: 4, crowds: 3, price: 3, overall: 5, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "15°C, autumn colours in the parks, excellent food season.",   tip: "Burgundy wine harvest season — excellent food and wine events citywide." },
      { weather: 3, crowds: 4, price: 4, overall: 4, crowdLabel: "Quiet",    priceLabel: "Budget",   weatherNote: "9°C, getting grey but uncrowded.",                            tip: "Good value. Café culture at its most authentic — everyone's indoors and talking." },
      { weather: 2, crowds: 3, price: 3, overall: 3, crowdLabel: "Moderate", priceLabel: "Moderate", weatherNote: "6°C, Christmas markets on Champs-Élysées, festive lights.",   tip: "Christmas Paris is magical but pricey. Book early for the markets period." },
    ],
  },
];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MONTHS_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default bestTimeData;
