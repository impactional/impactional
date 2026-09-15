import { contact } from "@/content/site";

// Upcoming program supplied by the website owner on 2026-09-15.
// The proposal has no calendar dates or registration URL. Targets are not results.
export const globalYouthCircle = {
  id: "global-youth-circle-v1",
  enabled: true,
  title: "Global Youth Circle",
  parent: "SDG Impact Lab",
  href: "/programs/global-youth-circle",
  status: "Coming soon",
  description: "A space for young people to explore the Sustainable Development Goals, learn with peers, and turn shared ideas into social projects.",
  format: "Hybrid · Online + Jakarta",
  scheduleLabel: "Dates and registration details will be announced soon.",
  registrationUrl: null as string | null,
  sourceUrl: "https://drive.google.com/file/d/13n5f-HW_B5DGuqHZqb5D_X8LGMNGxOT4/view",
  sourceLabel: "SDG Impact Lab: Global Youth Circle proposal, supplied by the website owner on 2026-09-15",
  contactUrl: `mailto:${contact.email}?subject=Global%20Youth%20Circle%20enquiry`,
  sessions: [
    { number: "01", mode: "Online", title: "Start a conversation.", description: "Explore SDG themes through facilitated dialogue and exchange perspectives with peers." },
    { number: "02", mode: "Jakarta · In person", title: "Put your idea out there.", description: "Prototype a social project, share your work through an action pitch, and connect with the community." },
    { number: "03", mode: "Online", title: "Reflect. Then go further.", description: "Come back together for a debrief and graduation, carrying your learning into what comes next." },
  ],
  benefits: [
    { title: "People who expand your world", description: "Meet peers across regions and backgrounds, and become part of a wider network of changemakers." },
    { title: "Skills you can put to work", description: "Practice communication, collaboration, facilitation, and pitching through shared learning." },
    { title: "A platform for your ideas", description: "Develop an early-stage social project and share it through the planned SDG project showcase." },
  ],
} as const;

export const GYC_SESSION_KEY = `impactional:announcement:${globalYouthCircle.id}:seen`;
export const GYC_AUTO_OPEN_DELAY = 2800;
