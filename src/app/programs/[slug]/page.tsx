import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";

import { PageMotion } from "@/components/editorial/page-motion";
import { EditorialHeading } from "@/components/editorial/page-parts";
import { ProgramArtwork } from "@/components/editorial/program-artwork";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProgram, programs } from "@/content/programs";
import { programImpact, reportMeta } from "@/content/impact";
import { contact } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const program = getProgram((await params).slug);
  if (!program) notFound();
  return { title: `${program.title} — Impactional`, description: program.description, alternates: { canonical: `/programs/${program.slug}` }, openGraph: { title: program.title, description: program.description, url: `/programs/${program.slug}` } };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const program = getProgram((await params).slug);
  if (!program) notFound();
  const impact = programImpact.find((entry) => entry.href === `/programs/${program.slug}`);
  return (
    <SiteShell><PageMotion className={`pathway-detail pathway-detail--${program.accent}`}>
      <section className="pathway-detail__hero"><Container><Link href="/programs" className="editorial-link"><ArrowLeft size={17} aria-hidden="true" /> All programs</Link><div className="pathway-detail__hero-grid"><div data-editorial-reveal><p className="eyebrow">{program.number} / An Impactional pathway</p><h1>{program.title}</h1><p>{program.description}</p><ButtonLink href="#program-experience">Explore the experience <ArrowUpRight aria-hidden="true" /></ButtonLink></div><ProgramArtwork accent={program.accent} number={program.number} /></div></Container></section>
      <section className="editorial-section" id="program-experience"><Container><EditorialHeading eyebrow="Made for you" description={program.audience}>A little curiosity.<br /><em>A meaningful next step.</em></EditorialHeading><div className="pathway-outcomes">{program.outcomes.map((outcome, index) => <article key={outcome} data-editorial-reveal><span>0{index + 1}</span><Sparkles strokeWidth={1} aria-hidden="true" /><h3>{outcome}</h3></article>)}</div></Container></section>
      {impact && <section className="pathway-proof"><Container><div><p className="eyebrow">From the {reportMeta.period} report</p><strong>{impact.stat}</strong></div><div><p>{impact.detail}</p><Link className="editorial-link" href="/impact#report-programs">See the story behind the numbers <ArrowUpRight size={18} aria-hidden="true" /></Link></div></Container></section>}
      <section className="editorial-section"><Container className="pathway-invitation"><div><p className="eyebrow">Your next chapter</p><h2>Keep your<br /><em>curiosity open.</em></h2></div><div><p>Cohort dates and eligibility will be announced with the next program update. Explore our current opportunities or reach out to learn more.</p><ButtonLink href={contact.opportunities}>See current opportunities <ArrowUpRight aria-hidden="true" /></ButtonLink><a className="editorial-link" href={`mailto:${contact.email}?subject=${encodeURIComponent(`${program.title} enquiry`)}`}>Ask about this program <ArrowUpRight size={17} aria-hidden="true" /></a></div></Container></section>
      <Container className="pathway-other"><p className="eyebrow">Keep exploring</p><div>{programs.filter((entry) => entry.slug !== program.slug).map((entry) => <Link key={entry.slug} href={`/programs/${entry.slug}`}><span>{entry.number}</span><strong>{entry.shortTitle}</strong><ArrowUpRight size={22} aria-hidden="true" /></Link>)}</div></Container>
    </PageMotion></SiteShell>
  );
}
