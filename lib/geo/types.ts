// Types for the PostGIS-powered service search

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface NearbySearchResult {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  lat: number;
  lng: number;
  distance_m: number;
  distance_km: string;
  phone: string;
  website: string;
  hours: string;
  eligibility: string;
  is_aboriginal_led: boolean;
  is_crisis: boolean;
  is_national: boolean;
  is_free: boolean;
}

export interface SearchParams {
  lat?: number;
  lng?: number;
  radius?: number; // meters, default 50000
  category?: string;
  query?: string;
  locationText?: string; // suburb or postcode
}

export interface ServiceDetail {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  hours: string;
  eligibility: string;
  is_aboriginal_led: boolean;
  is_crisis: boolean;
  is_national: boolean;
  is_free: boolean;
  source: string;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}