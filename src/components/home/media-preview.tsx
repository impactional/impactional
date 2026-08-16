import Link from "next/link";

import { YouTubeFacade } from "@/components/media/youtube-facade";
import { Container } from "@/components/ui/container";
import { videos } from "@/content/media";

export function MediaPreview() {
  return (
    <section className="home-media" aria-labelledby="home-media-title">
      <Container>
        <div className="home-media__heading" data-reveal>
          <div><p className="eyebrow">05 — Watch the movement</p><h2 id="home-media-title">See the work<br /><em>in motion.</em></h2></div>
          <div><p>Program films, ambassador vlogs, and field notes give the network a voice beyond the room.</p><Link className="text-link" href="/media">Explore all media →</Link></div>
        </div>
        <div data-reveal><YouTubeFacade video={videos[0]} /></div>
      </Container>
    </section>
  );
}
