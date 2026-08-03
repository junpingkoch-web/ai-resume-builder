# AI Resume Builder

A free, static (no build step) trilingual resume generator. Fill in your
personal info, work experience, education, skills and languages once, and
generate a Chinese / English / German version of the resume from the same
data — preview, print to PDF, or download as plain text. Trilingual UI:
中文 (default) / English / Deutsch.

No AI API is called and no data leaves the browser — everything runs
client-side and is only kept in `localStorage` as an autosaved draft.

## How the "AI" generation works

This is template-based, not a live AI API call:

- Structured fields (job title, degree, action verbs, skills, spoken
  languages/levels) can be picked from a built-in trilingual phrase bank
  (`phrasebank.js`) — selecting one instantly fills the Chinese, English and
  German wording.
- Free-text fields (summary, job description bullets) still need to be
  written once per language, since there's no real translation happening —
  each language box has a "copy to other languages →" shortcut to duplicate
  text across languages as a starting point before you adjust the wording.
- A summary-template picker drafts a trilingual profile summary from your
  headline + first two skills, which you can then edit freely.

## Run locally

Just open `index.html` in a browser, or serve the folder with any static
server, e.g.:

```
npx serve .
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages,
S3, etc.) — upload the folder as-is.

Before going live:

1. ✅ Real AdSense publisher ID (`ca-pub-4830421367394194`) is already wired in
   `index.html` and `ads.txt`.
2. Add your AdSense `<ins>` snippet inside the two `.ad-slot`
   placeholders in `index.html` (marked with comment blocks).
3. Update the `buymeacoffee.com` link in `index.html` if you want the
   support button to point elsewhere.

## Structure

- `index.html` — page markup, SEO meta tags, ad slot placeholders, help
  modal.
- `style.css` — styling (dark/light auto, responsive, plus print styles
  for the resume preview).
- `phrasebank.js` — the trilingual preset data (`window.RESUME_PHRASEBANK`):
  action verbs, job titles, degrees, skills, languages/levels, summary
  templates.
- `script.js` — zh/en/de interface dictionary, form rendering and state
  management, resume assembly + locale-aware date formatting, print/copy/
  download, localStorage draft autosave.
