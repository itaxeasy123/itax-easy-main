import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/helper/api/error-handler';
import {
  createGoldAndSilverSchema,
  updateGoldAndSilverSchema,
} from './validationSchema';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';

export async function GET(req) {
  try {
    // Fetch the goldAndSilverList list
    const goldAndSilverList = await db.goldAndSilver.findMany({
      orderBy: {
        assessmentYear: 'desc',
      },
    });

    return NextResponse.json({ status: true, data: goldAndSilverList });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return errorHandler(error);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = createGoldAndSilverSchema.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { assessmentYear, stGoldRateFor10Gram, stSilverRateFor1kg } =
      result.data;

    // Create the gold and silver list
    const createdGoldAndSilverList = await db.goldAndSilver.create({
      data: {
        assessmentYear,
        stSilverRateFor1Kg: stSilverRateFor1kg,
        stGoldRate24CPer10Grams: stGoldRateFor10Gram,
      },
    });

    return NextResponse.json({ status: true, data: createdGoldAndSilverList });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const result = updateGoldAndSilverSchema.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const dataArr = result.data;

    dataArr.forEach(
      async ({ assessmentYear, stGoldRateFor10Gram, stSilverRateFor1kg }) => {
        // Create the gold and silver list
        await db.goldAndSilver.create({
          data: {
            assessmentYear,
            stSilverRateFor1Kg: stSilverRateFor1kg,
            stGoldRate24CPer10Grams: stGoldRateFor10Gram,
          },
        });
      },
    );

    return NextResponse.json({ status: true, data: 'Updated!' });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}
