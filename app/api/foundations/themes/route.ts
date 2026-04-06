import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const themes = await prisma.theme.findMany({
      where: { deletedAt: null },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        displayOrder: true,
        description: true,
        category: true,
      },
    });

    // Map Prisma camelCase fields to snake_case for frontend compatibility
    const mappedThemes = themes.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      display_order: t.displayOrder,
      description: t.description,
      category: t.category,
    }));

    return NextResponse.json({ themes: mappedThemes });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 });
  }
}
