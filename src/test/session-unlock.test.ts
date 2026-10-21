import { describe, it, expect, beforeEach, vi } from "vitest";
import { isSessionUnlocked, rememberSessionUnlock } from "@/lib/session-unlock";
import { isCodeUnlock } from "@/lib/code-unlock";

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

describe("QR code unlock (?code= in the URL)", () => {
  it("matches the passcode case-insensitively", () => {
    expect(isCodeUnlock("BOO2026", "BOO2026")).toBe(true);
    expect(isCodeUnlock("boo2026", "BOO2026")).toBe(true);
  });

  it("rejects a wrong code", () => {
    expect(isCodeUnlock("nope", "BOO2026")).toBe(false);
  });

  it("is false without a code, so plain revisits never auto-open the modal", () => {
    expect(isCodeUnlock(null, "BOO2026")).toBe(false);
    expect(isCodeUnlock("", "BOO2026")).toBe(false);
  });
});
