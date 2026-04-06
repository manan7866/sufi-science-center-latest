import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const saints = await prisma.saint.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      include: {
        saintLineages: {
          include: {
            lineage: true,
          },
        },
        saintThemes: {
          include: {
            theme: true,
          },
        },
      },
    });

    // Map Prisma camelCase fields to snake_case for frontend compatibility
    const mappedSaints = saints.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      birth_year: s.birthYear,
      death_year: s.deathYear,
      biography: s.biography,
      short_summary: s.shortSummary,
      region: s.region,
      region_id: null,
      is_founder: s.isFounder,
      lineages: s.saintLineages.map((sl) => ({
        id: sl.lineage.id,
        name: sl.lineage.name,
        slug: sl.lineage.slug,
      })),
      themes: s.saintThemes.map((st) => ({
        id: st.theme.id,
        name: st.theme.name,
        slug: st.theme.slug,
      })),
    }));

    return NextResponse.json({ saints: mappedSaints });
  } catch (error) {
    console.error('Error fetching saints:', error);
    return NextResponse.json({ error: 'Failed to fetch saints' }, { status: 500 });
  }
}
