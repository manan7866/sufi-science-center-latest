import { NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/auth';
import { auth } from '@/lib/nextauth-config';
import prisma from '@/lib/prisma';
import { signUserToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Check custom token first
    if (token) {
      const payload = verifyUserToken(token);
      if (payload) {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            isVerified: true,
          },
        });

        if (user) {
          return NextResponse.json({ user, token });
        }
      }
    }

    // Check NextAuth session via cookie
    const session = await auth();
    console.log('Auth user API - session:', session?.user);
    
    if (session?.user?.email) {
      const email = session.user.email as string;
      let user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          isVerified: true,
        },
      });

      if (user) {
        const sessionToken = signUserToken({ userId: user.id, email: user.email });
        return NextResponse.json({ user, token: sessionToken });
      }
    }

    return NextResponse.json({ user: null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
