"use client";

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

const opportunityCards = [
  {
    type: "Grant",
    title: "business.gov.au - Grants and Programs finder",
    detail: "Use for Commonwealth grants, programs, and business support pathways.",
    status: "Open",
  },
  {
    type: "Grant",
    title: "GrantConnect",
    detail: "Primary source for Australian Government grant opportunities and guidelines.",
    status: "Open",
  },
  {
    type: "Support",
    title: "NIAA grants and funding",
    detail: "Indigenous Advancement Strategy and current Indigenous program guidance.",
    status: "Open",
  },
  {
    type: "Finance",
    title: "Indigenous Business Australia",
    detail: "Business support and finance products for Aboriginal and Torres Strait Islander businesses.",
    status: "Open",
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

const artefacts = [
  "Shortlist",
  "Readiness checklist",
  "Evidence list",
  "Draft outline",
  "Deadline plan",
];

export default function AdminFundingPage() {
  return (
    <div className="admin-page-content admin-funding-page">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">Staff console</p>
          <h1>Funding</h1>
        </div>
        <div className="admin-stat-badge">Staff pilot</div>
      </div>

      <p className="admin-funding-intro">
        A native IRAAC workspace for funding discovery, readiness checks, Sebenza handoff and source-backed recommendations.
      </p>

      <div className="admin-funding-workspace">
        <aside className="admin-funding-rail">
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

          <div className="admin-funding-rail-section">
            <p className="admin-funding-rail-label">Access boundary</p>
            <p className="admin-funding-rail-note">
              Sebenza consultants join only after a named handoff is approved for a specific thread.
            </p>
          </div>
        </aside>

        <section className="admin-funding-conversation">
          <div className="admin-funding-thread-card">
            <div className="admin-funding-thread-head">
              <div>
                <p className="admin-funding-thread-eyebrow">Current thread</p>
                <h2>What are you trying to fund or strengthen?</h2>
              </div>
              <div className="admin-funding-thread-meta">
                <span className="admin-funding-pill">Agent mode</span>
                <span className="admin-funding-pill admin-funding-pill-muted">Sebenza handoff</span>
              </div>
            </div>

            <div className="admin-funding-message admin-funding-message-user">
              We need help funding transport and program delivery for a community-facing Aboriginal organisation.
            </div>

            <div className="admin-funding-message admin-funding-message-agent">
              The Funding Agent is checking current sources, readiness, and any missing facts before it drafts a shortlist.
            </div>

            <div className="admin-funding-opportunity-grid">
              {opportunityCards.map((card) => (
                <article key={card.title} className="admin-funding-opportunity">
                  <div className="admin-funding-opportunity-head">
                    <span className="admin-funding-opportunity-type">{card.type}</span>
                    <span className="admin-funding-opportunity-status">{card.status}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.detail}</p>
                </article>
              ))}
            </div>

            <div className="admin-funding-actions">
              <button type="button" className="admin-button">
                Agent
              </button>
              <button type="button" className="admin-funding-secondary">
                Sebenza Consultant
              </button>
              <button type="button" className="admin-funding-secondary">
                Add consultant
              </button>
            </div>
          </div>
        </section>

        <aside className="admin-funding-aside">
          <section className="admin-funding-panel">
            <h3>Approved sources</h3>
            <ul className="admin-funding-source-list">
              {sourceCatalogue.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </section>

          <section className="admin-funding-panel">
            <h3>Shared artefacts</h3>
            <ul className="admin-funding-source-list">
              {artefacts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="admin-funding-panel">
            <h3>Guardrails</h3>
            <p className="admin-funding-guardrail">
              No guaranteed eligibility, fabricated evidence, autonomous submissions, funder contact or impersonated humans.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
