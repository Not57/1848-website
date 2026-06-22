# Website Redesign [[1.0]] — Implementation Plan

## Context
Day 18 notes call for messaging, visual, and donation UX upgrades across index.html and donate.html. Goal: sharpen brand voice around "Forging Adversity into Opportunity," swap generic visuals for diverse/authentic ones, and reframe donations as investments.

---

## Files to Modify
- `website-revamp/index.html`
- `website-revamp/donate.html` — becomes the "Learn More" page (problem, pillars, gallery, videos, employers)
- `website-revamp/invest.html` — **new page**, receives the invest/donor section moved out of donate.html
- `website-revamp/styles.css` (hero background swap, CCC image, collage layout, invest page styles)

---

## Landing Page (index.html)

### 1. Hero Image → Diverse Collage
- Replace single hero background image with collage of diverse students/workers
- Source: pull from `images/kilroy_shop_pics/` + `images/ForAgesImages/`
- CSS: use CSS grid or absolute-positioned overlapping imgs inside `.hero`
- Diversity must be visually prominent (gender, age, background)

### 2. Stats — Add Source Citations
- Section: `.trades-stats-section` (lines ~159–195)
- Add footnote/tooltip per stat sourced from Bureau of Labor Statistics (BLS)
  - $58K median salary → BLS Occupational Outlook
  - 7M+ unfilled jobs → BLS / NFIB gap data
  - 11% projected growth → BLS 10-year projection
- Keep visual clean — use `<sup>` or small inline link, not a cluttered footnote block

### 3. Problem Section — Reframe Messaging
- Section: `#serve` (lines ~197–245)
- Change headline: `"There is a place for you here."` → `"Helping students turn adversity into opportunity."`
- Opening paragraph: reinforce "forging adversity into opportunity" phrasing

### 4. CCC Section — Add Image
- Section: `.community-section` (lines ~247–263)
- Add one strong photo (job site or student at work) alongside the text block
- CSS: flex row layout — text left, image right (or full-bleed behind)

### 5. Brand Message Hierarchy (site-wide)
Apply this priority order in copy across both pages:
1. Drive to `1848.net`
2. Signature phrase: **"Forging Adversity into Opportunity"**
3. Social proof: **43,000+ Students Trained**
4. Supporting: **"America Needs Builders Again"**
5. Long-term slogan: **"Strike the Anvil. Ignite the Spark."**

---

## Page Split: donate.html → "Learn More" / new invest.html → "Invest"

Current `donate.html` holds both the mission/problem content AND the investor/donor cards in one page. Split into two:

| Page | URL | Contains |
|------|-----|----------|
| Learn More | `donate.html` | Hero, photo strip, #problem, pillars, impact gallery, employers, videos, footer |
| Invest | `invest.html` | Hero, `#invest` cards (moved from donate.html), impact gallery, footer |

### 6. donate.html — Hero Subheadline Update
- Change `hero-sub` text to: **"America Needs Makers. America Needs You."**
- Remove "Donate Now" CTA from hero — replace with single primary CTA: **"See The Problem"** → `#problem`
- Add secondary: **"Invest in 1848"** → `invest.html`

### 7. donate.html — Hero Background — Job Site Montage
- Replace current field/static background with collage or video-style montage of people working on job sites
- Source images from `images/yourdonoatwork/` or `images/kilroy_shop_pics/`
- CSS: multi-image layered background or `<div>` collage grid behind hero text

### 8. Create invest.html — New Invest Page
- New file: `invest.html` (copy nav + footer structure from donate.html)
- Move `#invest` section (lines 57–91 of donate.html) into invest.html as the main content
- Add a hero to invest.html with headline: **"Forge the Future. Invest in 1848."**
- Include impact gallery section pulled from `images/yourdonoatwork/` to reinforce credibility
- Remove `#invest` section entirely from donate.html after moving

### 9. Rename "Donate" → "Invest" on invest.html
- All instances of "Donate Now" → **"Invest Now"** (buttons + headings)
- All instances of "donation" → **"investment"** in body copy on invest.html only
- `<title>` → `"1848 — Invest in Trades Education"`
- Keep amfol.org/donate as button href (URL stays the same)

### 10. Update Donor Impact Copy on invest.html
- "For Donors & Philanthropists" card — replace body copy with:
  > "Your investment goes directly to scholarships for students. There is currently a **$100,000 matching grant** for all investments."
  > "At 1848, we have a variety of investment opportunities — every dollar goes to helping a student."
- "Your Donation at Work" eyebrow → **"Your Investment at Work"**

### 11. Update Nav + index.html CTAs Site-Wide
- Nav across all pages:
  - "Donate" nav button → **"Invest"** → `invest.html`
  - "Learn More" nav link → `donate.html` (unchanged)
- `index.html` hero CTA: any "Donate" button → **"Invest"** → `invest.html`
- Footer "For Investors" link → `invest.html#invest`

---

## Verification
1. `index.html` — hero collage renders, stats have citations, problem section has new headline, CCC section has image, "Donate" nav/CTA → `invest.html`
2. `donate.html` — subheadline reads "America Needs Makers. America Needs You.", job site background renders, no investor/donor cards present, "See The Problem" + "Invest in 1848" CTAs work
3. `invest.html` — loads clean, investor cards present, "Donate Now" → "Invest Now", donor copy updated with matching grant, impact gallery visible
4. Nav on all 3 pages: "Learn More" → donate.html, "Invest" → invest.html
5. Mobile layout (devtools responsive) — no overflow on hero collages or card grids
6. Commit when all sections verified visually
