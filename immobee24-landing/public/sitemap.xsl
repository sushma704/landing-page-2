<?xml version="1.0" encoding="UTF-8"?>
<!--
  Browser-facing stylesheet for sitemap.xml.

  Crawlers ignore this; it only affects what humans see when they open
  sitemap.xml in a browser. Renders the URL list as a sortable-looking
  HTML table with the immob24 brand colors.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>immob24.com — Sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          :root {
            --charcoal: #1c1c1c;
            --warm-gray: #6b6b6b;
            --slate: #4a4a4a;
            --cream: #faf7f2;
            --golden: #e8a93a;
            --teal: #1b6b6b;
            --border: rgba(0,0,0,0.08);
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--cream);
            color: var(--charcoal);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                         "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 24px 80px;
          }
          h1 {
            font-size: 28px;
            margin: 0 0 8px;
            color: var(--charcoal);
          }
          h1 span.brand-orange { color: var(--golden); }
          .lede {
            color: var(--slate);
            margin: 0 0 8px;
          }
          .summary {
            display: inline-block;
            margin: 12px 0 28px;
            padding: 6px 12px;
            border-radius: 999px;
            background: white;
            border: 1px solid var(--border);
            font-size: 13px;
            color: var(--slate);
          }
          .summary strong { color: var(--charcoal); }
          .notice {
            margin: 0 0 28px;
            padding: 14px 16px;
            border-left: 3px solid var(--golden);
            background: white;
            border-radius: 0 8px 8px 0;
            color: var(--slate);
            font-size: 13px;
          }
          .notice strong { color: var(--charcoal); }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          }
          thead th {
            text-align: left;
            background: var(--charcoal);
            color: white;
            padding: 12px 16px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          tbody td {
            padding: 12px 16px;
            border-top: 1px solid var(--border);
            vertical-align: top;
          }
          tbody tr:hover { background: var(--cream); }
          a {
            color: var(--teal);
            text-decoration: none;
            word-break: break-all;
          }
          a:hover { text-decoration: underline; }
          .lang-tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            background: var(--cream);
            color: var(--slate);
            border: 1px solid var(--border);
          }
          .lang-de { background: #fff4e0; color: #8a5a00; border-color: #f0c876; }
          .lang-en { background: #e6f4f3; color: #1b6b6b; border-color: #a5d3cf; }
          .mono { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12px; color: var(--warm-gray); }
          .priority-bar {
            display: inline-block;
            width: 60px;
            height: 6px;
            border-radius: 999px;
            background: var(--cream);
            border: 1px solid var(--border);
            position: relative;
            vertical-align: middle;
          }
          .priority-bar > span {
            position: absolute;
            top: -1px; left: -1px; bottom: -1px;
            background: linear-gradient(90deg, var(--golden), #d9931d);
            border-radius: 999px;
          }
          .priority-val { margin-left: 8px; font-size: 12px; color: var(--slate); }
          footer { margin-top: 24px; font-size: 12px; color: var(--warm-gray); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>immob<span class="brand-orange">24</span>.com — Sitemap</h1>
          <p class="lede">
            All landing pages currently published, with hreflang language alternates.
          </p>
          <div class="summary">
            <strong><xsl:value-of select="count(sm:urlset/sm:url)" /></strong> URLs in this sitemap
          </div>

          <div class="notice">
            <strong>Note:</strong> the site is currently under a pre-launch lockdown
            (<code>robots.txt</code> Disallow + <code>noindex</code> meta tag). Search
            engines will fetch this sitemap but will not index the URLs until the
            lockdown is lifted post entity registration.
          </div>

          <table>
            <thead>
              <tr>
                <th>Lang</th>
                <th>URL</th>
                <th>Last modified</th>
                <th>Change freq.</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <xsl:variable name="loc" select="sm:loc" />
                <tr>
                  <td>
                    <xsl:choose>
                      <xsl:when test="contains($loc, '/de/') or substring($loc, string-length($loc) - 2) = '/de'">
                        <span class="lang-tag lang-de">DE</span>
                      </xsl:when>
                      <xsl:when test="contains($loc, '/en/') or substring($loc, string-length($loc) - 2) = '/en'">
                        <span class="lang-tag lang-en">EN</span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="lang-tag">?</span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <a href="{$loc}"><xsl:value-of select="$loc" /></a>
                  </td>
                  <td class="mono"><xsl:value-of select="sm:lastmod" /></td>
                  <td class="mono"><xsl:value-of select="sm:changefreq" /></td>
                  <td>
                    <span class="priority-bar">
                      <span>
                        <xsl:attribute name="style">
                          width: <xsl:value-of select="number(sm:priority) * 100" />%;
                        </xsl:attribute>
                      </span>
                    </span>
                    <span class="priority-val"><xsl:value-of select="sm:priority" /></span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <footer>
            Raw XML at <a href="/sitemap.xml">/sitemap.xml</a>. This view is just a
            browser-friendly skin; crawlers ignore the stylesheet and read the XML
            directly.
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
