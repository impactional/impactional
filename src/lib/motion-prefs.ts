export type MotionMode = "on" | "off" | "system";

/** Motion runs by default. iOS Low Power Mode (and macOS Reduce Motion) flips
 *  `prefers-reduced-motion: reduce` on for the whole browser, which silently killed
 *  every scroll animation on the site. Readers opt out explicitly instead:
 *  `?motion=off` disables it, `?motion=system` follows the OS preference. */
export const DEFAULT_MOTION_MODE: MotionMode = "on";
export const MOTION_STORAGE_KEY = "impactional:motion";

export function parseMotionMode(value: string | null | undefined): MotionMode | null {
  if (value === "on" || value === "always") return "on";
  if (value === "off" || value === "reduce" || value === "reduced") return "off";
  if (value === "system" || value === "auto") return "system";
  return null;
}

export function readMotionMode(): MotionMode {
  if (typeof window === "undefined") return DEFAULT_MOTION_MODE;
  const fromQuery = parseMotionMode(new URLSearchParams(window.location.search).get("motion"));
  if (fromQuery) return fromQuery;
  try {
    const stored = parseMotionMode(window.localStorage.getItem(MOTION_STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // Storage can throw in private / embedded contexts — fall through to the default.
  }
  return DEFAULT_MOTION_MODE;
}

export function isMotionEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const mode = readMotionMode();
  if (mode !== "system") return mode === "on";
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Stamps `<html data-motion="on|off">` so CSS can gate marquees and parallax. */
export function applyMotionAttribute(enabled = isMotionEnabled()): boolean {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }
  return enabled;
}

/** Same resolution as above, inlined in <head> so the attribute lands before first paint. */
export const MOTION_BOOT_SCRIPT = `(function(){try{
var p=function(v){return v==="on"||v==="always"?"on":v==="off"||v==="reduce"||v==="reduced"?"off":v==="system"||v==="auto"?"system":null};
var m=p(new URLSearchParams(location.search).get("motion"));
if(!m){try{m=p(localStorage.getItem(${JSON.stringify(MOTION_STORAGE_KEY)}))}catch(e){}}
if(!m)m=${JSON.stringify(DEFAULT_MOTION_MODE)};
var on=m==="system"?!matchMedia("(prefers-reduced-motion: reduce)").matches:m==="on";
document.documentElement.dataset.motion=on?"on":"off";
}catch(e){document.documentElement.dataset.motion="on"}})();`;
