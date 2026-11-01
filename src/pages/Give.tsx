import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Users } from "lucide-react";
import { getConfig } from "@/lib/bakesale-config";
import type { BakesaleConfig } from "@/types/bakesale";
import { DonationOptions } from "@/components/DonationOptions";
import { EventFooter } from "@/components/EventFooter";
import { Button } from "@/components/ui/button";
import { openVolunteerForm } from "@/lib/volunteer-tracking";
import halloweenTreats from "@/assets/halloween-treats.png";

const GIVE_TITLE = "Halloween Treats for a Good Cause: give if you wish";

const Give = () => {
  const [config, setConfig] = useState<BakesaleConfig>(getConfig);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  return (
    <div className="min-h-screen bg-background pb-[env(safe-area-inset-bottom)]">
      <Helmet>
        <title>{GIVE_TITLE}</title>
        <meta
          name="description"
          content="Give if you wish. Suggested gift $5, any amount welcome. Every dollar goes to Big Brothers Big Sisters of Metropolitan Chicago."
        />
        <meta property="og:title" content={GIVE_TITLE} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={GIVE_TITLE} />
      </Helmet>

      {/* Hero */}
      <section className="px-4 pt-12 pb-6 text-center">
        <div className="max-w-lg mx-auto space-y-5">
          <img src={halloweenTreats} alt="" width={992} height={672} className="mx-auto w-48 h-auto" />
          <p className="sign-eyebrow">Thank you for coming</p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-foreground leading-[0.95] tracking-tight">
            Enjoyed the <span className="text-primary">treats?</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Give if you wish. Suggested gift $5, any amount welcome. Every dollar goes to{" "}
            <strong className="text-primary">{config.beneficiary.name}</strong>.
          </p>
        </div>
      </section>

      {/* Donate options, visible without a modal */}
      <section className="px-4 pb-6 max-w-lg mx-auto">
        <DonationOptions options={config.donationOptions} />
        <p className="text-xs text-center text-muted-foreground font-body pt-3">
          Venmo is fastest. The BBBS link is the one for a tax-deductible gift.
        </p>
      </section>

      {/* Ingredients link */}
      <section className="px-4 pb-6 max-w-lg mx-auto text-center">
        <Link
          to="/cookies"
          className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-body inline-flex items-center min-h-11"
        >
          See ingredients & allergen info
        </Link>
      </section>

      {/* About the Cause */}
      <section className="px-4 pb-8 max-w-lg mx-auto">
        <div className="sign-card overflow-hidden rounded-xl border-[1.5px] border-border bg-card">
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold text-primary">About the Cause</h2>
            </div>
            <p className="text-foreground/80 font-body leading-relaxed">
              <strong className="text-primary">{config.beneficiary.name}</strong>{" "}
              {config.beneficiary.description}{" "}
              <a
                href={config.beneficiary.aboutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors inline-flex items-center min-h-11 -my-3"
              >
                Learn more ↗
              </a>
            </p>
            <p className="text-foreground/80 font-body">Want to do more? Littles are waiting for a Big.</p>
            <Button onClick={() => openVolunteerForm()} className="w-full h-auto min-h-12 whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold rounded-xl px-4 py-3">
              Learn about becoming a Big <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </section>

      <EventFooter bakerName={config.bakerName} />
    </div>
  );
};

export default Give;
