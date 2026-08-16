import type { StaticImageData } from "next/image";

import augustPortrait from "@/assets/images/cotm-august-2026.png";
import julyPortrait from "@/assets/images/cotm-july-2026.png";
import septemberPlaceholder from "@/assets/images/cotm-september-placeholder.jpg";

export type CotmEntry = {
  id: "july" | "august" | "september";
  month: string;
  name: string;
  role: string;
  location: string;
  story: string;
  quote: string;
  image: StaticImageData | null;
  imageAlt: string;
  stats: Array<{ value: string; label: string }>;
  upcoming?: boolean;
};

// Fictional concept profiles and AI-generated visuals. Replace with approved COTM records.
export const cotmEntries: CotmEntry[] = [
  {
    id: "july",
    month: "JUL 2026",
    name: "Kwame Mensah",
    role: "Climate Action",
    location: "Accra, Ghana",
    story: "Kwame turned a neighborhood mapping session into a practical climate-action toolkit designed with, and for, young community organizers.",
    quote: "Start with the people already doing the work. Listen first, then build what helps them move further.",
    image: julyPortrait,
    imageAlt: "AI-generated concept image of a fictional young climate-action collaborator in a workshop",
    stats: [
      { value: "8", label: "community teams" },
      { value: "180", label: "young people engaged" },
    ],
  },
  {
    id: "august",
    month: "AUG 2026",
    name: "Maya Prameswari",
    role: "Youth Leadership",
    location: "Yogyakarta, Indonesia",
    story: "Maya transformed small peer conversations into a practical workshop series where young people practice listening, collaboration, and community leadership.",
    quote: "Change became less intimidating when we stopped waiting to feel ready and started learning together.",
    image: augustPortrait,
    imageAlt: "AI-generated concept image of a fictional Southeast Asian youth workshop facilitator",
    stats: [
      { value: "12", label: "communities reached" },
      { value: "240", label: "young people engaged" },
    ],
  },
  {
    id: "september",
    month: "SEP 2026",
    name: "This could be you!",
    role: "Next Changemaker",
    location: "Anywhere in the world",
    story: "Your work does not need to be the loudest to matter. Tell us how you are moving an idea forward in your school, neighborhood, or community.",
    quote: "The next story in motion is still waiting to be told.",
    image: septemberPlaceholder,
    imageAlt: "Anonymous silhouetted person representing the next Changemaker of the Month",
    stats: [],
    upcoming: true,
  },
];
