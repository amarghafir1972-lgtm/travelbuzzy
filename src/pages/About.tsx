import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plane, ArrowLeft, ArrowRight, ShieldCheck, Globe, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/use-seo";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Editorial independence",
    body: "We never accept payment to rank a property higher than it deserves. Our recommendations are based on research, traveler feedback, and firsthand experience — not commission rates.",
  },
  {
    icon: Globe,
    title: "Practical over pretty",
    body: "We focus on destinations, hotels, and deals that real people can actually use — not aspirational fantasy trips. Useful always beats beautiful.",
  },
  {
    icon: Zap,
    title: "Speed over perfection",
    body: "Good travel deals disappear fast. We prioritise getting useful information to you quickly, then improving it — rather than publishing perfect content six months too late.",
  },
  {
    icon: Heart,
    title: "Honest about how we earn",
    body: "TravelBuzzy is affiliate-funded. We link to booking platforms and earn a commission when you book through us. We're transparent about this and work hard to make sure it never compromises our advice.",
  },
];

const team = [
  {
    name: "The TravelBuzzy Editors",
    role: "Editorial Team",
    bio: "A small team of full-time travelers and former travel industry insiders who've collectively visited 80+ countries. We write what we know, not what we think sounds good.",
    avatar: "TE",
  },
  {
    name: "Research & Deals Team",
    role: "Deals & Pricing",
    bio: "Dedicated to monitoring hotel and flight pricing across dozens of booking platforms daily. When a deal is genuinely good, they catch it before it sells out.",
    avatar: "RD",
  },
  {
    name: "Trust & Editorial Standards",
    role: "Standards & Review",
    bio: "Responsible for fact-checking, affiliate disclosure compliance, and ensuring every recommendation on TravelBuzzy meets our editorial standards.",
    avatar: "TS",
  },
];

export default function About() {
  useSeo({
    title: "About TravelBuzzy",
    description: "TravelBuzzy is an independent travel media company publishing curated hotel picks, destination guides, and honest deal recommendations — by people who actually travel.",
    image: "/images/bali.jpg",
    url: "/about",
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Plane className="h-5 w-5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl text-primary">TravelBuzzy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#destinations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Destinations</a>
            <a href="/#hotels" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Hotels</a>
            <a href="/#deals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Deals</a>
            <Link href="/about" className="text-sm font-medium text-primary transition-colors">About</Link>
          </nav>
          <Button
            asChild
            className="hidden md:inline-flex bg-accent hover:bg-[#E85D6A] text-white font-semibold"
            data-testid="button-about-header-deals"
          >
            <a href="/#deals">See Today's Deals</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, #FF6F7D 0%, transparent 60%)",
        }} />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16 md:py-24 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-sm mb-8 transition-colors"
            data-testid="link-about-back-home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to TravelBuzzy
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              We help you find better travel deals — before everyone else does.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              TravelBuzzy is an independent travel media brand built for people who want practical, honest guidance — not glossy inspiration that leaves them no closer to actually booking a trip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                Cut through the noise. Find the deals that actually matter.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                The travel industry is full of content optimised for search engines, not travelers. Generic "top 10" lists, stock-photo roundups, and deals that expired months ago. TravelBuzzy exists because we got tired of wading through all of it.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                We're a small, independent team that monitors hotel pricing, reads traveler reviews obsessively, and publishes destination guides only when we have something genuinely useful to say. Every recommendation is checked against current prices and real traveler feedback before it goes live.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                We're affiliate-funded, which means we earn a commission when you book through our links — at no cost to you. We're upfront about this, and we work hard to make sure it never compromises the quality or independence of our editorial.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { stat: "80+", label: "Countries covered" },
                { stat: "24K+", label: "Newsletter subscribers" },
                { stat: "Daily", label: "Deal monitoring" },
                { stat: "100%", label: "Editorially independent" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-card border border-border rounded-xl p-6 flex flex-col gap-1"
                >
                  <span className="text-3xl font-display font-bold text-primary">{item.stat}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">How We Work</span>
            <h2 className="text-3xl font-display font-bold text-foreground">What we believe in</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="flex gap-5 p-6 bg-background border border-border rounded-xl"
                >
                  <div className="shrink-0 w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">The Team</span>
            <h2 className="text-3xl font-display font-bold text-foreground">Who's behind TravelBuzzy</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              We're a remote-first team spread across three continents. We don't do press trips — we pay our own way so our recommendations stay independent.
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-white">{member.avatar}</span>
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-0.5">{member.name}</h3>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Editorial standards */}
      <section className="py-16 md:py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">Editorial Standards</span>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">How we decide what to recommend</h2>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Every hotel, destination, or deal featured on TravelBuzzy goes through a consistent evaluation process. We look at verified traveler reviews across multiple platforms, current pricing trends, what's genuinely included versus what's upsold, and how a property or experience compares to alternatives in the same price bracket.
              </p>
              <p>
                We do not accept free stays, press trips, or payment for positive reviews. If we have received complimentary access to anything we've written about, we disclose it clearly in that article. Sponsored content is always labeled as such and never presented as editorial opinion.
              </p>
              <p>
                Our affiliate partnerships — with platforms like Booking.com, Expedia, and similar services — do not influence which hotels or deals we feature. If we link to a hotel via an affiliate link and a non-affiliated alternative is a better option for you, we say so. Commission rates are not a factor in our editorial rankings.
              </p>
              <p>
                If you ever notice a recommendation that seems off, a price that's outdated, or anything that doesn't feel right, please contact us. We take accuracy seriously and we'll investigate every report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to find your next deal?
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8">
              Browse today's curated hotel deals and destination guides — or subscribe to get the best picks delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-[#E85D6A] text-white font-bold h-12 px-8 shadow-md"
                data-testid="button-about-cta-deals"
              >
                <a href="/#deals">
                  See Today's Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white font-bold h-12 px-8"
                data-testid="button-about-cta-newsletter"
              >
                <a href="/#newsletter">Get the Weekly Newsletter</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TravelBuzzy. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/affiliate-disclosure" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Affiliate Disclosure</Link>
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Use</Link>
            <Link href="/cookie-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
