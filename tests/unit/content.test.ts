import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { ambassadorTerms, publishedAmbassadors } from "@/content/ambassadors";
import { impactMetrics } from "@/content/impact";
import { publishedChangemakers, publishedStories as stories, videos } from "@/content/media";
import { publishedPeople } from "@/content/people";
import { programs } from "@/content/programs";
import { siteNavigation } from "@/content/site";

describe("homepage content contracts", () => {
  it("keeps navigation destinations unique and local", () => {
    expect(new Set(siteNavigation.map((item) => item.href)).size).toBe(siteNavigation.length);
    expect(siteNavigation.every((item) => item.href.startsWith("/"))).toBe(true);
  });

  it("ships the four program pathways", () => {
    expect(programs).toHaveLength(4);
    expect(programs.map((program) => program.number)).toEqual(["01", "02", "03", "04"]);
    expect(new Set(programs.map((program) => program.slug)).size).toBe(4);
    expect(programs.every((program) => `/programs/${program.slug}`.startsWith("/programs/"))).toBe(true);
    expect(programs[3].title).toBe("Peace, Education, & Global Innovation (PEGI)");
  });

  it("preserves dated impact values in structured content", () => {
    expect(impactMetrics.map((metric) => metric.display)).toEqual(["53K+", "≈$3,300", "32K+", "10+", "2,000+", "3M+"]);
    expect(impactMetrics.every((metric) => metric.period === "2025–26" && metric.sourceLabel)).toBe(true);
  });

  it("uses safe absolute URLs for published stories", () => {
    expect(stories).toHaveLength(3);
    expect(stories.every((story) => new URL(story.href).protocol === "https:")).toBe(true);
  });

  it("ships the approved company-profile video", () => {
    expect(videos[0]).toMatchObject({ id: "G8zMgVGodXM", placeholder: false });
    expect(new URL(videos[0].sourceUrl).protocol).toBe("https:");
  });

  it("publishes the supplied member roster with local portraits and keeps ambassador drafts hidden", () => {
    expect(publishedPeople).toHaveLength(31);
    expect(new Set(publishedPeople.map((person) => person.slug)).size).toBe(publishedPeople.length);
    expect(publishedPeople.every((person) => person.consentConfirmed && person.sourceLabel && person.isPublished)).toBe(true);
    const portraits = publishedPeople.filter((person) => person.portrait);
    expect(portraits).toHaveLength(28);
    expect(portraits.every((person) => person.imageAlt && person.portraitSource && existsSync(resolve(process.cwd(), "public", person.portrait!.slice(1))))).toBe(true);
    expect(publishedAmbassadors).toEqual([]);
    expect(ambassadorTerms).toEqual(["2025", "2024"]);
  });

  it("sorts published changemakers chronologically", () => {
    expect(publishedChangemakers.map((entry) => entry.publishedAt)).toEqual(
      [...publishedChangemakers].map((entry) => entry.publishedAt).sort(),
    );
  });
});
