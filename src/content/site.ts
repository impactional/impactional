export type SiteNavigationItem = {
  label: string;
  href: `/${string}`;
};

export const siteNavigation: SiteNavigationItem[] = [
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Media", href: "/media" },
  { label: "Ambassadors", href: "/ambassadors" },
  { label: "People", href: "/people" },
  { label: "Partner", href: "/partner" },
];

export const contact = {
  email: "contact.impactional@gmail.com",
  opportunities: "https://linktr.ee/Impactional.org",
  socials: {
    linkedin: "https://www.linkedin.com/company/impactional",
    instagram: "https://www.instagram.com/impactional",
    tiktok: "https://www.tiktok.com/@impactional",
  },
} as const;

