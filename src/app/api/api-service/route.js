import db from '@/lib/db';
import { errorHandler } from '@/helper/api/error-handler';
// import {
//   BASE_URL,

//   token
// } from '../../Home/staticData'
export async function GET(req, res) {
  try {
    const apiServices = await db.apiService.findMany();
    return new Response(
      JSON.stringify({
        status: true,
        data: apiServices,
      }),
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ err:', error);
    return errorHandler(error, req);
  } finally {
    await db.$disconnect();
  }
}



export async function POST(req) {
  try {
    const res = await db.apiService.findFirst();
    console.log('Filling db with api service');

    if (res && res.id) {
      return new Response(
        JSON.stringify({
          status: true,
          message: 'Api services already populated.',
        }),
      );
    }

    for (const apiDoc of apiDocsData) {
      await db.apiService.create({
        data: {
          title: apiDoc.title,
          category: apiDoc.category,
          overview: apiDoc.overview,
          price: apiDoc.price,
          upcoming: apiDoc.upcoming,
          endpoint: apiDoc.endpoint,
          bodyParams: apiDoc.bodyParams,
          response: apiDoc.response,
          responseJSON: apiDoc.responseJSON,
        },
      });
    }

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Api services added successfully',
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: false,
        message: error.message,
      }),
    );
  } finally {
    await db.$disconnect();
  }
}
