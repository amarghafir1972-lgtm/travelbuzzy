export type Nationality = "uk" | "us" | "eu" | "au";

export type VisaStatus =
  | "visa-free"
  | "visa-on-arrival"
  | "e-visa"
  | "visa-required"
  | "e-visa-or-voa";

export type NationalityEntry = {
  status: VisaStatus;
  stayDays?: number;
  cost?: string;
  note?: string;
  link?: string;
};

export type HealthRequirement = {
  label: string;
  required: boolean;
  recommended?: boolean;
  note?: string;
};

export type EntryTip = {
  emoji: string;
  text: string;
};

export type VisaData = {
  destinationCountry: string;
  currency: string;
  nationalities: Record<Nationality, NationalityEntry>;
  health: HealthRequirement[];
  entryTips: EntryTip[];
  passportValidity: string;
  disclaimer: string;
};

const visaData: Record<string, VisaData> = {
  bali: {
    destinationCountry: "Indonesia",
    currency: "IDR (Indonesian Rupiah)",
    passportValidity: "Must be valid for at least 6 months beyond your entry date.",
    nationalities: {
      uk: {
        status: "visa-free",
        stayDays: 30,
        note: "Free 30-day visa-free entry. Extendable once for another 30 days at an immigration office. Arrivals via Ngurah Rai Airport (Bali).",
      },
      us: {
        status: "visa-free",
        stayDays: 30,
        note: "Free 30-day visa-free entry for US passport holders. Same extension rules apply.",
      },
      eu: {
        status: "visa-free",
        stayDays: 30,
        note: "Most EU nationalities receive free 30-day visa-free entry. Check your specific country on the Indonesian immigration website.",
      },
      au: {
        status: "visa-free",
        stayDays: 30,
        note: "Australian citizens receive 30 days visa-free. Extension available at immigration offices in Bali.",
      },
    },
    health: [
      { label: "COVID-19 vaccination", required: false, note: "No longer required as of 2023." },
      { label: "Yellow fever vaccine", required: false, note: "Required only if arriving from a yellow fever endemic country." },
      { label: "Hepatitis A & B", required: false, recommended: true, note: "Strongly recommended — contaminated food/water risk." },
      { label: "Typhoid", required: false, recommended: true, note: "Recommended, especially if eating street food." },
      { label: "Dengue fever awareness", required: false, recommended: true, note: "No vaccine required but use insect repellent — dengue is present in Bali." },
      { label: "Rabies", required: false, recommended: true, note: "Recommended if you'll be in rural areas or interact with animals (monkeys, dogs)." },
    ],
    entryTips: [
      { emoji: "💳", text: "Have proof of onward travel ready — immigration officers sometimes ask." },
      { emoji: "🧾", text: "Fill in the Indonesian e-customs declaration form online before arrival to speed up entry." },
      { emoji: "🚫", text: "Indonesia has strict drug laws — penalties including the death penalty. Declare all medications." },
      { emoji: "👗", text: "Dress modestly when entering temples — sarong and sash are often provided free." },
    ],
    disclaimer: "Visa rules change frequently. Always verify with the Indonesian embassy or consulate for your nationality before travelling.",
  },

  santorini: {
    destinationCountry: "Greece (Schengen Area)",
    currency: "EUR (Euro)",
    passportValidity: "Must be valid for at least 3 months beyond your intended departure from the Schengen Area.",
    nationalities: {
      uk: {
        status: "visa-free",
        stayDays: 90,
        note: "Post-Brexit: UK citizens can visit for up to 90 days in any 180-day period without a visa. ETIAS will be required from 2025 (~$8 fee, valid 3 years).",
      },
      us: {
        status: "visa-free",
        stayDays: 90,
        note: "US citizens can visit for up to 90 days in any 180-day period. ETIAS will apply from 2025.",
      },
      eu: {
        status: "visa-free",
        note: "EU/EEA citizens can stay indefinitely with a valid ID card or passport — no separate visa needed.",
      },
      au: {
        status: "visa-free",
        stayDays: 90,
        note: "Australian citizens get up to 90 days in any 180-day period. ETIAS required from 2025.",
      },
    },
    health: [
      { label: "COVID-19 vaccination", required: false, note: "No restrictions as of 2024." },
      { label: "Routine vaccinations", required: false, recommended: true, note: "Ensure MMR, tetanus, and flu are up to date." },
      { label: "Hepatitis A", required: false, recommended: true, note: "Recommended for most travellers." },
    ],
    entryTips: [
      { emoji: "🛂", text: "UK, US, AU passport holders: track your 90/180 day Schengen allowance carefully — overstaying can result in bans." },
      { emoji: "🪪", text: "EU citizens can enter with just a national ID card — no passport required." },
      { emoji: "🌐", text: "ETIAS (EU travel authorisation) will be required for visa-exempt non-EU visitors from 2025. Pre-register online." },
      { emoji: "🏖️", text: "High season (July–August) is very busy — book ferries between islands well in advance." },
    ],
    disclaimer: "Greece is part of the Schengen Area. The ETIAS system timeline may shift — check the official EU ETIAS website before travel.",
  },

  tokyo: {
    destinationCountry: "Japan",
    currency: "JPY (Japanese Yen)",
    passportValidity: "Must be valid for the duration of your stay — Japan does not require the 6-month rule, but airlines may differ.",
    nationalities: {
      uk: {
        status: "visa-free",
        stayDays: 90,
        note: "UK passport holders can visit for up to 90 days visa-free for tourism/business.",
      },
      us: {
        status: "visa-free",
        stayDays: 90,
        note: "US citizens can stay up to 90 days without a visa.",
      },
      eu: {
        status: "visa-free",
        stayDays: 90,
        note: "Most EU nationalities receive 90-day visa-free entry. Some countries may differ — check with the Japanese embassy.",
      },
      au: {
        status: "visa-free",
        stayDays: 90,
        note: "Australian citizens can visit for up to 90 days without a visa.",
      },
    },
    health: [
      { label: "COVID-19 vaccination", required: false, note: "All COVID-19 border measures removed as of May 2023." },
      { label: "Japanese encephalitis", required: false, recommended: true, note: "Recommended for rural travel or stays longer than 30 days." },
      { label: "Hepatitis A & B", required: false, recommended: true },
      { label: "Rabies", required: false, note: "Extremely low risk — Japan is considered rabies-free." },
    ],
    entryTips: [
      { emoji: "📋", text: "Complete the Visit Japan Web registration before arrival to speed up immigration and customs." },
      { emoji: "💊", text: "Some over-the-counter medications are banned in Japan (e.g. certain cold medicines containing pseudoephedrine). Check before you pack." },
      { emoji: "🚫", text: "Japan has strict drug laws — even cannabis (legal in your home country) is illegal and carries serious penalties." },
      { emoji: "🏦", text: "Carry cash — Japan is still largely cash-based. 7-Eleven ATMs accept international cards reliably." },
    ],
    disclaimer: "Japan occasionally adjusts visa and entry rules. Check the Japan Tourism Agency and your country's embassy for current requirements.",
  },

  maldives: {
    destinationCountry: "Maldives",
    currency: "MVR (Maldivian Rufiyaa) — USD widely accepted",
    passportValidity: "Must be valid for at least 6 months beyond the date of entry.",
    nationalities: {
      uk: {
        status: "visa-on-arrival",
        stayDays: 30,
        cost: "Free",
        note: "All nationalities receive a free 30-day visa on arrival. Extendable to 90 days at the Department of Immigration.",
      },
      us: {
        status: "visa-on-arrival",
        stayDays: 30,
        cost: "Free",
        note: "Free 30-day visa on arrival for all passport holders, including US citizens.",
      },
      eu: {
        status: "visa-on-arrival",
        stayDays: 30,
        cost: "Free",
        note: "Free 30-day visa on arrival — no pre-arrangement needed.",
      },
      au: {
        status: "visa-on-arrival",
        stayDays: 30,
        cost: "Free",
        note: "Free 30-day visa on arrival for Australian passport holders.",
      },
    },
    health: [
      { label: "COVID-19 vaccination", required: false, note: "No longer required." },
      { label: "Yellow fever vaccine", required: true, note: "Required ONLY if arriving from a yellow fever endemic country — you must show your vaccination certificate." },
      { label: "Hepatitis A", required: false, recommended: true },
      { label: "Typhoid", required: false, recommended: true, note: "Tap water is generally not safe to drink on local islands." },
      { label: "Dengue awareness", required: false, recommended: true, note: "Dengue is present — use insect repellent on local islands." },
    ],
    entryTips: [
      { emoji: "🍺", text: "Alcohol is strictly prohibited on local islands — it's only served on resort islands. Possession on local islands can result in arrest." },
      { emoji: "👗", text: "Dress modestly (cover shoulders and knees) in public on local islands. Bikinis/swimwear are only permitted on resort beaches." },
      { emoji: "💰", text: "Have proof of sufficient funds and a hotel booking on arrival — immigration may ask." },
      { emoji: "🐠", text: "Reef-safe sunscreen is strongly encouraged — some resorts require it. Regular sunscreen is harmful to coral." },
    ],
    disclaimer: "The Maldives is a Muslim country. Respect local laws and customs, particularly on local islands. Rules differ between resort and inhabited islands.",
  },

  paris: {
    destinationCountry: "France (Schengen Area)",
    currency: "EUR (Euro)",
    passportValidity: "Must be valid for at least 3 months beyond your planned departure from the Schengen Area.",
    nationalities: {
      uk: {
        status: "visa-free",
        stayDays: 90,
        note: "UK citizens can visit for up to 90 days in any 180-day period. ETIAS will be required from 2025 — a simple online pre-travel authorisation (~$8, valid 3 years).",
      },
      us: {
        status: "visa-free",
        stayDays: 90,
        note: "US citizens get up to 90 days in any 180-day period in the Schengen Area. ETIAS required from 2025.",
      },
      eu: {
        status: "visa-free",
        note: "EU/EEA citizens can move freely — no visa or time limit required. A valid passport or national ID is sufficient.",
      },
      au: {
        status: "visa-free",
        stayDays: 90,
        note: "Australian citizens get up to 90 days in any 180-day period. ETIAS will apply from 2025.",
      },
    },
    health: [
      { label: "COVID-19 vaccination", required: false, note: "No restrictions as of 2024." },
      { label: "Routine vaccinations", required: false, recommended: true, note: "Ensure MMR and flu vaccines are current." },
      { label: "Hepatitis A", required: false, recommended: true },
    ],
    entryTips: [
      { emoji: "🛂", text: "Non-EU visitors: track your 90/180-day Schengen budget carefully across all Schengen countries, not just France." },
      { emoji: "🌐", text: "ETIAS (EU travel pre-authorisation) for non-EU visitors launches in 2025. Pre-register at travel-europe.europa.eu." },
      { emoji: "👜", text: "Watch out for pickpockets, especially at the Eiffel Tower, on the Metro, and at major tourist sites." },
      { emoji: "🚆", text: "The Eurostar from London St Pancras to Paris Gare du Nord takes ~2h15. UK citizens clear passport control at the departure station, not on arrival." },
    ],
    disclaimer: "France is part of the Schengen Area. Non-EU visitors must track days across all Schengen member states, not just France. ETIAS launch dates may change.",
  },
};

export function getVisaData(slug: string): VisaData | null {
  return visaData[slug] ?? null;
}

export const NATIONALITY_LABELS: Record<Nationality, { label: string; flag: string }> = {
  uk: { label: "UK",     flag: "🇬🇧" },
  us: { label: "US",     flag: "🇺🇸" },
  eu: { label: "EU",     flag: "🇪🇺" },
  au: { label: "AU",     flag: "🇦🇺" },
};

export const STATUS_CONFIG: Record<VisaStatus, { label: string; color: string; bg: string; dot: string }> = {
  "visa-free":        { label: "Visa free",         color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
  "visa-on-arrival":  { label: "Visa on arrival",   color: "text-sky-700",     bg: "bg-sky-100",     dot: "bg-sky-500"     },
  "e-visa":           { label: "e-Visa required",   color: "text-amber-700",   bg: "bg-amber-100",   dot: "bg-amber-500"   },
  "e-visa-or-voa":    { label: "e-Visa / on arrival", color: "text-violet-700", bg: "bg-violet-100", dot: "bg-violet-500"  },
  "visa-required":    { label: "Visa required",     color: "text-rose-700",    bg: "bg-rose-100",    dot: "bg-rose-500"    },
};
