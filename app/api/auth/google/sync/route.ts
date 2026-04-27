import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signUserToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Get session directly from NextAuth session endpoint
    const sessionRes = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/session?json=1`, {
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    });
    const sessionData = await sessionRes.json();
    
    console.log('Direct session:', sessionData);
    
    if (!sessionData?.user?.email) {
      return NextResponse.json({ success: false, error: 'No Google session' });
    }

    const email = sessionData.user.email as string;
    const name = sessionData.user.name as string;
    const image = sessionData.user.image as string;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email,
          googleId: 'google_' + Date.now(),
          avatarUrl: image,
          password: '',
          isVerified: true,
        },
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          avatarUrl: image || user.avatarUrl,
          isVerified: true,
        },
      });
    }

    const token = signUserToken({ userId: user.id, email: user.email });
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}