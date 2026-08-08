import Link from "next/link";
import CrisisStrip from "../../../components/app/CrisisStrip";
import BottomNav from "../../../components/app/BottomNav";

export const metadata = {
  title: "Messages | 1800 Mob Link",
  description: "Messages and updates from IRAAC about your service requests.",
};

export default function MessagesPage() {
  return (
    <main className="app-page">
      <div className="phone-shell phone-shell-compact">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Messages</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top app-top-compact">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Messages</h1>
          </div>
        </header>

        <CrisisStrip />

        <section className="app-section">
          <div className="compact-empty">
            <p className="compact-empty-icon">💬</p>
            <p>No messages yet.</p>
            <p className="compact-empty-hint">
              When you request help from a service, IRAAC will send you updates here about your request status.
            </p>
            <Link href="/app/search" className="service-card-button" style={{ marginTop: 16, display: "inline-flex" }}>
              Find a service
            </Link>
          </div>
        </section>

        <BottomNav current="/app/messages" />
      </div>
    </main>
  );
}