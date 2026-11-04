/*
 * Scroll tracker: an organic SVG path through the page's headings (it bends with the heading level), a head dot on the active
 * heading and a tail dot on the previous one in the direction of travel. Ported from the React reference (ScrollTrackerNav)
 * to vanilla JS for the ASP.NET Core site.
 * - Path and dots share one coordinate space; dots are sampled from the curve by length, so their centres never leave it.
 * - Interruptible: every new target animates from the current on-screen lengths (no jump when scrolling fast).
 * - Scroll position is the source of truth for the active heading; clicks only start the scroll.
 * - prefers-reduced-motion: instant moves and instant scrolling.
 */
(() => {
  "use strict";
  const root = document.querySelector("[data-scroll-tracker]");
  if (!root) return;
  const nav = root.querySelector(".scroll-tracker__nav");
  const links = [...root.querySelectorAll(".scroll-tracker__link")];
  if (!nav || links.length === 0) return;

  const NS = "http://www.w3.org/2000/svg";
  const DURATION = 680;
  const WIDTH = 52;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia("(max-width: 840px)");
  const items = links.map((link) => ({ id: decodeURIComponent(link.hash.slice(1)), label: link.textContent.trim(), level: Number(link.dataset.level || 0), link }));

  const svg = document.createElementNS(NS, "svg");
  svg.classList.add("scroll-tracker__map");
  svg.setAttribute("aria-hidden", "true");
  const basePath = document.createElementNS(NS, "path");
  basePath.classList.add("scroll-tracker__map-base");
  const activePath = document.createElementNS(NS, "path");
  activePath.classList.add("scroll-tracker__map-active");
  const tailDot = document.createElementNS(NS, "circle");
  tailDot.classList.add("scroll-tracker__dot-tail");
  tailDot.setAttribute("r", "2.35");
  const headDot = document.createElementNS(NS, "circle");
  headDot.classList.add("scroll-tracker__dot-head");
  headDot.setAttribute("r", "2.65");
  svg.append(basePath, activePath, tailDot, headDot);
  nav.prepend(svg);

  const makeHotspot = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scroll-tracker__hotspot";
    nav.append(button);
    return button;
  };
  const headSpot = makeHotspot();
  const tailSpot = makeHotspot();

  const tooltip = document.createElement("div");
  tooltip.className = "tracker-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.innerHTML = '<svg class="ds-icon is-xs" aria-hidden="true"><use href="#ds-icon-progress"></use></svg><span></span>';
  document.body.append(tooltip);

  let points = {};
  let lengths = {};
  let total = 0;
  let activeId = items.some((i) => i.id === location.hash.slice(1)) ? location.hash.slice(1) : items[0].id;
  let direction = "down";
  let headLength = null;
  let tailLength = null;
  let animation = 0;
  let lastScrollY = window.scrollY;

  const levelX = (level) => 13 + level * 10;

  function smoothPath(list) {
    if (list.length === 0) return "";
    return list.reduce((path, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = list[i - 1];
      const midY = (prev.y + p.y) / 2;
      return `${path} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
    }, "");
  }

  function lengthAtY(targetY) {
    let low = 0;
    let high = total;
    for (let step = 0; step < 18; step++) {
      const mid = (low + high) / 2;
      if (basePath.getPointAtLength(mid).y < targetY) low = mid;
      else high = mid;
    }
    return (low + high) / 2;
  }

  function measure() {
    if (mobileQuery.matches) return;
    const navRect = nav.getBoundingClientRect();
    const list = items.map((item) => {
      const r = item.link.getBoundingClientRect();
      return { id: item.id, x: levelX(item.level), y: r.top - navRect.top + r.height / 2 };
    });
    points = Object.fromEntries(list.map((p) => [p.id, p]));
    const height = Math.ceil(Math.max(...list.map((p) => p.y)) + 13);
    svg.setAttribute("viewBox", `0 0 ${WIDTH} ${height}`);
    svg.style.height = `${height}px`;
    const d = smoothPath(list);
    basePath.setAttribute("d", d);
    activePath.setAttribute("d", d);
    total = basePath.getTotalLength();
    lengths = Object.fromEntries(list.map((p) => [p.id, lengthAtY(p.y)]));
    // Geometry changed: snap the dots to their targets without animation.
    headLength = null;
    tailLength = null;
    update(false);
  }

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  function targets() {
    const index = Math.max(0, items.findIndex((i) => i.id === activeId));
    const tailIndex = direction === "down" ? Math.max(0, index - 1) : Math.min(items.length - 1, index + 1);
    return { head: items[index], tail: items[tailIndex] };
  }

  function draw(head, tail, tailItem, headItem) {
    const hp = basePath.getPointAtLength(head);
    const tp = basePath.getPointAtLength(tail);
    headDot.setAttribute("cx", hp.x);
    headDot.setAttribute("cy", hp.y);
    const sameNode = tailItem.id === headItem.id;
    tailDot.style.display = sameNode ? "none" : "";
    tailDot.setAttribute("cx", tp.x);
    tailDot.setAttribute("cy", tp.y);
    const start = Math.min(head, tail);
    const span = Math.abs(head - tail);
    activePath.style.strokeDasharray = span > 0.1 ? `${span} ${total + 1}` : "0 1";
    activePath.style.strokeDashoffset = String(-start);
    place(headSpot, hp, headItem);
    if (sameNode) tailSpot.hidden = true;
    else place(tailSpot, tp, tailItem);
  }

  function place(spot, point, item) {
    spot.hidden = false;
    spot.style.left = `${point.x}px`;
    spot.style.top = `${point.y}px`;
    spot.dataset.id = item.id;
    spot.setAttribute("aria-label", `Buka ${item.label}`);
  }

  function update(animate = true) {
    if (!total) return;
    const { head, tail } = targets();
    const toHead = lengths[head.id];
    const toTail = lengths[tail.id];
    if (toHead === undefined || toTail === undefined) return;
    const fromHead = headLength ?? toHead;
    const fromTail = tailLength ?? toTail;
    cancelAnimationFrame(animation);
    const begin = performance.now();
    const step = (now) => {
      const progress = !animate || motionQuery.matches ? 1 : Math.min(1, (now - begin) / DURATION);
      const eased = easeOutQuart(progress);
      headLength = fromHead + (toHead - fromHead) * eased;
      tailLength = fromTail + (toTail - fromTail) * eased;
      draw(headLength, tailLength, tail, head);
      if (progress < 1) animation = requestAnimationFrame(step);
    };
    animation = requestAnimationFrame(step);
  }

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      const on = decodeURIComponent(link.hash.slice(1)) === id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
      // Mobile strip: keep the active chip in view.
      if (on && mobileQuery.matches) {
        const strip = root;
        const left = link.offsetLeft - strip.clientWidth / 2 + link.clientWidth / 2;
        strip.scrollTo({ left, behavior: motionQuery.matches ? "auto" : "smooth" });
      }
    });
    update(true);
  }

  let scrollFrame = 0;
  function syncFromScroll() {
    scrollFrame = 0;
    const y = window.scrollY;
    const line = window.innerHeight * 0.18;
    let next = items[0].id;
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= line) next = item.id;
      else break;
    }
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 2) next = items[items.length - 1].id;
    if (next !== activeId) direction = y >= lastScrollY ? "down" : "up";
    lastScrollY = y;
    setActive(next);
  }
  const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(syncFromScroll); };

  function go(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const from = items.findIndex((i) => i.id === activeId);
    const to = items.findIndex((i) => i.id === id);
    direction = to >= from ? "down" : "up";
    setActive(id);
    target.scrollIntoView({ behavior: motionQuery.matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  /* tooltip: 150 ms delay on hover, immediate on focus, clamped to the viewport */
  let showTimer = 0;
  let hideTimer = 0;
  function showTooltip(text, anchor, delay) {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    const reveal = () => {
      tooltip.querySelector("span").textContent = text;
      const r = anchor.getBoundingClientRect();
      const width = Math.min(272, Math.max(112, text.length * 7 + 32));
      const inset = 12;
      const openLeft = r.right + 14 + width > window.innerWidth - inset;
      const left = openLeft ? r.left - width - 14 : r.right + 14;
      tooltip.style.left = `${Math.min(window.innerWidth - width - inset, Math.max(inset, left))}px`;
      tooltip.style.top = `${Math.min(window.innerHeight - 34 - inset, Math.max(inset, r.top + r.height / 2 - 17))}px`;
      tooltip.classList.toggle("is-left", openLeft);
      tooltip.classList.toggle("is-right", !openLeft);
      tooltip.classList.add("is-visible");
    };
    if (delay) showTimer = setTimeout(reveal, 150);
    else reveal();
  }
  function hideTooltip() {
    clearTimeout(showTimer);
    hideTimer = setTimeout(() => tooltip.classList.remove("is-visible"), 60);
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      go(decodeURIComponent(link.hash.slice(1)));
    });
    link.addEventListener("pointerenter", () => { if (link.scrollWidth > link.clientWidth || mobileQuery.matches === false) showTooltip(link.textContent.trim(), link, true); });
    link.addEventListener("pointerleave", hideTooltip);
    link.addEventListener("blur", hideTooltip);
  });

  for (const spot of [headSpot, tailSpot]) {
    spot.addEventListener("click", () => go(spot.dataset.id));
    spot.addEventListener("pointerenter", () => showTooltip(items.find((i) => i.id === spot.dataset.id)?.label ?? "", spot, true));
    spot.addEventListener("pointerleave", hideTooltip);
    spot.addEventListener("focus", () => showTooltip(items.find((i) => i.id === spot.dataset.id)?.label ?? "", spot, false));
    spot.addEventListener("blur", hideTooltip);
  }

  window.addEventListener("scroll", () => { onScroll(); if (tooltip.classList.contains("is-visible")) hideTooltip(); }, { passive: true });
  window.addEventListener("resize", () => { measure(); onScroll(); });
  if ("ResizeObserver" in window) new ResizeObserver(() => requestAnimationFrame(measure)).observe(nav);
  mobileQuery.addEventListener("change", () => { measure(); onScroll(); });
  document.fonts?.ready.then(() => { measure(); onScroll(); });

  links.find((l) => decodeURIComponent(l.hash.slice(1)) === activeId)?.classList.add("is-active");
  measure();
  syncFromScroll();
})();
