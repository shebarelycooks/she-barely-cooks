# She Barely Cooks — Static Site Starter

A multi‑page brand site designed for GitHub Pages (or Netlify/Vercel). No backend required. Edit JSON in `/data` to update tasks, tiers, and leaderboard.

## Pages
- `index.html` — Home
- `rules.html` — Kitchen rules & boundaries
- `tributes.html` — Tiered tributes (renders from `/data/tiers.json`)
- `tasks.html` — Weekly tasks (renders from `/data/tasks.json`)
- `leaderboard.html` — Public praise board (renders from `/data/leaderboard.json`)
- `notes.html` — Blog stub
- `faq.html`, `consent.html`, `contact.html`, `privacy.html`, `404.html`

## Customize
- Update copy across HTML files.
- Change colors in `assets/css/style.css`.
- Edit data in `/data/*.json` — the pages re-render automatically.

## Deploy (GitHub Pages)
1. Create a repo (e.g., `she-barely-cooks`).
2. Upload these files to the repository root (or push via Git).
3. In repo Settings → Pages → set Source to `main` and `/root`.
4. Your site will be live at `https://<your-username>.github.io/she-barely-cooks/`.

## Tips
- Replace `https://your-platform-link` in data with real tribute links.
- Add a custom domain later if you like.
- For forms/newsletter, use a third-party (e.g., Buttondown/Mailchimp) and link to it.
- Advanced: Move to Netlify and enable Forms or serverless functions for dynamic features.