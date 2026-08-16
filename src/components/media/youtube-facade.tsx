"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import type { VideoEntry } from "@/content/media";

export function YouTubeFacade({ video }: { video: VideoEntry }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <article className="video-card">
      <div className="video-card__frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${video.title}`} style={{ backgroundImage: `linear-gradient(rgb(20 20 20 / .05), rgb(20 20 20 / .3)), url(${thumbnail})` }}>
            <span><Play aria-hidden="true" /> Play video</span>
          </button>
        )}
      </div>
      <div className="video-card__copy">
        <div><p className="eyebrow">{video.category}</p>{video.placeholder && <strong className="placeholder-label">Placeholder — replace before launch</strong>}</div>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <a href={video.sourceUrl} target="_blank" rel="noreferrer">Watch directly on YouTube ↗</a>
      </div>
    </article>
  );
}

