# IRAAC Website

A working draft of a public website for IRAAC, covering the organisation, its programs (MCC, YouthScape, The Crew, DARC), governance and reporting, MCC support for other Aboriginal Community Organisations, news and contact details.

This is a plain static site (HTML/CSS/JS, no build step) so it's easy to edit and deploys directly on Vercel with zero configuration.

Each page (`index.html`, `about.html`, etc.) is fully self-contained — styles and scripts are inlined in a `<style>`/`<script>` block at the top of each file, so there's nothing to upload but the seven `.html` files. This was done deliberately to make the site a single flat folder that's simple to drag-and-drop into GitHub or Vercel.

## Editing

`build.py` is the source of truth used to generate all seven pages from shared templates (nav, footer, styling). To make sitewide changes, edit `build.py` and re-run:

```
python3 build.py
```

Editing an individual `.html` file directly also works fine for small tweaks — just note that shared elements (nav, footer, styling) are duplicated across all seven files, so a sitewide change made by hand needs to be repeated in each file.

## Still to do

Sections marked with a highlighted note box (e.g. on the About, Programs and Governance pages) are placeholders — replace them with real content: Board Member names and photos, program outcomes, links to public reports, and real contact details.
Last updated: 2026-07-31 11:24 UTC — project analysis complete, both sites live on custom domains.

GitHub push test completed: 2026-08-01.
