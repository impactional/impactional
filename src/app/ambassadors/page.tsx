import type { Metadata } from "next";

import { TermFilter } from "@/components/ambassadors/term-filter";
import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { ambassadorTerms, publishedAmbassadors } from "@/content/ambassadors";

export const metadata: Metadata = { title: "Global Ambassadors — Impactional", description: "Meet approved Impactional Global Ambassadors, their SDG focus, and their final projects by term." };

export default async function AmbassadorsPage({ searchParams }: { searchParams: Promise<{ term?: string }> }) {
  const requested = (await searchParams).term;
  const activeTerm = ambassadorTerms.includes(requested as (typeof ambassadorTerms)[number]) ? requested! : ambassadorTerms[0];
  const visible = publishedAmbassadors.filter((ambassador) => ambassador.term === activeTerm);
  return <SiteShell><PageIntro eyebrow="Global Ambassador Showcase" title={<>Local voices.<br /><em>Global cohort.</em></>} description="Explore ambassador profiles, SDG priorities, and final projects by term. Profiles only appear after publication consent is confirmed." /><Container className="route-section"><TermFilter terms={ambassadorTerms} activeTerm={activeTerm} />{visible.length ? <div className="profile-grid">{visible.map((ambassador) => <article key={ambassador.slug}><p>{ambassador.country}</p><h2>{ambassador.name}</h2><span>{ambassador.sdgFocus.join(" · ")}</span><p>{ambassador.bio}</p></article>)}</div> : <EmptyState title={`Term ${activeTerm} profiles are awaiting approval`}>The structure is ready. Approved bios, portraits, SDG focus, and final projects will appear without exposing draft information.</EmptyState>}</Container></SiteShell>;
}

