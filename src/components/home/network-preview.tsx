import Image from "next/image";
import Link from "next/link";

import doodleBird from "@/assets/illustrations/doodle-bird.svg";
import doodleFlower from "@/assets/illustrations/doodle-flower-bloom.svg";
import doodleLeaves from "@/assets/illustrations/doodle-leaves.svg";
import { Container } from "@/components/ui/container";
import { peopleDivisions, personDivisionLabel, personInitials, publishedPeople, type Person } from "@/content/people";

type PreviewCard = {
  name: string;
  role: string;
  detail: string;
  href?: string;
  initials: string;
  portrait?: string;
  imageAlt?: string;
  portraitPosition?: string;
  tone: "pink" | "blue" | "mint" | "amber";
};

type LogoCard = {
  name: string;
  logo: string;
};

// Give every division a place in the preview, using the same roster as /people.
const memberCards: PreviewCard[] = peopleDivisions
  .map((division) => publishedPeople.find((person) => person.division === division.id && person.portrait))
  .filter((person): person is Person => Boolean(person))
  .map((person) => ({
    name: person.name,
    role: person.role,
    detail: personDivisionLabel(person),
    href: `/people/${person.slug}`,
    initials: personInitials(person),
    portrait: person.portrait,
    imageAlt: person.imageAlt,
    portraitPosition: person.portraitPosition,
    tone: peopleDivisions.find((division) => division.id === person.division)?.tone ?? "pink",
  }));

const ambassadorCards: PreviewCard[] = [
  { name: "Aisha Noor", role: "Global Ambassador", detail: "Kenya", initials: "AN", tone: "mint" },
  { name: "Sofia Alvarez", role: "Global Ambassador", detail: "Brazil", initials: "SA", tone: "pink" },
  { name: "Mina Park", role: "Global Ambassador", detail: "South Korea", initials: "MP", tone: "blue" },
  { name: "Jonas Weber", role: "Global Ambassador", detail: "Germany", initials: "JW", tone: "amber" },
];

const logosCards: LogoCard[] = [
  { name: "ASEAN", logo: "/assets/partnership/ASEAN.png" },
  { name: "AFS", logo: "/assets/partnership/AFS.png" },
  { name: "America", logo: "/assets/partnership/america.png" },
  { name: "Commission Européenne", logo: "/assets/partnership/Commission Européenne.png" },
  { name: "European Parliament", logo: "/assets/partnership/European Parliament.png" },
  { name: "Future Skills", logo: "/assets/partnership/Future Skills.png" },
  { name: "Indonesian_s Royal Thai Embassy", logo: "/assets/partnership/Indonesian_s Royal Thai Embassy.png" },
  { name: "International Student Festival in Trondheim", logo: "/assets/partnership/International Student Festival in Trondheim.png" },
  { name: "KBRI Tokyo", logo: "/assets/partnership/KBRI Tokyo.png" },
  { name: "Pijar Foundation", logo: "/assets/partnership/Pijar Foundation.png" },
  { name: "PPI Ankara", logo: "/assets/partnership/PPI Ankara.png" },
  { name: "PPI Australia", logo: "/assets/partnership/PPI Australia.png" },
  { name: "PPI Victoria", logo: "/assets/partnership/PPI Victoria.png" },
  { name: "Ritsumeikan Asia Pacific University", logo: "/assets/partnership/Ritsumeikan Asia Pacific University.png" },
  { name: "Sasakawa Peace Foundation", logo: "/assets/partnership/Sasakawa Peace Foundation.png" },
  { name: "Stanford University", logo: "/assets/partnership/Stanford University.png" },
  { name: "The Nippon Foundation", logo: "/assets/partnership/The Nippon Foundation.png" },
  { name: "UNAI", logo: "/assets/partnership/UNAI.png" },
  { name: "Universitas Gadjah Mada", logo: "/assets/partnership/Universitas Gadjah Mada.png" },
  { name: "We Are Together Prize", logo: "/assets/partnership/We Are Together Prize.png" },
  { name: "World Youth Festival Russia", logo: "/assets/partnership/World Youth Festival Russia.png" },
  { name: "WYFF", logo: "/assets/partnership/WYFF.png" },
  { name: "YES", logo: "/assets/partnership/YES.png" },
  { name: "Youth Ranger Indonesia", logo: "/assets/partnership/Youth Ranger Indonesia.png" },
];

function ProfileCard({ card, duplicate = false }: { card: PreviewCard; duplicate?: boolean }) {
  return (
    <article className="network-person-card">
      <span className="network-person-card__tape" aria-hidden="true" />
      {card.portrait ? (
        <div className="network-person-card__portrait">
          <Image src={card.portrait} alt={card.imageAlt ?? `Portrait of ${card.name}`} fill sizes="194px" style={{ objectPosition: card.portraitPosition ?? "50% 30%" }} />
        </div>
      ) : <div className={`network-person-card__placeholder network-person-card__placeholder--${card.tone}`} role="img" aria-label={`Portrait placeholder for ${card.name}`}>
        <span>{card.initials}</span>
        <small>Photo pending</small>
      </div>}
      <h4>{card.href ? <Link href={card.href} tabIndex={duplicate ? -1 : undefined}>{card.name}</Link> : card.name}</h4>
      <p>{card.role}</p>
      <span>{card.detail}</span>
    </article>
  );
}

function Marquee({ cards, reverse = false }: { cards: PreviewCard[]; reverse?: boolean }) {
  return (
    <div className={`network-marquee${reverse ? " network-marquee--reverse" : ""}`}>
      <div className="network-marquee__track">
        {[0, 1].map((set) => (
          <div className="network-marquee__set" aria-hidden={set === 1 ? "true" : undefined} key={set}>
            {cards.map((card) => <ProfileCard card={card} duplicate={set === 1} key={`${set}-${card.name}`} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoCard({ card }: { card: LogoCard }) {
  return (
    <div className="flex h-24 w-40 items-center justify-center">
      <Image src={card.logo} alt={card.name} width={160} height={96} sizes="160px" className="h-full w-full object-contain" />
    </div>
  );
}

function MarqueeLogos({ cards }: { cards: LogoCard[] }) {
  const REPEAT = 4; // Keep a full sequence on both sides of the visible loop.
  const looped = Array.from({ length: REPEAT }, () => cards).flat();

  return (
    <div className="logo-marquee relative overflow-hidden" role="region" aria-label="Partner organizations" tabIndex={0}>
      <div className="logo-marquee-track flex w-max">
        {looped.map((card, i) => (
          <div className="mr-6 shrink-0" aria-hidden={i >= cards.length ? "true" : undefined} key={i}>
            <LogoCard card={card} />
          </div>
        ))}
      </div>
      <style>{`
        .logo-marquee-track {
          animation: marquee-scroll 60s linear infinite;
          animation-delay: 2s;
          animation-fill-mode: backwards;
        }
        .logo-marquee:hover .logo-marquee-track,
        .logo-marquee:focus-within .logo-marquee-track {
          animation-play-state: paused;
        }
        [data-motion="off"] .logo-marquee-track { animation: none; transform: none; }
        [data-motion="off"] .logo-marquee { overflow-x: auto; }
        [data-motion="off"] .logo-marquee-track > [aria-hidden="true"] { display: none; }
        @media (prefers-reduced-motion: reduce) {
          html:not([data-motion]) .logo-marquee-track { animation: none; }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(-37.5%); }
          to { transform: translateX(-12.5%); }
        }
      `}</style>
    </div>
  );
}


export function NetworkPreview() {
  return (
    <section className="network-preview" aria-labelledby="network-preview-title">
      <Image className="network-preview__doodle network-preview__doodle--bird" src={doodleBird} alt="" aria-hidden="true" />
      <Image className="network-preview__doodle network-preview__doodle--flower" src={doodleFlower} alt="" aria-hidden="true" />
      <Image className="network-preview__doodle network-preview__doodle--leaves" src={doodleLeaves} alt="" aria-hidden="true" />

      <Container className="network-preview__intro">
        <div className="network-preview__headline" data-reveal>
          <p className="eyebrow">07 — The network</p>
          <h2 id="network-preview-title">Meet the people<br /><em>behind it.</em></h2>
        </div>
        <div className="network-preview__summary" data-reveal>
          <p>Meet the members building every program behind the scenes and the ambassadors carrying ideas between countries.</p>
          <dl>
            <div><dt>{publishedPeople.length}</dt><dd>members</dd></div>
            <div><dt>{peopleDivisions.length}</dt><dd>divisions</dd></div>
          </dl>
        </div>
      </Container>

      <Container className="network-preview__columns">
        <section className="network-column" aria-labelledby="member-column-title">
          <header className="network-column__header">
            <span>01</span>
            <div><p>The people behind every division</p><h3 id="member-column-title">Members</h3></div>
            <Link href="/people">Meet the team →</Link>
          </header>
          <Marquee cards={memberCards} />
        </section>

        <section className="network-column network-column--ambassadors" aria-labelledby="ambassador-column-title">
          <header className="network-column__header">
            <span>02</span>
            <div><p>Across terms and borders</p><h3 id="ambassador-column-title">Global Ambassadors</h3></div>
            <Link href="/ambassadors">Explore ambassadors →</Link>
          </header>
          <Marquee cards={ambassadorCards} reverse />
        </section>
      </Container>

      <Container className="mt-[clamp(80px,8vw,120px)] grid gap-[clamp(28px,4vw,62px)]">
        <section className="network-column network-column--logos" aria-labelledby="logo-column-title">
          <header className="network-column__header">
            <span>03</span>
            <div><p>The contributors to our work</p><h3 id="logo-column-title">Partnerships</h3></div>
            <Link href="/partner">Partner with us →</Link>
          </header>
          <MarqueeLogos cards={logosCards} />
        </section>
      </Container>

      <p className="network-preview__disclaimer">Global Ambassador profiles are placeholders while introductions are being prepared.</p>
    </section>


  );
}
