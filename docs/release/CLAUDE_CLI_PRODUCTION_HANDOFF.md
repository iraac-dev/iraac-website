# Claude CLI Production Handoff: IRAAC Next.js, MobLink and Admin

Audience: Claude Command Line Interface powered by DeepSeek V4 Flash.

Date: 2026-08-08.

Repository: `iraac-website-live`.

Live domain: `https://www.iraac-aco.com`.

## 1. Current Ground Truth

The public IRAAC site has been rewritten as a single Next.js App Router
application. The old Astro source has been removed from the active app. The
live production deployment is already serving:

- `/` for the public website.
- `/app/` for the visual 1800 Mob Link prototype.
- `/admin/` for the visual staff admin dashboard prototype.
- static public content routes such as `/programs/`, `/insights/`,
  `/governance/`, `/survey/`, `/offices/` and `/book-a-call/`.

The top-right public `Login` button must keep linking to `/app/`.

The footer `Admin` link must keep linking to `/admin/`.

Auth is not production-ready yet. `/app/` and `/admin/` are visual routing
prototypes only until Supabase Auth, staff roles, row-level security, audit
logging and service-directory data are implemented.

## 2. Non-Negotiable Boundaries

Do not import real contacts, send real email, send SMS, make calls, publish
reports, collect production survey answers or expose staff contact details.

Do not use shared admin passwords, static PINs or client-side-only protection.

Do not expose Supabase service-role keys, Vercel tokens, API keys, private
staff group addresses, call transcripts or case notes.

Do not imply 1800 Mob Link replaces 000, 13YARN, legal, medical, housing,
counselling or crisis services.

Use synthetic data until Rhys explicitly authorizes a real production data
operation in the correct environment.

## 3. Technical Stack Decision

Use this stack unless a later architecture decision replaces it:

- Next.js App Router with TypeScript.
- React server components by default.
- Client components only for interactive controls, auth widgets, maps and
  mobile app gestures.
- Supabase Auth for community and staff identity.
- Supabase Postgres as the system of record.
- Supabase Row Level Security on every table containing user, staff, contact,
  consent, referral, service or report data.
- Supabase PostGIS for location storage and distance queries.
- MapLibre GL JS for the browser map UI.
- A tile provider behind configuration, starting with a low-cost/open-friendly
  provider and keeping Mapbox/Google as swappable adapters.
- Server-side geocoding/search adapter so paid provider keys never reach the
  browser except where a provider explicitly requires a restricted public key.
- Vercel for production deployment.
- Playwright for route and browser regression checks.

Why this map choice:

- MapLibre GL JS is a TypeScript/WebGL browser map library controlled by style
  documents, which fits a custom community-service map UI without forcing the
  whole product into one paid mapping platform:
  `https://maplibre.org/maplibre-gl-js/docs/`.
- Supabase documents PostGIS as the way to store and query geographic data in
  Postgres, including sorting by location and querying within boundaries:
  `https://supabase.com/docs/guides/database/extensions/postgis`.
- MapLibre has a geocoder control, but geocoding itself should go through a
  server adapter so we can swap Nominatim, Mapbox Search, Google Places or a
  government/place dataset later:
  `https://maplibre.org/maplibre-gl-geocoder/`.
- Google Places is powerful but pay-as-you-go by SKU; use it only when its
  place quality is worth the cost:
  `https://developers.google.com/maps/documentation/places/web-service/usage-and-billing`.
- Mapbox has clear free tiers for map loads/search but still introduces vendor
  billing and token management; treat it as an adapter, not the core data
  model: `https://www.mapbox.com/pricing`.

The important rule: IRAAC's service directory and referral state live in
Supabase. The map provider only renders tiles and optionally assists with
search/geocoding. Do not let an external places API become the source of truth
for Aboriginal service availability, consent, referral outcomes or reporting.

## 4. Required Repository Shape

Current Next app files:

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
next.config.ts
next-env.d.ts
package.json
tsconfig.json
vercel.json
```

Move toward this production shape:

```text
app/
  layout.tsx
  page.tsx
  (public)/
  app/
    layout.tsx
    page.tsx
    search/page.tsx
    map/page.tsx
    service/[id]/page.tsx
    connected/page.tsx
    profile/page.tsx
    setup/page.tsx
  admin/
    layout.tsx
    page.tsx
    login/page.tsx
    services/page.tsx
    referrals/page.tsx
    accounts/page.tsx
    reports/page.tsx
    audit/page.tsx
  api/
    auth/callback/route.ts
    app/services/search/route.ts
    app/referrals/route.ts
    admin/create-account/route.ts
    admin/services/route.ts
components/
  public/
  app/
  admin/
lib/
  supabase/
  auth/
  geo/
  services/
  consent/
  audit/
supabase/
  migrations/
tests/
  e2e/
```

## 5. Build Path For Claude CLI

Follow these steps in order. Do not skip verification gates.

### Phase 0: Stabilize The Current Next App

1. Run `git status`.
2. Confirm branch name and remote.
3. Run `npm install`.
4. Run `npm run build`.
5. Open `/`, `/app/`, `/admin/`, `/programs/`, `/insights/` locally.
6. Confirm `Login` href is `/app/`.
7. Confirm footer `Admin` href is `/admin/`.
8. Confirm public `.html` redirects still work through `vercel.json`.
9. Add Playwright tests for the exact click paths.
10. Do not change visual design until these tests pass.

### Phase 1: Supabase Project Wiring

11. Create `.env.local.example` with names only, no secrets.
12. Add `NEXT_PUBLIC_SUPABASE_URL`.
13. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
14. Add server-only `SUPABASE_SERVICE_ROLE_KEY` only to local/hosting secrets,
    never to git.
15. Install Supabase SSR/client helpers.
16. Create `lib/supabase/client.ts`.
17. Create `lib/supabase/server.ts`.
18. Create `lib/supabase/admin.ts` for server-only service-role actions.
19. Add a runtime guard that throws if service-role code imports in the
    browser.
20. Document required Vercel environment variables.

### Phase 2: Auth Route Contracts

21. `/app/` must be login-first.
22. Unauthenticated `/app/` shows only the MobLink sign-in screen.
23. Authenticated `/app/` shows the MobLink home screen.
24. Add Google OAuth.
25. Add phone OTP.
26. Add email magic link or password login.
27. Add `/api/auth/callback`.
28. Add logout.
29. Add session refresh.
30. Add tests for unauthenticated and authenticated state.

### Phase 3: Staff Admin Protection

31. `/admin/` must be protected.
32. Unauthenticated `/admin/` redirects or renders staff login.
33. Non-staff authenticated users must see access denied.
34. Staff access must be based on named user identity and staff membership.
35. Add `staff_profiles`.
36. Add `staff_memberships`.
37. Add staff status fields: `active`, `role`, `created_at`, `disabled_at`.
38. Add MFA/AAL requirement before production.
39. Add audit events for login, access denied, account creation and role
    changes.
40. Add Playwright tests for visitor, community user and staff user.

### Phase 4: Service Directory Data Model

41. Enable PostGIS in Supabase.
42. Create `services`.
43. Create `service_locations`.
44. Store point geometry/geography for each location.
45. Store plain address fields separately from coordinates.
46. Add service categories.
47. Add eligibility tags.
48. Add opening hours.
49. Add contact methods.
50. Add national/remote service flag.
51. Add Aboriginal-led/Aboriginal-specific flags only when verified.
52. Add `service_status` values: `draft`, `review`, `published`, `inactive`.
53. Add source/provenance fields.
54. Add review cadence fields.
55. Add RLS so public/community users read published records only.
56. Add staff-only writes.
57. Add seed data using synthetic or explicitly approved public information.
58. Add tests for RLS and search functions.

### Phase 5: Location Search

59. Create `lib/geo/types.ts`.
60. Create `lib/geo/search.ts`.
61. Create SQL function `nearby_services(lat, lng, radius_m, categories)`.
62. Use PostGIS distance ordering.
63. Filter by published service status.
64. Filter by user-visible eligibility.
65. Return distance, service summary and primary location.
66. Do not expose hidden staff notes.
67. Add `/api/app/services/search`.
68. Validate latitude/longitude ranges.
69. Apply rate limits.
70. Log only safe aggregate telemetry.
71. Add fallback default location selection.
72. Add browser geolocation prompt only after user action.
73. Explain location use in plain language before requesting permission.
74. Add manual suburb/postcode search.
75. Add map bounding-box search.

### Phase 6: Map UI

76. Install `maplibre-gl`.
77. Load MapLibre CSS only in the client map component.
78. Create `components/app/ServiceMap.tsx`.
79. Keep the map component client-only.
80. Use dynamic import if needed to avoid server-side WebGL errors.
81. Add markers for returned services.
82. Add selected-service popup or sheet.
83. Add list/map synchronized selection.
84. Add category filters.
85. Add "Use my location".
86. Add "Search this map area".
87. Add loading, empty and error states.
88. Add a safe crisis support strip outside the map.
89. Add mobile bottom sheet for selected service.
90. Add desktop split view with list and map.
91. Add keyboard-accessible list alternatives for every marker.
92. Test iPhone-sized and desktop viewports.

### Phase 7: Geocoding Adapter

93. Create `lib/geo/geocoder.ts`.
94. Define interface: `searchPlaces(query, bias, limit)`.
95. Define interface: `reverseGeocode(lat, lng)`.
96. Implement a development adapter with static NSW demo places.
97. Implement Nominatim only if its usage policy fits the production volume.
98. Implement Mapbox Search adapter only behind server env vars.
99. Implement Google Places adapter only behind server env vars.
100. Never hard-code provider tokens in client code.
101. Cache low-risk suburb/postcode results.
102. Do not cache sensitive user-specific searches without a privacy decision.
103. Add provider attribution where required.
104. Add provider failover behavior.
105. Add cost-control logging by provider, endpoint and month.

### Phase 8: Referral And Connection Flow

106. Create `referrals`.
107. Create `referral_events`.
108. Create `service_connection_requests`.
109. Allow user to request help from a service card.
110. Ask explicit consent before IRAAC follows up.
111. Record selected service, need category and free-text request.
112. Do not collect more sensitive data than needed.
113. Add status: `requested`, `triage`, `referred`, `follow_up_due`,
    `resolved`, `could_not_connect`, `escalated`, `withdrawn`.
114. Add staff triage queue in `/admin/referrals`.
115. Add user-visible "Connected" page.
116. Add audit events for all staff changes.
117. Add tests for user ownership and staff permissions.

### Phase 9: Staff Account Creation

118. Build `/admin/accounts`.
119. Staff can invite/create a MobLink user only with the correct role.
120. Generate one-time setup links server-side.
121. Never display reusable passwords.
122. Expire setup links.
123. Store token hashes, not raw tokens.
124. Add revoke action.
125. Add audit events.
126. Add Playwright happy path using fake email/phone.

### Phase 10: Reporting

127. Create de-identified aggregate views.
128. Add small-cell suppression.
129. Separate internal staff report data from public reports.
130. Track referral outcomes by area/category/service type.
131. Do not expose individual case notes in reports.
132. Add monthly snapshot tables.
133. Add draft report generation only after deterministic stats exist.
134. Require named approval before publication.
135. Record approval in audit ledger.

### Phase 11: Production Hardening

136. Add strict security headers.
137. Add CSP that permits chosen map/tile provider.
138. Add rate limits on auth, search, account creation and referral endpoints.
139. Add bot protection where appropriate.
140. Add server logging that redacts PII.
141. Add backup/restore runbook.
142. Add incident response runbook.
143. Add staff offboarding runbook.
144. Add key rotation runbook.
145. Add Vercel preview/production environment separation.
146. Add protected branch and required checks.

### Phase 12: Release Verification

147. `npm run build` must pass.
148. Unit tests must pass.
149. RLS tests must pass.
150. Playwright public route tests must pass.
151. Playwright Login-to-`/app/` test must pass.
152. Playwright Admin-to-`/admin/` test must pass.
153. Mobile screenshots must be inspected.
154. Admin access-denied test must pass.
155. Staff access test must pass.
156. Service search around Nowra must return expected seeded records.
157. Map markers must render, not a blank canvas.
158. Referral creation must write only for the signed-in user.
159. Audit records must be created for staff actions.
160. No secrets must appear in repo, logs or browser bundle.

## 6. Detailed Implementation Notes

Use server-first rendering for public pages. Keep the public site fast, compact
and stable.

Keep `/app/` visually mobile-first. A community member should immediately see:

1. Where the app thinks they are.
2. Crisis support routes.
3. Recommended nearby services.
4. Search and map controls.
5. A clear action to request help or connect.

Keep `/admin/` dense and operational. Staff should immediately see:

1. Operator queue.
2. Referrals needing action.
3. Create account.
4. Service directory review.
5. Reporting status.
6. Audit trail.

Every user-facing search result should include:

- service name;
- category;
- distance or "available statewide/nationally";
- location;
- eligibility summary;
- opening/contact state if known;
- data freshness/review state for staff, not necessarily for public users;
- connect/request-help action.

Every referral must answer:

- who requested it;
- what service was requested;
- what consent was given;
- who can act on it;
- what status it is in;
- when follow-up is due;
- what outcome was recorded;
- what data is safe for reports.

## 7. Things To Avoid

Do not reintroduce Astro.

Do not create a second app for MobLink unless Rhys explicitly changes the
architecture.

Do not place the Admin link in the header.

Do not make `/admin/` public just because it is a prototype.

Do not let browser code call privileged Supabase functions.

Do not let the map provider decide which services exist.

Do not make location permission mandatory. Manual search must work.

Do not claim a service is Aboriginal-led unless the source proves it.

Do not claim launch readiness until auth, RLS, audit, consent, backup, restore,
incident, privacy and cultural-governance checks pass.

## 8. Suggested First Commands

```bash
cd /Users/rhys/Downloads/Projects/IRAAC/iraac-website-live
git status
npm install
npm run build
npx playwright --version || true
```

Then create a branch if needed, inspect this file, inspect `ROADMAP.md`, and
continue from Phase 0.

## 9. Definition Of Production Ready

Production-ready means:

- The public site renders under `https://www.iraac-aco.com`.
- Header Login routes to `/app/`.
- Footer Admin routes to `/admin/`.
- `/app/` is login-first and safe for community use.
- `/admin/` is staff-only with named accounts and audited access.
- Service directory data is governed, reviewed and searchable by location.
- Map/list search works without exposing provider secrets.
- Referrals and follow-up are consented and auditable.
- Reports are de-identified and publication-controlled.
- Backups, restores, incident response, offboarding and key rotation are
  documented and tested.
- Browser tests prove the core routes, login states, map rendering and admin
  protection on desktop and mobile.
