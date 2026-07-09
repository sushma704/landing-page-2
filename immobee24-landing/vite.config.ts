import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-identifier'

const isProd = process.env.BUILD_MODE === 'prod'
export default defineConfig({
  plugins: [
    react(),
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Marketing shares immob24.com with the dashboard app, which owns
    // /assets/*. Emit our hashed bundle under /mkt-assets/ instead so the two
    // sites never collide on the shared ALB. The ALB routes /mkt-assets/* to
    // the marketing target group. Static files in public/ (logo, favicon,
    // legal .html) still land at the web root and keep their own ALB rules.
    assetsDir: 'mkt-assets',
  },
})
