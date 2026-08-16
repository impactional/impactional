import type { ReactNode } from "react";

import { Footer } from "@/components/home/final-cta";
import { Header } from "@/components/home/header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="interior-main">{children}</main>
      <Footer />
    </>
  );
}

