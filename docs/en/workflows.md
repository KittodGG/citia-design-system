---
title: Workflows
group: patterns
order: 4
summary: Multi-step flows, approvals, long-running jobs with progress, and when to offer undo instead of a confirmation.
---

A workflow is a task that spans more than one screen or more than one moment. This page covers the save cycle, multi-step flows, approvals, long-running jobs and the choice between undo and confirmation. Related: [Forms pattern](./forms-pattern.md), [Feedback pattern](./feedback-pattern.md), [Stepper](./stepper.md), [Progress](./progress.md), [Alert dialog](./alert-dialog.md).

## Save, redirect, toast

Every successful write follows Post/Redirect/Get: the server saves, queues a toast and redirects to the page that shows the result. A refresh then never re-posts, and the toast confirms what happened.

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Save(ProjectForm form)
{
    if (!ModelState.IsValid) return View("Form", form);
    await _projects.SaveAsync(form);
    this.Toast(Tone.Success, "Project saved", $"{form.Code} is ready.");
    return RedirectToAction(nameof(Index));
}
```

Send people back where they came from with a local `returnUrl` (validate it with `Url.IsLocalUrl`); do not use `history.back()`, which can leave the application.

## Multi-step flows

- Show the steps with [Stepper](./stepper.md); the current step has `aria-current="step"`, completed steps are links, future steps are not.
- One decision per step. Put the next action on the end side and Back on the start side.
- Keep state on the server or in the URL, not only in the page, so a reload or the back button returns to the same step with the same answers.
- End with a result screen that says what was created and offers the next likely action ("View project", "Create another").

## Approvals

An approval is a decision made by someone other than the requester. Design for both people.

| Role | Needs | Design |
| --- | --- | --- |
| Requester | To know the state and what to do next | A status [pill](./status.md) on the record ("Awaiting approval"), who must approve, and since when; a "Withdraw request" action while pending |
| Approver | The facts to decide, and one clear action each way | The request summary, the change (before and after), the approve and reject actions side by side; Reject asks for a reason |
| Both | A trail | A history feed with who, what and when, in absolute time |

States are named for the situation, not the system: Draft, Awaiting approval, Approved, Rejected, Withdrawn. Rejected shows the reason and a "Revise and resubmit" action. Approve is the primary button; Reject is a secondary button that opens a dialog with a required reason.

## Long-running jobs

Anything slower than about 1 second needs a response; anything slower than about 10 seconds needs progress.

| Duration | Response |
| --- | --- |
| Under 300ms | None; do not flash a spinner |
| 300ms to 1s | Busy button (spinner, same width, `aria-busy`) |
| 1 to 10s | Busy state plus a label of what is happening ("Generating report…") |
| Over 10s or unknown | Move to the background: start the job, show a [Progress](./progress.md) bar or a status row, and let people leave |

Rules for a background job:

- Show determinate progress with a number when the total is known ("340 of 1,200 rows"), indeterminate progress otherwise, plus the current step in words.
- Provide Cancel while it is safe to cancel, and say what Cancel does to work already done.
- Persist the job on the server; show it again when the user returns. Notify on completion with a [Toast](./toast.md) if they are still in the app and with a [notification](./notification-center.md) if they left.
- On failure say what failed, what was kept and what to do ("12 rows were skipped. Download the list of skipped rows"). Offer Retry.
- Announce progress to assistive technology politely and rarely: at the start, at completion and on failure, not on every percent.

```html preview title="Job with progress"
<div class="ds-card" style="max-inline-size:32rem">
  <div class="ds-card-body">
    <p><strong>Importing customers</strong></p>
    <progress class="progress progress-primary" value="340" max="1200" aria-label="Importing customers"></progress>
    <p class="ds-text-subtle" role="status">340 of 1,200 rows · about 2 minutes left</p>
    <div class="ds-actions is-start"><button type="button" class="btn btn-sm">Cancel import</button></div>
  </div>
</div>
```

## Undo or confirm

| Use | When | Example |
| --- | --- | --- |
| Undo (act, then offer to reverse) | The action is reversible and frequent, and the cost of a mistake is small | Archive a row, remove a tag, move to trash. Toast: "Project archived" with an Undo action that stays for 8s |
| Confirm (ask first) | The action cannot be undone, has side effects outside the system, or affects many records | Delete forever, send to a customer, bulk delete, revoke access |
| Neither | The action is trivial and harmless | Toggle a filter, sort a column |

A confirmation dialog states the object and the consequence, and names the button for the action: "Delete PRJ-1024" and "Keep project", not "Yes" and "No". The destructive button is not the default focus; focus starts on Cancel. Use `data-ds-confirm` on a link or button, or `DS.confirm()` from script.

```cshtml
<form method="post" asp-action="Delete" asp-route-id="@project.Id"
      data-ds-confirm="Delete PRJ-1024?"
      data-ds-confirm-text="The project and its 3 linked invoices are deleted. This cannot be undone."
      data-ds-confirm-label="Delete project" data-ds-confirm-tone="danger">
    <button class="btn btn-ghost is-danger">Delete</button>
</form>
```

Do not stack both: if an undo exists, do not also ask first.

## Sending to an outside service

Actions that leave your system (email a customer, post to a payment provider, call an API) are confirmed first and must be safe to repeat:

- Use `data-ds-once` so the form posts once; give the server an idempotency key so a second post is ignored.
- Show the result of the call, not only that the request was sent ("Invoice INV-2026-0418 sent to daniel.okafor@example.com").
- If the outcome is unknown (timeout), say so and offer a way to check, never claim success or failure.

## Usage

- Do redirect after every successful write and confirm with a toast.
- Do show progress with numbers when the total is known.
- Do give long jobs a Cancel and a way back.
- Do not ask confirmation for reversible actions; offer Undo.
- Do not use "Are you sure?"; state the consequence.
