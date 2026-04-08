/**
 * Full-page detail skeleton — used on /products/[id] while a single product loads.
 */

export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex gap-2">
        <div className="h-4 w-16 rounded bg-surface-alt shimmer" />
        <div className="h-4 w-4 rounded bg-surface-alt shimmer" />
        <div className="h-4 w-20 rounded bg-surface-alt shimmer" />
        <div className="h-4 w-4 rounded bg-surface-alt shimmer" />
        <div className="h-4 w-24 rounded bg-surface-alt shimmer" />
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image skeleton */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface-alt">
            <div className="h-full w-full shimmer" />
          </div>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square w-20 rounded-lg border border-border bg-surface-alt shimmer"
              />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-4">
          {/* Category + Stock pills */}
          <div className="flex gap-3">
            <div className="h-6 w-24 rounded-full bg-surface-alt shimmer" />
            <div className="h-6 w-20 rounded-full bg-surface-alt shimmer" />
          </div>

          {/* Title */}
          <div className="h-9 w-3/4 rounded bg-surface-alt shimmer" />

          {/* Description */}
          <div className="h-4 w-full rounded bg-surface-alt shimmer" />
          <div className="h-4 w-5/6 rounded bg-surface-alt shimmer" />
          <div className="h-4 w-2/3 rounded bg-surface-alt shimmer" />

          {/* Details table */}
          <div className="rounded-xl border border-border bg-surface-alt p-5">
            <div className="mb-3 h-4 w-28 rounded bg-surface shimmer" />
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 rounded bg-surface shimmer" />
                  <div className="h-4 w-24 rounded bg-surface shimmer" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <div className="h-12 flex-1 rounded-lg bg-surface-alt shimmer" />
            <div className="h-12 flex-1 rounded-lg bg-surface-alt shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
