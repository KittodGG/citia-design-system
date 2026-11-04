/* Form behaviour: inline validation, error summary, ASP.NET Core validation output, dirty status, view/edit mode.
   Owner: batch A4. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).
   Hooks: form[data-ds-validate] (validate on blur, re-validate on input after the first error, summary on submit),
   [data-ds-error-summary] (summary container, optional), [data-ds-validate-success] on a field (show the success state),
   data-ds-msg-<rule> on a control (custom message), [data-ds-dirty-status] inside form[data-ds-guard],
   form[data-ds-mode="view|edit"] with [data-ds-form-edit] / [data-ds-form-cancel].
   ASP.NET Core output is wired on every page: input-validation-error, field-validation-error[data-valmsg-for],
   validation-summary-errors, and the data-val-* rules of jquery-validation-unobtrusive (used as rules and messages
   when jQuery Validation is not on the page). */
import { t, addMessages, focusQuietly, uid, reduceMotion } from "../core.js";
import { guard } from "./guard.js";

addMessages({
  en: {
    "validation.required": "{label} is required.",
    "validation.requiredChoice": "Select {labelLower}.",
    "validation.requiredCheck": "Check this box to continue.",
    "validation.email": "Enter an email address like name@example.com.",
    "validation.url": "Enter a web address that starts with https://.",
    "validation.number": "Enter a number.",
    "validation.tooShort": "{label} must have at least {min} characters.",
    "validation.tooLong": "{label} can have at most {max} characters.",
    "validation.min": "{label} must be {min} or more.",
    "validation.max": "{label} must be {max} or less.",
    "validation.step": "Use a multiple of {step}.",
    "validation.pattern": "Check the format of {labelLower}.",
    "validation.equalTo": "{label} does not match.",
    "validation.summaryTitle": "Fix the highlighted fields",
    "validation.summaryOne": "1 field needs your attention.",
    "validation.summaryMany": "{count} fields need your attention.",
    "validation.unsaved": "Unsaved changes",
    "validation.field": "this field",
  },
  id: {
    "validation.required": "{label} wajib diisi.",
    "validation.requiredChoice": "Pilih {labelLower}.",
    "validation.requiredCheck": "Centang kotak ini untuk melanjutkan.",
    "validation.email": "Tulis alamat email seperti nama@contoh.com.",
    "validation.url": "Tulis alamat web yang diawali https://.",
    "validation.number": "Tulis angka.",
    "validation.tooShort": "{label} minimal {min} karakter.",
    "validation.tooLong": "{label} maksimal {max} karakter.",
    "validation.min": "{label} minimal {min}.",
    "validation.max": "{label} maksimal {max}.",
    "validation.step": "Gunakan kelipatan {step}.",
    "validation.pattern": "Periksa format {labelLower}.",
    "validation.equalTo": "{label} tidak sama.",
    "validation.summaryTitle": "Perbaiki isian yang ditandai",
    "validation.summaryOne": "1 isian perlu diperbaiki.",
    "validation.summaryMany": "{count} isian perlu diperbaiki.",
    "validation.unsaved": "Ada perubahan yang belum disimpan",
    "validation.field": "isian ini",
  },
});

const FIELD = ".ds-field, .fieldset, .form-group, .ds-fieldset, .ds-file-upload, fieldset";
const CONTROL = "input, select, textarea";
const SKIP_TYPES = /^(hidden|submit|button|reset|image)$/;
const escapeName = (name) => (window.CSS?.escape ? CSS.escape(name) : name.replace(/"/g, '\\"'));
const hasJQueryValidation = (form) => Boolean(window.jQuery?.validator && window.jQuery(form).data?.("validator"));

/* ------------------------------------------------------------------ labels and error elements */
/** The visible name of a control without notes ("optional", "*"), for messages. */
export function labelText(el) {
  if (!el) return "";
  let label = el.id ? document.querySelector(`label[for="${escapeName(el.id)}"]`) : null;
  label ||= el.closest("label");
  const group = (el.type === "radio" || el.type === "checkbox") && el.form
    ? el.closest("fieldset, [role=radiogroup], [role=group]") : null;
  let text = "";
  if (group && el.type === "radio") text = group.querySelector("legend")?.textContent || group.getAttribute("aria-label") || "";
  if (!text && label) {
    const copy = label.cloneNode(true);
    copy.querySelectorAll(".ds-label-note, .ds-required, .ds-visually-hidden, [aria-hidden=true], input, select, textarea, small").forEach((n) => n.remove());
    text = copy.textContent;
  }
  if (!text) text = el.getAttribute("aria-label") || "";
  if (!text && el.hasAttribute("aria-labelledby")) {
    text = el.getAttribute("aria-labelledby").split(/\s+/).map((id) => document.getElementById(id)?.textContent || "").join(" ");
  }
  return text.replace(/\s+/g, " ").replace(/[\s:*]+$/, "").trim() || el.name || "";
}

function lowerFirst(text, el) {
  if (!text) return t("validation.field");
  // Keep acronyms and proper names ("NPWP", "Email ID") as written.
  return /^[A-Z][a-z]/.test(text) && !/^[A-Z][a-z]+\s+[A-Z]/.test(text) && (el?.closest("[lang]")?.lang || document.documentElement.lang || "en").startsWith("en")
    ? text[0].toLowerCase() + text.slice(1) : text;
}

function describedBy(el) {
  return (el.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
}

function addDescribedBy(el, id) {
  const ids = describedBy(el);
  if (!ids.includes(id)) el.setAttribute("aria-describedby", [...ids, id].join(" "));
}

/** The control that carries the error for a group (first radio of a name) or the element itself. */
function anchorOf(el) {
  if (el.type === "radio" && el.name && el.form) return el.form.querySelector(`input[type=radio][name="${escapeName(el.name)}"]`) || el;
  return el;
}

/** Find or create the error element of a control: aria-describedby target, ASP.NET span, .ds-field-error, then a new one. */
function errorElement(el, create = true) {
  for (const id of describedBy(el)) {
    const node = document.getElementById(id);
    if (node?.matches(".ds-field-error, .field-validation-error, .field-validation-valid, [data-valmsg-for]")) return node;
  }
  const scope = el.form || document;
  if (el.name) {
    const span = scope.querySelector(`[data-valmsg-for="${escapeName(el.name)}"]`);
    if (span) return span;
  }
  const field = el.closest(FIELD);
  const own = field?.querySelector(":scope > .ds-field-error, :scope > .ds-field__meta > .ds-field-error");
  if (own) return own;
  if (!create) return null;
  const node = document.createElement("p");
  node.className = "ds-field-error";
  if (field) {
    const hint = field.querySelector(":scope > .ds-hint, :scope > .ds-field__meta");
    if (hint && hint.classList.contains("ds-field__meta")) hint.prepend(node);
    else field.append(node);
  } else {
    // A checkbox or radio inside its label row: the message goes under the whole row, not between box and text.
    const row = el.type === "checkbox" || el.type === "radio" ? el.closest("label") : null;
    (row || el.closest(".input, .ds-date-picker, .ds-date-range, .ds-time-picker, .ds-color-picker") || el).after(node);
  }
  return node;
}

/** Show an error under a control: aria-invalid, message linked by aria-describedby (hint first, then error). */
export function setFieldError(control, message) {
  const el = anchorOf(control);
  const node = errorElement(el);
  node.id ||= uid("error");
  node.textContent = message;
  if (node.matches(".field-validation-valid, .field-validation-error, [data-valmsg-for]")) {
    node.classList.remove("field-validation-valid");
    node.classList.add("field-validation-error");
  }
  addDescribedBy(el, node.id);
  const group = control.type === "radio" || control.type === "checkbox" ? control.closest("fieldset") : null;
  const targets = control.type === "radio" && control.name && control.form
    ? [...control.form.querySelectorAll(`input[type=radio][name="${escapeName(control.name)}"]`)] : [control];
  targets.forEach((target) => { target.setAttribute("aria-invalid", "true"); target.removeAttribute("data-state"); });
  group?.setAttribute("aria-invalid", "true");
  control.closest(FIELD)?.setAttribute("data-state", "invalid");
  updateSummary(control.form);
}

/** Remove the error of a control; with data-ds-validate-success on the field, show the success state. */
export function clearFieldError(control) {
  const el = anchorOf(control);
  const node = errorElement(el, false);
  if (node && !node.matches(".ds-hint")) {
    node.textContent = "";
    if (node.matches(".field-validation-error, [data-valmsg-for]")) {
      node.classList.remove("field-validation-error");
      node.classList.add("field-validation-valid");
    }
  }
  const targets = control.type === "radio" && control.name && control.form
    ? [...control.form.querySelectorAll(`input[type=radio][name="${escapeName(control.name)}"]`)] : [control];
  targets.forEach((target) => { target.removeAttribute("aria-invalid"); target.classList.remove("input-validation-error"); });
  control.closest("fieldset")?.removeAttribute("aria-invalid");
  const field = control.closest(FIELD);
  if (field) {
    const success = field.hasAttribute("data-ds-validate-success") && hasValue(control);
    if (success) { field.setAttribute("data-state", "success"); control.setAttribute("data-state", "success"); }
    else { field.removeAttribute("data-state"); control.removeAttribute("data-state"); }
  }
  updateSummary(control.form);
}

const hasValue = (el) => (el.type === "checkbox" || el.type === "radio")
  ? Boolean(el.form ? el.form.querySelector(`input[name="${escapeName(el.name)}"]:checked`) : el.checked)
  : el.type === "file" ? el.files?.length > 0 : String(el.value ?? "").trim() !== "";

/* ------------------------------------------------------------------ rules and messages */
function custom(el, rule) {
  return el.getAttribute(`data-ds-msg-${rule}`);
}

/** Rules of jquery-validation-unobtrusive (data-val-*), applied when jQuery Validation is not loaded. */
function unobtrusiveProblem(el) {
  if (el.getAttribute("data-val") !== "true") return "";
  const value = String(el.value ?? "");
  const has = hasValue(el);
  const a = (name) => el.getAttribute(name);
  if (a("data-val-required") != null && !has) return a("data-val-required") || "";
  if (!has) return "";
  const len = value.length;
  if (a("data-val-length") != null) {
    const min = +(a("data-val-length-min") || 0);
    const max = +(a("data-val-length-max") || Infinity);
    if (len < min || len > max) return a("data-val-length");
  }
  if (a("data-val-minlength") != null && len < +a("data-val-minlength-min")) return a("data-val-minlength");
  if (a("data-val-maxlength") != null && len > +a("data-val-maxlength-max")) return a("data-val-maxlength");
  if (a("data-val-range") != null) {
    const n = Number(value.replace(",", "."));
    const min = a("data-val-range-min");
    const max = a("data-val-range-max");
    if (Number.isNaN(n) || (min !== null && min !== "" && n < +min) || (max !== null && max !== "" && n > +max)) return a("data-val-range");
  }
  if (a("data-val-regex") != null) {
    try { if (!new RegExp(`^(?:${a("data-val-regex-pattern")})$`).test(value)) return a("data-val-regex"); } catch { /* invalid pattern */ }
  }
  if (a("data-val-email") != null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return a("data-val-email");
  if (a("data-val-url") != null && !/^https?:\/\/\S+$/i.test(value)) return a("data-val-url");
  if (a("data-val-number") != null && Number.isNaN(Number(value.replace(",", ".")))) return a("data-val-number");
  if (a("data-val-equalto") != null) {
    const other = (a("data-val-equalto-other") || "").replace(/^\*\./, "");
    const prefix = el.name.includes(".") ? el.name.slice(0, el.name.lastIndexOf(".") + 1) : "";
    const target = el.form?.elements.namedItem(prefix + other) || el.form?.elements.namedItem(other);
    if (target && "value" in target && target.value !== value) return a("data-val-equalto");
  }
  return "";
}

/** The message for an invalid control, or "" when it is valid. */
export function problemOf(el) {
  if (el._dsOwnCustom) { el.setCustomValidity(""); el._dsOwnCustom = false; }
  const v = el.validity;
  if (!v || v.valid) {
    const extra = unobtrusiveProblem(el);
    if (extra) { el.setCustomValidity(extra); el._dsOwnCustom = true; }
    return extra;
  }
  if (v.customError) return el.validationMessage;
  const label = labelText(el);
  const vars = { label: label || t("validation.field"), labelLower: lowerFirst(label, el), min: el.min || el.minLength, max: el.max || el.maxLength, step: el.step };
  const pick = (rule, key, dataVal) => custom(el, rule) || (dataVal && el.getAttribute(dataVal)) || t(key, vars);
  if (v.valueMissing) {
    if (el.type === "checkbox") return pick("required", "validation.requiredCheck", "data-val-required");
    if (el.type === "radio" || el.tagName === "SELECT") return pick("required", "validation.requiredChoice", "data-val-required");
    return pick("required", "validation.required", "data-val-required");
  }
  if (v.typeMismatch) return el.type === "email" ? pick("type", "validation.email", "data-val-email") : el.type === "url" ? pick("type", "validation.url", "data-val-url") : pick("type", "validation.pattern");
  if (v.badInput) return pick("type", el.type === "number" ? "validation.number" : "validation.pattern", "data-val-number");
  if (v.tooShort) return pick("minlength", "validation.tooShort", "data-val-minlength");
  if (v.tooLong) return pick("maxlength", "validation.tooLong", "data-val-maxlength");
  if (v.rangeUnderflow) return pick("min", "validation.min", "data-val-range");
  if (v.rangeOverflow) return pick("max", "validation.max", "data-val-range");
  if (v.stepMismatch) return pick("step", "validation.step");
  if (v.patternMismatch) return custom(el, "pattern") || el.getAttribute("data-val-regex") || (el.title ? el.title : t("validation.pattern", vars));
  return el.validationMessage;
}

const validatable = (el) => el instanceof Element && el.matches(CONTROL) && !SKIP_TYPES.test(el.type) && !el.disabled
  && !el.closest("[inert], fieldset:disabled") && (el.willValidate || el.getAttribute("data-val") === "true");

/** Validate one control: show or clear its message. Returns true when valid. */
export function validateField(el) {
  if (!validatable(el)) return true;
  const message = problemOf(el);
  if (message) setFieldError(el, message);
  else clearFieldError(el);
  return !message;
}

/** Controls of a form, one per radio group. */
function controlsOf(form) {
  const seen = new Set();
  return [...form.elements].filter((el) => {
    if (!validatable(el)) return false;
    if (el.type === "radio") { if (seen.has(el.name)) return false; seen.add(el.name); }
    return true;
  });
}

/* ------------------------------------------------------------------ error summary */
function summaryOf(form, create) {
  if (!form) return null;
  let box = form.querySelector("[data-ds-error-summary]") || (form.id ? document.querySelector(`[data-ds-error-summary="${escapeName(form.id)}"]`) : null);
  if (!box && create) {
    box = document.createElement("div");
    box.className = "ds-error-summary";
    box.setAttribute("data-ds-error-summary", "");
    box.hidden = true;
    form.prepend(box);
  }
  return box;
}

function linkTo(el) {
  const target = el.type === "radio" ? anchorOf(el) : el;
  target.id ||= uid("field");
  return target.id;
}

/** Render the summary with one link per invalid control; hides itself when nothing is left. */
function renderSummary(box, items) {
  if (!items.length) { box.hidden = true; box.replaceChildren(); return; }
  box.hidden = false;
  box.setAttribute("role", "alert");
  box.setAttribute("tabindex", "-1");
  const id = box.id || (box.id = uid("summary"));
  const heading = document.createElement("h2");
  heading.id = `${id}-title`;
  heading.textContent = t("validation.summaryTitle");
  box.setAttribute("aria-labelledby", heading.id);
  const text = document.createElement("p");
  text.textContent = items.length === 1 ? t("validation.summaryOne") : t("validation.summaryMany", { count: items.length });
  const list = document.createElement("ul");
  for (const { href, message } of items) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${href}`;
    a.textContent = message;
    li.append(a);
    list.append(li);
  }
  box.replaceChildren(heading, text, list);
}

function updateSummary(form) {
  const box = summaryOf(form, false);
  if (!box || box.hidden || !box.hasAttribute("data-ds-live")) return;
  const items = controlsOf(form).filter((el) => anchorOf(el).getAttribute("aria-invalid") === "true")
    .map((el) => ({ href: linkTo(el), message: errorElement(anchorOf(el), false)?.textContent?.trim() || problemOf(el) }))
    .filter((item) => item.message);
  renderSummary(box, items);
}

/** Validate a whole form; on failure show every message, fill the summary and focus it. Returns true when valid. */
export function validateForm(form, { focus = true } = {}) {
  const invalid = controlsOf(form).filter((el) => !validateField(el));
  const box = summaryOf(form, invalid.length > 0);
  if (box) {
    box.setAttribute("data-ds-live", "");
    renderSummary(box, invalid.map((el) => ({ href: linkTo(el), message: errorElement(anchorOf(el), false)?.textContent?.trim() || problemOf(el) })));
  }
  if (invalid.length && focus) {
    if (box && !box.hidden) {
      box.scrollIntoView({ block: "start", behavior: reduceMotion() ? "auto" : "smooth" });
      focusQuietly(box);
    } else focusQuietly(invalid[0]);
  }
  form.dispatchEvent(new CustomEvent("ds:validation:result", { bubbles: true, detail: { valid: !invalid.length, invalid } }));
  return !invalid.length;
}

/** Focus a field from a summary link: scroll so its label is in view, then focus without another jump. */
function focusField(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  for (let parent = el.parentElement; parent; parent = parent.parentElement) if (parent instanceof HTMLDetailsElement) parent.open = true;
  const label = (el.id && document.querySelector(`label[for="${escapeName(el.id)}"]`)) || el.closest("fieldset")?.querySelector("legend") || el;
  label.scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" });
  focusQuietly(el);
  return true;
}

/* ------------------------------------------------------------------ ASP.NET Core server output */
function wireServerOutput(root) {
  root.querySelectorAll("[data-valmsg-for]").forEach((span) => {
    if (span._dsWired) return;
    span._dsWired = true;
    const form = span.closest("form");
    const name = span.getAttribute("data-valmsg-for");
    const control = (form || document).querySelector(`[name="${escapeName(name)}"]:not([type=hidden])`)
      || document.getElementById(`${name.replace(/[.[\]]/g, "_")}`);
    if (!control) return;
    span.id ||= uid("error");
    const target = anchorOf(control);
    addDescribedBy(target, span.id);
    if (span.classList.contains("field-validation-error") && span.textContent.trim()) {
      target.setAttribute("aria-invalid", "true");
      control.closest(FIELD)?.setAttribute("data-state", "invalid");
    }
  });
  root.querySelectorAll(".input-validation-error:not([aria-invalid])").forEach((el) => el.setAttribute("aria-invalid", "true"));
  root.querySelectorAll(".validation-summary-errors").forEach((box) => {
    if (box._dsWired) return;
    box._dsWired = true;
    box.setAttribute("role", "alert");
    box.setAttribute("tabindex", "-1");
    const form = box.closest("form");
    // Turn plain messages into links when a field shows the same message.
    box.querySelectorAll("li").forEach((li) => {
      if (li.querySelector("a")) return;
      const message = li.textContent.trim();
      const span = [...(form || document).querySelectorAll(".field-validation-error[data-valmsg-for]")].find((s) => s.textContent.trim() === message);
      const control = span && (form || document).querySelector(`[name="${escapeName(span.getAttribute("data-valmsg-for"))}"]:not([type=hidden])`);
      if (!control) return;
      const a = document.createElement("a");
      a.href = `#${linkTo(control)}`;
      a.textContent = message;
      li.replaceChildren(a);
    });
  });
  // Focus a server-rendered summary once per page (after a failed post).
  const first = root.querySelector("[data-ds-error-summary]:not([hidden]):not(:empty)[data-ds-autofocus], form[data-ds-validate] .validation-summary-errors, form[data-ds-validate] [data-ds-error-summary]:not([hidden]):not(:empty)");
  if (first && !document.documentElement._dsSummaryFocused) {
    document.documentElement._dsSummaryFocused = true;
    first.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => focusQuietly(first));
  }
}

/* ------------------------------------------------------------------ dirty status and view mode */
function dirtyCheck(form) {
  if (!form.matches("[data-ds-guard]")) return;
  form._dsSnapshot ??= guard.snapshot(form);
  const dirty = form.hasAttribute("data-ds-guard-dirty") || guard.snapshot(form) !== form._dsSnapshot;
  if (dirty === form.hasAttribute("data-ds-dirty")) return;
  form.toggleAttribute("data-ds-dirty", dirty);
  form.querySelectorAll("[data-ds-dirty-status]").forEach((el) => { el.textContent = dirty ? (el.getAttribute("data-ds-dirty-text") || t("validation.unsaved")) : ""; });
  form.dispatchEvent(new CustomEvent("ds:form:dirty", { bubbles: true, detail: { dirty } }));
}

const VIEW_LOCK = "data-ds-view-lock";
function applyMode(form) {
  const view = form.getAttribute("data-ds-mode") === "view";
  form.querySelectorAll(CONTROL).forEach((el) => {
    if (SKIP_TYPES.test(el.type) && el.type !== "hidden") return;
    if (el.type === "hidden") return;
    if (view) {
      if (el.hasAttribute(VIEW_LOCK)) return;
      const textLike = el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && !/^(checkbox|radio|file|color|range)$/.test(el.type));
      if (textLike && !el.readOnly) { el.readOnly = true; el.setAttribute(VIEW_LOCK, "readonly"); }
      else if (!textLike && !el.disabled) { el.disabled = true; el.setAttribute(VIEW_LOCK, "disabled"); }
    } else if (el.hasAttribute(VIEW_LOCK)) {
      if (el.getAttribute(VIEW_LOCK) === "readonly") el.readOnly = false; else el.disabled = false;
      el.removeAttribute(VIEW_LOCK);
    }
  });
  form.querySelectorAll("[data-ds-form-edit]").forEach((b) => { b.hidden = !view; });
  form.querySelectorAll("[data-ds-form-view-only]").forEach((b) => { b.hidden = !view; });
  form.querySelectorAll("[data-ds-form-edit-only], [data-ds-form-cancel], button[type=submit]:not([data-ds-form-keep])").forEach((b) => { b.hidden = view; });
}

function setMode(form, mode) {
  form.setAttribute("data-ds-mode", mode);
  applyMode(form);
  form.dispatchEvent(new CustomEvent("ds:form:mode", { bubbles: true, detail: { mode } }));
}

/* ------------------------------------------------------------------ module contract */
const inScope = (el) => el instanceof Element && el.closest("form[data-ds-validate], [data-ds-validate]:not(form)") && !(el.form && hasJQueryValidation(el.form));

export function wire() {
  document.addEventListener("input", (event) => {
    const el = event.target;
    if (el instanceof Element && el.form) dirtyCheck(el.form);
    if (!inScope(el)) return;
    el._dsTouched = true;
    if (anchorOf(el).getAttribute("aria-invalid") === "true") validateField(el);
  });

  document.addEventListener("change", (event) => {
    const el = event.target;
    if (el instanceof Element && el.form) dirtyCheck(el.form);
    if (!inScope(el)) return;
    el._dsTouched = true;
    if (/^(checkbox|radio|file)$/.test(el.type) || el.tagName === "SELECT" || anchorOf(el).getAttribute("aria-invalid") === "true") validateField(el);
  });

  // Validate on blur once the person has typed something (tabbing through an empty form shows nothing).
  document.addEventListener("focusout", (event) => {
    const el = event.target;
    if (!inScope(el) || !validatable(el)) return;
    if (el._dsTouched || anchorOf(el).getAttribute("aria-invalid") === "true") validateField(el);
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-ds-validate]") || hasJQueryValidation(form)) return;
    if (event.submitter?.hasAttribute("formnovalidate")) return;
    if (validateForm(form)) return;
    event.preventDefault();
    // guard.js allows leaving on any submit; a blocked submit keeps the guard armed.
    setTimeout(() => { guard.allowed = false; }, 0);
  }, true);

  document.addEventListener("reset", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    setTimeout(() => {
      form.querySelectorAll("[aria-invalid=true]").forEach((el) => { if (el.matches(CONTROL)) clearFieldError(el); });
      const box = summaryOf(form, false);
      if (box) renderSummary(box, []);
      dirtyCheck(form);
    }, 0);
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const link = target.closest(".ds-error-summary a[href^='#'], .validation-summary-errors a[href^='#'], [data-ds-error-summary] a[href^='#']");
    if (link && focusField(decodeURIComponent(link.getAttribute("href").slice(1)))) { event.preventDefault(); return; }
    const edit = target.closest("[data-ds-form-edit]");
    if (edit) {
      const form = edit.form || edit.closest("form") || document.getElementById(edit.getAttribute("data-ds-form-edit"));
      if (form) { setMode(form, "edit"); focusQuietly(form.querySelector("input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled])")); }
      return;
    }
    const cancel = target.closest("[data-ds-form-cancel]");
    if (cancel) {
      const form = cancel.form || cancel.closest("form");
      if (form?.hasAttribute("data-ds-mode")) {
        event.preventDefault();
        form.reset();
        guard.reset();
        setMode(form, "view");
        focusQuietly(form.querySelector("[data-ds-form-edit]"));
      }
    }
  });
}

export function init(root = document) {
  const scope = root.querySelectorAll ? root : document;
  const forms = [...(scope.matches?.("form") ? [scope] : []), ...scope.querySelectorAll("form")];
  for (const form of forms) {
    if (form.matches("[data-ds-validate]") && !hasJQueryValidation(form)) form.noValidate = true;
    if (form.hasAttribute("data-ds-mode")) applyMode(form);
  }
  wireServerOutput(scope);
}

export const api = {
  validation: {
    /** DS.validation.form(formEl) → true when valid; shows messages and the summary otherwise. */
    form: (form, options) => validateForm(form, options),
    field: (el) => validateField(el),
    setError: (el, message) => setFieldError(el, message),
    clearError: (el) => clearFieldError(el),
  },
  formMode: (form, mode) => setMode(form, mode),
};
