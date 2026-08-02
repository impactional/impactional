import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type BadgeTone = "magenta" | "ocean" | "mint" | "amber" | "ink";

export function Badge({
  className,
  tone = "ink",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return <span className={cn("badge", `badge--${tone}`, className)} {...props} />;
}
