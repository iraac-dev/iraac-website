# IRAAC Website

A working draft of the public website for IRAAC. This repository is the public
front door and the planning source for the future private listening platform.
It must never contain production contact lists, survey responses or secrets.

The current website is a plain static HTML/CSS/JS site that deploys directly
to Vercel. The consent, survey, campaign, calling, reporting and staff-control
system described in the roadmap will be built in a separate private repository.

Each of the eleven pages is self-contained. Styles and scripts are inlined so
the public site remains simple to deploy.

## Start here

- [`PRODUCTION_LAUNCH_PLAN.md`](PRODUCTION_LAUNCH_PLAN.md) is the concise,
  ready-to-run critical path, user sign-up list and agent work register.
- [`ROADMAP.md`](ROADMAP.md) is the canonical product, governance, consent,
  architecture and compliance specification.

## Editing

`build.py` is intended to generate the eleven pages from shared templates.
Reconcile its output against the current production HTML before accepting a
sitewide regeneration.

```
python3 build.py
```

Editing one `.html` file works for a small change. Shared elements are repeated,
so check whether the same change belongs in `build.py` and all pages.

## Current boundary

Have Your Say remains a non-collecting IRAAC-owned holding page until P1 in the
production launch plan passes its human, governance, security, accessibility
and operational gates. Do not represent prototype forms, campaigns or calling
flows as live.
