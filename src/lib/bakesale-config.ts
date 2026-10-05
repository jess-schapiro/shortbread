import type { BakesaleConfig } from "@/types/bakesale";

const STORAGE_KEY = "bakesale-config";

export const DEFAULT_CONFIG: BakesaleConfig = {
  recipes: [
    {
      name: "Pecan Shortbread Cookies",
      description: "Sally's Baking Addiction — buttery pecan shortbread",
      emoji: "🍪",
      sourceUrl: "https://sallysbakingaddiction.com/pecan-shortbread/",
      sourceName: "Sally's Baking Addiction",
      ingredients:
        "Wheat flour, butter, brown sugar, granulated sugar, vanilla extract, cinnamon, salt, coarse sugar, and cinnamon and cream cheese pecans (pecans, sugar, brown sugar, natural flavors, whey, cream cheese, honey, vegetable oil [peanut and/or soy], xanthan gum).",
      allergens:
        "Contains: Wheat, Milk, Pecans (tree nuts). May contain peanuts and soy. Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
    {
      name: "Supersized Super Soft Chocolate Chip Cookies",
      description: "King Arthur Baking — classic chocolate chip, extra soft",
      emoji: "🍪",
      sourceUrl:
        "https://www.kingarthurbaking.com/recipes/supersized-super-soft-chocolate-chip-cookies-recipe",
      sourceName: "King Arthur Baking",
      ingredients:
        "Wheat (bread) flour, butter, light brown sugar, whole milk, egg, vanilla extract, baking powder, baking soda, salt, and a blend of dark chocolate chips and chunks (dark chocolate, cane sugar, cocoa butter, dates, oats, sunflower lecithin, vanilla).",
      allergens:
        "Contains: Wheat, Milk, Egg, Oats. Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
    {
      name: "Chocolate Chip Shortbread",
      description: "NYT Cooking — salted chocolate chunk shortbread",
      emoji: "🍪",
      sourceUrl: "https://cooking.nytimes.com/recipes/1019152-salted-chocolate-chunk-shortbread-cookies",
      sourceName: "NYT Cooking",
      ingredients:
        "Wheat flour, salted butter, semi-sweet chocolate, sugar, light brown sugar, egg, turbinado sugar, vanilla extract.",
      allergens:
        "Contains: Wheat, Milk, Egg, Soy. May contain nuts. Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
    {
      name: "Maple Walnut Biscotti",
      description: "King Arthur Baking — crunchy maple walnut biscotti, extra maple flavor",
      emoji: "☕",
      sourceUrl: "https://www.kingarthurbaking.com/recipes/maple-walnut-biscotti-recipe",
      sourceName: "King Arthur Baking",
      ingredients:
        "Wheat flour, walnuts, eggs, brown sugar, sugar, maple syrup, butter, baking powder, salt, maple extract.",
      allergens:
        "Contains: Wheat, Milk, Egg, Tree nuts (walnuts). Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
    {
      name: "Pumpkin Spice Puppy Chow",
      description: "Sally's Baking Addiction — pumpkin spice snack mix",
      emoji: "🎃",
      sourceUrl: "https://sallysbakingaddiction.com/pumpkin-spice-puppy-chow/",
      sourceName: "Sally's Baking Addiction",
      ingredients:
        "Chex cereal, white chocolate chips, powdered sugar, cinnamon, nutmeg, cloves, allspice.",
      allergens:
        "Contains: Milk, Soy. May contain wheat, nuts. Lovingly baked in a home kitchen that also handles wheat, dairy, eggs, tree nuts, peanuts and soy, so cross-contact may occur. Please enjoy at your own discretion if you have food allergies.",
    },
  ],
  passcode: "MNPLS2026",
  personalMessage:
    "Hey! 👋 Thanks for grabbing a cookie.\n\nI'm working to get more Littles off the waitlist and into meaningful mentorships with **Big Brothers Big Sisters of Metropolitan Chicago**. Every dollar helps.\n\nNo pressure at all — the cookies are free! But if you'd like to give, it would mean the world. 💛",
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
      subtitle: "Quick and easy — I'll forward it on",
    },
    {
      id: "1",
      type: "classy",
      label: "Donate to BBBSChi",
      url: "https://donate.bbbschgo.org/fundraiser/7486540",
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
      const hasOldSingleCookieTitle = parsed.recipes?.some(
        (recipe) => recipe.name === "Salted Chocolate Chunk Shortbread Cookies"
      );
      if (!parsed.recipes || parsed.recipes.length < 2 || hasOldSingleCookieTitle) {
        parsed.recipes = DEFAULT_CONFIG.recipes;
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
