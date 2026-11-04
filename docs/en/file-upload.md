---
title: File upload
group: components
category: forms
order: 35
summary: A dropzone with click, keyboard, drag and paste, per-file checks for type, size and count, thumbnails, progress, remove and retry, plus an avatar variant.
source: TPS .excel-dropzone / .excel-file (app.css L574–594)
---

A file upload lets people attach files to a form: receipts on an expense, contracts on a project, a spreadsheet to import. The dropzone accepts a click, Enter or Space, a drag and drop, and a paste. Each file appears in a list with its type icon or a thumbnail, its size, and its own error when it breaks a rule, so one wrong file never discards the others. Files either travel with the form (a normal `multipart/form-data` post) or upload one by one with progress to an endpoint you name. For a profile photo, use the avatar variant.

The server renders a `label.ds-dropzone` around a native `input type="file"`. That is a working upload without JavaScript.

## Examples

### Attach with the form

The files post with the form under the input's `name`. Adding more files adds to the list instead of replacing it.

```html preview title="Receipts"
<div class="ds-field" style="max-width:34rem">
  <label for="up-receipts">Receipts</label>
  <div class="ds-file-upload" data-ds-upload data-ds-upload-max-size="10 MB" data-ds-upload-max-files="5">
    <label class="ds-dropzone">
      <input id="up-receipts" class="ds-dropzone__input" type="file" name="Receipts" multiple accept=".pdf,.xlsx,image/*" aria-describedby="up-receipts-hint">
      <span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span>
      <span class="ds-dropzone__text">
        <span class="ds-dropzone__title"><span class="ds-dropzone__browse">Choose files</span> or drag them here</span>
        <span class="ds-dropzone__hint" id="up-receipts-hint">PDF, XLSX or images, up to 10 MB each, 5 files at most</span>
      </span>
    </label>
    <ul class="ds-file-list" aria-label="Selected files"></ul>
  </div>
</div>
```

### File rows

What the list shows for each state. ds.js builds these rows; the markup is shown here so the states can be seen without adding files.

```html preview title="Ready, uploading, done, invalid, failed"
<ul class="ds-file-list" style="max-width:34rem">
  <li class="ds-file" data-state="ready">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">INV-2026-0418.pdf</span><span class="ds-file__meta">248 kB · PDF</span></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Remove INV-2026-0418.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="uploading">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">PRJ-1024 timesheet October 2026.xlsx</span><span class="ds-file__meta">1.8 MB · Uploading 64%</span><progress class="ds-file__progress" max="100" value="64" aria-label="Uploading 64%"></progress></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Cancel upload of PRJ-1024 timesheet October 2026.xlsx"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="done">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-image"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">site-visit-mei-tanaka.jpg</span><span class="ds-file__meta is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>3.2 MB · Uploaded</span></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Remove site-visit-mei-tanaka.jpg"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="invalid">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">contract-draft.pages</span><span class="ds-file__meta is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>This file type is not accepted. Use PDF, XLSX, images.</span></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Remove contract-draft.pages"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="error">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">signed-scope-daniel-okafor.pdf</span><span class="ds-file__meta is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>Upload failed. Check the connection and try again.</span></div>
    <div class="ds-file__actions">
      <button type="button" class="ds-file__action" aria-label="Retry signed-scope-daniel-okafor.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
      <button type="button" class="ds-file__action is-remove" aria-label="Remove signed-scope-daniel-okafor.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
    </div>
  </li>
</ul>
```

### Upload at once, with progress

With `data-ds-upload-url` each file is sent by itself (3 at a time) as soon as it is added, with progress, cancel and retry. The endpoint answers JSON such as `{ "id": "f_81c2" }`; ds.js adds a hidden input per file (`data-ds-upload-field`, default the input name plus `Ids`) so the form posts the ids, not the files. The antiforgery token of the form is sent as the `RequestVerificationToken` header. Submitting while files are still uploading is blocked with a message.

> [!NOTE]
> This documentation site has no `/api/files` endpoint, so files added below end in the failed state with Retry and Remove. That is the state a real network error shows.

```html preview title="Compact, uploads immediately"
<div class="ds-file-upload" data-ds-upload data-ds-upload-url="/api/files" data-ds-upload-field="AttachmentIds" data-ds-upload-max-size="25 MB" style="max-width:34rem">
  <label class="ds-dropzone is-compact">
    <input class="ds-dropzone__input" type="file" name="Attachments" multiple aria-label="Attachments">
    <span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-paperclip"></use></svg></span>
    <span class="ds-dropzone__text">
      <span class="ds-dropzone__title"><span class="ds-dropzone__browse">Attach files</span> or drop them here</span>
      <span class="ds-dropzone__hint">Any type, up to 25 MB each</span>
    </span>
  </label>
  <ul class="ds-file-list" aria-label="Attachments"></ul>
</div>
```

### Avatar

A round preview with Change and Remove. A chosen image shows at once; Remove sets the hidden `RemovePhoto` field to `true` so the server can delete the stored photo. An image can also be dropped on the preview.

```html preview title="Profile photo"
<div class="ds-avatar-upload" data-ds-upload="avatar" data-ds-upload-max-size="2 MB">
  <span class="ds-avatar-upload__preview"><span aria-hidden="true">AL</span></span>
  <div class="ds-avatar-upload__body">
    <p class="ds-avatar-upload__title" id="up-photo-title">Profile photo</p>
    <p class="ds-hint" id="up-photo-hint">JPG, PNG or WebP, square, up to 2 MB.</p>
    <div class="ds-avatar-upload__actions">
      <label class="btn btn-sm">
        <input type="file" id="up-photo" name="Photo" accept="image/jpeg,image/png,image/webp" aria-labelledby="up-photo-action up-photo-title" aria-describedby="up-photo-hint">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-camera"></use></svg><span id="up-photo-action">Upload photo</span>
      </label>
      <button type="button" class="btn btn-ghost btn-sm" data-ds-upload-remove hidden>Remove</button>
      <input type="hidden" name="RemovePhoto" value="false" data-ds-upload-removed>
    </div>
    <p class="ds-field-error"></p>
  </div>
</div>
```

## States

```html preview title="Dropzone states"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:1rem">
  <label class="ds-dropzone"><input class="ds-dropzone__input" type="file" aria-label="Rest"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Rest</span><span class="ds-dropzone__hint">Click, drop or paste</span></label>
  <label class="ds-dropzone" data-dragging><input class="ds-dropzone__input" type="file" aria-label="File on the page"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">File on the page</span><span class="ds-dropzone__hint">data-dragging</span></label>
  <label class="ds-dropzone" data-drop-target><input class="ds-dropzone__input" type="file" aria-label="Over the zone"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Over the zone</span><span class="ds-dropzone__hint">data-drop-target</span></label>
  <label class="ds-dropzone"><input class="ds-dropzone__input" type="file" aria-label="Invalid" aria-invalid="true"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Invalid</span><span class="ds-dropzone__hint">Server or required error</span></label>
  <label class="ds-dropzone"><input class="ds-dropzone__input" type="file" aria-label="Disabled" disabled><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Disabled</span><span class="ds-dropzone__hint">Not accepting files</span></label>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | — | Dashed 1px `--ds-control-border`, quiet surface, tonal icon disc, primary "Choose files" link |
| Hover | Pointer over the zone | Border towards primary, state layer on the surface, link underline solid |
| Pressed | Pointer down | Pressed state layer |
| Focus-visible | Tab to the hidden input | 2px `--ds-focus` ring around the whole zone |
| File on the page | A file is dragged anywhere in the window (`data-dragging`) | Primary-tinted border and a light tint, so people see where to drop |
| Drag over | The file is over the zone (`data-drop-target`) | Dashed primary border, `--ds-opacity-state-drag` tint, icon lifts 5px |
| Invalid | `aria-invalid` or `input-validation-error` on the input | Error border; message under the field |
| Disabled | `disabled` on the input | `--ds-opacity-disabled`, `not-allowed`, drops refused |
| Busy | Uploads running (`aria-busy="true"` on `.ds-file-upload`) | Progress cursor; form submit blocked with "Wait until the files finish uploading." |
| Row: ready | Valid file, form-post mode | Size and type |
| Row: waiting / uploading | URL mode | "Waiting", then "Uploading 64%" and a 4px bar that appears after 300ms |
| Row: done | Server answered 2xx | Check icon and "Uploaded" in success text |
| Row: invalid | Wrong type, too large, empty, over the count | Error tint and the reason; not posted; Remove only |
| Row: failed | Network error or 4xx/5xx | Error tint, the server's message or a default, Retry and Remove |
| Avatar: drag over | Image over the preview | Dashed primary ring and tint |

## Anatomy

- `.ds-file-upload` — wrapper with `data-ds-upload`.
- `.ds-dropzone` — the `label`; `.is-compact` for one row. Parts: `.ds-dropzone__input`, `__icon`, `__text`, `__title`, `__browse`, `__hint`.
- `.ds-file-list` — the list (`aria-label`), hidden when empty.
- `.ds-file` — a row with `data-state`; parts `__thumb`, `__body`, `__name`, `__meta` (`.is-error`, `.is-success`), `__progress`, `__actions`, `__action` (`.is-remove`).
- `.ds-avatar-upload` — `__preview`, `__body`, `__title`, `__actions`; `.is-lg` for 96px.

## Usage

- State the accepted types and the size limit in the hint ("PDF or XLSX, up to 10 MB each") and set the same values in `accept` and `data-ds-upload-max-size`.
- Check type and size on the server as well; `accept` is a filter in the dialog, not a security control.
- Use the URL mode for files over 10 MB or more than 5 files, so a failed file can be retried without resending the form.
- Keep one dropzone per form section. Use `data-ds-upload-paste="page"` only when it is the only uploader on the page.
- Do not hide the native input with `display: none`; it must stay focusable.

## Accessibility

| Key | Action |
| --- | --- |
| Tab | Focus the zone (its hidden file input) |
| Enter / Space | Open the file dialog |
| Ctrl + V / Cmd + V | Paste files from the clipboard when focus is inside the uploader |
| Tab in the list | Retry and Remove buttons of each row |

- The input is named by the field label plus the dropzone text, and described by the hint.
- A polite status region announces "2 files added.", "INV-2026-0418.pdf removed.", "… uploaded." and each rejection with its reason.
- After Remove, focus moves to the next row's Remove button, or back to the zone.
- Every row error is text with an icon; colour is never the only signal. Buttons have a 44px hit area on touch screens.
- Rows enter with a 5px fade (220ms). With reduced motion only the fade stays.

## Razor

```cshtml
<ds-field asp-for="Receipts">
    <ds-file-upload asp-for="Receipts" accept=".pdf,.xlsx,image/*" max-size="10 MB" max-files="5" />
</ds-field>

<ds-file-upload asp-for="Attachments" upload-url="/api/files" upload-field="AttachmentIds" compact />

<ds-avatar-upload asp-for="Photo" src="@Model.PhotoUrl" initials="AL" remove-name="RemovePhoto" max-size="2 MB" />
```

`ds-file-upload` writes the dropzone with a localized title ("Choose files or drag them here") and a hint built from `accept` and `max-size` ("PDF, XLSX, images, up to 10 MB each") unless you pass `title` or `hint`. An `IFormFile` collection model, `multiple` or `max-files` above 1 allows several files. Model state errors set `aria-invalid` and `input-validation-error`. Options: `name`, `id`, `accept`, `max-size`, `max-files`, `multiple`, `upload-url`, `upload-field`, `upload-param`, `paste-page`, `title`, `hint`, `icon`, `compact`, `required`, `disabled`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-upload` | Enhance the uploader around a file input; `="avatar"` for the avatar variant |
| `data-ds-upload-max-size` | `10 MB`, `500 KB` or bytes |
| `data-ds-upload-max-files` | Highest number of valid files |
| `data-ds-upload-url` | Upload each file to this URL with progress (POST, multipart) |
| `data-ds-upload-field` | Name of the hidden id inputs (default: input name + `Ids`) |
| `data-ds-upload-param` | Form field name of the file in the upload request (default `file`) |
| `data-ds-upload-paste="page"` | Accept pasted files anywhere on the page |
| `data-ds-upload-remove`, `data-ds-upload-removed` | Avatar: the Remove button and the hidden flag it sets |

Events (bubbling): `ds:upload:add` (`detail.files`), `ds:upload:remove`, `ds:upload:done` (`detail.file`, `detail.response`), `ds:upload:error` (`detail.status`). API: `DS.upload.files(el)`, `DS.upload.add(el, files)`, `DS.upload.clear(el)`, `DS.upload.formatSize(bytes, "id")`.

```js
document.addEventListener("ds:upload:done", (event) => {
  console.log(event.detail.file.name, event.detail.response.id);
});
```

A file dropped beside a dropzone is ignored instead of opening in the tab, so a half-filled form is never lost.

## Tokens

`--ds-control-border`, `--color-primary`, `--ds-primary-soft`, `--ds-primary-text`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-drag`, `--ds-error-soft`, `--ds-error-text`, `--ds-success-text`, `--ds-radius-card`, `--ds-radius-xl`, `--ds-radius-md`, `--ds-radius-full`, `--ds-duration-fast`, `--ds-duration-enter`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`, `--ds-enter-offset`, `--ds-press-scale`, `--ds-size-target`, `--ds-focus`, `--ds-type-callout-*`, `--ds-type-footnote-*`, `--ds-type-caption-*`.

## Native and daisyUI

Built on `input type="file"` inside a `label`, which already opens the dialog on click, Enter and Space and posts without JavaScript. ds.js keeps the input's `FileList` in step with the list (through `DataTransfer`), so a normal submit sends exactly the valid files. daisyUI's `.file-input` is not used: a dropzone needs room for the drag target and the list. The avatar buttons are daisyUI `btn btn-sm` and `btn-ghost`.
