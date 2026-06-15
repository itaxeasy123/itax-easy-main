// import { z } from 'zod';
import db from '@/lib/db';
// import bcrypt from 'bcrypt';
// import { safeParse } from 'zod-error';

import { verifyJwt } from '@/lib/jwt';
import { headers } from 'next/headers';
import { errorHandler, errorMessages } from '@/helper/api/error-handler';

export async function GET(req) {
  
  try {
    const allHeaders = headers();
    const authHeader = allHeaders.get('Authorization');

    if (!authHeader) {
      throw new Error('Invalid token');
    }

    const token = authHeader.split(' ').pop();
    const user = verifyJwt(token);

    if (user) {
      const foundUser = await db.user.findFirst({ where: { id: user.id } });
      return new Response(
        JSON.stringify({
          status: 200,
          data: foundUser,
        }),
      );
    }
    return new Response(
      JSON.stringify(
        {
          status: 401,
          message: errorMessages.invalidToken,
        },
        { status: 401 },
      ),
    );
  } catch (err) {
    return errorHandler(err, req);
  }
}
