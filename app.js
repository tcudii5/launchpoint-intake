(function () {
  "use strict";

  var form = document.getElementById("intake");
  if (!form) return;

  var sections = Array.prototype.slice.call(document.querySelectorAll(".doc-section"));
  var allFields = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));
  var trackFill = document.getElementById("trackFill");
  var fillStat = document.getElementById("fillStat");
  var jumplinks = Array.prototype.slice.call(document.querySelectorAll(".jumprail a"));

  function fieldHasValue(f) {
    if (f.type === "radio" || f.type === "checkbox") return f.checked;
    if (f.name === "company") return false; // honeypot, never counts
    return f.value.trim().length > 0;
  }

  function uniqueNames() {
    var seen = {};
    allFields.forEach(function (f) {
      if (f.name && f.name !== "company" && f.name !== "form-name") seen[f.name] = true;
    });
    return Object.keys(seen);
  }

  function updateFillStat() {
    var names = uniqueNames();
    var filled = 0;
    names.forEach(function (name) {
      var group = form.querySelectorAll('[name="' + name.replace(/"/g, '\\"') + '"]');
      var any = Array.prototype.some.call(group, fieldHasValue);
      if (any) filled += 1;
    });
    var pct = names.length ? Math.round((filled / names.length) * 100) : 0;
    trackFill.style.width = pct + "%";
    fillStat.textContent = pct + "% filled";
  }

  form.addEventListener("input", updateFillStat);
  form.addEventListener("change", updateFillStat);
  updateFillStat();

  var sectionTargets = sections.concat([document.getElementById("send")]);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          jumplinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionTargets.forEach(function (s) {
      io.observe(s);
    });
  }

  // Disable the submit button after click so a slow connection doesn't
  // invite a double-submit; the page is about to navigate away anyway.
  form.addEventListener("submit", function () {
    var btn = document.getElementById("submitBtn");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending…";
    }
  });
})();
