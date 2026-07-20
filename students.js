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
    .then((students) => {
      students.forEach(checkPrivacy);

      const id = new URLSearchParams(window.location.search).get('id');
      const match = id ? students.find((s) => s.id === id) : null;

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

// Minor privacy defaults are enforced here, not by trusting whoever adds a student.
// Full last names and exact ages never render, even if someone puts them in the JSON.
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

function formatCost(cost) {
  return typeof cost === 'number' ? '$' + cost.toLocaleString('en-US') : '';
}

function renderGallery(students, gallery) {
  gallery.textContent = '';

  students.forEach((s) => {
    const card = document.createElement('a');
    card.className = 'student-card';
    if (s.status === 'funded') card.classList.add('student-card--funded');
    card.href = 'students.html?id=' + encodeURIComponent(s.id);

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
    wants.textContent = 'Wants to take: ' + (s.classWanted || '');
    body.appendChild(wants);

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
  const gallerySection = document.getElementById('gallery');
  if (gallerySection) gallerySection.hidden = true;
  gallery.hidden = true;
  detail.hidden = false;
  detail.textContent = '';

  document.title = 'Sponsor ' + s.firstName + ' — 1848';

  const back = document.createElement('a');
  back.className = 'student-back-link';
  back.href = 'students.html';
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
  addFact(facts, 'Class', s.classWanted);
  addFact(facts, 'Cost to sponsor', formatCost(s.classCost));
  text.appendChild(facts);

  const story = document.createElement('div');
  story.className = 'student-detail__story';
  String(s.story || '')
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((para) => {
      const p = document.createElement('p');
      p.textContent = para;
      story.appendChild(p);
    });
  text.appendChild(story);

  if (s.status === 'funded') {
    const done = document.createElement('p');
    done.className = 'student-detail__funded';
    done.textContent = s.firstName + ' is fully sponsored. Thank you to everyone who gave.';
    text.appendChild(done);

    const other = document.createElement('a');
    other.className = 'btn-primary';
    other.href = 'students.html';
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

function addFact(list, label, value) {
  if (!value) return;
  const li = document.createElement('li');
  const strong = document.createElement('strong');
  strong.textContent = label + ': ';
  li.appendChild(strong);
  li.appendChild(document.createTextNode(value));
  list.appendChild(li);
}
