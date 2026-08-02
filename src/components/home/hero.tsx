import { ArrowRight, Globe2, Star, UsersRound } from "lucide-react";
import Image from "next/image";

import { OrbitMark } from "@/components/brand/orbit-mark";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/content/home";

export function Hero() {
  return (
    <section className="hero" id="top" data-hero>
      <div className="hero__ambient" aria-hidden="true" />
      <div className="hero__dot-grid" aria-hidden="true" />
      <div className="hero__copy" data-hero-copy>
        <p className="hero__eyebrow" data-hero-enter>
          Youth-led. Globally connected.
        </p>
        <h1>
          <span className="hero__line-wrap">
            <span data-hero-line>Building the next</span>
          </span>
          <span className="hero__line-wrap">
            <span data-hero-line>generation of</span>
          </span>
          <span className="hero__line-wrap hero__line-wrap--accent">
            <span data-hero-line>changemakers.</span>
          </span>
        </h1>
        <p className="hero__lede" data-hero-enter>
          We equip young people with the skills, networks, and opportunities they need to lead,
          collaborate, and create measurable impact in their communities and around the world.
        </p>
        <div className="hero__actions" data-hero-enter>
          <ButtonLink href="#programs" size="lg">
            Explore programs <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#contact" variant="outline" size="lg">
            Partner with us <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      <div className="hero__visual" data-hero-enter>
        <div className="hero__orbit" data-hero-orbit>
          <OrbitMark />
        </div>
        <div className="hero__wash" aria-hidden="true" />
        <Image
          src={media.hero}
          alt="A diverse group of young Impactional changemakers from around the world"
          fill
          priority
          loading="eager"
          sizes="(max-width: 900px) 100vw, 58vw"
          className="hero__photo"
          data-hero-photo
        />
        <div className="hero__chip hero__chip--leadership" data-hero-enter>
          <Star aria-hidden="true" /> <span>Leadership</span>
        </div>
        <div className="hero__chip hero__chip--community" data-hero-enter>
          <UsersRound aria-hidden="true" /> <span>Community</span>
        </div>
        <div className="hero__chip hero__chip--global" data-hero-enter>
          <Globe2 aria-hidden="true" /> <span>Global exposure</span>
        </div>
      </div>
    </section>
  );
}
