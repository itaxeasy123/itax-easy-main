import axios from "axios";

const ocrAxios = axios.create({
  baseURL: process.env.OCR_BASE_URL || "https://360bima.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ocrAxios;
