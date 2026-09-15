import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";

import communityPhoto from "@/assets/images/community-apu-small.jpg";
import workshopPhoto from "@/assets/images/workshop-small.jpg";
import parliamentPhoto from "@/assets/images/european-parliament.jpg";
import { ImpactNumbers } from "@/components/impact/impact-numbers";
import { ReportMotion } from "@/components/impact/report-motion";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { accolades, history, impactMetrics, programImpact, reportMeta } from "@/content/impact";
import { siteUrl } from "@/content/site";

const title = "Impact Report 2025–26 — Impactional";
const description = "Small actions. Extraordinary reach. Explore Impactional’s 2025–26 impact: 3M+ people reached online, a network across 50+ countries, and the programs behind the numbers.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: `${siteUrl}/impact` },
  openGraph: { title, description, url: `${siteUrl}/impact`, images: [{ url: workshopPhoto.src, width: workshopPhoto.width, height: workshopPhoto.height, alt: "Young people learning together at an Impactional workshop" }] },
};

export default function ImpactPage() {
  return (
    <SiteShell>
      <ReportMotion>
        <section className="report-hero">
          <Container className="report-hero__grid">
            <div className="report-hero__copy" data-reveal>
              <p className="eyebrow"><span aria-hidden="true" /> {reportMeta.title}</p>
              <h1>Small actions.<br /><em>Extraordinary</em><br />reach<span className="report-hero__period">.</span></h1>
              <p className="report-hero__lead">An idea moves from one person to the next. A conversation crosses a border. A community grows. This is the impact we’re creating, together.</p>
              <ButtonLink href="#report-numbers" variant="primary">Follow the ripple <ArrowDown size={18} aria-hidden="true" /></ButtonLink>
            </div>
            <div className="report-hero__collage" data-reveal>
              <svg className="report-hero__orbit" viewBox="0 0 600 650" fill="none" aria-hidden="true"><ellipse cx="300" cy="320" rx="280" ry="230" transform="rotate(-28 300 320)" /><ellipse cx="300" cy="320" rx="225" ry="295" transform="rotate(-28 300 320)" /></svg>
              <figure className="report-photo report-photo--workshop"><Image src={workshopPhoto} alt="Young people sharing a moment during a workshop" sizes="(max-width: 700px) 78vw, 440px" loading="eager" fetchPriority="high" /><figcaption>Big ideas begin with people.</figcaption></figure>
              <figure className="report-photo report-photo--community"><Image src={communityPhoto} alt="Impactional community gathered on the steps at APU" sizes="(max-width: 700px) 50vw, 270px" /><figcaption>And travel further, together.</figcaption></figure>
              <div className="report-hero__stamp"><span>Our ripple so far</span><strong>{impactMetrics[5].display}</strong><span>people reached<br />on social media</span></div>
              <span className="report-hero__spark" aria-hidden="true">✳</span>
              <span className="report-hero__handnote" aria-hidden="true">People. Purpose. Possibility.</span>
            </div>
          </Container>
          <Container className="report-hero__bottom"><span>Youth-led. Globally connected.</span><span>From 2021, with purpose <MoveUpRight size={16} aria-hidden="true" /></span></Container>
        </section>

        <nav className="report-index" aria-label="Inside the impact report"><Container>{[["01", "The numbers", "report-numbers"], ["02", "Beyond borders", "report-world"], ["03", "The programs", "report-programs"], ["04", "Our journey", "report-journey"]].map(([number, label, id]) => <a key={id} href={`#${id}`}><span>{number}</span>{label}<ArrowDown size={15} aria-hidden="true" /></a>)}</Container></nav>

        <section className="report-section report-numbers" id="report-numbers">
          <Container>
            <header className="report-heading" data-reveal><div><p className="eyebrow">01 / The bigger picture</p><h2>The ripple,<br /><em>in numbers.</em></h2></div><p>More conversations. More connections. More possibilities. A snapshot of what our community has made possible.</p></header>
            <ImpactNumbers />
          </Container>
        </section>

        <section className="report-world" id="report-world">
          <Container>
            <header className="report-heading" data-reveal><div><p className="eyebrow">02 / Beyond borders</p><h2>Local roots.<br /><em>A world of possibility.</em></h2></div><div className="report-world__stat"><strong>50<span>+</span></strong><span>countries connected by<br />{impactMetrics[4].display} changemakers</span></div></header>
            <div className="report-world__map" data-reveal>
              <svg viewBox="0 0 1100 520" fill="none" role="img" aria-label="Illustrative routes connecting Jakarta, Warsaw, New York, and Tokyo"><image href="/maps/world-mercator.svg" width="1100" height="520" /><path data-draw-path d="M824 293C772 158 686 98 604 117C508 140 433 185 360 162" /><path data-draw-path d="M824 293C851 235 880 198 909 179" />{[[824, 293], [604, 117], [360, 162], [909, 179]].map(([x, y]) => <g key={x}><circle className="report-world__halo" cx={x} cy={y} r="17" /><circle cx={x} cy={y} r="6" /></g>)}</svg>
              <span className="report-world__city report-world__city--jakarta">Jakarta ↗</span><span className="report-world__city report-world__city--warsaw">Warsaw</span><span className="report-world__city report-world__city--new-york">New York</span><span className="report-world__city report-world__city--tokyo">Tokyo</span>
            </div>
            <div className="report-world__footer"><p>A new perspective can start anywhere.<br /><strong>What matters is where we take it, together.</strong></p><span>{reportMeta.period} · Illustrative connections</span></div>
          </Container>
        </section>

        <section className="report-section" id="report-programs">
          <Container>
            <header className="report-heading" data-reveal><div><p className="eyebrow">03 / Where it happens</p><h2>Different pathways.<br /><em>Shared momentum.</em></h2></div><p>From the first conversation to a project with purpose, our programs give young people space to grow.</p></header>
            <div className="report-programs">{programImpact.map((program, index) => <article className={`report-program report-program--${index + 1}`} key={program.title} data-reveal><div className="report-program__top"><span>0{index + 1} / {reportMeta.period}</span><ArrowUpRight size={26} aria-hidden="true" /></div><h3><Link href={program.href}>{program.title}</Link></h3><div className="report-program__motif" aria-hidden="true">{index === 0 ? "◎" : index === 1 ? "✳" : "↗"}</div><strong>{program.stat}</strong><p>{program.detail}</p><Link className="report-program__link" href={program.href}>Explore the program <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">: {program.title}</span></Link></article>)}</div>
            <p className="report-section__note">Program outcomes from {reportMeta.sourceLabel}. Each program retains its own measures of participation and reach.</p>
          </Container>
        </section>

        <section className="report-journey report-section" id="report-journey">
          <Container>
            <header className="report-heading" data-reveal><div><p className="eyebrow">04 / How we got here</p><h2>It started with two.<br /><em>Look how far we’ve come.</em></h2></div><p>In February 2021, two exchange students imagined more accessible international opportunities. That idea kept moving.</p></header>
            <ol className="report-timeline">{history.map((event) => <li key={event.year} data-reveal><span className="report-timeline__year">{event.year}</span><span className="report-timeline__dot" aria-hidden="true" /><h3>{event.title}</h3><p>{event.description}</p></li>)}</ol>
          </Container>
        </section>

        <section className="report-landmarks report-section">
          <Container className="report-landmarks__grid">
            <figure data-reveal><Image src={parliamentPhoto} alt="Impactional representation inside the European Parliament chamber" sizes="(max-width: 800px) 100vw, 50vw" /><figcaption><span>From our journey</span>European Parliament</figcaption><span className="report-landmarks__spark" aria-hidden="true">✳</span></figure>
            <div data-reveal><p className="eyebrow">Young voices, global rooms</p><h2>We belong<br /><em>at the table.</em></h2><p className="report-landmarks__intro">Learning alongside others. Sharing our perspectives. Carrying those experiences home.</p><ul>{accolades.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}<ArrowUpRight size={17} aria-hidden="true" /></li>)}</ul></div>
          </Container>
        </section>

        <section className="report-next"><Container><p className="eyebrow">The next ripple starts with you</p><h2>There’s more<br /><em>we can do together.</em></h2><div><ButtonLink href="/programs" variant="primary">Find your pathway <ArrowUpRight aria-hidden="true" /></ButtonLink><ButtonLink href="/partner" variant="outline">Partner with us <ArrowUpRight aria-hidden="true" /></ButtonLink></div><p className="report-next__source">{reportMeta.sourceLabel} · Youth-led since 2021</p></Container></section>
      </ReportMotion>
    </SiteShell>
  );
}
