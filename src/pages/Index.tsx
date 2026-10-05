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
import type { BakesaleConfig, DonationType } from "@/types/bakesale";

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
  const [unlocked, setUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [error, setError] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [config, setConfig] = useState<BakesaleConfig>(getConfig);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && code.toLowerCase() === config.passcode.toLowerCase()) {
      setUnlocked(true);
      setTimeout(() => setDonateOpen(true), 100);
    }
  }, [searchParams, config.passcode]);

  const handleUnlock = () => {
    if (passcodeInput.toLowerCase() === config.passcode.toLowerCase()) {
      setUnlocked(true);
      setError(false);
      setTimeout(() => setDonateOpen(true), 100);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="text-6xl">{config.recipes[0]?.emoji || "🍪"}</div>
          <p className="sign-eyebrow">Homemade, fresh baked</p>
          <h1 className="text-4xl font-display font-black text-foreground leading-[0.95]">
            Baked with Love,
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
          <div className="text-7xl">{config.recipes[0]?.emoji || "🍪"}</div>
          <p className="sign-eyebrow">Homemade, fresh baked</p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-foreground leading-[0.95] tracking-tight">
            Baked with Love,
            <br />
            <span className="text-primary">for a Good Cause</span>
          </h1>
          <div className="flex items-center justify-center gap-4 rounded-sign bg-sign-dark px-6 py-5 text-left">
            <span className="font-display font-black text-6xl leading-none text-sign-amber">$5</span>
            <span className="font-display font-semibold text-2xl leading-tight text-sign-cream">
              a bag. <span className="text-sign-amber">Any flavor.</span>
            </span>
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
                  { stat: "80%", label: "of Littles improved emotional regulation" },
                  { stat: "90%", label: "stayed on track or improved peer relationships" },
                  { stat: "95%", label: "of senior Littles graduate with a plan for the future" },
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
      <section className="px-4 py-8 max-w-lg mx-auto text-center">
        <Button
          onClick={() => setDonateOpen(true)}
          className="h-14 px-10 text-xl font-display font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-none transition-colors"
        >
          <Heart className="h-5 w-5 mr-2" />
          Pay or Donate
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
              Choose How to Pay 💛
            </DialogTitle>
            <DialogDescription className="text-center font-body">
              Every bit helps support {config.beneficiary.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            {config.donationOptions.map((opt) => {
              const style = DONATION_STYLE[opt.type] || DONATION_STYLE.other;
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
                    <div>
                      <div className="font-display text-lg font-semibold text-foreground">
                        {opt.label}
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
      <footer className="text-center py-8 text-sm text-muted-foreground font-body">
        <p>Made with 🧈 and ❤️ by {config.bakerName}</p>
      </footer>
    </div>
  );
};

export default Index;
