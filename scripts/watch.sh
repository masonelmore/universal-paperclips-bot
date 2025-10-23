#!/usr/bin/env bash
set -euo pipefail

WATCH_DIRS=("game" "bot")

main() {
  echo "Starting server and watching for changes..."
  make run &

  while read -r _; do
      echo "Changes detected. Rebuilding..."
      make build
      echo "Complete."
  done < <(event_src)
}

event_src() {
  if command -v inotifywait >/dev/null 2>&1; then
    inotifywait --monitor --recursive --event modify,create,delete "${WATCH_DIRS[@]}"
  elif command -v fswatch >/dev/null 2>&1; then
    fswatch --one-per-batch --recursive "${WATCH_DIRS[@]}"
  else
    echo "Install fswatch (macOS) or inotifywait (Linux) to use this script." >&2
    exit 1
  fi
}

main
