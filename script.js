/* =========================================================
   HAPPY GIRLFRIEND'S DAY — Natasha
   All interactive behaviour lives here. Sections are
   organized to mirror the page: petals, scroll reveal,
   envelope, reasons, gift, music, and easter eggs.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     0. Ambient floating petals in the background
     --------------------------------------------------------- */
  const petalField = document.getElementById('petalField');
  const petalColors = ['', 'sage', 'gold'];

  function spawnPetal() {
    const petal = document.createElement('div');
    const colorClass = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.className = `petal ${colorClass}`.trim();
    petal.innerHTML = '<svg viewBox="0 0 40 40" width="100%" height="100%"><use href="#icon-petal"/></svg>';

    const left = Math.random() * 100;
    const size = 10 + Math.random() * 14;
    const duration = 9 + Math.random() * 8;
    const drift = (Math.random() - 0.5) * 160;

    petal.style.left = `${left}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.setProperty('--drift', `${drift}px`);

    petalField.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 500);
  }

  // Gentle, occasional petals rather than a busy screen
  setInterval(spawnPetal, 1400);
  for (let i = 0; i < 4; i++) setTimeout(spawnPetal, i * 500);

  /* ---------------------------------------------------------
     1. Scroll reveal (fade-in-up) via IntersectionObserver
     --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('.fade-in-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     2. Landing button -> scroll to letter + auto-open envelope
     --------------------------------------------------------- */
  const openLetterBtn = document.getElementById('openLetterBtn');
  const letterSection = document.getElementById('letter');
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');

  function openEnvelope() {
    envelope.classList.add('open');
    envelope.setAttribute('aria-expanded', 'true');
    if (envelopeHint) envelopeHint.style.opacity = '0';
  }

  openLetterBtn.addEventListener('click', () => {
    letterSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(openEnvelope, 700);
  });

  envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) openEnvelope();
  });
  envelope.setAttribute('tabindex', '0');
  envelope.setAttribute('role', 'button');
  envelope.setAttribute('aria-expanded', 'false');
  envelope.setAttribute('aria-label', 'Open the love letter');
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  /* ---------------------------------------------------------
     3. Reasons I Love You — flowers reveal text on click
     --------------------------------------------------------- */
  const flowerButtons = document.querySelectorAll('.flower-btn');
  const reasonReveal = document.getElementById('reasonReveal');

  flowerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      flowerButtons.forEach((b) => b.classList.remove('opened'));
      btn.classList.add('opened');

      const reason = btn.dataset.reason;
      const detail = btn.dataset.detail;

      reasonReveal.innerHTML = `
        <div class="reason-card glass">
          <h4>${reason}</h4>
          <p>${detail}</p>
        </div>
      `;
    });
  });

  /* ---------------------------------------------------------
     4. Final surprise — the gift
     --------------------------------------------------------- */
  const giftBtn = document.getElementById('giftBtn');
  const finaleMessage = document.getElementById('finaleMessage');
  const surpriseSection = document.getElementById('surprise');

  giftBtn.addEventListener('click', () => {
    if (giftBtn.classList.contains('opened')) return;
    giftBtn.classList.add('opened');
    surpriseSection.classList.add('glow');

    // Bloom shower across the whole screen
    showerBlooms(40);
    // Hearts floating up around the gift
    burstHearts(giftBtn.getBoundingClientRect(), 18);

    setTimeout(() => {
      finaleMessage.hidden = false;
    }, 500);
  });

  /* ---------------------------------------------------------
     5. Music player — only plays after visitor opts in
     --------------------------------------------------------- */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let musicPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!musicPlaying) {
      bgMusic.play().catch(() => {
        // No music file provided yet — fail silently and just toggle the icon state
        console.info('Add a track at music/love-song.mp3 to enable playback.');
      });
      musicPlaying = true;
    } else {
      bgMusic.pause();
      musicPlaying = false;
    }
    musicToggle.setAttribute('aria-pressed', String(musicPlaying));
    musicToggle.setAttribute('aria-label', musicPlaying ? 'Pause background music' : 'Play background music');
  });

  /* ---------------------------------------------------------
     6. Easter egg — click a lily several times to bloom flowers
     --------------------------------------------------------- */
  let lilyClicks = 0;
  document.querySelectorAll('.landing-bloom--left, .landing-bloom--right').forEach((bloom) => {
    bloom.style.pointerEvents = 'auto';
    bloom.style.cursor = 'pointer';
    bloom.addEventListener('click', () => {
      lilyClicks += 1;
      if (lilyClicks >= 5) {
        showerBlooms(30);
        lilyClicks = 0;
      }
    });
  });

  /* ---------------------------------------------------------
     7. Easter egg — double-click anywhere for a heart burst
     --------------------------------------------------------- */
  document.addEventListener('dblclick', (e) => {
    burstHearts({ left: e.clientX, top: e.clientY, width: 0, height: 0 }, 10);
  });

  /* ---------------------------------------------------------
     8. Easter egg — occasional random love note
     --------------------------------------------------------- */
  const loveNotes = [
    'Thinking of you, Natasha ❤️',
    'You make ordinary days better.',
    'Still my favourite person.',
    'Just so you know — I love you.',
  ];
  const loveNoteEl = document.getElementById('loveNote');

  function showLoveNote() {
    const note = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    loveNoteEl.textContent = note;
    loveNoteEl.classList.add('show');
    setTimeout(() => loveNoteEl.classList.remove('show'), 4000);
  }

  // First note after a while, then repeat at a random, non-intrusive interval
  function scheduleLoveNote() {
    const delay = 25000 + Math.random() * 30000; // 25–55s
    setTimeout(() => {
      showLoveNote();
      scheduleLoveNote();
    }, delay);
  }
  scheduleLoveNote();

  /* ---------------------------------------------------------
     Shared particle helpers
     --------------------------------------------------------- */
  function burstHearts(rect, count) {
    const layer = document.getElementById('heartsLayer');
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-particle';
      heart.innerHTML = '<svg viewBox="0 0 32 29" width="18" height="18"><use href="#icon-heart"/></svg>';

      const originX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
      const originY = rect.top + rect.height / 2 + (Math.random() - 0.5) * 20;

      heart.style.left = `${originX}px`;
      heart.style.top = `${originY}px`;
      heart.style.animationDelay = `${Math.random() * 0.3}s`;
      heart.style.opacity = 0.7 + Math.random() * 0.3;

      layer.appendChild(heart);
      setTimeout(() => heart.remove(), 2200);
    }
  }

  function showerBlooms(count) {
    const layer = document.getElementById('bloomLayer');
    const icons = ['icon-lily', 'icon-tulip', 'icon-petal'];
    const colors = ['var(--rose)', 'var(--sage)', 'var(--gold)', 'var(--blush-deep)'];

    for (let i = 0; i < count; i++) {
      const bloom = document.createElement('div');
      bloom.className = 'bloom-particle';
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const size = 16 + Math.random() * 22;
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 3;
      const delay = Math.random() * 1.2;

      bloom.style.left = `${left}vw`;
      bloom.style.width = `${size}px`;
      bloom.style.height = `${size}px`;
      bloom.style.color = colors[Math.floor(Math.random() * colors.length)];
      bloom.style.animationDuration = `${duration}s`;
      bloom.style.animationDelay = `${delay}s`;
      bloom.innerHTML = `<svg viewBox="0 0 100 100" width="100%" height="100%"><use href="#${icon}"/></svg>`;

      layer.appendChild(bloom);
      setTimeout(() => bloom.remove(), (duration + delay) * 1000 + 300);
    }
  }

});
