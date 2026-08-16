import { Download } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { impactMetrics, reportMeta } from "@/content/impact";

export function Impact() {
  return (
    <section className="impact section-anchor" id="impact">
      <Container>
        <header className="impact__header" data-reveal>
          <p className="eyebrow">03 — {reportMeta.title}</p>
          <h2>Proof that a ripple<br /><em>can travel.</em></h2>
          <p>
            Behind every number is a young person who entered a bigger conversation, found a
            collaborator, or carried a new idea home.
          </p>
        </header>

        <div className="impact__map" data-reveal>
          <svg viewBox="0 0 1100 520" fill="none" aria-hidden="true">
            <image href="/maps/world-mercator.svg" x="0" y="0" width="1100" height="520" />
            <path data-draw-path className="impact__route" d="M824 293C772 158 686 98 604 117C508 140 433 185 360 162" />
            <path data-draw-path className="impact__route impact__route--short" d="M824 293C851 235 880 198 909 179" />
            <circle cx="824" cy="293" r="9" />
            <circle cx="604" cy="117" r="9" />
            <circle cx="360" cy="162" r="9" />
            <circle cx="909" cy="179" r="9" />
          </svg>
          <span className="impact__map-label impact__map-label--jakarta">Jakarta</span>
          <span className="impact__map-label impact__map-label--warsaw">Warsaw</span>
          <span className="impact__map-label impact__map-label--new-york">New York</span>
          <span className="impact__map-label impact__map-label--tokyo">Tokyo</span>
        </div>

        <div className="impact__metrics">
          {impactMetrics.map((metric) => (
            <article key={metric.label} className="metric" data-reveal>
              <strong data-count={metric.value} data-format={metric.format} data-final={metric.display}>{metric.display}</strong>
              <p>{metric.label}</p>
              <small>{metric.period}</small>
            </article>
          ))}
        </div>

        <div className="impact__footer" data-reveal>
          <p>Measured with care. Shared to keep us accountable.</p>
          <ButtonLink
            href="/impact"
            variant="secondary"
          >
            Explore the impact <Download aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
