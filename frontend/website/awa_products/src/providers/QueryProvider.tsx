"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * React Query provider — wraps the app with a shared QueryClient.
 *
 * Configuration:
 *  - staleTime: 5 minutes (cached data is considered fresh for 5 min)
 *  - gcTime: 30 minutes (inactive cache entries survive 30 min before garbage collection)
 *  - retry: 1 (retry failed requests once before showing error)
 *
 * Adjust these values based on your backend's update frequency.
 */

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
        retry: 1,
        refetchOnWindowFocus: false, // set true if data changes frequently on server
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new client to prevent cross-request state sharing
    return makeQueryClient();
  }
  // Browser: reuse the same client across re-renders
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
