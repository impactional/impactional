"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

import { applyMotionAttribute } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      if (!applyMotionAttribute()) {
        root.current.dataset.motion = "off";
        return;
      }

      root.current.dataset.motion = "on";
      const mm = gsap.matchMedia();
      const hero = root.current.querySelector<HTMLElement>("[data-hero]");
      const ambient = root.current.querySelector<HTMLElement>(".hero__ambient");
      const trackPointer = (event: PointerEvent) => {
        if (!ambient) return;
        const x = (event.clientX / window.innerWidth - 0.72) * 54;
        const y = (event.clientY / window.innerHeight - 0.25) * 42;
        gsap.to(ambient, { x, y, duration: 0.8, ease: "power3.out", overwrite: true });
      };
      if (window.matchMedia("(pointer: fine)").matches) hero?.addEventListener("pointermove", trackPointer);

      gsap.from("[data-hero-line]", {
        yPercent: 112,
        duration: 1.05,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.12,
      });
      gsap.from("[data-hero-enter]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.42,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 56,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<SVGPathElement>("[data-draw-path]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: path.closest("section") ?? path,
            start: "top 82%",
            end: "bottom 42%",
            scrub: 1,
          },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count);
        const format = element.dataset.format ?? "plain";
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
          onUpdate: () => {
            const rounded = Math.round(state.value);
            element.textContent =
              format === "currency"
                ? `≈$${new Intl.NumberFormat("en-US").format(rounded)}`
                : format === "thousands"
                ? `${new Intl.NumberFormat("en-US").format(rounded)}+`
                : format === "compact"
                  ? `${(rounded / 1000).toFixed(1)}k+`
                  : format === "k"
                    ? rounded >= 1000000
                      ? `${Math.round(rounded / 1000000)}M+`
                      : `${Math.round(rounded / 1000)}K+`
                    : String(rounded);
          },
          onComplete: () => {
            element.textContent = element.dataset.final ?? element.textContent;
          },
        });
      });

      mm.add("(min-width: 1101px)", () => {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "+=85%",
            scrub: 1,
          },
        });
        heroTimeline
          .to("[data-hero-photo]", { yPercent: 10, scale: 1.03, ease: "none" }, 0)
          .to("[data-hero-orbit]", { rotate: 42, scale: 1.12, ease: "none" }, 0)
          .to("[data-hero-copy]", { yPercent: -8, ease: "none" }, 0);

        const section = document.querySelector<HTMLElement>("[data-programs]");
        const track = document.querySelector<HTMLElement>("[data-program-track]");
        if (section && track) {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 112);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "bottom 28%",
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                section.style.setProperty("--program-progress", `${self.progress * 100}%`),
            },
          });
        }

        const spotlightImage = document.querySelector<HTMLElement>("[data-spotlight-image]");
        if (spotlightImage) {
          gsap.to(spotlightImage, {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: spotlightImage.closest("[data-spotlight]") ?? spotlightImage,
              start: "top 75%",
              end: "center 48%",
              scrub: 1,
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
          gsap.to(element, {
            yPercent: index % 2 === 0 ? -8 : 8,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.removeEventListener("load", refresh);
        hero?.removeEventListener("pointermove", trackPointer);
        mm.revert();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
