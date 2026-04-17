"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Minus, Boxes, AlertTriangle, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  reorderLevel: number
  maxStock: number
}

type StockStatus = "in-stock" | "low-stock" | "out-of-stock"

// ─── Seed Data ────────────────────────────────────────────────────────────────

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: "1",  name: "Premium Headphones",  sku: "PHN-001", category: "Electronics", stock: 45,  reorderLevel: 10, maxStock: 100 },
  { id: "2",  name: "Wireless Keyboard",   sku: "WKB-002", category: "Peripherals", stock: 7,   reorderLevel: 15, maxStock: 80  },
  { id: "3",  name: "USB-C Hub 7-Port",    sku: "UCH-003", category: "Accessories", stock: 123, reorderLevel: 20, maxStock: 150 },
  { id: "4",  name: '4K Monitor 27"',      sku: "MON-004", category: "Electronics", stock: 18,  reorderLevel: 8,  maxStock: 60  },
  { id: "5",  name: "Mechanical Keyboard", sku: "MKB-005", category: "Peripherals", stock: 32,  reorderLevel: 10, maxStock: 75  },
  { id: "6",  name: "Webcam Pro 4K",       sku: "WCP-006", category: "Peripherals", stock: 0,   reorderLevel: 5,  maxStock: 50  },
  { id: "7",  name: "SSD 1TB NVMe",        sku: "SSD-007", category: "Storage",     stock: 67,  reorderLevel: 15, maxStock: 120 },
  { id: "8",  name: "WiFi Router X500",    sku: "RTR-008", category: "Networking",  stock: 3,   reorderLevel: 10, maxStock: 40  },
  { id: "9",  name: "Mouse Pad XL Pro",    sku: "MPD-009", category: "Accessories", stock: 89,  reorderLevel: 25, maxStock: 200 },
  { id: "10", name: "Laptop Stand Alloy",  sku: "LST-010", category: "Accessories", stock: 41,  reorderLevel: 12, maxStock: 90  },
  { id: "11", name: "Ergonomic Mouse",     sku: "ERM-011", category: "Peripherals", stock: 6,   reorderLevel: 10, maxStock: 60  },
  { id: "12", name: "HDMI Cable 2m",       sku: "HDM-012", category: "Accessories", stock: 155, reorderLevel: 30, maxStock: 250 },
]

// ─── Config ───────────────────────────────────────────────────────────────────

const CATEGORY_STYLE: Record<string, string> = {
  Electronics: "bg-blue-50 text-blue-600",
  Accessories: "bg-violet-50 text-violet-600",
  Peripherals: "bg-emerald-50 text-emerald-600",
  Storage:     "bg-orange-50 text-orange-600",
  Networking:  "bg-cyan-50 text-cyan-600",
}

function getStatus(item: InventoryItem): StockStatus {
  if (item.stock === 0)                    return "out-of-stock"
  if (item.stock <= item.reorderLevel)     return "low-stock"
  return "in-stock"
}

const STATUS_CFG = {
  "in-stock":     { label: "In Stock",     dot: "bg-green-500", badge: "border-green-200 bg-green-50 text-green-700",  bar: "bg-green-500"  },
  "low-stock":    { label: "Low Stock",    dot: "bg-amber-400", badge: "border-amber-200 bg-amber-50 text-amber-700",  bar: "bg-amber-400"  },
  "out-of-stock": { label: "Out of Stock", dot: "bg-red-400",   badge: "border-red-200   bg-red-50   text-red-700",    bar: "bg-red-400"    },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StockBar({ item }: { item: InventoryItem }) {
  const status  = getStatus(item)
  const pct     = Math.min(100, Math.round((item.stock / item.maxStock) * 100))
  const reorderPct = Math.min(100, Math.round((item.reorderLevel / item.maxStock) * 100))
  const cfg     = STATUS_CFG[status]

  return (
    <div className="w-32">
      {/* Track */}
      <div className="relative h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        {/* Reorder marker line */}
        <span
          className="absolute top-0 bottom-0 w-px bg-zinc-300/80 z-10"
          style={{ left: `${reorderPct}%` }}
        />
        {/* Fill */}
        <div
          className={cn("h-full rounded-full transition-all duration-300", cfg.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-zinc-400 tabular-nums">{pct}%</span>
        <span className="text-[10px] text-zinc-300 tabular-nums">/{item.maxStock}</span>
      </div>
    </div>
  )
}

function AdjustButton({
  icon: Icon,
  onClick,
  variant,
  disabled,
}: {
  icon: React.ElementType
  onClick: () => void
  variant: "add" | "sub"
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-6 h-6 rounded-md flex items-center justify-center transition-all",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        variant === "add"
          ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-500/10 dark:hover:bg-green-500/20 active:scale-90"
          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 active:scale-90"
      )}
    >
      <Icon className="w-3 h-3" />
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InventoryClient() {
  const [items, setItems]         = useState<InventoryItem[]>(INITIAL_INVENTORY)
  const [search, setSearch]       = useState("")
  const [lowStockOnly, setLowStockOnly] = useState(false)
  const [flashId, setFlashId]     = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return items.filter(item => {
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      const matchFilter = !lowStockOnly || getStatus(item) !== "in-stock"
      return matchSearch && matchFilter
    })
  }, [items, search, lowStockOnly])

  const counts = useMemo(() => ({
    inStock:    items.filter(i => getStatus(i) === "in-stock").length,
    lowStock:   items.filter(i => getStatus(i) === "low-stock").length,
    outOfStock: items.filter(i => getStatus(i) === "out-of-stock").length,
  }), [items])

  function adjust(id: string, delta: number) {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, stock: Math.max(0, item.stock + delta) }
          : item
      )
    )
    setFlashId(id)
    setTimeout(() => setFlashId(null), 600)
  }

  return (
    <div className="space-y-5">

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "In Stock",     value: counts.inStock,    color: "text-green-600", bg: "bg-green-500/10", dot: "bg-green-500" },
          { label: "Low Stock",    value: counts.lowStock,   color: "text-amber-600", bg: "bg-amber-500/10", dot: "bg-amber-400" },
          { label: "Out of Stock", value: counts.outOfStock, color: "text-red-600",   bg: "bg-red-500/10",   dot: "bg-red-400"   },
        ].map(({ label, value, color, bg, dot }) => (
          <div key={label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 px-4 py-3.5 flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", bg)}>
              <span className={cn("w-2.5 h-2.5 rounded-full", dot)} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">{label}</p>
              <p className={cn("text-xl font-bold leading-tight tabular-nums", color)}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          <Input
            placeholder="Search name, SKU, category…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Low stock toggle */}
        <button
          onClick={() => setLowStockOnly(v => !v)}
          className={cn(
            "flex items-center gap-2 h-9 px-3.5 rounded-lg border text-sm font-medium transition-all",
            lowStockOnly
              ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          )}
        >
          <AlertTriangle className={cn("w-3.5 h-3.5", lowStockOnly ? "text-amber-500" : "text-zinc-400")} />
          Low Stock Only
          {counts.lowStock + counts.outOfStock > 0 && (
            <span className={cn(
              "inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold",
              lowStockOnly ? "bg-amber-500 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
            )}>
              {counts.lowStock + counts.outOfStock}
            </span>
          )}
        </button>

        {search && (
          <span className="text-xs text-zinc-400 ml-1">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}

        <div className="ml-auto flex items-center gap-1.5 text-xs text-zinc-400">
          <Filter className="w-3.5 h-3.5" />
          {items.length} total SKUs
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-3">
              <Boxes className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No items found</p>
            <p className="text-xs text-zinc-400 mt-1">
              {search
                ? `No results for "${search}"`
                : "No low-stock items — inventory looks healthy"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
                    {[
                      { label: "Product",       cls: "pl-5 w-64"  },
                      { label: "Category",      cls: ""           },
                      { label: "Stock Level",   cls: ""           },
                      { label: "Reorder At",    cls: ""           },
                      { label: "Status",        cls: ""           },
                      { label: "Quick Adjust",  cls: "pr-5 text-right" },
                    ].map(({ label, cls }) => (
                      <th
                        key={label}
                        className={cn(
                          "py-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide text-left",
                          cls
                        )}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map(item => {
                    const status   = getStatus(item)
                    const cfg      = STATUS_CFG[status]
                    const catStyle = CATEGORY_STYLE[item.category] ?? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    const isFlash  = flashId === item.id

                    return (
                      <tr
                        key={item.id}
                        className={cn(
                          "border-b border-zinc-50 transition-colors last:border-b-0",
                          isFlash ? "bg-green-50/40 dark:bg-green-500/10" : "hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
                        )}
                      >
                        {/* Product */}
                        <td className="pl-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0",
                              catStyle
                            )}>
                              {item.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                                {item.sku}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            catStyle
                          )}>
                            {item.category}
                          </span>
                        </td>

                        {/* Stock level + progress bar */}
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-sm font-semibold tabular-nums w-8 text-right",
                              item.stock === 0
                                ? "text-red-500"
                                : item.stock <= item.reorderLevel
                                ? "text-amber-600"
                                : "text-zinc-900 dark:text-zinc-100"
                            )}>
                              {item.stock}
                            </span>
                            <StockBar item={item} />
                          </div>
                        </td>

                        {/* Reorder level */}
                        <td className="py-3.5 text-xs text-zinc-500 tabular-nums">
                          ≤ {item.reorderLevel} units
                        </td>

                        {/* Status badge */}
                        <td className="py-3.5">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                            cfg.badge
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
                            {cfg.label}
                          </span>
                        </td>

                        {/* Quick adjust */}
                        <td className="py-3.5 pr-5">
                          <div className="flex items-center justify-end gap-2">
                            <AdjustButton
                              icon={Minus}
                              variant="sub"
                              onClick={() => adjust(item.id, -1)}
                              disabled={item.stock === 0}
                            />
                            <span className={cn(
                              "w-8 text-center text-sm font-bold tabular-nums transition-colors duration-300",
                              isFlash ? "text-green-600" : "text-zinc-700"
                            )}>
                              {item.stock}
                            </span>
                            <AdjustButton
                              icon={Plus}
                              variant="add"
                              onClick={() => adjust(item.id, 1)}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-800/30">
              <p className="text-xs text-zinc-400">
                {filtered.length === items.length
                  ? `${items.length} SKUs total`
                  : `${filtered.length} of ${items.length} SKUs`}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  {counts.inStock} in stock
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {counts.lowStock} low
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {counts.outOfStock} out
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
