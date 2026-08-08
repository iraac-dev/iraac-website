# IRAAC Website Roadmap

Last updated: 2026-08-08.

This repository is now the live public Next.js app for IRAAC. It serves the
public website, the visual 1800 Mob Link prototype and the visual staff admin
prototype from one Vercel project on `https://www.iraac-aco.com`.

For the deeper governed platform plan, also read:

- `../iraac-platform/ROADMAP.md`
- `../iraac-platform/docs/release/CODEX_CONTINUE_SUPERPROMPT.md`
- `../iraac-platform/docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md`

For Claude CLI / DeepSeek continuation from this repo, read:

- `docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md`

## 1. Current Live State

The app is a single Next.js App Router application.

Live routes:

- `/` - public IRAAC website homepage.
- `/about/` - public content page.
- `/programs/` - public programs page.
- `/insights/` - public insights page.
- `/governance/` - public governance page.
- `/support/` - public support page.
- `/news/` - public news page.
- `/contact/` - public contact page.
- `/offices/` - public offices/drop-in page.
- `/book-a-call/` - public book-a-call pathway page.
- `/survey/` - public Have Your Say holding/prototype page.
- `/enhanced-bail-article/` - public article page.
- `/app/` - visual 1800 Mob Link prototype.
- `/admin/` - visual staff admin dashboard prototype.

Verified route behavior:

- The top-right public `Login` button links to `/app/`.
- Clicking `Login` on the live domain lands at
  `https://www.iraac-aco.com/app/`.
- The footer `Admin` link links to `/admin/`.
- Clicking footer `Admin` on the live domain lands at
  `https://www.iraac-aco.com/admin/`.

This is a routing and visual-prototype milestone. It is not yet a production
auth, service-directory, referral, staff workflow, survey, contact or reporting
system.

## 2. Non-Negotiable Boundaries

Do not import real contact lists.

Do not collect production survey answers.

Do not send real email, SMS or calls.

Do not publish reports.

Do not expose staff contact details, staff review group details, secrets, API
keys, Vercel tokens, Supabase service-role keys, call transcripts or case
notes.

Do not use shared passwords, static PINs or client-side-only protection for
admin.

Do not imply 1800 Mob Link replaces 000, 13YARN, crisis, legal, health,
counselling or housing services.

Use synthetic data unless Rhys explicitly authorizes a real-data operation in
the correct production environment.

## 3. Mission And Product Direction

IRAAC is building one connected digital presence:

- a public website that explains IRAAC, programs, governance and pathways;
- a location-based Aboriginal Service Connector under the 1800 Mob Link
  concept;
- a staff admin dashboard for governed account creation, service-directory
  review, referral follow-up and reporting;
- a governed listening loop for Have Your Say, de-identified reporting and
  Aboriginal-led feedback to government.

The public promise remains:

**You share -> We listen -> We recommend to government -> We report back.**

MobLink adds a direct-service loop:

**location -> service discovery -> referral -> check-in -> outcome -> referral
improvement -> reporting.**

## 4. Technical Stack

Current app:

- Next.js App Router.
- React.
- TypeScript.
- Vercel production deployment.
- Same-domain routes for public site, MobLink and admin.

Target production stack:

- Supabase Auth for community and staff login.
- Supabase Postgres as the system of record.
- Supabase Row Level Security on all sensitive tables.
- Supabase PostGIS for service location and distance queries.
- MapLibre GL JS for the interactive map UI.
- Server-side geocoding provider adapters.
- Playwright for browser route and rendering checks.

Map/location decision:

- Store IRAAC service-directory locations in Supabase PostGIS.
- Query nearby services in the database.
- Render results with MapLibre GL JS.
- Keep manual location search working without browser geolocation.
- Ask for browser location only after a clear user action and plain-language
  explanation.
- Add Nominatim, Mapbox Search or Google Places only through a server-side
  adapter with cost controls, provider attribution and privacy review.
- Never let a map provider become the source of truth for Aboriginal service
  eligibility, referral status, follow-up outcomes or reporting.

Research references:

- MapLibre GL JS: `https://maplibre.org/maplibre-gl-js/docs/`
- Supabase PostGIS:
  `https://supabase.com/docs/guides/database/extensions/postgis`
- MapLibre Geocoder: `https://maplibre.org/maplibre-gl-geocoder/`
- Google Places billing:
  `https://developers.google.com/maps/documentation/places/web-service/usage-and-billing`
- Mapbox pricing: `https://www.mapbox.com/pricing`

## 5. Repository Shape

Current key files:

```text
app/
  layout.tsx
  page.tsx
  SiteShell.tsx
  data.ts
  globals.css
  [slug]/page.tsx
  app/page.tsx
  admin/page.tsx
docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md
next.config.ts
next-env.d.ts
package.json
tsconfig.json
vercel.json
```

Do not reintroduce Astro. The old Astro source has been removed from the active
app.

## 6. Public Website Requirements

Keep the public site compact, readable and easy to navigate on desktop and
mobile.

Header:

- Wordmark `IRAAC.`
- Public nav links.
- More dropdown.
- Top-right `Login` linking to `/app/`.

Footer:

- Acknowledgement of Country.
- Public navigation.
- `Admin` link to `/admin/`, footer only.

Front-door pathways must remain distinct:

- Book a Call.
- Visit a Local Office / Drop In.
- Request a Home Visit.
- Complete a Survey / Have Your Say.

Do not merge service navigation, survey feedback and emergency help into one
confusing action.

## 7. `/app/` MobLink Production Roadmap

Current state: visual prototype only.

Production target:

1. Login-first community app.
2. Google, phone OTP and email sign-in.
3. Safe crisis guidance visible before ordinary service content.
4. Quick Exit.
5. Manual location search.
6. Optional browser geolocation.
7. Service list by distance/category/eligibility.
8. Map view.
9. Service detail page.
10. Connect/request-help flow.
11. Consented follow-up.
12. Connected services page.
13. Profile and safe-contact preferences.
14. Setup-link flow for staff-created accounts.

## 8. `/admin/` Production Roadmap

Current state: visual prototype only.

Production target:

1. Staff login.
2. Named staff accounts.
3. Staff membership checks.
4. MFA requirement before production.
5. Access denied for non-staff users.
6. Audit log for all staff actions.
7. Operator queue.
8. Referral follow-up queue.
9. Service directory review.
10. Create MobLink Account.
11. User management.
12. Reporting dashboard.
13. Publication approval workflow.

The first functional admin tool should be Create MobLink Account:

1. Staff enters phone/email.
2. Server verifies staff access.
3. Server creates or finds Supabase Auth user.
4. Server writes a user profile.
5. Server creates a one-time setup token.
6. Server returns `/app/setup?token=...`.
7. No real SMS is sent until a later approved provider pass.

## 9. Database Roadmap

Target tables:

- `user_profiles`
- `staff_profiles`
- `staff_memberships`
- `services`
- `service_locations`
- `service_categories`
- `service_eligibility_tags`
- `user_connected_services`
- `service_connection_requests`
- `referrals`
- `referral_events`
- `setup_tokens`
- `audit_events`
- `report_snapshots`

Required controls:

- Append-only migrations.
- RLS enabled before production.
- Service-role key server-side only.
- Synthetic seed data until real data is approved.
- Safe audit logging without exposing sensitive notes.
- Backup, restore, incident, offboarding and key-rotation runbooks before
  production use.

## 10. Build Order

1. Keep the current Next.js route contract stable.
2. Add browser tests for Login -> `/app/` and Admin -> `/admin/`.
3. Add Supabase client/server helpers.
4. Add `.env.local.example` with names only, no secrets.
5. Add Supabase Auth callback.
6. Make `/app/` login-first.
7. Make `/admin/` staff-only.
8. Add staff tables and audit events.
9. Enable PostGIS.
10. Add service directory tables.
11. Add nearby service search function.
12. Add service search API.
13. Build authenticated service list.
14. Build MapLibre map view.
15. Build geocoder adapter.
16. Build service detail page.
17. Build connection/referral flow.
18. Build staff referral queue.
19. Build staff account creation.
20. Build reporting snapshots and small-cell suppression.
21. Add runbooks.
22. Add tests.
23. Deploy preview.
24. Verify preview desktop and mobile.
25. Deploy production.
26. Verify production desktop and mobile.

## 11. Release Gates

Do not call the platform production-ready until:

- `npm run build` passes.
- Browser route tests pass.
- Login routes to `/app/`.
- Admin routes to `/admin/`.
- `/app/` is login-first.
- `/admin/` is staff-only.
- Service search reads from Supabase, not hardcoded UI data.
- Map renders on desktop and mobile.
- Referrals are user-scoped and consented.
- Staff account creation is server-side and audited.
- RLS tests pass.
- No secrets are in git or browser bundles.
- Backup/restore/offboarding/incident/key-rotation runbooks exist.
- Privacy, cultural governance and human approval gates are recorded.

## 12. Handoff To Claude CLI

Claude CLI should start with:

```bash
cd /Users/rhys/Downloads/Projects/IRAAC/iraac-website-live
git status
npm install
npm run build
```

Then read:

1. `README.md`
2. `ROADMAP.md`
3. `docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md`
4. `../iraac-platform/ROADMAP.md`
5. `../iraac-platform/docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md`

Claude CLI should not make architecture decisions from scratch. Follow the
stack and build sequence above unless Rhys explicitly changes direction.
