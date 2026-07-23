// Renders the sponsor-a-student gallery and detail view from students/students.json.
// Adding a student = one JSON object + one photo. Do not hand-code student HTML here.

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('student-gallery');
  const detail = document.getElementById('student-detail');
  if (!gallery || !detail) return;

  // cache: 'no-cache' forces a revalidation with the server on every load.
  // Without it the browser serves a stale students.json and newly added
  // students do not show up until the cache expires.
  fetch('students/students.json', { cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) throw new Error('students.json ' + res.status);
      return res.json();
    })
    .then((data) => {
      // The file is { "students": [...] } — Decap CMS cannot edit a bare
      // top-level array. The Array.isArray branch keeps a stale cached copy
      // of the old shape rendering instead of blanking the gallery.
      const students = Array.isArray(data) ? data : data.students || [];

      // Empty state. With no students listed, the student sections stay hidden
      // and the page reads as a plain giving-tiers page. The moment an editor
      // adds one student through /admin/, they reveal themselves on next load.
      if (!students.length) return;

      revealStudentSections();
      students.forEach(checkPrivacy);
      assignSlugs(students);

      const id = new URLSearchParams(window.location.search).get('id');
      const match = id ? students.find((s) => s.slug === id) : null;

      if (match) {
        renderDetail(match, detail, gallery);
      } else {
        renderGallery(students, gallery);
      }
    })
    .catch((err) => {
      console.error('Could not load students:', err);
      gallery.textContent = '';
      const p = document.createElement('p');
      p.className = 'student-load-error';
      p.textContent = 'Student profiles are unavailable right now. ';
      const link = document.createElement('a');
      link.href = 'invest.html#tiers';
      link.textContent = 'See our giving tiers instead →';
      p.appendChild(link);
      gallery.appendChild(p);
    });
});

// Backstop for hand edits. The CMS form at /admin/ is the primary guard — it has
// no last-name field and no free-text age box — but the JSON can still be edited
// directly, so full last names and exact ages are dropped here too.
function checkPrivacy(s) {
  if (s.lastName) {
    console.warn(`[students] "lastName" on ${s.id} was ignored — use "lastInitial" only.`);
  }
  if (typeof s.age === 'number') {
    console.warn(`[students] numeric "age" on ${s.id} was ignored — use "ageRange" only.`);
  }
}

function displayName(s) {
  return [s.firstName, s.lastInitial].filter(Boolean).join(' ');
}

// The student-facing sections (How It Works, the gallery) ship with the `hidden`
// attribute so that with no students listed — or if this script never loads —
// invest.html reads as a plain giving-tiers page. Called only when there is at
// least one student; it also repoints the hero button from the tiers at the
// gallery.
function revealStudentSections() {
  document.querySelectorAll('.student-section').forEach((el) => {
    el.hidden = false;
  });
  const cta = document.getElementById('hero-cta');
  if (cta) {
    cta.setAttribute('href', '#gallery');
    cta.textContent = 'See the Students';
  }
}

// The link name used in students.html?id=... There is no field for this in the
// CMS — asking a non-technical editor to hand-type a URL-safe string just
// produced errors. It is derived from the name instead.
//
// An explicit "id" in the JSON still wins, so links already shared for the
// original profiles keep working even if their names are edited later.
function slugFor(s) {
  if (s.id) return s.id;
  return [s.firstName, s.lastInitial]
    .filter(Boolean)
    .join('-')
    // Fold accents to plain letters first, so José becomes jose-r and not jos-r.
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Two students with the same first name and last initial would derive the same
// link. Second and later duplicates get a numbered suffix so every student
// stays reachable.
function assignSlugs(students) {
  const seen = new Map();
  students.forEach((s) => {
    let slug = slugFor(s);
    if (seen.has(slug)) {
      const n = seen.get(slug) + 1;
      seen.set(slug, n);
      console.warn(
        `[students] Two students share the link name "${slug}". ` +
          `${displayName(s)} is at "${slug}-${n}". Set an explicit "id" in students.json to control this.`
      );
      slug = `${slug}-${n}`;
    } else {
      seen.set(slug, 1);
    }
    s.slug = slug;
  });
}

function formatCost(cost) {
  return typeof cost === 'number' ? '$' + cost.toLocaleString('en-US') : '';
}

// Total is always summed from needs[], never stored, so it cannot drift out of
// sync with the line items. classCost is the pre-Week-10 shape, kept so older
// records still show a number.
function totalNeed(s) {
  if (Array.isArray(s.needs) && s.needs.length) {
    return s.needs.reduce((sum, n) => sum + (Number(n.amount) || 0), 0);
  }
  return Number(s.classCost) || 0;
}

function renderGallery(students, gallery) {
  gallery.textContent = '';

  students.forEach((s) => {
    const card = document.createElement('a');
    card.className = 'student-card';
    if (s.status === 'funded') card.classList.add('student-card--funded');
    card.href = location.pathname + '?id=' + encodeURIComponent(s.slug);

    const figure = document.createElement('div');
    figure.className = 'student-photo';
    const img = document.createElement('img');
    img.src = s.photo;
    img.alt = displayName(s);
    img.loading = 'lazy';
    figure.appendChild(img);

    if (s.status === 'funded') {
      const ribbon = document.createElement('span');
      ribbon.className = 'student-ribbon';
      ribbon.textContent = 'Fully Sponsored';
      figure.appendChild(ribbon);
    }
    card.appendChild(figure);

    const body = document.createElement('div');
    body.className = 'student-card__body';

    const name = document.createElement('h3');
    name.className = 'student-card__name';
    name.textContent = displayName(s);
    body.appendChild(name);

    const meta = document.createElement('p');
    meta.className = 'student-card__meta';
    meta.textContent = [s.ageRange, s.city].filter(Boolean).join(' · ');
    body.appendChild(meta);

    const need = document.createElement('p');
    need.className = 'student-card__need';
    need.textContent = s.oneLineNeed || '';
    body.appendChild(need);

    const wants = document.createElement('p');
    wants.className = 'student-card__class';
    wants.textContent = [s.trade, s.campus].filter(Boolean).join(' · ');
    body.appendChild(wants);

    const total = totalNeed(s);
    if (total) {
      const amount = document.createElement('p');
      amount.className = 'student-card__amount';
      amount.textContent =
        (s.status === 'funded' ? 'Funded: ' : 'Needs ') + formatCost(total);
      body.appendChild(amount);
    }

    const cta = document.createElement('span');
    cta.className = 'student-card__link';
    cta.textContent =
      s.status === 'funded' ? 'Read ' + s.firstName + "'s story →" : 'Sponsor ' + s.firstName + ' →';
    body.appendChild(cta);

    card.appendChild(body);
    gallery.appendChild(card);
  });
}

function renderDetail(s, detail, gallery) {
  // Detail mode: hide every other section (hero, how-it-works, tiers, naming,
  // open house) so the student's own page shows only their story. A body class
  // drives it via CSS; nav and footer stay for navigation. See styles.css.
  document.body.classList.add('viewing-student');

  const gallerySection = document.getElementById('gallery');
  if (gallerySection) gallerySection.hidden = true;
  gallery.hidden = true;
  detail.hidden = false;
  detail.textContent = '';

  document.title = 'Sponsor ' + s.firstName + ' — 1848';

  const back = document.createElement('a');
  back.className = 'student-back-link';
  back.href = location.pathname;
  back.textContent = '← Back to all students';
  detail.appendChild(back);

  const wrap = document.createElement('div');
  wrap.className = 'student-detail__inner';

  const photoWrap = document.createElement('div');
  photoWrap.className = 'student-detail__photo';
  const img = document.createElement('img');
  img.src = s.photo;
  img.alt = displayName(s);
  photoWrap.appendChild(img);
  if (s.status === 'funded') {
    const ribbon = document.createElement('span');
    ribbon.className = 'student-ribbon';
    ribbon.textContent = 'Fully Sponsored';
    photoWrap.appendChild(ribbon);
  }
  wrap.appendChild(photoWrap);

  const text = document.createElement('div');
  text.className = 'student-detail__text';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Sponsor a Student';
  text.appendChild(eyebrow);

  const name = document.createElement('h2');
  name.textContent = displayName(s);
  text.appendChild(name);

  const meta = document.createElement('p');
  meta.className = 'student-detail__meta';
  meta.textContent = [s.ageRange, s.city].filter(Boolean).join(' · ');
  text.appendChild(meta);

  const facts = document.createElement('ul');
  facts.className = 'student-detail__facts';
  addFact(facts, 'Trade', s.trade);
  addFact(facts, 'Campus', s.campus);
  addFact(facts, 'Program', s.classWanted);
  text.appendChild(facts);

  if (Array.isArray(s.certifications) && s.certifications.length) {
    const certLabel = document.createElement('p');
    certLabel.className = 'student-detail__certs-label';
    certLabel.textContent = 'Certifications they will earn';
    text.appendChild(certLabel);

    const certs = document.createElement('ul');
    certs.className = 'student-certs';
    s.certifications.forEach((c) => {
      const li = document.createElement('li');
      li.textContent = c;
      certs.appendChild(li);
    });
    text.appendChild(certs);
  }

  const story = document.createElement('div');
  story.className = 'student-detail__story';
  paragraphs(s.story).forEach((p) => story.appendChild(p));
  text.appendChild(story);

  addSection(text, "Where They're Headed", s.aspiration);
  renderNeeds(text, s);
  addSection(text, 'What This Changes', s.impact);

  if (s.status === 'funded') {
    const done = document.createElement('p');
    done.className = 'student-detail__funded';
    done.textContent = s.firstName + ' is fully sponsored. Thank you to everyone who gave.';
    text.appendChild(done);

    const other = document.createElement('a');
    other.className = 'btn-primary';
    other.href = location.pathname;
    other.textContent = 'Sponsor another student';
    text.appendChild(other);
  } else {
    const cta = document.createElement('a');
    cta.className = 'btn-primary';
    cta.href = 'https://amfol.org/donate';
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.textContent = 'Sponsor ' + s.firstName;
    text.appendChild(cta);

    // TODO: confirm amfol.org/donate supports a designation field or URL param.
    // Until then the memo instruction keeps the promise honest.
    const note = document.createElement('p');
    note.className = 'student-memo-note';
    note.textContent =
      'Add ' + s.firstName + "'s name in the memo or notes field so we can route your gift.";
    text.appendChild(note);
  }

  wrap.appendChild(text);
  detail.appendChild(wrap);
}

// Story, aspiration, and impact are all multi-paragraph free text entered in the
// CMS. Blank lines separate paragraphs.
function paragraphs(str) {
  return String(str || '')
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((para) => {
      const p = document.createElement('p');
      p.textContent = para;
      return p;
    });
}

function addSection(parent, heading, body) {
  if (!body) return;
  const section = document.createElement('div');
  section.className = 'student-detail__section';
  const h = document.createElement('h3');
  h.textContent = heading;
  section.appendChild(h);
  paragraphs(body).forEach((p) => section.appendChild(p));
  parent.appendChild(section);
}

// Itemized need, so a donor can cover one line instead of the whole amount.
function renderNeeds(parent, s) {
  const total = totalNeed(s);
  if (!total) return;

  const section = document.createElement('div');
  section.className = 'student-detail__section';

  const h = document.createElement('h3');
  h.textContent = 'What They Need Funded';
  section.appendChild(h);

  const table = document.createElement('ul');
  table.className = 'student-needs';

  (s.needs || []).forEach((n) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = n.label || '';
    const amount = document.createElement('span');
    amount.textContent = formatCost(Number(n.amount) || 0);
    li.appendChild(label);
    li.appendChild(amount);
    table.appendChild(li);
  });

  const totalRow = document.createElement('li');
  totalRow.className = 'student-needs__total';
  const totalLabel = document.createElement('span');
  totalLabel.textContent = 'Total';
  const totalAmount = document.createElement('span');
  totalAmount.textContent = formatCost(total);
  totalRow.appendChild(totalLabel);
  totalRow.appendChild(totalAmount);
  table.appendChild(totalRow);

  section.appendChild(table);

  if (s.status !== 'funded') {
    const note = document.createElement('p');
    note.className = 'student-needs__note';
    note.textContent = 'You can cover any part of this, or all of it.';
    section.appendChild(note);
  }

  parent.appendChild(section);
}

function addFact(list, label, value) {
  if (!value) return;
  const li = document.createElement('li');
  const strong = document.createElement('strong');
  strong.textContent = label + ': ';
  li.appendChild(strong);
  li.appendChild(document.createTextNode(value));
  list.appendChild(li);
}
