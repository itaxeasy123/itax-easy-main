// import axios from "axios";
// import { getCookie } from "cookies-next";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const nodeAxios = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Attach JWT token from cookie
// nodeAxios.interceptors.request.use(
//   (config) => {
//     const token = getCookie("authToken");

//     if (token && typeof token === "string") {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default nodeAxios;





import axios from "axios";
import { setupAuthInterceptors } from "./setupAuthInterceptors";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const nodeAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// In-memory access token + auto-refresh on 401.
setupAuthInterceptors(nodeAxios);

export default nodeAxios;