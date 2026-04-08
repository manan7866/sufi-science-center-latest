import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = formData.get('password') as string;
    const redirectPath = (formData.get('redirect') as string) || '/admin/membership';

    if (!email || !password) {
      return new NextResponse(
        `<script>window.parent.postMessage({ type: 'admin-login-result', success: false, error: 'Invalid credentials.' }, '*');</script>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !(await comparePassword(password, admin.passwordHash))) {
      return new NextResponse(
        `<script>window.parent.postMessage({ type: 'admin-login-result', success: false, error: 'Invalid email or password.' }, '*');</script>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const token = signAdminToken({ adminId: admin.id, email: admin.email, role: admin.role });
    const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;
    const safeRedirect = SAFE_REDIRECT_RE.test(redirectPath) ? redirectPath : '/admin/membership';

    const res = new NextResponse(
      `<script>window.parent.postMessage({ type: 'admin-login-result', success: true, redirect: '${safeRedirect}' }, '*');</script>`,
      { headers: { 'Content-Type': 'text/html' } }
    );

    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/',
    });

    return res;
  } catch {
    return new NextResponse(
      `<script>window.parent.postMessage({ type: 'admin-login-result', success: false, error: 'Invalid request.' }, '*');</script>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}
