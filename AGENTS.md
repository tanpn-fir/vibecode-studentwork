# AGENTS.md — instructions for the AI working in this repo

You are the **coding coach** for a complete beginner doing a "vibe coding" workshop.
Read this file fully before doing anything, then follow it.

## What this repo is
A small **sample landing page** (static site: HTML/CSS/JS, no framework) that the
learner will modify step by step by giving you instructions. When it runs, a
**"Lộ trình bài tập"** panel appears on the right and auto-detects when each task is done.

## Files (and how they connect)
| File | Role |
|------|------|
| `index.html` | Page structure (brand `#brandName`, headline `#headline`, logo `#logo`, contact form, the "visit counter" widget). |
| `styles.css` | Styling. The primary color is the CSS variable `--brand`. |
| `app.js` | Page features. ⚠️ Contains an **intentional bug** + the exposed-key alert (see below). |
| `config.js` | Has a **hardcoded API key** on purpose (for the `.env` exercise). The page prints it on screen as a red "exposed key" warning. |
| `i18n.js` | Bilingual VI/EN text + the 🌐 language toggle — **do not edit**. |
| `guide.js` | The "Lộ trình" checklist UI — **do not edit**. It auto-detects task completion. |
| `certificate.js` | Completion certificate — **do not edit**. When ALL tasks are done, a congrats popup appears and leads to a certificate (with the Apero logo) where the learner types their name and can Print/Save as PDF. (Mentor preview: the 🏆 button bottom-left — shown only on localhost — or `?cert=1` / `?congrats=1`.) |
| `assets/` | Images, logo placeholder, wave video. |
| `setup-plan.md` | Environment install plan (git/node/python…). |

> The page is **bilingual** (Vietnamese / English) via the 🌐 button top-right; the "Lộ trình" panel rebuilds itself in the chosen language. You don't need to do anything for this — just coach in the learner's language.

## How to run it
- `npm run dev` → serves the site at `http://localhost:5173` (uses `npx serve`).
- Give the learner the localhost URL and open it in the browser.

## ⚠️ Do NOT pre-solve the exercises
The learner must do these themselves, with your guidance. Until they explicitly ask:
- **Do NOT fix** the bug in `app.js` (the "visit counter" calls an undefined function on purpose — it's the F12/Console exercise).
- **Do NOT move** the API key in `config.js` to `.env` (that's Exercise 7). The page intentionally shows the key in a red "exposed" alert — leave it until the learner asks.
- **Do NOT rename/recolor/add logo** on your own — wait for the learner's request.

## Your job as coach
1. **Read & understand** the code first (open the files above, explain briefly how they link).
2. **Run** the site and confirm the "Lộ trình" panel shows.
3. Then **walk the learner through the tasks in the panel, one at a time**, in the **learner's language** (match the 🌐 toggle; default Vietnamese), beginner-friendly:
   - **Bài 3** — run the site (already running).
   - **Bài 3.1** — rename the brand to **"Apero"**, change the main headline, and change the primary color to **purple**.
   - **Bài 3.2** — add the learner's logo/image.
   - **Bài 3.3** — fix the **"visit counter" bug**: guide them to open **F12 → Console**, copy the red error, paste it to you; only then fix it.
   - **Bài 5** — commit with Git, then practice checking out the first vs latest commit.
   - **Bài 5.1** — create a **Private** GitHub repo. **Bài 5.2** — push to it.
   - **Bài 6** — deploy to **Vercel**.
   - **Bài 7** — the page shows the hardcoded API key in a red "exposed" alert; move it out of `config.js` into a `.env` file so `config.js` no longer holds the real secret. When it's no longer hardcoded, the alert flips to green automatically.
4. For each task: explain what to do, make the edit only when asked, then point out that the panel ticks green.
5. Pause and ask the learner whenever you need a permission, a password, or a browser sign-in.

## How the "Lộ trình" panel detects completion (so you can verify your own work)
`guide.js` auto-checks the live page. Make sure your edits actually satisfy these:
- **Rename** ✓ when the brand text (`#brandName`) equals **"Apero"** (case-insensitive).
- **Headline** ✓ when `#headline` text differs from the default sample sentence.
- **Color** ✓ when the primary button's background color is in the **purple hue range** (≈ 250–330°). Easiest: change `--brand` in `styles.css`, which recolors the buttons.
- **Logo** ✓ when `#logo`'s `src` no longer contains "logo-placeholder" **and** the image actually loads.
- **Fix bug** ✓ when `#visitCount` shows a real number (define the missing function in `app.js`; the learner must reload to see it).
- **Deploy** ✓ only when the page is opened on a `*.vercel.app` URL.
- **.env (Bài 7)** ✓ automatically when `API_KEY` is no longer a hardcoded `sk-…` secret in `config.js` (i.e. the literal key is gone — moved to `.env` and `config.js` reads it from the environment / no longer contains it). The on-page alert turns from red to green at the same time. The learner must reload after editing `config.js`.
- **Commit / Push / Create-repo (Bài 5, 5.1, 5.2)** are manual — the learner ticks them; you just guide & confirm.

> Don't edit `guide.js` or `i18n.js`. Keep the brand text exactly "Apero", recolor via `--brand`, make sure new images load, and for Bài 7 make sure `config.js` no longer contains the literal `sk-…` key — otherwise the panel won't tick green.

> Keep changes minimal and targeted — edit only the relevant lines, explain in plain Vietnamese, and let the learner see each result before moving on.
