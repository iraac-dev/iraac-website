"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { services, serviceCategories, type Service } from "../../data";
import BottomNav from "../../../components/app/BottomNav";
import dynamic from "next/dynamic";

const FullMap = dynamic(() => import("../../../components/app/FullMap"), {
  ssr: false,
  loading: () => (
    <div className="map-loading-fill">
      <div className="map-loading-spinner" />
      <p>Loading map...</p>
    </div>
  ),
});

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showList, setShowList] = useState(false);

  const filtered = useMemo(() => {
    let result = services.filter((s) => !s.isNational);
    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.suburb.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  return (
    <main className="app-page">
      <div className="map-full-page">
        {/* Search bar */}
        <div className="map-full-top">
          <div className="map-full-search">
            <span className="map-full-search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="map-full-search-input"
              placeholder="Search services on map..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search services on map"
            />
          </div>
          <div className="map-full-categories">
            <button
              type="button"
              className={`map-full-cat-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {serviceCategories.map((cat) => (
              <button
                type="button"
                className={`map-full-cat-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                key={cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Full map */}
        <div className="map-full-container">
          <FullMap
            services={filtered}
            onSelectService={(s) => {
              setSelectedService(s);
              setShowList(false);
            }}
          />
        </div>

        {/* Bottom sheet - service list */}
        <div className={`map-full-sheet ${showList || selectedService ? "map-full-sheet-open" : ""}`}>
          <div className="map-full-sheet-handle" onClick={() => { setShowList(!showList); setSelectedService(null); }}>
            <div className="map-full-sheet-handle-bar" />
          </div>

          {selectedService ? (
            <div className="map-full-sheet-content">
              <div className="map-full-sheet-row">
                <h3 className="map-full-sheet-name">{selectedService.name}</h3>
                <button type="button" className="map-full-sheet-close" onClick={() => setSelectedService(null)}>✕</button>
              </div>
              <span className="map-full-sheet-cat">{selectedService.subcategory}</span>
              <span className="map-full-sheet-dist">{selectedService.distance} · {selectedService.suburb}</span>
              <p className="map-full-sheet-desc">{selectedService.description}</p>
              <div className="map-full-sheet-actions">
                <Link href={`/app/service/${selectedService.id}`} className="map-full-sheet-btn">
                  View details
                </Link>
                <a href={`tel:${selectedService.phone.replace(/[^0-9+]/g, "")}`} className="map-full-sheet-btn map-full-sheet-btn-outline">
                  Call {selectedService.phone}
                </a>
              </div>
            </div>
          ) : (
            <div className="map-full-sheet-content">
              <div className="map-full-sheet-row">
                <h3 className="map-full-sheet-name">Services in view ({filtered.length})</h3>
                <button type="button" className="map-full-sheet-close" onClick={() => setShowList(false)}>✕</button>
              </div>
              <div className="map-full-sheet-list">
                {filtered.slice(0, 20).map((s) => (
                  <Link
                    href={`/app/service/${s.id}`}
                    className="map-full-sheet-item"
                    key={s.id}
                  >
                    <div className="map-full-sheet-item-dot" style={{ background: categoryColorMap[s.category] || "#666" }} />
                    <div className="map-full-sheet-item-body">
                      <strong>{s.name}</strong>
                      <span>{s.distance} · {s.suburb}</span>
                    </div>
                  </Link>
                ))}
                {filtered.length > 20 && (
                  <p className="map-full-sheet-more">+{filtered.length - 20} more services</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Toggle list button */}
        <button
          type="button"
          className="map-full-list-toggle"
          onClick={() => { setShowList(!showList); setSelectedService(null); }}
          aria-label="Toggle service list"
        >
          {showList ? "Map" : "List"}
        </button>
      </div>

      <BottomNav current="/app/map" />
    </main>
  );
}

const categoryColorMap: Record<string, string> = {
  Crisis: "#dc2626",
  Health: "#059669",
  Legal: "#2563eb",
  Housing: "#d97706",
  Family: "#7c3aed",
  Youth: "#0891b2",
  Culture: "#c026d3",
  Education: "#65a30d",
  Employment: "#0d9488",
  Centrelink: "#78716c",
  Financial: "#ca8a04",
  "Mental Health": "#4f46e5",
  Addiction: "#b91c1c",
  Elderly: "#a21caf",
  Disability: "#6366f1",
};