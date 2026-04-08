/**
 * Axios HTTP client — single source of truth for all API calls.
 *
 * BACKEND INTEGRATION GUIDE:
 * ──────────────────────────
 * 1. Set the correct BASE_URL below (or use NEXT_PUBLIC_API_URL env var).
 * 2. If your API requires auth, uncomment the interceptor and plug in your token logic.
 * 3. If your backend uses a different response shape, update the ApiResponse<T> type
 *    in this file and the unwrap logic in the interceptor.
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

/* ─────────────────────────────────────────────
   Configuration
   ───────────────────────────────────────────── */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const TIMEOUT_MS = 15_000;

/* ─────────────────────────────────────────────
   Axios instance
   ───────────────────────────────────────────── */

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ─────────────────────────────────────────────
   Request interceptor — attach auth token
   ───────────────────────────────────────────── */

apiClient.interceptors.request.use((config) => {
  // TODO: Plug in your auth token strategy.
  // Example:
  //   const token = getAuthToken();   // from localStorage, cookie, or Zustand store
  //   if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ─────────────────────────────────────────────
   Response interceptor — unwrap + handle errors
   ───────────────────────────────────────────── */

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralised error normalisation — every API error becomes a plain string.
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "An unexpected error occurred";

    // TODO: Replace with your toast / notification system.
    console.error("[API Error]", message);

    return Promise.reject(new Error(message));
  }
);

/* ─────────────────────────────────────────────
   Typed request helpers
   ───────────────────────────────────────────── */

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.get<T>(url, config);
  return res.data;
}

export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await apiClient.post<T>(url, data, config);
  return res.data;
}

export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await apiClient.put<T>(url, data, config);
  return res.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.delete<T>(url, config);
  return res.data;
}

export default apiClient;
