"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  Phone,
  MessageCircle,
  Users,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  MapPin,
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
import { AddCustomerModal, type CustomerFormData } from "./add-customer-modal"
import { cn } from "@/lib/utils"

interface Customer {
  id: string
  customerId: string
  name: string
  businessName: string
  phone: string
  address: string
  city: string
  totalOrders: number
  totalRevenue: number
}

type SortKey = "name" | "totalOrders" | "totalRevenue"

function loyaltyTier(orders: number): "premium" | "gold" | null {
  if (orders >= 20) return "premium"
  if (orders >= 10) return "gold"
  return null
}

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "1",  customerId: "CUS-4821", name: "James Carter",    businessName: "Carter & Co.",       phone: "+12145550101", address: "1234 Elm St, Suite 5",   city: "Dallas",     totalOrders: 34, totalRevenue: 12480 },
  { id: "2",  customerId: "CUS-3317", name: "Layla Hassan",    businessName: "Hassan Imports",      phone: "+14695550182", address: "88 Commerce Blvd",       city: "Garland",    totalOrders: 21, totalRevenue: 8750  },
  { id: "3",  customerId: "CUS-7743", name: "Marcus Reid",     businessName: "",                   phone: "+12145550247", address: "502 Oak Lane",           city: "Plano",      totalOrders: 14, totalRevenue: 5920  },
  { id: "4",  customerId: "CUS-9902", name: "Sofia Patel",     businessName: "Patel Distribution",  phone: "+19725550398", address: "77 Industrial Pkwy",     city: "Irving",     totalOrders: 28, totalRevenue: 19340 },
  { id: "5",  customerId: "CUS-2256", name: "Derek Nguyen",    businessName: "Nguyen Tech LLC",     phone: "+14695550473", address: "321 Maple Ave",          city: "Mesquite",   totalOrders: 7,  totalRevenue: 2100  },
  { id: "6",  customerId: "CUS-6614", name: "Aisha Okafor",    businessName: "Okafor Wholesale",    phone: "+19725550561", address: "19 Harbor View Dr",      city: "Garland",    totalOrders: 19, totalRevenue: 7830  },
  { id: "7",  customerId: "CUS-5531", name: "Brian Kowalski",  businessName: "",                   phone: "+12145550638", address: "4 Westfield Ct",         city: "Dallas",     totalOrders: 3,  totalRevenue: 890   },
  { id: "8",  customerId: "CUS-1184", name: "Priya Sharma",    businessName: "Sharma Ventures",     phone: "+19725550714", address: "250 Tech Park Way",      city: "Richardson", totalOrders: 22, totalRevenue: 11620 },
  { id: "9",  customerId: "CUS-8827", name: "Tom Gallagher",   businessName: "Gallagher Supplies",  phone: "+14695550895", address: "610 Sunrise Blvd",       city: "Carrollton", totalOrders: 11, totalRevenue: 4450  },
  { id: "10", customerId: "CUS-3390", name: "Nadia Flores",    businessName: "Flores & Partners",   phone: "+12145550921", address: "33 Crescent Way",        city: "Frisco",     totalOrders: 6,  totalRevenue: 1780  },
  { id: "11", customerId: "CUS-7712", name: "Samuel Osei",     businessName: "Osei Trading Co.",    phone: "+19725551047", address: "128 Valley Rd",          city: "McKinney",   totalOrders: 17, totalRevenue: 6300  },
  { id: "12", customerId: "CUS-4468", name: "Rachel Kim",      businessName: "Kim Enterprises",     phone: "+14695551133", address: "9 Lakewood Dr",          city: "Plano",      totalOrders: 31, totalRevenue: 15900 },
]

const CITY_FILTER_OPTIONS = ["All Cities", "Dallas", "Garland", "Plano", "Irving", "Mesquite", "Richardson", "Carrollton", "Frisco", "McKinney"]

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

function LoyaltyBadge({ orders }: { orders: number }) {
  const tier = loyaltyTier(orders)
  if (!tier) return null
  if (tier === "premium") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 border border-violet-200/60 dark:border-violet-800/60">
        ★ Premium
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
      ✦ Gold
    </span>
  )
}

export function CustomersClient() {
  const [customers, setCustomers]         = useState<Customer[]>(INITIAL_CUSTOMERS)
  const [search, setSearch]               = useState("")
  const [cityFilter, setCityFilter]       = useState("All Cities")
  const [sortKey, setSortKey]             = useState<SortKey>("name")
  const [sortDir, setSortDir]             = useState<"asc" | "desc">("asc")
  const [isModalOpen, setIsModalOpen]     = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return customers
      .filter(c => {
        const matchSearch =
          c.name.toLowerCase().includes(q) ||
          c.businessName.toLowerCase().includes(q) ||
          c.customerId.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q)
        const matchCity = cityFilter === "All Cities" || c.city === cityFilter
        return matchSearch && matchCity
      })
      .sort((a, b) => {
        const m = sortDir === "asc" ? 1 : -1
        if (sortKey === "name")         return a.name.localeCompare(b.name) * m
        if (sortKey === "totalOrders")  return (a.totalOrders - b.totalOrders) * m
        return (a.totalRevenue - b.totalRevenue) * m
      })
  }, [customers, search, cityFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir("asc") }
  }

  function handleSubmit(data: CustomerFormData) {
    setCustomers(prev => [{
      id: Date.now().toString(),
      customerId: data.customerId,
      name: data.name,
      businessName: data.businessName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      totalOrders: 0,
      totalRevenue: 0,
    }, ...prev])
    setIsModalOpen(false)
  }

  function executeDelete(id: string) {
    setCustomers(prev => prev.filter(c => c.id !== id))
    setConfirmDeleteId(null)
  }

  const goldCount    = customers.filter(c => loyaltyTier(c.totalOrders) === "gold").length
  const premiumCount = customers.filter(c => loyaltyTier(c.totalOrders) === "premium").length
  const totalRev     = customers.reduce((s, c) => s + c.totalRevenue, 0)

  return (
    <>
      <div className="space-y-5">

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Customers",  value: customers.length.toString(),                        dot: "bg-emerald-400" },
            { label: "Gold Members",     value: goldCount.toString(),                                dot: "bg-amber-400"  },
            { label: "Premium Members",  value: premiumCount.toString(),                             dot: "bg-violet-400" },
            { label: "Total Revenue",    value: `$${totalRev.toLocaleString()}`,                     dot: "bg-blue-400"   },
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
              placeholder="Search name, ID, city…"
              value={search}
              onChange={e => { setSearch(e.target.value); setConfirmDeleteId(null) }}
              className="pl-9 h-9"
            />
          </div>

          {/* City filter */}
          <div className="relative">
            <select
              value={cityFilter}
              onChange={e => { setCityFilter(e.target.value); setConfirmDeleteId(null) }}
              className={cn(
                "h-9 appearance-none rounded-lg border border-zinc-200 dark:border-zinc-700",
                "bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300",
                "pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors"
              )}
            >
              {CITY_FILTER_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {(search || cityFilter !== "All Cities") && (
            <span className="text-xs text-zinc-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}

          <Button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 gap-2 h-9"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>

        {/* Table card */}
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No customers found</p>
              <p className="text-xs text-zinc-400 mt-1">
                {search || cityFilter !== "All Cities"
                  ? "Try adjusting your search or filter"
                  : "Add your first customer to get started"}
              </p>
              {!search && cityFilter === "All Cities" && (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white gap-2 h-9 shadow-sm shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  Add Customer
                </Button>
              )}
            </CardContent>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
                      <TableHead className="pl-5 w-72">
                        <SortButton col="name" label="Customer" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Location
                      </TableHead>
                      <TableHead>
                        <SortButton col="totalOrders" label="Orders" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead>
                        <SortButton col="totalRevenue" label="Revenue" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        Loyalty
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
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                                  {customer.name}
                                </p>
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

                          {/* Location */}
                          <TableCell className="py-3">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-zinc-300 dark:text-zinc-600 shrink-0" />
                              <span className="text-sm text-zinc-600 dark:text-zinc-400">{customer.city}</span>
                            </div>
                            {customer.address && (
                              <p className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-[160px]">{customer.address}</p>
                            )}
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

                          {/* Loyalty */}
                          <TableCell className="py-3">
                            <LoyaltyBadge orders={customer.totalOrders} />
                            {loyaltyTier(customer.totalOrders) === null && (
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
                    <span className="w-2 h-2 rounded-full bg-violet-400/70" />
                    {premiumCount} premium
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                    {goldCount} gold
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                    {customers.length - goldCount - premiumCount} standard
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      <AddCustomerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}
