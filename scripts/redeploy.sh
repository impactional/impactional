#!/usr/bin/env bash
# Deploy this working tree to Vercel, uncommitted changes included.
# Normal production releases still go through main; see Documentation/deployment.md.
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: pnpm redeploy [--watch | --prod [--yes]]

  pnpm redeploy           Preview deployment of your local files. It gets its own
                          URL and never touches impactional.net.
  pnpm redeploy:watch     Deploy a preview now, then a new one each time your files
                          change (after edits settle). Ctrl+C to stop.
  pnpm redeploy --prod    Production deployment of your local files. Asks you to
                          type "production" first; --yes skips that.

Environment overrides:
  REDEPLOY_POLL_SECONDS    How often --watch checks for changes (default 3)
  REDEPLOY_SETTLE_SECONDS  Quiet time --watch waits for before deploying (default 10)
  VERCEL_CLI_VERSION       Vercel CLI version to run (default pinned below)
EOF
}

readonly cli_version="${VERCEL_CLI_VERSION:-65.2.0}"
# Project selectors, not secrets: they target bibobaggins-projects/impactional
# without needing `vercel link`.
export VERCEL_ORG_ID="${VERCEL_ORG_ID:-team_OFqQFv4mzIzA11XlaXcAqAKd}"
export VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID:-prj_a8aQ8TyYZEDDAGHeMbM9mpECUSPP}"
readonly poll_seconds="${REDEPLOY_POLL_SECONDS:-3}"
readonly settle_seconds="${REDEPLOY_SETTLE_SECONDS:-10}"

log() { printf '[redeploy] %s\n' "$*" >&2; }
die() { log "$*"; exit 1; }
vercel() { pnpm --reporter=silent dlx "vercel@$cli_version" "$@"; }

target=preview
watch=false
confirmed=false
while (($#)); do
  case "$1" in
    --prod) target=production ;;
    --watch) watch=true ;;
    --yes) confirmed=true ;;
    -h | --help) usage; exit 0 ;;
    *) usage >&2; die "Unknown option: $1" ;;
  esac
  shift
done
if [[ $target == production && $watch == true ]]; then
  die "--watch only makes preview deployments. Drop --prod."
fi

cd "$(dirname "${BASH_SOURCE[0]}")/.."

describe_tree() {
  local state=clean
  [[ -n "$(git status --porcelain)" ]] && state="with uncommitted changes"
  printf '%s @ %s (%s)' "$(git rev-parse --abbrev-ref HEAD)" "$(git rev-parse --short HEAD)" "$state"
}

# One hash for everything the deploy would pick up: the commit, edits to tracked
# files, and new files Git doesn't ignore. Read-only: nothing is staged or written.
fingerprint() {
  {
    git rev-parse HEAD
    git --no-pager diff --no-ext-diff --no-textconv --no-color --binary HEAD
    git ls-files --others --exclude-standard
    git ls-files --others --exclude-standard -z | xargs -0 -r git hash-object --
  } 2>/dev/null | git hash-object --stdin
}

deploy() {
  local args=(deploy --yes) out url
  [[ $target == production ]] && args+=(--prod)
  log "Deploying $(describe_tree) to $target..."
  # Progress goes to stderr. Stdout is the bare URL in a terminal, or JSON with
  # a "url" field when the CLI detects an agent (e.g. Claude Code) running it.
  if ! out="$(vercel "${args[@]}")"; then
    log "Deployment failed; see the output above."
    return 1
  fi
  url="$(sed -nE 's/^[[:space:]]*"url": "([^"]+)".*/\1/p' <<<"$out" | head -n 1)"
  [[ -n $url ]] || url="$(grep -E '^https://' <<<"$out" | tail -n 1 || true)"
  log "Ready: ${url:-see the Preview/Production URL above}"
}

confirm_production() {
  [[ $confirmed == true ]] && return
  [[ -t 0 ]] || die "Production needs confirmation. Rerun with --yes."
  log "This replaces https://impactional.net with $(describe_tree)."
  log "It stays live until the next push to main redeploys production from Git."
  local answer
  read -r -p "[redeploy] Type 'production' to continue: " answer
  [[ $answer == production ]] || die "Cancelled. Nothing was deployed."
}

watch_loop() {
  local deployed current next
  trap 'log "Stopped watching."; exit 0' INT TERM
  log "Watching for changes every ${poll_seconds}s. Ctrl+C to stop."
  deployed="$(fingerprint)"
  deploy || log "Will try again after your next change."
  while sleep "$poll_seconds"; do
    current="$(fingerprint)"
    [[ $current == "$deployed" ]] && continue
    log "Change detected. Deploying once files stay unchanged for ${settle_seconds}s..."
    while sleep "$settle_seconds"; next="$(fingerprint)"; [[ $next != "$current" ]]; do
      current="$next"
    done
    [[ $current == "$deployed" ]] && { log "Changes were undone. Nothing to deploy."; continue; }
    deployed="$current"
    deploy || log "Will try again after your next change."
  done
}

command -v pnpm >/dev/null || die "pnpm is required: https://pnpm.io/installation"
if ! vercel whoami >/dev/null 2>&1; then
  die "Vercel CLI couldn't confirm a login (logged out or offline). Run: pnpm dlx vercel@$cli_version login"
fi

if [[ $watch == true ]]; then
  watch_loop
else
  [[ $target == production ]] && confirm_production
  deploy
fi
