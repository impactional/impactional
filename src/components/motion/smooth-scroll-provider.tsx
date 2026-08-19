"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { applyMotionAttribute } from "@/lib/motion-prefs";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEnabled(applyMotionAttribute() && window.matchMedia("(pointer: fine)").matches);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    const lenis = lenisRef.current?.lenis;
    const refresh = () => ScrollTrigger.update();

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis?.on("scroll", refresh);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", refresh);
    };
  }, [enabled]);

  return (
    <>
      {enabled ? (
        <ReactLenis
          root
          ref={lenisRef}
          options={{
            autoRaf: false,
            anchors: { offset: -92 },
            duration: 1.05,
            smoothWheel: true,
            syncTouch: false,
          }}
        />
      ) : null}
      {children}
    </>
  );
}
