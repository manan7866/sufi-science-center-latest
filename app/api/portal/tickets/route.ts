import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function generateTicketNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `TKT-${year}-${rand}`;
}

export async function GET(req: NextRequest) {
  const sessionToken = req.nextUrl.searchParams.get('sessionToken');
  const ticketId = req.nextUrl.searchParams.get('id');

  if (!sessionToken) return NextResponse.json({ error: 'sessionToken required' }, { status: 400 });

  const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

  if (ticketId) {
    const ticket = await prisma.supportTicket.findFirst({
      where: { sessionToken, id: ticketId },
      include: { replies: { orderBy: { createdAt: 'asc' } } },
    });
    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    return NextResponse.json({ ticket });
  }

  const tickets = await prisma.supportTicket.findMany({
    where: { sessionToken },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ tickets });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionToken, subject, description, category, priority } = await req.json();

    if (!sessionToken || !subject || !description) {
      return NextResponse.json({ error: 'sessionToken, subject, and description required' }, { status: 400 });
    }

    const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const ticket = await prisma.supportTicket.create({
      data: {
        sessionToken,
        ticketNumber: generateTicketNumber(),
        subject: subject.trim(),
        description: description.trim(),
        category: category || 'general',
        priority: priority || 'medium',
        status: 'open',
      },
    });

    return NextResponse.json({ ticket });
  } catch {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { sessionToken, ticketId, body } = await req.json();

    if (!sessionToken || !ticketId || !body) {
      return NextResponse.json({ error: 'sessionToken, ticketId, and body required' }, { status: 400 });
    }

    const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const ticket = await prisma.supportTicket.findFirst({ where: { sessionToken, id: ticketId } });
    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

    const reply = await prisma.supportTicketReply.create({
      data: { ticketId, authorType: 'user', body: body.trim() },
    });

    await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Failed to add reply' }, { status: 500 });
  }
}
