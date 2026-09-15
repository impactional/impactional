import type { MetadataRoute } from "next";

import { publishedPeople } from "@/content/people";
import { programs } from "@/content/programs";
import { siteUrl } from "@/content/site";
import { globalYouthCircle } from "@/content/global-youth-circle";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/programs", "/impact", "/media", "/ambassadors", "/people", "/partner"].map((path) => ({ url: `${siteUrl}${path}` })),
    ...programs.map((program) => ({ url: `${siteUrl}/programs/${program.slug}` })),
    ...(globalYouthCircle.enabled ? [{ url: `${siteUrl}${globalYouthCircle.href}` }] : []),
    ...publishedPeople.map((person) => ({
      url: `${siteUrl}/people/${person.slug}`,
      ...(person.updatedAt ? { lastModified: person.updatedAt } : {}),
      ...(person.portrait ? { images: [`${siteUrl}${person.portrait}`] } : {}),
    })),
  ];
}
