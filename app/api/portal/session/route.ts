import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { sessionToken } = await req.json();
    if (!sessionToken || typeof sessionToken !== 'string') {
      return NextResponse.json({ error: 'sessionToken required' }, { status: 400 });
    }

    const session = await prisma.portalSession.upsert({
      where: { sessionToken },
      update: { lastActivityAt: new Date() },
      create: {
        sessionToken,
        completedModules: [],
        assessmentStage: 'beginner',
      },
    });

    return NextResponse.json({ session });
  } catch {
    return NextResponse.json({ error: 'Failed to create/update session' }, { status: 500 });
  }
}
