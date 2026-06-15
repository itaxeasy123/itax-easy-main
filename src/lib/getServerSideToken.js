// app/lib/getServerSideToken.ts (or inside route handlers only)
import { cookies } from 'next/headers';
import { verifyJwt } from './jwt';

export const getServerSideToken = () => {
  // Server side can't read the in-memory access token, so it uses the
  // short-lived httpOnly access cookie set by the backend on login/refresh.
  const cookieToken = cookies().get('authToken')?.value;
  return cookieToken;
};

export const getUserOnServer = () => {
  const token = getServerSideToken();
  return token ? verifyJwt(token) : null;
};
