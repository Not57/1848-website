# Student Manager

A form for adding, editing, and removing students on the sponsor-a-student page.
You do not need to know how to code to use it.

---

## Before anything else: consent

**A student does not go on this page until a signed release is on file.** If the
student is under 18, a parent or guardian signs too.

The release has to cover everything the form asks for — not only their name and
photo, but their story, what they've overcome, their career goals, and what their
success means for their family. That is more personal than a standard photo
release. Check that the form your students sign actually covers it.

This is a legal and ethical requirement, not a formality.

---

## Using it

1. Go to **1848.net/admin/** and click *Login with GitHub*.
2. Click **Students → Student Profiles**.
3. You'll see the list of students.
   - **Add** — click *Add Student* at the bottom
   - **Edit** — click a student to expand them
   - **Remove** — click the trash icon on their row
   - **Reorder** — drag the handle; the gallery shows them in this order
4. Click **Publish → Publish now** when you're done. The live site updates in
   about a minute.

> **Nothing is saved until you publish.** Watch the top-left corner. It says
> *UNSAVED CHANGES* in red while you have work pending, and the teal **Publish**
> button is available. If it says *CHANGES SAVED* and the button reads
> *Published*, the CMS thinks you have no pending work.
>
> One known quirk: **removing a single row from "What they need funded"
> sometimes does not register as a change** — no red *UNSAVED CHANGES*, no
> Publish button — and the row comes back next time you open the page. If that
> happens, edit any other field (retype a word in their story) to wake it up,
> then publish. Removing a whole student works normally.

### Filling in a student

Most fields explain themselves. Four worth knowing:

- **Web link name** — becomes their web address, like
  `1848.net/students.html?id=marcus-t`. Lowercase and dashes only. You can send
  that link to one donor about one student. Don't change it after you've shared
  it, or the old link breaks.
- **Photo** — click *Choose an image* and upload. Roughly 4:3, wider than tall.
  The student working, decent light, face visible. Not stock photos, not group
  shots where you can't tell who it is.
- **Story / goals / impact** — leave a blank line between paragraphs.
- **What they need funded** — add a row per item: Tuition, Tools and gear,
  Transportation, Housing, Emergency assistance. **Never type a total.** The site
  adds them up, so the total can never disagree with the line items. Donors see
  the breakdown and can cover one line or all of it.

### When a student gets sponsored

Set **Status** to *Fully sponsored*. **Do not delete them.** Their card stays up
with a "Fully Sponsored" ribbon, which is the best proof the program works.

### What the form will not let you do

There is no last-name field and no exact-age field. That's deliberate — most of
these students are minors. First name and last initial only, age ranges only.
Don't work around it by putting a last name in another field.

---

## One-time setup

Only needed once, by whoever administers the site. Until step 2 is done, login
fails and `/admin/` is unusable.

**1. Create a GitHub OAuth App**

github.com/settings/developers → *New OAuth App*
- Homepage URL: `https://1848.net`
- Authorization callback URL: `https://<your-worker>.workers.dev/callback`

Save the Client ID and Client Secret.

**2. Deploy the OAuth proxy**

GitHub Pages is static and cannot hold a secret, so the token exchange needs to
run somewhere. Deploy `github.com/sveltia/sveltia-cms-auth` to Cloudflare Workers
(free tier, one-click deploy button in its README).

Set these variables in the Cloudflare dashboard under *Settings → Variables*:

| Variable | Value |
|---|---|
| `GITHUB_CLIENT_ID` | from step 1 |
| `GITHUB_CLIENT_SECRET` | from step 1 |
| `ALLOWED_DOMAINS` | `1848.net` |

`ALLOWED_DOMAINS` stops anyone else's site from using your worker.

**3. Point the CMS at the worker**

In `admin/config.yml`, replace the `base_url` placeholder with your worker URL.
The callback URL from step 1 and this URL must match exactly, or login fails with
a blank screen.

**4. Give editors access**

Each person needs a GitHub account with **write** access to `Not57/1848-website`.
Decap acts as the logged-in person, so their edits show up as their own commits.

There are no per-user roles — anyone with write access can edit anything in the
repo. Keep the collaborator list short.

---

## Testing changes without touching the live site

```
npx decap-server
```

Then add `local_backend: true` to the top of `config.yml` and open
`http://localhost:8000/admin/`. The CMS reads and writes your local files, with
no GitHub and no worker involved. **Remove `local_backend: true` before pushing.**

## If /admin/ won't load

- **Blank page** — the worker URL and the OAuth callback URL don't match, or
  `base_url` is still the placeholder.
- **"Failed to load config.yml"** — a YAML indentation error. Whitespace matters.
- **Login works but saving fails** — that account doesn't have write access.
- **Page loads but no students** — check `students/students.json` is still valid
  JSON. Paste it into jsonlint.com.

The public site is unaffected by any of these. `/admin/` is a separate page.
