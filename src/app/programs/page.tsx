import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import { GycBanner } from "@/components/announcements/gyc-banner";
import { PageMotion } from "@/components/editorial/page-motion";
import { EditorialCta, EditorialHeading } from "@/components/editorial/page-parts";
import { ProgramArtwork } from "@/components/editorial/program-artwork";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { programs } from "@/content/programs";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Find Your Pathway — Impactional Programs",
  description: "Explore Impactional’s four program pathways and the upcoming Global Youth Circle. Find your way into global dialogue, leadership, and community-led action.",
  alternates: { canonical: "/programs" },
  openGraph: { title: "Find Your Pathway — Impactional", url: "/programs" },
};

export default function ProgramsPage() {
  return (
    <SiteShell><PageMotion className="programs-page">
      <section className="editorial-hero pathways-hero"><Container className="pathways-hero__grid">
        <div data-editorial-reveal><p className="eyebrow">The next chapter is yours</p><h1>Find your next<br /><em>“what if?”</em></h1><p className="editorial-hero__lead">A conversation that changes your perspective. A project you finally bring to life. A community that helps you go further. Start here.</p><div className="editorial-hero__actions"><ButtonLink href="#pathways">Find your pathway <ArrowDown aria-hidden="true" /></ButtonLink><span className="pathways-hero__count">4 pathways. Plenty of possibility.</span></div></div>
        <div className="pathway-stack" data-editorial-reveal><span className="pathway-stack__note">Where will curiosity take you?</span><svg viewBox="0 0 600 520" fill="none" aria-hidden="true"><path d="M40 480C110 230 390 530 505 284S197-21 160 132" /></svg>{programs.map((program) => <a className={`pathway-ticket pathway-ticket--${program.accent}`} href={`#pathway-${program.slug}`} key={program.slug}><span>0{Number(program.number)}</span><strong>{program.shortTitle}</strong><ArrowUpRight size={24} aria-hidden="true" /></a>)}<span className="pathway-stack__spark" aria-hidden="true">✳</span></div>
      </Container></section>
      <Container className="pathways-upcoming"><GycBanner /></Container>
      <section className="editorial-section" id="pathways"><Container><EditorialHeading eyebrow="Choose your starting point" description="Different ways to learn, connect, and create change. Follow the one that feels like you.">One purpose.<br /><em>Your own pathway.</em></EditorialHeading>
        <div className="pathway-list">{programs.map((program) => <article id={`pathway-${program.slug}`} className={`pathway-feature pathway-feature--${program.accent}`} key={program.slug} data-editorial-reveal><ProgramArtwork accent={program.accent} number={program.number} /><div className="pathway-feature__copy"><p className="eyebrow">{program.number} / {program.shortTitle}</p><h2><Link href={`/programs/${program.slug}`}>{program.title}</Link></h2><p>{program.description}</p><div className="pathway-feature__audience"><Sparkles size={18} aria-hidden="true" /><span>{program.audience}</span></div><ul>{program.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><Link className="pathway-feature__link" href={`/programs/${program.slug}`}>Explore this program <span className="sr-only">: {program.title}</span><ArrowUpRight aria-hidden="true" /></Link></div></article>)}</div>
      </Container></section>
      <EditorialCta eyebrow="There’s a place for your curiosity" description="See what’s happening across our community and find an opportunity that speaks to you." href={contact.opportunities} label="See current opportunities">Your next step<br /><em>could start something.</em></EditorialCta>
    </PageMotion></SiteShell>
  );
}
