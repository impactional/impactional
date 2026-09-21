# Deployment and domain ownership

The canonical production URL is https://impactional.net. `www.impactional.net` redirects to the apex with HTTP 308. Vercel hosts the `impactional` project in the existing team; Rumahweb manages DNS. Keep historical `.org/post/...` article links until those articles have actually migrated.

DNS records saved in Rumahweb on 2026-09-21 (TTL 300):

| Name | Type | Destination |
| --- | --- | --- |
| `@` | A | `216.198.79.1` |
| `www` | CNAME | `c21ccbb43de0f1a0.vercel-dns-017.com` |
| `gyc` | CNAME | `da53d7f0a504d050.vercel-dns-017.com` |

Nameservers remain Rumahweb's `nsid1.rumahweb.com`, `nsid2.rumahweb.net`, `nsid3.rumahweb.biz`, and `nsid4.rumahweb.org`. These destinations were returned by Vercel for the projects; re-check Vercel's Domains settings before future DNS changes. DNS zone activation and certificate issuance may lag behind a successful save. A Vercel deployment marked Ready does not by itself prove that the custom domain resolves.

## Org to personal sync

Make site changes in `impactional/impactional`, branch `main`. Every push runs `.github/workflows/sync-personal.yml`, which fast-forwards `dikaprilio/impactional:main`. The personal repository remains Vercel's Git source. Feature branches and tags are not mirrored. A manual **Run workflow** is available in Actions.

Authentication uses a dedicated write deploy key for the personal repository, stored as `PERSONAL_MIRROR_SSH_KEY` in the organization repository's Actions secrets. `MIRROR_KNOWN_HOSTS` contains GitHub's published SSH host keys. This key cannot access other repositories. Only trusted maintainers should be allowed to change the default branch or its workflows.

The sync never force-pushes or deletes refs. If personal `main` gains independent commits, bring them into the org's `main` and retry. Do not push site changes directly to personal `main`. The repository guard prevents recursion when the workflow is copied into the personal repository.

## Global Youth Circle

Repository: https://github.com/impactional/gyc (private starter).
Domain: https://gyc.impactional.net, separate Vercel project `gyc`.
Until the standalone site is ready, GYC redirects temporarily to the published program page on the main website. Program dates and registration remain unannounced.

The GYC deployment was uploaded directly. Automatic Git deployment for GYC is not connected because the current Vercel GitHub integration cannot access the new org repository. See the GYC README for the deployment instructions and the Git connection step.
