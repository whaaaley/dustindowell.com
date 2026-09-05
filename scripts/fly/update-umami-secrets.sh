#!/bin/bash

# Source the .env sitting next to this script, regardless of the caller's cwd.
source "$(dirname "$0")/.env"

flyctl secrets set -a dustindowell-umami \
  APP_SECRET="$UMAMI_APP_SECRET"

echo "Done!"
