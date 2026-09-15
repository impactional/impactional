import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GycAnnouncement } from "@/components/announcements/gyc-announcement";
import { GYC_AUTO_OPEN_DELAY, GYC_SESSION_KEY, globalYouthCircle } from "@/content/global-youth-circle";

const navigation = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

beforeEach(() => {
  vi.useFakeTimers();
  navigation.pathname = "/";
  window.sessionStorage.clear();
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  window.sessionStorage.clear();
});

async function finishDelay() {
  await act(async () => { await vi.advanceTimersByTimeAsync(GYC_AUTO_OPEN_DELAY + 100); });
}

describe("Global Youth Circle announcement", () => {
  it("opens once per session, can be dismissed, and can be reopened manually", async () => {
    const first = render(<GycAnnouncement />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await finishDelay();
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(window.sessionStorage.getItem(GYC_SESSION_KEY)).toBe("1");
    expect(screen.getByRole("link", { name: "Explore Global Youth Circle" })).toHaveAttribute("href", globalYouthCircle.href);
    fireEvent.click(screen.getByRole("button", { name: "I’ll explore later" }));
    await finishDelay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    first.unmount();

    render(<GycAnnouncement />);
    await finishDelay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Explore upcoming Global Youth Circle" }));
    await finishDelay();
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("keeps the program information readable without automatically opening over it", async () => {
    navigation.pathname = globalYouthCircle.href;
    render(<GycAnnouncement />);
    await finishDelay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(GYC_SESSION_KEY)).toBeNull();
    expect(screen.getByRole("button", { name: "Explore upcoming Global Youth Circle" })).toBeVisible();
  });

  it("does not interrupt a member search, but can announce on the next route", async () => {
    const view = render(<><input aria-label="Search members" /><GycAnnouncement /></>);
    screen.getByRole("textbox").focus();
    await finishDelay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(GYC_SESSION_KEY)).toBeNull();

    navigation.pathname = "/programs";
    view.rerender(<GycAnnouncement />);
    await finishDelay();
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("does not interrupt a video the visitor started", async () => {
    render(<><iframe title="Playing video" data-user-video-active="true" /><GycAnnouncement /></>);
    await finishDelay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem(GYC_SESSION_KEY)).toBeNull();
  });

  it("still announces on a page with a decorative background video", async () => {
    render(<><iframe title="Background film" src="https://www.youtube-nocookie.com/embed/example" /><GycAnnouncement /></>);
    await finishDelay();
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("offers only coming-soon information until dates and registration are supplied", () => {
    expect(globalYouthCircle.status).toBe("Coming soon");
    expect(globalYouthCircle.registrationUrl).toBeNull();
    expect(globalYouthCircle.sessions).toHaveLength(3);
    expect(globalYouthCircle.contactUrl).toMatch(/^mailto:/);
  });
});
