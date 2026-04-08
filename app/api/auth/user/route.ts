import { NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = verifyUserToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
        avatarUrl: null,
        isVerified: true,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
