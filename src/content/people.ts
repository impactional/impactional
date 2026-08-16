export type PersonCategory = "founder-advisor" | "board" | "staff" | "member-of-month" | "alumni";

export type Person = {
  slug: string;
  name: string;
  category: PersonCategory;
  role: string;
  summary: string;
  quote?: string;
  term?: string;
  portrait?: string;
  imageAlt?: string;
  socialUrl?: string;
  consentConfirmed: boolean;
  sourceLabel: string;
  isPublished: boolean;
};

// Draft records belong here only after HR provides them. Public selectors always enforce consent.
export const people: Person[] = [];

export const publishedPeople = people.filter(
  (person) => person.isPublished && person.consentConfirmed && Boolean(person.sourceLabel),
);

export const peopleCategories: { id: PersonCategory; label: string; description: string }[] = [
  { id: "founder-advisor", label: "Founders & Board of Advisors", description: "The people who established the mission and continue to challenge its direction." },
  { id: "board", label: "Current Board of Directors", description: "The current-term leadership stewarding Impactional’s strategy and community." },
  { id: "staff", label: "Members & Staff", description: "The team turning programs, stories, partnerships, and operations into lived experiences." },
  { id: "member-of-month", label: "Member of the Month", description: "Recognition for the care and craft behind the scenes." },
  { id: "alumni", label: "Past Members", description: "Term-complete alumni whose contributions and achievements have been approved by HR." },
];

