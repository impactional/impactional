import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { OrbitMark } from "@/components/brand/orbit-mark";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/content/home";

export function Hero() {
  return (
    <section className="hero" id="top" data-hero>
      <div className="hero__ambient" aria-hidden="true" />
      <div className="hero__dot-grid" aria-hidden="true" />
      <div className="hero__inner">
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
            We equip young people with the skills, networks, and opportunities to lead,
            collaborate, and create measurable impact in their communities.
          </p>
          <div className="hero__actions" data-hero-enter>
            <ButtonLink href="/programs" size="lg">
              Explore our programs <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/impact" variant="outline" size="lg">
              See our impact <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
          <dl className="hero__proof" data-hero-enter aria-label="Impactional at a glance">
            <div><dt>2,000+</dt><dd>Changemakers</dd></div>
            <div><dt>50+</dt><dd>Countries</dd></div>
            <div><dt>Since 2021</dt><dd>Youth-led</dd></div>
          </dl>
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
          sizes="(max-width: 1100px) 100vw, 58vw"
          className="hero__photo"
          data-hero-photo
        />
      </div>
    </section>
  );
}
