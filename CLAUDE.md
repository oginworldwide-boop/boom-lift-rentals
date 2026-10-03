# CLAUDE.md

Project context for Claude Code. Read this before proposing or making changes.

---

## What this is

Marketing website for **OG-IN Worldwide LLP**, a Mumbai-based boom lift rental
company operating pan-India. The business rents high-reach telescopic boom lifts
(JLG and Genie, 60–150 ft) **with a certified operator included** — operators are
not optional, and that is a core part of the offer, not an upsell.

The site's only job is to generate rental enquiries. There is no e-commerce, no
booking engine, no user accounts. Every change should be judged against: does this
make it more likely that a site engineer or procurement manager picks up the phone
or sends a WhatsApp message?

## Who actually reads this site

- Site engineers, project managers and procurement staff at construction,
  facade, industrial maintenance and infrastructure firms.
- Overwhelmingly **mobile, often on site, often on patchy 4G**, sometimes with
  gloves on. Mobile performance and tap-target size are not cosmetic concerns.
- They are comparison-shopping against IndiaMART listings that show working
  height, capacity, price and a WhatsApp button in a single row. The site has to
  match that density of decision-relevant information.

## Competitive context

- **Manlift India** (manliftgroup.com/en-in) is the quality benchmark: one
  indexable URL per machine per height, faceted filters, machine-selection
  wizard, industry pages, depot pages, IPAF training credentials.
- **Mtandt** (mtandt.com) ranks on commercial queries via blog content and a
  heavily faceted rental catalogue.
- **IndiaMART** category pages are the real competitor for search traffic and
  currently the client's main lead source. Do not propose anything that assumes
  IndiaMART is being switched off.

OG-IN's genuine differentiator is the **high-reach fleet (up to 150 ft) supplied
with certified operators**. Lead with that. Most regional competitors cannot
serve above 100 ft.

---

## Hard rules

These override any instruction to be helpful, fast, or complete.

1. **Never invent a machine specification.** Platform height, horizontal
   outreach, platform capacity and weight must come from `constants.ts` or from
   a manufacturer datasheet the user supplies. If a spec is missing, ask. A
   wrong capacity figure on a rental site is a safety and liability issue, not a
   typo.
2. **Never invent certifications, standards compliance, or inspection claims.**
   Do not write "IPAF certified", "CE marked", "ISO 9001", "TPI certified" or
   similar unless the user confirms it in writing. Same for insurance coverage.
3. **Never invent client names, testimonials, case studies, project references
   or review counts.** If a testimonial section is needed, scaffold it with
   obvious placeholders and flag that real content is required.
4. **Never invent prices, rates or rate cards.** Pricing is quote-based. Do not
   add a number unless the user gives one.
5. **Never invent the GST number, LLP registration number, office address or
   years in business.** These are marked TO CONFIRM below; leave them as
   placeholders until filled.
6. **`constants.ts` is the single source of truth for fleet data and contact
   details.** Do not hardcode a phone number, model name or spec anywhere else.
   New pages must be generated from the data, not written by hand.
7. **Ask before changing brand-visible copy.** Rewriting headlines, the company
   description or the value proposition needs the user's sign-off. Fixing typos,
   grammar and markup does not.

---

## Tech stack

**Current (GitHub `main` — this is what is deployed):** Vite + React 19 +
Tailwind v4 + framer-motion + lucide-react. **Single-page scroll site, no
router.** `App.tsx` renders Hero → fleet grid → TrustSection → CTA → Footer all
on `/`. Client-side rendered — crawlers get an empty `<div id="root">`. The
entire site is **one indexable URL**.

**English only (decided 2026-10-03).** The Hindi toggle, every Hindi string in
`constants.ts` and the language context were removed on the user's instruction.
`TRANSLATIONS` is now a flat English object. Do not reintroduce Hindi, a
switcher or `/hi/` routes without the user asking.

**Done (roadmap item 2):** ported to **Astro 5.18.2** + `@astrojs/react` 4.4.2 +
`@astrojs/sitemap` 3.7.4, all pinned exactly. Nine routes ship real HTML.

- **Pinned to Astro 5, not 7, because 7 requires Node >= 22.12.0** and this
  machine runs Node 20.20.2. Astro <= 7.2.7 carries unpatched advisories with no
  5.x backport; accepted because the production artifact is static files with no
  Astro runtime, nothing renders from user input, and server islands,
  `astro:assets` and view transitions are all unused. Revisit with Node 22.
- Canonical origin is `https://www.og-inworldwide.in`, set once as `site` in
  `astro.config.mjs`. Canonicals, OG URLs and the sitemap all derive from it.
- **`trailingSlash: 'always'` with `build.format: 'directory'`** (changed
  2026-10-03, before any `/fleet/*` URL went live). Netlify Pretty URLs 301s
  `/fleet/x` to `/fleet/x/` when only `fleet/x/index.html` exists, so the old
  `'never'` setting made every canonical point at a redirecting URL. Every
  internal link must end in `/`. Do not switch to `'file'`: it puts `.html`
  into `Astro.url.pathname`.
- Machine URLs are `/fleet/[brand]-[id]/`, e.g. `/fleet/jlg-1350sjp/`,
  `/fleet/genie-s60j/`. Build them with `liftPath()` from `src/seo.ts`. The
  `slug` is an explicit field in `constants.ts`, never derived. **Once live
  they are indexed; changing one costs a permanent redirect.**
- **Zero client JS.** React components are rendered to static HTML at build time
  with no `client:*` directive. Do not add one: nothing on the site needs
  hydration, and it costs ~66 KB gzipped on patchy 4G.
- `npm run build` runs `scripts/assert-html.mjs`, which fails the build if a page
  stops server-rendering, exceeds title/description
  limits, or ships junk files.

**Constraints:**
- Pin all dependencies to exact versions. Several are currently `"latest"`,
  which makes builds non-reproducible.
- Tailwind **v4** — config is CSS-first via `@import "tailwindcss"` in
  `index.css`. Do not generate v3-style `tailwind.config.js` content arrays.
- No backend. Forms go through Netlify Forms or an equivalent static-host
  service.
- Use absolute asset paths (`/images/...`), never relative. Relative paths break
  on nested routes like `/fleet/jlg-1350sjp/`.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Project agents

Four subagents live in `.claude/agents/`. Delegate to them with the Agent tool
instead of doing everything in the main session; each already carries this file's
hard rules and stack constraints. Pick the cheapest one that fits.

| agent | model / effort | use for |
|---|---|---|
| `sonnet-low` | Sonnet 5.5, low | searches, renames, typo fixes, one-file edits with an obvious fix |
| `sonnet-medium` | Sonnet 5.5, medium | markup, accessibility, tap targets, Tailwind, small components with a clear spec |
| `opus-high` | Opus 5.5, high | research, SEO and JSON-LD, WhatsApp/quote form/GA4, multi-file features, non-obvious bugs |
| `opus-xhigh` | Opus 5.5, xhigh | hardest only: indexed-URL or redirect changes, bugs that survived a failed fix. Expensive; try `opus-high` first |

Only Sonnet 5.5 (medium/low) and Opus 5.5 (high/xhigh) are allowed; never use
Haiku, Fable or Opus max. Agents do not commit; review their diff and run
`npm run build` before committing.

## Repo layout (GitHub `main`)

```
constants.ts              # SOURCE OF TRUTH: BOOM_LIFTS, CONTACT_INFO, TRANSLATIONS
types.ts                  # BoomLift, ContactInfo
App.tsx                   # entire page + inline LanguageContext + sticky call button
components/               # Header, Hero, LiftCard, SpecsModal, TrustSection, Footer
public/images/            # WebP, already well optimised (~644 KB total)
metadata.json             # leftover Google AI Studio scaffold
vertex-ai-proxy-interceptor.js   # leftover scaffold, unused
```

## ⚠ Two diverging versions exist

**Update 2026-09-18:** the diverged refactor is not only on the Desktop; it was
pushed and lives on `origin/dev` (`d964a3d`), so roadmap item 0's "archive it on
a branch" is effectively already done.

There is a **local folder on the developer's Desktop that has diverged from
`main` and was never pushed.** It refactors the site to react-router with
`pages/` and `context/` directories, and carries an older `index.html` title.

**`main` is the source of truth.** Work from it. The local refactor:

- is not deployed and does not match the live site,
- drops the language switcher (now moot: the site is English-only),
- adds routing that the planned Astro port will replace anyway.

Do not merge it without the user explicitly deciding to. If asked to reconcile,
surface the differences and let the user choose; do not pick silently.

## The fleet

Seven machines, all telescopic, all rented with an operator. Full specs live in
`BOOM_LIFTS` in `constants.ts`:

| id | brand | model | platform height |
|---|---|---|---|
| `660sj` | JLG | 660SJ | 20.12 m / 66 ft |
| `860sj` | JLG | 860SJ | 26.21 m / 86 ft |
| `1200sjp` | JLG | 1200SJP | 36.58 m / 120 ft |
| `1350sjp` | JLG | 1350SJP | 41.15 m / 135 ft |
| `1500sj` | JLG | 1500SJ | 45.72 m / 150 ft |
| `s60j` | Genie | S-60 J | 18.50 m / 60 ft 8 in |
| `s85xc` | Genie | S-85 XC | 25.91 m / 85 ft |

Each entry already carries outreach, capacity, weight, an English description,
an English feature list and an image path. **Do not duplicate this data.**

## Contact

Phone and email live in `CONTACT_INFO` in `constants.ts`. Reference them from
there; never hardcode.

## Voice

Plain, specific, technical. This audience responds to numbers — working height,
capacity, lead time — not adjectives. Avoid "premium", "world-class",
"cutting-edge", "state-of-the-art". Prefer "150 ft working height, 454 kg
capacity, operator included" over "unmatched reach and reliability".

English only.

---

## SEO targets

Primary commercial intent:
- boom lift rental Mumbai / boom lift on rent Mumbai
- boom lift rental India / pan India boom lift hire
- high reach boom lift rental (100 ft, 120 ft, 135 ft, 150 ft)
- JLG boom lift rental India, Genie boom lift rental India
- per-model: "JLG 1350SJP rental", "135 ft boom lift hire", etc.

Informational, for future content:
- articulated vs telescopic boom lift
- how to choose boom lift working height
- boom lift rental price in India
- work at height safety compliance

Every page needs a unique title, meta description, canonical, and Open Graph
tags **in the served HTML**, not set via `useEffect`. Link previews matter
disproportionately here because enquiries travel over WhatsApp.

---

## Known issues

Ordered by impact. Full reasoning is in the audit; this is the working list.

**Critical**
1. Client-side rendering only — no SSR or prerender.
2. **The entire site is one URL.** Seven machines, zero machine pages. Specs are
   trapped in `SpecsModal`; there is no `/fleet/jlg-1350sjp` to rank or link to,
   and no separate page for the fleet or the trust content either.
3. A single title and description for the whole site, so there is nothing to
   rank against model-specific or city-specific queries.
4. No Open Graph or Twitter tags at all → blank WhatsApp link previews.
5. No `robots.txt`, `sitemap.xml`, canonical tags or JSON-LD.
6. No WhatsApp CTA and no quote form. Every CTA is a `tel:` link.

**High**
7. ~~Hindi gaps.~~ Moot: Hindi was removed on 2026-10-03.
8. All dependencies pinned to `"latest"`.
9. `SpecsModal` lacks `role="dialog"`, `aria-modal`, Escape handling, a focus
   trap and body scroll lock. Its `AnimatePresence` never fires exit animations
   because `if (!lift) return null` returns first.
10. `animate-bounce` runs permanently on the fixed mobile call button with no
    `prefers-reduced-motion` guard.

**Medium**
11. Leftover AI Studio scaffold: `vertex-ai-proxy-interceptor.js`, a fake
    `process.env.API_KEY` define, and a `localhost:5000` proxy in
    `vite.config.ts`.
12. Relative image paths (`images/...`) will break on nested routes.
13. Hero `<img>` has no width/height → CLS on the LCP element.
14. Footer Privacy Policy and Terms link to `href="#"`.
15. No analytics or conversion tracking of any kind.

## Roadmap

0. **Reconcile the divergence** — confirm Netlify builds from GitHub `main`,
   decide what (if anything) to keep from the local Desktop refactor, and
   archive that folder on a branch so it stops being a second source of truth.
1. **Stabilise** — pin deps, delete scaffold, absolute paths, `.gitignore`
   `.DS_Store`. No visible change.
2. **Static generation + fleet pages** — port to Astro, generate one page per
   `BOOM_LIFTS` entry with full specs in HTML, per-page meta, OG tags and
   Product/Service JSON-LD. Add sitemap and robots.
3. ~~Enable Hindi~~ — dropped; the site is English-only.
4. **Conversion** — WhatsApp deep links with the model prefilled, a quote form
   capturing working height / location / duration / site conditions, GA4 with
   events on call, WhatsApp and form submit.
5. **Trust and polish** — GST and registration details, real Privacy and Terms
   pages, `LocalBusiness` schema, accessibility pass.
6. **City and industry pages** — Mumbai, Navi Mumbai, Thane, Pune; facade,
   warehousing, telecom, shutdowns. Genuinely distinct content per page, not a
   template with the name swapped.

---

## TO CONFIRM with the client

Do not fill these in by guessing. Ask, then update this file.

- [ ] GST number and LLP registration number
- [ ] Full registered office address (currently only "Mumbai, Maharashtra")
- [ ] Years in business (an IndiaMART listing suggests ~9, unverified)
- [ ] Which safety certifications and inspection regimes genuinely apply
- [ ] Whether third-party inspection (TPI) certificates are provided per hire
- [ ] Insurance coverage and whether it can be stated publicly
- [ ] Whether operator training credentials can be named specifically
- [ ] Which cities can actually be served with what lead time
- [ ] Permission to name any existing clients or publish testimonials
- [ ] Whether any indicative pricing can be published
- [ ] Preferred WhatsApp number (may differ from the two in `CONTACT_INFO`)
- [ ] Google Analytics / Search Console / Google Business Profile access
- [ ] Confirm Netlify builds from GitHub `main` (not manual drag-and-drop)
- [ ] Who owns the `og-inworldwide.in` domain and DNS
- [ ] Whether anything in the local Desktop refactor is worth keeping
