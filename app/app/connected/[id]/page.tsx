"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import BottomNav from "../../../../components/app/BottomNav";
import { addReferralMessage, getReferralById, referralStatusLabels, type Referral } from "../../../../lib/referrals";

export default function ConnectedServiceChatPage() {
  const params = useParams();
  const id = params.id as string;
  const [referral, setReferral] = useState<Referral>();
  const [message, setMessage] = useState("");

  useEffect(() => setReferral(getReferralById(id)), [id]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const updated = addReferralMessage(id, { sender: "community", senderName: "You", body: message });
    if (updated) setReferral(updated);
    setMessage("");
  };

  return (
    <main className="app-page"><div className="phone-shell phone-shell-compact">
      <div className="phone-status" aria-hidden="true"><span className="phone-time">Connected</span><span className="phone-signal">MOBLINK</span></div>
      <div className="detail-back"><Link className="detail-back-link" href="/app/connected">← Connected services</Link></div>
      {!referral ? <div className="compact-empty"><p>This conversation is not available in this browser session.</p></div> : <>
        <header className="app-top app-top-compact"><div><p className="app-kicker">Your service</p><h1>{referral.serviceName}</h1></div></header>
        <div className="community-lead-summary"><span>{referral.needCategory}</span><strong>{referralStatusLabels[referral.status]}</strong><p>{referral.message}</p></div>
        <div className="community-chat-thread">{referral.conversation.map((item) => <div className={`community-message community-message-${item.sender}`} key={item.id}><strong>{item.sender === "community" ? "You" : item.senderName}</strong><p>{item.body}</p><time>{new Date(item.createdAt).toLocaleString()}</time></div>)}</div>
        <form className="community-composer" onSubmit={sendMessage}><label htmlFor="community-message">Message this service</label><div><input id="community-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type a message..." /><button type="submit" disabled={!message.trim()}>Send</button></div></form>
      </>}
      <BottomNav current="/app/connected" />
    </div></main>
  );
}
