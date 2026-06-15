import axios from 'axios';
import { setupAuthInterceptors } from './setupAuthInterceptors';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const userAxiosNext = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupAuthInterceptors(userAxiosNext);

export default userAxiosNext;
