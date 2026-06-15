import axios from "axios";
import { setupAuthInterceptors } from "./setupAuthInterceptors";

/* =========================
   AUTH AXIOS
========================= */
export const nodeAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ ENV USE
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// In-memory access token + auto-refresh on 401.
setupAuthInterceptors(nodeAxios);

/* =========================
   PUBLIC AXIOS (no auth)
========================= */
export const cmsAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ ENV USE
  headers: {
    "Content-Type": "application/json",
  },
});

export default nodeAxios;