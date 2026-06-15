import { z } from 'zod';
import db from '@/lib/db';
import { errorHandler } from '@/helper/api/error-handler';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { verifyJwt } from '@/lib/jwt';

const deleteSchema = z.object({
  serviceIds: z.array(z.string()).optional(),
  registerStartupIds: z.array(z.number()).optional(),
  registerServiceIds: z.array(z.number()).optional(),
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

  try {
    const { id: userId } = user;
    const body = await req.json();
    const result = deleteSchema.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    if (
      !result.data.serviceIds &&
      !result.data.registerServiceIds &&
      !result.data.registerStartupIds
    ) {
      throw new Error('No valid service is provided');
    }

    const { serviceIds, registerServiceIds, registerStartupIds } = result.data;

    const data = {};

    // Check if the cart exists for the user
    const existingCart = await db.cart.findUnique({
      where: { userId: parseInt(userId, 10) },
      include: {
        services: true,
        registrationServices: true,
        registrationStartup: true,
      },
    });

    if (!existingCart) {
      return new Response(
        JSON.stringify({
          status: 404,
          message: 'Cart not found',
        }),
        { status: 404 },
      );
    }

    // Handle serviceIds if provided
    if (serviceIds) {
      const servicesToRemove = existingCart.services.filter((service) =>
        serviceIds.includes(service.id),
      );

      data.services = {
        disconnect: servicesToRemove.map((service) => ({ id: service.id })),
      };
    }

    // Handle registerServiceIds if provided
    if (registerStartupIds) {
      const registerStartupToRemove = existingCart.registrationStartup.filter(
        (regService) => registerStartupIds.includes(regService.id),
      );

      data.registrationStartup = {
        disconnect: registerStartupToRemove.map((regService) => ({
          id: regService.id,
        })),
      };
    }

    // Handle registerServiceIds if provided
    if (registerServiceIds) {
      const registerServicesToRemove = existingCart.registrationServices.filter(
        (regService) => registerServiceIds.includes(regService.id),
      );

      data.registrationServices = {
        disconnect: registerServicesToRemove.map((regService) => ({
          id: regService.id,
        })),
      };
    }

    // Update the cart with the services to be removed
    const updatedCart = await db.cart.update({
      where: { userId: parseInt(userId, 10) },
      data: data,
      include: {
        services: true,
        registrationServices: true,
        registrationStartup: true,
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: 'Service(s) removed from cart successfully',
        data: updatedCart,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error removing service(s) from cart:', error);
    return errorHandler(error);
  }
}
