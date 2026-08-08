"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { type Service, services } from "../../app/data";

const NOWRA_CENTER: [number, number] = [150.600, -34.882];

const categoryColors: Record<string, string> = {
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

export default function ServiceMap({
  selectedCategory,
  onSelectService,
}: {
  selectedCategory?: string | "all";
  onSelectService?: (service: Service) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);
  const [selected, setSelected] = useState<Service | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: NOWRA_CENTER,
      zoom: 12,
      attributionControl: false,
    });

    m.addControl(new maplibregl.NavigationControl(), "top-right");
    m.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    m.on("load", () => setMapReady(true));
    map.current = m;

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Clear existing markers
    markers.current.forEach((m) => m.remove());
    markers.current = [];

    const filtered = selectedCategory && selectedCategory !== "all"
      ? services.filter((s) => s.category === selectedCategory)
      : services;

    filtered.forEach((service) => {
      if (service.isNational) return; // skip national services on map

      const el = document.createElement("div");
      el.className = "map-marker";
      el.style.backgroundColor = categoryColors[service.category] ?? "#666";
      el.innerHTML = `<span class="map-marker-inner">${service.isCrisis ? "!" : ""}</span>`;
      el.title = service.name;
      el.setAttribute("aria-label", service.name);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([service.lng, service.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setSelected(service);
        onSelectService?.(service);
      });

      markers.current.push(marker);
    });
  }, [mapReady, selectedCategory, onSelectService]);

  const handleLocate = () => {
    if (!map.current) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.current?.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 12 });
        },
        () => {
          map.current?.flyTo({ center: NOWRA_CENTER, zoom: 12 });
        }
      );
    }
  };

  return (
    <div className="service-map-wrapper">
      <div ref={mapContainer} className="service-map" role="application" aria-label="Service location map" />

      <div className="map-controls">
        <button type="button" className="map-locate-btn" onClick={handleLocate} aria-label="Use my location">
          📍
        </button>
      </div>

      {selected && (
        <div className="map-popup" role="dialog" aria-label={`${selected.name} details`}>
          <div className="map-popup-header">
            <h3>{selected.name}</h3>
            <button
              type="button"
              className="map-popup-close"
              onClick={() => setSelected(null)}
              aria-label="Close details"
            >
              ✕
            </button>
          </div>
          <p className="map-popup-category">{selected.subcategory}</p>
          <p className="map-popup-distance">{selected.distance}</p>
          <p className="map-popup-address">
            {selected.address}, {selected.suburb}
          </p>
          <p className="map-popup-description">{selected.description}</p>
          <div className="map-popup-actions">
            <a href={`/app/service/${selected.id}`} className="map-popup-btn">
              View details
            </a>
            <a href={`tel:${selected.phone.replace(/[^0-9+]/g, "")}`} className="map-popup-btn map-popup-btn-secondary">
              Call {selected.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}