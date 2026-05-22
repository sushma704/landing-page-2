#!/usr/bin/env bash
# Deploy immob24.com landing page from local machine via SSM Run Command.
#
# Usage:  ./deploy.sh
#
# What it does:
#   1. Sends a build command to the EC2 (git pull origin/main + pnpm build).
#   2. Streams the result, then prompts before touching live files.
#   3. On confirm: timestamped backup, rsync swap, chown www-data.
#
# Prereqs on your laptop:
#   - aws CLI v2 installed and configured (or AWS_PROFILE set)
#   - python3 (used to safely JSON-encode the inline scripts)
#   - IAM permissions: ssm:SendCommand, ssm:GetCommandInvocation, sts:GetCallerIdentity
#
# What the script does NOT do:
#   - It does not push or commit locally — push to origin/main first.
#   - It does not roll back automatically. Rollback command is printed on swap failure.

set -euo pipefail

INSTANCE_ID="i-03581c2ffb96b68df"
REGION="us-east-1"
REPO_DIR="/home/ssm-user/work/landing-page-2/immobee24-landing"
WEB_ROOT="/var/www/immobee24"

red()    { printf '\033[31m%s\033[0m\n' "$*"; }
green()  { printf '\033[32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }
blue()   { printf '\033[34m%s\033[0m\n' "$*"; }

require() {
  command -v "$1" >/dev/null 2>&1 || { red "Missing required command: $1"; exit 1; }
}
require aws
require python3

if ! aws sts get-caller-identity --region "$REGION" >/dev/null 2>&1; then
  red "AWS credentials not working. Run 'aws configure' or export AWS_PROFILE."
  exit 1
fi

# JSON-encode a script body so it survives --parameters parsing.
encode_params() {
  python3 -c 'import json,sys; print(json.dumps({"commands":[sys.stdin.read()]}))'
}

run_ssm() {
  local label="$1"
  local script="$2"
  local params
  params=$(printf '%s' "$script" | encode_params)

  local cmd_id
  cmd_id=$(aws ssm send-command \
    --instance-ids "$INSTANCE_ID" \
    --region "$REGION" \
    --document-name "AWS-RunShellScript" \
    --comment "immob24 deploy: $label" \
    --parameters "$params" \
    --query "Command.CommandId" \
    --output text)

  echo "CommandId: $cmd_id"
  printf "Waiting for %s " "$label"

  local status
  while true; do
    status=$(aws ssm get-command-invocation \
      --command-id "$cmd_id" \
      --instance-id "$INSTANCE_ID" \
      --region "$REGION" \
      --query "Status" \
      --output text 2>/dev/null || echo "Pending")
    case "$status" in
      Success) echo; green "$label succeeded"; break;;
      Failed|Cancelled|TimedOut|"Delivery Timed Out"|"Execution Timed Out")
        echo; red "$label status: $status"
        dump_output "$cmd_id"
        exit 1
        ;;
      *) printf "."; sleep 5;;
    esac
  done

  dump_output "$cmd_id"
}

dump_output() {
  local cmd_id="$1"
  local stdout stderr
  stdout=$(aws ssm get-command-invocation \
    --command-id "$cmd_id" \
    --instance-id "$INSTANCE_ID" \
    --region "$REGION" \
    --query "StandardOutputContent" \
    --output text)
  stderr=$(aws ssm get-command-invocation \
    --command-id "$cmd_id" \
    --instance-id "$INSTANCE_ID" \
    --region "$REGION" \
    --query "StandardErrorContent" \
    --output text)

  if [ -n "$stdout" ] && [ "$stdout" != "None" ]; then
    blue "--- stdout ---"
    printf '%s\n' "$stdout"
  fi
  if [ -n "$stderr" ] && [ "$stderr" != "None" ]; then
    yellow "--- stderr ---"
    printf '%s\n' "$stderr"
  fi
}

# ---- Build phase ------------------------------------------------------------

BUILD_SCRIPT=$(cat <<EOF
set -e
sudo -iu ssm-user bash -c '
  set -e
  cd $REPO_DIR
  echo "--- git fetch + reset to origin/main ---"
  git fetch origin
  git reset --hard origin/main
  git log -1 --oneline
  echo "--- pnpm build ---"
  pnpm build
  echo "--- dist contents ---"
  ls -1 dist | head -20
'
EOF
)

blue "==> Phase 1: build on $INSTANCE_ID"
run_ssm "build" "$BUILD_SCRIPT"

# ---- Confirmation gate ------------------------------------------------------

echo
yellow "Next step will:"
yellow "  - back up $WEB_ROOT to $WEB_ROOT.bak.<timestamp>"
yellow "  - rsync --delete the new build into $WEB_ROOT"
yellow "  - chown www-data:www-data $WEB_ROOT"
read -r -p "Proceed with swap? [y/N] " ans
case "$ans" in
  y|Y|yes|Yes) ;;
  *) red "Aborted before swap. Build is on server; rerun deploy.sh to swap later."; exit 0;;
esac

# ---- Swap phase -------------------------------------------------------------

SWAP_SCRIPT=$(cat <<EOF
set -e
BACKUP="$WEB_ROOT.bak.\$(date +%Y%m%d-%H%M%S)"
echo "--- backup -> \$BACKUP ---"
cp -a $WEB_ROOT "\$BACKUP"
echo "--- rsync --delete from $REPO_DIR/dist/ ---"
rsync -av --delete $REPO_DIR/dist/ $WEB_ROOT/
echo "--- chown ---"
chown -R www-data:www-data $WEB_ROOT
echo "--- recent backups ---"
ls -1dt $WEB_ROOT.bak.* | head -5
EOF
)

blue "==> Phase 2: swap"
run_ssm "swap" "$SWAP_SCRIPT"

green "Deploy complete. Verify at https://immob24.com (hard-refresh)."
echo
echo "Rollback (if needed):"
echo "  aws ssm start-session --target $INSTANCE_ID --region $REGION"
echo "  sudo rsync -av --delete $WEB_ROOT.bak.<timestamp>/ $WEB_ROOT/"
echo "  sudo chown -R www-data:www-data $WEB_ROOT"
