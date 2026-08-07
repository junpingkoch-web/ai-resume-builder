---
description: Add a new selectable visual resume template (alongside Classic/Modern/Minimal/Sidebar/Banner)
argument-hint: [template name and visual concept]
---

Add a new resume template: $ARGUMENTS

Follow the data-model rules in `.claude/rules/resume-data-model.md`: `state.generated` stores structured data, not pre-rendered HTML, so the new template must render from that structured data via `buildResumeBlocks`-style named blocks, not by duplicating the generation logic.

Decide whether it needs a flat single-column layout (like Classic/Modern/Minimal/Banner) or a multi-column layout (like Sidebar's `.r-main`/`.r-sidebar` split), and follow the matching existing pattern in `script.js`.

After implementing: bump the `?v=N` cache-busting query string on `script.js` in `index.html` (see the rules file — this is easy to forget and browsers cache these files aggressively).
