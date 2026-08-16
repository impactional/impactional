# Impactional content publishing workflow

Public content is stored in typed modules under `src/content`. This milestone intentionally uses no CMS or live social-media API.

## Before publishing a person or ambassador

1. Obtain the approved name, role/term, biography, portrait, alt text, quote where required, and chosen social link from HR or the Ambassador team.
2. Record a meaningful `sourceLabel` and confirm the person has consented to the public profile.
3. Set `consentConfirmed: true` only after that confirmation.
4. Set `isPublished: true` only after editorial review. Public selectors require both flags.
5. Confirm the portrait is organization-owned or licensed and add it to media provenance.

## Media and COTM

- Add videos to `src/content/media.ts` using the 11-character YouTube ID, an HTTPS source URL, and an honest category/description.
- Replace `dQw4w9WgXcQ` and remove its placeholder warning before launch. It is deliberately labeled as a temporary company-profile slot.
- Stories are curated records linking to the approved source publication. Do not copy full Instagram captions or scrape the feed.
- Changemaker of the Month records sort chronologically. Add only approved publications with an ISO date and HTTPS source.

## Impact reports

- Every numeric metric needs `period` and `sourceLabel`.
- When a new report is approved, update aggregate and program-level figures together and remove obsolete public claims.
- Never combine figures from different periods without labeling the distinction.

## Pre-launch content checklist

- [ ] Rick Astley placeholder removed and approved company-profile video added.
- [ ] All public people and ambassadors have consent and provenance.
- [ ] HR confirms current/past membership and alumni eligibility.
- [ ] Marketing confirms COTM order and social-story selections.
- [ ] Program team confirms application dates and eligibility.
- [ ] All portraits have descriptive alt text and source provenance.
- [ ] Every external link is HTTPS and opens safely.
