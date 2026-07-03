# Marketing site (immob24.com) — thin nginx image serving the Vite build.
# Build the site first (`pnpm build` -> dist/), then build this image from
# the immobee24-landing/ directory as context.
FROM nginx:alpine
COPY deploy/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
