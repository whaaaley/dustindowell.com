#!/bin/bash

# Source the .env sitting next to this script, regardless of the caller's cwd.
source "$(dirname "$0")/.env"

gh secret set CLOUDFLARE_API_TOKEN <<< "$CLOUDFLARE_API_TOKEN"

echo "Done!"
