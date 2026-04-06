import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (pathname === '/admin/login' || pathname === '/admin/unauthorized') {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const token = req.cookies.get('admin_token')?.value;

  if (!token) {
    const loginUrl = new URL('/admin/login', req.url);
    if (SAFE_REDIRECT_RE.test(pathname)) {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  const payload = verifyAdminToken(token);

  if (!payload || payload.role !== 'admin') {
    const loginUrl = new URL('/admin/login', req.url);
    if (SAFE_REDIRECT_RE.test(pathname)) {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/admin/:path*'],
};
