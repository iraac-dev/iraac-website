"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { services } from "../../app/data";
import Link from "next/link";

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

export default function MiniMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: NOWRA_CENTER,
      zoom: 10,
      attributionControl: false,
      interactive: true,
      dragPan: true,
      scrollZoom: true,
    });

    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    m.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    m.on("load", () => {
      setReady(true);

      // Try to get user location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLngLat: [number, number] = [pos.coords.longitude, pos.coords.latitude];
            setUserLocation(userLngLat);

            // Add user location marker
            const el = document.createElement("div");
            el.className = "minimap-user-dot";
            el.innerHTML = '<div class="minimap-user-pulse"></div>';
            new maplibregl.Marker({ element: el })
              .setLngLat(userLngLat)
              .addTo(m);

            // Fly to include user location
            const bounds = new maplibregl.LngLatBounds();
            bounds.extend(userLngLat);
            services
              .filter((s) => !s.isNational)
              .forEach((s) => bounds.extend([s.lng, s.lat]));
            m.fitBounds(bounds, { padding: 60, maxZoom: 11 });
          },
          () => {
            // Fallback: show Nowra area
            addServiceMarkers(m);
          }
        );
      } else {
        addServiceMarkers(m);
      }
    });

    map.current = m;

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  const addServiceMarkers = (m: maplibregl.Map) => {
    const localServices = services.filter((s) => !s.isNational);

    // Use clustering approach - group nearby markers
    const clusters = clusterMarkers(localServices, 0.02); // ~2km clusters

    clusters.forEach((cluster) => {
      if (cluster.count === 1) {
        // Single marker
        const s = cluster.services[0];
        const el = document.createElement("div");
        el.className = "minimap-dot";
        el.style.backgroundColor = categoryColors[s.category] ?? "#666";
        el.title = s.name;
        el.setAttribute("aria-label", s.name);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([s.lng, s.lat])
          .addTo(m);

        el.addEventListener("click", () => {
          window.location.href = `/app/service/${s.id}`;
        });
      } else {
        // Cluster marker with count
        const el = document.createElement("div");
        el.className = "minimap-cluster";
        el.textContent = String(cluster.count);
        el.style.backgroundColor = categoryColors[cluster.services[0]?.category] ?? "#666";

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(cluster.center)
          .addTo(m);

        el.addEventListener("click", () => {
          m.flyTo({ center: cluster.center, zoom: 13 });
        });
      }
    });
  };

  return (
    <div className="minimap-wrapper">
      <div ref={mapContainer} className="minimap" />
      <Link href="/app/map" className="minimap-overlay" aria-label="Open full map view">
        <span className="minimap-overlay-text">Open full map →</span>
      </Link>
    </div>
  );
}

interface Cluster {
  center: [number, number];
  count: number;
  services: typeof services;
}

function clusterMarkers(svcs: typeof services, radius: number): Cluster[] {
  const clusters: Cluster[] = [];
  const assigned = new Set<string>();

  svcs.forEach((s) => {
    if (assigned.has(s.id)) return;

    const nearby = svcs.filter((s2) => {
      if (assigned.has(s2.id)) return false;
      const dLat = s2.lat - s.lat;
      const dLng = s2.lng - s.lng;
      return Math.sqrt(dLat * dLat + dLng * dLng) < radius;
    });

    nearby.forEach((s2) => assigned.add(s2.id));

    clusters.push({
      center: [s.lng, s.lat],
      count: nearby.length,
      services: nearby,
    });
  });

  return clusters;
}