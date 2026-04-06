import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword } from '@/lib/auth';

const ALLOWED_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

export async function POST(req: NextRequest) {
  try {
    const { email, password, redirect } = await req.json();

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const admin = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const valid = await comparePassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signAdminToken({ adminId: admin.id, email: admin.email, role: admin.role });

    const safeRedirect =
      typeof redirect === 'string' && ALLOWED_REDIRECT_RE.test(redirect)
        ? redirect
        : '/admin';

    const isProduction = process.env.NODE_ENV === 'production';
    const secure = isProduction ? '; Secure' : '';
    const res = NextResponse.json({ success: true, redirect: safeRedirect });
    res.headers.append('Set-Cookie', `admin_token=${token}; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict${secure}`);
    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.headers.append('Set-Cookie', 'admin_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict');
  return res;
}
