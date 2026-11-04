/* Tree view: ARIA tree with roving focus, expand/collapse, single or multiple selection, tri-state checkboxes, lazy children.
   Owner: batch A6. Contract: docs/_contributing.md.

   Markup: ul.ds-tree[role=tree][data-ds-tree][aria-label] > li.ds-tree__item[role=treeitem][aria-expanded?][data-value?]
             > .ds-tree__row (.ds-tree__label, .ds-tree__meta, .ds-tree__icon) + ul.ds-tree__group[role=group]
   Root options: data-ds-tree-select="single|multiple|none" (default single), data-ds-tree-checkable, data-ds-name="field" (hidden inputs of
     selected / checked values). Item options: data-ds-tree-src="/url" | "#template-id" (lazy children; data-ds-tree-delay="900" simulates latency),
     aria-disabled="true". Icons: <span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"> is filled in here.
   Keyboard: Arrow Up/Down, Right (open, then first child), Left (close, then parent), Home/End, * (open siblings), Enter (activate),
     Space (select or check), Ctrl/Cmd+A (select all, multiple), type-ahead.
   Events (bubble from the tree): ds:tree:toggle, ds:tree:select, ds:tree:check, ds:tree:activate, ds:tree:load (cancelable), ds:tree:loaded, ds:tree:error.
   API: DS.tree.load(item, nodes), DS.tree.fail(item), DS.tree.setExpanded(item, open), DS.tree.expandAll(tree), DS.tree.collapseAll(tree). */
import { t, addMessages, normalize, focusQuietly, icon } from "../core.js";

addMessages({
  en: {
    "tree.loading": "Loading {name}",
    "tree.loaded": "{count} items loaded in {name}",
    "tree.empty": "{name} is empty",
    "tree.failed": "Could not load {name}. Press Enter to try again.",
    "tree.retry": "Retry",
    "tree.expanded": "{name} expanded",
    "tree.collapsed": "{name} collapsed",
    "tree.checked": "{count} checked",
    "tree.selected": "{name} selected",
  },
  id: {
    "tree.loading": "Memuat {name}",
    "tree.loaded": "{count} item dimuat di {name}",
    "tree.empty": "{name} kosong",
    "tree.failed": "Tidak dapat memuat {name}. Tekan Enter untuk mencoba lagi.",
    "tree.retry": "Coba lagi",
    "tree.expanded": "{name} dibuka",
    "tree.collapsed": "{name} ditutup",
    "tree.checked": "{count} dicentang",
    "tree.selected": "{name} dipilih",
  },
});

const ITEM = '[role="treeitem"]';
const SVG_NS = "http://www.w3.org/2000/svg";
const isRtl = (el) => getComputedStyle(el).direction === "rtl";

/* ------------------------------------------------------------------ structure helpers */
const treeOf = (el) => el.closest('[role="tree"]');
const rowOf = (item) => item.querySelector(":scope > .ds-tree__row");
const groupOf = (item) => item.querySelector(":scope > [role='group'], :scope > .ds-tree__group");
const childItems = (item) => [...(groupOf(item)?.querySelectorAll(`:scope > ${ITEM}`) ?? [])];
const parentItem = (item) => item.parentElement?.closest(ITEM) ?? null;
const isParent = (item) => item.hasAttribute("aria-expanded");
const isOpen = (item) => item.getAttribute("aria-expanded") === "true";
const isDisabled = (item) => item.getAttribute("aria-disabled") === "true";
const labelOf = (item) => (rowOf(item)?.querySelector(".ds-tree__label")?.textContent ?? item.textContent).trim();
const modeOf = (tree) => tree.getAttribute("data-ds-tree-select") || "single";
const checkable = (tree) => tree.hasAttribute("data-ds-tree-checkable");

function visibleItems(tree) {
  return [...tree.querySelectorAll(ITEM)].filter((item) => {
    for (let p = parentItem(item); p; p = parentItem(p)) if (!isOpen(p)) return false;
    return true;
  });
}

function say(tree, text) {
  let region = tree._dsLive;
  if (!region) {
    region = document.createElement("p");
    region.className = "ds-visually-hidden";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    tree.after(region);
    tree._dsLive = region;
  }
  region.textContent = "";
  window.setTimeout(() => { region.textContent = text; }, 40);
}

function fire(tree, name, detail, cancelable = false) {
  const event = new CustomEvent(`ds:tree:${name}`, { bubbles: true, cancelable, detail });
  tree.dispatchEvent(event);
  return event;
}

/* ------------------------------------------------------------------ build */
function svgUse(name) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "ds-icon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", `#ds-icon-${name}`);
  svg.append(use);
  return svg;
}

function buildRow(tree, item) {
  const row = rowOf(item);
  if (!row) return;
  if (!row.querySelector(":scope > .ds-tree__toggle")) {
    const toggle = document.createElement("span");
    toggle.className = "ds-tree__toggle";
    toggle.setAttribute("aria-hidden", "true");
    toggle.insertAdjacentHTML("afterbegin", icon("chevron-right", "ds-icon"));
    row.prepend(toggle);
  }
  if (checkable(tree) && !row.querySelector(":scope > .ds-tree__check")) {
    const box = document.createElement("span");
    box.className = "ds-tree__check";
    box.setAttribute("aria-hidden", "true");
    box.insertAdjacentHTML("afterbegin", icon("check", "ds-icon is-checked") + icon("minus", "ds-icon is-mixed"));
    row.querySelector(":scope > .ds-tree__toggle").after(box);
  }
  const iconHost = row.querySelector(":scope > .ds-tree__icon");
  if (iconHost && !iconHost.firstElementChild) {
    const closed = iconHost.getAttribute("data-ds-icon");
    const open = iconHost.getAttribute("data-ds-icon-open");
    if (closed) {
      const a = svgUse(closed);
      if (open) { a.classList.add("is-closed"); iconHost.append(a); const b = svgUse(open); b.classList.add("is-open"); iconHost.append(b); }
      else iconHost.append(a);
    }
  }
}

function buildItems(tree, scope) {
  const groups = scope === tree ? [tree] : [scope];
  for (const group of groups) {
    if (group !== tree) group.setAttribute("role", "group");
    group.querySelectorAll(".ds-tree__group").forEach((g) => g.setAttribute("role", "group"));
    const lists = [group, ...group.querySelectorAll("[role='group']")];
    for (const list of lists) {
      if (list !== tree) list.classList.add("ds-tree__group");
      const items = [...list.querySelectorAll(`:scope > ${ITEM}`)];
      items.forEach((item, i) => {
        item.classList.add("ds-tree__item");
        item.setAttribute("aria-level", String(1 + depth(item)));
        item.setAttribute("aria-setsize", String(items.length));
        item.setAttribute("aria-posinset", String(i + 1));
        if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "-1");
        if (modeOf(tree) !== "none" && !checkable(tree) && !item.hasAttribute("aria-selected")) item.setAttribute("aria-selected", "false");
        if (modeOf(tree) === "none" && !checkable(tree)) item.removeAttribute("aria-selected");
        if (checkable(tree) && !item.hasAttribute("aria-checked")) item.setAttribute("aria-checked", "false");
        buildRow(tree, item);
      });
    }
  }
  scope.querySelectorAll(ITEM).forEach((item) => {
    // lazy parents are parents before they have children
    if (item.hasAttribute("data-ds-tree-src") && !item.hasAttribute("aria-expanded")) item.setAttribute("aria-expanded", "false");
  });
}

function depth(item) {
  let level = 0;
  for (let p = parentItem(item); p; p = parentItem(p)) level++;
  return level;
}

function initRoving(tree) {
  const items = visibleItems(tree);
  const selected = items.find((i) => i.getAttribute("aria-selected") === "true" && !isDisabled(i));
  const first = selected ?? items.find((i) => !isDisabled(i));
  tree.querySelectorAll(ITEM).forEach((i) => i.setAttribute("tabindex", i === first ? "0" : "-1"));
}

function focusItem(tree, item) {
  tree.querySelectorAll(`${ITEM}[tabindex="0"]`).forEach((i) => i.setAttribute("tabindex", "-1"));
  item.setAttribute("tabindex", "0");
  focusQuietly(item);
  rowOf(item)?.scrollIntoView({ block: "nearest" });
}

/* ------------------------------------------------------------------ checks (tri-state) */
function checkedValues(tree) {
  return [...tree.querySelectorAll(`${ITEM}[aria-checked="true"]`)].map((i) => i.getAttribute("data-value") ?? labelOf(i));
}

function refreshAncestors(item) {
  for (let p = parentItem(item); p; p = parentItem(p)) {
    const kids = childItems(p).filter((k) => !isDisabled(k));
    if (!kids.length) break;
    const states = kids.map((k) => k.getAttribute("aria-checked"));
    p.setAttribute("aria-checked", states.every((s) => s === "true") ? "true" : states.every((s) => s === "false") ? "false" : "mixed");
  }
}

function setChecked(item, state) {
  item.setAttribute("aria-checked", state ? "true" : "false");
  item.querySelectorAll(ITEM).forEach((d) => { if (!isDisabled(d)) d.setAttribute("aria-checked", state ? "true" : "false"); });
  refreshAncestors(item);
}

function initChecks(tree) {
  // Parents take their state from the leaves when the markup disagrees (server sent only leaf states).
  const parents = [...tree.querySelectorAll(ITEM)].filter((i) => childItems(i).length).reverse();
  for (const p of parents) {
    const kids = childItems(p).filter((k) => !isDisabled(k));
    if (!kids.length) continue;
    const states = kids.map((k) => k.getAttribute("aria-checked"));
    p.setAttribute("aria-checked", states.every((s) => s === "true") ? "true" : states.every((s) => s === "false") ? "false" : "mixed");
  }
}

function toggleCheck(tree, item) {
  if (isDisabled(item)) return;
  setChecked(item, item.getAttribute("aria-checked") !== "true");
  const values = checkedValues(tree);
  syncInputs(tree);
  fire(tree, "check", { item, checked: item.getAttribute("aria-checked"), values });
  say(tree, t("tree.checked", { count: values.length }));
}

/* ------------------------------------------------------------------ selection */
function selectedItems(tree) {
  return [...tree.querySelectorAll(`${ITEM}[aria-selected="true"]`)];
}

function syncInputs(tree) {
  const name = tree.getAttribute("data-ds-name");
  if (!name) return;
  let holder = tree._dsHolder;
  if (!holder) { holder = document.createElement("span"); holder.hidden = true; tree.after(holder); tree._dsHolder = holder; }
  const values = checkable(tree) ? checkedValues(tree) : selectedItems(tree).map((i) => i.getAttribute("data-value") ?? labelOf(i));
  holder.replaceChildren(...values.map((value) => Object.assign(document.createElement("input"), { type: "hidden", name, value })));
}

function selectItem(tree, item, { toggle = false, range = false } = {}) {
  const mode = modeOf(tree);
  if (mode === "none" || isDisabled(item)) return;
  if (mode === "multiple") {
    if (range && tree._dsAnchor) {
      const list = visibleItems(tree).filter((i) => !isDisabled(i));
      const a = list.indexOf(tree._dsAnchor);
      const b = list.indexOf(item);
      if (a >= 0 && b >= 0) list.slice(Math.min(a, b), Math.max(a, b) + 1).forEach((i) => i.setAttribute("aria-selected", "true"));
    } else if (toggle) {
      item.setAttribute("aria-selected", String(item.getAttribute("aria-selected") !== "true"));
      tree._dsAnchor = item;
    } else {
      tree.querySelectorAll(ITEM).forEach((i) => i.setAttribute("aria-selected", String(i === item)));
      tree._dsAnchor = item;
    }
  } else {
    tree.querySelectorAll(ITEM).forEach((i) => i.setAttribute("aria-selected", String(i === item)));
    tree._dsAnchor = item;
  }
  syncInputs(tree);
  const items = selectedItems(tree);
  fire(tree, "select", { item, items, values: items.map((i) => i.getAttribute("data-value") ?? labelOf(i)) });
  if (mode === "single") say(tree, t("tree.selected", { name: labelOf(item) }));
}

/* ------------------------------------------------------------------ expand, collapse, lazy load */
export function setExpanded(item, open, { announce = true } = {}) {
  const tree = treeOf(item);
  if (!tree || !isParent(item) || isDisabled(item) || item.getAttribute("aria-busy") === "true") return;
  if (open === isOpen(item)) return;
  if (open && needsLoad(item)) { startLoad(tree, item); return; }
  if (!open) {
    const active = document.activeElement;
    if (active && item !== active && item.contains(active)) focusItem(tree, item);
  }
  item.setAttribute("aria-expanded", String(open));
  initRovingKeep(tree);
  fire(tree, "toggle", { item, expanded: open });
  if (announce) say(tree, t(open ? "tree.expanded" : "tree.collapsed", { name: labelOf(item) }));
}

function initRovingKeep(tree) {
  // Keep exactly one tab stop and never inside a closed branch.
  const current = tree.querySelector(`${ITEM}[tabindex="0"]`);
  const visible = visibleItems(tree);
  if (!current || !visible.includes(current)) initRoving(tree);
}

const needsLoad = (item) => item.hasAttribute("data-ds-tree-src") && !item.hasAttribute("data-ds-loaded");

function startLoad(tree, item) {
  item.setAttribute("aria-busy", "true");
  item.removeAttribute("data-state");
  const src = item.getAttribute("data-ds-tree-src");
  say(tree, t("tree.loading", { name: labelOf(item) }));
  const event = fire(tree, "load", { item, src, load: (nodes) => load(item, nodes), fail: () => fail(item) }, true);
  if (event.defaultPrevented) return; // the app loads the children itself (DS.tree.load / DS.tree.fail)
  const delay = Number(item.getAttribute("data-ds-tree-delay") || 0);
  const run = async () => {
    try {
      let markup;
      if (src.startsWith("#")) {
        const template = document.getElementById(src.slice(1));
        if (!(template instanceof HTMLTemplateElement)) throw new Error("template not found");
        markup = template.innerHTML;
      } else {
        const response = await fetch(src, { headers: { Accept: "text/html" }, credentials: "same-origin" });
        if (!response.ok) throw new Error(String(response.status));
        markup = await response.text();
      }
      const holder = document.createElement("template");
      holder.innerHTML = markup; // first-party server markup, parsed inert
      load(item, holder.content);
    } catch { fail(item); }
  };
  window.setTimeout(run, delay);
}

/** Give a lazy item its children: a DocumentFragment, an element, or an array of <li role="treeitem"> nodes. */
export function load(item, nodes) {
  const tree = treeOf(item);
  if (!tree) return;
  let group = groupOf(item);
  if (!group) {
    group = document.createElement("ul");
    group.className = "ds-tree__group";
    group.setAttribute("role", "group");
    item.append(group);
  }
  const list = nodes instanceof DocumentFragment ? [...nodes.children] : Array.isArray(nodes) ? nodes : [nodes];
  let items = list.flatMap((n) => (n instanceof Element && n.matches(ITEM) ? [n] : n instanceof Element && n.matches("ul") ? [...n.children] : []));
  if (!items.length && list.length === 1 && list[0] instanceof Element) items = [...list[0].querySelectorAll(`:scope > ${ITEM}`)];
  group.replaceChildren(...items);
  item.setAttribute("data-ds-loaded", "");
  item.removeAttribute("aria-busy");
  item.removeAttribute("data-state");
  buildItems(tree, group);
  buildItems(tree, item.parentElement); // refreshes aria-setsize of the siblings
  if (checkable(tree) && item.getAttribute("aria-checked") === "true") group.querySelectorAll(ITEM).forEach((i) => i.setAttribute("aria-checked", "true"));
  if (checkable(tree)) initChecks(tree);
  const meta = rowOf(item)?.querySelector(".ds-tree__meta[data-ds-retry]");
  meta?.remove();
  if (!items.length) {
    const note = document.createElement("li");
    note.className = "ds-tree__note";
    note.setAttribute("role", "none");
    note.textContent = t("tree.empty", { name: labelOf(item) });
    group.append(note);
  }
  item.setAttribute("aria-expanded", "true");
  fire(tree, "loaded", { item, count: items.length });
  say(tree, items.length ? t("tree.loaded", { count: items.length, name: labelOf(item) }) : t("tree.empty", { name: labelOf(item) }));
}

/** The load failed: the item stays closed, shows "Retry" and can be opened again. */
export function fail(item) {
  const tree = treeOf(item);
  if (!tree) return;
  item.removeAttribute("aria-busy");
  item.setAttribute("aria-expanded", "false");
  item.setAttribute("data-state", "error");
  const row = rowOf(item);
  if (row && !row.querySelector(".ds-tree__meta[data-ds-retry]")) {
    const meta = document.createElement("span");
    meta.className = "ds-tree__meta";
    meta.setAttribute("data-ds-retry", "");
    meta.textContent = t("tree.retry");
    row.append(meta);
  }
  fire(tree, "error", { item });
  say(tree, t("tree.failed", { name: labelOf(item) }));
}

function expandAll(tree, open = true) {
  [...tree.querySelectorAll(`${ITEM}[aria-expanded]`)].forEach((i) => { if (!needsLoad(i) || !open) setExpanded(i, open, { announce: false }); });
}

/* ------------------------------------------------------------------ events */
function wireTree(tree) {
  if (tree._dsTree) return;
  tree._dsTree = true;
  tree.setAttribute("role", "tree");
  if (modeOf(tree) === "multiple") tree.setAttribute("aria-multiselectable", "true");
  buildItems(tree, tree);
  if (checkable(tree)) initChecks(tree);
  initRoving(tree);
  syncInputs(tree);
  tree._dsAnchor = selectedItems(tree)[0] ?? null;

  tree.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const row = target?.closest(".ds-tree__row");
    if (!row || !tree.contains(row)) return;
    const item = row.closest(ITEM);
    if (!item || isDisabled(item)) return;
    focusItem(tree, item);
    if (target.closest(".ds-tree__toggle")) { if (isParent(item)) setExpanded(item, !isOpen(item)); return; }
    if (checkable(tree) && target.closest(".ds-tree__check")) { toggleCheck(tree, item); return; }
    if (target.closest("a") && !event.defaultPrevented) { selectItem(tree, item); fire(tree, "activate", { item }); return; }
    if (item.getAttribute("data-state") === "error") { setExpanded(item, true); return; }
    if (modeOf(tree) === "none" && !checkable(tree)) {
      if (isParent(item)) setExpanded(item, !isOpen(item));
      fire(tree, "activate", { item });
      return;
    }
    if (checkable(tree)) { toggleCheck(tree, item); return; }
    selectItem(tree, item, { toggle: event.ctrlKey || event.metaKey, range: event.shiftKey });
    fire(tree, "activate", { item });
  });

  tree.addEventListener("dblclick", (event) => {
    const item = event.target instanceof Element ? event.target.closest(".ds-tree__row")?.closest(ITEM) : null;
    if (item && isParent(item) && !event.target.closest(".ds-tree__toggle, .ds-tree__check")) setExpanded(item, !isOpen(item));
  });

  tree.addEventListener("keydown", (event) => {
    const item = event.target instanceof Element && event.target.matches(ITEM) ? event.target : null;
    if (!item || event.altKey) return;
    const items = visibleItems(tree).filter((i) => !isDisabled(i));
    const index = items.indexOf(item);
    const rtl = isRtl(tree);
    const open = rtl ? "ArrowLeft" : "ArrowRight";
    const close = rtl ? "ArrowRight" : "ArrowLeft";
    const go = (next) => { if (next) { event.preventDefault(); focusItem(tree, next); } };
    switch (event.key) {
      case "ArrowDown": go(items[index + 1]); return;
      case "ArrowUp": go(items[index - 1]); return;
      case "Home": go(items[0]); return;
      case "End": go(items.at(-1)); return;
      case open:
        event.preventDefault();
        if (isParent(item) && !isOpen(item)) setExpanded(item, true);
        else if (isParent(item) && isOpen(item)) go(childItems(item).find((i) => !isDisabled(i)));
        return;
      case close:
        event.preventDefault();
        if (isParent(item) && isOpen(item)) setExpanded(item, false);
        else go(parentItem(item));
        return;
      case "*": {
        event.preventDefault();
        const siblings = [...(item.parentElement?.querySelectorAll(`:scope > ${ITEM}[aria-expanded="false"]`) ?? [])];
        siblings.forEach((s) => setExpanded(s, true, { announce: false }));
        return;
      }
      case "Enter": {
        event.preventDefault();
        const link = rowOf(item)?.querySelector("a[href]");
        if (item.getAttribute("data-state") === "error") { setExpanded(item, true); return; }
        if (link) { link.click(); return; }
        if (modeOf(tree) === "none" && !checkable(tree)) { if (isParent(item)) setExpanded(item, !isOpen(item)); }
        else if (checkable(tree)) toggleCheck(tree, item);
        else selectItem(tree, item);
        fire(tree, "activate", { item });
        return;
      }
      case " ":
        event.preventDefault();
        if (checkable(tree)) toggleCheck(tree, item);
        else if (modeOf(tree) === "multiple") selectItem(tree, item, { toggle: true });
        else selectItem(tree, item);
        return;
      default:
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a" && modeOf(tree) === "multiple") {
      event.preventDefault();
      items.forEach((i) => i.setAttribute("aria-selected", "true"));
      syncInputs(tree);
      const all = selectedItems(tree);
      fire(tree, "select", { item, items: all, values: all.map((i) => i.getAttribute("data-value") ?? labelOf(i)) });
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      window.clearTimeout(tree._dsTypeTimer);
      tree._dsType = (tree._dsType ?? "") + normalize(event.key);
      tree._dsTypeTimer = window.setTimeout(() => { tree._dsType = ""; }, 600);
      const pool = tree._dsType.length === 1 ? [...items.slice(index + 1), ...items.slice(0, index + 1)] : items;
      go(pool.find((i) => normalize(labelOf(i)).startsWith(tree._dsType)));
    }
  });

  tree.addEventListener("focusin", (event) => {
    const item = event.target instanceof Element && event.target.matches(ITEM) ? event.target : null;
    if (!item) return;
    tree.querySelectorAll(`${ITEM}[tabindex="0"]`).forEach((i) => { if (i !== item) i.setAttribute("tabindex", "-1"); });
    item.setAttribute("tabindex", "0");
  });
}

export function wire() {}

export function init(root) {
  root.querySelectorAll("[data-ds-tree]").forEach(wireTree);
}

export const api = {
  tree: {
    load,
    fail,
    setExpanded,
    expandAll: (tree) => expandAll(tree, true),
    collapseAll: (tree) => expandAll(tree, false),
  },
};
