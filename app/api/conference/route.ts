import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const conference = await prisma.conferenceEvent.findFirst({
      where: {
        status: 'published',
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!conference) {
      return NextResponse.json({ conference: null });
    }

    const mapped = {
      id: conference.id,
      title: conference.title,
      subtitle: conference.subtitle,
      theme: conference.theme,
      description: conference.description,
      start_date: conference.startDate?.toISOString(),
      end_date: conference.endDate?.toISOString(),
      location: conference.location,
      location_detail: conference.locationDetail,
      submission_deadline: conference.submissionDeadline?.toISOString(),
      registration_deadline: conference.registrationDeadline?.toISOString(),
      is_active: conference.isActive,
      is_open_for_submissions: conference.isOpenForSubmissions,
      is_open_for_registration: conference.isOpenForRegistration,
      max_submissions: conference.maxSubmissions,
      submission_types: conference.submissionTypes,
      contact_email: conference.contactEmail,
      website_url: conference.websiteUrl,
      cover_image_url: conference.coverImageUrl,
      status: conference.status,
    };

    return NextResponse.json({ conference: mapped });
  } catch (error) {
    console.error('[conference GET]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}