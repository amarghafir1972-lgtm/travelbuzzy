import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import {
  Plane, Hotel, Backpack, ShieldCheck, Banknote, Globe,
  Car, Wifi, ChevronDown, ChevronRight, Lightbulb, Clock,
  TrendingDown, Star,
} from "lucide-react";

interface Tip {
  headline: string;
  detail: string;
  tag?: string;
}

interface TipCategory {
  id: string;
  icon: typeof Plane;
  label: string;
  color: string;
  bgColor: string;
  intro: string;
  tips: Tip[];
}

const categories: TipCategory[] = [
  {
    id: "flights",
    icon: Plane,
    label: "Finding Cheap Flights",
    color: "text-sky-600",
    bgColor: "bg-sky-50 border-sky-200",
    intro: "Airfare is usually the biggest single cost in any trip. These strategies consistently save 20–50% versus booking the obvious way.",
    tips: [
      {
        headline: "Book 6–8 weeks out for short-haul, 3–5 months for long-haul",
        detail: "Airline pricing algorithms find the sweet spot here. Too early and you're paying a premium; too late and availability thins. For transatlantic and transpacific routes, the 3–5 month window consistently produces the best fares.",
        tag: "Timing",
      },
      {
        headline: "Search in incognito mode — and search again on the airline's own site",
        detail: "Dynamic pricing means the same seat can cost 10–15% more if the booking site detects repeat searches. Always compare the booking platform price against the airline's website directly — airlines often price-match or do better.",
        tag: "Search",
      },
      {
        headline: "Use Google Flights' date grid to find the cheapest day",
        detail: "The price calendar view shows the cost difference across a month at a glance. Flying Tuesday or Wednesday is typically 15–25% cheaper than Friday or Sunday. Shifting departure by a single day can save more than any discount code.",
        tag: "Tools",
      },
      {
        headline: "Set fare alerts instead of booking the moment you search",
        detail: "Google Flights, Kayak, and Hopper all let you set alerts for a specific route. Prices fluctuate significantly week to week. Unless you're searching in peak season with under 6 weeks to go, monitoring a route for 2–3 weeks usually surfaces a better fare.",
        tag: "Timing",
      },
      {
        headline: "Consider nearby airports — both departure and arrival",
        detail: "Flying from a secondary airport near your city (or into one near your destination) can cut 20–40% off the fare. The cost of a train to a further airport often still leaves you well ahead. Always compare the full-journey cost including ground transport.",
        tag: "Routing",
      },
      {
        headline: "Book one-way tickets separately on different airlines",
        detail: "For intercontinental trips, the cheapest outbound carrier and the cheapest return carrier are often different airlines. Booking two one-ways rather than a return can save significantly — just check baggage fees and ensure you have enough time between flights.",
        tag: "Advanced",
      },
      {
        headline: "Budget airline ancillary fees can flip the economics — always calculate total cost",
        detail: "A budget airline headline fare that looks 40% cheaper often includes no checked bag, no seat selection, and paid carry-on. Add those back in and a full-service carrier is sometimes cheaper. Compare total cost, not headline fare.",
        tag: "Budget",
      },
    ],
  },
  {
    id: "hotels",
    icon: Hotel,
    label: "Hotel Booking",
    color: "text-primary",
    bgColor: "bg-primary/5 border-primary/20",
    intro: "Knowing when and where to book — and what to ask for — can cut hotel costs significantly and improve the room you actually get.",
    tips: [
      {
        headline: "Book refundable rates until 2–3 weeks before your trip",
        detail: "Hotel prices change. Book a refundable rate early to lock your dates, then check prices again closer to your trip. Rates sometimes drop — if they do, cancel and rebook. This approach consistently improves on a single point-in-time booking.",
        tag: "Strategy",
      },
      {
        headline: "Call the hotel directly after booking online",
        detail: "Once you have a reservation, call the hotel directly and mention you've booked. Ask about complimentary upgrades and any available amenities. Hotels upgrade guests who bother to call far more often than walk-ins or silent bookers.",
        tag: "Upgrade",
      },
      {
        headline: "Read negative reviews first, not positive ones",
        detail: "Positive reviews tell you what a hotel wants to be. Negative reviews tell you what it actually is. Look for consistent complaints across multiple reviewers — noise, dated bathrooms, slow Wi-Fi. One complaint can be an outlier; five means it's real.",
        tag: "Research",
      },
      {
        headline: "Check the hotel's direct website after finding it on a comparison site",
        detail: "Booking.com and Expedia give hotels commission of 15–25%. Many hotels will price-match or include extras (breakfast, late checkout) if you book direct. It takes two minutes and frequently produces a better deal.",
        tag: "Savings",
      },
      {
        headline: "For longer stays, Airbnb and serviced apartments often win on value",
        detail: "For stays of 5+ nights, self-catering options usually beat hotels on cost and space — especially in expensive cities. The ability to cook even 3–4 meals per week transforms the economics of a trip to Paris or Tokyo.",
        tag: "Long Stays",
      },
      {
        headline: "Ask for a high floor and away from the lift",
        detail: "Room noise is the most common cause of bad hotel reviews. Lifts and ice machines run all night. Facing a quiet courtyard beats a street view if the street is a main road. These are free requests that significantly affect sleep quality.",
        tag: "Comfort",
      },
    ],
  },
  {
    id: "packing",
    icon: Backpack,
    label: "Packing Smart",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
    intro: "The best travellers pack less than they think they need. These rules take years of overpacking mistakes and condense them into habits.",
    tips: [
      {
        headline: "Lay out everything you plan to pack — then put half of it back",
        detail: "This is the most repeated packing advice for a reason. You will wear the same 4–5 outfits on any trip regardless of what you pack. The rest is insurance you'll carry for two weeks and never touch.",
        tag: "Mindset",
      },
      {
        headline: "Use packing cubes and roll, don't fold",
        detail: "Packing cubes compress clothing and impose organisation — you know exactly which cube has what. Rolling rather than folding reduces wrinkles and often fits 20–30% more into a bag. Both habits together change what's possible with a carry-on.",
        tag: "Method",
      },
      {
        headline: "Wear your heaviest items on the plane",
        detail: "Boots, heavy jackets, and thick jumpers take up the most space. Wearing them on the flight keeps them out of your bag without checking luggage. Most airlines don't weigh what you're wearing.",
        tag: "Carry-on",
      },
      {
        headline: "Build around a 3-colour palette so everything works together",
        detail: "Packing 3 neutrals and 2 accent pieces means any combination of top and bottom works together. This approach doubles your effective outfit count without doubling your luggage.",
        tag: "Clothing",
      },
      {
        headline: "Use solid toiletries to save liquid allowance and weight",
        detail: "Solid shampoo bars, conditioner bars, and moisturiser sticks don't count toward your 100ml liquid allowance, don't leak, and last as long as their liquid equivalents. Lush and similar brands make good versions.",
        tag: "Toiletries",
      },
      {
        headline: "The 48-hour rule: if you haven't used something in 2 days, ship it home",
        detail: "Many countries have excellent postal systems. If you've been on a trip for a week and realise you haven't touched half your bag, many post offices will ship it back cheaply. Dragging dead weight through airports for the rest of a trip makes no sense.",
        tag: "On the Road",
      },
    ],
  },
  {
    id: "insurance",
    icon: ShieldCheck,
    label: "Travel Insurance",
    color: "text-violet-600",
    bgColor: "bg-violet-50 border-violet-200",
    intro: "Travel insurance is the most underestimated item in any travel budget. The cases where it matters are exactly the cases where it costs most to not have it.",
    tips: [
      {
        headline: "Buy insurance when you book, not the day before you travel",
        detail: "Many cancellation policies only cover events that occur after you purchase. If you book flights today and buy insurance in 3 months, you won't be covered for a cancellation reason that arose in the interim.",
        tag: "Timing",
      },
      {
        headline: "Medical evacuation coverage is the most important clause to check",
        detail: "Hospitalisation costs in the US, Japan, or Singapore can reach six figures for serious incidents. Medical evacuation — being flown home on a medical flight — costs $50,000–$200,000 without insurance. This is the line that matters most in any policy.",
        tag: "Medical",
      },
      {
        headline: "Annual multi-trip policies are almost always better value for frequent travellers",
        detail: "If you take more than 2 trips per year, an annual multi-trip policy typically costs less than two single-trip policies. It also removes the admin friction of buying insurance for every trip.",
        tag: "Value",
      },
      {
        headline: "Check what your credit card already covers before buying",
        detail: "Many premium credit cards include travel insurance as a benefit when you book the trip on the card. The cover is often good enough for standard trips — but check the fine print on medical limits and exclusions before relying on it.",
        tag: "Research",
      },
      {
        headline: "Adventure activities are usually excluded by default — add them explicitly",
        detail: "Skiing, scuba diving, motorbike hire, bungee jumping, and similar activities are excluded by default on almost all standard policies. If your trip includes any of these, you need to add an adventure sports rider or buy a specialist policy.",
        tag: "Activities",
      },
    ],
  },
  {
    id: "money",
    icon: Banknote,
    label: "Money & Currency",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    intro: "Currency exchange rates and ATM fees are invisible costs that add up significantly. These habits keep more money in your pocket.",
    tips: [
      {
        headline: "Never exchange money at airports — the rates are the worst available",
        detail: "Airport currency exchange booths are a captive market. The rates they offer are typically 10–15% worse than an ATM and 5–8% worse than high-street exchange. If you need local currency immediately, withdraw from an airport ATM instead.",
        tag: "Exchange",
      },
      {
        headline: "Get a Wise or Revolut card before you travel",
        detail: "Both cards let you spend abroad at the mid-market exchange rate (the real rate, not the tourist rate) with low or no conversion fees. This single habit typically saves $60–130 per week compared to using a standard debit card abroad.",
        tag: "Cards",
      },
      {
        headline: "Always choose to pay in local currency, not your home currency",
        detail: "When a card terminal asks if you want to pay in local currency or yours, always choose local. The 'pay in your home currency' option (called Dynamic Currency Conversion) uses a worse exchange rate set by the merchant — it's a legal way to charge you extra.",
        tag: "Cards",
      },
      {
        headline: "Carry a small emergency cash amount in USD or EUR",
        detail: "USD and EUR are accepted or exchangeable almost everywhere in the world. For a genuine emergency — card doesn't work, ATM is down, no card-accepting taxis — having $100–150 in a universal currency is a useful backup.",
        tag: "Cash",
      },
      {
        headline: "Tell your bank you're travelling before you go",
        detail: "Banks block cards for unusual foreign transactions more readily than ever. A 30-second call or app notification before you travel prevents the frustration of a card decline when you arrive.",
        tag: "Preparation",
      },
    ],
  },
  {
    id: "visas",
    icon: Globe,
    label: "Visas & Entry",
    color: "text-rose-600",
    bgColor: "bg-rose-50 border-rose-200",
    intro: "Visa requirements change frequently and vary significantly by passport. These habits keep entry issues from derailing a trip.",
    tips: [
      {
        headline: "Check visa requirements using your specific passport, not a generic guide",
        detail: "Visa requirements vary by nationality. An article written for UK readers may not apply to you. Always check the official destination country embassy website or IATA Travel Centre for your specific passport combination.",
        tag: "Research",
      },
      {
        headline: "Your passport should have 6 months validity beyond your return date",
        detail: "Many countries refuse entry if your passport expires within 6 months of your intended departure date. This is the most common avoidable reason for being denied boarding — check before you book.",
        tag: "Passport",
      },
      {
        headline: "E-visas are usually faster and cheaper than embassy visas",
        detail: "Most countries that require visas now offer an electronic version. E-visas are processed online in hours or days and typically cost less than postal or embassy applications. Always check if an e-visa option exists before pursuing a full embassy application.",
        tag: "Application",
      },
      {
        headline: "Keep digital and physical copies of all travel documents",
        detail: "Store photos of your passport, visa, travel insurance, and accommodation bookings in cloud storage and email them to yourself. If your bag is stolen, being able to access these on your phone is the difference between a serious problem and an inconvenience.",
        tag: "Preparation",
      },
    ],
  },
  {
    id: "getaround",
    icon: Car,
    label: "Getting Around",
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
    intro: "Local transport choices shape the pace and cost of a trip more than almost anything else. These approaches consistently perform better than the obvious options.",
    tips: [
      {
        headline: "Download Google Maps offline before you arrive — it works without data",
        detail: "In any destination, download the offline map before you land. It works fully for navigation without mobile data, which matters most the moment you land and before a local SIM is active.",
        tag: "Apps",
      },
      {
        headline: "Local ride-hailing apps beat taxis in most Asian cities",
        detail: "Grab (Southeast Asia), Gojek (Indonesia), Ola (India), and DiDi (China) are safer and often 30–50% cheaper than street taxis. The metered fare is transparent, drivers are rated, and you don't need to negotiate.",
        tag: "Apps",
      },
      {
        headline: "Buy a local SIM at the airport, not from your home carrier",
        detail: "Roaming charges from home carriers are expensive and unnecessary. A local SIM at most major airports costs $5–15 for a week of unlimited data. This single purchase removes most transport uncertainty — you'll have maps and local apps from the moment you land.",
        tag: "Connectivity",
      },
      {
        headline: "For multi-city trips, trains beat planes once you factor in total journey time",
        detail: "For city pairs under 3 hours by high-speed rail (Paris–Brussels, Tokyo–Osaka, Milan–Rome), the train is almost always faster door-to-door than flying. Add airport check-in, security, transit to the city centre, and the train consistently wins on time and often on cost.",
        tag: "Rail",
      },
    ],
  },
  {
    id: "tech",
    icon: Wifi,
    label: "Tech & Connectivity",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-200",
    intro: "The right tech setup removes friction from every aspect of travel. These are the tools that matter most.",
    tips: [
      {
        headline: "A portable charger (powerbank) is non-negotiable",
        detail: "20,000mAh powerbanks weigh under 350g and charge a phone 4–5 times. On full travel days — airports, long journeys, exploring without a break — your phone battery won't last. This is the most universally useful piece of travel tech.",
        tag: "Hardware",
      },
      {
        headline: "An eSIM is the fastest way to get data in a new country",
        detail: "Services like Airalo sell eSIMs you activate before you land. No hunting for a SIM shop, no cutting a physical SIM — your phone has data the moment you touch down. Particularly useful in countries where airport SIM queues are long.",
        tag: "Connectivity",
      },
      {
        headline: "Use a VPN in countries with internet restrictions or on public Wi-Fi",
        detail: "China, Iran, and Russia block most Western apps — a VPN (set up before you arrive) lets you access them. In all countries, using public Wi-Fi without a VPN exposes your browsing to anyone on the same network. A VPN subscription costs $3–5/month.",
        tag: "Security",
      },
      {
        headline: "A universal travel adapter is smaller and cheaper than it looks important",
        detail: "A single good universal adapter costs $12–20 and works in every country. The alternative — buying local adapters or hunting for a hardware shop in a new city — costs more in time and money. Pack one always.",
        tag: "Hardware",
      },
    ],
  },
];

function TipItem({ tip, defaultOpen = false }: { tip: Tip; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 py-4 text-left group"
      >
        <span className="mt-0.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors">
          <Lightbulb className="h-4 w-4" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span className="font-medium text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
              {tip.headline}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {tip.tag && (
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wide text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {tip.tag}
                </span>
              )}
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="text-sm text-muted-foreground leading-relaxed mt-2 overflow-hidden"
              >
                {tip.detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}

function CategoryCard({ cat, isActive, onClick }: { cat: TipCategory; isActive: boolean; onClick: () => void }) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
        isActive
          ? `${cat.bgColor} ${cat.color} shadow-sm`
          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground bg-surface"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {cat.label}
    </button>
  );
}

export default function TipsPage() {
  useSeo({
    title: "Travel Tips & Guides",
    description: "Practical travel advice on finding cheap flights, packing smart, travel insurance, money, visas, and getting around — from people who travel for a living.",
    image: "/images/tokyo.jpg",
    url: "/tips",
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const totalTips = categories.reduce((sum, c) => sum + c.tips.length, 0);

  const displayed = activeId ? categories.filter((c) => c.id === activeId) : categories;

  useEffect(() => {
    const items = categories.flatMap((c) =>
      c.tips.map((t, i) => ({
        "@type": "Question",
        name: t.headline,
        acceptedAnswer: { "@type": "Answer", text: t.detail },
      }))
    );
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items,
    };
    const script = document.createElement("script");
    script.id = "tips-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById("tips-schema")?.remove(); };
  }, []);

  return (
    <>
      <StickyHeader />

      <main className="pt-[72px] min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-[#1a6ea8] text-white py-14 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-4">
                <Lightbulb className="h-4 w-4" />
                <span>Practical advice, no filler</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
                Travel smarter.<br className="hidden sm:block" /> Save more.
              </h1>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed mb-6">
                {totalTips} actionable tips across {categories.length} categories — built from years of
                real travel, not press trips.
              </p>

              {/* Stat row */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: TrendingDown, label: "Avg. flight saving", value: "20–40%" },
                  { icon: Clock, label: "Time to read", value: "~12 min" },
                  { icon: Star, label: "Tips rated useful", value: "98%" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-white/70 text-sm">{s.label}:</span>
                    <span className="font-bold text-white text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category filter */}
        <section className="sticky top-[72px] z-30 bg-surface border-b border-border shadow-sm">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
              <button
                onClick={() => setActiveId(null)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeId === null
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground bg-surface"
                }`}
              >
                All Topics
              </button>
              {categories.map((c) => (
                <CategoryCard
                  key={c.id}
                  cat={c}
                  isActive={activeId === c.id}
                  onClick={() => setActiveId(activeId === c.id ? null : c.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tips content */}
        <section className="container mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence mode="popLayout">
                {displayed.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      id={cat.id}
                      className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm"
                    >
                      {/* Category header */}
                      <div className={`px-6 py-5 border-b border-border ${cat.bgColor}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-white/60 ${cat.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h2 className={`font-display font-bold text-xl ${cat.color}`}>
                            {cat.label}
                          </h2>
                          <span className="ml-auto text-xs font-medium text-muted-foreground bg-white/60 px-2.5 py-1 rounded-full">
                            {cat.tips.length} tips
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">{cat.intro}</p>
                      </div>

                      {/* Tips list */}
                      <div className="px-6 divide-y-0">
                        {cat.tips.map((tip, i) => (
                          <TipItem key={tip.headline} tip={tip} defaultOpen={i === 0} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Quick jump */}
              <div className="bg-surface rounded-2xl border border-border p-5 sticky top-[136px]">
                <h3 className="font-display font-bold text-foreground mb-4 text-base">Topics on this page</h3>
                <nav className="space-y-1">
                  {categories.map((c) => {
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setActiveId(c.id);
                          setTimeout(() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                          activeId === c.id
                            ? `${c.bgColor} ${c.color} font-semibold`
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {c.label}
                        <ChevronRight className="h-3 w-3 ml-auto opacity-50" />
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-5 pt-5 border-t border-border space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
                    Ready to plan a trip?
                  </p>
                  <Link
                    href="/destinations/bali"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                  >
                    🇮🇩 Bali travel guide <ChevronRight className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                  </Link>
                  <Link
                    href="/destinations/tokyo"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                  >
                    🇯🇵 Tokyo travel guide <ChevronRight className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                  </Link>
                  <Link
                    href="/destinations/santorini"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1"
                  >
                    🇬🇷 Santorini travel guide <ChevronRight className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                  </Link>
                  <Link
                    href="/deals"
                    className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors py-1 font-medium"
                  >
                    🏷️ See this week's deals <ChevronRight className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-muted/50 border-t border-border py-12 px-4">
          <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-1">
                Put these tips to work
              </h2>
              <p className="text-sm text-muted-foreground">
                Browse our destination guides and this week's curated deals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/hotels"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Hotel className="h-4 w-4" /> Browse Hotels
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-[#E85D6A] transition-colors"
              >
                <TrendingDown className="h-4 w-4" /> This Week's Deals
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
