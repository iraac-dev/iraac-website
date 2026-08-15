import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Local development remains available for synthetic-data demonstrations.
  // A production deployment fails closed until authentication is configured.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isAdminRoute && process.env.NODE_ENV === "production") {
      return new NextResponse("MobLink supplier authentication is not configured.", { status: 503 });
    }
    supabaseResponse.headers.set("x-moblink-auth", "prototype-unconfigured");
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (isAdminRoute && !user) {
    const publicUrl = request.nextUrl.clone();
    publicUrl.pathname = "/";
    publicUrl.searchParams.set("supplierAccess", "required");
    return NextResponse.redirect(publicUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Apply to all routes except static files, favicon, and data
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
