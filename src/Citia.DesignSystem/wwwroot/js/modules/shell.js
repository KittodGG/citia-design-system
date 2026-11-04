/* App shell behaviours: sidebar collapse (desktop rail), collapsible nav groups, sidebar scroll memory, off-canvas drawer
   (mobile) with focus trap, rail tooltips, scroll-edge hairline on the top bar, compact sticky page header, ARIA toolbar
   (roving focus + overflow menu), back button, <details data-ds-menu> menus.
   Hooks: [data-ds-sidebar-collapse], [data-ds-nav-group][aria-controls] (+ data-ds-nav-active), [data-ds-nav-scroll],
   [data-ds-nav-toggle], [data-ds-nav-close], [data-ds-back="/fallback"], details[data-ds-menu], .ds-topbar,
   .ds-page-header.is-sticky, .ds-toolbar[role="toolbar"] (+ data-ds-toolbar-overflow).
   Events: ds:sidebar:toggle { collapsed }, ds:drawer:toggle { open }. Owner: batch A11 layout. */
import { html, store, key, focusQuietly, desktopQuery, t, addMessages, icon, rovingKeydown, placeFloating, uid } from "../core.js";

addMessages({
  en: {
    "shell.expand": "Expand sidebar",
    "shell.collapse": "Collapse sidebar",
    "shell.close": "Close navigation",
    "toolbar.more": "More actions",
  },
  id: {
    "shell.expand": "Perluas sidebar",
    "shell.collapse": "Ringkas sidebar",
    "shell.close": "Tutup navigasi",
    "toolbar.more": "Aksi lainnya",
  },
});

const isEmbedded = (shell) => shell?.classList.contains("is-embedded");

/** True when the desktop icon rail is active for this shell. */
function isCollapsed(shell) {
  if (!desktopQuery.matches) return false;
  if (isEmbedded(shell)) return shell.dataset.collapsed === "true";
  return html.getAttribute("data-ds-sidebar-collapsed") === "true";
}

export function setNavOpen(shell, open, { focus = true } = {}) {
  if (!shell) return;
  const toggle = shell.querySelector("[data-ds-nav-toggle]");
  const sidebar = shell.querySelector(".ds-sidebar");
  const main = shell.querySelector(".ds-shell-main");
  shell.toggleAttribute("data-nav-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  if (main) main.inert = open;
  if (sidebar) {
    if (open && !desktopQuery.matches) { sidebar.setAttribute("role", "dialog"); sidebar.setAttribute("aria-modal", "true"); }
    else { sidebar.removeAttribute("role"); sidebar.removeAttribute("aria-modal"); }
  }
  shell.dispatchEvent(new CustomEvent("ds:drawer:toggle", { bubbles: true, detail: { open } }));
  if (!focus) return;
  if (open) focusQuietly(sidebar?.querySelector("a[href], button:not([disabled])"));
  else focusQuietly(toggle);
}

function setPanel(button, open) {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  if (!panel) return;
  const modern = panel.classList.contains("ds-nav-panel");
  panel.inert = !open;
  // Modern panels are revealed by CSS (rows 0fr -> 1fr, interruptible); legacy lists toggle [hidden].
  if (modern) panel.toggleAttribute("data-open", open);
  else panel.hidden = !open;
}

function syncCollapsed() {
  document.querySelectorAll(".ds-shell").forEach((shell) => {
    const collapsed = isCollapsed(shell);
    shell.querySelectorAll("[data-ds-sidebar-collapse]").forEach((button) => {
      button.setAttribute("aria-expanded", String(!collapsed));
      const label = t(collapsed ? "shell.expand" : "shell.collapse");
      button.setAttribute("aria-label", label);
      button.title = label;
    });
    // In the icon rail every item stays reachable, so all group panels show.
    shell.querySelectorAll("[data-ds-nav-group]").forEach((button) => {
      const open = collapsed || button.getAttribute("aria-expanded") === "true";
      setPanel(button, open);
    });
  });
}

function readGroups() {
  try { return JSON.parse(store.get(key("nav-groups")) || "{}"); } catch { return {}; }
}

function toggleGroup(button, open = button.getAttribute("aria-expanded") !== "true") {
  button.setAttribute("aria-expanded", String(open));
  setPanel(button, open);
  const groups = readGroups();
  groups[button.getAttribute("data-ds-nav-group")] = open;
  store.set(key("nav-groups"), JSON.stringify(groups));
}

/* ------------------------------------------------------------ rail tooltip (one element, positioned beside the item) */
let tip = null;
let tipTimer = 0;

function tipEl() {
  if (tip) return tip;
  tip = document.createElement("div");
  tip.className = "ds-rail-tip";
  tip.id = uid("rail-tip");
  tip.setAttribute("role", "tooltip");
  document.body.append(tip);
  return tip;
}

function hideTip() {
  window.clearTimeout(tipTimer);
  tip?.removeAttribute("data-open");
}

function showTip(link, delay) {
  const shell = link.closest(".ds-shell");
  const label = link.getAttribute("aria-label") || link.textContent.trim();
  const span = link.querySelector(":scope > span:not([class])");
  const truncated = span ? span.scrollWidth > span.clientWidth : false;
  if (!label || !(isCollapsed(shell) || truncated)) return;
  window.clearTimeout(tipTimer);
  tipTimer = window.setTimeout(() => {
    const el = tipEl();
    el.textContent = label;
    const rect = link.getBoundingClientRect();
    const rtl = getComputedStyle(link).direction === "rtl";
    el.style.insetBlockStart = `${Math.round(rect.top + rect.height / 2 - el.offsetHeight / 2)}px`;
    el.style.insetInlineStart = "auto";
    if (rtl) { el.style.left = "auto"; el.style.right = `${Math.round(window.innerWidth - rect.left + 8)}px`; }
    else { el.style.right = "auto"; el.style.left = `${Math.round(rect.right + 8)}px`; }
    el.setAttribute("data-open", "");
  }, delay);
}

/* ------------------------------------------------------------ scroll edge (top bar hairline, compact sticky header) */
const scrollers = new WeakSet();

function scrollerOf(el) {
  const shell = el.closest(".ds-shell");
  return isEmbedded(shell) ? shell.querySelector(".ds-shell-main") : window;
}

function updateEdges(scroller) {
  const top = scroller === window ? window.scrollY : scroller.scrollTop;
  const shell = scroller === window ? document : scroller.closest(".ds-shell");
  shell.querySelectorAll(".ds-topbar").forEach((bar) => {
    if (scrollerOf(bar) !== scroller) return;
    bar.setAttribute("data-ds-edge", top > 1 ? "scrolled" : "top");
  });
  shell.querySelectorAll(".ds-page-header.is-sticky").forEach((header) => {
    if (scrollerOf(header) !== scroller) return;
    const offset = parseFloat(getComputedStyle(header).top) || 0;
    const base = scroller === window ? 0 : scroller.getBoundingClientRect().top;
    const stuck = top > 1 && header.getBoundingClientRect().top - base <= offset + 0.5;
    header.toggleAttribute("data-stuck", stuck);
  });
}

function watchScroll(el) {
  const scroller = scrollerOf(el);
  if (scrollers.has(scroller)) return updateEdges(scroller);
  scrollers.add(scroller);
  let frame = 0;
  scroller.addEventListener("scroll", () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; updateEdges(scroller); });
  }, { passive: true });
  updateEdges(scroller);
}

/* ------------------------------------------------------------ ARIA toolbar */
function toolbarItems(toolbar) {
  const sel = "button, a[href], [role='button'], [role='checkbox'], [role='radio'], input:not([type='hidden']), select, [tabindex]";
  return [...toolbar.querySelectorAll(sel)].filter((el) => !el.closest(".ds-toolbar__overflow") && !el.closest("[hidden]") && el.getClientRects().length > 0);
}

function setRoving(toolbar, active) {
  const items = toolbarItems(toolbar);
  const target = active && items.includes(active) ? active : items.find((el) => el.getAttribute("tabindex") === "0") || items[0];
  items.forEach((el) => el.setAttribute("tabindex", el === target ? "0" : "-1"));
}

function layoutOverflow(toolbar) {
  if (toolbar._dsBusy) return;
  toolbar._dsBusy = true;
  const menu = toolbar.querySelector(":scope > .ds-toolbar__overflow-menu");
  const panel = toolbar.querySelector(".ds-toolbar__overflow");
  const order = toolbar._dsOrder;
  if (menu && panel && order) {
    order.forEach((node) => toolbar.insertBefore(node, menu));
    menu.hidden = true;
    if (toolbar.scrollWidth > toolbar.clientWidth + 1) {
      menu.hidden = false;
      for (let i = order.length - 1; i >= 0 && toolbar.scrollWidth > toolbar.clientWidth + 1; i--) panel.prepend(order[i]);
    }
    if (!panel.children.length) menu.hidden = true;
  }
  setRoving(toolbar, toolbar.contains(document.activeElement) ? document.activeElement : null);
  toolbar._dsBusy = false;
}

function initToolbar(toolbar) {
  if (toolbar.dataset.dsReady) return;
  toolbar.dataset.dsReady = "true";
  if (toolbar.hasAttribute("data-ds-toolbar-overflow")) {
    let menu = toolbar.querySelector(":scope > .ds-toolbar__overflow-menu");
    if (!menu) {
      menu = document.createElement("div");
      menu.className = "ds-toolbar__overflow-menu";
      menu.hidden = true;
      const panelId = uid("toolbar-more");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ds-toolbar__item";
      button.setAttribute("popovertarget", panelId);
      button.setAttribute("aria-haspopup", "true");
      button.setAttribute("aria-label", t("toolbar.more"));
      button.insertAdjacentHTML("beforeend", icon("more").replace("></svg>", `><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>`));
      const panel = document.createElement("div");
      panel.className = "ds-toolbar__overflow";
      panel.id = panelId;
      panel.setAttribute("popover", "auto");
      menu.append(button, panel);
      toolbar.append(menu);
    }
    const button = menu.querySelector("[popovertarget]");
    const panel = menu.querySelector(".ds-toolbar__overflow");
    toolbar._dsOrder = [...toolbar.children].filter((node) => node !== menu && !node.classList.contains("ds-toolbar__spacer"));
    panel.addEventListener("toggle", (event) => {
      button.setAttribute("aria-expanded", String(event.newState === "open"));
      if (event.newState !== "open") return;
      placeFloating(panel, button, { side: toolbar.getAttribute("aria-orientation") === "vertical" ? "right" : "bottom", align: "end" });
      focusQuietly(panel.querySelector("button:not([disabled]), a[href]"));
    });
    panel.addEventListener("keydown", (event) => {
      rovingKeydown(event, [...panel.querySelectorAll("button, a[href]")], { orientation: "vertical" });
    });
    new ResizeObserver(() => layoutOverflow(toolbar)).observe(toolbar);
    layoutOverflow(toolbar);
  } else {
    setRoving(toolbar, null);
  }
  toolbar.addEventListener("focusin", (event) => {
    if (event.target instanceof HTMLElement && toolbarItems(toolbar).includes(event.target)) setRoving(toolbar, event.target);
  });
  toolbar.addEventListener("keydown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.closest(".ds-toolbar__overflow")) return;
    if (target.matches("input:not([type='checkbox'], [type='radio'], [type='button']), textarea, select")) return;
    const vertical = toolbar.getAttribute("aria-orientation") === "vertical";
    const rtl = getComputedStyle(toolbar).direction === "rtl";
    const flip = { ArrowLeft: "ArrowRight", ArrowRight: "ArrowLeft" };
    const proxy = !vertical && rtl && flip[event.key] ? { key: flip[event.key], preventDefault: () => event.preventDefault() } : event;
    rovingKeydown(proxy, toolbarItems(toolbar), { orientation: vertical ? "vertical" : "horizontal" });
  });
}

/* ------------------------------------------------------------ wiring */
export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const collapse = target.closest("[data-ds-sidebar-collapse]");
    if (collapse) {
      const shell = collapse.closest(".ds-shell");
      let next;
      if (isEmbedded(shell)) {
        next = shell.dataset.collapsed !== "true";
        shell.dataset.collapsed = String(next);
      } else {
        next = html.getAttribute("data-ds-sidebar-collapsed") !== "true";
        html.setAttribute("data-ds-sidebar-collapsed", String(next));
        store.set(key("sidebar-collapsed"), String(next));
      }
      hideTip();
      syncCollapsed();
      return shell?.dispatchEvent(new CustomEvent("ds:sidebar:toggle", { bubbles: true, detail: { collapsed: next } }));
    }
    const navToggle = target.closest("[data-ds-nav-toggle]");
    if (navToggle) { const shell = navToggle.closest(".ds-shell"); return setNavOpen(shell, !shell?.hasAttribute("data-nav-open")); }
    const navClose = target.closest("[data-ds-nav-close]");
    if (navClose) return setNavOpen(navClose.closest(".ds-shell"), false);
    const group = target.closest("[data-ds-nav-group]");
    if (group) return toggleGroup(group);
    // A link inside the open drawer leaves the drawer on the way to the next page.
    const link = target.closest(".ds-sidebar a[href]");
    if (link && !desktopQuery.matches) {
      const shell = link.closest(".ds-shell");
      if (shell?.hasAttribute("data-nav-open")) setNavOpen(shell, false, { focus: false });
    }
    const back = target.closest("[data-ds-back]");
    if (back) {
      event.preventDefault();
      let sameOrigin = false;
      try { sameOrigin = Boolean(document.referrer) && new URL(document.referrer).origin === location.origin; } catch { /* invalid referrer */ }
      if (sameOrigin && history.length > 1) history.back();
      else location.assign(back.getAttribute("data-ds-back") || "/");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideTip();
      if (document.querySelector("dialog[open]")) return; // the dialog handles its own Escape
      const menu = [...document.querySelectorAll("details[data-ds-menu][open]")].at(-1);
      if (menu) { menu.open = false; focusQuietly(menu.querySelector("summary")); return; }
      const shell = document.querySelector(".ds-shell[data-nav-open]");
      if (shell) setNavOpen(shell, false);
      return;
    }
    if (event.key === "Tab") {
      const shell = document.querySelector(".ds-shell[data-nav-open]");
      if (!shell || desktopQuery.matches) return;
      const items = [...shell.querySelectorAll(".ds-sidebar a[href], .ds-sidebar button:not([disabled]), .ds-sidebar summary")].filter((el) => el.offsetParent !== null && !el.closest("[inert]"));
      if (!items.length) return;
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); focusQuietly(last); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); focusQuietly(first); }
    }
  });

  // Rail tooltips: hover (after a short delay) and keyboard focus.
  document.addEventListener("pointerover", (event) => {
    const link = event.target instanceof Element ? event.target.closest(".ds-sidebar .ds-nav-link") : null;
    if (link && event.pointerType !== "touch") showTip(link, 350);
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target instanceof Element && event.target.closest(".ds-sidebar .ds-nav-link")) hideTip();
  });
  document.addEventListener("focusin", (event) => {
    const link = event.target instanceof Element ? event.target.closest(".ds-sidebar .ds-nav-link") : null;
    if (link && link.matches(":focus-visible")) showTip(link, 0);
  });
  document.addEventListener("focusout", (event) => {
    if (event.target instanceof Element && event.target.closest(".ds-sidebar .ds-nav-link")) hideTip();
  });
  document.addEventListener("scroll", hideTip, { capture: true, passive: true });

  // <details> menus close on a press outside (respond on press, not release).
  document.addEventListener("pointerdown", (event) => {
    document.querySelectorAll("details[data-ds-menu][open]").forEach((menu) => { if (!menu.contains(event.target)) menu.open = false; });
  }, true);

  // One menu open at a time (nested menus excepted).
  document.addEventListener("toggle", (event) => {
    const menu = event.target;
    if (!(menu instanceof HTMLDetailsElement) || !menu.open || !menu.hasAttribute("data-ds-menu")) return;
    document.querySelectorAll("details[data-ds-menu][open]").forEach((other) => { if (other !== menu && !other.contains(menu) && !menu.contains(other)) other.open = false; });
  }, true);

  desktopQuery.addEventListener("change", () => {
    syncCollapsed();
    if (desktopQuery.matches) document.querySelectorAll(".ds-shell[data-nav-open]").forEach((shell) => setNavOpen(shell, false, { focus: false }));
  });
}

export function init(root) {
  const saved = readGroups();
  root.querySelectorAll("[data-ds-nav-group]").forEach((button) => {
    if (button._dsWired) return;
    button._dsWired = true;
    const name = button.getAttribute("data-ds-nav-group");
    const active = button.getAttribute("data-ds-nav-active") === "true";
    // A page inside a group keeps that group open; elsewhere the last choice wins, then the markup default.
    const open = active || (name in saved ? saved[name] : button.getAttribute("aria-expanded") === "true");
    button.setAttribute("aria-expanded", String(open));
    setPanel(button, open);
  });

  root.querySelectorAll("[data-ds-nav-scroll]").forEach((nav) => {
    if (nav._dsWired) return;
    nav._dsWired = true;
    const restore = () => { nav.scrollTop = Number(store.sessionGet(key("nav-scroll")) || 0); };
    restore();
    document.fonts?.ready.then(restore);
    window.addEventListener("load", restore, { once: true });
    let timer = 0;
    nav.addEventListener("scroll", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => store.sessionSet(key("nav-scroll"), String(Math.round(nav.scrollTop))), 100);
    }, { passive: true });
    window.addEventListener("pagehide", () => store.sessionSet(key("nav-scroll"), String(Math.round(nav.scrollTop))));
  });

  root.querySelectorAll(".ds-shell-scrim:not([aria-label])").forEach((scrim) => scrim.setAttribute("aria-label", t("shell.close")));
  root.querySelectorAll(".ds-topbar, .ds-page-header.is-sticky").forEach(watchScroll);
  root.querySelectorAll(".ds-toolbar[role='toolbar']").forEach(initToolbar);
  syncCollapsed();
}
