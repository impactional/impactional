import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Partner with Impactional", description: "Collaborate with Impactional on youth programs, knowledge, platforms, and cross-border opportunities." };

const modes = [
  ["Build a program", "Co-create a learning experience grounded in youth voice and measurable community action."],
  ["Share expertise", "Bring mentors, speakers, research, or tools into a global room of young changemakers."],
  ["Open a door", "Help young people reach institutions, networks, and opportunities that are usually out of reach."],
] as const;

export default function PartnerPage() {
  const mailHref = `mailto:${contact.email}?subject=Partnership%20with%20Impactional&body=Hello%20Impactional%2C%0A%0AOrganization%3A%0ACollaboration%20idea%3A%0AWho%20it%20would%20serve%3A%0A`;
  return <SiteShell><PageIntro eyebrow="Partner with us" title={<>Move further,<br /><em>together.</em></>} description="We collaborate with organizations that want young people to access meaningful global learning, relationships, and platforms." aside={<a className="button button--primary button--lg" href={mailHref}>Start a conversation →</a>} /><Container className="route-section"><div className="partner-modes">{modes.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{description}</p></article>)}</div><aside className="partner-contact"><div><p className="eyebrow">What to include</p><h2>A useful first note is simple.</h2></div><ul><li>Your organization and role</li><li>The people or communities you want to serve</li><li>The collaboration you have in mind</li><li>Any relevant timing or constraints</li></ul><div><p>If your mail app does not open, write directly to:</p><a href={`mailto:${contact.email}`}>{contact.email}</a></div></aside></Container></SiteShell>;
}
