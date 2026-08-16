import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { CtaAdjuster } from "@/components/home/cta-adjuster";
import { contact } from "@/content/site";

export function FinalCta() {
  return <CtaAdjuster />;
}

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__brand">
          <Logo />
          <p>An international youth-led community creating a #GenerationOfChange.</p>
          <div className="footer__socials">
            <a href={`mailto:${contact.email}`}>Email</a>
            <a href={contact.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={contact.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={contact.socials.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <div>
            <strong>Explore</strong>
            <Link href="/programs">Programs</Link>
            <Link href="/impact">Impact</Link>
            <Link href="/media">Media</Link>
            <Link href="/ambassadors">Ambassadors</Link>
            <Link href="/people">People</Link>
          </div>
          <div>
            <strong>Get involved</strong>
            <a href={contact.opportunities} target="_blank" rel="noreferrer">Find a program</a>
            <Link href="/ambassadors">Become an ambassador</Link>
            <Link href="/partner">Partner with us</Link>
          </div>
          <div>
            <strong>About</strong>
            <Link href="/impact">Our impact</Link>
            <Link href="/people">Our people</Link>
            <a href={`mailto:${contact.email}`}>Contact</a>
          </div>
        </nav>
        <div className="footer__legal"><span>© {new Date().getFullYear()} Impactional</span><a href="#main-content">Back to top ↑</a></div>
      </Container>
    </footer>
  );
}
