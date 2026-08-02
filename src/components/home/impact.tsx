import { Download } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { impactMetrics } from "@/content/home";

const formats = ["thousands", "compact", "plain", "k"] as const;

export function Impact() {
  return (
    <section className="impact section-anchor" id="impact">
      <Container>
        <header className="impact__header" data-reveal>
          <p className="eyebrow">03 — Impact report / 2021–2023</p>
          <h2>Proof that a ripple<br /><em>can travel.</em></h2>
          <p>
            Behind every number is a young person who entered a bigger conversation, found a
            collaborator, or carried a new idea home.
          </p>
        </header>

        <div className="impact__map" data-reveal>
          <svg viewBox="0 0 1100 520" fill="none" aria-hidden="true">
            <path className="impact__land" d="M130 159L202 115L270 129L331 104L374 139L447 148L473 193L446 231L373 225L338 271L281 254L245 302L201 281L177 225L123 209Z" />
            <path className="impact__land" d="M561 123L642 102L716 131L751 173L820 190L855 245L821 294L745 282L705 326L648 296L594 323L547 276L514 216Z" />
            <path className="impact__land" d="M793 334L852 317L914 353L933 403L882 431L817 416L778 376Z" />
            <path data-draw-path className="impact__route" d="M217 191C363 49 468 339 619 188C748 60 807 239 897 380" />
            <circle cx="217" cy="191" r="12" />
            <circle cx="619" cy="188" r="12" />
            <circle cx="897" cy="380" r="12" />
          </svg>
          <span className="impact__map-label impact__map-label--one">Jakarta</span>
          <span className="impact__map-label impact__map-label--two">Warsaw</span>
          <span className="impact__map-label impact__map-label--three">Across 50+ countries</span>
        </div>

        <div className="impact__metrics">
          {impactMetrics.map((metric, index) => (
            <article key={metric.label} className="metric" data-reveal>
              <strong data-count={metric.value} data-format={formats[index]}>{metric.display}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>

        <div className="impact__footer" data-reveal>
          <p>Measured with care. Shared to keep us accountable.</p>
          <ButtonLink
            href="https://impactional.wixsite.com/website"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            View impact report <Download aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
