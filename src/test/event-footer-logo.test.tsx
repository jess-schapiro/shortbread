import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Lets a single test file flip the logo slot on and off without re-mocking the module.
const mocks = vi.hoisted(() => ({ logoSrc: undefined as string | undefined }));

vi.mock("@/lib/event-details", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/event-details")>();
  return {
    ...actual,
    get THRIVENT_LOGO_SRC() {
      return mocks.logoSrc;
    },
  };
});

import { EventFooter } from "@/components/EventFooter";
import { SPONSOR_LINE } from "@/lib/event-details";

describe("EventFooter Thrivent logo slot", () => {
  it("shows no placeholder text or box while the logo slot is empty", () => {
    mocks.logoSrc = undefined;
    const { container } = render(<EventFooter bakerName="Jess" />);

    expect(screen.queryByText(/placeholder/i)).toBeNull();
    expect(screen.queryByText(/official thrivent logo/i)).toBeNull();
    expect(container.querySelector("img")).toBeNull();
    // The sponsor sentence itself still shows.
    expect(screen.getByText(SPONSOR_LINE)).toBeInTheDocument();
  });

  it("renders the logo once the slot points at a real image", () => {
    mocks.logoSrc = "/thrivent-logo.png";
    render(<EventFooter bakerName="Jess" />);

    const logo = screen.getByRole("img", { name: "Thrivent" });
    expect(logo).toHaveAttribute("src", "/thrivent-logo.png");
    expect(screen.queryByText(/placeholder/i)).toBeNull();
  });
});
