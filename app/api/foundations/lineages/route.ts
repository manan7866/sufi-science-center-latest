import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const lineages = await prisma.lineage.findMany({
      where: { deletedAt: null },
      orderBy: [{ level: 'asc' }, { displayOrder: 'asc' }],
      select: {
        id: true,
        name: true,
        slug: true,
        level: true,
        description: true,
        displayOrder: true,
        parentLineageId: true,
      },
    });

    // Map Prisma camelCase fields to snake_case for frontend compatibility
    const mappedLineages = lineages.map((l) => ({
      id: l.id,
      name: l.name,
      slug: l.slug,
      level: l.level,
      parent_lineage_id: l.parentLineageId,
      description: l.description,
      display_order: l.displayOrder,
    }));

    return NextResponse.json({ lineages: mappedLineages });
  } catch (error) {
    console.error('Error fetching lineages:', error);
    return NextResponse.json({ error: 'Failed to fetch lineages' }, { status: 500 });
  }
}
