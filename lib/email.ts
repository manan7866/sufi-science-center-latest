import { Resend } from 'resend';

let resendInstance: Resend | null = null;

function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
  }
  return resendInstance;
}

const FROM_EMAIL = process.env.EMAIL_FROM || 'onboarding@resend.dev';

export async function sendOTPVerificationEmail(
  to: string,
  otpCode: string
) {
  try {
    const resend = getResend();
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

export async function sendAdminReplyEmail(
  to: string,
  userName: string,
  date: string,
  message: string
) {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      template: {
        id: 'new-message-notification',
        variables: {
          user_name: userName,
          user_email: to,
          date,
          message,
        },
      },
    });

    if (error) {
      console.error('[Resend] Admin reply email error:', error);
      return { success: false, error: error.message };
    }

    console.log(`[Resend] Admin reply email sent to ${to}:`, data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('[sendAdminReplyEmail]', error);
    return { success: false, error: 'Failed to send email' };
  }
}
