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
      <p className="network-preview__disclaimer">Demo profiles shown as layout placeholders. Approved identities and portraits will replace them.</p>
    </section>
  );
}
