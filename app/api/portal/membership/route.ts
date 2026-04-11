import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';

const prisma = new PrismaClient();
const rateLimiter = createRateLimiter(RateLimits.FORM_SUBMISSION);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get('sessionToken');

    if (!sessionToken) {
      return NextResponse.json({ error: 'sessionToken required' }, { status: 400 });
    }

    const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
    if (!session) return NextResponse.json({ membership: null });

    const membership = await prisma.membershipEnrollment.findUnique({ where: { sessionToken } });
    return NextResponse.json({ membership });
  } catch (error) {
    console.error('[portal/membership GET]', error);
    return NextResponse.json({ error: 'Failed to fetch membership' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check rate limiting
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();

    // Handle membership enrollment (existing logic)
    if (body.sessionToken && body.tier && !body.full_name) {
      const { sessionToken, tier } = body;

      const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
      if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

      const membership = await prisma.membershipEnrollment.upsert({
        where: { sessionToken },
        update: { tier, status: 'active' },
        create: { sessionToken, tier, status: 'active' },
      });

      return NextResponse.json({ membership });
    }

    // Handle membership application (scholar/fellow)
    const {
      membership_type,
      full_name,
      display_name,
      email,
      location,
      affiliation,
      areas_of_study,
      bio,
      statement,
      linked_publications,
      academic_focus,
      research_interest,
      years_of_engagement,
      leadership_roles,
      publications_list,
      reference_contact,
      session_token,
    } = body;

    if (!membership_type || !full_name || !email || !location || !affiliation ||
        !bio || !statement || !areas_of_study || areas_of_study.length === 0) {
      return NextResponse.json(
        { error: 'Required fields missing. Please complete all sections.' },
        { status: 400 }
      );
    }

    const application = await prisma.membershipApplication.create({
      data: {
        userId: body.userId || null,
        membershipType: membership_type,
        fullName: full_name.trim(),
        displayName: display_name?.trim() || full_name.trim(),
        email: email.trim().toLowerCase(),
        location: location.trim(),
        affiliation: affiliation.trim(),
        areasOfStudy: areas_of_study,
        bio: bio.trim(),
        statement: statement.trim(),
        linkedPublications: Array.isArray(linked_publications) ? linked_publications : [],
        academicFocus: academic_focus || null,
        researchInterest: research_interest || null,
        yearsOfEngagement: years_of_engagement || null,
        leadershipRoles: leadership_roles || null,
        publicationsList: publications_list || null,
        referenceContact: reference_contact || null,
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      id: application.id,
      message: 'Membership application submitted successfully.',
    });
  } catch (error) {
    console.error('[portal/membership POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
