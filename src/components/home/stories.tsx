import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { media, stories } from "@/content/home";

const partners = ["Stanford University", "European Parliament", "AFS", "YES", "FLEX", "Universitas Gadjah Mada", "Future Skills"];

export function Stories() {
  return (
    <section className="stories section-anchor" id="stories">
      <div className="partners" aria-label="Partners and network" data-reveal>
        <p>Connected through</p>
        <div className="partners__marquee">
          <div>
            {[...partners, ...partners].map((partner, index) => <span key={`${partner}-${index}`}>{partner}</span>)}
          </div>
        </div>
      </div>

      <Container className="stories__inner">
        <SectionHeader
          eyebrow="04 — Stories in motion"
          title="The people behind the progress."
          description="Dispatches from young people moving between local action and global rooms."
        />
        <div className="stories__grid">
          {stories.map((story, index) => (
            <article className={`story-card story-card--${index + 1}`} key={story.title} data-reveal>
              <a href={story.href} target="_blank" rel="noreferrer" aria-label={`Read: ${story.title}`}>
                <div className="story-card__image" data-parallax>
                  <Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 760px) 100vw, 38vw" />
                </div>
                <div className="story-card__meta"><span>{story.category}</span><span>{story.date}</span></div>
                <h3>{story.title}</h3>
                <span className="story-card__link">Read story <ArrowUpRight aria-hidden="true" /></span>
              </a>
            </article>
          ))}
        </div>

        <div className="gallery" aria-label="Impactional gallery">
          <figure className="gallery__wide" data-reveal>
            <Image src={media.workshop} alt="Young participants exchanging ideas in a workshop" fill sizes="70vw" />
          </figure>
          <figure className="gallery__portrait" data-reveal>
            <Image src={media.parliament} alt="An Impactional leader visiting the European Parliament" fill sizes="30vw" />
          </figure>
          <p className="gallery__caption hand-note">Ideas become<br />rooms full of people.</p>
        </div>
      </Container>
    </section>
  );
}
