import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where: any = {};
    if (status && status !== 'all') where.status = status;
    const circles = await prisma.studyCircle.findMany({ where, orderBy: [{ status: 'asc' }, { startDate: 'asc' }] });
    const mapped = circles.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      focus_text: c.focusText,
      facilitator: c.facilitator,
      meeting_frequency: c.meetingFrequency,
      duration_weeks: c.durationWeeks,
      capacity: c.capacity,
      current_enrollment: c.currentEnrollment,
      status: c.status,
      start_date: c.startDate?.toISOString().split('T')[0],
      end_date: c.endDate?.toISOString().split('T')[0],
      meeting_format: c.meetingFormat,
      prerequisites: c.prerequisites,
      syllabus: c.syllabus,
    }));
    return NextResponse.json({ circles: mapped });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch circles' }, { status: 500 });
  }
}
