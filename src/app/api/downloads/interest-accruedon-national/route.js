// import db from '@/lib/db';
// import { NextResponse } from 'next/server';
// import { errorHandler } from '@/helper/api/error-handler';
// import { formatErrorMessage } from '@/lib/errorHandlerHooks';
// import { createInterestAcc, getInterestAcc } from './validation';
// import { getObjectFromIterator } from '@/utils/utilityFunctions';

// export async function GET(req, res) {
//   try {
//     const params = getObjectFromIterator(
//       new URL(req.url).searchParams.entries(),
//     );
//     const result = getInterestAcc.safeParse(params);

//     if (!result.success) {
//       throw new Error(formatErrorMessage(result.error));
//     }

//     const { listNumber, year } = result.data;

//     // Fetch the country code list based on the assessYear
//     const docs = await db.interestAccruedonNationalList.findUnique({
//       where: { listNumber: listNumber.toLowerCase(), financeAct: year },
//       include: {
//         interestAccruedonNational: {
//           include: {
//             interestRatesAccrued: true, // Include the associated interest rates
//           },
//         },
//       },
//     });

//     if (!docs) {
//       throw new Error(
//         `No interest accrued on national list found for list number ${listNumber}`,
//       );
//     }

//     return NextResponse.json({ status: true, data: docs });
//   } catch (error) {
//     console.log('🚀 ~ GET ~ error:', error);
//     return errorHandler(error);
//   }
// }

// export async function POST(req, res) {
//   try {
//     const body = await req.json();
//     const result = createInterestAcc.safeParse(body);

//     if (!result.success) {
//       throw new Error(formatErrorMessage(result.error));
//     }

//     const { listNumber, financeAct, doc } = result.data;

//     // Create the interest accrued on national list
//     const createdInterestAccruedList =
//       await db.interestAccruedonNationalList.create({
//         data: {
//           listNumber,
//           financeAct,
//           interestAccruedonNational: {
//             create: doc.map((item) => ({
//               ...item,
//               interestRatesAccrued: { create: item.interestRatesAccrued },
//             })),
//           },
//         },
//       });

//     return NextResponse.json({
//       status: true,
//       data: createdInterestAccruedList,
//     });
//   } catch (error) {
//     console.log('🚀 ~ POST ~ error:', error);
//     return errorHandler(error);
//   }
// }

// export async function PUT(req, res) {
//   try {
//     const body = await req.json();
//     const result = createInterestAcc.safeParse(body);

//     if (!result.success) {
//       throw new Error(formatErrorMessage(result.error));
//     }

//     const { listNumber, financeAct, doc } = result.data;

//     // Create the interest accrued on national list
//     const createdInterestAccruedList =
//       await db.interestAccruedonNationalList.create({
//         data: {
//           listNumber,
//           financeAct,
//           interestAccruedonNational: {
//             create: doc.map((item) => ({
//               ...item,
//               interestRatesAccrued: { create: item.interestRatesAccrued },
//             })),
//           },
//         },
//       });

//     return NextResponse.json({
//       status: true,
//       data: createdInterestAccruedList,
//     });
//   } catch (error) {
//     console.log('🚀 ~ POST ~ error:', error);
//     return errorHandler(error);
//   }
// }
