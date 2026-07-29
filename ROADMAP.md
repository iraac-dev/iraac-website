# IRAAC Roadmap

> **Purpose of this document.** This is the single source of truth for what
> IRAAC is building, why, and in what order. It exists both for humans and for
> AI agents joining the repository — read it top to bottom before touching
> anything. Everything downstream (copy, UX, data model, infrastructure
> choices) should be traceable back to the framing in the first two sections.

---

## 1. Mission and framing: the listening-and-advocacy model

IRAAC is an Aboriginal Community Organisation. It does not deliver services in
the traditional sense — it *listens* to community members, *advocates* to
government on their behalf, and *reports back* on what changed. That listen →
advocate → report loop is the entire product. Everything the website, the
outreach funnel, the phone surveys, the admin dashboard, and the insights
system exist to do is make that loop faster, more evidenced, and more visible
to the people involved in it.

The cycle band already shown under the homepage hero states it plainly:
**You share → We listen → We recommend to government → We report back.** Every
new feature we build should either strengthen one of those four steps or make
the loop between them shorter. If a feature doesn't do that, it doesn't belong
here yet.

This framing shapes copy, information architecture, tone of voice, and the
relative prominence of features. It is deliberately not a service-provider
framing — IRAAC is not asking "how can we help you?" so much as "what should
we take to government on your behalf, and did what we took last time actually
work?"

---

## 2. Where the site is today

The public site is a flat, static, seven-page HTML build hosted on Vercel with
zero configuration. Each page (`index.html`, `about.html`, `programs.html`,
`governance.html`, `insights.html`, `support.html`, `news.html`,
`contact.html`, `book-a-call.html`, `survey.html`, `offices.html`) is
self-contained: styles and scripts are inlined at the top of the file, so the
whole site is a single flat folder of HTML that can be dragged into a Vercel
project without a build step. `build.py` is the generator — it holds the
shared CSS, nav, footer, and page templates, and rewrites every HTML file when
run. Editing HTML directly works for small fixes but any sitewide change needs
to be made in `build.py` and regenerated, or replicated across every file by
hand.

The homepage funnels visitors into four pathway cards: **Book a Call**
(primary, ochre CTA), **Have Your Say** (the survey), **Drop In**, and **Home
Visit**. Navigation has been trimmed to six items — Home, Our Story, Our
Programs, Governance and Reporting, Insights, Contact — with Supporting Other
Organisations and News reachable via the footer. The hamburger breakpoint sits
at 960px to avoid iPad/mid-size wrapping issues. The "Have Your Voice Heard"
strip runs across the top of every page.

The survey today points to a Google Form (`SURVEY_URL` in `build.py`). This is
the piece that changes in the next phase — the form becomes the front door of
the entire listening loop, not just a passive feedback collector.

---

## 3. What we are building next: the community listening loop

The next major body of work is a full, closed community listening loop. In
plain terms:

1. A community member gives IRAAC their contact details and consent through
   one of four intake channels — filling out the form on the website, being
   visited at home by an IRAAC officer, dropping into an IRAAC office, or
   being reached during a community outreach event.
2. Their contact details and consent status land in a central store. The store
   is currently an Excel spreadsheet; it needs to move to something the rest
   of the system can query.
3. On a rolling monthly basis, a subset of that stored community is contacted
   through a multi-channel funnel — newsletter, email, SMS, and finally an
   outbound phone call — and asked to answer a short set of survey questions.
   Not everyone is contacted every month; the target is around **30% of the
   consented pool per month**, rotating so nobody gets over-contacted.
4. Survey responses are aggregated into insights — for example, "housing is
   the most-raised concern in the Nowra area this quarter" or "bail conditions
   came up in 40% of responses from young men aged 18–25."
5. Those insights are distributed to three distinct audiences, each with its
   own framing:
   - **Community members** via the monthly newsletter — plain-English summary
     of what was heard and what IRAAC is doing about it.
   - **IRAAC staff and partner NGOs** — operational detail, cross-tabulated
     data, project tracking.
   - **Government** — formal advocacy reports, positioned as evidence for
     policy change under Local Decision Making.
6. **The loop closes when we re-survey.** The whole point is not to gather
   complaints; it is to check whether the advocacy actually delivered change.
   Every issue raised eventually becomes a follow-up question: "Last time you
   told us housing was a problem. Has anything changed for you in the last six
   months?"

Nothing about the loop is novel individually — it's a survey program with a
CRM and a newsletter. What is unusual is the emphasis on step 6 and on the
tight framing of steps 4 and 5 around the listening-and-advocacy model. Both
have to be visible in the product, not just implied.

---

## 4. The multi-channel outreach funnel

The funnel is designed to escalate gently from cheap, low-friction contact to
more expensive, higher-touch contact, and to stop escalating the moment
someone responds.

**Stage 1 — Monthly newsletter.** Everyone in the consented pool receives a
monthly newsletter. At the end of each newsletter is a clear call-to-action:
please fill in this month's short survey. Many responses will come from here
and the rest of the funnel becomes unnecessary for those people.

**Stage 2 — Follow-up email.** For anyone who did not open the newsletter or
did not click through to the survey, a follow-up email goes out a week or so
later. The tone is direct: "We need your perspective on this. Can you take
three minutes?"

**Stage 3 — SMS.** If the email doesn't land, a short text message is sent
with a link to the survey. Australian sender ID and unsubscribe rules apply
(see §11).

**Stage 4 — Outbound phone call.** If nothing else has worked, a teleoperator
calls. The script opens: "Hi, I'm calling on behalf of IRAAC — is now a good
time for a couple of quick questions?" The operator runs through the same
survey questions verbally and records the responses.

**Second audience: the Aboriginal business database.** Separately, there is a
publicly-available database of approximately ten thousand Aboriginal
businesses in Australia. These are not consented individuals — they are
business contacts, and the outreach to them is compliance-different (business
communications sit differently under the Spam Act and the Do Not Call
Register). They go through the same funnel — email, SMS, call — but with
different copy and different consent handling. Their responses feed the same
insights layer.

---

## 5. Consent, intake, and data flow

Consent is the load-bearing wall of the entire system. Without valid,
recorded, revocable consent, we cannot call anyone. Everything else in this
project depends on getting consent capture right.

**Intake channels.** A community member enters the system through one of:
- **The website form** (`survey.html` → currently Google Forms → will need to
  become a proper first-party form with a real backend).
- **A home visit** where an IRAAC officer fills the form on the resident's
  behalf, on the resident's device or on the officer's own device.
- **A drop-in** at an IRAAC office where a staff member enters details on a
  shared machine.
- **A community event** where consent is captured on paper and transcribed, or
  digitally on the spot.

**What we capture at intake.** At minimum: name, mobile number, postcode or
office region, and *explicit* consent to be contacted for follow-up surveys.
Optional: preferred contact method, language preference, best time of day to
call, topics the person cares most about.

**Where the data lives today.** In an Excel spreadsheet. Mobile numbers and
consent flags are columns in that sheet.

**Where the data needs to live.** In a proper store — likely Airtable or
Supabase (Postgres) in the short term, so that the campaign runner and the
admin dashboard can query it without anyone maintaining a spreadsheet by hand.
This choice is one of the open decisions in §12.

**Monthly extract.** Each month a job pulls the subset of consented mobile
numbers scheduled for contact that cycle (see §6) and combines them with the
appropriate slice of the business database. That combined list is what feeds
the outreach funnel.

**Revocation.** Every outbound message — SMS, email, and voice — must offer a
clear way to stop being contacted. Revocation must propagate back to the
central store within 24 hours.

---

## 6. Monthly sampling: nobody gets called every month

Contacting the whole consented pool every month would be onerous, annoying,
and would rapidly degrade response rates. The plan is a rolling monthly
sample: roughly **30% of the consented pool** is contacted in any given month,
selected so that no individual is contacted more often than every three to
four months except in unusual circumstances (for example, when a resurvey on a
specific issue is being deliberately targeted).

Rotation is on a per-person basis, not per-region. The sampling logic should
also cap contact frequency per household where possible — if two members of
the same household have both consented, we shouldn't call both in the same
month.

The 30% figure is a starting point. In practice it should be tuned to whatever
volume the calling infrastructure can handle in a month, whatever gives us
statistically meaningful sample sizes per region and per topic, and whatever
keeps community goodwill intact.

---

## 7. IRAAC admin dashboard

IRAAC staff need a separate app — logged-in, not public — that lets them do
the following:

- **See survey activity.** How many surveys have gone out this month, how
  many have come back, what the response rates look like by channel (email
  vs SMS vs call), by region, and by demographic.
- **Read individual responses.** With appropriate handling of anonymity
  preferences.
- **Track KPIs per office.** Each IRAAC office needs to see its own numbers —
  surveys collected during home visits and drop-ins, response rates from its
  region, and how it compares to the sitewide picture.
- **See topic insights.** An aggregated view of what issues are being raised —
  housing, bail, transport, education, health — with volume, trend, and
  regional breakdown.
- **See program tracking.** For each surfaced issue, what IRAAC (or a partner)
  is actually doing about it. This is the piece that lets the loop close: when
  a resurvey goes out asking "has anything changed?", staff need to know what
  intervention that resurvey is measuring the effect of.
- **Compose distribution.** Approve and send the monthly newsletter, the NGO
  briefing, and the government-facing report. The dashboard should draft these
  from the underlying data and let staff edit before sending.

Auth is real. Passwords, sessions, role-based access at minimum (office staff
vs. head office vs. read-only). PII handling must respect Indigenous Data
Sovereignty principles (see §11).

---

## 8. Insights and their three audiences

The same underlying survey data feeds three outputs, each shaped for a
different reader.

**Community newsletter.** Plain English, short, warm. "This month you told us
X. Here's what we did with it." Linked from every page of the site; the
canonical delivery mechanism for the "we report back" leg of the cycle. The
end of every newsletter asks for the next round of input.

**Partner briefings.** Aimed at other Aboriginal Community Organisations, at
NGOs working in the same regions, and at IRAAC staff. More operational
detail, more cross-tabulation, more numbers. Format: a monthly or quarterly
PDF or web report.

**Government advocacy reports.** Formal, cited, positioned as evidence.
Explicitly linked to Local Decision Making outcomes: "You transferred these
decisions to us because we can show you what community is actually telling
us. Here it is." Longer-form, structured, referenced.

All three outputs draw on the same underlying data. Producing them shouldn't
be three separate manual efforts — the dashboard should generate an
audience-appropriate draft of each and let staff shape it before sending.

---

## 9. Closing the loop

The single feature that distinguishes IRAAC from a normal survey program is
that we come back and ask whether anything changed. Every issue raised is
tagged. Every intervention IRAAC advocates for is tagged against those
issues. Every three to six months, a subset of respondents who raised a
specific issue is re-contacted — through the same funnel — with a targeted
follow-up survey.

Concretely: if 300 people in the Wollongong region raised housing as their
biggest concern in March, and in July the state government announced a
housing allocation partly in response to IRAAC's advocacy, then in October we
re-contact a sample of those 300 people and ask whether anything actually
changed for them. The answers to those follow-ups become the next round of
material for the government-facing report — either as evidence that the
change worked, or as evidence that it did not and more is needed.

This is what makes the whole system worth building. Without step 6, IRAAC is
just an opinion-gathering service. With it, IRAAC becomes an evidenced-based
advocacy body that can hold government to account with its own community's
words.

---

## 10. Phased delivery

Building this all at once is not realistic. The order below prioritises
getting a working consent-and-storage layer in place first, then adding
outreach channels one at a time from cheapest to most expensive, then
layering the dashboard and reporting on top.

**Phase 1 — Proper consent capture and storage.** Replace the Google Form
with a first-party form on the site that writes to a real store (Airtable or
Supabase). Migrate the existing Excel data into the store. Give home-visit
and drop-in officers a mobile-friendly version of the same form.

**Phase 2 — Newsletter and email outreach.** Wire the store to an email
platform. Build the monthly newsletter template. Send the first newsletters
and measure open/click/response rates.

**Phase 3 — SMS outreach.** Add SMS as a follow-up channel via an Australian
SMS gateway. Wire unsubscribe/opt-out back to the store.

**Phase 4 — Outbound calling.** Choose and integrate a calling platform (see
§12). Build the operator script. Train initial teleoperators. Start with a
small pilot region before rolling out nationally.

**Phase 5 — Admin dashboard.** Build the logged-in staff app. Start with the
minimum: response viewer, per-office KPIs, and topic insights. Add program
tracking and distribution composer once the basics are solid.

**Phase 6 — Closing-the-loop tracking.** Formalise the issue-tagging and
intervention-tracking model. Build the resurvey scheduler. Publish the first
government-facing report that uses before/after data.

Each phase is publishable and useful on its own. If we get stuck at any
phase, the previous phase still delivers real value.

---

## 11. Compliance and Indigenous Data Sovereignty

Australia-specific compliance is non-optional and needs early legal review.
The main areas:

- **Do Not Call Register (DNCR).** Cold-calling numbers on the DNCR is
  restricted. Research and charity calls have narrow exemptions but the
  conditions matter. Business numbers sit differently from residential.
- **Privacy Act 1988 and the Australian Privacy Principles (APPs).** IRAAC
  needs a clear, published privacy policy covering what we collect, why, how
  long we keep it, and how someone can request access or deletion.
- **Spam Act 2003.** Commercial electronic messages (email, SMS) require
  consent, sender identification, and a functional unsubscribe. Advocacy and
  charity communications may qualify for narrower rules but the safe default
  is Spam Act compliance across the board.
- **Indigenous Data Sovereignty.** The CARE Principles (Collective benefit,
  Authority to control, Responsibility, Ethics) and the Maiam Nayri Wingara
  Indigenous Data Sovereignty principles need to shape how community data is
  stored, who can access it, who benefits from it, and how it is used in
  external reporting. This is not a compliance box — it is the core ethics of
  the entire program and needs to be documented explicitly, ideally with
  community endorsement.
- **ORIC obligations.** As a registered Aboriginal Community Organisation
  IRAAC has corporate governance obligations to the Office of the Registrar
  of Indigenous Corporations. Data handling practices need to sit inside
  those obligations.

Compliance review is a Phase 0 dependency — none of the outbound stages can
launch without it.

---

## 12. Open decisions requiring deep research

These are the choices that need proper investigation before we commit. Each
one has cost, ethics, and operational implications and should not be made on
the fly.

- **Telephony platform.** Twilio, Vonage, Plivo, Aircall, JustCall,
  Zendesk-native. Some are Australia-hosted; some are not. Considerations:
  per-call cost at scale, Australian caller ID, call recording legality,
  operator seat model vs. programmable voice, ability to hand off between
  automated intro and live operator, integration with the store.
- **Live operator vs. IVR vs. hybrid.** A hybrid model (automated intro
  identifying IRAAC and asking permission to proceed, then handing to a live
  operator for the actual survey) is probably right, but the split needs
  testing. IVR-only will have terrible completion rates for this audience.
- **Store and CRM layer.** Airtable is fast to build on but expensive at
  volume. Supabase is a proper Postgres with row-level security and free-tier
  headroom. Retool + Postgres is another route. A hosted CRM (HubSpot,
  Salesforce non-profit tier) is heavier but comes with campaign tooling.
- **Email platform.** Mailchimp, MailerLite, Brevo, Klaviyo, ConvertKit,
  Postmark for transactional. Considerations: Australian data residency,
  segment/tag flexibility for the sampling logic, cost per contact, template
  editor for staff.
- **SMS gateway.** MessageMedia, ClickSend, Twilio SMS, Cellcast. Australian
  short codes vs. alphanumeric sender ID, cost per message, unsubscribe
  handling.
- **Dashboard framework.** Next.js + Supabase (custom, most control),
  Retool (fast, licence cost, less control), Django admin (fast if we have
  Django elsewhere, ugly UI), Refine, or a no-code option like Softr or
  Glide on Airtable. Choose based on how much of the campaign runner logic
  needs to live in the same app.
- **Campaign runner / scheduler.** Where does the "send this month's
  newsletter, then a week later email non-responders, then a week after that
  SMS the still-non-responders, then a week later queue for calling" logic
  live? Options: a small cron-driven service, a workflow tool like n8n or
  Zapier, a purpose-built job queue, or the CRM itself if it has campaigns.

The recommendation is to run a structured evaluation on each of these — cost
model at target volume, Australian legal fit, integration friction,
maintenance burden — and pick the smallest number of pieces that cover the
whole loop. The default assumption should be one integrated stack, not seven
best-of-breed tools stitched together.

---

## 13. How this changes the existing repo

The public marketing site (this repo) stays broadly as it is. `build.py`
continues to generate the flat HTML pages. What changes:

- **`survey.html`** stops pointing at Google Forms and points at a
  first-party form endpoint on the new backend.
- **A new intake form** is embedded on the site (probably as an iframe or a
  small JS widget from the new backend). It must work on mobile and load
  quickly.
- **The admin dashboard is a separate application**, not part of this repo.
  It authenticates staff, reads and writes to the central store, and is
  deployed independently.
- **The campaign runner is a separate service**, again not in this repo. It
  runs on a schedule, reads the store, and drives the email/SMS/call
  platforms.
- **Insights pages on the public site** (`insights.html` and any future
  child pages) may eventually pull live summary numbers from the store via
  a small read-only API. Until then they stay hand-authored.
- **Newsletter templates** live wherever the email platform requires them.

The static site is the front door. Everything else is new build.

---

## 14. Guidance for other agents joining this project

If you are an AI agent picking up work in this repo, read this section
carefully before making changes.

**Framing overrides everything.** Every copy or UX decision traces back to
"You share → We listen → We recommend to government → We report back." If
what you're about to do doesn't fit that loop, stop and ask.

**Deployment reality check.** Rhys has previously spent time debugging a
"missing" change that was in fact already pushed and live — he was viewing a
frozen Vercel preview URL (the pattern with a random code segment) instead
of the clean production domain. When confirming a push has landed:

1. `git log --oneline -1` locally.
2. Cross-check against the GitHub API commit endpoint for the repo.
3. If still uncertain, fetch the raw file from
   `raw.githubusercontent.com/rhy-collab/[repo]/main/[file]` — that is what
   is actually being served publicly.

Never use the preview URL as the source of truth. The clean production
domain is the only address that reflects current state.

**Sitewide edits.** The seven HTML files share nav, footer, and styles. Use
`build.py` where possible. For direct multi-file edits, use a Python
`glob.glob('*.html')` loop, not `sed` — the CSS blocks contain characters
that trip up sed.

**Git operations.** Remote is HTTPS with a token embedded in the URL:
`https://rhy-collab:[TOKEN]@github.com/rhy-collab/iraac-website.git`. The
GitHub account is `rhy-collab`. The PAT is not stored between sessions and
must be re-pasted at the start of each session before pushing.

**Interpreting Rhys.** Instructions often arrive via voice-to-text and
carry transcription noise (words dropped, homophones swapped, occasional
Freudian slips like "Iraq" for "IRAAC"). Interpret intent first, execute,
then push. Rhys prefers a small number of decisions requested up-front over
a long back-and-forth clarifying every point.

**Copy voice.** Warm, direct, respectful. "Have Your Say" not "Quick
Survey." "Book a Call" not "Consultation." "You" and "we," never "the
community" as an object. Voluntary, optional, and anonymous-friendly are
the defaults for anything asking community members to share.

**Compliance is not a blocker to raise later.** If you are working on
anything that touches outbound contact — email, SMS, voice — check §11
first. Do not ship an outbound channel without a compliance review having
happened.
