# Deploying the marketing site to immob24.com (Frankfurt / new AWS account)

immob24.com runs on AWS account **951395863325**, region **eu-central-1**, on the
ECS cluster `immob24-de-cluster` behind ALB `immob24-de-alb`. The marketing site
runs as the `immob24-de-marketing` Fargate service (ARM64), container port
**8080**, target group `immob24-de-tg-marketing`, health check `/nginx-health`.

> **Account move (2026-07-31).** Account 020642895299 is dead; the stack moved to
> 951395863325. The backend services and the dashboard came along, but the
> marketing site did **not** — so every path fell through the ALB default rule to
> the dashboard, which bounced visitors to `/login`. The marketing stack was
> rebuilt from scratch in the new account: ECR repo `immob24-de/marketing-nginx`,
> log group `/immob24-de/marketing-nginx`, target group, service, and the ALB
> rules below. Container port is **8080** (not 80) because the shared task SG
> `sg-081209159e93566fa` only admits the ALB SG `sg-0e1e7839d95456c3b` on 8080 —
> `nginx-spa.conf` listens on 8080 accordingly. Don't revert it to 80.

## Coexistence with the dashboard app (IMPORTANT)
The marketing site shares the `immob24.com` host with the **dashboard app**
(separate repo/service `immob24-de-frontend-nginx`). Both are Vite/React SPAs, so
both *used* to emit their bundle under `/assets/*` — only one target group can own
that path, so whoever lost the ALB race had its JS/CSS 404 and the site broke.

Fix: the marketing build emits its hashed bundle under **`/mkt-assets/`** instead
(`build.assetsDir: 'mkt-assets'` in `vite.config.ts`). The dashboard keeps
`/assets/*`. They no longer collide. **Do not revert `assetsDir`.**

ALB rules that must point at `immob24-de-tg-marketing`:
| Priority | Path(s) | Purpose |
|---|---|---|
| 6  | `/robots.txt` `/sitemap.xml` | SEO — must be OUR files, not the dashboard's |
| 8  | `/mkt-assets/*` | marketing JS/CSS/fonts (namespaced bundle) |
| 9  | `/privacy` `/terms` `/support` `/docs` | static legal pages |
| 13 | `/de` `/de/*` `/en` `/en/*` | marketing SPA routes (DE/EN) |
| 14 | `/fr` `/fr/*` `/ar` `/ar/*` | marketing SPA routes (FR/AR) |
| 17 | `/favicon.png` `/immob24-wordmark.png` `/immob24-wordmark-teal-dark.png` `/immob24-wordmark-white.png` `/logo.png` | root images |
| 18 | `/privacy.html` `/terms.html` `/support.html` `/docs.html` | static legal pages (.html) |
| 19 | `/google343c928c44c9906a.html` | Google Search Console verification token |
| 21 | `/og-image.png` `/screens/*` `/videos/*` | OG image + screenshot/video assets |
**There is no rule for bare `/`** — deliberate (2026-07-31): the dashboard keeps
the root, so immob24.com lands on the app login and the marketing site starts at
`/de` / `/en` / `/fr` / `/ar`. To hand `/` to marketing, add a rule at priority 35
for `/` pointing at `immob24-de-tg-marketing`.

`/api`, `/ws`, `/actuator` go to the api-gateway; everything else (`/login`,
`/dashboard`, `/assets/*`, `/*` fallback) is the dashboard's. NOTE: `/robots.txt`
and `/sitemap.xml` have no path prefix, so without the prio-6 rule they fall
through to the dashboard — which serves its own robots.txt and an HTML SPA for
`/sitemap.xml`, breaking Search Console. Keep the prio-6 rule.

## SEO / indexing (public launch — 2026-07-09)
The site is public (`index, follow`). Robots is per-route: `index.html` defaults
to `index, follow`; `useDocumentMeta({ robots })` overrides it (thank-you pages
set `noindex, nofollow`). `nginx-spa.conf` 301s `www` -> non-`www`. The sitemap
lists only canonical indexable pages (thank-you pages excluded). After any deploy
that changes indexability, resubmit the sitemap in Search Console.

## Fargate capacity + zero-downtime deploys
Resolved (2026-07-11): the Fargate On-Demand vCPU quota (`L-3032A538`,
eu-central-1) was raised **8 -> 48**, so the cluster (~14.5 vCPU) has ample
headroom and marketing no longer flaps. `immob24-de-migration-service` — which
was temporarily scaled to 0 on 2026-07-09 during the crunch — is back to 1/1.

The marketing service now runs **zero-downtime deploys**:
`minimumHealthyPercent=100 maximumPercent=200` + `availability-zone-rebalancing
ENABLED` (max>100 is required for AZR). ECS starts the new task and waits for it
to be healthy before draining the old — no 503 blip. The `immob24-de-tg-marketing`
**deregistration (drain) delay was cut 300 -> 15s** (static site, no long-lived
connections), so the old task retires fast.
History: during the over-quota crunch the service used `min0/max100` +
AZR disabled, which replace-in-place and (with the old 300s drain) caused multi-
minute 503s on every deploy. Don't revert to that unless the cluster is over quota
again.

**Gotcha for any new root-level file** (verification tokens, `ads.txt`, etc.):
the ALB **default rule** sends it to the *dashboard*, not marketing. Putting
the file in `public/` alone is not enough — you must also add an explicit ALB
rule pointing that exact path at `immob24-de-tg-marketing` (see prio 19 above).

## Redeploy after a content change
```bash
export AWS_PROFILE=default AWS_DEFAULT_REGION=eu-central-1   # account 951395863325
REG=951395863325.dkr.ecr.eu-central-1.amazonaws.com
TAG=v2                                          # bump on each build

BUILD_MODE=prod pnpm build                      # produces dist/ (run in immobee24-landing/)
aws ecr get-login-password | docker login --username AWS --password-stdin $REG
# single-arch ARM64 image (Fargate rejects buildx attestation manifests):
docker buildx build --platform linux/arm64 --provenance=false --sbom=false \
  -t $REG/immob24-de/marketing-nginx:$TAG --push .

# register a new task-def revision pointing at the new tag, then:
aws ecs update-service --cluster immob24-de-cluster \
  --service immob24-de-marketing --task-definition immob24-de-marketing-nginx:<rev>
```

## Who owns what (as of 2026-07-31)
The dashboard owns `/`, `/login`, `/dashboard`, `/assets/*`, and the `/*`
fallback. Marketing holds `/de*`, `/en*`, `/fr*`, `/ar*`, `/mkt-assets/*`, the
legal pages, the root images, and `/screens/*` + `/videos/*` — so the two coexist.
To give marketing the bare `/`, add the prio-35 rule described above.
