const selectors = {
  header: "[data-header]",
  menuToggle: "[data-menu-toggle]",
  mobileMenu: "[data-mobile-menu]",
  language: "[data-language-select]",
  footerLanguage: "[data-footer-language]",
  reveal: ".reveal",
  track: "[data-testimonial-track]",
  prev: "[data-prev]",
  next: "[data-next]",
  newsletter: "[data-newsletter-form]",
  form: "[data-booking-form]",
  accordion: "[data-accordion]"
};

const state = {
  language: localStorage.getItem("agafayLanguage") || "en"
};

function t(key) {
  return (translations[state.language] && translations[state.language][key]) || translations.en[key] || key;
}

function setLanguage(language) {
  if (!translations[language]) return;
  state.language = language;
  localStorage.setItem("agafayLanguage", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });

  document.querySelectorAll(`${selectors.language}, ${selectors.footerLanguage}`).forEach((select) => {
    select.value = language;
  });
}

function setupHeader() {
  const header = document.querySelector(selectors.header);
  const toggle = document.querySelector(selectors.menuToggle);
  const menu = document.querySelector(selectors.mobileMenu);
  if (!header || !toggle || !menu) return;

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    header.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    menu.classList.toggle("is-open", willOpen);
    header.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function setupLanguages() {
  document.querySelectorAll(`${selectors.language}, ${selectors.footerLanguage}`).forEach((select) => {
    select.addEventListener("change", (event) => setLanguage(event.target.value));
  });
  setLanguage(state.language);
}

function setupTestimonials() {
  const track = document.querySelector(selectors.track);
  const prev = document.querySelector(selectors.prev);
  const next = document.querySelector(selectors.next);
  if (!track || !prev || !next) return;

  const scrollByCard = (direction) => {
    const card = track.querySelector(".testimonial-card");
    if (!card) return;
    const gap = parseInt(window.getComputedStyle(track).gap, 10) || 18;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  prev.addEventListener("click", () => scrollByCard(-1));
  next.addEventListener("click", () => scrollByCard(1));
}

function setupNewsletter() {
  const form = document.querySelector(selectors.newsletter);
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
  });
}

function setupBookingForm() {
  const form = document.querySelector(selectors.form);
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const lines = [
      t("whatsapp_intro"),
      "",
      `${t("form_name")}: ${(data.get("name") || "").trim() || "-"}`,
      `${t("form_email")}: ${(data.get("email") || "").trim() || "-"}`,
      `${t("form_phone")}: ${(data.get("phone") || "").trim() || "-"}`,
      `${t("form_date")}: ${data.get("date") || "-"}`,
      `${t("form_guests")}: ${data.get("guests") || "-"}`,
      `${t("form_interest")}: ${data.get("interest") || "-"}`,
      `${t("form_message")}: ${(data.get("message") || "").trim() || "-"}`
    ];
    window.open(`https://api.whatsapp.com/send?phone=212633049321&text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
}

function setupAccordion() {
  document.querySelectorAll(`${selectors.accordion} .faq-item button`).forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function setupReveal() {
  const nodes = document.querySelectorAll(selectors.reveal);
  if (!nodes.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  nodes.forEach((node) => observer.observe(node));
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupLanguages();
  setupTestimonials();
  setupNewsletter();
  setupBookingForm();
  setupAccordion();
  setupReveal();
});
