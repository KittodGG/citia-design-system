---
title: Native elements
group: reference
order: 1
summary: Every HTML element in the design-system look without a class: text, lists, tables, code, media, disclosure, dialog and every form control with all states.
---

Plain HTML already looks right. `native.css` styles every element in the `base` layer, so a Markdown page, a CMS snippet or a quick admin form needs no classes, and every component class (`.btn`, `.input`, `.ds-card`) still wins because components sit in later layers. Use this page to check how an element renders before you reach for a component. For long-form content with vertical rhythm, wrap it in [prose](./prose.md). For the daisyUI classes, see [daisyUI alignment](./daisyui.md). [Bahasa Indonesia](../id/native-elements.md).

Two scopes apply:

- **Text-level elements** (headings, inline semantics, code, quotes, rules, media) are styled everywhere.
- **Structural and interactive elements** (lists, bare links, tables, `details`, `dialog`, every form control) are styled only when they are *bare*: no `ds-*` class, no BEM part class (`__`), no daisyUI class, and not inside a component that draws them (`.input`, `.select`, `.join`, `.menu`, `.swap`, `.collapse`, `.tabs`, `.dock`, `*-input`, `*combobox*`, `*picker*`, `*segmented*`, `*otp*`). Bare buttons also skip `role="group"`, `toolbar`, `tablist`, `menu`, `menubar`, `listbox` and `radiogroup` containers. Add `.ds-unstyled` or `data-ds-unstyled` to a container to opt out entirely.

Margins stay at zero, as in Tailwind: components own their spacing. Inside [prose](./prose.md), blocks get a 1.25em rhythm.

## Examples

### Headings and paragraphs

Headings map to the type roles: `h1` title 1, `h2` title 2, `h3` title 3, `h4` headline, `h5` section, `h6` card title. Headings balance their lines; paragraphs avoid single-word last lines (`text-wrap: pretty`).

```html preview title="h1 to h6 and running text"
<div style="display:grid;gap:0.75rem">
  <h1>Quarterly review, Q3 2026</h1>
  <h2>Delivery performance</h2>
  <h3>Projects closed on time</h3>
  <h4>PRJ-1024 warehouse migration</h4>
  <h5>Scope and owners</h5>
  <h6>Last updated 30 October 2026</h6>
  <p>Ayu Lestari closed 14 of 16 projects on schedule. The two late projects, PRJ-1031 and PRJ-1040, slipped by 3 and 5 working days because supplier documents arrived after the agreed cut-off.</p>
  <p><small>Figures exclude projects paused by the client.</small></p>
</div>
```

### Inline semantics

```html preview title="Phrase elements"
<div style="display:grid;gap:0.5rem;max-width:44rem">
  <p><strong>Strong</strong> marks importance (weight 650); <b>b</b> draws attention without extra meaning. <em>Emphasis</em> and <i>idiomatic text</i> are italic.</p>
  <p>Search matched <mark>INV-2026-0418</mark> in 3 documents. The <abbr title="Value-added tax">VAT</abbr> rate is 11%.</p>
  <p>Due date <del>14 November</del> <ins>21 November 2026</ins>. <s>Free shipping on every order</s> applies above Rp 500.000 only.</p>
  <p>H<sub>2</sub>O, 10<sup>3</sup> units, footnote<sup>1</sup>. <u>Underline</u> for annotations, never for emphasis.</p>
  <p>Mei Tanaka wrote <q>Ship the pilot first, then scale</q> in <cite>Operations Handbook 2026</cite>.</p>
  <p>A <dfn>billing cycle</dfn> is the period between two invoices. Posted <time datetime="2026-10-30T09:15">30 Oct 2026, 09:15</time>.</p>
  <p>Set <var>n</var> to the batch size. The server answered <samp>HTTP 409 Conflict</samp>. Press <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd><kbd>Shift</kbd>+<kbd>?</kbd></kbd>. Run <code>dotnet ef database update</code>.</p>
  <p>Customer: <bdi>سارة الأحمد</bdi> placed 2 orders. Total <data value="1250000">Rp 1.250.000</data>.</p>
</div>
```

### Links

Bare links get the link colour and a 1px underline at 55% strength; hover draws it at full strength and 2px, press deepens the colour, keyboard focus adds the ring. Links inside `nav`, menus, tab lists and toolbars are left to their component.

```html preview title="Link states"
<div style="display:grid;gap:0.5rem">
  <p>Read the <a href="#ne-links">refund policy</a> before you approve INV-2026-0418.</p>
  <p>Open <a href="https://example.com/projects/PRJ-1024">PRJ-1024 in the project portal</a> (external).</p>
  <p>Export <a>archive.zip</a> becomes a link after the nightly job (an <code>a</code> without <code>href</code> is plain text).</p>
</div>
```

### Lists

```html preview title="Unordered, ordered and description lists"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
  <ul>
    <li>Upload the signed contract</li>
    <li>Confirm billing contacts
      <ul>
        <li>Sofia Marquez, finance</li>
        <li>Daniel Okafor, procurement</li>
      </ul>
    </li>
    <li>Schedule the kickoff</li>
  </ul>
  <ol>
    <li>Draft the invoice</li>
    <li>Review line items
      <ol>
        <li>Quantities</li>
        <li>Tax codes</li>
      </ol>
    </li>
    <li>Send to the client</li>
  </ol>
  <dl>
    <dt>Project</dt>
    <dd>PRJ-1024 Warehouse migration</dd>
    <dt>Owner</dt>
    <dd>Ayu Lestari</dd>
    <dt>Budget</dt>
    <dd>Rp 420.000.000</dd>
  </dl>
</div>
```

### Quotes, figures and rules

```html preview title="blockquote, figure, figcaption, hr"
<div style="display:grid;gap:1.25rem;max-width:40rem">
  <blockquote>
    <p>The new approval flow cut our invoice cycle from nine days to four.</p>
    <footer>Sofia Marquez, Finance Lead</footer>
  </blockquote>
  <hr>
  <figure>
    <img src="/images/citia-engineering.png" alt="Citia Engineering logo" width="180">
    <figcaption>Figure 1. Logo on the light surface, 180px wide.</figcaption>
  </figure>
</div>
```

### Tables

A bare `table` gets hairline rows, an uppercase header, a quiet caption, a total row in `tfoot`, tabular numbers and a row hover on pointer devices. For sorting, selection and density use [table](./table.md).

```html preview title="Bare table with caption, header and footer"
<table>
  <caption>Open invoices, October 2026</caption>
  <thead>
    <tr><th scope="col">Invoice</th><th scope="col">Client</th><th scope="col">Due</th><th scope="col" data-type="number">Amount (Rp)</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">INV-2026-0418</th><td>Lestari Textiles</td><td><time datetime="2026-11-14">14 Nov 2026</time></td><td data-type="number">12.500.000</td></tr>
    <tr aria-selected="true"><th scope="row">INV-2026-0421</th><td>Okafor Logistics</td><td><time datetime="2026-11-18">18 Nov 2026</time></td><td data-type="number">8.240.000</td></tr>
    <tr><th scope="row">INV-2026-0427</th><td>Tanaka Studio</td><td><time datetime="2026-11-30">30 Nov 2026</time></td><td data-type="number">3.900.000</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row" colspan="3">Total</th><td data-type="number">24.640.000</td></tr>
  </tfoot>
</table>
```

### Code and preformatted text

```html preview title="code, pre, kbd, samp"
<div style="display:grid;gap:1rem;max-width:44rem">
  <p>Call <code>DS.toast({ tone: "success" })</code> after the save resolves.</p>
  <pre><code>{
  "invoice": "INV-2026-0418",
  "amount": 12500000,
  "currency": "IDR"
}</code></pre>
  <p>Shortcut: <kbd>Ctrl</kbd> + <kbd>S</kbd>. Output: <samp>3 rows updated</samp>.</p>
</div>
```

### Details and summary

The marker becomes a chevron at the end that turns 180° when open. Where `::details-content` is supported (Chromium 131+), the panel grows with `interpolate-size` in 240ms and closes in 140ms; other browsers open instantly.

```html preview title="Disclosure"
<div style="display:grid;gap:0.25rem;max-width:36rem">
  <details>
    <summary>Why was PRJ-1031 late?</summary>
    <p>Supplier documents arrived on 22 October, three working days after the agreed cut-off.</p>
  </details>
  <details open>
    <summary>Who approves invoices above Rp 50.000.000?</summary>
    <p>Sofia Marquez approves; Daniel Okafor is the backup approver while she is away.</p>
  </details>
</div>
```

### Dialog

A bare `dialog` is a 34rem card on the scrim. It fades and scales from 98% in 180ms and leaves in 140ms (`@starting-style`, `allow-discrete`). This example opens with invoker commands, no script; use [dialog](./dialog.md) for the full component.

```html preview title="Native dialog"
<div>
  <button type="button" commandfor="ne-dialog" command="show-modal">Archive project</button>
  <dialog id="ne-dialog" aria-labelledby="ne-dialog-title">
    <h2 id="ne-dialog-title">Archive PRJ-1024?</h2>
    <p style="margin-block:0.75rem 1.5rem">The project moves to the archive. Invoices stay available in reports.</p>
    <form method="dialog" style="display:flex;gap:0.5rem;justify-content:flex-end">
      <button value="cancel">Cancel</button>
      <button type="submit" value="archive">Archive</button>
    </form>
  </dialog>
</div>
```

### Text fields

Every text-like type shares one look: 44px tall, 16px text (no zoom on iOS), 1px control border (≥ 3:1), field radius. Search has a themed clear button, number keeps its spin buttons, the date family gets a themed picker button and segment highlight.

```html preview title="Input types"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))">
  <div style="display:grid;gap:0.5rem"><label for="ne-text">Full name</label><input id="ne-text" type="text" autocomplete="name" value="Ayu Lestari"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-email">Email</label><input id="ne-email" type="email" placeholder="name@company.com" autocomplete="email"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-url">Website</label><input id="ne-url" type="url" placeholder="https://"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-tel">Phone</label><input id="ne-tel" type="tel" placeholder="+62 812 3456 7890" autocomplete="tel"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-password">Password</label><input id="ne-password" type="password" value="correct-horse" autocomplete="new-password"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-search">Search invoices</label><input id="ne-search" type="search" value="INV-2026"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-number">Quantity</label><input id="ne-number" type="number" value="12" min="0" max="999"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-date">Due date</label><input id="ne-date" type="date" value="2026-11-14"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-time">Meeting time</label><input id="ne-time" type="time" value="09:30"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-datetime">Delivery window</label><input id="ne-datetime" type="datetime-local" value="2026-11-14T13:00"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-month">Billing month</label><input id="ne-month" type="month" value="2026-11"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-week">Sprint week</label><input id="ne-week" type="week" value="2026-W45"></div>
</div>
```

### Select

Single selects use the customizable picker where `appearance: base-select` is supported (Chromium 135+): a popover panel with the menu shadow, a chevron that turns 180°, a check on the chosen option, hover and keyboard highlight. Other browsers keep the system picker with the same closed field. `multiple` and `size` render as a listbox.

```html preview title="Single, grouped and multiple select"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));align-items:start">
  <div style="display:grid;gap:0.5rem">
    <label for="ne-select">Payment terms</label>
    <select id="ne-select">
      <option>Net 14</option>
      <option selected>Net 30</option>
      <option>Net 45</option>
      <option disabled>Net 90 (needs approval)</option>
    </select>
  </div>
  <div style="display:grid;gap:0.5rem">
    <label for="ne-select-group">Assignee</label>
    <select id="ne-select-group">
      <optgroup label="Finance">
        <option>Sofia Marquez</option>
        <option>Ayu Lestari</option>
      </optgroup>
      <optgroup label="Procurement">
        <option>Daniel Okafor</option>
        <option>Mei Tanaka</option>
      </optgroup>
    </select>
  </div>
  <div style="display:grid;gap:0.5rem">
    <label for="ne-select-multi">Regions</label>
    <select id="ne-select-multi" multiple size="4">
      <option selected>Jakarta</option>
      <option>Surabaya</option>
      <option selected>Bandung</option>
      <option>Medan</option>
    </select>
  </div>
</div>
```

### Textarea

A bare textarea grows with its content (`field-sizing: content`) from three lines up to 24rem, then scrolls; it still resizes vertically by hand.

```html preview title="Auto-growing textarea"
<div style="display:grid;gap:0.5rem;max-width:32rem">
  <label for="ne-textarea">Notes for the client</label>
  <textarea id="ne-textarea" placeholder="Add delivery instructions, contacts or deadlines">Deliver to the loading dock at the north gate. Call Daniel Okafor 30 minutes before arrival.</textarea>
</div>
```

### Checkbox, radio and switch

18px boxes with a 24px hit area (44px on touch), a 6px state halo on hover and press, a check, dash or dot glyph drawn with borders so it survives forced colours. A checkbox with `role="switch"` becomes a switch whose thumb travels on the spring.

```html preview title="Choice controls"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))">
  <fieldset>
    <legend>Notifications</legend>
    <div style="display:grid;gap:0.5rem">
      <label><input type="checkbox" checked> Invoice paid</label>
      <label><input type="checkbox"> Invoice overdue</label>
      <label><input type="checkbox" id="ne-mixed"> All project updates</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Delivery</legend>
    <div style="display:grid;gap:0.5rem">
      <label><input type="radio" name="ne-delivery" checked> Standard, 3 to 5 days</label>
      <label><input type="radio" name="ne-delivery"> Express, next day</label>
      <label><input type="radio" name="ne-delivery" disabled> Same day (Jakarta only)</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Workspace</legend>
    <div style="display:grid;gap:0.5rem">
      <label><input type="checkbox" role="switch" checked> Email digest</label>
      <label><input type="checkbox" role="switch"> Weekend alerts</label>
      <label><input type="checkbox" role="switch" disabled> Two-factor (managed by admin)</label>
    </div>
  </fieldset>
</div>
<script>document.getElementById("ne-mixed").indeterminate = true;</script>
```

### Range, color and file

The range track fills with primary up to the thumb (`forms.js` keeps `--ds-range-fill` in sync; Firefox fills natively). The color well is a 44px square. The file button is a secondary button with press feedback.

```html preview title="Range, color, file"
<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));align-items:end">
  <div style="display:grid;gap:0.5rem">
    <label for="ne-range">Discount <output for="ne-range" id="ne-range-out">15</output>%</label>
    <input id="ne-range" type="range" min="0" max="50" value="15" oninput="document.getElementById('ne-range-out').value = this.value">
  </div>
  <div style="display:grid;gap:0.5rem;justify-items:start">
    <label for="ne-color">Brand colour</label>
    <input id="ne-color" type="color" value="#00838f">
  </div>
  <div style="display:grid;gap:0.5rem">
    <label for="ne-file">Signed contract (PDF)</label>
    <input id="ne-file" type="file" accept="application/pdf">
  </div>
</div>
```

### Buttons

A bare `button` is the secondary button; `type="submit"` is the primary action. Press scales to 97% on pointer-down. `aria-pressed="true"` shows the selected tonal fill.

```html preview title="button and input buttons"
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
  <button type="submit">Save invoice</button>
  <button type="button">Preview</button>
  <button type="button" aria-pressed="true">Show paid</button>
  <button type="reset">Reset</button>
  <input type="button" value="Duplicate">
  <input type="submit" value="Send">
  <input type="image" src="/images/citia-favicon.png" alt="Open Citia" width="44" height="44">
</div>
```

### Fieldset, legend, label and output

```html preview title="Grouped form"
<form style="max-width:34rem" oninput="document.getElementById('ne-total').value = (Number(document.getElementById('ne-qty').value) * 125000).toLocaleString('id-ID')">
  <fieldset>
    <legend>Order line</legend>
    <div style="display:grid;gap:1rem;grid-template-columns:1fr 1fr;align-items:end">
      <div style="display:grid;gap:0.5rem"><label for="ne-item">Item</label><input id="ne-item" value="Pallet wrap, 50 rolls"></div>
      <div style="display:grid;gap:0.5rem"><label for="ne-qty">Quantity</label><input id="ne-qty" type="number" value="4" min="1"></div>
    </div>
    <p style="margin-top:1rem">Line total: Rp <output id="ne-total" for="ne-qty">500.000</output></p>
  </fieldset>
</form>
```

### Progress and meter

`progress` without a value is indeterminate: a 40% segment travels across the track (stopped under reduced motion). `meter` colours follow `low`, `high` and `optimum`: optimum green, sub-optimum amber, worst red. Always print the number next to it.

```html preview title="progress and meter"
<div style="display:grid;gap:1rem;max-width:24rem">
  <div style="display:grid;gap:0.375rem"><label for="ne-progress">Upload 68%</label><progress id="ne-progress" max="100" value="68">68%</progress></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-progress-i">Preparing export</label><progress id="ne-progress-i">Preparing</progress></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-meter-good">Storage used 32%</label><meter id="ne-meter-good" min="0" max="100" low="70" high="90" optimum="10" value="32">32%</meter></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-meter-mid">Storage used 78%</label><meter id="ne-meter-mid" min="0" max="100" low="70" high="90" optimum="10" value="78">78%</meter></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-meter-bad">Storage used 95%</label><meter id="ne-meter-bad" min="0" max="100" low="70" high="90" optimum="10" value="95">95%</meter></div>
</div>
```

### Media

`img`, `video`, `canvas` and `picture` never exceed their container. Alt text renders in the footnote size, italic, subtle, so a broken image still reads. `audio` without `controls` is hidden; `iframe` has no border.

```html preview title="img, picture, video, audio, iframe, canvas, svg"
<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));align-items:start">
  <picture>
    <source srcset="/images/citia-white.png" media="(prefers-color-scheme: dark)">
    <img src="/images/citia-engineering.png" alt="Citia Engineering logo" width="200">
  </picture>
  <img src="/images/missing-chart.png" alt="Chart: invoices paid per week, weeks 41 to 45" width="220" height="80">
  <video controls width="260" aria-label="Product walkthrough (no source in this example)"></video>
  <audio controls aria-label="Voice note from Mei Tanaka (no source in this example)"></audio>
  <iframe title="Embedded receipt" srcdoc="&lt;p style='font-family:system-ui'&gt;Receipt INV-2026-0418&lt;/p&gt;" width="240" height="80"></iframe>
  <svg width="64" height="64" viewBox="0 0 24 24" role="img" aria-label="Circle"><circle cx="12" cy="12" r="10"/></svg>
</div>
```

## States

Frozen states side by side. Hover and pressed need a pointer: try them on the examples above.

```html preview title="Field, choice, button and link states"
<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));align-items:start">
  <div style="display:grid;gap:0.5rem"><label for="ne-s-rest">Rest</label><input id="ne-s-rest" placeholder="Project code"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-filled">Filled</label><input id="ne-s-filled" value="PRJ-1024"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-ro">Read-only</label><input id="ne-s-ro" value="INV-2026-0418" readonly></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-dis">Disabled</label><input id="ne-s-dis" value="Locked by Sofia Marquez" disabled></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-inv">Invalid</label><input id="ne-s-inv" value="ayu@" aria-invalid="true" aria-describedby="ne-s-inv-msg"><small id="ne-s-inv-msg" style="color:var(--ds-error-text)">Enter a full email address, for example ayu@lestari.co.id.</small></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-ok">Success</label><input id="ne-s-ok" value="PRJ-1050" data-state="success" aria-describedby="ne-s-ok-msg"><small id="ne-s-ok-msg">Code is available.</small></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-busy">Busy</label><input id="ne-s-busy" value="Checking PRJ-1051" aria-busy="true"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-sel-dis">Disabled select</label><select id="ne-s-sel-dis" disabled><option>Net 30</option></select></div>
  <div style="display:grid;gap:0.5rem">
    <label><input type="checkbox"> Unchecked</label>
    <label><input type="checkbox" checked> Checked</label>
    <label><input type="checkbox" id="ne-s-mixed"> Indeterminate</label>
    <label><input type="checkbox" checked disabled> Checked, disabled</label>
    <label><input type="checkbox" aria-invalid="true"> Invalid (required)</label>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
    <button type="button">Rest</button>
    <button type="button" aria-pressed="true">Selected</button>
    <button type="button" aria-expanded="true">Expanded</button>
    <button type="button" disabled>Disabled</button>
    <button type="button" aria-disabled="true" title="Available after approval">Aria-disabled</button>
    <button type="submit" aria-busy="true">Saving…</button>
  </div>
  <p><a href="#ne-states">Rest link</a>, <a>placeholder link without href</a>.</p>
</div>
<script>document.getElementById("ne-s-mixed").indeterminate = true;</script>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | Field: base-100 surface, 1px `--ds-control-border`, field radius. Button: same surface, weight 600. Link: link colour, 1px underline at 55%. |
| Hover | `:hover` inside `@media (hover: hover)` | Field border deepens 45% towards the text colour. Button gets the 6% state layer. Choice controls get a 6px primary halo. Table rows tint 6%. Link underline goes full strength, 2px. |
| Pressed | `:active` | Button: 10% state layer and `scale(var(--ds-press-scale))` (97%). Choice halo 10%. File button scales. Link colour deepens. |
| Focus-visible | `:focus-visible` | 2px `--ds-focus` ring, 2px offset; fields also turn the border primary. Range draws the ring around the thumb. |
| Placeholder | `:placeholder-shown` | `--ds-subtle` text (75% of the text colour, ≥ 4.5:1 on the field). |
| Filled / autofill | value, `:autofill` | Autofill keeps the theme surface (no yellow or blue fill). |
| Checked / on | `:checked` | Primary fill with a white check, dot or travelled thumb. |
| Indeterminate | `.indeterminate = true`, `progress` without `value` | Checkbox: primary fill with a dash. Progress: travelling 40% segment. |
| Selected | `aria-pressed="true"`, `aria-selected="true"`, `option:checked` | 12% primary tonal fill; buttons add a primary border and `--ds-primary-text` text; options add weight 600 and a check. |
| Expanded / open | `[open]`, `aria-expanded="true"`, `select:open` | Chevron turns 180°; `details` panel grows in 240ms; dialog fades and scales in 180ms. |
| Disabled | `:disabled` | `--ds-opacity-disabled` (55%), `cursor: not-allowed`, no hover or press. |
| Aria-disabled | `aria-disabled="true"` | Same look, stays focusable; explain why in a `title` or helper text. A link with `href` and `aria-disabled` turns muted and dotted. |
| Read-only | `[readonly]` | Base-200 surface, base-300 border, normal text contrast, selectable. |
| Invalid | `:user-invalid`, `aria-invalid="true"`, `.input-validation-error` | Error border; message below in `--ds-error-text`, linked with `aria-describedby`. |
| Success / warning | `data-state="success"`, `data-state="warning"` | Success or warning border; use only for async checks. |
| Busy | `aria-busy="true"` | `cursor: progress`; `forms.js` keeps the width and adds a spinner after 300ms. |

## Usage

- Write plain HTML first. Reach for a component only when the native element cannot express the behaviour (search with suggestions, multi-select with chips, date ranges).
- Give every control a visible `label` (with `for`) or a `fieldset` with `legend`. Placeholders are hints, never labels.
- Use `type="submit"` for the one primary action of a form and plain `button` for the rest.
- Do not add a class to a native control just to change spacing: wrap it in a layout element instead. Any component class switches the native look off.
- Do not put bare controls inside another component's markup without that component's classes; if you must, add `.ds-unstyled` to the wrapper.
- Use `meter` for a measurement within a known range (storage 78%) and `progress` for completion of a task.
- Keep tables bare for small static data (up to about 20 rows). Use [table](./table.md) or [data table](./data-table.md) for sorting, selection and paging.

## Accessibility

- Focus is always visible: a 2px ring in `--ds-focus` (≥ 3:1 on both themes), never removed, and scroll padding keeps it clear of sticky bars (`--ds-sticky-top`, `--ds-sticky-bottom`).
- Hit areas are at least 24×24px, 44×44px on coarse pointers (checkbox and radio extend with a pseudo-element; fields and buttons are 44px tall).
- Text contrast: body text ≥ 4.5:1, placeholders use `--ds-subtle`, borders `--ds-control-border` ≥ 3:1.
- State is never colour alone: check, dash and dot glyphs, the switch thumb position, underlined links, weight 600 on selected options.
- Glyphs are drawn with borders, so they stay visible in Windows forced colours; focus becomes a `Highlight` outline.
- Reduced motion: chevrons, dialog scale, switch travel and details growth become 150ms fades; the indeterminate bar stops at the centre.
- A `switch` needs `role="switch"` on the checkbox; screen readers announce on/off.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move between controls, links and summaries |
| Space | Toggle checkbox and switch, press button, open select |
| Enter | Activate link or button, submit the form from a text field, toggle `details` |
| Arrow keys | Move between radios in a group, change range and number values, move in date segments and select options |
| Escape | Close the dialog or the select picker |
| Home / End | Range to minimum or maximum |

## JavaScript

Native elements need no script. `forms.js` adds optional behaviour; `guard.js` protects unsaved forms.

| Attribute | Effect |
| --- | --- |
| `input[type=range]` | `forms.js` sets `--ds-range-fill` on load and on input so the track fills up to the thumb |
| `form[data-ds-once]` | Submits once: submit buttons get `aria-disabled`, the submitter gets `aria-busy`, keeps its width, shows a spinner after 300ms |
| `data-ds-loading-label` | Busy label on the submitter; only the words change, the icon stays |
| `[data-ds-save-status]` | Receives "Saving…" / "Menyimpan…" while the form submits |
| `[data-ds-copy]`, `[data-ds-copy-text]` | Copy to the clipboard; `.is-copied` (or `.is-error`) for 1.8s, then back to rest |
| `[data-ds-password-toggle][aria-controls]` | Shows or hides a password, sets `aria-pressed`, returns focus to the field |
| `select[data-ds-autosubmit]` | Submits the form on change |
| `a[data-ds-export]` | Locks the export link with `aria-disabled` and `aria-busy` while the file is prepared |
| `form[data-ds-guard]` | Asks before leaving with unsaved changes; adds `data-ds-dirty` while the form differs from its first state |
| `[data-ds-guard-status]` | Inside a guarded form: announces "Unsaved changes" politely |

API: `DS.copyText(text)`, `DS.setBusy(element, label?)`, `DS.clearBusy(element)`, `DS.guard.allow()`, `DS.guard.reset()`. Event: `ds:guard:change` with `detail.dirty`.

## Tokens

`--color-base-100/200/300`, `--color-base-content`, `--color-primary(-content)`, `--color-success`, `--color-warning`, `--color-error`, `--ds-control-border`, `--ds-focus`, `--ds-link`, `--ds-subtle`, `--ds-muted`, `--ds-quiet`, `--ds-primary-text`, `--ds-success-text`, `--ds-error-text`, `--ds-primary-soft`, `--ds-success-soft`, `--ds-warning-soft`, `--ds-error-soft`, `--ds-popover`, `--ds-popover-border`, `--ds-popover-hover`, `--ds-scrim`, `--radius-field`, `--ds-radius-*`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-size-dialog-sm`, `--ds-shadow-xs|panel|overlay`, `--ds-opacity-state-*`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-enter-offset`, `--ds-duration-*`, `--ds-ease-*`, `--ds-type-*`. Page-level hooks: `--ds-sticky-top`, `--ds-sticky-bottom` (scroll padding), `--ds-range-fill` (set by `forms.js`).

## Native and daisyUI

`native.css` sits in the `base` layer after Tailwind preflight, so it replaces preflight's resets (headings inherit, lists unstyled, transparent buttons) with the DS look for bare elements only. daisyUI classes (`.btn`, `.input`, `.select`, `.checkbox`, `.toggle`, `.range`, `.file-input`, `.table`, `.progress`, `.kbd`, `.modal`, `.collapse`) live in the utilities layer and always win; [daisyUI alignment](./daisyui.md) lists each one. The prebuilt `ds.css` contains the same rules, so apps without Tailwind get the native look too.

Browser support: `appearance: base-select`, `::details-content`, `interpolate-size`, `field-sizing` and invoker commands are progressive. Without them, select uses the system picker, `details` opens instantly, a textarea keeps its rows and the dialog example needs a script.

Print: `details` print their content, `pre` wraps, tables repeat the header on each page, buttons and closed dialogs are hidden, and the dark theme prints with the light palette.
