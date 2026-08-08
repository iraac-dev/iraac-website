"use client";

import { useState } from "react";
import Link from "next/link";
import HelpBot from "../../../components/app/HelpBot";
import CrisisStrip from "../../../components/app/CrisisStrip";
import BottomNav from "../../../components/app/BottomNav";

export default function MessagesPage() {
  const [showBot, setShowBot] = useState(false);

  if (showBot) {
    return (
      <main className="app-page">
        <div className="phone-shell phone-shell-compact">
          <div className="phone-status" aria-hidden="true">
            <span className="phone-time">Contact us</span>
            <span className="phone-signal">1800 MOB LINK</span>
          </div>
          <div className="detail-back">
            <button type="button" className="detail-back-link" onClick={() => setShowBot(false)}>
              ← Back to messages
            </button>
          </div>
          <HelpBot />
          <BottomNav current="/app/messages" />
        </div>
      </main>
    );
  }

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

        <div className="app-section">
          <button type="button" className="contact-us-card" onClick={() => setShowBot(true)}>
            <div className="contact-us-card-icon">🤖</div>
            <div className="contact-us-card-body">
              <strong className="contact-us-card-title">Contact us</strong>
              <span className="contact-us-card-desc">
                Chat with the IRAAC Help Bot. Tell us what you need and we&apos;ll recommend services that can help.
              </span>
            </div>
            <span className="contact-us-card-arrow">→</span>
          </button>
        </div>

        <div className="app-section">
          <Link href="/app/survey" className="contact-us-card">
            <div className="contact-us-card-icon">📝</div>
            <div className="contact-us-card-body">
              <strong className="contact-us-card-title">Have Your Say</strong>
              <span className="contact-us-card-desc">
                Complete the IRAAC survey. Your voice helps us advocate for what matters to community.
              </span>
            </div>
            <span className="contact-us-card-arrow">→</span>
          </Link>
        </div>

        <section className="app-section">
          <div className="section-row">
            <h2 className="app-section-title">No messages yet</h2>
          </div>
          <div className="compact-empty">
            <p className="compact-empty-icon">💬</p>
            <p>Your messages will appear here.</p>
            <p className="compact-empty-hint">
              When you request help from a service or contact us, your conversation history will be shown here.
            </p>
          </div>
        </section>

        <BottomNav current="/app/messages" />
      </div>
    </main>
  );
}