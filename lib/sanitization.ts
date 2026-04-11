/**
 * Input sanitization utilities to prevent XSS and script injection attacks
 */

/**
 * Sanitizes a string input by removing potentially dangerous content
 * Removes script tags, event handlers, javascript: URLs, and other XSS vectors
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<script[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/script>/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript\s*:/gi, '');

  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data\s*:/gi, '');

  // Remove vbscript: protocol
  sanitized = sanitized.replace(/vbscript\s*:/gi, '');

  // Remove event handlers (onclick, onload, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"]*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove style tags and their content
  sanitized = sanitized.replace(/<style[\s\S]*?<\/style>/gi, '');
  sanitized = sanitized.replace(/<style[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/style>/gi, '');

  // Remove object, embed, applet, iframe, form, input tags
  sanitized = sanitized.replace(/<(object|embed|applet|iframe|frame|form|input|meta|link)[\s\S]*?<\/\1>/gi, '');
  sanitized = sanitized.replace(/<(object|embed|applet|iframe|frame|form|input|meta|link)[^>]*>/gi, '');

  // Remove HTML comments
  sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '');

  // Remove potentially dangerous SVG
  sanitized = sanitized.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  sanitized = sanitized.replace(/<svg[^>]*>/gi, '');
  sanitized = sanitized.replace(/<\/svg>/gi, '');

  // Remove base tags
  sanitized = sanitized.replace(/<base[^>]*>/gi, '');

  return sanitized;
}

/**
 * Sanitizes an object by sanitizing all string properties
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj } as any;
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]);
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }
  
  return sanitized;
}

/**
 * Validates and sanitizes email address
 * Returns null if email is invalid
 */
export function validateAndSanitizeEmail(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null;
  }

  // Trim whitespace
  const trimmed = email.trim().toLowerCase();

  // Strict email validation regex
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(trimmed)) {
    return null;
  }

  // Additional checks
  if (trimmed.length > 254) {
    return null;
  }

  // Check for consecutive dots
  if (trimmed.includes('..')) {
    return null;
  }

  return trimmed;
}

/**
 * Sanitizes HTML while preserving safe tags (optional)
 * For now, we strip all HTML for form inputs
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Validates that input doesn't contain SQL injection patterns
 * This is a basic check - parameterized queries should be the primary defense
 */
export function checkSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(\b(UNION|JOIN|WHERE|HAVING|GROUP BY|ORDER BY)\b)/i,
    /(;|--|\/\*|\*\/)/,
    /(\b(OR|AND)\b\s+\w+\s*=\s*\w+)/i,
  ];

  return !sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Validates input length
 */
export function validateLength(input: string, min: number, max: number): boolean {
  return input.length >= min && input.length <= max;
}

/**
 * Comprehensive input validation and sanitization
 */
export function validateAndSanitizeString(
  input: string,
  options: {
    minLength?: number;
    maxLength?: number;
    allowHtml?: boolean;
    isEmail?: boolean;
  } = {}
): string | null {
  const {
    minLength = 1,
    maxLength = 10000,
    allowHtml = false,
    isEmail = false,
  } = options;

  if (!input || typeof input !== 'string') {
    return null;
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Check length
  if (!validateLength(sanitized, minLength, maxLength)) {
    return null;
  }

  // Check for SQL injection
  if (!checkSqlInjection(sanitized)) {
    return null;
  }

  // Email validation
  if (isEmail) {
    return validateAndSanitizeEmail(sanitized);
  }

  // Strip HTML if not allowed
  if (!allowHtml) {
    sanitized = stripHtml(sanitized);
  }

  // Sanitize remaining content
  sanitized = sanitizeInput(sanitized);

  return sanitized;
}
