import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - Fetch reflections for a session or user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionToken = searchParams.get('sessionToken');
    const userId = searchParams.get('userId');

    if (!sessionToken && !userId) {
      return NextResponse.json(
        { error: 'sessionToken or userId is required' },
        { status: 400 }
      );
    }

    const reflections = await prisma.reflectionEntry.findMany({
      where: {
        OR: [
          ...(sessionToken ? [{ sessionToken }] : []),
          ...(userId ? [{ userId }] : []),
        ],
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ reflections });
  } catch (error) {
    console.error('GET reflections error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create or update a reflection
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const { sessionToken, surahNumber, reflectionText, userId: bodyUserId } = body;

    if (!surahNumber || !reflectionText) {
      return NextResponse.json(
        { error: 'surahNumber and reflectionText are required' },
        { status: 400 }
      );
    }

    const userId = user.userId || bodyUserId;

    if (!sessionToken && !userId) {
      return NextResponse.json(
        { error: 'sessionToken or userId is required' },
        { status: 400 }
      );
    }

    const existing = await prisma.reflectionEntry.findFirst({
      where: {
        surahNumber,
        OR: [
          { sessionToken: sessionToken || undefined },
          { userId: userId || undefined },
        ].filter(Boolean),
      },
    });

    if (existing) {
      const updated = await prisma.reflectionEntry.update({
        where: { id: existing.id },
        data: {
          reflectionText,
          isApproved: false,
          userId: userId || existing.userId,
        },
      });
      return NextResponse.json(updated);
    }

    const created = await prisma.reflectionEntry.create({
      data: {
        sessionToken,
        userId,
        surahNumber,
        reflectionText,
        isApproved: false,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error('POST reflections error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Delete a reflection (only own reflections)
export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Reflection ID is required' },
        { status: 400 }
      );
    }

    const reflection = await prisma.reflectionEntry.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!reflection) {
      return NextResponse.json(
        { error: 'Reflection not found' },
        { status: 404 }
      );
    }

    if (reflection.userId !== user.userId) {
      return NextResponse.json(
        { error: 'You can only delete your own reflections' },
        { status: 403 }
      );
    }

    await prisma.reflectionEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete reflection error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
