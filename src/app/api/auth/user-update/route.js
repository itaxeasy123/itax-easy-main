import { z } from 'zod';
import db from '@/lib/db';
// import * as bcrypt from 'bcrypt';
// import { safeParse } from 'zod-error';
// import { signJwtAccessToken } from '@/lib/jwt';
import { errorHandler, errorMessages } from '@/helper/api/error-handler';
import { GENDER_TYPES } from '@/utils/globals';
import { safeParse } from 'zod-error';
import { headers } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

const userUpdateValidation = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.enum(Object.values(GENDER_TYPES)).optional(),
  pan: z.string().optional(),
  aadhaar: z.string().optional(),
  address: z.string().optional(),
  pin: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(10).optional(),
});

export async function PUT(req) {
  try {
    const allHeaders = headers();
    const authHeader = allHeaders.get('Authorization');

    if (!authHeader) {
      throw new Error(errorMessages.unAuthorized);
    }

    const token = authHeader.split(' ').pop();
    const user = verifyJwt(token);

    if (!user) {
      throw new Error(errorMessages.unAuthorized);
    }

    const body = await req.json();
    const validationRes = safeParse(userUpdateValidation, body);
    console.log('🚀 ~ PUT ~ validationRes:', validationRes);

    if (!validationRes.success) {
      const { error } = validationRes;
      req.error = error;
      throw new Error(errorMessages.validationError);
    }

    const userInput = validationRes.data;

    const newUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userInput,
      },
    });

    if (!newUser) {
      throw new Error('Server Error');
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: 'User updated successfully',
      }),
    );
  } catch (err) {
    console.log('🚀 ~ POST ~ err:', err);
    return errorHandler(err, req);
  }
}
