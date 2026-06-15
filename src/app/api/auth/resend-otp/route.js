import { z } from 'zod';
import db from '@/lib/db';
import crypto from 'crypto';
import { safeParse } from 'zod-error';
import { errorHandler, errorMessages } from '@/helper/api/error-handler';
import EmailService, { emailTypes } from '@/lib/mailingService';

const resendOtpValidation = z.object({
  email: z.string().email(),
  otp_key: z.string().optional(),
  // type: z.enum(Object.keys(emailTypes)),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validationRes = safeParse(resendOtpValidation, body);

    if (!validationRes.success) {
      const { error } = validationRes;
      req.error = error;
      throw new Error(errorMessages.validationError);
    }

    const { email, otp_key} = validationRes.data;
    const user = await db.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    if (otp_key) {
      await db.otp.deleteMany({ where: { userId: user.id } });
    }

    const otpValue = crypto.randomInt(100000, 1000000).toString();
    const newOtp = await db.otp.create({
      data: {
        userId: user.id,
        otp: otpValue,
      },
    });

    if (!newOtp) {
      throw new Error('Server Error');
    }

    const emailResult = await EmailService.sendMail(
      email,
      `${emailTypes}`,
      `Your one time password is : ${otpValue} | Do not share your otp | This is valid for 10 minutes only.`,
    );

    return new Response(
      JSON.stringify({
        status: 200,
        data: { otp_key: newOtp.id },
        message: `Check your mail to get the otp!`,
      }),
    );
  } catch (err) {
    console.log('🚀 ~ POST ~ err:', err);
    return errorHandler(err, req);
  }
}
