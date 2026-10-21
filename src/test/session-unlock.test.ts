import { describe, it, expect, beforeEach, vi } from "vitest";
import { isSessionUnlocked, rememberSessionUnlock } from "@/lib/session-unlock";

describe("session unlock", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it("brand-new visitors are locked", () => {
    expect(isSessionUnlocked("BOO2026")).toBe(false);
  });

  it("stays unlocked for the session after unlocking, case-insensitive", () => {
    rememberSessionUnlock("boo2026");
    expect(isSessionUnlocked("BOO2026")).toBe(true);
  });

  it("does not count an unlock made with a different passcode", () => {
    rememberSessionUnlock("MNPLS2026");
    expect(isSessionUnlocked("BOO2026")).toBe(false);
  });

  it("does not throw when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(() => rememberSessionUnlock("BOO2026")).not.toThrow();
    expect(isSessionUnlocked("BOO2026")).toBe(false);
  });
});
