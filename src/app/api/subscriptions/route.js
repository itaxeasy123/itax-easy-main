import db from '@/lib/db';
import { errorHandler } from '@/helper/api/error-handler';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { createOrder, updateSubs } from './validationSchema';
import { connect } from 'formik';

export async function GET(req) {
  const { id: userId } = getUserOnServer();
  try {
    const subs = await db.subscriptions.findMany({
      where: { userId },
      include: {
        registrationServices: true,
        registrationStartup: true,
        services: true,
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        data: subs,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}

export async function POST(req) {
  const { id: userId } = await getUserOnServer();
  try {
    const body = await req.json();
    const result = createOrder.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const apiServices = await db.apiService.findMany({
      where: { id: { in: result.data.serviceIds } },
    });
    const registerStartup = await db.registerStartup.findMany({
      where: { id: { in: result.data.registerStartupIds } },
    });
    const registerServices = await db.registerServices.findMany({
      where: { id: { in: result.data.registerServiceIds } },
    });

    let totalAmount = 0;
    if (apiServices)
      totalAmount = apiServices.reduce((acc, service) => {
        return acc + +(service.price ?? 0);
      }, totalAmount);
    if (registerStartup)
      totalAmount = registerStartup.reduce((acc, service) => {
        return acc + +(service.priceWithGst ?? 0);
      }, totalAmount);
    if (registerServices)
      totalAmount = registerServices.reduce((acc, service) => {
        return acc + +(service.price ?? 0);
      }, totalAmount);

    console.log({ totalAmount, data: result.data, registerStartup });
    // Add tax 18 %;
    totalAmount += (totalAmount / 100) * 18;

    const createdData = await db.subscriptions.create({
      data: {
        userId,
        amountForServices: totalAmount,
        services: {
          connect: result.data.serviceIds.map((id) => ({ id })),
        },
        registrationServices: {
          connect: result.data.registerServiceIds.map((id) => ({ id })),
        },
        registrationStartup: {
          connect: result.data.registerStartupIds.map((id) => ({ id })),
        },
      },
    });

    return new Response(
      JSON.stringify({
        status: 201,
        data: createdData,
        message: 'Subscription created successfully',
      }),
      { status: 201 },
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}

export async function PUT(req) {
  const { id: userId } = getUserOnServer();
  try {
    const body = await req.json();
    const result = updateSubs.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { pid, status, txnid } = result.data;

    await db.subscriptions.update({
      data: {
        pid,
        status,
      },
      where: {
        userId,
        txnid,
      },
    });

    return new Response(
      JSON.stringify({
        status: 201,
        message: 'Order created successfully',
      }),
      { status: 201 },
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}
