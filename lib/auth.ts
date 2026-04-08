import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'ssc-jwt-secret-2026-change-this';
const JWT_EXPIRES_IN = '7d';

export interface AdminTokenPayload {
  adminId: string;
  email: string;
  role: string;
}

export interface UserTokenPayload {
  userId: string;
  email: string;
  name: string;
}

// ============================================================================
// ADMIN AUTH
// ============================================================================

export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

// ============================================================================
// USER AUTH
// ============================================================================

export function signUserToken(payload: UserTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyUserToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserTokenPayload;
  } catch {
    return null;
  }
}

// ============================================================================
// PASSWORD UTILITIES
// ============================================================================

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================================================
// OTP UTILITIES
// ============================================================================

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
}

export function isOTPExpired(expiry: Date): boolean {
  return new Date() > expiry;
}

// ============================================================================
// REQUEST HELPERS
// ============================================================================

export function getAdminTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get('admin_token')?.value ?? null;
}

export function getUserTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get('user_token')?.value ?? null;
}

