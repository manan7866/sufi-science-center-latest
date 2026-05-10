import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userName, email, title, category, components, ethicalFoundations, outcomes, description } = body;

    if (!userName || !email || !title || !category || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (title.length < 3 || title.length > 200) {
      return NextResponse.json({ error: 'Title must be between 3 and 200 characters' }, { status: 400 });
    }

    if (description.length < 300 || description.length > 403) {
      return NextResponse.json({ error: 'Description must be between 300 and 403 characters' }, { status: 400 });
    }

    const comps = components || [];
    const ethics = ethicalFoundations || [];
    const outs = outcomes || [];

    if (comps.length > 4) return NextResponse.json({ error: 'Maximum 4 components allowed' }, { status: 400 });
    if (ethics.length > 4) return NextResponse.json({ error: 'Maximum 4 ethical foundations allowed' }, { status: 400 });
    if (outs.length > 4) return NextResponse.json({ error: 'Maximum 4 outcomes allowed' }, { status: 400 });

    const submission = await prisma.wazifaSubmission.create({
      data: {
        userId: userId || null,
        userName,
        email: email.trim().toLowerCase(),
        title: title.trim(),
        category,
        components: comps,
        ethicalFoundations: ethics,
        outcomes: outs,
        description: description.trim(),
        status: 'draft',
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('[portal/wazifa POST]', error);
    return NextResponse.json({ error: 'Failed to create wazifa submission' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const submissions = await prisma.wazifaSubmission.findMany({
      where: { email: email.trim().toLowerCase() },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('[portal/wazifa GET]', error);
    return NextResponse.json({ submissions: [] });
  }
}
