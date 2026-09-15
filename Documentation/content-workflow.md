# Impactional content publishing workflow

Public content is stored in typed modules under `src/content`. This milestone intentionally uses no CMS or live social-media API.

## Member roster 26.2

The website owner supplied the [member roster](https://docs.google.com/spreadsheets/d/1clO3m_7GRRekZkpVzK2xx__6DPUd2rLciIcm7NQikds/edit?gid=0) and [member introduction photos](https://drive.google.com/drive/folders/1vKxNd0zU94VG6G7thlztiuV7KsXQHP3V) for the website on 2026-09-15.

- `src/content/people-roster.json` contains all 31 spreadsheet records. Names and biographies retain the source wording, with surrounding whitespace removed. Division labels normalize the `Bussiness` spelling, group Fundraising and Partnership under Business Development, and display Flagship as Flagship Program. Explicit subteams remain on the profiles.
- `src/content/people.ts` adds the publication metadata and division definitions. The People directory and the homepage Members preview use this same roster. Ambassador Management is a member division; it does not populate Global Ambassador profiles.
- `public/images/people/` contains 28 locally served WebP portraits. Each profile retains its exact Drive file link in `portraitSource`, which is included in `media-provenance.ts`. Files were matched using the spreadsheet photo filename and division, with HEIF decoded and images resized without enlarging the originals. Public images do not retain original EXIF metadata.
- Vineela kanaparthi, Charity Van Kurniadi, and Aulia Rahmadina Firdaus have no named photo match. Their profiles use initials. The unnamed images in the `Remove BG` folders cannot establish a reliable name-to-photo match.
- Photos for people absent from the spreadsheet have not been turned into profiles. No missing biographies, countries, social links, or leadership records are inferred from the photo folders.

For a future update, revise the roster records and add any supplied portraits with their Drive source links. Keep `isPublished` and `consentConfirmed` false for unapproved drafts. Confirm the directory counts, division filters, portrait crops, and homepage preview before publishing. This is a checked-in snapshot, not a live Google Sheets connection.

### Member detail pages and SEO

The owner supplied a matching 31-row member detail table on 2026-09-15. The roster includes the preferred name, city/country as supplied, hobbies, favorite music, and email. Email is the only member contact field. Dates of birth, phone numbers, CV links, timestamps, and MBTI/zodiac answers were excluded from the checked-in data. Giandra's preferred name is now Gian and Aliya's explicit subteam is Partnership, following the newer table.

- Each published record generates a static `/people/[slug]` page with the full original biography, portrait or initials, division, role, term, personal interests, and email link. The directory and homepage link to these pages.
- `src/lib/people-seo.ts` builds unique metadata, canonical URLs, Open Graph data, and escaped ProfilePage/Person and BreadcrumbList JSON-LD. Source text must remain escaped in the embedded script.
- `src/app/sitemap.ts` includes every published member; `src/app/robots.ts` links the sitemap. `siteUrl` in `src/content/site.ts` is the shared canonical origin, preserving the site's existing `https://www.impactional.org` configuration. Update it if the production canonical domain changes.
- When editing a profile, update `updatedAt` to its actual revision date and verify the email and source attribution. Keep the raw intake table outside the repository; never copy additional intake columns into the public roster.

## Before publishing a person or ambassador

1. Obtain the approved name, role/term, biography, portrait, alt text, quote where required, and chosen social link from HR or the Ambassador team.
2. Record a meaningful `sourceLabel` and confirm the person has consented to the public profile.
3. Set `consentConfirmed: true` only after that confirmation.
4. Set `isPublished: true` only after editorial review. Public selectors require both flags.
5. Confirm the portrait is organization-owned or licensed and add it to media provenance.

## Media and COTM

- Add videos to `src/content/media.ts` using the 11-character YouTube ID, an HTTPS source URL, and an honest category/description.
- The company-profile video uses the configured `G8zMgVGodXM` ID. The Media page loads its YouTube player only after activation and provides a direct YouTube link. Confirm the video remains publicly available before publishing.
- Stories are curated records linking to the approved source publication. Do not copy full Instagram captions or scrape the feed.
- Changemaker of the Month records sort chronologically. Add only approved publications with an ISO date and HTTPS source.

## Page layouts and upcoming programs

- Programs uses the four core records in `src/content/programs.ts` for its pathway cards and static detail pages. Descriptions, audience, and outcomes come from those records. Historical results on program pages retain their report period.
- The landing page presents these records in a keyboard-accessible tabbed showcase. All four panels remain in the server-rendered HTML; only the selected panel is visible. Keep the mobile choices legible at 320px and keep program detail links tied to the selected record.
- Mobile navigation uses six destination tiles with the current section indicated, plus a separate Coming soon link to Global Youth Circle. The header and close button remain fixed while the menu content scrolls. Navigation closes on route changes and when the desktop header becomes available.
- Dika's portrait uses a focal position to compensate for asymmetric transparent space in the supplied image. Its `--portrait-focus-x` fallback applies to portrait-shaped frames; the wider mobile directory cards override that position. The source WebP remains unchanged.
- People supports searches by name, preferred name, division, role, subteam, and location. Its counts come from the published roster. The Ambassadors page keeps the 2025–26 report figures separate from the selected cohort; no ambassador profiles appear until published records exist.
- Media uses the published story collection for its feature and topic filters. The Joshua Steib spotlight is explicitly dated August 2023. Homepage demo COTM records do not populate this page.
- Shared page styling is in `src/styles/editorial-pages.css`; `PageMotion` progressively enhances server-rendered content and honors the site's motion preference.

### Global Youth Circle — Coming soon

The website owner supplied the [SDG Impact Lab: Global Youth Circle proposal](https://drive.google.com/file/d/13n5f-HW_B5DGuqHZqb5D_X8LGMNGxOT4/view) and confirmed **Coming soon** on 2026-09-15. The source has no confirmed calendar date or registration URL.

- `src/content/global-youth-circle.ts` is the single source for its status, description, planned hybrid format, three-session outline, source link, and organizational email. Proposal targets are not reported as achievements. No project lead phone number is included.
- `/programs/global-youth-circle` has unique metadata and a sitemap entry. It presents the proposed online / Jakarta / online sequence, benefits, and schedule announcement message. The Programs page links to it through the upcoming banner.
- The global announcement opens after 2.8 seconds once per tab session, with a persistent button for reopening. It skips the program's own page and the design system, and leaves active forms, modal dialogs, and user-activated videos uninterrupted. It closes with Escape or its close controls, traps keyboard focus while open, and restores focus to the launcher.
- The announcement uses `sessionStorage` with an in-memory fallback. Set `enabled: false` to hide the announcement and Programs banner, and omit the upcoming sitemap entry. Update the page status, schedule, registration CTA, and metadata together when official details arrive; increment `id` if a new announcement should appear to an existing session.

## Impact reports

- The homepage and `/impact` use the same `ImpactNumbers` component and figures from `src/content/impact.ts`. The report's program cards link to the corresponding program pages; decorative routes illustrate connections rather than geographic totals.
- Every numeric metric needs `period` and `sourceLabel`.
- When a new report is approved, update aggregate and program-level figures together and remove obsolete public claims.
- Never combine figures from different periods without labeling the distinction.

## Pre-launch content checklist

- [ ] Configured company-profile video is publicly playable and approved.
- [ ] All public people and ambassadors have consent and provenance.
- [ ] HR confirms current/past membership and alumni eligibility.
- [ ] Marketing confirms COTM order and social-story selections.
- [ ] Program team confirms application dates and eligibility.
- [ ] All portraits have descriptive alt text and source provenance.
- [ ] Every external link is HTTPS and opens safely.
