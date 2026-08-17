import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { publishedStories } from "@/content/media";

const partners = ["Stanford University", "European Parliament", "AFS", "YES", "FLEX", "Universitas Gadjah Mada", "Future Skills"];

export function Stories() {
  const [featured, ...rest] = publishedStories;

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

      <Container className="news__inner">
        <header className="news__head" data-reveal>
          <div><p className="eyebrow">04 — Newsroom</p><h2>Fresh from<br /><em>the field.</em></h2></div>
          <div>
            <p>Short dispatches from young people moving between local action and global rooms.</p>
            <Link className="news__all" href="/media">View all stories <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </header>

        <div className="news__layout">
          <article className="news-feature" data-reveal>
            <a href={featured.href} target="_blank" rel="noreferrer" aria-label={`Read: ${featured.title}`}>
              <div className="news-feature__media">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
                <span className="news-feature__flag">Featured</span>
              </div>
              <div className="news-feature__meta">
                <span>{featured.category}</span>
                <span>{featured.date}</span>
              </div>
              <h3>{featured.title}</h3>
              <span className="news__read">
                Read story <ArrowUpRight aria-hidden="true" />
              </span>
            </a>
          </article>

          <div className="news__list">
            {rest.map((story) => (
              <article className="news-item" key={story.title} data-reveal>
                <a href={story.href} target="_blank" rel="noreferrer" aria-label={`Read: ${story.title}`}>
                  <div className="news-item__thumb">
                    <Image src={story.image} alt={story.imageAlt} fill sizes="160px" />
                  </div>
                  <div className="news-item__body">
                    <div className="news-item__meta">
                      <span>{story.category}</span>
                      <span>{story.date}</span>
                    </div>
                    <h3>{story.title}</h3>
                    <span className="news__read">
                      Read story <ArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </article>
            ))}
            <Link className="news__more" href="/media" data-reveal>
              <p>More voices, projects, and field notes from the network.</p>
              <span>
                Visit the newsroom <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
