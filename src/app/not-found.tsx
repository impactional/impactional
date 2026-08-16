import Link from "next/link";

import { Footer } from "@/components/home/final-cta";
import { Header } from "@/components/home/header";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return <><Header /><main id="main-content" className="not-found"><Container><p className="eyebrow">404 — Path not found</p><h1>This ripple went somewhere else.</h1><p>The page may have moved, but the rest of the network is right here.</p><Link className="button button--primary button--lg" href="/">Return home →</Link></Container></main><Footer /></>;
}

