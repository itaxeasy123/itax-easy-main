#!/usr/bin/env bash
#
# Server-side deploy for itaxeasy-frontend, with automatic rollback.
#
# The GitHub Actions workflow fast-forwards the checkout to the latest main,
# exports the previously-deployed commit as PREV_DEPLOY_REF, then runs this.
# If the build, restart, or post-deploy health check fails, we reset back to
# the previous commit and rebuild it so the last known-good version stays live.
#
# Safe to run by hand too:  cd ~/itax-easy-main && bash scripts/deploy.sh
#
set -Eeuo pipefail

PM2_NAME="itax-easy-main"
HEALTH_URL="http://127.0.0.1:3001"
HEALTH_RETRIES=15            # x2s = up to ~30s for the app to answer
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

# nvm isn't loaded in non-interactive shells; load it and pin node.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 18 >/dev/null

# .env is gitignored and must be provided on the server out-of-band.
if [ ! -f "$APP_DIR/.env" ]; then
  echo "ERROR: $APP_DIR/.env is missing. Create it before deploying." >&2
  exit 1
fi

# Commit to fall back to if this deploy fails. The workflow passes the
# previously-deployed SHA; otherwise derive it from the reflog.
PREV_REF="${PREV_DEPLOY_REF:-$(git rev-parse 'HEAD@{1}' 2>/dev/null || git rev-parse HEAD)}"
NEW_REF="$(git rev-parse HEAD)"
echo "==> node $(node -v) | deploying $NEW_REF | rollback target $PREV_REF"

build_and_start() {
  # package-lock.json is gitignored in this repo, so it won't be on the server.
  # Use the fast, reproducible `npm ci` only when a lockfile exists; otherwise
  # fall back to a plain install.
  if [ -f package-lock.json ]; then
    echo "==> npm ci"
    npm ci
  else
    echo "==> npm install (no lockfile)"
    npm install --no-audit --no-fund
  fi
  echo "==> prisma generate"
  npm run generate
  echo "==> next build"
  npm run build
  echo "==> (re)starting pm2 process '$PM2_NAME'"
  if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
    pm2 reload "$PM2_NAME" --update-env
  else
    pm2 start npm --name "$PM2_NAME" -- start
  fi
  pm2 save
}

# One HTTP probe of the app; works with whichever of curl/wget is installed.
# If neither exists we can't probe, so treat as healthy (don't fail a deploy
# just because no HTTP client is on the box).
probe() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsS -L --max-time 5 -o /dev/null "$HEALTH_URL"
  elif command -v wget >/dev/null 2>&1; then
    wget -q -T 5 -O /dev/null "$HEALTH_URL"
  else
    echo "WARN: no curl/wget — skipping health check" >&2
    return 0
  fi
}

# Return 0 once the app answers HTTP, retrying for a while as it boots.
healthy() {
  local i
  for i in $(seq 1 "$HEALTH_RETRIES"); do
    if probe; then
      return 0
    fi
    sleep 2
  done
  return 1
}

rollback() {
  trap - ERR                                   # don't recurse into ourselves
  echo "!!!! deploy of $NEW_REF FAILED — rolling back to $PREV_REF" >&2
  git reset --hard "$PREV_REF"
  if build_and_start && healthy; then
    echo "==> rollback OK: previous version ($PREV_REF) is live and healthy"
  else
    echo "!!!! ROLLBACK ALSO FAILED — app may be down, manual fix required" >&2
  fi
  exit 1
}

# Any failing command in build_and_start (build error, npm ci, pm2) trips this.
trap rollback ERR
build_and_start
trap - ERR

# Build/start succeeded — confirm the app actually serves traffic before
# declaring victory. If it doesn't come up, roll back to the previous commit.
if ! healthy; then
  echo "!! new version built but is not responding on $HEALTH_URL" >&2
  rollback
fi

echo "==> deploy complete: $NEW_REF is live and healthy"
