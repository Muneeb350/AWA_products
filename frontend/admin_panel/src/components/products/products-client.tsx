"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  Pencil,
  Package,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddProductModal, type ProductFormData, type EditableProduct } from "./add-product-modal"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "active" | "draft"
  description: string
}

type SortKey = "name" | "price" | "stock"

const INITIAL_PRODUCTS: Product[] = [
  { id: "1",  name: "Premium Headphones",  sku: "PHN-001", category: "Electronics", price: 299,  stock: 45,  status: "active", description: "" },
  { id: "2",  name: "Wireless Keyboard",   sku: "WKB-002", category: "Peripherals", price: 149,  stock: 7,   status: "active", description: "" },
  { id: "3",  name: "USB-C Hub 7-Port",    sku: "UCH-003", category: "Accessories", price: 79,   stock: 123, status: "active", description: "" },
  { id: "4",  name: '4K Monitor 27"',      sku: "MON-004", category: "Electronics", price: 599,  stock: 18,  status: "active", description: "" },
  { id: "5",  name: "Mechanical Keyboard", sku: "MKB-005", category: "Peripherals", price: 189,  stock: 32,  status: "active", description: "" },
  { id: "6",  name: "Webcam Pro 4K",       sku: "WCP-006", category: "Peripherals", price: 129,  stock: 0,   status: "draft",  description: "" },
  { id: "7",  name: "SSD 1TB NVMe",        sku: "SSD-007", category: "Storage",     price: 89,   stock: 67,  status: "active", description: "" },
  { id: "8",  name: "WiFi Router X500",    sku: "RTR-008", category: "Networking",  price: 199,  stock: 3,   status: "active", description: "" },
  { id: "9",  name: "Mouse Pad XL Pro",    sku: "MPD-009", category: "Accessories", price: 35,   stock: 89,  status: "active", description: "" },
  { id: "10", name: "Laptop Stand Alloy",  sku: "LST-010", category: "Accessories", price: 65,   stock: 41,  status: "draft",  description: "" },
]

const CATEGORY_STYLE: Record<string, string> = {
  Electronics: "bg-blue-50 text-blue-600",
  Accessories: "bg-violet-50 text-violet-600",
  Peripherals: "bg-emerald-50 text-emerald-600",
  Storage:     "bg-orange-50 text-orange-600",
  Networking:  "bg-cyan-50 text-cyan-600",
}

function SortButton({
  col,
  label,
  sortKey,
  sortDir,
  onSort,
}: {
  col: SortKey
  label: string
  sortKey: SortKey
  sortDir: "asc" | "desc"
  onSort: (k: SortKey) => void
}) {
  const active = sortKey === col
  return (
    <button
      onClick={() => onSort(col)}
      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wide hover:text-zinc-700 transition-colors group"
    >
      {label}
      {active ? (
        sortDir === "asc" ? (
          <ArrowUp className="w-3 h-3 text-green-500" />
        ) : (
          <ArrowDown className="w-3 h-3 text-green-500" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
      )}
    </button>
  )
}

export function ProductsClient() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return products
      .filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const m = sortDir === "asc" ? 1 : -1
        if (sortKey === "name")  return a.name.localeCompare(b.name) * m
        if (sortKey === "price") return (a.price - b.price) * m
        return (a.stock - b.stock) * m
      })
  }, [products, search, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir("asc") }
  }

  function openAddModal() {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  function openEditModal(product: Product) {
    setEditingProduct({ ...product })
    setConfirmDeleteId(null)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  function handleSubmit(data: ProductFormData) {
    if (editingProduct) {
      // Update existing product in-place
      setProducts(prev =>
        prev.map(p => (p.id === editingProduct.id ? { ...p, ...data } : p))
      )
    } else {
      // Prepend new product
      setProducts(prev => [{ id: Date.now().toString(), ...data }, ...prev])
    }
    closeModal()
  }

  function confirmDelete(id: string) {
    setConfirmDeleteId(id)
  }

  function executeDelete(id: string) {
    setProducts(prev => prev.filter(p => p.id !== id))
    setConfirmDeleteId(null)
  }

  return (
    <>
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Search name, SKU, category…"
              value={search}
              onChange={e => { setSearch(e.target.value); setConfirmDeleteId(null) }}
              className="pl-9 h-9"
            />
          </div>
          {search && (
            <span className="text-xs text-zinc-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
          <Button
            onClick={openAddModal}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20 gap-2 h-9"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Table card */}
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-3">
                <Package className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-900">No products found</p>
              <p className="text-xs text-zinc-400 mt-1">
                {search
                  ? `No results for "${search}" — try a different keyword`
                  : "Add your first product to get started"}
              </p>
              {!search && (
                <Button
                  onClick={openAddModal}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white gap-2 h-9 shadow-sm shadow-green-500/20"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              )}
            </CardContent>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-zinc-100">
                      <TableHead className="pl-5 w-72">
                        <SortButton col="name" label="Product" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Category
                      </TableHead>
                      <TableHead>
                        <SortButton col="price" label="Price" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead>
                        <SortButton col="stock" label="Stock" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Status
                      </TableHead>
                      <TableHead className="pr-5 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map(product => {
                      const isConfirming = confirmDeleteId === product.id
                      const categoryStyle = CATEGORY_STYLE[product.category] ?? "bg-zinc-100 text-zinc-600"

                      return (
                        <TableRow
                          key={product.id}
                          className={cn(
                            "border-zinc-100 dark:border-zinc-800 transition-colors",
                            isConfirming ? "bg-red-50/60 dark:bg-red-950/30" : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
                          )}
                        >
                          {/* Product */}
                          <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0",
                                  categoryStyle
                                )}
                              >
                                {product.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-zinc-900 truncate leading-tight">
                                  {product.name}
                                </p>
                                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                                  {product.sku}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Category */}
                          <TableCell className="py-3">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                categoryStyle
                              )}
                            >
                              {product.category}
                            </span>
                          </TableCell>

                          {/* Price */}
                          <TableCell className="py-3 font-semibold text-zinc-900 text-sm">
                            ${product.price.toFixed(2)}
                          </TableCell>

                          {/* Stock */}
                          <TableCell className="py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-sm font-medium tabular-nums",
                                  product.stock === 0
                                    ? "text-red-500"
                                    : product.stock < 10
                                    ? "text-amber-600"
                                    : "text-zinc-900"
                                )}
                              >
                                {product.stock}
                              </span>
                              {product.stock === 0 && (
                                <Badge variant="destructive" className="text-[10px] h-4 px-1.5 py-0">
                                  Out
                                </Badge>
                              )}
                              {product.stock > 0 && product.stock < 10 && (
                                <Badge variant="pending" className="text-[10px] h-4 px-1.5 py-0">
                                  Low
                                </Badge>
                              )}
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell className="py-3">
                            <Badge variant={product.status === "active" ? "success" : "secondary"}>
                              {product.status === "active" ? "Active" : "Draft"}
                            </Badge>
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="py-3 pr-5 text-right">
                            {isConfirming ? (
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-xs text-red-500 font-medium">
                                  Confirm delete?
                                </span>
                                <button
                                  onClick={() => executeDelete(product.id)}
                                  className="h-7 px-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="h-7 px-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-medium transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-0.5">
                                <button
                                  onClick={() => openEditModal(product)}
                                  className="p-2 rounded-lg hover:bg-blue-50 text-zinc-400 hover:text-blue-500 transition-colors"
                                  title="Edit product"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => confirmDelete(product.id)}
                                  className="p-2 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Table footer */}
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-800/30">
                <p className="text-xs text-zinc-400">
                  {filtered.length === products.length
                    ? `${products.length} products total`
                    : `${filtered.length} of ${products.length} products`}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500/70" />
                    {products.filter(p => p.status === "active").length} active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-300" />
                    {products.filter(p => p.status === "draft").length} draft
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400/70" />
                    {products.filter(p => p.stock === 0).length} out of stock
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      <AddProductModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editProduct={editingProduct}
      />
    </>
  )
}
