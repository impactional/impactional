import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("section-header", inverse && "section-header--inverse", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-header__description">{description}</p> : null}
    </header>
  );
}
