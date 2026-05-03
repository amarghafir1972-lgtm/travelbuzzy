import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

interface ToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

function Toggle({ id, label, description, checked, disabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        data-testid={`toggle-cookie-${id}`}
        className={`relative shrink-0 mt-0.5 w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
            ${checked ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function CookieBanner() {
  const { visible, acceptAll, rejectAll, saveCustom } = useCookieConsent();
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-2xl mx-auto bg-surface border border-border rounded-2xl shadow-xl overflow-hidden">
            {/* Main banner */}
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cookie className="h-4.5 w-4.5 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-base font-display font-bold text-foreground">
                    Your privacy, your choice
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    We use cookies to analyse traffic and serve relevant affiliate content. Strictly necessary cookies are always active.{" "}
                    <a
                      href="/cookie-policy"
                      className="text-primary underline underline-offset-2 hover:text-secondary transition-colors"
                      data-testid="link-cookie-banner-policy"
                    >
                      Cookie Policy
                    </a>
                    {" · "}
                    <a
                      href="/privacy-policy"
                      className="text-primary underline underline-offset-2 hover:text-secondary transition-colors"
                      data-testid="link-cookie-banner-privacy"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Custom preferences panel */}
              <AnimatePresence>
                {showCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-background border border-border rounded-xl p-4 mb-4">
                      <Toggle
                        id="necessary"
                        label="Strictly Necessary"
                        description="Required for the site to function. Cannot be disabled."
                        checked={true}
                        disabled={true}
                      />
                      <Toggle
                        id="analytics"
                        label="Analytics"
                        description="Help us understand traffic patterns and improve content (e.g. Google Analytics)."
                        checked={analytics}
                        onChange={setAnalytics}
                      />
                      <Toggle
                        id="marketing"
                        label="Affiliate & Marketing"
                        description="Enables affiliate tracking cookies set by booking partners like Booking.com and Expedia."
                        checked={marketing}
                        onChange={setMarketing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={acceptAll}
                  className="flex-1 bg-accent hover:bg-[#E85D6A] text-white font-bold h-10 shadow-sm"
                  data-testid="button-cookie-accept-all"
                >
                  Accept All
                </Button>

                {showCustom ? (
                  <Button
                    onClick={() => saveCustom(analytics, marketing)}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white font-semibold h-10"
                    data-testid="button-cookie-save-custom"
                  >
                    Save Preferences
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowCustom(true)}
                    variant="outline"
                    className="flex-1 border-border text-muted-foreground hover:text-foreground hover:border-foreground font-semibold h-10"
                    data-testid="button-cookie-customize"
                  >
                    Manage
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}

                <Button
                  onClick={rejectAll}
                  variant="ghost"
                  className="flex-1 text-muted-foreground hover:text-foreground font-semibold h-10 sm:flex-none sm:px-4"
                  data-testid="button-cookie-reject-all"
                >
                  Reject All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
