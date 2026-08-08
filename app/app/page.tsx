import Link from "next/link";
import { services } from "../data";
import CrisisStrip from "../../components/app/CrisisStrip";
import SearchBar from "../../components/app/SearchBar";

export const metadata = {
  title: "1800 Mob Link | IRAAC",
  description: "Find Aboriginal and community services near you — health, legal, housing, crisis support and more.",
};

export default function MobLinkHome() {
  const crisisServices = services.filter((s) => s.isCrisis);
  const recommended = services.filter((s) => !s.isNational && !s.isCrisis).slice(0, 4);

  return (
    <main className="app-page">
      <div className="phone-shell">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Nowra, NSW</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Find support near you</h1>
          </div>
        </header>

        <div className="app-hero-actions">
          <SearchBar />
          <div className="app-quick-links">
            <Link href="/app/search" className="quick-link">
              <span className="quick-link-icon">🔍</span>
              <span>Browse all services</span>
            </Link>
            <Link href="/app/map" className="quick-link">
              <span className="quick-link-icon">🗺️</span>
              <span>View map</span>
            </Link>
          </div>
        </div>

        <CrisisStrip />

        <section className="app-section">
          <div className="section-row">
            <h2 className="app-section-title">Crisis support</h2>
          </div>
          <div className="app-crisis-cards">
            {crisisServices.map((service) => (
              <Link href={`/app/service/${service.id}`} className="crisis-card" key={service.id}>
                <div className="crisis-card-top">
                  <span className="crisis-card-emoji" aria-hidden="true">🚨</span>
                  <span className="crisis-card-badge">24/7</span>
                </div>
                <h3 className="crisis-card-name">{service.name}</h3>
                <p className="crisis-card-phone">{service.phone}</p>
                <p className="crisis-card-desc">{service.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="app-section">
          <div className="section-row">
            <h2 className="app-section-title">Recommended services</h2>
            <Link href="/app/search" className="section-link">See all</Link>
          </div>
          <div className="service-rail" id="services">
            {recommended.map((service) => (
              <article className="mini-card" key={service.id}>
                <div className="mini-card-top">
                  <span className="mini-card-sub">{service.subcategory}</span>
                  {service.isAboriginalLed && <span className="mini-card-badge">Aboriginal-led</span>}
                </div>
                <h3 className="mini-card-name">{service.name}</h3>
                <p className="mini-card-meta">{service.distance} · {service.suburb}</p>
                <p className="mini-card-desc">{service.description}</p>
                <div className="mini-card-tags">
                  {service.tags.slice(0, 3).map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <Link href={`/app/service/${service.id}`} className="mini-card-link">
                  View details
                </Link>
              </article>
            ))}
          </div>
        </section>

        <nav className="bottom-nav" aria-label="Mob Link sections">
          <Link href="/app/" aria-current="page">Home</Link>
          <Link href="/app/search">Search</Link>
          <Link href="/app/map">Map</Link>
          <Link href="/survey/">Survey</Link>
        </nav>
      </div>
    </main>
  );
}