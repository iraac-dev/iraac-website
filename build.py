# -*- coding: utf-8 -*-
# Builds the flat, multi-page IRAAC website (7 self-contained HTML files,
# CSS/JS inlined in each) with hero photography and the "charity, not
# government" + multi-channel contact content added after the clickable
# prototype review.

IMG = {
    "hero": "https://picsum.photos/seed/iraac-hero/1800/1000",
    "art": "https://picsum.photos/seed/iraac-art-placeholder/900/900",
    "about": "https://picsum.photos/seed/iraac-community/1200/900",
    "mcc": "https://picsum.photos/seed/iraac-mcc/900/650",
    "youthscape": "https://picsum.photos/seed/iraac-youth/900/650",
    "thecrew": "https://picsum.photos/seed/iraac-crew/900/650",
    "darc": "https://picsum.photos/seed/iraac-darc/900/650",
    "governance": "https://picsum.photos/seed/iraac-meeting/1200/800",
    "support": "https://picsum.photos/seed/iraac-support/1200/800",
    "office": "https://picsum.photos/seed/iraac-office/700/500",
    "news1": "https://picsum.photos/seed/iraac-news1/700/500",
    "news2": "https://picsum.photos/seed/iraac-news2/700/500",
}

SURVEY_URL = "survey.html"

CSS = """
:root {
  --charcoal: #201c1a;
  --charcoal-soft: #322b26;
  --cream: #faf6ef;
  --sand: #f0e6d6;
  --ochre: #c1631f;
  --ochre-dark: #8f4416;
  --text: #2b2724;
  --muted: #6b625a;
  --max-width: 1120px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: var(--text); background: var(--cream); line-height: 1.6; }
a { color: inherit; }
img { max-width: 100%; display: block; }
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
header.site-header { background: var(--charcoal); color: var(--cream); position: sticky; top: 0; z-index: 50; }
.header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; max-width: var(--max-width); margin: 0 auto; }
.wordmark { font-size: 1.5rem; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; color: var(--cream); }
.wordmark span { color: var(--ochre); }
nav.main-nav ul { list-style: none; display: flex; gap: 22px; margin: 0; padding: 0; flex-wrap: wrap; }
nav.main-nav a { text-decoration: none; color: var(--sand); font-size: 0.92rem; font-weight: 500; border-bottom: 2px solid transparent; padding-bottom: 4px; }
nav.main-nav a:hover, nav.main-nav a.active { color: var(--ochre); border-bottom-color: var(--ochre); }
.nav-toggle { display: none; background: none; border: none; color: var(--cream); font-size: 1.6rem; cursor: pointer; }
@media (max-width: 860px) {
  nav.main-nav { display: none; width: 100%; padding: 0 0 14px; }
  nav.main-nav.open { display: block; }
  nav.main-nav ul { flex-direction: column; gap: 12px; }
  .header-inner { flex-wrap: wrap; }
  .nav-toggle { display: block; }
}
.hero { position: relative; color: var(--cream); padding: 110px 0 90px; background-size: cover; background-position: center; isolation: isolate; }
.hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(20,16,14,0.88) 10%, rgba(32,28,26,0.55) 65%, rgba(32,28,26,0.35) 100%); z-index: -1; }
.hero .container { max-width: 760px; }
.eyebrow { color: var(--ochre); text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.8rem; font-weight: 700; margin-bottom: 14px; }
.hero h1 { font-size: 2.7rem; line-height: 1.15; margin: 0 0 20px; }
.hero p { font-size: 1.15rem; color: var(--sand); max-width: 620px; }
.page-hero { position: relative; color: var(--cream); padding: 70px 0 60px; background-size: cover; background-position: center; isolation: isolate; }
.page-hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(20,16,14,0.90) 20%, rgba(32,28,26,0.6) 100%); z-index: -1; }
.page-hero h1 { font-size: 2.2rem; margin: 0 0 12px; }
.page-hero p { color: var(--sand); max-width: 640px; font-size: 1.05rem; }
.btn { display: inline-block; padding: 13px 26px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.95rem; margin-right: 14px; margin-top: 10px; }
.btn-primary { background: var(--ochre); color: var(--cream); }
.btn-primary:hover { background: var(--ochre-dark); }
.btn-outline { background: transparent; color: var(--cream); border: 1px solid rgba(250,246,239,0.5); }
.btn-outline:hover { border-color: var(--ochre); color: var(--ochre); }
section { padding: 64px 0; }
section.alt { background: var(--sand); }
h2.section-title { font-size: 1.9rem; margin: 0 0 14px; }
p.section-lead { color: var(--muted); max-width: 680px; font-size: 1.05rem; margin-bottom: 40px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 28px; }
.card { background: #fff; border: 1px solid rgba(0,0,0,0.06); border-radius: 10px; overflow: hidden; }
.card img { width: 100%; height: 160px; object-fit: cover; }
.card .card-body { padding: 22px; }
.card h3 { margin: 0 0 10px; font-size: 1.15rem; color: var(--ochre-dark); }
.card p { color: var(--muted); font-size: 0.96rem; margin: 0; }
.card a.card-link { display: inline-block; margin-top: 14px; font-weight: 600; color: var(--ochre); text-decoration: none; font-size: 0.9rem; }
.two-col { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: center; }
.two-col img { border-radius: 10px; width: 100%; height: 340px; object-fit: cover; }
@media (max-width: 860px) { .two-col { grid-template-columns: 1fr; } .two-col img { height: 220px; } }
.program-block { padding: 48px 0; border-bottom: 1px solid rgba(0,0,0,0.08); }
.program-block:last-child { border-bottom: none; }
.program-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 6px; }
.program-hero img { border-radius: 10px; height: 280px; width: 100%; object-fit: cover; }
@media (max-width: 860px) { .program-hero { grid-template-columns: 1fr; } .program-hero img { height: 200px; } }
.program-block .tag { display: inline-block; background: var(--sand); color: var(--charcoal); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; border-radius: 3px; margin-bottom: 12px; }
.program-block h2 { font-size: 1.7rem; color: var(--ochre-dark); margin: 0 0 12px; }
.note-box { background: var(--sand); border-left: 4px solid var(--ochre); padding: 18px 22px; border-radius: 4px; font-size: 0.95rem; color: var(--charcoal-soft); margin: 24px 0; }
.contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 24px; }
.contact-card { background: #fff; border: 1px solid rgba(0,0,0,0.06); border-radius: 10px; padding: 26px; }
.contact-card .icon { font-size: 1.8rem; margin-bottom: 10px; }
.contact-card h3 { margin: 0 0 8px; font-size: 1.1rem; color: var(--ochre-dark); }
.contact-card p { color: var(--muted); font-size: 0.93rem; margin: 0 0 14px; }
form.contact-form { display: grid; gap: 16px; max-width: 560px; }
form.contact-form label { font-weight: 600; font-size: 0.9rem; display: block; margin-bottom: 6px; }
form.contact-form input, form.contact-form select, form.contact-form textarea { width: 100%; padding: 12px 14px; border: 1px solid rgba(0,0,0,0.15); border-radius: 4px; font-size: 0.95rem; font-family: inherit; }
.news-item { display: grid; grid-template-columns: 220px 1fr; gap: 24px; padding: 26px 0; border-bottom: 1px solid rgba(0,0,0,0.08); align-items: center; }
.news-item img { border-radius: 8px; height: 130px; width: 100%; object-fit: cover; }
@media (max-width: 700px) { .news-item { grid-template-columns: 1fr; } .news-item img { height: 160px; } }
.news-item .date { font-size: 0.8rem; color: var(--ochre); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.news-item h3 { margin: 6px 0 8px; }
.acknowledgement { background: var(--charcoal-soft); color: var(--sand); font-size: 0.88rem; padding: 16px 0; }
footer.site-footer { background: var(--charcoal); color: var(--sand); padding: 48px 0 28px; margin-top: 40px; }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-bottom: 30px; }
.footer-grid h4 { color: var(--cream); margin: 0 0 12px; font-size: 0.95rem; }
.footer-grid ul { list-style: none; padding: 0; margin: 0; }
.footer-grid li { margin-bottom: 8px; }
.footer-grid a { color: var(--sand); text-decoration: none; font-size: 0.92rem; }
.footer-grid a:hover { color: var(--ochre); }
.footer-bottom { border-top: 1px solid rgba(250,246,239,0.12); padding-top: 20px; font-size: 0.82rem; color: rgba(250,246,239,0.6); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }

/* Front door — the very first thing visible on every page: four ways to reach IRAAC */
.frontdoor { background: var(--charcoal); border-bottom: 3px solid var(--ochre); padding: 30px 0; }
.frontdoor-head { margin-bottom: 20px; }
.frontdoor-head h2 { color: var(--cream); font-size: 1.4rem; margin: 0 0 6px; }
.frontdoor-head p { color: var(--sand); margin: 0; font-size: 0.98rem; }
.frontdoor-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.fd-card { display: block; background: var(--charcoal-soft); border: 1px solid rgba(250,246,239,0.14); border-radius: 10px; padding: 20px 18px; text-decoration: none; transition: border-color .15s, transform .15s; }
.fd-card:hover { border-color: var(--ochre); transform: translateY(-2px); }
.fd-card.is-primary { background: var(--ochre); border-color: var(--ochre); }
.fd-card .fd-icon { font-size: 1.6rem; display: block; margin-bottom: 10px; }
.fd-card h3 { color: var(--cream); font-size: 1.02rem; margin: 0 0 6px; }
.fd-card p { color: var(--sand); font-size: 0.85rem; margin: 0; line-height: 1.4; }
.fd-card.is-primary p { color: rgba(250,246,239,0.92); }
@media (max-width: 900px) { .frontdoor-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .frontdoor-grid { grid-template-columns: 1fr; } .frontdoor { padding: 24px 0; } }

/* Hero with artwork panel */
.hero-flex { position: relative; background: linear-gradient(120deg, var(--charcoal) 0%, var(--charcoal-soft) 100%); color: var(--cream); isolation: isolate; }
.hero-flex .container { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; padding-top: 70px; padding-bottom: 70px; max-width: var(--max-width); }
.hero-flex .art-panel { border-radius: 14px; overflow: hidden; position: relative; height: 340px; }
.hero-flex .art-panel img { width: 100%; height: 100%; object-fit: cover; }
.hero-flex .art-panel .art-caption { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(20,16,14,0.72); color: var(--sand); font-size: 0.72rem; padding: 8px 12px; }
@media (max-width: 900px) { .hero-flex .container { grid-template-columns: 1fr; } .hero-flex .art-panel { height: 220px; } }
.hero-flex h1 { font-size: 2.5rem; line-height: 1.15; margin: 0 0 18px; }
.hero-flex p { font-size: 1.1rem; color: var(--sand); max-width: 560px; }

/* Survey */
.survey-shell { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 36px; max-width: 640px; }
.survey-step-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ochre); font-weight: 700; margin-bottom: 8px; }
.q-block { margin-bottom: 28px; }
.q-block > label.q-title { display: block; font-weight: 700; margin-bottom: 10px; font-size: 1rem; }
.q-help { font-size: 0.85rem; color: var(--muted); margin: -6px 0 10px; }
.option-row { display: flex; flex-wrap: wrap; gap: 10px; }
.option-pill { border: 1px solid rgba(0,0,0,0.15); border-radius: 8px; padding: 10px 14px; font-size: 0.9rem; cursor: pointer; background: #fff; }
.option-pill input { margin-right: 8px; }
.option-pill:has(input:checked) { border-color: var(--ochre); background: var(--sand); }
.consent-box { background: var(--sand); border-radius: 8px; padding: 16px 18px; font-size: 0.85rem; color: var(--charcoal-soft); margin-top: 6px; }

/* Office locator */
.map-embed { width: 100%; height: 420px; border: 0; border-radius: 12px; }
.office-list { display: grid; gap: 14px; margin-top: 24px; }
.office-item { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.office-item h4 { margin: 0 0 4px; color: var(--ochre-dark); }
.office-item p { margin: 0; color: var(--muted); font-size: 0.9rem; }

/* Insights blog */
.insight-post { padding: 40px 0; border-bottom: 1px solid rgba(0,0,0,0.08); }
.insight-post:last-child { border-bottom: none; }
.insight-post .insight-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.insight-post .insight-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; background: var(--sand); color: var(--charcoal); padding: 4px 10px; border-radius: 3px; }
.insight-post .insight-date { font-size: 0.85rem; color: var(--muted); }
.insight-post h2 { font-size: 1.55rem; color: var(--ochre-dark); margin: 0 0 14px; }
.insight-post p { color: var(--charcoal-soft); max-width: 720px; }
.insight-post p + p { margin-top: 12px; }
.insight-post.is-featured { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-top: 5px solid var(--ochre); border-radius: 12px; padding: 34px; margin: 8px 0 48px; box-shadow: 0 12px 32px rgba(32,28,26,0.06); }
.insight-post.is-featured h2 { font-size: 2rem; line-height: 1.2; }
.survey-report-intro { font-size: 1.08rem; }
.survey-report-callout { background: var(--sand); border-left: 4px solid var(--ochre); border-radius: 4px; padding: 18px 20px; margin: 24px 0 30px; }
.survey-report-callout p { margin: 0; }
.survey-report-section { margin-top: 32px; }
.survey-report-section h3 { color: var(--ochre-dark); font-size: 1.25rem; margin: 0 0 10px; }
.survey-report-section ul { margin: 12px 0 0; padding-left: 22px; color: var(--charcoal-soft); }
.survey-report-section li + li { margin-top: 9px; }
.survey-report-audiences { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
.survey-report-audience { background: var(--cream); border: 1px solid rgba(0,0,0,0.07); border-radius: 8px; padding: 20px; }
.survey-report-audience h4 { color: var(--ochre-dark); font-size: 1rem; margin: 0 0 8px; }
.survey-report-audience p { font-size: 0.94rem; margin: 0; }
.survey-report-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.survey-report-actions .btn { margin: 0; }
.survey-report-actions .btn-outline { color: var(--ochre-dark); border-color: var(--ochre-dark); }
@media (max-width: 640px) {
  .insight-post.is-featured { padding: 26px 20px; }
  .insight-post.is-featured h2 { font-size: 1.65rem; }
  .survey-report-audiences { grid-template-columns: 1fr; }
  .survey-report-actions .btn { width: 100%; text-align: center; }
}

/* Sector / system explainer */
.system-block { padding: 40px 0; border-bottom: 1px solid rgba(0,0,0,0.08); }
.system-block:last-child { border-bottom: none; }
.system-block .system-kicker { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 3px; margin-bottom: 10px; background: var(--sand); color: var(--charcoal); }
.system-block .system-kicker.is-emerging { background: rgba(193,99,31,0.14); color: var(--ochre-dark); }
.system-block h3 { font-size: 1.35rem; color: var(--ochre-dark); margin: 0 0 12px; }
.system-block p { color: var(--charcoal-soft); max-width: 760px; }
.system-block p + p { margin-top: 12px; }

/* Book a call */
.call-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 36px; max-width: 560px; }
.call-card .duration { display:inline-block; background: var(--sand); color: var(--charcoal); font-weight:700; font-size:0.8rem; padding:5px 12px; border-radius:999px; margin-bottom:16px; }
"""

JS = """
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
  }
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-note");
      if (note) { note.textContent = "Thanks \\u2014 this demo form doesn't send yet. Connect it to an email address or form service to go live."; note.style.display = "block"; }
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
"""

NAV_ITEMS = [
    ("index.html", "Home"),
    ("about.html", "Our Story"),
    ("programs.html", "Our Programs"),
    ("governance.html", "Governance & Reporting"),
    ("support.html", "Supporting Other Organisations"),
    ("news.html", "News"),
    ("insights.html", "Insights"),
    ("contact.html", "Contact"),
]

def header(active):
    links = ""
    for href, label in NAV_ITEMS:
        cls = ' class="active"' if href == active else ""
        links += f'<li><a href="{href}"{cls}>{label}</a></li>\n'
    return f"""<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="wordmark">IRAAC<span>.</span></a>
    <button class="nav-toggle" aria-label="Toggle menu">&#9776;</button>
    <nav class="main-nav"><ul>{links}</ul></nav>
  </div>
</header>
"""

QUICKBAR = f"""<section class="frontdoor">
  <div class="container">
    <div class="frontdoor-head">
      <h2>Get in Touch &mdash; Choose What Works for You</h2>
      <p>Whatever brings you here, IRAAC is here to help. Pick one of the four options below to get started right now.</p>
    </div>
    <div class="frontdoor-grid">
      <a class="fd-card is-primary" href="book-a-call.html">
        <span class="fd-icon">&#128197;</span>
        <h3>Book a Free 15-Min Call</h3>
        <p>Speak with an experienced IRAAC officer &mdash; free, no obligation, over the phone.</p>
      </a>
      <a class="fd-card" href="offices.html">
        <span class="fd-icon">&#127968;</span>
        <h3>Visit a Local Office</h3>
        <p>Drop in and speak with someone from IRAAC face to face.</p>
      </a>
      <a class="fd-card" href="contact.html#home-visit">
        <span class="fd-icon">&#128100;</span>
        <h3>Request a Home Visit</h3>
        <p>Ask an IRAAC officer to come to you, at a time that works.</p>
      </a>
      <a class="fd-card" href="{SURVEY_URL}">
        <span class="fd-icon">&#128203;</span>
        <h3>Have Your Say</h3>
        <p>The new IRAAC-owned survey is being built. See the latest update.</p>
      </a>
    </div>
  </div>
</section>
"""

FOOTER = """<div class="acknowledgement">
  <div class="container">IRAAC acknowledges the Traditional Custodians of the lands on which we work, live and gather, and pays respect to Elders past, present and emerging.</div>
</div>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div><h4>IRAAC</h4><ul>
        <li><a href="about.html">Our Story</a></li>
        <li><a href="governance.html">Governance &amp; Reporting</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul></div>
      <div><h4>Our Programs</h4><ul>
        <li><a href="programs.html#mcc">MCC &mdash; Mob and Country Connections</a></li>
        <li><a href="programs.html#youthscape">YouthScape</a></li>
        <li><a href="programs.html#thecrew">The Crew</a></li>
        <li><a href="programs.html#darc">DARC</a></li>
      </ul></div>
      <div><h4>Get Involved</h4><ul>
        <li><a href="support.html">Support for Aboriginal Community Organisations</a></li>
        <li><a href="news.html">Latest Updates</a></li>
        <li><a href="insights.html">Insights</a></li>
        <li><a href="contact.html">Get in Touch</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 IRAAC. All rights reserved.</span>
      <span>Site content is a working draft &mdash; contact the Secretary to update.</span>
    </div>
  </div>
</footer>
"""

def page(title, description, active, body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title} | IRAAC</title>
<meta name="description" content="{description}" />
<style>{CSS}</style>
</head>
<body>
{header(active)}
{QUICKBAR}
{body}
{FOOTER}
<script>{JS}</script>
</body>
</html>
"""

INDEX = f"""
<section class="hero-flex">
  <div class="container">
    <div>
      <div class="eyebrow">Aboriginal Community Organisation &middot; Local Decision Making</div>
      <h1>Strong governance. Strong programs. Strong community.</h1>
      <p>IRAAC is a community organisation working with and for community through Local Decision Making. We deliver programs, build governance capability, and help other Aboriginal Community Organisations do the same.</p>
      <a href="book-a-call.html" class="btn btn-primary">&#128197; Book a Free 15-Min Call</a>
      <a href="programs.html" class="btn btn-outline">See Our Programs</a>
    </div>
    <div class="art-panel">
      <img src="{IMG['art']}" alt="" />
      <div class="art-caption">Placeholder artwork &mdash; to be replaced with a commissioned piece from an Aboriginal artist. See note to Rhys below.</div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2 class="section-title">What We Do</h2>
    <p class="section-lead">IRAAC runs a small group of community programs and is building the governance and reporting systems that show funders and community alike that IRAAC is well run.</p>
    <div class="grid">
      <div class="card"><img src="{IMG['mcc']}" alt="" /><div class="card-body"><h3>MCC &mdash; Mob and Country Connections</h3><p>IRAAC supports other Aboriginal Community Organisations to build their own governance and reporting capability.</p><a class="card-link" href="programs.html#mcc">Learn more &rarr;</a></div></div>
      <div class="card"><img src="{IMG['youthscape']}" alt="" /><div class="card-body"><h3>YouthScape</h3><p>Connecting young people in the community with culture, opportunity and support.</p><a class="card-link" href="programs.html#youthscape">Learn more &rarr;</a></div></div>
      <div class="card"><img src="{IMG['thecrew']}" alt="" /><div class="card-body"><h3>The Crew</h3><p>A community-facing program building skills, connection and participation.</p><a class="card-link" href="programs.html#thecrew">Learn more &rarr;</a></div></div>
      <div class="card"><img src="{IMG['darc']}" alt="" /><div class="card-body"><h3>DARC</h3><p>Part of IRAAC's program suite, supporting community outcomes alongside our other programs.</p><a class="card-link" href="programs.html#darc">Learn more &rarr;</a></div></div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="container two-col">
    <div>
      <h2 class="section-title">Governed Well, Reported Openly</h2>
      <p>IRAAC is building the systems that let it show &mdash; clearly and consistently &mdash; that it meets the governance and reporting standards expected by Local Decision Making, Aboriginal Affairs NSW, ORIC and other funding bodies.</p>
      <a href="governance.html" class="btn btn-primary">See Our Governance</a>
    </div>
    <img src="{IMG['governance']}" alt="" />
  </div>
</section>
"""

ABOUT = f"""
<section class="page-hero" style="background-image:url('{IMG['about']}');">
  <div class="container">
    <div class="eyebrow">About Us</div>
    <h1>Our Story</h1>
    <p>IRAAC is an Aboriginal Community Organisation and registered charity, working under the NSW Local Decision Making Framework.</p>
  </div>
</section>

<section>
  <div class="container two-col">
    <div>
      <h2 class="section-title">Who We Are</h2>
      <p>IRAAC represents and serves its community through a set of programs and a growing focus on governance and organisational capability. We are a charity, run by and for community &mdash; independent of government, though we work alongside Aboriginal Affairs NSW, Alliances and Assemblies to progress the priorities community identifies for itself.</p>
      <p>This page is a starting point &mdash; the Secretary and Board should expand it with IRAAC's founding story, the community and Country it represents, and the people who lead it.</p>
    </div>
    <img src="{IMG['office']}" alt="" />
  </div>
</section>

<section class="alt">
  <div class="container">
    <h2 class="section-title">Local Decision Making, in Brief</h2>
    <p class="section-lead">Local Decision Making is the NSW framework that gives Aboriginal communities a stronger say in decisions that affect them, delivered through regional Alliances and Assemblies working with Aboriginal Affairs NSW. IRAAC's programs and governance work all sit within this framework.</p>
    <div class="grid">
      <div class="card"><div class="card-body"><h3>Aboriginal Affairs NSW</h3><p>The NSW Government agency responsible for Aboriginal affairs policy and the Local Decision Making Framework &mdash; IRAAC's government partner, not its owner.</p></div></div>
      <div class="card"><div class="card-body"><h3>Alliances &amp; Assemblies</h3><p>The regional, community-led structures through which priorities are identified under Local Decision Making.</p></div></div>
      <div class="card"><div class="card-body"><h3>ORIC &amp; ACNC</h3><p>The regulators IRAAC reports to as a registered Aboriginal Community Organisation and charity.</p></div></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <h2 class="section-title">Our Board</h2>
    <p class="section-lead">IRAAC is led by a Board of community members, meeting regularly using a standard agenda, minutes, decisions and actions framework so every meeting is run and recorded consistently.</p>
    <div class="grid">
      <div class="card"><div class="card-body"><h3>Geoff Maher</h3><p>Chairperson</p></div></div>
      <div class="card"><div class="card-body"><h3>Maria Maher</h3><p>Secretary</p></div></div>
    </div>
    <div class="note-box" style="margin-top:24px;">Add remaining Board Member names, photos and short bios here once confirmed &mdash; this builds trust with funders and community alike.</div>
  </div>
</section>
"""

def program_detail(key, tag, title, img, body):
    return f"""
<div class="program-block" id="{key}">
  <div class="program-hero">
    <img src="{img}" alt="" />
    <div><span class="tag">{tag}</span><h2>{title}</h2><p>{body}</p></div>
  </div>
  <div class="note-box">Add real photos, outcomes and stories for {title} here once available.</div>
</div>
"""

PROGRAMS = f"""
<section class="page-hero" style="background-image:url('{IMG['mcc']}');">
  <div class="container">
    <div class="eyebrow">What We Deliver</div>
    <h1>Our Programs</h1>
    <p>Four programs, each supporting community in a different way.</p>
  </div>
</section>

<section>
  <div class="container">
    {program_detail("mcc", "Sector Capability", "MCC &mdash; Mob and Country Connections", IMG['mcc'],
        "MCC is IRAAC's program for supporting other Aboriginal Community Organisations to build the governance, administration and reporting capability they need &mdash; sharing the systems, templates and training IRAAC has developed for itself. Support is provided at the invitation of the organisation receiving it, making it a peer&#8209;to&#8209;peer, relationship&#8209;based model rather than a top&#8209;down service. It's also a chance for IRAAC to test, in practice, whether this kind of Aboriginal&#8209;led, peer&#8209;to&#8209;peer capability building genuinely lifts outcomes for other organisations across the sector &mdash; and to refine the approach as it goes.")}
    {program_detail("youthscape", "Young People", "YouthScape", IMG['youthscape'],
        "YouthScape is IRAAC's program for young people in the community, connecting them with culture, opportunity and support. This section should be expanded with YouthScape's specific activities, age groups and outcomes.")}
    {program_detail("thecrew", "Community", "The Crew", IMG['thecrew'],
        "The Crew is a community-facing IRAAC program building skills, connection and participation. This section should be expanded with The Crew's specific activities and who it supports.")}
    {program_detail("darc", "Community", "DARC", IMG['darc'],
        "DARC is part of IRAAC's program suite, working alongside MCC, YouthScape and The Crew to support community outcomes. This section should be expanded with DARC's specific focus and activities.")}
  </div>
</section>
"""

GOVERNANCE = f"""
<section class="page-hero" style="background-image:url('{IMG['governance']}');">
  <div class="container">
    <div class="eyebrow">Accountability &amp; Transparency</div>
    <h1>Governance &amp; Reporting</h1>
    <p>IRAAC is a charity, independently governed by its Board &mdash; here's how we run ourselves and report to funders and regulators.</p>
  </div>
</section>

<section>
  <div class="container two-col">
    <div>
      <h2 class="section-title">How IRAAC is Governed</h2>
      <p>IRAAC is governed by a Board, chaired by the Chairperson and supported by the Secretary, meeting regularly using a standard agenda, minutes, decisions and actions framework.</p>
      <p>An annual independent Board evaluation process checks and improves IRAAC's governance every year, and Board Members, staff and community members all receive governance training relevant to their role.</p>
    </div>
    <div class="card"><div class="card-body">
      <h3>What We Report On</h3>
      <ul style="padding-left: 18px; color: var(--muted); margin:0;">
        <li>Quarterly progress reports</li><li>Annual reports</li><li>Program acquittals</li>
        <li>Audit reports</li><li>ORIC &amp; ACNC reports</li><li>Funding body reports</li>
      </ul>
    </div></div>
  </div>
</section>

<section>
  <div class="container">
    <h2 class="section-title">The Wider System IRAAC Works Within</h2>
    <p class="section-lead">IRAAC doesn't operate in isolation &mdash; it sits inside a wider network of government partners, regulators and community structures. Understanding how these fit together helps explain why IRAAC reports the way it does, and who it's ultimately accountable to.</p>

    <div class="system-block">
      <span class="system-kicker">Policy Framework</span>
      <h3>OCHRE &amp; Local Decision Making</h3>
      <p>OCHRE is the NSW Government's overarching policy framework for Aboriginal affairs, and Local Decision Making (LDM) is the specific part of that framework designed to give Aboriginal communities a stronger say in decisions that affect them. Rather than government deciding priorities on communities' behalf, LDM is meant to shift that decision&#8209;making outward, through structures like Alliances and Assemblies, so that Aboriginal people set the agenda for their own communities.</p>
      <p>Every other entity on this page &mdash; IRAAC included &mdash; sits somewhere inside this framework. It's the shared backdrop that explains why IRAAC reports the way it does, who it's accountable to, and why building strong governance and reporting capability matters so much: it's what lets IRAAC show, clearly, that it can be trusted with more local decision&#8209;making authority over time.</p>
    </div>

    <div class="system-block">
      <span class="system-kicker">Government Partner</span>
      <h3>Aboriginal Affairs NSW</h3>
      <p>Aboriginal Affairs NSW is the NSW Government agency responsible for Aboriginal affairs policy, and the government partner IRAAC ultimately reports up to. It holds Ministerial advice, funding assurance and compliance oversight responsibilities across the OCHRE and Local Decision Making framework, and works alongside Aboriginal Community Organisations like IRAAC rather than directing them day to day.</p>
      <p>It's important to be clear about what this relationship is and isn't: Aboriginal Affairs NSW is IRAAC's government partner and one of its funders, not its owner. IRAAC remains an independent, community&#8209;governed organisation that reports to Aboriginal Affairs NSW on how it uses public funding and what outcomes it delivers, in the same way any funded charity reports to government.</p>
    </div>

    <div class="system-block">
      <span class="system-kicker is-emerging">Emerging &middot; Not Yet Established</span>
      <h3>NCARA</h3>
      <p>NCARA is a proposed statewide Aboriginal coordinating structure that has been discussed as a way of connecting Aboriginal Affairs NSW with the regional Alliances and Assemblies described below. The idea is coordination, shared learning and a stronger collective voice across the sector &mdash; not direct control over any individual organisation's funding or decisions.</p>
      <p>NCARA's exact role is still being worked through, and IRAAC doesn't have a settled relationship with it yet. We've included it here for completeness, because it comes up often in sector&#8209;wide conversations about how Local Decision Making could be organised in future &mdash; but it should be read as an idea under discussion, not an established part of how IRAAC currently operates.</p>
    </div>

    <div class="system-block">
      <span class="system-kicker">Regional Participation</span>
      <h3>Alliances &amp; Assemblies</h3>
      <p>Alliances and Assemblies are the regional structures through which Local Decision Making actually happens on the ground. Alliances are regional Aboriginal governance structures that support engagement, priority&#8209;setting and planning across a region. Assemblies are community forums that support local participation, so that the priorities an Alliance takes forward genuinely reflect what community members themselves have said matters to them.</p>
      <p>Together, they're the participatory architecture that gives Local Decision Making its meaning &mdash; the channel through which Aboriginal communities identify their own priorities, rather than having them set from Sydney or Canberra. IRAAC works alongside its regional Alliance and Assembly to make sure its own programs and priorities stay grounded in what community has actually said it needs.</p>
    </div>

    <div class="system-block">
      <span class="system-kicker">Corporate Regulator</span>
      <h3>ORIC &mdash; Office of the Registrar of Indigenous Corporations</h3>
      <p>ORIC is the national regulator for Aboriginal and Torres Strait Islander corporations, and it's one of two regulators IRAAC reports to as a registered Aboriginal Community Organisation. ORIC's focus is corporate governance and compliance &mdash; making sure organisations like IRAAC are run properly under the rules that apply to Indigenous corporations specifically, separately from the Local Decision Making relationship with Aboriginal Affairs NSW.</p>
      <p>IRAAC's Board Members and staff receive training on ORIC's expectations as part of building the organisation's governance capability, and ORIC reporting sits alongside quarterly reports, annual reports and audits as one of the regular compliance obligations IRAAC keeps on top of.</p>
    </div>

    <div class="system-block">
      <span class="system-kicker">Charity Regulator</span>
      <h3>ACNC &mdash; Australian Charities and Not-for-profits Commission</h3>
      <p>ACNC is the federal regulator for Australian charities, and the second of the two regulators IRAAC reports to &mdash; this time covering IRAAC's obligations as a registered charity rather than as a corporation. Where ORIC looks at corporate compliance, ACNC looks at charitable purpose, governance standards and public accountability.</p>
      <p>Because IRAAC needs to satisfy both regulators at once, its reporting calendar and governance training are built to cover ORIC and ACNC requirements together, rather than treating them as two separate, unrelated obligations. Meeting both consistently is one of the clearest, most concrete ways IRAAC can demonstrate good governance to funders.</p>
    </div>

    <div class="system-block">
      <span class="system-kicker">Capability Partner</span>
      <h3>Governance &amp; Capability Support</h3>
      <p>Building all of the above into everyday practice &mdash; digital systems, board reporting, training, external reporting, financial procedures and on&#8209;the&#8209;job capability development &mdash; is ongoing work. IRAAC draws on external governance and capability advisors to help design and embed these systems, so that good governance becomes something the organisation runs day to day, not just something it demonstrates when a report is due.</p>
    </div>
  </div>
</section>

<section class="alt">
  <div class="container">
    <h2 class="section-title">Reports &amp; Policies</h2>
    <p class="section-lead">Publicly appropriate reports and key policies will be listed here as they're confirmed for release.</p>
    <div class="grid">
      <div class="card"><div class="card-body"><h3>Annual Report</h3><p>Add a link once available.</p></div></div>
      <div class="card"><div class="card-body"><h3>Board Charter</h3><p>Add a link once confirmed for public release.</p></div></div>
      <div class="card"><div class="card-body"><h3>Strategic Plan</h3><p>Add a link once available.</p></div></div>
    </div>
    <div class="note-box">These documents should only be published once the Secretary and Board have confirmed they're appropriate for public release.</div>
  </div>
</section>
"""

SUPPORT = f"""
<section class="page-hero" style="background-image:url('{IMG['support']}');">
  <div class="container">
    <div class="eyebrow">MCC Program</div>
    <h1>Supporting Other Aboriginal Community Organisations</h1>
    <p>IRAAC shares the systems, templates and training it has built for its own governance, administration and reporting.</p>
  </div>
</section>

<section>
  <div class="container two-col">
    <div>
      <h2 class="section-title">How It Works</h2>
      <p>Support is offered at your organisation's invitation &mdash; IRAAC doesn't impose a model, it shares one, and works alongside your organisation until it can manage its own administration, governance and reporting with confidence.</p>
    </div>
    <div class="card"><div class="card-body">
      <h3>What's on Offer</h3>
      <ul style="padding-left: 18px; color: var(--muted); margin:0;">
        <li>Digital office set up and training</li><li>Board reporting templates</li>
        <li>Governance training and evaluation</li><li>External reporting frameworks</li>
        <li>On&#8209;the&#8209;job capability support</li>
      </ul>
    </div></div>
  </div>
</section>

<section class="alt">
  <div class="container">
    <h2 class="section-title">Reach Out</h2>
    <p class="section-lead">If your organisation is interested in MCC support, get in touch and IRAAC will follow up.</p>
    <a href="contact.html" class="btn btn-primary">Contact IRAAC</a>
  </div>
</section>
"""

NEWS = f"""
<section class="page-hero" style="background-image:url('{IMG['news1']}');">
  <div class="container">
    <div class="eyebrow">Updates</div>
    <h1>News &amp; Updates</h1>
    <p>Short updates on IRAAC's programs, governance milestones and community news.</p>
  </div>
</section>

<section>
  <div class="container" style="max-width: 780px;">
    <div class="news-item"><img src="{IMG['news1']}" alt="" /><div><div class="date">Placeholder</div><h3>Website launched</h3><p>This is a placeholder update &mdash; replace it with IRAAC's first real news post.</p></div></div>
    <div class="news-item"><img src="{IMG['news2']}" alt="" /><div><div class="date">Placeholder</div><h3>Add your next update here</h3><p>Use this space for programme milestones, funding news, events or governance updates.</p></div></div>
  </div>
</section>
"""

INSIGHTS = f"""
<section class="page-hero" style="background-image:url('{IMG['governance']}');">
  <div class="container">
    <div class="eyebrow">From IRAAC</div>
    <h1>Insights</h1>
    <p>Short, plain-language reflections on governance, community programs and what we're learning as we go &mdash; written for community, funders and partners alike.</p>
  </div>
</section>

<section>
  <div class="container" style="max-width: 780px;">

    <article class="insight-post is-featured" id="bail-conditions-july-2026">
      <div class="insight-meta"><span class="insight-tag">Emerging Community Report</span><span class="insight-date">July 2026</span></div>
      <h2>Bail Conditions: An Emerging Community Issue</h2>
      <p class="survey-report-intro">Community feedback has raised bail conditions as an issue connected with Local Decision Making. The same feedback also identified transport support and uncertainty about the best next step. Taken together, these points suggest that bail can involve practical access and service-navigation challenges as well as legal requirements.</p>
      <p>This report shares an early community signal for Aboriginal community members, government organisations, frontline workers and service partners. It does not identify anyone, provide legal advice or claim to describe every person's experience. Its purpose is to guide further listening and identify practical opportunities for culturally safe support.</p>

      <div class="survey-report-callout">
        <p><strong>The central message:</strong> understanding bail conditions may not be enough on its own. People may also need clear information, reliable transport, a trusted person to speak with and a coordinated pathway to qualified legal and practical support.</p>
      </div>

      <div class="survey-report-section">
        <h3>What the feedback is pointing to</h3>
        <ul>
          <li>Bail conditions can intersect with transport, communication and access to services.</li>
          <li>Uncertainty about the next step may indicate a need for clearer navigation and warm referrals.</li>
          <li>Local knowledge should help shape how bail-related support is designed and delivered.</li>
          <li>Trusted Aboriginal organisations can play an important role in connecting people with appropriate legal and practical assistance.</li>
          <li>More community engagement is needed to understand which barriers create the greatest difficulty and what support would make the most difference.</li>
        </ul>
      </div>

      <div class="survey-report-section">
        <h3>What this may mean in practice</h3>
        <p><strong>Access is part of successful follow-through.</strong> If transport, location, timing or communication make it difficult to attend an appointment or reach a service, providing information alone may not resolve the problem. Practical barriers should be identified early and included in support planning.</p>
        <p><strong>People need a clear next step.</strong> Bail can involve different organisations and responsibilities. A named contact, plain-language explanation and warm referral can be more useful than asking someone to navigate several services alone.</p>
        <p><strong>Cultural safety and local relationships matter.</strong> Support should be shaped with Aboriginal community leadership and delivered through trusted relationships wherever possible. IRAAC's role is to listen, connect and advocate, while qualified legal services provide legal advice.</p>
      </div>

      <div class="survey-report-section">
        <h3>What this means for each audience</h3>
        <div class="survey-report-audiences">
          <div class="survey-report-audience">
            <h4>For Aboriginal community members</h4>
            <p>You can start by explaining what is making the situation difficult, including transport, communication or uncertainty about where to go. You should be able to ask for information in plain language and request help connecting with a qualified legal or support service.</p>
          </div>
          <div class="survey-report-audience">
            <h4>For government organisations</h4>
            <p>Funding should recognise the practical conditions that help people understand requirements, reach appointments and remain connected to support. Locally designed transport, navigation and culturally safe referral pathways are important areas for further investigation.</p>
          </div>
          <div class="survey-report-audience">
            <h4>For frontline workers</h4>
            <p>Ask about immediate practical barriers, explain your role clearly and avoid giving legal advice unless qualified to do so. Where legal help is needed, make a warm referral and confirm who owns the next action.</p>
          </div>
          <div class="survey-report-audience">
            <h4>For community and service partners</h4>
            <p>Map existing legal, transport and support pathways together. Clear referral responsibilities can reduce gaps, avoid repeated storytelling and make it easier for people to reach the right help.</p>
          </div>
        </div>
      </div>

      <div class="survey-report-section">
        <h3>Practical recommendations</h3>
        <ul>
          <li>Develop a culturally safe bail-support and navigation pathway with Aboriginal organisations and qualified legal services.</li>
          <li>Ask about transport barriers early and connect people with practical travel planning or assistance where available.</li>
          <li>Provide plain-language information, with interpreters or other communication support where needed.</li>
          <li>Create warm-referral arrangements so people are not left to navigate legal, transport and community services alone.</li>
          <li>Strengthen coordination between Aboriginal community-controlled organisations, legal services, transport providers and relevant government agencies.</li>
          <li>Gather further community feedback before making broad claims or final policy recommendations.</li>
          <li>Report back to community on what IRAAC recommended and what government and service organisations did in response.</li>
        </ul>
      </div>

      <div class="survey-report-section">
        <h3>Building the evidence responsibly</h3>
        <p>This is an emerging signal rather than a population estimate. IRAAC will continue listening to community, protect personal information and test its interpretation with Aboriginal community representatives before presenting broader conclusions. No identifying participant information is included in this report.</p>
      </div>

      <div class="survey-report-actions">
        <a class="btn btn-primary" href="{SURVEY_URL}">Have Your Say</a>
        <a class="btn btn-outline" href="book-a-call.html">Book a Call</a>
        <a class="btn btn-outline" href="contact.html#home-visit">Request a Home Visit</a>
      </div>
    </article>

    <article class="insight-post is-featured" id="july-2026-survey-report">
      <div class="insight-meta"><span class="insight-tag">Monthly Survey Report</span><span class="insight-date">July 2026</span></div>
      <h2>IRAAC Survey Monthly Report</h2>
      <p class="survey-report-intro">This month, community members used IRAAC's survey to ask about culture, young people, family and community support, programs, practical help and the best way to speak with someone. These questions are important because they show that people are not only looking for information. They are looking for a clear, respectful way to connect with a person who can listen, explain what is available and help work out the next step.</p>
      <p>This report brings those questions together for Aboriginal community members, government organisations and the workers who meet people every day. It does not identify anyone or repeat personal circumstances. Its purpose is to share the themes that were raised and turn them into practical guidance for stronger, more culturally responsive service.</p>

      <div class="survey-report-callout">
        <p><strong>The central message:</strong> people want more than a list of services. They want welcoming, face-to-face and flexible pathways into support, with culture, family and community understood as part of the whole picture.</p>
      </div>

      <div class="survey-report-section">
        <h3>The sorts of questions community members asked</h3>
        <ul>
          <li>Where can I sit down and speak with someone face to face?</li>
          <li>Can an IRAAC worker visit my home or community if getting to an office is difficult?</li>
          <li>What support is available for families and for people dealing with several needs at once?</li>
          <li>How can young people take part in activities, stay connected to culture and feel supported?</li>
          <li>What programs, events and community activities are available, and how do people join?</li>
          <li>Can practical barriers, including transport and access, be considered when support is arranged?</li>
          <li>Who will contact me, what happens next, and how will I know my question has reached the right person?</li>
        </ul>
      </div>

      <div class="survey-report-section">
        <h3>What the questions tell us</h3>
        <p><strong>Connection comes before service navigation.</strong> People may know what is happening in their life without knowing the name of the program or government area that fits. A good first response should therefore begin with listening, not asking people to diagnose the system for themselves.</p>
        <p><strong>Face-to-face contact still matters.</strong> Interest in local offices, home or community visits and direct follow-up shows the value of human contact. Digital forms can open the door, but they should lead to a real conversation rather than become another place where a person has to repeat their story.</p>
        <p><strong>Culture, young people and family are connected.</strong> Questions about cultural connection and activities for young people sit alongside questions about family and practical support. This suggests that cultural participation should not be treated as an optional extra. It can be part of belonging, confidence, prevention and longer-term wellbeing.</p>
        <p><strong>Needs do not arrive one at a time.</strong> Some questions point to interconnected practical, family and service-access needs. Sending a person to several separate services without coordination can create more work and frustration. A warm handover, a named contact and shared responsibility are more useful than a list of phone numbers.</p>
        <p><strong>Access is part of the service.</strong> Transport, location, timing and the choice of where to meet can determine whether a person is able to participate at all. Flexible ways to engage should be planned from the beginning, not added only after someone has struggled.</p>
      </div>

      <div class="survey-report-section">
        <h3>What this means for each audience</h3>
        <div class="survey-report-audiences">
          <div class="survey-report-audience">
            <h4>For Aboriginal community members</h4>
            <p>You should not need to know the right program name before asking for help. You can start with what matters to you and choose how you want to talk: by phone, at an office, through the survey, or by asking about a home or community visit. Asking about culture, family, young people, activities or practical support is a valid place to begin.</p>
          </div>
          <div class="survey-report-audience">
            <h4>For government organisations</h4>
            <p>The questions reinforce the need to fund and design services around relationships, cultural safety and coordinated follow-up. Success should include whether people reach the right worker, understand the next step and remain connected &mdash; not only whether a referral was issued or a form was completed.</p>
          </div>
          <div class="survey-report-audience">
            <h4>For frontline workers</h4>
            <p>Begin with the person's priorities. Explain choices in plain language, check how and where they would prefer to meet, ask about practical barriers and make a warm handover where another service is needed. Before ending the conversation, confirm who owns the next action and when the person can expect to hear back.</p>
          </div>
          <div class="survey-report-audience">
            <h4>For community and service partners</h4>
            <p>Keep information current, share clear entry points and work together when needs cross organisational boundaries. Community-led programs and mainstream services are strongest when each understands its role, respects consent and avoids making people retell the same story unnecessarily.</p>
          </div>
        </div>
      </div>

      <div class="survey-report-section">
        <h3>Practical priorities for the month ahead</h3>
        <ul>
          <li>Keep the four direct contact choices visible: book a call, complete the survey, visit an office or request a home visit.</li>
          <li>Respond in plain language and tell each person what will happen next, who is responsible and when follow-up is expected.</li>
          <li>Make it easier to ask for help without first choosing a program or service category.</li>
          <li>Build transport, location and other access needs into the first conversation.</li>
          <li>Strengthen pathways for cultural connection, young people's participation, family support and community activities.</li>
          <li>Use warm handovers and coordinated follow-up when a person's needs involve more than one organisation.</li>
          <li>Continue protecting privacy while reporting back to community on the themes being heard and the actions being taken.</li>
        </ul>
      </div>

      <div class="survey-report-section">
        <h3>Continuing the conversation</h3>
        <p>Monthly reporting is one way IRAAC can show that community questions are being heard. The next step is to keep the conversation open, make follow-up easier and return to community with clear information about what changed. If something is important to you, you can raise it in the way that feels most comfortable.</p>
      </div>

      <div class="survey-report-actions">
        <a class="btn btn-primary" href="{SURVEY_URL}">Have Your Say</a>
        <a class="btn btn-outline" href="book-a-call.html">Book a Call</a>
        <a class="btn btn-outline" href="offices.html">Visit an Office</a>
        <a class="btn btn-outline" href="contact.html#home-visit">Request a Home Visit</a>
      </div>
    </article>

    <div class="insight-post">
      <div class="insight-meta"><span class="insight-tag">Governance</span><span class="insight-date">July 2026</span></div>
      <h2>Why Governance Is the Foundation of Strong Community Programs</h2>
      <p>It's easy to think of governance as paperwork &mdash; the meetings, the minutes, the reports that sit behind the programs people actually see and feel the benefit of. But good governance is what makes those programs possible in the first place. A Board that meets regularly, keeps clear records of its decisions, and reports honestly on what's working and what isn't is a Board that funders, partners and community can trust with more responsibility over time.</p>
      <p>For IRAAC, that means treating governance as an everyday discipline rather than something to scramble for when a report is due. A standard agenda and minutes framework, an annual independent Board evaluation, and role-specific training for Board Members and staff all sound unglamorous &mdash; but they're exactly what lets us say, with confidence, that IRAAC is well run. That confidence is what frees us up to focus on the programs themselves: MCC, YouthScape, The Crew and DARC.</p>
      <p>Under Local Decision Making, this matters even more. The more clearly an organisation like IRAAC can demonstrate strong governance, the stronger the case for more decisions being made locally rather than centrally. Good governance isn't the opposite of community control &mdash; it's what community control is built on.</p>
    </div>

    <div class="insight-post">
      <div class="insight-meta"><span class="insight-tag">MCC</span><span class="insight-date">June 2026</span></div>
      <h2>What We're Learning Through MCC's Peer-to-Peer Model</h2>
      <p>MCC &mdash; Mob and Country Connections &mdash; started from a simple observation: IRAAC had spent real time and effort building governance, administration and reporting systems for itself, and other Aboriginal Community Organisations were often working through the exact same challenges from scratch. Rather than keep that work inside IRAAC, MCC shares it &mdash; the templates, the training, the lessons learned &mdash; with organisations that ask for it.</p>
      <p>The model only works because support is offered at the invitation of the organisation receiving it. Nobody likes being told how to run their organisation by an outsider, and Aboriginal Community Organisations have particular reason to be wary of top-down models imposed from elsewhere. MCC is peer-to-peer by design: IRAAC has walked the path already, and shares what it learned rather than prescribing a fixed solution.</p>
      <p>It's early days, and MCC is as much a live experiment as it is a finished program &mdash; a chance for IRAAC to test whether Aboriginal-led, relationship-based capability sharing genuinely moves the needle for other organisations, and to keep refining the approach based on what those organisations tell us actually helps.</p>
    </div>

    <div class="insight-post">
      <div class="insight-meta"><span class="insight-tag">Local Decision Making</span><span class="insight-date">May 2026</span></div>
      <h2>Local Decision Making: Turning Policy Into Practice</h2>
      <p>Local Decision Making sounds straightforward on paper: give Aboriginal communities a stronger say in the decisions that affect them. In practice, it depends entirely on the structures underneath it actually working &mdash; the regional Alliances that identify priorities, the community Assemblies that keep those priorities grounded in what people have actually said, and organisations like IRAAC that turn those priorities into programs on the ground.</p>
      <p>For IRAAC, that means staying closely connected to its regional Alliance and Assembly rather than assuming it already knows what community needs. It also means being transparent about where IRAAC sits in the wider system &mdash; working alongside Aboriginal Affairs NSW as a government partner, not being run by it, and reporting to ORIC and the ACNC as any responsible charity and corporation should.</p>
      <p>The test of whether Local Decision Making is working isn't the policy documents &mdash; it's whether the programs communities actually receive reflect what those communities said they wanted. That's the standard IRAAC is trying to hold itself to, and it's one we'll keep coming back to in future updates.</p>
    </div>

  </div>
</section>
"""

CONTACT = f"""
<section class="page-hero" style="background-image:url('{IMG['office']}');">
  <div class="container">
    <div class="eyebrow">Get in Touch</div>
    <h1>Contact IRAAC</h1>
    <p>There's no wrong door &mdash; reach us however suits you best.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="contact-grid" style="margin-bottom: 48px;">
      <div class="contact-card"><div class="icon">&#128203;</div><h3>Have Your Say</h3><p>The new IRAAC-owned survey is being built.</p><a class="btn btn-primary" style="margin:0;" href="{SURVEY_URL}">Survey Update</a></div>
      <div class="contact-card"><div class="icon">&#127968;</div><h3>Visit a Local Office</h3><p>Drop in and speak with your local IRAAC officer in person.</p><a class="btn btn-primary" style="margin:0;" href="offices.html">Find an Office</a></div>
      <div class="contact-card" id="home-visit"><div class="icon">&#128100;</div><h3>Request a Home Visit</h3><p>Ask an IRAAC officer to come to you, at a time that works.</p><a class="btn btn-primary" style="margin:0;" href="#home-visit-form">Request a Visit</a></div>
      <div class="contact-card"><div class="icon">&#128197;</div><h3>Book a Call</h3><p>Pick a time that suits you &mdash; we'll call you.</p><a class="btn btn-primary" style="margin:0;" href="book-a-call.html">Book a Time</a></div>
    </div>

    <div class="two-col">
      <div>
        <h2 class="section-title">Who to Contact</h2>
        <ul style="list-style:none;padding:0;margin:0;">
          <li style="padding:16px 0;border-bottom:1px solid rgba(0,0,0,0.08);"><b style="color:var(--ochre-dark);display:block;">General Enquiries</b>Add general contact email / phone here.</li>
          <li style="padding:16px 0;border-bottom:1px solid rgba(0,0,0,0.08);"><b style="color:var(--ochre-dark);display:block;">Program Enquiries</b>Add program contact details here.</li>
          <li style="padding:16px 0;border-bottom:1px solid rgba(0,0,0,0.08);"><b style="color:var(--ochre-dark);display:block;">MCC &amp; Partnership Enquiries</b>Add MCC contact details for other Aboriginal Community Organisations.</li>
        </ul>
      </div>
      <div class="card" id="home-visit-form"><div class="card-body">
        <h3>Send a Message / Request a Home Visit</h3>
        <form class="contact-form">
          <div><label for="name">Name</label><input type="text" id="name" required /></div>
          <div><label for="email">Email</label><input type="email" id="email" required /></div>
          <div><label for="message">Message</label><textarea id="message" rows="4" required placeholder="Let us know if you'd like an IRAAC officer to visit you at home, and a good time to reach you."></textarea></div>
          <button type="submit" class="btn btn-primary" style="margin-top:4px;">Send Message</button>
          <p id="form-note" style="display:none; color: var(--muted); font-size: 0.88rem;"></p>
        </form>
      </div></div>
    </div>
  </div>
</section>
"""

CANCELLED_SURVEY_DEMO = f"""
<section class="page-hero" style="background-image:url('{IMG['support']}');">
  <div class="container">
    <div class="eyebrow">Tell Us About You</div>
    <h1>Complete a Survey</h1>
    <p>This short survey helps IRAAC understand who's reaching out and connect you with the right support. It takes about two minutes.</p>
  </div>
</section>

<section>
  <div class="container">
    <div id="survey-form-wrap">
    <form class="survey-shell" id="iraac-survey">
      <div class="survey-step-label">Step 1 of 1 &middot; About You</div>

      <div class="q-block">
        <label class="q-title">What age group are you in?</label>
        <div class="option-row">
          <label class="option-pill"><input type="radio" name="age" value="under18" /> Under 18</label>
          <label class="option-pill"><input type="radio" name="age" value="18-24" /> 18&ndash;24</label>
          <label class="option-pill"><input type="radio" name="age" value="25-44" /> 25&ndash;44</label>
          <label class="option-pill"><input type="radio" name="age" value="45-64" /> 45&ndash;64</label>
          <label class="option-pill"><input type="radio" name="age" value="65plus" /> 65+</label>
          <label class="option-pill"><input type="radio" name="age" value="prefer-not" /> Prefer not to say</label>
        </div>
      </div>

      <div class="q-block">
        <label class="q-title">Do you identify as Aboriginal and/or Torres Strait Islander?</label>
        <p class="q-help">This helps IRAAC understand who it's reaching. It's always your choice whether to answer.</p>
        <div class="option-row">
          <label class="option-pill"><input type="radio" name="identity" value="aboriginal" /> Aboriginal</label>
          <label class="option-pill"><input type="radio" name="identity" value="torres-strait" /> Torres Strait Islander</label>
          <label class="option-pill"><input type="radio" name="identity" value="both" /> Both Aboriginal and Torres Strait Islander</label>
          <label class="option-pill"><input type="radio" name="identity" value="neither" /> Neither</label>
          <label class="option-pill"><input type="radio" name="identity" value="prefer-not" /> Prefer not to say</label>
        </div>
      </div>

      <div class="q-block">
        <label class="q-title" for="ethnicity">Ethnicity or cultural background (optional)</label>
        <p class="q-help">Only answer if you're comfortable &mdash; this is entirely optional.</p>
        <input type="text" id="ethnicity" name="ethnicity" placeholder="e.g. a specific community, nation or cultural background" style="width:100%;padding:12px 14px;border:1px solid rgba(0,0,0,0.15);border-radius:4px;font-size:0.95rem;font-family:inherit;" />
      </div>

      <div class="q-block">
        <label class="q-title" for="religion">Religion or spiritual belief (optional)</label>
        <p class="q-help">Only answer if you're comfortable &mdash; this is entirely optional.</p>
        <input type="text" id="religion" name="religion" style="width:100%;padding:12px 14px;border:1px solid rgba(0,0,0,0.15);border-radius:4px;font-size:0.95rem;font-family:inherit;" />
      </div>

      <div class="q-block">
        <label class="q-title">What would you like help with?</label>
        <div class="option-row">
          <label class="option-pill"><input type="checkbox" name="need" value="programs" /> Our programs (MCC, YouthScape, The Crew, DARC)</label>
          <label class="option-pill"><input type="checkbox" name="need" value="governance" /> Governance / MCC support for my organisation</label>
          <label class="option-pill"><input type="checkbox" name="need" value="general" /> General information</label>
          <label class="option-pill"><input type="checkbox" name="need" value="other" /> Something else</label>
        </div>
      </div>

      <div class="consent-box">
        This is a demonstration survey. Your answers are not being stored or sent anywhere yet. Once IRAAC is ready to launch it, this note will be replaced with a proper privacy statement explaining exactly how your information is collected, stored and used, in line with the Privacy Act and community expectations around sensitive information such as Indigenous status, ethnicity and religion.
      </div>

      <button type="submit" class="btn btn-primary" style="margin-top:20px;">Submit Survey</button>
    </form>
    <div id="survey-thanks" class="survey-shell" style="display:none;">
      <h2 class="section-title" style="margin-top:0;">Thank you</h2>
      <p>Thanks for completing the survey. In the live version, an IRAAC officer would follow up based on what you told us. In the meantime, you're welcome to <a href="book-a-call.html" style="color:var(--ochre);font-weight:600;">book a free 15&#8209;minute call</a> or <a href="offices.html" style="color:var(--ochre);font-weight:600;">visit a local office</a>.</p>
    </div>
    </div>
  </div>
</section>
"""

# The previous Google Form and the early in-page demonstration are cancelled.
# Keep every public Have Your Say link on this IRAAC-owned holding route until
# the new governed survey passes its release gates.
SURVEY = f"""
<section class="page-hero" style="background-image:url('{IMG['support']}');">
  <div class="container">
    <div class="eyebrow">A New IRAAC Survey Is Being Built</div>
    <h1>Have Your Say</h1>
    <p>IRAAC is building a new, secure Have Your Say survey from the ground up. The previous survey is closed and is no longer accepting responses.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="call-card">
      <h2 class="section-title" style="margin-top:0;">The new survey is coming soon</h2>
      <p>We are creating one IRAAC-owned survey that will work online, in person and over the phone. It will explain clearly how information is protected, how it helps IRAAC report community priorities to government, and what contact choices are available.</p>
      <p>Until it is ready, you can still speak with IRAAC in the way that works best for you.</p>
      <a href="book-a-call.html" class="btn btn-primary">Book a Call</a>
      <a href="offices.html" class="btn btn-outline" style="color:var(--ochre-dark);border-color:var(--ochre-dark);">Drop In</a>
      <a href="contact.html#home-visit" class="btn btn-outline" style="color:var(--ochre-dark);border-color:var(--ochre-dark);">Request a Home Visit</a>
    </div>
  </div>
</section>
"""

OFFICES = f"""
<section class="page-hero" style="background-image:url('{IMG['office']}');">
  <div class="container">
    <div class="eyebrow">In Person</div>
    <h1>Visit a Local Office</h1>
    <p>Drop in and speak with an IRAAC officer face to face. Locations below are placeholders &mdash; real office addresses need to be added by the Secretary.</p>
  </div>
</section>

<section>
  <div class="container">
    <iframe class="map-embed" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=140.9%2C-37.6%2C153.6%2C-28.1&amp;layer=mapnik&amp;marker=-33.8,151.2" title="Map of placeholder IRAAC office locations across NSW"></iframe>
    <div class="note-box" style="margin-top:18px;">This map and the office list below use placeholder locations so the page can be reviewed. Please confirm IRAAC's real office addresses (and whether IRAAC's remit is NSW-wide or a specific region) so they can be added &mdash; and so the map can be centred correctly.</div>

    <div class="office-list">
      <div class="office-item"><div><h4>Placeholder Office &mdash; Sydney / Metro</h4><p>Address to be confirmed &middot; Open weekdays</p></div><a class="btn btn-outline" style="margin:0;color:var(--ochre-dark);border-color:var(--ochre-dark);" href="book-a-call.html">Book Ahead</a></div>
      <div class="office-item"><div><h4>Placeholder Office &mdash; Regional NSW</h4><p>Address to be confirmed &middot; Open weekdays</p></div><a class="btn btn-outline" style="margin:0;color:var(--ochre-dark);border-color:var(--ochre-dark);" href="book-a-call.html">Book Ahead</a></div>
      <div class="office-item"><div><h4>Placeholder Office &mdash; Additional Location</h4><p>Address to be confirmed &middot; Open weekdays</p></div><a class="btn btn-outline" style="margin:0;color:var(--ochre-dark);border-color:var(--ochre-dark);" href="book-a-call.html">Book Ahead</a></div>
    </div>
  </div>
</section>
"""

BOOKCALL = f"""
<section class="page-hero" style="background-image:url('{IMG['governance']}');">
  <div class="container">
    <div class="eyebrow">Free &middot; 15 Minutes &middot; No Obligation</div>
    <h1>Book a Free 15-Minute Call</h1>
    <p>Speak with an experienced IRAAC officer about anything &mdash; a program, a governance question, or just to find out more. Open to community members, other organisations and government contacts alike.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="call-card">
      <span class="duration">&#9200; 15 minutes &middot; Free</span>
      <h2 class="section-title" style="margin-top:0;">Pick a Time</h2>
      <p style="color:var(--muted);">This call will be booked through Calendly once IRAAC provides a scheduling link. For now, this is a placeholder so the flow can be reviewed end to end.</p>
      <div class="note-box">Calendly embed goes here &mdash; please share the IRAAC officer's Calendly link (or set one up) and it will be embedded directly on this page so visitors can pick a time without leaving the site.</div>
      <a href="contact.html" class="btn btn-primary">Request a Call Instead</a>
    </div>
  </div>
</section>
"""

pages = [
    ("index.html", "Home", "IRAAC supports Aboriginal community, culture and self-determination through Local Decision Making.", "index.html", INDEX),
    ("about.html", "Our Story", "Who IRAAC is and how it fits within the NSW Local Decision Making Framework.", "about.html", ABOUT),
    ("programs.html", "Our Programs", "MCC, YouthScape, The Crew and DARC — IRAAC's community programs.", "programs.html", PROGRAMS),
    ("governance.html", "Governance & Reporting", "How IRAAC is governed and how it reports to funders and regulators.", "governance.html", GOVERNANCE),
    ("support.html", "Supporting Other Organisations", "How IRAAC supports other Aboriginal Community Organisations through MCC.", "support.html", SUPPORT),
    ("news.html", "News", "Latest updates from IRAAC.", "news.html", NEWS),
    ("insights.html", "Insights", "Reflections on governance, community programs and Local Decision Making from IRAAC.", "insights.html", INSIGHTS),
    ("contact.html", "Contact", "Get in touch with IRAAC.", "contact.html", CONTACT),
    ("survey.html", "Have Your Say", "The new IRAAC-owned Have Your Say survey is being built. The previous survey is closed.", "contact.html", SURVEY),
    ("offices.html", "Visit a Local Office", "Find an IRAAC office to visit in person.", "contact.html", OFFICES),
    ("book-a-call.html", "Book a Free 15-Minute Call", "Book a free 15-minute call with an experienced IRAAC officer.", "contact.html", BOOKCALL),
]

import os
OUT = os.path.dirname(os.path.abspath(__file__))
for filename, title, desc, active, body in pages:
    with open(os.path.join(OUT, filename), "w") as f:
        f.write(page(title, desc, active, body))

print("Built", len(pages), "pages")
