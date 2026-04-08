export interface CategoryCount {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryCount[];
  activeSubCategory: string;
  onSelect: (subCategory: string) => void;
}

/**
 * Category sidebar — controlled component.
 * The parent manages the active state and URL.
 */
export default function CategoryFilter({
  categories,
  activeSubCategory,
  onSelect,
}: CategoryFilterProps) {
  const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <aside className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
        Categories
      </h3>
      <ul className="mt-3 flex flex-col gap-1">
        {/* "All" option */}
        <li>
          <button
            onClick={() => onSelect("")}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              !activeSubCategory
                ? "bg-brand-50 text-brand-700"
                : "text-text hover:bg-surface-alt"
            }`}
          >
            All Products
            <span className="ml-2 text-xs text-text-muted">
              ({totalProducts})
            </span>
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              onClick={() => onSelect(cat.name)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                activeSubCategory === cat.name
                  ? "bg-brand-50 text-brand-700"
                  : "text-text hover:bg-surface-alt"
              }`}
            >
              {cat.name}
              <span className="ml-2 text-xs text-text-muted">
                ({cat.count})
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
