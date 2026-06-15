import { z } from 'zod';
import db from '@/lib/db';
import { errorHandler } from '@/helper/api/error-handler';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { verifyJwt } from '@/lib/jwt';

const putSchema = z.object({
  serviceIds: z.array(z.string()).optional(),
  registerServiceIds: z.array(z.number()).optional(),
  registerStartupIds: z.array(z.number()).optional(),
});

export async function PUT(req) {
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

  const { id: userId } = user;
  try {
    const body = await req.json();
    const result = putSchema.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    if (
      !result.data.serviceIds &&
      !result.data.registerStartupIds &&
      !result.data.registerServiceIds
    ) {
      throw new Error('No valid service is provided');
    }

    const { serviceIds, registerStartupIds, registerServiceIds } = result.data;

    const data = {};
    // Check if the cart exists for the user
    const existingCart = await db.cart.findUnique({
      where: { userId: parseInt(userId, 10) },
      include: {
        services: !!serviceIds?.length,
        registrationServices: !!registerServiceIds?.length,
        registrationStartup: !!registerStartupIds?.length,
      },
    });

    if (existingCart) {
      // Validate serviceIds
      if (serviceIds) {
        const validServiceIds = await db.apiService.findMany({
          where: { id: { in: serviceIds } },
          select: { id: true },
        });

        if (validServiceIds.length !== serviceIds.length) {
          throw new Error('One or more service IDs are invalid');
        }

        data.services = {
          connect: validServiceIds.map((service) => ({ id: service.id })),
        };
      }

      // Validate registerStartupIds
      if (registerStartupIds) {
        const validStartupIds = await db.registerStartup.findMany({
          where: { id: { in: registerStartupIds } },
          select: { id: true },
        });

        if (validStartupIds.length !== registerStartupIds.length) {
          throw new Error('One or more Startup IDs are invalid');
        }

        data.registrationStartup = {
          connect: validStartupIds.map((startup) => ({ id: startup.id })),
        };
      }

      // Validate registerServiceIds
      if (registerServiceIds) {
        const validRegisterServiceIds = await db.registerServices.findMany({
          where: { id: { in: registerServiceIds } },
          select: { id: true },
        });

        if (validRegisterServiceIds.length !== registerServiceIds.length) {
          throw new Error('One or more register service IDs are invalid');
        }
        data.registrationServices = {
          connect: validRegisterServiceIds.map((service) => ({
            id: service.id,
          })),
        };
      }

      await db.cart.update({
        where: { userId: parseInt(userId, 10) },
        data: data,
      });

      return new Response(
        JSON.stringify({
          status: 200,
          message: 'Added service in your cart!',
        }),
        { status: 200 },
      );
    }

    data.userId = parseInt(userId, 10);

    // Validate and add services for new cart creation
    if (serviceIds) {
      data.services = {
        connect: serviceIds.map((id) => ({ id })),
      };
    }

    if (registerStartupIds) {
      data.registrationStartup = {
        connect: registerStartupIds.map((id) => ({ id })),
      };
    }

    if (registerServiceIds) {
      data.registrationServices = {
        connect: registerServiceIds.map((id) => ({ id })),
      };
    }

    // Cart doesn't exist, create a new cart with the provided services.
    const newCart = await db.cart.create({ data });

    return new Response(
      JSON.stringify({
        status: 201,
        message: 'Added service in your cart!',
        data: newCart,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating cart:', error);
    return errorHandler(error);
  }
}
