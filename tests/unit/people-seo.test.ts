import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { getPerson, publishedPeople } from "@/content/people";
import { siteUrl } from "@/content/site";
import { personMetadata, personStructuredData, serializeStructuredData } from "@/lib/people-seo";

describe("member profiles and search discovery", () => {
  it("gives every published member a unique canonical, title, and sitemap entry", () => {
    const metadata = publishedPeople.map(personMetadata);
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(metadata.map((entry) => entry.title)).size).toBe(publishedPeople.length);
    expect(new Set(urls).size).toBe(urls.length);

    for (const [index, person] of publishedPeople.entries()) {
      const url = `${siteUrl}/people/${person.slug}`;
      expect(getPerson(person.slug)).toBe(person);
      expect(metadata[index].alternates?.canonical).toBe(url);
      expect(metadata[index].description?.length).toBeLessThanOrEqual(160);
      expect(metadata[index].description).toContain(person.name);
      expect(urls).toContain(url);
    }
    expect(getPerson("not-a-published-member")).toBeUndefined();
  });

  it("retains only the public member fields and email contact", () => {
    const allowedFields = new Set([
      "slug", "name", "nickname", "preferredName", "email", "location", "hobbies", "favoriteMusic",
      "detailsSourceLabel", "updatedAt", "category", "division", "team", "role", "summary", "term",
      "portrait", "portraitSource", "portraitPosition", "imageAlt", "consentConfirmed", "sourceLabel", "isPublished",
    ]);
    for (const person of publishedPeople) {
      expect(Object.keys(person).filter((key) => !allowedFields.has(key))).toEqual([]);
      expect(person.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      const profile = personStructuredData(person)["@graph"][0];
      expect(profile).toMatchObject({
        "@type": "ProfilePage",
        mainEntity: { "@type": "Person", name: person.name, email: person.email, description: person.summary },
      });
      if (!("mainEntity" in profile)) throw new Error("ProfilePage is missing its Person");
      expect(profile.mainEntity).not.toHaveProperty("telephone");
      expect(profile.mainEntity).not.toHaveProperty("birthDate");
      if (!person.portrait) expect(profile.mainEntity).not.toHaveProperty("image");
    }
  });

  it("escapes script delimiters in source biographies without changing their content", () => {
    const person = { ...publishedPeople[0], summary: 'A biography with </script><script>alert("example")</script> & text.' };
    const structuredData = personStructuredData(person);
    const serialized = serializeStructuredData(structuredData);
    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toEqual(structuredData);
  });
});
