import Link from "next/link";

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
    preview: "Transport and program delivery support.",
    active: true,
  },
  {
    title: "Youth program equipment",
    subtitle: "Shortlist ready",
    preview: "Laptops, workshop materials and delivery costs.",
  },
  {
    title: "Business readiness check",
    subtitle: "Waiting on evidence",
    preview: "ABN, trading history and funding purpose.",
  },
  {
    title: "Cultural camp support",
    subtitle: "Handoff requested",
    preview: "Grant options and acquittal support.",
  },
];

const activeMessages: FundingMessage[] = [
  {
    role: "problem",
    title: "You",
    body: "We need help funding transport and program delivery for a community-facing Aboriginal organisation.",
  },
  {
    role: "agent",
    author: "IRAAC Funding Agent",
    body:
      "I’m checking current official sources, basic readiness, and missing facts before I draft a shortlist. I can prepare the work, but I cannot promise eligibility or submit anything on your behalf.",
  },
  {
    role: "agent",
    author: "IRAAC Funding Agent",
    body:
      "The first pass is strongest for a transport-related grant, an Indigenous business support pathway, and a readiness checklist covering evidence and timing.",
  },
];

const opportunityCards = [
  {
    type: "Grant",
    title: "business.gov.au",
    detail: "Commonwealth grants, programs and business support pathways.",
  },
  {
    type: "Grant",
    title: "GrantConnect",
    detail: "Australian Government opportunities and official guidelines.",
  },
  {
    type: "Support",
    title: "NIAA funding",
    detail: "Indigenous Advancement Strategy and current program guidance.",
  },
];

const artefacts = ["Shortlist", "Readiness checklist", "Evidence list", "Draft outline", "Deadline plan"];

export default function AdminFundingPage() {
  return (
    <div className="admin-funding-app">
      <aside className="admin-funding-sidebar" aria-label="Funding conversations">
        <div className="admin-funding-sidebar-head">
          <Link className="admin-funding-brand" href="/admin/" aria-label="Back to IRAAC dashboard">
            IRAAC<span>.</span>
          </Link>
          <Link className="admin-funding-back" href="/admin/">
            Dashboard
          </Link>
        </div>

        <button type="button" className="admin-funding-new-thread">
          <span aria-hidden="true">＋</span> New chat
        </button>

        <div className="admin-funding-rail-section">
          <p className="admin-funding-rail-label">Previous chats</p>
          <div className="admin-funding-thread-list">
            {recentThreads.map((thread) => (
              <button
                key={thread.title}
                type="button"
                aria-pressed={thread.active || undefined}
                className={thread.active ? "admin-funding-thread active" : "admin-funding-thread"}
              >
                <span className="admin-funding-thread-title">{thread.title}</span>
                <span className="admin-funding-thread-status">{thread.subtitle}</span>
                <span className="admin-funding-thread-preview">{thread.preview}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="admin-funding-privacy">Staff workspace · AI-labelled · Human reviewed</p>
      </aside>

      <main className="admin-funding-main">
        <header className="admin-funding-header">
          <div>
            <p className="admin-kicker">Funding message centre</p>
            <h1>ACCO transport support</h1>
          </div>
          <div className="admin-funding-header-actions">
            <span className="admin-funding-status"><span aria-hidden="true" /> Agent active</span>
            <button type="button" className="admin-funding-secondary">Share with Sebenza</button>
          </div>
        </header>

        <div className="admin-funding-banner" role="note">
          Source-backed guidance only. IRAAC can prepare a shortlist and drafts, but a human must confirm eligibility and submit.
        </div>

        <div className="admin-funding-scroll" aria-label="Active funding conversation">
          <div className="admin-funding-pill-row" aria-label="Funding context">
            <span className="admin-funding-pill admin-funding-pill-soft">Aboriginal organisation</span>
            <span className="admin-funding-pill admin-funding-pill-soft">Transport</span>
            <span className="admin-funding-pill admin-funding-pill-soft">Program delivery</span>
          </div>

          <div className="admin-funding-message-list">
            {activeMessages.map((message) => (
              <article
                key={`${message.role}-${message.body.slice(0, 24)}`}
                className={`admin-funding-message admin-funding-message-${message.role}`}
              >
                {"title" in message ? <p className="admin-funding-message-title">{message.title}</p> : null}
                {"author" in message ? <p className="admin-funding-message-author">{message.author}</p> : null}
                <p>{message.body}</p>
              </article>
            ))}
          </div>

          <div className="admin-funding-opportunity-grid" aria-label="Suggested funding sources">
            {opportunityCards.map((card) => (
              <article key={card.title} className="admin-funding-opportunity">
                <div className="admin-funding-opportunity-head">
                  <span className="admin-funding-opportunity-type">{card.type}</span>
                  <span className="admin-funding-opportunity-status">Current</span>
                </div>
                <h2>{card.title}</h2>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="admin-funding-composer">
          <label className="sr-only" htmlFor="funding-message">Ask the IRAAC Funding Agent</label>
          <textarea id="funding-message" rows={1} placeholder="Ask what funding or support may fit…" />
          <div className="admin-funding-composer-actions">
            <span><strong>AI agent</strong> · Sources shown with answers</span>
            <button type="button" className="admin-funding-send" aria-label="Send message">↑</button>
          </div>
        </div>
      </main>

      <aside className="admin-funding-context" aria-label="Funding workspace details">
        <section>
          <p className="admin-funding-rail-label">Current task</p>
          <h2>Prepare a funding shortlist</h2>
          <p>Compare transport, delivery and organisational support pathways.</p>
        </section>

        <section>
          <div className="admin-funding-context-heading">
            <p className="admin-funding-rail-label">Shared work</p>
            <span>5 items</span>
          </div>
          <ul className="admin-funding-artefact-list">
            {artefacts.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{index === 0 ? "✓" : "○"}</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-funding-human-card">
          <p className="admin-funding-rail-label">Need a person?</p>
          <h2>Sebenza consultant</h2>
          <p>Preview exactly what will be shared before requesting a named consultant.</p>
          <button type="button" className="admin-funding-secondary">Review handoff</button>
        </section>

        <section className="admin-funding-guardrail-card">
          <strong>Human decision required</strong>
          <p>No automatic applications, funder contact or guaranteed eligibility.</p>
        </section>
      </aside>
    </div>
  );
}
