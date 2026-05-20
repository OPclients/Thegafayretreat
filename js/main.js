const CONFIG = {
  whatsappNumber: "212633049321",
  phoneNumber: "+212600111768",
  emailAddress: "serenity@agafayretreat.com"
};

const selectors = {
  header: "[data-header]",
  menuToggle: "[data-menu-toggle]",
  mobileMenu: "[data-mobile-menu]",
  language: "[data-language-select]",
  footerLanguage: "[data-footer-language]",
  reveal: ".reveal",
  form: "[data-booking-form]",
  accordion: "[data-accordion]",
  whatsappLink: "[data-whatsapp-link]",
  phoneLink: "[data-phone-link]",
  emailLink: "[data-email-link]",
  galleryFilter: "[data-gallery-filter]",
  galleryItem: "[data-gallery-item]"
};

const state = {
  language: localStorage.getItem("agafayLanguage") || localStorage.getItem("siteLanguage") || "en"
};

function translate(key) {
  return (translations[state.language] && translations[state.language][key]) || translations.en[key] || key;
}

function setLanguage(language) {
  if (!translations[language]) return;

  state.language = language;
  localStorage.setItem("agafayLanguage", language);
  localStorage.setItem("siteLanguage", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = translate(node.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", translate(node.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-content]").forEach((node) => {
    node.setAttribute("content", translate(node.dataset.i18nContent));
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
    node.setAttribute("alt", translate(node.dataset.i18nAlt));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", translate(node.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", translate(node.dataset.i18nTitle));
  });

  document.querySelectorAll(`${selectors.language}, ${selectors.footerLanguage}`).forEach((select) => {
    select.value = language;
  });

  const translatedTitle = translate("meta_title");
  if (translatedTitle !== "meta_title") {
    document.title = translatedTitle;
  }
}

function setupContactLinks() {
  const message = encodeURIComponent(translate("whatsapp_default_message"));
  document.querySelectorAll(selectors.whatsappLink).forEach((link) => {
    link.href = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${message}`;
  });
  document.querySelectorAll(selectors.phoneLink).forEach((link) => {
    link.href = `tel:${CONFIG.phoneNumber}`;
  });
  document.querySelectorAll(selectors.emailLink).forEach((link) => {
    link.href = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent("Booking request - The Agafay Retreat")}`;
  });
}

function setupHeader() {
  const header = document.querySelector(selectors.header);
  const toggle = document.querySelector(selectors.menuToggle);
  const menu = document.querySelector(selectors.mobileMenu);
  if (!header || !toggle || !menu) return;

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
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
    select.addEventListener("change", (event) => {
      setLanguage(event.target.value);
      setupContactLinks();
    });
  });
  setLanguage(state.language);
  setupContactLinks();
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
      translate("whatsapp_intro"),
      "",
      `${translate("form_name")}: ${(data.get("name") || "").trim() || "-"}`,
      `${translate("form_email")}: ${(data.get("email") || "").trim() || "-"}`,
      `${translate("form_phone")}: ${(data.get("phone") || "").trim() || "-"}`,
      `${translate("form_date")}: ${data.get("date") || "-"}`,
      `${translate("form_guests")}: ${data.get("guests") || "-"}`,
      `${translate("form_interest")}: ${data.get("interest") || "-"}`,
      `${translate("form_message")}: ${(data.get("message") || "").trim() || "-"}`
    ];

    const url = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
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

function setupGallery() {
  const filters = document.querySelectorAll(selectors.galleryFilter);
  const items = document.querySelectorAll(selectors.galleryItem);
  if (!filters.length || !items.length) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.galleryFilter;
      filters.forEach((node) => node.classList.toggle("is-active", node === button));
      items.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.galleryItem === filter;
        item.hidden = !shouldShow;
      });
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
    { threshold: 0.13 }
  );

  nodes.forEach((node) => observer.observe(node));
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupLanguages();
  setupBookingForm();
  setupAccordion();
  setupGallery();
  setupReveal();
});
