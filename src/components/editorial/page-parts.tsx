import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function EditorialHeading({ eyebrow, children, description, action }: { eyebrow: string; children: ReactNode; description?: string; action?: ReactNode }) {
  return <header className="editorial-heading" data-editorial-reveal><div><p className="eyebrow">{eyebrow}</p><h2>{children}</h2></div><div>{description && <p>{description}</p>}{action}</div></header>;
}

export function EditorialCta({ eyebrow, children, description, href, label }: { eyebrow: string; children: ReactNode; description: string; href: string; label: string }) {
  return <section className="editorial-cta"><Container><span className="editorial-cta__spark" aria-hidden="true">✳</span><p className="eyebrow">{eyebrow}</p><h2>{children}</h2><p>{description}</p><ButtonLink href={href}>{label}<ArrowUpRight aria-hidden="true" /></ButtonLink></Container></section>;
}
