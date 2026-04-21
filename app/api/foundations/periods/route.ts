import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const eras = await prisma.historicalPeriod.findMany({
      where: { deletedAt: null },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        startYear: true,
        endYear: true,
        displayOrder: true,
        description: true,
        significance: true,
        keywords : true,
      },
    });

    // Map Prisma camelCase fields to snake_case for frontend compatibility
    const mappedEras = eras.map((e) => ({
      id: e.id,
      name: e.name,
      slug: e.slug,
      start_year: e.startYear,
      end_year: e.endYear,
      display_order: e.displayOrder,
      description: e.description,
      significance: e.significance,
      keywords: e.keywords,
    }));

    return NextResponse.json({ eras: mappedEras });
  } catch (error) {
    console.error('Error fetching eras:', error);
    return NextResponse.json({ error: 'Failed to fetch eras' }, { status: 500 });
  }
}
