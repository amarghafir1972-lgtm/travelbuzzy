import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, Tag, ExternalLink, CheckCircle2, Clock, TrendingDown,
  Hotel, Plane, Package, ChevronRight, Shield, Info, Calendar, Sparkles,
  MapPin, Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StickyHeader from "./home/StickyHeader";
import Footer from "./home/Footer";
import CookieBanner from "@/components/CookieBanner";

const UPDATED = "2 May 2026";

type DealType = "hotel" | "flight" | "package";
type Deal = {
  id: string;
  type: DealType;
  badge?: string;
  badgeColor?: string;
  destination: string;
  country: string;
  name: string;
  description: string;
  image: string;
  pricePerNight?: number;
  priceTotal?: number;
  originalPrice?: number;
  nights?: number;
  stars?: number;
  reviewScore?: number;
  reviewCount?: number;
  highlights: string[];
  bookUrl: string;
  expires?: string;
};

const deals: Deal[] = [
  {
    id: "maldives-anantara",
    type: "hotel",
    badge: "Editor's Pick",
    badgeColor: "bg-primary text-white",
    destination: "Maldives",
    country: "MV",
    name: "Anantara Veli Resort",
    description: "Overwater bungalows with direct lagoon access. All-inclusive option available. Adults-only resort, ideal for honeymoons and romantic getaways.",
    image: "/images/maldives.jpg",
    pricePerNight: 389,
    originalPrice: 520,
    nights: 7,
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 1842,
    highlights: ["Overwater bungalow", "All-inclusive available", "Adults-only", "House reef snorkelling"],
    bookUrl: "#",
    expires: "12 May 2026",
  },
  {
    id: "santorini-canaves",
    type: "hotel",
    badge: "Best Value",
    badgeColor: "bg-accent text-white",
    destination: "Santorini",
    country: "GR",
    name: "Canaves Oia Suites",
    description: "Boutique suites perched above the caldera with iconic sunset views. Walking distance to Oia village and its famous restaurants.",
    image: "/images/santorini.jpg",
    pricePerNight: 299,
    originalPrice: 410,
    nights: 5,
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 674,
    highlights: ["Caldera view", "Infinity pool", "Breakfast included", "Private terrace"],
    bookUrl: "#",
    expires: "9 May 2026",
  },
  {
    id: "tokyo-andaz",
    type: "hotel",
    badge: "Flash Sale",
    badgeColor: "bg-amber-500 text-white",
    destination: "Tokyo",
    country: "JP",
    name: "Andaz Tokyo Toranomon Hills",
    description: "Luxury Tokyo hotel on the 47th floor with panoramic city views. Rooftop pool, six dining concepts, and free minibar in every room.",
    image: "/images/tokyo.jpg",
    pricePerNight: 198,
    originalPrice: 310,
    nights: 6,
    stars: 5,
    reviewScore: 9.1,
    reviewCount: 2310,
    highlights: ["47th-floor rooftop pool", "Free minibar", "City panorama", "Six restaurants"],
    bookUrl: "#",
    expires: "7 May 2026",
  },
  {
    id: "bali-komaneka",
    type: "hotel",
    destination: "Bali",
    country: "ID",
    name: "Komaneka at Bisma",
    description: "Jungle hideaway in Ubud overlooking the Campuhan Ridge. Rice terrace views, a world-class spa, and a treetop infinity pool.",
    image: "/images/bali.jpg",
    pricePerNight: 145,
    originalPrice: 195,
    nights: 7,
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 908,
    highlights: ["Rice terrace views", "Treetop pool", "Spa included", "Daily breakfast"],
    bookUrl: "#",
    expires: "15 May 2026",
  },
  {
    id: "paris-hidden",
    type: "hotel",
    destination: "Paris",
    country: "FR",
    name: "Hôtel des Grands Boulevards",
    description: "A Soho House-era boutique hotel in the 2nd arrondissement. Rooftop bar, garden courtyard, and one of Paris's best brasseries downstairs.",
    image: "/images/paris.jpg",
    pricePerNight: 189,
    originalPrice: 255,
    nights: 4,
    stars: 4,
    reviewScore: 8.9,
    reviewCount: 1120,
    highlights: ["Rooftop bar", "Garden courtyard", "Brasserie on-site", "Walking distance to Le Marais"],
    bookUrl: "#",
    expires: "20 May 2026",
  },
  {
    id: "thailand-package",
    type: "package",
    badge: "Hot Package",
    badgeColor: "bg-orange-500 text-white",
    destination: "Thailand Islands",
    country: "TH",
    name: "7-Night Island Hop: Phuket + Koh Lanta",
    description: "Flights from London + 3 nights Phuket + 4 nights Koh Lanta. All hotel transfers included. Beach villa accommodation.",
    image: "/images/bali.jpg",
    priceTotal: 1190,
    originalPrice: 1640,
    nights: 7,
    stars: 4,
    reviewScore: 8.7,
    reviewCount: 340,
    highlights: ["Return flights included", "Beach villa rooms", "All transfers", "Flexible dates"],
    bookUrl: "#",
    expires: "5 May 2026",
  },
  {
    id: "santorini-flights",
    type: "flight",
    badge: "Price Drop",
    badgeColor: "bg-emerald-600 text-white",
    destination: "Santorini",
    country: "GR",
    name: "London Heathrow → Santorini (JTR)",
    description: "Non-stop summer flights with British Airways. Lowest price of the year. Multiple dates available through August.",
    image: "/images/santorini.jpg",
    priceTotal: 189,
    originalPrice: 340,
    highlights: ["Non-stop flight", "British Airways", "Multiple dates", "Includes 23kg luggage"],
    bookUrl: "#",
    expires: "6 May 2026",
  },
  {
    id: "maldives-budget",
    type: "hotel",
    destination: "Maldives",
    country: "MV",
    name: "Meeru Maldives Resort Island",
    description: "The best-value resort in the Maldives without compromising on beach quality. Huge island with multiple pools, dive centre, and all-inclusive options.",
    image: "/images/maldives.jpg",
    pricePerNight: 195,
    originalPrice: 265,
    nights: 7,
    stars: 4,
    reviewScore: 8.6,
    reviewCount: 3140,
    highlights: ["30+ water sports", "Dive centre", "All-inclusive option", "Kids' club"],
    bookUrl: "#",
    expires: "18 May 2026",
  },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type SeasonalDest = {
  slug: string;
  name: string;
  flag: string;
  image: string;
  why: string;
  saving: string;
  weather: string;
  badge?: string;
};

const seasonalData: SeasonalDest[][] = [
  // Jan
  [
    { slug:"maldives", name:"Maldives", flag:"🇲🇻", image:"/images/maldives.jpg", why:"Peak dry season — crystal visibility and zero rain. This is the Maldives at its absolute best.", saving:"Book 4+ months ahead to save 20%", weather:"30°C · Sunny", badge:"Peak Season" },
    { slug:"marrakech", name:"Marrakech", flag:"🇲🇦", image:"/images/marrakech.jpg", why:"Cool and crowd-free. The souks and riads are at their most atmospheric without the summer heat.", saving:"Up to 30% cheaper than April", weather:"17°C · Dry", badge:"Best Value" },
    { slug:"bangkok", name:"Bangkok", flag:"🇹🇭", image:"/images/bangkok.jpg", why:"Deep in the dry season — low humidity, clear skies, and the best temple visiting weather of the year.", saving:"Hotels 15% cheaper than Dec", weather:"31°C · Dry" },
  ],
  // Feb
  [
    { slug:"bali", name:"Bali", flag:"🇮🇩", image:"/images/bali.jpg", why:"Dry season in full swing. Nyepi (Balinese New Year) often falls in February — a completely unique experience.", saving:"20% cheaper than July peak", weather:"29°C · Mostly dry", badge:"Best Value" },
    { slug:"dubai", name:"Dubai", flag:"🇦🇪", image:"/images/dubai.jpg", why:"Perfect winter weather — warm enough for beaches, cool enough to explore. Outdoor festivals in full swing.", saving:"30% cheaper than December", weather:"24°C · Sunny" },
    { slug:"kyoto", name:"Kyoto", flag:"🇯🇵", image:"/images/kyoto.jpg", why:"Pre-cherry blossom quiet season. Temples are uncrowded and prices are at their annual low.", saving:"Up to 35% off peak spring prices", weather:"8°C · Crisp", badge:"Hidden Gem" },
  ],
  // Mar
  [
    { slug:"lisbon", name:"Lisbon", flag:"🇵🇹", image:"/images/lisbon.jpg", why:"Spring arrives early. Mild weather, long days, and a fraction of the summer crowds. Restaurants still have tables.", saving:"Up to 40% cheaper than August", weather:"18°C · Sunny", badge:"Best Value" },
    { slug:"tokyo", name:"Tokyo", flag:"🇯🇵", image:"/images/tokyo.jpg", why:"Late March brings the first cherry blossoms. The most iconic Japan experience — book hotels months in advance.", saving:"Shoulder prices before peak bloom", weather:"12°C · Warming", badge:"Must Visit" },
    { slug:"marrakech", name:"Marrakech", flag:"🇲🇦", image:"/images/marrakech.jpg", why:"Ideal temperatures before the summer heat sets in. Spring flowers in the Atlas Mountains for stunning day trips.", saving:"25% cheaper than peak October", weather:"22°C · Pleasant" },
  ],
  // Apr
  [
    { slug:"barcelona", name:"Barcelona", flag:"🇪🇸", image:"/images/barcelona.jpg", why:"Warm but not sweltering. Beaches are swimmable and the city's festivals kick off before summer prices.", saving:"Up to 35% off July rates", weather:"20°C · Sunny", badge:"Sweet Spot" },
    { slug:"santorini", name:"Santorini", flag:"🇬🇷", image:"/images/santorini.jpg", why:"Everything opens but tourist peak is weeks away. Walk the caldera path without crowds at prices that make sense.", saving:"30% cheaper than August", weather:"19°C · Clear" },
    { slug:"tokyo", name:"Tokyo", flag:"🇯🇵", image:"/images/tokyo.jpg", why:"Peak cherry blossom. One of the world's great annual spectacles — Shinjuku Gyoen and Meguro River in full bloom.", saving:"Book 6 months out for best rates", weather:"14°C · Mild", badge:"Peak Season" },
  ],
  // May
  [
    { slug:"santorini", name:"Santorini", flag:"🇬🇷", image:"/images/santorini.jpg", why:"Warm seas, full sun, everything open — and July's cruise-ship crowds are still weeks away.", saving:"Up to 25% off July peak", weather:"23°C · Sunny", badge:"Best Month" },
    { slug:"lisbon", name:"Lisbon", flag:"🇵🇹", image:"/images/lisbon.jpg", why:"Arguably Europe's best city in May. Perfect temperatures and prices that haven't spiked yet.", saving:"35% cheaper than August", weather:"22°C · Warm", badge:"Best Value" },
    { slug:"rome", name:"Rome", flag:"🇮🇹", image:"/images/rome.jpg", why:"Before the summer crush. The Forum and Colosseum at a pace that lets you actually look at things.", saving:"20% cheaper than July", weather:"24°C · Sunny" },
  ],
  // Jun
  [
    { slug:"reykjavik", name:"Reykjavik", flag:"🇮🇸", image:"/images/reykjavik.jpg", why:"Midnight sun — 24 hours of daylight. Puffins arrive, whale watching peaks, and no need for Northern Lights tours.", saving:"Best value before July peak", weather:"12°C · Endless daylight", badge:"Unique Experience" },
    { slug:"phuket", name:"Phuket", flag:"🇹🇭", image:"/images/phuket.jpg", why:"Low season means half the price. Phang Nga Bay and the east coast stay accessible even in the wet season.", saving:"Up to 50% off December rates", weather:"30°C · Some rain", badge:"Best Value" },
    { slug:"bali", name:"Bali", flag:"🇮🇩", image:"/images/bali.jpg", why:"Dry season begins. Humidity drops, evenings are cool, and the rice terraces are bright green.", saving:"10% off July peak rates", weather:"27°C · Dry" },
  ],
  // Jul
  [
    { slug:"maldives", name:"Maldives", flag:"🇲🇻", image:"/images/maldives.jpg", why:"Wet season brings dramatically lower prices. Weather is still mostly excellent with fewer tourists.", saving:"Up to 40% off January rates", weather:"29°C · Some showers", badge:"Best Value" },
    { slug:"queenstown", name:"Queenstown", flag:"🇳🇿", image:"/images/queenstown.jpg", why:"Peak ski season in the Southern Alps. The Remarkables and Coronet Peak with world-class après-ski.", saving:"Best rates for ski accommodation", weather:"5°C · Snowy", badge:"Ski Season" },
    { slug:"new-york", name:"New York", flag:"🇺🇸", image:"/images/new-york.jpg", why:"Long warm days, outdoor events, and the city at its most social. Rooftop bars and free outdoor concerts.", saving:"Hotels 10% cheaper than December", weather:"28°C · Sunny" },
  ],
  // Aug
  [
    { slug:"bora-bora", name:"Bora Bora", flag:"🇵🇫", image:"/images/bora-bora.jpg", why:"Humpback whale season in French Polynesia. Dry, warm, and spectacularly clear water.", saving:"Worth every dollar in August", weather:"28°C · Dry", badge:"Best Month" },
    { slug:"singapore", name:"Singapore", flag:"🇸🇬", image:"/images/singapore.jpg", why:"National Day festivities and some of the year's best hotel deals — the shoulder between peak seasons.", saving:"15% cheaper than December rates", weather:"30°C · Warm" },
    { slug:"cape-town", name:"Cape Town", flag:"🇿🇦", image:"/images/cape-town.jpg", why:"Southern Hemisphere winter is still sunny. Great whites, whale watching at Hermanus, at off-peak prices.", saving:"Up to 45% off December rates", weather:"17°C · Dry", badge:"Best Value" },
  ],
  // Sep
  [
    { slug:"bali", name:"Bali", flag:"🇮🇩", image:"/images/bali.jpg", why:"The single best month to visit — end of dry season, bright green rice terraces, and peak festival season.", saving:"15% cheaper than July", weather:"28°C · Perfect", badge:"Best Month" },
    { slug:"paris", name:"Paris", flag:"🇫🇷", image:"/images/paris.jpg", why:"La rentrée — summer tourists leave, Parisians return. The city feels like itself again.", saving:"Up to 25% off August rates", weather:"20°C · Beautiful", badge:"Sweet Spot" },
    { slug:"santorini", name:"Santorini", flag:"🇬🇷", image:"/images/santorini.jpg", why:"Still 25°C, seas are warm, and August's cruise ships have gone. Sunsets are as spectacular as any month.", saving:"20% cheaper than August", weather:"25°C · Warm" },
  ],
  // Oct
  [
    { slug:"amalfi-coast", name:"Amalfi Coast", flag:"🇮🇹", image:"/images/amalfi-coast.jpg", why:"Crowds thin after September. Warm enough to swim, cool enough to hike the Path of the Gods.", saving:"Up to 35% off summer peak", weather:"22°C · Warm", badge:"Best Month" },
    { slug:"istanbul", name:"Istanbul", flag:"🇹🇷", image:"/images/istanbul.jpg", why:"Mild temperatures and the summer rush is over. The Grand Bazaar and Hagia Sophia at a relaxed pace.", saving:"30% cheaper than July", weather:"18°C · Pleasant", badge:"Best Value" },
    { slug:"kyoto", name:"Kyoto", flag:"🇯🇵", image:"/images/kyoto.jpg", why:"Peak autumn colour — maples turn crimson across temple gardens. As spectacular as cherry blossom season.", saving:"Book early — hotels fill fast", weather:"18°C · Crisp", badge:"Peak Season" },
  ],
  // Nov
  [
    { slug:"dubai", name:"Dubai", flag:"🇦🇪", image:"/images/dubai.jpg", why:"The very best month — perfect beach weather and big events. Book before December prices kick in.", saving:"Up to 25% off December rates", weather:"27°C · Perfect", badge:"Best Month" },
    { slug:"phuket", name:"Phuket", flag:"🇹🇭", image:"/images/phuket.jpg", why:"Dry season has returned. First reliable sunshine after the monsoon, at prices before the Christmas surge.", saving:"30% cheaper than December", weather:"30°C · Sunny", badge:"Best Value" },
    { slug:"hanoi", name:"Hanoi", flag:"🇻🇳", image:"/images/hanoi.jpg", why:"The best time to visit Vietnam. Cool and dry in the north, Ha Long Bay at its most atmospheric.", saving:"Up to 20% off peak season", weather:"20°C · Cool & dry", badge:"Hidden Gem" },
  ],
  // Dec
  [
    { slug:"new-york", name:"New York", flag:"🇺🇸", image:"/images/new-york.jpg", why:"The city transforms for the holidays — Rockefeller tree, ice rinks, and Bryant Park winter market.", saving:"Book 3+ months ahead for value", weather:"4°C · Festive", badge:"Festive Season" },
    { slug:"maldives", name:"Maldives", flag:"🇲🇻", image:"/images/maldives.jpg", why:"Peak season returns with perfect weather. Christmas in an overwater villa is genuinely unforgettable.", saving:"Book 6 months ahead for best rates", weather:"30°C · Perfect", badge:"Peak Season" },
    { slug:"queenstown", name:"Queenstown", flag:"🇳🇿", image:"/images/queenstown.jpg", why:"Southern Hemisphere summer begins. Bungy jumping, jet boating, and lake swimming in a spectacular setting.", saving:"25% cheaper than January", weather:"22°C · Sunny", badge:"Summer Begins" },
  ],
];

const BADGE_COLORS: Record<string, string> = {
  "Best Month":        "bg-emerald-500 text-white",
  "Best Value":        "bg-accent text-white",
  "Peak Season":       "bg-primary text-white",
  "Hidden Gem":        "bg-violet-500 text-white",
  "Sweet Spot":        "bg-amber-500 text-white",
  "Must Visit":        "bg-rose-500 text-white",
  "Unique Experience": "bg-teal-500 text-white",
  "Ski Season":        "bg-sky-500 text-white",
  "Festive Season":    "bg-red-500 text-white",
  "Summer Begins":     "bg-orange-500 text-white",
};

const filterTabs = [
  { id: "all", label: "All Deals", icon: Sparkles },
  { id: "hotel", label: "Hotels", icon: Hotel },
  { id: "flight", label: "Flights", icon: Plane },
  { id: "package", label: "Packages", icon: Package },
] as const;

// Top 3 for comparison table
const top3 = deals.filter((d) => d.badge).slice(0, 3);

function savings(deal: Deal) {
  const base = deal.pricePerNight || deal.priceTotal || 0;
  const orig = deal.originalPrice || base;
  return Math.round(((orig - base) / orig) * 100);
}

function DealCard({ deal, index }: { deal: Deal; index: number }) {
  const pct = savings(deal);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group"
      itemScope
      itemType="https://schema.org/LodgingBusiness"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          itemProp="image"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {deal.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${deal.badgeColor}`}>
            {deal.badge}
          </span>
        )}
        {deal.expires && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            Expires {deal.expires}
          </div>
        )}
        {pct > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <TrendingDown className="h-3 w-3" />
            {pct}% off
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">
              {deal.destination}
            </p>
            <h3 className="text-base font-display font-bold text-foreground leading-snug" itemProp="name">
              {deal.name}
            </h3>
          </div>
          {deal.stars && (
            <div className="flex shrink-0 gap-0.5 mt-1">
              {Array.from({ length: deal.stars }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{deal.description}</p>

        <ul className="flex flex-wrap gap-1.5 mb-4">
          {deal.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1 text-xs text-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
              <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <div>
            {deal.pricePerNight ? (
              <>
                <p className="text-xs text-muted-foreground line-through">from ${deal.originalPrice}/night</p>
                <p className="text-xl font-display font-bold text-foreground">
                  ${deal.pricePerNight}<span className="text-sm font-normal text-muted-foreground">/night</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground line-through">was ${deal.originalPrice}</p>
                <p className="text-xl font-display font-bold text-foreground">
                  from ${deal.priceTotal}
                  <span className="text-sm font-normal text-muted-foreground"> total</span>
                </p>
              </>
            )}
            {deal.reviewScore && (
              <p className="text-xs text-muted-foreground mt-0.5">
                ⭐ {deal.reviewScore} · {deal.reviewCount?.toLocaleString()} reviews
              </p>
            )}
          </div>

          <a
            href={deal.bookUrl}
            rel="nofollow noopener sponsored"
            target="_blank"
            data-testid={`button-deal-book-${deal.id}`}
            className="shrink-0 flex items-center gap-1.5 bg-accent hover:bg-[#E85D6A] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
            Book Now <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function DealsPage() {
  const [filter, setFilter] = useState<"all" | DealType>("all");
  const filtered = filter === "all" ? deals : deals.filter((d) => d.type === filter);
  const [activeMonth, setActiveMonth] = useState(() => new Date().getMonth());

  useSeo({
    title: "Best Travel Deals This Week",
    description: "8 handpicked hotel deals, flight sales, and vacation packages — updated every Monday by the TravelBuzzy team. Save up to 40% on curated travel.",
    image: "/images/maldives.jpg",
    url: "/deals",
  });

  useEffect(() => {
    // Inject JSON-LD schema for Google rich results
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best Travel Deals This Week — TravelBuzzy",
      description: "Curated hotel deals, flight sales, and travel packages updated weekly by the TravelBuzzy editorial team.",
      numberOfItems: deals.length,
      itemListElement: deals.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: d.name,
        description: d.description,
        url: `https://travelbuzzy.com/deals#${d.id}`,
      })),
    };
    const script = document.createElement("script");
    script.id = "deals-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("deals-schema")?.remove();
    };
  }, []);

  return (
    <>

      <StickyHeader />

      <main className="pt-[72px]">
        {/* Hero band */}
        <div className="bg-primary text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to TravelBuzzy
            </Link>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-5 w-5 text-accent" />
                  <span className="text-accent text-sm font-bold uppercase tracking-wider">Weekly Digest</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
                  Best Travel Deals<br />This Week
                </h1>
                <p className="text-white/80 text-lg max-w-xl">
                  {deals.length} handpicked deals across hotels, flights, and packages — updated every Monday by our editorial team.
                </p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm space-y-1.5 min-w-[180px]">
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="h-4 w-4" /> Updated
                </div>
                <p className="font-bold text-white text-base">{UPDATED}</p>
                <p className="text-white/60 text-xs">{deals.length} active deals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="sticky top-[72px] z-30 bg-surface/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex gap-1 py-3 overflow-x-auto scrollbar-none">
              {filterTabs.map(({ id, label, icon: Icon }) => {
                const count = id === "all" ? deals.length : deals.filter((d) => d.type === id).length;
                return (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    data-testid={`button-filter-${id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap
                      ${filter === id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                      ${filter === id ? "bg-white/20" : "bg-muted"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main deals grid */}
            <div className="lg:col-span-2 space-y-8">
              {/* Comparison table (always visible) */}
              {filter === "all" && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm"
                  aria-label="Top 3 deal comparison"
                >
                  <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h2 className="font-display font-bold text-foreground">Top 3 Picks This Week</h2>
                    <span className="ml-auto text-xs text-muted-foreground">Side-by-side comparison</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" role="table">
                      <thead>
                        <tr className="bg-muted/50 text-left">
                          <th className="px-5 py-3 font-semibold text-foreground">Property</th>
                          <th className="px-4 py-3 font-semibold text-foreground text-right">Price/night</th>
                          <th className="px-4 py-3 font-semibold text-foreground text-right">Saving</th>
                          <th className="px-4 py-3 font-semibold text-foreground text-right">Score</th>
                          <th className="px-4 py-3 font-semibold text-foreground" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {top3.map((deal) => (
                          <tr key={deal.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <img src={deal.image} alt={deal.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                <div>
                                  <p className="font-semibold text-foreground leading-tight">{deal.name}</p>
                                  <p className="text-xs text-muted-foreground">{deal.destination}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right font-bold text-foreground">
                              ${deal.pricePerNight ?? deal.priceTotal}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <span className="inline-flex items-center gap-1 text-accent font-bold text-xs bg-accent/10 px-2 py-0.5 rounded-full">
                                <TrendingDown className="h-3 w-3" />
                                {savings(deal)}%
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right font-semibold text-foreground">
                              {deal.reviewScore} <span className="text-xs text-muted-foreground font-normal">/ 10</span>
                            </td>
                            <td className="px-4 py-4">
                              <a
                                href={deal.bookUrl}
                                rel="nofollow noopener sponsored"
                                target="_blank"
                                data-testid={`button-compare-book-${deal.id}`}
                                className="flex items-center gap-1 text-primary font-semibold text-xs hover:underline whitespace-nowrap"
                              >
                                Book <ChevronRight className="h-3 w-3" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.section>
              )}

              {/* Deal cards */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-5">
                  {filter === "all" ? "All Deals" : filterTabs.find((t) => t.id === filter)?.label}
                  <span className="ml-2 text-base font-normal text-muted-foreground">({filtered.length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {filtered.map((deal, i) => (
                    <DealCard key={deal.id} deal={deal} index={i} />
                  ))}
                </div>
              </div>

              {/* Affiliate disclosure */}
              <div className="flex items-start gap-3 bg-muted/60 border border-border rounded-xl p-4 text-xs text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                <p>
                  <strong className="text-foreground">Affiliate disclosure:</strong> Some links on this page are affiliate links. TravelBuzzy may earn a commission when you book through them, at no additional cost to you. Prices shown are subject to availability and may change. We only feature properties and services we genuinely recommend.{" "}
                  <Link href="/affiliate-disclosure" className="text-primary hover:underline font-medium">Read our full disclosure →</Link>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Deal alert signup */}
              <div className="bg-primary text-white rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-accent" />
                  <p className="text-sm font-bold uppercase tracking-wider text-accent">Never miss a deal</p>
                </div>
                <h3 className="font-display font-bold text-xl mb-2">Get deals in your inbox</h3>
                <p className="text-white/75 text-sm mb-4">
                  Every Monday we send our 5 best deals directly to subscribers — before they're published on the site.
                </p>
                <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    data-testid="input-sidebar-email"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                  />
                  <button
                    type="submit"
                    data-testid="button-sidebar-subscribe"
                    className="w-full bg-accent hover:bg-[#E85D6A] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Get Weekly Deals
                  </button>
                </form>
                <p className="text-white/50 text-xs mt-3">Unsubscribe any time. No spam, ever.</p>
              </div>

              {/* How we pick deals */}
              <div className="bg-surface border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <h3 className="font-display font-bold text-foreground">How we pick deals</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Prices verified against 3+ booking platforms",
                    "Review score minimum of 8.5 / 10",
                    "Only properties with flexible cancellation",
                    "Savings compared to 30-day average price",
                    "Team members have visited when possible",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick links */}
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-display font-bold text-foreground mb-3">Browse by destination</h3>
                <div className="space-y-1">
                  {["Maldives", "Santorini", "Tokyo", "Bali", "Paris", "Thailand", "Barcelona", "Lisbon"].map((dest) => (
                    <Link
                      key={dest}
                      href={`/#destinations`}
                      className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-primary transition-colors border-b border-border/50 last:border-0"
                    >
                      {dest}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
        {/* ── Seasonal Price Guide ── */}
        <section className="bg-muted/40 border-t border-border py-14 px-4">
          <div className="container mx-auto max-w-6xl">

            {/* Heading */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Seasonal Price Guide
                </div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  Best value destinations by month
                </h2>
                <p className="text-muted-foreground text-sm mt-1.5 max-w-xl">
                  Pick any month to see where prices dip, crowds thin, and weather peaks — so you can plan around value, not guesswork.
                </p>
              </div>
            </div>

            {/* Month selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar mb-8">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  onClick={() => setActiveMonth(i)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    activeMonth === i
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "border-border text-muted-foreground bg-surface hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Cards */}
            <motion.div
              key={activeMonth}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {seasonalData[activeMonth].map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="group bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Month chip */}
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wide bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {MONTH_FULL[activeMonth]}
                    </span>

                    {/* Badge */}
                    {dest.badge && (
                      <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_COLORS[dest.badge] ?? "bg-primary text-white"}`}>
                        {dest.badge}
                      </span>
                    )}

                    {/* Destination name */}
                    <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3">
                      <p className="text-white font-display font-bold text-lg leading-tight">
                        {dest.flag} {dest.name}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                      {dest.why}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs">
                        <Thermometer className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span className="text-foreground font-medium">{dest.weather}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <TrendingDown className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span className="text-accent font-semibold">{dest.saving}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                      <MapPin className="h-3 w-3" />
                      View {dest.name} guide
                      <ChevronRight className="h-3 w-3 ml-auto" />
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>

          </div>
        </section>

      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
