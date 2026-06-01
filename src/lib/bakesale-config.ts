import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipe: {
    name: "Salted Chocolate Chunk Shortbread Cookies",
    description: "NYT Cooking — baked with love ❤️ and lots of butter",
    emoji: "🍪",
  },
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
    if (stored) return JSON.parse(stored) as BakesaleConfig;
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
