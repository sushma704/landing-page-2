# immob24.com — Pre-Launch Checklist

Tracking the work that must finish before the site can come off the
`noindex` lockdown and start earning organic traffic.

Last updated: 2026-05-26.

---

## 1. Blockers — site cannot leave `noindex` until these are done

These all stem from the same gap: there is no registered legal entity yet,
which means there is no real Impressum, no AGB, and no named controller in
the Datenschutzerklärung. Under German law, going live without these is the
exposure that forced the lockdown in the first place.

### 1.1 Entity registration
- Decide on the operating entity (UG, GmbH, Einzelunternehmen…).
- Register it; obtain the trade-register number and VAT ID (if any).
- Open a business address (registered seat).

### 1.2 Fill in entity-dependent placeholders
After entity is registered, the following `[…]` markers in the codebase
need real values:
- `src/components/legal/ImpressumContent.tsx` — § 5 TMG block (name,
  address, register court + number, VAT ID, responsible person under § 18
  Abs. 2 MStV).
- `src/components/legal/DatenschutzContent.tsx` — section 1
  (Verantwortlicher block, controller name + address) and section 15
  (competent supervisory authority — depends on entity's registered seat).
- `src/components/legal/TermsContent.tsx` — AGB are currently a draft;
  finalize against a model contract once the entity exists.

### 1.3 Flip the site-wide noindex back off
Only after 1.1 + 1.2 are complete:
- `immobee24-landing/index.html` — remove `<meta name="robots" content="noindex, nofollow">`.
- `immobee24-landing/public/robots.txt` — replace `Disallow: /` with the
  actual allow rules (and the sitemap reference).
- `immobee24-landing/public/sitemap.xml` — repopulate with the live URLs
  (15 routes — see App.tsx).

---

## 2. User-only actions (Sushma must do these in a browser)

I cannot do these from code — they require signed-in access to external
consoles.

### 2.1 Google Search Console
- Submit URL-removal requests for any URLs Google may have indexed during
  the period before the noindex lockdown was applied. This was flagged
  earlier in the session and is still outstanding.
- Once 1.3 is done, submit the new sitemap.xml.

### 2.2 Vendor accounts
- Confirm GA4 property is owned by an entity address that matches the new
  Impressum (currently bound to a personal Google account).
- Same for Meta Business Manager (Pixel ID 26806117632348430).
- Same for the RB2B account (`0OV0VHYVYJ6Z`).

---

## 3. Content gaps — data needed before the SEO pages can earn traffic

All 10 SEO landing pages still contain `[…]` placeholders for verifiable
stats. Until they're replaced, the pages risk reading as low-quality or
unsubstantiated to both Google and visitors.

Pages affected:
- `src/pages/seo/MaklersoftwareMuenchen.tsx` + `RealEstateAgentSoftwareMunich.tsx`
- `src/pages/seo/MaklersoftwareBerlin.tsx`  + `RealEstateAgentSoftwareBerlin.tsx`
- `src/pages/seo/MaklersoftwareHamburg.tsx` + `RealEstateAgentSoftwareHamburg.tsx`
- `src/pages/seo/KiFuerImmobilienmakler.tsx` + `AiForRealEstateAgents.tsx`
- `src/pages/CrmAlternativeDE.tsx` (also serves /en/real-estate-crm-alternative)

Data sources to consult:
- **IVD** (Immobilienverband Deutschland) — agent counts per city.
- **Immoscout24 / Immowelt** market reports — average asking prices,
  time-on-market, agent counts.
- **Bundesbank / Destatis** — macro housing-finance / household data.
- **Statistisches Landesamt** of the respective Bundesland — local stats.

I can paste the numbers in once they're supplied.

---

## 4. Vendor follow-ups (paperwork, not code)

The Datenschutzerklärung currently names each of these processors but does
NOT yet cite a signed DPA or a declared retention period for them.

### 4.1 BotPenguin (Botpenguin Inc.)
- Obtain a signed DPA / AVV.
- Get their declared retention period for chat transcripts.
- Get their declared sub-processor list (which servers / which regions).
- Decision: keep them, or switch to an EU-hosted alternative? They're
  currently disclosed under chat consent — workable, but a German alternative
  reduces Art. 49 friction.

### 4.2 RB2B (Retention.com, Inc.)
- Obtain a signed DPA.
- Get their declared retention period.
- Get their declared list of data sources used for the LinkedIn-style match
  (so it can be named in the privacy policy).
- Confirm whether they offer an EU-region option (most likely no — they're
  a US-only product).

### 4.3 Cal.com
- Already named as an independent controller in section 12 of the privacy
  policy — sufficient if the relationship remains "user is sent off-site to
  book." If you embed Cal.com in-page later, you'd need a DPA.

### 4.4 Google (GA4, Apps Script for newsletter)
- The Google account hosting the GA4 property and the Apps Script endpoint
  should ideally be under the operating entity's domain, not a personal
  Gmail. Migrate before launch.

---

## 5. Nice-to-haves (non-blocking)

- **Code-split the bundle.** Current JS is 1.2 MB pre-gzip (197 KB gzipped).
  Vite warns about chunk size on every build. Splitting per-route via
  dynamic imports would cut the first-paint payload, but no user-visible
  problem today.
- **Logo for the dark side of the header on small screens.** Currently the
  same dark wordmark is used everywhere the header renders — fine on the
  white desktop header, fine on the white mobile header. Only an issue if
  you ever ship a dark-themed page.
- **Image optimisation pass.** `hari-prasad-ceo.jpg` and `immob24-logo-*.jpg`
  in `public/` are not currently served via the build pipeline; they're
  static. If they're not used, delete; otherwise convert to webp.
- **`deploy.sh` heredoc bug.** During this session deploy.sh's Phase 1
  silently no-op'd (0.2s elapsed, empty stdout, exit success). The
  workaround was running each SSM step manually. Worth a closer look —
  likely the multi-line heredoc encoding fails intermittently when the
  parent shell isn't a TTY.

---

## Recommended order of operations

1. Register entity → fill `[…]` markers in legal docs → review locally
   with a German lawyer (one-hour consult is enough at this stage).
2. Collect IVD / Immoscout24 / Destatis stats; paste them into the 10 SEO
   pages.
3. Get BotPenguin + RB2B DPAs on file. Update the privacy policy with the
   retention periods they declare.
4. Migrate GA4 + Meta Pixel + Apps Script ownership to the entity's
   account (if not already).
5. Flip the site-wide `noindex` off (1.3). Submit the sitemap.xml in GSC.
6. Watch GSC + Bing Webmaster for the first 7-14 days of indexing.
