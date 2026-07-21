# Student Data

The sponsor-a-student gallery on `invest.html` builds itself from `students.json`.
Nobody should be editing this file by hand.

**The live file ships empty** — `{ "students": [] }`. With no students listed,
`invest.html` hides the student sections and shows only the giving tiers. Add the
first student through `/admin/` and the student sections appear automatically on
the next load. The four original fictional profiles are kept in
`students.sample.json` for reference and local testing — never copy them into the
live file.

## Use the form instead

Go to **1848.net/admin/**. It's a form — text boxes, dropdowns, and an upload
button for photos. Add a student, edit one, or remove one, then click Publish.

Full instructions: [`../admin/README.md`](../admin/README.md).

---

## Before anything else: consent

**A student does not go on this page until a signed release is on file.**
If the student is under 18, a parent or guardian signs too. Name, photo, and
story are all covered by that release. No exceptions — this is a legal and
ethical requirement, not a formality.

The release also has to cover the career goals and family-impact fields, which
are more personal than a standard photo release usually accounts for.

**The live `students.json` ships empty on purpose** — no student goes on the
page until a signed release is on file. The four fictional profiles used for
building and testing now live in `students.sample.json`; they must never be
copied into the live file, since nothing on the page marks them as invented.

---

## Privacy rules

- **First name and last initial only.** Never a full last name.
- **Age ranges only.** Never an exact age.
- No school names, no home addresses, and nothing about a student's case,
  placement, or family situation they did not agree to publish.

The form at `/admin/` has no field for a last name or an exact age, so it cannot
happen through the normal path. `students.js` also drops them and logs a warning
if they ever appear in the file. Both are guards, not permission — don't route
around them by putting a last name in another field.

## When a student is fully funded

Set Status to **Fully sponsored**. Their card stays in the gallery with a
ribbon and the donate button comes off. **Do not delete them** — funded students
are the proof this works.

---

## The file format

You need this only if `/admin/` is down and something has to change right now.

```json
{
  "students": [
    {
      "id": "marcus-t",
      "firstName": "Marcus",
      "lastInitial": "T.",
      "photo": "images/students/marcus-t.jpg",
      "ageRange": "16–18",
      "city": "McKinney, TX",
      "campus": "McKinney, TX",
      "trade": "Welding",
      "classWanted": "Welding Certification",
      "certifications": ["AWS D1.1 Structural Steel", "OSHA 10"],
      "oneLineNeed": "One sentence. Shows on the gallery card.",
      "story": "What they've overcome.\n\nUse \\n\\n between paragraphs.",
      "aspiration": "Where they want to end up.",
      "impact": "What their success changes for family and community.",
      "needs": [
        { "label": "Tuition", "amount": 4900 },
        { "label": "Tools and gear", "amount": 600 }
      ],
      "status": "active"
    }
  ]
}
```

Notes:

- Everything sits inside `{ "students": [ ... ] }`. Don't unwrap it — the CMS
  cannot edit a bare list.
- **`id` is optional.** Leave it out and the page works the address out from the
  student's name — `José R.` becomes `invest.html?id=jose-r`. There is no field
  for it in the CMS. Set it by hand only when you need a specific URL to stay
  fixed regardless of name edits; the four original profiles have one for that
  reason.
- **There is no total field.** The page sums `needs` itself. `amount` is a plain
  number — `4900`, not `"$4,900"`.
- `status` is `"active"` or `"funded"`.

If the file breaks, the whole gallery goes blank — usually a missing comma.
Paste it into <https://jsonlint.com> to find it.

To preview locally you need a web server; opening the file directly won't load
the students:

```
cd website-revamp
python3 -m http.server 8000
```

Then open <http://localhost:8000/invest.html>.

---

## Still unresolved

- **Can a donation be earmarked to a specific student through amfol.org/donate?**
  Until this is confirmed, each donate button is followed by a note asking the
  donor to write the student's name in the memo field. Now sharper than before,
  since donors may want to fund one line item rather than the whole amount.
- **Does the $100,000 matching grant apply to student-specific gifts,** or only
  to general giving? The page currently says it applies. Confirm before this goes
  in front of donors.
