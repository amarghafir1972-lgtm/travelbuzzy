import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "homepage-newsletter" }),
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

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Weekly Deals Newsletter
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-4">
            Get the Best Deals First.
          </h2>
          <p className="text-white/75 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
            Every week, we curate the top hotel deals, flight drops, and destination tips so you never miss a good price. Practical, not spammy.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-white/15 border border-white/30 rounded-xl p-5"
            >
              <CheckCircle className="h-6 w-6 text-white shrink-0" />
              <div>
                <p className="text-white font-semibold">You're on the list.</p>
                <p className="text-white/70 text-sm">Check your inbox for a welcome note from us.</p>
              </div>
            </motion.div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
                data-testid="form-newsletter"
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="h-12 bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/60 flex-1"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 px-7 bg-accent hover:bg-[#E85D6A] text-white font-bold shrink-0 shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  data-testid="button-newsletter-subscribe"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" />Subscribing…</>
                  ) : "Subscribe"}
                </Button>
              </form>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-3 text-sm text-white/90 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 max-w-md"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </>
          )}

          <p className="mt-4 text-sm text-white/55">
            Join 24,000+ travelers. No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
