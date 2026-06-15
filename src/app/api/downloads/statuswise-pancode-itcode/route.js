import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/helper/api/error-handler';
import {
  createStatusWisePanCodeAndItCode,
  getStatusWisePanITCodeValidation,
} from './validation';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { getObjectFromIterator } from '@/utils/utilityFunctions';

export async function GET(req) {
  try {
    const params = getObjectFromIterator(
      new URL(req.url).searchParams.entries(),
    );

    const result = getStatusWisePanITCodeValidation.safeParse(params);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { financialYear } = result.data;

    // Fetch the goldAndSilverList list
    const foundDocs = await db.panAndITCodeByStatusList.findMany({
      where: {
        financialYear,
      },
      include: {
        PanAndITCodeByStatus: true,
      },
    });

    if (foundDocs.length < 1) {
      throw new Error(
        `No documents found with financial year: ${financialYear}`,
      );
    }

    return NextResponse.json({ status: true, data: foundDocs });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return errorHandler(error);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = createStatusWisePanCodeAndItCode.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { financialYear, docs } = result.data;

    // Create the gold and silver list
    const createdDoc = await db.panAndITCodeByStatusList.create({
      data: {
        financialYear,
        PanAndITCodeByStatus: {
          create: docs,
        },
      },
    });

    return NextResponse.json({ status: true, data: createdDoc });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const result = createStatusWisePanCodeAndItCode.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { financialYear, docs } = result.data;

    // Create the gold and silver list
    const createdDoc = await db.panAndITCodeByStatusList.create({
      data: {
        financialYear,
        PanAndITCodeByStatus: {
          create: docs,
        },
      },
    });

    return NextResponse.json({ status: true, data: createdDoc });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}
