import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  try {
    const programs = await prisma.mentorshipProgram.findMany({ orderBy: [{ status: 'asc' }, { title: 'asc' }] });
    const mapped = programs.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      mentor_name: p.mentorName,
      mentor_bio: p.mentorBio,
      mentor_lineage: p.mentorLineage,
      focus_areas: p.focusAreas,
      program_duration_months: p.programDurationMonths,
      meeting_frequency: p.meetingFrequency,
      format: p.format,
      capacity: p.capacity,
      current_participants: p.currentParticipants,
      status: p.status,
      requirements: p.requirements,
      application_process: p.applicationProcess,
    }));
    return NextResponse.json({ programs: mapped });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}
