import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { getProgram, programs } from "@/content/programs";
import { contact } from "@/content/site";

export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const program = getProgram((await params).slug);
  return program ? { title: `${program.title} — Impactional`, description: program.description } : {};
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const program = getProgram((await params).slug);
  if (!program) notFound();
  return <SiteShell><PageIntro eyebrow={`Program ${program.number}`} title={<>{program.title}</>} description={program.description} aside={<Link className="text-link" href="/programs">← All programs</Link>} /><Container className="route-section program-detail"><section><p className="eyebrow">Who it is for</p><h2>A starting point for people ready to move.</h2><p>{program.audience}</p></section><section><p className="eyebrow">What you can build</p><ul>{program.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section><aside><p className="eyebrow">Applications</p><h2>Details coming soon.</h2><p>Dates and eligibility will appear here after the program team confirms the next cohort. We never publish an unverified deadline.</p><a className="button button--primary button--lg" href={contact.opportunities} target="_blank" rel="noreferrer">See current opportunities ↗</a></aside></Container></SiteShell>;
}
