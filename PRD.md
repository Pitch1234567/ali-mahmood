# Product Requirements Document: Ali Mahmood - Web Developer Portfolio

> **Approved implementation overrides (2026-08-08):** Use the public name **Ali Mahmood**. Build six anchored sections in this order: Home, About, Services, Work, Process, Contact. Use the hero portrait placeholder as the opening visual and exactly two purposeful dotLottie moments in Process and Contact. Omit location and availability. Keep ServiceSpark, FocusFlow, and TableReady visibly labeled as concept projects. Use local concept-note fixtures. Contact delivery uses a server-validated Resend adapter when configured and an honest setup error otherwise. These decisions supersede conflicting four-section, per-section Lottie, GitHub proxy, and placeholder-biography requirements below.

| Document field | Value |
| --- | --- |
| Product | Personal web developer portfolio |
| Owner | Ali Mehmood |
| Version | 1.0 |
| Status | Ready for design and implementation |
| Last updated | 8 August 2026 |
| Page model | Single-page portfolio with four primary content sections |
| Styling | Tailwind CSS |
| Primary audience | Small-business owners, founders, and clients who need a professional website |

---

## 1. Product summary

Build a polished, responsive, single-page portfolio for Ali Mehmood, a web developer beginning his professional portfolio. The website must help a potential client understand three things quickly:

1. What Ali does.
2. What business problems he can solve.
3. Why contacting him is a sensible next step.

The experience should feel modern, confident, and crafted rather than template-driven. Its signature visual element is a floating, cylindrical “island” navbar with a liquid-glass treatment. The page must use strong typography, consistent iconography, Lottie illustrations, purposeful animation, useful interactivity, and choreographed scroll animation.

The four primary content sections are:

1. Hero
2. Problem, solution, and “Why choose me?”
3. Selected projects
4. Contact

The floating navbar and footer sit outside the four-section count.

The project section must link to GitHub and allow visitors to preview each repository’s actual README without leaving the portfolio. Placeholder projects may be used during development, but they must be clearly labeled as concept projects and replaced with real repository links before launch.

---

## 2. Product vision

### Vision statement

Create a portfolio that demonstrates Ali’s taste and front-end ability through the experience itself. It should make an early-career portfolio feel intentional and credible without pretending that placeholder work is paid client work or inventing results.

### Core promise

> Ali builds clear, fast, and polished websites that help businesses look credible and make it easier for visitors to take action.

### Desired visitor impression

After one visit, the user should describe Ali as:

- Thoughtful
- Modern
- Detail-oriented
- Easy to work with
- Performance-conscious
- Honest about his experience

### Primary conversion

The visitor submits the contact form with a genuine project enquiry.

### Secondary conversions

- The visitor opens a project.
- The visitor previews a project README.
- The visitor visits Ali’s GitHub profile or repository.
- The visitor copies or clicks Ali’s email address.

---

## 3. Goals and non-goals

### Product goals

- Communicate Ali’s offer within the first five seconds.
- Convince clients who lack a strong website that a professional web presence matters.
- Explain problems and solutions in plain business language rather than developer jargon.
- Present a small portfolio confidently and honestly.
- Let visitors inspect the reasoning and documentation behind each project through a live README preview.
- Make the site itself evidence of front-end craftsmanship.
- Provide an obvious and friction-light contact path.
- Meet strong accessibility, responsiveness, performance, and SEO standards.
- Make project and contact content easy to update from a single data source.

### Non-goals for version 1

- A blog or CMS.
- User accounts or authentication.
- A client dashboard.
- A complex 3D/WebGL scene.
- A custom admin panel.
- Multiple page routes for individual projects.
- Private GitHub repository support.
- A theme switcher unless time remains after core requirements are complete.
- Fabricated testimonials, client logos, awards, statistics, or business outcomes.

---

## 4. Audience

### Primary persona: small-business owner

**Situation:** The person has no website, has an outdated website, or relies mainly on social media.

**Needs:**

- A credible online presence.
- A clear explanation of what a website will improve.
- Confidence that the developer understands business goals, not only code.
- An easy way to ask about cost, timing, and scope.

**Concerns:**

- “Will this developer understand my business?”
- “Will the website work on phones?”
- “Will the process be confusing?”
- “Can I trust the result to look professional?”

### Secondary persona: startup founder or hiring reviewer

**Situation:** The person is assessing Ali’s design judgment, front-end quality, documentation, and attention to detail.

**Needs:**

- Fast access to selected work.
- GitHub source links.
- README documentation.
- Evidence of accessibility, responsiveness, performance, and code quality.

---

## 5. Experience principles

1. **Clarity before decoration.** Every visual effect must support hierarchy, comprehension, or feedback.
2. **Business outcomes before technical labels.** Lead with trust, clarity, speed, and conversion; put the stack in supporting metadata.
3. **Motion with restraint.** Use animation to guide attention, explain change, and make interactions feel responsive.
4. **Honesty builds trust.** Concept work must be labeled. Never invent clients, testimonials, metrics, or outcomes.
5. **Progressive enhancement.** The core page, navigation, project information, and contact path must work if animation fails or is reduced.
6. **Mobile is a first-class experience.** Do not treat the phone layout as a compressed desktop layout.

---

## 6. Information architecture

### Page order

1. Floating island navbar
2. Hero section — `#home`
3. Problem/solution section — `#solutions`
4. Projects section — `#work`
5. Contact section — `#contact`
6. Footer

### Navbar labels

- Home
- Solutions
- Work
- Contact
- Primary CTA: **Let’s work together**

### Expected journey

The visitor lands on a clear promise, sees the business cost of a weak website, understands Ali’s approach, inspects selected work and documentation, and reaches a low-friction contact form.

---

## 7. Brand and visual direction

### Creative direction

Use a dark, high-contrast interface with restrained cyan and violet accents, translucent glass layers, subtle grid or noise texture, soft radial light, and clean browser-frame mockups. The design should feel premium and technical without looking like a gaming interface.

### Brand personality

- Precise, not cold
- Confident, not boastful
- Expressive, not chaotic
- Technical, but easy to understand
- Modern, but not trend-dependent

### Color system

Use semantic CSS variables so the palette can be tuned without editing individual components.

| Token | Suggested value | Usage |
| --- | --- | --- |
| `--background` | `#070A0F` | Main page background |
| `--background-elevated` | `#0D121B` | Raised surfaces |
| `--surface` | `rgba(17, 24, 39, 0.62)` | Glass cards |
| `--surface-strong` | `#121925` | Solid fallback surface |
| `--text-primary` | `#F7F9FC` | Headings and primary text |
| `--text-secondary` | `#A8B2C1` | Supporting copy |
| `--accent-cyan` | `#67E8F9` | Primary accent and focus details |
| `--accent-violet` | `#A78BFA` | Secondary accent |
| `--success` | `#6EE7B7` | Success feedback |
| `--error` | `#FDA4AF` | Error feedback |
| `--border-glass` | `rgba(255, 255, 255, 0.12)` | Glass outlines |

Requirements:

- Validate text and interactive-state contrast against WCAG 2.2 AA.
- Never use color alone to communicate status.
- Do not place body text directly over active gradients or Lottie artwork.
- Gradients should be atmospheric, not used as a substitute for hierarchy.

### Texture and depth

- Use one subtle page-wide grid or noise texture at very low opacity.
- Use radial glows behind major illustrations.
- Use glass only for elevated interactive surfaces: navbar, project preview drawer, selected cards, and contact form.
- Keep most content on the base background so glass remains special.
- Provide solid-color fallbacks when `backdrop-filter` is unavailable.

---

## 8. The six craft pillars

These six areas are first-class product requirements, not optional polish.

| Pillar | Direction | Measurable requirement |
| --- | --- | --- |
| Typography | Fluid, high-contrast editorial hierarchy with compact display headings and highly readable body copy | A consistent type scale is used at every breakpoint; body copy remains 16px or larger; paragraphs stay near 60–70 characters per line |
| Iconography | One coherent outlined icon family with consistent size and stroke | Use Lucide or an equivalent single library; no mixed icon styles; every icon-only control has an accessible name |
| Illustrations | A coordinated family of Lottie visuals supported by CSS/SVG atmosphere | Every one of the four main sections includes a relevant Lottie visual or Lottie micro-illustration; all assets have a static fallback |
| Animations | Purposeful component and feedback animation | Buttons, active nav state, cards, modal/drawer, form status, and Lottie playback have documented motion behavior |
| Interactivity | Useful responses to pointer, keyboard, and form input | All interactive features work by keyboard, expose clear states, and never depend only on hover |
| Scroll animations | A restrained narrative reveal system | Each main section has an intentional entrance sequence; reduced-motion mode removes movement while preserving content visibility |

---

## 9. Typography specification

### Recommended families

- **Primary/display and body:** Manrope Variable
- **Technical metadata:** JetBrains Mono Variable

Use locally hosted files or the framework’s optimized font loader. Avoid loading unnecessary weights.

### Type scale

| Role | Desktop target | Mobile target | Notes |
| --- | --- | --- | --- |
| Hero display | `clamp(3rem, 7vw, 6.75rem)` | 48–60px | Tight line height, subtle negative tracking |
| Section heading | `clamp(2.25rem, 4.5vw, 4.5rem)` | 36–44px | Maximum width of roughly 15 characters when practical |
| Card heading | 24–30px | 22–26px | Strong but clearly below section heading |
| Lead paragraph | 18–21px | 17–19px | Relaxed line height |
| Body | 16–18px | 16px | Never below 16px for primary copy |
| Label/eyebrow | 12–14px | 12–13px | Uppercase or mono with increased tracking |

### Typography behavior

- Use sentence case for headings and controls.
- Keep the hero headline to two or three lines on common desktop widths.
- Use balanced wrapping where supported, with a safe fallback.
- Avoid centered long paragraphs. Centered copy should be short.
- Do not use gradient text for full paragraphs.
- A gradient may accent no more than one short phrase in the hero headline.
- Use font-weight and spacing before introducing more colors.

---

## 10. Iconography specification

Use Lucide icons or one equivalent outlined family.

### Rules

- Default visual size: 18–20px in controls, 24px in feature cards.
- Default stroke: approximately 1.75–2px.
- Keep stroke, cap, and corner style consistent.
- Pair icons with text unless the meaning is universally understood.
- Add tooltips to unfamiliar icon-only controls.
- Do not use emoji as interface icons.
- External links include an external-link icon and a visually hidden “opens in a new tab” hint.
- Decorative icons use `aria-hidden="true"`.

### Suggested mapping

| Meaning | Icon |
| --- | --- |
| Clear messaging | MessageSquareText |
| Responsive layouts | PanelsTopLeft or Smartphone |
| Performance | Gauge |
| Conversion path | MousePointerClick |
| GitHub repository | Github |
| Live website | ExternalLink |
| README preview | BookOpenText |
| Contact | Send |
| Success | CircleCheck |
| Error | CircleAlert |
| Back to top | ArrowUp |

---

## 11. Lottie illustration strategy

The implementation agent must use the installed Lottie Files skill when choosing or adapting illustration assets.

### Skill-driven asset workflow

1. Invoke the Lottie Files skill before selecting assets.
2. Choose a coherent family with compatible line weight, geometry, palette, and energy.
3. Verify commercial usage rights and attribution requirements for every asset.
4. Record the source, creator, license, section, and local filename in `docs/lottie-assets.md`.
5. Prefer downloadable `.lottie` files; use optimized JSON only when needed.
6. Store approved assets locally under `public/lottie/`; do not rely on fragile third-party hotlinks.
7. Recolor only when permitted and ensure the result matches the product palette.

### Section assignments

| Area | Lottie concept | Role |
| --- | --- | --- |
| Hero | Abstract developer workspace, browser composition, or code-to-interface transformation | Establish craft and visual identity |
| Problem/solution | Tangled path or scattered blocks resolving into a clear structured path | Visualize movement from confusion to clarity |
| Projects | Code window becoming a polished browser/product card | Reinforce build process and documentation |
| Contact | Message, paper plane, or connection orbit | Signal approachability and completion |
| Footer | Optional tiny animated Ali “AM” mark or pulse | Add a subtle closing signature |

### Lottie requirements

- Create one reusable `LottieVisual` wrapper.
- Lazy-load all below-the-fold animations.
- Do not autoplay below-the-fold animations until they are close to the viewport.
- Pause animation when offscreen or when the tab is hidden.
- Respect `prefers-reduced-motion: reduce`; render the first frame or a static poster instead.
- Decorative animations must be hidden from assistive technology.
- Meaningful animations need a concise accessible alternative.
- Never block text or input while an animation loads.
- Set explicit width and height or aspect ratio to prevent layout shift.
- Cap continuous animation count; no more than two large animations should be active simultaneously.
- Compress and optimize assets before launch.

---

## 12. Global layout

### Grid

- Mobile: 4 columns with 20–24px outer gutters.
- Tablet: 8 columns with 32px gutters.
- Desktop: 12 columns in a 1200–1280px content container.
- Wide display: retain readable content widths; allow ambient background art to extend outward.

### Spacing

Use a consistent 4px-based scale. Main section vertical padding should be generous:

- Mobile: 88–112px
- Tablet: 112–144px
- Desktop: 144–192px

### Radius

- Small controls: 10–14px
- Cards: 20–28px
- Large panels: 28–36px
- Island navbar and pills: `9999px`

### Borders and shadows

- Use one-pixel translucent borders on glass.
- Use soft, wide shadows rather than sharp black drop shadows.
- Add a subtle inner top highlight to liquid-glass surfaces.
- Avoid stacking more than two distinct shadows on one component.

---

## 13. Floating island navbar

### Purpose

The navbar is the visual signature and primary orientation tool. It should appear like a floating cylindrical island made from layered liquid glass.

### Desktop layout

From left to right:

1. Ali monogram: **AM.**
2. Home
3. Solutions
4. Work
5. Contact
6. CTA: **Let’s work together**

### Mobile layout

- Show the **AM.** monogram, compact CTA, and menu button inside the pill.
- Opening the menu reveals a separate glass panel anchored below the island.
- The panel contains all navigation links with comfortable tap targets.
- The menu closes after navigation, on Escape, and when clicking outside.

### Visual behavior

- Fixed near the top center with safe-area support.
- Cylindrical silhouette using a full pill radius.
- Semi-transparent dark surface, strong backdrop blur, fine white border, inner highlight, and soft shadow.
- Add a very subtle refracted highlight that shifts with pointer movement only on devices with a fine pointer.
- Use a liquid active-state pill that glides between section labels.
- Keep all text readable when content moves behind the navbar.

### Scroll behavior

- Fully visible at page load.
- Becomes slightly more compact after the hero intro passes, without hiding essential controls.
- Active link updates using Intersection Observer.
- Clicking a link scrolls to the section and accounts for the fixed navbar offset.
- The URL hash updates without causing a disorienting jump.
- “Let’s work together” goes to `#contact`.

### Accessibility

- Use a semantic `nav` with an accessible label.
- Active link uses `aria-current="location"`.
- All touch targets are at least 44×44px.
- Keyboard focus must remain obvious on the glass surface.
- Do not use hover-only menus.
- Reduced motion replaces the gliding active pill with an immediate state change.

---

## 14. Section 1 — Hero

### Purpose

State what Ali builds, who benefits, and what the visitor should do next.

### Final copy

**Eyebrow**

> Web developer · Front-end & thoughtful design

**Headline**

> I build websites that make your business easier to trust.

**Supporting copy**

> I’m Ali Mehmood, a web developer focused on fast, clear, and polished digital experiences—so visitors understand what you offer and know exactly what to do next.

**Primary CTA**

> Let’s build yours

**Secondary CTA**

> See selected work

**Trust line**

> Responsive · Accessible · Performance-minded

**Availability badge**

> Available for select freelance projects

### Layout

- On desktop, use an asymmetrical two-column layout: copy on the left and Lottie visual on the right.
- On mobile, stack copy first, CTAs second, and illustration third.
- The headline remains the dominant element.
- Add a compact “scroll to explore” cue only if it does not compete with the CTAs.

### Visual elements

- Large restrained radial glow behind the Lottie.
- Very subtle grid or dotted plane.
- A small browser-frame or code-chip motif may orbit the main animation.
- Use one accent word or underline, not an entire gradient headline.

### Interactions

- Primary CTA scrolls to Contact.
- Secondary CTA scrolls to Projects.
- Buttons have a small pointer-responsive magnetic effect on desktop only.
- Button press gives immediate scale and surface feedback.
- Hero art may shift by a few pixels with pointer movement, but text must remain still.

### Animation

1. Eyebrow fades in.
2. Headline reveals by line, not by every character.
3. Supporting text and CTAs rise in with a short stagger.
4. Lottie enters with a soft scale/fade and begins after the main headline is readable.
5. Ambient glow settles last.

Total intro should feel complete within roughly 1.2 seconds. The visitor must never wait for animation before acting.

### Acceptance criteria

- Name, role, promise, and both CTAs are visible above the fold on common desktop screens.
- The primary message remains readable at 320px width.
- The hero communicates the offer without relying on animation.
- Lottie has fixed dimensions, a fallback, and reduced-motion behavior.

---

## 15. Section 2 — Problem, solution, and why Ali

### Purpose

Translate common website problems into client-facing consequences, explain Ali’s solution, and give concrete reasons to choose him.

### Final copy

**Eyebrow**

> What I solve

**Heading**

> A weak website quietly sends good customers somewhere else.

**Lead**

> When a site is missing, slow, or confusing, people hesitate. I turn that friction into a clear, responsive experience that helps your business look credible and makes the next step obvious.

### Problem-to-solution cards

| Problem | Business consequence | Ali’s solution |
| --- | --- | --- |
| No clear first impression | Visitors cannot quickly tell what the business offers or why it is trustworthy | A focused message and confident visual hierarchy that explain the value in seconds |
| A frustrating mobile experience | Potential customers leave when text, navigation, or forms are difficult to use | A mobile-first interface designed and tested for real screen sizes |
| Slow, heavy pages | People lose patience before the content appears | Lean components, optimized assets, sensible loading, and performance-minded development |
| No obvious next step | Attention does not turn into calls, enquiries, or bookings | Intentional calls to action and a simple path from interest to contact |

### “Why choose me?” subsection

**Heading**

> Thoughtful design. Clean development. No mystery.

**Reason 1 — Clarity before code**

> I start with your audience and goal, then shape the page around what visitors need to understand and do.

**Reason 2 — Built for every screen**

> The experience is designed for phones, tablets, and desktops from the beginning—not repaired for mobile at the end.

**Reason 3 — Performance is part of the design**

> I keep interactions polished and assets intentional so the site can feel rich without feeling slow.

**Reason 4 — A collaborative process**

> You get clear decisions, visible progress, and plain-language communication throughout the build.

### Layout

- The first half pairs a sticky or anchored Lottie visual with a vertical sequence of problem/solution cards.
- Each card visually transitions from “friction” to “clear outcome.”
- The “Why choose me?” reasons form a two-by-two grid on desktop and a single column on mobile.
- Use short supporting copy; do not turn the section into an essay.

### Lottie and visual storytelling

- Use an animation where disorganized blocks, knots, or paths resolve into a clean layout.
- Connect the animation state to the active problem card only if this can be done reliably and accessibly.
- Otherwise, play once when the section enters the viewport.

### Interactions

- On desktop, hovering or focusing a card highlights its solution side.
- On touch devices, tapping a card toggles expanded supporting detail.
- Default content must remain understandable without expansion.
- The active state must have a visible label or icon, not only a color shift.

### Scroll animation

- Heading and lead reveal first.
- Problem cards enter individually as the user reaches them.
- The “problem” label appears before the “solution” detail by a small, intentional delay.
- The “Why choose me?” grid rises with a subtle stagger.
- Do not pin the entire section on mobile.

### Acceptance criteria

- Every problem is paired with a client-relevant consequence and a specific solution.
- No unsupported claim, fake metric, or fake testimonial appears.
- Every card works with mouse, touch, keyboard, and reduced motion.
- The section includes a relevant Lottie visual with a fallback.

---

## 16. Section 3 — Selected projects

### Purpose

Show a small but credible collection of work, expose source code, and let technical visitors inspect the README without leaving the page.

### Final copy

**Eyebrow**

> Selected work

**Heading**

> A small portfolio, built with serious attention to detail.

**Lead**

> I’m early in my journey, so I’d rather show a few thoughtful builds than fill this page with noise. Each project includes the code and README notes behind the decisions.

### Placeholder project set

These entries are development content. Keep the **Concept project** badge until a real project replaces the entry.

#### Project 1 — ServiceSpark

- **Status:** Concept project
- **Summary:** A conversion-focused website for a local home-service business, designed to make the offer clear and turn mobile visits into enquiries.
- **Focus:** Messaging clarity, mobile conversion, accessible forms
- **Suggested stack:** Next.js, TypeScript, Tailwind CSS
- **Repository placeholder:** `https://github.com/your-github-username/service-spark`
- **Live URL placeholder:** `https://replace-with-live-url.example`
- **CTA labels:** Preview README, View GitHub, Visit site

#### Project 2 — FocusFlow

- **Status:** Concept project
- **Summary:** A calm task-planning dashboard that helps users sort priorities, track progress, and focus on the next useful action.
- **Focus:** Product UI, state feedback, responsive dashboard layout
- **Suggested stack:** React, TypeScript, Tailwind CSS
- **Repository placeholder:** `https://github.com/your-github-username/focus-flow`
- **Live URL placeholder:** `https://replace-with-live-url.example`
- **CTA labels:** Preview README, View GitHub, Visit site

#### Project 3 — TableReady

- **Status:** Concept project
- **Summary:** A restaurant discovery and reservation experience with clear availability, simple booking steps, and polished mobile interactions.
- **Focus:** Interaction design, booking flow, accessibility
- **Suggested stack:** React, TypeScript, Tailwind CSS
- **Repository placeholder:** `https://github.com/your-github-username/table-ready`
- **Live URL placeholder:** `https://replace-with-live-url.example`
- **CTA labels:** Preview README, View GitHub, Visit site

### Honesty rules

- Never show a concept project as client work.
- Never invent conversion improvements, traffic, revenue, users, or testimonials.
- If a card is based on a design exercise, label it **Concept project**.
- If a repository is not public and valid, hide or disable README preview with an honest explanation.
- At launch, either replace each placeholder URL with a working URL or remove the corresponding action/card.

### Card anatomy

Each project card includes:

1. Browser-frame cover image or short muted interaction preview.
2. Status badge.
3. Project name.
4. One-sentence summary.
5. Two or three focus tags.
6. Technology chips.
7. **Preview README** action.
8. **View GitHub** link.
9. Optional **Visit site** link.

### Layout

- Feature the strongest project in a larger card.
- Place remaining projects in a responsive grid.
- Alternate image and copy emphasis without creating inconsistent card anatomy.
- Keep primary actions visible without requiring hover.
- On mobile, cards use a single column and preserve screenshots at a useful aspect ratio.

### Section Lottie

Use a small code-to-browser Lottie near the section introduction or as a transition into the project grid. It must support the story without distracting from project previews.

### Project card interaction

- Pointer hover may add a restrained tilt of no more than 2–3 degrees and a border glow.
- Keyboard focus receives the same emphasis without tilt.
- Project media may animate on hover/focus, but must not autoplay video with audio.
- Touch users see all actions without hover.
- Reduced motion removes tilt and animated media.

---

## 17. GitHub README preview

### User story

As a prospective client or reviewer, I can select **Preview README** on a project and read the repository’s documentation inside the portfolio, so I can understand the problem, process, technology, and decisions without losing my place.

### Trigger and presentation

- Selecting **Preview README** opens an accessible modal on desktop and a bottom sheet or full-height drawer on mobile.
- Header includes project name, repository owner/name, GitHub link, and close control.
- Body renders GitHub-flavored Markdown.
- The preview area is independently scrollable.
- A persistent footer action says **View full repository on GitHub**.
- The page behind the preview is visually subdued and does not scroll.

### Fetch behavior

1. Fetch on demand when the user opens a README for the first time.
2. Parse the configured repository URL and extract only `owner` and `repo`.
3. Request the repository README through a server-side route such as:
   - Portfolio route: `GET /api/github/readme?owner={owner}&repo={repo}`
   - Upstream source: GitHub REST endpoint `GET /repos/{owner}/{repo}/readme`
4. Prefer a raw Markdown response through the appropriate GitHub media type.
5. Cache successful responses for approximately one hour.
6. Cache the result in client memory so reopening the same preview is instant.
7. Keep an optional GitHub token on the server only. Never expose it in client JavaScript.

### Security

- Accept only repository URLs with the exact allowed host `github.com`.
- Reject credentials, alternate protocols, unexpected ports, extra hosts, and malformed owner/repository names.
- Encode all request parameters.
- Do not accept arbitrary upstream URLs; prevent server-side request forgery.
- Render Markdown through `react-markdown` with GitHub-flavored Markdown support.
- Sanitize output using a strict schema.
- Do not enable untrusted raw HTML.
- Allow only safe protocols for links and images.
- External links use `rel="noopener noreferrer"`.

### Relative content

- Convert relative README image paths to the repository’s raw content location.
- Convert relative document links to appropriate GitHub blob URLs.
- Preserve heading hierarchy, lists, tables, task lists, inline code, and fenced code blocks.
- Wrap wide tables and code blocks in horizontal scroll containers.
- Use syntax highlighting only if it can be lazy-loaded without a large bundle cost.

### Preview states

| State | UI |
| --- | --- |
| Unopened | Normal project card with Preview README action |
| Loading | README-shaped skeleton, project title remains visible |
| Success | Sanitized Markdown content |
| No README | “This repository does not have a public README yet.” plus GitHub link |
| Invalid placeholder | “Add a valid public GitHub repository to enable this preview.” |
| Private repository | “README preview is unavailable for this repository.” plus GitHub link if appropriate |
| Rate limited | “GitHub is temporarily limiting previews. Open the repository directly or try again shortly.” |
| Network/server error | Concise error, Retry button, and GitHub fallback |

### Accessibility

- Move focus to the preview heading when opened.
- Trap focus while open.
- Close on Escape and through a clearly labeled control.
- Return focus to the originating project button on close.
- Announce loading and error states politely through a live region.
- Do not make the entire project card a nested interactive control.

### Development fixture

During development, use a local Markdown fixture to test rendering, including:

- Headings
- Paragraphs
- Lists
- Links
- Images
- Tables
- Task lists
- Blockquotes
- Inline code
- Fenced code

The fixture is for UI testing only. A live build must fetch the README associated with each valid published GitHub link.

### README acceptance criteria

- Every published project with a valid public repository can open its actual README.
- Content is fetched only when requested.
- Markdown is sanitized.
- Missing README, invalid link, rate limit, and network error states are usable.
- The preview is fully operable by keyboard and on small screens.
- Closing returns the visitor to the exact project action that opened it.

---

## 18. Project content model

Store projects in one typed content file so real work can replace placeholders without editing UI components.

```ts
export type Project = {
  id: string;
  title: string;
  status: "concept" | "personal" | "client";
  summary: string;
  focus: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  featured?: boolean;
};
```

Requirements:

- Validate data at build time.
- Do not render empty links.
- Ensure IDs are unique.
- Require meaningful image alt text.
- Show project status in the interface.
- Make project order editable from the content file.

---

## 19. Section 4 — Contact

### Purpose

Make starting a conversation feel simple, safe, and worthwhile.

### Final copy

**Eyebrow**

> Start a project

**Heading**

> Need a website that feels as professional as your work?

**Lead**

> Tell me what you’re building, what is getting in the way, and what a successful result would look like. I’ll reply with a clear next step.

**Primary form action**

> Send project details

**Direct-contact line**

> Prefer email? Write to [CONTACT_EMAIL].

**Availability line**

> Based in Pakistan · Available for remote projects

### Form fields

| Field | Type | Required | Guidance |
| --- | --- | --- | --- |
| Name | Text | Yes | “What should I call you?” |
| Email | Email | Yes | “you@company.com” |
| Company | Text | No | “Company or brand” |
| Project type | Select | Yes | Business website, landing page, portfolio, redesign, other |
| Budget range | Select | No | Use ranges Ali approves before launch |
| Message | Textarea | Yes | “Tell me about the goal, audience, and timeline.” |
| Website | Honeypot | Hidden | Spam protection; real users should leave empty |

### Validation

- Validate on blur and on submission, not on every first keystroke.
- Keep entered content after an error.
- Associate each error with its field.
- Use server-side validation even when client validation exists.
- Apply sensible maximum lengths.
- Do not require a phone number.

### Submission states and copy

| State | Copy |
| --- | --- |
| Idle | Send project details |
| Submitting | Sending… |
| Success | “Thanks—your message is on its way. I’ll be in touch soon.” |
| Validation error | Give specific field-level guidance |
| Server error | “I couldn’t send that message. Please try again or email me directly at [CONTACT_EMAIL].” |

### Form delivery

- Submit to a server route.
- Use a configurable email provider adapter.
- Store secrets only in server environment variables.
- Add honeypot protection and server-side rate limiting.
- Add CAPTCHA only if real spam makes it necessary.
- Do not include message contents in analytics.
- Provide a direct `mailto:` fallback.

### Lottie and visual direction

- Place a message, paper-plane, or connection-orbit Lottie near the copy, not behind the form.
- On successful submission, the animation may transition to a short success state.
- Success feedback must also appear as text and an icon.
- Keep the form motionless while the user types.

### Interactions

- Inputs receive clear focus, filled, error, and success states.
- The submit button gives immediate progress feedback and prevents duplicate submission.
- Email can be copied with a small confirmation message.
- Social links show text labels on mobile and may use icon-plus-tooltip on desktop.

### Scroll animation

- Heading and supporting copy reveal first.
- Form container fades and rises as one unit.
- Individual inputs must not cascade slowly; the form should become usable immediately.
- Lottie begins only after the form is visible.

### Acceptance criteria

- A complete valid form can be submitted by keyboard alone.
- Errors are announced and do not erase input.
- Success and failure have text-based feedback.
- A direct email route remains available.
- The section has a relevant, optimized Lottie with a static fallback.

---

## 20. Footer

### Content

**Brand line**

> Ali Mehmood — Thoughtful websites, built for clarity.

**Links**

- Home
- Solutions
- Work
- Contact
- GitHub
- LinkedIn
- Email

**Legal line**

> © [CURRENT_YEAR] Ali Mehmood. Built with care.

**Utility**

- Back to top control
- Optional tiny animated AM mark

### Requirements

- Generate the year dynamically.
- External links open safely.
- Back to top works with keyboard and respects reduced motion.
- Do not repeat a large CTA if the contact section already dominates the closing view.
- Keep the footer visually quiet.

---

## 21. Motion system

### Motion principles

- Motion explains hierarchy, causality, status, or spatial relationship.
- Most interface transitions should take 160–360ms.
- Section entrances may take 450–700ms.
- Avoid long, elastic, or bouncy effects for serious content.
- Never animate layout in a way that causes content to jump under the pointer.
- Animate transforms and opacity when possible.
- Do not attach heavy work directly to every scroll event.

### Suggested easing

- Standard UI: `cubic-bezier(0.22, 1, 0.36, 1)`
- Exit: `cubic-bezier(0.4, 0, 1, 1)`
- Gentle spring only for the nav active indicator and small button feedback

### Motion choreography

| Event | Element | Motion |
| --- | --- | --- |
| Page load | Island navbar | Fade and slide down 8px |
| Page load | Hero copy | Line-based reveal with short stagger |
| Page load | Hero Lottie | Fade/scale after headline is readable |
| Section entry | Section eyebrow and heading | Fade and rise 16–24px |
| Section entry | Supporting cards | Stagger in reading order |
| Nav change | Active indicator | Short liquid glide |
| Project hover/focus | Card | Border/glow emphasis; optional tiny tilt on fine pointer |
| README open | Backdrop and panel | Fade backdrop; panel scales/fades or rises on mobile |
| Form submit | Button | Progress state without shifting width |
| Form success | Status and contact Lottie | Short success transition |

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Remove parallax, magnetic movement, tilt, pinned storytelling, and smooth scrolling.
- Replace line movement with instant visibility or a short opacity change.
- Freeze Lottie on a representative frame.
- Open the README panel without spring or travel.
- Preserve focus, status, and active states.

---

## 22. Scroll animation specification

Use Intersection Observer or the animation library’s viewport primitives. Avoid a global scroll listener unless it is passive and frame-scheduled.

### Global reveal behavior

- Trigger when roughly 15–25% of the content enters the viewport.
- Animate once by default.
- Do not hide core content in initial server-rendered HTML.
- If JavaScript fails, content remains visible.
- Keep stagger gaps near 60–100ms.
- Avoid animating every sentence or chip.

### Section narrative

1. **Hero:** Promise first, supporting explanation second, actions third, illustration last.
2. **Problem/solution:** Show the problem, then clarify its consequence and solution.
3. **Projects:** Reveal the section intro, featured project, then the remaining cards.
4. **Contact:** Reveal the invitation, then make the complete form available immediately.

### Scroll progress

A thin page progress indicator may be integrated subtly into the navbar edge. It must:

- Be visually secondary.
- Not look like a loading bar.
- Be hidden from assistive technology if purely decorative.
- Disable nonessential animation in reduced-motion mode.

---

## 23. Interactivity specification

### Buttons

- Provide default, hover, active, focus-visible, disabled, and loading states.
- Avoid layout shifts between idle and loading text.
- Primary buttons use a solid or luminous surface.
- Secondary buttons use a glass/outline treatment.
- Do not use cursor-following effects on touch devices.

### Links

- Underlines or another persistent non-color cue are required within body copy.
- External destinations are distinguishable.
- Anchor targets account for the fixed navbar.

### Cards

- Do not make a card clickable if it contains several separate actions.
- Project card actions must have independent focus targets.
- Hover decoration must not reveal essential information.

### Tooltips

- Use only for supplemental labels.
- Open on hover and keyboard focus.
- Do not place essential instructions exclusively in a tooltip.

### Copy email

- A copy control may copy Ali’s email.
- Show “Email copied” in a polite live region.
- The visible email remains a standard clickable link.

---

## 24. Responsive behavior

### Breakpoint intent

Use content-driven breakpoints rather than designing only for named devices.

| Range | Behavior |
| --- | --- |
| 320–639px | Single-column sections, compact island navbar, full-width cards, mobile README sheet |
| 640–1023px | Mixed one/two-column layouts, expanded spacing, compact desktop-like navigation where it fits |
| 1024–1439px | Full navigation, two-column hero and problem layout, featured project treatment |
| 1440px+ | Keep content container bounded; expand only ambient visual space |

### Mobile requirements

- No horizontal page scrolling at 320px.
- Tap targets are at least 44×44px.
- Contact inputs do not trigger unwanted zoom.
- Navbar respects device safe areas.
- Lottie assets scale down without cropping critical content.
- README preview uses nearly full viewport height with a visible close control.
- Project CTAs wrap cleanly and remain visible.

---

## 25. Accessibility

Target WCAG 2.2 AA.

### Semantic structure

- One `h1`.
- Logical heading order.
- Semantic `header`, `nav`, `main`, `section`, `article`, `form`, and `footer`.
- Each section has an accessible name.
- Include a skip-to-content link.

### Keyboard

- All controls are reachable in logical order.
- Focus is always visible.
- No keyboard traps except the intentional, escapable modal focus trap.
- Mobile menu and README preview close with Escape.
- Focus returns to the trigger when overlays close.

### Screen readers

- Decorative Lotties, glows, and icons are hidden appropriately.
- Form fields have visible labels.
- Async states use polite live regions.
- Link text makes sense out of context.
- Project media has meaningful alt text or is marked decorative.

### Visual

- Text contrast meets AA.
- Focus indicators contrast against glass and solid surfaces.
- Text remains usable at 200% zoom.
- Reflow works at a viewport equivalent to 320 CSS pixels.
- Do not convey problem/solution or success/error using color alone.

### Motion

- Respect operating-system reduced-motion preferences.
- No flashing content.
- Avoid constant, large movement near reading text.
- Pause offscreen Lottie animations.

---

## 26. Performance requirements

### Targets

- Lighthouse Performance: 90 or higher on a representative mobile run.
- Lighthouse Accessibility: 95 or higher, with no known critical issue.
- Largest Contentful Paint: under 2.5 seconds at the 75th percentile where measurable.
- Interaction to Next Paint: under 200ms at the 75th percentile where measurable.
- Cumulative Layout Shift: below 0.1.

### Implementation requirements

- Render primary text and structure on the server where the framework supports it.
- Lazy-load below-the-fold Lotties and README renderer code.
- Do not fetch any README during initial page load.
- Use responsive images with explicit dimensions.
- Prefer AVIF/WebP with an appropriate fallback.
- Subset or limit font files and preconnect only when justified.
- Keep the hero Lottie small enough for the initial experience; show a poster immediately.
- Pause Lotties outside the viewport.
- Avoid a large animation library if the selected framework already covers the needs.
- Keep third-party scripts to a minimum.
- Use native smooth scrolling only when reduced motion is not requested.
- Test on a mid-range Android device and a throttled mobile connection.

---

## 27. SEO and sharing

### Metadata

**Title**

> Ali Mehmood — Web Developer

**Description**

> Ali Mehmood designs and builds fast, responsive websites that help businesses earn trust, explain their value, and turn visitors into enquiries.

### Requirements

- Canonical URL using the final production domain.
- Open Graph and social sharing image.
- Descriptive page title and meta description.
- Favicon and web app icons based on the AM monogram.
- `robots.txt` and sitemap.
- Person structured data with real values only.
- Add `sameAs` links only after GitHub and LinkedIn URLs are confirmed.
- Use semantic visible text; do not hide keyword blocks.
- Project images have descriptive filenames and alt text.

---

## 28. Analytics and privacy

Analytics is optional for version 1. If enabled:

- Use a lightweight, privacy-conscious product.
- Track only useful product events.
- Do not collect contact form message contents.
- Do not send personally identifiable form fields to analytics.
- Honor applicable consent requirements.

Suggested events:

- `hero_primary_cta_clicked`
- `project_readme_opened` with project ID
- `project_github_clicked` with project ID
- `contact_form_started`
- `contact_form_succeeded`
- `contact_form_failed` with a non-sensitive error category

---

## 29. Technical architecture

### Recommended stack

- React framework with server routes; recommended reference implementation: Next.js App Router
- TypeScript in strict mode
- Tailwind CSS
- Motion for React or an equivalent lightweight motion solution
- `@lottiefiles/dotlottie-react` for `.lottie` assets
- Lucide React for icons
- `react-markdown`, `remark-gfm`, and `rehype-sanitize` for README rendering
- Zod for data and server validation
- A lightweight form solution or native React form handling

Do not add a dependency when a browser or framework primitive solves the need cleanly.

### Suggested component structure

```text
app/
  api/
    contact/
      route.ts
    github/
      readme/
        route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  layout/
    island-navbar.tsx
    footer.tsx
  sections/
    hero-section.tsx
    solutions-section.tsx
    projects-section.tsx
    contact-section.tsx
  projects/
    project-card.tsx
    readme-preview.tsx
    readme-content.tsx
  ui/
    button.tsx
    glass-panel.tsx
    section-heading.tsx
    lottie-visual.tsx
    status-message.tsx
content/
  projects.ts
  site.ts
lib/
  github.ts
  validation.ts
public/
  images/
  lottie/
docs/
  lottie-assets.md
```

### State strategy

- Keep site copy and project data in typed local content files.
- Keep README modal state local to the projects experience.
- Use request caching for README content.
- Keep form state local to the form.
- Do not introduce a global state library for version 1.

### Environment variables

```text
NEXT_PUBLIC_SITE_URL=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
EMAIL_PROVIDER_API_KEY=
GITHUB_TOKEN=
```

Requirements:

- Provide `.env.example` with empty values and descriptions.
- Never commit real secrets.
- `GITHUB_TOKEN` is optional for public repositories but recommended server-side to improve rate limits.
- Client bundles must not contain server secrets.

---

## 30. Content tokens to replace before launch

| Token/content | Required action |
| --- | --- |
| `[CONTACT_EMAIL]` | Add Ali’s real public contact email |
| GitHub profile URL | Add Ali’s confirmed profile |
| LinkedIn URL | Add Ali’s confirmed profile or remove the link |
| Project GitHub URLs | Replace every placeholder with a real public repository |
| Project live URLs | Replace with deployed links or remove the Visit site action |
| Project screenshots | Add original screenshots with alt text and dimensions |
| Project statuses | Confirm concept, personal, or client |
| Budget ranges | Confirm Ali’s preferred ranges or remove the field |
| Production domain | Add to metadata, sitemap, canonical URL, and structured data |
| Open Graph image | Create final branded image |
| Contact delivery | Configure and test the server-side email provider |
| Lottie licenses | Complete `docs/lottie-assets.md` |

No placeholder may silently ship as though it were real.

---

## 31. Error and empty states

### Global

- If JavaScript fails, navigation anchors, content, project links, and email contact still work.
- If backdrop blur is unsupported, use an opaque elevated surface.
- If a font fails, use a carefully defined system fallback stack.

### Project media

- Use a designed fallback frame if an image fails.
- Do not collapse card height while media loads.

### Lottie

- Show a static poster or restrained CSS/SVG composition.
- Never show a blank hole or loading spinner for decorative art.

### Contact

- Keep user input after recoverable errors.
- Expose a direct email alternative.
- Prevent duplicate submissions.

### README

- Follow all states defined in the GitHub README preview specification.
- Always retain an appropriate direct GitHub fallback when a valid link exists.

---

## 32. Testing and quality assurance

### Functional tests

- Every navbar link reaches the correct section.
- Active navigation updates correctly in both scroll directions.
- Mobile menu opens, closes, and returns focus correctly.
- Both hero CTAs reach the correct sections.
- Every valid project action opens the correct destination.
- Every valid README preview fetches the matching repository README.
- README retry and fallback links work.
- Contact form validates, submits, prevents duplicates, and handles server failure.
- Back to top works.

### Accessibility tests

- Complete a full keyboard-only pass.
- Test with at least one desktop screen reader.
- Test with Android screen reader behavior if possible.
- Test reduced-motion mode.
- Test at 200% zoom.
- Run automated accessibility checks, then perform manual verification.
- Verify focus restoration for the menu and README preview.

### Responsive tests

Minimum widths:

- 320px
- 375px
- 768px
- 1024px
- 1440px

Also test:

- Short laptop viewport height.
- Landscape mobile.
- Long project titles.
- Long technology labels.
- README tables and code blocks wider than the viewport.

### Browser targets

- Current and previous major Chrome
- Current and previous major Safari
- Current and previous major Firefox
- Current Edge
- Modern Android Chrome
- Modern iOS Safari

### Performance tests

- Throttled mobile connection.
- Mid-range mobile CPU.
- Cold-load and repeat-load runs.
- Confirm no README requests occur on initial load.
- Confirm offscreen Lotties pause.
- Check animation smoothness without hiding main-thread stalls.

---

## 33. Acceptance criteria

The product is ready for release only when all conditions below are met.

### Structure and content

- [ ] The page contains exactly four primary content sections: Hero, Problem/Solution, Projects, and Contact.
- [ ] A floating liquid-glass island navbar appears above them.
- [ ] A complete footer appears after them.
- [ ] Ali Mehmood’s name and offer use the approved copy.
- [ ] Placeholder concept projects are labeled honestly.
- [ ] All launch links and contact tokens are real or removed.

### Six craft pillars

- [ ] Typography follows a consistent fluid scale and remains readable at all tested widths.
- [ ] Iconography uses one coherent family.
- [ ] Every primary section includes a relevant Lottie asset with fallback and license record.
- [ ] Component animations have a clear purpose and consistent timing.
- [ ] Interactions work with pointer, touch, and keyboard.
- [ ] Each section has an intentional scroll entrance and reduced-motion alternative.

### Projects and README

- [ ] Every published project has a working GitHub link.
- [ ] Preview README loads the corresponding actual README on demand.
- [ ] GitHub-flavored Markdown renders safely.
- [ ] Relative images/links, wide tables, and code blocks are handled.
- [ ] Loading, no README, invalid link, private repository, rate limit, and server error states are present.
- [ ] The preview modal/sheet manages focus correctly.

### Contact

- [ ] The contact form validates on client and server.
- [ ] Submission success and failure are communicated accessibly.
- [ ] Spam protection and rate limiting are active.
- [ ] A direct email fallback works.
- [ ] No private message content is sent to analytics.

### Quality

- [ ] WCAG 2.2 AA requirements are met.
- [ ] Reduced-motion mode is verified manually.
- [ ] No horizontal page overflow occurs at 320px.
- [ ] No known critical accessibility error remains.
- [ ] Lighthouse and Core Web Vitals targets are reasonably met.
- [ ] The site works if animation assets fail.
- [ ] Metadata, favicon, Open Graph image, sitemap, and canonical URL are complete.

---

## 34. Implementation phases

### Phase 1 — Foundation

- Initialize the framework, TypeScript, and Tailwind CSS.
- Add semantic page structure and content data.
- Establish color, type, spacing, radius, and motion tokens.
- Build reusable buttons, section heading, glass panel, and Lottie wrapper.

### Phase 2 — Core layout and copy

- Build island navbar and footer.
- Implement all four sections with final copy.
- Add responsive layouts and project content model.
- Add placeholder browser-frame media.

### Phase 3 — Interactivity

- Add active navigation and mobile menu.
- Add project card interactions.
- Build README preview UI and secure server route.
- Build and connect the contact form.

### Phase 4 — Visual craft

- Invoke the Lottie Files skill and select the illustration family.
- Add documented, optimized local Lottie assets.
- Implement component motion and scroll choreography.
- Add glass details, ambient visuals, focus states, and microinteractions.

### Phase 5 — Quality and launch

- Replace or remove every placeholder.
- Complete responsive, accessibility, browser, and performance testing.
- Verify README edge cases.
- Verify contact delivery.
- Add metadata and sharing assets.
- Run final content and honesty review.

---

## 35. Definition of done

The portfolio is done when a potential client can:

1. Understand Ali’s service immediately.
2. Recognize the business problems he solves.
3. See why his approach is credible.
4. inspect a small, honest set of projects.
5. Preview the actual README for every published repository.
6. Contact Ali without confusion.

The implementation must feel polished across typography, iconography, illustration, animation, interactivity, and scroll behavior while remaining fast, accessible, and useful when motion is reduced or unavailable.

---

## 36. Direct brief for the implementation agent

Build the portfolio described in this PRD as a production-quality single-page experience for **Ali Mehmood**. Use TypeScript and Tailwind CSS. Treat the floating cylindrical liquid-glass navbar as the signature component. Preserve the exact four-section structure. Use the supplied copy unless Ali explicitly changes it.

Use the installed Lottie Files skill to source a coherent, licensed illustration family, and include one optimized Lottie in every primary section. Implement all six craft pillars—typography, iconography, illustrations, animations, interactivity, and scroll animations—as functional requirements. Respect reduced-motion preferences and provide static fallbacks.

Build the GitHub README preview as a real, on-demand, sanitized Markdown experience connected to each project’s configured GitHub URL. Never substitute a screenshot for the README, never expose a GitHub token to the client, and never ship broken placeholder links.

Keep the code modular, typed, accessible, responsive, and performance-minded. Avoid fake metrics, fake clients, fake testimonials, and unnecessary effects. The finished website itself should be the strongest example of Ali’s front-end judgment.
