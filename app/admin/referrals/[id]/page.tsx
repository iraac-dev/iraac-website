"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  addReferralMessage,
  getReferralById,
  preferredContactLabels,
  referralSourceLabels,
  referralStatusLabels,
  supplierNotificationLabels,
  updateReferralStatus,
  type Referral,
  type ReferralStatus,
} from "../../../../lib/referrals";

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [referral, setReferral] = useState<Referral>();
  const [message, setMessage] = useState("");

  useEffect(() => setReferral(getReferralById(id)), [id]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const updated = addReferralMessage(id, {
      sender: "provider",
      senderName: referral?.serviceName || "Service provider",
      body: message,
    });
    if (updated) setReferral(updated);
    setMessage("");
  };

  if (!referral) {
    return <div className="admin-page-content"><div className="admin-empty"><p>This lead is not available in this browser session.</p><Link href="/admin/referrals">Back to leads</Link></div></div>;
  }

  return (
    <div className="admin-page-content">
      <div className="admin-top">
        <div><p className="admin-kicker">MobLink network demo lead</p><h1>{referral.needCategory} support</h1></div>
        <Link className="admin-small-btn" href="/admin/referrals">← All leads</Link>
      </div>

      <div className="lead-detail-grid">
        <aside className="lead-profile-card">
          <div className="lead-profile-person"><span>{referral.requesterName.slice(0, 1)}</span><div><strong>{referral.requesterName}</strong><small>{referral.requesterPhone}</small></div></div>
          <dl>
            <div><dt>Need</dt><dd>{referral.message}</dd></div>
            <div><dt>Location</dt><dd>Postcode {referral.postcode || "not supplied"}</dd></div>
            <div><dt>Source</dt><dd>{referralSourceLabels[referral.source]}</dd></div>
            <div><dt>Follow-up</dt><dd>{preferredContactLabels[referral.preferredContact]}</dd></div>
            <div><dt>Consent</dt><dd>{referral.consentToFollowUp ? "Confirmed for this request" : "Not confirmed"}</dd></div>
            <div><dt>Supplier alert</dt><dd>{supplierNotificationLabels[referral.supplierNotification]}</dd></div>
          </dl>
          <label className="lead-status-control">Lead status<select value={referral.status} onChange={(event) => setReferral(updateReferralStatus(id, event.target.value as ReferralStatus))}>{Object.entries(referralStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          <p className="intake-boundary">Only use these details for the support request the person agreed to.</p>
        </aside>

        <section className="lead-chat-card">
          <div className="lead-chat-head"><div><p className="admin-kicker">Connected conversation</p><h2>{referral.serviceName}</h2></div><span className="online-dot">Shared</span></div>
          <div className="lead-chat-thread">
            {referral.conversation.map((item) => (
              <div className={`lead-message lead-message-${item.sender}`} key={item.id}>
                <strong>{item.senderName}</strong><p>{item.body}</p><time>{new Date(item.createdAt).toLocaleString()}</time>
              </div>
            ))}
          </div>
          <form className="lead-composer" onSubmit={sendMessage}>
            <label htmlFor="provider-message">Reply to the community member</label>
            <div><input id="provider-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a clear, respectful update..." /><button className="admin-button" type="submit" disabled={!message.trim()}>Send</button></div>
          </form>
        </section>
      </div>
    </div>
  );
}
