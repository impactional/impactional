import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

export function PageIntro({ eyebrow, title, description, aside }: { eyebrow: string; title: ReactNode; description: string; aside?: ReactNode }) {
  return (
    <header className="page-intro">
      <Container className="page-intro__inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-intro__aside">
          <p>{description}</p>
          {aside}
        </div>
      </Container>
    </header>
  );
}

