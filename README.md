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

## Current boundary

Have Your Say remains a non-collecting IRAAC-owned holding page until P1 in the
production launch plan passes its human, governance, security, accessibility
and operational gates. Do not represent prototype forms, campaigns or calling
flows as live.
