import { ArrowUpRight } from "lucide-react";

import { InteractiveCard } from "@/components/motion/interactive-card";
import { Container } from "@/components/ui/container";
import { programs } from "@/content/home";

export function Programs() {
  return (
    <section className="programs section-anchor" id="programs" data-programs>
      <Container className="programs__intro">
        <div>
          <p className="eyebrow">02 — Our programs</p>
          <h2>Four ways to<br /><em>start moving.</em></h2>
        </div>
        <p>
          Different starting points, one shared direction: building the agency, empathy, and
          international fluency to lead change where you are.
        </p>
      </Container>
      <div className="programs__viewport">
        <div className="programs__track" data-program-track>
          {programs.map((program) => (
            <InteractiveCard
              key={program.number}
              className={`program-card program-card--${program.accent}`}
            >
              <div className="program-card__topline">
                <span>{program.number}</span>
                <span>{program.shortTitle}</span>
              </div>
              <div className="program-card__orbit" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div className="program-card__content">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <a href={program.href} target="_blank" rel="noreferrer">
                  Discover the program <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
      <Container className="programs__progress" aria-hidden="true">
        <span><i /></span>
        <p>Scroll to explore</p>
      </Container>
    </section>
  );
}
