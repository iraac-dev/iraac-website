"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getReferrals, updateReferralStatus, referralSourceLabels, referralStatusLabels, referralStatusColors, type Referral, type ReferralStatus } from "../../../lib/referrals";

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [filter, setFilter] = useState<ReferralStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    setReferrals(getReferrals());
  }, []);

  const { filtered, counts } = useMemo(() => {
    const statusCounts = { requested: 0, triage: 0, follow_up_due: 0, pending: 0 };
    const visible: Referral[] = [];
    for (const referral of referrals) {
      if (referral.status === "requested") statusCounts.requested += 1;
      if (referral.status === "triage") statusCounts.triage += 1;
      if (referral.status === "follow_up_due") statusCounts.follow_up_due += 1;
      if (referral.status === "requested" || referral.status === "triage") statusCounts.pending += 1;
      if (filter === "all" || referral.status === filter) visible.push(referral);
    }
    return { filtered: visible, counts: statusCounts };
  }, [filter, referrals]);

  const replaceReferral = (updated: Referral | undefined) => {
    if (!updated) return;
    setReferrals((current) => current.map((referral) => (referral.id === updated.id ? updated : referral)));
  };

  const handleStatusChange = (id: string, status: ReferralStatus) => {
    replaceReferral(updateReferralStatus(id, status));
  };

  const handleSaveNotes = (id: string) => {
    const r = referrals.find((ref) => ref.id === id);
    if (!r) return;
    replaceReferral(updateReferralStatus(id, r.status, editNotes));
    setExpanded(null);
  };

  return (
    <div className="admin-page-content">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">MobLink network demo</p>
          <h1>Leads</h1>
        </div>
        <div className="admin-stat-badge">
          {counts.pending} pending
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
          New ({counts.requested})
        </button>
        <button
          type="button"
          className={`admin-filter-btn ${filter === "triage" ? "active" : ""}`}
          onClick={() => setFilter("triage")}
        >
          Triage ({counts.triage})
        </button>
        <button
          type="button"
          className={`admin-filter-btn ${filter === "follow_up_due" ? "active" : ""}`}
          onClick={() => setFilter("follow_up_due")}
        >
          Follow-up ({counts.follow_up_due})
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
                  <span className="admin-detail-label">Matched service</span>
                  <span>{referral.serviceName}</span>
                </div>
                <div className="admin-referral-detail">
                  <span className="admin-detail-label">Need</span>
                  <span>{referral.needCategory}</span>
                </div>
                <div className="admin-referral-detail">
                  <span className="admin-detail-label">Source</span>
                  <span>{referralSourceLabels[referral.source]} · {referral.postcode || "No postcode"}</span>
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
                <Link className="admin-small-btn admin-small-btn-primary" href={`/admin/referrals/${referral.id}`}>Open lead & chat</Link>
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
