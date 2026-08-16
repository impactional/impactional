export type Ambassador = {
  slug: string;
  name: string;
  term: string;
  country: string;
  bio: string;
  sdgFocus: string[];
  projectStatus: "published" | "pending" | "none";
  finalProject?: string;
  projectUrl?: string;
  portrait?: string;
  imageAlt?: string;
  socialUrl?: string;
  consentConfirmed: boolean;
  sourceLabel: string;
  isPublished: boolean;
};

// Profiles will be added only after Ambassador/HR approval.
export const ambassadors: Ambassador[] = [];
export const ambassadorTerms = ["2025", "2024"] as const;
export const publishedAmbassadors = ambassadors.filter(
  (ambassador) => ambassador.isPublished && ambassador.consentConfirmed && Boolean(ambassador.sourceLabel),
);

