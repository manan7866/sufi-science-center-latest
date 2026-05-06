import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createRateLimiter, RateLimits } from '@/lib/rate-limit';
import { submissionTypeSchemas } from '@/lib/validations';
import { sanitizeInput, sanitizeObject, validateAndSanitizeString, validateAndSanitizeEmail, checkSqlInjection } from '@/lib/sanitization';

const rateLimiter = createRateLimiter(RateLimits.FORM_SUBMISSION);

const VALID_SUBMISSION_TYPES = [
  'research_paper', 'dialogue_proposal', 'interview_proposal',
  'sacred_media', 'practice_submission', 'sacred_text',
  'article_essay', 'conference_workshop',
];

function sanitizeSubmissionData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (typeof value === 'string') {
      if (key === 'email') {
        const emailResult = validateAndSanitizeEmail(value);
        sanitized[key] = emailResult || '';
      } else if (key.includes('url') || key.includes('link') || key === 'orcidLink' || key === 'linksToWork' || key === 'fileUrl') {
        const trimmed = value.trim();
        if (trimmed && !checkSqlInjection(trimmed)) {
          sanitized[key] = '';
        } else {
          sanitized[key] = sanitizeInput(trimmed);
        }
      } else {
        const result = validateAndSanitizeString(value.trim(), { maxLength: 15000 });
        sanitized[key] = result !== null ? result : '';
      }
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export async function POST(request: Request) {
  try {
    const rateLimitResult = await rateLimiter(request);
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const body = await request.json();
    const {
      submission_type,
      title,
      abstract: abstractText,
      content,
      contact_name,
      contact_email,
      contact_affiliation,
      submission_data,
      userId,
    } = body;

    if (!submission_type || !VALID_SUBMISSION_TYPES.includes(submission_type)) {
      return NextResponse.json(
        { error: 'Invalid or missing submission type.' },
        { status: 400 }
      );
    }

    const schema = submissionTypeSchemas[submission_type];
    if (!schema) {
      return NextResponse.json(
        { error: 'No validation schema available for this submission type.' },
        { status: 500 }
      );
    }

    if (!submission_data || typeof submission_data !== 'object') {
      return NextResponse.json(
        { error: 'Submission data is required.' },
        { status: 400 }
      );
    }

    const validationResult = schema.safeParse(submission_data);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      return NextResponse.json(
        { error: 'Validation failed', details: errorMessages },
        { status: 400 }
      );
    }

    const sanitizedData = sanitizeSubmissionData(submission_data);

    if (!title || typeof title !== 'string' || title.trim().length < 2) {
      return NextResponse.json(
        { error: 'A valid title is required.' },
        { status: 400 }
      );
    }

    if (!contact_email || typeof contact_email !== 'string') {
      return NextResponse.json(
        { error: 'A valid contact email is required.' },
        { status: 400 }
      );
    }

    const sanitizedEmail = validateAndSanitizeEmail(contact_email);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        userId: userId || null,
        submissionType: submission_type,
        title: sanitizeInput(title.trim()),
        abstract: abstractText ? sanitizeInput(abstractText.trim()) : 'No abstract provided',
        content: content ? sanitizeInput(content.trim()) : 'N/A',
        submissionData: sanitizedData,
        contactName: contact_name ? sanitizeInput(contact_name.trim()) : '',
        contactEmail: sanitizedEmail,
        contactAffiliation: contact_affiliation ? sanitizeInput(contact_affiliation.trim()) : null,
        status: 'submitted',
      },
    });

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: 'Submission received successfully.',
    });
  } catch (error) {
    console.error('[submissions POST]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
