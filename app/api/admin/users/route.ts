import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

const VALID_ROLES = ['portal_user', 'admin', 'application_handler', 'finance_handler', 'cms_handler'];
const VALID_PERMISSIONS = [
  'membership',
  'volunteer',
  'mentorship',
  'collaboration',
  'conference',
  'conference-event',
];

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
  const PAGE_SIZE = 50;

  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' as const } },
          { name: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  const userEmails = users.map(u => u.email);

  const adminUserMap = await prisma.adminUser.findMany({
    where: { email: { in: userEmails } },
    select: { email: true, role: true, permissions: true },
  });

  const roleMap = new Map(adminUserMap.map(u => [u.email, { role: u.role, permissions: u.permissions }]));

  const usersWithRoles = users.map(u => {
    const adminData = roleMap.get(u.email);
    return {
      id: u.id,
      email: u.email,
      name: u.name || '',
      role: adminData?.role || 'portal_user',
      permissions: adminData?.permissions || [],
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      source: 'portal',
    };
  });

  return NextResponse.json({
    users: usersWithRoles,
    total,
    page,
    pageSize: PAGE_SIZE,
  });
}

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, role, permissions } = body;

    if (!userId || !role) {
      return NextResponse.json({ error: 'userId and role are required' }, { status: 400 });
    }

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, isAdmin: true } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let finalPermissions: string[] = [];

    if (role === 'application_handler') {
      if (!Array.isArray(permissions) || permissions.length === 0) {
        return NextResponse.json({ error: 'application_handler requires at least one permission' }, { status: 400 });
      }
      
      const invalidPerms = permissions.filter((p: string) => !VALID_PERMISSIONS.includes(p));
      if (invalidPerms.length > 0) {
        return NextResponse.json({ error: `Invalid permissions: ${invalidPerms.join(', ')}` }, { status: 400 });
      }
      
      finalPermissions = permissions;
    }

    const isAdminRole = role !== 'portal_user';

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { isAdmin: isAdminRole },
      });

      if (role === 'portal_user') {
        await tx.adminUser.deleteMany({ where: { email: user.email } });
      } else {
        const existing = await tx.adminUser.findUnique({ where: { email: user.email } });
        
        if (existing) {
          await tx.adminUser.update({
            where: { email: user.email },
            data: { role, permissions: finalPermissions },
          });
        } else {
          await tx.adminUser.create({
            data: {
              email: user.email,
              passwordHash: '',
              role,
              permissions: finalPermissions,
            },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.error('[admin/users PATCH]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
