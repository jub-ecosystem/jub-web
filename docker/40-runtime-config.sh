#!/bin/sh
# Writes /usr/share/nginx/html/config.js from the VITE_* variables present in the
# container environment. Variables that are not set are left out, so the app
# falls back to the values baked in at build time.
set -e

CONFIG_FILE=/usr/share/nginx/html/config.js

{
  echo "window.__APP_CONFIG__ = {"
  env | grep '^VITE_' | while IFS='=' read -r key value; do
    [ -z "$value" ] && continue
    escaped=$(printf '%s' "$value" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')
    echo "  \"$key\": \"$escaped\","
  done
  echo "};"
} > "$CONFIG_FILE"

echo "runtime-config: wrote $(grep -c '^  "' "$CONFIG_FILE" || true) variable(s) to $CONFIG_FILE"
