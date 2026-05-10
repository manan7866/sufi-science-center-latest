import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sanitizeInput } from '@/lib/sanitization';

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      contributorName, email, practiceName, category, description,
      instructions, benefits, prerequisites, difficultyLevel,
      durationMinutes, traditionSource,
    } = body;

    if (!contributorName || !email || !practiceName || !category || !description || !instructions) {
      return NextResponse.json(
        { error: 'Missing required fields: contributorName, email, practiceName, category, description, instructions' },
        { status: 400 }
      );
    }

    const slug = generateSlug(practiceName);
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.practice.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const benefitsArray = benefits
      ? benefits.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
    const prerequisitesArray = prerequisites
      ? prerequisites.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const practice = await prisma.practice.create({
      data: {
        title: sanitizeInput(practiceName.trim()),
        slug: uniqueSlug,
        category,
        description: sanitizeInput(description.trim()),
        instructions: sanitizeInput(instructions.trim()),
        benefits: benefitsArray,
        prerequisites: prerequisitesArray,
        difficultyLevel: difficultyLevel || 'beginner',
        durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) || 15 : 15,
        traditionSource: traditionSource ? sanitizeInput(traditionSource.trim()) : null,
        status: 'draft',
        submitterName: sanitizeInput(contributorName.trim()),
        submitterEmail: email.trim().toLowerCase(),
      },
    });

    await prisma.submission.create({
      data: {
        submissionType: 'practice_submission',
        title: sanitizeInput(practiceName.trim()),
        abstract: description ? sanitizeInput(description.trim()) : 'No description provided',
        content: instructions ? sanitizeInput(instructions.trim()) : 'N/A',
        submissionData: {
          contributorName: sanitizeInput(contributorName.trim()),
          email: email.trim().toLowerCase(),
          practiceName: sanitizeInput(practiceName.trim()),
          category,
          description: sanitizeInput(description.trim()),
          instructions: sanitizeInput(instructions.trim()),
          benefits,
          prerequisites,
          difficultyLevel: difficultyLevel || 'beginner',
          durationMinutes: durationMinutes || '15',
          traditionSource: traditionSource || '',
          slug: uniqueSlug,
        },
        contactName: sanitizeInput(contributorName.trim()),
        contactEmail: email.trim().toLowerCase(),
        status: 'submitted',
      },
    });

    return NextResponse.json({ success: true, practice });
  } catch (error) {
    console.error('[practice-submissions POST]', error);
    return NextResponse.json({ error: 'Failed to create practice submission' }, { status: 500 });
  }
}
