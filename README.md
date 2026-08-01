# Happy Girlfriend's Day 🌸❤️ — for Natasha

A single-page, interactive love letter site: soft glassmorphism, floating
lilies and tulips, a story timeline, a photo gallery, six flowers that
reveal reasons why you love her, and a final surprise. Pure HTML/CSS/JS —
no build step, no frameworks.

## File structure

```
happy-girlfriends-day/
├── index.html      the whole page
├── style.css       all styling & animation
├── script.js       all interactivity
├── images/         put your photos here (see images/README.md)
└── music/          put one background track here (see music/README.md)
```

## How to host it on GitHub Pages (5 minutes)

1. Create a new repository on GitHub (public, so Pages can serve it for free).
2. Upload everything inside this `happy-girlfriends-day` folder to the
   root of that repository (index.html, style.css, script.js, images/, music/).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch".
5. Set **Branch** to `main` (or `master`) and folder to `/ (root)`, then **Save**.
6. Wait a minute or two, then your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## What to personalize before sharing it

- **Our Story** (index.html, `#story` section): replace the four
  `[Edit this: ...]` placeholders with your real memories and dates.
- **Photo Gallery**: add `photo1.jpg` through `photo6.jpg` to `/images`
  and update the `<figcaption>` text under each photo.
- **Music**: add `love-song.mp3` to `/music` if you want a background track.
- **The letter**: fully written already in `index.html` inside
  `#envelopeLetter` — feel free to tweak the wording to sound even more
  like you.
- **Reasons flowers**: edit the `data-detail` text on each `.flower-btn`
  in `index.html` to make the reasons even more specific to her.

## Easter eggs already built in

- Click either floating lily/tulip on the landing screen five times → a
  shower of flowers blooms across the screen.
- Double-click anywhere on the page → a small burst of hearts.
- Every 25–55 seconds, a small "Thinking of you, Natasha ❤️" note gently
  slides up from the bottom, then fades — never intrusive.

Enjoy, and happy customizing. 🌷
