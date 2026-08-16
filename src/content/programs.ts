export type ProgramAccent = "magenta" | "ocean" | "mint" | "amber";

export type Program = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: ProgramAccent;
  audience: string;
  outcomes: string[];
  status: "open-link" | "details-coming";
};

export const programs: Program[] = [
  {
    number: "01",
    slug: "changemaker-catalyst-programme",
    shortTitle: "Catalyst",
    title: "Changemaker Catalyst Programme",
    description: "A learning journey that turns urgent ideas into grounded, community-led action.",
    accent: "magenta",
    audience: "Young people ready to turn a cause into an actionable project.",
    outcomes: ["Mentor-supported project development", "Cross-border peer learning", "A practical action plan"],
    status: "details-coming",
  },
  {
    number: "02",
    slug: "global-ambassador-program",
    shortTitle: "Ambassador",
    title: "Impactional Global Ambassador Program",
    description: "A cross-border cohort sharing cultures, building projects, and becoming local connectors.",
    accent: "ocean",
    audience: "Youth leaders who want to represent a global network in their community.",
    outcomes: ["Global community building", "Local activities and final projects", "Leadership development"],
    status: "details-coming",
  },
  {
    number: "03",
    slug: "impactyou",
    shortTitle: "ImpactYou!",
    title: "ImpactYou! Circle",
    description: "Open conversations where young people exchange perspectives on the issues shaping our future.",
    accent: "mint",
    audience: "Young people seeking an accessible entry point into global dialogue.",
    outcomes: ["Issue-based dialogue", "Intercultural exchange", "Community-led learning"],
    status: "details-coming",
  },
  {
    number: "04",
    slug: "pegi",
    shortTitle: "PEGI",
    title: "Peace, Education, & Global Innovation (PEGI)",
    description: "An international class connecting peacebuilding, education, and practical global innovation.",
    accent: "amber",
    audience: "Learners interested in peace, education, and collaborative global problem-solving.",
    outcomes: ["Peacebuilding perspectives", "Global classroom exchange", "Collaborative innovation practice"],
    status: "details-coming",
  },
];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}

