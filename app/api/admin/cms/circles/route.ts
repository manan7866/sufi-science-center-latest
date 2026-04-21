import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const search = req.nextUrl.searchParams.get('search') ?? '';
  const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') ?? '20');
  const where = search ? { title: { contains: search, mode: 'insensitive' as const } } : {};
  const [items, total] = await Promise.all([
    prisma.studyCircle.findMany({ where, orderBy: { title: 'asc' }, skip: page * pageSize, take: pageSize }),
    prisma.studyCircle.count({ where }),
  ]);
  return NextResponse.json({ items, total });
}

export async function POST(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, slug, description, focusText, focus_text, facilitator, meetingFrequency, meeting_frequency, durationWeeks, duration_weeks, capacity, meetingFormat, meeting_format, prerequisites, syllabus, startDate, start_date, endDate, end_date, status, upsert } = body;
    if (!title || !slug) return NextResponse.json({ error: 'title and slug required.' }, { status: 400 });
    const circle = upsert ? await prisma.studyCircle.upsert({
      where: { slug },
      create: { title, slug, description: description ?? '', focusText: focus_text ?? focusText ?? '', facilitator: facilitator ?? '', meetingFrequency: meeting_frequency ?? meetingFrequency ?? '', durationWeeks: duration_weeks ?? durationWeeks ?? 8, capacity: capacity ?? 10, meetingFormat: meeting_format ?? meetingFormat ?? 'online', prerequisites: prerequisites ?? [], syllabus: syllabus ?? {}, startDate: start_date ?? startDate ?? new Date(), endDate: end_date ?? endDate ?? null, status: status ?? 'upcoming' },
      update: { title, description: description ?? '', focusText: focus_text ?? focusText ?? '', facilitator: facilitator ?? '', meetingFrequency: meeting_frequency ?? meetingFrequency ?? '', durationWeeks: duration_weeks ?? durationWeeks ?? 8, capacity: capacity ?? 10, meetingFormat: meeting_format ?? meetingFormat ?? 'online', prerequisites: prerequisites ?? [], syllabus: syllabus ?? {}, startDate: start_date ?? startDate ?? new Date(), endDate: end_date ?? endDate ?? null, status: status ?? 'upcoming' },
    }) : await prisma.studyCircle.create({
      data: { title, slug, description: description ?? '', focusText: focus_text ?? focusText ?? '', facilitator: facilitator ?? '', meetingFrequency: meeting_frequency ?? meetingFrequency ?? '', durationWeeks: duration_weeks ?? durationWeeks ?? 8, capacity: capacity ?? 10, meetingFormat: meeting_format ?? meetingFormat ?? 'online', prerequisites: prerequisites ?? [], syllabus: syllabus ?? {}, startDate: start_date ?? startDate ?? new Date(), endDate: end_date ?? endDate ?? null, status: status ?? 'upcoming' },
    });
    return NextResponse.json({ item: circle });
  } catch (err) { console.error('[cms/circles POST]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function PATCH(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, title, slug, description, focusText, focus_text, facilitator, meetingFrequency, meeting_frequency, durationWeeks, duration_weeks, capacity, meetingFormat, meeting_format, prerequisites, syllabus, startDate, start_date, endDate, end_date, status } = body;
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    const circle = await prisma.studyCircle.update({
      where: { id },
      data: { ...(title !== undefined && { title }), ...(slug !== undefined && { slug }), ...(description !== undefined && { description }), ...(focusText !== undefined && { focusText }) || (focus_text !== undefined && { focusText: focus_text }), ...(facilitator !== undefined && { facilitator }), ...(meetingFrequency !== undefined && { meetingFrequency }) || (meeting_frequency !== undefined && { meetingFrequency: meeting_frequency }), ...(durationWeeks !== undefined && { durationWeeks }) || (duration_weeks !== undefined && { durationWeeks: duration_weeks }), ...(capacity !== undefined && { capacity }), ...(meetingFormat !== undefined && { meetingFormat }) || (meeting_format !== undefined && { meetingFormat: meeting_format }), ...(prerequisites !== undefined && { prerequisites }), ...(syllabus !== undefined && { syllabus }), ...(startDate !== undefined && { startDate }) || (start_date !== undefined && { startDate: new Date(start_date) }), ...(endDate !== undefined && { endDate }) || (end_date !== undefined && { endDate: end_date ? new Date(end_date) : null }), ...(status !== undefined && { status }) },
    });
    return NextResponse.json({ item: circle });
  } catch (err) { console.error('[cms/circles PATCH]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required.' }, { status: 400 });
    await prisma.studyCircle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) { console.error('[cms/circles DELETE]', err); return NextResponse.json({ error: 'Internal error.' }, { status: 500 }); }
}