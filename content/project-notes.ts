import type { ProjectId } from "./site";

const notes: Record<ProjectId, string> = {
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
