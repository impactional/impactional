import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { globalYouthCircle as gyc } from "@/content/global-youth-circle";

export function GycBanner() {
  if (!gyc.enabled) return null;
  return <aside className="gyc-banner"><div className="gyc-banner__mark" aria-hidden="true"><Sparkles strokeWidth={1} /></div><div><p className="eyebrow">Next up / {gyc.parent}</p><h2>{gyc.title}</h2><p>New perspectives. Shared ideas. A circle that moves you forward.</p></div><Link href={gyc.href}><span>{gyc.status}</span>Explore the circle <ArrowUpRight aria-hidden="true" /></Link></aside>;
}
