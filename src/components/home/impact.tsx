import { ArrowUpRight } from "lucide-react";

import { ImpactNumbers } from "@/components/impact/impact-numbers";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { reportMeta } from "@/content/impact";

export function Impact() {
  return (
    <section className="impact impact--editorial section-anchor" id="impact">
      <Container>
        <header className="impact__header" data-reveal>
          <p className="eyebrow">03 — {reportMeta.title}</p>
          <h2>Small actions.<br /><em>Extraordinary reach.</em></h2>
          <p>Behind every number is a young person who entered a bigger conversation, found a collaborator, or carried a new idea home.</p>
        </header>
        <ImpactNumbers />
        <div className="impact__footer" data-reveal>
          <p>Measured with care. Shared to keep us accountable.</p>
          <ButtonLink href="/impact" variant="secondary">Explore the impact <ArrowUpRight aria-hidden="true" /></ButtonLink>
        </div>
      </Container>
    </section>
  );
}
