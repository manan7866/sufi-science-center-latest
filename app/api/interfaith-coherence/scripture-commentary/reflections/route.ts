import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const surahNumber = Number(searchParams.get("surahNumber"));

    if (!surahNumber) {
      return NextResponse.json(
        { error: "surahNumber is required" },
        { status: 400 }
      );
    }

    const reflections = await prisma.reflectionEntry.findMany({
      where: {
        surahNumber,
        isApproved: true, // 🔥 ONLY APPROVED
      },
      orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
    });

    return NextResponse.json({ reflections });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch reflections" },
      { status: 500 }
    );
  }
}