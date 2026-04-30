import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const [
      membershipTotal, membershipPending, membershipApproved, membershipDeclined,
      volunteerTotal, volunteerPending, volunteerApproved, volunteerDeclined,
      pathwayTotal, pathwayPending, pathwayApproved, pathwayDeclined,
      mentorshipTotal, mentorshipPending, mentorshipApproved, mentorshipDeclined,
      collaborationTotal, collaborationPending, collaborationApproved, collaborationDeclined,
      conferenceTotal, conferencePending, conferenceApproved, conferenceDeclined,
      completedDonations,
      userCount,
      recentMembership,
      recentVolunteer,
      recentPathway,
      recentMentorship,
    ] = await Promise.all([
      prisma.membershipApplication.count(),
      prisma.membershipApplication.count({ where: { status: 'pending' } }),
      prisma.membershipApplication.count({ where: { status: { in: ['approved', 'accepted'] } } }),
      prisma.membershipApplication.count({ where: { status: { in: ['declined', 'rejected'] } } }),
      prisma.volunteerApplication.count(),
      prisma.volunteerApplication.count({ where: { status: 'pending' } }),
      prisma.volunteerApplication.count({ where: { status: { in: ['approved', 'accepted'] } } }),
      prisma.volunteerApplication.count({ where: { status: { in: ['declined', 'rejected'] } } }),
      prisma.pathwayApplication.count(),
      prisma.pathwayApplication.count({ where: { status: 'pending' } }),
      prisma.pathwayApplication.count({ where: { status: { in: ['approved', 'accepted'] } } }),
      prisma.pathwayApplication.count({ where: { status: { in: ['declined', 'rejected'] } } }),
      prisma.mentorshipApplication.count(),
      prisma.mentorshipApplication.count({ where: { status: 'pending' } }),
      prisma.mentorshipApplication.count({ where: { status: { in: ['approved', 'accepted'] } } }),
      prisma.mentorshipApplication.count({ where: { status: { in: ['declined', 'rejected'] } } }),
      prisma.collaborationProposal.count(),
      prisma.collaborationProposal.count({ where: { status: 'pending' } }),
      prisma.collaborationProposal.count({ where: { status: { in: ['approved', 'accepted'] } } }),
      prisma.collaborationProposal.count({ where: { status: { in: ['declined', 'rejected'] } } }),
      prisma.conferenceSubmission.count(),
      prisma.conferenceSubmission.count({ where: { status: 'pending' } }),
      prisma.conferenceSubmission.count({ where: { status: { in: ['approved', 'accepted'] } } }),
      prisma.conferenceSubmission.count({ where: { status: { in: ['declined', 'rejected'] } } }),
      prisma.donation.findMany({ where: { status: { in: ['completed', 'paid'] } }, select: { amount: true } }),
      prisma.portalProfile.count(),
      prisma.membershipApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 4, select: { fullName: true, status: true, createdAt: true } }),
      prisma.volunteerApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 4, select: { fullName: true, status: true, createdAt: true } }),
      prisma.pathwayApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 4, select: { fullName: true, status: true, createdAt: true } }),
      prisma.mentorshipApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 4, select: { fullName: true, status: true, createdAt: true } }),
    ]);

    const modules = [
      { label: 'Membership',    href: '/admin/membership',    color: '#C8A75E', value: membershipTotal,    pending: membershipPending,    approved: membershipApproved,    declined: membershipDeclined },
      { label: 'Volunteer',     href: '/admin/volunteer',     color: '#6B9BD1', value: volunteerTotal,     pending: volunteerPending,     approved: volunteerApproved,     declined: volunteerDeclined },
      { label: 'Pathway',       href: '/admin/pathway',       color: '#7BC47F', value: pathwayTotal,       pending: pathwayPending,       approved: pathwayApproved,       declined: pathwayDeclined },
      { label: 'Mentorship',    href: '/admin/mentorship',    color: '#E8856A', value: mentorshipTotal,    pending: mentorshipPending,    approved: mentorshipApproved,    declined: mentorshipDeclined },
      { label: 'Collaboration', href: '/admin/collaboration', color: '#5CB8B2', value: collaborationTotal, pending: collaborationPending, approved: collaborationApproved, declined: collaborationDeclined },
      { label: 'Conference',    href: '/admin/conference',    color: '#B06AB3', value: conferenceTotal,    pending: conferencePending,    approved: conferenceApproved,    declined: conferenceDeclined },
    ];

    const totalDonations = completedDonations.reduce((s: number, d: { amount: unknown }) => s + Number(d.amount), 0);

    type AppEntry = { fullName: string; status: string; createdAt: Date };
    const mapActivity = (arr: AppEntry[], type: string, color: string) =>
      arr.map((r) => ({ type, name: r.fullName, status: r.status, time: r.createdAt.toISOString(), typeColor: color }));

    const recentActivity = [
      ...mapActivity(recentMembership, 'Membership', '#C8A75E'),
      ...mapActivity(recentVolunteer, 'Volunteer', '#6B9BD1'),
      ...mapActivity(recentPathway, 'Pathway', '#7BC47F'),
      ...mapActivity(recentMentorship, 'Mentorship', '#E8856A'),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 12);

    return NextResponse.json({
      modules,
      totalDonations,
      donationCount: completedDonations.length,
      totalUsers: userCount,
      recentActivity,
      userRole: admin.role,
      userPermissions: admin.permissions || [],
    });
  } catch (err) {
    console.error('[admin/dashboard]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}
