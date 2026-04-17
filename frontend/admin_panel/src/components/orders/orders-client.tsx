"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ShoppingCart,
  Package,
  Printer,
  MapPin,
  CreditCard,
  ChevronRight,
  Calendar,
  Hash,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Sheet } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  name: string
  qty: number
  price: number
}

interface Order {
  id: string
  customer: { name: string; email: string }
  date: string
  amount: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  shipping: { line1: string; line2: string; country: string }
  payment: { method: string; last4?: string }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:   { label: "Pending",   variant: "pending" as const,     dot: "bg-amber-400"  },
  shipped:   { label: "Shipped",   variant: "warning" as const,     dot: "bg-blue-400"   },
  delivered: { label: "Delivered", variant: "success" as const,     dot: "bg-green-400"  },
  cancelled: { label: "Cancelled", variant: "destructive" as const, dot: "bg-red-400"    },
} as const

const AVATAR_PALETTE = [
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-emerald-100 text-emerald-600",
  "bg-orange-100 text-orange-600",
  "bg-rose-100 text-rose-600",
  "bg-cyan-100 text-cyan-600",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-600",
]

const ORDERS: Order[] = [
  {
    id: "ORD-8821",
    customer: { name: "Sarah Johnson",  email: "sarah.j@example.com"  },
    date: "Apr 15, 2026",
    amount: 448.00,
    status: "delivered",
    items: [
      { name: "Premium Headphones",  qty: 1, price: 299 },
      { name: "USB-C Hub 7-Port",    qty: 1, price: 79  },
      { name: "Mouse Pad XL Pro",    qty: 2, price: 35  },
    ],
    shipping: { line1: "123 Oak Street",    line2: "New York, NY 10001",    country: "United States" },
    payment: { method: "Visa",        last4: "4242" },
  },
  {
    id: "ORD-8820",
    customer: { name: "James Carter",   email: "j.carter@example.com"   },
    date: "Apr 14, 2026",
    amount: 189.00,
    status: "shipped",
    items: [
      { name: "Mechanical Keyboard", qty: 1, price: 189 },
    ],
    shipping: { line1: "456 Maple Avenue",  line2: "Chicago, IL 60601",    country: "United States" },
    payment: { method: "Mastercard",  last4: "8931" },
  },
  {
    id: "ORD-8819",
    customer: { name: "Emily Watson",   email: "emily.w@example.com"    },
    date: "Apr 14, 2026",
    amount: 699.00,
    status: "pending",
    items: [
      { name: '4K Monitor 27"',      qty: 1, price: 599 },
      { name: "Laptop Stand Alloy",  qty: 1, price: 65  },
      { name: "Mouse Pad XL Pro",    qty: 1, price: 35  },
    ],
    shipping: { line1: "789 Pine Road",     line2: "Los Angeles, CA 90001", country: "United States" },
    payment: { method: "PayPal" },
  },
  {
    id: "ORD-8818",
    customer: { name: "Michael Torres",  email: "m.torres@example.com"   },
    date: "Apr 13, 2026",
    amount: 307.00,
    status: "delivered",
    items: [
      { name: "SSD 1TB NVMe",        qty: 2, price: 89  },
      { name: "Webcam Pro 4K",       qty: 1, price: 129 },
    ],
    shipping: { line1: "321 Cedar Lane",    line2: "Houston, TX 77001",    country: "United States" },
    payment: { method: "Visa",        last4: "1234" },
  },
  {
    id: "ORD-8817",
    customer: { name: "Olivia Kim",     email: "o.kim@example.com"      },
    date: "Apr 13, 2026",
    amount: 149.00,
    status: "cancelled",
    items: [
      { name: "Wireless Keyboard",   qty: 1, price: 149 },
    ],
    shipping: { line1: "654 Birch Blvd",    line2: "Seattle, WA 98101",    country: "United States" },
    payment: { method: "Amex",        last4: "3782" },
  },
  {
    id: "ORD-8816",
    customer: { name: "Daniel Park",    email: "d.park@example.com"     },
    date: "Apr 12, 2026",
    amount: 269.00,
    status: "shipped",
    items: [
      { name: "WiFi Router X500",    qty: 1, price: 199 },
      { name: "Mouse Pad XL Pro",    qty: 2, price: 35  },
    ],
    shipping: { line1: "987 Elm Street",    line2: "Miami, FL 33101",      country: "United States" },
    payment: { method: "Visa",        last4: "5678" },
  },
  {
    id: "ORD-8815",
    customer: { name: "Aisha Rahman",   email: "a.rahman@example.com"   },
    date: "Apr 12, 2026",
    amount: 299.00,
    status: "delivered",
    items: [
      { name: "Premium Headphones",  qty: 1, price: 299 },
    ],
    shipping: { line1: "147 Walnut Court",  line2: "Boston, MA 02101",     country: "United States" },
    payment: { method: "Mastercard",  last4: "4567" },
  },
  {
    id: "ORD-8814",
    customer: { name: "Lucas Silva",    email: "l.silva@example.com"    },
    date: "Apr 11, 2026",
    amount: 179.00,
    status: "pending",
    items: [
      { name: "USB-C Hub 7-Port",    qty: 1, price: 79  },
      { name: "Laptop Stand Alloy",  qty: 1, price: 65  },
      { name: "Mouse Pad XL Pro",    qty: 1, price: 35  },
    ],
    shipping: { line1: "258 Spruce Way",    line2: "Phoenix, AZ 85001",    country: "United States" },
    payment: { method: "PayPal" },
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avatarStyle(name: string) {
  return AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length]
}

function itemsTotal(items: OrderItem[]) {
  return items.reduce((sum, i) => sum + i.qty * i.price, 0)
}

// ─── Order Detail Drawer Content ──────────────────────────────────────────────

function OrderDetails({ order }: { order: Order }) {
  const subtotal = itemsTotal(order.items)
  const shipping = subtotal >= 100 ? 0 : 9.99
  const total = subtotal + shipping
  const status = STATUS_CONFIG[order.status]

  return (
    <div className="divide-y divide-zinc-100">
      {/* ── Order meta ── */}
      <div className="px-6 py-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-zinc-900">
            #{order.id}
          </span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {order.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Customer ── */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Customer
        </p>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
              avatarStyle(order.customer.name)
            )}
          >
            {order.customer.name[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900 truncate">
              {order.customer.name}
            </p>
            <p className="text-xs text-zinc-400 truncate">{order.customer.email}</p>
          </div>
        </div>
      </div>

      {/* ── Items ── */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Order Items
        </p>
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                  <Hash className="w-3 h-3 text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-700 truncate">{item.name}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-xs text-zinc-500">
                <span>×{item.qty}</span>
                <span className="font-medium text-zinc-900 w-16 text-right">
                  ${(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* ── Shipping ── */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Shipping Address
        </p>
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
          <div className="text-sm text-zinc-700 leading-relaxed">
            <p>{order.shipping.line1}</p>
            <p>{order.shipping.line2}</p>
            <p>{order.shipping.country}</p>
          </div>
        </div>
      </div>

      {/* ── Payment ── */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Payment
        </p>
        <div className="flex items-center gap-2.5">
          <CreditCard className="w-4 h-4 text-zinc-400 shrink-0" />
          <p className="text-sm text-zinc-700">
            {order.payment.method}
            {order.payment.last4 && (
              <span className="text-zinc-400"> ending in {order.payment.last4}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Print Invoice (hidden, print-only) ───────────────────────────────────────

function PrintInvoice({ order }: { order: Order }) {
  const subtotal = itemsTotal(order.items)
  const shipping = subtotal >= 100 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div id="order-invoice">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>AWA Products</h1>
        <p style={{ color: "#71717a", marginTop: 4 }}>Tax Invoice</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <p style={{ fontWeight: 600 }}>Bill To</p>
          <p>{order.customer.name}</p>
          <p style={{ color: "#71717a" }}>{order.customer.email}</p>
          <p style={{ marginTop: 8 }}>{order.shipping.line1}</p>
          <p>{order.shipping.line2}</p>
          <p>{order.shipping.country}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontWeight: 600 }}>Invoice #{order.id}</p>
          <p style={{ color: "#71717a" }}>Date: {order.date}</p>
          <p style={{ color: "#71717a" }}>Status: {STATUS_CONFIG[order.status].label}</p>
          <p style={{ marginTop: 8, color: "#71717a" }}>
            Payment: {order.payment.method}
            {order.payment.last4 ? ` ···· ${order.payment.last4}` : ""}
          </p>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e4e4e7" }}>
            <th style={{ textAlign: "left", padding: "8px 0", color: "#71717a", fontWeight: 500 }}>Item</th>
            <th style={{ textAlign: "center", padding: "8px 0", color: "#71717a", fontWeight: 500 }}>Qty</th>
            <th style={{ textAlign: "right", padding: "8px 0", color: "#71717a", fontWeight: 500 }}>Unit Price</th>
            <th style={{ textAlign: "right", padding: "8px 0", color: "#71717a", fontWeight: 500 }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f4f4f5" }}>
              <td style={{ padding: "10px 0" }}>{item.name}</td>
              <td style={{ padding: "10px 0", textAlign: "center" }}>{item.qty}</td>
              <td style={{ padding: "10px 0", textAlign: "right" }}>${item.price.toFixed(2)}</td>
              <td style={{ padding: "10px 0", textAlign: "right" }}>${(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <p style={{ color: "#71717a" }}>Subtotal: ${subtotal.toFixed(2)}</p>
        <p style={{ color: "#71717a" }}>Shipping: {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
        <p style={{ fontWeight: 700, fontSize: 16, marginTop: 8, borderTop: "2px solid #18181b", paddingTop: 8 }}>
          Total: ${total.toFixed(2)}
        </p>
      </div>
      <p style={{ marginTop: 48, color: "#a1a1aa", fontSize: 12 }}>
        Thank you for your purchase. For questions contact support@awaproducts.com
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function OrdersClient() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return ORDERS
    const q = search.toLowerCase()
    return ORDERS.filter(
      o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.status.includes(q)
    )
  }, [search])

  function handlePrint() {
    window.print()
  }

  return (
    <>
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Search ID, customer, status…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          {search && (
            <span className="text-xs text-zinc-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
          {/* Status legend */}
          <div className="ml-auto hidden sm:flex items-center gap-4">
            {Object.entries(STATUS_CONFIG).map(([, cfg]) => (
              <span key={cfg.label} className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                {cfg.label}
              </span>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            /* ── Empty state ── */
            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-zinc-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-1">
                No orders yet
              </h3>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                {search
                  ? `No results for "${search}" — try a different search term`
                  : "Orders from your customers will show up here once they start placing them."}
              </p>
            </CardContent>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-zinc-100">
                      <TableHead className="pl-5 text-xs font-semibold text-zinc-400 uppercase tracking-wide w-32">
                        Order ID
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Customer
                      </TableHead>
                      <TableHead className="hidden sm:table-cell text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Date
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Status
                      </TableHead>
                      <TableHead className="pr-5 w-8" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map(order => {
                      const isSelected = selectedOrder?.id === order.id
                      const status = STATUS_CONFIG[order.status]

                      return (
                        <TableRow
                          key={order.id}
                          onClick={() => setSelectedOrder(order)}
                          className={cn(
                            "border-zinc-100 dark:border-zinc-800 cursor-pointer transition-colors",
                            isSelected
                              ? "bg-green-50/60"
                              : "hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                          )}
                        >
                          {/* Order ID */}
                          <TableCell className="pl-5 py-3.5">
                            <span className="font-mono text-xs font-semibold text-zinc-500">
                              #{order.id}
                            </span>
                          </TableCell>

                          {/* Customer */}
                          <TableCell className="py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                                  avatarStyle(order.customer.name)
                                )}
                              >
                                {order.customer.name[0]}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-zinc-900 truncate leading-tight">
                                  {order.customer.name}
                                </p>
                                <p className="text-[11px] text-zinc-400 truncate hidden sm:block">
                                  {order.customer.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Date */}
                          <TableCell className="hidden sm:table-cell py-3.5 text-sm text-zinc-500">
                            {order.date}
                          </TableCell>

                          {/* Amount */}
                          <TableCell className="py-3.5 font-semibold text-zinc-900 text-sm tabular-nums">
                            ${order.amount.toFixed(2)}
                          </TableCell>

                          {/* Status */}
                          <TableCell className="py-3.5">
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </TableCell>

                          {/* Chevron */}
                          <TableCell className="pr-4 py-3.5 text-right">
                            <ChevronRight
                              className={cn(
                                "w-4 h-4 transition-colors",
                                isSelected ? "text-green-500" : "text-zinc-300"
                              )}
                            />
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
                  {filtered.length === ORDERS.length
                    ? `${ORDERS.length} orders total`
                    : `${filtered.length} of ${ORDERS.length} orders`}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                    const count = ORDERS.filter(o => o.status === key).length
                    return count > 0 ? (
                      <span key={key} className="flex items-center gap-1">
                        <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                        {count}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* ── Order Detail Sheet ── */}
      <Sheet
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order ${selectedOrder.id}` : "Order Details"}
        description={selectedOrder ? `Placed on ${selectedOrder.date}` : undefined}
        width="sm:max-w-[480px]"
        footer={
          selectedOrder && (
            <div className="flex items-center gap-2.5">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="gap-2 border-zinc-200 text-zinc-600 hover:text-zinc-900 h-9 flex-1 sm:flex-none sheet-close-btn"
              >
                <Printer className="w-4 h-4" />
                Print Invoice
              </Button>
              <Button
                onClick={() => setSelectedOrder(null)}
                className="bg-zinc-900 hover:bg-zinc-800 text-white h-9 flex-1 sm:flex-none sheet-close-btn"
              >
                Close
              </Button>
            </div>
          )
        }
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Sheet>

      {/* ── Print-only invoice (hidden on screen) ── */}
      {selectedOrder && <PrintInvoice order={selectedOrder} />}
    </>
  )
}
