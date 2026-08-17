import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { programs } from "@/content/programs";

export function Programs() {
  return (
    <section className="programs section-anchor" id="programs" data-programs>
      <Container>
        <div className="programs__intro">
          <div><p className="eyebrow">02 — Our programs</p><h2>Choose where you<br /><em>want to begin.</em></h2></div>
          <p>Four focused pathways for building skills, meeting collaborators, and moving an idea into action.</p>
        </div>

        <div className="programs__list">
          {programs.map((program) => (
            <Link
              key={program.slug}
              className={`program-row program-row--${program.accent}`}
              href={`/programs/${program.slug}`}
              data-reveal
            >
              <span className="program-row__number" aria-hidden="true">{program.number}</span>
              <span className="program-row__heading">
                <span className="program-row__tag">{program.shortTitle}</span>
                <h3>{program.title}</h3>
              </span>
              <p className="program-row__description">{program.description}</p>
              <span className="program-row__cta" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
