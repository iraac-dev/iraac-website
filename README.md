# IRAAC Website

A working draft of the public website for IRAAC. This repository is the public
front door and the planning source for the future private listening platform.
It must never contain production contact lists, survey responses or secrets.

The public site now uses Next.js App Router and deploys to Vercel as one app.
It serves the public website at `/`, the visual 1800 Mob Link prototype at
`/app/`, and the visual staff dashboard prototype at `/admin/`. The consent,
survey, campaign, calling, reporting and staff-control system described in the
roadmap still needs production Supabase Auth, RLS, audit and governance gates
before it can handle real users or real data.

## Start here

- `app/data.ts` contains public navigation, page content, program cards and
  prototype service data.
- `app/SiteShell.tsx` contains the public header, front-door strip and footer.
- `app/globals.css` contains the shared visual styling.
- `app/app/page.tsx` contains the visual MobLink prototype route.
- `app/admin/page.tsx` contains the visual staff admin prototype route.
- `public/data/images.json` records the placeholder image sources.
- `PRODUCTION_LAUNCH_PLAN.md` is the concise critical path, user sign-up list
  and agent work register.
- `ROADMAP.md` is the canonical product, governance, consent, architecture and
  compliance specification.
- `docs/release/CLAUDE_CLI_PRODUCTION_HANDOFF.md` is the detailed build guide
  for Claude CLI / DeepSeek to take the prototype toward production.

## Editing

For a normal public page text change, edit the matching entry in `app/data.ts`.
For shared navigation or footer changes, edit `app/SiteShell.tsx` and
`app/data.ts`. For colours, spacing and responsive behaviour, edit
`app/globals.css`.

## Login and Mob Link

The public Login button points directly to `/app/`, the 1800 Mob Link
prototype. The footer Admin link points directly to `/admin/`, the staff
dashboard prototype. Keep these as same-domain Next.js routes.

The public site does not own authentication or personal-data matching. That
belongs in the private platform. The intended identity direction is Supabase
Auth, with Google sign-in, email/password or email magic links, phone OTP, and
linked identities so a person's phone, email and Google account can be joined
under one governed user record after clear consent and verification.

## Local preview

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vercel builds and serves the Next.js output. Legacy `.html` URLs redirect to
their clean Next.js routes through `vercel.json`.

## Publish to the live website

The live public website is `https://www.iraac-aco.com/`. It is served by the
Vercel project named `iraac-website`, linked locally in `.vercel/project.json`
and aliased to the custom domain.

Use this flow every time a change should appear on the public website:

```bash
npm run build
git status --short
git add README.md PRODUCTION_LAUNCH_PLAN.md ROADMAP.md docs app public package.json package-lock.json next.config.ts next-env.d.ts tsconfig.json vercel.json
git commit -m "Describe the website change"
git push origin main
```

Do not add `.env.local`, `.vercel/.env.development.local`, production contact
lists, survey responses or other private records to the public website repo.

After pushing, check Vercel has deployed the newest `main` commit:

```bash
vercel inspect https://www.iraac-aco.com/
curl -L https://www.iraac-aco.com/ | head
```

If Vercel is still showing an older build, force a production deploy from this
folder:

```bash
vercel deploy --prod --yes
```

The deploy output should say `target production`, `status Ready`, and list
`https://www.iraac-aco.com` under aliases. Only call a change live after opening
or checking `https://www.iraac-aco.com/` and confirming the visible page has the
new content.

## Current boundary

Have Your Say remains a non-collecting IRAAC-owned holding page until P1 in the
production launch plan passes its human, governance, security, accessibility
and operational gates. Do not represent prototype forms, campaigns or calling
flows as live.
