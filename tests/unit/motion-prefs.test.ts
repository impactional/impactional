import { afterEach, describe, expect, it } from "vitest";

import {
  MOTION_STORAGE_KEY,
  applyMotionAttribute,
  isMotionEnabled,
  readMotionMode,
} from "@/lib/motion-prefs";

function setup({ search = "", stored = null as string | null, osReduce = false }) {
  window.history.replaceState({}, "", `/${search}`);
  window.localStorage.clear();
  if (stored) window.localStorage.setItem(MOTION_STORAGE_KEY, stored);
  // jsdom ships no matchMedia, so stub it outright rather than spying on it.
  window.matchMedia = ((query: string) =>
    ({ matches: query.includes("reduce") && osReduce })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.motion;
});

describe("motion preference", () => {
  it("keeps motion on when the OS reports reduce (iOS Low Power Mode)", () => {
    setup({ osReduce: true });
    expect(readMotionMode()).toBe("on");
    expect(isMotionEnabled()).toBe(true);
  });

  it("still honours the ?motion=off escape hatch", () => {
    setup({ search: "?motion=off" });
    expect(isMotionEnabled()).toBe(false);
  });

  it("follows the OS only when the reader asks for ?motion=system", () => {
    setup({ search: "?motion=system", osReduce: true });
    expect(isMotionEnabled()).toBe(false);

    setup({ search: "?motion=system", osReduce: false });
    expect(isMotionEnabled()).toBe(true);
  });

  it("remembers a stored opt-out, and lets the query string override it", () => {
    setup({ stored: "off" });
    expect(isMotionEnabled()).toBe(false);

    setup({ search: "?motion=on", stored: "off" });
    expect(isMotionEnabled()).toBe(true);
  });

  it("stamps the resolved decision on <html> for CSS to gate on", () => {
    setup({ osReduce: true });
    expect(applyMotionAttribute()).toBe(true);
    expect(document.documentElement.dataset.motion).toBe("on");

    setup({ search: "?motion=off" });
    expect(applyMotionAttribute()).toBe(false);
    expect(document.documentElement.dataset.motion).toBe("off");
  });
});
