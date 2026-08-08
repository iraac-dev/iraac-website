# IRAAC Website

A working draft of the public website for IRAAC. This repository is the public
front door and the planning source for the future private listening platform.
It must never contain production contact lists, survey responses or secrets.

The public site now uses Astro, Markdown content files and normal CSS. It still
builds to a static website and deploys to Vercel. The consent, survey, campaign,
calling, reporting and staff-control system described in the roadmap remains a
separate private platform.

## Start here

- `src/content/pages/` contains the editable page content. This is the first
  place DeepSeek or another AI editor should look for text changes.
- `src/styles/global.css` contains the shared visual styling.
- `src/components/` contains shared header, front-door and footer pieces.
- `public/data/images.json` records the placeholder image sources.
- `PRODUCTION_LAUNCH_PLAN.md` is the concise critical path, user sign-up list
  and agent work register.
- `ROADMAP.md` is the canonical product, governance, consent, architecture and
  compliance specification.

## Editing

For a normal page text change, edit the matching Markdown file in
`src/content/pages/`. Each page has frontmatter for its title, description and
active navigation item, followed by the page body. The body may include HTML
where the layout needs cards, grids or buttons.

For shared navigation, edit `src/data.ts`. For shared layout, edit the relevant
component in `src/components/`. For colours, spacing and responsive behaviour,
edit `src/styles/global.css`.

## Login and Mob Link

The public Login button points to the 1800 Mob Link prototype at
`https://admin.iraac-aco.com/mob-link`. Keep that route prominent: it is the
future community account entry point, not just a staff/admin shortcut.

The public site does not own authentication or personal-data matching. That
belongs in the private platform. The intended identity direction is Supabase
Auth, with Google sign-in, email/password or email magic links, phone OTP, and
linked identities so a person's phone, email and Google account can be joined
under one governed user record after clear consent and verification.

## Local preview

```
npm install
npm run dev
```

## Production build

```
npm run build
```

The output is written to `dist/` and Vercel deploys that static output. Legacy
`.html` URLs redirect to their clean Astro routes.

## Publish to the live website

The live public website is `https://www.iraac-aco.com/`. It is served by the
Vercel project named `iraac-website`, linked locally in `.vercel/project.json`
and aliased to the custom domain.

Use this flow every time a change should appear on the public website:

```
npm run build
git status --short
git add README.md PRODUCTION_LAUNCH_PLAN.md ROADMAP.md docs src public package.json package-lock.json astro.config.mjs vercel.json
git commit -m "Describe the website change"
git push origin main
```

Do not add `.env.local`, `.vercel/.env.development.local`, production contact
lists, survey responses or other private records to the public website repo.

After pushing, check Vercel has deployed the newest `main` commit:

```
vercel inspect https://www.iraac-aco.com/
curl -L https://www.iraac-aco.com/ | head
```

If Vercel is still showing an older build, force a production deploy from this
folder:

```
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
