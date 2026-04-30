import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword } from '@/lib/auth';

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3050';
const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

function loginUrl(error: string) {
  const url = new URL('/admin/login', ADMIN_URL);
  url.searchParams.set('error', error);
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = (formData.get('password') as string) || '';
    const redirectPath = (formData.get('redirect') as string) || '/admin/membership';

    if (!email || !password) {
      return NextResponse.redirect(loginUrl('Invalid credentials.'));
    }

    let adminUser = await prisma.adminUser.findUnique({ where: { email } });

    if (adminUser) {
      if (!adminUser.passwordHash) {
        return NextResponse.redirect(loginUrl('Invalid email or password.'));
      }
      if (!(await comparePassword(password, adminUser.passwordHash))) {
        return NextResponse.redirect(loginUrl('Invalid email or password.'));
      }

      const token = signAdminToken({
        adminId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        permissions: adminUser.permissions,
      });
      const safeRedirect = SAFE_REDIRECT_RE.test(redirectPath) ? redirectPath : '/admin/membership';
      const res = NextResponse.redirect(new URL(safeRedirect, ADMIN_URL));
      res.headers.set('Set-Cookie', `admin_token=${token}; Path=/; Max-Age=3600; SameSite=Lax`);
      return res;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isAdmin || !user.password || !(await comparePassword(password, user.password))) {
      return NextResponse.redirect(loginUrl('Invalid email or password.'));
    }

    const token = signAdminToken({ adminId: user.id, email: user.email, role: 'admin' });
    const safeRedirect = SAFE_REDIRECT_RE.test(redirectPath) ? redirectPath : '/admin/membership';
    const res = NextResponse.redirect(new URL(safeRedirect, ADMIN_URL));
    res.headers.set('Set-Cookie', `admin_token=${token}; Path=/; Max-Age=3600; SameSite=Lax`);
    return res;
  } catch {
    return NextResponse.redirect(loginUrl('An unexpected error occurred.'));
  }
}
