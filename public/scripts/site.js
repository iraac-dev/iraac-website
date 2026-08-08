document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
  }
  // Mobile dropdown toggle — click "More" to expand subnav
  document.querySelectorAll(".nav-dd-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var li = btn.closest(".nav-dropdown");
      if (li) {
        li.classList.toggle("open");
        btn.setAttribute("aria-expanded", li.classList.contains("open") ? "true" : "false");
      }
      e.stopPropagation();
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-dropdown.open").forEach(function (li) {
      li.classList.remove("open");
      var btn = li.querySelector(".nav-dd-toggle");
      if (btn) { btn.setAttribute("aria-expanded", "false"); }
    });
  });
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-note");
      if (note) { note.textContent = "Thanks \u2014 this demo form doesn't send yet. Connect it to an email address or form service to go live."; note.style.display = "block"; }
    });
  }
  var survey = document.getElementById("iraac-survey");
  if (survey) {
    survey.addEventListener("submit", function (e) {
      e.preventDefault();
      survey.style.display = "none";
      var thanks = document.getElementById("survey-thanks");
      if (thanks) { thanks.style.display = "block"; thanks.scrollIntoView({behavior: "smooth", block: "start"}); }
    });
  }
});
