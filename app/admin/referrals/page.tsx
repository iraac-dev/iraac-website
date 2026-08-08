"use client";

import { useState, useEffect } from "react";
import { getReferrals, updateReferralStatus, referralStatusLabels, referralStatusColors, type Referral, type ReferralStatus } from "../../../lib/referrals";

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [filter, setFilter] = useState<ReferralStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    setReferrals(getReferrals());
  }, []);

  const filtered = filter === "all" ? referrals : referrals.filter((r) => r.status === filter);

  const handleStatusChange = (id: string, status: ReferralStatus) => {
    updateReferralStatus(id, status);
    setReferrals(getReferrals());
  };

  const handleSaveNotes = (id: string) => {
    const r = referrals.find((ref) => ref.id === id);
    if (!r) return;
    updateReferralStatus(id, r.status, editNotes);
    setReferrals(getReferrals());
    setExpanded(null);
  };

  const pendingCount = referrals.filter((r) => r.status === "requested" || r.status === "triage").length;

  return (
    <div className="admin-page-content">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">Staff console</p>
          <h1>Referral queue</h1>
        </div>
        <div className="admin-stat-badge">
          {pendingCount} pending
        </div>
      </div>

      <div className="admin-filter-row">
        <button
          type="button"
          className={`admin-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({referrals.length})
        </button>
        <button
          type="button"
          className={`admin-filter-btn ${filter === "requested" ? "active" : ""}`}
          onClick={() => setFilter("requested")}
        >
          New ({referrals.filter((r) => r.status === "requested").length})
        </button>
        <button
          type="button"
          className={`admin-filter-btn ${filter === "triage" ? "active" : ""}`}
          onClick={() => setFilter("triage")}
        >
          Triage ({referrals.filter((r) => r.status === "triage").length})
        </button>
        <button
          type="button"
          className={`admin-filter-btn ${filter === "follow_up_due" ? "active" : ""}`}
          onClick={() => setFilter("follow_up_due")}
        >
          Follow-up ({referrals.filter((r) => r.status === "follow_up_due").length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <p>No referrals in this status.</p>
          <p className="admin-empty-hint">Referrals appear here when a community member requests help from a service.</p>
        </div>
      ) : (
        <div className="admin-referral-list">
          {filtered.map((referral) => (
            <div className={`admin-referral-card ${referral.status === "requested" ? "admin-referral-new" : ""}`} key={referral.id}>
              <div className="admin-referral-header">
                <div className="admin-referral-person">
                  <strong>{referral.requesterName}</strong>
                  <span className="admin-referral-phone">{referral.requesterPhone}</span>
                </div>
                <span
                  className="admin-status-pill"
                  style={{ background: referralStatusColors[referral.status], color: "#fff" }}
                >
                  {referralStatusLabels[referral.status]}
                </span>
              </div>

              <div className="admin-referral-body">
                <div className="admin-referral-detail">
                  <span className="admin-detail-label">Service</span>
                  <span>{referral.serviceName}</span>
                </div>
                <div className="admin-referral-detail">
                  <span className="admin-detail-label">Need</span>
                  <span>{referral.needCategory}</span>
                </div>
                <div className="admin-referral-detail">
                  <span className="admin-detail-label">Consent to follow-up</span>
                  <span>{referral.consentToFollowUp ? "Yes" : "No"}</span>
                </div>
                {referral.message && (
                  <div className="admin-referral-message">
                    <span className="admin-detail-label">Message</span>
                    <p>{referral.message}</p>
                  </div>
                )}
                <div className="admin-referral-detail">
                  <span className="admin-detail-label">Received</span>
                  <span>{new Date(referral.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="admin-referral-actions">
                <select
                  value={referral.status}
                  onChange={(e) => handleStatusChange(referral.id, e.target.value as ReferralStatus)}
                  className="admin-status-select"
                >
                  {Object.entries(referralStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="admin-small-btn"
                  onClick={() => {
                    setExpanded(expanded === referral.id ? null : referral.id);
                    setEditNotes(referral.staffNotes || "");
                  }}
                >
                  {expanded === referral.id ? "Cancel" : "Notes"}
                </button>
              </div>

              {expanded === referral.id && (
                <div className="admin-referral-notes">
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Staff notes (visible to staff only)..."
                    className="admin-notes-input"
                  />
                  <button type="button" className="admin-small-btn admin-small-btn-primary" onClick={() => handleSaveNotes(referral.id)}>
                    Save notes
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}