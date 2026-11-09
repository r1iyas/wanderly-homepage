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

/* Wanderly: "coming soon" messages (Step 5, reused by Step 6) */
(function () {
  "use strict";

  var toast = document.getElementById("toast");
  var hideTimer = null;

  if (!toast) return;

  function showMessage(text) {
    toast.textContent = text;            // role="status" makes screen readers announce this
    toast.classList.add("is-visible");

    // If another button was clicked a moment ago, restart the countdown
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3000);
  }

  // One listener on the whole page handles every button that has a
  // data-coming-soon attribute, including the ones added in later steps
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-coming-soon]");
    if (button) showMessage(button.getAttribute("data-coming-soon"));
  });
})();

/* Wanderly: contact form validation (Step 8)
   Client-side only: nothing is sent to a server. */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  var hasTriedSubmit = false;

  // Today's date as "YYYY-MM-DD" in the user's own time zone,
  // the same format a date input gives us
  function todayString() {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }

  // Stop the date picker from offering past dates
  form.elements.date.min = todayString();

  // One rule per field. Each returns an error message, or "" if the value is fine.
  var rules = {
    name: function (value) {
      if (value === "") return "Please enter your name.";
      if (value.length < 2) return "Your name should be at least 2 characters.";
      return "";
    },
    email: function (value) {
      if (value === "") return "Please enter your email address.";
      // something@something.something, with no spaces
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email, e.g. name@example.com.";
      return "";
    },
    phone: function (value) {
      if (value === "") return "";                     // optional field
      var digits = value.replace(/[\s-]/g, "");        // ignore spaces and dashes
      // Indian mobile: optional +91 or 0, then 10 digits starting 6 to 9
      if (!/^(\+91|0)?[6-9]\d{9}$/.test(digits)) return "Please enter a valid 10-digit mobile number.";
      return "";
    },
    destination: function (value) {
      return value === "" ? "Please choose a destination." : "";
    },
    date: function (value) {
      if (value === "") return "Please choose a travel date.";
      // "YYYY-MM-DD" strings sort in date order, so a text comparison works
      if (value < todayString()) return "Please choose a date from today onwards.";
      return "";
    },
    travellers: function (value) {
      var number = Number(value);
      if (value === "" || !Number.isInteger(number) || number < 1 || number > 20) {
        return "Please enter a number of travellers from 1 to 20.";
      }
      return "";
    },
    message: function (value) {
      return value.length > 500 ? "Please keep your message under 500 characters." : "";
    }
  };

  // Check one field, then show or clear its error. Returns true if valid.
  function validateField(field) {
    var message = rules[field.name](field.value.trim());
    var errorElement = document.getElementById(field.name + "-error");

    errorElement.textContent = message;
    if (message) {
      field.setAttribute("aria-invalid", "true");      // screen readers say "invalid"; CSS turns it red
    } else {
      field.removeAttribute("aria-invalid");
    }
    return message === "";
  }

  var fields = Object.keys(rules).map(function (name) {
    return form.elements[name];
  });

  fields.forEach(function (field) {
    // Check a field when the user leaves it, but not before they have typed
    // anything (unless they already tried to submit)
    field.addEventListener("blur", function () {
      if (field.value.trim() !== "" || hasTriedSubmit) validateField(field);
    });

    // While a field shows an error, re-check it on every change so the
    // message disappears as soon as it is fixed
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();                            // no backend: stay on the page
    hasTriedSubmit = true;
    status.textContent = "";

    var firstInvalid = null;
    fields.forEach(function (field) {
      var isValid = validateField(field);
      if (!isValid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();                            // take the user straight to the first problem
      return;
    }

    var firstName = form.elements.name.value.trim().split(" ")[0];
    status.textContent = "Thank you, " + firstName + "! Your trip request is ready. " +
      "A travel planner will be in touch within one working day.";

    form.reset();                                      // clear the fields for a fresh start
    hasTriedSubmit = false;
  });
})();

/* Wanderly: keep the footer copyright year current (Step 9) */
(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
