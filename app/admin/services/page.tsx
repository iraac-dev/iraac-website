"use client";

import { useState } from "react";
import { services, serviceCategories, type Service } from "../../data";

export default function AdminServicesPage() {
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = services.filter((s) => {
    if (filterCat !== "all" && s.category !== filterCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.suburb.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const published = services.length;
  const aboriginalLed = services.filter((s) => s.isAboriginalLed).length;

  return (
    <div className="admin-page-content">
      <div className="admin-top">
        <div>
          <p className="admin-kicker">Staff console</p>
          <h1>Service directory</h1>
        </div>
        <div className="admin-stat-badge">{published} services</div>
      </div>

      <div className="admin-summary-cards">
        <div className="admin-mini-card">
          <div className="admin-mini-stat">{published}</div>
          <div className="admin-mini-label">Total services</div>
        </div>
        <div className="admin-mini-card">
          <div className="admin-mini-stat">{aboriginalLed}</div>
          <div className="admin-mini-label">Aboriginal-led</div>
        </div>
        <div className="admin-mini-card">
          <div className="admin-mini-stat">{services.filter((s) => s.isCrisis).length}</div>
          <div className="admin-mini-label">Crisis services</div>
        </div>
        <div className="admin-mini-card">
          <div className="admin-mini-stat">{services.filter((s) => s.isNational).length}</div>
          <div className="admin-mini-label">National services</div>
        </div>
      </div>

      <div className="admin-filter-row admin-filter-row-stretch">
        <input
          type="search"
          placeholder="Search services by name, suburb, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search-input"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="admin-cat-select"
        >
          <option value="all">All categories</option>
          {serviceCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-service-grid">
        {filtered.map((service) => (
          <div className="admin-service-card" key={service.id}>
            <div className="admin-service-header">
              <span className="admin-service-emoji" aria-hidden="true">
                {service.isCrisis ? "🚨" : "📍"}
              </span>
              <div className="admin-service-meta">
                <span className="admin-service-category">{service.category}</span>
                {service.isAboriginalLed && <span className="admin-service-badge">Aboriginal-led</span>}
              </div>
            </div>
            <h3 className="admin-service-name">{service.name}</h3>
            <p className="admin-service-address">{service.address}, {service.suburb}</p>
            <p className="admin-service-phone">{service.phone}</p>
            <div className="admin-service-tags">
              {service.tags.slice(0, 4).map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="admin-service-actions">
              <a href={`/app/service/${service.id}`} className="admin-small-btn" target="_blank" rel="noopener noreferrer">
                View
              </a>
              <span className="admin-service-status">Published</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="admin-empty">
          <p>No services match your search.</p>
        </div>
      )}
    </div>
  );
}