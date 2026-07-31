# IRAAC Roadmap

> **Purpose of this document.** This is the single source of truth for what
> IRAAC is building, why, and in what order. It exists both for humans and for
> AI agents joining the repository — read it top to bottom before touching
> anything. Everything downstream (copy, UX, data model, infrastructure
> choices) should be traceable back to the framing in the first two sections.

Companion documents:

- [`AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md`](AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md)
  contains the platform comparison, cost model, Australian design constraints,
  voice state machine and source register.
- [`HERMES_DEEPSEEK_BUILD_SUPERPROMPT.md`](HERMES_DEEPSEEK_BUILD_SUPERPROMPT.md)
  converts this roadmap into a guarded, multi-bot execution brief.

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

The public site is a flat, static, eleven-page HTML build hosted on Vercel with
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

### Current capability matrix

| Capability | State now | Important boundary |
|---|---|---|
| Public website | Live | Static public front door only |
| Have Your Say | External Google Form | Exact current consent wording is not verified in this repository |
| In-repo survey page | Demonstration | Does not store production answers |
| Contact/home-visit form | Demonstration | Does not submit to a governed system |
| Book a Call | Public pathway | No production scheduling/call-centre backend in this repo |
| Insights/reports | Hand-authored | No automated data pipeline or approval workflow |
| Central contact/consent store | Not built | Spreadsheets are staging only |
| Email/SMS/voice campaigns | Not built | No provider integration, eligibility engine or suppression ledger |
| Phone operator console | Not built | No canonical phone-assisted survey workflow |
| Admin/auth/audit | Not built | No backend, roles, migrations or audit log |
| Reporting automation | Not built | AI may draft only after governed aggregate pipeline exists |

The repo is public and has no backend, database schema, authentication, job
runner, provider integration, automated tests, privacy policy or operational
runbooks. No bot should mistake an HTML interaction for a production
capability.

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
   through the channels for which each person has given current, specific
   permission — newsletter/email, SMS, and finally an outbound human or
   AI-assisted phone call — and asked to answer a short set of survey questions.
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

**Stage 1 — Monthly newsletter.** People with current newsletter-email
permission receive the monthly newsletter. This audience is separate from the
monthly survey-chase sample. The newsletter contains a voluntary survey link,
but receiving it does not automatically place someone into SMS or call
follow-up.

**Stage 2 — Survey follow-up email.** Only the separately approved rotating
survey sample enters the survey-chase journey. A follow-up email may go out
where there is no verified survey completion, reply, opt-out or other terminal
response. Opens, clicks and tracking pixels never trigger escalation.

**Stage 3 — SMS.** If the email doesn't land and the person has separately
consented to SMS, a short text message is sent with a link to the survey.
Australian sender ID, identification and unsubscribe rules apply (see §11).

**Stage 4 — Outbound phone call.** If nothing else has worked and the person
has separately consented to the relevant call type, a trained operator or an
approved AI voice system calls. The call identifies IRAAC and, for an
automated or AI call, identifies the technology immediately, asks whether it
is a good time and offers a human pathway. The caller runs the same versioned
survey questions verbally and records the answers directly into the governed
survey system. Call recording and persistent transcript storage are off by
default. Autonomous voice necessarily uses disclosed transient audio and
speech-to-text processing; the AI-call permission covers that processing.
Storing audio or transcripts requires a separate current-call choice.

**Second audience: the Aboriginal business database.** Separately, there is a
publicly-available database of approximately ten thousand Aboriginal
businesses in Australia. These are not consented individuals — they are
business contacts, and the outreach to them is compliance-different (business
communications sit differently under the Spam Act and the Do Not Call
Register). A verified number used primarily for business generally cannot be
registered on the DNCR, but the Telemarketing and Research Calls Industry
Standard still applies to questionnaire calls. A publicly listed business
email may support a narrowly relevant business message in some circumstances;
mere publication is not blanket permission. SMS is also an electronic message,
and a newsletter that promotes IRAAC services, events or donations may be
commercial even when a survey invitation is not.

The business cohort therefore uses a **channel-by-channel eligibility gate**,
not an assumed consent funnel:

1. Record the source, licence or permission, collection date, public context,
   business-use evidence and any "no unsolicited contact" statement.
2. Classify the exact message and purpose before treating it as commercial,
   research, advocacy or service information.
3. An approved, relevant first business invitation may be sent only through a
   channel the policy engine and legal review permit.
4. Email, SMS and voice are evaluated independently. No channel is unlocked
   merely because another was allowed or unanswered.
5. Every message identifies IRAAC, explains the source where required, offers
   a simple opt-out and stops immediately after a response, opt-out, complaint
   or suppression.
6. Business respondents who want ongoing citizen or community participation
   enter the same express-consent intake as everyone else.

The exact classifications and launch permissions are Phase 0 legal decisions,
not assumptions embedded in code. This roadmap is an implementation plan, not
legal advice.

---

## 5. Consent, intake, and data flow

Consent is the load-bearing wall of the entire system. Without valid,
recorded, revocable consent, we cannot contact a community participant through
a restricted channel. Everything else in this project depends on getting
consent capture right.

**Intake channels.** A community member enters the system through one of:
- **The website form** (`survey.html` → currently Google Forms → will need to
  become a proper first-party form with a real backend).
- **A home visit** where an IRAAC officer fills the form on the resident's
  behalf, on the resident's device or on the officer's own device.
- **A drop-in** at an IRAAC office where a staff member enters details on a
  shared machine.
- **A community event** where consent is captured on paper and transcribed, or
  digitally on the spot.

**What we capture at intake.** At minimum: name or chosen identifier, contact
details the person volunteers, postcode or office region, privacy notice
acceptance, and the survey answers. The form then presents separate, optional,
unticked choices for:

- newsletter and survey email;
- survey SMS;
- a call from an IRAAC staff member;
- an automated or AI-assisted survey call, with an immediate AI disclosure;
- future follow-up surveys and closing-the-loop research; and
- call recording or persistent transcript storage, only if IRAAC later enables
  it. The AI-call choice separately explains the transient audio and
  speech-to-text processing needed for a live autonomous voice conversation.

Completing the survey does **not** itself create contact permission. The legal
and operational basis is the person's express choice in the survey. Declining
any contact choice must not prevent survey completion or reduce service access.
The wording must be plain, voluntary, current and specific. It must explain
who will contact the person, the purpose, likely frequency, use of AI, how
answers will be used in reports, how to reach a human, and how to withdraw.
Optional: preferred channel, language, accessibility needs, safe time of day
and topics the person cares about.

Every affirmative choice creates an immutable **consent receipt** recording
the person/contact identifier, channel, purpose, contact type (human or AI),
disclosure and survey versions, exact displayed wording, capture mode
(web/in-person/drop-in/phone/paper import), staff/operator if applicable,
timestamp, evidence hash, review or expiry date, and later withdrawal. Consent
is rechecked immediately before every contact attempt.

**Where the data lives today.** In an Excel spreadsheet. Mobile numbers and
consent flags are columns in that sheet.

**Where the data needs to live.** In one governed Postgres store. Supabase in
the Sydney region is the reference implementation, subject to the Phase 0
privacy, Indigenous Data Sovereignty and vendor reviews. Excel and Google
Sheets are import/export staging tools, never a second source of truth.

**Monthly extract.** Each month a job builds separate, immutable audience
snapshots for (a) consented community participants and (b) approved business
prospects. They are never combined into a single undifferentiated list. Each
recipient/channel pair must pass the policy engine immediately before queueing
and immediately before delivery.

**Revocation.** Every outbound message — SMS, email, and voice — must offer a
clear way to stop being contacted. Revocation propagates to the central store
immediately. IRAAC guarantees cancellation while an attempt remains in its own
queue and uses best-effort provider cancellation after acceptance. Use
short-lived dispatch leases, an atomic final eligibility check at handoff,
provider cancellation where supported, idempotent reconciliation and a
`SUPPRESSED_AFTER_PROVIDER_ACCEPTANCE` audit state for unavoidable races.
Statutory maximum timeframes remain outer limits, not the system target.

---

## 6. Monthly sampling: nobody gets called every month

Contacting the whole consented pool every month would be onerous, annoying,
and would rapidly degrade response rates. The starting plan is a rolling
monthly sample: roughly **30% of the eligible, consented pool** is invited in
any given month, selected so that no individual is contacted more often than
their consented frequency and the approved contact policy allow. This is
normally every three to four months, not an automatic monthly AI call.

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
- **Compose distribution.** Generate, review, approve and send the monthly
  newsletter, staff/partner briefing, and government-facing report. Every
  output is a draft until a named administrator approves its exact dataset,
  privacy treatment, recommendations, audience and recipient manifest.

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

All three outputs draw on the same approved, de-identified dataset snapshot.
Code calculates counts, rates and trends; AI may draft narrative from that
bounded snapshot but may not invent statistics or receive raw contact details
or unrestricted free text. Small-cell suppression, evidence-strength labels,
privacy review and named human approval are required before publication or
distribution. Producing the reports should not become three separate manual
efforts, but the system must preserve separate versions, approvals, recipient
lists and immutable distribution manifests for each audience.

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

**Phase -1 — Reconcile the public site.** Before several bots edit the public
site, reconcile `build.py` with the eleven production HTML pages. A current
dry-run rewrites all pages and risks restoring stale placeholders and copy.
Update the README, verify every Have Your Say link, and mark the public repo as
front-door source only. No private data or operational secrets enter this
public repository.

**Phase 0 — Authority, consent and safety.** Obtain Board/community data-use
authority and Australian legal review. Approve citizen consent wording,
business-source classifications, contact policies, AI disclosure and
human-escalation scripts, youth/sensitive-data handling, retention/deletion
rules, report privacy thresholds, incident handling and production release
roles. No real outreach launches before this gate is signed.

**Phase 1 — Proper consent capture and storage.** Build a first-party,
mobile-friendly form and governed store. Run it alongside the existing Google
Form until schema parity, reconciliation and migration are verified; do not
break the live intake path. Import the existing Excel data as untrusted staging
records and preserve its provenance. Do not import old generic consent as AI
voice consent. Give home-visit, phone and drop-in officers the same versioned
survey and consent flow.

**Phase 2 — Control plane and email pilot.** Before production outreach, ship
the minimum admin controls: authentication, roles, consent/suppression
timeline, audience preview, test contacts, approval gate, pause/stop control,
audit log and incident path. Wire an approved email provider, build the
templates, and pilot with internal/synthetic contacts before a small approved
community and business cohort. Opens and clicks are supporting signals, never
the sole reason to escalate.

**Phase 3 — SMS outreach.** Add SMS through an approved Australian-capable
provider, register the IRAAC sender ID if used, and support immediate STOP
handling. Pilot only with channel-eligible contacts.

**Phase 4 — Phone-assisted surveys.** Integrate the approved calling platform
and operator workspace. Human calls come first. The workspace shows masked
identity, provenance, permitted call type, previous attempts, survey version
and next safe action. Build dispositions, attempt caps, quiet hours, live
opt-out, distress/complaint escalation and human handoff. Pilot in one approved
region.

**Phase 5 — AI-assisted calling.** Only after the human pilot, enable a small,
approved AI voice pilot for people with a valid AI-call consent receipt. The
AI identifies itself and IRAAC immediately, asks permission to continue,
offers a human, follows the exact approved survey, never gives legal, health
or crisis advice, and escalates ambiguity, distress, complaint or withdrawal.
Recording/transcription remains disabled without separate permission.

**Phase 6 — Reporting and full admin dashboard.** Add response review,
per-office operational measures, topic insights, deterministic analytics,
three audience-specific draft reports, privacy review, approval, publication
and distribution manifests.

**Phase 7 — Closing-the-loop tracking.** Formalise the issue-tagging and
intervention-tracking model. Build the resurvey scheduler. Publish the first
government-facing report that uses before/after data.

Each phase is publishable and useful on its own. If we get stuck at any
phase, the previous phase still delivers real value.

---

## 11. Compliance and Indigenous Data Sovereignty

Australia-specific compliance is non-optional and needs early legal review.
The main areas:

- **Do Not Call Register (DNCR).** Cold-calling numbers on the DNCR is
  restricted. Numbers used primarily for business generally cannot be
  registered, but dual-use/mobile provenance must be checked. Questionnaire
  research calls and exempt callers still follow the Telemarketing and
  Research Calls Industry Standard, including calling times, identification,
  caller ID, termination and source-information requirements.
- **Privacy Act 1988 and the Australian Privacy Principles (APPs).** IRAAC
  needs a clear, published privacy policy covering what we collect, why, how
  long we keep it, and how someone can request access or deletion.
- **Spam Act 2003.** Commercial electronic messages (email, SMS) require
  consent, sender identification, and a functional unsubscribe. Advocacy and
  charity communications or a pure research invitation may be classified
  differently, but content controls classification. A public business email
  is not blanket permission: conspicuous publication is narrow, must be
  relevant to the person's work, and cannot carry a no-unsolicited-contact
  statement. Address-harvested lists are prohibited. The safe operational
  baseline is clear identity, provenance, relevance and opt-out across the
  board.
- **AI and synthetic voice.** Use of AI does not remove the underlying
  telemarketing, research-call or privacy obligations. IRAAC's stronger
  community standard is immediate AI disclosure, permission to continue,
  human alternative, caller ID, return contact, approved script and auditable
  consent. Consent wording must state its duration: DNCR express-consent rules
  make the difference between a stated period and the default position
  important. External counsel must confirm final wording, duration, scripts
  and classifications.
- **Research and charity classifications.** A factual non-commercial survey
  invitation may fall outside Spam Act commercial-message rules. If IRAAC is
  currently an ACNC-registered charity, designated-message and designated-call
  exemptions may also apply to exact qualifying content. Neither status is
  assumed. Phase 0 must confirm the entity, sender, content, linked pages and
  supplier conditions with counsel. IRAAC still applies identity, relevance,
  opt-out and suppression as a community-trust standard.
- **Audio processing and retention.** Federal, state and territory
  interception and surveillance rules can differ. Call recording and
  persistent transcript storage are off by default. Autonomous voice still
  requires disclosed transient audio and speech-to-text processing, covered
  by the specific AI-call permission. Persisting audio or transcripts requires
  a separate current-call choice, an unrecorded human alternative, short
  retention and a state/territory legal review. Use ephemeral buffers, prohibit
  provider training, verify deletion and regional processing, and keep
  transcripts out of logs and handoff summaries unless separately approved.
- **Cross-border processing.** "Sydney region" does not prove every inference,
  support path, subprocessor, log and backup stays in Australia. APP 8 and
  Indigenous governance require a complete data map and contractual review.
- **SMS Sender ID Register.** If IRAAC uses a branded alphanumeric sender ID,
  it and the sending provider must meet the Australian registration regime
  applying from 1 July 2026. A two-way number or other approved opt-out path
  is required because many branded sender IDs cannot receive "STOP".
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

## 12. Reference architecture and decisions

The baseline to validate through Architecture Decision Records (ADRs) is:

- **Public front door:** keep this static site on Vercel.
- **Admin and operator application:** a separate private TypeScript/Next.js
  application with mobile-friendly phone-assisted survey mode.
- **System of record:** Supabase Postgres in Sydney with Auth, Row Level
  Security, encrypted backups, append-only audit events and private object
  storage.
- **Campaign execution:** a Postgres-backed durable state machine/outbox.
  AWS EventBridge/Step Functions, a self-hosted worker in an approved
  Australian region, or equivalent may schedule jobs, but no third-party
  automation tool owns consent, suppression, approvals or journey state.
- **Email:** Amazon SES is the initial bulk-email candidate. Its public base
  price is about US$0.10 per 1,000 messages, compared with Amazon Connect
  Customer's current US$0.080 per email. Deliverability, staff editing,
  replies, complaints and unsubscribe still require implementation.
- **SMS:** compare Sinch MessageMedia's Australian gateway/two-way messaging
  with AWS End User Messaging. Register the IRAAC sender ID and retain a
  reply-capable STOP path.
- **Human contact centre:** Amazon Connect Customer in Sydney is the leading
  production candidate for progressive/predictive calling, human queues,
  transfers, monitoring and call operations.
- **AI voice:** time-box a technical bake-off between Amazon Connect AI agents
  and Telnyx's current Australian Voice AI locality offering. Twilio
  ConversationRelay is the programmable challenger if an additional benchmark
  is justified. All remain behind IRAAC provider adapters.
- **Reports:** deterministic SQL/TypeScript aggregates into bounded,
  de-identified snapshots; an approved LLM may draft narrative; humans approve
  all releases.
- **Operations:** typed API contracts, structured logs, error monitoring,
  encrypted secrets manager, backups, restore tests and environment-separated
  test/sandbox/production accounts.

The core data model includes: organisations, people/contact identities,
channel endpoints, source/provenance records, consent receipts, suppression
entries, survey definitions/versions/questions, survey sessions/answers,
campaigns, audience snapshots, journeys, contact attempts, provider events,
call tasks/sessions/dispositions, issues, interventions, report snapshots,
report versions, approvals, distributions, incidents and audit events.

The campaign lifecycle is:
`draft → eligibility snapshot → compliance validation → audience hash →
human approval → scheduled → running/paused → completed/cancelled →
reconciled`.

The per-contact journey is:
`eligible → email → timed out/responded/completed/opted out → SMS (if
separately eligible) → call queue (if separately eligible) →
completed/unreachable/opted out/escalated`.

The report lifecycle is:
`dataset snapshot → deterministic calculations → AI draft → privacy and
small-cell review → community/governance review → named approval →
publish/send → immutable distribution manifest`.

### Research conclusion and remaining proof

The detailed comparison is in
[`AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md`](AI_CONTACT_CENTRE_ARCHITECTURE_RESEARCH.md).
Amazon Connect Sydney is the strongest contact-centre baseline; Telnyx is the
strongest current Australian Voice AI locality challenger; Twilio is the best
programmable comparison; Talkdesk and Genesys are managed-enterprise quote
benchmarks. Google and Microsoft become more attractive only if IRAAC adopts
their wider ecosystems.

The production pattern is deliberately hybrid. One vendor does not need to own
every channel. IRAAC owns consent and orchestration, SES handles economical
bulk email, an approved Australian SMS adapter handles texts, and Connect
handles human/AI voice. The adapter boundary prevents lock-in.

Before a platform contract:

1. obtain data maps, DPAs, subprocessors, support access, training use,
   deletion/backup, breach, exit/export and Australian processing commitments;
2. prove Australian caller ID, SMS sender registration, reply/STOP and quotas;
3. prove outbound AI survey + answer-machine classification + human transfer;
4. test at least 200 voice cases covering Aboriginal names/places, diverse
   accents, noise, overlap, silence, wrong person, DTMF, opt-out, distress,
   prompt injection and provider/tool failure;
5. compare full cost at 10,000 emails plus eligible SMS/calls, including
   carrier, agent, number, storage, monitoring and support costs; and
6. keep recording off and confirm whether any AI inference crosses regions.

The voice state machine is explicit:
`ELIGIBILITY_CHECK → DIAL_QUEUED → RINGING → ANSWER_CLASSIFY →
AI_DISCLOSURE → CONSENT_RECONFIRM → SURVEY_Q[n] → ANSWER_CONFIRM/RETRY →
COMPLETE`, with global exits for withdrawal, suppression, human transfer,
callback, link, distress and failure.

The AI never owns survey order or arbitrary writes. It can call only
constrained tools to get the next approved question, repeat/clarify approved
wording, commit/correct an answer, pause, withdraw, request a human or
complete. Two low-confidence recognitions fall back to DTMF, a human or a
secure link.

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

## 14. Agent-native control plane

The API has two technically separate roles:

- `agent_build_test` can inspect masked data, build, validate, use synthetic
  fixtures, send only to allowlisted test destinations, generate drafts and
  request approval; and
- `human_production_operator` can perform approved production actions.

Hermes and build agents receive only `agent_build_test`. Their credentials
must be technically incapable of production queueing, starting, publishing or
distribution. Production actions require a human-only role, two-person
approval, an environment-bound signed approval artifact, exact audience hash,
expiry, rate limit and a server-side interlock. No prompt instruction is
treated as a security boundary.

Agent build/test capabilities include:

- `contacts.import`, `contacts.validate`, `contacts.dedupe`;
- `consent.record`, `consent.revoke`, `consent.check`;
- `suppression.add`, `suppression.check`;
- `survey.begin`, `survey.record_answer`, `survey.complete`;
- `campaign.plan`, `campaign.validate`, `campaign.request_approval`;
- `email.preview/test`, `sms.preview/test`, `call.preview/test`;
- `report.generate`, `report.validate`, `report.request_approval`;
- `audit.search` and `incident.raise`.

Every mutation requires a stable object ID, actor and agent-run ID, reason,
idempotency key and structured result. Dry-run is required where meaningful.
Agents can draft, test and request approval; they cannot approve their own
campaigns, legal classifications, consent wording, report claims or
production distributions. Human-only decisions include law and policy,
Aboriginal community data authority, ambiguous identity/consent, sensitive
interpretation, distress/complaints, government recommendations, credentials
and destructive changes.

## 15. Multi-bot delivery protocol

The control-plane build lives in a new private repository or a clearly bounded
private monorepo, proposed as:

```text
apps/admin
apps/api
workers/campaigns
packages/contracts
packages/provider-adapters
supabase/migrations
docs/adr
docs/privacy
work-orders
```

Before any bot edits:

1. Read this roadmap, the root `AGENTS.md`, current ADRs and `BOT_TASKS.md`.
2. Claim one task ID, one branch/worktree and explicit files. Record
   dependencies, acceptance tests and status.
3. Pull/rebase before work. Never force-push or undo another bot's changes.
4. Keep commits small; migrations are append-only and sequential.
5. Put no secrets, contact lists or raw survey data in prompts, logs, commits
   or fixtures. Use synthetic contacts.
6. Run tests and attach evidence to the work order and pull request.
7. Require reviewer approval and the production release gate. No bot may send
   real email/SMS/calls or publish a report as part of implementation testing.
8. Write a handoff noting decisions, files changed, tests, risks and next task.

Required release tests include API/provider contract tests, RLS/role tests,
consent and suppression race tests, idempotency and duplicate-webhook tests,
quiet-hour/frequency/DNCR policy tests, survey parity across completion modes,
10,000-contact load tests, backup/restore drill, accessibility/mobile operator
tests, AI disclosure and human-handoff tests, report reproducibility,
de-identification and small-cell suppression.

## 16. Guidance for other agents joining this project

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

**Sitewide edits.** The eleven HTML files share nav, footer, and styles. Use
`build.py` where possible. For direct multi-file edits, use a Python
`glob.glob('*.html')` loop, not `sed` — the CSS blocks contain characters
that trip up sed.

**Git operations.** Use the repository's approved GitHub authentication or a
credential manager. Never place access tokens in remotes, prompts,
documentation, logs or commits. Use one branch/worktree per work item and
submit changes through review.

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

---

## 17. Definition of ready for real outreach

The system is not ready to contact a real person or business until all of the
following are true:

- Phase 0 legal, Board/community authority and data-governance approvals are
  recorded;
- the exact list source, message purpose, channel eligibility and templates
  have named approval;
- citizen consent wording and AI disclosure are versioned and tested;
- consent, suppression and audience snapshots are reproducible and auditable;
- a staff member can preview the exact recipients and messages;
- sandbox, internal and small pilot tests pass with no raw PII in logs or LLM
  prompts;
- pause, opt-out, complaint, distress and incident paths have been rehearsed;
- reports are de-identified drafts with evidence-strength labels and require
  named approval; and
- the production interlock requires environment, approval token, audience hash
  and rate limit, preventing an agent or operator from bypassing the gate.
