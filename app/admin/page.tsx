import Link from "next/link";

const tiles = [
  ["1800 Mob Link Operator Queue", "12", "prototype requests", "Incoming service requests and scheduled callbacks."],
  ["Create MobLink Account", "Ready", "visual flow", "Staff-created account setup link flow."],
  ["Service Directory", "17", "seed services", "Nowra, Wollongong, Culburra Beach and national support entries."],
  ["Reporting", "Draft", "dashboard shell", "De-identified service gaps, outcomes and follow-up themes."],
];

const queue = [
  ["Nowra", "Legal help", "Pending callback", "Today 2:30 PM"],
  ["Wollongong", "Housing", "Service details sent", "Tomorrow 10:00 AM"],
  ["Culburra Beach", "Culture", "Follow-up due", "Friday 11:15 AM"],
];

export const metadata = {
  title: "IRAAC Staff Admin Prototype",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link className="brand" href="/">
            IRAAC<span>.</span>
          </Link>
          <nav aria-label="Staff dashboard sections">
            <Link href="/admin/" aria-current="page">
              Overview
            </Link>
            <Link href="#queue">Operator Queue</Link>
            <Link href="#create-account">Create Account</Link>
            <Link href="#directory">Service Directory</Link>
            <Link href="#reporting">Reporting</Link>
          </nav>
          <p className="admin-note">
            Prototype staff dashboard. Authentication, Supabase roles and audit controls will be wired in the next build
            pass.
          </p>
        </aside>

        <div className="admin-main">
          <div className="admin-top">
            <div>
              <p className="admin-kicker">Staff admin prototype</p>
              <h1>IRAAC Staff Console</h1>
            </div>
            <div className="session-card">
              <strong>Protected route placeholder</strong>
              Visual dashboard open for routing proof only.
            </div>
          </div>

          <section className="admin-banner" aria-label="Admin prototype status">
            <div>
              <strong>Routing proof is live.</strong>
              <p>Footer Admin opens this `/admin` dashboard directly. Supabase Auth comes next.</p>
            </div>
            <Link className="admin-button" href="/app/">
              Open MobLink
            </Link>
          </section>

          <section className="admin-grid" aria-label="Admin dashboard overview">
            {tiles.map(([title, stat, label, detail]) => (
              <article className="admin-tile" key={title}>
                <div>
                  <h2>{title}</h2>
                  <p>{detail}</p>
                </div>
                <div>
                  <div className="admin-stat">{stat}</div>
                  <div className="admin-label">{label}</div>
                </div>
              </article>
            ))}
          </section>

          <section className="admin-panels">
            <article className="admin-panel" id="queue">
              <h2>1800 Mob Link queue</h2>
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Need</th>
                    <th>Status</th>
                    <th>Next action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map(([area, need, status, action]) => (
                    <tr key={`${area}-${need}`}>
                      <td>{area}</td>
                      <td>{need}</td>
                      <td>
                        <span className="status-pill">{status}</span>
                      </td>
                      <td>{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="admin-panel" id="create-account">
              <h2>Create MobLink Account</h2>
              <p>Prototype flow only. This will create a Supabase user and one-time setup link later.</p>
              <form className="form-stack">
                <label htmlFor="mobile">Community member mobile</label>
                <input id="mobile" name="mobile" type="tel" placeholder="+61 4xx xxx xxx" />
                <button className="admin-button" type="button">
                  Generate setup link
                </button>
                <div className="setup-link">https://www.iraac-aco.com/app/setup?token=prototype</div>
              </form>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
