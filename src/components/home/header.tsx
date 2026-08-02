import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { navigation } from "@/content/home";

import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="site-header" data-hero-enter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <a href="#top" className="site-header__brand" aria-label="Impactional home">
        <Logo />
      </a>
      <nav className="site-header__nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a
        className="site-header__opportunity"
        href="https://linktr.ee/Impactional.org"
        target="_blank"
        rel="noreferrer"
      >
        Join a program <ArrowRight aria-hidden="true" />
      </a>
      <MobileNav />
    </header>
  );
}
