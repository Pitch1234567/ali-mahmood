# Ali Mahmood portfolio

A polished single-page portfolio for web developer Ali Mahmood, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

The visual system is a dark editorial "Night Glass" proofing table: wide typography, restrained cyan interaction color, authored concept imagery, a layered portrait treatment, and two local dotLottie animations. All current projects and unavailable destinations are labeled honestly.

## Run locally

Use `npm.cmd` in Windows PowerShell if script execution blocks `npm.ps1`.

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Quality checks

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

The Playwright suite uses Microsoft Edge and checks desktop and mobile layouts, navigation, keyboard focus restoration, local concept notes, client and server contact validation, honest delivery errors, accessibility, reduced motion, and horizontal overflow.

## Content and assets

- Edit typed portfolio content in `content/site.ts`.
- Edit local concept notes in `content/project-notes.ts`.
- Replace `public/images/portrait-placeholder.png` when Ali supplies a real photograph.
- Generated image briefs are embedded in the PNG sources and preserved in `.impeccable/prompts/`.
- Original dotLottie sources live in `lottie-src/`; deployable files and static fallbacks live in `public/lottie/`.
- Product truth is recorded in `PRODUCT.md`; the shipped visual system is recorded in `DESIGN.md`.

## Contact behavior

The form validates on the client and again in `POST /api/contact`. The route includes a same-origin check, request-size limit, honeypot, in-memory rate limit, delivery timeout, HTML escaping, and a Resend delivery adapter. It never logs or persists enquiry contents.

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_ALLOWED_ORIGIN` using the exact public origin
- `NEXT_PUBLIC_CONTACT_EMAIL` for the visible direct-email fallback

Without the three server delivery values, the form returns an honest configuration error and never simulates success. A successful delivery plays the existing contact Lottie once.

## Deployment metadata

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so canonical metadata, Open Graph images, `robots.txt`, and `sitemap.xml` resolve to the final domain. Vercel deployments use `VERCEL_PROJECT_PRODUCTION_URL` automatically. Local builds fall back to `http://localhost:3000`.

Public profile and project destinations are environment-driven. Invalid or missing destinations are omitted from the rendered interface rather than shown as broken placeholders. Keep concept labels until each item represents verifiable personal or client work.
