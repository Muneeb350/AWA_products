import ProductsPageClient from "./ProductsPageClient";
import { Suspense } from "react";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";

/**
 * Products listing page.
 * Server component — the client component reads URL params directly
 * via useSearchParams() for filtering.
 *
 * Wrapped in Suspense because useSearchParams() triggers
 * client-side rendering bailout in Next.js.
 */
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPageClient />
    </Suspense>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-9 w-48 rounded bg-surface-alt shimmer" />
        <div className="mt-2 h-4 w-80 rounded bg-surface-alt shimmer" />
      </div>
      <div className="flex gap-8">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-3 h-4 w-24 rounded bg-surface-alt shimmer" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-9 w-full rounded-lg bg-surface-alt shimmer" />
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-6 h-10 w-full rounded-lg bg-surface-alt shimmer" />
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}
