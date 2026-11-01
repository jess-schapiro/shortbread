import type { DonationOption, DonationType } from "@/types/bakesale";

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

export function DonationOptions({ options }: { options: DonationOption[] }) {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
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
  );
}
