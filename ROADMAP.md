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
- [`docs/survey/IRAAC_SURVEY_PLATFORM_DECISION.md`](docs/survey/IRAAC_SURVEY_PLATFORM_DECISION.md)
  records the selected survey stack and rejected alternatives.
- [`docs/survey/IRAAC_HAVE_YOUR_SAY_V1_DRAFT.md`](docs/survey/IRAAC_HAVE_YOUR_SAY_V1_DRAFT.md)
  is the complete stable V1 questionnaire draft for human approval.

---

## 1. Mission and framing: the listening-and-advocacy model

IRAAC is an Aboriginal Community Organisation. It does not deliver services in
the traditional sense — it *listens* to community members, *advocates* to
government on their behalf, and *reports back* on what changed. That listen →
advocate → report loop is the entire product. Everything the website, the
outreach pathways, the phone surveys, the admin dashboard, and the reports
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

## 3. What we are building next: two pathways, one evidence loop

IRAAC has two distinct outreach pathways. They use different entry rules and
contact sequences, but they converge on one canonical Have Your Say survey,
one governed evidence store, one suppression service and one reporting cycle.

**Path 1 — Aboriginal business outreach.** IRAAC begins with an approved
cohort drawn from the expected directory of approximately 10,000
Aboriginal-owned businesses. "Approved" means the source, licence, message,
recipient role and exact email or voice action have passed the recorded
policy/legal classification; public listing or Aboriginal ownership alone is
not permission. The value exchange comes first: an approved business receives
the monthly business/community newsletter or report with current insights,
what IRAAC heard, how IRAAC is returning that evidence to government and a
survey link. Only the rotating survey-chase sample advances. If there is no
verified completion or terminal response after the approved waiting period,
IRAAC sends a second, shorter value-first brief with a fresh survey link. If
there is still no completion, an AI survey call may occur only after an
independent, current voice-eligibility decision. SMS is not part of the default
Path 1 sequence.

**Path 2 — direct citizen and community participation.** A person may complete
the canonical survey through the website, a QR code or flyer, an IRAAC or NGO
worker, a community visit, a home visit, a drop-in, an event, a human phone
survey or another approved assisted mode. The survey includes separate,
optional, unticked permissions for newsletter/survey email, SMS, human calls,
AI survey calls and any later audio/transcript storage. Future outreach starts
with the newsletter. Only a person selected into the rotating survey-chase
sample advances to SMS, and then to an AI call, with a fresh eligibility check
for each separately permitted channel.

**One shared loop.** Both pathways write responses through the same versioned
question and answer contract. Each month the platform automatically creates a
de-identified dataset snapshot and three audience-specific drafts:

- the **government advocacy report**;
- the **IRAAC staff, affiliated staff and partner-organisation management
  report**; and
- the **business/community newsletter**.

The approved business/community newsletter is a full-audience publication,
not a 30% sample. The monthly campaign includes every email address that is
currently eligible for that exact newsletter under the recorded Path 1 policy
or Path 2 email permission, except unsubscribed, suppressed, invalid, duplicate,
hard-bounced or otherwise ineligible addresses. New eligible addresses join the
next full monthly audience automatically. The platform creates one complete
audience snapshot and campaign manifest, then may transmit it in controlled
provider waves for deliverability, complaint handling and emergency pause.

The platform calculates metrics deterministically and may draft narrative,
but production distribution starts only after the required named approval has
locked the exact dataset, claims, artefacts and recipient manifest. The
approved production service may then distribute on schedule and write delivery
evidence back to the audit ledger.

The loop closes through re-surveying. Issues become recommendations to
government, recommendations become tracked actions, and later surveys ask
whether circumstances changed. The visible product promise remains:
**You share → We listen → We recommend to government → We report back.**

---

## 4. The two contact journeys

The two pathways use shared orchestration machinery but separate audience
snapshots, policies, cadence, content, metrics and suppression decisions.

### Path 1 — approved Aboriginal business journey

1. **Approved value newsletter/report email.** Every recipient must pass the
   business email policy. The email provides useful monthly findings and
   explains how IRAAC turns community evidence into recommendations to
   government. It ends with a voluntary survey link. Every currently eligible
   Path 1 address is included in the monthly newsletter campaign; the rotating
   sample applies only to later survey chasing.
2. **Rotating survey-chase selection.** Roughly 30% of the eligible business
   survey pool is selected for active follow-up in a month. The newsletter
   audience and the survey-chase sample are different objects.
3. **Second value-first email.** After the approved waiting period, a selected
   contact with no verified survey completion or other terminal response may
   receive a concise report or insight brief, a summary of what changed and a
   fresh survey link.
4. **Policy-eligible AI survey call.** After another approved waiting period,
   a selected contact may be called only when the exact number, purpose,
   research/charity/message classification, AI call and time have passed a
   fresh policy check. The email timeout is not permission. The AI identifies
   itself and IRAAC immediately, gives the purpose, asks whether the person has
   a spare minute, offers a human alternative and runs the same canonical
   survey. If voice is not independently eligible, the journey ends without a
   call.

The default Path 1 journey contains no SMS. A future business SMS step would
need its own approved policy, source and eligibility rule; it cannot be inferred
from an unanswered email.

### Path 2 — citizen/community journey

1. **Direct survey and consent intake.** The person completes Have Your Say by
   web, QR, worker-assisted visit, drop-in, home visit, event, human phone or
   another approved mode. Contact permissions remain optional and separate.
2. **Newsletter email.** Every Path 2 person with current newsletter email
   permission is included in the full monthly newsletter audience, with
   findings, action updates, a survey link and a simple unsubscribe route.
3. **Rotating survey-chase selection.** Roughly 30% of the eligible citizen
   survey pool is selected for active follow-up in a month.
4. **SMS survey link.** After the waiting period and only with current SMS
   permission, a selected person with no completion or terminal response may
   receive a short identified text and survey link.
5. **AI survey call.** After the next waiting period and only with current AI
   voice permission, a selected person may receive the approved AI survey
   call, including immediate AI identity, permission to continue and a human
   pathway.

### Shared transition rules

"Non-response" is a derived state after the waiting period and event
reconciliation. It is never inferred from an email open, pixel, click or
missing webhook. Every transition requires both no current-cycle completion or
terminal response and a fresh eligibility decision for the next action.

Survey completion through any channel or a terminal response stops all
controllable remaining chase attempts for that campaign cycle. Terminal events
are typed: `NEWSLETTER_EMAIL_UNSUBSCRIBE` suppresses the canonical email endpoint
for IRAAC's newsletter purpose; `CHANNEL_STOP` suppresses the approved channel
and purpose; `GLOBAL_STOP`, complaint, wrong-person or safety suppression stops
every channel. Invalid endpoint and hard bounce suppress the affected endpoint.
Provider events
may arrive late or out of order, so state changes use event time,
deduplication, idempotency and reconciliation. One canonical completion key
prevents web, SMS, staff and AI channels from asking the same current-cycle
survey twice.

Newsletter email suppression is channel- and purpose-specific. Unsubscribing
from the newsletter stops future newsletter email but does not itself revoke a
separately granted and still-current human-call or AI-call permission. Every
unsubscribe experience must also offer a clear way to stop all future IRAAC
outreach. A global stop, complaint, wrong-person result or safety suppression
overrides every channel.

### Contact preferences and IRAAC's internal do-not-call list

Every community newsletter, government report email and staff/partner report
email carries a clear, no-login preference link. The preference page offers:

- unsubscribe from that email series;
- stop all IRAAC newsletter/report email;
- stop all human and AI calls from IRAAC;
- manage channel- and purpose-specific choices; and
- stop all non-essential IRAAC outreach.

The link uses a signed opaque token, contains no email address, phone number,
Aboriginal status or other personal data, and reveals no contact details on an
invalid or forwarded link. A recipient can unsubscribe without creating an
account, paying a fee or providing extra personal information. Email replies
such as "unsubscribe", provider complaints and SMS `STOP` enter the same
canonical preference service. IRAAC applies a valid request immediately as its
service standard and always within the legally applicable maximum period.
Subscribed/marketing email also implements authenticated RFC 8058
`List-Unsubscribe` and `List-Unsubscribe-Post` headers where required by the
receiving ecosystem. A normal body-link `GET` shows a confirmation page rather
than mutating state, so security scanners cannot unsubscribe someone; the
authenticated one-click header `POST` is idempotent and does not redirect.
Government and staff distribution lists are not exceptions: unsubscribing
removes the endpoint from that report manifest. If a role must continue to
receive an essential governance notice, an administrator must assign another
approved recipient or use a separately approved essential-notice category; the
system must not silently resubscribe the person.

`VOICE_DO_NOT_CALL` is an endpoint-level, deny-wins suppression covering all
future outbound human and AI calls by or for IRAAC. It is created whenever a
recipient says "do not call", "don't call again", "take me off your call list",
"I'm on the Do Not Call Register", or otherwise indicates that the call should
end. No identity proof, survey completion or repeated confirmation is required.
The deterministic call controller interrupts every conversational state,
writes the suppression, cancels all controllable queued calls and terminates
the call. The LLM may recognise candidate wording, but it cannot decide to
ignore, narrow or reverse a stop request.

The approved acknowledgement is brief. After a confirmed suppression write:

> I'm sorry. I'm ending the call now. IRAAC has recorded that this number must
> not be called again. This is IRAAC's own list, not the Australian
> Government's Do Not Call Register. Goodbye.

If the authoritative write is unavailable, do not falsely claim that it was
recorded:

> I'm sorry. I'm ending the call now. IRAAC has blocked any retry and alerted
> our team to complete your request. Goodbye.

Do **not** say that IRAAC has added the number to the Australian Government's
Do Not Call Register. Only the account holder, nominee or authorised officer
can register an eligible number through the official service. If the recipient
specifically asks about the national Register, provide the approved official
website or contact route after recording IRAAC's suppression, without delaying
termination or making another pitch.

If the suppression write fails, the controller still apologises and hangs up,
places the canonical phone endpoint in an independently durable, encrypted
fail-closed emergency outbox/quarantine, prevents retry and raises an operator
incident. Loss of that independent protection pauses the whole campaign. The
permanent event is reconciled before
any future eligibility check can pass. Store only the minimum evidence needed:
canonical endpoint reference, scope, source channel, request and effective
times, reason category, policy/script version, call/provider correlation and
actor type. Raw audio or a full transcript is not required to honour the stop.
An authorised, separately audited re-permission flow may supersede an internal
suppression only after legal/governance approval; ordinary imports, staff edits,
new consent receipts or provider retries cannot do so.

The statutory Do Not Call Register and IRAAC's internal list are separate
controls. Where a call's legal classification requires list washing, the
eligibility engine records the wash result and date as additional evidence.
An exemption or research-call classification never overrides IRAAC's internal
stop. A person saying they are on the Register is treated as an immediate IRAAC
voice stop even if the number appears to be a business number or the proposed
call may otherwise be permitted.

Canonical phone lookup uses a versioned HMAC-SHA-256 key derived from the
provider-confirmed E.164 endpoint with its secret held in an approved key
manager; never use a reversible URL identifier or an unkeyed phone-number hash.
Phone runtimes may append idempotent stop events but cannot inspect or remove
suppressions. Campaign services receive only allow/deny eligibility. Ordinary
staff cannot enumerate raw endpoints. Exceptional reinstatement for a verified
number reassignment or later explicit re-permission requires proof of endpoint
control, a new channel-specific receipt, named compliance approval, recent MFA,
dual control and an append-only supersession event.

People and organisations remain separate. A person answering on behalf of a
business does not silently convert business contact eligibility into personal
citizen consent. Moving into Path 2 requires the same express consent intake
as every other citizen participant.

The exact business classifications and launch permissions are Phase 0 legal
decisions, not assumptions embedded in code. This roadmap is an implementation
plan, not legal advice.

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

Only after a successful survey submission, every affirmative choice creates an
immutable **consent receipt** recording
the person/contact identifier, channel, purpose, contact type (human or AI),
disclosure and survey versions, exact displayed wording, capture mode
(web/in-person/drop-in/phone/paper import), staff/operator if applicable,
timestamp, evidence hash, and review or expiry date. Later withdrawal is a
separate append-only event linked to the immutable receipt; it never edits the
receipt. Consent is rechecked immediately before every contact attempt. An
abandoned or failed submission creates no contact permission.

**Where the data lives today.** In an Excel spreadsheet. Mobile numbers and
consent flags are columns in that sheet.

**Where the data needs to live.** In one governed Postgres store. Supabase in
the Sydney region is the reference implementation, subject to the Phase 0
privacy, Indigenous Data Sovereignty and vendor reviews. Excel and Google
Sheets are import/export staging tools, never a second source of truth.

**Monthly extract.** Each month a job builds four linked but distinct immutable
snapshots: the full currently eligible Path 1 newsletter audience, the Path 1
survey-chase sample, the full currently email-consented Path 2 newsletter
audience and the Path 2 survey-chase sample. The two newsletter snapshots may
be deduplicated into one full delivery manifest while retaining pathway and
eligibility evidence for each address. The chase pools remain separate. Each
recipient/channel/action pair must pass the policy engine before inclusion,
queueing and delivery.

**Revocation.** Every outbound message — SMS, email, and voice — must offer a
clear way to stop that channel/purpose and a discoverable way to stop all IRAAC
outreach. Revocation propagates to the central store immediately. IRAAC
guarantees cancellation while an attempt remains in its own queue and uses
best-effort provider cancellation after acceptance. Use
short-lived dispatch leases, an atomic final eligibility check at handoff,
provider cancellation where supported, idempotent reconciliation and a
`SUPPRESSED_AFTER_PROVIDER_ACCEPTANCE` audit state for unavoidable races.
Statutory maximum timeframes remain outer limits, not the system target.

---

## 6. Full monthly newsletter and two rotating survey-chase pools

The monthly newsletter goes to **100% of the currently eligible email audience**:
all approved Path 1 business addresses and all Path 2 addresses with current
newsletter email permission. This is one complete monthly audience, not a
sample. It excludes duplicate, unsubscribed, suppressed, invalid, hard-bounced
and policy-ineligible addresses. “Every email on file” is the audience-building
goal, but an address being stored, found online or associated with an Aboriginal
business is not by itself an eligibility decision.

Recurring Path 1 newsletter eligibility fails closed unless the record contains
the source URL or dataset and licence, observed date, published role/context,
absence of a no-unsolicited-contact statement, relevance to that role, entity
and message classification, approved policy/legal-rule version, reviewer,
expiry or revalidation date, and evidence hash. Path 2 requires a current
newsletter-email consent receipt. Missing, stale or conflicting evidence denies
inclusion.

Active survey chasing is different: roughly **30% of each pathway's currently
eligible survey pool** is selected each month. Newsletter delivery alone does
not place an address into that sample and newsletter non-response does not
create permission for SMS or voice.

The system creates one locked full-audience snapshot and send manifest for the
newsletter. Delivery may be throttled into provider waves so IRAAC can preserve
sender reputation, process unsubscribes and complaints, and stop the remaining
queue if a problem appears. Throttling changes transport timing, not audience
coverage. “100%” means inclusion in the approved audience snapshot, not bypassing
a later suppression. Each manifest row records `eligibility_snapshot_at` and a
reconciled outcome such as `SENT`, `DELIVERED`, `FAILED` or
`SKIPPED_SUPPRESSED_AFTER_SNAPSHOT`; reports show planned, attempted, delivered,
failed and newly suppressed counts separately.

Deduplication uses one canonical email endpoint and newsletter purpose per
campaign. Preserve every contributing person, organisation, pathway, provenance
and eligibility decision, but send at most once. A denial, unsubscribe or
suppression on any contributing record wins. Apply the most restrictive content
and permission rule and do not personalise when ownership is ambiguous.

Sampling Path 1 and Path 2 independently does not permit double chasing. A
cross-path contact-pressure gate allows only one active chase assignment per
canonical person or endpoint in a survey cycle and applies approved person,
endpoint, household and organisation frequency caps while retaining both
pathway memberships for analysis.

Path 1 and Path 2 are sampled independently. Selection is reproducible,
auditable and without replacement until the relevant pool has been covered,
subject to consent/policy expiry, suppression, household or organisation caps,
topic relevance and operational capacity. A 90-day cooldown is the initial
planning assumption, so a typical eligible contact is actively chased about
once every three to four months rather than monthly.

Pure randomness can repeatedly select some people while missing others. Use a
seeded rotating sample with documented inclusion/exclusion reasons and, where
the evidence purpose requires it, approved strata for region, age group,
community, business type or other defensible dimensions. Weighting and quotas
must not create misleading precision or expose small groups.

The 30% figure is a configurable target and ceiling, not a promise or a proxy
for representativeness. It is reduced when consent terms, policy, staff
capacity, cultural governance, expected response burden or voice capacity
require it. The monthly report states the eligible pool, selected sample,
completion count, non-response and limitations separately for each pathway.

---

## 7. The canonical survey and admin dashboard

### Have Your Say is the source instrument

Have Your Say is central to IRAAC's operation. Path 1 businesses and Path 2
citizens answer the same current, published survey version. Web, QR, mobile,
tablet, desktop, worker-assisted, drop-in, home-visit, human-phone and AI-phone
modes all write the same answer contract and record the pathway and completion
mode separately.

The survey is mobile-first, device-independent, plain-language and as simple
as the current Google Form. It requires no account. It supports large tap
targets, keyboard and screen-reader use, save/resume where approved, clear
progress, error recovery, low-bandwidth delivery and an immediate human/help
path. A dropped connection must not lose already confirmed answers or create a
duplicate completion.

IRAAC operates one stable Have Your Say instrument. Monthly campaigns,
newsletters and reports use the same active survey; monthly priorities affect
analysis and communication, not the questionnaire. Review the instrument
annually, or sooner only when community governance, evidence, law, safety,
accessibility or methodology requires it. A material change creates a reviewed
immutable successor release. Historical answers retain their exact survey,
question, option, wording, translation and delivery-script versions. Trend
comparisons are allowed only where questions and populations remain comparable;
the system labels or blocks breaks in series.

The survey lifecycle is `DRAFT → CULTURAL_REVIEW → PRIVACY_ETHICS_REVIEW →
METHODOLOGY_REVIEW → BRANCH_TESTED → APPROVED → SCHEDULED → ACTIVE → RETIRED |
WITHDRAWN`. One canonical core is active for a campaign, with approved,
versioned translations and delivery scripts rather than divergent channel
surveys. Each campaign and started session pins its exact version. A normal
in-flight session finishes that version; a critical withdrawal blocks further
submission and presents the approved recovery path. Corrections create a
successor and an explicit comparability decision, never an edit in place.

If an urgent issue requires extra questions before the core review, use a
clearly separate supplemental instrument with its own approval and reporting
limits. Never silently append rotating modules to Have Your Say. Reporting may
classify emerging themes against an approved taxonomy without changing the
respondent-facing instrument.

Survey sessions use `STARTED → IN_PROGRESS → SUBMITTED` for normal completion,
with the optional resume path `IN_PROGRESS → SAVED → RESUMED → IN_PROGRESS →
SUBMITTED`; `EXPIRED`, `ABANDONED` and `WITHDRAWN_VERSION` are terminal states.
Opaque resume tokens expire and
contain no identity. A completion key exists only after a successful submit.
Partial answers are excluded from monthly reporting unless an approved
methodology includes and labels them. An abandoned anonymous session creates
no permission to contact anyone.

The final screen separately records:

1. acceptance of service Terms only if Phase 0 determines Terms are genuinely
   required;
2. acknowledgement that the current Privacy Notice was presented;
3. the approved acknowledgement or consent for the core collection and
   de-identified reporting purpose;
4. separate optional secondary-research consent if that purpose differs from
   the core purpose; and
5. optional, unticked, channel-specific future-contact permissions.

A privacy-notice acknowledgement or Terms acceptance is not bundled consent
for newsletters, SMS, human calls, AI calls, secondary research reuse or
recording. Each optional permission remains voluntary and declining it does
not block survey submission or services. The record stores distinct Terms,
Privacy Notice, response-use and channel-consent versions and evidence hashes.
Answers may be submitted anonymously. Contact details are optional unless the
person requests follow-up; anonymous responses can contribute to safe
aggregates but never to recontact.

Identity/contact data is separated from structured answers through internal
identifiers and stricter access policies. The write path is server-side,
idempotent and validated; public clients never receive privileged database
keys. RLS is enabled on exposed Supabase tables, production forms cannot read
other responses, and report jobs use approved de-identified views/snapshots
rather than querying raw contact records.

### Selected survey technology

The reference implementation is a small IRAAC-owned Next.js and TypeScript
application. SurveyJS Form Library renders the mobile/web form but does not own
the survey definition or response data. An IRAAC deterministic execution engine
and Zod contract own stable IDs, validation, branching and state. Supabase
Postgres in Sydney is the governed system of record. Vercel functions are
configured for Sydney. Web, staff, human-phone and AI-phone experiences use
modality-specific adapters against the same contract and prove parity with
shared conformance fixtures.

Do not build a general drag-and-drop form builder in phase one. Agents and
authorised editors may draft a successor, produce a semantic diff, render
previews and run tests. Named humans approve cultural meaning, methodology,
privacy/consent, safeguarding, comparability, publication, withdrawal and
rollback. The stable IRAAC-owned address is
`https://www.iraac-aco.com/survey`; provider or deployment URLs are never the
durable public address.

### Private admin dashboard

IRAAC staff need a separate logged-in app that lets them do the following:

The public website footer will include an **Admin** link directly beneath
**Contact Us**. It opens the IRAAC admin sign-in page; it never exposes the
dashboard itself. Add the footer link only in the same reviewed release that
puts the authenticated admin route into production, so the public site never
ships a dead link or a misleading static password screen.

The originally suggested four-digit shared password must not be used. A value
written into public HTML or JavaScript is visible and bypassable, and a shared
credential cannot show which person viewed, changed or approved a report. The
initial low-friction release therefore uses invite-only, named Supabase Auth
accounts, server-validated sessions and mandatory MFA. Authorisation is
enforced again in the API and database through role and row-level policies.
Passwords and signing secrets live only in the managed authentication service
or protected environment configuration, never in this public repository. A
later access-group or single-sign-on option may simplify onboarding without
removing individual accountability.

The approved bootstrap contact is `info@iraac-aco.com`. Create its Auth identity
with a short-lived, single-use `inviteUserByEmail` flow from a restricted,
audited server-only operator action. The Supabase secret key stays in the
approved secret manager and never reaches a browser, `NEXT_PUBLIC` value, Git,
documentation, logs, tickets, prompts or deployment output. The invitation is
bound to the exact email, intended bootstrap role, approved admin origin and
callback allowlist. Login, invitation and recovery responses do not reveal
whether an account exists.

Do not configure or reuse the password disclosed during planning. Treat it as
compromised, rotate it anywhere IRAAC has already used it, check repository
history and generated/build artefacts for accidental copies, and record
credential-closure evidence without retaining the secret. The invite lets the
custodian establish a new unique password outside planning/chat. Its first
authenticated AAL1 session may reach only activation, password creation, MFA
enrolment/challenge, recovery status and sign-out. Dashboard pages, private
APIs, storage and data require an authorised role plus AAL2 at middleware, API
and restrictive RLS layers.

The generic mailbox is never a shared everyday staff identity. Interactive
bootstrap sign-in is permitted only when a governance record binds it to one
named human custodian with exclusive mailbox access and an individual MFA
factor. Otherwise it is notification-only and cannot authenticate. The
bootstrap role cannot read survey, contact, safety or report data; export,
approve, publish, invite arbitrary users, grant roles, recover another account
or elevate itself. A restricted operator invite creates at least two separately
verified named administrators with separate MFA before production. The
bootstrap principal then moves atomically to `bootstrap_notification_only`, all
sessions and refresh tokens are revoked, stale claims are rejected, and
interactive sign-in is disabled. Privileged recovery requires two named
custodians, recent strong authentication, out-of-band notification and an
append-only audit record.

The reference production entry point is
`https://admin.iraac-aco.com/login`. The private deployment owns that origin,
its cookies and authentication callbacks. DNS, TLS, callback allowlists,
content-security/referrer policy and a readiness check must pass before the
public footer publishes the link. Publishing, withdrawing or rolling back a
survey/report, changing roles, sending invitations and recovering a privileged
account require a recent step-up MFA check. Invitations are short-lived and
single-use; publisher recovery uses dual control; removal revokes active
sessions. Cross-origin mutations use an approved CSRF-resistant session
pattern and every sensitive action binds to the exact artefact hash.

- **See survey activity.** How many surveys have gone out this month, how
  many have come back, what the response rates look like by channel (email
  vs SMS vs call), by region, and by demographic.
- **Access minimum necessary response detail.** Only for an approved
  operational purpose. Anonymous responses are never reidentified. Sensitive
  free text is masked by default; access is purpose-bound, logged and limited
  by office/affiliate data-sharing rules. Report reviewers normally use
  de-identified aggregates.
- **Track KPIs per office.** Each IRAAC office needs to see its own numbers —
  surveys collected during home visits and drop-ins, response rates from its
  region, and how it compares to the sitewide picture.
- **See topic and outcome trends.** An aggregated view of what issues are being raised —
  housing, bail, transport, education, health — with volume, trend, and
  regional breakdown. Show better/worse/unchanged only where survey versions,
  populations and evidence thresholds support the comparison.
- **See program tracking.** For each surfaced issue, what IRAAC (or a partner)
  is actually doing about it. This is the piece that lets the loop close: when
  a resurvey goes out asking "has anything changed?", staff need to know what
  intervention that resurvey is measuring the effect of.
- **Track engagement operations.** Email delivery, bounce, complaint and
  unsubscribe rates; SMS delivery/STOP; call attempts, answers, survey
  completions, transfers, callbacks and opt-outs; conversion by pathway,
  channel, region and campaign stage; provider cost/capacity and incidents.
- **Manage the report workflow.** Generate, compare, comment on, revise,
  approve and schedule the community, staff/partner and government reports.
  Every output is a draft until named approvers lock its dataset, privacy
  treatment, claims, recommendations, artefact and recipient manifest.
- **Review what people think is missing.** See suggestions submitted through
  the survey or received as replies to report/newsletter emails; acknowledge,
  deduplicate, classify, assign and close them. Accepted suggestions enter the
  governed issue or survey-review backlog. A reply or suggestion never changes
  the active survey automatically.

Auth is real. Passwords, sessions, role-based access at minimum (office staff
vs. head office vs. read-only), MFA for every privileged account, rate limits,
session expiry, account recovery and access revocation are required. PII
handling must respect Indigenous Data Sovereignty principles (see §11).

The dashboard distinguishes operational KPIs (attempts, delivery, response,
timeliness, workload and cost) from community outcome indicators (whether an
issue is becoming better, worse or unchanged). It never treats outreach volume
as community impact or attributes change to IRAAC without supporting evidence.

A versioned KPI registry defines each metric's purpose, formula, numerator,
denominator, exclusions, owner, target, reporting window, timezone, source
freshness, office-attribution rule and limitation. Dashboard values show
`CURRENT`, `PROVISIONAL`, `STALE`, `BACKFILLED`, `SUPPRESSED` or
`DATA_INCOMPLETE`. Trends are only `BETTER`, `WORSE` or `UNCHANGED` when the
evidence supports them; otherwise they show `INSUFFICIENT_EVIDENCE`,
`NOT_COMPARABLE`, `SUPPRESSED` or `DATA_INCOMPLETE`, with visible lineage.

---

## 8. Reports and their three audiences

The same underlying survey data feeds three outputs, each shaped for a
different reader.

**Business/community report and newsletter.** Plain English, short and warm:
"This month you told us X. Here is what we did with it." The newsletter ends
with the next survey invitation. Its approved public version is accessible to
everyone through the website's Reports section.

**IRAAC staff, affiliated staff and partner-organisation management report.**
More operational detail, safe cross-tabulation, service response, campaign and
office KPIs, topic/outcome trends, actions, capacity and management decisions.
It stays private in the admin dashboard and is distributed only to an approved
recipient manifest.

**Government advocacy report.** Formal, cited, positioned as evidence.
Explicitly linked to Local Decision Making outcomes: "You transferred these
decisions to us because we can show you what community is actually telling
us. Here it is." It stays private in the admin dashboard unless a separately
approved public version is created.

Every distributed community newsletter, staff/partner report email and
government report email ends with the same governed listening invitation:

> **What are we missing?**
> Please reply to this email if there is an issue IRAAC should explore, a
> question the survey should ask, or something important you believe has been
> missed. We would love to hear from you. Every suggestion is reviewed by
> IRAAC and may inform a future report, investigation or governed survey
> revision.

It then shows a governed contact-preference footer with three prominent actions:

> **Your contact choices**
>
> [Unsubscribe from these emails] · [Stop IRAAC calls] · [Manage all contact
> preferences]

The exact link labels may be refined in accessibility testing, but none may be
hidden, preselected, bundled with survey participation or routed through login.

Use a monitored IRAAC `Reply-To` address. Inbound replies are untrusted content
and enter a suggestion queue with source, audience, message/report version,
received time and acknowledgement state. They do not count as report approval,
consent, a survey response or permission to contact the writer through another
channel. Automated acknowledgements must avoid repeating sensitive content.
Named staff triage each suggestion through `NEW → ACKNOWLEDGED → ASSIGNED →
IN_REVIEW → SAFETY_ESCALATED | LINKED_TO_EXISTING | ACCEPTED_FOR_REVIEW |
NO_CHANGE_NEEDED → CLOSED`. Accepted items
go to the issue taxonomy, a supplemental investigation or the next governed
survey review; they never mutate the active questionnaire directly.
The suggestion record permanently retains its untrusted-source label. Staff
views render it only as escaped plain text. Linking or promoting a suggestion
preserves an internal reference; it never copies raw text into an AI prompt,
tool instruction or external issue. A named person writes the neutral summary
used in a report, investigation or survey-change proposal.

Only successfully submitted survey text is monitored. G05 must say this before
the person types, repeat the immediate-help paths beside the field and preserve
them through review/submit; abandoned or unsent text creates no monitoring
promise. Before launch, IRAAC approves expected and burst volume, trained
reviewer capacity, queue-age alerts, on-call ownership and a safe backlog
threshold. If capacity is exceeded, the platform pauses G05 collection and
shows the approved human contact pathway rather than accepting unreviewable
text. Abuse quarantine cannot silently suppress a safety concern.

An internal government or staff artefact is never published directly. Any
material intended for public release becomes a new `community_public`
derivative with its own redaction, accessibility, claims, artefact hash and
approval cycle.

All three outputs draw on one locked base dataset snapshot and separate
audience-specific de-identified derived views.
Code calculates counts, rates and trends; AI may draft narrative from that
bounded snapshot but may not invent statistics or receive raw contact details
or unrestricted free text. Small-cell suppression, evidence-strength labels,
privacy review and named human approval are required before publication or
distribution. Producing the reports should not become three separate manual
efforts, but the system must preserve separate versions, approvals, recipient
lists and immutable distribution manifests for each audience.

### Public Reports section

The public navigation label **Insights** becomes **Reports**. Create
`reports.html` and keep `insights.html` as a permanent redirect or compatibility
alias so old links do not break. The Reports index lists every approved public
community report—not internal staff or government material—with title,
publication date, reporting period, topic/type, short summary and a link to a
full accessible web page and optional approved download. Reports are ordered
newest first and have stable URLs and metadata.

Publication is automatic only after the report has reached
`APPROVED_LOCKED` with `audience=community_public`, passed privacy/small-cell checks and
has an approved public artefact hash. The production publisher creates the
page/index entry and then verifies the deployed URL and content hash. Withdrawal
or correction creates a visible version/retraction record rather than silently
rewriting history.

Publication moves through `QUEUED → BUILDING → DEPLOYED_UNVERIFIED →
VERIFIED_PUBLISHED | FAILED → RETRY_PENDING | ROLLED_BACK`. The Reports index
changes only after route, audience, privacy status and deployed hash
verification; failure leaves the previous index intact. Phase 0 must decide
whether the publication source of truth is a reviewed Git/Vercel release, a CMS
or an object-backed runtime feed.

### Review, comments and approvals

Email is a notification and comment-entry channel, not the authority source.
Each reviewer receives an individual message with a signed, expiring link to
the exact dashboard report version. They can approve, request changes or leave
section-level comments. If IRAAC later ingests email replies, it stores the
reply as an untrusted comment attached to the review thread; words such as
"approved" in free text never create an approval event.

AI may turn reviewer comments into a proposed redline against a new draft
version. It does not silently edit an approved report. A human accepts or
rejects each proposal in the dashboard. Changing a statistic, sentence,
recommendation, attachment, audience, recipient or public page invalidates the
affected approval and starts a new review round. Once the configured legal,
privacy/community, program and report owners approve the locked version, the
production service may publish or distribute it automatically.

The full report lifecycle is `DATASET_READY → METRICS_VALIDATED → DRAFT →
IN_REVIEW → CHANGES_REQUESTED → REVISING → READY_FOR_APPROVAL →
PARTIALLY_APPROVED → APPROVED_LOCKED → SCHEDULED → PUBLISHING | DISTRIBUTING →
PUBLISHED | SENT → FAILED → CORRECTED | RETRACTED | SUPERSEDED`. Required roles,
quorum, order, separation of duties, expiry and conflicts are policy-defined by
audience and sensitivity. Deadlines cause reminders and escalation, never
automatic approval. Approval requires an authenticated reviewer session or
equivalent strong verification; forwarded, expired, revoked or replayed links
cannot approve.

Private reports use authenticated portal access or expiring, recipient-bound
downloads; notification email contains minimal metadata and no sensitive
attachment by default. Access/downloads are audited. Removing a recipient is
always permitted before dispatch; adding, substituting or correcting one
changes the manifest and requires approval. Provider retries may use only the
identical artefact, recipient and approved retry window.

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

Building this all at once is not realistic. The order below prioritises a
working consent-and-storage layer first, adds lower-risk outreach channels one
at a time, establishes reporting and full administrator controls, and only then
enables the AI voice pilot.

**Phase -1 — Reconcile the public site.** Before several bots edit the public
site, reconcile `build.py` with the eleven production HTML pages. A current
dry-run rewrites all pages and risks restoring stale placeholders and copy.
Update the README, verify every Have Your Say link, and mark the public repo as
front-door source only. No private data or operational secrets enter this
public repository.

**Phase 0 — Authority, consent and safety.** Obtain Board/community data-use
authority, the appropriate research/ethics determination and Australian legal
review. Confirm IRAAC's entity and ACNC status. Separately classify the exact
Path 1 initial invitation, recurring newsletter, value brief, linked pages and
research-only AI call. Approve citizen consent wording and duration, business
sources, contact policies, AI disclosure and human-escalation scripts,
youth/sensitive-data handling, retention/deletion rules, report privacy
thresholds, incident handling and production release roles. No real outreach
launches before this gate is signed.

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
community and business cohort. Run a provider-acceptability review before
using SES for directory-derived Path 1 contacts; SES production-access rules
expect requested email. Written AWS acceptance and written Australian legal
approval for this exact recipient class are launch-blocking prerequisites. If
either is absent, SES is restricted to explicit opt-ins and must not send to
directory-derived recipients; use only another provider and sequence that have
their own recorded provider and legal approval. Authenticate SPF, DKIM and
DMARC, implement one-click
unsubscribe where required, warm volume gradually, throttle by domain, monitor
bounces/complaints/spam rate and stop automatically at approved thresholds.
Opens and clicks are supporting signals, never the reason to escalate.

**Phase 3 — SMS outreach.** Add SMS through an approved Australian-capable
provider for Path 2, register the IRAAC sender ID/ABN relationship, prefer a
two-way reply-capable number for STOP, and support immediate suppression. Pilot
only with separately SMS-consented and eligible contacts. Path 1 has no SMS in
the default sequence.

**Phase 4 — Phone-assisted surveys.** Integrate the approved calling platform
and operator workspace. Human calls come first. The workspace shows masked
identity, provenance, permitted call type, previous attempts, survey version
and next safe action. Build dispositions, attempt caps, quiet hours, live
opt-out, distress/complaint escalation and human handoff. Pilot in one approved
region.

**Phase 5 — Reporting and full admin dashboard.** Add response review,
per-office operational measures, topic/outcome trends, deterministic analytics,
three audience-specific draft reports, privacy review, approval, publication
and distribution manifests.

**Phase 6 — AI-assisted calling.** Only after the human pilot and the reporting
and admin control plane are operating, enable a small, approved AI voice pilot
for people with a valid AI-call consent receipt. The AI identifies itself and
IRAAC immediately, asks permission to continue, offers a human, follows the
exact approved survey, never gives legal, health or crisis advice, and
escalates ambiguity, distress, complaint or withdrawal.
Recording/transcription remains disabled without separate permission.

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
  IRAAC cannot add a person's number to the statutory Register. A verbal
  request instead creates an immediate `VOICE_DO_NOT_CALL` entry in IRAAC's
  internal suppression ledger, ends the call and blocks future IRAAC calls.
  This trust rule applies even where a research or other exemption may exist.
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
- **Value-first content is not automatically exempt.** Classification depends
  on the entire message, presentation and linked content. Keep the one-time
  factual/research invitation, recurring newsletter subscription and any
  promotional material as distinct templates and policy decisions. A
  commercial message cannot be used merely to ask for consent.
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
- **Research ethics and Indigenous governance.** Phase 0 must determine whether
  the program is research, evaluation or community consultation and obtain the
  appropriate ethics/governance review under the current NHMRC National
  Statement, AIATSIS guidance and IRAAC's Aboriginal-led data authority. The
  determination covers sampling, AI voice, intended reports, access, reuse and
  secondary uses, not just the survey form.
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
- **Canonical survey runtime:** a public, no-account, mobile-first application
  using the same versioned contracts as the staff and phone renderers. It
  writes through a server API; public clients never receive database secrets or
  response-read access.
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
- **Public report publisher:** a narrowly scoped production service writes only
  the locked community artefact and index metadata into stable public report
  routes, triggers Vercel and verifies the deployed content hash. It cannot
  access contacts, private report versions or internal recipient manifests.
- **Operations:** typed API contracts, structured logs, error monitoring,
  encrypted secrets manager, backups, restore tests and environment-separated
  test/sandbox/production accounts.

The core data model includes: organisations, people/contact identities,
organisation relationships, pathway memberships, channel endpoints,
source/provenance records, consent receipts, suppression entries, statutory
DNCR check evidence, signed preference-link tokens, survey
definitions/releases/questions/options, survey-release questions, reporting taxonomies,
survey review decisions, survey sessions/answers, Terms/Privacy/response-use
versions, campaign cycles,
content artefacts/versions, audience snapshots, sample assignments, journeys,
journey stages, survey invitations, completion correlations, terminal
responses, contact attempts, provider events, call tasks/sessions/dispositions,
issues, interventions, report snapshots, report versions, approvals,
review threads/comments, report publications, distribution attempts/manifests,
metric definitions/snapshots, dashboard targets, trend-comparability decisions,
incidents and audit events.

The campaign lifecycle is:
`draft → eligibility snapshot → compliance validation → audience hash →
human approval → scheduled → running/paused → completed/cancelled →
reconciled`.

The Path 1 journey is:
`approved business value email 1 → selected into rotating chase sample →
no-response timeout → business value email 2 → no-response timeout → AI call
only if independently policy-eligible → completed/unreachable/terminal`.

The Path 2 journey is:
`citizen intake and consent → newsletter → selected into rotating chase sample
→ SMS only if separately consented and eligible → AI call only if separately
consented and eligible → completed/unreachable/terminal`.

"Non-response" is a reconciled state, not an assumption. A hard bounce,
invalid endpoint or complaint suppresses that endpoint and does not authorise
another channel. Soft bounces use a finite approved retry rule. Busy, no
answer, voicemail, failed, wrong-person and callback-requested call outcomes
have separate dispositions. A completion or terminal response received during
a dispatch race cancels every controllable later step.

The report workflow uses the policy-defined lifecycle in §8. A locked base
snapshot produces three separate derived views and artefacts; each then carries
its own reviews, approvals, publication or distribution state and immutable
manifest.

Report creation and distribution are separate releases. An approval packet
freezes the source snapshot and query/code hashes, deterministic metrics,
privacy treatment, exact narrative and recommendations, evidence-strength and
limitations statement, attachment/page hashes and recipient manifest. Changing
a statistic, sentence, recommendation, attachment, recipient or destination
invalidates the affected approval and requires reapproval.

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

`VOICE_DO_NOT_CALL` is a priority exit from every state, including the opening
and voicemail/answer-classification boundary where recipient speech is
available. The acknowledgement contains no claim that IRAAC controls the
Australian Government's Register. Suppression is committed before normal
hang-up where possible; failure still terminates and quarantines the endpoint.

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
- **Reports on the public site.** Add `reports.html` and stable community-report
  child pages. Keep `insights.html` as a compatibility redirect. Only approved
  community artefacts reach the public site through a minimal read-only
  publication feed; internal staff and government reports never appear there.
- **Newsletter templates** live wherever the email platform requires them.

The static site is the front door. Everything else is new build.

---

## 14. Agent-native control plane

The platform has two operating paths and three technically separate actors.

**Build/test — `agent_build_test`.** Hermes and other build agents may inspect
masked data, use synthetic fixtures, implement software, simulate policy,
create previews, validate release candidates and submit approval packets.
Their credentials work only in development/test and against allowlisted
provider destinations.

**Production decision — `human_production_approver`.** Named people review the
legal/policy basis, exact audience, content, sequence, privacy treatment,
recommendations, test evidence and rate/cost bounds. Approval freezes these
inputs into a signed release bundle.

**Production execution — `production_campaign_service`.** A non-interactive
service principal executes only a current, environment-bound, signed bundle.
It cannot create or approve a bundle, expand an audience, change content or
eligibility, or exceed the approved schedule, attempts, rate or cost ceiling.
A `human_production_operator` may activate an approved release and pause, stop
or reconcile it, but cannot mutate it. Material changes move the release to
`STALE_REQUIRES_REAPPROVAL`.

Hermes credentials are technically incapable of accessing production PII or
production provider endpoints, queueing or starting production work, approving
a release,
publishing a page or distributing a report. A prompt prohibition is not a
security boundary.

Test and production provider credentials and destination allowlists are
separate and enforced server-side. `channel.send_allowlisted_test` can use only
synthetic fixtures, test credentials and approved test destinations; no value
from an agent request can select a production credential or destination.

Hermes build/test capabilities are:

- `test_contacts.import_synthetic`, `test_contacts.validate`,
  `test_contacts.dedupe`, `contacts.inspect_masked`;
- `test_consent.record`, `test_consent.revoke`, `consent.simulate_check`;
- `test_suppression.add`, `suppression.simulate_check`;
- `test_survey.begin`, `test_survey.record_answer`, `test_survey.complete`;
- `campaign.plan`, `campaign.dry_run`, `campaign.validate`,
  `campaign.build_approval_packet`, `campaign.request_approval`;
- `channel.preview`, `channel.send_allowlisted_test`;
- `report.generate_draft`, `report.validate`,
  `report.build_approval_packet`, `report.request_approval`;
- `approval.status`, `approval.read_feedback`,
  `workflow.resume_after_decision`;
- `audit.search_masked`, `incident.raise`.

Production capabilities such as `approval.decide`,
`production_release.activate`, `production_campaign.start`,
`production_campaign.pause_or_stop` and
`production_report.publish_or_distribute` do not exist in agent credentials.
The server rejects cross-environment IDs even if an agent constructs a
production endpoint manually.

### Shared workflow contract

Humans, agents and production services use the same typed workflow objects and
append-only ledger. Providers necessarily retain execution and delivery state,
but that state is non-authoritative and is reconciled through signed,
idempotent provider events into IRAAC's append-only ledger. Provider state can
never create, revoke or modify consent, suppression, approval or journey state.
There are no parallel spreadsheets or hidden provider records that IRAAC treats
as authoritative.

The release lifecycle is:
`DRAFT → VALIDATED → AWAITING_APPROVAL → CHANGES_REQUESTED → APPROVED_LOCKED →
SCHEDULED → EXECUTING ↔ PAUSED → RECONCILING → COMPLETED | ABORTED`.
Changing an approval-bound input creates `STALE_REQUIRES_REAPPROVAL`.

Each approval packet includes the environment and action, campaign/report and
policy versions, exact content/script and audience hashes, survey version,
provider/regional configuration, schedule, quiet hours, retry/rate/cost bounds,
privacy rules, test evidence, rollback/pause plan, named preparer and
approver(s), timestamp and expiry. The production interlock verifies the bundle
before queueing and provider handoff. Approval never replaces the final
consent, suppression and eligibility check.

Every mutation records a stable object ID, actor type, actor/run ID, reason,
causal event, previous and next state, idempotency key, approval/policy IDs,
artifact hashes and timestamp. Agents cannot approve their own campaigns,
legal classifications, consent wording, report claims or distributions.

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

The suppression suite must also prove that every approved verbal stop phrase
and a generic "I don't want to continue" interrupt every AI-call state; a
shared/wrong-person endpoint is not redialled; a failed database write causes
hang-up plus fail-closed quarantine; an accepted-provider race cannot retry;
email unsubscribe needs no login or extra data; forwarded/expired preference
links reveal no identity; report-series, all-email, voice-only and global stops
have the intended scopes; and no agent, import or fresh consent silently
reactivates a suppressed endpoint.

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
