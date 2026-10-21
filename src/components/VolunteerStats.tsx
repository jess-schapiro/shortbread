import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVolunteerStats, type ClickStats } from "@/lib/volunteer-tracking";

export function VolunteerStats() {
  const [stats, setStats] = useState<ClickStats>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const refresh = async () => {
    setLoading(true);
    setError(false);
    try { setStats(await getVolunteerStats()); } catch { setError(true); }
    finally { setLoading(false); }
  };
  useEffect(() => { void refresh(); }, []);
  return (
    <section className="border-y border-border py-6 space-y-4" aria-label="Volunteer click counts">
      <div className="flex justify-between items-center gap-3">
        <h2 className="font-display text-2xl text-accent">Become a Big clicks</h2>
        <Button variant="outline" size="icon" onClick={() => void refresh()} disabled={loading} aria-label="Refresh click counts" title="Refresh click counts">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      {loading ? <p role="status">Loading click counts...</p> : error ? <p role="alert">Click counts couldn't load. Please try again.</p> : stats ? (
        <>
          <p className="text-muted-foreground">Total clicks <strong className="text-3xl text-primary ml-3">{stats.total}</strong></p>
          <p className="text-xs text-muted-foreground">Daily counts in Chicago time. Button clicks only, not form submissions.</p>
          {stats.days.length === 0 ? <p>No clicks yet.</p> : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="py-2 text-left font-medium">Day</th><th className="py-2 text-right font-medium">Clicks</th></tr></thead>
              <tbody>{stats.days.map(({ day, clicks }) => <tr key={day} className="border-b border-border"><td className="py-2">{day}</td><td className="py-2 text-right">{clicks}</td></tr>)}</tbody>
            </table>
          )}
        </>
      ) : null}
    </section>
  );
}