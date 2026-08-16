import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { peopleCategories, publishedPeople } from "@/content/people";

export const metadata: Metadata = { title: "The Minds Behind Impactional", description: "Meet Impactional’s approved founders, advisors, directors, members, staff, and alumni." };

export default function PeoplePage() {
  return <SiteShell><PageIntro eyebrow="The minds behind Impactional" title={<>Built by people<br /><em>who care deeply.</em></>} description="The strategy, programs, late-night edits, and quiet operational work all begin with people. Profiles publish only with confirmed consent." /><Container className="route-section people-sections">{peopleCategories.map((category, index) => { const entries = publishedPeople.filter((person) => person.category === category.id); return <section key={category.id}><div><span>0{index + 1}</span><div><h2>{category.label}</h2><p>{category.description}</p></div></div>{entries.length ? <div className="profile-grid">{entries.map((person) => <article key={person.slug}><p>{person.role}</p><h3>{person.name}</h3><p>{person.summary}</p></article>)}</div> : <EmptyState title="Approved profiles are coming next">HR-provided portraits, bios, quotes, terms, and social links will appear here after consent review.</EmptyState>}</section>; })}</Container></SiteShell>;
}

