import { RippleNetwork } from "@/components/home/ripple-network";
import { Container } from "@/components/ui/container";

const manifestoLead =
  "Change rarely starts with permission. It starts when someone young sees a gap and asks,".split(
    " ",
  );
const manifestoQuestion = "“what if we moved first?”".split(" ");

export function Mission() {
  return (
    <section className="mission section-anchor" id="mission">
      <Container className="mission__inner">
        <div className="mission__focus-stage" data-manifesto-stage>
          <div className="mission__index" data-reveal>
            <span>01</span>
            <p>Why we move</p>
          </div>
          <div className="mission__manifesto" data-reveal>
            <p aria-label="Change rarely starts with permission. It starts when someone young sees a gap and asks, what if we moved first?">
              {manifestoLead.map((word, index) => (
                <span data-manifesto-focus key={`${word}-${index}`} aria-hidden="true">
                  {word}{" "}
                </span>
              ))}
              <em aria-hidden="true">
                {manifestoQuestion.map((word, index) => (
                  <span data-manifesto-focus key={`${word}-${index}`}>
                    {word}{index < manifestoQuestion.length - 1 ? " " : ""}
                  </span>
                ))}
              </em>
            </p>
            <p className="mission__body">
              Founded in February 2021 by former exchange students Tatjana Syafira and Olga,
              Impactional began by equalizing access to international exposure. Today, it helps young
              people cross borders, practice intercultural collaboration, and turn shared knowledge
              into action in their own communities.
            </p>
          </div>
        </div>

        <RippleNetwork />
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
