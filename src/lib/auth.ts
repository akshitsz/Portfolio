import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Extract token from request headers
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check for token in cookies
  const tokenFromCookie = request.cookies.get('auth-token')?.value;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }
  
  return null;
}

// Middleware to protect routes
export function requireAuth(request: NextRequest): JWTPayload {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  return verifyToken(token);
}
