/**
 * Zod validation schemas for all forms
 * Provides strict type checking and sanitization
 */

import { z } from 'zod';

// Helper to strip HTML and script tags
const stripHtmlAndScripts = (val: string) => {
  // Remove script tags and content
  let cleaned = val.replace(/<script[\s\S]*?<\/script>/gi, '');
  cleaned = cleaned.replace(/<script[^>]*>/gi, '');
  // Remove all HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript\s*:/gi, '');
  return cleaned.trim();
};

// Common validation patterns
const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

/**
 * Auth/Login form validation
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(1, 'Password is required'),
});

/**
 * Auth/Register form validation
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long')
    .refine(
      (val) => /[a-z]/.test(val) && /[A-Z]/.test(val) && /\d/.test(val),
      'Password must contain uppercase, lowercase, and number'
    ),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: 'Passwords do not match',
//   path: ['confirmPassword'],
});

/**
 * OTP Verification form validation
 */
export const otpVerifySchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

/**
 * Resend OTP form validation
 */
export const resendOtpSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
});

/**
 * Contact form validation
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  enquiryType: z
    .string()
    .default('general'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 5, 'Subject must be at least 5 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message must be less than 5000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 10, 'Message must be at least 10 characters'),
});

/**
 * Pathway Application form validation (inner-development/guidance)
 */
export const pathwayApplicationSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .optional(),
  location: z
    .string()
    .optional(),
  motivation: z
    .string()
    .min(1, 'Motivation is required')
    .max(3000, 'Motivation must be less than 3000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 50, 'Motivation must be at least 50 characters'),
  spiritualExperience: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  currentPractices: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  availableTimeWeekly: z
    .string()
    .min(1, 'Weekly time commitment is required')
    .max(100, 'Time commitment must be less than 100 characters')
    .transform(stripHtmlAndScripts),
  preferredStartDate: z
    .string()
    .optional(),
  pathwayId: z
    .string()
    .min(1, 'Pathway is required'),
});

/**
 * Insight Interview Application form validation
 */
export const interviewApplicationSchema = z.object({
  // Step 1: Personal
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(200, 'Location must be less than 200 characters')
    .transform(stripHtmlAndScripts),
  
  // Step 2: Background
  background: z
    .string()
    .min(1, 'Background is required')
    .max(2000, 'Background must be less than 2000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 50, 'Background must be at least 50 characters'),
  fieldOfWork: z
    .string()
    .min(1, 'Field of work is required')
    .max(200, 'Field must be less than 200 characters')
    .transform(stripHtmlAndScripts),
  
  // Step 3: Reflection
  reflection: z
    .string()
    .min(1, 'Reflection is required')
    .max(3000, 'Reflection must be less than 3000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 100, 'Reflection must be at least 100 characters'),
  
  // Step 4: Links (optional)
  websiteUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || urlRegex.test(val),
      'Invalid URL format'
    ),
  socialMediaUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || urlRegex.test(val),
      'Invalid URL format'
    ),
});

/**
 * Collaboration Proposal form validation
 */
export const collaborationProposalSchema = z.object({
  // Step 1: Organization
  organizationName: z
    .string()
    .min(1, 'Organization name is required')
    .max(200, 'Name must be less than 200 characters')
    .transform(stripHtmlAndScripts),
  contactName: z
    .string()
    .min(1, 'Contact name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  organizationType: z
    .string()
    .min(1, 'Organization type is required'),
  
  // Step 2: Proposal
  collaborationType: z
    .string()
    .min(1, 'Collaboration type is required'),
  proposalTitle: z
    .string()
    .min(1, 'Proposal title is required')
    .max(200, 'Title must be less than 200 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 10, 'Title must be at least 10 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(5000, 'Description must be less than 5000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 100, 'Description must be at least 100 characters'),
  
  // Step 3: Details
  timeline: z
    .string()
    .min(1, 'Timeline is required')
    .max(1000, 'Timeline must be less than 1000 characters')
    .transform(stripHtmlAndScripts),
  expectedOutcomes: z
    .string()
    .min(1, 'Expected outcomes are required')
    .max(3000, 'Outcomes must be less than 3000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 50, 'Outcomes must be at least 50 characters'),
  
  // Step 4: Additional
  additionalNotes: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
});

/**
 * Conference Submission form validation
 */
export const conferenceSubmissionSchema = z.object({
  // Step 1: Type
  submissionType: z
    .string()
    .min(1, 'Submission type is required'),
  
  // Step 2: Presenter
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 10, 'Title must be at least 10 characters'),
  abstract: z
    .string()
    .min(1, 'Abstract is required')
    .max(3000, 'Abstract must be less than 3000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 100, 'Abstract must be at least 100 characters'),
  presenterName: z
    .string()
    .min(1, 'Presenter name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts),
  presenterEmail: z
    .string()
    .min(1, 'Presenter email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  presenterAffiliation: z
    .string()
    .min(1, 'Presenter affiliation is required')
    .max(200, 'Affiliation must be less than 200 characters')
    .transform(stripHtmlAndScripts),
  
  // Co-presenter (optional)
  coPresenterName: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  coPresenterEmail: z
    .string()
    .optional()
    .refine(
      (val) => !val || emailRegex.test(val),
      'Invalid co-presenter email'
    )
    .transform((val) => val ? val.trim().toLowerCase() : ''),
  coPresenterAffiliation: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  
  // Step 3: Content
  fullPaper: z
    .string()
    .optional(),
  keywords: z
    .string()
    .min(1, 'Keywords are required')
    .max(500, 'Keywords must be less than 500 characters')
    .transform(stripHtmlAndScripts),
});

/**
 * General Submission form validation (contribute/submit)
 */
export const generalSubmissionSchema = z.object({
  submissionType: z
    .string()
    .min(1, 'Submission type is required'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 5, 'Title must be at least 5 characters'),
  abstract: z
    .string()
    .min(1, 'Abstract is required')
    .max(3000, 'Abstract must be less than 3000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 50, 'Abstract must be at least 50 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 100, 'Content must be at least 100 characters'),
  contactName: z
    .string()
    .min(1, 'Contact name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts),
  contactEmail: z
    .string()
    .min(1, 'Contact email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  trackId: z
    .string()
    .optional(),
});

/**
 * Membership Application form validation (scholar/fellow)
 */
export const membershipApplicationSchema = z.object({
  // Step 0: Personal
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(emailRegex, 'Invalid email format')
    .max(254, 'Email is too long')
    .transform((val) => val.trim().toLowerCase()),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(200, 'Location must be less than 200 characters')
    .transform(stripHtmlAndScripts),
  affiliation: z
    .string()
    .min(1, 'Affiliation is required')
    .max(200, 'Affiliation must be less than 200 characters')
    .transform(stripHtmlAndScripts),
  
  // Step 1: Academic
  areasOfStudy: z
    .array(z.string())
    .min(1, 'At least one area of study is required'),
  bio: z
    .string()
    .min(1, 'Bio is required')
    .max(3000, 'Bio must be less than 3000 characters')
    .transform(stripHtmlAndScripts)
    .refine((val) => val.length >= 50, 'Bio must be at least 50 characters'),
  
  // Step 2: Focus/Interests or Engagement
  academicFocus: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  researchInterests: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  yearsOfEngagement: z
    .string()
    .optional(),
  
  // Step 3: Statement
  statement: z
    .string()
    .min(1, 'Statement is required')
    .max(5000, 'Statement must be less than 5000 characters')
    .transform(stripHtmlAndScripts),
  
  // Step 4: Additional
  publications: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
  references: z
    .string()
    .optional()
    .transform((val) => val ? stripHtmlAndScripts(val) : ''),
}).refine((data) => {
  // Scholar type validation
  if (data.academicFocus && data.researchInterests) {
    return data.academicFocus.length >= 50 && data.researchInterests.length >= 50;
  }
  // Fellow type validation
  if (data.yearsOfEngagement) {
    return true;
  }
  return false;
}, {
  message: 'Please fill in academic focus and research interests (Scholar) or years of engagement (Fellow)',
  path: ['academicFocus'],
}).refine((data) => {
  // Statement minimum word count varies by type (checked dynamically)
  const wordCount = data.statement.split(/\s+/).length;
  return wordCount >= 60; // Will be adjusted dynamically
}, {
  message: 'Statement must be at least 60 words',
  path: ['statement'],
});

/**
 * Track ID lookup form validation
 */
export const trackIdLookupSchema = z.object({
  trackId: z
    .string()
    .min(1, 'Track ID is required')
    .max(50, 'Track ID must be less than 50 characters')
    .regex(/^SSC-\d{4}-\d+$/, 'Invalid track ID format (e.g., SSC-2026-123456)')
    .transform((val) => val.trim().toUpperCase()),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
});

/**
 * Membership Status lookup form validation
 */
export const membershipStatusSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
});

// Export all schemas
export const formSchemas = {
  login: loginSchema,
  register: registerSchema,
  otpVerify: otpVerifySchema,
  resendOtp: resendOtpSchema,
  contact: contactFormSchema,
  pathwayApplication: pathwayApplicationSchema,
  interviewApplication: interviewApplicationSchema,
  collaborationProposal: collaborationProposalSchema,
  conferenceSubmission: conferenceSubmissionSchema,
  generalSubmission: generalSubmissionSchema,
  membershipApplication: membershipApplicationSchema,
  trackIdLookup: trackIdLookupSchema,
  membershipStatus: membershipStatusSchema,
};

// Type exports for use in forms
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type ResendOtpInput = z.infer<typeof resendOtpSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type PathwayApplicationInput = z.infer<typeof pathwayApplicationSchema>;
export type InterviewApplicationInput = z.infer<typeof interviewApplicationSchema>;
export type CollaborationProposalInput = z.infer<typeof collaborationProposalSchema>;
export type ConferenceSubmissionInput = z.infer<typeof conferenceSubmissionSchema>;
export type GeneralSubmissionInput = z.infer<typeof generalSubmissionSchema>;
export type MembershipApplicationInput = z.infer<typeof membershipApplicationSchema>;
export type TrackIdLookupInput = z.infer<typeof trackIdLookupSchema>;
export type MembershipStatusInput = z.infer<typeof membershipStatusSchema>;
