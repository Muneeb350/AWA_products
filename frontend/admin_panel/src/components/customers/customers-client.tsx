"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Phone,
  MessageCircle,
  Users,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  X,
  Mail,
  ChevronDown,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Salesman {
  id: string
  name: string
  email: string
  phone: string
  employeeCode: string
}

interface Customer {
  id: string
  customerId: string
  name: string
  businessName: string
  phone: string
  totalOrders: number
  totalRevenue: number
  salesmanId: string
}

type SortKey = "name" | "totalOrders" | "totalRevenue"
type Category = "Active" | "Regular" | "New"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function customerCategory(orders: number): Category {
  if (orders >= 20) return "Active"
  if (orders >= 8) return "Regular"
  return "New"
}

const CATEGORY_STYLE: Record<Category, string> = {
  Active:  "bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60",
  Regular: "bg-blue-50 text-blue-700 border border-blue-200/70 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60",
  New:     "bg-zinc-100 text-zinc-500 border border-zinc-200/70 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SALESMEN: Salesman[] = [
  { id: "s1", name: "Sarah Johnson", email: "sarah@awaproducts.com",  phone: "+1 555 010 2030", employeeCode: "AWA-001" },
  { id: "s2", name: "Marcus Rivera", email: "marcus@awaproducts.com", phone: "+1 555 020 3040", employeeCode: "AWA-002" },
  { id: "s3", name: "Aisha Patel",   email: "aisha@awaproducts.com",  phone: "+1 555 030 4050", employeeCode: "AWA-003" },
  { id: "s4", name: "Derek Osei",    email: "derek@awaproducts.com",  phone: "+1 555 040 5060", employeeCode: "AWA-004" },
  { id: "s5", name: "Lena Müller",   email: "lena@awaproducts.com",   phone: "+1 555 050 6070", employeeCode: "AWA-005" },
  { id: "s6", name: "Carlos Tran",   email: "carlos@awaproducts.com", phone: "+1 555 060 7080", employeeCode: "AWA-006" },
]

const SALESMAN_MAP = Object.fromEntries(SALESMEN.map(s => [s.id, s]))

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "1",  customerId: "CUS-4821", name: "James Carter",   businessName: "Carter & Co.",       phone: "+12145550101", totalOrders: 34, totalRevenue: 12480, salesmanId: "s1" },
  { id: "2",  customerId: "CUS-3317", name: "Layla Hassan",   businessName: "Hassan Imports",     phone: "+14695550182", totalOrders: 21, totalRevenue: 8750,  salesmanId: "s2" },
  { id: "3",  customerId: "CUS-7743", name: "Marcus Reid",    businessName: "",                   phone: "+12145550247", totalOrders: 14, totalRevenue: 5920,  salesmanId: "s1" },
  { id: "4",  customerId: "CUS-9902", name: "Sofia Patel",    businessName: "Patel Distribution", phone: "+19725550398", totalOrders: 28, totalRevenue: 19340, salesmanId: "s3" },
  { id: "5",  customerId: "CUS-2256", name: "Derek Nguyen",   businessName: "Nguyen Tech LLC",    phone: "+14695550473", totalOrders: 7,  totalRevenue: 2100,  salesmanId: "s4" },
  { id: "6",  customerId: "CUS-6614", name: "Aisha Okafor",   businessName: "Okafor Wholesale",   phone: "+19725550561", totalOrders: 19, totalRevenue: 7830,  salesmanId: "s2" },
  { id: "7",  customerId: "CUS-5531", name: "Brian Kowalski", businessName: "",                   phone: "+12145550638", totalOrders: 3,  totalRevenue: 890,   salesmanId: "s5" },
  { id: "8",  customerId: "CUS-1184", name: "Priya Sharma",   businessName: "Sharma Ventures",    phone: "+19725550714", totalOrders: 22, totalRevenue: 11620, salesmanId: "s3" },
  { id: "9",  customerId: "CUS-8827", name: "Tom Gallagher",  businessName: "Gallagher Supplies", phone: "+14695550895", totalOrders: 11, totalRevenue: 4450,  salesmanId: "s6" },
  { id: "10", customerId: "CUS-3390", name: "Nadia Flores",   businessName: "Flores & Partners",  phone: "+12145550921", totalOrders: 6,  totalRevenue: 1780,  salesmanId: "s5" },
  { id: "11", customerId: "CUS-7712", name: "Samuel Osei",    businessName: "Osei Trading Co.",   phone: "+19725551047", totalOrders: 17, totalRevenue: 6300,  salesmanId: "s6" },
  { id: "12", customerId: "CUS-4468", name: "Rachel Kim",     businessName: "Kim Enterprises",    phone: "+14695551133", totalOrders: 31, totalRevenue: 15900, salesmanId: "s1" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortButton({
  col, label, sortKey, sortDir, onSort,
}: {
  col: SortKey; label: string; sortKey: SortKey; sortDir: "asc" | "desc"; onSort: (k: SortKey) => void
}) {
  const active = sortKey === col
  return (
    <button
      onClick={() => onSort(col)}
      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wide hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors group"
    >
      {label}
      {active ? (
        sortDir === "asc"
          ? <ArrowUp className="w-3 h-3 text-emerald-500" />
          : <ArrowDown className="w-3 h-3 text-emerald-500" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
      )}
    </button>
  )
}

function CategoryBadge({ orders }: { orders: number }) {
  const cat = customerCategory(orders)
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold", CATEGORY_STYLE[cat])}>
      {cat}
    </span>
  )
}

function SalesmanModal({ salesman, onClose }: { salesman: Salesman; onClose: () => void }) {
  const initials = salesman.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Salesman details"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl shadow-black/10 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Salesman Details</p>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center px-5 pt-6 pb-4 gap-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-base font-bold text-emerald-600 dark:text-emerald-400">
            {initials}
          </div>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{salesman.name}</p>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            {salesman.employeeCode}
          </span>
        </div>

        {/* Detail rows */}
        <div className="px-5 pb-5 space-y-3">
          <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Email</p>
                <a href={`mailto:${salesman.email}`} className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 transition-colors">
                  {salesman.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Phone</p>
                <a href={`tel:${salesman.phone}`} className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 transition-colors">
                  {salesman.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CustomersClient() {
  const [customers, setCustomers]             = useState<Customer[]>(INITIAL_CUSTOMERS)
  const [search, setSearch]                   = useState("")
  const [salesmanFilter, setSalesmanFilter]   = useState("all")
  const [sortKey, setSortKey]                 = useState<SortKey>("name")
  const [sortDir, setSortDir]                 = useState<"asc" | "desc">("asc")
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [modalSalesman, setModalSalesman]     = useState<Salesman | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return customers
      .filter(c => {
        const matchSearch =
          c.name.toLowerCase().includes(q) ||
          c.businessName.toLowerCase().includes(q) ||
          c.customerId.toLowerCase().includes(q)
        const matchSalesman = salesmanFilter === "all" || c.salesmanId === salesmanFilter
        return matchSearch && matchSalesman
      })
      .sort((a, b) => {
        const m = sortDir === "asc" ? 1 : -1
        if (sortKey === "name")        return a.name.localeCompare(b.name) * m
        if (sortKey === "totalOrders") return (a.totalOrders - b.totalOrders) * m
        return (a.totalRevenue - b.totalRevenue) * m
      })
  }, [customers, search, salesmanFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir("asc") }
  }

  function executeDelete(id: string) {
    setCustomers(prev => prev.filter(c => c.id !== id))
    setConfirmDeleteId(null)
  }

  const totalRev   = customers.reduce((s, c) => s + c.totalRevenue, 0)
  const activeCount = customers.filter(c => customerCategory(c.totalOrders) === "Active").length
  const selectedSalesmanName = salesmanFilter === "all"
    ? null
    : SALESMAN_MAP[salesmanFilter]?.name ?? null

  const selectCls = cn(
    "h-9 appearance-none rounded-lg border border-zinc-200 dark:border-zinc-700",
    "bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300",
    "pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-400 transition-colors"
  )

  return (
    <>
      <div className="space-y-5">

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Customers", value: customers.length.toString(), dot: "bg-emerald-400" },
            { label: "Active",          value: activeCount.toString(),       dot: "bg-blue-400"   },
            { label: "Total Salesmen",  value: SALESMEN.length.toString(),   dot: "bg-violet-400" },
            { label: "Total Revenue",   value: `$${totalRev.toLocaleString()}`, dot: "bg-amber-400" },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 px-4 py-3.5 flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide truncate">{s.label}</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Search name, ID…"
              value={search}
              onChange={e => { setSearch(e.target.value); setConfirmDeleteId(null) }}
              className="pl-9 h-9"
            />
          </div>

          {/* Salesman filter */}
          <div className="relative">
            <select
              value={salesmanFilter}
              onChange={e => { setSalesmanFilter(e.target.value); setConfirmDeleteId(null) }}
              className={selectCls}
            >
              <option value="all">All Salesmen</option>
              {SALESMEN.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {(search || salesmanFilter !== "all") && (
            <span className="text-xs text-zinc-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {selectedSalesmanName ? ` for ${selectedSalesmanName}` : ""}
            </span>
          )}
        </div>

        {/* Table card */}
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No customers found</p>
              <p className="text-xs text-zinc-400 mt-1">Try adjusting your search or salesman filter</p>
            </CardContent>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
                      <TableHead className="pl-5 w-64">
                        <SortButton col="name" label="Customer" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead>
                        <SortButton col="totalOrders" label="Orders" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead>
                        <SortButton col="totalRevenue" label="Revenue" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Salesman
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Salesman Code
                      </TableHead>
                      <TableHead className="pr-5 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Contact / Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filtered.map(customer => {
                      const isConfirming = confirmDeleteId === customer.id
                      const initials = customer.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
                      const salesman = SALESMAN_MAP[customer.salesmanId]

                      return (
                        <TableRow
                          key={customer.id}
                          className={cn(
                            "border-zinc-100 dark:border-zinc-800 transition-colors",
                            isConfirming
                              ? "bg-red-50/60 dark:bg-red-950/30"
                              : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
                          )}
                        >
                          {/* Customer */}
                          <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                                    {customer.name}
                                  </p>
                                  <CategoryBadge orders={customer.totalOrders} />
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <p className="text-[11px] text-zinc-400 font-mono">{customer.customerId}</p>
                                  {customer.businessName && (
                                    <>
                                      <span className="text-zinc-200 dark:text-zinc-700">·</span>
                                      <p className="text-[11px] text-zinc-400 truncate">{customer.businessName}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          {/* Orders */}
                          <TableCell className="py-3">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                              {customer.totalOrders}
                            </span>
                          </TableCell>

                          {/* Revenue */}
                          <TableCell className="py-3">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                              ${customer.totalRevenue.toLocaleString()}
                            </span>
                          </TableCell>

                          {/* Salesman Name */}
                          <TableCell className="py-3">
                            {salesman ? (
                              <p className="text-sm text-zinc-700 dark:text-zinc-300">{salesman.name}</p>
                            ) : (
                              <span className="text-xs text-zinc-400">—</span>
                            )}
                          </TableCell>

                          {/* Salesman Code — clickable */}
                          <TableCell className="py-3">
                            {salesman ? (
                              <button
                                type="button"
                                onClick={() => setModalSalesman(salesman)}
                                className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                              >
                                {salesman.employeeCode}
                              </button>
                            ) : (
                              <span className="text-xs text-zinc-400">—</span>
                            )}
                          </TableCell>

                          {/* Contact / Actions */}
                          <TableCell className="py-3 pr-5 text-right">
                            {isConfirming ? (
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-xs text-red-500 font-medium">Confirm delete?</span>
                                <button
                                  onClick={() => executeDelete(customer.id)}
                                  className="h-7 px-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="h-7 px-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-0.5">
                                <a
                                  href={`tel:${customer.phone}`}
                                  className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-zinc-400 hover:text-emerald-500 transition-colors"
                                  title={`Call ${customer.name}`}
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`https://wa.me/${customer.phone.replace(/\D/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 text-zinc-400 hover:text-green-500 transition-colors"
                                  title={`WhatsApp ${customer.name}`}
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => setConfirmDeleteId(customer.id)}
                                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-400 hover:text-red-500 transition-colors"
                                  title="Delete customer"
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
                  {filtered.length === customers.length
                    ? `${customers.length} customers total`
                    : `${filtered.length} of ${customers.length} customers`}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                    {customers.filter(c => customerCategory(c.totalOrders) === "Active").length} active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400/70" />
                    {customers.filter(c => customerCategory(c.totalOrders) === "Regular").length} regular
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                    {customers.filter(c => customerCategory(c.totalOrders) === "New").length} new
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Salesman detail modal */}
      {modalSalesman && (
        <SalesmanModal
          salesman={modalSalesman}
          onClose={() => setModalSalesman(null)}
        />
      )}
    </>
  )
}
