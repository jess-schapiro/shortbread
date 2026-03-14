import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  classy: { border: "border-primary", bg: "bg-cookie-chocolate/80", hover: "hover:bg-cookie-chocolate" },
  venmo: { border: "border-secondary", bg: "bg-cookie-brown/80", hover: "hover:bg-cookie-brown" },
  paypal: { border: "border-primary", bg: "bg-primary/20", hover: "hover:bg-primary/30" },
  zelle: { border: "border-secondary", bg: "bg-secondary/40", hover: "hover:bg-secondary/60" },
  cashapp: { border: "border-secondary", bg: "bg-cookie-brown/80", hover: "hover:bg-cookie-brown" },
  other: { border: "border-secondary", bg: "bg-muted", hover: "hover:bg-muted/80" },
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
          <div className="text-6xl animate-bounce-soft">{config.recipe.emoji}</div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Grab a Cookie,
            <br />
            Give if You Wish
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
              className="text-center text-lg font-display rounded-xl border-2 border-secondary focus:border-primary h-12"
            />
            {error && (
              <p className="text-accent text-sm font-body">Hmm, that's not it. Try again! 🤔</p>
            )}
            <Button
              onClick={handleUnlock}
              className="w-full h-12 text-lg font-display rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
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
      <section className="relative overflow-hidden px-4 pt-12 pb-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-lg mx-auto space-y-4">
          <div className="text-7xl">{config.recipe.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            Grab a Cookie,
            <br />
            <span className="text-primary">Give if You Wish</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body">
            {config.recipe.name}
            <br />
            <span className="text-sm">{config.recipe.description}</span>
          </p>
        </div>
      </section>

      {/* Personal Message */}
      <section className="px-4 py-6 max-w-lg mx-auto">
        <Card className="border-2 border-secondary/50 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-display font-bold text-foreground">
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
        <Card className="border-2 border-primary/20 shadow-lg rounded-2xl overflow-hidden bg-primary/5">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-foreground">About the Cause</h2>
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
              <div className="grid grid-cols-2 gap-3 py-2">
                {[
                  { emoji: "❤️", label: "Community Impact" },
                  { emoji: "💡", label: "Making a Difference" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-3 bg-card rounded-xl border border-border"
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-xs font-display font-medium text-muted-foreground">
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
          className="h-14 px-10 text-xl font-display rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Heart className="h-5 w-5 mr-2" />
          Donate
        </Button>
        <p className="text-sm text-muted-foreground mt-3 font-body">
          100% goes to {config.beneficiary.name}
        </p>
      </section>

      {/* Donate Modal */}
      <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
        <DialogContent className="rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center">
              Choose How to Give 💛
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
                    className={`w-full p-4 rounded-xl border-2 ${style.border} ${style.bg} ${style.hover} transition-all text-left flex items-center gap-3`}
                  >
                    <div className="text-3xl flex-shrink-0">{DONATION_EMOJI[opt.type]}</div>
                    <div>
                      <div className="font-display text-lg font-semibold text-primary-foreground">
                        {opt.label}
                      </div>
                      <p className="text-sm text-primary-foreground/70 font-body mt-0.5">
                        {opt.subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <p className="text-xs text-center text-muted-foreground font-body pt-1">
            Thank you for your generosity! {config.recipe.emoji}
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
