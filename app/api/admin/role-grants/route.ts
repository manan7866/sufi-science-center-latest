import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

function checkAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const grants = await prisma.userRoleGrant.findMany();
  return NextResponse.json({ grants });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { email, grantedRole, permissions, notes, isBlocked, blockReason } = await req.json();
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

    const existing = await prisma.userRoleGrant.findUnique({ where: { email } });

    const data = {
      email,
      grantedRole: grantedRole || 'seeker',
      permissions: permissions || {},
      notes: notes || null,
      isBlocked: isBlocked ?? false,
      blockReason: blockReason || null,
      blockedAt: isBlocked ? new Date() : null,
      grantedAt: new Date(),
    };

    let grant;
    if (existing) {
      grant = await prisma.userRoleGrant.update({ where: { email }, data });
    } else {
      grant = await prisma.userRoleGrant.create({ data });
    }

    return NextResponse.json({ grant });
  } catch {
    return NextResponse.json({ error: 'Failed to save grant' }, { status: 500 });
  }
}
