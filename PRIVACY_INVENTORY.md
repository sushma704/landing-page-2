# immob24.com — Privacy / Data Processing Inventory

**Purpose of this document**

A structured list of every external party that sees visitor data via immob24.com,
plus every cookie / localStorage entry, every form, and every relevant
infrastructure fact. This is the input a lawyer or text generator (eRecht24,
activeMind, datenschutz.org) needs to draft a real Datenschutzerklärung,
Impressum, and Cookie-Richtlinie.

**Status:** generated from the live codebase on the date this file was last updated.
Re-check before launch and any time a new third-party service is added.

**What I am claiming / not claiming**

I am not a lawyer. This inventory is a description of what the code currently
does — what data flows where. Choosing the correct legal basis for each item,
and writing the final policy text, is a legal call. The notes under "Likely
legal basis" are flags for review, not advice.

---

## 1. Recipients of personal data (third parties the site contacts)

### 1.1 Google Analytics 4
- **Operator / Controller:** Google Ireland Ltd., Gordon House, 4 Barrow St, Dublin 4, Ireland — with onward transfers to Google LLC (USA).
- **Property ID:** `G-MQKZ3EHWR9`
- **Data transmitted:** anonymised IP address (`anonymize_ip: true` is set on init in `src/lib/consent.ts`), browser user agent, page URL/title, referrer, language, device type, custom events (`page_view`, `newsletter_open`, `newsletter_subscribe`, `language_change`, plus CTA click events).
- **Purpose:** measure how visitors use the site so we can improve content and conversion.
- **Likely legal basis:** consent — Art. 6(1)(a) GDPR + § 25(1) TTDSG.
- **Third-country transfer:** yes (US). Covered by the EU–US Data Privacy Framework (Google is certified). Art. 44–49 GDPR disclosure required.
- **Cookies set:** `_ga`, `_ga_<container>` (lifetime ~2 years), plus a short-lived `_gid` on some configurations.
- **Consent-gated?** Yes — script does not load until visitor accepts the **Analytics** category.

### 1.2 Meta Pixel (Facebook Pixel)
- **Operator / Controller:** Meta Platforms Ireland Ltd., 4 Grand Canal Square, Dublin 2, Ireland — with onward transfer to Meta Platforms Inc. (USA).
- **Pixel ID:** `26806117632348430`
- **Data transmitted:** IP address, browser user agent, page URL, the visitor's Facebook user ID if they are logged in to Facebook in the same browser, `PageView` events.
- **Purpose:** measure effectiveness of Meta advertising campaigns, build website-custom-audiences for retargeting.
- **Likely legal basis:** consent — Art. 6(1)(a) GDPR + § 25(1) TTDSG. The US transfer additionally requires Art. 49(1)(a) GDPR (explicit informed consent) — make sure the consent banner text covers this.
- **Third-country transfer:** yes (US). Joint-controller relationship — a separate joint-controller agreement with Meta should be referenced.
- **Cookies set:** `_fbp` (3 months), occasionally `fr` on the facebook.com domain (90 days, set by Meta, not by us).
- **Consent-gated?** Yes — script does not load until visitor accepts the **Marketing** category.

### 1.3 Google Fonts ⚠️ NOT consent-gated
- **Operator:** Google Ireland Ltd. / Google LLC (USA).
- **Data transmitted:** visitor IP address (every page load), browser user agent, referrer.
- **Purpose:** load the web fonts `DM Sans`, `Inter`, `Poppins` for typography.
- **Where in code:** `index.html` lines 55–57 — `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com">`, and the stylesheet link.
- **⚠️ Compliance flag:** This currently fires on every page load, before any consent. **LG München I, 20.01.2022, 3 O 17493/20** held that embedding Google Fonts without consent is a GDPR violation (the court awarded €100 to the plaintiff). Two ways to fix:
  - **(a) Self-host the fonts** using `@fontsource/...` packages — eliminates the third-party request entirely. Cleanest fix. ~30 min of work.
  - **(b) Gate Google Fonts behind consent** — adds a visible "no font / system font" flash to first-time visitors before they decide. UX-hostile, not recommended.
- **Recommendation:** do option (a) before the public launch.

### 1.4 Cal.com (demo booking)
- **Operator:** Cal.com, Inc., 800 Westchester Ave Suite N-641, Rye Brook, NY 10573, USA. EU instance under `cal.eu` is operated through their European footprint but the controller entity is US.
- **Booking page used:** `https://www.cal.eu/hari-prasad-iu7zxy`
- **Data transmitted:** only when a visitor actively clicks "Request demo" — they leave immob24.com and go to Cal.com directly. Cal.com collects: name, email, scheduling preference, any free-text from the booking form.
- **Purpose:** book sales / demo calls.
- **Likely legal basis:** Art. 6(1)(b) GDPR (pre-contractual measures — the visitor is requesting a demo from us).
- **Third-country transfer:** yes (US). EU–US DPF certification status: verify with Cal.com legal before launch.
- **Consent-gated?** Not needed for the visit itself (visitor actively chose to navigate there). Cal.com runs its own cookie banner on its domain.
- **Note:** Cal.com is a **separate controller** for the data the visitor submits on cal.eu. immob24 becomes a recipient when the booking confirmation reaches Hari Prasad's calendar.

### 1.5 Google Apps Script (newsletter submission)
- **Operator:** Google Ireland Ltd. (Workspace services) / Google LLC (USA — Apps Script runtime).
- **Endpoint used:** `https://script.google.com/macros/s/AKfycbx-c7o5Yaz7p1CVgSehLONixeBJZmvcmo-KKKcvRls7h2N_hfSDj7_q7n2HgAm4DekV1A/exec` — deployed as "execute as Me, anyone can access".
- **Data transmitted:** name (optional), email (required), submission timestamp. Apps Script writes the row to a Google Sheet owned by Sushma's Google account.
- **Purpose:** collect newsletter sign-ups.
- **Likely legal basis:** Art. 6(1)(a) GDPR (consent — the visitor actively submits the form). The submit button doubles as the consent action; the small print under the form already says "By subscribing you agree to receive our newsletter."
- **Third-country transfer:** yes (US). Google Workspace is covered by Google's standard DPA + EU–US DPF.
- **Retention:** indefinite — the Google Sheet grows row-by-row. **Action needed:** define a retention period (e.g. "until unsubscribe + 30 days") and document a deletion process. A request-deletion email address should appear in the privacy policy.

### 1.6 AWS (hosting)
- **Operator:** Amazon Web Services EMEA SARL (38 Avenue John F. Kennedy, L-1855 Luxembourg) — with onward transfer to Amazon Web Services, Inc. (USA).
- **Region used:** `us-east-1` (N. Virginia).
- **Data transmitted:** every visitor IP, request URL, user agent, timestamp — into nginx access logs on the EC2 instance.
- **Purpose:** serving the website.
- **Likely legal basis:** Art. 6(1)(f) GDPR (legitimate interest — operating a website inherently requires processing connection metadata).
- **Third-country transfer:** yes (US — the bucket region is N. Virginia). Standard Contractual Clauses + AWS DPA cover this.
- **Retention of logs:** unknown — Hari Prasad to confirm nginx log rotation policy. Default Ubuntu nginx keeps `access.log` for 14 days, gzipped backups for ~52 weeks. Document the actual policy.
- **DNS:** Route 53 (AWS) — answers DNS queries, sees IP of the resolver (usually visitor's ISP, not the visitor directly).

### 1.7 LinkedIn (mentioned only)
- **Where:** `src/lib/schema.ts` line 21 — `sameAs: ['https://linkedin.com/company/immob24']` inside the Organization JSON-LD.
- **What this does:** publishes a *link* in structured data so search engines know the LinkedIn page belongs to immob24. **No script loads, no iframe embeds, no data flows to LinkedIn from a visit to immob24.com.**
- **Compliance impact:** none — this is just a URL string in markup.

### 1.9 BotPenguin (chat widget)
- **Operator:** Botpenguin Inc. — script served from `cdn.botpenguin.com`. Company is US-incorporated with engineering footprint in India; confirm with their DPA which entity is the data controller for EU visitors.
- **Widget IDs in use:** `6a14160e9023bca2877cf724`, `6a14135edd1338ee4740a229`.
- **Where in code:** loader in `src/lib/consent.ts` (`enableBotPenguin` / `disableBotPenguin`); UI auto-positions bottom-right.
- **Data transmitted:** on widget load — visitor IP, browser user agent, page URL. During chat — message content, any contact details the visitor types in (name, email, phone), conversation state.
- **Purpose:** real-time visitor support / pre-sales chat.
- **Likely legal basis:** consent — Art. 6(1)(a) GDPR + § 25(1) TTDSG. For any transfer to US / India: Art. 49(1)(a) GDPR (explicit informed consent).
- **Third-country transfer:** yes (US / India likely). Need to obtain and store BotPenguin's standard DPA + verify their certifications.
- **Cookies set:** chat widgets typically set `botpenguin_*` first-party cookies and may use localStorage for conversation state.
- **Consent-gated?** Yes — added as a third toggle category ("Chat / Kommunikation") in the cookie banner alongside Analytics and Marketing. Storage key bumped `immob24_consent_v1` → `_v2` so existing visitors are re-prompted.
- **Action needed:** request BotPenguin's official DPA; confirm whether transcripts are retained or only buffered; document retention in the privacy policy when the entity is registered.

### 1.10 Mail to kontakt@immob24.de
- **Where:** footer + "Privacy / Imprint" placeholder text — `mailto:kontakt@immob24.de`.
- **What this does:** opens the visitor's local email client. No third party involved in the mailto itself.
- **Downstream processor:** wherever this mailbox is hosted (Google Workspace? Microsoft 365? IONOS? — **needs confirmation from you**) sees the email content + sender's email address.
- **Action needed:** identify the email host and add it as a processor.

---

## 2. Cookies and local storage set on the visitor's device

| Name | Where set | Type | Purpose | Lifetime | Consent-gated? |
|---|---|---|---|---|---|
| `immob24_consent_v1` | first-party (localStorage) | essential | stores the visitor's cookie-banner choice | persistent until cleared | No (essential — required to remember the choice) |
| `immob24-lang` | first-party (localStorage) | essential / preference | remembers the visitor's chosen UI language (DE / EN) | persistent | No (preference — Art. 6(1)(f), or arguably essential UX) |
| `_ga` | google-analytics.com | analytics | distinguishes unique visitors | 2 years | **Yes** — only after Analytics consent |
| `_ga_<container>` | google-analytics.com | analytics | session state for GA4 | 2 years | **Yes** — only after Analytics consent |
| `_fbp` | first-party (set by Meta Pixel) | marketing | tracks ad-click attribution | 3 months | **Yes** — only after Marketing consent |
| `fr` | facebook.com | marketing | Meta's own user-tracking cookie (set by Meta if Pixel loads and user is logged into FB) | 90 days | **Yes** — only after Marketing consent |
| `botpenguin_*` | first-party (set by BotPenguin) | chat | Chat widget session and conversation state | session / up to 1 year | **Yes** — only after Chat consent |

---

## 3. First-party data we collect directly

### 3.1 Newsletter form
- **Where:** footer of every page (`NewsletterSignup.tsx`).
- **Fields collected:** name (optional), email (required), honeypot field (`website`, hidden — discarded server-side).
- **Stored in:** Google Sheet (via Apps Script — see 1.5).
- **Legal basis:** consent — Art. 6(1)(a) GDPR. Visitor sees a "By subscribing you agree to receive our newsletter" line + can unsubscribe.
- **Action needed:** specify the unsubscribe mechanism (link in every email? mailto?) and retention.

### 3.2 Demo booking
- Off-site (Cal.com). See 1.4.

### 3.3 No other forms.
- No contact form
- No login / account creation
- No comments
- No reviews / ratings
- No file uploads

---

## 4. Things the site does NOT do
(Useful for the privacy policy — generators sometimes ask.)

- No login system, no user accounts, no password storage.
- No payment processing.
- No e-commerce / shop / cart.
- No comments, ratings, or user-generated content.
- No social media share buttons that load third-party scripts (only the LinkedIn URL in structured data — see 1.7).
- No embedded YouTube / Vimeo / TikTok / Instagram content.
- ~~No chat widget~~ — BotPenguin chat widget added; see section 1.9. Consent-gated.
- No A/B testing tool (no Optimizely, no VWO, no Google Optimize).
- No heatmap tool (no Hotjar, no Microsoft Clarity).
- No error tracking (no Sentry).
- No CDN in front of the site (served directly from EC2 + nginx).
- No service workers / push notifications.

---

## 5. Items you still need to provide for the Datenschutzerklärung + Impressum

The legal-text generator (or lawyer) will ask for these. Some you have, some need to be decided / collected:

**Imprint (§ 5 TMG):**
- [ ] Legal entity name + form (Immob24 GmbH? UG (haftungsbeschränkt)? Einzelunternehmen?)
- [ ] Registered street address
- [ ] City + postcode
- [ ] Country (presumably Germany — confirm)
- [ ] Name(s) of Geschäftsführer/in
- [ ] Phone number (required by § 5 TMG — "rasche elektronische Kontaktaufnahme")
- [ ] Email — `kontakt@immob24.de` (have it)
- [ ] Handelsregister entry: Amtsgericht + HRB number (if applicable)
- [ ] USt-IdNr. (VAT ID — required if you have one)
- [ ] Berufshaftpflichtversicherung (only if you act in a regulated profession — probably not applicable here)
- [ ] V.i.S.d.P. — person responsible for content under § 18 Abs. 2 MStV (typically same as the Geschäftsführer/in)

**Datenschutzerklärung:**
- [ ] Controller's contact details (typically same as Imprint)
- [ ] Datenschutzbeauftragte/r (DPO) — only required for companies > 20 employees handling personal data; if not required, the policy should still name the privacy contact
- [ ] Retention period for newsletter signups
- [ ] Retention period for nginx access logs (Hari to confirm)
- [ ] Mail host for `kontakt@immob24.de` (Google Workspace? M365? IONOS?)
- [ ] Joint-controller agreement reference for Meta Pixel (Meta provides a template — needs to be linked)
- [ ] Whether you intend to add a CRM / lead tool later (HubSpot, Pipedrive, etc.) — flag for re-inventorying

**Cookie-Richtlinie:**
- The cookie banner UI (deployed, in `src/components/CookieBanner.tsx`) already shows the right categories. The policy text should mirror the labels and descriptions there.

---

## 6. Recommended next steps

1. **Self-host Google Fonts** — eliminates the unconditional Google Fonts request. Removes the LG München I exposure. I can do this — say the word.
2. **Decide newsletter retention** — pick a default (e.g. "until unsubscribe + 30 days") so the policy can state it.
3. **Confirm nginx log retention** — ask Hari.
4. **Fill in the Imprint blockers** from the checklist above.
5. **Run the inventory above through eRecht24's generator** (or hand to a lawyer). They will produce DE + EN policy text that matches reality.
6. **Re-run this inventory** if you ever add a CRM, a chat tool, error tracking, etc. Treat any new third-party script as a privacy event, not a UX event.

---

## Appendix — files inspected to produce this inventory

- `immobee24-landing/index.html`
- `immobee24-landing/src/main.tsx`
- `immobee24-landing/src/lib/consent.ts`
- `immobee24-landing/src/lib/analytics.ts`
- `immobee24-landing/src/lib/schema.ts`
- `immobee24-landing/src/components/CookieBanner.tsx`
- `immobee24-landing/src/components/NewsletterSignup.tsx`
- `immobee24-landing/src/components/SiteChrome.tsx`
- `immobee24-landing/src/i18n/LanguageContext.tsx`
- Memory: `reference_deploy.md` (hosting / AWS region)
