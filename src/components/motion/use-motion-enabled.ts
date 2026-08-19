"use client";

import { useEffect, useState } from "react";

import { isMotionEnabled } from "@/lib/motion-prefs";

/** Client-side motion gate. Starts optimistic (motion on) so it matches SSR output,
 *  then reconciles against `?motion=` / stored preference after hydration. */
export function useMotionEnabled(): boolean {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const sync = () => setEnabled(isMotionEnabled());
    sync();
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return enabled;
}
