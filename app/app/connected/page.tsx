"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getReferrals, referralStatusLabels, type Referral } from "../../../lib/referrals";
import BottomNav from "../../../components/app/BottomNav";

export default function ConnectedPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    setReferrals(getReferrals());
  }, []);

  const active = referrals.filter((r) => r.status !== "resolved" && r.status !== "withdrawn" && r.status !== "could_not_connect");
  const resolved = referrals.filter((r) => r.status === "resolved");

  return (
    <main className="app-page">
      <div className="phone-shell phone-shell-compact">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Connected</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top app-top-compact">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Connected services</h1>
          </div>
        </header>


        {referrals.length === 0 ? (
          <section className="app-section">
            <div className="compact-empty">
              <p className="compact-empty-icon">🔗</p>
              <p>No connected services yet.</p>
              <p className="compact-empty-hint">
                When you request help from a service, it will appear here so you can track progress.
              </p>
              <Link href="/app/search" className="service-card-button" style={{ marginTop: 16, display: "inline-flex" }}>
                Browse services
              </Link>
            </div>
          </section>
        ) : (
          <>
            {active.length > 0 && (
              <section className="app-section">
                <div className="section-row">
                  <h2 className="app-section-title">Active ({active.length})</h2>
                </div>
                <div className="compact-grid">
                  {active.map((r) => (
                    <Link href={`/app/connected/${r.id}`} className="compact-card" key={r.id}>
                      <span className="compact-card-emoji" aria-hidden="true">🔄</span>
                      <div className="compact-card-body">
                        <strong className="compact-card-name">{r.serviceName}</strong>
                        <span className="compact-card-meta">{referralStatusLabels[r.status]} · {r.needCategory}</span>
                      </div>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {resolved.length > 0 && (
              <section className="app-section">
                <div className="section-row">
                  <h2 className="app-section-title">Resolved ({resolved.length})</h2>
                </div>
                <div className="compact-grid">
                  {resolved.map((r) => (
                    <Link href={`/app/connected/${r.id}`} className="compact-card" key={r.id}>
                      <span className="compact-card-emoji" aria-hidden="true">✅</span>
                      <div className="compact-card-body">
                        <strong className="compact-card-name">{r.serviceName}</strong>
                        <span className="compact-card-meta">{r.needCategory} · Resolved</span>
                      </div>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <BottomNav current="/app/connected" />
      </div>
    </main>
  );
}
