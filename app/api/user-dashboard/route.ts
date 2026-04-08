import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check all form submissions for this user
    const [submission, conference, interview, volunteer, collaboration, membership, mentorship] = await Promise.all([
      prisma.submission.findFirst({ where: { contactEmail: user.email }, orderBy: { createdAt: 'desc' } }),
      prisma.conferenceSubmission.findFirst({ where: { presenterEmail: user.email }, orderBy: { submittedAt: 'desc' } }),
      prisma.interviewApplication.findFirst({ where: { email: user.email }, orderBy: { createdAt: 'desc' } }),
      prisma.volunteerApplication.findFirst({ where: { email: user.email }, orderBy: { createdAt: 'desc' } }),
      prisma.collaborationProposal.findFirst({ where: { contactEmail: user.email }, orderBy: { createdAt: 'desc' } }),
      prisma.membershipApplication.findFirst({ where: { email: user.email }, orderBy: { createdAt: 'desc' } }),
      prisma.mentorshipApplication.findFirst({ where: { email: user.email }, orderBy: { createdAt: 'desc' } }),
    ]);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      forms: {
        submission: submission ? { submitted: true, status: submission.status, date: submission.createdAt, title: submission.title } : null,
        conference: conference ? { submitted: true, status: conference.status, date: conference.submittedAt, title: conference.title, trackingCode: conference.trackingCode } : null,
        interview: interview ? { submitted: true, status: interview.status, date: interview.createdAt } : null,
        volunteer: volunteer ? { submitted: true, status: volunteer.status, date: volunteer.createdAt, role: volunteer.roleType } : null,
        collaboration: collaboration ? { submitted: true, status: collaboration.status, date: collaboration.createdAt, type: collaboration.collaborationType } : null,
        membership: membership ? { submitted: true, status: membership.status, date: membership.createdAt, type: membership.membershipType } : null,
        mentorship: mentorship ? { submitted: true, status: mentorship.status, date: mentorship.createdAt } : null,
        assessment: null,
      },
    });
  } catch (error) {
    console.error('[user-dashboard]', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
