import Link from "next/link";
import { services } from "../data";
import CrisisStrip from "../../components/app/CrisisStrip";
import SearchBar from "../../components/app/SearchBar";

export const metadata = {
  title: "1800 Mob Link | IRAAC",
  description: "Find Aboriginal and community services near you — health, legal, housing, crisis support and more.",
};

function getServicesByArea(suburb: string) {
  return services
    .filter((s) => s.suburb === suburb && !s.isCrisis)
    .slice(0, 3);
}

export default function MobLinkHome() {
  const nowraServices = getServicesByArea("Nowra");
  const wollongongServices = getServicesByArea("Wollongong");
  const ulladullaServices = getServicesByArea("Ulladulla");
  const portKemblaServices = getServicesByArea("Port Kembla");
  const nationalServices = services.filter((s) => s.isNational && !s.isCrisis).slice(0, 3);

  return (
    <main className="app-page">
      <div className="phone-shell phone-shell-compact">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">South Coast, NSW</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top app-top-compact">
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

        {nowraServices.length > 0 && (
          <section className="app-section">
            <div className="section-row">
              <h2 className="app-section-title">Nowra</h2>
              <Link href="/app/search" className="section-link">See all</Link>
            </div>
            <div className="compact-grid">
              {nowraServices.map((s) => (
                <Link href={`/app/service/${s.id}`} className="compact-card" key={s.id}>
                  <span className="compact-card-emoji" aria-hidden="true">
                    {s.isAboriginalLed ? "🪶" : "📍"}
                  </span>
                  <div className="compact-card-body">
                    <strong className="compact-card-name">{s.name}</strong>
                    <span className="compact-card-meta">{s.category} · {s.distance}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {wollongongServices.length > 0 && (
          <section className="app-section">
            <div className="section-row">
              <h2 className="app-section-title">Wollongong</h2>
              <Link href="/app/search" className="section-link">See all</Link>
            </div>
            <div className="compact-grid">
              {wollongongServices.map((s) => (
                <Link href={`/app/service/${s.id}`} className="compact-card" key={s.id}>
                  <span className="compact-card-emoji" aria-hidden="true">
                    {s.isAboriginalLed ? "🪶" : "📍"}
                  </span>
                  <div className="compact-card-body">
                    <strong className="compact-card-name">{s.name}</strong>
                    <span className="compact-card-meta">{s.category} · {s.distance}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {ulladullaServices.length > 0 && (
          <section className="app-section">
            <div className="section-row">
              <h2 className="app-section-title">Ulladulla</h2>
              <Link href="/app/search" className="section-link">See all</Link>
            </div>
            <div className="compact-grid">
              {ulladullaServices.map((s) => (
                <Link href={`/app/service/${s.id}`} className="compact-card" key={s.id}>
                  <span className="compact-card-emoji" aria-hidden="true">
                    {s.isAboriginalLed ? "🪶" : "📍"}
                  </span>
                  <div className="compact-card-body">
                    <strong className="compact-card-name">{s.name}</strong>
                    <span className="compact-card-meta">{s.category} · {s.distance}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {portKemblaServices.length > 0 && (
          <section className="app-section">
            <div className="section-row">
              <h2 className="app-section-title">Port Kembla</h2>
              <Link href="/app/search" className="section-link">See all</Link>
            </div>
            <div className="compact-grid">
              {portKemblaServices.map((s) => (
                <Link href={`/app/service/${s.id}`} className="compact-card" key={s.id}>
                  <span className="compact-card-emoji" aria-hidden="true">
                    {s.isAboriginalLed ? "🪶" : "📍"}
                  </span>
                  <div className="compact-card-body">
                    <strong className="compact-card-name">{s.name}</strong>
                    <span className="compact-card-meta">{s.category} · {s.distance}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {nationalServices.length > 0 && (
          <section className="app-section">
            <div className="section-row">
              <h2 className="app-section-title">National services</h2>
              <Link href="/app/search" className="section-link">See all</Link>
            </div>
            <div className="compact-grid">
              {nationalServices.map((s) => (
                <Link href={`/app/service/${s.id}`} className="compact-card" key={s.id}>
                  <span className="compact-card-emoji" aria-hidden="true">📞</span>
                  <div className="compact-card-body">
                    <strong className="compact-card-name">{s.name}</strong>
                    <span className="compact-card-meta">{s.category} · {s.phone}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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