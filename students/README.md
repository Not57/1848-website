# How to Add a Student

The sponsor-a-student page (`students.html`) builds itself from `students.json`.
Adding a student means adding one block of text and one photo. You never touch
HTML, CSS, or JavaScript.

---

## Before anything else: consent

**A student does not go on this page until a signed release is on file.**
If the student is under 18, a parent or guardian signs too. Name, photo, and
story are all covered by that release. No exceptions — this is a legal and
ethical requirement, not a formality.

The profiles currently in `students.json` are **placeholders** for testing.
They are marked `"placeholder": true`, which puts a warning banner on the page.
Delete them when real students go live.

---

## Step 1 — Add the photo

Crop it to roughly 4:3 (wider than tall). Save it into `images/students/` named
after the student's id, for example `images/students/marcus-t.jpg`.

Good photos: the student working, decent light, face visible. Bad photos: stock
images, heavy filters, group shots where you can't tell who it is.

## Step 2 — Add the student block

Open `students.json`. Copy an existing block (everything from `{` to `}`), paste
it after the last one, put a comma between them, and change the fields:

```json
{
  "id": "marcus-t",
  "firstName": "Marcus",
  "lastInitial": "T.",
  "photo": "images/students/marcus-t.jpg",
  "ageRange": "16–18",
  "city": "McKinney, TX",
  "classWanted": "Welding Certification",
  "classCost": 4900,
  "oneLineNeed": "One sentence. Shows up on the card in the gallery.",
  "story": "The full narrative.\n\nUse \\n\\n between paragraphs.",
  "status": "active"
}
```

| Field | What goes here |
|---|---|
| `id` | Lowercase, dashes, no spaces. Becomes the student's web link. |
| `firstName` | First name only. |
| `lastInitial` | One letter and a period. **Never the full last name.** |
| `photo` | Path to the photo you saved in step 1. |
| `ageRange` | A range like `"16–18"`. **Never an exact age.** |
| `city` | City and state. No street address. |
| `classWanted` | The class or certification they're working toward. |
| `classCost` | A number, no dollar sign and no commas. `4900`, not `"$4,900"`. |
| `oneLineNeed` | One sentence for the gallery card. |
| `story` | The full story. `\n\n` starts a new paragraph. |
| `status` | `"active"` or `"funded"`. |

Leave out `"placeholder": true` — that field is only for the test profiles.

## Step 3 — Commit and push

The page updates itself. Nothing else to do.

---

## Privacy rules (enforced by the page)

The page strips these out even if someone puts them in the file:

- **Full last names.** Add a `lastName` field and it will be ignored.
- **Exact ages.** Add a numeric `age` field and it will be ignored.

Also keep out, though nothing can auto-catch these: school names, home
addresses, and anything about a student's case, placement, or family situation
that they did not agree to have published.

## When a student is fully funded

Change `"status": "active"` to `"status": "funded"`.

Their card stays in the gallery with a "Fully Sponsored" ribbon and the donate
button comes off. **Do not delete the entry** — funded students are the proof
this works.

---

## Checking your work

If a change breaks the file, the whole gallery goes blank — usually a missing
comma or a stray quote. Paste the file into <https://jsonlint.com> to find it.

To preview locally, you need a small web server (opening the file directly in a
browser will not load the students):

```
cd website-revamp
python3 -m http.server 8000
```

Then open <http://localhost:8000/students.html>.

---

## Still unresolved

- **Can a donation be earmarked to a specific student through amfol.org/donate?**
  Until this is confirmed, each student's donate button is followed by a note
  asking the donor to write the student's name in the memo field.
- **Does the $100,000 matching grant apply to student-specific gifts,** or only
  to general giving? The page currently says it applies. Confirm before this
  goes in front of donors.
