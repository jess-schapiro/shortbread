import { describe, expect, it } from "vitest";
import { SPONSOR_LINE, THRIVENT_LOGO_SRC } from "@/lib/event-details";

describe("sponsor line", () => {
  it("reads exactly without the registered mark", () => {
    expect(SPONSOR_LINE).toBe("This event was sponsored by Thrivent through a Thrivent Action Team.");
    expect(SPONSOR_LINE).not.toContain("®");
  });

  it("leaves the official logo slot empty until a file is supplied", () => {
    expect(THRIVENT_LOGO_SRC).toBeUndefined();
  });
});
