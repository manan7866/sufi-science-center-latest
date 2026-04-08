import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getSession(sessionToken: string) {
  return prisma.portalSession.findUnique({ where: { sessionToken } });
}

export async function GET(req: NextRequest) {
  const sessionToken = req.nextUrl.searchParams.get('sessionToken');
  if (!sessionToken) return NextResponse.json({ error: 'sessionToken required' }, { status: 400 });

  const session = await getSession(sessionToken);
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

  const profile = await prisma.portalProfile.findUnique({ where: { sessionToken } });

  return NextResponse.json({
    profile: profile ?? {
      fullName: '', displayName: '', location: '', bio: '',
      interests: [], avatarUrl: '', email: '', phone: '',
      addressLine1: '', addressLine2: '', city: '', country: '', postalCode: '',
    },
  });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionToken, ...profileData } = body;
    if (!sessionToken) return NextResponse.json({ error: 'sessionToken required' }, { status: 400 });

    const session = await getSession(sessionToken);
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const profile = await prisma.portalProfile.upsert({
      where: { sessionToken },
      update: { ...profileData, updatedAt: new Date() },
      create: { sessionToken, ...profileData },
    });

    if (profileData.displayName) {
      await prisma.portalSession.update({
        where: { sessionToken },
        data: { displayName: profileData.displayName },
      });
    }

    return NextResponse.json({ profile });
  } catch {
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}
