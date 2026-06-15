import { z } from 'zod';
import db from '@/lib/db';
import * as bcrypt from 'bcrypt';
import { safeParse } from 'zod-error';
import { signJwtAccessToken } from '@/lib/jwt';
import { errorHandler, errorMessages } from '@/helper/api/error-handler';

const loginValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const validationRes = safeParse(loginValidation, body);

    if (!validationRes.success) {
      const { error } = validationRes;
      req.error = error;
      throw new Error(errorMessages.validationError);
    }

    const { email, password } = validationRes.data;

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          status: 404,
          message: 'No user found',
        }),
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...userWithoutPass } = user;
      const token = signJwtAccessToken(userWithoutPass);

      return new Response(
        JSON.stringify({
          status: 200,
          data: {
            user: userWithoutPass,
            token,
          },
        }),
      );
    } else {
      throw new Error(errorMessages.unAuthorized);
    }
  } catch (err) {
    console.log('🚀 ~ POST ~ err:', err);
    return errorHandler(err, req);
  }
}
