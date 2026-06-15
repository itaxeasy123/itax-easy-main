import { errorHandler, errorMessages } from '@/helper/api/error-handler';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import crypto from 'crypto';
import { safeParse } from 'zod-error';
import EmailService, { emailTypes } from '@/lib/mailingService';

const signupValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).max(10),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validationRes = safeParse(signupValidation, body);

    if (!validationRes.success) {
      const { error } = validationRes;
      req.error = error;
      throw new Error(errorMessages.validationError);
    }

    const { email, password, phone } = validationRes.data;

    const isExistingUser = await db.user.findFirst({ where: { email } });

    if (isExistingUser) {
      throw new Error(errorMessages.conflict);
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        firstName: email.split('@').at(0),
        email,
        password: hashedPwd,
        gender: 'male',
        phone,
      },
    });

    const otpValue = await crypto.randomInt(100000, 1000000).toString();
    const otp = await db.otp.create({
      data: {
        userId: user.id,
        otp: otpValue,
      },
    });

    // const res = await db.$transaction([user, otp]);

    if (user && otp) {
      // Send OTP via email
      const emailResult = await EmailService.sendMail(
        email,
        `${emailTypes.email}`,
        `Your one time password is : ${otpValue} | Do not share your otp | This is valid for 10 minutes only.`,
      );

      return new Response(
        JSON.stringify({
          status: 201,
          message: `User created successfully.`,
          data: {
            otp_key: otp.id,
          },
        }),
        { status: 201 },
      );
    }
    throw new Error(errorMessages.serverError);
  } catch (err) {
    console.log('🚀 ~ POST ~ err:', err);
    return errorHandler(err, req);
  }
}
