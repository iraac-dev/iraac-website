import Link from "next/link";
import { services } from "../data";

export const metadata = {
  title: "1800 Mob Link prototype | IRAAC",
  description: "A location-based Aboriginal service finder prototype.",
};

export default function MobLinkApp() {
  return (
    <main className="app-page">
      <div className="phone-shell" aria-label="1800 Mob Link app prototype">
        <div className="phone-status" aria-hidden="true">
          <span>4:05</span>
          <span>5G 40</span>
        </div>

        <header className="app-top">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>For you</h1>
          </div>
          <button className="round-button" type="button" aria-label="Search services">
            o
          </button>
        </header>

        <div className="location-row">
          <div className="location-pill">Nowra</div>
          <button className="map-button" type="button">
            View map
          </button>
        </div>

        <div className="crisis-grid" aria-label="Crisis support">
          <a href="tel:139276">
            13YARN <span>Aboriginal crisis support 24/7</span>
          </a>
          <a href="tel:000">
            000 <span>In immediate danger</span>
          </a>
        </div>

        <section className="hero-card">
          <div>
            <strong>Recommended around Nowra</strong>
            <h2>Find support near you</h2>
            <strong>Health, legal, housing, family, culture and Centrelink pathways.</strong>
          </div>
          <button type="button">Start</button>
        </section>

        <section>
          <div className="section-row">
            <h2 className="app-section-title">Recommended for you</h2>
            <Link href="#services">See all</Link>
          </div>
          <div className="service-rail" id="services">
            {services.map((service) => (
              <article className="service-card" key={service.name}>
                <div className="service-art">{service.tags[0]}</div>
                <div className="service-body">
                  <div className="meta">
                    <span>{service.distance}</span>
                    <span>Recommended</span>
                  </div>
                  <h3>{service.name}</h3>
                  <p>
                    <strong>{service.type}</strong>
                  </p>
                  <p>{service.place}</p>
                  <p>{service.description}</p>
                  <div className="tag-row">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button type="button">Connect service</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className="bottom-nav" aria-label="Mob Link sections">
          <Link href="/app/" aria-current="page">
            Home
          </Link>
          <Link href="#services">Search</Link>
          <Link href="#services">Connected</Link>
          <Link href="/survey/">Survey</Link>
          <Link href="#profile">Profile</Link>
        </nav>
      </div>
    </main>
  );
}
