import type { ProjectId } from "./site";

const notes: Record<ProjectId, string> = {
  luminabotanics: `# Lumina Botanics

> Local concept fixture. No public repository or live store is attached.

Lumina Botanics explores a premium botanical skincare shop designed to make product discovery feel considered without slowing down the path to purchase.

## The design question

How can an e-commerce experience feel editorial and luxurious while keeping price, product benefits, cart state, and checkout actions immediately clear?

## Decisions explored

- Lead with tactile product imagery while keeping shopping actions unmistakable.
- Organize discovery around skin needs instead of an overwhelming catalogue.
- Keep cart feedback immediate and preserve context when the bag opens.
- Reduce checkout friction with clear delivery, payment, and validation states.
- Carry the same hierarchy from wide product stories to a compact mobile flow.

## Commerce flow

1. Discover a collection or shop by skin need.
2. Compare concise product benefits and ingredients.
3. Choose a variant and add it to the bag.
4. Review delivery details before checkout.
5. Complete a short, accessible payment flow.

## Front-end focus

| Area | Approach |
| --- | --- |
| Catalogue | Filterable, responsive product discovery |
| Product page | Clear variants, benefits, and trust details |
| Bag | Persistent state with immediate feedback |
| Checkout | Labeled fields and recoverable validation |

## Concept checklist

- [x] Premium visual direction established
- [x] Product discovery and bag flow mapped
- [x] Mobile checkout hierarchy specified
- [ ] Production catalogue connected
- [ ] Payment provider connected
- [ ] Repository and live store published
`,
  servicespark: `# ServiceSpark

> Local concept fixture. No public repository is attached.

ServiceSpark explores how a local home-service business can explain its offer quickly and make mobile enquiries feel straightforward.

## The design question

How can the page reduce uncertainty before a visitor makes contact?

## Decisions explored

- Lead with the service promise instead of company history.
- Keep the mobile enquiry path visible and easy to reach.
- Use clear field labels and useful validation feedback.
- Reserve visual emphasis for the next action.

## Front-end focus

| Area | Approach |
| --- | --- |
| Structure | Semantic Next.js page sections |
| Styling | Responsive Tailwind CSS tokens |
| Forms | Labeled inputs and inline recovery guidance |
| Performance | Local media with reserved dimensions |

## Concept checklist

- [x] Message hierarchy mapped
- [x] Mobile enquiry flow planned
- [x] Accessible field states specified
- [ ] Real business content supplied
- [ ] Repository published
`,
  focusflow: `# FocusFlow

> Local concept fixture. No public repository is attached.

FocusFlow is a calm task-planning concept centered on priorities, progress, and the next useful action.

## The design question

How can a planning interface show enough state to be useful without making the user manage the interface itself?

## Decisions explored

- Keep the current priority visually dominant.
- Pair every status change with immediate feedback.
- Collapse secondary detail before reducing text size.
- Preserve the same task order across pointer, touch, and keyboard use.

## Example state model

\`\`\`ts
type TaskState = "planned" | "active" | "complete";
\`\`\`

## Concept checklist

- [x] Responsive information hierarchy mapped
- [x] Empty and completion states described
- [x] Keyboard interaction considered
- [ ] Production data model selected
- [ ] Repository published
`,
  tableready: `# TableReady

> Local concept fixture. No public repository is attached.

TableReady explores restaurant discovery and reservation through availability, readable choices, and a short booking flow.

## The design question

How can the interface preserve atmosphere while making booking constraints unmistakable?

## Decisions explored

- Show availability before asking for personal details.
- Keep date, time, and party size editable without restarting.
- Use ordinary language for unavailable states.
- Keep confirmation information readable without relying on color.

## Interaction priorities

1. Choose a restaurant.
2. Check a time.
3. Confirm the party details.
4. Review the reservation before submission.

## Concept checklist

- [x] Booking sequence mapped
- [x] Unavailable and error states written
- [x] Touch targets planned
- [ ] Restaurant data source selected
- [ ] Repository published
`,
};

export function getProjectNotes(projectId: ProjectId) {
  return notes[projectId];
}
