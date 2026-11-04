/* Context menu: a .ds-menu[popover] opened at the pointer by right click, at the focused element by Shift+F10 or the
   ContextMenu key, and by a 500 ms long-press on touch (the region tints after 150 ms so the press is felt).
   Owner: batch A9. Markup: <div data-ds-context-menu="menu-id" tabindex="0"> … </div> + the menu (same anatomy as the
   dropdown menu). The element that was pressed ([data-ds-context-item] inside the region, else the region) travels
   as detail.context on ds:menu:select. data-ds-context-native="shift" lets Shift+right click show the browser menu.
   Events (bubble): ds:context-menu:open (on the region, detail { context }). */
import { openMenu } from "./menu.js";

const LONG_PRESS = 500;
const MOVE_TOLERANCE = 10;
let keyboardAt = 0;
let pressOpenedAt = 0;

const pointRect = (x, y) => ({ getBoundingClientRect: () => new DOMRect(x, y, 0, 0) });

function show(region, { x, y, keyboard, source }) {
  const menu = document.getElementById(region.getAttribute("data-ds-context-menu"));
  if (!menu) return;
  const context = source?.closest?.("[data-ds-context-item]") ?? region;
  const focused = document.activeElement instanceof Element && region.contains(document.activeElement) ? document.activeElement : region;
  const anchor = keyboard ? focused : pointRect(x, y);
  openMenu(menu, anchor, { focus: keyboard ? "first" : "menu", side: "bottom", align: "start", gap: keyboard ? 4 : 2, trigger: focused, context });
  region.dispatchEvent(new CustomEvent("ds:context-menu:open", { bubbles: true, detail: { context } }));
}

export function wire() {
  document.addEventListener("keydown", (event) => {
    if ((event.key === "F10" && event.shiftKey) || event.key === "ContextMenu") keyboardAt = performance.now();
  }, true);

  document.addEventListener("contextmenu", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const region = target?.closest("[data-ds-context-menu]");
    if (!region) return;
    if (event.shiftKey && region.getAttribute("data-ds-context-native") === "shift") return;
    event.preventDefault();
    if (performance.now() - pressOpenedAt < 800) return; // Android also fires contextmenu after a long-press
    const keyboard = performance.now() - keyboardAt < 300 || (event.clientX === 0 && event.clientY === 0);
    show(region, { x: event.clientX, y: event.clientY, keyboard, source: target });
  });

  // Long-press on touch (iOS never fires contextmenu).
  let press = null;
  const cancel = () => {
    if (!press) return;
    window.clearTimeout(press.timer);
    window.clearTimeout(press.tint);
    press.region.removeAttribute("data-ds-pressing");
    press = null;
  };
  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;
    const target = event.target instanceof Element ? event.target : null;
    const region = target?.closest("[data-ds-context-menu]");
    if (!region) return;
    cancel();
    const { clientX: x, clientY: y } = event;
    press = {
      region,
      x,
      y,
      tint: window.setTimeout(() => region.setAttribute("data-ds-pressing", ""), 150),
      timer: window.setTimeout(() => {
        region.removeAttribute("data-ds-pressing");
        pressOpenedAt = performance.now();
        press = null;
        navigator.vibrate?.(8);
        show(region, { x, y, keyboard: false, source: target });
      }, LONG_PRESS),
    };
  }, { passive: true });
  document.addEventListener("pointermove", (event) => {
    if (press && Math.hypot(event.clientX - press.x, event.clientY - press.y) > MOVE_TOLERANCE) cancel();
  }, { passive: true });
  document.addEventListener("pointerup", cancel, { passive: true });
  document.addEventListener("pointercancel", cancel, { passive: true });
  // The click that ends a long-press must not also activate what is under the finger.
  document.addEventListener("click", (event) => {
    if (performance.now() - pressOpenedAt < 800 && event.target instanceof Element && event.target.closest("[data-ds-context-menu]")) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}

export function init(root) {
  root.querySelectorAll?.("[data-ds-context-menu]").forEach((region) => {
    if (region._dsContextReady) return;
    region._dsContextReady = true;
    // Keyboard users need a focus stop to reach the menu with Shift+F10.
    if (!region.matches("a[href], button, input, select, textarea, [tabindex]") && !region.querySelector("a[href], button, input, select, textarea, [tabindex]")) region.tabIndex = 0;
  });
}

export const api = {
  contextMenu: {
    /** Open a context menu programmatically at a point, e.g. from a custom gesture. */
    open(regionOrId, x, y) {
      const region = typeof regionOrId === "string" ? document.querySelector(`[data-ds-context-menu="${CSS.escape(regionOrId)}"]`) : regionOrId;
      if (region) show(region, { x, y, keyboard: x == null, source: region });
    },
  },
};
