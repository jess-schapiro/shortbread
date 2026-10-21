import { KITCHEN_DISCLAIMER, SPONSOR_LINE, THRIVENT_LOGO_SRC } from "@/lib/event-details";

export function EventFooter({ bakerName }: { bakerName: string }) {
  return (
    <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground font-body">
      <div className="max-w-lg mx-auto space-y-5">
        <p>Made with 🧈 and ❤️ by {bakerName}</p>
        <p className="leading-relaxed">{KITCHEN_DISCLAIMER}</p>
        <p>{SPONSOR_LINE}</p>
        {/* Logo slot: drop the official Thrivent logo file in (e.g. src/assets/thrivent-logo.png),
            import it here, and point THRIVENT_LOGO_SRC in src/lib/event-details.ts at it.
            Until then nothing renders here - no placeholder text or empty box is shown to guests. */}
        {THRIVENT_LOGO_SRC ? (
          <img src={THRIVENT_LOGO_SRC} alt="Thrivent" className="mx-auto max-h-20 max-w-48 object-contain" />
        ) : null}
        <div aria-hidden="true" className="text-2xl">🦇 👻 🎃</div>
      </div>
    </footer>
  );
}