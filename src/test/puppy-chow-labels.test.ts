import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "@/lib/bakesale-config";
import { KITCHEN_DISCLAIMER } from "@/lib/event-details";

const puppyChow = DEFAULT_CONFIG.recipes.find((r) => r.name === "Cookie Butter Puppy Chow Mix")!;

describe("Cookie Butter Puppy Chow Mix label info", () => {
  it("states the peanut warning from the M&M's label", () => {
    expect(puppyChow.allergens).toBe(
      `Contains: Wheat, Milk, Soy. The M&M's may contain peanuts. ${KITCHEN_DISCLAIMER}`,
    );
  });

  it("no longer carries the double-checking note", () => {
    expect(puppyChow.note).toBeUndefined();
  });

  it("names the candies as M&M's milk chocolate candies", () => {
    expect(puppyChow.ingredients).toContain("M&M's milk chocolate candies");
    expect(puppyChow.ingredients).not.toMatch(/M&M's,/);
  });
});
