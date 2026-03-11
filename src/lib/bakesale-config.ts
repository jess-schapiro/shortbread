import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipe: {
    name: "Chocolate Chip Cookies",
    description: "baked with love ❤️",
    emoji: "🍪",
  },
  passcode: "bakesale2026",
  personalMessage:
    "Hey! 👋 Thanks for grabbing a treat.\n\nIf you're feeling generous, I'm raising money for **Your Favorite Charity**. Every dollar helps make a difference.\n\nNo pressure at all; the cookies are free! But if you'd like to give, it would mean the world.",
  bakerName: "Your Name",
  beneficiary: {
    name: "Your Favorite Charity",
    aboutUrl: "https://example.org/about",
    description:
      "A brief description of the organization you're raising money for.",
  },
  donationOptions: [
    {
      id: "1",
      type: "other",
      label: "Donate Online",
      url: "https://example.org/donate",
      subtitle: "Official donation page",
    },
    {
      id: "2",
      type: "venmo",
      label: "Venmo @yourname",
      url: "https://venmo.com/u/yourname",
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
