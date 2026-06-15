import axios from 'axios';
import { setupAuthInterceptors } from './setupAuthInterceptors';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Calls node backend api from client.
// Auth: in-memory access token + automatic refresh on 401 (httpOnly refresh cookie).
const userbackAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send/receive the httpOnly refresh cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

setupAuthInterceptors(userbackAxios);

export default userbackAxios;
