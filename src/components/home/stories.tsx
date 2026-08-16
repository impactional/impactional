import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { publishedStories as stories } from "@/content/media";

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
        <header className="stories__header">
          <div><p className="eyebrow">04 — Stories in motion</p><h2>The work is clearer<br />when people tell it.</h2></div>
          <div><p>Short dispatches from young people moving between local action and global rooms.</p><a href="/media">View all stories →</a></div>
        </header>
        <div className="stories__grid">
          {stories.map((story, index) => (
            <article className={`story-card story-card--${index + 1}`} key={story.title} data-reveal>
              <a href={story.href} target="_blank" rel="noreferrer" aria-label={`Read: ${story.title}`}>
                <div className="story-card__image">
                  <Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 760px) 100vw, 38vw" />
                </div>
                <div className="story-card__meta"><span>{story.category}</span><span>{story.date}</span></div>
                <h3>{story.title}</h3>
                <span className="story-card__link">Read story <ArrowUpRight aria-hidden="true" /></span>
              </a>
            </article>
          ))}
        </div>

      </Container>
    </section>
  );
}
