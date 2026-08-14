"use client";

import { useRouter } from "next/navigation";

type FundingMessage =
  | {
      role: "problem";
      title: string;
      body: string;
    }
  | {
      role: "agent";
      author: string;
      body: string;
    };

const recentThreads = [
  {
    title: "ACCO transport support",
    subtitle: "Ready for review",
    preview: "Looking for a grant, vehicle support, or a small finance option for community transport.",
    active: true,
  },
  {
    title: "Youth program equipment",
    subtitle: "Shortlist ready",
    preview: "A mixed funding path for laptops, workshop materials, and delivery costs.",
  },
  {
    title: "Business readiness check",
    subtitle: "Waiting on evidence",
    preview: "Needs ABN, trading history, and a clearer purpose before a shortlist can be drafted.",
  },
  {
    title: "Cultural camp support",
    subtitle: "Human handoff requested",
    preview: "Needs a Sebenza consultant to confirm suitable grant and acquittal options.",
  },
];

const activeMessages: FundingMessage[] = [
  {
    role: "problem",
    title: "Problem",
    body: "Funding for community transport and program delivery for an Aboriginal organisation.",
  },
  {
    role: "agent",
    author: "IRAAC Funding Agent",
    body:
      "I’m checking current official sources, basic readiness, and missing facts before I draft a shortlist. I can prepare work, but I cannot promise eligibility or submit anything on your behalf.",
  },
  {
    role: "agent",
    author: "IRAAC Funding Agent",
    body:
      "The first pass is looking strongest for a transport-related grant, an Indigenous business support pathway, and a readiness checklist for evidence and timing.",
  },
];

const opportunityCards = [
  {
    type: "Grant",
    title: "business.gov.au - Grants and Programs finder",
    detail: "Use for Commonwealth grants, programs, and business support pathways.",
  },
  {
    type: "Grant",
    title: "GrantConnect",
    detail: "Primary source for Australian Government grant opportunities and guidelines.",
  },
  {
    type: "Support",
    title: "NIAA grants and funding",
    detail: "Indigenous Advancement Strategy and current Indigenous program guidance.",
  },
  {
    type: "Finance",
    title: "Indigenous Business Australia",
    detail: "Business support and finance products for Aboriginal and Torres Strait Islander businesses.",
  },
];

const sourceCatalogue = [
  "business.gov.au",
  "GrantConnect",
  "National Indigenous Australians Agency",
  "Indigenous Business Australia",
  "NSW grants and business support",
  "Approved local and philanthropic sources",
];

const artefacts = ["Shortlist", "Readiness checklist", "Evidence list", "Draft outline", "Deadline plan"];

export default function AdminFundingPage() {
  const router = useRouter();

  return (
    <div className="admin-page-content admin-funding-page">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">Staff console</p>
          <h1>Funding</h1>
        </div>
        <div className="admin-stat-badge">Windowed workspace</div>
      </div>

      <div className="admin-funding-window">
        <aside className="admin-funding-sidebar">
          <button type="button" className="admin-funding-back" onClick={() => router.back()}>
            ← Back
          </button>

          <button type="button" className="admin-funding-new-thread">
            + New thread
          </button>

          <div className="admin-funding-rail-section">
            <p className="admin-funding-rail-label">Recent threads</p>
            <div className="admin-funding-thread-list">
              {recentThreads.map((thread) => (
                <button
                  key={thread.title}
                  type="button"
                  className={thread.active ? "admin-funding-thread active" : "admin-funding-thread"}
                >
                  <span className="admin-funding-thread-title">{thread.title}</span>
                  <span className="admin-funding-thread-status">{thread.subtitle}</span>
                  <span className="admin-funding-thread-preview">{thread.preview}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="admin-funding-rail-section admin-funding-rail-section-spread">
            <p className="admin-funding-rail-label">Approved sources</p>
            <ul className="admin-funding-source-list">
              {sourceCatalogue.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="admin-funding-main">
          <div className="admin-funding-banner">
            Funding is source-backed, staff-first, and human-reviewed. It can prepare a shortlist and draft notes, but it cannot promise funding or act like a consultant.
          </div>

          <div className="admin-funding-scroll">
            <div className="admin-funding-problem-card">
              <p className="admin-funding-problem-label">Problem</p>
              <p className="admin-funding-problem-text">
                We need help funding transport and program delivery for a community-facing Aboriginal organisation.
              </p>
            </div>

            <div className="admin-funding-pill-row">
              <span className="admin-funding-pill admin-funding-pill-soft">Aboriginal organisation</span>
              <span className="admin-funding-pill admin-funding-pill-soft">Transport</span>
              <span className="admin-funding-pill admin-funding-pill-soft">Program delivery</span>
            </div>

            <div className="admin-funding-message-list">
              {activeMessages.map((message) => (
                <div key={`${message.role}-${message.body.slice(0, 24)}`} className={`admin-funding-message admin-funding-message-${message.role}`}>
                  {"title" in message ? (
                    <p className="admin-funding-message-title">{message.title}</p>
                  ) : null}
                  {"author" in message ? <p className="admin-funding-message-author">{message.author}</p> : null}
                  <p>{message.body}</p>
                </div>
              ))}
            </div>

            <div className="admin-funding-opportunity-grid">
              {opportunityCards.map((card) => (
                <article key={card.title} className="admin-funding-opportunity">
                  <div className="admin-funding-opportunity-head">
                    <span className="admin-funding-opportunity-type">{card.type}</span>
                    <span className="admin-funding-opportunity-status">Open</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.detail}</p>
                </article>
              ))}
            </div>

            <div className="admin-funding-callout">
              <h3>Shared artefacts</h3>
              <ul className="admin-funding-source-list">
                {artefacts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="admin-funding-callout">
              <h3>Guardrails</h3>
              <p className="admin-funding-guardrail">
                No guaranteed eligibility, fabricated evidence, autonomous submissions, funder contact, or impersonated humans.
              </p>
            </div>
          </div>

          <div className="admin-funding-composer">
            <input type="text" aria-label="Ask your agent about funding" placeholder="Ask your agent about funding..." />
            <div className="admin-funding-composer-actions">
              <button type="button" className="admin-button admin-button-dark">
                Agent
              </button>
              <button type="button" className="admin-funding-secondary">
                Sebenza Consultant
              </button>
              <button type="button" className="admin-funding-secondary">
                Add consultant
              </button>
              <button type="button" className="admin-funding-send" aria-label="Send">
                →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
