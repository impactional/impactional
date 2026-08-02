import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8").toLowerCase();

describe("brand token anchors", () => {
  it.each([
    ["ink", "#141414"],
    ["magenta", "#e01483"],
    ["amber", "#e6aa33"],
    ["ocean", "#007dbb"],
    ["mint", "#1ccea4"],
  ])("keeps %s anchored to the guideline", (_name, hex) => {
    expect(css).toContain(hex);
  });

  it("defines reduced-motion behavior", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
