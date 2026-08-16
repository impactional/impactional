import type { Metadata } from "next";
import Image from "next/image";

import { SiteShell } from "@/components/layout/site-shell";
import { YouTubeFacade } from "@/components/media/youtube-facade";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { publishedChangemakers, publishedStories, videos } from "@/content/media";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Stories in Motion — Impactional", description: "Watch Impactional videos and explore curated stories from a global youth-led community." };

export default function MediaPage() {
  return <SiteShell><PageIntro eyebrow="Media & stories" title={<>Watch the ideas<br /><em>move outward.</em></>} description="A curated home for program videos, field notes, social stories, and the changemakers behind the progress." /><Container className="route-section"><YouTubeFacade video={videos[0]} /></Container><section className="route-section route-section--tint"><Container><div className="split-heading"><div><p className="eyebrow">Stories in motion</p><h2>From the room<br />to the world.</h2></div><a className="text-link" href={`mailto:${contact.email}?subject=Submit%20a%20story%20to%20Impactional`}>Submit a story →</a></div><div className="media-story-grid">{publishedStories.map((story) => <article key={story.title}><a href={story.href} target="_blank" rel="noreferrer"><div><Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><p>{story.category} · {story.date}</p><h3>{story.title}</h3><span>Read on {story.sourcePlatform} ↗</span></a></article>)}</div></Container></section><Container className="route-section"><div className="split-heading"><div><p className="eyebrow">Changemaker of the Month</p><h2>Recognition that<br /><em>keeps moving.</em></h2></div><a className="text-link" href={`mailto:${contact.email}?subject=Changemaker%20of%20the%20Month%20application`}>Apply to be featured →</a></div>{publishedChangemakers.length ? <ol className="cotm-list">{publishedChangemakers.map((entry) => <li key={entry.slug}><time dateTime={entry.publishedAt}>{new Date(entry.publishedAt).getFullYear()}</time><div><h3>{entry.name}</h3><p>{entry.summary}</p></div><a href={entry.href} target="_blank" rel="noreferrer">Read profile ↗</a></li>)}</ol> : <EmptyState title="The archive is being prepared">Approved publications will appear here in chronological order.</EmptyState>}</Container></SiteShell>;
}

