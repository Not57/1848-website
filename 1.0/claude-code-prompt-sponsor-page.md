# Claude Code Prompt — Build the Sponsorship Packages Page

> Copy everything below the line into Claude Code, run from the `website-revamp` repo root.
> Items in **[CONFIRM]** are placeholders pulled from rough notes — verify before launch.

---

## Task
Create a new page for the 1848 website presenting our **philanthropic giving tiers**. This is separate from the invest/donor side — these tiers are purely philanthropic.

## Before you start
- Read `CLAUDE.md` in the repo root for project context, CSS variables, and conventions. Follow them exactly.
- Reuse the existing **nav and footer markup** from `donate.html` / `index.html` so this page's chrome is identical to the rest of the site.
- Match `styles.css` — use existing variables: `--blue` for headings, `--navy` for button/nav text on gold, alternate `--black` (white) / `--dark` (light gray) section backgrounds. Do **not** introduce new colors or fonts (Oswald 700 + Inter only).
- Pure HTML/CSS/JS, no framework, no build step — consistent with the rest of the site.

## New file
- Create `sponsor.html`. (If a different name fits the nav scheme better, use judgment, but default to `sponsor.html`.)
- Add it to the nav on `index.html`, `donate.html`, and `invest.html` with the label **"Sponsor a Student"**, matching the existing nav item markup.

## Page structure
1. **Hero** — headline + short subhead, consistent with the brand phrase "Forging Adversity into Opportunity." Suggested headline: *"Forge a Future. Sponsor a Student."* One primary CTA scrolling to the tiers.
2. **Matching-grant banner** — a prominent strip at the top of the tiers announcing the active matching grant. **[CONFIRM amount + terms — see open questions]**
3. **Giving tiers** — three cards in a responsive grid; visually **highlight the Transformation tier** as the recommended / emotional anchor (border, badge, or slight scale):

   **Inspire — $99**
   - Sponsors 2 students with a free blacksmithing class
   - Your name on the stainless steel recognition wall in the skill workshop

   **Train — $1,000** *(price [CONFIRM] — notes say "around $1,000")*
   - Funds a full week of classes across multiple disciplines for one student

   **Transformation — $4,900** *(highlight this card)*
   - Covers the full cost to put 2 students through welding certification
   - Students earn their welding certificates — a real career transformation
   - Your name on the stainless steel recognition wall
   - Progress updates plus a personal letter and photo from a student you sponsored

4. **Naming rights** — a single feature block below the tiers for the top-level gift: **$184,840** for naming rights. **[CONFIRM figure]**
5. **Kickstarter** — **[DECISION NEEDED: include a section/CTA or omit]**
6. **Footer** — reuse existing footer.

## CTAs
- Each tier button links to the donation processor: `https://amfol.org/donate` (same as the rest of the site).
- Use existing button styling (gold background, `--navy` text).
- If — and only if — the processor supports an amount query param, you may pre-select the tier amount; otherwise just link to the donate page. Don't invent a param.

## UX / conversion
- Lead each card with **impact**, not the dollar amount, in the first line.
- Highlight the Transformation tier so the eye lands there first.
- Tier cards must stack cleanly on mobile with no horizontal overflow — test responsive.

## Copy
Source copy came from rough notes — tighten everything into clean, donor-facing language. Match the existing site's tone (mission-driven, direct). Fix obvious note typos (e.g. "kill workshop" → "skill workshop").

## Open questions — DO NOT guess. Ask me, or leave a clearly-marked `<!-- TODO -->` comment:
1. Train tier exact price (notes say "around $1,000").
2. Naming rights figure — confirm $184,840 is exact and public-facing.
3. Matching grant — exact amount + terms. (The 1.0 plan references a **$100,000** matching grant; Day 21 ties a matching grant to the **new lease** — confirm which is correct and whether it's still active.)
4. Whether to include a Kickstarter section/CTA, and the link if so.
5. Does the Train tier include wall recognition? (Not specified in notes.)

## When done
- Verify: nav links work on all pages; page matches site styling; Transformation tier is visually highlighted; all CTAs point to `amfol.org/donate`; mobile layout has no overflow.
- **Do not commit** until I've reviewed — the matching grant and naming rights numbers must be confirmed first.
