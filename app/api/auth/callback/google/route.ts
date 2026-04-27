import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signUserToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    const error = req.nextUrl.searchParams.get('error');
    const origin = req.nextUrl.origin;

    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect('/auth/signin?error=google_denied');
    }

    if (!code) {
      return NextResponse.redirect('/auth/signin?error=no_code');
    }

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: `${origin}/api/auth/callback/google`,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    
    if (!tokenData.access_token) {
      console.error('Failed to get access token:', tokenData);
      return NextResponse.redirect('/auth/signin?error=token_error');
    }

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();
    console.log('Google user:', googleUser);

    if (!googleUser.email) {
      return NextResponse.redirect('/auth/signin?error=no_email');
    }

    // Create or update user in our database
    let user = await prisma.user.findUnique({ where: { email: googleUser.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: googleUser.name || googleUser.email.split('@')[0],
          email: googleUser.email,
          googleId: googleUser.id,
          avatarUrl: googleUser.picture || '',
          password: '',
          isVerified: true,
        },
      });
      console.log('Created user from Google:', user.email);
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: googleUser.id,
          avatarUrl: googleUser.picture || user.avatarUrl,
          isVerified: true,
        },
      });
      console.log('Updated user with Google ID:', user.email);
    }

    // Generate our own JWT token
    const token = signUserToken({ userId: user.id, email: user.email });

    // Redirect to callback page with token and user data
    const callbackUrl = new URL('/auth/google/callback', origin);
    callbackUrl.searchParams.set('token', token);
    callbackUrl.searchParams.set('user', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isVerified: true,
    }));

    console.log('Redirecting to callback page');
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.redirect('/auth/signin?error=callback_error');
  }
}