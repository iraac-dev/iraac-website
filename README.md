# IRAAC Website

A working draft of a public website for IRAAC, covering the organisation, its programs (MCC, YouthScape, The Crew, DARC), governance and reporting, MCC support for other Aboriginal Community Organisations, news and contact details.

This is a plain static public site (HTML/CSS/JS) that deploys directly on
Vercel. It is the public front door for IRAAC; the consent, survey, campaign,
calling, reporting and staff-control system described in the roadmap will live
in a separate private application.

The repository has eleven self-contained HTML pages. Styles and scripts are
inlined so the public site remains simple to deploy.

## Planned listening platform

The roadmap now defines two pathways feeding one canonical Have Your Say
survey and reporting system:

- approved Aboriginal-business outreach: value newsletter/report email,
  rotating survey-chase selection, second value brief and a separately
  policy-eligible AI survey call; and
- direct citizen/community participation: web, QR, worker, drop-in, home visit
  or phone survey, followed by separately consented email, SMS and AI-call
  contact for the rotating sample.

The monthly newsletter targets 100% of the currently eligible, deduplicated
Path 1 and Path 2 email audience. That full audience is separate from the
roughly 30% monthly survey-chase samples. The shared private backend, stable survey system,
campaign engine, admin dashboard and report publisher are planned, not present
in this static repository.

The selected survey stack is Next.js and TypeScript, SurveyJS Form Library for
the mobile/web presentation, an IRAAC-owned deterministic survey contract and
Supabase Postgres in Sydney. Have Your Say remains one stable instrument with
rare reviewed successor releases. Monthly reporting topics do not rewrite it.

The public **Insights** section is planned to become **Reports**, containing
only approved community reports with stable index and detail pages. Staff,
partner and government reports remain private in the future admin dashboard.
When that authenticated dashboard is live, the public footer will add an
**Admin** link beneath **Contact Us**. The link will open an invite-only login;
no shared password or private dashboard data will be stored in this static
public repository.

Every newsletter and report email will invite recipients to reply with an
issue or survey question they believe IRAAC has missed. The stable survey ends
with the same optional prompt. Suggestions enter a human-reviewed queue and
may inform a future report, investigation or governed survey release; they do
not automatically rewrite the live questionnaire.

Every planned community, government and staff/partner report distribution also
includes clear no-login contact controls: unsubscribe from that email series,
stop calls from IRAAC and manage all non-essential contact preferences. A
verbal request to stop during a future human or AI call ends the call and adds
the phone endpoint to IRAAC's internal do-not-call list. That is deliberately
separate from Australia's statutory Do Not Call Register; IRAAC must never
claim it registered the number nationally. These controls are roadmap
requirements and are not yet live in this static repository.

## Project planning

- [`ROADMAP.md`](ROADMAP.md) is the canonical product, governance, consent,
  architecture and delivery roadmap.
- [`AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md`](AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md)
  compares platforms, Australian constraints, costs and the recommended
  hybrid architecture.
- [`HERMES_DEEPSEEK_BUILD_SUPERPROMPT.md`](HERMES_DEEPSEEK_BUILD_SUPERPROMPT.md)
  is the execution brief for the Hermes desktop app and collaborating bots.
- [`docs/survey/IRAAC_SURVEY_PLATFORM_DECISION.md`](docs/survey/IRAAC_SURVEY_PLATFORM_DECISION.md)
  records the platform comparison and selected stack.
- [`docs/survey/IRAAC_HAVE_YOUR_SAY_V1_DRAFT.md`](docs/survey/IRAAC_HAVE_YOUR_SAY_V1_DRAFT.md)
  contains the complete stable V1 survey draft for human approval.
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
