import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

function auth(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) return null;
  return admin;
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const { items, mode = 'upsert' } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'items array required.' }, { status: 400 });
    }

    const results = { created: 0, updated: 0, errors: 0 };
    const errors: string[] = [];

    for (const item of items) {
      try {
        const { name, slug, description, level, parentLineageId, displayOrder } = item;
        if (!name || !slug) {
          errors.push(`Missing name or slug: ${JSON.stringify(item)}`);
          results.errors++;
          continue;
        }

        const existing = await prisma.lineage.findUnique({ where: { slug } });
        if (existing) {
          if (mode === 'skip') {
            continue;
          }
          await prisma.lineage.update({
            where: { id: existing.id },
            data: {
              name,
              description: description ?? existing.description,
              level: level ?? existing.level,
              parentLineageId: parentLineageId ?? existing.parentLineageId,
              displayOrder: displayOrder ?? existing.displayOrder,
            },
          });
          results.updated++;
        } else {
          await prisma.lineage.create({
            data: {
              name,
              slug,
              description: description ?? null,
              level: level ?? 0,
              parentLineageId: parentLineageId ?? null,
              displayOrder: displayOrder ?? 0,
            },
          });
          results.created++;
        }
      } catch (itemErr) {
        console.error('[bulk] item error:', itemErr);
        errors.push(`Error processing: ${JSON.stringify(item)}`);
        results.errors++;
      }
    }

    return NextResponse.json({ success: true, results, errors: errors.slice(0, 10) });
  } catch (err) {
    console.error('[cms/lineages bulk POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}