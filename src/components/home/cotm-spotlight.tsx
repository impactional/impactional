"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin, Sparkles, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useMotionEnabled } from "@/components/motion/use-motion-enabled";
import { Container } from "@/components/ui/container";
import { cotmEntries } from "@/content/cotm";
import { contact } from "@/content/site";

export function CotmSpotlight() {
  const [activeIndex, setActiveIndex] = useState(1);
  const reduceMotion = !useMotionEnabled();
  const active = cotmEntries[activeIndex];

  const selectRelative = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + cotmEntries.length) % cotmEntries.length);
  };

  return (
    <section className="cotm" id="changemaker-of-the-month" aria-labelledby="cotm-title">
      <Container>
        <header className="cotm__header">
          <div>
            <p className="eyebrow">06 — Monthly spotlight</p>
            <h2 id="cotm-title">Changemaker<br /><em>of the</em> month.</h2>
          </div>
          <p>Every month, we celebrate a young leader whose ideas and actions are creating tangible change. Explore July and August—or step into September&apos;s open spotlight.</p>
        </header>

        <div className="cotm__viewport" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              className={`cotm__slide${active.upcoming ? " cotm__slide--open" : ""}`}
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cotm__visual">
                {active.image ? (
                  <Image src={active.image} alt={active.imageAlt} fill sizes="(max-width: 900px) 100vw, 52vw" priority={active.id === "august"} />
                ) : (
                  <div className="cotm__silhouette" role="img" aria-label={active.imageAlt}>
                    <UserRound aria-hidden="true" />
                    <span>YOUR<br />PHOTO</span>
                  </div>
                )}
                <span className="cotm__tape" aria-hidden="true">YOUTH-LED. COMMUNITY-ROOTED.</span>
                <span className="cotm__location"><MapPin aria-hidden="true" /> {active.location}</span>
              </div>

              <div className="cotm__copy">
                <p className="cotm__month">{active.month}</p>
                <h3>{active.name}</h3>
                <p className="cotm__role">{active.role}<span aria-hidden="true">•</span>{active.location}</p>
                <p className="cotm__story">{active.story}</p>

                {active.stats.length ? (
                  <dl className="cotm__stats">
                    {active.stats.map((stat) => <div key={stat.label}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}
                  </dl>
                ) : null}

                <blockquote><Sparkles aria-hidden="true" /><p>“{active.quote}”</p></blockquote>

                {active.upcoming ? (
                  <a className="button button--primary button--lg" href={contact.opportunities} target="_blank" rel="noreferrer">Apply for COTM <ArrowRight aria-hidden="true" /></a>
                ) : (
                  <a className="cotm__story-link" href="/media">Read {active.name.split(" ")[0]}&apos;s story <ArrowRight aria-hidden="true" /></a>
                )}
                <small>Demo profile · visual for layout preview</small>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <nav className="cotm__navigation" aria-label="Changemaker months">
          <button type="button" onClick={() => selectRelative(-1)} aria-label="Previous month"><ArrowLeft aria-hidden="true" /></button>
          <div>
            {cotmEntries.map((entry, index) => (
              <button className={index === activeIndex ? "is-active" : ""} type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? "true" : undefined} key={entry.id}>
                <span>{entry.image ? <Image src={entry.image} alt="" fill sizes="54px" /> : <UserRound aria-hidden="true" />}</span>
                <strong>{entry.month}</strong>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => selectRelative(1)} aria-label="Next month"><ArrowRight aria-hidden="true" /></button>
        </nav>
      </Container>
    </section>
  );
}
