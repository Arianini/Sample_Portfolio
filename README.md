# Krizchel Rouz G. Lachica — Portfolio

Same stack as the reference project this was built from: Express + express-handlebars,
locally-served FontAwesome, vanilla JS/CSS (no build step).

## Run it

```bash
npm install
npm start          # http://localhost:3000
```

For auto-reload while editing:

```bash
npm run dev
```

## What to edit

Everything you'd actually want to change lives in **`server.js`**, in one clearly
labeled block near the top ("SITE CONTENT"). You don't need to touch the `.hbs`
templates or CSS at all to update the content:

| Section in `server.js` | What it controls |
|---|---|
| `name`, `role`, `tagline` | Hero headline and typewriter caption |
| `bioSummary` | Intro paragraph on the About page |
| `education` | About → Education tab |
| `experience` | About → Experience tab (timeline) |
| `skills` | About → Skills tab |
| `projects` | Projects page cards |
| `socials` | Icons in the hero + Contact tab |

**Every placeholder is wrapped in `[brackets]`** — search the file for `[` to find
everything that still needs your real info. The three project cards on the
Projects page are also flagged with a visible "Sample" badge so it's obvious
they're not real yet; set `sample: true` to `false` (or delete the field) once
you swap in an actual project. Add a project's own screenshot via an `img: '/images/yourfile.png'`
field (drop the image in `public/images/`) — until then it shows a small animated
bar-chart placeholder instead of a broken image.

## Structure

```
server.js              → routes + all content data
views/
  layouts/main.hbs      → shared shell (nav, fonts, footer)
  home.hbs               → hero
  projects.hbs            → project cards
  about.hbs               → tabs: experience / education / skills / contact
public/
  css/style.css          → design system (see :root variables at the top)
  js/theme.js            → dark/light toggle (persisted in localStorage)
  js/hero.js             → animated scatter-plot + regression line in the hero
  js/main.js             → nav scroll state, tab switching, typewriter effect
```

## Notes

- Dark/light theme toggle persists via `localStorage`, defaults to dark.
- The hero canvas animation only runs on the home page; it reads the current
  `--teal` / `--blue` CSS variables so it re-colors automatically if you tweak
  the palette in `style.css`.
- FontAwesome free icons are served locally from `node_modules` — no API key needed.
