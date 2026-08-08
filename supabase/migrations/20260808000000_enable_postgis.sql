-- Enable PostGIS extension for location-based queries
-- This powers the 1800 Mob Link service directory search
create extension if not exists "postgis" with schema "extensions";

-- Enable the pg_trgm extension for fuzzy text search on service names/descriptions
create extension if not exists "pg_trgm" with schema "extensions";

comment on extension postgis is 'Geospatial extension for distance queries and polygon boundaries';
comment on extension pg_trgm is 'Trigram text search for fuzzy service name matching';