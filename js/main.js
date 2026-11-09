/* Wanderly: mobile navigation (Step 3) */
(function () {
  "use strict";

  var MOBILE_QUERY = window.matchMedia("(max-width: 767px)");
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (!header || !toggle || !nav) return;

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!header.classList.contains("is-open"));
  });

  // Close the menu when a link is chosen
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });

  // Close with the Escape key and return focus to the toggle
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Reset the menu when the screen becomes wide enough for the desktop nav
  function handleResize() {
    if (!MOBILE_QUERY.matches) setMenu(false);
  }
  if (MOBILE_QUERY.addEventListener) {
    MOBILE_QUERY.addEventListener("change", handleResize);
  } else {
    MOBILE_QUERY.addListener(handleResize); // older browsers
  }
})();
