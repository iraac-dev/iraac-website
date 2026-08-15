import Link from "next/link";
import SiteShell from "./SiteShell";

const steps = [
  { number: "01", title: "Tell us what you need", body: "Use the MobLink app or call the hotline. Explain the problem in your own words and share your suburb or postcode." },
  { number: "02", title: "Find the right service", body: "MobLink shortlists nearby and national services that fit the need, including Aboriginal-led organisations where available." },
  { number: "03", title: "Connect and keep talking", body: "With your permission, the chosen provider receives a lead and you get one connected conversation to arrange the next step." },
];

const needs = ["Centrelink applications", "Legal support", "Housing", "Health and wellbeing", "Family support", "Employment and training"];

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="moblink-hero">
          <div className="container moblink-hero-grid">
            <div>
              <div className="eyebrow">Support should be easier to find</div>
              <h1>The right service, closer to home.</h1>
              <p>MobLink helps Aboriginal and Torres Strait Islander people explain what they need, find a suitable service nearby, and stay connected through one simple place.</p>
              <div className="hero-actions">
                <Link href="/app/search/" className="btn btn-primary">Find a service</Link>
                <Link href="/app/messages/" className="btn btn-outline">Start a MobLink chat</Link>
              </div>
              <p className="hero-callout"><strong>Prefer to talk?</strong> The MobLink hotline and call-centre connection are being prepared for launch.</p>
            </div>
            <div className="connection-card" aria-label="Example MobLink connection">
              <span className="connection-kicker">A connected pathway</span>
              <div className="connection-person"><span>1</span><div><strong>Community member</strong><small>Needs Centrelink application help · 2541</small></div></div>
              <div className="connection-line" />
              <div className="connection-person"><span>2</span><div><strong>MobLink</strong><small>Understands the need and confirms consent</small></div></div>
              <div className="connection-line" />
              <div className="connection-person"><span>3</span><div><strong>Suitable local provider</strong><small>Receives the lead and opens a conversation</small></div></div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="moblink-section">
          <div className="container">
            <p className="section-kicker">How MobLink works</p>
            <h2 className="section-title">One request. A clearer next step.</h2>
            <div className="journey-grid">{steps.map((step) => <article className="journey-card" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
          </div>
        </section>

        <section className="moblink-section moblink-section-dark">
          <div className="container need-grid">
            <div><p className="section-kicker">Support across everyday life</p><h2>Start with the problem—not the organisation chart.</h2><p>You do not need to know which provider to call. MobLink starts with what is happening and uses your location to guide the search.</p><Link href="/app/" className="btn btn-light">Open the MobLink app</Link></div>
            <div className="need-list">{needs.map((need) => <span key={need}>{need}<b>→</b></span>)}</div>
          </div>
        </section>

        <section id="for-providers" className="moblink-section">
          <div className="container provider-grid">
            <div><p className="section-kicker">For Aboriginal businesses and service providers</p><h2>Useful leads, with the context to act.</h2><p>Participating providers receive requests that match their service and coverage area. Each lead records the person&apos;s stated need, location, source, contact preference, and permission to follow up.</p><ul className="provider-points"><li>See new hotline and app leads in one queue</li><li>Chat directly with the person after connection</li><li>Keep progress and follow-up visible</li><li>Use a bounded AI funding workspace to prepare opportunities</li></ul></div>
            <div className="provider-panel"><span>Supplier workspace</span><h3>A new Centrelink lead is ready</h3><p>Matched from the MobLink hotline for postcode 2541. The caller agreed to an SMS follow-up.</p><div><small>Need</small><strong>Centrelink application support</strong></div><div><small>Next step</small><strong>Open the lead and start a conversation</strong></div><Link href="/admin/" className="btn btn-primary">View supplier demo</Link></div>
          </div>
        </section>

        <section className="moblink-cta"><div className="container"><div><p className="section-kicker">MobLink is being built nationally</p><h2>Find support without being passed from place to place.</h2></div><Link href="/app/search/" className="btn btn-light">Browse services</Link></div></section>
      </main>
    </SiteShell>
  );
}
