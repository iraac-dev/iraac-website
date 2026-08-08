"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { services } from "../../../data";
import { createReferral, saveReferral, needCategories } from "../../../../lib/referrals";
import BottomNav from "../../../../components/app/BottomNav";

export default function RequestHelpPage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.serviceId as string;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    requesterName: "",
    requesterPhone: "",
    requesterEmail: "",
    needCategory: "Other",
    message: "",
    serviceId: "general",
    serviceName: "General support",
    consentToFollowUp: false,
  });

  const [service, setService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (serviceId) {
      const found = services.find((s) => s.id === serviceId);
      if (found) {
        setService(found);
        setForm((f) => ({
          ...f,
          serviceId: found.id,
          serviceName: found.name,
        }));
      }
    }
  }, [serviceId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const referral = createReferral({
      serviceId: form.serviceId,
      serviceName: form.serviceName,
      serviceCategory: service?.category || "Other",
      requesterName: form.requesterName,
      requesterPhone: form.requesterPhone,
      requesterEmail: form.requesterEmail,
      needCategory: form.needCategory,
      message: form.message,
      consentToFollowUp: form.consentToFollowUp,
    });
    saveReferral(referral);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="app-page">
        <div className="phone-shell">
          <div className="phone-status" aria-hidden="true">
            <span className="phone-time">Request sent</span>
            <span className="phone-signal">1800 MOB LINK</span>
          </div>
          <div className="request-confirmed">
            <div className="request-confirmed-icon">✓</div>
            <h1>Request submitted</h1>
            <p>Your request for help has been sent to the IRAAC team. They will review it and follow up with you.</p>
            <p className="request-confirmed-detail">
              Reference: <strong>{(getRecentReferral()?.id || "").slice(0, 12)}</strong>
            </p>
            <div className="request-confirmed-actions">
              <button type="button" className="service-card-button" onClick={() => router.push("/app/")}>
                Back to home
              </button>
              <button
                type="button"
                className="service-card-button service-card-button-secondary"
                onClick={() => router.push("/app/search")}
              >
                Browse services
              </button>
            </div>
          </div>
          <BottomNav current="/app/search" />
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="phone-shell">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Request help</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <div className="detail-back">
          <a href={`/app/service/${serviceId}`} className="detail-back-link">
            ← Back to service
          </a>
        </div>

        <header className="app-top app-top-compact">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Request help</h1>
          </div>
        </header>

        {service && (
          <div className="request-service-ref">
            <strong>Requesting help with:</strong>
            <p>{service.name}</p>
          </div>
        )}


        <form onSubmit={handleSubmit} className="request-form">
          <div className="request-form-group">
            <label htmlFor="requesterName">Your name *</label>
            <input
              id="requesterName"
              type="text"
              required
              placeholder="e.g. Jane Smith"
              value={form.requesterName}
              onChange={(e) => setForm({ ...form, requesterName: e.target.value })}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="requesterPhone">Phone number *</label>
            <input
              id="requesterPhone"
              type="tel"
              required
              placeholder="e.g. 04xx xxx xxx"
              value={form.requesterPhone}
              onChange={(e) => setForm({ ...form, requesterPhone: e.target.value })}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="requesterEmail">Email (optional)</label>
            <input
              id="requesterEmail"
              type="email"
              placeholder="e.g. jane@example.com"
              value={form.requesterEmail}
              onChange={(e) => setForm({ ...form, requesterEmail: e.target.value })}
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="needCategory">What kind of help do you need?</label>
            <select
              id="needCategory"
              value={form.needCategory}
              onChange={(e) => setForm({ ...form, needCategory: e.target.value })}
            >
              {needCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="request-form-group">
            <label htmlFor="message">Tell us what you need help with</label>
            <textarea
              id="message"
              rows={4}
              placeholder="Briefly describe what you're looking for help with..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="request-form-group request-form-checkbox">
            <label>
              <input
                type="checkbox"
                checked={form.consentToFollowUp}
                onChange={(e) => setForm({ ...form, consentToFollowUp: e.target.checked })}
              />
              <span>IRAAC can follow up with me about this request</span>
            </label>
          </div>

          <button type="submit" className="service-card-button request-form-submit">
            Submit request
          </button>
        </form>

        <BottomNav current="/app/search" />
      </div>
    </main>
  );
}

function getRecentReferral() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("iraac_referrals");
    const refs = raw ? JSON.parse(raw) : [];
    return refs[refs.length - 1] || null;
  } catch {
    return null;
  }
}