#!/usr/bin/env bash
set -euo pipefail

# Override only for local dry-run tests; Actions always uses the personal repo.
destination="${SYNC_DESTINATION:-git@github.com:dikaprilio/impactional.git}"
git fetch --no-tags "$destination" refs/heads/main:refs/remotes/personal-sync/main
if ! git merge-base --is-ancestor refs/remotes/personal-sync/main HEAD; then
  echo 'Personal main has commits absent from org main. Reconcile them in the org before retrying; no history was overwritten.' >&2
  exit 1
fi
git push "$destination" HEAD:refs/heads/main
