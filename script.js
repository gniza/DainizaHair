// Troque somente este número pelo WhatsApp da Dainiza (DDI + DDD + número).
const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE = "Olá, Dainiza! Vim pelo seu site e gostaria de agendar um horário.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const closeMenu = () => {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

toggle.addEventListener("click", () => {
  const willOpen = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(willOpen));
  toggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("[data-year]").textContent = new Date().getFullYear();
