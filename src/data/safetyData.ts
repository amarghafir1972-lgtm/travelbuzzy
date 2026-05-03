export type SafetyLevel = "low" | "moderate" | "high" | "very-high";

export type RiskItem = {
  label: string;
  level: SafetyLevel;
  note: string;
};

export type EmergencyNumber = {
  service: string;
  emoji: string;
  number: string;
};

export type HospitalInfo = {
  quality: "excellent" | "good" | "adequate" | "limited";
  note: string;
  tip: string;
};

export type SafetyData = {
  overallSafety: SafetyLevel;
  overallNote: string;
  tapWater: { safe: boolean; note: string };
  risks: RiskItem[];
  emergency: EmergencyNumber[];
  hospital: HospitalInfo;
  insuranceTip: string;
  safetyTips: { emoji: string; text: string }[];
};

const safetyData: Record<string, SafetyData> = {
  bali: {
    overallSafety: "low",
    overallNote: "Bali is generally very safe for tourists. Petty theft and scams are the main concerns — violent crime against visitors is rare.",
    tapWater: {
      safe: false,
      note: "Do not drink tap water. Stick to sealed bottled water — even in nicer restaurants. Avoid ice in drinks unless at a reputable establishment.",
    },
    risks: [
      { label: "Petty theft / bag snatching", level: "moderate", note: "Keep bags in front of you on busy streets and be wary of motorbike bag snatches in Kuta and Seminyak." },
      { label: "Scooter accidents",           level: "high",     note: "The #1 cause of tourist injury. Roads are busy and poorly lit at night. Only ride if experienced." },
      { label: "Scams & overcharging",        level: "moderate", note: "Taxi overcharging, fake tours, and gem/art scams are common. Use Grab or agree prices upfront." },
      { label: "Stomach illness",             level: "moderate", note: "Bali belly is very common. Stick to cooked food from busy warungs and avoid raw salads at cheaper spots." },
      { label: "Jellyfish & rip currents",    level: "moderate", note: "Some beaches have strong currents. Swim only at patrolled beaches (Kuta, Seminyak) and check flags." },
      { label: "Rabies",                      level: "moderate", note: "Stray dogs and monkeys carry rabies risk. Avoid touching animals — especially at monkey forests." },
      { label: "Violent crime",               level: "low",      note: "Rare against tourists. Exercise normal vigilance, especially at night." },
    ],
    emergency: [
      { service: "Police",          emoji: "👮", number: "110" },
      { service: "Ambulance",       emoji: "🚑", number: "118" },
      { service: "Fire",            emoji: "🚒", number: "113" },
      { service: "BIMC Hospital (tourist-focused)", emoji: "🏥", number: "+62 361 761 263" },
    ],
    hospital: {
      quality: "adequate",
      note: "BIMC Hospital (Kuta and Nusa Dua) caters specifically to tourists and has English-speaking staff. For serious conditions, medical evacuation to Singapore or Australia is often recommended.",
      tip: "Get comprehensive travel insurance that includes emergency medical evacuation — it can cost $30,000+ without it.",
    },
    insuranceTip: "Make sure your policy covers scooter/motorbike accidents — many standard policies exclude this. Check the fine print before you ride.",
    safetyTips: [
      { emoji: "💊", text: "Carry rehydration sachets — Bali belly hits fast and dehydration in the heat is serious." },
      { emoji: "🌙", text: "Avoid walking alone late at night in Kuta — it's noisy and petty crime increases after midnight." },
      { emoji: "🐕", text: "If bitten by an animal, go to BIMC immediately — rabies post-exposure prophylaxis must begin quickly." },
      { emoji: "🏧", text: "Use ATMs inside convenience stores or bank lobbies rather than street-facing machines to avoid card skimmers." },
    ],
  },

  santorini: {
    overallSafety: "very-high",
    overallNote: "Santorini and Greece generally are very safe destinations. Crime rates are low and the island is well-equipped for tourists.",
    tapWater: {
      safe: false,
      note: "Tap water in Santorini is technically drinkable but has a strong mineral taste due to desalination. Most locals and visitors use bottled water.",
    },
    risks: [
      { label: "Pickpocketing",          level: "low",      note: "Rare on Santorini compared to mainland Athens. Stay alert in crowded areas in Fira and Oia." },
      { label: "Sunstroke / heatstroke", level: "high",     note: "Summers are extremely hot (35°C+). Drink water constantly, wear a hat, and avoid midday sun in July–August." },
      { label: "ATV / scooter accidents",level: "moderate", note: "ATVs are popular but the roads are narrow and winding. Accidents are common — drive slowly." },
      { label: "Cliff edge hazards",     level: "moderate", note: "The caldera path has unfenced edges. Be careful, especially at dusk or if you've had wine at dinner." },
      { label: "Sea urchins",            level: "low",      note: "Present on rocky beaches — wear water shoes on volcanic beaches like Kamari and Perissa." },
      { label: "Violent crime",          level: "low",      note: "Very rare. Santorini is one of the safest tourist destinations in Europe." },
    ],
    emergency: [
      { service: "Police",       emoji: "👮", number: "100" },
      { service: "Ambulance",    emoji: "🚑", number: "166" },
      { service: "Fire",         emoji: "🚒", number: "199" },
      { service: "Coast Guard",  emoji: "⛵", number: "108" },
      { service: "EU Emergency", emoji: "🆘", number: "112" },
    ],
    hospital: {
      quality: "adequate",
      note: "Santorini has a small public hospital in Fira. For serious conditions, patients are airlifted to larger hospitals in Athens. Medical care is adequate for minor issues.",
      tip: "EHIC / GHIC cards give EU/UK citizens access to state healthcare. Always carry it alongside travel insurance.",
    },
    insuranceTip: "EHIC/GHIC covers basic state care but not repatriation, cancelled trips, or private clinics. Get full travel insurance on top.",
    safetyTips: [
      { emoji: "☀️", text: "Sunburn happens extremely fast in the Aegean. Reapply SPF 50 every 2 hours, especially on boat trips." },
      { emoji: "💧", text: "Carry water everywhere — the caldera walk and village steps are strenuous and dehydration is common." },
      { emoji: "🥂", text: "Local wine is strong and dehydrating in the heat. Alternate every glass with a glass of water." },
      { emoji: "🏥", text: "Travel insurance is essential — helicopter evacuation to Athens is expensive without cover." },
    ],
  },

  tokyo: {
    overallSafety: "very-high",
    overallNote: "Tokyo is one of the safest major cities in the world. Crime rates are extremely low and tourists rarely experience any problems beyond getting lost.",
    tapWater: {
      safe: true,
      note: "Tokyo tap water is excellent quality — clean, safe, and good-tasting. You can drink freely from the tap and refill bottles anywhere.",
    },
    risks: [
      { label: "Petty theft",            level: "low",      note: "Japan has very low theft rates. That said, don't leave belongings unattended in busy areas." },
      { label: "Earthquakes",            level: "moderate", note: "Japan is seismically active. Familiarise yourself with the earthquake alert sound on your phone and the 'Drop, Cover, Hold' protocol." },
      { label: "Extreme summer heat",    level: "high",     note: "July–August in Tokyo is brutal: 35–38°C with very high humidity. Stay hydrated and use air-conditioned spaces regularly." },
      { label: "Typhoons",               level: "moderate", note: "Typhoon season runs June–October. Monitor NHK World or the Japan Meteorological Agency app for updates." },
      { label: "Crowding / overheating", level: "moderate", note: "Trains in rush hour are extremely crowded. Be mindful of personal space and follow queuing rules strictly." },
      { label: "Violent crime",          level: "low",      note: "Extremely rare. Tokyo is consistently ranked among the world's safest cities." },
    ],
    emergency: [
      { service: "Police",                 emoji: "👮", number: "110" },
      { service: "Ambulance / Fire",       emoji: "🚑", number: "119" },
      { service: "Japan Helpline (24hr)",  emoji: "🆘", number: "0120-461-997" },
      { service: "Tourist Hotline (Japan Tourism Agency)", emoji: "ℹ️", number: "050-3816-2787" },
    ],
    hospital: {
      quality: "excellent",
      note: "Tokyo has world-class medical facilities. Several hospitals have international patient departments with English-speaking staff, including St. Luke's International Hospital and Tokyo Medical and Surgical Clinic.",
      tip: "Medical care in Japan is excellent but can be expensive for non-residents. Travel insurance is still essential — a simple ER visit can cost $135–335.",
    },
    insuranceTip: "Japan's healthcare is high quality but not free for tourists. Even a minor hospital visit can be expensive without insurance.",
    safetyTips: [
      { emoji: "📱", text: "Download the NHK World app and enable Japan's earthquake/disaster alerts on your phone before you arrive." },
      { emoji: "🏧", text: "7-Eleven ATMs are the most reliable for international cards — find one near your hotel on day one." },
      { emoji: "🌡️", text: "In summer, carry a small folding fan, a cooling towel, and a refillable water bottle — convenience stores sell all of these cheaply." },
      { emoji: "🚶", text: "If you feel an earthquake: stay calm, get under a table or door frame, move away from windows. Follow hotel staff instructions." },
    ],
  },

  maldives: {
    overallSafety: "high",
    overallNote: "Resort islands are extremely safe — crime is virtually zero on private atolls. Local inhabited islands require more cultural awareness but are generally safe.",
    tapWater: {
      safe: false,
      note: "Do not drink tap water outside of resorts. Resorts provide desalinated or filtered water. On local islands, use sealed bottled water only.",
    },
    risks: [
      { label: "Marine hazards",         level: "moderate", note: "Strong currents, coral, jellyfish, and sea urchins are present. Always dive/snorkel with a guide and check conditions." },
      { label: "Sunburn",                level: "high",     note: "UV levels are extreme near the equator. Apply reef-safe SPF 50+ every 2 hours — especially on boat days." },
      { label: "Dehydration",            level: "moderate", note: "The heat and humidity are intense. Drink more water than you think you need." },
      { label: "Cultural sensitivity",   level: "moderate", note: "Visiting local islands in revealing clothing or with alcohol can cause serious offence and may be illegal." },
      { label: "Boat transfer safety",   level: "moderate", note: "Speedboat transfers can be rough in bad weather. Always wear a life jacket — they should be provided." },
      { label: "Violent crime",          level: "low",      note: "Crime against tourists on resort islands is extremely rare." },
    ],
    emergency: [
      { service: "Police",                   emoji: "👮", number: "119" },
      { service: "Ambulance",                emoji: "🚑", number: "102" },
      { service: "Coast Guard",              emoji: "⛵", number: "191" },
      { service: "AMDC Clinic (Malé)",       emoji: "🏥", number: "+960 331 3553" },
    ],
    hospital: {
      quality: "limited",
      note: "Medical facilities on resort islands are limited to basic clinics. Malé has ADK Hospital, the best in the country. For serious conditions, medical evacuation to Sri Lanka, India, or Singapore is standard.",
      tip: "Medical evacuation from a remote atoll can cost $30,000–$100,000 without insurance. This is non-negotiable cover for the Maldives.",
    },
    insuranceTip: "Medical evacuation cover is absolutely essential. Remote atoll location means helicopter or seaplane evacuation is the only option for serious emergencies.",
    safetyTips: [
      { emoji: "🦈", text: "Shark sightings are common but sharks here are reef sharks — not dangerous to humans. Don't touch or feed them." },
      { emoji: "🌊", text: "Check with your resort about current and tide conditions before snorkelling or swimming from a sandbank." },
      { emoji: "🍺", text: "Carrying alcohol on local islands is illegal and can result in arrest. Consume it only on resort islands." },
      { emoji: "🌞", text: "You are 4° from the equator — UV is extreme even on cloudy days. Cover up between 11am–3pm." },
    ],
  },

  paris: {
    overallSafety: "moderate",
    overallNote: "Paris is generally safe but pickpocketing is rampant in tourist areas. Violent crime against tourists is uncommon — the main risk is theft, particularly on public transport.",
    tapWater: {
      safe: true,
      note: "Paris tap water is excellent quality and perfectly safe to drink. The city has free drinking fountains (fontaines Wallace) throughout — use them.",
    },
    risks: [
      { label: "Pickpocketing",              level: "high",     note: "A serious issue on the Métro (especially line 1 and RER B), at the Eiffel Tower, Sacré-Cœur, and Louvre. Use an anti-theft bag and keep valuables in front pockets." },
      { label: "Petition / distraction scams", level: "high",  note: "'Petition signers', 'friendship bracelet' vendors, and 'found ring' scammers are very common near tourist sights. Walk away without engaging." },
      { label: "Bag snatching",              level: "moderate", note: "Particularly from café chairs and outdoor terraces. Loop bag straps around your chair leg." },
      { label: "Transport strikes",          level: "moderate", note: "France has frequent strike action (grèves). Check RATP/SNCF apps for disruptions before travel days." },
      { label: "Air quality",                level: "low",      note: "Occasional summer smog alerts. Check Airparif for air quality if you have respiratory issues." },
      { label: "Violent crime",              level: "low",      note: "Rare against tourists. Avoid poorly lit areas in the northern arrondissements late at night." },
    ],
    emergency: [
      { service: "Police",                emoji: "👮", number: "17" },
      { service: "SAMU (Ambulance)",       emoji: "🚑", number: "15" },
      { service: "Fire (Pompiers)",        emoji: "🚒", number: "18" },
      { service: "EU Emergency",           emoji: "🆘", number: "112" },
      { service: "Anti-poison centre",     emoji: "☠️", number: "01 40 05 48 48" },
    ],
    hospital: {
      quality: "excellent",
      note: "France has world-class public healthcare. Major hospitals include Hôpital Lariboisière (near Gare du Nord), Hôtel-Dieu (on Île de la Cité), and the American Hospital of Paris (private, English-speaking).",
      tip: "EU/EEA citizens with an EHIC/GHIC card get access to French state healthcare at reduced cost. Always carry it.",
    },
    insuranceTip: "EHIC/GHIC covers state care but not private hospitals, repatriation, or lost luggage. Get comprehensive travel insurance on top.",
    safetyTips: [
      { emoji: "👜", text: "Use a zipped crossbody anti-theft bag. Backpacks are prime pickpocket targets on the Métro." },
      { emoji: "🚫", text: "If approached by petition-clipboard strangers, say 'Non merci' and walk away — do not stop or engage." },
      { emoji: "☕", text: "On café terraces, keep your bag on your lap or loop it around your chair leg — bag snatches from tables are common." },
      { emoji: "📱", text: "Keep your phone in your pocket when walking — phone snatching from pedestrians is increasing in Paris." },
    ],
  },
};

export function getSafetyData(slug: string): SafetyData | null {
  return safetyData[slug] ?? null;
}

export const SAFETY_LEVEL_CONFIG: Record<SafetyLevel, { label: string; color: string; bg: string; border: string; dot: string; bar: string }> = {
  "low":       { label: "Low risk",       color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-400"  },
  "moderate":  { label: "Moderate",       color: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200",   dot: "bg-amber-400",   bar: "bg-amber-400"    },
  "high":      { label: "Take care",      color: "text-orange-700",  bg: "bg-orange-50",   border: "border-orange-200",  dot: "bg-orange-500",  bar: "bg-orange-500"   },
  "very-high": { label: "Very safe",      color: "text-sky-700",     bg: "bg-sky-50",      border: "border-sky-200",     dot: "bg-sky-500",     bar: "bg-sky-400"      },
};

export const OVERALL_SAFETY_CONFIG: Record<SafetyLevel, { label: string; emoji: string; color: string; bg: string; border: string }> = {
  "very-high": { label: "Very safe destination", emoji: "🟢", color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200" },
  "low":       { label: "Generally safe",         emoji: "🟡", color: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200"   },
  "moderate":  { label: "Exercise caution",        emoji: "🟠", color: "text-orange-700",  bg: "bg-orange-50",   border: "border-orange-200"  },
  "high":      { label: "High caution advised",    emoji: "🔴", color: "text-rose-700",    bg: "bg-rose-50",     border: "border-rose-200"    },
};
