/* Media behaviours: carousel on CSS scroll snap, image loading/error states, image zoom (lightbox dialog).
   Owner: batch A7 data-display-3. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).

   Carousel: the HTML scrolls and snaps without JavaScript. This module adds previous/next, indicators (dots, thumbnails,
   count), keyboard, mouse drag with pointer capture, velocity, momentum projection and rubber-banding at the ends, autoplay
   (off by default, never under reduced motion), and the "Slide 2 of 5" live region. Touch and trackpad use native scrolling.
   Pattern: WAI-ARIA APG carousel (region + aria-roledescription, slide groups, labelled controls, pause control). */
import { t, addMessages, reduceMotion, uid, icon, registerIcons, rovingKeydown, openDialog, closeDialog } from "../core.js";

addMessages({
  en: {
    "carousel.label": "Carousel",
    "carousel.slideLabel": "{n} of {total}",
    "carousel.status": "Slide {n} of {total}",
    "carousel.statusRange": "Slides {from}–{to} of {total}",
    "carousel.previous": "Previous slide",
    "carousel.next": "Next slide",
    "carousel.goto": "Go to slide {n}",
    "carousel.picker": "Choose a slide",
    "carousel.play": "Start automatic slide show",
    "carousel.pause": "Pause automatic slide show",
    "image.unavailable": "Image unavailable",
    "lightbox.label": "Enlarged image",
    "lightbox.close": "Close",
  },
  id: {
    "carousel.label": "Carousel",
    "carousel.slideLabel": "{n} dari {total}",
    "carousel.status": "Slide {n} dari {total}",
    "carousel.statusRange": "Slide {from}–{to} dari {total}",
    "carousel.previous": "Slide sebelumnya",
    "carousel.next": "Slide berikutnya",
    "carousel.goto": "Buka slide {n}",
    "carousel.picker": "Pilih slide",
    "carousel.play": "Mulai tayangan slide otomatis",
    "carousel.pause": "Jeda tayangan slide otomatis",
    "image.unavailable": "Gambar tidak tersedia",
    "lightbox.label": "Gambar diperbesar",
    "lightbox.close": "Tutup",
  },
});

registerIcons({
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  pause: '<path d="M8 5v14"/><path d="M16 5v14"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
});

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const root$ = () => document.documentElement;

/** Read a time token ("500ms" or "0.5s") in milliseconds. */
function tokenMs(name, fallback) {
  const raw = getComputedStyle(root$()).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return fallback;
  return raw.endsWith("ms") ? n : raw.endsWith("s") ? n * 1000 : fallback;
}

/** Apple-style rubber band: resistance grows with distance and never exceeds the viewport size. */
function rubber(distance, size) {
  const c = 0.55;
  const d = Math.abs(distance);
  return Math.sign(distance) * (1 - 1 / ((d * c) / size + 1)) * size;
}

/* ====================================================================== Carousel */
const instances = new WeakMap();

class Carousel {
  constructor(el) {
    this.el = el;
    this.viewport = el.querySelector(":scope > .ds-carousel__viewport");
    this.track = this.viewport?.querySelector(":scope > .ds-carousel__track");
    this.slides = this.track ? [...this.track.children].filter((c) => c.classList.contains("ds-carousel__slide")) : [];
    this.ok = Boolean(this.viewport && this.track && this.slides.length);
    if (!this.ok) return;

    this.loop = el.hasAttribute("data-ds-loop");
    this.interval = Math.max(0, parseInt(el.dataset.dsAutoplay ?? "0", 10) || 0);
    this.mode = el.dataset.dsIndicators || "dots";
    this.userPaused = false;
    this.hovered = false;
    this.focused = false;
    this.visible = true;
    this.interacted = false;
    this.stopsCache = [];
    this.lastStop = -1;
    this.vel = 0;
    this.raf = 0;
    this.band = null;
    this.drag = null;
    this.timer = 0;
    this.settleTimer = 0;
    this.frame = 0;

    this.setupRoles();
    this.buildControls();
    this.bind();
    this.measure();
    this.update(false);
    el.setAttribute("data-ds-ready", "");
  }

  /* ---- ARIA ------------------------------------------------------------ */
  setupRoles() {
    const { el, slides } = this;
    if (!el.hasAttribute("role") && el.tagName !== "SECTION") el.setAttribute("role", "region");
    el.setAttribute("aria-roledescription", "carousel");
    if (!el.hasAttribute("aria-label") && !el.hasAttribute("aria-labelledby")) el.setAttribute("aria-label", t("carousel.label"));
    slides.forEach((slide, i) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      if (!slide.hasAttribute("aria-label") && !slide.hasAttribute("aria-labelledby")) {
        slide.setAttribute("aria-label", t("carousel.slideLabel", { n: i + 1, total: slides.length }));
      }
    });
  }

  /* ---- Controls -------------------------------------------------------- */
  button(className, label, iconName) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `ds-media-btn ${className}`;
    b.setAttribute("aria-label", label);
    b.insertAdjacentHTML("beforeend", icon(iconName));
    return b;
  }

  buildControls() {
    const { el, viewport } = this;
    this.status = document.createElement("div");
    this.status.className = "ds-carousel__status";
    this.status.setAttribute("role", "status");
    this.status.setAttribute("aria-live", "polite");
    this.status.setAttribute("aria-atomic", "true");
    el.insertBefore(this.status, viewport);

    this.prevBtn = this.button("ds-carousel__nav is-prev", t("carousel.previous"), "chevron-left");
    this.nextBtn = this.button("ds-carousel__nav is-next", t("carousel.next"), "chevron-right");
    el.insertBefore(this.prevBtn, viewport);
    el.insertBefore(this.nextBtn, viewport);

    const footer = document.createElement("div");
    footer.className = "ds-carousel__footer";

    if (this.interval && !reduceMotion()) {
      this.playing = true;
      this.playBtn = this.button("ds-carousel__play", t("carousel.pause"), "pause");
      footer.append(this.playBtn);
      this.status.setAttribute("aria-live", "off");
    } else {
      this.playing = false;
    }

    this.indicators = document.createElement("div");
    if (this.mode === "count") {
      this.indicators.className = "ds-carousel__count";
      this.indicators.setAttribute("aria-hidden", "true");
    } else if (this.mode === "thumbs" || this.mode === "dots") {
      this.indicators.className = this.mode === "thumbs" ? "ds-carousel__thumbs" : "ds-carousel__dots";
      this.indicators.setAttribute("role", "group");
      this.indicators.setAttribute("aria-label", t("carousel.picker"));
    }
    if (this.mode !== "none") footer.append(this.indicators);
    if (footer.children.length) {
      el.append(footer);
      this.footer = footer;
    }
    this.indicatorKey = "";
  }

  rebuildIndicators() {
    if (this.mode !== "dots" && this.mode !== "thumbs") return;
    const key = `${this.mode}:${this.stopsCache.length}`;
    if (key === this.indicatorKey) return;
    this.indicatorKey = key;
    this.indicators.replaceChildren();
    this.stopsCache.forEach((slideIndex, stop) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", t("carousel.goto", { n: stop + 1 }));
      b.dataset.stop = String(stop);
      if (this.mode === "thumbs") {
        b.className = "ds-carousel__thumb";
        const slide = this.slides[slideIndex];
        const src = slide.dataset.dsThumb || slide.querySelector("img")?.currentSrc || slide.querySelector("img")?.src;
        if (src) {
          const img = document.createElement("img");
          img.alt = "";
          img.loading = "lazy";
          img.src = src;
          b.append(img);
        }
      } else {
        b.className = "ds-carousel__dot";
      }
      this.indicators.append(b);
    });
    this.lastStop = -1;
  }

  /* ---- Geometry -------------------------------------------------------- */
  limits() {
    const max = Math.max(0, this.viewport.scrollWidth - this.viewport.clientWidth);
    const rtl = getComputedStyle(this.viewport).direction === "rtl";
    return { min: rtl ? -max : 0, max: rtl ? 0 : max, rtl };
  }

  target(i) {
    const { min, max, rtl } = this.limits();
    const v = this.viewport.getBoundingClientRect();
    const r = this.slides[i].getBoundingClientRect();
    const delta = rtl ? r.right - v.right : r.left - v.left;
    return clamp(this.viewport.scrollLeft + delta, min, max);
  }

  perView() {
    const gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
    const w = this.slides[0].offsetWidth;
    if (!w) return 1;
    return Math.max(1, Math.round((this.viewport.clientWidth + gap) / (w + gap)));
  }

  measure() {
    const n = this.slides.length;
    const pv = this.perView();
    const stops = [];
    for (let i = 0; i < n; i += pv) stops.push(Math.min(i, Math.max(0, n - pv)));
    this.pv = pv;
    this.stopsCache = [...new Set(stops)];
    this.rebuildIndicators();
    if (this.footer && !this.footer.hidden) {
      const gap = parseFloat(getComputedStyle(this.footer).marginTop) || 0;
      this.el.style.setProperty("--ds-carousel-footer", `${this.footer.offsetHeight + gap}px`);
    } else {
      this.el.style.removeProperty("--ds-carousel-footer");
    }
  }

  /** Index of the slide whose start edge is closest to the current scroll position. */
  nearestSlide(position = this.viewport.scrollLeft) {
    let best = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < this.slides.length; i++) {
      const d = Math.abs(this.target(i) - position);
      if (d < bestDistance - 0.5) {
        best = i;
        bestDistance = d;
      }
    }
    return best;
  }

  stopOf(slideIndex) {
    let best = 0;
    let bestDistance = Infinity;
    this.stopsCache.forEach((s, i) => {
      const d = Math.abs(s - slideIndex);
      if (d < bestDistance) {
        best = i;
        bestDistance = d;
      }
    });
    return best;
  }

  /* ---- State ----------------------------------------------------------- */
  update(announce) {
    const slideIndex = this.nearestSlide();
    const stop = this.stopOf(slideIndex);
    const last = this.stopsCache.length - 1;
    const atStart = stop <= 0;
    const atEnd = stop >= last;
    const single = last <= 0;

    this.prevBtn.setAttribute("aria-disabled", String(!this.loop && atStart));
    this.nextBtn.setAttribute("aria-disabled", String(!this.loop && atEnd));
    this.prevBtn.hidden = single;
    this.nextBtn.hidden = single;
    if (this.footer) this.footer.hidden = single && !this.playBtn;

    if (this.mode === "dots" || this.mode === "thumbs") {
      const focusInside = this.indicators.contains(document.activeElement);
      [...this.indicators.children].forEach((b, i) => {
        if (i === stop) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
        if (!focusInside) b.tabIndex = i === stop ? 0 : -1;
      });
    } else if (this.mode === "count") {
      this.indicators.textContent = `${stop + 1} / ${this.stopsCache.length}`;
    }

    if (stop !== this.lastStop) {
      const changed = this.lastStop !== -1;
      this.lastStop = stop;
      if (changed) {
        this.el.dispatchEvent(new CustomEvent("ds:carousel:change", { bubbles: true, detail: { index: stop, slide: slideIndex, count: this.stopsCache.length, slides: this.slides.length } }));
      }
    }

    if (announce && this.status.getAttribute("aria-live") !== "off") {
      const n = this.slides.length;
      const from = slideIndex + 1;
      const to = Math.min(n, slideIndex + this.pv);
      this.status.textContent = this.pv > 1 ? t("carousel.statusRange", { from, to, total: n }) : t("carousel.status", { n: from, total: n });
    }
  }

  onScroll() {
    if (!this.frame) {
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        this.update(false);
      });
    }
    clearTimeout(this.settleTimer);
    this.settleTimer = setTimeout(() => this.onSettle(), 140);
  }

  onSettle() {
    if (this.drag?.moved) return;
    this.update(this.interacted);
    this.startTimer();
  }

  /* ---- Motion ---------------------------------------------------------- */
  stopAnim() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (this.band) {
      const m = new DOMMatrix(getComputedStyle(this.track).transform).m41;
      this.band.cancel();
      this.band = null;
      this.track.style.transform = Math.abs(m) > 0.5 ? `translateX(${m}px)` : "";
    }
  }

  /** Spring the scroll position to `to`, starting from where it is now and from the given velocity (px/s). */
  animateTo(to, { velocity = 0, bounce = false } = {}) {
    this.stopAnim();
    const { viewport } = this;
    const { min, max } = this.limits();
    to = clamp(to, min, max);
    if (reduceMotion() || Math.abs(to - viewport.scrollLeft) < 0.5) {
      viewport.scrollLeft = to;
      viewport.removeAttribute("data-ds-moving");
      return;
    }
    viewport.setAttribute("data-ds-moving", "");
    const zeta = bounce ? 0.85 : 1;
    const seconds = tokenMs(bounce ? "--ds-duration-spring-bounce" : "--ds-duration-spring", 500) / 1000;
    const w = (bounce ? 4.6 / zeta : 6.2) / seconds;
    const k = w * w;
    const c = 2 * zeta * w;
    let x = viewport.scrollLeft;
    let v = velocity;
    let last = performance.now();
    const step = (now) => {
      let dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const h = 1 / 240;
      while (dt > 0) {
        const s = Math.min(h, dt);
        v += (-k * (x - to) - c * v) * s;
        x += v * s;
        dt -= s;
      }
      this.vel = v;
      if (Math.abs(x - to) < 0.4 && Math.abs(v) < 8) {
        viewport.scrollLeft = to;
        this.raf = 0;
        this.vel = 0;
        viewport.removeAttribute("data-ds-moving");
        return;
      }
      viewport.scrollLeft = clamp(x, min, max);
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  springBack(offset) {
    const duration = tokenMs("--ds-duration-spring", 500);
    const easing = getComputedStyle(root$()).getPropertyValue("--ds-ease-spring").trim() || "ease-out";
    this.track.style.transform = "";
    let animation;
    try {
      animation = this.track.animate([{ transform: `translateX(${offset}px)` }, { transform: "translateX(0)" }], { duration, easing });
    } catch {
      animation = this.track.animate([{ transform: `translateX(${offset}px)` }, { transform: "translateX(0)" }], { duration, easing: "ease-out" });
    }
    this.band = animation;
    const done = () => {
      if (this.band === animation) this.band = null;
      this.viewport.removeAttribute("data-ds-moving");
    };
    animation.onfinish = done;
    animation.oncancel = () => {
      if (this.band === animation) this.band = null;
    };
  }

  /* ---- Navigation ------------------------------------------------------ */
  goToStop(stop, { wrap = false } = {}) {
    const last = this.stopsCache.length - 1;
    if (stop > last) stop = wrap ? 0 : last;
    if (stop < 0) stop = wrap ? last : 0;
    this.goToSlide(this.stopsCache[stop]);
  }

  goToSlide(index) {
    const i = clamp(index, 0, this.slides.length - 1);
    this.animateTo(this.target(i));
  }

  next({ wrap = this.loop } = {}) {
    this.goToStop(this.stopOf(this.nearestSlide()) + 1, { wrap });
  }

  prev({ wrap = this.loop } = {}) {
    this.goToStop(this.stopOf(this.nearestSlide()) - 1, { wrap });
  }

  /* ---- Autoplay -------------------------------------------------------- */
  get running() {
    return Boolean(this.playing && !this.userPaused && !this.hovered && !this.focused && this.visible && !document.hidden && !reduceMotion());
  }

  startTimer() {
    clearTimeout(this.timer);
    this.timer = 0;
    if (!this.interval || !this.running) return;
    this.timer = setTimeout(() => {
      if (this.running) this.next({ wrap: true });
    }, this.interval);
  }

  setPlaying(on) {
    this.userPaused = !on;
    if (this.playBtn) {
      this.playBtn.setAttribute("aria-label", on ? t("carousel.pause") : t("carousel.play"));
      this.playBtn.replaceChildren();
      this.playBtn.insertAdjacentHTML("beforeend", icon(on ? "pause" : "play"));
    }
    this.status.setAttribute("aria-live", on ? "off" : "polite");
    if (on) this.startTimer();
    else clearTimeout(this.timer);
  }

  /* ---- Events ---------------------------------------------------------- */
  bind() {
    const { el, viewport } = this;

    viewport.addEventListener("scroll", () => this.onScroll(), { passive: true });
    if ("onscrollend" in window) viewport.addEventListener("scrollend", () => { clearTimeout(this.settleTimer); this.onSettle(); });

    this.prevBtn.addEventListener("click", () => this.press(() => this.prev()));
    this.nextBtn.addEventListener("click", () => this.press(() => this.next()));
    this.playBtn?.addEventListener("click", () => this.setPlaying(this.userPaused));

    this.indicators.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-stop]");
      if (!b) return;
      this.interacted = true;
      this.goToStop(Number(b.dataset.stop));
      this.startTimer();
    });
    this.indicators.addEventListener("keydown", (e) => {
      const items = [...this.indicators.querySelectorAll("button")];
      if (rovingKeydown(e, items, { orientation: "horizontal" })) e.stopPropagation();
    });

    el.addEventListener("keydown", (e) => this.onKey(e));
    el.addEventListener("pointerdown", () => { this.interacted = true; }, { capture: true });

    viewport.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    viewport.addEventListener("pointermove", (e) => this.onPointerMove(e));
    viewport.addEventListener("pointerup", (e) => this.onPointerEnd(e));
    viewport.addEventListener("pointercancel", (e) => this.onPointerEnd(e));
    viewport.addEventListener("click", (e) => {
      if (this.suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        this.suppressClick = false;
      }
    }, true);

    if (window.matchMedia("(hover: hover)").matches) {
      el.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { this.hovered = true; clearTimeout(this.timer); } });
      el.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { this.hovered = false; this.startTimer(); } });
    }
    el.addEventListener("focusin", () => { this.focused = true; clearTimeout(this.timer); });
    el.addEventListener("focusout", (e) => {
      if (!el.contains(e.relatedTarget)) {
        this.focused = false;
        this.startTimer();
      }
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.measure();
      this.update(false);
    });
    this.resizeObserver.observe(viewport);

    this.slideObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.inert = entry.intersectionRatio < 0.5;
    }, { root: viewport, threshold: [0, 0.5, 1] });
    this.slides.forEach((s) => this.slideObserver.observe(s));

    if (this.interval) {
      new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible) this.startTimer();
        else clearTimeout(this.timer);
      }).observe(el);
      document.addEventListener("visibilitychange", () => (document.hidden ? clearTimeout(this.timer) : this.startTimer()));
      this.startTimer();
    }
  }

  press(action) {
    this.interacted = true;
    action();
    this.startTimer();
  }

  onKey(e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable], [role='slider'], [role='textbox']")) return;
    const rtl = this.limits().rtl;
    let handled = true;
    this.interacted = true;
    if (e.key === "ArrowRight") rtl ? this.prev() : this.next();
    else if (e.key === "ArrowLeft") rtl ? this.next() : this.prev();
    else if (e.key === "Home") this.goToStop(0);
    else if (e.key === "End") this.goToStop(this.stopsCache.length - 1);
    else handled = false;
    if (handled) {
      e.preventDefault();
      this.startTimer();
    }
  }

  /* ---- Mouse drag: pointer capture, velocity, momentum projection, rubber band ---- */
  onPointerDown(e) {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if (e.target.closest("input, textarea, select, [contenteditable], button, .ds-media-btn")) return;
    const { max, min } = this.limits();
    if (max - min <= 0) return;
    this.stopAnim();
    this.viewport.removeAttribute("data-ds-moving");
    this.drag = { id: e.pointerId, startX: e.clientX, startScroll: this.viewport.scrollLeft, startSlide: this.nearestSlide(), samples: [{ t: e.timeStamp, x: e.clientX }], moved: false, over: 0 };
  }

  onPointerMove(e) {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 4) return;
      d.moved = true;
      this.viewport.setPointerCapture(d.id);
      this.viewport.setAttribute("data-ds-dragging", "");
      clearTimeout(this.timer);
    }
    d.samples.push({ t: e.timeStamp, x: e.clientX });
    while (d.samples.length > 2 && e.timeStamp - d.samples[0].t > 100) d.samples.shift();

    const { min, max } = this.limits();
    const raw = d.startScroll - dx;
    d.over = raw < min ? raw - min : raw > max ? raw - max : 0;
    this.viewport.scrollLeft = clamp(raw, min, max);
    this.track.style.transform = d.over && !reduceMotion() ? `translateX(${-rubber(d.over, this.viewport.clientWidth)}px)` : "";
  }

  onPointerEnd(e) {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    this.drag = null;
    if (!d.moved) return;
    this.suppressClick = true;
    setTimeout(() => { this.suppressClick = false; }, 0);
    try { this.viewport.releasePointerCapture(d.id); } catch { /* already released */ }

    this.viewport.setAttribute("data-ds-moving", "");
    this.viewport.removeAttribute("data-ds-dragging");

    if (d.over) {
      this.springBack(-rubber(d.over, this.viewport.clientWidth));
      this.interacted = true;
      return;
    }

    const first = d.samples[0];
    const lastSample = d.samples.at(-1);
    const dt = Math.max(1, lastSample.t - first.t);
    const velocity = -((lastSample.x - first.x) / dt) * 1000; // scroll px/s
    const rate = 0.998;
    const projected = this.viewport.scrollLeft + (velocity / 1000) * (rate / (1 - rate));
    let best = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < this.slides.length; i++) {
      const distance = Math.abs(this.target(i) - projected);
      if (distance < bestDistance - 0.5) {
        best = i;
        bestDistance = distance;
      }
    }
    best = clamp(best, d.startSlide - this.pv, d.startSlide + this.pv);
    this.interacted = true;
    this.animateTo(this.target(best), { velocity, bounce: true });
  }
}

function initCarousels(root) {
  const found = [...root.querySelectorAll("[data-ds-carousel]")];
  if (root instanceof Element && root.matches("[data-ds-carousel]")) found.unshift(root);
  for (const el of found) {
    if (el.hasAttribute("data-ds-ready") || instances.has(el)) continue;
    const c = new Carousel(el);
    if (c.ok) instances.set(el, c);
  }
}

const resolve = (el) => instances.get(typeof el === "string" ? document.querySelector(el) : el);

/* ====================================================================== Image states */
function initImages(root) {
  for (const frame of root.querySelectorAll(".ds-image-frame:not([data-ds-ready])")) {
    const img = frame.querySelector(":scope > img");
    if (!img) continue;
    frame.setAttribute("data-ds-ready", "");

    const blur = frame.dataset.dsBlur;
    if (frame.dataset.placeholder === "blur" && blur && /^(data:image\/|https?:|\/)/.test(blur) && !/["'\\\n]/.test(blur)) {
      frame.style.setProperty("--ds-blur", `url("${blur}")`);
    }

    const finish = (state) => {
      frame.dataset.state = state;
      if (state === "error") showFallback(frame, img);
      frame.dispatchEvent(new CustomEvent(`ds:image:${state === "error" ? "error" : "load"}`, { bubbles: true }));
    };

    if (img.complete) {
      if (img.getAttribute("src") && !img.naturalWidth) finish("error");
      else frame.dataset.state = "loaded";
    } else {
      frame.dataset.state = "loading";
      img.addEventListener("load", () => finish("loaded"), { once: true });
      img.addEventListener("error", () => finish("error"), { once: true });
    }
  }
}

function showFallback(frame, img) {
  if (frame.querySelector(":scope > .ds-image-frame__fallback")) return;
  const box = document.createElement("div");
  box.className = "ds-image-frame__fallback";
  box.insertAdjacentHTML("beforeend", icon("image", "ds-icon is-lg"));
  const label = document.createElement("span");
  label.textContent = img.alt || t("image.unavailable");
  box.append(label);
  frame.append(box);
}

/* ====================================================================== Zoom (lightbox) */
let lightbox = null;

function ensureLightbox() {
  if (lightbox?.isConnected) return lightbox;
  const dialog = document.createElement("dialog");
  dialog.className = "ds-lightbox";
  dialog.id = uid("lightbox");
  dialog.setAttribute("aria-label", t("lightbox.label"));
  const figure = document.createElement("figure");
  figure.className = "ds-lightbox__figure";
  figure.append(document.createElement("img"), document.createElement("figcaption"));
  const close = document.createElement("button");
  close.type = "button";
  close.className = "ds-media-btn ds-lightbox__close";
  close.setAttribute("aria-label", t("lightbox.close"));
  close.setAttribute("data-ds-initial-focus", "");
  close.insertAdjacentHTML("beforeend", icon("x"));
  dialog.append(figure, close);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target === figure) closeDialog(dialog);
  });
  close.addEventListener("click", () => closeDialog(dialog));
  document.body.append(dialog);
  lightbox = dialog;
  return dialog;
}

function openZoom(trigger) {
  const inner = trigger.querySelector("img");
  const src = trigger.dataset.dsZoomSrc || trigger.getAttribute("href") || inner?.currentSrc || inner?.src;
  if (!src) return false;
  const dialog = ensureLightbox();
  const img = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");
  img.src = src;
  img.alt = inner?.alt ?? "";
  const text = trigger.dataset.dsCaption || trigger.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || inner?.alt || "";
  caption.textContent = text;
  caption.hidden = !text;
  dialog.setAttribute("aria-label", text || t("lightbox.label"));
  openDialog(dialog, trigger);
  return true;
}

/* ====================================================================== Module contract */
export function wire() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const trigger = e.target instanceof Element ? e.target.closest("[data-ds-zoom]") : null;
    if (trigger && openZoom(trigger)) e.preventDefault();
  });
}

export function init(root = document) {
  initCarousels(root);
  initImages(root);
}

export const api = {
  carousel: {
    next: (el) => resolve(el)?.press(() => resolve(el).next()),
    prev: (el) => resolve(el)?.press(() => resolve(el).prev()),
    goTo: (el, index) => resolve(el)?.press(() => resolve(el).goToSlide(index)),
    play: (el) => resolve(el)?.setPlaying(true),
    pause: (el) => resolve(el)?.setPlaying(false),
  },
  image: { zoom: (el) => openZoom(typeof el === "string" ? document.querySelector(el) : el) },
};

