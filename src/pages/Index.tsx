import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription } from
"@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ExternalLink, Cookie, Users, Star } from "lucide-react";

const PASSCODE = "appleton2026";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [unlocked, setUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [error, setError] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && code.toLowerCase() === PASSCODE) {
      setUnlocked(true);
      setTimeout(() => setDonateOpen(true), 100);
    }
  }, [searchParams]);

  const handleUnlock = () => {
    if (passcodeInput.toLowerCase() === PASSCODE) {
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
          <div className="text-6xl animate-bounce-soft">🍪</div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Grab a Cookie,
            <br />
            Give if You Wish
          </h1>
          <p className="text-muted-foreground font-body">
            Enter the passcode to continue
          </p>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Passcode"
              value={passcodeInput}
              onChange={(e) => {
                setPasscodeInput(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => {if (e.key === "Enter") {e.preventDefault();handleUnlock();}}}
              className="text-center text-lg font-display rounded-xl border-2 border-secondary focus:border-primary h-12" />
            
            {error &&
            <p className="text-accent text-sm font-body">
                Hmm, that's not it. Try again! 🤔
              </p>
            }
            <Button
              onClick={handleUnlock}
              className="w-full h-12 text-lg font-display rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              
              Unlock 🔓
            </Button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-12 pb-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-lg mx-auto space-y-4">
          <div className="text-7xl">🍪</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            Grab a Cookie,
            <br />
            <span className="text-primary">Give if You Wish</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body">
            Salted Chocolate Chunk Shortbread Cookies
            <br />
            <span className="text-sm">baked with love ❤️ and butter</span>
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
                A Note from Jess
              </h2>
            </div>
            <div className="space-y-3 text-foreground/80 font-body leading-relaxed">
              <p>



              </p>
              <p>
                If you're feeling generous, I'm raising money for{" "}
                <strong className="text-primary">
                  Big Brothers Big Sisters of Metropolitan Chicago
                </strong>
                . Every dollar helps create and support one-to-one mentoring
                relationships for young people.
              </p>
              <p>No pressure at all; the cookies are free! But if you'd like to give, it would mean the world. 


              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* About BBBS */}
      <section className="px-4 py-6 max-w-lg mx-auto">
        <Card className="border-2 border-primary/20 shadow-lg rounded-2xl overflow-hidden bg-primary/5">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-foreground">
                About the Cause
              </h2>
            </div>
            <div className="space-y-3 text-foreground/80 font-body leading-relaxed">
              <p>
                <strong className="text-primary">
                  Big Brothers Big Sisters of Metropolitan Chicago
                </strong>{" "}
                creates and supports one-to-one mentoring relationships that
                ignite the power and promise of young people.{" "}
                <a href="https://bbbschgo.org/about/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                  Learn more ↗
                </a>
              </p>
              <div className="grid grid-cols-2 gap-3 py-2">
                {[
                { emoji: "🤝", label: "1-to-1 Mentoring" },
                { emoji: "💡", label: "Youth Empowerment" }].
                map((item) =>
                <div
                  key={item.label}
                  className="text-center p-3 bg-card rounded-xl border border-border">
                  
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-xs font-display font-medium text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Donate CTA */}
      <section className="px-4 py-8 max-w-lg mx-auto text-center">
        <Button
          onClick={() => setDonateOpen(true)}
          className="h-14 px-10 text-xl font-display rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          
          <Heart className="h-5 w-5 mr-2" />
          Donate
        </Button>
        <p className="text-sm text-muted-foreground mt-3 font-body">
          100% goes to Big Brothers Big Sisters
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
              Every bit helps support youth mentoring in Chicago
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <a
              href="https://donate.bbbschgo.org/fundraiser/6598504"
              target="_blank"
              rel="noopener noreferrer"
              className="block">
              
              <div className="w-full p-4 rounded-xl border-2 border-primary bg-cookie-chocolate/80 hover:bg-cookie-chocolate transition-all text-left flex items-center gap-3">
                <img src="/bbbs-logo.png" alt="BBBS Logo" className="h-10 w-10 object-contain flex-shrink-0" />
                <div>
                  <div className="font-display text-lg font-semibold text-primary-foreground">
                    BBBS Campaign Page
                  </div>
                  <p className="text-sm text-primary-foreground/70 font-body mt-0.5">
                    Official receipt for tax-deductible donations
                  </p>
                </div>
              </div>
            </a>
            <a
              href="https://venmo.com/u/Jess-Schapiro"
              target="_blank"
              rel="noopener noreferrer"
              className="block">
              
              <div className="w-full p-4 rounded-xl border-2 border-secondary bg-cookie-brown/80 hover:bg-cookie-brown transition-all text-left flex items-center gap-3">
                <img src="/venmo-logo.png" alt="Venmo Logo" className="h-10 w-10 object-contain flex-shrink-0 invert" />
                <div>
                  <div className="font-display text-lg font-semibold text-primary-foreground">
                    Venmo Jess
                  </div>
                  <p className="text-sm text-primary-foreground/70 font-body mt-0.5">
                    Super quick and easy
                  </p>
                </div>
              </div>
            </a>
          </div>
          <p className="text-xs text-center text-muted-foreground font-body pt-1">
            Thank you for your generosity! 🍪
          </p>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted-foreground font-body">
        <p>Made with 🧈 and ❤️ by Jess</p>
      </footer>
    </div>);

};

export default Index;