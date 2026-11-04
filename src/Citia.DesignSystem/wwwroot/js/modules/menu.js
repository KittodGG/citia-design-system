/* Dropdown menu and menubar (WAI-ARIA menu button, menu, menubar). Owner: batch A9.
   Markup: <button aria-haspopup="menu" popovertarget="id"> + <div id="id" popover class="ds-menu" role="menu">
     items: [role=menuitem | menuitemcheckbox | menuitemradio].ds-menu__item, groups [role=group], labels .ds-menu__label,
     separators [role=separator]; submenu = item with aria-haspopup="menu" aria-controls="sub" next to
     <div id="sub" popover class="ds-menu" role="menu">, both inside <div class="ds-menu__sub" role="none">.
     Menubar: <div role="menubar" class="ds-menubar"> with [role=menuitem].ds-menubar__item triggers.
     Also positions v1 .ds-menu-panel[popover] next to its popovertarget trigger.
   Keyboard: trigger Enter/Space/ArrowDown open on the first item, ArrowUp on the last; in the menu ArrowUp/Down
     (loop), Home/End, typeahead, Enter/Space activate, ArrowRight/Left open/close submenus (and move along a menubar),
     Escape closes one level and returns focus, Tab closes and moves on.
   Pointer: highlight follows the pointer; submenus open after 100 ms with a pointer-intent triangle so a diagonal move
     towards the submenu does not close it. Checkbox and radio items keep the menu open (data-ds-close="true" closes).
   API: DS.menu.open(idOrEl, anchor, { focus: "first"|"last"|"menu" }), DS.menu.close(idOrEl), DS.menu.closeAll().
   Events (bubble): ds:menu:open, ds:menu:close (on the menu), ds:menu:select (on the item, cancelable;
     detail { value, checked, context }). Preventing ds:menu:select keeps the menu open. */
import { focusQuietly, normalize, icon } from "../core.js";
import { showAt, untrack, optionsFor } from "./popover.js";

const MENU = ".ds-menu[popover], .ds-menu-panel[popover]";
const ITEM = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

const resolve = (target) => (typeof target === "string" ? document.getElementById(target) : target);
const isOpen = (el) => { try { return el.matches(":popover-open"); } catch { return false; } };
const disabled = (el) => el.disabled || el.getAttribute("aria-disabled") === "true";
const rtl = (el) => getComputedStyle(el).direction === "rtl";
const emit = (el, name, detail, cancelable = false) => el.dispatchEvent(new CustomEvent(`ds:menu:${name}`, { bubbles: true, cancelable, detail }));

/** Items that belong to this menu (not to its submenus), in order. */
export function itemsOf(menu) {
  return [...menu.querySelectorAll(ITEM)].filter((el) => el.closest('[role="menu"], .ds-menu, .ds-menu-panel') === menu && el.getClientRects().length > 0);
}

const submenuOf = (item) => (item?.getAttribute("aria-haspopup") === "menu" ? document.getElementById(item.getAttribute("aria-controls") || item.getAttribute("data-ds-submenu") || "") : null);
const parentMenuOf = (el) => el.parentElement?.closest(MENU) ?? null;
const rootOf = (menu) => { let m = menu; while (m?._dsParentItem) m = parentMenuOf(m._dsParentItem); return m; };
const menubarOf = (menu) => { const trigger = rootOf(menu)?._dsTrigger; return trigger instanceof Element ? trigger.closest('[role="menubar"]') : null; };

function highlight(menu, item) {
  if (!item) { if (menu.contains(document.activeElement) && document.activeElement !== menu) focusQuietly(menu); return; }
  focusQuietly(item);
  item.scrollIntoView?.({ block: "nearest" });
}

/* ------------------------------------------------------------------ open / close */
/**
 * Open a menu next to an anchor (element or { getBoundingClientRect }). focus: "first" | "last" | "menu" | null.
 * Submenus: pass the parent item as anchor; side defaults to the inline end.
 */
export function openMenu(target, anchor, { focus = "menu", side, align, gap, trigger, context } = {}) {
  const menu = resolve(target);
  if (!menu) return null;
  prepare(menu);
  const parentItem = anchor instanceof Element && anchor.matches(ITEM) && anchor.closest(MENU) ? anchor : null;
  menu._dsParentItem = parentItem;
  if (!parentItem) menu._dsTrigger = trigger ?? anchor;
  if (context !== undefined) menu._dsContext = context;
  const options = optionsFor(menu, parentItem ? { side: rtl(anchor) ? "left" : "right", align: "start", gap: 2 } : { side: "bottom", align: "start" });
  if (side) options.side = side;
  if (align) options.align = align;
  if (gap !== undefined) options.gap = gap;
  if (anchor instanceof Element && !parentItem) menu.style.setProperty("--ds-trigger-width", `${anchor.getBoundingClientRect().width}px`);
  const opening = !isOpen(menu);
  showAt(menu, anchor, options);
  if (parentItem) {
    parentItem.setAttribute("aria-expanded", "true");
    // Pull the submenu up by the menu padding so its first item lines up with the parent item.
    const shift = parseFloat(getComputedStyle(menu).paddingTop) + parseFloat(getComputedStyle(menu).borderTopWidth);
    if (menu.dataset.side === "right" || menu.dataset.side === "left") menu.style.top = `${Math.max(8, parseFloat(menu.style.top) - shift)}px`;
  } else if (anchor instanceof Element && anchor.hasAttribute("aria-haspopup")) anchor.setAttribute("aria-expanded", "true");
  const items = itemsOf(menu);
  if (focus === "first") highlight(menu, items.find((el) => !disabled(el)) ?? items[0]);
  else if (focus === "last") highlight(menu, [...items].reverse().find((el) => !disabled(el)) ?? items.at(-1));
  else if (focus === "menu") focusQuietly(menu);
  if (opening) emit(menu, "open");
  return menu;
}

/** Close one menu (its submenus close with it). returnFocus: move focus back to the trigger or parent item. */
export function closeMenu(target, { returnFocus = true } = {}) {
  const menu = resolve(target);
  if (!menu || !isOpen(menu)) return;
  const back = menu._dsParentItem ?? menu._dsTrigger;
  menu.hidePopover();
  if (returnFocus && back instanceof Element) focusQuietly(back);
}

export function closeAll({ returnFocus = false } = {}) {
  document.querySelectorAll(MENU).forEach((menu) => { if (isOpen(menu) && !menu._dsParentItem) closeMenu(menu, { returnFocus }); });
}

/* ------------------------------------------------------------------ activation */
function activate(item, { keyboard = false } = {}) {
  if (disabled(item)) return;
  const sub = submenuOf(item);
  if (sub) { openMenu(sub, item, { focus: keyboard ? "first" : "menu" }); if (!keyboard) focusQuietly(item); return; }
  const role = item.getAttribute("role");
  let checked;
  if (role === "menuitemcheckbox") {
    checked = item.getAttribute("aria-checked") !== "true";
    item.setAttribute("aria-checked", String(checked));
  } else if (role === "menuitemradio") {
    const scope = item.closest('[role="group"]') ?? item.closest(MENU);
    scope?.querySelectorAll('[role="menuitemradio"]').forEach((el) => { if (el.closest(MENU) === item.closest(MENU)) el.setAttribute("aria-checked", String(el === item)); });
    checked = true;
  }
  const menu = item.closest(MENU);
  const root = rootOf(menu);
  const proceed = emit(item, "select", { value: item.getAttribute("data-value") ?? item.textContent.trim(), checked, context: root?._dsContext ?? null }, true);
  const keepOpen = item.getAttribute("data-ds-close") === "false" || ((role === "menuitemcheckbox" || role === "menuitemradio") && item.getAttribute("data-ds-close") !== "true");
  if (!proceed || keepOpen) return;
  if (root) closeMenu(root, { returnFocus: true });
}

/* ------------------------------------------------------------------ setup */
const prepared = new WeakSet();
function prepare(menu) {
  if (prepared.has(menu)) return;
  prepared.add(menu);
  menu.setAttribute("data-ds-floating", "");
  if (menu.matches(".ds-menu") && !menu.hasAttribute("role")) menu.setAttribute("role", "menu");
  if (!menu.hasAttribute("tabindex")) menu.tabIndex = -1;
  menu.querySelectorAll(ITEM).forEach((item) => {
    item.tabIndex = -1;
    const role = item.getAttribute("role");
    if ((role === "menuitemcheckbox" || role === "menuitemradio") && !item.querySelector(":scope > .ds-menu__indicator")) {
      const indicator = document.createElement("span");
      indicator.className = "ds-menu__indicator";
      indicator.setAttribute("aria-hidden", "true");
      indicator.insertAdjacentHTML("afterbegin", icon("check", "")); // static markup from core.icon
      item.prepend(indicator);
    }
    if ((role === "menuitemcheckbox" || role === "menuitemradio") && !item.hasAttribute("aria-checked")) item.setAttribute("aria-checked", "false");
    if (item.getAttribute("aria-haspopup") === "menu" && !item.hasAttribute("aria-expanded")) item.setAttribute("aria-expanded", "false");
  });
}

/* ------------------------------------------------------------------ typeahead */
let typed = "";
let typedTimer = 0;
function typeahead(menu, key) {
  window.clearTimeout(typedTimer);
  typedTimer = window.setTimeout(() => { typed = ""; }, 500);
  typed += normalize(key);
  const items = itemsOf(menu);
  const current = items.indexOf(document.activeElement);
  const same = typed.length > 1 && [...typed].every((c) => c === typed[0]);
  const query = same ? typed[0] : typed;
  const ordered = [...items.slice(current + 1), ...items.slice(0, current + 1)];
  const label = (el) => normalize(el.querySelector(".ds-menu__text, span:not([class])")?.textContent ?? el.textContent);
  const match = (same || typed.length === 1 ? ordered : [...items.slice(current), ...items.slice(0, current)]).find((el) => label(el).startsWith(query));
  if (match) highlight(menu, match);
}

/* ------------------------------------------------------------------ menubar */
function menubarItems(bar) {
  return [...bar.querySelectorAll('[role="menuitem"], .ds-menubar__item')].filter((el) => el.closest('[role="menubar"]') === bar);
}

function menuForTrigger(trigger) {
  return document.getElementById(trigger.getAttribute("popovertarget") || trigger.getAttribute("aria-controls") || trigger.getAttribute("data-ds-menu-open") || "");
}

function moveInMenubar(bar, from, step, openIt) {
  const list = menubarItems(bar).filter((el) => !disabled(el));
  if (!list.length) return;
  const index = list.indexOf(from);
  const next = list[(index + step + list.length) % list.length];
  list.forEach((el) => { el.tabIndex = el === next ? 0 : -1; });
  const current = menuForTrigger(from);
  if (current && isOpen(current)) closeMenu(current, { returnFocus: false });
  focusQuietly(next);
  const menu = menuForTrigger(next);
  if (openIt && menu) openMenu(menu, next, { focus: "first" });
}

/* ------------------------------------------------------------------ pointer intent (submenus) */
let intent = null; // { menu (parent), sub, point, until }
let hoverTimer = 0;
const sign = (p1, p2, p3) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
function inTriangle(p, a, b, c) {
  const d1 = sign(p, a, b);
  const d2 = sign(p, b, c);
  const d3 = sign(p, c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
}
function headingToSubmenu(event) {
  if (!intent || performance.now() > intent.until || !isOpen(intent.sub)) return false;
  const r = intent.sub.getBoundingClientRect();
  const nearX = intent.sub.dataset.side === "left" ? r.right : r.left;
  return inTriangle({ x: event.clientX, y: event.clientY }, intent.point, { x: nearX, y: r.top - 8 }, { x: nearX, y: r.bottom + 8 });
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  // Triggers: popovertarget / data-ds-menu-open. Taken over so placement and focus happen in one step.
  let wasOpen = null;
  document.addEventListener("pointerdown", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest("[popovertarget], [data-ds-menu-open]") : null;
    const menu = trigger && menuForTrigger(trigger);
    wasOpen = menu?.matches(MENU) ? { trigger, open: isOpen(menu) } : null;
  }, true);

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const trigger = target.closest("[popovertarget], [data-ds-menu-open]");
    const menuOfTrigger = trigger && !trigger.closest(MENU) ? menuForTrigger(trigger) : null;
    if (menuOfTrigger?.matches(MENU)) {
      event.preventDefault();
      if (disabled(trigger)) return;
      const opened = wasOpen?.trigger === trigger ? wasOpen.open : isOpen(menuOfTrigger);
      wasOpen = null;
      if (opened) closeMenu(menuOfTrigger, { returnFocus: event.detail === 0 });
      else openMenu(menuOfTrigger, trigger, { focus: event.detail === 0 ? "first" : "menu" });
      return;
    }
    const item = target.closest(ITEM);
    const menu = item?.closest(MENU);
    if (!item || !menu) {
      // v1 panels: any link or button inside closes the panel after it acts.
      const panelItem = target.closest(".ds-menu-panel[popover] :is(a[href], button)");
      if (panelItem && !panelItem.hasAttribute("data-ds-confirm") && !disabled(panelItem)) panelItem.closest(".ds-menu-panel").hidePopover();
      return;
    }
    if (disabled(item)) { event.preventDefault(); return; }
    activate(item, { keyboard: event.detail === 0 });
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const forward = (el) => (rtl(el) ? "ArrowLeft" : "ArrowRight");
    const back = (el) => (rtl(el) ? "ArrowRight" : "ArrowLeft");

    // Menubar items.
    const bar = target.closest('[role="menubar"]');
    if (bar && target.matches('[role="menuitem"], .ds-menubar__item') && target.closest('[role="menubar"]') === bar && !target.closest(MENU)) {
      const anyOpen = menubarItems(bar).some((el) => { const m = menuForTrigger(el); return m && isOpen(m); });
      if (event.key === forward(bar)) { event.preventDefault(); moveInMenubar(bar, target, 1, anyOpen); return; }
      if (event.key === back(bar)) { event.preventDefault(); moveInMenubar(bar, target, -1, anyOpen); return; }
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const list = menubarItems(bar).filter((el) => !disabled(el));
        moveInMenubar(bar, target, event.key === "Home" ? list.indexOf(list[0]) - list.indexOf(target) : list.length - 1 - list.indexOf(target), false);
        return;
      }
      const menu = menuForTrigger(target);
      if (menu && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) { event.preventDefault(); openMenu(menu, target, { focus: "first" }); return; }
      if (menu && event.key === "ArrowUp") { event.preventDefault(); openMenu(menu, target, { focus: "last" }); return; }
      return;
    }

    // Menu buttons.
    const trigger = target.closest('[aria-haspopup="menu"]');
    if (trigger && !trigger.closest(MENU) && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      const menu = menuForTrigger(trigger);
      if (!menu?.matches(MENU) || disabled(trigger)) return;
      event.preventDefault();
      openMenu(menu, trigger, { focus: event.key === "ArrowDown" ? "first" : "last" });
      return;
    }

    // Inside a menu.
    const menu = target.closest(MENU);
    if (!menu || !menu.matches(".ds-menu")) return;
    const items = itemsOf(menu);
    const current = items.indexOf(document.activeElement);
    const item = current >= 0 ? items[current] : null;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!items.length) return;
        const step = event.key === "ArrowDown" ? 1 : -1;
        const start = current < 0 ? (step === 1 ? -1 : items.length) : current;
        highlight(menu, items[(start + step + items.length) % items.length]);
        return;
      }
      case "Home":
      case "End":
        event.preventDefault();
        highlight(menu, event.key === "Home" ? items[0] : items.at(-1));
        return;
      case "Enter":
      case " ":
        if (!item) return;
        event.preventDefault();
        if (disabled(item)) return;
        if (item.matches("a[href]") && event.key === "Enter" && !submenuOf(item)) { item.click(); return; }
        activate(item, { keyboard: true });
        return;
      case "Escape": {
        event.preventDefault();
        closeMenu(menu, { returnFocus: true });
        return;
      }
      case "Tab":
        closeAll({ returnFocus: false });
        { const root = rootOf(menu); const back2 = root?._dsTrigger; if (back2 instanceof Element) focusQuietly(back2); }
        return;
      default:
        break;
    }
    if (event.key === forward(menu)) {
      const sub = submenuOf(item);
      if (sub && !disabled(item)) { event.preventDefault(); openMenu(sub, item, { focus: "first" }); return; }
      const menubar = menubarOf(menu);
      if (menubar) { event.preventDefault(); const root = rootOf(menu); closeMenu(root, { returnFocus: false }); moveInMenubar(menubar, root._dsTrigger, 1, true); }
      return;
    }
    if (event.key === back(menu)) {
      if (menu._dsParentItem) { event.preventDefault(); closeMenu(menu, { returnFocus: true }); return; }
      const menubar = menubarOf(menu);
      if (menubar) { event.preventDefault(); closeMenu(menu, { returnFocus: false }); moveInMenubar(menubar, menu._dsTrigger, -1, true); }
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== " ") typeahead(menu, event.key);
  });

  // Highlight follows the pointer; submenus open on hover intent.
  document.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const target = event.target instanceof Element ? event.target : null;
    const menu = target?.closest(".ds-menu[popover]");
    // Menubar: when one menu is open, hovering another bar item switches to it.
    const barItem = target?.closest(".ds-menubar__item, [role='menubar'] > [role='menuitem']");
    if (barItem && !disabled(barItem)) {
      const bar = barItem.closest('[role="menubar"]');
      const openOne = menubarItems(bar).find((el) => el !== barItem && menuForTrigger(el) && isOpen(menuForTrigger(el)));
      if (openOne) { closeMenu(menuForTrigger(openOne), { returnFocus: false }); menubarItems(bar).forEach((el) => { el.tabIndex = el === barItem ? 0 : -1; }); openMenu(menuForTrigger(barItem), barItem, { focus: "menu" }); }
      return;
    }
    if (!menu) return;
    const item = target.closest(ITEM);
    const owner = item?.closest(MENU);
    if (owner !== menu) return;
    if (intent && intent.menu === menu && item !== intent.item && headingToSubmenu(event)) return;
    window.clearTimeout(hoverTimer);
    // Leaving an open submenu's trigger for another item closes that submenu.
    itemsOf(menu).forEach((other) => { const sub = submenuOf(other); if (other !== item && sub && isOpen(sub)) closeMenu(sub, { returnFocus: false }); });
    if (!item) { if (document.activeElement !== menu && !menu.querySelector(".ds-menu[popover]:popover-open")) focusQuietly(menu); return; }
    if (document.activeElement !== item) focusQuietly(item);
    const sub = submenuOf(item);
    if (sub && !disabled(item) && !isOpen(sub)) hoverTimer = window.setTimeout(() => { openMenu(sub, item, { focus: null }); }, 100);
  });

  document.addEventListener("pointerout", (event) => {
    const item = event.target instanceof Element ? event.target.closest(ITEM) : null;
    if (!item || item.contains(event.relatedTarget)) return;
    const sub = submenuOf(item);
    if (sub && isOpen(sub)) {
      intent = { menu: item.closest(MENU), item, sub, point: { x: event.clientX, y: event.clientY }, until: performance.now() + 400 };
      return;
    }
    const menu = item.closest(".ds-menu[popover]");
    if (menu && !menu.contains(event.relatedTarget) && document.activeElement === item) focusQuietly(menu);
  });

  // Close bookkeeping (light dismiss, Escape, script).
  document.addEventListener("toggle", (event) => {
    const menu = event.target;
    if (!(menu instanceof HTMLElement) || !menu.matches(MENU) || event.newState !== "closed") return;
    untrack(menu);
    const back = menu._dsParentItem ?? menu._dsTrigger;
    if (back instanceof Element && back.getAttribute("aria-expanded") === "true") back.setAttribute("aria-expanded", "false");
    if (intent?.sub === menu) intent = null;
    const active = document.activeElement;
    if (!menu._dsParentItem && back instanceof Element && (!active || active === document.body)) focusQuietly(back);
    menu.style.maxHeight = "";
    emit(menu, "close");
  }, true);
}

export function init(root) {
  root.querySelectorAll?.(".ds-menu[popover]").forEach(prepare);
  root.querySelectorAll?.('[aria-haspopup="menu"]').forEach((trigger) => {
    if (trigger.closest(MENU)) return;
    if (!trigger.hasAttribute("aria-expanded")) trigger.setAttribute("aria-expanded", "false");
    const menu = menuForTrigger(trigger);
    if (menu && !trigger.hasAttribute("aria-controls")) trigger.setAttribute("aria-controls", menu.id);
  });
  root.querySelectorAll?.('[role="menubar"]').forEach((bar) => {
    if (bar._dsReady) return;
    bar._dsReady = true;
    const list = menubarItems(bar);
    const first = list.find((el) => !disabled(el)) ?? list[0];
    list.forEach((el) => { el.tabIndex = el === first ? 0 : -1; });
  });
}

export const api = {
  menu: {
    open: (target, anchor, options) => {
      const menu = resolve(target);
      if (!menu) return null;
      const trigger = anchor ?? document.querySelector(`[popovertarget="${CSS.escape(menu.id)}"], [data-ds-menu-open="${CSS.escape(menu.id)}"]`);
      return openMenu(menu, trigger ?? { getBoundingClientRect: () => new DOMRect(window.innerWidth / 2, window.innerHeight / 3, 0, 0) }, { focus: "first", ...options });
    },
    close: (target) => closeMenu(target),
    closeAll: () => closeAll({ returnFocus: true }),
  },
};
