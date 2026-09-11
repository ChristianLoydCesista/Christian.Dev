document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
       PUBLISHING CONFIGURATION
       Leave unavailable project URLs empty so their buttons stay hidden.
       ========================================================= */
  const PORTFOLIO = {
    github: "https://github.com/ChristianLoydCesista",
    linkedin: "",
    email: "christiangcesista@gmail.com",
    resume: "",
    projects: {
      bcis: "https://github.com/ChristianLoydCesista/prototype",
      inventory: "",
      fitstyleLive: "https://christianloydcesista.github.io/fitstyle-3d/",
    },
  };

  /* =========================================================
       RESUME-ALIGNED SELECTED WORK
       Keep the public portfolio consistent with the resume being sent.
       ========================================================= */
  const bcisCopy = document.querySelector("#bcis .project-copy");
  if (bcisCopy) {
    const description = bcisCopy.querySelector("p");
    const tags = bcisCopy.querySelector(".tags");
    const link = bcisCopy.querySelector("[data-project='bcis']");

    if (description) {
      description.textContent =
        "A web-based community intelligence and citizen-service platform supporting household data management, geotagging, assessments, document requests, dashboards, reporting, and role-based administrative workflows.";
    }

    if (tags) {
      tags.innerHTML =
        '<span class="tag">PHP</span><span class="tag">MySQL / MariaDB</span><span class="tag">JavaScript</span><span class="tag">Bootstrap</span><span class="tag">Dompdf</span>';
    }

    if (link) {
      link.childNodes[0].nodeValue = "Source code ";
    }
  }

  const projectCards = document.querySelectorAll("#work .project-card");
  if (projectCards.length >= 2) {
    /* Reuse the portfolio's existing inventory visual until real screenshots are supplied. */
    const inventoryVisualHTML =
      projectCards[1].querySelector(".project-card-visual")?.innerHTML ||
      '<img src="assets/img/expiryapp-ui.svg" alt="Inventory Monitoring System interface concept" />';

    projectCards[0].id = "inventory-monitoring-system";
    projectCards[0].innerHTML = `
      <div class="project-card-visual">${inventoryVisualHTML}</div>
      <div class="project-card-content">
        <h4>Inventory Monitoring System</h4>
        <p>A database-driven application for tracking products and expiration dates, with structured storage, retrieval, monitoring, and expiration notifications to improve inventory visibility and reduce avoidable product loss.</p>
        <div class="tags"><span class="tag">Database-driven</span><span class="tag">Product Tracking</span><span class="tag">Expiry Monitoring</span><span class="tag">Notifications</span></div>
      </div>`;

    projectCards[1].id = "fitstyle-3d";
    projectCards[1].innerHTML = `
      <div class="project-card-visual">
        <img src="assets/img/virtual-fitting-room-ui.svg" alt="FitStyle 3D representative interface showing an interactive human model and fitting controls" />
      </div>
      <div class="project-card-content">
        <h4>FitStyle 3D Virtual Fitting Prototype</h4>
        <p>A browser-based 3D fitting prototype that loads an interactive human model and prepares a reusable modular foundation for garments, accessories, and continued web-based 3D interaction.</p>
        <div class="tags"><span class="tag">JavaScript</span><span class="tag">Three.js</span><span class="tag">GLB / GLTF</span><span class="tag">3D Web</span></div>
        <a class="text-link project-link" data-project="fitstyleLive" hidden>Live demo <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </div>`;
  }

  document.querySelectorAll("#journey .timeline-item").forEach((item) => {
    const heading = item.querySelector("h4");
    if (!heading) return;

    if (
      heading.textContent.trim() === "Personal Project Manager" ||
      heading.textContent.trim() === "ExpiryApp"
    ) {
      heading.textContent = "Inventory Monitoring System";
      const copy = item.querySelector("p");
      if (copy) {
        copy.textContent =
          "Academic project · product tracking, expiration monitoring, structured data, and notifications";
      }
    }

    if (heading.textContent.trim() === "3D Virtual Fitting & Styling Prototype") {
      heading.textContent = "FitStyle 3D Virtual Fitting Prototype";
      const copy = item.querySelector("p");
      if (copy) {
        copy.textContent =
          "Personal project · Three.js human viewer, GLB/GLTF models, garments, and accessory foundation";
      }
    }
  });

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
