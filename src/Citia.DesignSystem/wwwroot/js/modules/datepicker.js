/* Pickers: calendar (Cally), date picker, date range picker, time picker, color picker.
   Owner: batch A4. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).
   Hooks: .ds-calendar > .cally | [data-ds-calendar]; [data-ds-date-picker] (wraps input[type=date]);
   [data-ds-date-range] (two input[type=date]); [data-ds-time-picker] (input[type=time]); [data-ds-color-picker] (input[type=color]).
   Every hook starts from the native input, which keeps its name and posts ISO values (yyyy-MM-dd, HH:mm, #rrggbb).
   Without JavaScript, without Cally or without popover support the native input stays. */
import { config, html, t, addMessages, focusQuietly, uid, placeFloating, icon, registerIcons } from "../core.js";
import { setFieldError, clearFieldError, labelText } from "./validation.js";

registerIcons({
  "calendar-range": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M17 14h-6M13 18H7"/>',
  pipette: '<path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/>',
});

addMessages({
  en: {
    "datepicker.previous": "Previous month",
    "datepicker.next": "Next month",
    "datepicker.jump": "{month}, choose month and year",
    "datepicker.jumpGroup": "Choose month and year",
    "datepicker.year": "Year",
    "datepicker.choose": "Choose date",
    "datepicker.dialog": "Choose {label}",
    "datepicker.today": "Today",
    "datepicker.clear": "Clear",
    "datepicker.clearField": "Clear {label}",
    "datepicker.invalid": "Enter a date as {format}.",
    "datepicker.min": "Choose a date on or after {date}.",
    "datepicker.max": "Choose a date on or before {date}.",
    "datepicker.unavailable": "{date} is not available. Choose another date.",
    "datepicker.fmt.d": "dd",
    "datepicker.fmt.m": "mm",
    "datepicker.fmt.y": "yyyy",
    "datepicker.range.start": "Start date",
    "datepicker.range.end": "End date",
    "datepicker.range.choose": "Choose dates",
    "datepicker.range.pickStart": "Choose the start date.",
    "datepicker.range.pickEnd": "Now choose the end date.",
    "datepicker.range.days": "{count} days",
    "datepicker.range.day": "1 day",
    "datepicker.range.order": "The end date must be on or after the start date.",
    "datepicker.presets": "Presets",
    "datepicker.preset.today": "Today",
    "datepicker.preset.yesterday": "Yesterday",
    "datepicker.preset.last7": "Last 7 days",
    "datepicker.preset.last30": "Last 30 days",
    "datepicker.preset.next7": "Next 7 days",
    "datepicker.preset.thisWeek": "This week",
    "datepicker.preset.thisMonth": "This month",
    "datepicker.preset.lastMonth": "Last month",
    "datepicker.preset.thisYear": "This year",
    "datepicker.time.hour": "Hour",
    "datepicker.time.minute": "Minute",
    "datepicker.time.second": "Second",
    "datepicker.time.period": "AM or PM",
    "datepicker.time.empty": "Empty",
    "datepicker.time.incomplete": "Enter both hours and minutes.",
    "datepicker.time.min": "Choose a time at or after {time}.",
    "datepicker.time.max": "Choose a time at or before {time}.",
    "datepicker.color.hex": "Hex code",
    "datepicker.color.pick": "Open the color picker",
    "datepicker.color.eyedropper": "Pick a color from the screen",
    "datepicker.color.swatches": "Preset colors",
    "datepicker.color.invalid": "Enter a hex color such as #0F766E.",
    "datepicker.color.contrast": "Contrast with {against}: {ratio}:1, {level}",
    "datepicker.color.white": "white",
    "datepicker.color.black": "black",
    "datepicker.color.aaa": "passes AAA",
    "datepicker.color.aa": "passes AA",
    "datepicker.color.large": "large text only",
    "datepicker.color.fail": "below AA",
  },
  id: {
    "datepicker.previous": "Bulan sebelumnya",
    "datepicker.next": "Bulan berikutnya",
    "datepicker.jump": "{month}, pilih bulan dan tahun",
    "datepicker.jumpGroup": "Pilih bulan dan tahun",
    "datepicker.year": "Tahun",
    "datepicker.choose": "Pilih tanggal",
    "datepicker.dialog": "Pilih {label}",
    "datepicker.today": "Hari ini",
    "datepicker.clear": "Kosongkan",
    "datepicker.clearField": "Kosongkan {label}",
    "datepicker.invalid": "Tulis tanggal dengan format {format}.",
    "datepicker.min": "Pilih tanggal {date} atau sesudahnya.",
    "datepicker.max": "Pilih tanggal {date} atau sebelumnya.",
    "datepicker.unavailable": "Tanggal {date} tidak tersedia. Pilih tanggal lain.",
    "datepicker.fmt.d": "hh",
    "datepicker.fmt.m": "bb",
    "datepicker.fmt.y": "tttt",
    "datepicker.range.start": "Tanggal mulai",
    "datepicker.range.end": "Tanggal selesai",
    "datepicker.range.choose": "Pilih rentang tanggal",
    "datepicker.range.pickStart": "Pilih tanggal mulai.",
    "datepicker.range.pickEnd": "Sekarang pilih tanggal selesai.",
    "datepicker.range.days": "{count} hari",
    "datepicker.range.day": "1 hari",
    "datepicker.range.order": "Tanggal selesai harus sama dengan atau sesudah tanggal mulai.",
    "datepicker.presets": "Pilihan cepat",
    "datepicker.preset.today": "Hari ini",
    "datepicker.preset.yesterday": "Kemarin",
    "datepicker.preset.last7": "7 hari terakhir",
    "datepicker.preset.last30": "30 hari terakhir",
    "datepicker.preset.next7": "7 hari ke depan",
    "datepicker.preset.thisWeek": "Minggu ini",
    "datepicker.preset.thisMonth": "Bulan ini",
    "datepicker.preset.lastMonth": "Bulan lalu",
    "datepicker.preset.thisYear": "Tahun ini",
    "datepicker.time.hour": "Jam",
    "datepicker.time.minute": "Menit",
    "datepicker.time.second": "Detik",
    "datepicker.time.period": "AM atau PM",
    "datepicker.time.empty": "Kosong",
    "datepicker.time.incomplete": "Isi jam dan menit.",
    "datepicker.time.min": "Pilih waktu {time} atau sesudahnya.",
    "datepicker.time.max": "Pilih waktu {time} atau sebelumnya.",
    "datepicker.color.hex": "Kode hex",
    "datepicker.color.pick": "Buka pemilih warna",
    "datepicker.color.eyedropper": "Ambil warna dari layar",
    "datepicker.color.swatches": "Warna siap pakai",
    "datepicker.color.invalid": "Tulis warna hex seperti #0F766E.",
    "datepicker.color.contrast": "Kontras dengan {against}: {ratio}:1, {level}",
    "datepicker.color.white": "putih",
    "datepicker.color.black": "hitam",
    "datepicker.color.aaa": "lolos AAA",
    "datepicker.color.aa": "lolos AA",
    "datepicker.color.large": "hanya teks besar",
    "datepicker.color.fail": "di bawah AA",
  },
});

/* ------------------------------------------------------------------ shared helpers */
const READY = new WeakSet();
const OPEN = new Set();
const narrowQuery = window.matchMedia("(max-width: 639.98px)");
const supportsPopover = typeof HTMLElement !== "undefined" && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, "popover");

/** BCP 47 tag for Intl: configure({ locale }), the nearest [lang], or <html lang>. */
const langOf = (el) => config.locale || el?.closest?.("[lang]")?.getAttribute("lang") || html.lang || "en";

const pad = (n, size = 2) => String(n).padStart(size, "0");
const toISO = (y, m, d) => `${pad(y, 4)}-${pad(m)}-${pad(d)}`;
const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function validDate(y, m, d) {
  if (!(y >= 1 && m >= 1 && m <= 12 && d >= 1)) return false;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

const fromISO = (iso) => {
  const m = ISO_RE.exec(iso || "");
  return m && validDate(+m[1], +m[2], +m[3]) ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null;
};
const dateToISO = (date) => toISO(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
const addDays = (iso, days) => { const d = fromISO(iso); d.setUTCDate(d.getUTCDate() + days); return dateToISO(d); };

/** Today as ISO, optionally in an IANA time zone (data-ds-time-zone="Asia/Jakarta"). */
function todayISO(zone) {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: zone || undefined, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  } catch {
    const now = new Date();
    return toISO(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
}

/** First day of the week for a locale, Cally style (0 = Sunday). */
function firstDayOf(tag) {
  try {
    const loc = new Intl.Locale(tag).maximize();
    const info = loc.getWeekInfo?.() ?? loc.weekInfo;
    if (info?.firstDay) return info.firstDay % 7;
  } catch { /* old engines */ }
  return /^(en-US|en-CA|id|ja|ko|zh-TW|he|pt-BR)/i.test(tag) || /^en$/i.test(tag) ? 0 : 1;
}

const fire = (el) => ["input", "change"].forEach((type) => el.dispatchEvent(new Event(type, { bubbles: true })));
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(`ds:${name}`, { bubbles: true, detail }));

/** Numeric date pattern of a locale: order of d/m/y, separator and a hint like dd/mm/yyyy. */
function datePattern(tag) {
  const parts = new Intl.DateTimeFormat(tag, { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
    .formatToParts(new Date(Date.UTC(2026, 10, 23)));
  const order = parts.filter((p) => ["day", "month", "year"].includes(p.type)).map((p) => p.type[0]);
  const sep = (parts.find((p) => p.type === "literal")?.value || "/").trim() || "/";
  const hint = order.map((k) => t(`datepicker.fmt.${k}`)).join(sep);
  return { order: order.length === 3 ? order : ["d", "m", "y"], sep, hint };
}

function formatNumeric(iso, tag) {
  const date = fromISO(iso);
  return date ? new Intl.DateTimeFormat(tag, { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(date) : "";
}

function formatMedium(iso, tag) {
  const date = fromISO(iso);
  return date ? new Intl.DateTimeFormat(tag, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date) : "";
}

function monthNames(tag) {
  const names = [];
  for (const locale of [tag, "en"]) {
    for (const month of ["long", "short"]) {
      const f = new Intl.DateTimeFormat(locale, { month, timeZone: "UTC" });
      for (let i = 0; i < 12; i++) names.push([f.format(new Date(Date.UTC(2026, i, 1))).toLocaleLowerCase(locale).replace(/\.$/, ""), i + 1]);
    }
  }
  return names.sort((a, b) => b[0].length - a[0].length);
}

/** Parse what a person typed: ISO, numeric in the locale order (with any separator or none), or with a month name. */
function parseDate(text, tag) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(raw);
  if (iso) return validDate(+iso[1], +iso[2], +iso[3]) ? toISO(+iso[1], +iso[2], +iso[3]) : null;
  const { order } = datePattern(tag);
  const fullYear = (y, digits) => (digits <= 2 ? 2000 + y : y);
  let y; let m; let d;
  if (/^\d{6}$|^\d{8}$/.test(raw)) {
    const yLen = raw.length === 8 ? 4 : 2;
    let i = 0;
    for (const key of order) {
      const len = key === "y" ? yLen : 2;
      const v = +raw.slice(i, i + len);
      i += len;
      if (key === "y") y = fullYear(v, yLen); else if (key === "m") m = v; else d = v;
    }
  } else {
    let rest = raw.toLocaleLowerCase(tag);
    const named = monthNames(tag).find(([name]) => name.length > 2 && rest.includes(name));
    if (named) { m = named[1]; rest = rest.replace(named[0], " "); }
    const nums = rest.split(/[^\d]+/).filter(Boolean);
    if (named) {
      if (nums.length !== 2) return null;
      const [a, b] = nums;
      if (a.length >= 3 || +a > 31) { y = fullYear(+a, a.length); d = +b; } else { d = +a; y = fullYear(+b, b.length); }
    } else {
      if (nums.length !== 3) return null;
      order.forEach((key, i) => {
        const v = +nums[i];
        if (key === "y") y = fullYear(v, nums[i].length); else if (key === "m") m = v; else d = v;
      });
    }
  }
  return validDate(y, m, d) ? toISO(y, m, d) : null;
}

/** Disallowed dates: data-ds-disabled-dates="2026-12-25 2026-12-26" and data-ds-disable-weekends. */
function disallowFn(source) {
  const list = new Set((source.getAttribute("data-ds-disabled-dates") || "").split(/[\s,]+/).filter(Boolean));
  const weekends = source.hasAttribute("data-ds-disable-weekends");
  if (!list.size && !weekends) return null;
  return (date) => {
    const iso = date instanceof Date ? dateToISO(date) : String(date);
    const day = (date instanceof Date ? date : fromISO(iso))?.getUTCDay();
    return list.has(iso) || (weekends && (day === 0 || day === 6));
  };
}

/** Date error for an ISO value against min, max and disallowed dates; "" when valid. */
function dateProblem(iso, { min, max, disallowed, tag }) {
  if (min && iso < min) return t("datepicker.min", { date: formatMedium(min, tag) });
  if (max && iso > max) return t("datepicker.max", { date: formatMedium(max, tag) });
  if (disallowed?.(fromISO(iso))) return t("datepicker.unavailable", { date: formatMedium(iso, tag) });
  return "";
}

const clamp = (iso, min, max) => (min && iso < min ? min : max && iso > max ? max : iso);
const make = (tag, props = {}, children = []) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k === "html") el.innerHTML = v; // static icon markup only
    else if (k in el && typeof v !== "string") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  el.append(...children);
  return el;
};
const iconButton = (name, label, cls = "ds-picker-trigger") => make("button", { type: "button", class: cls, "aria-label": label, html: icon(name) });

/* ------------------------------------------------------------------ Cally loading */
let callyPromise = null;
function ensureCally() {
  if (customElements.get("calendar-date")) return Promise.resolve(true);
  if (callyPromise) return callyPromise;
  const tag = document.querySelector('script[src*="cally"]');
  const load = () => import(new URL("../../lib/cally/cally.js", import.meta.url).href).then(() => true, () => false);
  callyPromise = tag
    ? Promise.race([customElements.whenDefined("calendar-date").then(() => true), new Promise((r) => setTimeout(r, 2500, null))])
      .then((ok) => ok || (customElements.get("calendar-date") ? true : load()))
    : load();
  return callyPromise;
}

/* ------------------------------------------------------------------ calendar (Cally) */
/**
 * Prepare a Cally element: locale and first weekday from the page language, localized navigation labels,
 * a month/year title button with a jump view, today in a time zone, disallowed dates.
 */
function setupCalendar(cal, source = cal) {
  if (READY.has(cal)) return cal._ds;
  READY.add(cal);
  const tag = langOf(source);
  if (!cal.hasAttribute("locale")) cal.locale = tag;
  if (!cal.hasAttribute("first-day-of-week")) cal.firstDayOfWeek = firstDayOf(tag);
  if (!cal.hasAttribute("format-weekday")) cal.formatWeekday = "short";
  const zone = source.getAttribute("data-ds-time-zone") || cal.getAttribute("data-ds-time-zone");
  if (zone) cal.today = todayISO(zone);
  const disallowed = disallowFn(source) || (source !== cal ? disallowFn(cal) : null);
  if (disallowed) cal.isDateDisallowed = disallowed;

  for (const [slot, name, key] of [["previous", "chevron-left", "datepicker.previous"], ["next", "chevron-right", "datepicker.next"]]) {
    let el = cal.querySelector(`:scope > [slot="${slot}"]`);
    if (!el) {
      const holder = document.createElement("template");
      holder.innerHTML = icon(name);
      el = holder.content.firstElementChild;
      el.setAttribute("slot", slot);
      cal.prepend(el);
    }
    el.removeAttribute("aria-hidden");
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", t(key));
  }

  const shell = cal.closest(".ds-calendar");
  const state = { cal, tag, zone, disallowed, title: null, jump: null };
  cal._ds = state;
  if (cal.tagName === "CALENDAR-RANGE") {
    cal.addEventListener("rangestart", () => cal.setAttribute("data-state", "tentative"));
    cal.addEventListener("rangeend", () => cal.removeAttribute("data-state"));
  }
  if (shell && !cal.querySelector(':scope > [slot="heading"]')) buildJump(state, shell);
  cal.setAttribute("data-ds-ready", "");
  return state;
}

const focusedISO = (cal) => String(cal.focusedDate || (cal.value || "").split("/")[0] || cal.today || todayISO());

function buildJump(state, shell) {
  const { cal, tag } = state;
  const title = make("button", { type: "button", slot: "heading", class: "ds-calendar__title", "aria-expanded": "false" });
  const titleText = make("span");
  title.append(titleText);
  title.insertAdjacentHTML("beforeend", icon("chevron-down"));
  cal.append(title);

  const jumpId = uid("calendar-jump");
  title.setAttribute("aria-controls", jumpId);
  const yearSelect = make("select", { class: "select select-sm" });
  const year = make("label", { class: "ds-calendar__year" }, [make("span", { text: t("datepicker.year") }), yearSelect]);
  const grid = make("div", { class: "ds-calendar__month-grid" });
  const monthFmt = new Intl.DateTimeFormat(tag, { month: "short", timeZone: "UTC" });
  const longFmt = new Intl.DateTimeFormat(tag, { month: "long", year: "numeric", timeZone: "UTC" });
  const months = Array.from({ length: 12 }, (_, i) => {
    const b = make("button", { type: "button", text: monthFmt.format(new Date(Date.UTC(2026, i, 1))), "data-month": String(i + 1) });
    grid.append(b);
    return b;
  });
  const jump = make("div", { class: "ds-calendar__jump", id: jumpId, role: "group", "aria-label": t("datepicker.jumpGroup"), hidden: true }, [year, grid]);
  shell.append(jump);
  state.title = title;
  state.jump = jump;

  const minISO = () => cal.min || "";
  const maxISO = () => cal.max || "";
  const syncTitle = () => {
    const heading = cal.shadowRoot?.querySelector("#h")?.textContent?.trim();
    const iso = focusedISO(cal);
    const text = heading || longFmt.format(fromISO(iso.slice(0, 7) + "-01") || new Date());
    titleText.textContent = text;
    title.setAttribute("aria-label", t("datepicker.jump", { month: text }));
  };
  const renderJump = () => {
    const iso = focusedISO(cal);
    const y = +iso.slice(0, 4);
    const now = +(cal.today || todayISO()).slice(0, 4);
    const from = minISO() ? +minISO().slice(0, 4) : Math.min(y, now) - 100;
    const to = maxISO() ? +maxISO().slice(0, 4) : Math.max(y, now) + 20;
    yearSelect.replaceChildren(...Array.from({ length: to - from + 1 }, (_, i) => new Option(String(from + i), String(from + i), false, from + i === y)));
    renderMonths();
  };
  const renderMonths = () => {
    const iso = focusedISO(cal);
    const y = +yearSelect.value;
    const today = (cal.today || todayISO()).slice(0, 7);
    months.forEach((b, i) => {
      const ym = `${pad(y, 4)}-${pad(i + 1)}`;
      b.setAttribute("aria-pressed", String(ym === iso.slice(0, 7)));
      if (ym === today) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      b.disabled = Boolean((minISO() && ym < minISO().slice(0, 7)) || (maxISO() && ym > maxISO().slice(0, 7)));
      b.setAttribute("aria-label", longFmt.format(new Date(Date.UTC(y, i, 1))));
    });
  };
  const toggleJump = (open) => {
    jump.hidden = !open;
    title.setAttribute("aria-expanded", String(open));
    shell.toggleAttribute("data-view", open);
    if (open) { shell.setAttribute("data-view", "jump"); renderJump(); focusQuietly(grid.querySelector('[aria-pressed="true"]:not(:disabled)') || yearSelect); }
  };
  state.closeJump = () => { if (!jump.hidden) toggleJump(false); };

  title.addEventListener("click", () => toggleJump(jump.hidden));
  yearSelect.addEventListener("change", renderMonths);
  grid.addEventListener("click", (event) => {
    const b = event.target.closest("button[data-month]");
    if (!b || b.disabled) return;
    const day = Math.min(+focusedISO(cal).slice(8, 10) || 1, 28);
    cal.focusedDate = clamp(toISO(+yearSelect.value, +b.dataset.month, day), minISO(), maxISO());
    toggleJump(false);
    requestAnimationFrame(() => { cal.focus(); syncTitle(); });
  });
  grid.addEventListener("keydown", (event) => {
    const items = months.filter((b) => !b.disabled);
    const i = items.indexOf(document.activeElement);
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 }[event.key];
    if (step && i >= 0) { event.preventDefault(); focusQuietly(items[Math.max(0, Math.min(items.length - 1, i + step))]); }
  });
  jump.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); toggleJump(false); focusQuietly(title); }
  });
  // Keep the title in step with Cally's own live heading.
  const watch = () => {
    syncTitle();
    if (cal.shadowRoot && !state.observer) {
      state.observer = new MutationObserver(syncTitle);
      state.observer.observe(cal.shadowRoot, { subtree: true, childList: true, characterData: true });
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(watch));
  cal.addEventListener("focusday", () => requestAnimationFrame(syncTitle));
  state.syncTitle = syncTitle;
}

function initCalendar(cal) {
  setupCalendar(cal, cal.closest("[data-ds-calendar]") || cal);
}

/* ------------------------------------------------------------------ popover shared by date and range pickers */
function makePopover(label, anchor, trigger) {
  const pop = make("div", { class: "ds-picker-popover", id: uid("picker"), popover: "auto", role: "dialog", "aria-label": label, tabindex: "-1" });
  pop.inert = true;
  trigger.setAttribute("popovertarget", pop.id);
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", pop.id);
  pop._dsAnchor = anchor;
  pop.addEventListener("beforetoggle", (event) => {
    const open = event.newState === "open";
    // Inert while closed: Cally refocuses a clicked day on a timer, which must not land in a closing layer.
    pop.inert = !open;
    if (open) pop._dsBeforeOpen?.();
  });
  pop.addEventListener("toggle", (event) => {
    const open = event.newState === "open";
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      OPEN.add(pop);
      position(pop);
      requestAnimationFrame(() => pop._dsAfterOpen?.());
    } else {
      OPEN.delete(pop);
      pop._dsAfterClose?.();
      const active = document.activeElement;
      if (!active || active === document.body || pop.contains(active)) focusQuietly(trigger);
    }
  });
  // Tabbing out of the dialog closes it (non-modal, like the APG date picker's light dismiss).
  pop.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (next && !pop.contains(next) && next !== trigger && pop.matches(":popover-open")) pop.hidePopover();
  });
  return pop;
}

function position(pop) {
  if (narrowQuery.matches) {
    pop.style.removeProperty("left");
    pop.style.removeProperty("top");
    pop.removeAttribute("data-side");
    return;
  }
  placeFloating(pop, pop._dsAnchor, { side: "bottom", align: "start", gap: 6 });
}

function footer(...children) {
  return make("div", { class: "ds-picker-footer" }, children);
}

const ghost = (text) => make("button", { type: "button", class: "btn btn-ghost btn-sm", text });

/* ------------------------------------------------------------------ date picker */
function takeOver(native, text) {
  // The visible text input takes the id (labels, error links), classes and ARIA; the native one becomes the hidden ISO field.
  if (native.id) { text.id = native.id; native.id = `${native.id}-value`; }
  for (const a of ["aria-describedby", "aria-invalid", "aria-label", "aria-labelledby", "required", "disabled", "readonly", "autofocus"]) {
    if (native.hasAttribute(a)) text.setAttribute(a, native.getAttribute(a));
  }
  if (native.classList.contains("input-validation-error")) text.classList.add("input-validation-error");
  // Validation rules (required, data-val-*) belong to what the person types; the hidden ISO field only posts.
  for (const a of [...native.attributes]) {
    if (a.name === "data-val" || a.name.startsWith("data-val-")) { text.setAttribute(a.name, a.value); native.removeAttribute(a.name); }
  }
  native.removeAttribute("required");
  const value = native.value;
  native.type = "hidden";
  native.value = value;
  native.removeAttribute("aria-describedby");
}

function controlBox(native, cls) {
  // The box keeps the author's daisyUI size/tone classes (input-sm, input-lg …).
  const keep = [...native.classList].filter((c) => /^input(-|$)/.test(c) && c !== "input-validation-error");
  return make("div", { class: `${cls} input ${keep.filter((c) => c !== "input").join(" ")}`.trim() });
}

function initDatePicker(host) {
  const native = host.matches("input") ? host : host.querySelector('input[type="date"]');
  if (!native || READY.has(native) || native.type !== "date") return;
  READY.add(native);
  let wrap = host.matches("input") ? null : host;
  if (!wrap) { wrap = make("div", { class: "ds-date-picker" }); native.before(wrap); wrap.append(native); }
  wrap.classList.add("ds-date-picker");
  const tag = langOf(wrap);
  const pattern = datePattern(tag);
  const label = labelText(native) || t("datepicker.choose");
  const opts = { min: native.min, max: native.max, disallowed: disallowFn(wrap), tag };
  const required = native.required;

  const text = make("input", { type: "text", class: "ds-date-picker__input", inputmode: "numeric", autocomplete: "off", spellcheck: "false", placeholder: native.placeholder || pattern.hint, "data-ds-date-text": "" });
  takeOver(native, text);
  const box = controlBox(native, "ds-date-picker__control");
  const clear = iconButton("x", t("datepicker.clearField", { label }), "ds-picker-trigger ds-picker-clear");
  const trigger = iconButton("calendar", t("datepicker.choose"));
  box.append(text, clear, trigger);
  native.before(box);
  if (native.readOnly || native.disabled) { trigger.disabled = true; clear.hidden = true; if (native.readOnly) box.setAttribute("data-readonly", ""); }
  if (native.disabled) text.disabled = true;
  if (native.readOnly) text.readOnly = true;

  const shell = make("div", { class: "ds-calendar" });
  const cal = make("calendar-date", { class: "cally" });
  cal.innerHTML = '<calendar-month></calendar-month>';
  if (opts.min) cal.min = opts.min;
  if (opts.max) cal.max = opts.max;
  shell.append(cal);
  const today = ghost(t("datepicker.today"));
  const clearAll = ghost(t("datepicker.clear"));
  const pop = makePopover(t("datepicker.dialog", { label }), box, trigger);
  pop.append(shell, footer(...(required ? [] : [clearAll]), today));
  box.after(pop);
  const state = setupCalendar(cal, wrap);
  const todayValue = () => cal.today || todayISO(state.zone);

  const render = () => {
    text.value = formatNumeric(native.value, tag);
    clear.hidden = !native.value || native.readOnly || native.disabled;
  };
  const commit = (iso, { close = true } = {}) => {
    const changed = native.value !== iso;
    native.value = iso;
    render();
    text.setCustomValidity("");
    clearFieldError(text);
    if (close && pop.matches(":popover-open")) pop.hidePopover();
    if (changed) { fire(native); emit(wrap, "datepicker:change", { value: iso, input: native }); }
  };
  const fromText = () => {
    const iso = parseDate(text.value, tag);
    if (iso === "") { commit(""); return true; }
    if (iso === null) {
      const message = t("datepicker.invalid", { format: pattern.hint });
      text.setCustomValidity(message);
      setFieldError(text, message);
      return false;
    }
    const problem = dateProblem(iso, opts);
    if (problem) { text.setCustomValidity(problem); setFieldError(text, problem); native.value = ""; fire(native); return false; }
    commit(iso, { close: false });
    return true;
  };

  text.addEventListener("change", fromText);
  text.addEventListener("input", () => {
    if (text.getAttribute("aria-invalid") === "true") {
      const iso = parseDate(text.value, tag);
      if (iso && !dateProblem(iso, opts)) { text.setCustomValidity(""); clearFieldError(text); }
    }
  });
  text.addEventListener("keydown", (event) => {
    if ((event.altKey && event.key === "ArrowDown") || (event.key === "ArrowDown" && !text.value)) {
      event.preventDefault();
      if (!trigger.disabled) pop.showPopover();
    } else if (event.key === "Enter") fromText();
  });
  clear.addEventListener("click", () => { commit(""); focusQuietly(text); });
  clearAll.addEventListener("click", () => commit(""));
  today.addEventListener("click", () => commit(todayValue()));

  pop._dsBeforeOpen = () => {
    if (text.value && parseDate(text.value, tag) && parseDate(text.value, tag) !== native.value) fromText();
    cal.value = native.value;
    cal.focusedDate = native.value || clamp(todayValue(), opts.min, opts.max);
    const tv = todayValue();
    today.disabled = Boolean(dateProblem(tv, opts));
    state.closeJump?.();
  };
  pop._dsAfterOpen = () => { cal.focus(); state.syncTitle?.(); };
  cal.addEventListener("change", () => { commit(cal.value); });
  native.addEventListener("change", render);
  render();
  wrap.setAttribute("data-ds-ready", "");
  wrap._dsPicker = { open: () => pop.showPopover(), close: () => pop.hidePopover(), set: (iso) => commit(iso || "") };
}

/* ------------------------------------------------------------------ date range picker */
function presetRange(key, today, firstDay) {
  const d = fromISO(today);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const monthStart = (yy, mm) => dateToISO(new Date(Date.UTC(yy, mm, 1)));
  const monthEnd = (yy, mm) => dateToISO(new Date(Date.UTC(yy, mm + 1, 0)));
  switch (key) {
    case "today": return [today, today];
    case "yesterday": return [addDays(today, -1), addDays(today, -1)];
    case "last7": return [addDays(today, -6), today];
    case "last30": return [addDays(today, -29), today];
    case "next7": return [today, addDays(today, 6)];
    case "thisWeek": { const back = (d.getUTCDay() - firstDay + 7) % 7; const start = addDays(today, -back); return [start, addDays(start, 6)]; }
    case "thisMonth": return [monthStart(y, m), monthEnd(y, m)];
    case "lastMonth": return [monthStart(y, m - 1), monthEnd(y, m - 1)];
    case "thisYear": return [toISO(y, 1, 1), toISO(y, 12, 31)];
    default: return null;
  }
}

function initDateRange(host) {
  if (READY.has(host)) return;
  const inputs = [...host.querySelectorAll('input[type="date"]')];
  if (inputs.length !== 2) return;
  READY.add(host);
  host.classList.add("ds-date-range");
  const [from, to] = inputs;
  const tag = langOf(host);
  const pattern = datePattern(tag);
  const min = [from.min, to.min].filter(Boolean).sort().pop() || "";
  const max = [from.max, to.max].filter(Boolean).sort()[0] || "";
  const opts = { min, max, disallowed: disallowFn(host), tag };
  const groupLabel = host.querySelector(":scope > legend")?.textContent.trim() || host.getAttribute("aria-label") || t("datepicker.range.choose");

  const texts = [from, to].map((native, i) => {
    const name = labelText(native) || t(i ? "datepicker.range.end" : "datepicker.range.start");
    const text = make("input", { type: "text", class: "ds-date-range__input", inputmode: "numeric", autocomplete: "off", spellcheck: "false", placeholder: pattern.hint, "aria-label": name, "data-ds-date-text": "" });
    takeOver(native, text);
    text.removeAttribute("aria-labelledby");
    return text;
  });
  const box = controlBox(from, "ds-date-range__control");
  const clear = iconButton("x", t("datepicker.clearField", { label: groupLabel }), "ds-picker-trigger ds-picker-clear");
  const trigger = iconButton("calendar-range", t("datepicker.range.choose"));
  box.append(texts[0], make("span", { class: "ds-date-range__dash", "aria-hidden": "true", text: "–" }), texts[1], clear, trigger);
  const disabled = from.disabled || to.disabled;
  const readOnly = from.readOnly || to.readOnly;
  if (disabled || readOnly) { trigger.disabled = true; texts.forEach((x) => { x.disabled = disabled; x.readOnly = readOnly; }); }
  if (readOnly) box.setAttribute("data-readonly", "");

  // Original per-input fields fold away; their hints and errors move under the combined control.
  const fields = host.querySelector(".ds-date-range__fields");
  const anchor = fields || from.closest(".ds-field") || from;
  anchor.before(box);
  const moved = [...host.querySelectorAll(".ds-hint, .ds-field-error, .field-validation-error, .field-validation-valid, [data-valmsg-for]")]
    .filter((el) => fields?.contains(el));
  box.after(...moved);
  if (fields) fields.hidden = true;
  [from, to].forEach((native) => host.append(native));

  const shell = make("div", { class: "ds-calendar" });
  let cal = null;
  let state = null;
  // Cally fixes its visible months on first render, so each opening builds a fresh grid that starts on the start month.
  const build = (value, focused) => {
    shell.replaceChildren();
    cal = make("calendar-range", { class: "cally" });
    if (min) cal.min = min;
    if (max) cal.max = max;
    const n = narrowQuery.matches ? 1 : 2;
    cal.months = n;
    cal.value = value;
    cal.focusedDate = focused;
    cal.append(make("div", { class: "ds-calendar__months" }, Array.from({ length: n }, (_, i) => make("calendar-month", i ? { offset: String(i) } : {}))));
    shell.append(cal);
    state = setupCalendar(cal, host);
    cal.addEventListener("rangestart", () => { note.textContent = t("datepicker.range.pickEnd"); });
    cal.addEventListener("change", () => {
      const [a, b] = String(cal.value || "").split("/");
      if (a && b) commit(a, b);
    });
  };
  const zone = host.getAttribute("data-ds-time-zone");
  const firstDay = (() => { const fd = host.getAttribute("first-day-of-week"); return fd != null ? +fd : firstDayOf(tag); })();
  const todayValue = () => todayISO(zone);
  const note = make("p", { class: "ds-picker-footer__note", role: "status", "aria-live": "polite" });
  const clearAll = ghost(t("datepicker.clear"));
  const keys = (host.getAttribute("data-ds-presets") ?? "today,last7,last30,thisMonth,lastMonth,thisYear").split(/[\s,]+/).filter((k) => k && k !== "none");
  const presetList = keys.length ? make("ul", { class: "ds-picker-presets", "aria-label": t("datepicker.presets") }) : null;
  const presets = keys.map((key) => {
    const b = make("button", { type: "button", "data-preset": key, "aria-pressed": "false" }, [make("span", { text: t(`datepicker.preset.${key}`) })]);
    b.insertAdjacentHTML("beforeend", icon("check"));
    presetList.append(make("li", {}, [b]));
    return b;
  });
  const body = make("div", { class: "ds-picker-popover__body" }, presetList ? [presetList, shell] : [shell]);
  const pop = makePopover(t("datepicker.dialog", { label: groupLabel }), box, trigger);
  pop.append(body, footer(note, clearAll));
  box.after(pop);

  const summary = () => {
    if (!from.value || !to.value) return t("datepicker.range.pickStart");
    const a = fromISO(from.value);
    const b = fromISO(to.value);
    const fmt = new Intl.DateTimeFormat(tag, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    const days = Math.round((b - a) / 864e5) + 1;
    const range = fmt.formatRange ? fmt.formatRange(a, b) : `${fmt.format(a)} – ${fmt.format(b)}`;
    return `${range} · ${days === 1 ? t("datepicker.range.day") : t("datepicker.range.days", { count: days })}`;
  };
  const render = () => {
    texts[0].value = formatNumeric(from.value, tag);
    texts[1].value = formatNumeric(to.value, tag);
    clear.hidden = (!from.value && !to.value) || disabled || readOnly;
    note.textContent = summary();
    presets.forEach((b) => {
      const r = presetRange(b.dataset.preset, todayValue(), firstDay);
      b.setAttribute("aria-pressed", String(Boolean(r && r[0] === from.value && r[1] === to.value)));
    });
  };
  const commit = (a, b, { close = true } = {}) => {
    const changed = from.value !== a || to.value !== b;
    from.value = a;
    to.value = b;
    texts.forEach((x) => { x.setCustomValidity(""); clearFieldError(x); });
    render();
    if (close && pop.matches(":popover-open")) pop.hidePopover();
    if (changed) {
      fire(from);
      fire(to);
      emit(host, "daterange:change", { start: a, end: b });
      const form = host.closest("form");
      if (a && b && form && (host.hasAttribute("data-ds-autosubmit") || form.hasAttribute("data-ds-autosubmit"))) form.requestSubmit();
    }
  };
  const fromText = (i) => {
    const text = texts[i];
    const native = i ? to : from;
    const iso = parseDate(text.value, tag);
    let problem = "";
    if (iso === null) problem = t("datepicker.invalid", { format: pattern.hint });
    else if (iso) problem = dateProblem(iso, opts);
    const other = i ? from.value : to.value;
    if (!problem && iso && other && (i ? iso < other : iso > other)) problem = t("datepicker.range.order");
    if (problem) { text.setCustomValidity(problem); setFieldError(text, problem); return false; }
    text.setCustomValidity("");
    clearFieldError(text);
    if (native.value !== iso) { native.value = iso; fire(native); emit(host, "daterange:change", { start: from.value, end: to.value }); }
    render();
    return true;
  };
  texts.forEach((text, i) => {
    text.addEventListener("change", () => fromText(i));
    text.addEventListener("keydown", (event) => {
      if (event.altKey && event.key === "ArrowDown") { event.preventDefault(); if (!trigger.disabled) pop.showPopover(); }
      else if (event.key === "Enter") fromText(i);
    });
  });
  clear.addEventListener("click", () => { commit("", ""); focusQuietly(texts[0]); });
  clearAll.addEventListener("click", () => { commit("", "", { close: false }); cal.value = ""; cal.removeAttribute("data-state"); note.textContent = summary(); });
  presets.forEach((b) => b.addEventListener("click", () => {
    const r = presetRange(b.dataset.preset, todayValue(), firstDay);
    if (r) commit(r[0], r[1]);
  }));

  pop._dsBeforeOpen = () => {
    build(from.value && to.value ? `${from.value}/${to.value}` : "", from.value || clamp(todayValue(), min, max));
    presets.forEach((b) => {
      const r = presetRange(b.dataset.preset, todayValue(), firstDay);
      b.disabled = !r || Boolean((min && r[0] < min) || (max && r[1] > max));
    });
    note.textContent = summary();
  };
  pop._dsAfterOpen = () => { cal.focus(); state.syncTitle?.(); };
  render();
  host.setAttribute("data-ds-ready", "");
  host._dsPicker = { open: () => pop.showPopover(), close: () => pop.hidePopover(), set: (a, b) => commit(a || "", b || "") };
}

/* ------------------------------------------------------------------ time picker */
function hourCycle(tag, host) {
  const forced = host.getAttribute("data-ds-hour-cycle");
  if (forced === "12" || forced === "24") return +forced;
  try {
    const cycle = new Intl.DateTimeFormat(tag, { hour: "numeric" }).resolvedOptions().hourCycle;
    return cycle === "h12" || cycle === "h11" ? 12 : 24;
  } catch { return 24; }
}

function timeParts(tag, h12) {
  const parts = new Intl.DateTimeFormat(tag, { hour: "2-digit", minute: "2-digit", hour12: h12 === 12, timeZone: "UTC" })
    .formatToParts(new Date(Date.UTC(2026, 0, 1, 9, 5)));
  const sep = parts.find((p, i) => p.type === "literal" && parts[i - 1]?.type === "hour")?.value.trim() || ":";
  const periodFirst = parts.findIndex((p) => p.type === "dayPeriod") > -1 && parts.findIndex((p) => p.type === "dayPeriod") < parts.findIndex((p) => p.type === "hour");
  const period = (hour) => new Intl.DateTimeFormat(tag, { hour: "numeric", hour12: true, timeZone: "UTC" })
    .formatToParts(new Date(Date.UTC(2026, 0, 1, hour))).find((p) => p.type === "dayPeriod")?.value || (hour < 12 ? "AM" : "PM");
  return { sep, periodFirst, am: period(9), pm: period(15) };
}

function initTimePicker(host) {
  const native = host.matches("input") ? host : host.querySelector('input[type="time"]');
  if (!native || READY.has(native) || native.type !== "time") return;
  READY.add(native);
  let wrap = host.matches("input") ? null : host;
  if (!wrap) { wrap = make("div", { class: "ds-time-picker" }); native.before(wrap); wrap.append(native); }
  wrap.classList.add("ds-time-picker");
  const tag = langOf(wrap);
  const cycle = hourCycle(tag, wrap);
  const { sep, periodFirst, am, pm } = timeParts(tag, cycle);
  const stepSeconds = Number(native.step) || 60;
  const withSeconds = stepSeconds < 60 || /^\d{2}:\d{2}:\d{2}/.test(native.value) || wrap.hasAttribute("data-ds-seconds");
  const minuteStep = stepSeconds >= 60 ? Math.max(1, Math.round(stepSeconds / 60)) : 1;
  const secondStep = stepSeconds < 60 ? Math.max(1, stepSeconds) : 1;
  const label = labelText(native);

  const specs = [
    { key: "hour", min: cycle === 12 ? 1 : 0, max: cycle === 12 ? 12 : 23, step: 1 },
    { key: "minute", min: 0, max: 59, step: minuteStep },
    ...(withSeconds ? [{ key: "second", min: 0, max: 59, step: secondStep }] : []),
  ];
  const box = controlBox(native, "ds-time-picker__control");
  box.setAttribute("role", "group");
  const segBox = make("div", { class: "ds-time-picker__segments" });
  const segs = specs.map((spec) => {
    const el = make("input", { type: "text", class: "ds-time-picker__segment", inputmode: "numeric", autocomplete: "off", spellcheck: "false", role: "spinbutton", placeholder: "––", "aria-label": t(`datepicker.time.${spec.key}`), "aria-valuemin": String(spec.min), "aria-valuemax": String(spec.max) });
    el._spec = spec;
    el._value = null;
    return el;
  });
  let period = null;
  if (cycle === 12) {
    period = make("input", { type: "text", class: "ds-time-picker__segment is-period", autocomplete: "off", spellcheck: "false", role: "spinbutton", placeholder: am, "aria-label": t("datepicker.time.period"), "aria-valuemin": "0", "aria-valuemax": "1" });
    period._spec = { key: "period", min: 0, max: 1, step: 1 };
    period._value = null;
  }
  const order = [...segs];
  if (period) periodFirst ? order.unshift(period) : order.push(period);
  order.forEach((el, i) => {
    if (i) segBox.append(make("span", { class: "ds-time-picker__sep", "aria-hidden": "true", text: el === period || order[i - 1] === period ? " " : sep }));
    segBox.append(el);
  });
  const clock = make("span", { class: "ds-picker-trigger", "aria-hidden": "true", html: icon("clock") });
  box.append(segBox, clock);
  native.before(box);

  // The hour segment takes the id so <label for> focuses it; the group is named by the label.
  if (native.id) { segs[0].id = native.id; native.id = `${native.id}-value`; }
  const labelEl = segs[0].id ? document.querySelector(`label[for="${CSS.escape(segs[0].id)}"]`) : null;
  if (labelEl) { labelEl.id ||= uid("time-label"); box.setAttribute("aria-labelledby", labelEl.id); }
  else if (label) box.setAttribute("aria-label", label);
  for (const a of ["aria-describedby", "aria-invalid", "required"]) if (native.hasAttribute(a)) segs[0].setAttribute(a, native.getAttribute(a));
  if (native.classList.contains("input-validation-error")) segs[0].classList.add("input-validation-error");
  for (const a of [...native.attributes]) {
    if (a.name === "data-val" || a.name.startsWith("data-val-")) { segs[0].setAttribute(a.name, a.value); native.removeAttribute(a.name); }
  }
  const value0 = native.value;
  native.type = "hidden";
  native.value = value0;
  native.removeAttribute("aria-describedby");
  if (native.disabled || native.readOnly) order.forEach((el) => { el.disabled = native.disabled; el.readOnly = native.readOnly; });
  if (native.readOnly) box.setAttribute("data-readonly", "");

  const show = (el) => {
    const v = el._value;
    if (el === period) { el.value = v == null ? "" : v ? pm : am; el.setAttribute("aria-valuetext", v == null ? t("datepicker.time.empty") : el.value); }
    else { el.value = v == null ? "" : pad(v); el.setAttribute("aria-valuetext", v == null ? t("datepicker.time.empty") : pad(v)); }
    if (v == null) el.removeAttribute("aria-valuenow"); else el.setAttribute("aria-valuenow", String(v));
  };
  const read = (iso) => {
    const m = /^(\d{2}):(\d{2})(?::(\d{2}))?/.exec(iso || "");
    const h = m ? +m[1] : null;
    segs[0]._value = h == null ? null : cycle === 12 ? (h % 12 || 12) : h;
    segs[1]._value = m ? +m[2] : null;
    if (segs[2]) segs[2]._value = m ? +(m[3] || 0) : null;
    if (period) period._value = h == null ? null : h >= 12 ? 1 : 0;
    order.forEach(show);
  };
  const fmtTime = (iso) => {
    const m = /^(\d{2}):(\d{2})/.exec(iso || "");
    return m ? new Intl.DateTimeFormat(tag, { hour: "2-digit", minute: "2-digit", hour12: cycle === 12, timeZone: "UTC" }).format(new Date(Date.UTC(2026, 0, 1, +m[1], +m[2]))) : iso;
  };
  let writing = false;
  const write = () => {
    const filled = order.filter((el) => el._value != null).length;
    let iso = "";
    if (filled === order.length) {
      let h = segs[0]._value;
      if (cycle === 12) h = (h % 12) + (period._value ? 12 : 0);
      iso = `${pad(h)}:${pad(segs[1]._value)}${segs[2] ? `:${pad(segs[2]._value)}` : ""}`;
    }
    let problem = "";
    if (filled && filled < order.length) problem = t("datepicker.time.incomplete");
    else if (iso && native.min && iso < native.min) problem = t("datepicker.time.min", { time: fmtTime(native.min) });
    else if (iso && native.max && iso > native.max) problem = t("datepicker.time.max", { time: fmtTime(native.max) });
    segs[0].setCustomValidity(problem);
    if (!problem) clearFieldError(segs[0]);
    else if (segs[0].getAttribute("aria-invalid") === "true") setFieldError(segs[0], problem);
    if (native.value !== iso) { native.value = iso; writing = true; fire(native); writing = false; emit(wrap, "timepicker:change", { value: iso }); }
  };
  const buffers = new WeakMap();
  const move = (el, dir) => { const i = order.indexOf(el) + dir; if (order[i]) { focusQuietly(order[i]); order[i].select(); } };
  const stepBy = (el, dir) => {
    const { min, max, step } = el._spec;
    if (el === period) el._value = el._value == null ? 0 : 1 - el._value;
    else {
      let v = el._value == null ? (dir > 0 ? min : max) : el._value + dir * step;
      if (v > max) v = min + (v - max - 1);
      if (v < min) v = max - (min - v - 1);
      if (step > 1) { v = Math.round((v - min) / step) * step + min; if (v > max) v = min; }
      el._value = v;
    }
    buffers.delete(el);
    show(el);
    write();
  };
  order.forEach((el) => {
    el.addEventListener("focus", () => { buffers.delete(el); requestAnimationFrame(() => el.select()); });
    el.addEventListener("blur", () => { buffers.delete(el); if (segs[0].validationMessage && el === order.at(-1)) setFieldError(segs[0], segs[0].validationMessage); });
    el.addEventListener("keydown", (event) => {
      if (el.readOnly || el.disabled) return;
      const k = event.key;
      if (k === "ArrowUp" || k === "ArrowDown") { event.preventDefault(); stepBy(el, k === "ArrowUp" ? 1 : -1); }
      else if (k === "PageUp" || k === "PageDown") { event.preventDefault(); for (let i = 0; i < (el === segs[0] ? 3 : 2); i++) stepBy(el, k === "PageUp" ? 1 : -1); }
      else if (k === "Home" || k === "End") { event.preventDefault(); el._value = k === "Home" ? el._spec.min : el._spec.max; show(el); write(); }
      else if (k === "ArrowLeft" || k === "ArrowRight") { event.preventDefault(); move(el, (k === "ArrowRight") !== (document.dir === "rtl") ? 1 : -1); }
      else if (k === "Backspace" || k === "Delete") { event.preventDefault(); el._value = null; buffers.delete(el); show(el); write(); }
      else if (el === period && /^[a-z]$/i.test(k) && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        const key = k.toLocaleLowerCase(tag);
        if (am.toLocaleLowerCase(tag).startsWith(key)) el._value = 0;
        else if (pm.toLocaleLowerCase(tag).startsWith(key)) el._value = 1;
        show(el); write();
      } else if (/^[:.\s]$/.test(k)) { event.preventDefault(); move(el, 1); }
    });
    // Digits arrive through beforeinput from physical and on-screen keyboards alike.
    el.addEventListener("beforeinput", (event) => {
      event.preventDefault();
      if (el.readOnly || el.disabled || el === period || !event.data || !/^\d+$/.test(event.data)) return;
      for (const digit of event.data) {
        const { min, max } = el._spec;
        const next = `${buffers.get(el) ?? ""}${digit}`;
        let v = +next;
        if (v > max) { v = +digit; buffers.set(el, digit); } else buffers.set(el, next);
        el._value = Math.max(min, Math.min(max, v));
        if (v < min && next.length < 2) el._value = null;
        show(el);
        if (buffers.get(el).length >= 2 || v * 10 > max) { buffers.delete(el); write(); move(el, 1); }
        else write();
      }
    });
    // Composition input (some Android keyboards) cannot be cancelled: read the digits back.
    el.addEventListener("input", () => {
      if (el === period) { show(el); return; }
      const digits = el.value.replace(/\D/g, "").slice(-2);
      if (digits) el._value = Math.max(el._spec.min, Math.min(el._spec.max, +digits));
      show(el);
      write();
    });
  });
  native.addEventListener("change", () => { if (!writing) read(native.value); });
  read(native.value);
  wrap.setAttribute("data-ds-ready", "");
  wrap._dsPicker = { set: (iso) => { read(iso); write(); } };
}

/* ------------------------------------------------------------------ color picker */
const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
function normalizeHex(text) {
  const m = HEX_RE.exec(String(text || "").trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return `#${h.toLowerCase()}`;
}
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

function initColorPicker(host) {
  const native = host.matches("input") ? host : host.querySelector('input[type="color"]');
  if (!native || READY.has(native)) return;
  READY.add(native);
  let wrap = host.matches("input") ? null : host;
  if (!wrap) { wrap = make("div", { class: "ds-color-picker" }); native.before(wrap); wrap.append(native); }
  wrap.classList.add("ds-color-picker");
  const tag = langOf(wrap);
  const label = labelText(native);

  const row = make("div", { class: "ds-color-picker__row" });
  const swatch = make("span", { class: "ds-color-picker__swatch" });
  native.before(row);
  swatch.append(native);
  native.classList.add("ds-color-picker__native");
  const hexBox = make("div", { class: "ds-color-picker__hex input" });
  const hex = make("input", { type: "text", class: "ds-color-picker__hex-input", autocomplete: "off", spellcheck: "false", maxlength: "7", "aria-label": label ? `${label}, ${t("datepicker.color.hex")}` : t("datepicker.color.hex") });
  hexBox.append(make("span", { class: "ds-color-picker__hash", "aria-hidden": "true", text: "#" }), hex);
  if (native.id) { hex.id = native.id; native.id = `${native.id}-value`; }
  for (const a of ["aria-describedby", "aria-invalid", "required"]) if (native.hasAttribute(a)) hex.setAttribute(a, native.getAttribute(a));
  native.removeAttribute("aria-describedby");
  native.setAttribute("aria-label", t("datepicker.color.pick"));
  row.append(swatch, hexBox);

  let dropper = null;
  if ("EyeDropper" in window && !wrap.hasAttribute("data-ds-no-eyedropper")) {
    dropper = make("button", { type: "button", class: "btn btn-ghost btn-square ds-color-picker__dropper", "aria-label": t("datepicker.color.eyedropper"), title: t("datepicker.color.eyedropper"), html: icon("pipette") });
    row.append(dropper);
  }

  // Presets: data-ds-swatches="Teal #0f766e, Indigo #4338ca, …" (name optional).
  const swatches = (wrap.getAttribute("data-ds-swatches") || "").split(",").map((s) => s.trim()).filter(Boolean).map((entry) => {
    const m = /^(.*?)\s*(#?[0-9a-f]{3,6})$/i.exec(entry);
    const value = m && normalizeHex(m[2]);
    return value ? { name: m[1] || value.toUpperCase(), value } : null;
  }).filter(Boolean);
  let group = null;
  const radios = [];
  if (swatches.length) {
    group = make("div", { class: "ds-color-picker__swatches", role: "radiogroup", "aria-label": t("datepicker.color.swatches") });
    for (const s of swatches) {
      const b = make("button", { type: "button", role: "radio", class: "ds-color-picker__preset", "aria-checked": "false", "aria-label": s.name, title: `${s.name} ${s.value.toUpperCase()}`, tabindex: "-1" });
      b.style.setProperty("--ds-swatch", s.value);
      b._value = s.value;
      radios.push(b);
      group.append(b);
    }
    row.after(group);
  }
  const against = wrap.getAttribute("data-ds-contrast-against");
  const contrastNote = against ? make("p", { class: "ds-color-picker__contrast", "aria-live": "polite" }) : null;
  if (contrastNote) (group || row).after(contrastNote);
  if (native.disabled) [hex, dropper, ...radios].forEach((el) => { if (el) el.disabled = true; });

  const render = () => {
    const v = native.value.toLowerCase();
    if (document.activeElement !== hex) hex.value = v.slice(1).toUpperCase();
    wrap.style.setProperty("--ds-swatch", v);
    let focusable = null;
    radios.forEach((b) => {
      const on = b._value === v;
      b.setAttribute("aria-checked", String(on));
      if (on) focusable = b;
    });
    radios.forEach((b) => b.setAttribute("tabindex", b === (focusable || radios[0]) ? "0" : "-1"));
    if (contrastNote) {
      const targets = against === "auto" ? ["#ffffff", "#000000"] : [normalizeHex(against) || "#ffffff"];
      const best = targets.map((c) => [c, contrast(v, c)]).sort((a, b) => b[1] - a[1])[0];
      const ratio = best[1];
      const level = ratio >= 7 ? "aaa" : ratio >= 4.5 ? "aa" : ratio >= 3 ? "large" : "fail";
      const name = best[0] === "#ffffff" ? t("datepicker.color.white") : best[0] === "#000000" ? t("datepicker.color.black") : best[0].toUpperCase();
      contrastNote.textContent = t("datepicker.color.contrast", { against: name, ratio: ratio.toFixed(ratio >= 10 ? 0 : 1).replace(".", new Intl.NumberFormat(tag).formatToParts(1.5).find((p) => p.type === "decimal")?.value || "."), level: t(`datepicker.color.${level}`) });
      contrastNote.setAttribute("data-state", level === "fail" ? "error" : level === "large" ? "warning" : "success");
    }
  };
  const set = (value) => {
    const v = normalizeHex(value);
    if (!v) return false;
    hex.setCustomValidity("");
    clearFieldError(hex);
    if (native.value.toLowerCase() !== v) { native.value = v; fire(native); emit(wrap, "colorpicker:change", { value: v }); }
    render();
    return true;
  };
  native.addEventListener("input", (event) => { if (event.isTrusted) { hex.value = native.value.slice(1).toUpperCase(); render(); } });
  hex.addEventListener("input", () => {
    const v = normalizeHex(hex.value);
    if (v && (hex.value.replace("#", "").length === 6 || hex.value.replace("#", "").length === 3)) set(v);
  });
  hex.addEventListener("paste", () => requestAnimationFrame(() => { hex.value = hex.value.replace(/^#/, ""); }));
  hex.addEventListener("change", () => {
    if (!hex.value.trim() && !hex.required) return;
    if (!set(hex.value)) { const m = t("datepicker.color.invalid"); hex.setCustomValidity(m); setFieldError(hex, m); }
    else hex.value = native.value.slice(1).toUpperCase();
  });
  dropper?.addEventListener("click", async () => {
    try {
      const result = await new window.EyeDropper().open();
      set(result.sRGBHex.startsWith("#") ? result.sRGBHex : `#${result.sRGBHex}`);
      focusQuietly(dropper);
    } catch { /* cancelled */ }
  });
  group?.addEventListener("click", (event) => { const b = event.target.closest("[role=radio]"); if (b && !b.disabled) { set(b._value); focusQuietly(b); } });
  group?.addEventListener("keydown", (event) => {
    const i = radios.indexOf(document.activeElement);
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (step == null && event.key !== " ") return;
    event.preventDefault();
    if (event.key === " ") { radios[i] && set(radios[i]._value); return; }
    const next = radios[(i + step + radios.length) % radios.length];
    set(next._value);
    focusQuietly(next);
  });
  render();
  wrap.setAttribute("data-ds-ready", "");
  wrap._dsPicker = { set };
}

/* ------------------------------------------------------------------ module contract */
export function wire() {
  const reposition = () => OPEN.forEach(position);
  window.addEventListener("resize", reposition, { passive: true });
  window.addEventListener("scroll", reposition, { passive: true, capture: true });
}

export function init(root = document) {
  const scope = root.querySelectorAll ? root : document;
  const all = (selector) => [...(scope.matches?.(selector) ? [scope] : []), ...scope.querySelectorAll(selector)];
  all("[data-ds-time-picker]").forEach((el) => { try { initTimePicker(el); } catch (error) { console.error("[ds] time picker", error); } });
  all("[data-ds-color-picker]").forEach((el) => { try { initColorPicker(el); } catch (error) { console.error("[ds] color picker", error); } });
  const calendars = all(".ds-calendar > .cally, [data-ds-calendar] .cally, calendar-date[data-ds-calendar], calendar-range[data-ds-calendar]");
  const dates = all("[data-ds-date-picker]");
  const ranges = all("[data-ds-date-range]");
  if (!calendars.length && !dates.length && !ranges.length) return;
  ensureCally().then((ok) => {
    if (!ok) return;
    calendars.forEach((cal) => { try { initCalendar(cal); } catch (error) { console.error("[ds] calendar", error); } });
    if (!supportsPopover) return;
    ranges.forEach((el) => { try { initDateRange(el); } catch (error) { console.error("[ds] date range", error); } });
    dates.forEach((el) => { try { initDatePicker(el); } catch (error) { console.error("[ds] date picker", error); } });
  });
}

const pick = (el) => (typeof el === "string" ? document.querySelector(el) : el)?.closest?.("[data-ds-date-picker], [data-ds-date-range], [data-ds-time-picker], [data-ds-color-picker]")?._dsPicker;

export const api = {
  picker: {
    /** DS.picker.open("#due-date") opens a date or range picker. */
    open: (el) => pick(el)?.open?.(),
    close: (el) => pick(el)?.close?.(),
    /** DS.picker.set(el, "2026-05-14") · range: set(el, "2026-05-01", "2026-05-31") · time "14:30" · color "#0f766e". */
    set: (el, ...values) => pick(el)?.set?.(...values),
    parseDate: (text, tag) => parseDate(text, tag || langOf(document.body)),
  },
};
