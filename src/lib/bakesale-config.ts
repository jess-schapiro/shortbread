import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipe: {
    name: "Your Favorite Recipe",
    description: "baked with love ❤️",
    emoji: "🍪",
  },
  passcode: "bakesale2026",
  personalMessage:
    "Hey! 👋 Thanks for grabbing a treat.\n\nIf you're feeling generous, I'm raising money for **Your Favorite Charity**. Every dollar helps make a difference.\n\nNo pressure at all — the treats are free! But if you'd like to give, it would mean the world.",
  bakerName: "Your Name",
  beneficiary: {
    name: "Your Favorite Charity",
    aboutUrl: "https://example.com/about",
    description:
      "A brief description of the organization and its mission.",
  },
  donationOptions: [
    {
      id: "1",
      type: "venmo",
      label: "Venmo @yourhandle",
      url: "https://venmo.com/u/yourhandle",
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
