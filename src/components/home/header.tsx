import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { siteNavigation } from "@/content/site";

import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="site-header" data-hero-enter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Link href="/" className="site-header__brand" aria-label="Impactional home">
        <Logo />
      </Link>
      <nav className="site-header__nav" aria-label="Primary navigation">
        {siteNavigation.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        className="site-header__opportunity"
        href="/partner"
      >
        Partner with us <ArrowRight aria-hidden="true" />
      </Link>
      <MobileNav />
    </header>
  );
}
