import { Globe2 } from "lucide-react";

export function GycArtwork({ compact = false }: { compact?: boolean }) {
  return <div className={`gyc-art${compact ? " gyc-art--compact" : ""}`} aria-hidden="true"><span className="gyc-art__label">SDG IMPACT LAB / COMING SOON</span><div className="gyc-art__rings"><span /><span /><span /><span /></div><Globe2 className="gyc-art__globe" strokeWidth={.7} /><div className="gyc-art__type">Global<br /><em>Youth</em><br />Circle<span>✳</span></div><span className="gyc-art__note">Good things happen<br />when we come together.</span><span className="gyc-art__chip">DIALOGUE → ACTION</span></div>;
}
