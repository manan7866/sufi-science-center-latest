import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, formType } = body;

    if (!userId || !formType) {
      return NextResponse.json({ error: 'userId and formType required' }, { status: 400 });
    }

    let exists = false;

    switch (formType) {
      case 'submission':
        exists = !!(await prisma.submission.findFirst({ where: { contactEmail: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'conference':
        exists = !!(await prisma.conferenceSubmission.findFirst({ where: { presenterEmail: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'interview':
        exists = !!(await prisma.interviewApplication.findFirst({ where: { name: (await prisma.user.findUnique({ where: { id: userId } }))?.name } }));
        break;
      case 'volunteer':
        exists = !!(await prisma.volunteerApplication.findFirst({ where: { email: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'collaboration':
        exists = !!(await prisma.collaborationProposal.findFirst({ where: { contactEmail: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'membership':
        exists = !!(await prisma.membershipApplication.findFirst({ where: { email: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'mentorship':
        exists = !!(await prisma.mentorshipApplication.findFirst({ where: { email: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'pathway':
        exists = !!(await prisma.pathwayApplication.findFirst({ where: { email: (await prisma.user.findUnique({ where: { id: userId } }))?.email } }));
        break;
      case 'assessment':
        // Assessment results are anonymous, no way to check by user
        exists = false;
        break;
      default:
        return NextResponse.json({ error: 'Unknown form type' }, { status: 400 });
    }

    return NextResponse.json({ exists });
  } catch (error) {
    console.error('[form-status]', error);
    return NextResponse.json({ error: 'Failed to check form status' }, { status: 500 });
  }
}
