/**
 * @deprecated Use `useProducts` from ./useProducts instead.
 *
 * This generic fetch hook has been superseded by React Query
 * which provides caching, deduplication, background refetching,
 * and devtools out of the box.
 *
 * Migration:
 *   const { data, loading, error } = useFetch(() => fetchAllProducts());
 *   →
 *   const { data, isLoading, error } = useProducts();
 */

import { useState, useEffect } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return { data, loading, error };
}
