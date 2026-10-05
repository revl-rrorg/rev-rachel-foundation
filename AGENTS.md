# AGENTS.md — Rev & Rachel Foundation Website

## What This Is

The **Rev & Rachel Lebaredian Foundation** website. A philanthropy focused on Armenia through education, culture & arts, and technology. Single-page static site hosted on GitHub Pages.

- **Live**: https://revl-rrorg.github.io/rev-rachel-foundation/
- **Domain**: https://revandrachel.org (CNAME in repo)
- **Repo**: https://github.com/revl-rrorg/rev-rachel-foundation

---

## ⚠️ Branch Rules — CRITICAL

**All work goes to the `staging` branch.** Never push to `master`.

```bash
git checkout staging
# work here
git push origin staging
```

Only merge `staging` → `master` when Rev or Rachel explicitly say "publish" or "go live."

---

## Tech Stack

- **Single file**: `index.html` (~2350 lines, all HTML + CSS + JS inline)
- **No build step, no framework, no bundler.** Edit → push → GitHub Pages deploys.
- **Images**: `images/` (news article images), `logos/` (partner org logos + people photos), root (hero, logo, ararat)
- **SEO**: `sitemap.xml`, `robots.txt`, `llms.txt`
- **Contact form**: formsubmit.co backend → `info@revandrachel.org`

### Design System

| Element | Value |
|---------|-------|
| Heading font | Cormorant Garamond (Google Fonts) |
| Body font | Inter (Google Fonts) |
| Armenian red | `#D90012` / `var(--red)` |
| Armenian blue | `#002868` / `var(--blue)` |
| Armenian orange | `#F2A800` / `var(--orange)` |
| Dark background | `#060b19` / `var(--dark)` |
| Logo | `logo.jpg` — ᴚ🔴R monogram, Bebas Neue font, `mix-blend-mode: lighten` |

---

## Site Structure

The page flows top-to-bottom as:

1. **Nav** (`<nav>`) — Fixed top bar: About · What We Do · Partners · News. Hamburger menu on mobile with slide-out drawer.
2. **Hero** (`#home`) — Full-viewport dark section with foundation name, tagline, and a spotlight news carousel (auto-rotating cards linking to recent articles).
3. **Mission / What We Do** (`#mission`) — Three pillars: Education, Culture & Arts, Technology. Clean cards, no stats/numbers.
4. **Partners** (`#organizations`) — 11 partner org cards. Dark editorial style (`#0d1c2e` cards, white logo panel at top, muted text). See partner list below.
5. **About** (`#about`) — Three tabs:
   - "Our Story" — origin narrative 1996→2023
   - "Who Are We" — 4 family member bios with photos
   - "Why Armenia" — Ararat hero image + 6 value cards
6. **News** (`#news`) — Two tabs: "Latest" (featured cards) and "Archive" (additional articles). Each card has image, date, title, description, and link.
7. **Contact** (`#contact`) — Form (name, email, message) via formsubmit.co.
8. **Footer** — Logo, foundation name, social links (Instagram + LinkedIn only), copyright.

### Partner Organizations (11)

TUMO · Teach for Armenia (TFA) · American University of Armenia (AUA) · COAF · TUMO Studios · Yerevan State University (YSU) · Armenian Innovation Foundation (AIF) · YerevaNN · Bazoomq · Armenian Symphony Orchestra · Strobia Foundation

### People

| Person | Photo file | LinkedIn |
|--------|-----------|----------|
| Rev Lebaredian | `logos/rev-photo.jpg` | linkedin.com/in/revlebaredian |
| Rachel Lebaredian | `logos/rachel-photo.jpg` | pending |
| Daron Lebaredian | `logos/daron-photo.jpg` | pending |
| Zareh Lebaredian | `logos/zareh-photo.jpg` | pending |

---

## Working with Rachel — MUST READ

Rachel is the primary stakeholder. These rules are non-negotiable:

### Her #1 Rule: "Do not change anything unless told"
She does not want creative latitude. Execute exact instructions — nothing more, nothing less. Unsolicited improvements are unwelcome, even good ones.

### Communication Style
- Sends **photos/screenshots** to show what she wants changed. She points at things visually.
- Works in **small focused chunks** — one thing at a time.
- Very detail-oriented: caught "Rev&Rachel" vs "REV&RACHEL" immediately.
- **Decision latency is real** — pending items stay pending until she's ready.

### Never Add These Back (removed at her request)
- Eyebrow labels ("Who Are We", "Our Homeland", "Why We Exist")
- Stats bars, impact numbers, metric counters
- Filter buttons
- Marketing fluff or anything performative
- Footer logo mark
- Facebook, X (Twitter), YouTube social links

---

## How to Add a News Article

News articles are the most common change. Add a new card inside the `#news-tab-latest` div:

```html
<a href="ARTICLE_URL" target="_blank" class="news-card" style="text-decoration:none;color:inherit;">
  <div class="news-img-wrap">
    <img src="images/FILENAME.jpg" alt="DESCRIPTION" loading="lazy"/>
  </div>
  <div class="news-card-body">
    <span class="news-date">Month YYYY</span>
    <h3 class="news-card-title">HEADLINE</h3>
    <p class="news-card-desc">DESCRIPTION TEXT</p>
  </div>
</a>
```

Also add to the spotlight carousel in the hero section if it's a featured article:

```html
<a class="spotlight-card" href="ARTICLE_URL" target="_blank">
  <img src="images/FILENAME.jpg" alt="DESCRIPTION" class="spotlight-img" loading="lazy"/>
  <div class="spotlight-body">
    <span class="spotlight-date">Month YYYY</span>
    <h4 class="spotlight-title">HEADLINE</h4>
  </div>
</a>
```

Images go in `images/` — compress to reasonable size (under 200KB), use `.jpg` or `.jpeg`.

---

## How to Add a Partner Organization

Add a new card inside the `#organizations` section's grid:

1. Place the logo file in `logos/` (prefer SVG or clean PNG with transparent/white background)
2. Add the card HTML following the existing pattern (dark card, white logo panel, org name, description, visit link)
3. If the logo is dark-on-white and needs to display on a white panel, no filter needed. If it needs inverting, add `style="filter:invert(1)"` on the img.

---

## Safety Rules

1. **Scope tightly** — only touch what was asked. Don't fix adjacent things "while you're in there."
2. **Verify section counts** before and after any regex or multiline edit. A past edit silently wiped the entire About section for 6 commits without anyone noticing.
3. **Test in a browser** after structural changes. Open `index.html` locally.
4. **GitHub Pages caches aggressively** — note this when reporting changes are live.
5. **Safe base commit**: `c8ec5c7` — if something goes catastrophically wrong, revert to this.

---

## File Inventory

```
index.html          — The entire website (HTML + CSS + JS, ~2350 lines)
logo.jpg            — Foundation logo (nav + footer)
ararat.jpg          — Mount Ararat hero image (About > Why Armenia tab)
CNAME               — Custom domain: revandrachel.org
llms.txt            — LLM-readable site summary
sitemap.xml         — SEO sitemap
robots.txt          — Search engine config

images/             — News article images
  agbu-diaspora-imprints.jpg
  agile-robots-armenia.jpeg
  armenia-chatgpt-education.jpg
  firebird-vance.jpg
  fox-mornings-maria-physical-ai.jpg

logos/               — Partner org logos + people photos
  tumo.png, tumo-new.png
  tfa.png, tfa-new.png, tfa-en.png
  aua.svg, aua-new.svg
  coaf.webp, coaf-new.webp, coaf-en.png
  tumostudios.svg, tumostudios-new.svg, tumostudios-black.svg, tumostudios.jpg
  ysu.svg, ysu-new.svg
  aif.png, aif-new.png, aif-favicon.png
  yerevann-clean.svg, yerevann-new.png, yerevan-new.png, yerevan.svg
  bazoomq.png, bazoomq-new.png
  armsymphony.png, armsymphony-new.png, armsymphony-clean.png
  strobia.svg, strobia-black.svg, strobia-new2.png
  rev-photo.jpg, rachel-photo.jpg, daron-photo.jpg, zareh-photo.jpg
  rev-rachel-together.jpg
  winters-song.jpg, winters-song-poster.jpg
  armenia-map.jpg

logo-*.html          — Logo concept exploration pages (13 files, not part of live site)
shot-*.jpg           — Historical screenshots (not part of live site)
```

---

## Pending Items (not yet requested — do NOT proactively implement)

- Rev bio text — never provided
- Zareh headshot — URL didn't work, needs a real image file
- LinkedIn URLs for Rachel, Daron, Zareh
- "A Winter's Song" film link + poster integration
- Strobia Foundation description
- Logo mark selection (options A–F shown to Rachel, no decision yet)
