import { describe, expect, it } from "vitest";

import { impactMetrics, navigation, programs, stories } from "@/content/home";

describe("homepage content contracts", () => {
  it("keeps navigation destinations unique and local", () => {
    expect(new Set(navigation.map((item) => item.href)).size).toBe(navigation.length);
    expect(navigation.every((item) => item.href.startsWith("#"))).toBe(true);
  });

  it("ships the four program pathways", () => {
    expect(programs).toHaveLength(4);
    expect(programs.map((program) => program.number)).toEqual(["01", "02", "03", "04"]);
  });

  it("preserves dated impact values in structured content", () => {
    expect(impactMetrics.map((metric) => metric.display)).toEqual(["2,000+", "8.5k+", "6", "600k+"]);
  });

  it("uses safe absolute URLs for published stories", () => {
    expect(stories).toHaveLength(3);
    expect(stories.every((story) => new URL(story.href).protocol === "https:")).toBe(true);
  });
});
