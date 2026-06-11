/* =========================================================
   ARIANA · FISIOTERAPIA — main.js  (vanilla, IIFE)
   Cada init va envuelto en safe() para que un fallo
   no rompa el resto de la página.
   ========================================================= */
(function () {
  "use strict";

  var cfg = window.__ARIANA__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---- WhatsApp helper ---- */
  function waLink(customMsg) {
    var num = String(cfg.whatsapp || "").replace(/[^0-9]/g, "");
    var msg = customMsg || cfg.whatsappMsg || "Hola";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  function initWhatsApp() {
    var base = waLink();
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.setAttribute("href", base);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---- Nav: estado al hacer scroll ---- */
  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Menú móvil ---- */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    var close = function () {
      toggle.classList.remove("is-open");
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };
    var open = function () {
      toggle.classList.add("is-open");
      links.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
    };

    toggle.addEventListener("click", function () {
      if (links.classList.contains("is-open")) close(); else open();
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) close();
    });
  }

  /* ---- Reveal on scroll ---- */
  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });

    items.forEach(function (el) { io.observe(el); });

    /* Red de seguridad: a los 6s revela lo que siga oculto y visible en pantalla */
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---- Count-up ---- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count-to]");
    if (!nums.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count-to")) || 0;
      if (reduced || !("IntersectionObserver" in window)) { el.textContent = target; return; }
      var start = null, dur = 1300;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---- FAQ acordeón ---- */
  function initFAQ() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          var b = other.querySelector(".faq-q");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---- Formulario → WhatsApp ---- */
  function initForm() {
    var form = document.getElementById("reservaForm");
    if (!form) return;
    var note = form.querySelector("[data-form-note]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = (form.nombre.value || "").trim();
      var contacto = (form.telefono.value || "").trim();
      var motivo = form.motivo.value || "";
      var mensaje = (form.mensaje.value || "").trim();

      if (note) { note.className = "form-note"; note.textContent = ""; }

      if (!nombre || !contacto) {
        if (note) { note.classList.add("is-error"); note.textContent = "Por favor, completa tu nombre y un medio de contacto."; }
        if (!nombre) form.nombre.focus(); else form.telefono.focus();
        return;
      }

      var text = "Hola Ariana, soy " + nombre + "."
        + "\nMe gustaría reservar una consulta de fisioterapia."
        + "\n• Motivo: " + motivo
        + "\n• Contacto: " + contacto
        + (mensaje ? "\n• Mensaje: " + mensaje : "");

      window.open(waLink(text), "_blank", "noopener");

      if (note) {
        note.classList.add("is-ok");
        note.textContent = "¡Genial, " + nombre + "! Te redirijo a WhatsApp para confirmar tu reserva.";
      }
      form.reset();
    });
  }

  /* ---- WhatsApp flotante: aparece tras hacer scroll ---- */
  function initWaFloat() {
    var fab = document.querySelector(".wa-float");
    if (!fab) return;
    var onScroll = function () {
      if (window.scrollY > 280) fab.classList.add("is-in");
      else fab.classList.remove("is-in");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Email desde config.js ---- */
  function initContact() {
    if (!cfg.email) return;
    document.querySelectorAll("[data-email-link]").forEach(function (a) {
      a.setAttribute("href", "mailto:" + cfg.email);
    });
    document.querySelectorAll("[data-email-text]").forEach(function (s) {
      s.textContent = cfg.email;
    });
  }

  /* ---- Año en el footer ---- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---- Boot ---- */
  function boot() {
    safe(initWhatsApp, "initWhatsApp");
    safe(initNav, "initNav");
    safe(initMobileMenu, "initMobileMenu");
    safe(initReveals, "initReveals");
    safe(initCounters, "initCounters");
    safe(initFAQ, "initFAQ");
    safe(initForm, "initForm");
    safe(initWaFloat, "initWaFloat");
    safe(initContact, "initContact");
    safe(initYear, "initYear");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
