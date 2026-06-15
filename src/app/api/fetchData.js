import db from '@/lib/db';
import { getUserOnServer } from '@/lib/getServerSideToken';




// fetches cart items
export const getCartItems = async () => {
  try {
    const user = await getUserOnServer();
    const res = await db.cart.findMany({
      where: { userId: user.id },
      include: {
        services: true,
        registrationServices: true,
        registrationStartup: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// fetch api services based on category
// This would be in your @/app/api/fetchData.js file
export async function fetchApiServices(path) {
  try {
    // If path is already a complete URL (contains the BACK_URL), use it directly
    // Otherwise, this might be a category ID from an older call
    const apiUrl = path.includes('http') 
      ? path 
      : `${process.env.BACK_URL}/apis/${path}`;
    
    const response = await fetch(apiUrl, {
      cache: 'no-store', // or appropriate caching strategy
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching API services: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch API services:', error);
    return []; // Return empty array or handle error appropriately
  }
}

//fetch api data from id
export const fetchApiData = async (apiId) => {
  try {
    let apiData = null;
    apiData = await db.apiService.findUnique({
      where: { id: apiId },
    });
    if (apiData) {
      return apiData;
    } else {
      console.log('API service not found.');
      return;
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

//Check if api service is already in cart
export const isServiceInCart = async (serviceId) => {
  try {
    const user = getUserOnServer();
    const res = await db.cart.findFirst({
      where: { userId: user.id, services: { some: { id: serviceId } } },
    });
    return !!res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// fetches invoice items
export const getItems = async () => {
  try {
    const user = getUserOnServer();
    // console.log('🚀 ~ getItems ~ user:', user);
    const res = await db.item.findMany({ where: { userId: user.id } });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// fetch all gold and silver rates
export const getGoldSilverRates = async () => {
  try {
    const goldAndSilverList = await db.goldAndSilver.findMany({
      orderBy: {
        assessmentYear: 'desc',
      },
    });
    return goldAndSilverList;
  } catch (error) {
    console.log(error);
  }
};

// fetch all country code data
// export const getCountryCodes = async (assessYear) => {
//   try {
//     const countryCodeList = await db.countryCodeList.findUnique({
//       where: { assessYear },
//       include: { countryCodes: true },
//     });
//     return countryCodeList;
//   } catch (error) {
//     console.log(error);
//   }
// };

// fetch interest Accrued on NationalList
export const getInterestAccruedOnNationalList = async (listNumber, year) => {
  try {
    const docs = await db.interestAccruedonNationalList.findFirst({
      where: { listNumber: listNumber.toLowerCase(), financeAct: year },
      include: {
        interestAccruedonNational: {
          include: {
            interestRatesAccrued: true, // Include the associated interest rates
          },
        },
      },
    });
    return docs;
  } catch (error) {
    console.log(error);
  }
};


