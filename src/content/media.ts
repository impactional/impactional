import type { StaticImageData } from "next/image";

import communityImage from "@/assets/images/community-apu.png";
import joshuaImage from "@/assets/images/joshua-steib.jpg";
import workshopImage from "@/assets/images/workshop.png";

export type VideoEntry = {
  id: string;
  title: string;
  category: string;
  description: string;
  placeholder: boolean;
  sourceUrl: string;
};

export const videos: VideoEntry[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Impactional company profile — temporary slot",
    category: "Company profile",
    description: "This temporary media slot will be replaced with the approved Impactional company-profile video.",
    placeholder: true,
    sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export type Story = {
  title: string;
  category: string;
  date: string;
  sourcePlatform: "Website" | "Instagram";
  image: StaticImageData;
  imageAlt: string;
  href: string;
  isPublished: boolean;
};

export const stories: Story[] = [
  { category: "Youth diplomacy", date: "August 2023", sourcePlatform: "Website", title: "A generation takes its seat at the global table", image: communityImage, imageAlt: "Impactional members gathered on the steps at Asia Pacific University", href: "https://www.impactional.org/post/impactional-at-the-afs-28th-youth-assembly-new-york-empowering-young-leaders-for-a-better-tomorrow", isPublished: true },
  { category: "Changemaker story", date: "August 2023", sourcePlatform: "Website", title: "Joshua Steib: diplomacy as a force for climate action", image: joshuaImage, imageAlt: "Joshua Steib speaking at the Youth4Climate event in Milan", href: "https://www.impactional.org/post/changemaker-of-the-month-joshua-steib-saving-the-planet-through-the-power-of-diplomacy", isPublished: true },
  { category: "Field notes", date: "2023", sourcePlatform: "Website", title: "Inside a room where new collaborations begin", image: workshopImage, imageAlt: "Participants smiling during an Impactional workshop", href: "https://impactional.wixsite.com/website/blog", isPublished: true },
];

export type ChangemakerRecord = {
  slug: string;
  name: string;
  publishedAt: string;
  summary: string;
  href: string;
  isPublished: boolean;
};

export const changemakers: ChangemakerRecord[] = [
  { slug: "joshua-steib", name: "Joshua Steib", publishedAt: "2023-08-01", summary: "A climate activist using diplomacy as a force for collective action.", href: stories[1].href, isPublished: true },
];

export const publishedStories = stories.filter((story) => story.isPublished);
export const publishedChangemakers = changemakers
  .filter((entry) => entry.isPublished)
  .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt) || a.slug.localeCompare(b.slug));

