import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword } from '@/lib/auth';

const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = formData.get('password') as string;
    const redirectPath = (formData.get('redirect') as string) || '/admin/membership';

    if (!email || !password) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('error', 'Invalid credentials.');
      return NextResponse.redirect(loginUrl);
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isAdmin || !(await comparePassword(password, user.password))) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('error', 'Invalid email or password.');
      return NextResponse.redirect(loginUrl);
    }

    const token = signAdminToken({ adminId: user.id, email: user.email, role: 'admin' });
    const safeRedirect = SAFE_REDIRECT_RE.test(redirectPath) ? redirectPath : '/admin/membership';

    // Create redirect response with Set-Cookie header
    const res = NextResponse.redirect(new URL(safeRedirect, req.url));
    res.headers.set('Set-Cookie', `admin_token=${token}; Path=/; Max-Age=3600; SameSite=Lax`);
    return res;
  } catch {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('error', 'An unexpected error occurred.');
    return NextResponse.redirect(loginUrl);
  }
}
