import roster from "@/content/people-roster.json";

export type PersonCategory = "founder-advisor" | "board" | "staff" | "member-of-month" | "alumni";

export const peopleDivisions = [
  { id: "ambassador-management", label: "Ambassador Management", tone: "pink" },
  { id: "business-development", label: "Business Development", tone: "blue" },
  { id: "creative", label: "Creative", tone: "amber" },
  { id: "flagship-program", label: "Flagship Program", tone: "mint" },
  { id: "human-resources", label: "Human Resources", tone: "pink" },
  { id: "it", label: "IT", tone: "blue" },
  { id: "marketing", label: "Marketing", tone: "amber" },
] as const;

export type PersonDivision = (typeof peopleDivisions)[number]["id"];

export const peopleSource = {
  roster: "https://docs.google.com/spreadsheets/d/1clO3m_7GRRekZkpVzK2xx__6DPUd2rLciIcm7NQikds/edit?gid=0",
  portraits: "https://drive.google.com/drive/folders/1vKxNd0zU94VG6G7thlztiuV7KsXQHP3V",
  label: "User-provided Impactional member introduction roster and portraits, 26.2; supplied for the website on 2026-09-15",
};

export type Person = {
  slug: string;
  name: string;
  nickname?: string;
  preferredName?: string;
  email?: string;
  location?: string;
  hobbies?: string;
  favoriteMusic?: string;
  detailsSourceLabel?: string;
  updatedAt?: string;
  category: PersonCategory;
  division?: PersonDivision;
  team?: string;
  role: string;
  summary: string;
  quote?: string;
  term?: string;
  portrait?: string;
  portraitSource?: string;
  portraitPosition?: string;
  imageAlt?: string;
  socialUrl?: string;
  consentConfirmed: boolean;
  sourceLabel: string;
  isPublished: boolean;
};

// This source was supplied by the site owner for member profiles. Keep the
// publication gates for future drafts and retain each original portrait source.
export const people: Person[] = roster.map((record) => {
  const division = peopleDivisions.find((entry) => entry.id === record.division);
  if (!division) throw new Error(`Unknown people division: ${record.division}`);

  return {
    ...record,
    division: division.id,
    category: /director/i.test(record.role) ? "board" : "staff",
    term: "26.2",
    consentConfirmed: record.consentConfirmed,
    sourceLabel: peopleSource.label,
    isPublished: record.isPublished,
  };
});

export const publishedPeople = people.filter(
  (person) => person.isPublished && person.consentConfirmed && Boolean(person.sourceLabel),
);

export function personInitials(person: Pick<Person, "name">) {
  const names = person.name.trim().split(/\s+/);
  return `${names[0][0]}${names.length > 1 ? names[names.length - 1][0] : ""}`.toUpperCase();
}

export function personDivisionLabel(person: Pick<Person, "division">) {
  return peopleDivisions.find((division) => division.id === person.division)?.label ?? "Impactional";
}

export function getPerson(slug: string) {
  return publishedPeople.find((person) => person.slug === slug);
}

export function personExcerpt(text: string, maxLength = 175) {
  const plainText = text.replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLength) return plainText;
  const excerpt = plainText.slice(0, maxLength - 1);
  const lastSpace = excerpt.lastIndexOf(" ");
  return `${lastSpace > 0 ? excerpt.slice(0, lastSpace) : excerpt}…`;
}

export const peopleCategories: { id: PersonCategory; label: string; description: string }[] = [
  { id: "founder-advisor", label: "Founders & Board of Advisors", description: "The people who established the mission and continue to challenge its direction." },
  { id: "board", label: "Current Board of Directors", description: "The current-term leadership stewarding Impactional’s strategy and community." },
  { id: "staff", label: "Members & Staff", description: "The team turning programs, stories, partnerships, and operations into lived experiences." },
  { id: "member-of-month", label: "Member of the Month", description: "Recognition for the care and craft behind the scenes." },
  { id: "alumni", label: "Past Members", description: "Term-complete alumni whose contributions and achievements have been approved by HR." },
];
