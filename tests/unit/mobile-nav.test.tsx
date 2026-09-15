import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MobileNav } from "@/components/home/mobile-nav";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("@/components/brand/logo", () => ({ Logo: () => <span>Impactional</span> }));

let desktopChange: ((event: MediaQueryListEvent) => void) | undefined;
beforeEach(() => {
  route.pathname = "/";
  desktopChange = undefined;
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false, media: query,
    addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => { if (query === "(min-width: 901px)") desktopChange = listener; },
    removeEventListener: vi.fn(),
  }));
});
afterEach(cleanup);

describe("mobile navigation", () => {
  it("shows the current section and closes when the route changes", async () => {
    route.pathname = "/people/dika-aprilio-wibowo";
    const view = render(<MobileNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = await screen.findByRole("dialog");
    const nav = within(dialog).getByRole("navigation", { name: "Mobile navigation" });
    expect(within(nav).getAllByRole("link")).toHaveLength(6);
    expect(within(nav).getByRole("link", { name: /People/ })).toHaveAttribute("aria-current", "location");
    expect(within(dialog).getByRole("link", { name: /Global Youth Circle/ })).toHaveAttribute("href", "/programs/global-youth-circle");

    route.pathname = "/programs";
    view.rerender(<MobileNav />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses the mobile overlay when the desktop navigation becomes available", async () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    await screen.findByRole("dialog");
    act(() => desktopChange?.({ matches: true } as MediaQueryListEvent));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
