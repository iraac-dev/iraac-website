# IRAAC Website

A working draft of a public website for IRAAC, covering the organisation, its programs (MCC, YouthScape, The Crew, DARC), governance and reporting, MCC support for other Aboriginal Community Organisations, news and contact details.

This is a plain static public site (HTML/CSS/JS) that deploys directly on
Vercel. It is the public front door for IRAAC; the consent, survey, campaign,
calling, reporting and staff-control system described in the roadmap will live
in a separate private application.

The repository has eleven self-contained HTML pages. Styles and scripts are
inlined so the public site remains simple to deploy.

## Project planning

- [`ROADMAP.md`](ROADMAP.md) is the canonical product, governance, consent,
  architecture and delivery roadmap.
- [`AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md`](AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md)
  compares platforms, Australian constraints, costs and the recommended
  hybrid architecture.
- [`HERMES_DEEPSEEK_BUILD_SUPERPROMPT.md`](HERMES_DEEPSEEK_BUILD_SUPERPROMPT.md)
  is the execution brief for the Hermes desktop app and collaborating bots.
- This repository is public. Never commit contact lists, survey responses,
  consent evidence, provider credentials, operational scripts or other private
  data here.

## Editing

`build.py` is intended to generate all eleven pages from shared templates
(nav, footer, styling), but it currently needs reconciliation with the
production HTML before it is safe for sitewide regeneration. Until the
roadmap's Phase -1 work is complete, preview its output in a temporary branch
or worktree and review the full diff before accepting generated changes.

```
python3 build.py
```

Editing an individual `.html` file directly works for small fixes. Shared
elements are duplicated across all eleven pages, so review whether the same
change belongs in `build.py`.

## Current boundary

The public pages contain working content plus prototype pathways. The external
Google Form is the current live survey destination; the in-repository survey
demo does not store production responses. Do not represent any form, contact
flow, report or call-centre capability as production-ready until its roadmap
release gate has passed.
