#!/bin/bash

# Unmanaged Postgres (`fly pg create`), not Managed (`fly mpg`) which has no free tier.
flyctl postgres create --name dustindowell-umami-pg --org personal --region ord \
  --vm-size shared-cpu-1x --vm-cpu-kind shared --initial-cluster-size 1 --volume-size 1

flyctl secrets unset DATABASE_URL -a dustindowell-umami --stage || true
flyctl postgres attach dustindowell-umami-pg --app dustindowell-umami

echo "Done!"
