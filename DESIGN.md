---
name: Ali Mahmood Portfolio
description: A dark editorial proofing table for clear, trustworthy web work.
colors:
  cyan-signal: "#68e1e7"
  cyan-signal-hover: "#83edf1"
  night-field: "#080b10"
  optical-surface: "#101620"
  solid-surface: "#141b26"
  quiet-surface: "#0d121a"
  primary-text: "#f4f7fa"
  secondary-text: "#a5b0be"
  quiet-text: "#778391"
  cyan-ink: "#061114"
  success: "#79e3b2"
  error: "#ff9aa9"
typography:
  display:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "clamp(3.05rem, 4.05vw, 4.8rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  section:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "clamp(3rem, 5.7vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.65rem)"
    fontWeight: 590
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  control: "13px"
  surface: "24px"
  pill: "999px"
spacing:
  control: "0.8rem 0.95rem"
  component: "1.35rem"
  section: "clamp(6.5rem, 11vw, 11.5rem)"
  page-gutter: "clamp(1.25rem, 4.4vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.cyan-signal}"
    textColor: "{colors.cyan-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "48px"
  input:
    backgroundColor: "{colors.night-field}"
    textColor: "{colors.primary-text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "{spacing.control}"
    height: "52px"
  navigation:
    backgroundColor: "{colors.optical-surface}"
    textColor: "{colors.secondary-text}"
    rounded: "{rounded.pill}"
    height: "64px"
---

# Design System: Ali Mahmood Portfolio

## Overview

**Creative North Star: "The Night Glass Proofing Table"**

The portfolio behaves like a dark studio surface where work is inspected rather than advertised with spectacle. Wide editorial typography carries the argument; cinematic concept images and physical cyan route geometry provide the memorable second read.

Depth is local, responsive, and earned. Optical glass belongs to interactive elevations such as the floating navigation, portrait plate, dialog, and project brief. The surrounding content stays flat and spacious so the hierarchy remains direct.

**Key Characteristics:**

- Near-black editorial fields with one icy cyan signal.
- Wide, low-weight headings paired with quiet technical labels.
- Asymmetric compositions and substantial negative space.
- Authored raster material for image-native moments.
- Short, calm motion with explicit reduced-motion behavior.

## Colors

The palette is a cool near-black neutral system with cyan reserved for action, orientation, and successful routes.

### Primary

- **Cyan Signal:** Primary actions, active navigation, focus rings, and route geometry.
- **Cyan Signal Hover:** A brighter response used only while a primary action is hovered.

### Neutral

- **Night Field:** Page background and the darkest field surfaces.
- **Optical Surface:** Translucent interactive elevations.
- **Solid Surface:** Fallback for reduced transparency and dense panels.
- **Quiet Surface:** Process slabs and nested surfaces.
- **Primary Text:** Headlines, field labels, and high-priority copy.
- **Secondary Text:** Body copy and explanatory text.
- **Quiet Text:** Metadata, pending states, and low-priority annotations.
- **Cyan Ink:** Text placed on the cyan signal.

**The One Signal Rule.** Cyan identifies a route, action, current state, or focus. It is not a decorative wash.

## Typography

**Display Font:** Manrope Variable (with Arial and sans-serif fallbacks)  
**Body Font:** Manrope Variable (with Arial and sans-serif fallbacks)  
**Label/Mono Font:** JetBrains Mono Variable (with monospace fallback)

**Character:** Manrope supplies broad, calm editorial forms without becoming ornamental. JetBrains Mono adds a precise proofing-note register for technologies, status labels, and small technical facts.

### Hierarchy

- **Display:** Medium-weight, compressed line-height type for the two-line hero promise.
- **Section:** Large, low-weight statements that usually occupy 6 to 12 characters per line.
- **Title:** Compact project and process names with tighter tracking.
- **Body:** Regular copy with a comfortable reading rhythm and a practical maximum near 65 characters.
- **Label:** Small monospaced annotations used for real metadata and project status, never decorative eyebrow copy.

**The Wide Statement Rule.** Prefer fewer, wider lines over narrow stacked headlines. Desktop hero copy stays at two lines.

## Layout

The page uses a centered fluid frame capped at 1420px with a responsive gutter. Sections have large vertical intervals and alternate between asymmetric two-column structures and full-width statements. The hero uses copy left and the portrait plate right; Work uses one dominant project beside two supporting projects.

At 1099px the desktop grid compresses without changing reading order. At 767px all major layouts become a single column, the menu becomes a dialog, content media moves after its explanation when useful, and touch targets remain at least 44px. The layout supports a 320px minimum viewport with no horizontal overflow.

## Elevation & Depth

The system is flat by default and uses a hybrid of tonal layering, thin light borders, blur, and a single large ambient shadow for true elevated surfaces. Portrait depth comes from real generated material inside offset glass plates, not CSS pretending to be a sculpture.

### Shadow Vocabulary

- **Optical Float** (`0 28px 90px rgb(0 5 12 / 0.48)`): Navigation, dialogs, and the strongest glass surfaces.
- **Action Lift** (`0 14px 34px rgb(0 44 50 / 0.28)`): Cyan primary actions at rest.
- **Action Hover** (`0 18px 44px rgb(0 60 68 / 0.34)`): A small hover-only increase in local depth.

**The Earned Glass Rule.** Blur belongs only to surfaces that float, move, or temporarily hold focus. Ordinary content never receives glass by default.

## Shapes

Controls and process slabs use a restrained 13px radius. Larger overlays and form containers use 24px. Pills are reserved for the floating navigation and circular icon controls. Thin translucent borders reveal material edges; there are no hard offset shadows or ornamental side stripes.

## Components

### Buttons

- **Shape:** Compact, gently rounded control with a 48px minimum height.
- **Primary:** Cyan signal surface, dark cyan ink, strong text, and horizontal breathing room.
- **Hover / Focus:** One-pixel lift, brighter cyan, local shadow increase, and a visible cyan focus outline.
- **Secondary:** Text-led action with an icon, transparent background, and a cyan underline only on hover.

### Chips

- **Style:** Technology tags are unboxed monospaced labels in the quiet text color.
- **State:** Project status is cyan because it communicates source truth. Unavailable repository, live-site, and profile actions are omitted instead of rendered as inactive promises.

### Cards / Containers

- **Corner Style:** Project media and process slabs use control-radius corners; primary forms and dialogs use surface-radius corners.
- **Background:** Content is flat on the Night Field. Only process slabs, optical elevations, and the project brief carry a contained surface.
- **Shadow Strategy:** Project imagery relies on its material; optical containers use ambient depth.
- **Border:** One-pixel translucent borders become stronger only for interaction or accessibility preferences.

### Inputs / Fields

- **Style:** Dark translucent field, visible label, 52px minimum height, and a thin neutral stroke.
- **Focus:** Cyan border with a restrained three-pixel outer wash.
- **Error / Disabled:** Error uses the dedicated error color and inline recovery text. The submit button exposes a real disabled state during delivery.

### Contact Delivery

The form presents one continuous surface for idle, client validation, server validation, sending, configuration failure, rate limiting, provider failure, and success. Input is preserved on every recoverable error. A successful send resets the fields and plays the contact Lottie once. Builds without email credentials name the missing setup honestly and never simulate success.

### Navigation

The navigation is a single floating optical pill. Desktop links share a centered rail with a cyan active surface and scroll-progress rule. Mobile keeps the monogram and a 44px menu trigger, then materializes an accessible modal sheet outward from that trigger. Its close motion reverses the same path, while the links arrive in a capped micro-cascade.

On mobile, the hero portrait is the authored focal sequence: the image is uncovered vertically while the front and back glass planes settle into depth and the reflection follows last. Touch controls acknowledge pointer-down immediately with a restrained scale response. These spatial effects are removed when reduced motion is requested.

### Route Motif

The cyan route appears as a real visual path in Services, Process, and concept imagery. It means guided movement toward a useful action, so it should never become ambient decoration.

## Do's and Don'ts

### Do:

- **Do** keep cyan rare enough that the primary action and current state remain obvious.
- **Do** use genuine raster material when an image is responsible for atmosphere or physical depth.
- **Do** pair large statements with quiet supporting copy and substantial negative space.
- **Do** preserve keyboard focus, reduced motion, reduced transparency, increased contrast, and forced-color adaptations.

### Don't:

- **Don't** introduce rainbow gradients, neon cyberpunk grids, decorative code, or fake terminal chrome.
- **Don't** turn every content group into a rounded card or every surface into glass.
- **Don't** invent client claims, repositories, live links, locations, availability, or contact details.
- **Don't** use decorative eyebrow kickers, gradient text, glyph arrows, or hard offset shadows.
