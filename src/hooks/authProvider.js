import { nodeAxios } from '@/lib/axios';
import { cookies } from 'next/headers';
import userbackAxios from '@/lib/userbackAxios';
import { redirect } from 'next/navigation';
import user from '@/app/dashboard/profile/user/page';

// Function to check if token is expired
function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export function getCurrentUser() {
  const cookieList = cookies();

  if (cookieList) {
    // Server side reads the short-lived httpOnly access cookie set by the backend.
    const token = cookieList.get('authToken')?.value || '';
    const user = JSON.parse(cookieList.get('currentUser')?.value || '{}');

    // Check if token is expired
    if (token && isTokenExpired(token)) {
      // Clear cookies and redirect to login
      cookieList.delete('authToken');
      cookieList.delete('currentUser');
      redirect('/login');
    }
    
    return {
      token,
      ...user,
    };
  }
}

export async function getBusinessProfile() {
  const { token } = getCurrentUser();
  
  if (!token || isTokenExpired(token)) {
    redirect('/login');
  }
  
  try {
    const { data } = await userbackAxios.get('/business/profile', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    return { response: data };
  } catch (error) {
    // If 401 error, redirect to login
    if (error.response?.status === 401) {
      redirect('/login');
    }
    console.log('🚀 ~ getBusinessProfile ~ error:', error);
    return { error: error };
  }
}

export async function getUserProfile() {
  const { token } = getCurrentUser();
  
  if (!token || isTokenExpired(token)) {
    redirect('/login');
  }
  
  try {
    const response = await userbackAxios.get('/user/profile', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return { response: response.data };
  } catch (error) {
    // If 401 error, redirect to login
    if (error.response?.status === 401) {
      redirect('/login');
    }
    return { error: error };
  }
}