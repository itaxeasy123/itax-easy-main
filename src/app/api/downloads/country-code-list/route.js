import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/helper/api/error-handler';
import {
  getCountryCodeListSchema,
  createCountryCodeListSchema,
} from './validationSchemas';
import { formatErrorMessage } from '@/lib/errorHandlerHooks';
import { getObjectFromIterator } from '@/utils/utilityFunctions';

export async function GET(req) {
  try {
    const params = getObjectFromIterator(
      new URL(req.url).searchParams.entries(),
    );
    const result = getCountryCodeListSchema.safeParse(params);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { search, assessYear } = result.data;
    const searchCondition = [{ countryCode: search }, { countryName: search }];

    // Fetch the country code list based on the assessYear
    const countryCodeList = await db.countryCodeList.findUnique({
      where: { assessYear },
      include: { countryCodes: true }, // Include the associated country codes
    });

    // Extract the country codes from the fetched country code list
    const countryCodes = countryCodeList ? countryCodeList.countryCodes : [];

    // Filter country codes based on search criteria
    const filteredCountryCodes = countryCodes.filter(
      (code) =>
        !search ||
        searchCondition.some(
          (condition) =>
            condition.countryCode === code.countryCode ||
            condition.countryName?.toLowerCase() ===
              code.countryName?.toLowerCase(),
        ),
    );

    // Sort the filtered country codes based on country name
    const sorted = filteredCountryCodes.sort((a, b) =>
      a.countryName.localeCompare(b.countryName),
    );
    countryCodeList.countryCodes = sorted;

    return NextResponse.json({ status: true, data: countryCodeList });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return errorHandler(error);
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const result = createCountryCodeListSchema.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { assessYear, countryCodes } = result.data;

    // Create the country code list
    const createdCountryCodeList = await db.countryCodeList.create({
      data: {
        assessYear,
        countryCodes: {
          create: countryCodes,
        },
      },
      include: {
        countryCodes: false, // Exclude the associated country codes in the response
      },
    });

    return NextResponse.json({ status: true, data: createdCountryCodeList });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}

export async function PUT(req, res) {
  try {
    const body = await req.json();
    const result = createCountryCodeListSchema.safeParse(body);

    if (!result.success) {
      throw new Error(formatErrorMessage(result.error));
    }

    const { assessYear, countryCodes } = result.data;

    // Create the country code list
    const createdCountryCodeList = await db.countryCodeList.create({
      data: {
        assessYear,
        countryCodes: {
          create: countryCodes,
        },
      },
      include: {
        countryCodes: false, // Exclude the associated country codes in the response
      },
    });

    return NextResponse.json({ status: true, data: createdCountryCodeList });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return errorHandler(error);
  }
}
