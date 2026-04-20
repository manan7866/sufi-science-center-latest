import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest } from '@/lib/auth';

function auth(req: NextRequest) {
  return getAdminTokenFromRequest(req);
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, action } = await req.json();
  // action: "approve" | "reject"

  if (!id || !action) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let data: any = {};

  if (action === "approve") {
    data = {
      isApproved: true,
      isRejected: false,
      approvedAt: new Date(),
    };
  }

  if (action === "reject") {
    data = {
      isApproved: false,
      isRejected: true,
    };
  }

  const updated = await prisma.reflectionEntry.update({
    where: { id },
    data,
  });

  return NextResponse.json({ success: true, updated });
}