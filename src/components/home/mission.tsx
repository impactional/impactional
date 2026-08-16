import { RippleNetwork } from "@/components/home/ripple-network";
import { Container } from "@/components/ui/container";

export function Mission() {
  return (
    <section className="mission section-anchor" id="mission">
      <Container className="mission__inner">
        <RippleNetwork />

        <div className="mission__intro" data-reveal>
          <div className="mission__index">
            <span>01</span>
            <p>Why we move</p>
          </div>
          <p className="mission__body">
            Founded in February 2021 by former exchange students Tatjana Syafira and Olga,
            Impactional began by equalizing access to international exposure. Today, it helps young
            people cross borders, practice intercultural collaboration, and turn shared knowledge
            into action in their own communities.
          </p>
        </div>
      </Container>
      <svg className="mission__path" viewBox="0 0 1440 520" fill="none" aria-hidden="true">
        <path
          data-draw-path
          d="M-60 384C102 114 290 496 474 266C654 40 802 420 1008 189C1168 10 1292 76 1502 246"
        />
        <circle cx="235" cy="327" r="8" />
        <circle cx="653" cy="214" r="8" />
        <circle cx="1054" cy="145" r="8" />
        <circle cx="1348" cy="153" r="8" />
      </svg>
    </section>
  );
}
