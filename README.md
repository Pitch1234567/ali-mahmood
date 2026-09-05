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

The visible form validates in the browser and prepares a draft addressed to `aalimahmood2006@gmail.com`. Desktop viewports from 768px open Gmail Compose directly in a new browser tab; mobile viewports keep the standards-based `mailto:` handoff to the visitor's existing email app. Name, reply email, company, project type, and project details are inserted automatically. The site does not submit or store the enquiry, preserves the completed fields, and reports only that a draft opened—not that an email was sent.

`NEXT_PUBLIC_CONTACT_EMAIL` can override the committed public recipient at build time. The verified address above is the built-in fallback, so the contact flow also works without an environment file. Desktop visitors need browser access to Gmail and may be asked to sign in. Mobile visitors need a default email app or browser `mailto:` handler. After the draft opens, they review it and press Send.

The repository still includes the isolated `POST /api/contact` Resend adapter and its server-side validation tests for a possible future direct-delivery mode. The current form does not call it. Its optional settings remain documented in `.env.example`.

## Deployment metadata

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so canonical metadata, Open Graph images, `robots.txt`, and `sitemap.xml` resolve to the final domain. Vercel deployments use `VERCEL_PROJECT_PRODUCTION_URL` automatically. Local builds fall back to `http://localhost:3000`.

Public profile and project destinations are environment-driven. Invalid or missing destinations are omitted from the rendered interface rather than shown as broken placeholders. Keep concept labels until each item represents verifiable personal or client work.
