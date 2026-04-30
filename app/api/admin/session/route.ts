import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword, getAdminTokenFromRequest } from '@/lib/auth';

const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: admin.email },
      select: { email: true, role: true, permissions: true },
    });

    if (!adminUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      email: adminUser.email,
      role: adminUser.role,
      permissions: adminUser.permissions || [],
    });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, redirect } = body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let adminUser = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (adminUser) {
      if (adminUser.passwordHash && adminUser.passwordHash !== '') {
        const valid = await comparePassword(password, adminUser.passwordHash);
        if (!valid) {
          return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
        }
      }
    } else {
      const portalUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (!portalUser || !portalUser.isAdmin || !portalUser.password) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      const valid = await comparePassword(password, portalUser.password);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      adminUser = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });
      if (!adminUser) {
        adminUser = await prisma.adminUser.create({
          data: {
            email: normalizedEmail,
            passwordHash: portalUser.password!,
            role: 'admin',
            permissions: [],
          },
        });
      }
    }

    const token = signAdminToken({
      adminId: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      permissions: adminUser.permissions,
    });
    const safeRedirect = SAFE_REDIRECT_RE.test(redirect) ? redirect : '/admin/membership';

    return NextResponse.json({
      success: true,
      redirect: safeRedirect,
      token,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
