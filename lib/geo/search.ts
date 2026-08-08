// Server-side search adapter for Supabase PostGIS queries
// Currently uses the hardcoded services array as fallback.
// When Supabase is wired up, these functions will call the PostGIS SQL functions.

import { services } from "../../app/data";
import type { NearbySearchResult, SearchParams, ServiceDetail } from "./types";

/**
 * Search services near a geographic point.
 * Uses PostGIS when available, falls back to in-memory sorting.
 */
export async function searchNearby(params: SearchParams): Promise<NearbySearchResult[]> {
  // TODO: Replace with Supabase RPC call to nearby_services() when auth is wired
  const { lat, lng, radius = 50000, category, query } = params;

  let filtered = services.map((s) => {
    const distance = haversineDistance(lat || -34.882, lng || 150.6, s.lat, s.lng);
    return {
      id: s.id,
      name: s.name,
      category: s.category,
      subcategory: s.subcategory,
      tags: s.tags,
      description: s.description,
      address: s.address,
      suburb: s.suburb,
      state: s.state,
      postcode: s.postcode,
      lat: s.lat,
      lng: s.lng,
      distance_m: distance,
      distance_km: distance < 1000 ? `${Math.round(distance)} m` : `${(distance / 1000).toFixed(1)} km`,
      phone: s.phone,
      website: s.website || "",
      hours: s.hours,
      eligibility: s.eligibility,
      is_aboriginal_led: s.isAboriginalLed,
      is_crisis: s.isCrisis,
      is_national: s.isNational,
      is_free: s.isFree,
    };
  });

  // Filter by distance
  if (lat && lng) {
    filtered = filtered.filter((s) => s.distance_m <= radius);
  }

  // Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter((s) => s.category === category);
  }

  // Filter by search query
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.suburb.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort by distance
  filtered.sort((a, b) => a.distance_m - b.distance_m);

  return filtered;
}

/**
 * Search services by suburb/postcode text.
 * Falls back to in-memory filter.
 */
export async function searchByLocation(
  locationText: string,
  category?: string
): Promise<NearbySearchResult[]> {
  const q = locationText.toLowerCase();
  let filtered = services
    .filter(
      (s) =>
        s.suburb.toLowerCase().includes(q) || s.postcode.toLowerCase().includes(q)
    )
    .map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      subcategory: s.subcategory,
      tags: s.tags,
      description: s.description,
      address: s.address,
      suburb: s.suburb,
      state: s.state,
      postcode: s.postcode,
      lat: s.lat,
      lng: s.lng,
      distance_m: 0,
      distance_km: "",
      phone: s.phone,
      website: s.website || "",
      hours: s.hours,
      eligibility: s.eligibility,
      is_aboriginal_led: s.isAboriginalLed,
      is_crisis: s.isCrisis,
      is_national: s.isNational,
      is_free: s.isFree,
    }));

  if (category && category !== "all") {
    filtered = filtered.filter((s) => s.category === category);
  }

  return filtered;
}

/**
 * Get full service detail by ID.
 */
export async function getServiceDetail(id: string): Promise<ServiceDetail | null> {
  const s = services.find((s) => s.id === id);
  if (!s) return null;

  return {
    id: s.id,
    name: s.name,
    category: s.category,
    subcategory: s.subcategory,
    tags: s.tags,
    description: s.description,
    address: s.address,
    suburb: s.suburb,
    state: s.state,
    postcode: s.postcode,
    lat: s.lat,
    lng: s.lng,
    phone: s.phone,
    website: s.website || "",
    hours: s.hours,
    eligibility: s.eligibility,
    is_aboriginal_led: s.isAboriginalLed,
    is_crisis: s.isCrisis,
    is_national: s.isNational,
    is_free: s.isFree,
    source: "Synthetic seed data",
    reviewed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Haversine distance calculation (fallback when PostGIS isn't available).
 * Returns distance in meters.
 */
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}