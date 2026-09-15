import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";

import joshuaPhoto from "@/assets/images/joshua-steib.jpg";
import { PageMotion } from "@/components/editorial/page-motion";
import { EditorialCta, EditorialHeading } from "@/components/editorial/page-parts";
import { SiteShell } from "@/components/layout/site-shell";
import { StoryLibrary } from "@/components/media/story-library";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { publishedChangemakers, publishedStories, videos } from "@/content/media";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "The Impactional Journal — Stories, Films & Changemakers",
  description: "Stories worth passing on. Discover voices from the Impactional community, watch our films, and meet changemakers turning ideas into action.",
  alternates: { canonical: "/media" },
  openGraph: { title: "The Impactional Journal", description: "People, perspectives, and stories that move us forward.", url: "/media" },
};

export default function MediaPage() {
  const featured = publishedStories[0];
  const spotlight = publishedChangemakers.find((entry) => entry.slug === "joshua-steib");
  return <SiteShell><PageMotion className="media-page">
    <section className="editorial-hero journal-hero"><Container><div className="journal-masthead"><span>THE IMPACTIONAL JOURNAL</span><span>People. Perspectives. Possibilities.</span></div><div className="journal-hero__grid"><div data-editorial-reveal><p className="eyebrow">Voices from a generation in motion</p><h1>Stories worth<br /><em>passing on.</em></h1><p className="editorial-hero__lead">The conversations that stay with us. The people who move us. The moments that remind us why we started.</p><div className="editorial-hero__actions"><ButtonLink href="#media-stories">Find your next read <ArrowDown aria-hidden="true" /></ButtonLink><a className="editorial-link" href="#media-films"><Play size={15} aria-hidden="true" /> Watch our story</a></div><span className="journal-hero__scribble" aria-hidden="true">Every voice adds something.</span></div><article className="journal-cover" data-editorial-reveal><a href={featured.href} target="_blank" rel="noreferrer"><div className="journal-cover__photo"><Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 800px) 100vw, 52vw" loading="eager" fetchPriority="high" /><span>From the community</span></div><div className="journal-cover__caption"><span>{featured.category} / {featured.date}</span><h2>{featured.title}</h2><ArrowUpRight aria-hidden="true" /></div></a></article></div></Container></section>
    <nav className="journal-index" aria-label="Explore our media"><Container><a href="#media-stories"><span>01</span> Read the stories <ArrowDown size={16} aria-hidden="true" /></a><a href="#media-films"><span>02</span> Press play <ArrowDown size={16} aria-hidden="true" /></a><a href="#media-spotlight"><span>03</span> Meet a changemaker <ArrowDown size={16} aria-hidden="true" /></a></Container></nav>
    <section className="editorial-section" id="media-stories"><Container><EditorialHeading eyebrow="The reading room" description="Diplomacy, community, and the small moments that become something bigger.">Ideas travel.<br /><em>Stories take them further.</em></EditorialHeading><StoryLibrary stories={publishedStories} /></Container></section>
    <section className="journal-film editorial-section" id="media-films"><Container><EditorialHeading eyebrow="The screening room" description="A closer look at who we are, what brings us together, and why young people belong in the conversation.">This is us.<br /><em>Press play.</em></EditorialHeading><YouTubeFacade video={videos[0]} /></Container></section>
    <section className="editorial-section journal-spotlight" id="media-spotlight"><Container>{spotlight ? <div className="journal-spotlight__grid"><div className="journal-spotlight__photo" data-editorial-reveal><Image src={joshuaPhoto} alt="Joshua Steib speaking at the Youth4Climate event in Milan" fill sizes="(max-width: 800px) 100vw, 50vw" /><span>CHANGEMAKER OF THE MONTH</span><span aria-hidden="true">✳</span></div><div data-editorial-reveal><p className="eyebrow">From the spotlight archive / August 2023</p><h2>People who<br /><em>move the world.</em></h2><h3>{spotlight.name}</h3><p>{spotlight.summary}</p><p>Get to know a changemaker connecting climate action with the power of international dialogue.</p><a className="editorial-link" href={spotlight.href} target="_blank" rel="noreferrer">Read Joshua’s story <ArrowUpRight size={19} aria-hidden="true" /></a></div></div> : <EditorialHeading eyebrow="Changemaker of the Month" description="Meet the people turning their convictions into action. Our next spotlight is on its way.">People who<br /><em>move the world.</em></EditorialHeading>}</Container></section>
    <EditorialCta eyebrow="Every story starts with someone" description="A project, a moment of change, or someone our community should know about. Share a story with the Impactional team." href={`mailto:${contact.email}?subject=Story%20submission%20for%20Impactional`} label="Share your story">What’s a story<br /><em>only you can tell?</em></EditorialCta>
  </PageMotion></SiteShell>;
}
