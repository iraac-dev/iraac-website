"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { type Service } from "../../app/data";

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

export default function FullMap({
  services: activeServices,
  onSelectService,
}: {
  services: Service[];
  onSelectService: (service: Service) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);
  const [ready, setReady] = useState(false);
  const [userDot, setUserDot] = useState<maplibregl.Marker | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: NOWRA_CENTER,
      zoom: 10,
      attributionControl: false,
    });

    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    m.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    m.on("load", () => {
      setReady(true);

      // User location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const el = document.createElement("div");
            el.className = "map-full-user-dot";
            el.innerHTML = '<div class="map-full-user-pulse"></div>';
            const marker = new maplibregl.Marker({ element: el })
              .setLngLat([pos.coords.longitude, pos.coords.latitude])
              .addTo(m);
            setUserDot(marker);
          },
          () => {}
        );
      }
    });

    map.current = m;

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  // Update markers when services change or map is ready
  useEffect(() => {
    if (!map.current || !ready) return;

    // Clear existing markers
    markers.current.forEach((m) => m.remove());
    markers.current = [];

    // Add markers for active services
    activeServices.forEach((s) => {
      const el = document.createElement("div");
      el.className = "map-full-marker";
      el.style.backgroundColor = categoryColors[s.category] ?? "#666";
      el.title = s.name;
      el.setAttribute("aria-label", s.name);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([s.lng, s.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => {
        onSelectService(s);
        // Highlight the marker
        document.querySelectorAll(".map-full-marker").forEach((m) => m.classList.remove("map-full-marker-active"));
        el.classList.add("map-full-marker-active");
      });

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (activeServices.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      activeServices.forEach((s) => bounds.extend([s.lng, s.lat]));
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 12 });
    }
  }, [activeServices, ready, onSelectService]);

  return (
    <div className="map-full-inner">
      <div ref={mapContainer} className="map-full-canvas" />
    </div>
  );
}