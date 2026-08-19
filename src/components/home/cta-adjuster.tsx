"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import ctaClouds from "@/assets/illustrations/cta-clouds-new.svg";
import ctaPaperAirplane from "@/assets/illustrations/cta-paper-airplane.png";
import doodleBird from "@/assets/illustrations/doodle-bird.svg";
import doodleBotanical from "@/assets/illustrations/doodle-botanical.svg";
import doodleFlowerBloom from "@/assets/illustrations/doodle-flower-bloom.svg";
import doodleFlowerFour from "@/assets/illustrations/doodle-flower-four.svg";
import doodleLeaves from "@/assets/illustrations/doodle-leaves.svg";
import doodleSun from "@/assets/illustrations/doodle-sun.svg";
import ctaPersonLeft from "@/assets/images/cta-person-left.png";
import ctaPersonLeftMobile from "@/assets/images/cta-person-left-full.png";
import ctaPersonRight from "@/assets/images/cta-person-right.png";
import ctaPersonRightMobile from "@/assets/images/cta-person-right-full.png";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { isMotionEnabled } from "@/lib/motion-prefs";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CtaLayerControl = { x: number; y: number; scale: number };
type CtaControls = {
  left: CtaLayerControl;
  right: CtaLayerControl;
  orb: CtaLayerControl;
  clouds: CtaLayerControl;
  sun: CtaLayerControl;
  leaves: CtaLayerControl;
  botanical: CtaLayerControl;
  flower: CtaLayerControl;
  bloom: CtaLayerControl;
  bird: CtaLayerControl;
  airplane: CtaLayerControl;
};
type CtaProfile = "desktop" | "tablet" | "mobile";
type CtaControlProfiles = Record<CtaProfile, CtaControls>;

const desktopCtaControls: CtaControls = {
  left: { x: 0, y: 0, scale: 1 },
  right: { x: 2, y: 4.8, scale: 1 },
  orb: { x: 0, y: -11.8, scale: 1.75 },
  clouds: { x: -5.2, y: 6.7, scale: 1.29 },
  sun: { x: 0.7, y: -2.2, scale: 1.75 },
  leaves: { x: 24.4, y: 49.6, scale: 1.56 },
  botanical: { x: -27, y: 58.5, scale: 1.75 },
  flower: { x: 5.6, y: 11.1, scale: 1.75 },
  bloom: { x: -15.7, y: 36.3, scale: 1 },
  bird: { x: 14.5, y: -25.8, scale: 1 },
  airplane: { x: 0, y: 0, scale: 1 },
};

const tabletCtaControls: CtaControls = {
  left: { x: 0, y: 6.7, scale: 1 },
  right: { x: 2.7, y: 10.7, scale: 0.99 },
  orb: { x: 0, y: -2.7, scale: 1.5 },
  clouds: { x: 5.3, y: 9.3, scale: 1.16 },
  sun: { x: 0, y: 0, scale: 1 },
  leaves: { x: 0, y: 0, scale: 1 },
  botanical: { x: 0, y: 0, scale: 1 },
  flower: { x: 0, y: 0, scale: 1 },
  bloom: { x: 0, y: 0, scale: 1 },
  bird: { x: 0, y: 0, scale: 1 },
  airplane: { x: 0, y: 0, scale: 1 },
};

const mobileCtaControls: CtaControls = {
  left: { x: 0, y: 1.3, scale: 1 },
  right: { x: 2.3, y: 0, scale: 0.84 },
  orb: { x: 0, y: -10.7, scale: 1.5 },
  clouds: { x: -22.7, y: -9.3, scale: 1.73 },
  sun: { x: 0, y: 0, scale: 1 },
  leaves: { x: 0, y: 0, scale: 1 },
  botanical: { x: 0, y: 0, scale: 1 },
  flower: { x: 0, y: 0, scale: 1 },
  bloom: { x: 0, y: 0, scale: 1 },
  bird: { x: 0, y: 0, scale: 1 },
  airplane: { x: 0, y: 0, scale: 1 },
};

const initialProfiles: CtaControlProfiles = {
  desktop: desktopCtaControls,
  tablet: tabletCtaControls,
  mobile: mobileCtaControls,
};

const labels: Record<keyof CtaControls, string> = {
  left: "Left character",
  right: "Right character",
  orb: "Center orb",
  clouds: "Cloud transition",
  sun: "Doodle · Sun",
  leaves: "Doodle · Leaves",
  botanical: "Doodle · Botanical",
  flower: "Doodle · Four petals",
  bloom: "Doodle · Bloom",
  bird: "Doodle · Bird",
  airplane: "Doodle · Airplane",
};

const sliderSpecs = [
  { key: "x", label: "X", min: -100, max: 100, step: 0.1, suffix: "vw" },
  { key: "y", label: "Y", min: -100, max: 100, step: 0.1, suffix: "vh" },
  { key: "scale", label: "Scale", min: 0.5, max: 1.75, step: 0.01, suffix: "×" },
] as const;

const isDevelopment = process.env.NODE_ENV === "development";
const controlsStorageKey = "impactional-cta-dev-controls-v9";
const visibilityStorageKey = "impactional-cta-dev-visible";
const expandedStorageKey = "impactional-cta-dev-expanded";

function layerStyle(desktop: CtaLayerControl, tablet: CtaLayerControl, mobile: CtaLayerControl) {
  return {
    "--cta-desktop-x": `${desktop.x}vw`,
    "--cta-desktop-y": `${desktop.y}vh`,
    "--cta-desktop-scale": desktop.scale,
    "--cta-tablet-x": `${tablet.x}vw`,
    "--cta-tablet-y": `${tablet.y}vh`,
    "--cta-tablet-scale": tablet.scale,
    "--cta-mobile-x": `${mobile.x}vw`,
    "--cta-mobile-y": `${mobile.y}vh`,
    "--cta-mobile-scale": mobile.scale,
  } as CSSProperties;
}

function restoreControls(fallback: CtaControls, value?: Partial<CtaControls>): CtaControls {
  return Object.fromEntries(
    (Object.keys(fallback) as Array<keyof CtaControls>).map((layer) => [
      layer,
      { ...fallback[layer], ...value?.[layer] },
    ]),
  ) as CtaControls;
}

export function CtaAdjuster() {
  const sectionRef = useRef<HTMLElement>(null);
  const [profiles, setProfiles] = useState(initialProfiles);
  const [editingProfile, setEditingProfile] = useState<CtaProfile>("desktop");
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (!isMotionEnabled()) return;

      const words = section.querySelectorAll<HTMLElement>("[data-cta-word]");
      const support = section.querySelectorAll<HTMLElement>("[data-cta-support]");
      const doodles = section.querySelectorAll<HTMLElement>("[data-cta-doodle-motion]");
      const left = section.querySelectorAll<HTMLElement>("[data-cta-left-motion]");
      const right = section.querySelectorAll<HTMLElement>("[data-cta-right-motion]");

      gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: section, start: "top 74%", once: true },
      })
        .fromTo(words, { autoAlpha: 0, filter: "blur(18px)", y: 20 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.14 }, 0)
        .fromTo(doodles, { autoAlpha: 0, filter: "blur(12px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 1.15, stagger: 0.1 }, 0.2)
        .fromTo(support, { autoAlpha: 0, filter: "blur(8px)", y: 14 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.75, stagger: 0.1 }, 0.42)
        .fromTo(left, { autoAlpha: 0, xPercent: -10, yPercent: 12 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 2.6 }, 0.1)
        .fromTo(right, { autoAlpha: 0, xPercent: 10, yPercent: 12 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 2.6 }, 0.1);
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    if (!isDevelopment) return;
    const saved = window.localStorage.getItem(controlsStorageKey);
    const savedVisible = window.localStorage.getItem(visibilityStorageKey);
    const savedExpanded = window.localStorage.getItem(expandedStorageKey);
    let restoredProfiles = initialProfiles;

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<CtaControlProfiles>;
        restoredProfiles = {
          desktop: restoreControls(desktopCtaControls, parsed.desktop),
          tablet: restoreControls(tabletCtaControls, parsed.tablet),
          mobile: restoreControls(mobileCtaControls, parsed.mobile),
        };
      } catch {
        window.localStorage.removeItem(controlsStorageKey);
      }
    }
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const isTablet = window.matchMedia("(min-width: 641px) and (max-width: 1100px)").matches;
    const restoreFrame = window.requestAnimationFrame(() => {
      setProfiles(restoredProfiles);
      setEditingProfile(isMobile ? "mobile" : isTablet ? "tablet" : "desktop");
      if (savedVisible !== null) setVisible(savedVisible === "true");
      if (savedExpanded !== null) setExpanded(savedExpanded === "true");
    });

    return () => window.cancelAnimationFrame(restoreFrame);
  }, []);

  useEffect(() => {
    if (!isDevelopment) return;
    const toggle = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === "KeyK") {
        event.preventDefault();
        setVisible((current) => {
          const next = !current;
          window.localStorage.setItem(visibilityStorageKey, String(next));
          return next;
        });
      }
    };
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, []);

  function updateControl(layer: keyof CtaControls, key: keyof CtaLayerControl, value: number) {
    setProfiles((current) => {
      const next = {
        ...current,
        [editingProfile]: {
          ...current[editingProfile],
          [layer]: { ...current[editingProfile][layer], [key]: value },
        },
      };
      window.localStorage.setItem(controlsStorageKey, JSON.stringify(next));
      return next;
    });
  }

  function resetControls() {
    setProfiles((current) => {
      const next = { ...current, [editingProfile]: initialProfiles[editingProfile] };
      window.localStorage.setItem(controlsStorageKey, JSON.stringify(next));
      return next;
    });
  }

  async function copyValues() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(profiles, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  return (
    <>
      <section className="final-cta" id="contact" ref={sectionRef}>
        <div className="final-cta__decor" aria-hidden="true">
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--sun" style={layerStyle(profiles.desktop.sun, profiles.tablet.sun, profiles.mobile.sun)} src={doodleSun} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--leaves" style={layerStyle(profiles.desktop.leaves, profiles.tablet.leaves, profiles.mobile.leaves)} src={doodleLeaves} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--botanical" style={layerStyle(profiles.desktop.botanical, profiles.tablet.botanical, profiles.mobile.botanical)} src={doodleBotanical} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--flower" style={layerStyle(profiles.desktop.flower, profiles.tablet.flower, profiles.mobile.flower)} src={doodleFlowerFour} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--bloom" style={layerStyle(profiles.desktop.bloom, profiles.tablet.bloom, profiles.mobile.bloom)} src={doodleFlowerBloom} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--bird" style={layerStyle(profiles.desktop.bird, profiles.tablet.bird, profiles.mobile.bird)} src={doodleBird} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-doodle-motion><Image className="final-cta__handdrawn final-cta__handdrawn--airplane" style={layerStyle(profiles.desktop.airplane, profiles.tablet.airplane, profiles.mobile.airplane)} src={ctaPaperAirplane} alt="" /></span>
        </div>
        <Container className="final-cta__inner">
          <div className="final-cta__copy">
            <h2><span><span data-cta-word>Pass</span> <span data-cta-word>an</span></span><span><em data-cta-word>idea</em> <span data-cta-word>forward.</span></span></h2>
            <p data-cta-support>Find your place in the next #GenerationOfChange.</p>
            <div className="final-cta__actions" data-cta-support>
              <ButtonLink href="/programs" size="lg">Find a program <ArrowRight aria-hidden="true" /></ButtonLink>
              <ButtonLink href="/partner" variant="outline" size="lg">Partner with us <ArrowRight aria-hidden="true" /></ButtonLink>
            </div>
          </div>
        </Container>
        <div className="final-cta__handoff" aria-hidden="true">
          <span className="final-cta__motion-layer" data-cta-left-motion><Image className="final-cta__person final-cta__person--left final-cta__person--desktop" style={layerStyle(profiles.desktop.left, profiles.tablet.left, profiles.mobile.left)} src={ctaPersonLeft} alt="" sizes="42vw" /></span>
          <span className="final-cta__motion-layer" data-cta-left-motion><Image className="final-cta__person final-cta__person--left-mobile final-cta__person--mobile" style={layerStyle(profiles.desktop.left, profiles.tablet.left, profiles.mobile.left)} src={ctaPersonLeftMobile} alt="" sizes="82vw" /></span>
          <span className="final-cta__orb" style={layerStyle(profiles.desktop.orb, profiles.tablet.orb, profiles.mobile.orb)}><Image src={doodleSun} alt="" /></span>
          <span className="final-cta__motion-layer" data-cta-right-motion><Image className="final-cta__person final-cta__person--right final-cta__person--desktop" style={layerStyle(profiles.desktop.right, profiles.tablet.right, profiles.mobile.right)} src={ctaPersonRight} alt="" sizes="45vw" /></span>
          <span className="final-cta__motion-layer" data-cta-right-motion><Image className="final-cta__person final-cta__person--right-mobile final-cta__person--mobile" style={layerStyle(profiles.desktop.right, profiles.tablet.right, profiles.mobile.right)} src={ctaPersonRightMobile} alt="" sizes="82vw" /></span>
        </div>
        <Image className="final-cta__clouds" style={layerStyle(profiles.desktop.clouds, profiles.tablet.clouds, profiles.mobile.clouds)} src={ctaClouds} alt="" aria-hidden="true" sizes="118vw" />
      </section>

      {isDevelopment && visible ? (
        <details className="cta-dev-controls" open={expanded} onToggle={(event) => {
          const next = event.currentTarget.open;
          setExpanded(next);
          window.localStorage.setItem(expandedStorageKey, String(next));
        }}>
          <summary><span>CTA adjuster <kbd>Ctrl Shift K</kbd></span><small>DEV</small></summary>
          <div className="cta-dev-controls__body">
            <div className="cta-dev-controls__profiles" aria-label="Adjustment profile">
              {(["desktop", "tablet", "mobile"] as const).map((profile) => (
                <button className={editingProfile === profile ? "is-active" : ""} type="button" onClick={() => setEditingProfile(profile)} key={profile}>{profile}</button>
              ))}
            </div>
            <p className="cta-dev-controls__hint">Editing <strong>{editingProfile}</strong> positions only.</p>
            {(Object.keys(profiles[editingProfile]) as Array<keyof CtaControls>).map((layer) => (
              <fieldset className="cta-dev-controls__group" key={layer}>
                <legend>{labels[layer]}</legend>
                {sliderSpecs.map((slider) => {
                  const value = profiles[editingProfile][layer][slider.key];
                  return (
                    <label className="cta-dev-controls__slider" key={slider.key}>
                      <span>{slider.label}</span>
                      <input type="range" min={slider.min} max={slider.max} step={slider.step} value={value} onChange={(event) => updateControl(layer, slider.key, Number(event.currentTarget.value))} />
                      <output>{slider.key === "scale" ? value.toFixed(2) : value}{slider.suffix}</output>
                    </label>
                  );
                })}
              </fieldset>
            ))}
            <div className="cta-dev-controls__actions">
              <button type="button" onClick={copyValues}>{copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy values"}</button>
              <button type="button" onClick={resetControls}>Reset positions</button>
            </div>
          </div>
        </details>
      ) : null}
    </>
  );
}
