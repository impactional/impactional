import type { Metadata } from "next";

import { personDivisionLabel, personExcerpt, type Person } from "@/content/people";
import { siteUrl } from "@/content/site";

export function personMetadata(person: Person): Metadata {
  const title = `${person.name} — ${personDivisionLabel(person)} | Impactional`;
  const description = personExcerpt(`${person.name}, ${person.role} in ${personDivisionLabel(person)} at Impactional. ${person.summary}`, 160);
  const url = `${siteUrl}/people/${person.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "profile",
      siteName: "Impactional",
      title,
      description,
      url,
      ...(person.portrait ? { images: [{ url: person.portrait, alt: person.imageAlt ?? person.name }] } : {}),
    },
    twitter: {
      card: "summary",
      title,
      description,
      ...(person.portrait ? { images: [person.portrait] } : {}),
    },
  };
}

export function personStructuredData(person: Person) {
  const url = `${siteUrl}/people/${person.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: `${person.name} — Impactional`,
        ...(person.updatedAt ? { dateModified: person.updatedAt } : {}),
        mainEntity: {
          "@type": "Person",
          "@id": `${url}#person`,
          name: person.name,
          ...(person.preferredName ? { alternateName: person.preferredName } : {}),
          description: person.summary,
          jobTitle: `${personDivisionLabel(person)} ${person.role}`,
          url,
          ...(person.portrait ? { image: `${siteUrl}${person.portrait}` } : {}),
          ...(person.email ? { email: person.email } : {}),
          memberOf: { "@type": "Organization", name: "Impactional", url: siteUrl },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "People", item: `${siteUrl}/people` },
          { "@type": "ListItem", position: 3, name: person.name, item: url },
        ],
      },
    ],
  };
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
