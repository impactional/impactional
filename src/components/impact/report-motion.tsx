"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

import { applyMotionAttribute } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ReportMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!root.current || !applyMotionAttribute()) return;

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        opacity: 0, y: 36, duration: .85, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 94%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
      const target = Number(element.dataset.count);
      const state = { value: 0 };
      gsap.to(state, {
        value: target, duration: 1.4, ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
        onUpdate: () => {
          const value = Math.round(state.value);
          const format = element.dataset.format;
          element.textContent = format === "currency" ? `≈$${value.toLocaleString("en-US")}`
            : format === "k" ? `${Math.round(value / (target >= 1_000_000 ? 1_000_000 : 1000))}${target >= 1_000_000 ? "M" : "K"}+`
            : `${value.toLocaleString("en-US")}+`;
        },
        onComplete: () => { element.textContent = element.dataset.final ?? element.textContent; },
      });
    });

    gsap.utils.toArray<SVGPathElement>("[data-draw-path]").forEach((path) => {
      const length = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
        strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut",
        scrollTrigger: { trigger: path.closest("section"), start: "top 65%", once: true },
      });
    });

    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    return () => { active = false; window.removeEventListener("load", refresh); };
  }, { scope: root });

  return <div className="impact-report" ref={root}>{children}</div>;
}
