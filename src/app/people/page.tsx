import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { PageMotion } from "@/components/editorial/page-motion";
import { EditorialCta } from "@/components/editorial/page-parts";
import { SiteShell } from "@/components/layout/site-shell";
import { MemberDirectory } from "@/components/people/member-directory";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { peopleDivisions, publishedPeople, type Person } from "@/content/people";

export const metadata: Metadata = {
  title: "The Minds Behind Impactional",
  description: "Meet the 31 people behind Impactional. Explore seven divisions, get to know the team, and read every member’s story in their own words.",
  alternates: { canonical: "/people" },
  openGraph: { title: "Different Minds. Shared Purpose. — Impactional", description: "Meet our members, explore their divisions, and read their stories.", url: "/people" },
};

const featuredPeople = peopleDivisions.map((division) => publishedPeople.find((person) => person.division === division.id && person.portrait)).filter((person): person is Person => Boolean(person)).slice(0, 6);

export default function PeoplePage() {
  return <SiteShell><PageMotion className="people-page">
    <section className="editorial-hero people-hero"><Container className="people-hero__grid"><div data-editorial-reveal><p className="eyebrow">Good people. Shared purpose.</p><h1>Different minds.<br /><em>One big heart.</em></h1><p className="editorial-hero__lead">The thinkers, makers, connectors, and quiet forces behind Impactional. Different stories brought us here. Creating change brings us together.</p><div className="editorial-hero__actions"><ButtonLink href="#meet-the-team">Meet the team <ArrowDown aria-hidden="true" /></ButtonLink><span className="people-hero__term">MEMBER INTRODUCTIONS / 26.2</span></div></div><div className="people-mosaic" data-editorial-reveal>{featuredPeople.map((person) => <Link href={`/people/${person.slug}`} className="people-mosaic__photo" key={person.slug} aria-label={`Meet ${person.name}`}><div><Image src={person.portrait!} alt={person.imageAlt ?? person.name} fill sizes="(max-width: 560px) 28vw, (max-width: 800px) 180px, 15vw" style={{ objectPosition: person.portraitPosition ?? "50% 30%" }} /></div><span>{person.nickname || person.name.split(" ")[0]} <ArrowUpRight size={12} aria-hidden="true" /></span></Link>)}<span className="people-mosaic__spark" aria-hidden="true">✳</span><span className="people-mosaic__note" aria-hidden="true">The best part? The people.</span></div></Container></section>
    <div className="people-census"><Container><p>Many perspectives.<br /><strong>One shared direction.</strong></p><div><strong>{publishedPeople.length}</strong><span>people making<br />things happen</span></div><div><strong>{peopleDivisions.length}</strong><span>divisions working<br />as one team</span></div><span aria-hidden="true">↘</span></Container></div>
    <section className="editorial-section people-directory-section" id="meet-the-team"><Container><MemberDirectory people={publishedPeople} /></Container></section>
    <EditorialCta eyebrow="A community is made of people" description="Explore the programs that bring our community together and discover where you might fit in." href="/programs" label="Explore our programs">Good things happen<br /><em>when we find each other.</em></EditorialCta>
  </PageMotion></SiteShell>;
}
