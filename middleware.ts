import { NextRequest, NextResponse } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/cart', '/checkout', '/my-orders', '/profile'];

// Routes that should redirect if already authenticated
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get the auth token from cookies (would be set by client-side auth context)
  // For now, we'll rely on client-side checking since we're using localStorage
  // In a production app, this would use proper server-side sessions/tokens
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
