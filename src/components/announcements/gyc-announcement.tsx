"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, CalendarDays, Globe2, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GycArtwork } from "@/components/announcements/gyc-artwork";
import { globalYouthCircle as gyc, GYC_AUTO_OPEN_DELAY, GYC_SESSION_KEY } from "@/content/global-youth-circle";

export function GycAnnouncement() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const eligible = gyc.enabled && !pathname.startsWith("/design-system") && pathname !== gyc.href;

  function markSeen() {
    shown.current = true;
    try { window.sessionStorage.setItem(GYC_SESSION_KEY, "1"); } catch { /* The in-memory flag also covers unavailable storage. */ }
  }

  function changeOpen(next: boolean) {
    if (next) markSeen();
    setOpen(next);
  }

  useEffect(() => {
    if (!eligible || shown.current) return;
    try { if (window.sessionStorage.getItem(GYC_SESSION_KEY)) return; } catch { /* Fall back to this mounted session. */ }
    const timer = window.setTimeout(() => {
      // Leave someone using another dialog, a form, or a video in their current flow.
      const active = document.activeElement;
      if (document.visibilityState === "hidden" || document.querySelector('[role="dialog"][aria-modal="true"], [data-user-video-active="true"]') || active?.matches("input, textarea, select, [contenteditable='true'], iframe")) return;
      shown.current = true;
      try { window.sessionStorage.setItem(GYC_SESSION_KEY, "1"); } catch { /* Fall back to this mounted session. */ }
      setOpen(true);
    }, GYC_AUTO_OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, [eligible, pathname]);

  if (!gyc.enabled || pathname.startsWith("/design-system")) return null;

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger ref={trigger} className="gyc-launcher" aria-label="Explore upcoming Global Youth Circle"><Sparkles size={18} aria-hidden="true" /><span><small>Coming soon</small>Global Youth Circle</span><ArrowUpRight size={17} aria-hidden="true" /></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="gyc-backdrop" />
        <Dialog.Popup className="gyc-popup" initialFocus={close} finalFocus={trigger} data-lenis-prevent>
          <Dialog.Close ref={close} className="gyc-popup__close" aria-label="Close Global Youth Circle announcement"><X size={20} aria-hidden="true" /></Dialog.Close>
          <GycArtwork compact />
          <div className="gyc-popup__copy">
            <p className="eyebrow"><span /> Upcoming / {gyc.parent}</p>
            <Dialog.Title className="gyc-popup__title">A new circle.<br /><em>A world of possibilities.</em></Dialog.Title>
            <p className="gyc-popup__name">{gyc.title}</p>
            <Dialog.Description className="gyc-popup__description">{gyc.description}</Dialog.Description>
            <div className="gyc-popup__facts"><span><Globe2 size={17} aria-hidden="true" />{gyc.format}</span><span><CalendarDays size={17} aria-hidden="true" />{gyc.registrationUrl ? "Registration information available" : "Schedule announcing soon"}</span></div>
            <Link className="button button--primary button--lg" href={gyc.href} onClick={() => setOpen(false)}>Explore Global Youth Circle <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Dialog.Close className="gyc-popup__later">I’ll explore later</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
