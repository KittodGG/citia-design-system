/*
 * Documentation chrome behaviours: mobile drawer, search palette (Ctrl/Cmd+K, "/"), per-preview theme switch,
 * preview forms that never submit, motion demo replay. Components inside previews are driven by ds.js itself.
 */
(() => {
  "use strict";
  const html = document.documentElement;
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const focusQuietly = (el) => el?.focus({ preventScroll: true });
  const lang = document.body.dataset.docsLang || html.lang || "en";
  const storage = document.body.dataset.docsStorage || "ds-docs";
  const TEXT = {
    en: {
      results: (n) => `${n} ${n === 1 ? "result" : "results"}.`,
      none: "No results.",
      indexError: "The search index could not be loaded.",
      saving: "Saving.",
      demoTitle: "Example only",
      demoText: "Forms inside previews are not submitted.",
    },
    id: {
      results: (n) => `${n} hasil.`,
      none: "Tidak ada hasil.",
      indexError: "Indeks pencarian tidak dapat dimuat.",
      saving: "Data sedang disimpan.",
      demoTitle: "Contoh saja",
      demoText: "Formulir di pratinjau tidak dikirim.",
    },
  };
  const text = TEXT[lang] ?? TEXT.en;

  // The language switch remembers the choice, so "/" opens the same language next time.
  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest("[data-docs-lang-link]") : null;
    if (link) document.cookie = `${storage}-lang=${link.getAttribute("data-docs-lang-link")}; path=/; max-age=31536000; samesite=lax`;
  });

  /* ---------- drawer (≤ 1120 px): slides in from the left, focus moves in, Escape and the scrim close it ---------- */
  const shell = document.querySelector("[data-docs-shell]");
  const sidebar = document.querySelector("[data-docs-sidebar]");
  const frame = document.querySelector("[data-docs-frame]");
  const opener = document.querySelector("[data-docs-nav-open]");
  const drawerQuery = window.matchMedia("(max-width: 1120px)");

  function setDrawer(open) {
    if (!shell) return;
    shell.toggleAttribute("data-nav-open", open);
    opener?.setAttribute("aria-expanded", String(open));
    if (frame) frame.inert = open;
    if (open) focusQuietly(sidebar?.querySelector(".is-current") ?? sidebar?.querySelector("a[href]"));
    else focusQuietly(opener);
  }

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest("[data-docs-nav-open]")) setDrawer(true);
    else if (target.closest("[data-docs-nav-close]")) setDrawer(false);
    else if (target.closest("[data-docs-search-open]")) openSearch();
  });

  drawerQuery.addEventListener("change", () => { if (!drawerQuery.matches && shell?.hasAttribute("data-nav-open")) setDrawer(false); });

  // Keep the current page visible in a long sidebar without moving the window.
  const current = sidebar?.querySelector(".is-current");
  const navList = sidebar?.querySelector("[data-docs-nav]");
  if (current && navList) {
    const top = current.offsetTop - navList.clientHeight / 3;
    if (top > 0) navList.scrollTop = top;
  }

  /* ---------- search palette ---------- */
  const dialog = document.querySelector("[data-docs-search]");
  const input = document.querySelector("[data-docs-search-input]");
  const list = document.querySelector("[data-docs-search-results]");
  const empty = document.querySelector("[data-docs-search-empty]");
  const status = document.querySelector("[data-docs-search-status]");
  const shortcut = document.querySelector("[data-docs-shortcut]");
  if (shortcut && /Mac|iPhone|iPad/.test(navigator.platform)) shortcut.textContent = "⌘ K";
  let index = null;
  let results = [];
  let active = -1;

  const norm = (s) => String(s ?? "").toLocaleLowerCase(lang).normalize("NFD").replace(/[̀-ͯ]/g, "");

  async function loadIndex() {
    if (index) return index;
    const response = await fetch(`/${lang}/search-index.json`, { headers: { Accept: "application/json" } });
    const pages = await response.json();
    index = [];
    for (const page of pages) {
      index.push({ href: page.slug, title: page.title, context: `${page.group} · ${page.summary}`, haystack: norm(`${page.title} ${page.group} ${page.summary}`), weight: 2 });
      for (const h of page.headings) {
        index.push({ href: `${page.slug}#${h.id}`, title: h.text, context: `${page.group} · ${page.title}`, haystack: norm(`${h.text} ${page.title}`), weight: 1 });
      }
    }
    return index;
  }

  function render(term) {
    const q = norm(term).trim();
    const words = q.split(/\s+/).filter(Boolean);
    results = (index ?? [])
      .filter((item) => words.every((w) => item.haystack.includes(w)))
      .sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title, lang))
      .slice(0, q ? 30 : 12);
    list.replaceChildren(...results.map((item, i) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.id = `docs-search-opt-${i}`;
      a.setAttribute("role", "option");
      a.setAttribute("aria-selected", "false");
      const small = document.createElement("small");
      small.textContent = item.context;
      const span = document.createElement("span");
      span.textContent = item.title;
      a.append(span, small);
      li.append(a);
      return li;
    }));
    empty.hidden = results.length > 0;
    status.textContent = results.length ? text.results(results.length) : text.none;
    setActive(results.length ? 0 : -1);
  }

  function setActive(i) {
    active = i;
    [...list.querySelectorAll("a")].forEach((a, n) => a.setAttribute("aria-selected", String(n === i)));
    const el = list.querySelectorAll("a")[i];
    if (el) { input.setAttribute("aria-activedescendant", el.id); el.scrollIntoView({ block: "nearest" }); }
    else input.removeAttribute("aria-activedescendant");
  }

  async function openSearch() {
    if (!dialog || dialog.open) return;
    if (shell?.hasAttribute("data-nav-open")) setDrawer(false);
    dialog.showModal();
    input.value = "";
    focusQuietly(input);
    try { await loadIndex(); render(""); }
    catch { status.textContent = text.indexError; }
  }

  input?.addEventListener("input", () => render(input.value));
  input?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.length) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((active + step + results.length) % results.length);
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      location.assign(results[active].href);
      dialog.close();
    }
  });
  dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

  document.addEventListener("keydown", (event) => {
    const typing = event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]");
    if ((event.key === "k" || event.key === "K") && (event.ctrlKey || event.metaKey)) { event.preventDefault(); openSearch(); }
    else if (event.key === "/" && !typing) { event.preventDefault(); openSearch(); }
    else if (event.key === "Escape" && shell?.hasAttribute("data-nav-open") && !document.querySelector("dialog[open]")) setDrawer(false);
  });

  /* ---------- previews ---------- */
  const themeFor = (mode) => (mode === "dark" ? html.dataset.dsDark || "dark" : html.dataset.dsLight || "light");

  document.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-preview-theme]") : null;
    if (!button) return;
    const figure = button.closest("[data-preview]");
    const canvas = figure?.querySelector("[data-preview-canvas]");
    if (!canvas) return;
    const mode = button.getAttribute("data-preview-theme");
    if (mode) canvas.setAttribute("data-theme", themeFor(mode));
    else canvas.removeAttribute("data-theme");
    figure.querySelectorAll("[data-preview-theme]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
  });

  // Theme names can change at runtime (ds:themechange); overridden previews keep their explicit light/dark choice.
  document.addEventListener("ds:themechange", () => {
    document.querySelectorAll("[data-preview]").forEach((figure) => {
      const pressed = figure.querySelector("[data-preview-theme][aria-pressed='true']");
      const mode = pressed?.getAttribute("data-preview-theme");
      const canvas = figure.querySelector("[data-preview-canvas]");
      if (mode && canvas) canvas.setAttribute("data-theme", themeFor(mode));
    });
  });

  // Example forms never submit; data-ds-once forms still show their busy state for a moment.
  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.closest("[data-preview-canvas]")) return;
    event.preventDefault();
    const submitter = event.submitter;
    const loading = submitter?.getAttribute("data-ds-loading-label");
    if (form.hasAttribute("data-ds-once") && submitter) {
      const label = submitter.textContent;
      if (loading) submitter.textContent = loading;
      submitter.setAttribute("aria-disabled", "true");
      form.setAttribute("aria-busy", "true");
      const statusEl = form.querySelector("[data-ds-save-status]");
      if (statusEl) statusEl.textContent = text.saving;
      setTimeout(() => {
        submitter.textContent = label;
        submitter.removeAttribute("aria-disabled");
        form.removeAttribute("aria-busy");
        if (statusEl) statusEl.textContent = "";
      }, 1600);
    }
    window.DS?.toast({ tone: "info", title: text.demoTitle, text: text.demoText });
  }, true);

  // Example links inside previews do not navigate away (href="#" and same-page anchors excepted).
  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest("[data-preview-canvas] a[href]") : null;
    if (!link || link.hasAttribute("data-ds-export")) return;
    const href = link.getAttribute("href") ?? "";
    if (href === "#" || href.startsWith("#")) { event.preventDefault(); return; }
    if (!link.closest("[data-ds-confirm]") && !link.hasAttribute("data-ds-confirm")) event.preventDefault();
  });

  /* ---------- motion demo: tap to replay on touch screens ---------- */
  document.addEventListener("click", (event) => {
    const row = event.target instanceof Element ? event.target.closest(".docs-motion__row") : null;
    if (!row || reduceMotion()) return;
    row.classList.toggle("is-playing");
  });
})();
