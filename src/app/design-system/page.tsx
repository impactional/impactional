import type { Metadata } from "next";

import { Logo } from "@/components/brand/logo";
import { OrbitMark } from "@/components/brand/orbit-mark";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Impactional Design System",
  robots: { index: false, follow: false },
};

const colors = [
  ["Ink", "#141414", "ink"],
  ["Magenta", "#E01483", "magenta"],
  ["Amber", "#E6AA33", "amber"],
  ["Ocean", "#007DBB", "ocean"],
  ["Mint", "#1CCEA4", "mint"],
  ["Canvas", "#F6F1E9", "canvas"],
] as const;

export default function DesignSystemPage() {
  return (
    <main className="ds">
      <header className="ds__hero">
        <Container>
          <div className="ds__topline"><Logo /><Badge tone="magenta">Internal reference · v1</Badge></div>
          <div className="ds__hero-grid">
            <div><p className="eyebrow">Generations in Motion</p><h1>Impactional<br /><em>Design System.</em></h1></div>
            <OrbitMark />
          </div>
          <p className="ds__lede">A disciplined foundation for a brand that should always feel curious, connected, and in motion.</p>
        </Container>
      </header>

      <Container className="ds__content">
        <section className="ds__section">
          <div className="ds__section-head"><span>01</span><div><h2>Brand foundations</h2><p>Primitive anchors feed semantic roles. Components never depend on a campaign color directly.</p></div></div>
          <div className="ds__swatches">
            {colors.map(([name, hex, token]) => <article key={name}><div style={{ background: hex }} /><strong>{name}</strong><code>--color-{token}</code><span>{hex}</span></article>)}
          </div>
        </section>

        <section className="ds__section">
          <div className="ds__section-head"><span>02</span><div><h2>Typography</h2><p>Brandey carries conviction. Montserrat keeps every interaction legible.</p></div></div>
          <div className="ds__type">
            <article><span>Display / Brandey 500</span><p className="ds__display">Move the world.</p></article>
            <article><span>Heading / Montserrat 700</span><h3>Young ideas deserve global rooms.</h3></article>
            <article><span>Body / Montserrat 400</span><p>We create the conditions for curiosity to become collaboration and for collaboration to become change.</p></article>
            <article><span>Accent / handwriting token</span><p className="hand-note">Across borders, together.</p></article>
          </div>
        </section>

        <section className="ds__section">
          <div className="ds__section-head"><span>03</span><div><h2>Interaction primitives</h2><p>Visible states, comfortable targets, and a consistent motion vocabulary.</p></div></div>
          <Card className="ds__component-card">
            <div className="ds__row"><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></div>
            <div className="ds__row"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button></div>
            <div className="ds__row"><Badge tone="magenta">Magenta</Badge><Badge tone="ocean">Ocean</Badge><Badge tone="mint">Mint</Badge><Badge tone="amber">Amber</Badge></div>
          </Card>
        </section>

        <section className="ds__section">
          <div className="ds__section-head"><span>04</span><div><h2>Motion recipe</h2><p>One owner per property: Lenis scroll, GSAP narrative, Motion interaction, CSS polish.</p></div></div>
          <div className="ds__motion-grid">
            {[['Fast','120ms','Hover and press'],['Standard','180ms','Component state'],['Deliberate','420ms','Section reveal'],['Cinematic','900ms','Narrative transition']].map(([name,value,use]) => <article key={name}><span className="ds__motion-dot" /><strong>{name}</strong><code>{value}</code><p>{use}</p></article>)}
          </div>
          <p className="ds__reduced">Reduced motion removes smooth scrolling, pins, scrubbed transforms, counters, marquees, and pointer tracking while preserving all content.</p>
        </section>

        <section className="ds__section ds__section--last">
          <div className="ds__section-head"><span>05</span><div><h2>Usage principles</h2><p>Keep the system expressive without making every surface compete for attention.</p></div></div>
          <div className="ds__principles"><Card><strong>01</strong><h3>Movement has meaning.</h3><p>Every transition should express connection, progression, or a change of perspective.</p></Card><Card><strong>02</strong><h3>People stay authentic.</h3><p>Generated artwork creates atmosphere; documentary proof always comes from real Impactional media.</p></Card><Card><strong>03</strong><h3>Clarity wins.</h3><p>Typography, focus, contrast, and content order remain dependable when motion disappears.</p></Card></div>
          <ButtonLink href="/" size="lg">View the landing page →</ButtonLink>
        </section>
      </Container>
    </main>
  );
}
