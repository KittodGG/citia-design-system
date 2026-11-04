/* Citia Design System — theme bootstrap for pages that do not use the _DsHead partial (static HTML, other frameworks).
   Put it INLINE in <head>, before the stylesheet, so the first paint already has the right theme (no light flash in dark mode).
   Reads optional <html data-ds-light="light" data-ds-dark="dark" data-ds-storage="ds"> (storage = key prefix, as in ds.js).
   Minified copy:

   <script>(function(){try{var h=document.documentElement,p=h.dataset.dsStorage||"ds",l=h.dataset.dsLight||"light",d=h.dataset.dsDark||"dark",m=localStorage.getItem(p+"-theme");if(m!=="light"&&m!=="dark")m="system";var k=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);h.setAttribute("data-theme",k?d:l);h.dataset.dsMode=m;h.dataset.dsScheme=k?"dark":"light";if(localStorage.getItem(p+"-sidebar-collapsed")==="true")h.setAttribute("data-ds-sidebar-collapsed","true")}catch(e){}})();</script>

   Unlike TPS (which stored the resolved theme on the first visit and then ignored the OS), the stored value is the user's
   explicit choice: "light", "dark", or nothing (= follow the OS, live). */
(function () {
  try {
    var html = document.documentElement;
    var prefix = html.dataset.dsStorage || "ds";
    var light = html.dataset.dsLight || "light";
    var dark = html.dataset.dsDark || "dark";
    var mode = localStorage.getItem(prefix + "-theme");
    if (mode !== "light" && mode !== "dark") mode = "system";
    var useDark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    html.setAttribute("data-theme", useDark ? dark : light);
    html.dataset.dsMode = mode;
    html.dataset.dsScheme = useDark ? "dark" : "light";
    if (localStorage.getItem(prefix + "-sidebar-collapsed") === "true") {
      html.setAttribute("data-ds-sidebar-collapsed", "true");
    }
  } catch (e) {
    /* Storage blocked: the server default theme stays. */
  }
})();
