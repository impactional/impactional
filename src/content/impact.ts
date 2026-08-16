export type ImpactMetric = {
  value: number;
  display: string;
  format: "plain" | "thousands" | "k" | "currency";
  label: string;
  period: string;
  sourceLabel: string;
};

export const reportMeta = {
  title: "Impact Report 2025–26",
  period: "2025–26",
  sourceLabel: "Impactional Impact Report 2025–26",
} as const;

export const impactMetrics: ImpactMetric[] = [
  { value: 53000, display: "53K+", format: "k", label: "audience enlightened", period: reportMeta.period, sourceLabel: reportMeta.sourceLabel },
  { value: 3300, display: "≈$3,300", format: "currency", label: "donations and grants generated", period: reportMeta.period, sourceLabel: reportMeta.sourceLabel },
  { value: 32000, display: "32K+", format: "k", label: "social community", period: reportMeta.period, sourceLabel: reportMeta.sourceLabel },
  { value: 10, display: "10+", format: "plain", label: "programs delivered", period: reportMeta.period, sourceLabel: reportMeta.sourceLabel },
  { value: 2000, display: "2,000+", format: "thousands", label: "changemakers across 50+ countries", period: reportMeta.period, sourceLabel: reportMeta.sourceLabel },
  { value: 3000000, display: "3M+", format: "k", label: "people reached through social media", period: reportMeta.period, sourceLabel: reportMeta.sourceLabel },
];

export const programImpact = [
  { title: "Global Ambassador Program", stat: "52 ambassadors", detail: "25 countries · 75 activities · 29K+ participants, projects, and social interactions" },
  { title: "ImpactYou!", stat: "52K+ audience", detail: "20 activists from three countries · 250 participants · reach across 50+ countries" },
  { title: "Changemaker Catalyst", stat: "100 changemakers", detail: "30 countries · 10+ professors and CEOs · 10+ scalable project ideas" },
] as const;

export const history = [
  { year: "2021", title: "Two exchange students moved first", description: "Tatjana Syafira and Olga founded Impactional in February to make international exposure more accessible." },
  { year: "2022", title: "A network became a platform", description: "Programs connected young people to global classrooms, mentors, and practical ways to act locally." },
  { year: "2023", title: "Young voices entered global rooms", description: "Impactional joined conversations spanning the European Parliament, New York, Japan, and youth-led international forums." },
  { year: "2025–26", title: "The ripple reached millions", description: "More than 2,000 changemakers across 50+ countries now sit inside a wider community reaching 3M+ people online." },
] as const;

export const accolades = [
  "Representation at the European Parliament",
  "Participation in the 28th Youth Assembly in New York",
  "Engagement with youth and public forums in Japan",
  "Cross-sector learning with universities, embassies, foundations, and global companies",
] as const;
