import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword } from '@/lib/auth';

const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, redirect } = body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Invalid credentials or not an admin.' }, { status: 401 });
    }

    const valid = user.password && await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signAdminToken({ adminId: user.id, email: user.email, role: 'admin' });
    const safeRedirect = SAFE_REDIRECT_RE.test(redirect) ? redirect : '/admin/membership';

    // Return token in response so client can set cookie
    return NextResponse.json({ 
      success: true, 
      redirect: safeRedirect,
      token, // Client will set this via document.cookie
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
