// import { NextRequest, NextResponse } from 'next/server';
// import { signIn } from 'next-auth/react';

// export async function GET(req: NextRequest) {
//   try {
//     const origin = req.nextUrl.origin;
    
//     // Build the callback URL for after Google auth
//     const callbackUrl = `${origin}/auth/google/callback`;
    
//     // Build the NextAuth sign-in URL manually with proper callback
//     const params = new URLSearchParams({
//       callbackUrl,
//       redirect: 'false',
//     });
    
//     // Redirect to NextAuth's signin endpoint which will redirect to Google
//     const signInUrl = `/api/auth/signin/google?${params.toString()}`;
    
//     // Actually, let's use a direct Google OAuth URL approach
//     const googleClientId = process.env.GOOGLE_CLIENT_ID;
//     const encodedCallback = encodeURIComponent(`${origin}/api/auth/callback/google`);
    
//     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
//       `client_id=${googleClientId}&` +
//       `response_type=code&` +
//       `redirect_uri=${encodedCallback}&` +
//       `scope=openid%20profile%20email&` +
//       `prompt=select_account`;
    
//     console.log('Redirecting to Google:', googleAuthUrl);
//     return NextResponse.redirect(googleAuthUrl);
//   } catch (error) {
//     console.error('Google sign-in error:', error);
//     const errorUrl = new URL('/auth/signin', req.url);
//     errorUrl.searchParams.set('error', 'Google sign in failed');
//     return NextResponse.redirect(errorUrl);
//   }
// }
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const baseUrl =
      process.env.NEXTAUTH_URL || 'http://localhost:3010';

    const signInUrl = `${baseUrl}/api/auth/signin/google?callbackUrl=${encodeURIComponent(
      baseUrl
    )}`;

    return NextResponse.redirect(signInUrl);
  } catch (error) {
    console.error('Google sign-in error:', error);

    const errorUrl = new URL('/auth/signin', req.url);
    errorUrl.searchParams.set('error', 'Google sign in failed');

    return NextResponse.redirect(errorUrl);
  }
}