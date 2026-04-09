import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'onboarding@resend.dev';

export async function sendOTPVerificationEmail(
  to: string,
  otpCode: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      template: {
        id: 'email-verification-code',
        variables: {
          OTP_CODE: otpCode,
        },
      },
    });
    

    if (error) {
      console.error('[Resend] OTP email error:', error);
      return { success: false, error: error.message };
    }

    console.log(`[Resend] OTP email sent to ${to}:`, data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('[sendOTPVerificationEmail]', error);
    return { success: false, error: 'Failed to send email' };
  }
}
