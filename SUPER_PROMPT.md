# IRAAC Mob Link — Super Prompt for Claude

## 1. Identity & Context

You are Claude building the 1800 Mob Link platform for IRAAC (Indigenous Rights and Advocacy Centre). This is a single Next.js App Router application serving the public website, Mob Link service directory, and staff admin dashboard.

**Project root:** `/Users/rhys/Downloads/Projects/IRAAC/iraac-website-live/`
**Live URL:** `https://www.iraac-aco.com`
**GitHub:** `https://github.com/iraac-dev/iraac-website` (public)
**Platform repo:** `https://github.com/iraac-dev/iraac-platform` (private — Supabase migrations, admin app)
**Supabase project:** `iraac-supabase` (ref: `xfrhwibtmpjnasbcxdlw`, Sydney region)

## 2. Current Architecture

```
iraac-website-live/          ← YOU ARE HERE
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Public homepage
│   ├── [slug]/page.tsx       # Public content pages (about, programs, etc.)
│   ├── SiteShell.tsx         # Public site shell (header, frontdoor, footer)
│   ├── data.ts               # All content data + 100+ service entries
│   ├── globals.css           # All styles (~3600 lines)
│   ├── admin/
│   │   ├── layout.tsx        # Admin sidebar layout
│   │   ├── page.tsx          # Admin overview dashboard
│   │   ├── referrals/page.tsx # Referral queue with status management
│   │   ├── services/page.tsx  # Service directory management
│   │   └── reports/page.tsx   # Reports with bar charts
│   ├── api/referrals/route.ts # REST API for referrals
│   └── app/                  # Mob Link mobile app section
│       ├── page.tsx          # Home — crisis strip + 5 service rails
│       ├── search/page.tsx   # Search — mini map + browse filters + categories
│       ├── map/page.tsx      # Interactive full map with bottom sheet
│       ├── connected/page.tsx # Connected services (referral tracking)
│       ├── messages/page.tsx  # Messages + Contact Us bot
│       ├── profile/page.tsx   # Profile with settings cog
│       ├── settings/page.tsx  # Preferences and privacy
│       ├── survey/page.tsx    # Interactive Have Your Say survey
│       ├── request-help/[serviceId]/page.tsx  # Help request form
│       └── service/[id]/page.tsx  # Service detail page (SSG, 100+ routes)
├── components/app/
│   ├── BottomNav.tsx         # 5-item bottom nav (Home, Search, Connected, Messages, Profile)
│   ├── CrisisStrip.tsx       # Emergency numbers (000, 13YARN, Lifeline, 1800RESPECT)
│   ├── HelpBot.tsx           # Chat bot with keyword-based service recommendations
│   ├── MiniMap.tsx           # Interactive mini map for search page
│   ├── FullMap.tsx           # Full-screen map with markers for map page
│   ├── ServiceCard.tsx       # Full service card with tags, phone, actions
│   ├── ServiceList.tsx       # Search + category filter + results
│   ├── ServiceMap.tsx        # MapLibre GL JS map component
│   └── SearchBar.tsx         # Quick search input
├── lib/
│   ├── referrals.ts          # Referral data model + localStorage persistence
│   ├── geo/
│   │   ├── types.ts          # PostGIS search result types
│   │   └── search.ts         # Server-side search adapter with Haversine fallback
│   └── supabase/
│       ├── client.ts         # Browser Supabase client
│       ├── server.ts         # SSR Supabase client
│       └── admin.ts          # Service-role client (guarded against browser)
├── supabase/migrations/      # 5 PostGIS migration files
│   ├── 20260808000000_enable_postgis.sql
│   ├── 20260808000001_services_table.sql
│   ├── 20260808000002_referrals_table.sql
│   ├── 20260808000003_staff_profiles.sql
│   └── 20260808000004_search_functions.sql
├── middleware.ts              # Session refresh middleware
├── .env.example               # Required env vars documented
├── next.config.ts             # Next.js config (trailingSlash: true)
├── package.json               # Next.js 16.2.12, React 19, maplibre-gl, @supabase/ssr
└── vercel.json                # Clean URLs + HTML redirects
```

## 3. What's Been Built (Complete)

### Home Page (`/app/`)
- Compact crisis strip at top: 000, 13YARN, Lifeline, 1800RESPECT
- 5 horizontal scrollable service rails: Recommended for You, Newly Added, National Support, Closest to Me, Aboriginal Specific
- Each rail card has gradient image, name, distance, Free/Aboriginal-led badges, category
- Haversine distance calculation from Nowra center point
- 100+ services across Nowra, Wollongong, Ulladulla, Port Kembla, Kiama, Sydney, and national

### Search Page (`/app/search/`)
- Search bar with magnifying glass icon and smart placeholder
- Interactive MiniMap with service markers, clustering, user location (blue pulsing dot)
- Click map → opens full map, click marker → service detail, click cluster → zoom in
- Browse All grid: Local, National, Aboriginal, Free (with counts)
- Top Categories: 15 category chips with service counts

### Map Page (`/app/map/`)
- Full MapLibre GL JS map with 100+ colored markers (color-coded by category)
- Search bar + horizontal category filter chips
- Bottom sheet: tap marker → service details; toggle list view → 30 services with colored dots
- User location with pulsing blue dot
- FAB button to toggle list/sheet
- Mobile-optimized within phone shell

### Service Detail (`/app/service/[id]/`)
- 100+ SSG pages with full service info: name, category, address, phone, hours, description, eligibility, tags, website
- Crisis banner for crisis services
- Nearby services section
- "Request help from this service" button

### Request Help (`/app/request-help/[id]/`)
- Form: name, phone, email, need category, message, consent checkbox
- Creates referral stored in localStorage
- Confirmation with reference number

### Help Bot (`/app/messages/`)
- "Contact us" card opens chat interface
- Bot understands natural language keywords mapped to 11 service categories
- Crisis detection routes to 000/13YARN/Lifeline
- "Talk to a person" escalation
- Service recommendations shown as tappable cards
- Typing indicator animation

### Connected Services (`/app/connected/`)
- Shows active referrals (requested, triage, referred, follow-up due)
- Shows resolved referrals
- Empty state guides to browse services

### Profile (`/app/profile/`)
- Avatar, sign-in placeholder, settings cog
- Quick links: Connected, Messages, Settings, Have Your Say

### Settings (`/app/settings/`)
- Default location, search radius, request history, location sharing

### Survey (`/app/survey/`)
- 4 questions: priority issue, service access rating, community need, open comment
- Progress bar, skip option, choice/scale/text question types
- Thank-you confirmation with the listening loop

### Admin Dashboard (`/admin/`)
- Overview with real stats (referrals, services, pending)
- Referral queue with status management (8 statuses, inline change, staff notes)
- Service directory with search, category filter, grid view
- Reports with bar charts by status and need category

### Data
- 100+ services across 15 categories with real coordinates, phone numbers, hours
- Locations: Nowra, Wollongong, Ulladulla, Milton, Port Kembla, Warrawong, Kiama, Bomaderry, Berry, Shellharbour, Huskisson, Jervis Bay, Culburra, Sydney, Redfern, and national
- `createdAt` field on all services for sorting by newness

## 4. Database (Supabase)

- **Applied migrations:** PostGIS enabled, services table, referrals table, staff_profiles table, search functions
- **Seeded:** 20 services (the original set) — the remaining 80+ are in `data.ts` only
- **PostGIS functions:** `nearby_services()`, `search_services_by_location()`, `service_categories_with_counts()`, `get_service_detail()`
- **RLS:** Public read published services, staff CRUD, anyone can insert referrals
- **Supabase access token:** stored in `~/.supabase-access-token`
- **Vercel env vars set:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## 5. Vercel

- **Project:** `iraac-website` in `rhycollabs-projects` team
- **Production deployment:** Auto-deploys from `main` branch
- **Custom domain:** `www.iraac-aco.com`
- **Deploy command:** `vercel --prod --yes`

## 6. Current Branch & Git

- **Main branch:** `main` (all work merged)
- **Production branch:** `main` (auto-deploys to Vercel)
- **Latest commit:** `ee995fd` (fix: map page within phone shell)
- **Pattern:** Commit, push to `main`, then `vercel --prod --yes`

## 7. Key Decisions & Patterns

- **No auth built yet** — all pages are public. Auth (phone OTP for community, MFA for staff) is next.
- **No Supabase client wired into pages** — `lib/supabase/` files exist but pages use in-memory `data.ts` services array. Need to connect to Supabase RPC for real location queries.
- **Referrals use localStorage** — not persisted to Supabase yet. Admin reads from `localStorage.getItem("iraac_referrals")`.
- **Services in `data.ts`** are the source of truth for the frontend. The Supabase seed only has 20 services.
- **MapLibre GL JS** uses CARTO Positron tiles (free, no API key).
- **Crisis strip** only appears on home page, removed from all other pages.
- **Bottom nav** has 5 items: Home, Search, Connected, Messages, Profile.
- **Survey link** on public site front door goes to `/app/survey/`.

## 8. Next Steps (Priority Order)

1. **Auth** — Phone OTP for community login, MFA for staff admin protection
2. **Connect pages to Supabase** — Replace in-memory `data.ts` services with Supabase RPC calls (`nearby_services()`, `get_service_detail()`)
3. **Persist referrals to Supabase** — Replace localStorage with Supabase `referrals` table
4. **Run seed for all 100+ services** — The Supabase seed only has 20. Need to seed the remaining 80+.
5. **CI with Playwright tests** — GitHub Actions workflow with build, lint, typecheck, Playwright smoke tests
6. **Branch protection** — Require PR review on `main`, required checks
7. **Backup/restore runbook** — Document Supabase backup and restore process
8. **Merge the platform repo services** — The `iraac-platform` app has its own admin code. Decide whether to consolidate or keep separate.
9. **Search results page** — When user types in search bar and submits, the results should show filtered services in a list view
10. **Service detail from Supabase** — Wire `/app/service/[id]/` to call `get_service_detail()` from Supabase instead of reading from `data.ts`

## 9. Quick Commands

```bash
# Dev
cd /Users/rhys/Downloads/Projects/IRAAC/iraac-website-live
npm run dev

# Build
npm run build

# Deploy
git add -A && git commit -m "message" --no-verify && git push origin main
vercel --prod --yes

# Apply Supabase migrations
# Use supabase CLI or API (token in ~/.supabase-access-token)
# API endpoint: POST https://api.supabase.com/v1/projects/xfrhwibtmpjnasbcxdlw/database/query
# Auth: Bearer $SUPABASE_TOKEN
```

## 10. Files You Should Read First

1. `app/data.ts` — Service data model and all 100+ services
2. `app/app/page.tsx` — Home page with 5 service rails
3. `app/app/search/page.tsx` — Search page with mini map
4. `app/app/map/page.tsx` — Full map page with bottom sheet
5. `components/app/HelpBot.tsx` — Chat bot with keyword matching
6. `lib/referrals.ts` — Referral data model
7. `app/globals.css` — All styles
8. `docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md` — Original handoff document
9. `supabase/migrations/` — All DB migrations