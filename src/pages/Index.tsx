import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import { getConfig } from "@/lib/bakesale-config";
import { isSessionUnlocked, rememberSessionUnlock } from "@/lib/session-unlock";
import { isCodeUnlock } from "@/lib/code-unlock";
import type { BakesaleConfig, DonationType } from "@/types/bakesale";
import { EventFooter } from "@/components/EventFooter";
import { DONATION_SUGGESTION } from "@/lib/event-details";
import { openVolunteerForm } from "@/lib/volunteer-tracking";
import halloweenTreats from "@/assets/halloween-treats.png";

const DONATION_STYLE: Record<DonationType, { border: string; bg: string; hover: string }> = {
  classy: { border: "border-l-4 border-l-primary", bg: "bg-card", hover: "hover:bg-muted" },
  venmo: { border: "border-l-4 border-l-foreground", bg: "bg-card", hover: "hover:bg-muted" },
  paypal: { border: "border-l-4 border-l-primary", bg: "bg-card", hover: "hover:bg-muted" },
  zelle: { border: "border-l-4 border-l-accent", bg: "bg-card", hover: "hover:bg-muted" },
  cashapp: { border: "border-l-4 border-l-foreground", bg: "bg-card", hover: "hover:bg-muted" },
  other: { border: "border-l-4 border-l-accent", bg: "bg-card", hover: "hover:bg-muted" },
};

const DONATION_EMOJI: Record<DonationType, string> = {
  classy: "🏛️",
  venmo: "💸",
  paypal: "💳",
  zelle: "⚡",
  cashapp: "💵",
  other: "🔗",
};

const DONATION_BADGE: Record<DonationType, { text: string; className: string } | null> = {
  venmo: { text: "Fastest", className: "bg-accent text-accent-foreground" },
  classy: { text: "Tax-deductible", className: "bg-primary text-primary-foreground" },
  paypal: null,
  zelle: null,
  cashapp: null,
  other: null,
};

/** Render personal message with **bold** and line breaks */
function renderMessage(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <strong key={j} className="text-primary">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      return seg;
    });
    return (
      <p key={i}>
        {parts}
        {line === "" && <br />}
      </p>
    );
  });
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState<BakesaleConfig>(getConfig);
  const [unlocked, setUnlocked] = useState(() => isSessionUnlocked(config.passcode));
  const [passcodeInput, setPasscodeInput] = useState("");
  const [error, setError] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  useEffect(() => {
    // QR scans carry ?code= and always open the donate modal, even when this
    // session is already unlocked. Visits without the code never auto-open it.
    if (isCodeUnlock(searchParams.get("code"), config.passcode)) {
      rememberSessionUnlock(config.passcode);
      setUnlocked(true);
      setTimeout(() => setDonateOpen(true), 100);
    }
  }, [searchParams, config.passcode]);

  const handleUnlock = () => {
    if (passcodeInput.toLowerCase() === config.passcode.toLowerCase()) {
      const alreadyUnlocked = isSessionUnlocked(config.passcode);
      rememberSessionUnlock(config.passcode);
      setUnlocked(true);
      setError(false);
      if (!alreadyUnlocked) setTimeout(() => setDonateOpen(true), 100);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <img src={halloweenTreats} alt="" width={992} height={672} className="mx-auto w-48 h-auto" />
          <p className="sign-eyebrow">Halloween treat table · October 31</p>
          <h1 className="text-4xl font-display font-black text-foreground leading-[0.95]">
            Halloween Treats,
            <br />
            <span className="text-primary">for a Good Cause</span>
          </h1>
          <p className="text-muted-foreground font-body">Enter the passcode to continue</p>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Passcode"
              value={passcodeInput}
              onChange={(e) => {
                setPasscodeInput(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUnlock();
                }
              }}
              className="text-center text-lg font-body rounded-xl border-[1.5px] border-border bg-card focus-visible:ring-primary h-12"
            />
            {error && (
              <p className="text-primary text-sm font-body">Hmm, that's not it. Try again! 🤔</p>
            )}
            <Button
              onClick={handleUnlock}
              className="w-full h-12 text-lg font-display font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Unlock 🔓
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-4 pt-12 pb-8 text-center">
        <div className="max-w-lg mx-auto space-y-5">
          <img src={halloweenTreats} alt="" width={992} height={672} className="mx-auto w-48 h-auto" />
          <p className="sign-eyebrow">Saturday, October 31 · Homemade treats</p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-foreground leading-[0.95] tracking-tight">
            Halloween Treats,
            <br />
            <span className="text-primary">for a Good Cause</span>
          </h1>
          <div className="rounded-sign border border-accent bg-sign-dark px-6 py-5 text-center">
            <p className="font-body font-semibold text-lg text-sign-cream">{DONATION_SUGGESTION.split(". ")[0]}.</p>
            <p className="font-display text-3xl text-accent mt-2">Give what you wish.</p>
          </div>
          <div className="space-y-2 text-lg text-muted-foreground font-body pt-2">
            {config.recipes.map((recipe, i) => (
              <div key={i}>
                <span className="font-display font-semibold text-foreground">{recipe.name}</span>
                <span className="text-sm block">{recipe.description}</span>
                {i < config.recipes.length - 1 && (
                  <span className="text-xs text-accent">&</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Message */}
      <section className="px-4 py-6 max-w-lg mx-auto">
        <Card className="sign-card overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold text-primary">
                A Note from {config.bakerName}
              </h2>
            </div>
            <div className="space-y-3 text-foreground/80 font-body leading-relaxed">
              {renderMessage(config.personalMessage)}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* About the Cause */}
      <section className="px-4 py-6 max-w-lg mx-auto">
        <Card className="sign-card overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold text-primary">About the Cause</h2>
            </div>
            <div className="space-y-3 text-foreground/80 font-body leading-relaxed">
              <p>
                <strong className="text-primary">{config.beneficiary.name}</strong>{" "}
                {config.beneficiary.description}{" "}
                <a
                  href={config.beneficiary.aboutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Learn more ↗
                </a>
              </p>
              <div className="grid grid-cols-3 gap-2 py-2">
                {[
                  { stat: "80%", label: "of Littles demonstrated ability to regulate emotions" },
                  { stat: "90%", label: "of Littles stayed on track or improved relationships with peers" },
                  { stat: "95%", label: "of senior Littles go on to graduate from high school with a plan for their future" },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="text-center p-3 bg-background rounded-xl border-[1.5px] border-border"
                  >
                    <div className="text-2xl font-display font-black text-primary mb-1">
                      {item.stat}
                    </div>
                    <div className="text-[11px] leading-tight font-body text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Donate CTA */}
      <section className="px-4 py-6 max-w-lg mx-auto space-y-4 border-y border-border">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          <h2 className="text-3xl font-display text-accent">Become a Big</h2>
        </div>
        <p className="text-foreground/80 font-body leading-relaxed">
          BBBSChi matches Littles with volunteer mentors called Bigs. Littles are waiting for someone who can show up, share a little time, and believe in them. If that sounds like you, we'd love for you to learn more.
        </p>
        <Button onClick={() => openVolunteerForm()} className="w-full h-auto min-h-12 whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold rounded-xl px-4 py-3">
          Learn about becoming a Big <span aria-hidden="true">↗</span>
        </Button>
      </section>

      <section className="px-4 py-8 max-w-lg mx-auto text-center">
        <Button
          onClick={() => setDonateOpen(true)}
          className="h-14 px-10 text-xl font-display font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-none transition-colors"
        >
          <Heart className="h-5 w-5 mr-2" />
          Donate
        </Button>
        <p className="text-sm text-muted-foreground mt-3 font-body">
          100% goes to {config.beneficiary.name}
        </p>
        <div className="mt-5">
          <Link
            to="/cookies"
            className="inline-flex items-center gap-1 text-sm font-body text-primary hover:text-primary/80 underline underline-offset-2"
          >
            🍪 See ingredients & allergen info
          </Link>
        </div>
      </section>

      {/* Donate Modal */}
      <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
        <DialogContent className="rounded-xl max-w-sm mx-auto bg-background border-[1.5px] border-border shadow-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-semibold text-center text-foreground">
              Choose How to Give 🎃
            </DialogTitle>
            <DialogDescription className="text-center font-body">
              Every bit helps support {config.beneficiary.name}
            </DialogDescription>
            <p className="text-xs text-center text-muted-foreground font-body">
               Venmo is fastest. The BBBS link is the one for a tax-deductible gift.
            </p>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            {config.donationOptions.map((opt) => {
              const style = DONATION_STYLE[opt.type] || DONATION_STYLE.other;
              const badge = DONATION_BADGE[opt.type] || null;
              return (
                <a
                  key={opt.id}
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className={`w-full p-4 rounded-xl border-[1.5px] border-border ${style.border} ${style.bg} ${style.hover} transition-all text-left flex items-center gap-3`}
                  >
                    <div className="text-3xl flex-shrink-0">{DONATION_EMOJI[opt.type]}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display text-lg font-semibold text-foreground">
                          {opt.label}
                        </span>
                        {badge && (
                          <span
                            className={`text-[10px] uppercase tracking-wider font-body font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${badge.className}`}
                          >
                            {badge.text}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-body mt-0.5">
                        {opt.subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <p className="text-xs text-center text-muted-foreground font-body pt-1">
            Thank you for your generosity! {config.recipes[0]?.emoji || "🍪"}
          </p>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <EventFooter bakerName={config.bakerName} />
    </div>
  );
};

export default Index;
