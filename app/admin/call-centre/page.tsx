"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

import { services, type Service } from "../../data";
import { createReferral, needCategories, saveReferral, type PreferredContact } from "../../../lib/referrals";
import { detectNeedCategory, matchServices, type ServiceMatch } from "../../../lib/service-matching";

export default function CallCentrePage() {
  const [form, setForm] = useState({
    callerName: "",
    mobile: "",
    postcode: "2541",
    need: "",
    category: "Other",
    preferredContact: "sms" as PreferredContact,
    consent: false,
  });
  const [searched, setSearched] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [createdLeadId, setCreatedLeadId] = useState("");
  const [matches, setMatches] = useState<ServiceMatch<Service>[]>([]);

  const detectedCategory = useMemo(
    () => (form.category === "Other" ? detectNeedCategory(form.need) : form.category),
    [form.category, form.need],
  );
  const handleMatch = (event: FormEvent) => {
    event.preventDefault();
    const nextMatches = matchServices(services, {
      need: form.need,
      postcode: form.postcode,
      category: detectedCategory,
    });
    setMatches(nextMatches);
    setSearched(true);
    setCreatedLeadId("");
    setSelectedServiceId(nextMatches[0]?.service.id || "");
  };

  const updateMatchingInput = (values: Partial<typeof form>) => {
    setForm((current) => ({ ...current, ...values }));
    setSearched(false);
    setMatches([]);
    setSelectedServiceId("");
    setCreatedLeadId("");
  };

  const routeLead = () => {
    const match = matches.find((item) => item.service.id === selectedServiceId);
    if (!match || !form.consent) return;
    const phoneSuffix = form.mobile.replace(/\D/g, "").slice(-3);
    const referral = createReferral({
      serviceId: match.service.id,
      serviceName: match.service.name,
      serviceCategory: match.service.category,
      requesterName: form.callerName.trim() || `Caller ending ${phoneSuffix || "unknown"}`,
      requesterPhone: form.mobile,
      requesterEmail: "",
      postcode: form.postcode,
      needCategory: detectedCategory,
      message: form.need,
      consentToFollowUp: true,
      source: "hotline",
      preferredContact: form.preferredContact,
    });
    saveReferral(referral);
    setCreatedLeadId(referral.id);
  };

  return (
    <div className="admin-page-content">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">AI-assisted hotline</p>
          <h1>Call-centre intake</h1>
        </div>
        <div className="admin-stat-badge">Prototype workflow</div>
      </div>

      <div className="admin-banner admin-banner-soft">
        <div>
          <strong>Turn a caller&apos;s need into a connected service.</strong>
          <p>MobLink uses the caller&apos;s words and postcode to shortlist suitable providers. A staff member confirms the match and consent before a lead is shared.</p>
        </div>
      </div>

      <div className="admin-banner admin-banner-soft">
        <div>
          <strong>Use fictional caller details in this prototype.</strong>
          <p>Nothing here calls, texts, or securely stores information for a real person yet.</p>
        </div>
      </div>

      <div className="intake-layout">
        <form className="intake-panel" onSubmit={handleMatch}>
          <div className="intake-heading">
            <span className="intake-step">1</span>
            <div><h2>Understand the caller</h2><p>Collect only what is needed for this referral.</p></div>
          </div>
          <label>Caller name <span>optional</span><input value={form.callerName} onChange={(event) => setForm({ ...form, callerName: event.target.value })} /></label>
          <label>Mobile number<input type="tel" required placeholder="04xx xxx xxx" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} /></label>
          <label>Postcode<input inputMode="numeric" pattern="[0-9]{4}" required value={form.postcode} onChange={(event) => updateMatchingInput({ postcode: event.target.value })} /></label>
          <label>What support do they need?<textarea required rows={5} placeholder="Use the caller's own words, for example: I need help with a Centrelink application" value={form.need} onChange={(event) => updateMatchingInput({ need: event.target.value })} /></label>
          <label>Support category<select value={form.category} onChange={(event) => updateMatchingInput({ category: event.target.value })}><option value="Other">Let MobLink suggest</option>{needCategories.filter((category) => category !== "Other").map((category) => <option key={category}>{category}</option>)}</select></label>
          <label>Preferred follow-up<select value={form.preferredContact} onChange={(event) => setForm({ ...form, preferredContact: event.target.value as PreferredContact })}><option value="sms">Text message</option><option value="phone">Phone call</option><option value="in_app">MobLink chat</option></select></label>
          <label className="intake-consent"><input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} /><span>The caller agrees that MobLink can share these details with the selected provider for this request.</span></label>
          <button className="admin-button admin-button-dark" type="submit">Find suitable services</button>
          <p className="intake-boundary">Do not collect passwords, tax file numbers, bank details, or unnecessary health information.</p>
        </form>

        <section className="intake-panel">
          <div className="intake-heading">
            <span className="intake-step">2</span>
            <div><h2>Confirm and connect</h2><p>Review the shortlist before creating the supplier lead.</p></div>
          </div>
          {!searched ? <div className="admin-empty"><p>Enter the caller&apos;s need to see ranked services.</p></div> : (
            <>
              <div className="match-summary"><span>Suggested need</span><strong>{detectedCategory}</strong><small>{form.postcode}</small></div>
              <div className="match-list">
                {matches.map((match) => (
                  <label className={selectedServiceId === match.service.id ? "match-card selected" : "match-card"} key={match.service.id}>
                    <input type="radio" name="service" checked={selectedServiceId === match.service.id} onChange={() => setSelectedServiceId(match.service.id)} />
                    <span className="match-card-body"><strong>{match.service.name}</strong><span>{match.service.suburb || "National"} · {match.service.category}</span><small>{match.reasons.join(" · ")}</small></span>
                  </label>
                ))}
              </div>
              {matches.length === 0 ? <div className="admin-empty"><p>No confident match yet. Broaden the category or arrange human triage.</p></div> : null}
              <button className="admin-button" type="button" disabled={!selectedServiceId || !form.consent} onClick={routeLead}>Create supplier lead</button>
              {!form.consent ? <p className="intake-boundary">Consent is required before details are shared with a provider.</p> : null}
              {createdLeadId ? <div className="lead-created"><strong>Lead created</strong><p>The supplier notification is queued and a shared conversation is ready.</p><Link href={`/admin/referrals/${createdLeadId}`}>Open lead and chat →</Link></div> : null}
            </>
          )}
        </section>
      </div>

      <p className="prototype-note">Prototype boundary: no real phone call, text message, provider notification, or AI decision is sent from this screen yet.</p>
    </div>
  );
}
