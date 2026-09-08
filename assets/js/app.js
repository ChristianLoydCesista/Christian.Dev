document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
       PUBLISHING CONFIGURATION
       Replace only these values before deploying.
       Leave a value empty to hide its button automatically.
       ========================================================= */
  const PORTFOLIO = {
    github: "",
    linkedin: "",
    email: "",
    resume: "",
    projects: {
      bcis: "",
      projectManager: "",
      inventory: "",
    },
  };

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const moonPath =
    '<path d="M20.4 15.1A8.5 8.5 0 0 1 8.9 3.6 8.5 8.5 0 1 0 20.4 15.1Z"/>';
  const sunPath =
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>';

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme",
    );
    themeIcon.innerHTML = dark ? sunPath : moonPath;
    themeColor.setAttribute("content", dark ? "#0d0d0d" : "#f7f7f4");
  }
  const savedTheme = localStorage.getItem("portfolio-theme");
  const preferredDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (preferredDark ? "dark" : "light"));
  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  function externalize(el, url) {
    if (!url) return;
    el.href = url;
    if (/^https?:\/\//i.test(url)) {
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
    el.hidden = false;
  }
  document
    .querySelectorAll('[data-link="github"]')
    .forEach((el) => externalize(el, PORTFOLIO.github));
  document
    .querySelectorAll('[data-link="linkedin"]')
    .forEach((el) => externalize(el, PORTFOLIO.linkedin));
  document
    .querySelectorAll('[data-link="resume"]')
    .forEach((el) => externalize(el, PORTFOLIO.resume));
  document.querySelectorAll('[data-link="email"]').forEach((el) => {
    if (!PORTFOLIO.email) return;
    el.href = "mailto:" + PORTFOLIO.email;
    el.hidden = false;
  });
  document
    .querySelectorAll("[data-project]")
    .forEach((el) =>
      externalize(el, PORTFOLIO.projects[el.dataset.project] || ""),
    );

  const portrait = document.getElementById("portraitImage");
  const portraitStage = document.getElementById("portraitStage");
  portrait.addEventListener("error", () =>
    portraitStage.classList.add("missing"),
  );

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  }
  menuBtn.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "×" : "☰";
  });
  mobileMenu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    document
      .querySelectorAll(".reveal:not(.visible)")
      .forEach((el) => revealObserver.observe(el));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
  }

  const sectionLinks = [...document.querySelectorAll("#desktopNav a")];
  const sections = sectionLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          sectionLinks.forEach((a) => a.removeAttribute("aria-current"));
          const active = sectionLinks.find(
            (a) => a.getAttribute("href") === "#" + entry.target.id,
          );
          if (active) active.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: 0 },
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
});
