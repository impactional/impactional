"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useRef } from "react";

// Downscaled derivatives of the multi-MB originals — the polaroids render small,
// and the full-size PNGs stall the on-demand image optimizer.
import communityImage from "@/assets/images/community-apu-small.jpg";
import parliamentImage from "@/assets/images/european-parliament.jpg";
import teamImage from "@/assets/images/global-team.png";
import joshuaImage from "@/assets/images/joshua-steib.jpg";
import workshopImage from "@/assets/images/workshop-small.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Polaroid = {
  key: string;
  image: StaticImageData;
  alt: string;
  modifier: "one" | "two" | "three" | "four" | "five" | "six";
  tilt: number;
  objectPosition: string;
  origin?: boolean;
};

const polaroids: Polaroid[] = [
  {
    key: "apu",
    image: communityImage,
    alt: "Impactional members gathered on the steps at Asia Pacific University",
    modifier: "one",
    tilt: -7,
    objectPosition: "50% 58%",
    origin: true,
  },
  {
    key: "podium",
    image: joshuaImage,
    alt: "A young changemaker speaking from the podium at Youth4Climate",
    modifier: "two",
    tilt: 2.5,
    objectPosition: "42% 30%",
  },
  {
    key: "parliament",
    image: parliamentImage,
    alt: "An Impactional member inside the European Parliament hemicycle",
    modifier: "three",
    tilt: 3.5,
    objectPosition: "50% 42%",
    origin: true,
  },
  {
    key: "workshop-a",
    image: workshopImage,
    alt: "Participants smiling together during an Impactional workshop",
    modifier: "four",
    tilt: -6,
    objectPosition: "12% 42%",
  },
  {
    key: "team",
    image: teamImage,
    alt: "A collage of young Impactional faces from around the world",
    modifier: "five",
    tilt: 2,
    objectPosition: "50% 28%",
  },
  {
    key: "workshop-b",
    image: workshopImage,
    alt: "Young people sharing a conversation at an Impactional session",
    modifier: "six",
    tilt: -3,
    objectPosition: "86% 45%",
  },
];

/* Dashed travel routes, drawn outward from the two origin polaroids.
   Order matters: route i reveals polaroid destinations[i], and pin i
   inherits route i's tone so each leg reads as one colored journey. */
const routes = [
  { d: "M452 96C540 30 650 28 718 62", tone: "magenta" },
  { d: "M336 210C230 320 176 456 210 580", tone: "ocean" },
  { d: "M1196 310C1058 474 902 582 780 636", tone: "amber" },
  { d: "M1274 332C1322 430 1312 522 1264 578", tone: "mint" },
] as const;
const destinations = ["podium", "workshop-a", "team", "workshop-b"];
const pinPoints = [
  { x: 600, y: 44 },
  { x: 182, y: 428 },
  { x: 982, y: 566 },
  { x: 1284, y: 468 },
];

const accent = (tone: string) => (tone === "magenta" ? "" : ` ripple__accent--${tone}`);

const constellationNodes = [
  [430, 330], [560, 240], [700, 300], [840, 250], [960, 330],
  [1010, 440], [880, 520], [700, 560], [540, 510], [450, 430],
] as const;
const constellationLinks =
  "M430 330L560 240L700 300L840 250L960 330L1010 440L880 520L700 560L540 510L450 430L430 330M560 240L540 510M700 300L880 520M840 250L700 560";

export function RippleNetwork() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const forcedOff = new URLSearchParams(window.location.search).get("motion") === "off";
      if (reduced || forcedOff) return;

      const q = gsap.utils.selector(root);
      const line1 = q("[data-ripple-line1]");
      const line2Inner = q("[data-ripple-line2-inner]");
      const toa = q("[data-ripple-toa]");
      const oval = q<SVGPathElement>("[data-ripple-oval]")[0];
      const arrow = q<SVGPathElement>("[data-ripple-arrow]")[0];
      const eyebrow = q("[data-ripple-eyebrow]");
      const tagline = q("[data-ripple-tagline]");
      const net = q(".ripple__net");
      const posts = q(".ripple__post");
      const pins = q<SVGGElement>(".ripple__pin");
      const stamps = q<SVGGElement>(".ripple__stamp");
      const reveals = q<SVGPathElement>(".ripple__route-reveal");
      const cardOf = (key: string) => q<HTMLElement>(`[data-polaroid-key="${key}"]`)[0];
      const originCards = q<HTMLElement>('[data-polaroid="origin"]');
      const tiltOf = (el: Element) => parseFloat((el as HTMLElement).dataset.tilt ?? "0");

      // Prepare stroke-drawing for the hand-drawn oval, arrow, and route reveals.
      [oval, arrow, ...reveals].forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      // Hide everything the timeline introduces later; CSS default is the final state.
      gsap.set([...net, ...posts, ...pins, ...stamps], { autoAlpha: 0 });
      gsap.set(net, { scale: 0.92, transformOrigin: "50% 50%" });
      gsap.set([...toa, ...tagline], { autoAlpha: 0 });
      gsap.set(tagline, { y: 14 });
      gsap.set(line2Inner, { yPercent: 145 });
      q<HTMLElement>(".ripple__polaroid").forEach((card) => {
        gsap.set(card, { autoAlpha: 0, filter: "blur(8px)", scale: 0.92, rotation: tiltOf(card) - 6 });
      });

      // Subtle idle drift for a few cards, started once the sequence settles.
      const floaters = ["podium", "team", "workshop-b"].map((key, index) =>
        gsap.to(cardOf(key), {
          y: index % 2 === 0 ? 3.5 : -3,
          duration: 3.4 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.4,
          paused: true,
        }),
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 55%", once: true },
      });
      tl.timeScale(2);

      // Phase 1 — the words come into focus; every photo stays hidden.
      tl.addLabel("two")
        .fromTo(
          line1,
          { autoAlpha: 0, filter: "blur(10px)", scale: 0.96 },
          { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "power2.out" },
          "two",
        )
        .fromTo(
          eyebrow,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "two+=0.1",
        );

      // Phase 2 — the first line recedes while the hand draws the oval and arrow.
      tl.addLabel("transition", "+=0.35")
        .to(
          line1,
          { filter: "blur(1.5px)", autoAlpha: 0.93, scale: 0.988, duration: 0.55, ease: "power2.inOut" },
          "transition",
        )
        .to(toa, { autoAlpha: 1, duration: 0.3 }, "transition")
        .to(oval, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, "transition+=0.15")
        .to(arrow, { strokeDashoffset: 0, duration: 0.5, ease: "power1.in" }, "transition+=0.75");

      // Phase 3 — the worldwide network unfolds.
      tl.addLabel("network", "-=0.15")
        .to(
          line2Inner,
          { yPercent: 0, duration: 0.9, ease: "power3.out" },
          "network",
        )
        .to(net, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "network")
        .to(
          originCards,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            scale: 1,
            rotation: (_, el) => tiltOf(el),
            duration: 0.7,
            stagger: 0.18,
            ease: "power2.out",
          },
          "network+=0.05",
        );

      destinations.forEach((key, index) => {
        const at = `network+=${0.55 + index * 0.36}`;
        const card = cardOf(key);
        tl.to(reveals[index], { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, at)
          .to(
            card,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              scale: 1,
              rotation: tiltOf(card),
              duration: 0.75,
              ease: "power3.out",
            },
            `${at}+=0.42`,
          )
          .fromTo(
            pins[index],
            { autoAlpha: 0, scale: 0.3, transformOrigin: "50% 100%" },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)" },
            `${at}+=0.6`,
          );
      });

      // Phase 4 — everything settles sharp; stamps, postal marks, and a soft drift.
      tl.addLabel("settle", "+=0.15")
        .to(line1, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power2.inOut" }, "settle")
        .fromTo(
          stamps,
          { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.18, ease: "back.out(1.6)" },
          "settle",
        )
        .to(posts, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "settle+=0.2")
        .to(tagline, { autoAlpha: 1, y: 0, duration: 0.6 }, "settle+=0.3")
        .call(() => floaters.forEach((float) => float.play()), undefined, "settle+=0.5");
    },
    { scope: rootRef },
  );

  return (
    <div className="ripple" ref={rootRef}>
      <p className="eyebrow ripple__eyebrow" data-ripple-eyebrow>
        The ripple today · 2025—26
      </p>
      <div className="ripple__stage">
        <svg
          className="ripple__scene"
          viewBox="0 0 1440 810"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern id="ripple-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.6" fill="currentColor" />
            </pattern>
            <path
              id="ripple-stamp-arc"
              d="M-29 0A29 29 0 1 1 29 0A29 29 0 1 1 -29 0"
              fill="none"
            />
            {routes.map((route, index) => (
              <mask id={`ripple-route-m${index}`} maskUnits="userSpaceOnUse" key={route.d}>
                <path className="ripple__route-reveal" d={route.d} />
              </mask>
            ))}
          </defs>

          {/* Globe + constellation behind the typography */}
          <g className="ripple__net">
            <circle className="ripple__ring" cx="720" cy="430" r="290" />
            <ellipse className="ripple__ring" cx="720" cy="430" rx="290" ry="100" />
            <ellipse className="ripple__ring" cx="720" cy="430" rx="110" ry="290" />
            <ellipse className="ripple__ring" cx="720" cy="430" rx="210" ry="290" />
            <path
              className="ripple__ring ripple__ring--arc"
              d="M80 300C300 60 900 20 1240 120"
            />
            <g opacity="0.1">
              <ellipse cx="600" cy="360" rx="150" ry="85" fill="url(#ripple-dots)" transform="rotate(-12 600 360)" />
              <ellipse cx="880" cy="500" rx="125" ry="70" fill="url(#ripple-dots)" transform="rotate(8 880 500)" />
              <ellipse cx="780" cy="290" rx="80" ry="46" fill="url(#ripple-dots)" />
            </g>
            <path className="ripple__links" d={constellationLinks} />
            {constellationNodes.map(([x, y]) => (
              <circle className="ripple__node" cx={x} cy={y} r="3.2" key={`${x}-${y}`} />
            ))}
          </g>

          {/* Postal doodles */}
          <g className="ripple__post ripple__accent--amber">
            <path d="M140 88Q172 74 204 88T268 88T332 88T396 88" />
            <path d="M140 110Q172 96 204 110T268 110T332 110T396 110" />
            <path d="M140 132Q172 118 204 132T268 132T332 132" />
          </g>
          <g className="ripple__post ripple__accent--mint">
            <path d="M150 196h64v44h-64zM150 196l32 24l32-24" />
          </g>
          <g className="ripple__post">
            <path d="M248 176l14 14M262 176l-14 14" />
          </g>

          {/* Travel routes */}
          {routes.map((route, index) => (
            <path
              className={`ripple__route${accent(route.tone)}`}
              d={route.d}
              mask={`url(#ripple-route-m${index})`}
              key={route.d}
            />
          ))}

          {/* Location pins */}
          {pinPoints.map(({ x, y }, index) => (
            <g
              className={`ripple__pin${accent(routes[index].tone)}`}
              transform={`translate(${x} ${y})`}
              key={`${x}-${y}`}
            >
              <path d="M0 8S-13-6-13-15c0-7.2 5.8-13 13-13s13 5.8 13 13C13-6 0 8 0 8Z" />
              <circle cx="0" cy="-15" r="4.6" />
            </g>
          ))}

          {/* Postal stamps */}
          <g className="ripple__stamp ripple__accent--ocean" transform="translate(1150 86) rotate(10)">
            <circle className="ripple__stamp-perf" r="48" />
            <circle className="ripple__stamp-ring" r="38" />
            <circle className="ripple__stamp-ring" cx="0" cy="0" r="14" />
            <ellipse className="ripple__stamp-ring" rx="6" ry="14" />
            <path className="ripple__stamp-ring" d="M-13.5-4.5h27M-13.5 4.5h27" />
            <text fontSize="9">
              <textPath href="#ripple-stamp-arc" startOffset="2">
                youth in motion · worldwide network ·
              </textPath>
            </text>
          </g>
          <g className="ripple__stamp ripple__accent--amber" transform="translate(1298 694) rotate(-8)">
            <circle className="ripple__stamp-perf" r="40" />
            <circle className="ripple__stamp-ring" r="30" />
            <path className="ripple__stamp-ring" d="M-16 12L18-9M18-9L-7-2M18-9L1 7M-7-2L1 7" />
          </g>
        </svg>

        {polaroids.map((polaroid) => (
          <figure
            className={`ripple__polaroid ripple__polaroid--${polaroid.modifier}`}
            data-polaroid={polaroid.origin ? "origin" : "later"}
            data-polaroid-key={polaroid.key}
            data-tilt={polaroid.tilt}
            style={{ "--tilt": `${polaroid.tilt}deg` } as CSSProperties}
            key={polaroid.key}
          >
            <span className="ripple__tape" aria-hidden="true" />
            <span className="ripple__well">
              <Image
                src={polaroid.image}
                alt={polaroid.alt}
                fill
                sizes="(max-width: 720px) 34vw, 210px"
                style={{ objectPosition: polaroid.objectPosition }}
              />
            </span>
          </figure>
        ))}

        <div className="ripple__heading">
          <h2 aria-label="From two people to a worldwide network.">
            <span className="ripple__line ripple__line--one" data-ripple-line1 aria-hidden="true">
              From two people
            </span>
            <span className="ripple__connector" aria-hidden="true">
              <span className="ripple__toa" data-ripple-toa>
                to a
                <svg className="ripple__oval" viewBox="0 0 240 110" fill="none">
                  <path
                    data-ripple-oval
                    d="M36 78C10 62 16 30 62 18C108 6 190 8 216 30C240 50 224 82 176 94C128 106 52 104 30 84C16 71 22 48 48 36"
                  />
                </svg>
              </span>
              <svg className="ripple__arrow" viewBox="0 0 90 120" fill="none">
                <path data-ripple-arrow d="M12 6C52 22 74 48 66 96M46 82L66 100L82 76" />
              </svg>
            </span>
            <span className="ripple__line ripple__line--two" aria-hidden="true">
              <span className="ripple__line-inner" data-ripple-line2-inner>
                worldwide network.
              </span>
            </span>
          </h2>
          <p className="ripple__tagline" data-ripple-tagline>
            Across borders, toward each other.
          </p>
        </div>
      </div>
    </div>
  );
}
