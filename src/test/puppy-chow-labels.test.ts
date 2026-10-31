import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "@/lib/bakesale-config";
import { KITCHEN_DISCLAIMER } from "@/lib/event-details";

const puppyChow = DEFAULT_CONFIG.recipes.find((r) => r.name === "Cookie Butter Puppy Chow Mix")!;

describe("Cookie Butter Puppy Chow Mix label info", () => {
  it("states the contains and may-contain warnings from the cookie butter and M&M's labels", () => {
    expect(puppyChow.allergens).toBe(
      "Contains: Wheat, Milk, Soy. May contain: Peanuts, tree nuts (cashews, pistachios, walnuts, almonds, hazelnuts), sesame and egg. The cookie butter and the M&M's carry these warnings. " +
        KITCHEN_DISCLAIMER,
    );
  });

  it("lists the cookie butter's speculoos ingredients", () => {
    expect(puppyChow.ingredients).toContain("cookie butter (speculoos cookies, canola oil, sugar, sunflower lecithin)");
  });

  it("no longer carries the single candy-only peanut note", () => {
    expect(puppyChow.allergens).not.toContain("The M&M's may contain peanuts");
  });

  it("no longer carries the double-checking note", () => {
    expect(puppyChow.note).toBeUndefined();
  });

  it("names the candies as M&M's milk chocolate candies", () => {
    expect(puppyChow.ingredients).toContain("M&M's milk chocolate candies");
    expect(puppyChow.ingredients).not.toMatch(/M&M's,/);
  });
});
