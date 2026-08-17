"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { videos } from "@/content/media";

const video = videos[0];

/**
 * Fullwidth company-profile film. The iframe only mounts once the section is
 * approaching the viewport, so the video autoplays (always muted) right as the
 * visitor reaches it — and costs nothing before that.
 */
export function CompanyProfile() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      // Start from the beginning right as the section enters the viewport —
      // not earlier, so visitors don't arrive mid-video.
      { rootMargin: "0px 0px 12% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="compro" id="company-profile" ref={sectionRef} aria-labelledby="compro-title">
      <Container className="compro__head" data-reveal>
        <p className="eyebrow">05 — Company profile</p>
        <h2 id="compro-title">See the work<br /><em>in motion.</em></h2>
      </Container>
      {/* No reveal transform here: animating a cross-origin iframe makes it
          jitter against Lenis's fast scroll — the frame stays static. */}
      <div className="compro__frame">
        {active ? (
          <iframe
            className="compro__video"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="compro__placeholder" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
