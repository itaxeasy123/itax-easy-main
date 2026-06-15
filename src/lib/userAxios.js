// import axios from "axios";
// import { getCookie } from "cookies-next";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const userAxios = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // 🔥 VERY IMPORTANT
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Attach token from COOKIE or header
// userAxios.interceptors.request.use(
//   (config) => {
//     // ✅ CORRECT COOKIE NAME
//     const token = getCookie("authToken");

//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default userAxios;


import axios from "axios";
import { setupAuthInterceptors } from "./setupAuthInterceptors";

const userAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// In-memory access token + auto-refresh on 401.
setupAuthInterceptors(userAxios);

export default userAxios;