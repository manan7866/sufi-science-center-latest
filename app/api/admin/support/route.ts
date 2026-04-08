import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

function checkAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const status = req.nextUrl.searchParams.get('status');
  const ticketId = req.nextUrl.searchParams.get('ticketId');

  if (ticketId) {
    const replies = await prisma.supportTicketReply.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json({ replies });
  }

  const where = status && status !== 'all' ? { status } : {};
  const tickets = await prisma.supportTicket.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ tickets });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { ticketId, body } = await req.json();
    if (!ticketId || !body?.trim()) return NextResponse.json({ error: 'ticketId and body required' }, { status: 400 });

    const reply = await prisma.supportTicketReply.create({
      data: { ticketId, authorType: 'admin', body: body.trim() },
    });

    await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
    return NextResponse.json({ ticket });
  } catch {
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}
