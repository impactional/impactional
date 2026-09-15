import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Globe2, MessagesSquare, Sprout } from "lucide-react";

import teamPhoto from "@/assets/images/global-team.png";
import { TermFilter } from "@/components/ambassadors/term-filter";
import { PageMotion } from "@/components/editorial/page-motion";
import { EditorialCta, EditorialHeading } from "@/components/editorial/page-parts";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ambassadorTerms, publishedAmbassadors } from "@/content/ambassadors";
import { reportMeta } from "@/content/impact";

export const metadata: Metadata = {
  title: "Global Ambassadors — Impactional",
  description: "Local voices, global connections. Explore Impactional’s Global Ambassador community, program impact, and cohort introductions.",
  alternates: { canonical: "/ambassadors" },
  openGraph: { title: "Local Voices. Global Connections. — Impactional", url: "/ambassadors" },
};

const waysToConnect = [
  { icon: Globe2, title: "See beyond your own world.", text: "Exchange perspectives and cultures with young people from different places." },
  { icon: MessagesSquare, title: "Build meaningful connections.", text: "Grow alongside a cohort that learns, collaborates, and shares ideas across borders." },
  { icon: Sprout, title: "Bring the change home.", text: "Turn that shared learning into local activities and community projects." },
];

export default async function AmbassadorsPage({ searchParams }: { searchParams: Promise<{ term?: string }> }) {
  const requested = (await searchParams).term;
  const activeTerm = ambassadorTerms.includes(requested as (typeof ambassadorTerms)[number]) ? requested! : ambassadorTerms[0];
  const visible = publishedAmbassadors.filter((ambassador) => ambassador.term === activeTerm);
  return <SiteShell><PageMotion className="ambassadors-page">
    <section className="editorial-hero ambassadors-hero"><Container className="ambassadors-hero__grid"><div data-editorial-reveal><p className="eyebrow">The Global Ambassador community</p><h1>Many places.<br /><em>One generation.</em></h1><p className="editorial-hero__lead">A local voice can start a global conversation. Meet the program connecting young people across borders, cultures, and possibilities.</p><div className="editorial-hero__actions"><ButtonLink href="#ambassador-community" variant="primary">Explore the community <ArrowDown aria-hidden="true" /></ButtonLink></div></div><div className="ambassadors-hero__visual" data-editorial-reveal><div className="ambassadors-hero__atlas"><svg viewBox="0 0 1100 520" aria-hidden="true"><image href="/maps/world-mercator.svg" width="1100" height="520" /></svg></div><span className="ambassadors-hero__orbit" aria-hidden="true" /><Image src={teamPhoto} alt="Collage of young changemakers in the Impactional community" sizes="(max-width: 800px) 90vw, 55vw" loading="eager" fetchPriority="high" /><span className="ambassadors-hero__sticker"><Globe2 strokeWidth={1} aria-hidden="true" />CONNECTED BY<br />POSSIBILITY</span><span className="ambassadors-hero__note" aria-hidden="true">The world feels a little closer.</span></div></Container></section>
    <section className="ambassador-reach"><Container><div><p className="eyebrow">A program that crosses borders</p><p>From the {reportMeta.period} Impact Report</p><Link href="/impact#report-programs">Explore our impact <ArrowUpRight size={15} aria-hidden="true" /></Link></div><div><strong>52</strong><span>ambassadors</span></div><div><strong>25</strong><span>countries</span></div><div><strong>75</strong><span>activities</span></div></Container></section>
    <section className="editorial-section"><Container><EditorialHeading eyebrow="What connects us" description="Global community building, local action, and leadership development are at the heart of the Ambassador pathway.">Across borders.<br /><em>Closer together.</em></EditorialHeading><div className="ambassador-values">{waysToConnect.map((item, index) => <article key={item.title} data-editorial-reveal><div><span>0{index + 1}</span><item.icon size={34} strokeWidth={1.2} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></Container></section>
    <section className="ambassador-community editorial-section" id="ambassador-community"><Container><EditorialHeading eyebrow="Meet the cohorts" description="Every term brings a new set of perspectives. Explore the introductions, causes, and projects that shape our community.">Local voices.<br /><em>Lasting connections.</em></EditorialHeading><div className="ambassador-community__toolbar"><span>The cohort collection</span><TermFilter terms={ambassadorTerms} activeTerm={activeTerm} /></div>
      {visible.length ? <div className="ambassador-profiles">{visible.map((ambassador) => <article key={ambassador.slug}>{ambassador.portrait && <div className="ambassador-profiles__portrait"><Image src={ambassador.portrait} alt={ambassador.imageAlt || `Portrait of ${ambassador.name}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>}<p>{ambassador.country}</p><h2>{ambassador.name}</h2><span>{ambassador.sdgFocus.join(" · ")}</span><p>{ambassador.bio}</p>{ambassador.projectStatus === "published" && ambassador.projectUrl && <a href={ambassador.projectUrl} target="_blank" rel="noreferrer">{ambassador.finalProject || "Explore the project"} <ArrowUpRight size={17} aria-hidden="true" /></a>}</article>)}</div> : <div className="cohort-coming" key={activeTerm}><div className="cohort-passport" aria-hidden="true"><span>THE IMPACTIONAL COMMUNITY</span><Globe2 strokeWidth={.8} /><strong>Next stop:<br /><em>connection.</em></strong><small>COHORT / {activeTerm}</small></div><div><p className="eyebrow">Term {activeTerm} / Introductions coming soon</p><h3>Good people.<br /><em>Stories worth waiting for.</em></h3><p>We’re gathering the stories, causes, and projects of this cohort. Come back to meet the people behind them.</p><Link className="editorial-link" href="/programs/global-ambassador-program">Get to know the Ambassador program <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>}
    </Container></section>
    <EditorialCta eyebrow="Your local voice belongs in a global conversation" description="Find out how the Global Ambassador Program connects youth leadership, community projects, and cross-cultural exchange." href="/programs/global-ambassador-program" label="Explore the Ambassador pathway">Your world is bigger<br /><em>than you think.</em></EditorialCta>
  </PageMotion></SiteShell>;
}
