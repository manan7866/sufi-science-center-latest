import { NextRequest, NextResponse } from 'next/server';

function getAppUrl(req: NextRequest): string {
  // Use public URL from env, fallback to request origin
  return process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
}

export async function GET(req: NextRequest) {
  try {
    const appUrl = getAppUrl(req);
    
    // Build the callback URL for after Google auth (client-side page)
    const callbackUrl = `${appUrl}/auth/google/callback`;
    
    // Use direct Google OAuth URL approach
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const encodedCallback = encodeURIComponent(`${appUrl}/api/auth/callback/google`);
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${googleClientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodedCallback}&` +
      `scope=openid%20profile%20email&` +
      `prompt=select_account`;
    
    console.log('Redirecting to Google with callback:', encodedCallback);
    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error('Google sign-in error:', error);
    const errorUrl = new URL('/auth/signin', req.url);
    errorUrl.searchParams.set('error', 'Google sign in failed');
    return NextResponse.redirect(errorUrl);
  }
}
