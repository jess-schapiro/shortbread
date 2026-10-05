import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

// Recipes that no longer exist; saved configs still referencing them get reset to defaults.
const RETIRED_RECIPE_NAMES = ["Pecan Shortbread Cookies", "Supersized Super Soft Chocolate Chip Cookies"];

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipes: [
    {
      name: "Chocolate Chip Shortbread",
      description: "Buttery, crisp, with chocolate chunks.",
      emoji: "🍪",
      sourceUrl: "",
      sourceName: "",
      ingredients:
        "Wheat flour, salted butter, semi-sweet chocolate, sugar, light brown sugar, egg, turbinado sugar, vanilla extract.",
      allergens:
        "Contains: Wheat, Milk, Egg, Soy. May contain nuts. Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
    {
      name: "Maple Walnut Biscotti",
      description: "Twice-baked and crunchy. Made for dunking.",
      emoji: "☕",
      sourceUrl: "",
      sourceName: "",
      ingredients:
        "Wheat flour, walnuts, eggs, brown sugar, sugar, maple syrup, butter, baking powder, salt, maple extract.",
      allergens:
        "Contains: Wheat, Milk, Egg, Tree nuts (walnuts). Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
    {
      name: "Pumpkin Spice Puppy Chow",
      description: "Sweet, snackable, and very hard to stop at one handful.",
      emoji: "🎃",
      sourceUrl: "",
      sourceName: "",
      ingredients:
        "Chex cereal, white chocolate chips, powdered sugar, cinnamon, nutmeg, cloves, allspice.",
      allergens:
        "Contains: Milk, Soy. May contain wheat, nuts. Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
  ],
  passcode: "MNPLS2026",
  personalMessage:
    "Hey! 👋 Thanks for stopping by the fall bake sale.\n\nEverything is **$5 a bag**: chocolate chip shortbread, maple walnut biscotti, and pumpkin spice puppy chow, all baked in my home kitchen.\n\nEvery dollar goes to **Big Brothers Big Sisters of Metropolitan Chicago**, helping get more Littles off the waitlist and into meaningful mentorships. 💛",
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
      subtitle: "Quickest way to pay. Scan or tap and you're done.",
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
