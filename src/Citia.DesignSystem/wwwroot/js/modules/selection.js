/* Selection: table row selection with header checkbox, bulk action bar and keyboard; selectable lists (ARIA listbox).
   Owner: batch A6. Contract: docs/_contributing.md.

   Table (root [data-ds-select], usually the .ds-data-table; optional data-total="57" and data-ds-select-click)
     thead input[data-ds-select-all]            header checkbox (checked / indeterminate / unchecked is set here)
     tbody input[data-ds-select-row]            row checkboxes (also .ds-pick > input); value = record id
     [data-ds-bulk]                             bulk action bar; gets [data-open] while rows are selected
     [data-ds-select-count]                     count text (give it role="status")
     [data-ds-select-clear]                     clear button; [data-ds-select-everything] "select all N" button (shown when a whole page is selected)
     Keyboard: Space toggles, Shift+click or Shift+Space selects a range, Shift+Arrow extends, Arrow Up/Down moves between rows,
               Ctrl/Cmd+A selects every visible row, Escape clears.
     Events: ds:selection:change { count, total, values, rows }, ds:selection:selectall
   Listbox (ul|div[role=listbox][data-ds-listbox], children [role=option][data-value]; aria-multiselectable="true" for many;
            data-ds-name="field" keeps hidden inputs for a form; data-ds-listbox-follow makes selection follow focus)
     Keyboard: Arrow Up/Down, Home/End, type-ahead, Space/Enter select, Shift+Arrow extend, Ctrl/Cmd+A all.
     Event: ds:listbox:change { values, items } */
import { t, addMessages, normalize, focusQuietly } from "../core.js";

addMessages({
  en: {
    "selection.count": "{count} selected",
    "selection.countAll": "All {count} selected",
    "selection.cleared": "Selection cleared",
    "selection.none": "No rows selected",
    "listbox.count": "{count} selected",
  },
  id: {
    "selection.count": "{count} dipilih",
    "selection.countAll": "Semua {count} dipilih",
    "selection.cleared": "Pilihan dihapus",
    "selection.none": "Tidak ada baris dipilih",
    "listbox.count": "{count} dipilih",
  },
});

const ROW_BOX = "tbody input[type=checkbox][data-ds-select-row], tbody td > .ds-pick > input[type=checkbox]";
const HEAD_BOX = "thead input[type=checkbox][data-ds-select-all], thead th > .ds-pick > input[type=checkbox]";
const lastAnchor = new WeakMap();

const rowBoxes = (root) => [...root.querySelectorAll(ROW_BOX)];
const usable = (box) => !box.disabled && !box.closest("[hidden]");
const enabledBoxes = (root) => rowBoxes(root).filter(usable);
const headBox = (root) => root.querySelector(HEAD_BOX);

function describe(root) {
  const boxes = rowBoxes(root);
  const selected = boxes.filter((b) => b.checked && !b.closest("[hidden]"));
  return {
    boxes,
    selected,
    values: selected.map((b) => b.value),
    rows: selected.map((b) => b.closest("tr")),
  };
}

function update(root, { silent = false } = {}) {
  const enabled = enabledBoxes(root);
  const { selected, values, rows } = describe(root);
  const count = selected.length;
  for (const box of rowBoxes(root)) box.closest("tr")?.setAttribute("aria-selected", String(box.checked && !box.closest("[hidden]")));
  const head = headBox(root);
  if (head) {
    const all = enabled.length > 0 && enabled.every((b) => b.checked);
    head.checked = all;
    head.indeterminate = !all && enabled.some((b) => b.checked);
    head.disabled = enabled.length === 0;
  }
  const total = Number(root.getAttribute("data-total") || 0);
  const everything = root.hasAttribute("data-ds-all-pages") && total > 0;
  if (count === 0 || !enabled.every((b) => b.checked)) root.removeAttribute("data-ds-all-pages");
  root.querySelectorAll("[data-ds-select-count]").forEach((el) => {
    el.textContent = everything && count > 0 ? t("selection.countAll", { count: total }) : count > 0 ? t("selection.count", { count }) : t("selection.none");
  });
  root.querySelectorAll("[data-ds-select-everything]").forEach((el) => {
    el.hidden = !(total > count && enabled.length > 0 && enabled.every((b) => b.checked) && !everything);
  });
  root.querySelectorAll("[data-ds-bulk]").forEach((bar) => {
    const open = count > 0;
    bar.toggleAttribute("data-open", open);
    bar.toggleAttribute("inert", !open);
    bar.setAttribute("aria-hidden", String(!open));
  });
  if (!silent) root.dispatchEvent(new CustomEvent("ds:selection:change", { bubbles: true, detail: { count: everything ? total : count, total: everything ? total : enabled.length, values, rows } }));
}

function setRange(root, from, to, state) {
  const list = enabledBoxes(root);
  const a = list.indexOf(from);
  const b = list.indexOf(to);
  if (a < 0 || b < 0) return;
  for (const box of list.slice(Math.min(a, b), Math.max(a, b) + 1)) box.checked = state;
}

function selectAll(root, state = true) {
  enabledBoxes(root).forEach((b) => { b.checked = state; });
  if (!state) root.removeAttribute("data-ds-all-pages");
  update(root);
}

function clear(root) {
  selectAll(root, false);
}

function isTextField(el) {
  if (!(el instanceof HTMLElement)) return false;
  if (el.isContentEditable || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) return true;
  return el instanceof HTMLInputElement && !["checkbox", "radio", "button", "submit"].includes(el.type);
}

function wireSelectRoot(root) {
  if (root._dsSelect) return;
  root._dsSelect = true;
  update(root, { silent: true });

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest("[data-ds-select-clear]")) {
      clear(root);
      const status = root.querySelector("[data-ds-select-count]");
      if (status) status.textContent = t("selection.cleared");
      focusQuietly(headBox(root) ?? enabledBoxes(root)[0]);
      return;
    }
    if (target.closest("[data-ds-select-everything]")) {
      root.setAttribute("data-ds-all-pages", "");
      update(root);
      root.dispatchEvent(new CustomEvent("ds:selection:selectall", { bubbles: true, detail: { total: Number(root.getAttribute("data-total") || 0) } }));
      return;
    }
    const box = target.closest(ROW_BOX);
    if (box && root.contains(box)) {
      const anchor = lastAnchor.get(root);
      if (event.shiftKey && anchor && anchor !== box) { setRange(root, anchor, box, box.checked); }
      lastAnchor.set(root, box);
      return; // change handler updates
    }
    // Optional: click on empty row space toggles the row.
    if (root.hasAttribute("data-ds-select-click")) {
      const row = target.closest("tbody > tr");
      if (row && root.contains(row) && !target.closest("a, button, input, select, textarea, label, summary, details, [role=menu]")) {
        const rowBox = row.querySelector(ROW_BOX);
        if (rowBox && usable(rowBox)) {
          const anchor = lastAnchor.get(root);
          rowBox.checked = !rowBox.checked;
          if (event.shiftKey && anchor && anchor !== rowBox) setRange(root, anchor, rowBox, rowBox.checked);
          lastAnchor.set(root, rowBox);
          update(root);
        }
      }
    }
  });

  root.addEventListener("change", (event) => {
    const input = event.target instanceof HTMLInputElement ? event.target : null;
    if (!input) return;
    if (input.matches(HEAD_BOX)) {
      enabledBoxes(root).forEach((b) => { b.checked = input.checked; });
      if (!input.checked) root.removeAttribute("data-ds-all-pages");
      update(root);
    } else if (input.matches(ROW_BOX)) {
      update(root);
    }
  });

  root.addEventListener("keydown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target || isTextField(target)) return;
    const mod = event.ctrlKey || event.metaKey;
    if (mod && event.key.toLowerCase() === "a" && (target.closest("table, .ds-table-scroll, .ds-table-wrap, [data-ds-bulk]") || target === root)) {
      event.preventDefault();
      selectAll(root, true);
      return;
    }
    if (event.key === "Escape" && describe(root).selected.length && !target.closest("details[open], dialog[open], [popover]:popover-open")) {
      clear(root);
      return;
    }
    const box = target.closest(ROW_BOX);
    const row = target.closest("tbody > tr");
    // Space on a focused row (tabindex) toggles its checkbox.
    if (event.key === " " && target === row && row) {
      const rowBox = row.querySelector(ROW_BOX);
      if (rowBox && usable(rowBox)) {
        event.preventDefault();
        rowBox.checked = !rowBox.checked;
        lastAnchor.set(root, rowBox);
        update(root);
      }
      return;
    }
    if (!box || !root.contains(box)) return;
    const list = enabledBoxes(root);
    const index = list.indexOf(box);
    if (event.key === " " && event.shiftKey) {
      const anchor = lastAnchor.get(root);
      if (anchor && anchor !== box) {
        event.preventDefault();
        const state = !box.checked;
        box.checked = state;
        setRange(root, anchor, box, state);
        lastAnchor.set(root, box);
        update(root);
      }
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const next = list[index + (event.key === "ArrowDown" ? 1 : -1)];
      if (!next) return;
      event.preventDefault();
      if (event.shiftKey) {
        const state = lastAnchor.get(root)?.checked ?? true;
        box.checked = state;
        next.checked = state;
        update(root);
      }
      focusQuietly(next);
      next.closest("tr")?.scrollIntoView({ block: "nearest" });
    }
  });

  // Rows hidden by a filter leave the selection, so the count always matches what the reader sees.
  root.addEventListener("ds:table:filter", () => {
    rowBoxes(root).forEach((b) => { if (b.closest("[hidden]")) b.checked = false; });
    update(root);
  });
}

/* ------------------------------------------------------------------ listbox */
const options = (list) => [...list.querySelectorAll('[role="option"]')];
const optionOk = (el) => el.getAttribute("aria-disabled") !== "true";
const optionText = (el) => normalize(el.querySelector(".ds-list__title")?.textContent ?? el.textContent);

function listboxValues(list) {
  return options(list).filter((o) => o.getAttribute("aria-selected") === "true");
}

function syncListbox(list, { silent = false } = {}) {
  const chosen = listboxValues(list);
  const name = list.getAttribute("data-ds-name");
  if (name) {
    let holder = list._dsHolder;
    if (!holder) {
      holder = document.createElement("span");
      holder.hidden = true;
      list.after(holder);
      list._dsHolder = holder;
    }
    holder.replaceChildren(...chosen.map((o) => Object.assign(document.createElement("input"), { type: "hidden", name, value: o.getAttribute("data-value") ?? o.textContent.trim() })));
  }
  if (!silent) list.dispatchEvent(new CustomEvent("ds:listbox:change", { bubbles: true, detail: { values: chosen.map((o) => o.getAttribute("data-value") ?? o.textContent.trim()), items: chosen } }));
}

function focusOption(list, option) {
  options(list).forEach((o) => o.setAttribute("tabindex", o === option ? "0" : "-1"));
  focusQuietly(option);
  option.scrollIntoView({ block: "nearest" });
}

function chooseOption(list, option, { toggle = false, add = false } = {}) {
  const multiple = list.getAttribute("aria-multiselectable") === "true";
  if (!optionOk(option)) return;
  if (multiple) {
    option.setAttribute("aria-selected", String(toggle ? option.getAttribute("aria-selected") !== "true" : true));
  } else {
    options(list).forEach((o) => o.setAttribute("aria-selected", String(o === option)));
  }
  if (!add) list._dsAnchor = option;
  syncListbox(list);
}

function initListbox(list) {
  if (list._dsListbox) return;
  list._dsListbox = true;
  const all = options(list);
  all.forEach((o) => { if (!o.hasAttribute("aria-selected")) o.setAttribute("aria-selected", "false"); });
  const first = all.find((o) => o.getAttribute("aria-selected") === "true" && optionOk(o)) ?? all.find(optionOk);
  all.forEach((o) => o.setAttribute("tabindex", o === first ? "0" : "-1"));
  syncListbox(list, { silent: true });
  list._dsAnchor = first;

  list.addEventListener("click", (event) => {
    const option = event.target instanceof Element ? event.target.closest('[role="option"]') : null;
    if (!option || !list.contains(option) || !optionOk(option)) return;
    if (event.target.closest("a, button")) return;
    const multiple = list.getAttribute("aria-multiselectable") === "true";
    if (multiple && event.shiftKey && list._dsAnchor) {
      const items = options(list).filter(optionOk);
      const a = items.indexOf(list._dsAnchor);
      const b = items.indexOf(option);
      items.slice(Math.min(a, b), Math.max(a, b) + 1).forEach((o) => o.setAttribute("aria-selected", "true"));
      syncListbox(list);
    } else {
      chooseOption(list, option, { toggle: multiple });
    }
    focusOption(list, option);
  });

  list.addEventListener("keydown", (event) => {
    const current = event.target instanceof Element ? event.target.closest('[role="option"]') : null;
    if (!current || !list.contains(current)) return;
    const items = options(list).filter(optionOk);
    const index = items.indexOf(current);
    const multiple = list.getAttribute("aria-multiselectable") === "true";
    const follow = list.hasAttribute("data-ds-listbox-follow");
    let next = null;
    if (event.key === "ArrowDown") next = items[Math.min(items.length - 1, index + 1)];
    else if (event.key === "ArrowUp") next = items[Math.max(0, index - 1)];
    else if (event.key === "Home") next = items[0];
    else if (event.key === "End") next = items.at(-1);
    if (next) {
      event.preventDefault();
      focusOption(list, next);
      if (multiple && event.shiftKey) { current.setAttribute("aria-selected", "true"); chooseOption(list, next, { add: true }); }
      else if (!multiple && follow) chooseOption(list, next);
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      if (event.target.closest("a, button") && event.target !== current) return;
      event.preventDefault();
      chooseOption(list, current, { toggle: multiple });
      return;
    }
    if (multiple && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
      event.preventDefault();
      items.forEach((o) => o.setAttribute("aria-selected", "true"));
      syncListbox(list);
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      window.clearTimeout(list._dsTypeTimer);
      list._dsType = (list._dsType ?? "") + normalize(event.key);
      list._dsTypeTimer = window.setTimeout(() => { list._dsType = ""; }, 600);
      const pool = list._dsType.length === 1 ? [...items.slice(index + 1), ...items.slice(0, index + 1)] : items;
      const match = pool.find((o) => optionText(o).startsWith(list._dsType));
      if (match) { focusOption(list, match); if (!multiple && follow) chooseOption(list, match); }
    }
  });
}

/* ------------------------------------------------------------------ module */
export function wire() {}

export function init(root) {
  root.querySelectorAll("[data-ds-select]").forEach(wireSelectRoot);
  root.querySelectorAll("[data-ds-listbox]").forEach(initListbox);
}

export const api = {
  selection: {
    clear: (root) => clear(root),
    selectAll: (root, state = true) => selectAll(root, state),
    values: (root) => describe(root).values,
    count: (root) => describe(root).selected.length,
  },
};
