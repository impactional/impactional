# Deployment and domain ownership

The canonical production URL is https://impactional.net. `www.impactional.net` redirects to the apex with HTTP 308. Vercel hosts the `impactional` project in the existing team and manages DNS; Rumahweb remains the registrar. Keep historical `.org/post/...` article links until those articles have actually migrated.

## DNS and HTTPS

The domain is registered at Rumahweb, with authoritative DNS managed by Vercel. The registrar nameservers are `ns1.vercel-dns.com` and `ns2.vercel-dns.com` (confirmed in the .net registry on 2026-09-21).

| Name | Type | Destination |
| --- | --- | --- |
| `@` | ALIAS | Vercel-managed `c21ccbb43de0f1a0.vercel-dns-017.com` |
| `www` | CNAME | `c21ccbb43de0f1a0.vercel-dns-017.com.` |
| `gyc` | CNAME | `da53d7f0a504d050.vercel-dns-017.com.` |

Vercel also manages the default CAA records, including Let's Encrypt. Change DNS records in Vercel, not Rumahweb's old DNS zone. That old zone is retained during the nameserver transition so cached delegations continue routing to Vercel. It has an apex A record of `76.76.21.21` and equivalent `www`/`gyc` CNAMEs.

During HTTPS recovery on 2026-09-21, public HTTP reached the site while TLS failed from both a local client and a GitHub-hosted runner. Vercel's automatic HTTP validation and its manual TXT pretest failed despite public resolvers answering the configured records. DNS was moved to Vercel after copying all required routing and certificate-verification records. Vercel then reported the domain correctly configured and successfully issued a Let's Encrypt certificate covering the apex, `www`, and `gyc`. Automatic renewal is enabled; the certificate issued during recovery expires on 2026-12-20. No private certificate keys are stored in the repository.

Recovery was verified at approximately 19:31 WIB on 2026-09-21: all three hosts presented a valid certificate, HTTP redirected to HTTPS, the apex returned 200, `www` redirected to the apex with 308, and `gyc` redirected to the main site's Global Youth Circle program page with 307. The independent [GitHub-hosted domain check also passed](https://github.com/impactional/impactional/actions/runs/35599817344).

A successful DNS save or Ready deployment does not prove HTTPS is live. Verify the deployed certificate, redirects, and responses before marking recovery complete.

## Org to personal sync

Make site changes in `impactional/impactional`, branch `main`. Every push runs `.github/workflows/sync-personal.yml`, which fast-forwards `dikaprilio/impactional:main`. The personal repository remains Vercel's Git source. Feature branches and tags are not mirrored. A manual **Run workflow** is available in Actions.

Authentication uses a dedicated write deploy key for the personal repository, stored as `PERSONAL_MIRROR_SSH_KEY` in the organization repository's Actions secrets. `MIRROR_KNOWN_HOSTS` contains GitHub's published SSH host keys. This key cannot access other repositories. Only trusted maintainers should be allowed to change the default branch or its workflows.

The sync never force-pushes or deletes refs. If personal `main` gains independent commits, bring them into the org's `main` and retry. Do not push site changes directly to personal `main`. The repository guard prevents recursion when the workflow is copied into the personal repository.

## Global Youth Circle

Repository: https://github.com/impactional/gyc (private starter).
Domain: https://gyc.impactional.net, separate Vercel project `gyc`.
Until the standalone site is ready, GYC redirects temporarily to the published program page on the main website. Program dates and registration remain unannounced.

The GYC deployment was uploaded directly. Automatic Git deployment for GYC is not connected because the current Vercel GitHub integration cannot access the new org repository. See the GYC README for the deployment instructions and the Git connection step.

## Domain diagnostics

Run `.github/workflows/check-domains.yml` manually to inspect the Vercel nameservers and the previous Rumahweb nameservers during migration and verify HTTP/HTTPS from a GitHub-hosted runner. It uses no credentials and does not bypass certificate checks.
