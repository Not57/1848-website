# 1848 Website — Project Context

## What this is
Static HTML/CSS/JS marketing + donation site for 1848, a trades training nonprofit.
Hosted on Vercel, auto-deploys from GitHub (`Not57/1848-website`, branch: `main`).

## Pages
- `index.html` — landing page (classes, stats, who we serve, community statement)
- `donate.html` — donor/investor page (problem, pillars, impact gallery, videos)

## Stack
- Pure HTML + CSS + JS. No framework, no build step.
- Google Fonts: Oswald 700, Inter 400/600/700/800
- `styles.css` — single stylesheet for both pages
- `script.js` — nav toggle + location picker logic

## CSS Variables (defined in `:root`)
- `--blue: #1B3270` — primary brand color, use for all headings
- `--navy: #0d141a` — dark text on buttons/nav only, NOT headings
- `--gold / --accent` — CTA buttons
- `--black: #ffffff` — page background (named misleadingly)
- `--dark: #f0f4f8` — alternate section background
- `--mid: #c8d4e0` — borders
- `--text: #3d5066` — body text

## Key conventions
- All headings use `color: var(--blue)`, never `--navy`
- Buttons and nav items use `--navy` for text on gold background
- Section pattern: white (`--black`) and light gray (`--dark`) alternate
- Photo collage in donate.html uses `images/yourdonoatwork/` — was previously untracked in git, now committed
- Full-bleed photo rows sit outside `.container` div; text content stays inside

## Image folders
- `images/kilroy_shop_pics/` — original shop photos
- `images/yourdonoatwork/` — donation page collage photos
- `images/ForAgesImages/` — "who we serve" section photos
- `images/classCoverImages/` — discipline card covers
- `images/flag images/` — state flags for location picker

## Contacts / links
- Email: Steveb@1848.net | Phone: 214-425-9272
- Donation processor: amfol.org/donate (America's Family, 501c3)
- Class booking: kilroysworkshop.com
