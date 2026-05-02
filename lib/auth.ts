import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'ssc-admin-jwt-secret-2026-change-in-production';

export interface AdminTokenPayload {
  adminId: string;
  email: string;
  role: string;
  permissions?: string[];
}

export interface UserTokenPayload {
  userId: string;
  email: string;
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export function signAdminToken(params: { email: string; adminId: string; role?: string; permissions?: string[] }): string {
  const { email, adminId, role = 'admin', permissions = [] } = params;
  return jwt.sign({ adminId, email, role, permissions }, JWT_SECRET, { expiresIn: '7d' });
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function getAdminTokenFromRequest(req: NextRequest): AdminTokenPayload | null {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export function getUserFromRequest(req: NextRequest): UserTokenPayload | null {
  const token = req.cookies.get('ssc_user_token')?.value;
  if (!token) return null;
  return verifyUserToken(token);
}

export function getCookieHeader(req: NextRequest): string | null {
  return req.headers.get('cookie');
}

export function verifyUserToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET) as UserTokenPayload;
  } catch {
    return null;
  }
}

export function signUserToken(params: { userId: string; email: string }): string {
  const { userId, email } = params;
  return jwt.sign({ userId, email }, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: '30d' });
}

const OTP_EXPIRY_MINUTES = 10;

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPExpiry(): Date {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
}

export function isOTPExpired(expiry: Date | null): boolean {
  if (!expiry) return true
  return new Date() > expiry
}

export function hasApplicationPermission(
  payload: AdminTokenPayload,
  requiredPage: string
): boolean {
  if (payload.role === 'admin') return true
  if (payload.role === 'application_handler') {
    return payload.permissions?.includes(requiredPage) || false
  }
  return false
}

export function hasFinancePermission(payload: AdminTokenPayload): boolean {
  return payload.role === 'admin' || payload.role === 'finance_handler'
}

export function hasCmsPermission(payload: AdminTokenPayload): boolean {
  return payload.role === 'admin' || payload.role === 'cms_handler'
}