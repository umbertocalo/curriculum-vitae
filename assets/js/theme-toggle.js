(function () {
  const root = document.documentElement;
  const KEY = "theme";

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "light" : "dark";
  }

  function current() {
    return localStorage.getItem(KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  apply(current());

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    apply(current());
    btn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      apply(next);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "d" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        btn.click();
      }
    });
  });
})();
