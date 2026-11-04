/* Data display behaviours: wide tables (pinned columns, scroll hint), tree and detail rows, data-table toolbar (density,
   column visibility, client search and chips), code blocks (copy, wrap, expand) and kbd platform text.
   Owner: batch A6. Contract: docs/_contributing.md.

   Tables
     .ds-table-scroll > table[data-ds-pin="N"][data-ds-pin-primary="i"], th[data-ds-pin-end], [data-ds-scroll-hint] right before the scroller.
     button[data-ds-tree-toggle][aria-controls=<tbody id>] (+ data-ds-label-expand / -collapse), [data-ds-tree-all="open|close"][aria-controls=<table id>].
     Event: dispatch "ds:tableupdate" on the scroller to re-measure.
   Data table (root .ds-data-table[data-ds-table], optional id + data-ds-persist)
     [data-ds-density-set="compact|comfortable"]   buttons, aria-pressed; sets data-density on the root
     input[data-ds-column="key"] + th/td[data-col="key"]   column visibility; [data-ds-columns-reset]
     input[data-ds-table-search] [data-ds-table-count]  client-side text filter over tbody rows; tr[data-ds-table-empty] is shown when nothing matches
     [data-ds-filter-group="key"] > [data-ds-filter-value="v"]  chips; rows carry data-filter-<key>="v"
     Events (bubble from the root): ds:table:density, ds:table:columns, ds:table:filter, ds:table:toggle
   Code block (figure.ds-code)
     [data-ds-code-copy], [data-ds-code-wrap], figure[data-ds-code-collapsible="<rem>"] + [data-ds-code-expand]; copy skips removed diff lines.
   Kbd: [data-ds-kbd-mac="⌘"] swaps its text on Apple platforms. */
import { t, addMessages, normalize, store, key as storageKey } from "../core.js";
import { copyText } from "./forms.js";

addMessages({
  en: {
    "table.showing": "Showing {shown} of {total} rows",
    "table.noMatch": "No rows match",
    "table.columnShown": "{name} column shown",
    "table.columnHidden": "{name} column hidden",
    "table.densityCompact": "Compact rows",
    "table.densityComfortable": "Comfortable rows",
    "code.copy": "Copy",
    "code.copied": "Copied",
    "code.failed": "Copy failed",
    "code.copiedStatus": "Code copied to the clipboard",
    "code.failedStatus": "Could not copy. Select the code and press Ctrl+C.",
    "code.expand": "Show all {count} lines",
    "code.collapse": "Show less",
    "code.wrapOn": "Wrap lines",
  },
  id: {
    "table.showing": "Menampilkan {shown} dari {total} baris",
    "table.noMatch": "Tidak ada baris yang cocok",
    "table.columnShown": "Kolom {name} ditampilkan",
    "table.columnHidden": "Kolom {name} disembunyikan",
    "table.densityCompact": "Baris rapat",
    "table.densityComfortable": "Baris lega",
    "code.copy": "Salin",
    "code.copied": "Tersalin",
    "code.failed": "Gagal menyalin",
    "code.copiedStatus": "Kode disalin ke papan klip",
    "code.failedStatus": "Tidak dapat menyalin. Pilih kodenya lalu tekan Ctrl+C.",
    "code.expand": "Tampilkan semua {count} baris",
    "code.collapse": "Tampilkan lebih sedikit",
    "code.wrapOn": "Bungkus baris",
  },
});

/* ------------------------------------------------------------------ pinned columns */
function cellGrid(table) {
  // Map every cell to its starting column, honouring rowspan/colspan, so pinned offsets never shift.
  const grid = [];
  const rows = [...table.rows];
  rows.forEach((row, r) => {
    grid[r] ??= [];
    let c = 0;
    for (const cell of row.cells) {
      while (grid[r][c]) c++;
      for (let dr = 0; dr < cell.rowSpan; dr++) {
        grid[r + dr] ??= [];
        for (let dc = 0; dc < cell.colSpan; dc++) grid[r + dr][c + dc] = cell;
      }
      cell._dsCol = c;
      c += cell.colSpan;
    }
  });
  return rows;
}

function updatePinned(table) {
  const scroller = table.closest(".ds-table-scroll");
  if (!scroller) return;
  const start = Number(table.getAttribute("data-ds-pin") || 0);
  const primary = Number(table.getAttribute("data-ds-pin-primary") || 0);
  const rows = cellGrid(table);
  const head = table.tHead?.rows[table.tHead.rows.length - 1];
  const widths = [];
  head && [...head.cells].forEach((cell) => { widths[cell._dsCol] = cell.getBoundingClientRect().width; });
  const endCols = head ? [...head.cells].filter((c) => c.hasAttribute("data-ds-pin-end")).map((c) => c._dsCol) : [];
  const visible = scroller.clientWidth;
  scroller.style.setProperty("--table-visible-width", `${visible}px`);
  const endWidth = endCols.reduce((sum, c) => sum + (widths[c] || 0), 0);
  let startCols = [...Array(start).keys()];
  const startWidth = startCols.reduce((sum, c) => sum + (widths[c] || 0), 0);
  let mode = start ? "full" : "none";
  if (start && visible - endWidth - startWidth < 240) { startCols = [primary]; mode = "compact"; }
  if (start && visible - endWidth < (widths[primary] || 0) + 120) { startCols = []; mode = "none"; }
  scroller.setAttribute("data-pin-mode", mode);
  const left = []; let acc = 0;
  for (const c of startCols) { left[c] = acc; acc += widths[c] || 0; }
  const right = []; let accR = 0;
  for (const c of [...endCols].reverse()) { right[c] = accR; accR += widths[c] || 0; }
  const lastStart = startCols.at(-1);
  const firstEnd = endCols[0];
  for (const row of rows) {
    for (const cell of row.cells) {
      const c = cell._dsCol;
      const pinStart = cell.colSpan === 1 && startCols.includes(c);
      const pinEnd = cell.colSpan === 1 && endCols.includes(c);
      cell.classList.toggle("is-pinned", pinStart);
      cell.classList.toggle("is-pin-boundary", pinStart && c === lastStart);
      cell.classList.toggle("is-pinned-end", pinEnd);
      cell.classList.toggle("is-pin-end-boundary", pinEnd && c === firstEnd);
      if (pinStart) cell.style.setProperty("--pin-left", `${left[c]}px`); else cell.style.removeProperty("--pin-left");
      if (pinEnd) cell.style.setProperty("--pin-right", `${right[c]}px`); else cell.style.removeProperty("--pin-right");
    }
  }
  const hint = scroller.previousElementSibling?.matches?.("[data-ds-scroll-hint]") ? scroller.previousElementSibling : null;
  if (hint) hint.hidden = !(scroller.scrollWidth > scroller.clientWidth + 1);
}

/* ------------------------------------------------------------------ tree and detail rows */
export function setTree(button, open) {
  const body = document.getElementById(button.getAttribute("aria-controls"));
  button.setAttribute("aria-expanded", String(open));
  const label = button.getAttribute(open ? "data-ds-label-collapse" : "data-ds-label-expand");
  if (label) button.setAttribute("aria-label", label);
  if (body) body.hidden = !open;
  button.closest(".ds-table-scroll")?.dispatchEvent(new Event("ds:tableupdate"));
  button.dispatchEvent(new CustomEvent("ds:table:toggle", { bubbles: true, detail: { expanded: open, body } }));
}

/* ------------------------------------------------------------------ data table */
const liveRegions = new WeakMap();

function announce(root, text) {
  let region = liveRegions.get(root);
  if (!region) {
    region = document.createElement("p");
    region.className = "ds-visually-hidden";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    root.append(region);
    liveRegions.set(root, region);
  }
  region.textContent = "";
  window.setTimeout(() => { region.textContent = text; }, 40);
}

const storeKey = (root, name) => (root.id && root.hasAttribute("data-ds-persist") ? storageKey(`table-${root.id}-${name}`) : null);

function refreshPinned(root) {
  root.querySelectorAll(".ds-table-scroll").forEach((scroller) => scroller.dispatchEvent(new Event("ds:tableupdate")));
}

function setDensity(root, value, remember = true) {
  if (value !== "compact" && value !== "comfortable") return;
  root.setAttribute("data-density", value);
  root.querySelectorAll("[data-ds-density-set]").forEach((button) => button.setAttribute("aria-pressed", String(button.getAttribute("data-ds-density-set") === value)));
  const k = storeKey(root, "density");
  if (remember && k) store.set(k, value);
  refreshPinned(root);
  root.dispatchEvent(new CustomEvent("ds:table:density", { bubbles: true, detail: { density: value } }));
}

function setColumn(root, name, visible) {
  root.querySelectorAll(`[data-col="${CSS.escape(name)}"]`).forEach((cell) => { cell.hidden = !visible; });
  refreshPinned(root);
}

function hiddenColumns(root) {
  return [...root.querySelectorAll("input[data-ds-column]")].filter((input) => !input.checked).map((input) => input.getAttribute("data-ds-column"));
}

function applyColumns(root, hidden) {
  root.querySelectorAll("input[data-ds-column]").forEach((input) => {
    const name = input.getAttribute("data-ds-column");
    input.checked = !hidden.includes(name);
    setColumn(root, name, input.checked);
  });
}

function dataRows(root) {
  return [...root.querySelectorAll("tbody > tr")].filter((row) => !row.matches(".ds-group-row, .ds-detail-row, .ds-tree-child, .ds-tree-summary, .ds-table-state"));
}

function applyFilter(root) {
  const search = root.querySelector("input[data-ds-table-search]");
  const needle = normalize(search?.value ?? "");
  const groups = [...root.querySelectorAll("[data-ds-filter-group]")].map((group) => ({
    key: group.getAttribute("data-ds-filter-group"),
    value: group.querySelector('[data-ds-filter-value][aria-pressed="true"]')?.getAttribute("data-ds-filter-value") ?? "",
  }));
  const rows = dataRows(root);
  let shown = 0;
  for (const row of rows) {
    const textOk = !needle || normalize(row.textContent).includes(needle);
    const chipsOk = groups.every((g) => !g.value || row.getAttribute(`data-filter-${g.key}`) === g.value);
    const visible = textOk && chipsOk;
    row.hidden = !visible;
    if (visible) shown++;
  }
  const empty = root.querySelector("tr[data-ds-table-empty]");
  if (empty) empty.hidden = !(rows.length > 0 && shown === 0);
  root.querySelectorAll("[data-ds-table-count]").forEach((el) => { el.textContent = t("table.showing", { shown, total: rows.length }); });
  announce(root, shown === 0 ? t("table.noMatch") : t("table.showing", { shown, total: rows.length }));
  root.dispatchEvent(new CustomEvent("ds:table:filter", { bubbles: true, detail: { shown, total: rows.length, query: search?.value ?? "" } }));
}

function initDataTable(root) {
  if (root._dsTable) return;
  root._dsTable = true;
  const k = storeKey(root, "density");
  const saved = k ? store.get(k) : null;
  setDensity(root, saved || root.getAttribute("data-density") || root.querySelector('[data-ds-density-set][aria-pressed="true"]')?.getAttribute("data-ds-density-set") || "comfortable", false);

  const kc = storeKey(root, "columns");
  const savedCols = kc ? store.get(kc) : null;
  if (savedCols != null) applyColumns(root, savedCols.split(",").filter(Boolean));
  else applyColumns(root, hiddenColumns(root));

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const density = target?.closest("[data-ds-density-set]");
    if (density && root.contains(density)) { setDensity(root, density.getAttribute("data-ds-density-set")); return; }
    const reset = target?.closest("[data-ds-columns-reset]");
    if (reset && root.contains(reset)) {
      applyColumns(root, []);
      if (kc) store.set(kc, null);
      root.dispatchEvent(new CustomEvent("ds:table:columns", { bubbles: true, detail: { hidden: [] } }));
      return;
    }
    const chip = target?.closest("[data-ds-filter-value]");
    if (chip && root.contains(chip)) {
      const group = chip.closest("[data-ds-filter-group]");
      group?.querySelectorAll("[data-ds-filter-value]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      applyFilter(root);
    }
  });

  root.addEventListener("change", (event) => {
    const input = event.target instanceof HTMLInputElement ? event.target : null;
    if (!input?.matches("input[data-ds-column]")) return;
    const name = input.getAttribute("data-ds-column");
    setColumn(root, name, input.checked);
    const label = input.closest("label")?.textContent?.trim() || name;
    announce(root, t(input.checked ? "table.columnShown" : "table.columnHidden", { name: label }));
    const hidden = hiddenColumns(root);
    if (kc) store.set(kc, hidden.join(","));
    root.dispatchEvent(new CustomEvent("ds:table:columns", { bubbles: true, detail: { hidden } }));
  });

  let timer = 0;
  root.addEventListener("input", (event) => {
    if (!(event.target instanceof Element) || !event.target.matches("input[data-ds-table-search]")) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => applyFilter(root), 120);
  });
  root.addEventListener("keydown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (event.key === "Enter" && target?.matches("input[data-ds-table-search]") && !target.closest("form[method]")) event.preventDefault();
    if (event.key === "Escape" && target?.matches("input[data-ds-table-search]") && target.value) { target.value = ""; applyFilter(root); }
  });
  // A server-rendered filter state (value already typed, chip already pressed) is applied once on load.
  if (root.querySelector("input[data-ds-table-search]")?.value || root.querySelector('[data-ds-filter-group] [aria-pressed="true"][data-ds-filter-value]:not([data-ds-filter-value=""])')) applyFilter(root);
}

/* ------------------------------------------------------------------ code block */
function codeText(figure) {
  const pre = figure.querySelector("pre");
  if (!pre) return "";
  const clone = pre.cloneNode(true);
  clone.querySelectorAll('[data-change="removed"]').forEach((line) => {
    const next = line.nextSibling;
    if (next && next.nodeType === Node.TEXT_NODE && next.data.startsWith("\n")) next.data = next.data.slice(1);
    line.remove();
  });
  clone.querySelectorAll(".ds-code-skip").forEach((el) => el.remove());
  return clone.textContent.replace(/\n$/, "");
}

function codeStatus(figure, text) {
  let status = figure.querySelector(".ds-code__status");
  if (!status) {
    status = document.createElement("span");
    status.className = "ds-code__status";
    status.setAttribute("role", "status");
    figure.append(status);
  }
  status.textContent = "";
  window.setTimeout(() => { status.textContent = text; }, 40);
}

async function copyCode(button) {
  const figure = button.closest(".ds-code");
  if (!figure || button.dataset.state === "pending") return;
  button.dataset.state = "pending";
  const ok = await copyText(codeText(figure), button);
  button.dataset.state = ok ? "copied" : "failed";
  codeStatus(figure, t(ok ? "code.copiedStatus" : "code.failedStatus"));
  window.clearTimeout(button._dsTimer);
  button._dsTimer = window.setTimeout(() => { delete button.dataset.state; }, ok ? 1800 : 2400);
}

function initCode(figure) {
  if (figure._dsCode) return;
  figure._dsCode = true;
  const pre = figure.querySelector("pre");
  if (pre && !pre.hasAttribute("tabindex")) pre.tabIndex = 0;
  const limit = figure.getAttribute("data-ds-code-collapsible");
  const expand = figure.querySelector("[data-ds-code-expand]");
  if (limit != null && pre) {
    const rem = parseFloat(limit) || 14;
    figure.style.setProperty("--ds-code-collapsed", `${rem}rem`);
    const px = rem * parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
    const lines = pre.querySelectorAll(".ds-code-line").length || pre.textContent.split("\n").length;
    if (pre.scrollHeight > px + 32) {
      figure.setAttribute("data-collapsed", "true");
      if (expand) {
        expand.hidden = false;
        expand.closest(".ds-code__foot")?.removeAttribute("hidden");
        expand.setAttribute("aria-expanded", "false");
        if (pre.id) expand.setAttribute("aria-controls", pre.id);
        const label = expand.querySelector("[data-ds-code-expand-label]") ?? expand;
        label.textContent = t("code.expand", { count: lines });
        expand._dsLines = lines;
      }
    } else if (expand) {
      expand.closest(".ds-code__foot")?.setAttribute("hidden", "");
    }
  }
}

/* ------------------------------------------------------------------ kbd */
const isApple = () => /Mac|iPhone|iPad|iPod/i.test(navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "");

function initKbd(root) {
  if (!isApple()) return;
  root.querySelectorAll("[data-ds-kbd-mac]").forEach((el) => {
    if (el.dataset.dsKbdPlatform) return;
    el.dataset.dsKbdPlatform = "mac";
    el.dataset.dsKbdOriginal = el.textContent;
    el.textContent = el.getAttribute("data-ds-kbd-mac");
    const spoken = el.getAttribute("data-ds-kbd-mac-label");
    if (spoken) el.setAttribute("aria-label", spoken);
  });
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const toggle = target.closest("[data-ds-tree-toggle]");
    if (toggle) return setTree(toggle, toggle.getAttribute("aria-expanded") !== "true");
    const all = target.closest("[data-ds-tree-all]");
    if (all) {
      const scope = document.getElementById(all.getAttribute("aria-controls") || "") ?? document;
      const open = all.getAttribute("data-ds-tree-all") === "open";
      scope.querySelectorAll("[data-ds-tree-toggle]").forEach((button) => setTree(button, open));
      return;
    }
    const copy = target.closest("[data-ds-code-copy]");
    if (copy) { copyCode(copy); return; }
    const wrap = target.closest("[data-ds-code-wrap]");
    if (wrap) {
      const figure = wrap.closest(".ds-code");
      const on = !figure?.classList.contains("is-wrapped");
      figure?.classList.toggle("is-wrapped", on);
      wrap.setAttribute("aria-pressed", String(on));
      return;
    }
    const expand = target.closest("[data-ds-code-expand]");
    if (expand) {
      const figure = expand.closest(".ds-code");
      const open = figure?.getAttribute("data-collapsed") === "true";
      figure?.setAttribute("data-collapsed", String(!open));
      expand.setAttribute("aria-expanded", String(open));
      const label = expand.querySelector("[data-ds-code-expand-label]") ?? expand;
      label.textContent = open ? t("code.collapse") : t("code.expand", { count: expand._dsLines ?? "" });
    }
  });
}

export function init(root) {
  root.querySelectorAll(".ds-table-scroll").forEach((scroller) => {
    if (scroller._dsWired) return;
    scroller._dsWired = true;
    const table = scroller.querySelector("table");
    let frame = 0;
    const schedule = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; if (table) updatePinned(table); }); };
    scroller.addEventListener("scroll", () => scroller.classList.toggle("is-scrolled", scroller.scrollLeft > 1), { passive: true });
    if ("ResizeObserver" in window) { const ro = new ResizeObserver(schedule); ro.observe(scroller); if (table) ro.observe(table); }
    document.fonts?.ready.then(schedule);
    scroller.addEventListener("ds:tableupdate", schedule);
    schedule();
  });
  root.querySelectorAll(".ds-data-table[data-ds-table]").forEach(initDataTable);
  root.querySelectorAll(".ds-code").forEach(initCode);
  initKbd(root);
}

export const api = { dataTable: { setTree, setDensity, applyFilter, setColumn } };
