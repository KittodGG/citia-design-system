/* Checkbox (indeterminate, check-all), switch (async save with aria-busy), slider (fill, output, value bubble, marks,
   two thumbs), rating (clear, live value, fractional display), tags input, OTP input. Shared token (chip) helpers are
   exported for combobox.js (multi-select).
   Owner: batch A3 forms-choice. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api). */
import { t, addMessages, focusQuietly, uid, locale, normalize } from "../core.js";

addMessages({
  en: {
    "choices.remove": "Remove {label}",
    "switch.error": "The change could not be saved. Try again.",
    "slider.min": "Minimum",
    "slider.max": "Maximum",
    "slider.range": "{lo} to {hi}",
    "rating.clear": "Clear",
    "rating.clearLabel": "Clear rating",
    "rating.cleared": "Rating cleared.",
    "rating.value": "Rated {value} out of {max}",
    "tags.added": "{label} added.",
    "tags.removed": "{label} removed.",
    "tags.duplicate": "{label} is already in the list.",
    "tags.max": "You can add up to {max}.",
    "tags.invalidOne": "{label} is not valid.",
    "tags.invalid": "{count} entries are not valid. Remove or correct them.",
    "tags.count": "{count} of {max}",
    "otp.digit": "Character {index} of {length}",
    "otp.incomplete": "Enter all {length} characters.",
    "otp.complete": "Code entered.",
  },
  id: {
    "choices.remove": "Hapus {label}",
    "switch.error": "Perubahan tidak dapat disimpan. Coba lagi.",
    "slider.min": "Minimum",
    "slider.max": "Maksimum",
    "slider.range": "{lo} sampai {hi}",
    "rating.clear": "Hapus",
    "rating.clearLabel": "Hapus rating",
    "rating.cleared": "Rating dihapus.",
    "rating.value": "Rating {value} dari {max}",
    "tags.added": "{label} ditambahkan.",
    "tags.removed": "{label} dihapus.",
    "tags.duplicate": "{label} sudah ada di daftar.",
    "tags.max": "Anda dapat menambahkan paling banyak {max}.",
    "tags.invalidOne": "{label} tidak valid.",
    "tags.invalid": "{count} isian tidak valid. Hapus atau perbaiki.",
    "tags.count": "{count} dari {max}",
    "otp.digit": "Karakter {index} dari {length}",
    "otp.incomplete": "Isi semua {length} karakter.",
    "otp.complete": "Kode sudah diisi.",
  },
});

const ready = new WeakSet();
const once = (el) => (ready.has(el) ? false : (ready.add(el), true));
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
const fire = (el) => { el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); };

/** Visually hidden polite live region appended to host. */
function liveRegion(host) {
  const status = document.createElement("p");
  status.className = "ds-visually-hidden";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  host.append(status);
  let timer;
  return (message) => {
    clearTimeout(timer);
    status.textContent = "";
    timer = setTimeout(() => { status.textContent = message; }, 40);
  };
}

/* ================================================================== tokens (shared with combobox.js) */

/** A removable chip: <li class="ds-token"><span class="ds-token__label">…</span><button class="ds-token__remove"></button></li>. */
export function makeToken(label, onRemove, { invalid = false, disabled = false, title = "" } = {}) {
  const li = document.createElement("li");
  li.className = "ds-token";
  if (invalid) { li.classList.add("is-invalid"); li.setAttribute("aria-invalid", "true"); }
  const text = document.createElement("span");
  text.className = "ds-token__label";
  text.textContent = label;
  text.title = title || label;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ds-token__remove";
  button.tabIndex = -1;
  button.disabled = disabled;
  button.setAttribute("aria-label", t("choices.remove", { label }));
  button.addEventListener("click", (event) => { event.stopPropagation(); onRemove(); });
  li.append(text, button);
  return li;
}

/**
 * Keyboard for token remove buttons (roving, not in the Tab order): ArrowLeft/Right move, Backspace/Delete remove,
 * Escape/End/ArrowRight past the last return to the entry input. removeAt(index) must re-render.
 */
export function tokenKeydown(event, container, entry, removeAt) {
  const buttons = [...container.querySelectorAll(".ds-token__remove")];
  const index = buttons.indexOf(event.target);
  if (index < 0) return;
  const rtl = getComputedStyle(container).direction === "rtl";
  const back = rtl ? "ArrowRight" : "ArrowLeft";
  const forward = rtl ? "ArrowLeft" : "ArrowRight";
  if (event.key === back) { event.preventDefault(); focusQuietly(buttons[Math.max(0, index - 1)]); }
  else if (event.key === forward) { event.preventDefault(); index + 1 < buttons.length ? focusQuietly(buttons[index + 1]) : focusQuietly(entry); }
  else if (event.key === "Home") { event.preventDefault(); focusQuietly(buttons[0]); }
  else if (event.key === "End" || event.key === "Escape") { event.preventDefault(); focusQuietly(entry); }
  else if (event.key === "Backspace" || event.key === "Delete" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    removeAt(index);
    const after = [...container.querySelectorAll(".ds-token__remove")];
    const next = event.key === "Backspace" ? after[index - 1] ?? after[0] : after[index];
    focusQuietly(next ?? entry);
  } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
    focusQuietly(entry); // typing goes back to the entry
  }
}

/** From the entry input: ArrowLeft at caret 0 (or Backspace handled by caller) moves to the last token. */
export function entryToTokens(event, container) {
  const rtl = getComputedStyle(container).direction === "rtl";
  const back = rtl ? "ArrowRight" : "ArrowLeft";
  const input = event.target;
  if (event.key !== back || input.selectionStart !== 0 || input.selectionEnd !== 0) return false;
  const last = [...container.querySelectorAll(".ds-token__remove")].at(-1);
  if (!last) return false;
  event.preventDefault();
  focusQuietly(last);
  return true;
}

/* ================================================================== checkbox */

function initCheckboxes(root) {
  root.querySelectorAll("input[type=checkbox][data-ds-indeterminate]").forEach((box) => {
    if (!once(box)) return;
    box.indeterminate = box.getAttribute("data-ds-indeterminate") !== "false";
  });
  root.querySelectorAll("input[type=checkbox][data-ds-check-all]").forEach((parent) => {
    if (!once(parent)) return;
    syncParent(parent);
  });
}

/** Children of a check-all box: CSS selector in data-ds-check-all, or the ids in aria-controls. */
function childrenOf(parent) {
  const selector = parent.getAttribute("data-ds-check-all");
  if (selector) return [...document.querySelectorAll(selector)].filter((el) => el !== parent && el.type === "checkbox");
  return (parent.getAttribute("aria-controls") || "").split(/\s+/).map((id) => document.getElementById(id)).filter(Boolean);
}

function syncParent(parent) {
  const kids = childrenOf(parent).filter((el) => !el.disabled);
  const on = kids.filter((el) => el.checked).length;
  parent.checked = kids.length > 0 && on === kids.length;
  parent.indeterminate = on > 0 && on < kids.length;
}

function onCheckboxChange(target) {
  if (target.matches("[data-ds-check-all]")) {
    childrenOf(target).forEach((el) => { if (!el.disabled && el.checked !== target.checked) { el.checked = target.checked; el.dispatchEvent(new Event("change", { bubbles: true })); } });
    target.indeterminate = false;
    return;
  }
  document.querySelectorAll("input[type=checkbox][data-ds-check-all]").forEach((parent) => {
    if (childrenOf(parent).includes(target)) syncParent(parent);
  });
}

/* ================================================================== switch */

function antiforgery(el) {
  return el.form?.querySelector("input[name=__RequestVerificationToken]")?.value
    ?? document.querySelector("input[name=__RequestVerificationToken]")?.value ?? null;
}

/** Mark a switch busy while promise runs; on rejection the switch returns to its previous state. */
export async function switchBusy(input, promise) {
  const previous = !input.checked;
  input.setAttribute("aria-busy", "true");
  try {
    const result = await promise;
    emit(input, "ds:switch:change", { checked: input.checked, result });
    return result;
  } catch (error) {
    input.checked = previous;
    emit(input, "ds:switch:error", { checked: input.checked, error });
    if (input.hasAttribute("data-ds-switch-action")) window.DS?.toast?.({ tone: "error", title: t("switch.error") });
    throw error;
  } finally {
    input.removeAttribute("aria-busy");
  }
}

function saveSwitch(input) {
  const url = input.getAttribute("data-ds-switch-action");
  const body = new FormData();
  const name = input.name || input.id || "value";
  body.append(name, input.checked ? (input.value && input.value !== "on" ? input.value : "true") : "false");
  const token = antiforgery(input);
  if (token) body.append("__RequestVerificationToken", token);
  const request = fetch(url, {
    method: input.getAttribute("data-ds-switch-method") || "POST",
    body,
    credentials: "same-origin",
    headers: token ? { RequestVerificationToken: token } : {},
  }).then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response; });
  switchBusy(input, request).catch(() => { /* reported through ds:switch:error */ });
}

/* ================================================================== slider */

const sliderState = new WeakMap();

function ratio(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  return max > min ? (Number(input.value) - min) / (max - min) : 0;
}

function formatter(slider) {
  const template = slider?.getAttribute("data-ds-slider-format") || "{value}";
  const number = new Intl.NumberFormat(locale() === "id" ? "id-ID" : "en-US", { maximumFractionDigits: 2 });
  return (value) => template.replace("{value}", number.format(Number(value)));
}

function paintRange(input) {
  input.style.setProperty("--ds-range-p", ratio(input).toFixed(4));
  const slider = input.closest(".ds-slider");
  const state = slider && sliderState.get(slider);
  if (state) state.update(input);
}

function enhanceSlider(slider) {
  if (!once(slider)) return;
  const control = slider.querySelector(".ds-slider__control") ?? slider;
  const inputs = [...control.querySelectorAll("input[type=range]")];
  if (!inputs.length) return;
  const dual = inputs.length === 2;
  const format = formatter(slider);
  const output = slider.querySelector("output");
  const custom = slider.hasAttribute("data-ds-slider-format");
  if (dual) {
    control.classList.add("is-range");
    inputs.forEach((input, i) => {
      if (!input.hasAttribute("aria-label") && !input.hasAttribute("aria-labelledby")) input.setAttribute("aria-label", t(i ? "slider.max" : "slider.min"));
    });
  }

  const bubbles = slider.getAttribute("data-ds-slider-bubble") === "false" ? [] : inputs.map((input) => {
    const bubble = document.createElement("span");
    bubble.className = "ds-slider__bubble";
    bubble.setAttribute("aria-hidden", "true");
    control.append(bubble);
    return bubble;
  });

  // Marks from <datalist>: <option value="25" label="25%">.
  let marks = [];
  const list = inputs[0].list;
  if (list && !slider.querySelector(".ds-slider__marks")) {
    const ul = document.createElement("ul");
    ul.className = "ds-slider__marks";
    ul.setAttribute("aria-hidden", "true");
    const min = Number(inputs[0].min || 0);
    const max = Number(inputs[0].max || 100);
    marks = [...list.options].map((option) => {
      const li = document.createElement("li");
      li.className = "ds-slider__mark";
      const value = Number(option.value);
      li.style.setProperty("--ds-mark-p", ((value - min) / (max - min || 1)).toFixed(4));
      li.textContent = option.label || format(value);
      li._dsValue = value;
      ul.append(li);
      return li;
    });
    control.after(ul);
  }

  const update = (changed) => {
    if (dual) {
      const [lo, hi] = inputs;
      if (changed === lo && Number(lo.value) > Number(hi.value)) lo.value = hi.value;
      if (changed === hi && Number(hi.value) < Number(lo.value)) hi.value = lo.value;
      control.style.setProperty("--ds-range-lo", ratio(lo).toFixed(4));
      control.style.setProperty("--ds-range-hi", ratio(hi).toFixed(4));
      // The thumb last moved stays on top; at the maximum end the lower thumb must stay reachable.
      const loOnTop = changed === lo || (ratio(lo) > 0.98);
      lo.toggleAttribute("data-top", loOnTop);
      hi.toggleAttribute("data-top", !loOnTop);
    }
    inputs.forEach((input, i) => {
      input.style.setProperty("--ds-range-p", ratio(input).toFixed(4));
      const text = format(input.value);
      if (custom) input.setAttribute("aria-valuetext", text);
      if (bubbles[i]) { bubbles[i].textContent = text; bubbles[i].style.setProperty("--ds-bubble-p", ratio(input).toFixed(4)); }
    });
    if (output) output.textContent = dual ? t("slider.range", { lo: format(inputs[0].value), hi: format(inputs[1].value) }) : format(inputs[0].value);
    const lo = dual ? Number(inputs[0].value) : Number(inputs[0].min || 0);
    const hi = dual ? Number(inputs[1].value) : Number(inputs[0].value);
    marks.forEach((mark) => mark.toggleAttribute("data-in-range", mark._dsValue >= lo && mark._dsValue <= hi));
  };
  sliderState.set(slider, { update });

  const activate = (input) => bubbles.forEach((bubble, i) => bubble.toggleAttribute("data-active", inputs[i] === input));
  control.addEventListener("pointerdown", (event) => {
    const input = event.target.closest?.("input[type=range]");
    if (!input || input.disabled) return;
    slider.removeAttribute("data-keyboard");
    slider.setAttribute("data-dragging", "");
    activate(input);
    const end = () => { slider.removeAttribute("data-dragging"); document.removeEventListener("pointerup", end); document.removeEventListener("pointercancel", end); };
    document.addEventListener("pointerup", end);
    document.addEventListener("pointercancel", end);
  });
  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
      if (!keys.includes(event.key)) return;
      slider.setAttribute("data-keyboard", "");
      activate(input);
      if (event.key === "PageUp" || event.key === "PageDown") {
        // Consistent large step across engines: data-ds-slider-page, else 10% of the range, snapped to step.
        event.preventDefault();
        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const step = Number(input.step) || 1;
        const page = Number(slider.getAttribute("data-ds-slider-page")) || Math.max(step, Math.round((max - min) / 10 / step) * step);
        const next = Math.min(max, Math.max(min, Number(input.value) + (event.key === "PageUp" ? page : -page)));
        input.value = String(next);
        update(input);
        fire(input);
      }
    });
    input.addEventListener("blur", () => slider.removeAttribute("data-keyboard"));
  });
  update(inputs[0]);
}

/* ================================================================== rating */

function enhanceRating(rating) {
  if (!once(rating)) return;
  const radios = [...rating.querySelectorAll("input[type=radio]")];
  if (!radios.length) return;
  const valueEl = rating.querySelector(".ds-rating__value");
  const announce = liveRegion(rating);
  const show = () => { if (valueEl) valueEl.textContent = radios.find((r) => r.checked)?.value ?? "–"; };
  const clear = () => {
    radios.forEach((r) => { r.checked = false; });
    show();
    announce(t("rating.cleared"));
    emit(rating, "ds:rating:change", { value: null });
    fire(radios[0]);
  };
  if (rating.hasAttribute("data-ds-rating-clearable")) {
    let wasChecked = false;
    rating.addEventListener("pointerdown", (event) => {
      const radio = event.target.closest?.(".ds-rating__star")?.querySelector("input");
      wasChecked = Boolean(radio?.checked);
    });
    radios.forEach((radio) => radio.addEventListener("click", (event) => {
      if (wasChecked && event.detail > 0) { wasChecked = false; clear(); }
    }));
    if (!rating.querySelector(".ds-rating__clear")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ds-rating__clear";
      button.textContent = t("rating.clear");
      button.setAttribute("aria-label", t("rating.clearLabel"));
      button.disabled = radios.every((r) => r.disabled);
      button.addEventListener("click", () => { clear(); focusQuietly(radios[0]); });
      const row = rating.querySelector(".ds-rating__row");
      if (row) row.append(button); else rating.querySelector(".ds-rating__stars")?.after(button);
    }
  }
  rating.addEventListener("change", (event) => {
    if (!event.target.matches("input[type=radio]")) return;
    show();
    emit(rating, "ds:rating:change", { value: Number(event.target.value) });
  });
  show();
}

function enhanceRatingDisplay(el) {
  if (!once(el)) return;
  const value = Number(el.getAttribute("data-ds-rating-value")) || 0;
  const max = Number(el.getAttribute("data-ds-rating-max")) || 5;
  el.style.setProperty("--ds-rating-value", String(value));
  el.style.setProperty("--ds-rating-max", String(max));
  if (!el.hasAttribute("aria-label")) {
    const number = new Intl.NumberFormat(locale() === "id" ? "id-ID" : "en-US", { maximumFractionDigits: 1 });
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", t("rating.value", { value: number.format(value), max }));
  }
}

/* ================================================================== tags input */

const tagsApi = new WeakMap();

function enhanceTags(source) {
  if (!once(source) || !(source instanceof HTMLInputElement)) return;
  const separator = source.getAttribute("data-ds-tags-separator") || ",";
  const multiple = source.getAttribute("data-ds-tags-mode") === "multiple";
  const max = Number(source.getAttribute("data-ds-tags-max")) || 0;
  const maxLength = Number(source.getAttribute("data-ds-tags-maxlength")) || 0;
  const pattern = source.getAttribute("data-ds-tags-pattern");
  const regex = pattern ? new RegExp(`^(?:${pattern})$`, "u") : null;
  const name = source.name;

  const wrap = document.createElement("div");
  wrap.className = "ds-tags-input";
  const field = document.createElement("div");
  field.className = `input ds-tags-input__field${source.classList.contains("input-sm") ? " input-sm" : ""}`;
  const tokens = document.createElement("ul");
  tokens.className = "ds-tags-input__tokens";
  tokens.setAttribute("role", "list");
  const entry = document.createElement("input");
  entry.type = "text";
  entry.className = "ds-tags-input__input";
  entry.autocomplete = "off";
  entry.spellcheck = false;
  entry.enterKeyHint = "enter";
  if (source.id) { entry.id = source.id; source.id = `${source.id}-value`; }
  for (const attr of ["placeholder", "aria-describedby", "aria-invalid", "aria-label", "aria-labelledby", "inputmode"]) {
    if (source.hasAttribute(attr)) entry.setAttribute(attr, source.getAttribute(attr));
  }
  entry.disabled = source.disabled;
  entry.readOnly = source.readOnly;
  const required = source.required;
  source.required = false;
  field.append(tokens, entry);
  source.before(wrap);
  wrap.append(field, source);
  const initialValue = source.value;
  source.type = "hidden";
  let count = null;
  if (max) {
    const meta = document.createElement("div");
    meta.className = "ds-tags-input__meta";
    count = document.createElement("span");
    count.className = "ds-tags-input__count";
    count.setAttribute("aria-hidden", "true");
    meta.append(count);
    wrap.append(meta);
  }
  const announce = liveRegion(wrap);
  if (multiple) source.removeAttribute("name");

  let tags = [];
  const split = (text) => text.split(new RegExp(`[${separator.replace(/[\\\]^-]/g, "\\$&")};\\n\\t]+`)).map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean);
  const valid = (tag) => !regex || regex.test(tag);

  const sync = () => {
    if (multiple) {
      wrap.querySelectorAll("input[data-ds-tags-value]").forEach((el) => el.remove());
      tags.forEach((tag) => {
        const hidden = document.createElement("input");
        hidden.type = "hidden"; hidden.name = name; hidden.value = tag; hidden.setAttribute("data-ds-tags-value", "");
        wrap.append(hidden);
      });
      source.value = tags.join(separator);
    } else source.value = tags.join(separator);
    const bad = tags.filter((tag) => !valid(tag)).length;
    entry.required = required && !tags.length; // native "fill in this field" when empty
    entry.setCustomValidity(bad ? t("tags.invalid", { count: bad }) : "");
    const full = max > 0 && tags.length >= max;
    wrap.toggleAttribute("data-full", full);
    if (count) count.textContent = t("tags.count", { count: tags.length, max });
  };

  const render = () => {
    tokens.replaceChildren(...tags.map((tag, i) => makeToken(tag, () => removeAt(i, true), { invalid: !valid(tag), disabled: entry.disabled || entry.readOnly })));
  };

  const changed = () => { sync(); fire(source); emit(source, "ds:tags:change", { tags: [...tags] }); };

  const removeAt = (index, refocus = false) => {
    const [removed] = tags.splice(index, 1);
    if (removed === undefined) return;
    render();
    changed();
    announce(t("tags.removed", { label: removed }));
    if (refocus) focusQuietly(entry);
  };

  const add = (text, { quiet = false } = {}) => {
    let added = 0;
    const messages = [];
    for (let tag of split(text)) {
      if (maxLength) tag = tag.slice(0, maxLength);
      const existing = tags.findIndex((x) => normalize(x) === normalize(tag));
      if (existing >= 0) {
        const chip = tokens.children[existing];
        if (chip) {
          chip.setAttribute("data-state", "duplicate");
          clearTimeout(chip._dsTimer);
          chip._dsTimer = setTimeout(() => chip.removeAttribute("data-state"), 1600);
        }
        messages.push(t("tags.duplicate", { label: tag }));
        continue;
      }
      if (max && tags.length >= max) { messages.push(t("tags.max", { max })); break; }
      tags.push(tag);
      added++;
      messages.push(valid(tag) ? t("tags.added", { label: tag }) : t("tags.invalidOne", { label: tag }));
    }
    if (added) { render(); changed(); }
    if (!quiet && messages.length) announce(messages.join(" "));
    return added;
  };

  const commit = () => {
    if (!entry.value.trim()) return false;
    add(entry.value);
    entry.value = "";
    return true;
  };

  entry.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Enter" || event.key === separator || (event.key === "," && separator === ",")) {
      if (entry.value.trim()) { event.preventDefault(); commit(); }
      else if (event.key !== "Enter") event.preventDefault();
    } else if (event.key === "Tab" && entry.value.trim()) {
      commit(); // focus moves on as usual
    } else if (event.key === "Backspace" && entry.value === "" && tags.length) {
      event.preventDefault();
      removeAt(tags.length - 1);
    } else entryToTokens(event, tokens);
  });
  entry.addEventListener("paste", (event) => {
    const text = event.clipboardData?.getData("text") ?? "";
    if (!/[,;\n\t]/.test(text) && !text.includes(separator)) return;
    event.preventDefault();
    add(`${entry.value}${separator}${text}`);
    entry.value = "";
  });
  entry.addEventListener("blur", () => { if (source.getAttribute("data-ds-tags-commit") !== "false") commit(); });
  tokens.addEventListener("keydown", (event) => tokenKeydown(event, tokens, entry, (i) => removeAt(i)));
  field.addEventListener("pointerdown", (event) => {
    if (event.target === field || event.target === tokens) { event.preventDefault(); focusQuietly(entry); }
  });
  source.form?.addEventListener("reset", () => setTimeout(() => { tags = []; add(initialValue, { quiet: true }); render(); sync(); }));

  tags = [];
  add(initialValue, { quiet: true });
  render();
  sync();
  tagsApi.set(source, { add: (text) => add(text), remove: (tag) => removeAt(tags.findIndex((x) => normalize(x) === normalize(tag))), clear: () => { tags = []; render(); changed(); }, get: () => [...tags] });
  source._dsTags = tagsApi.get(source);
}

/* ================================================================== OTP input */

const otpApi = new WeakMap();

function enhanceOtp(host) {
  if (!once(host)) return;
  const source = host.querySelector("input.ds-otp__value") ?? host.querySelector("input");
  if (!source) return;
  const length = Number(host.getAttribute("data-ds-otp-length")) || (source.maxLength > 0 ? source.maxLength : 6);
  const alpha = host.getAttribute("data-ds-otp-type") === "alphanumeric";
  const group = Number(host.getAttribute("data-ds-otp-group")) || 0;
  const filter = (text) => String(text).toUpperCase().replace(alpha ? /[^0-9A-Z]/g : /\D/g, "");
  const label = source.id ? document.querySelector(`label[for="${source.id}"]`) : null;
  const required = source.required;

  const row = document.createElement("div");
  row.className = "ds-otp__cells";
  row.setAttribute("role", "group");
  if (label) { label.id ||= uid("otp-label"); row.setAttribute("aria-labelledby", label.id); }
  else if (source.getAttribute("aria-label")) row.setAttribute("aria-label", source.getAttribute("aria-label"));
  if (source.hasAttribute("aria-describedby")) row.setAttribute("aria-describedby", source.getAttribute("aria-describedby"));

  const cells = Array.from({ length }, (_, i) => {
    const cell = document.createElement("input");
    cell.type = "text";
    cell.className = `input ds-otp__cell${source.classList.contains("input-sm") ? " input-sm" : ""}`;
    cell.inputMode = alpha ? "text" : "numeric";
    cell.autocomplete = i === 0 ? "one-time-code" : "off";
    cell.autocapitalize = "characters";
    cell.spellcheck = false;
    cell.disabled = source.disabled;
    cell.readOnly = source.readOnly;
    cell.setAttribute("aria-label", t("otp.digit", { index: i + 1, length }));
    if (source.hasAttribute("aria-invalid")) cell.setAttribute("aria-invalid", source.getAttribute("aria-invalid"));
    if (i === 0 && source.id) { cell.id = source.id; source.id = `${source.id}-value`; }
    if (i === 0 && source.hasAttribute("aria-describedby")) cell.setAttribute("aria-describedby", source.getAttribute("aria-describedby"));
    return cell;
  });
  cells.forEach((cell, i) => {
    if (group && i > 0 && i % group === 0) {
      const sep = document.createElement("span");
      sep.className = "ds-otp__sep";
      sep.setAttribute("aria-hidden", "true");
      row.append(sep);
    }
    row.append(cell);
  });
  const status = document.createElement("span");
  status.className = "ds-otp__status";
  status.setAttribute("aria-hidden", "true");
  row.append(status);
  source.before(row);
  source.type = "hidden";
  source.required = false;
  const announce = liveRegion(host);

  const value = () => cells.map((c) => c.value).join("");
  const sync = (user = true) => {
    const code = value();
    source.value = code;
    cells.forEach((c) => c.toggleAttribute("data-filled", c.value !== ""));
    const incomplete = code.length > 0 ? code.length < length : required;
    cells[0].setCustomValidity(incomplete ? t("otp.incomplete", { length }) : "");
    if (user && host.getAttribute("data-state") === "error") setState("");
    if (user) fire(source);
    if (code.length === length && cells.every((c) => c.value)) {
      announce(t("otp.complete"));
      emit(host, "ds:otp:complete", { value: code });
      if (user && host.hasAttribute("data-ds-otp-autosubmit")) source.form?.requestSubmit();
    }
  };
  const fill = (from, text, focus = true) => {
    const chars = filter(text).slice(0, length - from).split("");
    chars.forEach((ch, k) => { cells[from + k].value = ch; });
    const next = Math.min(length - 1, from + chars.length);
    if (focus) { focusQuietly(cells[chars.length ? next : from]); cells[next].select?.(); }
    cells.forEach((c) => { c._dsPrev = c.value; });
    return chars.length;
  };
  const setState = (state) => {
    if (state === "busy") host.setAttribute("aria-busy", "true"); else host.removeAttribute("aria-busy");
    if (state === "error" || state === "success") host.setAttribute("data-state", state); else host.removeAttribute("data-state");
    cells.forEach((c) => {
      if (state === "error") c.setAttribute("aria-invalid", "true"); else c.removeAttribute("aria-invalid");
      c.readOnly = state === "busy" || state === "success" || source.readOnly;
    });
  };

  cells.forEach((cell, i) => {
    cell.addEventListener("focus", () => cell.select());
    cell.addEventListener("input", () => {
      let text = filter(cell.value);
      // Mobile keyboards send no usable key in keydown: a second character typed into a filled cell replaces it.
      if (text.length === 2 && cell._dsPrev && text.includes(cell._dsPrev)) text = text.replace(cell._dsPrev, "");
      if (text.length <= 1) {
        cell.value = text;
        if (text && i < length - 1) focusQuietly(cells[i + 1]);
      } else {
        // Autofill (one-time-code) or fast typing delivered several characters into one cell.
        cell.value = "";
        fill(text.length >= length ? 0 : i, text);
      }
      cells.forEach((c) => { c._dsPrev = c.value; });
      sync();
    });
    cell.addEventListener("keydown", (event) => {
      const rtl = getComputedStyle(row).direction === "rtl";
      const prev = rtl ? "ArrowRight" : "ArrowLeft";
      const next = rtl ? "ArrowLeft" : "ArrowRight";
      if (event.key === "Backspace" && !cell.value && i > 0) {
        event.preventDefault();
        cells[i - 1].value = "";
        focusQuietly(cells[i - 1]);
        sync();
      } else if (event.key === "Delete") {
        event.preventDefault();
        cell.value = "";
        sync();
      } else if (event.key === prev && i > 0) { event.preventDefault(); focusQuietly(cells[i - 1]); cells[i - 1].select(); }
      else if (event.key === next && i < length - 1) { event.preventDefault(); focusQuietly(cells[i + 1]); cells[i + 1].select(); }
      else if (event.key === "Home") { event.preventDefault(); focusQuietly(cells[0]); }
      else if (event.key === "End") { event.preventDefault(); focusQuietly(cells[length - 1]); }
      else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && cell.value && filter(event.key)) {
        // Typing into a filled cell replaces it.
        cell.value = "";
      }
    });
    cell.addEventListener("paste", (event) => {
      event.preventDefault();
      const text = event.clipboardData?.getData("text") ?? "";
      const chars = filter(text);
      if (!chars) return;
      fill(chars.length >= length ? 0 : i, chars);
      sync();
    });
  });
  source.form?.addEventListener("reset", () => setTimeout(() => { cells.forEach((c) => { c.value = ""; }); setState(""); sync(false); }));
  if (source.value) fill(0, source.value, false);
  sync(false);
  if (source.getAttribute("aria-invalid") === "true") setState("error");
  const api = {
    setState,
    clear: () => { cells.forEach((c) => { c.value = ""; }); setState(""); sync(false); focusQuietly(cells[0]); },
    focus: () => focusQuietly(cells.find((c) => !c.value) ?? cells[0]),
    get value() { return value(); },
  };
  otpApi.set(host, api);
  host._dsOtp = api;
}

/** DS.otp(element) → { setState("error" | "success" | "busy" | ""), clear(), focus(), value }. */
export function otp(element) {
  const host = element?.closest?.(".ds-otp") ?? element;
  return otpApi.get(host) ?? null;
}

/** DS.tagsInput(sourceInput) → { add(text), remove(tag), clear(), get() }. */
export function tagsInput(element) {
  const source = element?.matches?.("[data-ds-tags]") ? element : element?.closest?.(".ds-tags-input")?.querySelector("[data-ds-tags]");
  return (source && tagsApi.get(source)) ?? null;
}

/* ================================================================== module contract */

export function wire() {
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === "range") paintRange(target);
  });
  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;
    onCheckboxChange(target);
    if (target.hasAttribute("data-ds-switch-action") && !target.hasAttribute("aria-busy")) saveSwitch(target);
  });
  // A busy switch ignores clicks and Space (its state is being saved).
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.getAttribute("aria-busy") === "true") event.preventDefault();
    const label = target instanceof Element ? target.closest("label") : null;
    if (label?.control?.getAttribute?.("aria-busy") === "true") event.preventDefault();
  }, true);
  document.addEventListener("reset", (event) => {
    setTimeout(() => event.target.querySelectorAll?.("input[type=range]").forEach(paintRange));
  }, true);
}

export function init(root) {
  initCheckboxes(root);
  root.querySelectorAll("input[type=range]").forEach((input) => input.style.setProperty("--ds-range-p", ratio(input).toFixed(4)));
  root.querySelectorAll(".ds-slider").forEach(enhanceSlider);
  root.querySelectorAll(".ds-rating").forEach(enhanceRating);
  root.querySelectorAll(".ds-rating-display[data-ds-rating-value]").forEach(enhanceRatingDisplay);
  root.querySelectorAll("input[data-ds-tags]").forEach(enhanceTags);
  root.querySelectorAll(".ds-otp[data-ds-otp]").forEach(enhanceOtp);
}

export const api = { switchBusy, otp, tagsInput };
