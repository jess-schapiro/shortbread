import type { BakesaleConfig } from "@/types/bakesale";
import { KITCHEN_DISCLAIMER } from "@/lib/event-details";

const STORAGE_KEY = "bakesale-config";

// Recipes that no longer exist; saved configs still referencing them get reset to defaults.
const RETIRED_RECIPE_NAMES = ["Pecan Shortbread Cookies", "Supersized Super Soft Chocolate Chip Cookies", "Chocolate Chip Shortbread", "Maple Walnut Biscotti", "Pumpkin Spice Puppy Chow"];

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipes: [
    {
      name: "Lemon Ricotta Cookies",
      description: "Soft, cakey and lemony, with a slime green glaze and sprinkles.",
      emoji: "🍋",
      sourceUrl: "",
      sourceName: "",
      ingredients:
        "Wheat flour, ricotta cheese, butter, sugar, eggs, lemon zest and juice, baking powder, vanilla, powdered sugar, food coloring, sprinkles.",
      allergens:
        `Contains: Wheat, Milk, Egg. ${KITCHEN_DISCLAIMER}`,
    },
    {
      name: "Millionaire's Shortbread",
      description: "Buttery shortbread, gooey caramel, dark chocolate ganache and Halloween sprinkles.",
      emoji: "🍫",
      sourceUrl: "",
      sourceName: "",
      ingredients:
        "Wheat flour, butter, sugar, brown sugar, sweetened condensed milk, heavy cream, dark chocolate, vanilla, salt, sprinkles.",
      allergens:
        `Contains: Wheat, Milk, Egg, Soy. ${KITCHEN_DISCLAIMER}`,
    },
    {
      name: "Cookie Butter Puppy Chow Mix",
      description: "Cookie butter puppy chow tossed with M&M's and pumpkin spice yogurt pretzels.",
      emoji: "🎃",
      sourceUrl: "",
      sourceName: "",
      ingredients:
        "Chex cereal, cookie butter, white chocolate or chocolate chips, powdered sugar, M&M's, pumpkin spice yogurt covered pretzels.",
      note: "Candy and pretzel labels being double-checked for nut warnings.",
      allergens:
        `Contains: Wheat, Milk, Soy. ${KITCHEN_DISCLAIMER}`,
    },
  ],
  passcode: "BOO2026",
  personalMessage:
    "Hey! 👻 Welcome to my Halloween party treat table on Saturday, October 31!\n\n**Take what you like. Nothing is required.** Enjoy some homemade treats, and give if you wish. The suggested donation is **$5**, but any amount (or none at all) is welcome.\n\nEvery dollar goes to **Big Brothers Big Sisters of Metropolitan Chicago**, helping get more Littles off the waitlist and into meaningful mentorships. Thanks for sharing a little Halloween kindness! 🎃",
  bakerName: "Jess",
  beneficiary: {
    name: "Big Brothers Big Sisters of Metropolitan Chicago",
    aboutUrl: "https://bbbschgo.org/about/",
    description:
      "helps children realize their potential and build their futures by nurturing kids, strengthening communities, and matching Littles with mentors who believe in them.",
  },
  donationOptions: [
    {
      id: "2",
      type: "venmo",
      label: "Venmo @Jess-Schapiro",
      url: "https://venmo.com/u/Jess-Schapiro",
      subtitle: "Quickest way to give. Scan or tap and you're done.",
    },
    {
      id: "1",
      type: "classy",
      label: "Donate to BBBSChi",
      url: "https://donate.bbbschgo.org/fundraiser/7486540",
      subtitle: "Donate directly to BBBSChi and get a tax receipt.",
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
      const hasOldSingleCookieTitle = parsed.recipes?.some(
        (recipe) => recipe.name === "Salted Chocolate Chunk Shortbread Cookies"
      );
      const hasRetiredRecipe = parsed.recipes?.some((recipe) =>
        RETIRED_RECIPE_NAMES.includes(recipe.name)
      );
      // Old saved configs carried source-credit descriptions like "NYT Cooking — ...";
      // reset just the recipe list so those credits disappear while other settings stay.
      const hasSourceDescription = parsed.recipes?.some((recipe) =>
        /NYT Cooking|King Arthur|Sally's|Alison Roman/.test(recipe.description ?? "")
      );
      if (
        !parsed.recipes ||
        parsed.recipes.length === 0 ||
        hasOldSingleCookieTitle ||
        hasRetiredRecipe ||
        hasSourceDescription
      ) {
        parsed.recipes = DEFAULT_CONFIG.recipes;
      }
      // Refresh outdated donation subtitles in saved configs, keeping labels, URLs, and everything else.
      const OLD_SUBTITLES: Record<string, string> = {
        "$5 a bag, or give more if you like": "Quickest way to pay. Scan or tap and you're done.",
        "Want to give more? Tax-deductible, goes straight to BBBS":
          "Donate directly to BBBSChi and get a tax receipt.",
      };
      if (parsed.donationOptions) {
        parsed.donationOptions = parsed.donationOptions.map((opt) => ({
          ...opt,
          subtitle: OLD_SUBTITLES[opt.subtitle ?? ""] ?? opt.subtitle,
        }));
      }
      if (/\$5\s+a\s+bag|fall bake sale/i.test(parsed.personalMessage ?? "")) {
        parsed.personalMessage = DEFAULT_CONFIG.personalMessage;
      }
      parsed.donationOptions = parsed.donationOptions?.map((opt) => ({
        ...opt,
        subtitle: opt.subtitle === "Quickest way to pay. Scan or tap and you're done."
          ? "Quickest way to give. Scan or tap and you're done."
          : opt.subtitle,
      }));
      // Retire only the previous event code, preserving custom wizard passcodes.
      if (parsed.passcode?.toLowerCase() === "mnpls2026") {
        parsed.passcode = DEFAULT_CONFIG.passcode;
        try {
          saveConfig(parsed);
        } catch {
          // Use the migrated code even if browser storage is unavailable.
        }
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
