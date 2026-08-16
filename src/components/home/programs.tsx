"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { programs } from "@/content/programs";

export function Programs() {
  const [activeSlug, setActiveSlug] = useState(programs[0].slug);
  const active = programs.find((program) => program.slug === activeSlug) ?? programs[0];

  return (
    <section className="programs section-anchor" id="programs" data-programs>
      <Container>
        <div className="programs__intro">
          <div><p className="eyebrow">02 — Our programs</p><h2>Choose where you<br /><em>want to begin.</em></h2></div>
          <p>Four focused pathways for building skills, meeting collaborators, and moving an idea into action.</p>
        </div>

        <div className="programs__desktop">
          <div className="programs__index" role="tablist" aria-label="Choose a program">
            {programs.map((program) => (
              <button
                key={program.slug}
                type="button"
                role="tab"
                aria-selected={program.slug === active.slug}
                aria-controls="featured-program"
                onClick={() => setActiveSlug(program.slug)}
              >
                <span>{program.number}</span>
                <strong>{program.shortTitle}</strong>
              </button>
            ))}
          </div>

          <div className="programs__featured" id="featured-program" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.2, 0, 0.2, 1] }}
              >
                <div className="programs__featured-top"><span>Program {active.number}</span><span>{active.shortTitle}</span></div>
                <div className="programs__featured-copy">
                  <h3>{active.title}</h3>
                  <p>{active.description}</p>
                </div>
                <dl>
                  <div><dt>For</dt><dd>{active.audience}</dd></div>
                  <div><dt>Build</dt><dd>{active.outcomes[0]}</dd></div>
                </dl>
                <Link href={`/programs/${active.slug}`}>View program details →</Link>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className="programs__mobile">
          {programs.map((program) => (
            <article key={program.slug}>
              <span>{program.number} · {program.shortTitle}</span>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <Link href={`/programs/${program.slug}`}>View program →</Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
