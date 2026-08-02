import { ArrowUpRight, Quote } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { media } from "@/content/home";

export function Spotlight() {
  return (
    <section className="spotlight" data-spotlight>
      <Container className="spotlight__inner">
        <div className="spotlight__image-wrap" data-reveal>
          <Image
            src={media.spotlight}
            alt="Joshua Steib speaking at Youth4Climate in Milan"
            fill
            sizes="(max-width: 760px) 100vw, 46vw"
            className="spotlight__image"
            data-spotlight-image
          />
          <Badge tone="mint" className="spotlight__badge">Changemaker of the month</Badge>
        </div>
        <div className="spotlight__copy" data-reveal>
          <Quote aria-hidden="true" />
          <blockquote>
            “Take action and find like-minded spirits. No matter how small the step may seem,
            together we can rewrite a better future.”
          </blockquote>
          <div>
            <p><strong>Joshua Steib</strong><span>Climate activist, Germany</span></p>
            <a
              href="https://www.impactional.org/post/changemaker-of-the-month-joshua-steib-saving-the-planet-through-the-power-of-diplomacy"
              target="_blank"
              rel="noreferrer"
            >
              Read Joshua’s story <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
