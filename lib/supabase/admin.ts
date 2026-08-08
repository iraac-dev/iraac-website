import { createClient } from "@supabase/supabase-js";

// Service-role client — server-only, never expose to the browser
// Throws if accidentally imported in client code

// Guard: ensure this is never bundled for the browser
if (typeof window !== "undefined") {
  throw new Error(
    "lib/supabase/admin.ts was imported in the browser. This module uses the service-role key and must only be called from server code."
  );
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type SupabaseAdminClient = ReturnType<typeof createAdminClient>;