# Deploying the marketing site to immob24.com (Frankfurt / new AWS account)

immob24.com runs on AWS account **020642895299**, region **eu-central-1**, on the
ECS cluster `immob24-de-cluster` behind ALB `immob24-de-alb`. The marketing site
runs as the `immob24-de-marketing` Fargate service (ARM64); the ALB rule at
**priority 35** (`/* -> immob24-de-marketing-tg`) makes it the site frontend.
`/api`, `/ws`, `/actuator` go to the api-gateway. The dashboard app is a
SEPARATE repo/service (`immob24-de-frontend-nginx`).

## Redeploy after a content change
```bash
export AWS_PROFILE=<profile-for-020642895299> AWS_DEFAULT_REGION=eu-central-1
REG=020642895299.dkr.ecr.eu-central-1.amazonaws.com

pnpm install && pnpm build                    # produces dist/  (run in immobee24-landing/)
aws ecr get-login-password | docker login --username AWS --password-stdin $REG
# single-arch ARM64 image (Fargate rejects buildx attestation manifests):
docker build --platform linux/arm64 --provenance=false --sbom=false \
  -t $REG/immob24-de/marketing-nginx:v1 .
docker push $REG/immob24-de/marketing-nginx:v1

aws ecs update-service --cluster immob24-de-cluster \
  --service immob24-de-marketing --force-new-deployment
```

## Restore the dashboard at / (once its image is rebuilt with VITE_WS_URL)
```bash
# point /* back to the dashboard target group, or delete the prio-35 rule:
aws elbv2 delete-rule --rule-arn <prio-35-rule-arn>
```
