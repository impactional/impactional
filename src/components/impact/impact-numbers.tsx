import { ArrowUpRight, Globe2, Sparkles } from "lucide-react";

import { impactMetrics, reportMeta } from "@/content/impact";

// Display order changes the hierarchy; every figure still comes from the report.
const orderedMetrics = [5, 0, 4, 2, 3, 1].map((index) => impactMetrics[index]);

export function ImpactNumbers() {
  return (
    <div className="impact-numbers">
      <div className="impact-numbers__grid">
        {orderedMetrics.map((metric, index) => (
          <article className={`impact-number impact-number--${index + 1}`} key={metric.label} data-reveal>
            <div className="impact-number__top"><span>{metric.period}</span>{index === 0 ? <Globe2 aria-hidden="true" /> : index === 1 ? <Sparkles aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}</div>
            {index === 0 && <svg className="impact-number__ripples" viewBox="0 0 500 500" fill="none" aria-hidden="true">{[85, 135, 185, 235].map((radius) => <circle key={radius} cx="250" cy="250" r={radius} />)}</svg>}
            <strong data-count={metric.value} data-format={metric.format} data-final={metric.display}>{metric.display}</strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
      <p className="impact-numbers__source">{reportMeta.period} · {reportMeta.sourceLabel}</p>
    </div>
  );
}
