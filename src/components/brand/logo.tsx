import Image from "next/image";

import logoBlue from "@/assets/images/logo-blue.png";
import logoWhite from "@/assets/images/logo-white.png";
import { cn } from "@/lib/cn";

export function Logo({
  inverse = false,
  compact = false,
  className,
}: {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("brand-logo", compact && "brand-logo--compact", className)}>
      <Image
        src={inverse ? logoWhite : logoBlue}
        alt=""
        aria-hidden="true"
        className="brand-logo__mark"
        sizes="48px"
      />
      <span className="brand-logo__type">
        <strong>Impactional</strong>
        {!compact ? <span>#GenerationsOfChange</span> : null}
      </span>
    </span>
  );
}
