import { errorHandler, errorMessages } from '@/helper/api/error-handler';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { safeParse } from 'zod-error';

const updatePwdValidation = z.object({
  email: z.string().email(),
  otp_key: z.number(),
  otp: z.string().min(6),
  newPassword: z.string().min(8).max(30),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validationRes = safeParse(updatePwdValidation, body);

    if (!validationRes.success) {
      const { error } = validationRes;
      req.error = error;
      throw new Error(errorMessages.validationError); 
    }

    const { email, otp_key, otp, newPassword } = validationRes.data;

    const isOtp = await db.otp.findFirst({
      where: {
        id: otp_key,
      },
    });

    if (!isOtp) {
      throw new Error('Invalid Otp');
    }

    const otpTime = isOtp.createdAt.getTime();
    const tenMinutes = 10 * 60 * 1000;
    const currentTime = Date.now();
    const isOtpExpired = currentTime > otpTime + tenMinutes;

    if (isOtpExpired || isOtp.used === true) {
      throw new Error('Otp expired');
    }

    if (isOtp.otp !== otp) {
      throw new Error('Invalid Otp');
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10);

    const updatedUser = await db.user.update({
      where: {
        id: isOtp.userId,
        email: email,
      },
      data: {
        password: hashedPwd,
      },
    });

    if (!updatedUser) {
      throw new Error('Invalid Otp');
    }

    await db.otp.update({
      where: {
        id: isOtp.id,
      },
      data: {
        used: true,
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: `Password is successfully updated!`,
      }),
    );
  } catch (err) {
    return errorHandler(err, req);
  }
}
