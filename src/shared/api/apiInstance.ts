import axios from 'axios';


export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const baseApi = axios.create({
  baseURL: API_URL,
});

