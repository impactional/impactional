"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { videos } from "@/content/media";

const video = videos[0];
const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";

/**
 * Fullwidth company-profile film, always muted.
 *
 * Loading and playback are deliberately split: the player is mounted (and so
 * buffers) well before the section arrives, then told to play the moment the
 * section is actually on screen. Mounting only on arrival made the video take
 * seconds to start; autoplaying on mount made it start long before anyone saw it.
 */
export function CompanyProfile() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadedRef = useRef(false);
  const wantsPlayRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  const command = useCallback((func: "playVideo" | "pauseVideo") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      PLAYER_ORIGIN,
    );
  }, []);

  // Mount the player early so it is buffered by the time the visitor gets here.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px 250% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Play only while the section is on screen; pause once it leaves.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        wantsPlayRef.current = entry.isIntersecting;
        if (!loadedRef.current) return;
        command(entry.isIntersecting ? "playVideo" : "pauseVideo");
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [mounted, command]);

  return (
    <section className="compro" id="company-profile" ref={sectionRef} aria-labelledby="compro-title">
      <Container className="compro__head" data-reveal>
        <p className="eyebrow">05 — Company profile</p>
        <h2 id="compro-title">See the work<br /><em>in motion.</em></h2>
      </Container>
      {/* The frame never animates: moving a cross-origin iframe fights the
          smooth-scroll loop and shows up as jitter. */}
      <div className="compro__frame">
        {mounted ? (
          <iframe
            ref={iframeRef}
            className="compro__video"
            src={`${PLAYER_ORIGIN}/embed/${video.id}?enablejsapi=1&autoplay=0&mute=1&controls=0&loop=1&playlist=${video.id}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              loadedRef.current = true;
              if (wantsPlayRef.current) command("playVideo");
            }}
          />
        ) : (
          <div className="compro__placeholder" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
