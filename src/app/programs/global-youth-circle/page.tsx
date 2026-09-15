import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Globe2, CalendarDays, MessageCircle, Sprout, Users } from "lucide-react";

import { GycArtwork } from "@/components/announcements/gyc-artwork";
import { PageMotion } from "@/components/editorial/page-motion";
import { EditorialCta, EditorialHeading } from "@/components/editorial/page-parts";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { globalYouthCircle as gyc } from "@/content/global-youth-circle";

export const metadata: Metadata = {
  title: "Global Youth Circle — Coming Soon | Impactional",
  description: gyc.description,
  alternates: { canonical: gyc.href },
  openGraph: { title: "Global Youth Circle — SDG Impact Lab", description: gyc.description, url: gyc.href },
};

const benefitIcons = [Users, MessageCircle, Sprout];

export default function GlobalYouthCirclePage() {
  return <SiteShell><PageMotion className="gyc-page">
    <section className="gyc-hero"><Container><Link className="editorial-link" href="/programs"><ArrowLeft size={17} aria-hidden="true" /> All programs</Link><div className="gyc-hero__grid"><div data-editorial-reveal><p className="eyebrow">Upcoming / {gyc.parent}</p><h1>Global<br /><em>Youth Circle.</em></h1><p className="editorial-hero__lead">{gyc.description}</p><div className="gyc-hero__facts"><span><Globe2 size={19} aria-hidden="true" />{gyc.format}</span><span><CalendarDays size={19} aria-hidden="true" />{gyc.status}</span></div><ButtonLink href="#gyc-experience">Step inside the circle <ArrowUpRight aria-hidden="true" /></ButtonLink><p className="gyc-hero__schedule">{gyc.scheduleLabel}</p></div><GycArtwork /></div></Container></section>
    <section className="editorial-section" id="gyc-experience"><Container><EditorialHeading eyebrow="The experience we’re building" description="Two online sessions, an in-person gathering in Jakarta, and a social project journey. Here’s the planned format.">Start with dialogue.<br /><em>Make room for action.</em></EditorialHeading><div className="gyc-sessions">{gyc.sessions.map((session) => <article key={session.number} data-editorial-reveal><div><span>{session.number}</span><small>{session.mode}</small></div><h3>{session.title}</h3><p>{session.description}</p></article>)}</div></Container></section>
    <section className="gyc-benefits editorial-section"><Container><EditorialHeading eyebrow="What you can take with you">New connections.<br /><em>A little more courage.</em></EditorialHeading><div>{gyc.benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <article key={benefit.title} data-editorial-reveal><Icon size={30} strokeWidth={1.3} aria-hidden="true" /><h3>{benefit.title}</h3><p>{benefit.description}</p></article>; })}</div></Container></section>
    <EditorialCta eyebrow="Be part of what comes next" description={gyc.registrationUrl ? "Explore the registration details and find your place in the circle." : "Interested in joining, connecting a student community, or collaborating? We’d love to hear from you while the next updates take shape."} href={gyc.registrationUrl || gyc.contactUrl} label={gyc.registrationUrl ? "View registration details" : "Ask about Global Youth Circle"}>A shared idea<br /><em>can go a long way.</em></EditorialCta>
  </PageMotion></SiteShell>;
}
