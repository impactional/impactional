"use client";

import { Tabs } from "@base-ui/react/tabs";
import { ArrowUpRight, Check, Globe2 } from "lucide-react";
import Link from "next/link";

import { ProgramArtwork } from "@/components/editorial/program-artwork";
import { Container } from "@/components/ui/container";
import { globalYouthCircle } from "@/content/global-youth-circle";
import { programs } from "@/content/programs";

const invitations = { magenta: "Turn an idea into action", ocean: "Connect across borders", mint: "Start a conversation", amber: "Learn beyond the classroom" };

export function Programs() {
  return (
    <section className="program-showcase section-anchor" id="programs" aria-labelledby="home-programs-title">
      <Container>
        <header className="program-showcase__intro" data-reveal>
          <div><p className="eyebrow">02 / Our programs</p><h2 id="home-programs-title">A little curiosity.<br /><em>A whole new chapter.</em></h2></div>
          <div><p>Follow an idea. Find your people. Build something that matters. Four pathways, one generation of change.</p><Link href="/programs">Explore all programs <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </header>
        <Tabs.Root defaultValue={programs[0].slug} className="program-explorer" data-reveal>
          <div className="program-explorer__label"><span>FIND YOUR STARTING POINT</span><span aria-hidden="true">01 — 04</span></div>
          <Tabs.List className="program-choices" aria-label="Choose a program" activateOnFocus>
            {programs.map((program) => <Tabs.Tab key={program.slug} value={program.slug} className={`program-choice program-choice--${program.accent}`}><span className="program-choice__number" aria-hidden="true">{program.number}</span><strong>{program.shortTitle}</strong><ArrowUpRight size={17} aria-hidden="true" /></Tabs.Tab>)}
          </Tabs.List>
          <div className="program-explorer__stage">
            {programs.map((program) => <Tabs.Panel key={program.slug} value={program.slug} keepMounted className={`program-feature program-feature--${program.accent}`}>
              <ProgramArtwork accent={program.accent} number={program.number} />
              <div className="program-feature__copy">
                <p className="eyebrow">{invitations[program.accent]}</p><h3>{program.title}</h3>
                <p className="program-feature__description">{program.description}</p>
                <ul>{program.outcomes.map((outcome) => <li key={outcome}><Check size={15} strokeWidth={1.7} aria-hidden="true" />{outcome}</li>)}</ul>
                <Link href={`/programs/${program.slug}`} className="program-feature__link">Step into {program.shortTitle} <span><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
              </div>
            </Tabs.Panel>)}
          </div>
        </Tabs.Root>
        {globalYouthCircle.enabled && <Link className="program-showcase__next" href={globalYouthCircle.href}><span><Globe2 size={24} strokeWidth={1.25} aria-hidden="true" /><span><small>Something new is taking shape</small><strong>Global Youth Circle</strong></span></span><span className="program-showcase__next-label">Coming soon <ArrowUpRight size={19} aria-hidden="true" /></span></Link>}
      </Container>
    </section>
  );
}
