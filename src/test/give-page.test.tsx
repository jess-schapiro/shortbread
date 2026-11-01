import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Give from "@/pages/Give";
import { EventFooter } from "@/components/EventFooter";
import { DEFAULT_CONFIG } from "@/lib/bakesale-config";
import { openVolunteerForm } from "@/lib/volunteer-tracking";

vi.mock("@/lib/volunteer-tracking", () => ({
  openVolunteerForm: vi.fn(),
}));

function renderGive() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/give"]}>
        <Give />
      </MemoryRouter>
    </HelmetProvider>
  );
}

beforeEach(() => localStorage.clear());

describe("/give page", () => {
  it("shows the thank-you copy and both donation options without a passcode or modal", () => {
    renderGive();
    expect(screen.getByText("Thanks for munching!")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Enjoyed the/ })).toBeInTheDocument();
    expect(screen.getByText(/Give if you wish\. Suggested gift \$5/)).toBeInTheDocument();

    const venmo = screen.getByRole("link", { name: /Venmo @Jess-Schapiro/ });
    expect(venmo).toHaveAttribute("href", "https://venmo.com/u/Jess-Schapiro");
    expect(venmo).toHaveAttribute("target", "_blank");
    expect(screen.getByText("Fastest")).toBeInTheDocument();

    const classy = screen.getByRole("link", { name: /Donate to BBBSChi/ });
    expect(classy).toHaveAttribute("href", "https://donate.bbbschgo.org/fundraiser/7486540");
    expect(classy).toHaveAttribute("target", "_blank");
    expect(screen.getByText("Tax-deductible")).toBeInTheDocument();
  });

  it("links to the ingredients page, shows the cause blurb and footer, and tracks Become a Big clicks", () => {
    renderGive();
    expect(screen.queryByRole("link", { name: /See ingredients & allergen info/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/Venmo is fastest/)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About the Cause" })).toBeInTheDocument();
    expect(screen.getByText(/Made with 🧈 and ❤️ by/)).toBeInTheDocument();
    expect(screen.queryByText(/Nuts are used in this kitchen/)).not.toBeInTheDocument();
    expect(screen.queryByText("This event was sponsored by Thrivent through a Thrivent Action Team.")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/passcode/i)).not.toBeInTheDocument();

    expect(screen.getByText("Want to do more? Littles are waiting for a Big.")).toBeInTheDocument();
    const bigButton = screen.getByRole("button", { name: /Interested in becoming a Big\?/ });
    fireEvent.click(bigButton);
    expect(openVolunteerForm).toHaveBeenCalledTimes(1);
  });

  it("keeps the nut disclaimer and Thrivent line in the default footer used by the main page", () => {
    render(<EventFooter bakerName={DEFAULT_CONFIG.bakerName} />);
    expect(screen.getByText(/Nuts are used in this kitchen/)).toBeInTheDocument();
    expect(screen.getByText("This event was sponsored by Thrivent through a Thrivent Action Team.")).toBeInTheDocument();
  });

  it("renders donation options from a saved config", () => {
    localStorage.setItem(
      "bakesale-config",
      JSON.stringify({
        ...DEFAULT_CONFIG,
        donationOptions: [
          { id: "9", type: "other", label: "Custom Gift Link", url: "https://example.com/gift", subtitle: "Custom subtitle" },
        ],
      })
    );
    renderGive();
    const custom = screen.getByRole("link", { name: /Custom Gift Link/ });
    expect(custom).toHaveAttribute("href", "https://example.com/gift");
  });
});
