import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { programs } from "@/content/programs";

export const metadata: Metadata = { title: "Programs — Impactional", description: "Four youth-led pathways for turning global learning into local action." };

export default function ProgramsPage() {
  return <SiteShell><PageIntro eyebrow="Programs" title={<>Start where your<br /><em>curiosity lives.</em></>} description="Each Impactional program offers a different way into global dialogue, practical leadership, and community-led change." /><Container className="route-section"><div className="route-program-grid">{programs.map((program) => <article className={`route-program route-program--${program.accent}`} key={program.slug}><div><span>{program.number}</span><span>{program.shortTitle}</span></div><h2>{program.title}</h2><p>{program.description}</p><small>{program.audience}</small><Link href={`/programs/${program.slug}`}>Explore this program →</Link></article>)}</div></Container></SiteShell>;
}

