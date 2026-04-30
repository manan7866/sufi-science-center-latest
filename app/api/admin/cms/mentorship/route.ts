import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest, hasCmsPermission } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');
  const where = search ? { title: { contains: search, mode: 'insensitive' as const } } : {};
  const [items, total] = await Promise.all([
    prisma.mentorshipProgram.findMany({ where, orderBy: { title: 'asc' }, skip: page * pageSize, take: pageSize }),
    prisma.mentorshipProgram.count({ where }),
  ]);
  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, slug, description, mentorName, mentor_bio, mentorLineage, mentor_lineage, focusAreas, focus_areas, programDurationMonths, program_duration_months, meetingFrequency, meeting_frequency, format, capacity, requirements, applicationProcess, upsert } = body;
    if (!title || !slug) return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    const program = upsert ? await prisma.mentorshipProgram.upsert({
      where: { slug },
      create: { title, slug, description: description ?? '', mentorName: mentorName ?? '', mentorBio: mentor_bio ?? '', mentorLineage: mentor_lineage ?? mentorLineage ?? '', focusAreas: focus_areas ?? focusAreas ?? [], programDurationMonths: program_duration_months ?? programDurationMonths ?? 3, meetingFrequency: meeting_frequency ?? meetingFrequency ?? '', format: format ?? 'one_on_one', capacity: capacity ?? 5, requirements: requirements ?? [], applicationProcess: applicationProcess ?? '' },
      update: { title, description: description ?? '', mentorName: mentorName ?? '', mentorBio: mentor_bio ?? '', mentorLineage: mentor_lineage ?? mentorLineage ?? '', focusAreas: focus_areas ?? focusAreas ?? [], programDurationMonths: program_duration_months ?? programDurationMonths ?? 3, meetingFrequency: meeting_frequency ?? meetingFrequency ?? '', format: format ?? 'one_on_one', capacity: capacity ?? 5, requirements: requirements ?? [], applicationProcess: applicationProcess ?? '' },
    }) : await prisma.mentorshipProgram.create({
      data: { title, slug, description: description ?? '', mentorName: mentorName ?? '', mentorBio: mentor_bio ?? '', mentorLineage: mentor_lineage ?? mentorLineage ?? '', focusAreas: focus_areas ?? focusAreas ?? [], programDurationMonths: program_duration_months ?? programDurationMonths ?? 3, meetingFrequency: meeting_frequency ?? meetingFrequency ?? '', format: format ?? 'one_on_one', capacity: capacity ?? 5, requirements: requirements ?? [], applicationProcess: applicationProcess ?? '' },
    });
    return NextResponse.json({ item: program });
  } catch (err) { console.error('[cms/mentorship POST]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, title, slug, description, mentorName, mentor_bio, mentorLineage, mentor_lineage, focusAreas, focus_areas, programDurationMonths, program_duration_months, meetingFrequency, meeting_frequency, format, capacity, requirements, applicationProcess } = body;
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    const program = await prisma.mentorshipProgram.update({
      where: { id },
      data: { ...(title !== undefined && { title }), ...(slug !== undefined && { slug }), ...(description !== undefined && { description }), ...(mentorName !== undefined && { mentorName }), ...(mentor_bio !== undefined && { mentorBio: mentor_bio }), ...(mentorLineage !== undefined && { mentorLineage }) || (mentor_lineage !== undefined && { mentorLineage: mentor_lineage }), ...(focusAreas !== undefined && { focusAreas }) || (focus_areas !== undefined && { focusAreas: focus_areas }), ...(programDurationMonths !== undefined && { programDurationMonths }) || (program_duration_months !== undefined && { programDurationMonths: program_duration_months }), ...(meetingFrequency !== undefined && { meetingFrequency }) || (meeting_frequency !== undefined && { meetingFrequency: meeting_frequency }), ...(format !== undefined && { format }), ...(capacity !== undefined && { capacity }), ...(requirements !== undefined && { requirements }), ...(applicationProcess !== undefined && { applicationProcess }) },
    });
    return NextResponse.json({ item: program });
  } catch (err) { console.error('[cms/mentorship PATCH]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    await prisma.mentorshipProgram.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) { console.error('[cms/mentorship DELETE]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}