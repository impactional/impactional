"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { useState } from "react";

import { peopleDivisions, personInitials, type Person, type PersonDivision } from "@/content/people";

function MemberCard({ person }: { person: Person }) {
  return <article className="directory-card" aria-labelledby={`${person.slug}-name`}>
    <Link href={`/people/${person.slug}`} className="directory-card__portrait" tabIndex={-1} aria-hidden="true">
      {person.portrait ? <Image src={person.portrait} alt="" fill sizes="(max-width: 560px) calc(100vw - 48px), (max-width: 1000px) 42vw, 26vw" style={{ objectPosition: person.portraitPosition ?? "50% 30%" }} /> : <span className="directory-card__initials">{personInitials(person)}</span>}
      <span className="directory-card__open"><ArrowUpRight size={20} aria-hidden="true" /></span>
      <span className="directory-card__role">{person.role}</span>
    </Link>
    <div className="directory-card__body">
      {person.team && <p className="directory-card__team">{person.team}</p>}
      <h3 id={`${person.slug}-name`}><Link href={`/people/${person.slug}`}>{person.name}</Link></h3>
      {person.location && <p className="directory-card__location"><MapPin size={13} aria-hidden="true" />{person.location}</p>}
      <Link className="directory-card__link" href={`/people/${person.slug}`} aria-label={`View ${person.name}'s profile`}>Get to know {person.nickname || person.name.split(" ")[0]} <ArrowUpRight size={15} aria-hidden="true" /></Link>
    </div>
  </article>;
}

export function MemberDirectory({ people }: { people: Person[] }) {
  const [division, setDivision] = useState<PersonDivision | "all">("all");
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const matchingPeople = people.filter((person) => {
    const label = peopleDivisions.find((entry) => entry.id === person.division)?.label;
    return (division === "all" || person.division === division)
      && [person.name, person.nickname, person.preferredName, person.role, person.team, person.location, label].join(" ").toLocaleLowerCase().includes(search);
  });
  const hasFilters = division !== "all" || query.length > 0;
  function clearFilters() { setDivision("all"); setQuery(""); }

  return <div className="people-directory">
    <header className="people-directory__top"><div><p className="eyebrow">Find a familiar face. Meet a new one.</p><h2>Our people<span>.</span></h2></div><label className="people-directory__search"><Search size={20} aria-hidden="true" /><span className="sr-only">Search members</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="A name, a division, a place…" /></label></header>
    <div className="people-directory__layout">
      <aside className="people-directory__sidebar"><p>Explore the divisions</p><div role="group" aria-label="Filter by division" className="people-directory__filters"><button type="button" aria-pressed={division === "all"} onClick={() => setDivision("all")}><span>Everyone</span><small>{people.length}</small></button>{peopleDivisions.map((entry) => <button key={entry.id} type="button" aria-pressed={division === entry.id} onClick={() => setDivision(entry.id)}><span>{entry.label}</span><small>{people.filter((person) => person.division === entry.id).length}</small></button>)}</div><div className="people-directory__sidebar-note" aria-hidden="true"><span>✳</span>Different strengths.<br />Better together.</div></aside>
      <div className="people-directory__results"><div className="people-directory__status"><p role="status" aria-live="polite">Showing <strong>{matchingPeople.length}</strong> of {people.length} people</p>{hasFilters && <button type="button" onClick={clearFilters}><X size={14} aria-hidden="true" /> Clear filters</button>}</div>
        {matchingPeople.length ? <div className="people-directory__groups">{peopleDivisions.map((entry, index) => {
          const members = matchingPeople.filter((person) => person.division === entry.id);
          if (!members.length) return null;
          return <section className={`directory-division directory-division--${entry.tone}`} key={entry.id} aria-labelledby={`division-${entry.id}`}><header><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`division-${entry.id}`}>{entry.label}</h2><small>{members.length} {members.length === 1 ? "person" : "people"}</small></header><div className="directory-grid">{members.map((person) => <MemberCard key={person.slug} person={person} />)}</div></section>;
        })}</div> : <div className="people-directory__empty"><Search size={34} strokeWidth={1} aria-hidden="true" /><h2>No members found</h2><p>Try another name, place, or division. Your people are here somewhere.</p><button type="button" onClick={clearFilters}>Show everyone <ArrowUpRight size={17} aria-hidden="true" /></button></div>}
      </div>
    </div>
  </div>;
}
