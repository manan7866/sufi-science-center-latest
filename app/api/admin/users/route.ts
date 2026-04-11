import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '0');
  const search = searchParams.get('search') ?? '';
  const PAGE_SIZE = 25;

  // Get registered users from the User table (these have proper email/name)
  const userWhere = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [registeredUsers, total] = await Promise.all([
    prisma.user.findMany({
      where: userWhere,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where: userWhere }),
  ]);

  // Map to consistent format
  const users = registeredUsers.map((u) => ({
    id: u.id,
    displayName: u.name,
    email: u.email,
    role: u.isAdmin ? 'admin' : 'user',
    isVerified: u.isVerified,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    source: 'registered',
  }));

  return NextResponse.json({ users, total, page, pageSize: PAGE_SIZE });
}
