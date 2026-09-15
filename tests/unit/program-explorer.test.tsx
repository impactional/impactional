import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Programs } from "@/components/home/programs";
import { programs } from "@/content/programs";

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }));
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("landing program explorer", () => {
  it("offers all four pathways and shows the selected program's real details and link", () => {
    render(<Programs />);
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    for (const program of programs) {
      const tab = screen.getByRole("tab", { name: program.shortTitle });
      fireEvent.click(tab);
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      const panel = within(screen.getByRole("tabpanel"));
      expect(panel.getByRole("heading", { name: program.title })).toBeVisible();
      expect(panel.getByRole("link")).toHaveAttribute("href", `/programs/${program.slug}`);
      for (const outcome of program.outcomes) expect(panel.getByText(outcome)).toBeVisible();
    }
  });

  it("supports arrow-key selection and keeps the upcoming program separate", async () => {
    render(<Programs />);
    const catalyst = screen.getByRole("tab", { name: "Catalyst" });
    act(() => catalyst.focus());
    fireEvent.keyDown(catalyst, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getByRole("tab", { name: "Ambassador" })).toHaveAttribute("aria-selected", "true"));
    expect(screen.getByRole("link", { name: /Global Youth Circle/ })).toHaveAttribute("href", "/programs/global-youth-circle");
  });
});
