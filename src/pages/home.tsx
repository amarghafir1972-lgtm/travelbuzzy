import { useSeo } from "@/hooks/use-seo";
import StickyHeader from "./home/StickyHeader";
import HeroSection from "./home/HeroSection";
import DestinationSearchSection from "./home/DestinationSearchSection";
import PopularDestinationsSection from "./home/PopularDestinationsSection";
import CategorySection from "./home/CategorySection";
import FeaturedDealsSection from "./home/FeaturedDealsSection";
import DestinationGuidesSection from "./home/DestinationGuidesSection";
import RegionsSection from "./home/RegionsSection";
import BestTimeSection from "./home/BestTimeSection";
import FlightDealsSection from "./home/FlightDealsSection";
import NewsletterSection from "./home/NewsletterSection";
import Footer from "./home/Footer";

export default function Home() {
  useSeo({
    title: "Find Better Travel Deals Before Everyone Else",
    description: "Curated hotel picks, flight deals, and destination guides — updated daily by people who actually travel. Save up to 40% on handpicked travel.",
    image: "/images/bali.jpg",
    url: "/",
  });
  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-background text-foreground overflow-x-hidden">
      <StickyHeader />
      <main className="flex-1">
        <HeroSection />
        <DestinationSearchSection />
        <PopularDestinationsSection />
        <RegionsSection />
        <CategorySection />
        <FeaturedDealsSection />
        <DestinationGuidesSection />
        <BestTimeSection />
        <FlightDealsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
