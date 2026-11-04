/* Text-like fields: clear button, character counter, textarea auto-grow fallback, number stepper (spinbutton),
   password caps-lock warning and strength meter, search shortcut and recent searches, inline field help.
   Hooks: .ds-input (+ .ds-input__clear), [data-ds-counter] [data-ds-max], textarea[data-ds-autogrow],
   .ds-number [data-ds-step] [data-ds-min|max|step|big-step|decimals|snap|locale], [data-ds-capslock], [data-ds-strength],
   [data-ds-shortcut], [data-ds-recent], [data-ds-field-help].
   Events: ds:input:clear, ds:number:change, ds:search:submit, ds:search:clear, ds:password:capslock.
   Owner: batch A2 forms-basic. Contract: docs/_contributing.md. */
import { t, addMessages, focusQuietly, locale, uid, icon, registerIcons, store, key, html, normalize } from "../core.js";

registerIcons({
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
});

addMessages({
  en: {
    "inputs.clear": "Clear",
    "inputs.help": "More information",
    "inputs.count": "{count} / {max}",
    "inputs.remaining": "{count} characters remaining",
    "inputs.remainingOne": "1 character remaining",
    "inputs.limit": "Character limit reached",
    "inputs.over": "{count} characters over the limit",
    "inputs.increase": "Increase",
    "inputs.decrease": "Decrease",
    "inputs.capsOn": "Caps Lock is on",
    "inputs.strength.1": "Too weak",
    "inputs.strength.2": "Weak",
    "inputs.strength.3": "Good",
    "inputs.strength.4": "Strong",
    "inputs.recent": "Recent searches",
    "inputs.recentClear": "Clear recent searches",
  },
  id: {
    "inputs.clear": "Hapus isi",
    "inputs.help": "Informasi lebih lanjut",
    "inputs.count": "{count} / {max}",
    "inputs.remaining": "Sisa {count} karakter",
    "inputs.remainingOne": "Sisa 1 karakter",
    "inputs.limit": "Batas karakter tercapai",
    "inputs.over": "Melebihi batas {count} karakter",
    "inputs.increase": "Tambah",
    "inputs.decrease": "Kurangi",
    "inputs.capsOn": "Caps Lock aktif",
    "inputs.strength.1": "Sangat lemah",
    "inputs.strength.2": "Lemah",
    "inputs.strength.3": "Baik",
    "inputs.strength.4": "Kuat",
    "inputs.recent": "Pencarian terbaru",
    "inputs.recentClear": "Hapus riwayat pencarian",
  },
});

const fire = (el, type, init) => el.dispatchEvent(new Event(type, { bubbles: true, ...init }));
const custom = (el, name, detail) => el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
const num = (v) => (v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v));

/* ------------------------------------------------------------------ .ds-input: ready, empty, clear */
function control(wrapper) {
  return wrapper.querySelector(":scope > .ds-input__control");
}

function syncEmpty(wrapper) {
  const c = control(wrapper);
  if (c) wrapper.toggleAttribute("data-empty", c.value === "");
}

function prepareInput(wrapper) {
  const c = control(wrapper);
  if (!c) return;
  const clear = wrapper.querySelector(":scope > .ds-input__clear");
  if (clear && !clear.hasAttribute("aria-label")) clear.setAttribute("aria-label", t("inputs.clear"));
  if (clear) clear.setAttribute("tabindex", "-1");
  wrapper.setAttribute("data-ds-ready", "");
  syncEmpty(wrapper);
}

function clearInput(wrapper) {
  const c = control(wrapper);
  if (!c || c.disabled || c.readOnly) return;
  c.value = "";
  fire(c, "input");
  fire(c, "change");
  syncEmpty(wrapper);
  focusQuietly(c);
  custom(wrapper, "ds:input:clear", { control: c });
  if (wrapper.classList.contains("ds-search")) custom(wrapper, "ds:search:clear", { control: c });
}

/* ------------------------------------------------------------------ counter */
const counterTimers = new WeakMap();
const counterLast = new WeakMap();

function counterElement(c) {
  const sel = c.getAttribute("data-ds-counter");
  if (sel && sel.startsWith("#")) return document.querySelector(sel);
  return c.closest(".ds-field")?.querySelector(".ds-counter") ?? null;
}

function counterMax(c) {
  const soft = num(c.dataset.dsMax);
  if (soft != null) return soft;
  return c.maxLength > 0 ? c.maxLength : null;
}

function updateCounter(c, announce) {
  const el = counterElement(c);
  const max = counterMax(c);
  if (!el || max == null) return;
  const count = c.value.length;
  const remaining = max - count;
  const threshold = Math.max(10, Math.ceil(max * 0.1));
  const state = remaining < 0 ? "over" : remaining === 0 ? "limit" : remaining <= threshold ? "warn" : "ok";
  el.textContent = t("inputs.count", { count, max });
  el.dataset.state = state;
  el.setAttribute("aria-hidden", "true");
  let live = el.parentElement?.querySelector(":scope > .ds-sr-only-live");
  if (!live) {
    live = document.createElement("span");
    live.className = "ds-sr-only-live";
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    el.after(live);
  }
  if (!announce) return;
  window.clearTimeout(counterTimers.get(c));
  counterTimers.set(c, window.setTimeout(() => {
    const message = state === "ok" ? ""
      : state === "over" ? t("inputs.over", { count: -remaining })
      : state === "limit" ? t("inputs.limit")
      : remaining === 1 ? t("inputs.remainingOne") : t("inputs.remaining", { count: remaining });
    if (counterLast.get(c) === message) return;
    counterLast.set(c, message);
    live.textContent = message;
  }, 800));
}

/* ------------------------------------------------------------------ textarea auto-grow fallback */
const nativeAutogrow = typeof CSS !== "undefined" && CSS.supports?.("field-sizing", "content");

function autogrow(area) {
  if (nativeAutogrow) return;
  area.style.height = "auto";
  const border = area.offsetHeight - area.clientHeight;
  area.style.height = `${area.scrollHeight + border}px`;
}

/* ------------------------------------------------------------------ number input (WAI-ARIA spinbutton) */
function numberConfig(input) {
  const wrap = input.closest(".ds-number");
  const step = Math.abs(num(input.dataset.dsStep) ?? 1) || 1;
  const decimalsOf = (n) => (Number.isFinite(n) && String(n).includes(".") ? String(n).split(".")[1].length : 0);
  const min = num(input.dataset.dsMin);
  const max = num(input.dataset.dsMax);
  return {
    wrap,
    step,
    big: num(input.dataset.dsBigStep) ?? step * 10,
    min: min ?? -Infinity,
    max: max ?? Infinity,
    decimals: num(input.dataset.dsDecimals) ?? Math.max(decimalsOf(step), decimalsOf(min ?? 0)),
    fixed: input.hasAttribute("data-ds-fixed"),
    snap: input.hasAttribute("data-ds-snap"),
    locale: wrap?.hasAttribute("data-ds-locale") ? (wrap.getAttribute("data-ds-locale") || html.lang || "en") : null,
  };
}

function separators(loc) {
  const parts = new Intl.NumberFormat(loc).formatToParts(11111.1);
  return {
    group: parts.find((p) => p.type === "group")?.value ?? ",",
    decimal: parts.find((p) => p.type === "decimal")?.value ?? ".",
  };
}

/** Text → number, or null when empty, or NaN when it is not a number. */
function parseNumber(text, cfg) {
  let s = String(text ?? "").replace(/[\s  ]/g, "");
  if (!s) return null;
  if (cfg.locale) {
    const { group, decimal } = separators(cfg.locale);
    s = s.split(group.replace(/[\s  ]/g, "")).join("").replace(decimal, ".");
  } else if (s.includes(",") && !s.includes(".")) {
    s = s.replace(",", ".");
  } else {
    s = s.replace(/,/g, "");
  }
  s = s.replace("−", "-");
  return /^[+-]?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : Number.NaN;
}

function formatNumber(value, cfg) {
  if (value == null || Number.isNaN(value)) return "";
  const rounded = Number(value.toFixed(cfg.decimals));
  if (cfg.locale) {
    return new Intl.NumberFormat(cfg.locale, { minimumFractionDigits: cfg.fixed ? cfg.decimals : 0, maximumFractionDigits: cfg.decimals }).format(rounded);
  }
  return cfg.fixed ? rounded.toFixed(cfg.decimals) : String(rounded);
}

const clamp = (v, cfg) => Math.min(cfg.max, Math.max(cfg.min, v));

function unitOf(wrap) {
  return wrap?.querySelector(":scope > .ds-input__affix.is-end")?.textContent.trim() ?? "";
}

function syncNumber(input, value) {
  const cfg = numberConfig(input);
  const v = value === undefined ? parseNumber(input.value, cfg) : value;
  const ok = v != null && !Number.isNaN(v);
  if (ok) {
    input.setAttribute("aria-valuenow", String(v));
    const unit = unitOf(cfg.wrap);
    input.setAttribute("aria-valuetext", unit ? `${formatNumber(v, cfg)} ${unit}` : formatNumber(v, cfg));
  } else {
    input.removeAttribute("aria-valuenow");
    input.removeAttribute("aria-valuetext");
  }
  if (Number.isFinite(cfg.min)) input.setAttribute("aria-valuemin", String(cfg.min));
  if (Number.isFinite(cfg.max)) input.setAttribute("aria-valuemax", String(cfg.max));
  const twin = input._dsTwin;
  if (twin) twin.value = ok ? String(Number(v.toFixed(cfg.decimals))) : "";
  cfg.wrap?.querySelectorAll(".ds-number__step").forEach((button) => {
    const dir = Number(button.dataset.dsStep) < 0 ? -1 : 1;
    const blocked = input.disabled || input.readOnly || (ok && (dir < 0 ? v <= cfg.min : v >= cfg.max));
    if (blocked) button.setAttribute("aria-disabled", "true");
    else button.removeAttribute("aria-disabled");
  });
}

function prepareNumber(wrap) {
  const input = wrap.querySelector(":scope > .ds-input__control");
  if (!input || input._dsNumber) return;
  input._dsNumber = true;
  input.setAttribute("role", "spinbutton");
  if (!input.hasAttribute("inputmode")) input.setAttribute("inputmode", numberConfig(input).decimals > 0 ? "decimal" : "numeric");
  input.setAttribute("autocomplete", input.getAttribute("autocomplete") ?? "off");
  wrap.querySelectorAll(".ds-number__step").forEach((button) => {
    button.setAttribute("tabindex", "-1");
    if (!button.hasAttribute("aria-label")) button.setAttribute("aria-label", Number(button.dataset.dsStep) < 0 ? t("inputs.decrease") : t("inputs.increase"));
    button.setAttribute("aria-controls", input.id || (input.id = uid("number")));
  });
  const cfg = numberConfig(input);
  if (cfg.locale && input.name) {
    // The visible field shows the locale format; a hidden twin posts the plain number.
    const twin = document.createElement("input");
    twin.type = "hidden";
    twin.name = input.name;
    input.removeAttribute("name");
    input.after(twin);
    input._dsTwin = twin;
  }
  const first = parseNumber(input.value, cfg);
  if (first != null && !Number.isNaN(first)) input.value = formatNumber(clamp(first, cfg), cfg);
  input.dataset.dsLast = input.value;
  syncNumber(input);
}

function writeNumber(input, value, { commit = false } = {}) {
  const cfg = numberConfig(input);
  let v = clamp(value, cfg);
  if (cfg.snap && Number.isFinite(cfg.min)) v = cfg.min + Math.round((v - cfg.min) / cfg.step) * cfg.step;
  v = clamp(Number(v.toFixed(cfg.decimals)), cfg);
  const text = formatNumber(v, cfg);
  const changed = text !== input.value;
  input.value = text;
  input.dataset.dsLast = text;
  syncNumber(input, v);
  syncEmpty(input.parentElement);
  if (changed) {
    fire(input, "input");
    if (commit) fire(input, "change");
    custom(input, "ds:number:change", { value: v, text });
  }
  return v;
}

function stepNumber(input, direction, multiplier = 1, commit = true) {
  if (input.disabled || input.readOnly) return false;
  const cfg = numberConfig(input);
  const current = parseNumber(input.value, cfg);
  const base = current == null || Number.isNaN(current) ? (Number.isFinite(cfg.min) ? cfg.min : 0) : current;
  const next = current == null || Number.isNaN(current) ? base : base + direction * cfg.step * multiplier;
  const before = input.value;
  writeNumber(input, next, { commit });
  return input.value !== before;
}

function commitNumber(input) {
  const cfg = numberConfig(input);
  const v = parseNumber(input.value, cfg);
  if (v == null) {
    syncNumber(input, null);
    return;
  }
  if (Number.isNaN(v)) {
    input.value = input.dataset.dsLast ?? "";
    syncNumber(input);
    return;
  }
  const before = input.value;
  writeNumber(input, v, { commit: false });
  if (input.value !== before) fire(input, "change");
}

let hold = null;

function stopHold() {
  if (!hold) return;
  window.clearTimeout(hold.timer);
  const { input } = hold;
  hold = null;
  fire(input, "change");
}

function startHold(button) {
  const wrap = button.closest(".ds-number");
  const input = wrap?.querySelector(":scope > .ds-input__control");
  if (!input || button.getAttribute("aria-disabled") === "true") return;
  const direction = Number(button.dataset.dsStep) < 0 ? -1 : 1;
  stepNumber(input, direction, 1, false);
  hold = { input, timer: 0 };
  let delay = 150;
  const tick = () => {
    if (!hold) return;
    const moved = stepNumber(input, direction, 1, false);
    if (!moved) { stopHold(); return; }
    delay = Math.max(35, delay * 0.9);
    hold.timer = window.setTimeout(tick, delay);
  };
  hold.timer = window.setTimeout(tick, 420);
}

/* ------------------------------------------------------------------ password */
function updateCaps(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.matches("[data-ds-capslock]")) return;
  const message = target.closest(".ds-field")?.querySelector(".ds-password__caps");
  if (!message || typeof event.getModifierState !== "function") return;
  const on = event.type !== "blur" && event.getModifierState("CapsLock");
  const text = on ? t("inputs.capsOn") : "";
  if (message.textContent !== text) {
    message.textContent = text;
    custom(target, "ds:password:capslock", { on });
  }
}

export function passwordScore(value) {
  if (!value) return 0;
  const len = value.length;
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(value)).length;
  let points = (len >= 8) + (len >= 12) + (classes >= 3) + (len >= 16 || (classes === 4 && len >= 12));
  let level = len < 8 ? 1 : Math.max(1, points);
  if (/(password|passw0rd|qwerty|123456|admin|letmein|welcome|sandi|rahasia)/i.test(value)) level = Math.min(level, 1);
  if (/(.)\1{3,}/.test(value) || new Set(value).size < 5) level = Math.min(level, 2);
  return Math.min(4, level);
}

const strengthTimers = new WeakMap();

function updateStrength(input) {
  const meter = input.closest(".ds-field")?.querySelector(".ds-strength");
  if (!meter) return;
  const level = passwordScore(input.value);
  meter.dataset.level = String(level);
  const label = meter.querySelector(".ds-strength__label");
  if (!label) return;
  window.clearTimeout(strengthTimers.get(input));
  strengthTimers.set(input, window.setTimeout(() => { label.textContent = level ? t(`inputs.strength.${level}`) : ""; }, 300));
}

/* ------------------------------------------------------------------ search: shortcut, escape, recent */
function recentKey(c) {
  return key(`recent-${c.dataset.dsRecentKey || c.name || c.id || "search"}`);
}

function readRecent(c) {
  try {
    const list = JSON.parse(store.get(recentKey(c)) ?? "[]");
    return Array.isArray(list) ? list.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function saveRecent(c, value) {
  const text = value.trim();
  if (!text) return;
  const max = num(c.dataset.dsRecent) ?? 5;
  const next = [text, ...readRecent(c).filter((v) => normalize(v) !== normalize(text))].slice(0, max);
  store.set(recentKey(c), JSON.stringify(next));
}

function recentPanel(c) {
  const wrap = c.closest(".ds-input");
  const box = wrap?.closest(".ds-search-box") ?? wrap?.parentElement;
  return box?.querySelector(":scope > .ds-search__recent") ?? null;
}

function openRecent(c) {
  const panel = recentPanel(c);
  if (!panel) return;
  const query = normalize(c.value);
  const items = readRecent(c).filter((v) => !query || normalize(v).includes(query));
  const list = panel.querySelector(".ds-search__recent-list");
  list.replaceChildren();
  if (!items.length) { closeRecent(c); return; }
  items.forEach((text) => {
    const li = document.createElement("li");
    li.className = "ds-search__recent-item";
    li.id = uid("recent-item");
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", "false");
    li.insertAdjacentHTML("afterbegin", icon("history"));
    const span = document.createElement("span");
    span.textContent = text;
    li.append(span);
    list.append(li);
  });
  panel.dataset.state = "open";
  c.setAttribute("aria-expanded", "true");
  c.removeAttribute("aria-activedescendant");
}

function closeRecent(c) {
  const panel = recentPanel(c);
  if (!panel) return;
  panel.dataset.state = "closed";
  c.setAttribute("aria-expanded", "false");
  c.removeAttribute("aria-activedescendant");
  panel.querySelectorAll("[aria-selected=true]").forEach((el) => el.setAttribute("aria-selected", "false"));
}

function prepareRecent(c) {
  const panel = recentPanel(c);
  if (!panel || panel._dsReady) return;
  panel._dsReady = true;
  panel.dataset.state = "closed";
  let list = panel.querySelector(".ds-search__recent-list");
  if (!list) {
    const title = document.createElement("p");
    title.className = "ds-search__recent-title";
    title.id = uid("recent-title");
    title.textContent = t("inputs.recent");
    list = document.createElement("ul");
    list.className = "ds-search__recent-list";
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "ds-search__recent-clear";
    clear.textContent = t("inputs.recentClear");
    panel.append(title, list, clear);
  }
  list.id ||= uid("recent-list");
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", t("inputs.recent"));
  c.setAttribute("role", "combobox");
  c.setAttribute("aria-autocomplete", "list");
  c.setAttribute("aria-expanded", "false");
  c.setAttribute("aria-controls", list.id);
}

function pickRecent(c, text) {
  c.value = text;
  fire(c, "input");
  syncEmpty(c.closest(".ds-input"));
  closeRecent(c);
  submitSearch(c);
}

function submitSearch(c) {
  if (c.dataset.dsRecent != null) saveRecent(c, c.value);
  custom(c, "ds:search:submit", { value: c.value });
  if (c.form && !c.dataset.dsNoSubmit) c.form.requestSubmit();
}

function moveRecent(c, direction) {
  const panel = recentPanel(c);
  if (!panel || panel.dataset.state !== "open") return false;
  const items = [...panel.querySelectorAll("[role=option]")];
  if (!items.length) return false;
  const index = items.findIndex((el) => el.getAttribute("aria-selected") === "true");
  const next = index < 0 ? (direction > 0 ? 0 : items.length - 1) : (index + direction + items.length) % items.length;
  items.forEach((el, i) => el.setAttribute("aria-selected", String(i === next)));
  c.setAttribute("aria-activedescendant", items[next].id);
  items[next].scrollIntoView({ block: "nearest" });
  return true;
}

function shortcutMatches(event, spec) {
  const parts = spec.toLowerCase().split("+").map((p) => p.trim());
  const keyName = parts.at(-1);
  const wantMod = parts.includes("mod") || parts.includes("ctrl") || parts.includes("meta");
  const hasMod = event.ctrlKey || event.metaKey;
  if (wantMod !== hasMod || event.altKey) return false;
  if (parts.includes("shift") !== event.shiftKey && keyName.length > 1) return false;
  return event.key.toLowerCase() === keyName;
}

const isEditable = (el) => el instanceof HTMLElement && (el.isContentEditable || el.matches("input, textarea, select"));

/* ------------------------------------------------------------------ inline field help */
function prepareHelp(button) {
  const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
  if (!panel) return;
  if (!button.hasAttribute("aria-label") && !button.textContent.trim()) button.setAttribute("aria-label", t("inputs.help"));
  const open = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(open));
  panel.dataset.state = open ? "open" : "closed";
}

function toggleHelp(button, force) {
  const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
  if (!panel) return;
  const open = force ?? button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
  panel.dataset.state = open ? "open" : "closed";
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const clear = target.closest(".ds-input__clear");
    if (clear) { clearInput(clear.closest(".ds-input")); return; }

    const help = target.closest("[data-ds-field-help]");
    if (help) { toggleHelp(help); return; }

    const step = target.closest(".ds-number__step");
    if (step) {
      // Pointer clicks were already handled on pointerdown (detail > 0); keyboard and assistive clicks have detail 0.
      if (event.detail !== 0) return;
      const input = step.closest(".ds-number")?.querySelector(":scope > .ds-input__control");
      if (input && step.getAttribute("aria-disabled") !== "true") stepNumber(input, Number(step.dataset.dsStep) < 0 ? -1 : 1);
      return;
    }

    const item = target.closest(".ds-search__recent-item");
    if (item) {
      const box = item.closest(".ds-search-box") ?? item.closest(".ds-search__recent")?.parentElement;
      const c = box?.querySelector(".ds-input__control");
      if (c) pickRecent(c, item.textContent.trim());
      return;
    }

    const clearRecent = target.closest(".ds-search__recent-clear");
    if (clearRecent) {
      const box = clearRecent.closest(".ds-search-box") ?? clearRecent.closest(".ds-search__recent")?.parentElement;
      const c = box?.querySelector(".ds-input__control");
      if (c) { store.set(recentKey(c), null); closeRecent(c); focusQuietly(c); }
      return;
    }

    // Click on a recent-enabled field reopens the list.
    const c = target.closest(".ds-input")?.querySelector(":scope > .ds-input__control[data-ds-recent]");
    if (c && !c.value) openRecent(c);
  });

  document.addEventListener("pointerdown", (event) => {
    const step = event.target instanceof Element ? event.target.closest(".ds-number__step") : null;
    if (!step || event.button !== 0) return;
    event.preventDefault();
    startHold(step);
    document.addEventListener("pointerup", stopHold, { once: true });
    document.addEventListener("pointercancel", stopHold, { once: true });
  });

  document.addEventListener("input", (event) => {
    const c = event.target;
    if (!(c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement)) return;
    const wrapper = c.closest(".ds-input");
    if (wrapper) syncEmpty(wrapper);
    if (c.matches("[data-ds-counter], [maxlength][data-ds-counter]")) updateCounter(c, true);
    if (c instanceof HTMLTextAreaElement && c.matches("[data-ds-autogrow]")) autogrow(c);
    if (c.matches("[data-ds-strength]")) updateStrength(c);
    if (c._dsNumber) syncNumber(c);
    if (c.dataset.dsRecent != null) openRecent(c);
  });

  document.addEventListener("keydown", (event) => {
    const c = event.target;

    // Global shortcut for a search field.
    if (!(event.defaultPrevented || event.isComposing)) {
      for (const el of document.querySelectorAll("[data-ds-shortcut]")) {
        const spec = el.getAttribute("data-ds-shortcut");
        const hasMod = /mod|ctrl|meta/i.test(spec);
        if (!spec || (!hasMod && isEditable(c)) || !shortcutMatches(event, spec)) continue;
        const field = el.matches("input, textarea") ? el : el.querySelector(".ds-input__control, input");
        if (!field || field.disabled) continue;
        event.preventDefault();
        field.focus();
        field.select?.();
        return;
      }
    }

    if (!(c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement)) return;
    updateCaps(event);

    if (c._dsNumber && !event.isComposing) {
      const map = { ArrowUp: [1, 1], ArrowDown: [-1, 1], PageUp: [1, 10], PageDown: [-1, 10] };
      if (map[event.key]) {
        event.preventDefault();
        const cfg = numberConfig(c);
        stepNumber(c, map[event.key][0], map[event.key][1] === 10 ? cfg.big / cfg.step : 1);
      } else if (event.key === "Home" || event.key === "End") {
        const cfg = numberConfig(c);
        const edge = event.key === "Home" ? cfg.min : cfg.max;
        if (Number.isFinite(edge)) { event.preventDefault(); writeNumber(c, edge, { commit: true }); }
      } else if (event.key === "Enter") {
        commitNumber(c);
      }
      return;
    }

    if (c.dataset.dsRecent != null) {
      const panel = recentPanel(c);
      const open = panel?.dataset.state === "open";
      if (event.key === "ArrowDown" && !open) { openRecent(c); event.preventDefault(); return; }
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && moveRecent(c, event.key === "ArrowDown" ? 1 : -1)) { event.preventDefault(); return; }
      if (open && event.key === "Enter") {
        const active = panel.querySelector("[aria-selected=true]");
        if (active) { event.preventDefault(); pickRecent(c, active.textContent.trim()); return; }
      }
      if (open && event.key === "Delete") {
        const active = panel.querySelector("[aria-selected=true]");
        if (active) {
          event.preventDefault();
          const text = active.textContent.trim();
          store.set(recentKey(c), JSON.stringify(readRecent(c).filter((v) => v !== text)));
          openRecent(c);
          return;
        }
      }
      if (open && event.key === "Escape") { event.preventDefault(); closeRecent(c); return; }
    }

    const wrapper = c.closest(".ds-input");
    if (c.matches("[type=search]") || wrapper?.classList.contains("ds-search")) {
      if (event.key === "Enter" && !event.isComposing && c.matches("input")) {
        if (c.dataset.dsRecent != null) saveRecent(c, c.value);
        custom(c, "ds:search:submit", { value: c.value });
      } else if (event.key === "Escape" && c.value) {
        event.preventDefault();
        event.stopPropagation();
        clearInput(wrapper);
      }
    } else if (event.key === "Escape" && wrapper?.querySelector(":scope > .ds-input__clear") && c.value) {
      event.preventDefault();
      clearInput(wrapper);
    }
  });

  document.addEventListener("keyup", updateCaps);

  document.addEventListener("focusout", (event) => {
    const c = event.target;
    if (!(c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement)) return;
    if (c._dsNumber) commitNumber(c);
    if (c.matches("[data-ds-capslock]")) updateCaps({ type: "blur", target: c, getModifierState: () => false });
    if (c.dataset.dsRecent != null) {
      const box = c.closest(".ds-search-box");
      if (!box || !box.contains(event.relatedTarget)) closeRecent(c);
    }
  });

  document.addEventListener("focusin", (event) => {
    const c = event.target;
    if (c instanceof HTMLInputElement && c.dataset.dsRecent != null && !c.value && !c.readOnly) openRecent(c);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const help = event.target instanceof Element ? event.target.closest("[data-ds-field-help][aria-expanded=true]") : null;
    if (help) toggleHelp(help, false);
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    form.querySelectorAll("[data-ds-recent]").forEach((c) => saveRecent(c, c.value));
  });

  document.addEventListener("reset", (event) => {
    const form = event.target;
    if (form instanceof HTMLFormElement) window.setTimeout(() => init(form), 0);
  });

  document.addEventListener("wheel", (event) => {
    // A number field in text mode never changes with the wheel; nothing to do. Kept for native type=number fields marked data-ds-nowheel.
    const c = event.target;
    if (c instanceof HTMLInputElement && c.type === "number" && c.hasAttribute("data-ds-nowheel") && document.activeElement === c) c.blur();
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!nativeAutogrow) document.querySelectorAll("textarea[data-ds-autogrow]").forEach(autogrow);
  });
}

export function init(root = document) {
  const scope = root instanceof Element || root instanceof Document ? root : document;
  const find = (selector) => (scope instanceof Element && scope.matches(selector) ? [scope] : []).concat([...scope.querySelectorAll(selector)]);

  find(".ds-input").forEach(prepareInput);
  find(".ds-number").forEach(prepareNumber);
  find("[data-ds-field-help]").forEach(prepareHelp);
  find("[data-ds-counter]").forEach((c) => updateCounter(c, false));
  find("textarea[data-ds-autogrow]").forEach(autogrow);
  find("[data-ds-strength]").forEach((c) => {
    const meter = c.closest(".ds-field")?.querySelector(".ds-strength");
    const label = meter?.querySelector(".ds-strength__label");
    if (label) label.setAttribute("aria-live", "polite");
    if (meter) meter.dataset.level = String(passwordScore(c.value));
    if (label && c.value) label.textContent = t(`inputs.strength.${passwordScore(c.value)}`);
  });
  find("[data-ds-recent]").forEach(prepareRecent);
}

export const api = {
  inputs: {
    refresh: init,
    clear: (el) => clearInput(el.closest(".ds-input") ?? el),
    step: (el, direction = 1) => stepNumber(el, direction),
    setNumber: (el, value) => writeNumber(el, Number(value), { commit: true }),
    passwordScore,
    locale,
  },
};
