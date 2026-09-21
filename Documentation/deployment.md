# Deployment and domain ownership

The canonical production URL is https://impactional.net. `www.impactional.net` redirects to the apex with HTTP 308. Vercel hosts the `impactional` project in the existing team; Rumahweb manages DNS. Keep historical `.org/post/...` article links until those articles have actually migrated.

## Org to personal sync

Make site changes in `impactional/impactional`, branch `main`. Every push runs `.github/workflows/sync-personal.yml`, which fast-forwards `dikaprilio/impactional:main`. The personal repository remains Vercel's Git source. Feature branches and tags are not mirrored. A manual **Run workflow** is available in Actions.

Authentication uses a dedicated write deploy key for the personal repository, stored as `PERSONAL_MIRROR_SSH_KEY` in the organization repository's Actions secrets. `MIRROR_KNOWN_HOSTS` contains GitHub's published SSH host keys. This key cannot access other repositories. Only trusted maintainers should be allowed to change the default branch or its workflows.

The sync never force-pushes or deletes refs. If personal `main` gains independent commits, bring them into the org's `main` and retry. Do not push site changes directly to personal `main`. The repository guard prevents recursion when the workflow is copied into the personal repository.

## Global Youth Circle

Repository: https://github.com/impactional/gyc (private starter).
Domain: https://gyc.impactional.net, separate Vercel project `gyc`.
Until the standalone site is ready, GYC redirects temporarily to the published program page on the main website. Program dates and registration remain unannounced.
