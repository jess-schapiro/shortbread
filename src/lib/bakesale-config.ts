import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipes: [
    {
      name: "Salted Chocolate Chunk Shortbread Cookies",
      description: "Sally's Baking Addiction — buttery pecan shortbread",
      emoji: "🍪",
    },
    {
      name: "Supersized Super Soft Chocolate Chip Cookies",
      description: "King Arthur Baking — classic chocolate chip, extra soft",
      emoji: "🍪",
    },
  ],
  passcode: "MNPLS2026",
  personalMessage:
    "Hey! 👋 Thanks for grabbing a cookie.\n\nI'm working to get more Littles off the waitlist and into meaningful mentorships with **Big Brothers Big Sisters of Metropolitan Chicago**. Every dollar helps.\n\nNo pressure at all — the cookies are free! But if you'd like to give, it would mean the world. 💛",
  bakerName: "Jess",
  beneficiary: {
    name: "Big Brothers Big Sisters of Metropolitan Chicago",
    aboutUrl: "https://bbbschgo.org/?campaign=467476",
    description:
      "helps children realize their potential and build their futures by nurturing kids, strengthening communities, and matching Littles with mentors who believe in them.",
  },
  donationOptions: [
    {
      id: "2",
      type: "venmo",
      label: "Venmo @Jess-Schapiro",
      url: "https://venmo.com/u/Jess-Schapiro",
      subtitle: "Quick and easy — I'll forward it on",
    },
    {
      id: "1",
      type: "classy",
      label: "Donate to BBBSChi",
      url: "https://bbbschgo.org/?campaign=467476",
      subtitle: "Tax-deductible, goes straight to BBBS",
    },
  ],
};

export function getConfig(): BakesaleConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as BakesaleConfig & { recipe?: { name: string; description: string; emoji: string } };
      // Migrate old single-recipe config
      if (parsed.recipe && !parsed.recipes) {
        parsed.recipes = [parsed.recipe];
        delete (parsed as unknown as Record<string, unknown>).recipe;
      }
      return parsed as BakesaleConfig;
    }
  } catch {
    // fall through
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: BakesaleConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function generateShareLink(baseUrl: string, passcode: string): string {
  return `${baseUrl}?code=${encodeURIComponent(passcode)}`;
}
