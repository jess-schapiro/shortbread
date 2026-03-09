import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipe: {
    name: "Salted Chocolate Chunk Shortbread Cookies",
    description: "baked with love ❤️ and butter",
    emoji: "🍪",
  },
  passcode: "appleton2026",
  personalMessage:
    "Hey! 👋 Thanks for grabbing a cookie. These are my take on the NYTCooking Salted Chocolate Chunk Shortbread Cookies. I hope you love them as much as I do.\n\nIf you're feeling generous, I'm raising money for **Big Brothers Big Sisters of Metropolitan Chicago**. Every dollar helps create and support one-to-one mentoring relationships for young people. There are hundreds of future littles waiting to be matched with bigs. Your donations help find and vet supportive, uplifting matches for these littles.\n\nNo pressure at all; the cookies are free! But if you'd like to give, it would mean the world.",
  bakerName: "Jess",
  beneficiary: {
    name: "Big Brothers Big Sisters of Metropolitan Chicago",
    aboutUrl: "https://bbbschgo.org/about/",
    description:
      "Creates and supports one-to-one mentoring relationships that ignite the power and promise of young people.",
  },
  donationOptions: [
    {
      id: "1",
      type: "classy",
      label: "BBBS Campaign Page",
      url: "https://donate.bbbschgo.org/fundraiser/6598504",
      subtitle: "Official receipt for tax-deductible donations",
    },
    {
      id: "2",
      type: "venmo",
      label: "Venmo Jess",
      url: "https://venmo.com/u/Jess-Schapiro",
      subtitle: "Super quick and easy",
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
