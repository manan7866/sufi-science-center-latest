import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /portal routes - redirect to signin if no user token
  if (pathname.startsWith('/portal')) {
    const token = req.cookies.get('ssc_user_token')?.value;

    if (!token) {
      const signinUrl = new URL('/auth/signin', "https://sufisciencecenter.info");
      signinUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // Admin routes are protected client-side in the admin layout
  // (Checks admin_token cookie + verifies via /api/admin/dashboard)

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
