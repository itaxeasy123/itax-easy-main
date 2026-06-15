import db from '@/lib/db';
import { z } from 'zod';
import { errorHandler } from '@/helper/api/error-handler';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { verifyJwt } from '@/lib/jwt';
import { getObjectFromIterator } from '@/utils/utilityFunctions';

const getSchema = z.object({
  userId: z.number(),
  registrationStartupId: z
    .string()
    .transform((n) => parseInt(n, 10))
    .optional(),
  registrationServiceId: z
    .string()
    .transform((n) => parseInt(n, 10))
    .optional(),
});

// GET handler for cart which belongs to a user;
export async function GET(req) {
  let user;
  const token = req.cookies.get('token');
  if (token && token.value) {
    user = verifyJwt(JSON.parse(token.value));
  }

  if (!user) {
    return new Response(
      JSON.stringify({
        status: 400,
        message: 'Not authorized',
      }),
      { status: 400 },
    );
  }
  try {
    const params = getObjectFromIterator(new URL(req.url).searchParams);
    const result = getSchema.safeParse({ userId: user.id, ...params });

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    if (result.data.registrationStartupId) {
      const isStartupInDb = await db.cart.findFirst({
        where: {
          registrationStartup: {
            some: { id: result.data.registrationStartupId },
          },
        },
        select: {
          id: true,
          registrationStartup: true,
        },
      });
      return new Response(
        JSON.stringify({
          status: 200,
          data: !!isStartupInDb?.registrationStartup?.length,
        }),
      );
    }

    if (result.data.registrationServiceId) {
      const isServiceInDb = await db.cart.findFirst({
        where: {
          registrationServices: {
            some: { id: result.data.registrationServiceId },
          },
        },
      });
      return new Response(
        JSON.stringify({
          status: 200,
          data: !!isServiceInDb?.registrationServices,
        }),
      );
    }

    const cartItems = await db.cart.findMany({
      where: {
        userId: parseInt(result.data.userId, 10),
      },
      include: {
        services: true,
        registrationServices: { include: { registerStartup: true } },
        registrationStartup: true,
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        data: cartItems,
      }),
    );
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return errorHandler(error);
  }
}
