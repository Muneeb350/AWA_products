/**
 * Skeleton placeholder that mimics the shape of ProductCard.
 * Used while product data is loading.
 */

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] w-full bg-surface-alt">
        <div className="absolute inset-0 shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category pill */}
        <div className="h-5 w-24 rounded-full bg-surface-alt shimmer" />

        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-surface-alt shimmer" />

        {/* Description lines */}
        <div className="h-4 w-full rounded bg-surface-alt shimmer" />
        <div className="h-4 w-2/3 rounded bg-surface-alt shimmer" />
      </div>
    </div>
  );
}
