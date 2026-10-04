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
5. **Never invent the GST number, LLP registration number or years in
   business.** (The office address is now confirmed.) These are marked TO CONFIRM below; leave them as
   placeholders until filled.
6. **`constants.ts` is the single source of truth for fleet data and contact
   details.** Do not hardcode a phone number, model name or spec anywhere else.
   New pages must be generated from the data, not written by hand.
7. **Ask before changing brand-visible copy.** Rewriting headlines, the company
   description or the value proposition needs the user's sign-off. Fixing typos,
   grammar and markup does not.

---

## Tech stack

**Deployed (`main`, live since 2026-10-03):** the static Astro site from PR #1
(static build) and PR #2 (redesign, WhatsApp + quote form, copy, high-reach page,
working-height guide, contact, privacy, GA4 hook). Netlify builds `main` and
makes a deploy preview per PR (previews carry `noindex` and the Netlify drawer,
so Lighthouse there needs `--blocked-url-patterns` for `*/.netlify/*` and
`*/cdp/*`). Netlify form detection was still OFF at go-live.

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
  stops server-rendering, ships JS, has a wrong canonical or slashless internal
  link, a missing/non-JPEG share image, broken JSON-LD, a machine page missing
  its own specs, a phone number typed outside `constants.ts`, mismatched quote
  form fields, or exceeds title/description limits. Never weaken it to pass.
- Share images: `npm run og` regenerates `public/og/*.jpg` (1200×630);
  `npm run images` regenerates the 640w/800w/1200w WebP variants. Run both after
  changing a machine or photo, and commit the output (not part of the build).
- Quote form: one `QuoteForm` component, Netlify Forms (`name="quote"`), same
  field set on every page. Netlify form detection must be enabled in the UI.
- GA4: set `PUBLIC_GA4_ID` in the Netlify environment (not `.env`). Unset = no
  scripts at all.
- Copy lives in `TRANSLATIONS`; figures in copy are `{placeholders}` filled by
  `fill()` in `src/fleet.ts` from `BOOM_LIFTS`/`CONTACT_INFO`.

**Constraints:**
- Pin all dependencies to exact versions. Several are currently `"latest"`,
  which makes builds non-reproducible.
- Tailwind **v4** — config is CSS-first via `@import "tailwindcss"` in
  `index.css`. Do not generate v3-style `tailwind.config.js` content arrays.
- No backend. Forms go through Netlify Forms or an equivalent static-host
  service.
- Use absolute asset paths (`/images/...`), never relative. Relative paths break
  on nested routes like `/fleet/jlg-1350sjp/`.

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

Items 1–15 of the original audit are fixed on PR #1/#2 (static HTML, machine
pages, per-page meta/OG, sitemap/robots/JSON-LD, WhatsApp + quote form, pinned
deps, SpecsModal deleted, no bouncing button, scaffold removed, absolute paths,
hero dimensions, no `href="#"`, GA4 hook). Open:

1. **Spec audit (2026-10-03, vs JLG/Genie datasheets):** capacity shows only the
   restricted maximum for 1200SJP/1350SJP/1500SJ/S-85 XC (unrestricted 227 kg /
   300 kg); all four 660SJ figures and the 1200SJP/1350SJP heights match older
   datasheet revisions; weights mix ANSI/CE variants. Do not change without the
   client's per-unit build spec.
2. Hero photo shows a machine in "Universal" livery, not OG-IN's.
3. Node 20 is EOL; upgrade to Node 22 + Astro 7.
4. `@astrojs/react` still emits an unreferenced `dist/_astro/client.*.js`.

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

- [ ] GST number and LLP registration number (empty `gstin`/`llpin` placeholders in `CONTACT_INFO`; footer shows them once set)
- [x] Registered office: Green Avenue, Bungalow No. 2, Mira Road East, Thane 401107 (client, 2026-10-03)
- [ ] Years in business (an IndiaMART listing suggests ~9, unverified)
- [ ] Which safety certifications and inspection regimes genuinely apply
- [ ] Whether third-party inspection (TPI) certificates are provided per hire
- [ ] Insurance coverage and whether it can be stated publicly
- [ ] Whether operator training credentials can be named specifically
- [ ] Which cities can actually be served with what lead time
- [x] Clients may be named: Godrej, Reliance, Vedanta Power, Bokaro Steel (names only; no testimonials or logos supplied)
- [ ] Whether any indicative pricing can be published
- [x] WhatsApp number: +91 93245 25581 (client, 2026-10-03)
- [ ] Google Analytics / Search Console / Google Business Profile access
- [x] Netlify is linked to the GitHub repo with deploy previews (seen on PR #1)
- [x] Domain `og-inworldwide.in` rented for 3 years from Hostinger (DNS there)
- [ ] Whether anything in the local Desktop refactor is worth keeping
