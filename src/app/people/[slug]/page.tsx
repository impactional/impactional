import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Headphones, Heart, Mail, MapPin } from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { getPerson, peopleDivisions, personDivisionLabel, personInitials, publishedPeople } from "@/content/people";
import { personMetadata, personStructuredData, serializeStructuredData } from "@/lib/people-seo";

type ProfileProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPeople.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
  const person = getPerson((await params).slug);
  if (!person) notFound();
  return personMetadata(person);
}

export default async function MemberProfilePage({ params }: ProfileProps) {
  const person = getPerson((await params).slug);
  if (!person) notFound();
  const division = peopleDivisions.find((entry) => entry.id === person.division)!;
  const relatedPeople = publishedPeople.filter((entry) => entry.division === person.division && entry.slug !== person.slug).slice(0, 3);

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(personStructuredData(person)) }} />
      <article className={`member-profile member-profile--${division.tone}`}>
        <Container>
          <nav className="member-profile__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/people">People</Link><span aria-hidden="true">/</span><span aria-current="page">{person.name}</span>
          </nav>
          <div className="member-profile__hero">
            <div className="member-profile__visual">
              <div className="member-profile__photo">
                {person.portrait ? (
                  <Image src={person.portrait} alt={person.imageAlt ?? `Portrait of ${person.name}`} fill sizes="(max-width: 800px) calc(100vw - 64px), 440px" loading="eager" fetchPriority="high" style={{ objectPosition: person.portraitPosition ?? "50% 30%" }} />
                ) : <span className="member-profile__initials" role="img" aria-label={`Portrait not yet available for ${person.name}`}>{personInitials(person)}</span>}
              </div>
              <span className="member-profile__photo-note">One of the minds behind Impactional.</span>
              <span className="member-profile__spark" aria-hidden="true">✳</span>
            </div>
            <header className="member-profile__intro">
              <p className="eyebrow">{division.label}{person.team ? ` / ${person.team}` : ""}</p>
              <h1>{person.name}</h1>
              <p className="member-profile__role">{person.role}<span aria-hidden="true"> · </span>Term {person.term}</p>
              <p className="member-profile__nickname">You can call me <strong>{person.preferredName || person.nickname}</strong>.</p>
              {person.location && <p className="member-profile__location"><MapPin size={18} aria-hidden="true" />{person.location}</p>}
              {person.email && (
                <div className="member-profile__contact">
                  <span>Let’s connect</span>
                  <a href={`mailto:${person.email}`}><Mail size={20} aria-hidden="true" /><span>{person.email}</span><ArrowUpRight size={20} aria-hidden="true" /></a>
                </div>
              )}
            </header>
          </div>
        </Container>

        <Container className="member-profile__story">
          <div className="member-profile__story-heading"><p className="eyebrow">A little about me</p><h2>In my<br /><em>own words.</em></h2><span aria-hidden="true">“</span></div>
          <div className="member-profile__bio">{person.summary.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </Container>

        {(person.hobbies || person.favoriteMusic) && (
          <Container className="member-profile__interests">
            <h2>Beyond the work.</h2>
            <div>
              {person.hobbies && <section><Heart size={25} strokeWidth={1.5} aria-hidden="true" /><h3>What I do for fun</h3><p>{person.hobbies}</p></section>}
              {person.favoriteMusic && <section><Headphones size={25} strokeWidth={1.5} aria-hidden="true" /><h3>On my playlist</h3><p>{person.favoriteMusic}</p></section>}
            </div>
          </Container>
        )}

        <Container className="member-profile__related">
          <header><div><p className="eyebrow">Good people, shared purpose</p><h2>More from {personDivisionLabel(person)}.</h2></div><Link href="/people">Meet the whole team <ArrowUpRight size={18} aria-hidden="true" /></Link></header>
          <div className="member-profile__related-grid">{relatedPeople.map((entry) => (
            <Link className="member-profile__related-card" href={`/people/${entry.slug}`} key={entry.slug}>
              <div>{entry.portrait ? <Image src={entry.portrait} alt={`Portrait of ${entry.name}`} fill sizes="88px" style={{ objectPosition: entry.portraitPosition ?? "50% 30%" }} /> : <span aria-hidden="true">{personInitials(entry)}</span>}</div>
              <span><strong>{entry.name}</strong><small>{entry.role}</small></span><ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}</div>
          <Link className="member-profile__back" href="/people"><ArrowLeft size={17} aria-hidden="true" /> Back to all members</Link>
        </Container>
      </article>
    </SiteShell>
  );
}
