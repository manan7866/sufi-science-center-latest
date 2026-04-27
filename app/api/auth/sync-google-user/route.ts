import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signUserToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, avatar, sub } = body;

    console.log('Sync Google user:', { email, name, sub });

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email,
          googleId: sub || 'google_' + Date.now(),
          avatarUrl: avatar || '',
          password: '',
          isVerified: true,
        },
      });
      console.log('Created user:', user.email);
    } else if (!user.googleId) {
      // Link existing user with Google
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: sub || 'google_' + Date.now(),
          avatarUrl: avatar || user.avatarUrl,
          isVerified: true,
        },
      });
      console.log('Updated user with Google:', user.email);
    }

    // Generate our own JWT token
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
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}