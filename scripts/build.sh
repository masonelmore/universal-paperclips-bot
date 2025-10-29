#!/usr/bin/env bash
set -euo pipefail

echo -n "Building..."

# Copy game files
mkdir -p build
cp -r game/* build

# Bundle and copy bot files
{
    for file in bot/*.js; do
        echo "// FILE: $(basename "$file")"
        cat "$file"
        echo ""
    done
} > build/bot.bundle.js

echo "done"
