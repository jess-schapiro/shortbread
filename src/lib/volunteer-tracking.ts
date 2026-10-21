import { supabase } from "@/integrations/supabase/client";
import { VOLUNTEER_URL } from "@/lib/event-details";

export type ClickStats = { total: number; days: { day: string; clicks: number }[] };

export async function logVolunteerClick(): Promise<void> {
  const { error } = await supabase.functions.invoke("log-volunteer-click", { body: {} });
  if (error) throw error;
}

export function openVolunteerForm(
  log: () => Promise<void> = logVolunteerClick,
  open: (url: string) => void = (url) => { window.open(url, "_blank", "noopener,noreferrer"); },
): void {
  // Start logging, but open synchronously during the gesture to avoid popup blocking.
  try { void log().catch(() => undefined); } catch { /* The form still opens. */ }
  open(VOLUNTEER_URL);
}

export async function getVolunteerStats(): Promise<ClickStats> {
  const { data, error } = await supabase.rpc("volunteer_click_stats");
  if (error) throw error;
  const stats = data as unknown as ClickStats;
  return stats;
}