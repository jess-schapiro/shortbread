import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { openVolunteerForm } from "@/lib/volunteer-tracking";

describe("anonymous volunteer referral", () => {
  it("opens the referral form immediately and logs exactly once with no arguments", () => {
    const log = vi.fn(() => new Promise<void>(() => {}));
    const open = vi.fn();
    openVolunteerForm(log, open);
    expect(log).toHaveBeenCalledExactlyOnceWith();
    expect(open).toHaveBeenCalledExactlyOnceWith("https://bbbs.tfaforms.net/f/Volunteer_Inquiry_Form?ref=jess-bakesale");
  });
  it("still opens when logging rejects", async () => {
    const open = vi.fn();
    openVolunteerForm(() => Promise.reject(new Error("offline")), open);
    await Promise.resolve();
    expect(open).toHaveBeenCalledExactlyOnceWith("https://bbbs.tfaforms.net/f/Volunteer_Inquiry_Form?ref=jess-bakesale");
  });
  it("still opens when logging throws synchronously", () => {
    const open = vi.fn();
    openVolunteerForm(() => { throw new Error("offline"); }, open);
    expect(open).toHaveBeenCalledExactlyOnceWith("https://bbbs.tfaforms.net/f/Volunteer_Inquiry_Form?ref=jess-bakesale");
  });
});