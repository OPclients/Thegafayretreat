const CONFIG = {
  businessName: "The Agafay Retreat",
  address: "Desert d'Agafay, Marrakech-Safi, Maroc",
  whatsappNumber: "212633049321",
  phoneNumber: "+212600111768",
  phoneDisplay: "+212 600 111 768",
  emailAddress: "serenity@agafayretreat.com",
  bookingSubject: "Booking request - The Agafay Retreat"
};

const NAV_ITEMS = [
  { page: "home", href: "index.html", key: "nav_home", label: "Accueil" },
  { page: "about", href: "about.html", key: "nav_about", label: "A propos" },
  { page: "services", href: "services.html", key: "nav_experiences", label: "Services" },
  { page: "contact", href: "contact.html", key: "nav_contact", label: "Contact" }
];

const LEGAL_ITEMS = [
  { page: "privacy", href: "privacy-policy.html", key: "privacy", label: "Politique de confidentialite" },
  { page: "terms", href: "terms.html", key: "terms", label: "Conditions generales" },
  { page: "cancellation", href: "cancellation-policy.html", key: "cancellation", label: "Politique d'annulation" }
];

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
  language: localStorage.getItem("agafayLanguage") || localStorage.getItem("siteLanguage") || "fr"
};

function navLink(item, currentPage) {
  const isActive = item.page === currentPage;
  return `<a href="${item.href}" class="${isActive ? "active" : ""}" ${isActive ? 'aria-current="page"' : ""} data-i18n="${item.key}">${item.label}</a>`;
}

function renderHeader() {
  const mount = document.querySelector("[data-site-nav]");
  if (!mount) return;

  const currentPage = document.body.dataset.page || "";
  const isHome = currentPage === "home";
  const navMarkup = NAV_ITEMS.map((item) => navLink(item, currentPage)).join("");

  mount.innerHTML = `
    <header class="site-header ${isHome ? "" : "is-solid"}" data-header>
      <div class="header-inner">
        <a class="${isHome ? "brand " : ""}logo" href="index.html" aria-label="${CONFIG.businessName} home" data-i18n-aria-label="brand_home_label">
          <img src="./assets/img/logo.png" width="220" height="145" alt="Agafay Silent Logo" data-i18n-alt="logo_alt" />
          ${isHome ? `<span data-i18n="brand_name">${CONFIG.businessName}</span>` : ""}
        </a>

        <nav class="desktop-nav navbar" aria-label="Main navigation" data-i18n-aria-label="nav_main_label">
          ${navMarkup}
        </nav>

        <div class="header-actions">
          <label class="language-select language-wrap">
            <span class="sr-only" data-i18n="language_label">Language</span>
            <select data-language-select aria-label="Language" data-i18n-aria-label="language_label">
              <option value="en" data-i18n="language_option_en">EN</option>
              <option value="fr" data-i18n="language_option_fr">FR</option>
              <option value="ar" data-i18n="language_option_ar">AR</option>
              <option value="de" data-i18n="language_option_de">DE</option>
              <option value="it" data-i18n="language_option_it">IT</option>
              <option value="pt" data-i18n="language_option_pt">PT</option>
            </select>
          </label>
          <a class="btn btn-primary button button-primary header-cta header-button" href="contact.html" data-i18n="book_now">Reserver</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
            <span class="sr-only" data-i18n="menu_toggle">Open menu</span>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div class="mobile-menu" id="mobile-menu" data-mobile-menu>
        <nav aria-label="Mobile navigation" data-i18n-aria-label="nav_mobile_label">
          ${navMarkup}
        </nav>
        <a class="btn btn-primary button button-primary" href="contact.html" data-i18n="book_now">Reserver</a>
      </div>
    </header>
  `;
}

function renderFooter() {
  const mount = document.querySelector("[data-site-footer]");
  if (!mount) return;

  const currentPage = document.body.dataset.page || "";
  const mainLinks = NAV_ITEMS.map((item) => `<a href="${item.href}" data-i18n="${item.key}">${item.label}</a>`).join("");
  const legalLinks = LEGAL_ITEMS.map((item) => {
    const isActive = item.page === currentPage;
    return `<a href="${item.href}" ${isActive ? 'class="active" aria-current="page"' : ""} data-i18n="${item.key}">${item.label}</a>`;
  }).join("");
  const mailtoHref = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent(CONFIG.bookingSubject)}`;

  mount.innerHTML = `
    <footer class="site-footer footer">
      <div class="container footer-grid">
        <div>
          <img class="footer-logo" src="./assets/img/logo.png" width="220" height="145" alt="Agafay Silent Logo" data-i18n-alt="logo_alt" loading="lazy" />
          <h2 data-i18n="brand_name">${CONFIG.businessName}</h2>
          <p data-i18n="footer_desc">Un sanctuaire de silence pur au coeur du desert de pierre. Cree pour ceux qui recherchent un repos profond et une connexion avec l'horizon.</p>
          <p data-i18n="footer_address">${CONFIG.address}</p>
        </div>

        <nav aria-label="Explore" data-i18n-aria-label="nav_explore_label">
          <h2 data-i18n="explore">Explorer</h2>
          ${mainLinks}
        </nav>

        <nav aria-label="Information" data-i18n-aria-label="nav_information_label">
          <h3 data-i18n="info_heading">Informations</h3>
          ${legalLinks}
        </nav>

        <div>
          <h2 data-i18n="footer_contact">Contact</h2>
          <p data-i18n="footer_contact_text">Reservation rapide par WhatsApp, telephone ou email.</p>
          <a href="https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=" target="_blank" rel="noopener" data-whatsapp-link data-i18n="mobile_whatsapp">WhatsApp</a>
          <a href="tel:${CONFIG.phoneNumber}" data-phone-link data-i18n="mobile_call">Appeler</a>
          <a href="${mailtoHref}" data-email-link data-i18n="email">Email</a>
          <p>${CONFIG.phoneDisplay}</p>
          <p>${CONFIG.emailAddress}</p>
          <label class="footer-language">
            <span data-i18n="language_label">Language</span>
            <select data-footer-language aria-label="Language" data-i18n-aria-label="language_label">
              <option value="en" data-i18n="language_option_en">EN</option>
              <option value="fr" data-i18n="language_option_fr">FR</option>
              <option value="ar" data-i18n="language_option_ar">AR</option>
              <option value="de" data-i18n="language_option_de">DE</option>
              <option value="it" data-i18n="language_option_it">IT</option>
              <option value="pt" data-i18n="language_option_pt">PT</option>
            </select>
          </label>
        </div>
      </div>
      <div class="container footer-bottom">
        <span data-i18n="copyright">Copyright 2024 Agafay Silent Retreat. Tous droits reserves.</span>
        <span>${legalLinks}</span>
      </div>
    </footer>

    <div class="mobile-cta-bar">
      <a href="https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=" target="_blank" rel="noopener" data-whatsapp-link data-i18n="mobile_whatsapp">WhatsApp</a>
      <a href="contact.html" data-i18n="mobile_book">Reserver</a>
      <a href="tel:${CONFIG.phoneNumber}" data-phone-link data-i18n="mobile_call">Appeler</a>
    </div>
    ${currentPage === "home" ? `<a class="whatsapp-float" href="https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=" target="_blank" rel="noopener noreferrer nofollow" data-whatsapp-link data-i18n="mobile_whatsapp">WhatsApp</a>` : ""}
  `;
}

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
    link.href = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent(CONFIG.bookingSubject)}`;
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
  renderHeader();
  renderFooter();
  setupHeader();
  setupLanguages();
  setupBookingForm();
  setupAccordion();
  setupGallery();
  setupReveal();
});
