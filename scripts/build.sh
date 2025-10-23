#!/usr/bin/env bash
set -euo pipefail

echo "Building..."

mkdir -p build
cp -r game/* build
cp -r bot build/bot
