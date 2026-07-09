#!/usr/bin/env bash
# THE deploy script for the immob24.com marketing site.
#
# Ships this repo (immobee24-landing/) to ECS/Fargate in Frankfurt on AWS
# account 020642895299 (eu-central-1). Builds dist/, pushes a single-arch
# ARM64 image to ECR, registers a new task-def revision from whatever the
# service currently runs (image swapped), rolls the service, and waits for it
# to stabilize. See deploy/DEPLOY-ECS.md for the infra map, the dashboard
# coexistence notes, and the /mkt-assets/ + ALB routing rules.
#
# NOTE: the old root-level ./deploy.sh (us-east-1 SSM/EC2 box) is DEAD — that
# infra was decommissioned 2026-07-03. Use THIS script for every deploy.
#
# Usage (run from anywhere; it cd's to the repo root itself):
#   ./deploy/deploy-ecs.sh                # auto-bump to the next vN tag, build, deploy
#   TAG=v9 ./deploy/deploy-ecs.sh         # force a specific image tag
#   SKIP_BUILD=1 ./deploy/deploy-ecs.sh   # reuse existing dist/ (still rebuilds the image)
#   AWS_PROFILE=immob24de ./deploy/deploy-ecs.sh
#
# Prereqs: aws CLI v2, docker + buildx, pnpm, python3, and credentials for
# account 020642895299 (default profile below is immob24de).

set -euo pipefail

: "${AWS_PROFILE:=immob24de}"
: "${AWS_DEFAULT_REGION:=eu-central-1}"
export AWS_PROFILE AWS_DEFAULT_REGION

REG="020642895299.dkr.ecr.eu-central-1.amazonaws.com"
REPO="immob24-de/marketing-nginx"
CLUSTER="immob24-de-cluster"
SERVICE="immob24-de-marketing"
SITE_URL="https://immob24.com/"

green() { printf '\033[32m%s\033[0m\n' "$*"; }
blue()  { printf '\033[34m%s\033[0m\n' "$*"; }
red()   { printf '\033[31m%s\033[0m\n' "$*"; }

for c in aws docker pnpm python3; do
  command -v "$c" >/dev/null 2>&1 || { red "Missing required command: $c"; exit 1; }
done

# Repo root = parent of this script's dir (deploy/).
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

blue "AWS: $(aws sts get-caller-identity --query Arn --output text) ($AWS_DEFAULT_REGION)"

# --- pick the image tag -----------------------------------------------------
if [[ -z "${TAG:-}" ]]; then
  MAX=$(aws ecr describe-images --repository-name "$REPO" \
          --query 'imageDetails[].imageTags[]' --output text 2>/dev/null \
        | tr '\t' '\n' | grep -E '^v[0-9]+$' | sed 's/^v//' | sort -n | tail -1)
  MAX=${MAX:-0}
  TAG="v$((MAX + 1))"
fi
IMAGE="$REG/$REPO:$TAG"
blue "Deploying image tag: $TAG"

# --- build the site ---------------------------------------------------------
if [[ "${SKIP_BUILD:-0}" == "1" ]]; then
  blue "SKIP_BUILD=1 — reusing existing dist/"
  [[ -f dist/index.html ]] || { red "dist/ is missing or empty; unset SKIP_BUILD"; exit 1; }
else
  blue "Building (pnpm build:prod) ..."
  pnpm build:prod
fi

# --- build + push the image -------------------------------------------------
blue "Logging in to ECR ..."
aws ecr get-login-password | docker login --username AWS --password-stdin "$REG"

blue "Building + pushing $IMAGE (linux/arm64, no attestations) ..."
# Fargate rejects buildx attestation manifests, so keep it single-arch.
docker buildx build --platform linux/arm64 --provenance=false --sbom=false \
  -t "$IMAGE" --push .

# --- register a new task-def revision from the live one ---------------------
blue "Registering new task-def revision (image -> $TAG) ..."
CUR_TD=$(aws ecs describe-services --cluster "$CLUSTER" --services "$SERVICE" \
         --query 'services[0].taskDefinition' --output text)
TDJSON="$(mktemp)"
trap 'rm -f "$TDJSON"' EXIT
aws ecs describe-task-definition --task-definition "$CUR_TD" \
  --query 'taskDefinition' --output json \
  | IMAGE="$IMAGE" python3 -c '
import json, os, sys
td = json.load(sys.stdin)
for c in td.get("containerDefinitions", []):
    c["image"] = os.environ["IMAGE"]
# Strip read-only fields that register-task-definition rejects.
for k in ("taskDefinitionArn", "revision", "status", "requiresAttributes",
          "compatibilities", "registeredAt", "registeredBy", "deregisteredAt"):
    td.pop(k, None)
json.dump(td, sys.stdout)
' > "$TDJSON"

NEW_TD=$(aws ecs register-task-definition --cli-input-json "file://$TDJSON" \
         --query 'taskDefinition.taskDefinitionArn' --output text)
green "Registered: $NEW_TD"

# --- roll the service -------------------------------------------------------
blue "Updating service $SERVICE ..."
aws ecs update-service --cluster "$CLUSTER" --service "$SERVICE" \
  --task-definition "$NEW_TD" >/dev/null

blue "Waiting for the service to stabilize (this can take a few minutes) ..."
aws ecs wait services-stable --cluster "$CLUSTER" --services "$SERVICE"

green "Deployed $TAG -> $SERVICE ($NEW_TD)."
blue  "Spot-check: curl -sI ${SITE_URL}"
