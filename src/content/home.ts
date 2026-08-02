import type { StaticImageData } from "next/image";

import communityImage from "@/assets/images/community-apu.png";
import parliamentImage from "@/assets/images/european-parliament.jpg";
import teamImage from "@/assets/images/global-team.png";
import joshuaImage from "@/assets/images/joshua-steib.jpg";
import workshopImage from "@/assets/images/workshop.png";

export type NavigationItem = { label: string; href: `#${string}` };

export type Program = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: "magenta" | "ocean" | "mint" | "amber";
  href: string;
};

export type ImpactMetric = {
  value: number;
  display: string;
  suffix: string;
  label: string;
};

export type Story = {
  title: string;
  category: string;
  date: string;
  image: StaticImageData;
  imageAlt: string;
  href: string;
};

export const navigation: NavigationItem[] = [
  { label: "Mission", href: "#mission" },
  { label: "Programs", href: "#programs" },
  { label: "Impact", href: "#impact" },
  { label: "Stories", href: "#stories" },
];

export const programs: Program[] = [
  {
    number: "01",
    shortTitle: "Catalyst",
    title: "Changemaker Catalyst Programme",
    description:
      "A learning journey that turns urgent ideas into grounded, community-led action.",
    accent: "magenta",
    href: "https://www.impactional.org/programs",
  },
  {
    number: "02",
    shortTitle: "Ambassador",
    title: "The Ambassador Program",
    description:
      "A cross-border cohort sharing cultures, building projects, and becoming local connectors.",
    accent: "ocean",
    href: "https://impactional.wixsite.com/website/ambassador",
  },
  {
    number: "03",
    shortTitle: "ImpactYou!",
    title: "ImpactYou! Circle",
    description:
      "Open conversations where young people exchange perspectives on the issues shaping our future.",
    accent: "mint",
    href: "https://impactional.wixsite.com/website/impactyou",
  },
  {
    number: "04",
    shortTitle: "PE & GI",
    title: "Peace, Education & Global Innovation",
    description:
      "An international class connecting peacebuilding, education, and practical global innovation.",
    accent: "amber",
    href: "https://www.impactional.org/programs",
  },
];

export const impactMetrics: ImpactMetric[] = [
  { value: 2000, display: "2,000+", suffix: "+", label: "changemakers in 50+ countries" },
  { value: 8500, display: "8.5k+", suffix: "k+", label: "participants across our programs" },
  { value: 6, display: "6", suffix: "", label: "international programs delivered" },
  { value: 600, display: "600k+", suffix: "k+", label: "people reached through social media" },
];

export const stories: Story[] = [
  {
    category: "Youth diplomacy",
    date: "August 2023",
    title: "A generation takes its seat at the global table",
    image: communityImage,
    imageAlt: "Impactional members gathered on the steps at Asia Pacific University",
    href: "https://www.impactional.org/post/impactional-at-the-afs-28th-youth-assembly-new-york-empowering-young-leaders-for-a-better-tomorrow",
  },
  {
    category: "Changemaker story",
    date: "August 2023",
    title: "Joshua Steib: diplomacy as a force for climate action",
    image: joshuaImage,
    imageAlt: "Joshua Steib speaking at the Youth4Climate event in Milan",
    href: "https://www.impactional.org/post/changemaker-of-the-month-joshua-steib-saving-the-planet-through-the-power-of-diplomacy",
  },
  {
    category: "Field notes",
    date: "2023",
    title: "Inside a room where new collaborations begin",
    image: workshopImage,
    imageAlt: "Participants smiling during an Impactional workshop",
    href: "https://impactional.wixsite.com/website/blog",
  },
];

export const media = {
  hero: teamImage,
  parliament: parliamentImage,
  team: teamImage,
  spotlight: joshuaImage,
  workshop: workshopImage,
};
