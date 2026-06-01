import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Copy, Check, ArrowLeft, ArrowRight, Save } from "lucide-react";
import type { BakesaleConfig, DonationOption, DonationType } from "@/types/bakesale";
import { getConfig, saveConfig, generateShareLink } from "@/lib/bakesale-config";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "admin";

const DONATION_TYPES: { value: DonationType; label: string }[] = [
  { value: "venmo", label: "Venmo" },
  { value: "classy", label: "Classy / Campaign Page" },
  { value: "zelle", label: "Zelle" },
  { value: "paypal", label: "PayPal" },
  { value: "cashapp", label: "Cash App" },
  { value: "other", label: "Other" },
];

const STEPS = ["Recipe", "Passcode & Baker", "Personal Message", "Beneficiary", "Donation Options"];

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<BakesaleConfig>(getConfig);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="text-5xl">⚙️</div>
          <h1 className="text-2xl font-display font-bold text-foreground">Bakesale Admin</h1>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Admin password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (pwInput === ADMIN_PASSWORD) setAuthed(true);
                }
              }}
              className="text-center text-lg rounded-xl border-2 border-secondary h-12"
            />
            <Button
              onClick={() => {
                if (pwInput === ADMIN_PASSWORD) setAuthed(true);
              }}
              className="w-full h-12 text-lg font-display rounded-xl"
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const update = (patch: Partial<BakesaleConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const addDonationOption = () => {
    const newOption: DonationOption = {
      id: Date.now().toString(),
      type: "venmo",
      label: "",
      url: "",
      subtitle: "",
    };
    update({ donationOptions: [...config.donationOptions, newOption] });
  };

  const updateDonationOption = (id: string, patch: Partial<DonationOption>) => {
    update({
      donationOptions: config.donationOptions.map((o) =>
        o.id === id ? { ...o, ...patch } : o
      ),
    });
  };

  const removeDonationOption = (id: string) => {
    update({ donationOptions: config.donationOptions.filter((o) => o.id !== id) });
  };

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    toast({ title: "Config saved!", description: "Your bakesale page has been updated." });
  };

  const shareLink = generateShareLink(window.location.origin, config.passcode);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center space-y-2 pt-8">
          <div className="text-4xl">⚙️🍪</div>
          <h1 className="text-3xl font-display font-bold text-foreground">Bakesale Setup</h1>
          <p className="text-muted-foreground font-body text-sm">
            Step {step + 1} of {STEPS.length}: <strong>{STEPS[step]}</strong>
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Card className="border-2 border-secondary/50 rounded-2xl">
          <CardContent className="p-6 space-y-4">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label className="font-display">Recipe Name</Label>
                  <Input
                    value={config.recipe.name}
                    onChange={(e) => update({ recipe: { ...config.recipe, name: e.target.value } })}
                    placeholder="e.g. Salted Chocolate Chunk Shortbread Cookies"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-display">Short Description</Label>
                  <Input
                    value={config.recipe.description}
                    onChange={(e) => update({ recipe: { ...config.recipe, description: e.target.value } })}
                    placeholder="e.g. baked with love ❤️ and butter"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-display">Emoji</Label>
                  <Input
                    value={config.recipe.emoji}
                    onChange={(e) => update({ recipe: { ...config.recipe, emoji: e.target.value } })}
                    placeholder="🍪"
                    className="w-20 text-center text-2xl"
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label className="font-display">Passcode</Label>
                  <Input
                    value={config.passcode}
                    onChange={(e) => update({ passcode: e.target.value })}
                    placeholder="e.g. appleton2026"
                  />
                  <p className="text-xs text-muted-foreground">Visitors enter this to unlock the page.</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-display">Your Name</Label>
                  <Input
                    value={config.bakerName}
                    onChange={(e) => update({ bakerName: e.target.value })}
                    placeholder="e.g. Jess"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <Label className="font-display">Personal Message</Label>
                <Textarea
                  value={config.personalMessage}
                  onChange={(e) => update({ personalMessage: e.target.value })}
                  placeholder="Tell visitors about your bake and the cause…"
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Use **bold** for emphasis. Line breaks will be preserved.
                </p>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label className="font-display">Organization Name</Label>
                  <Input
                    value={config.beneficiary.name}
                    onChange={(e) =>
                      update({ beneficiary: { ...config.beneficiary, name: e.target.value } })
                    }
                    placeholder="e.g. Big Brothers Big Sisters of Metropolitan Chicago"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-display">About / Info URL</Label>
                  <Input
                    value={config.beneficiary.aboutUrl}
                    onChange={(e) =>
                      update({ beneficiary: { ...config.beneficiary, aboutUrl: e.target.value } })
                    }
                    placeholder="https://…"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-display">Short Description</Label>
                  <Textarea
                    value={config.beneficiary.description}
                    onChange={(e) =>
                      update({ beneficiary: { ...config.beneficiary, description: e.target.value } })
                    }
                    placeholder="What does this org do?"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-display">Logo URL (optional)</Label>
                  <Input
                    value={config.beneficiary.logoUrl || ""}
                    onChange={(e) =>
                      update({ beneficiary: { ...config.beneficiary, logoUrl: e.target.value || undefined } })
                    }
                    placeholder="https://… or /bbbs-logo.png"
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-4">
                {config.donationOptions.map((opt, idx) => (
                  <div
                    key={opt.id}
                    className="p-4 rounded-xl border border-border space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-display font-semibold text-muted-foreground">
                        Option {idx + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDonationOption(opt.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Type</Label>
                      <Select
                        value={opt.type}
                        onValueChange={(v) =>
                          updateDonationOption(opt.id, { type: v as DonationType })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DONATION_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={opt.label}
                        onChange={(e) => updateDonationOption(opt.id, { label: e.target.value })}
                        placeholder="e.g. Venmo Jess"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">URL</Label>
                      <Input
                        value={opt.url}
                        onChange={(e) => updateDonationOption(opt.id, { url: e.target.value })}
                        placeholder="https://…"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Subtitle</Label>
                      <Input
                        value={opt.subtitle}
                        onChange={(e) => updateDonationOption(opt.id, { subtitle: e.target.value })}
                        placeholder="e.g. Super quick and easy"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addDonationOption} className="w-full rounded-xl">
                  <Plus className="h-4 w-4 mr-2" /> Add Donation Option
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="rounded-xl">
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSave} className="rounded-xl">
              <Save className="h-4 w-4 mr-1" /> Save & Generate Link
            </Button>
          )}
        </div>

        {/* Generated link */}
        {saved && (
          <Card className="border-2 border-primary/30 rounded-2xl bg-primary/5">
            <CardContent className="p-6 space-y-3 text-center">
              <div className="text-2xl">✅</div>
              <h2 className="text-lg font-display font-bold text-foreground">Your QR Code Link</h2>
              <p className="text-xs text-muted-foreground font-body">
                Point your QR code to this URL:
              </p>
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-3">
                <code className="text-sm flex-1 break-all text-foreground">{shareLink}</code>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="flex-shrink-0">
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <a
                href={shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm underline underline-offset-2 font-body"
              >
                Preview the page ↗
              </a>
            </CardContent>
          </Card>
        )}

        <footer className="text-center py-6 text-xs text-muted-foreground font-body">
          <p>Bakesale Setup Wizard • localStorage only</p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
