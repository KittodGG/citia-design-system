---
title: Feedback pattern
group: patterns
order: 5
summary: A decision tree for choosing inline message, alert, banner, toast or dialog, with severity, timing and rules for actions.
---

The system speaks to people in five ways. Choosing the right one is a question of how much the message interrupts and how long it must stay. Components: [Alert](./alert.md), [Banner](./banner.md), [Toast](./toast.md), [Dialog](./dialog.md), [Alert dialog](./alert-dialog.md), [Validation](./validation.md).

## Decision tree

Ask in order and stop at the first yes.

1. Is it about one field? Use an **inline message** under the field (`.ds-field-error`, `.ds-hint`).
2. Does the user have to decide before anything else can happen? Use a **dialog** ([Alert dialog](./alert-dialog.md) for a destructive or irreversible choice).
3. Is it about the whole application or account and still true until fixed (offline, maintenance, expired plan)? Use a **banner** at the top of the page.
4. Is it a result of something the user just did, which needs no reply? Use a **toast**.
5. Is it about a block of content on this page (a form, a table, a section)? Use an **alert** in that block.

| Type | Interrupts | Stays | Example |
| --- | --- | --- | --- |
| Inline | No | Until fixed | "Enter an email address like name@example.com." |
| Alert | No | While true | "Payment provider is slow. Invoices may take a few minutes." above the invoice table |
| Banner | No | While true, dismissible if not critical | "Scheduled maintenance on 08 Nov, 01:00–03:00." |
| Toast | No | 4–8 s | "Project saved" |
| Dialog | Yes, modal | Until answered | "Delete PRJ-1024?" |

## Severity

| Tone | Meaning | Icon | Use |
| --- | --- | --- | --- |
| Info | Something to know | `info` | Neutral facts, tips, status that needs no action |
| Success | It worked | `check-circle` | Completed actions, only when confirmation helps |
| Warning | It may go wrong | `alert` | A risk or a state that needs attention soon |
| Error | It did not work | `x-circle` | A failure and what to do about it |

Severity is always carried by the words and an icon as well as the colour. The tone only supports the message (WCAG 1.4.1). Use the lowest severity that is true; a screen full of warnings teaches people to ignore them.

```html preview title="One message in each severity"
<div class="ds-grid-2">
  <div class="ds-note is-info"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg><p>Invoices are sent every day at 08:00.</p></div>
  <div class="ds-note is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg><p>Invoice INV-2026-0418 was sent.</p></div>
  <div class="ds-note is-warning"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg><p>The card on file expires on 30 Nov.</p></div>
  <div class="ds-note is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><p>Payment failed. Ask the customer for another card.</p></div>
</div>
```

## Timing

- A toast stays 4 to 8 seconds: 4 for a short success ("Copied"), 6 for the default, 8 when it has an action or a longer sentence. The timer pauses on hover and focus and the toast never moves under the pointer.
- A toast with an action (Undo, View) stays at least 8 seconds, and the action remains available from the notification centre afterwards.
- Errors do not time out: show them as an alert, a banner or a dialog, not a toast.
- Show a busy indicator after 300ms, not before. Show success feedback for 1.6 to 2 seconds on the control itself (a button that shows a check after copying).
- Live regions: success and info use `role="status"` (polite); errors use `role="alert"` (assertive). Do not announce the same message twice.

## Actions stay

A message with an action keeps that action available until the user acts or the condition ends.

- Never remove an Undo, Retry or View action by a timeout shorter than 8 seconds.
- A banner that asks for something ("Verify your email") stays until it is done; Dismiss is offered only for optional messages and remembers the choice.
- Put at most one action in a toast and two in an alert; the primary one first. Name the action ("Undo", "Try again", "View invoice"), never "OK" or "Click here".
- A dialog always has a way out: a Cancel action, the close button and Escape, except when the choice is genuinely forced.

## Writing the message

State what happened, then what to do. One or two sentences. Examples and tone are in [Writing](./writing.md).

| Instead of | Write |
| --- | --- |
| "Error 500" | "Something went wrong on our side. Try again in a moment." |
| "Success!" | "Project saved" |
| "Invalid input" | "Enter a date like 25 Jan 2026." |

## Usage

- Do place a message next to the thing it is about.
- Do use one message per cause; group several field errors in a summary.
- Do not use a toast for errors that need action, or for anything the user must read.
- Do not use a modal dialog for information; use an alert or a banner.
- Do not show more than 3 toasts at once; queue the rest.
