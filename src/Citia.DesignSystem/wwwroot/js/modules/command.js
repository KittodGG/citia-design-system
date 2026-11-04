/* Command palette and inline command list (WAI-ARIA combobox with a listbox popup that is always shown).
   Owner: batch A9.
   Markup: .ds-command > .ds-command__search > input.ds-command__input
                       + .ds-command__list > .ds-command__group (> .ds-command__group-label) > .ds-command__item
                       + .ds-command__empty (with [data-ds-command-query]) + .ds-command__loading (optional)
   Palette: <dialog class="ds-command-dialog" data-ds-command data-ds-command-shortcut="mod+k"> around it.
   Hooks: [data-ds-command-open="id"] opens a palette; data-ds-command-shortcut="mod+k" | "/" (mod = Cmd on Apple, Ctrl
   elsewhere); item data-keywords="…" (extra match terms), data-value, data-ds-command-always (never filtered out),
   data-ds-keep-open (palette stays open after the action); [data-ds-command-hint] shows the shortcut for this platform;
   data-ds-command-source="/search?q={query}" (JSON array of { label, description, href, value, icon, shortcut, group,
   disabled }) with data-ds-command-min="2".
   Keyboard: ArrowDown/ArrowUp move the highlight (loops), Enter runs the highlighted item, Escape closes the palette
   (inline: clears the query). Focus stays in the input; aria-activedescendant follows the highlight.
   API: DS.command.open(id?), .close(id?), .filter(elOrId, query), .setItems(elOrId, items), .setLoading(elOrId, on).
   Events (bubble): ds:command:select (cancelable, detail { value, item, query }), ds:command:query (detail { query }). */
import { t, addMessages, normalize, uid } from "../core.js";
import { open as openDialog, close as closeDialog } from "./dialog.js";

addMessages({
  en: {
    "command.label": "Command palette",
    "command.placeholder": "Type a command or search",
    "command.results": "{count} results",
    "command.oneResult": "1 result",
    "command.noResults": "No results",
    "command.loading": "Searching",
    "command.error": "Search is unavailable. Try again in a moment.",
    "command.remote": "Results",
  },
  id: {
    "command.label": "Palet perintah",
    "command.placeholder": "Ketik perintah atau cari",
    "command.results": "{count} hasil",
    "command.oneResult": "1 hasil",
    "command.noResults": "Tidak ada hasil",
    "command.loading": "Mencari",
    "command.error": "Pencarian tidak tersedia. Coba lagi sebentar lagi.",
    "command.remote": "Hasil",
  },
});

const ITEM = ".ds-command__item";
const resolve = (target) => (typeof target === "string" ? document.getElementById(target) : target);
const rootOf = (target) => { const el = resolve(target); return el?.matches?.(".ds-command") ? el : el?.querySelector?.(".ds-command") ?? null; };
const isApple = () => /mac|iphone|ipad|ipod/i.test(navigator.userAgentData?.platform || navigator.platform || "");
const enabled = (item) => item.getAttribute("aria-disabled") !== "true";
const visibleItems = (root) => [...root.querySelectorAll(ITEM)].filter((el) => !el.hidden && !el.closest("[hidden]"));

/* ------------------------------------------------------------------ highlight */
function select(root, item, { scroll = true } = {}) {
  const input = root.querySelector(".ds-command__input");
  root.querySelectorAll(`${ITEM}[aria-selected="true"]`).forEach((el) => el.setAttribute("aria-selected", "false"));
  if (!item) { input?.removeAttribute("aria-activedescendant"); return; }
  item.setAttribute("aria-selected", "true");
  input?.setAttribute("aria-activedescendant", item.id);
  if (scroll) item.scrollIntoView({ block: "nearest" });
}

function move(root, step) {
  const items = visibleItems(root).filter(enabled);
  if (!items.length) return;
  const current = items.findIndex((el) => el.getAttribute("aria-selected") === "true");
  const next = current < 0 ? (step > 0 ? 0 : items.length - 1) : (current + step + items.length) % items.length;
  select(root, items[next]);
}

/* ------------------------------------------------------------------ filtering */
function markLabel(item, tokens) {
  const label = item.querySelector(".ds-command__label");
  if (!label) return;
  label._dsText ??= label.textContent;
  const text = label._dsText;
  const token = tokens[0];
  const at = token ? normalize(text).indexOf(token) : -1;
  // Only mark when the normalized index maps to the same characters (no whitespace collapsing before it).
  if (at < 0 || normalize(text.slice(0, at + token.length)) !== normalize(text).slice(0, at + token.length)) { label.textContent = text; return; }
  const mark = document.createElement("mark");
  mark.textContent = text.slice(at, at + token.length);
  label.replaceChildren(text.slice(0, at), mark, text.slice(at + token.length));
}

const statusTimers = new WeakMap();
function announce(root, count) {
  let status = root.querySelector(".ds-command__status");
  if (!status) {
    status = document.createElement("div");
    status.className = "ds-command__status";
    status.setAttribute("role", "status");
    root.append(status);
  }
  window.clearTimeout(statusTimers.get(root));
  statusTimers.set(root, window.setTimeout(() => {
    status.textContent = count === 0 ? t("command.noResults") : count === 1 ? t("command.oneResult") : t("command.results", { count });
  }, 400));
}

export function filter(target, query) {
  const root = rootOf(target);
  if (!root) return 0;
  const input = root.querySelector(".ds-command__input");
  if (query !== undefined && input && input.value !== query) input.value = query;
  const raw = input?.value ?? query ?? "";
  const tokens = normalize(raw).split(" ").filter(Boolean);
  let count = 0;
  root.querySelectorAll(ITEM).forEach((item) => {
    item._dsHaystack ??= normalize(`${item.textContent} ${item.getAttribute("data-keywords") ?? ""} ${item.getAttribute("data-value") ?? ""}`);
    const show = item.hasAttribute("data-ds-command-always") || item.hasAttribute("data-ds-command-remote") || tokens.every((tk) => item._dsHaystack.includes(tk));
    item.hidden = !show;
    if (show) { count += 1; markLabel(item, tokens); }
  });
  root.querySelectorAll(".ds-command__group").forEach((group) => { group.hidden = !group.querySelector(`${ITEM}:not([hidden])`); });
  root.querySelectorAll(".ds-command__separator").forEach((sep) => {
    const prev = sep.previousElementSibling;
    const next = sep.nextElementSibling;
    sep.hidden = !prev || !next || prev.hidden || next.hidden;
  });
  const empty = root.querySelector(".ds-command__empty");
  const busy = root.getAttribute("aria-busy") === "true";
  if (empty) {
    empty.hidden = count > 0 || busy;
    empty.querySelectorAll("[data-ds-command-query]").forEach((el) => { el.textContent = raw.trim(); });
  }
  const list = root.querySelector(".ds-command__list");
  if (list) list.hidden = count === 0;
  select(root, visibleItems(root).find(enabled) ?? null, { scroll: false });
  if (list) list.scrollTop = 0;
  announce(root, count);
  return count;
}

/* ------------------------------------------------------------------ async results */
/* Remote results can carry text that people typed (record names, links). Accept only http(s) links, relative or
   absolute, so a "javascript:" or "data:" href in the JSON never runs. */
function safeHref(href) {
  if (typeof href !== "string" || !href.trim()) return null;
  try {
    const url = new URL(href, location.href);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function buildItem(data) {
  const href = safeHref(data.href);
  const item = document.createElement(href ? "a" : "div");
  item.className = "ds-command__item";
  item.setAttribute("role", "option");
  item.setAttribute("data-ds-command-remote", "");
  item.id = uid("command-item");
  if (href) item.href = href;
  if (data.value != null) item.setAttribute("data-value", String(data.value));
  if (data.disabled) item.setAttribute("aria-disabled", "true");
  if (data.icon && /^[a-z0-9-]+$/.test(data.icon)) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "ds-icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#ds-icon-${data.icon}`);
    svg.append(use);
    item.append(svg);
  }
  const text = document.createElement("span");
  text.className = "ds-command__text";
  const label = document.createElement("span");
  label.className = "ds-command__label";
  label.textContent = data.label ?? "";
  text.append(label);
  if (data.description) {
    const desc = document.createElement("span");
    desc.className = "ds-command__description";
    desc.textContent = data.description;
    text.append(desc);
  }
  item.append(text);
  if (data.shortcut) {
    const kbd = document.createElement("kbd");
    kbd.className = "ds-command__shortcut";
    kbd.textContent = data.shortcut;
    item.append(kbd);
  }
  item.setAttribute("aria-selected", "false");
  return item;
}

/** Replace the script-provided results (grouped by item.group, default "Results"). */
export function setItems(target, items = []) {
  const root = rootOf(target);
  const list = root?.querySelector(".ds-command__list");
  if (!list) return;
  list.querySelectorAll("[data-ds-command-remote-group]").forEach((g) => g.remove());
  const groups = new Map();
  for (const data of items) {
    const name = data.group || t("command.remote");
    if (!groups.has(name)) {
      const group = document.createElement("div");
      group.className = "ds-command__group";
      group.setAttribute("role", "group");
      group.setAttribute("data-ds-command-remote-group", "");
      const heading = document.createElement("div");
      heading.className = "ds-command__group-label";
      heading.id = uid("command-group");
      heading.textContent = name;
      group.setAttribute("aria-labelledby", heading.id);
      group.append(heading);
      list.append(group);
      groups.set(name, group);
    }
    groups.get(name).append(buildItem(data));
  }
  filter(root);
}

/** Busy state: aria-busy on the command, the loading row after 300 ms. */
export function setLoading(target, on = true) {
  const root = rootOf(target);
  if (!root) return;
  const loading = root.querySelector(".ds-command__loading");
  window.clearTimeout(root._dsLoadingTimer);
  if (on) {
    root.setAttribute("aria-busy", "true");
    root._dsLoadingTimer = window.setTimeout(() => { if (loading && root.getAttribute("aria-busy") === "true") { loading.hidden = false; root.querySelector(".ds-command__empty")?.setAttribute("hidden", ""); } }, 300);
  } else {
    root.removeAttribute("aria-busy");
    if (loading) loading.hidden = true;
  }
}

function fetchRemote(root, query) {
  const source = root.getAttribute("data-ds-command-source");
  if (!source) return;
  root._dsAbort?.abort();
  window.clearTimeout(root._dsFetchTimer);
  const min = Number(root.getAttribute("data-ds-command-min") || 1);
  if (query.trim().length < min) { setLoading(root, false); setItems(root, []); return; }
  root._dsFetchTimer = window.setTimeout(async () => {
    const controller = new AbortController();
    root._dsAbort = controller;
    setLoading(root, true);
    const url = source.includes("{query}") ? source.replace("{query}", encodeURIComponent(query)) : `${source}${source.includes("?") ? "&" : "?"}q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(String(response.status));
      const items = await response.json();
      setLoading(root, false);
      setItems(root, Array.isArray(items) ? items : []);
    } catch (error) {
      if (error?.name === "AbortError") return;
      setLoading(root, false);
      setItems(root, []);
      const empty = root.querySelector(".ds-command__empty");
      if (empty && !root.querySelector(`${ITEM}:not([hidden])`)) {
        empty.hidden = false;
        empty.querySelectorAll("[data-ds-command-message]").forEach((el) => { el.textContent = t("command.error"); });
      }
    }
  }, 200);
}

/* ------------------------------------------------------------------ setup */
const prepared = new WeakSet();
function prepare(root) {
  if (prepared.has(root)) return;
  prepared.add(root);
  const input = root.querySelector(".ds-command__input");
  const list = root.querySelector(".ds-command__list");
  if (!input || !list) return;
  list.id ||= uid("command-list");
  list.setAttribute("role", "listbox");
  if (!list.hasAttribute("aria-label") && !list.hasAttribute("aria-labelledby")) list.setAttribute("aria-label", t("command.label"));
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-expanded", "true");
  input.setAttribute("aria-controls", list.id);
  input.setAttribute("aria-autocomplete", "list");
  input.autocomplete = "off";
  input.spellcheck = false;
  if (!input.hasAttribute("aria-label") && !input.hasAttribute("aria-labelledby")) input.setAttribute("aria-label", input.placeholder || t("command.label"));
  root.querySelectorAll(".ds-command__group").forEach((group) => {
    group.setAttribute("role", "group");
    const heading = group.querySelector(":scope > .ds-command__group-label");
    if (heading && !group.hasAttribute("aria-labelledby")) { heading.id ||= uid("command-group"); group.setAttribute("aria-labelledby", heading.id); }
  });
  root.querySelectorAll(ITEM).forEach((item) => {
    item.id ||= uid("command-item");
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", "false");
    if (item.matches("a, button")) item.tabIndex = -1;
  });
  root.querySelectorAll(".ds-command__loading").forEach((el) => { el.hidden = true; });

  input.addEventListener("input", () => {
    filter(root);
    root.dispatchEvent(new CustomEvent("ds:command:query", { bubbles: true, detail: { query: input.value } }));
    fetchRemote(root, input.value);
  });
  input.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); move(root, event.key === "ArrowDown" ? 1 : -1); }
    else if (event.key === "Enter") {
      const item = root.querySelector(`${ITEM}[aria-selected="true"]`);
      if (!item) return;
      event.preventDefault();
      if (enabled(item)) item.click();
    } else if (event.key === "Escape") {
      // Handled here, before document-level search-field handlers, so Escape always means "close the palette".
      const dialog = root.closest("dialog[data-ds-command]");
      if (dialog) { event.preventDefault(); event.stopPropagation(); close(dialog); }
      else if (input.value) { event.preventDefault(); event.stopPropagation(); filter(root, ""); }
    }
  });
  // Highlight follows the pointer (pointermove, not pointerover, so a list scrolling under a still pointer does not steal it).
  list.addEventListener("pointermove", (event) => {
    const item = event.target instanceof Element ? event.target.closest(ITEM) : null;
    if (item && enabled(item) && item.getAttribute("aria-selected") !== "true") select(root, item, { scroll: false });
  });
  list.addEventListener("pointerdown", (event) => { if (event.target instanceof Element && event.target.closest(ITEM)) event.preventDefault(); }); // keep focus in the input
  filter(root);
}

function reset(root) {
  const input = root.querySelector(".ds-command__input");
  if (input) input.value = "";
  root._dsAbort?.abort();
  setLoading(root, false);
  if (root.hasAttribute("data-ds-command-source")) setItems(root, []);
  else filter(root);
}

/* ------------------------------------------------------------------ palette */
const palettes = () => [...document.querySelectorAll("dialog[data-ds-command]")];

export function open(id) {
  const dialog = id ? resolve(id) : palettes()[0];
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return dialog ?? null;
  const root = rootOf(dialog);
  if (root) { prepare(root); reset(root); }
  if (!dialog.hasAttribute("aria-label") && !dialog.hasAttribute("aria-labelledby")) dialog.setAttribute("aria-label", t("command.label"));
  openDialog(dialog);
  root?.querySelector(".ds-command__input")?.focus({ preventScroll: true });
  return dialog;
}

export function close(id) {
  const dialog = id ? resolve(id) : palettes().find((d) => d.open);
  if (dialog?.open) closeDialog(dialog, "close");
}

function matchesShortcut(event, spec) {
  const parts = spec.toLowerCase().split("+").map((s) => s.trim());
  const keyName = parts.at(-1);
  const mod = parts.includes("mod");
  const wantMeta = parts.includes("meta") || (mod && isApple());
  const wantCtrl = parts.includes("ctrl") || (mod && !isApple());
  return event.key.toLowerCase() === keyName && event.metaKey === wantMeta && event.ctrlKey === wantCtrl && event.shiftKey === parts.includes("shift") && event.altKey === parts.includes("alt");
}

function shortcutLabel(spec) {
  return spec.split("+").map((p) => {
    const k = p.trim().toLowerCase();
    if (k === "mod") return isApple() ? "⌘" : "Ctrl";
    if (k === "shift") return isApple() ? "⇧" : "Shift";
    if (k === "alt") return isApple() ? "⌥" : "Alt";
    return k.length === 1 ? k.toUpperCase() : k[0].toUpperCase() + k.slice(1);
  }).join(isApple() ? "" : " ");
}

export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const opener = target.closest("[data-ds-command-open]");
    if (opener) { event.preventDefault(); open(opener.getAttribute("data-ds-command-open") || undefined); return; }
    const item = target.closest(ITEM);
    const root = item?.closest(".ds-command");
    if (!item || !root) return;
    if (!enabled(item)) { event.preventDefault(); event.stopPropagation(); return; }
    const input = root.querySelector(".ds-command__input");
    const proceed = item.dispatchEvent(new CustomEvent("ds:command:select", { bubbles: true, cancelable: true, detail: { value: item.getAttribute("data-value") ?? item.querySelector(".ds-command__label")?.textContent?.trim() ?? item.textContent.trim(), item, query: input?.value ?? "" } }));
    if (!proceed) { event.preventDefault(); return; }
    // Close the palette before the item's own action runs, so a dialog it opens is not stacked on the palette.
    const dialog = root.closest("dialog[data-ds-command]");
    if (dialog && !item.hasAttribute("data-ds-keep-open")) closeDialog(dialog, "select");
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.repeat) return;
    const typing = event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]");
    for (const dialog of palettes()) {
      const spec = dialog.getAttribute("data-ds-command-shortcut");
      if (!spec) continue;
      if (spec.length === 1 ? event.key === spec && !typing && !event.ctrlKey && !event.metaKey && !event.altKey : matchesShortcut(event, spec)) {
        event.preventDefault();
        if (dialog.open) close(dialog);
        else open(dialog);
        return;
      }
    }
  });
}

export function init(root) {
  root.querySelectorAll?.(".ds-command").forEach((el) => { if (!el.closest("dialog") || el.closest("dialog").open) prepare(el); });
  root.querySelectorAll?.("[data-ds-command-hint]").forEach((el) => {
    const dialog = document.getElementById(el.getAttribute("data-ds-command-hint")) ?? palettes()[0];
    const spec = dialog?.getAttribute("data-ds-command-shortcut");
    if (spec) el.textContent = shortcutLabel(spec);
  });
}

export const api = { command: { open, close, filter, setItems, setLoading } };
