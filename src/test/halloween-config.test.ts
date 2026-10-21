import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, getConfig, saveConfig, generateShareLink } from "@/lib/bakesale-config";

beforeEach(() => localStorage.clear());

describe("Halloween menu migration", () => {
  for (const name of ["Chocolate Chip Shortbread", "Maple Walnut Biscotti", "Pumpkin Spice Puppy Chow"]) {
    it(`retires ${name} while preserving personalized settings`, () => {
      const saved = { ...DEFAULT_CONFIG, recipes: [{ name, description: "old", emoji: "🍪" }], passcode: "custom", bakerName: "Custom baker", personalMessage: "My own message", donationOptions: [{ ...DEFAULT_CONFIG.donationOptions[0], label: "Custom label", url: "https://example.com/donate" }] };
      saveConfig(saved);
      const result = getConfig();
      expect(result.recipes.map(r => r.name)).toEqual(["Lemon Ricotta Cookies", "Millionaire's Shortbread", "Cookie Butter Puppy Chow Mix"]);
      expect(result.passcode).toBe("custom");
      expect(result.personalMessage).toBe("My own message");
      expect(result.bakerName).toBe("Custom baker");
      expect(result.donationOptions).toEqual(saved.donationOptions);
      expect(result.beneficiary).toEqual(saved.beneficiary);
    });
  }
  it("keeps a valid customized single-recipe menu", () => {
    const saved = { ...DEFAULT_CONFIG, recipes: [{ name: "Custom cookie", description: "Fresh", emoji: "🍪" }] };
    saveConfig(saved);
    expect(getConfig().recipes).toEqual(saved.recipes);
  });
  it("refreshes recognized sale messages without changing links or passcode", () => {
    saveConfig({ ...DEFAULT_CONFIG, personalMessage: "Everything is **$5 a bag**", donationOptions: [{ ...DEFAULT_CONFIG.donationOptions[0], subtitle: "$5 a bag, or give more if you like" }] });
    const result = getConfig();
    expect(result.personalMessage).toBe(DEFAULT_CONFIG.personalMessage);
    expect(result.donationOptions[0].subtitle).toBe(DEFAULT_CONFIG.donationOptions[0].subtitle);
    expect(result.donationOptions[0].url).toBe("https://venmo.com/u/Jess-Schapiro");
    expect(result.passcode).toBe("BOO2026");
  });
  it("preserves campaign destination and QR passcode", () => {
    expect(DEFAULT_CONFIG.donationOptions.find(o => o.type === "classy")?.url).toBe("https://donate.bbbschgo.org/fundraiser/7486540");
    expect(generateShareLink("https://bakesale.heyjess.xyz/", DEFAULT_CONFIG.passcode)).toBe("https://bakesale.heyjess.xyz/?code=BOO2026");
  });
});

describe("Halloween passcode migration", () => {
  it("defaults to BOO2026 for new visitors", () => {
    expect(getConfig().passcode).toBe("BOO2026");
  });

  for (const passcode of ["MNPLS2026", "mnpls2026", "MnPlS2026"]) {
    it(`updates and persists the retired code ${passcode} without changing other settings`, () => {
      const saved = { ...DEFAULT_CONFIG, passcode, bakerName: "Custom baker", personalMessage: "My own message" };
      saveConfig(saved);
      expect(getConfig()).toEqual({ ...saved, passcode: "BOO2026" });
      expect(JSON.parse(localStorage.getItem("bakesale-config") ?? "{}")).toEqual({ ...saved, passcode: "BOO2026" });
    });
  }

  it("preserves custom passcodes and their share links", () => {
    saveConfig({ ...DEFAULT_CONFIG, passcode: "MyCustomCode" });
    expect(getConfig().passcode).toBe("MyCustomCode");
    expect(generateShareLink("https://bakesale.heyjess.xyz/", getConfig().passcode)).toBe("https://bakesale.heyjess.xyz/?code=MyCustomCode");
  });
});