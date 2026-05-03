import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import CookieBanner from "@/components/CookieBanner";

const Home = lazy(() => import("@/pages/home"));
const AffiliateDisclosure = lazy(() => import("@/pages/legal/AffiliateDisclosure"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("@/pages/legal/TermsOfUse"));
const CookiePolicy = lazy(() => import("@/pages/legal/CookiePolicy"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Deals = lazy(() => import("@/pages/Deals"));
const Destination = lazy(() => import("@/pages/Destination"));
const Hotels = lazy(() => import("@/pages/Hotels"));
const Tips = lazy(() => import("@/pages/Tips"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Region = lazy(() => import("@/pages/Region"));
const TripPlanner = lazy(() => import("@/pages/TripPlanner"));
const Compare = lazy(() => import("@/pages/Compare"));
const BestInMonth = lazy(() => import("@/pages/BestInMonth"));
const CategoryGuide = lazy(() => import("@/pages/CategoryGuide"));
const WhereToStay = lazy(() => import("@/pages/WhereToStay"));
const WhereToEat = lazy(() => import("@/pages/WhereToEat"));
const Spa = lazy(() => import("@/pages/Spa"));

const queryClient = new QueryClient();

const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

function Router() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/affiliate-disclosure" component={AffiliateDisclosure} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/hotels" component={Hotels} />
        <Route path="/tips" component={Tips} />
        <Route path="/deals" component={Deals} />
        <Route path="/destinations/:slug" component={Destination} />
        <Route path="/regions/:slug" component={Region} />
        <Route path="/sitemap" component={Sitemap} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/trip-planner" component={TripPlanner} />
        <Route path="/compare" component={Compare} />
        <Route path="/when-to-go" component={BestInMonth} />
        <Route path="/guides/:slug" component={CategoryGuide} />
        <Route path="/where-to-stay" component={WhereToStay} />
        <Route path="/where-to-eat" component={WhereToEat} />
        <Route path="/spa" component={Spa} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <CookieBanner />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
