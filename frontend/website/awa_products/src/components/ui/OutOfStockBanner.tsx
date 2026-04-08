/**
 * Banner shown when a product is out of stock.
 * Reused across cards, detail pages, and guarded components.
 */

export default function OutOfStockBanner() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        This product is currently <strong>out of stock</strong>. You can still
        send an inquiry and we&apos;ll notify you when it&apos;s available.
      </span>
    </div>
  );
}
