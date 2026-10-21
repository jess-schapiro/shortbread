import { KITCHEN_DISCLAIMER, SPONSOR_LINE } from "@/lib/event-details";

export function EventFooter({ bakerName }: { bakerName: string }) {
  return (
    <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground font-body">
      <div className="max-w-lg mx-auto space-y-5">
        <p>Made with 🧈 and ❤️ by {bakerName}</p>
        <p className="leading-relaxed">{KITCHEN_DISCLAIMER}</p>
        <p>{SPONSOR_LINE}</p>
        <div aria-hidden="true" className="text-2xl">🦇 👻 🎃</div>
      </div>
    </footer>
  );
}
