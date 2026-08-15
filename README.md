# MobLink website and service connector

MobLink is a working Next.js prototype for connecting Aboriginal and Torres
Strait Islander people with suitable local and national services. It is a fork
of the earlier IRAAC website work; IRAAC can now participate as one provider in
the broader MobLink network rather than being the product brand.

## Product surfaces

- `/` explains the MobLink customer and provider model.
- `/app/` is the mobile-first community service directory.
- `/app/search/` and `/app/map/` support service discovery.
- `/app/connected/` keeps referrals and provider conversations together.
- `/admin/` is a MobLink-wide network demo, not a tenant-isolated supplier account.
- `/admin/call-centre/` demonstrates hotline intake, need detection, location
  matching, consent confirmation, and lead creation.
- `/admin/referrals/` is the supplier lead inbox with connected chat.
- `/admin/funding/` is a bounded AI-assisted funding workspace.

## Run locally

```bash
npm install
npm test
npm run dev
```

For a production build:

```bash
npm run build
```

## Current boundary

This repository currently proves the end-to-end user experience with synthetic
service and lead data stored in the browser. Use fictional details only. It does
not yet place or answer phone calls, send SMS messages, authenticate providers,
isolate one provider's leads from another, or persist production referrals. The
UI labels these limits wherever a person could otherwise mistake the prototype
for a live service. Production builds fail closed on the admin routes until
Supabase authentication is configured.

Production work must connect Supabase Auth, tenant-scoped RLS, audited consent,
provider onboarding, verified directory data, notification delivery, and a
human-operated escalation path before real personal information is accepted.
Do not add secrets, real contact lists, caller records, or survey responses to
this public repository.

## Repository family

- `moblink-dev/moblink-website`: public site, community app, supplier prototype.
- `moblink-dev/moblink-platform`: governed survey, consent, reporting, and audit
  foundation inherited from IRAAC.
- `moblink-dev/indigenous-business-insights`: outreach and future call-centre
  research workspace.

Vercel has not yet been confirmed for this fork. A successful GitHub push or
local build is not proof of a live MobLink deployment; verify the exact commit,
deployment, domain alias, and rendered routes after connecting the project.
