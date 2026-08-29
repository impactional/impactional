import Image from "next/image";
import Link from "next/link";

import doodleBird from "@/assets/illustrations/doodle-bird.svg";
import doodleFlower from "@/assets/illustrations/doodle-flower-bloom.svg";
import doodleLeaves from "@/assets/illustrations/doodle-leaves.svg";
import { Container } from "@/components/ui/container";

type PreviewCard = {
  name: string;
  role: string;
  location: string;
  initials: string;
  tone: "pink" | "blue" | "mint" | "amber";
};

type LogoCard = {
  name: string;
  logo: string;
}

// Placeholder identities only; replace with consent-approved HR and Ambassador records.
const memberCards: PreviewCard[] = [
  { name: "Rafi Pranata", role: "Programs", location: "Indonesia", initials: "RP", tone: "pink" },
  { name: "Lea Martin", role: "Partnerships", location: "France", initials: "LM", tone: "blue" },
  { name: "Nadia Putri", role: "Creative", location: "Indonesia", initials: "NP", tone: "mint" },
  { name: "Diego Morales", role: "Community", location: "Spain", initials: "DM", tone: "amber" },
];

const ambassadorCards: PreviewCard[] = [
  { name: "Aisha Noor", role: "Global Ambassador", location: "Kenya", initials: "AN", tone: "mint" },
  { name: "Sofia Alvarez", role: "Global Ambassador", location: "Brazil", initials: "SA", tone: "pink" },
  { name: "Mina Park", role: "Global Ambassador", location: "South Korea", initials: "MP", tone: "blue" },
  { name: "Jonas Weber", role: "Global Ambassador", location: "Germany", initials: "JW", tone: "amber" },
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

function ProfileCard({ card }: { card: PreviewCard }) {
  return (
    <article className="network-person-card">
      <span className="network-person-card__tape" aria-hidden="true" />
      <div className={`network-person-card__placeholder network-person-card__placeholder--${card.tone}`} role="img" aria-label={`Portrait placeholder for ${card.name}`}>
        <span>{card.initials}</span>
        <small>Photo pending</small>
      </div>
      <h4>{card.name}</h4>
      <p>{card.role}</p>
      <span>{card.location}</span>
    </article>
  );
}

function Marquee({ cards, reverse = false }: { cards: PreviewCard[]; reverse?: boolean }) {
  return (
    <div className={`network-marquee${reverse ? " network-marquee--reverse" : ""}`}>
      <div className="network-marquee__track">
        {[0, 1].map((set) => (
          <div className="network-marquee__set" aria-hidden={set === 1 ? "true" : undefined} key={set}>
            {cards.map((card) => <ProfileCard card={card} key={`${set}-${card.name}`} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoCard({ card }: { card: LogoCard }) {
  return (
    // <article className="relative flex w-40 shrink-0 flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
    //   <span
    //     aria-hidden="true"
    //     className="absolute -top-2 left-1/2 h-5 w-10 -translate-x-1/2 -rotate-2 rounded-sm bg-amber-200/70"
    //   />
    //   <div
    //     role="img"
    //     aria-label={`Logo placeholder for ${card.name}`}
    //     className="flex h-[120px] w-[120px] items-center justify-center "
    //   >
        <Image src={card.logo} alt="" width={120} height={120} className="h-full w-full object-contain" />
    //   </div>
    //   <h4 className="text-center text-sm font-medium text-neutral-700">{card.name}</h4>
    // </article>
  );
}

function MarqueeLogos({ cards }: { cards: LogoCard[] }) {
  const REPEAT = 4; // ponytail: enough copies to outrun wide viewports
  const looped = Array.from({ length: REPEAT }, () => cards).flat();

  return (
    <div className="relative overflow-hidden">
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
        .logo-marquee-track:hover {
          animation-play-state: paused;
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
            <div><dt>42</dt><dd>members</dd></div>
            <div><dt>17</dt><dd>countries</dd></div>
            <div><dt>4</dt><dd>continents</dd></div>
          </dl>
        </div>
      </Container>

      <Container className="network-preview__columns">
        <section className="network-column" aria-labelledby="member-column-title">
          <header className="network-column__header">
            <span>01</span>
            <div><p>Founders, board, staff & alumni</p><h3 id="member-column-title">Members</h3></div>
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
            <div><p>The contributor of our agenda</p><h3 id="ambassador-column-title">Partnership</h3></div>
            <Link href="/ambassadors">Who we are worked with →</Link>
          </header>
          <MarqueeLogos cards={logosCards} />
        </section>
      </Container>

      <p className="network-preview__disclaimer">Demo profiles shown as layout placeholders. Approved identities and portraits will replace them.</p>
    </section>


  );
}