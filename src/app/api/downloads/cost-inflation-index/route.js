import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/helper/api/error-handler';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { createInflationIndex, getInflationList } from './validation';
import { getObjectFromIterator } from '@/utils/utilityFunctions';

export async function GET(req) {
  try {
    const params = getObjectFromIterator(
      new URL(req.url).searchParams.entries(),
    );
    const result = getInflationList.safeParse(params);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { listName, financialAct } = result.data;

    // Fetch the CostInflationList along with associated CostInflationIndex
    const costInflationLists = await db.costInflationList.findMany({
      where: {
        listName,
        financeAct: financialAct,
      },
      include: {
        costInflationIndex: { orderBy: { financialYear: 'desc' } },
      },
    });

    console.log(costInflationLists);

    return NextResponse.json({ status: true, data: costInflationLists });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return errorHandler(error);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = createInflationIndex.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { financeAct, listName, costInflationIndex } = result.data;

    // Check if the CostInflationList already exists
    const existingList = await db.costInflationList.findUnique({
      where: { listName },
    });

    if (existingList) {
      throw new Error('CostInflationList already exists');
    }

    // Create the new CostInflationList
    const createdList = await db.costInflationList.create({
      data: {
        financeAct,
        listName,
        costInflationIndex: {
          create: costInflationIndex,
        },
      },
      include: {
        costInflationIndex: true,
      },
    });

    return NextResponse.json({ status: true, data: createdList });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const result = createInflationIndex.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { financeAct, listName, costInflationIndex } = result.data;

    // Check if the CostInflationList already exists
    const existingList = await db.costInflationList.findUnique({
      where: { listName },
    });

    if (existingList) {
      throw new Error('CostInflationList already exists');
    }

    // Create the new CostInflationList
    const createdList = await db.costInflationList.create({
      data: {
        financeAct,
        listName,
        costInflationIndex: {
          create: costInflationIndex,
        },
      },
      include: {
        costInflationIndex: true,
      },
    });

    return NextResponse.json({ status: true, data: createdList });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}
