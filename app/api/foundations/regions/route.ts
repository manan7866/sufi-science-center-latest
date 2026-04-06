import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      where: { deletedAt: null },
      orderBy: [{ level: 'asc' }, { displayOrder: 'asc' }],
      select: {
        id: true,
        name: true,
        slug: true,
        level: true,
        displayOrder: true,
        parentRegionId: true,
        description: true,
      },
    });

    // Map Prisma camelCase fields to snake_case for frontend compatibility
    const mappedRegions = regions.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      level: r.level,
      parent_region_id: r.parentRegionId,
      display_order: r.displayOrder,
      description: r.description,
    }));

    return NextResponse.json({ regions: mappedRegions });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
  }
}
