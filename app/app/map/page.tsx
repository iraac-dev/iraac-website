"use client";

import CrisisStrip from "../../../components/app/CrisisStrip";
import ServiceMap from "../../../components/app/ServiceMap";

export default function MapPage() {
  return (
    <main className="app-page">
      <div className="phone-shell">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Map</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top app-top-compact">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Service map</h1>
          </div>
        </header>

        <CrisisStrip />

        <div className="app-section app-section-full">
          <ServiceMap />
        </div>

        <nav className="bottom-nav" aria-label="Mob Link sections">
          <a href="/app/">Home</a>
          <a href="/app/search">Search</a>
          <a href="/app/map" aria-current="page">Map</a>
          <a href="/survey/">Survey</a>
        </nav>
      </div>
    </main>
  );
}