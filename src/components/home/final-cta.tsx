import { ArrowRight, ArrowUpRight } from "lucide-react";

import { OrbitMark } from "@/components/brand/orbit-mark";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  return (
    <section className="final-cta" id="contact">
      <Container className="final-cta__inner">
        <div className="final-cta__orbit" data-reveal><OrbitMark id="final-orbit" /></div>
        <div className="final-cta__copy" data-reveal>
          <p className="eyebrow">Your move</p>
          <h2>Find your next<br /><em>opportunity.</em></h2>
          <p>
            Join a cohort, share your story, collaborate across borders, or help another young idea
            travel further.
          </p>
          <div>
            <ButtonLink href="https://linktr.ee/Impactional.org" target="_blank" rel="noreferrer" size="lg">
              See open opportunities <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="mailto:contact.impactional@gmail.com?subject=Partnership%20with%20Impactional" variant="outline" size="lg">
              Partner with us <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <Logo />
        <p>An international youth-led community creating a #GenerationOfChange.</p>
        <div className="footer__links">
          <a href="mailto:contact.impactional@gmail.com">Email</a>
          <a href="https://www.linkedin.com/company/impactional" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/impactional" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@impactional" target="_blank" rel="noreferrer">TikTok</a>
        </div>
        <div className="footer__legal"><span>© {new Date().getFullYear()} Impactional</span><a href="#top">Back to top ↑</a></div>
      </Container>
    </footer>
  );
}
