import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ArrowLeft, Mail, Users, Handshake, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSeo } from "@/hooks/use-seo";

type InquiryType = "reader" | "press" | "affiliate" | "";

const inquiryTypes: { id: InquiryType; icon: typeof Mail; label: string; description: string }[] = [
  {
    id: "reader",
    icon: Mail,
    label: "Reader question or feedback",
    description: "Ask about a destination, report an error, or share feedback on our content.",
  },
  {
    id: "press",
    icon: Users,
    label: "Press or partnership enquiry",
    description: "Media features, editorial collaborations, or brand partnership opportunities.",
  },
  {
    id: "affiliate",
    icon: Handshake,
    label: "Affiliate program application",
    description: "Apply to be featured as an affiliate partner or booking platform on TravelBuzzy.",
  },
];

const placeholders: Record<NonNullable<InquiryType>, string> = {
  reader: "Tell us which destination or article you're asking about, and what would be most helpful to know...",
  press: "Describe the collaboration or partnership opportunity, including your brand, publication, or organisation...",
  affiliate: "Tell us about your platform, the products or services you offer travelers, and why you'd be a good fit for TravelBuzzy readers...",
};

const subjectLabels: Record<NonNullable<InquiryType>, string> = {
  reader: "Reader question",
  press: "Press enquiry",
  affiliate: "Affiliate application",
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export default function Contact() {
  useSeo({
    title: "Contact TravelBuzzy",
    description: "Get in touch with the TravelBuzzy team — reader questions, press enquiries, and affiliate partnership applications all welcome.",
    url: "/contact",
  });

  const [inquiryType, setInquiryType] = useState<InquiryType>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = !!inquiryType && name.trim().length > 0 && email.trim().length > 0 && message.trim().length >= 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    const subject = subjectLabels[inquiryType as NonNullable<InquiryType>] +
      (company.trim() ? ` — ${company.trim()}` : "");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
          source: `contact-page-${inquiryType}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as any).error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  function resetForm() {
    setStatus("idle");
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setInquiryType("");
    setErrorMsg("");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Plane className="h-5 w-5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl text-primary">TravelBuzzy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#destinations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Destinations</a>
            <a href="/#deals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Deals</a>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-primary">Contact</Link>
          </nav>
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-[#E85D6A] text-white font-semibold" data-testid="button-contact-header-deals">
            <a href="/#deals">See Today's Deals</a>
          </Button>
        </div>
      </header>

      {/* Hero band */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-sm mb-6 transition-colors" data-testid="link-contact-back-home">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to TravelBuzzy
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Get in touch</h1>
          <p className="text-white/65 text-base max-w-xl leading-relaxed">
            Whether you have a question about a destination, a press enquiry, or want to explore an affiliate partnership — use the form below and we'll get back to you within 2 business days.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 md:gap-16">

          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-4 bg-card border border-border rounded-2xl p-8"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground mb-2">Message received</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                      Thanks for reaching out. We read every message and will get back to you at <strong className="text-foreground">{email}</strong> within 2 business days.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="mt-2"
                    data-testid="button-contact-send-another"
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7"
                  data-testid="form-contact"
                >
                  {/* Inquiry type */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-3 block">
                      What's your enquiry about? <span className="text-accent">*</span>
                    </Label>
                    <div className="flex flex-col gap-2">
                      {inquiryTypes.map((type) => {
                        const Icon = type.icon;
                        const active = inquiryType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setInquiryType(type.id)}
                            disabled={status === "loading"}
                            data-testid={`button-contact-type-${type.id}`}
                            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-150 disabled:opacity-60
                              ${active
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border bg-card hover:border-primary/30 hover:bg-muted/30"
                              }`}
                          >
                            <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 transition-colors
                              ${active ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                              <Icon className="h-4 w-4" strokeWidth={2} />
                            </div>
                            <div>
                              <p className={`text-sm font-semibold transition-colors ${active ? "text-primary" : "text-foreground"}`}>
                                {type.label}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{type.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-name" className="text-sm font-semibold text-foreground">
                        Your name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        type="text"
                        placeholder="Jane Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={status === "loading"}
                        data-testid="input-contact-name"
                        className="h-11"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-email" className="text-sm font-semibold text-foreground">
                        Email address <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === "loading"}
                        data-testid="input-contact-email"
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Company — visible for press/affiliate */}
                  <AnimatePresence>
                    {(inquiryType === "press" || inquiryType === "affiliate") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="contact-company" className="text-sm font-semibold text-foreground">
                            {inquiryType === "affiliate" ? "Company / platform name" : "Publication or organisation"}
                          </Label>
                          <Input
                            id="contact-company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            disabled={status === "loading"}
                            placeholder={inquiryType === "affiliate" ? "e.g. Booking.com, My Travel Blog" : "e.g. Condé Nast Traveller, TechCrunch"}
                            data-testid="input-contact-company"
                            className="h-11"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-message" className="text-sm font-semibold text-foreground">
                      Message <span className="text-accent">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder={inquiryType ? placeholders[inquiryType] : "Tell us what's on your mind..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      disabled={status === "loading"}
                      data-testid="input-contact-message"
                      className="resize-none leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground">We aim to respond within 2 business days.</p>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-4 py-3"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={!canSubmit || status === "loading"}
                    className="self-start h-11 px-8 bg-accent hover:bg-[#E85D6A] text-white font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    data-testid="button-contact-submit"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sending…</>
                    ) : "Send Message"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5">
            {/* Direct email */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-1">Prefer email?</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">You can reach us directly at the addresses below.</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "General", email: "hello@travelbuzzy.com" },
                  { label: "Press", email: "press@travelbuzzy.com" },
                  { label: "Partnerships", email: "partners@travelbuzzy.com" },
                  { label: "Legal / Privacy", email: "legal@travelbuzzy.com" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-muted-foreground w-20 shrink-0">{item.label}</span>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-xs text-primary hover:underline underline-offset-2 truncate"
                      data-testid={`link-contact-email-${item.label.toLowerCase()}`}
                    >
                      {item.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Response times */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display font-bold text-sm text-foreground mb-3">Response times</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { type: "Reader questions", time: "2–3 business days" },
                  { type: "Press enquiries", time: "1–2 business days" },
                  { type: "Affiliate applications", time: "3–5 business days" },
                ].map((item) => (
                  <div key={item.type} className="flex items-start justify-between gap-3">
                    <span className="text-xs text-muted-foreground leading-relaxed">{item.type}</span>
                    <span className="text-xs font-semibold text-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliate note */}
            <div className="bg-primary/8 border border-primary/20 rounded-xl p-5">
              <h3 className="font-display font-bold text-sm text-primary mb-1">Affiliate partners</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We work with hotel booking platforms, flight comparison tools, travel insurance providers, and activity booking services. If your product genuinely helps TravelBuzzy readers save time or money, we'd like to hear from you.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} TravelBuzzy. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/affiliate-disclosure" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Affiliate Disclosure</Link>
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
