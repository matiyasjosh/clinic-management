// utils/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // =================================================================
  // HELPER: Safe Redirect (Preserves Supabase Auth Cookies)
  // =================================================================
  const redirect = (destination: string) => {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    const redirectResponse = NextResponse.redirect(url);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });

    return redirectResponse;
  };

  // =================================================================
  // 1. ROUTE PREFIXES
  // =================================================================
  // We check if the path starts with these prefixes to protect all sub-routes automatically
  const isAuthRoute = path.startsWith("/login") || path.startsWith("/register");

  const isRoleRoute =
    path.startsWith("/admin") ||
    path.startsWith("/doctor") ||
    path.startsWith("/patient") ||
    path.startsWith("/receptionist");

  // =================================================================
  // 2. UN-AUTHENTICATED USER LOGIC
  // =================================================================
  if (!user) {
    // If an unauthenticated user tries to access ANY role-protected route, send them to login
    if (isRoleRoute) {
      return redirect("/login");
    }
    // Otherwise, let them view public pages (like '/', '/about', etc.)
    return supabaseResponse;
  }

  // =================================================================
  // 3. AUTHENTICATED USER & ROLE LOGIC
  // =================================================================

  const { data: profile } = await supabase
    .from("profile")
    .select("role")
    .eq("id", user.id)
    .single();

  // Extract the user's role (assuming you saved it in app_metadata)
  const userRole = profile?.role as string;

  // Define where each role should be redirected to by default
  const roleDashboards: Record<string, string> = {
    admin: "/admin",
    doctor: "/doctor",
    patient: "/patient",
    receptionist: "/receptionist",
  };

  // Fallback if a user has no role somehow, send them to a generic unauthorized page
  const defaultDashboard = "/dashboard";

  // If a logged-in user visits the login/register page, send them to their specific dashboard
  if (isAuthRoute) {
    return redirect(defaultDashboard);
  }

  //here goes the redirections
  if (path.startsWith("/admin") && userRole !== "admin") {
    return redirect(defaultDashboard);
  }

  if (path.startsWith("/doctor") && userRole !== "doctor") {
    // Optional: If you want admins to have access to doctor pages too, change the condition to:
    // if (userRole !== 'doctor' && userRole !== 'admin')
    return redirect(defaultDashboard);
  }

  if (path.startsWith("/patient") && userRole !== "patient") {
    return redirect(defaultDashboard);
  }

  if (path.startsWith("/receptionist") && userRole !== "receptionist") {
    return redirect(defaultDashboard);
  }

  // If they passed the checks, return the modified response to load the page
  return supabaseResponse;
}
