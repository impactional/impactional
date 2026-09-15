"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, Compass, Globe2, Handshake, Mail, Newspaper, Sparkles, Users, X, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { globalYouthCircle } from "@/content/global-youth-circle";
import { contact, siteNavigation } from "@/content/site";

const destinations: Record<string, { Icon: LucideIcon; caption: string; tone: string }> = {
  "/programs": { Icon: Compass, caption: "Find your pathway", tone: "pink" },
  "/impact": { Icon: Sparkles, caption: "See the difference", tone: "amber" },
  "/media": { Icon: Newspaper, caption: "Stories worth sharing", tone: "cream" },
  "/ambassadors": { Icon: Globe2, caption: "Meet the community", tone: "blue" },
  "/people": { Icon: Users, caption: "The minds behind it", tone: "mint" },
  "/partner": { Icon: Handshake, caption: "Make it happen together", tone: "cream" },
};

export function MobileNav() {
  const pathname = usePathname();
  return <MobileNavMenu key={pathname} pathname={pathname} />;
}

function MobileNavMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger ref={trigger} className="nav-trigger" aria-label="Open navigation">
        <span>Menu</span><span className="nav-trigger__lines" aria-hidden="true"><i /><i /></span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="nav-backdrop" />
        <Dialog.Popup className="nav-panel" initialFocus={close} finalFocus={trigger} data-lenis-prevent>
          <div className="nav-panel__header">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Impactional home"><Logo compact /></Link>
            <Dialog.Close ref={close} className="nav-panel__close" aria-label="Close navigation"><X size={19} aria-hidden="true" /></Dialog.Close>
          </div>
          <div className="nav-panel__body">
            <div className="nav-panel__intro">
              <p className="eyebrow">A little curiosity. A world of possibility.</p>
              <Dialog.Title>Where to <em>next?</em></Dialog.Title>
              <Dialog.Description className="sr-only">Explore Impactional’s programs, impact, stories, and community.</Dialog.Description>
            </div>
            <nav aria-label="Mobile navigation" className="nav-tiles">
              {siteNavigation.map((item) => {
                const { Icon, caption, tone } = destinations[item.href] ?? { Icon: Compass, caption: "Explore Impactional", tone: "cream" };
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return <Link key={item.href} href={item.href} className={`nav-tile nav-tile--${tone}`} aria-current={active ? pathname === item.href ? "page" : "location" : undefined} onClick={() => setOpen(false)}>
                  <span className="nav-tile__top"><Icon size={21} strokeWidth={1.5} aria-hidden="true" />{active ? <span className="nav-tile__current">You’re here</span> : <ArrowUpRight size={15} aria-hidden="true" />}</span>
                  <strong>{item.label}</strong><span className="nav-tile__caption">{caption}</span>
                </Link>;
              })}
            </nav>
            {globalYouthCircle.enabled && <Link className="nav-upcoming" href={globalYouthCircle.href} onClick={() => setOpen(false)}><span className="nav-upcoming__icon"><Globe2 size={29} strokeWidth={1} aria-hidden="true" /></span><span><small>Coming soon / SDG Impact Lab</small><strong>Global Youth Circle</strong></span><ArrowUpRight size={19} aria-hidden="true" /></Link>}
            <div className="nav-panel__footer"><span>Good things start<br />with a conversation.</span><a href={`mailto:${contact.email}`}><Mail size={16} aria-hidden="true" /> Say hello <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
