'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { signAdminToken, comparePassword } from '@/lib/auth';

const SAFE_REDIRECT_RE = /^\/admin(\/[a-zA-Z0-9\-_/]*)?$/;

export async function adminLogin(prevState: any, formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;
  const redirectPath = (formData.get('redirect') as string) || '/admin/membership';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isAdmin) {
    return { error: 'Invalid email or password.' };
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  const token = signAdminToken({ adminId: user.id, email: user.email, role: 'admin' });

  // Set cookie via Next.js cookies() API
  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600,
    path: '/',
  });

  const safeRedirect = SAFE_REDIRECT_RE.test(redirectPath) ? redirectPath : '/admin/membership';
  redirect(safeRedirect);
}
