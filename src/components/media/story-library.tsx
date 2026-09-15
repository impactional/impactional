"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import type { Story } from "@/content/media";

export function StoryLibrary({ stories }: { stories: Story[] }) {
  const [category, setCategory] = useState("All stories");
  const categories = ["All stories", ...new Set(stories.map((story) => story.category))];
  const visible = category === "All stories" ? stories : stories.filter((story) => story.category === category);
  return <div className="journal-library"><div className="journal-library__toolbar"><div role="group" aria-label="Filter stories by topic">{categories.map((entry) => <button key={entry} type="button" aria-pressed={category === entry} onClick={() => setCategory(entry)}>{entry}</button>)}</div><p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "story" : "stories"}</p></div><div className="journal-grid">{visible.map((story) => <article key={story.title}><a href={story.href} target="_blank" rel="noreferrer"><div className="journal-grid__photo"><Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 48vw, 33vw" /><span><ArrowUpRight size={23} aria-hidden="true" /></span></div><div className="journal-grid__meta"><span>{story.category}</span><span>{story.date}</span></div><h3>{story.title}</h3><span className="journal-grid__link">Read the story <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> on {story.sourcePlatform}, opens in a new tab</span></span></a></article>)}</div></div>;
}
