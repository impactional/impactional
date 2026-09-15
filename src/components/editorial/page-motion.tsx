"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

import { applyMotionAttribute } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current || !applyMotionAttribute()) return;
    gsap.utils.toArray<HTMLElement>("[data-editorial-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 32, opacity: 0, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 95%", once: true },
      });
    });
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    return () => { active = false; window.removeEventListener("load", refresh); };
  }, { scope: root });
  return <div className={`editorial-page ${className}`} ref={root}>{children}</div>;
}
