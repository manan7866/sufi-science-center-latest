/**
 * Rate limiting utility for API endpoints
 * Uses in-memory store with IP-based tracking
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory rate limit store
const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup interval (5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;

// Schedule cleanup
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Rate limiter configuration
 */
export interface RateLimitConfig {
  /** Maximum number of requests allowed */
  max: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Custom error message */
  message?: string;
}

/**
 * Default rate limit configurations for different endpoint types
 */
export const RateLimits = {
  // Authentication endpoints - stricter limits
  AUTH_LOGIN: {
    max: 10,
    windowMs: 15 * 60 * 1000, // 10 attempts per 15 minutes
    message: 'Too many login attempts. Please try again later.',
  },
  AUTH_REGISTER: {
    max: 5,
    windowMs: 60 * 60 * 1000, // 5 registrations per hour
    message: 'Too many registration attempts. Please try again later.',
  },
  AUTH_VERIFY_OTP: {
    max: 10,
    windowMs: 15 * 60 * 1000, // 10 OTP verifications per 15 minutes
    message: 'Too many verification attempts. Please try again later.',
  },
  AUTH_RESEND_OTP: {
    max: 3,
    windowMs: 60 * 60 * 1000, // 3 OTP resends per hour
    message: 'Too many resend requests. Please wait before requesting another OTP.',
  },

  // Form submission endpoints
  FORM_SUBMISSION: {
    max: 5,
    windowMs: 60 * 60 * 1000, // 5 submissions per hour
    message: 'Too many form submissions. Please try again later.',
  },

  // Contact form
  CONTACT_FORM: {
    max: 3,
    windowMs: 60 * 60 * 1000, // 3 contact submissions per hour
    message: 'Too many messages. Please try again later.',
  },

  // General API endpoints
  API_GENERAL: {
    max: 100,
    windowMs: 15 * 60 * 1000, // 100 requests per 15 minutes
    message: 'Too many requests. Please try again later.',
  },

  // Status check endpoints
  STATUS_CHECK: {
    max: 20,
    windowMs: 15 * 60 * 1000, // 20 checks per 15 minutes
    message: 'Too many status checks. Please try again later.',
  },
} as const;

/**
 * Check if a request is rate limited
 * @param key - Unique identifier (usually IP address + endpoint)
 * @param config - Rate limit configuration
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // If no entry or window has expired, create new entry
  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.max - 1,
      resetTime: now + config.windowMs,
    };
  }

  // Increment count
  entry.count += 1;

  // Check if limit exceeded
  if (entry.count > config.max) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: config.max - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP from request headers
 * Handles various proxy configurations
 */
export function getClientIp(headers: Headers): string {
  // Check for Cloudflare IP
  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  // Check for X-Forwarded-For (may contain multiple IPs)
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // Take the first IP (client IP)
    return xForwardedFor.split(',')[0].trim();
  }

  // Check for X-Real-IP
  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) return xRealIp;

  // Fallback
  return 'unknown';
}

/**
 * Create a rate limit key from IP and endpoint
 */
export function createRateLimitKey(ip: string, endpoint: string): string {
  return `ratelimit:${ip}:${endpoint}`;
}

/**
 * Helper to create rate limit response headers
 */
export function getRateLimitHeaders(remaining: number, resetTime: number): Record<string, string> {
  return {
    'X-RateLimit-Limit': 'configured_limit',
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.floor(resetTime / 1000).toString(),
    'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
  };
}

/**
 * Middleware-style rate limiter for API routes
 * Returns a function that can be called at the start of API handlers
 */
export function createRateLimiter(config: RateLimitConfig) {
  return async (request: Request): Promise<{ 
    allowed: boolean; 
    response?: Response;
    headers?: Record<string, string>;
  }> => {
    const ip = getClientIp(request.headers);
    const url = new URL(request.url);
    const key = createRateLimitKey(ip, url.pathname);

    const result = checkRateLimit(key, config);
    const headers = getRateLimitHeaders(result.remaining, result.resetTime);

    if (!result.allowed) {
      return {
        allowed: false,
        response: new Response(
          JSON.stringify({
            error: config.message || 'Rate limit exceeded',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          }
        ),
        headers,
      };
    }

    return {
      allowed: true,
      headers,
    };
  };
}
