#!/usr/bin/env bash
set -euo pipefail

cd build

echo "Starting server at http://localhost:8000"
python3 -m http.server 8000
