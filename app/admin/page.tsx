"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getReferrals, getReferralStats } from "../../lib/referrals";
import { services } from "../data";

export default function AdminDashboard() {
  const [stats, setStats] = useState<ReturnType<typeof getReferralStats> | null>(null);

  useEffect(() => {
    setStats(getReferralStats());
  }, []);

  const pendingReferrals = stats ? stats.requested + stats.triage : 0;
  const totalReferrals = stats ? stats.total : 0;
  const totalServices = services.length;
  const aboriginalLed = services.filter((s) => s.isAboriginalLed).length;
  const crisisServices = services.filter((s) => s.isCrisis).length;

  return (
    <div className="admin-page-content">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">Staff console</p>
          <h1>IRAAC overview</h1>
        </div>
        <div className="admin-stat-badge">{pendingReferrals > 0 ? `${pendingReferrals} pending` : "All clear"}</div>
      </div>

      <div className="admin-banner">
        <div>
          <strong>Service directory is live.</strong>
          <p>20 services across 15 categories in the Nowra / Illawarra region. Referrals and reporting are active.</p>
        </div>
        <Link className="admin-button" href="/app/">
          Open MobLink
        </Link>
      </div>

      <div className="admin-grid">
        <Link href="/admin/referrals" className="admin-tile admin-tile-link">
          <div>
            <h2>Referral queue</h2>
            <p>Incoming service requests and scheduled callbacks.</p>
          </div>
          <div>
            <div className="admin-stat">{totalReferrals}</div>
            <div className="admin-label">{pendingReferrals > 0 ? `${pendingReferrals} need attention` : "No pending"}</div>
          </div>
        </Link>

        <Link href="/admin/services" className="admin-tile admin-tile-link">
          <div>
            <h2>Service directory</h2>
            <p>Published services, categories, and provider details.</p>
          </div>
          <div>
            <div className="admin-stat">{totalServices}</div>
            <div className="admin-label">{aboriginalLed} Aboriginal-led · {crisisServices} crisis</div>
          </div>
        </Link>

        <Link href="/admin/reports" className="admin-tile admin-tile-link">
          <div>
            <h2>Reports & insights</h2>
            <p>De-identified service gaps, outcomes and follow-up themes.</p>
          </div>
          <div>
            <div className="admin-stat">{totalReferrals > 0 ? `${totalReferrals}` : "—"}</div>
            <div className="admin-label">{totalReferrals > 0 ? "Referrals recorded" : "No data yet"}</div>
          </div>
        </Link>

        <div className="admin-tile">
          <div>
            <h2>Create MobLink account</h2>
            <p>Staff-created account setup link flow.</p>
          </div>
          <div>
            <div className="admin-stat">Ready</div>
            <div className="admin-label">Prototype flow</div>
          </div>
        </div>
      </div>

      <div className="admin-panels">
        <div className="admin-panel" id="queue">
          <h2>Recent referrals</h2>
          {totalReferrals === 0 ? (
            <div className="admin-empty">
              <p>No referrals yet. Referrals appear here when a community member requests help from a service.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Need</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {getReferrals()
                  .slice(-5)
                  .reverse()
                  .map((r) => (
                    <tr key={r.id}>
                      <td>{r.requesterName}</td>
                      <td>{r.serviceName}</td>
                      <td>{r.needCategory}</td>
                      <td>
                        <span className="status-pill">{r.status}</span>
                      </td>
                      <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <Link href="/admin/referrals" className="admin-panel-link">
            View all referrals →
          </Link>
        </div>

        <div className="admin-panel" id="directory">
          <h2>Service directory</h2>
          <div className="admin-directory-stats">
            <div className="admin-dir-stat">
              <span className="admin-dir-num">{totalServices}</span>
              <span className="admin-dir-label">Services</span>
            </div>
            <div className="admin-dir-stat">
              <span className="admin-dir-num">{services.filter((s) => s.isAboriginalLed).length}</span>
              <span className="admin-dir-label">Aboriginal-led</span>
            </div>
            <div className="admin-dir-stat">
              <span className="admin-dir-num">{services.filter((s) => s.isNational).length}</span>
              <span className="admin-dir-label">National</span>
            </div>
            <div className="admin-dir-stat">
              <span className="admin-dir-num">{new Set(services.map((s) => s.suburb)).size}</span>
              <span className="admin-dir-label">Locations</span>
            </div>
          </div>
          <Link href="/admin/services" className="admin-panel-link">
            Manage services →
          </Link>
        </div>
      </div>
    </div>
  );
}