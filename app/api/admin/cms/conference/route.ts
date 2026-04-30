import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest, hasCmsPermission } from '@/lib/auth';

function auth(req: NextRequest) {
  const admin = getAdminTokenFromRequest(req);
  if (!admin || !hasCmsPermission(admin)) return null;
  return admin;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const conferenceEvents = await prisma.conferenceEvent.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ items: conferenceEvents, total: conferenceEvents.length });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      title,
      slug,
      subtitle,
      theme,
      description,
      start_date,
      end_date,
      location,
      location_detail,
      submission_deadline,
      registration_deadline,
      is_active,
      is_open_for_submissions,
      is_open_for_registration,
      max_submissions,
      submission_types,
      contact_email,
      website_url,
      cover_image_url,
      status,
    } = body;

    if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 });

    const event = await prisma.conferenceEvent.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        subtitle: subtitle || null,
        theme: theme || null,
        description: description || null,
        startDate: start_date ? new Date(start_date) : null,
        endDate: end_date ? new Date(end_date) : null,
        location: location || null,
        locationDetail: location_detail || null,
        submissionDeadline: submission_deadline ? new Date(submission_deadline) : null,
        registrationDeadline: registration_deadline ? new Date(registration_deadline) : null,
        isActive: is_active ?? false,
        isOpenForSubmissions: is_open_for_submissions ?? false,
        isOpenForRegistration: is_open_for_registration ?? false,
        maxSubmissions: max_submissions ? Number(max_submissions) : null,
        submissionTypes: submission_types || ['paper', 'workshop', 'panel', 'poster'],
        contactEmail: contact_email || null,
        websiteUrl: website_url || null,
        coverImageUrl: cover_image_url || null,
        status: status || 'draft',
      },
    });

    return NextResponse.json({ item: event });
  } catch (err) {
    console.error('[cms/conference POST]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      id,
      title,
      slug,
      subtitle,
      theme,
      description,
      start_date,
      end_date,
      location,
      location_detail,
      submission_deadline,
      registration_deadline,
      is_active,
      is_open_for_submissions,
      is_open_for_registration,
      max_submissions,
      submission_types,
      contact_email,
      website_url,
      cover_image_url,
      status,
    } = body;

    if (!id) return NextResponse.json({ error: 'ID is required.' }, { status: 400 });

    const updateData: Record<string, unknown> = {};

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (theme !== undefined) updateData.theme = theme;
    if (description !== undefined) updateData.description = description;
    if (start_date !== undefined) updateData.startDate = start_date ? new Date(start_date) : null;
    if (end_date !== undefined) updateData.endDate = end_date ? new Date(end_date) : null;
    if (location !== undefined) updateData.location = location;
    if (location_detail !== undefined) updateData.locationDetail = location_detail;
    if (submission_deadline !== undefined) updateData.submissionDeadline = submission_deadline ? new Date(submission_deadline) : null;
    if (registration_deadline !== undefined) updateData.registrationDeadline = registration_deadline ? new Date(registration_deadline) : null;
    if (is_active !== undefined) updateData.isActive = is_active;
    if (is_open_for_submissions !== undefined) updateData.isOpenForSubmissions = is_open_for_submissions;
    if (is_open_for_registration !== undefined) updateData.isOpenForRegistration = is_open_for_registration;
    if (max_submissions !== undefined) updateData.maxSubmissions = max_submissions ? Number(max_submissions) : null;
    if (submission_types !== undefined) updateData.submissionTypes = submission_types;
    if (contact_email !== undefined) updateData.contactEmail = contact_email;
    if (website_url !== undefined) updateData.websiteUrl = website_url;
    if (cover_image_url !== undefined) updateData.coverImageUrl = cover_image_url;
    if (status !== undefined) updateData.status = status;

    const item = await prisma.conferenceEvent.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ item });
  } catch (err) {
    console.error('[cms/conference PATCH]', err);
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
  }
}