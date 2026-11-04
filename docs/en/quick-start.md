---
title: Quick start
group: getting-started
order: 4
summary: Build a first page in five steps with copy-ready code: layout, page header, a form with fields, a data table and a toast after saving.
---

This walkthrough builds an invoices screen on Razor Pages: a list with a table, and a form that saves and confirms with a toast. It assumes you finished [Installation](./installation.md), so `_ViewImports` and the layout already exist.

## 1. Layout

The layout from installation is enough. For a real app, add a constrained content width so lines and tables stay readable:

```cshtml
<main id="main" class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
    @RenderBody()
</main>
```

With the precompiled `ds.css` (option A) there are no Tailwind utilities; use a small rule of your own instead:

```css
.app-content { max-width: 72rem; margin-inline: auto; padding: var(--ds-space-8) var(--ds-space-4); }
```

## 2. Page header

One title, one primary action. The eyebrow is optional context above the title.

```cshtml
@page
@model InvoicesModel
@{ ViewData["Title"] = "Invoices"; }

<header class="ds-page-header">
    <div>
        <p class="ds-eyebrow">Billing</p>
        <h1 class="ds-page-title">Invoices</h1>
    </div>
    <div class="ds-actions">
        <a asp-page="Create" class="btn btn-primary"><ds-icon name="plus" /> New invoice</a>
    </div>
</header>
```

Use one `btn-primary` per area and name the result in its label: "New invoice", not "Add".

## 3. A form with fields

Each field is a `.ds-field`: label above, control, then a hint or the error. Link them with `aria-describedby`; native validation does the rest and shows errors only after the person has interacted (`:user-invalid`).

```cshtml
@page
@model CreateModel
@{ ViewData["Title"] = "New invoice"; }

<header class="ds-page-header">
    <div>
        <p class="ds-eyebrow">Invoices</p>
        <h1 class="ds-page-title">New invoice</h1>
    </div>
</header>

<form method="post" class="ds-fieldset" data-ds-guard>
    <div class="ds-field-grid">
        <div class="ds-field">
            <label for="customer">Customer</label>
            <input id="customer" name="Customer" class="input" required autocomplete="organization"
                   value="@Model.Input.Customer" aria-describedby="customer-hint" />
            <p id="customer-hint" class="ds-hint">As it appears on the contract.</p>
        </div>

        <div class="ds-field">
            <label for="number">Invoice number</label>
            <input id="number" name="Number" class="input" required pattern="INV-\d{4}-\d{4}"
                   placeholder="INV-2026-0418" value="@Model.Input.Number" aria-describedby="number-hint" />
            <p id="number-hint" class="ds-hint">Format INV-YYYY-NNNN.</p>
        </div>

        <div class="ds-field">
            <label for="due">Due date</label>
            <input id="due" name="DueDate" type="date" class="input" required value="@Model.Input.DueDate?.ToString("yyyy-MM-dd")" />
        </div>

        <div class="ds-field">
            <label for="amount">Amount</label>
            <input id="amount" name="Amount" type="text" inputmode="decimal" class="input" required
                   value="@Model.Input.Amount" aria-describedby="amount-hint" />
            <p id="amount-hint" class="ds-hint">Total including tax.</p>
        </div>
    </div>

    <div class="ds-actions">
        <a asp-page="Index" class="btn btn-ghost">Cancel</a>
        <button type="submit" class="btn btn-primary">Save invoice</button>
    </div>
</form>
```

Order the buttons Cancel, then the primary action on the right. `data-ds-guard` asks before leaving a page with unsaved edits (it uses `_DsLeaveDialog`). On the server, return field errors next to their field:

```cshtml
<span class="ds-field-error" asp-validation-for="Input.Number"></span>
```

See [Field](./field.md), [Input](./input.md) and [Validation](./validation.md) for every state.

## 4. A data table

Numbers go right-aligned in tabular figures (`ds-num`), status is a word first (`ds-pill`), and the wrapper scrolls inside itself on narrow screens.

```cshtml
<div class="ds-table-wrap">
    <table class="ds-table">
        <caption class="ds-visually-hidden">Invoices, newest first</caption>
        <thead>
            <tr>
                <th scope="col">Number</th>
                <th scope="col">Customer</th>
                <th scope="col">Due</th>
                <th scope="col" class="ds-num">Amount</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
        @foreach (var i in Model.Invoices)
        {
            <tr>
                <th scope="row"><a asp-page="Details" asp-route-id="@i.Id">@i.Number</a></th>
                <td>@i.Customer</td>
                <td>@i.DueDate.ToString("d MMM yyyy")</td>
                <td class="ds-num">@Fmt.Decimal(i.Amount)</td>
                <td>
                    @switch (i.Status)
                    {
                        case "Paid":    <ds-pill tone="Success">Paid</ds-pill> break;
                        case "Overdue": <ds-pill tone="Error">Overdue</ds-pill> break;
                        default:        <ds-pill tone="Warning">Awaiting payment</ds-pill> break;
                    }
                </td>
            </tr>
        }
        </tbody>
    </table>
</div>

@if (!Model.Invoices.Any())
{
    <ds-empty icon="receipt" title="No invoices yet" action-label="New invoice" action-href="/Invoices/Create">
        Invoices you create appear here.
    </ds-empty>
}
```

For sorting, paging and selection see [Table](./table.md) and [Data table](./data-table.md). `Fmt.Decimal` and `ToString("d MMM yyyy")` follow the request culture, so `1,250.50` becomes `1.250,50` in Indonesian.

## 5. A toast after saving

Use Post/Redirect/Get. `this.Toast` stores the message in TempData; `_DsToast` in the layout shows it on the next page and removes it.

```csharp
public class CreateModel : PageModel
{
    [BindProperty] public InvoiceInput Input { get; set; } = new();

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid) return Page();

        // save the invoice here

        this.Toast(Tone.Success, "Invoice saved", $"{Input.Number} for {Input.Customer} is ready to send.");
        return RedirectToPage("Index");
    }
}
```

From JavaScript (after a fetch, for instance) call the same component:

```js
DS.toast({ tone: "success", title: "Invoice saved", text: "INV-2026-0418 is ready to send." });
```

Success and info toasts hide after 6 seconds; errors stay until closed. See [Toast](./toast.md).

## What you now have

A page with a header, a validated form, a table with status words and an empty state, a confirmation toast, light and dark themes, and English and Indonesian, all from tokens. Open the page with `?culture=id` and switch the theme to check both.

Next: [Theming](./theming.md) to put your brand on it, or the [component catalog](./button.md).
