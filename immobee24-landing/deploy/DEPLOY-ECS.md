# Deploying the marketing site to immob24.com (Frankfurt / new AWS account)

immob24.com runs on AWS account **020642895299**, region **eu-central-1**, on the
ECS cluster `immob24-de-cluster` behind ALB `immob24-de-alb`. The marketing site
runs as the `immob24-de-marketing` Fargate service (ARM64).

## Coexistence with the dashboard app (IMPORTANT)
The marketing site shares the `immob24.com` host with the **dashboard app**
(separate repo/service `immob24-de-frontend-nginx`). Both are Vite/React SPAs, so
both *used* to emit their bundle under `/assets/*` — only one target group can own
that path, so whoever lost the ALB race had its JS/CSS 404 and the site broke.

Fix: the marketing build emits its hashed bundle under **`/mkt-assets/`** instead
(`build.assetsDir: 'mkt-assets'` in `vite.config.ts`). The dashboard keeps
`/assets/*`. They no longer collide. **Do not revert `assetsDir`.**

ALB rules that must point at `immob24-de-marketing-tg`:
| Priority | Path(s) | Purpose |
|---|---|---|
| 6  | `/robots.txt` `/sitemap.xml` | SEO — must be OUR files, not the dashboard's |
| 8  | `/mkt-assets/*` | marketing JS/CSS/fonts (namespaced bundle) |
| 9  | `/privacy` `/terms` `/support` `/docs` | static legal pages |
| 13 | `/de` `/de/*` `/en` `/en/*` | marketing SPA routes |
| 17 | `/immob24-wordmark.png` `/immob24-wordmark-white.png` `/favicon.png` | root images |
| 18 | `/privacy.html` `/terms.html` `/support.html` `/docs.html` | static legal pages (.html) |
| 19 | `/google343c928c44c9906a.html` | Google Search Console verification token |
| 35 | `/` | bare root |
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

## Fargate capacity note
Resolved (2026-07-11): the Fargate On-Demand vCPU quota (`L-3032A538`,
eu-central-1) was raised **8 -> 48**, so the cluster (~14.5 vCPU) has ample
headroom and marketing no longer flaps. `immob24-de-migration-service` — which
was temporarily scaled to 0 on 2026-07-09 during the crunch — is back to 1/1.
History for reference: when over quota, a rolling deploy that stopped marketing's
0.25-vCPU task couldn't re-place it and the site 503'd. The marketing service
still carries `minimumHealthyPercent=0 maximumPercent=100` +
`availability-zone-rebalancing DISABLED` from that period (harmless with headroom;
means deploys replace-in-place with a brief blip — reset to 100/200 if desired).

**Gotcha for any new root-level file** (verification tokens, `ads.txt`, etc.):
the `/*` fallback (prio 40) sends it to the *dashboard*, not marketing. Putting
the file in `public/` alone is not enough — you must also add an explicit ALB
rule pointing that exact path at `immob24-de-marketing-tg` (see prio 19 above).

## Redeploy after a content change
```bash
export AWS_PROFILE=<profile-for-020642895299> AWS_DEFAULT_REGION=eu-central-1
REG=020642895299.dkr.ecr.eu-central-1.amazonaws.com
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

## Restore the dashboard at / (once its image is rebuilt with VITE_WS_URL)
The dashboard already owns `/login`, `/dashboard`, `/assets/*`, and the `/*`
fallback. Marketing only holds `/`, `/de*`, `/en*`, `/mkt-assets/*`, the legal
pages, and the root images — so the two coexist. To hand the bare `/` back to the
dashboard, delete or repoint the prio-35 rule; the rest can stay.
