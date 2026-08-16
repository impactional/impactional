"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TermFilter({ terms, activeTerm }: { terms: readonly string[]; activeTerm: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="term-filter" aria-label="Ambassador term">
      {terms.map((term) => (
        <button
          key={term}
          type="button"
          aria-pressed={activeTerm === term}
          onClick={() => {
            const next = new URLSearchParams(searchParams.toString());
            next.set("term", term);
            router.push(`${pathname}?${next.toString()}`);
          }}
        >
          Term {term}
        </button>
      ))}
    </div>
  );
}

