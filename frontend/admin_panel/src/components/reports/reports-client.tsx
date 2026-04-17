"use client"

import { useState, useMemo } from "react"
import {
  FileText, FileSpreadsheet, TrendingUp, ShoppingBag,
  Trophy, ChevronDown, ArrowUpRight, ArrowDownRight,
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── Seed Data ────────────────────────────────────────────────────────────────

const REVENUE_TREND = [
  { month: "Nov", revenue: 38400, orders: 142 },
  { month: "Dec", revenue: 52100, orders: 198 },
  { month: "Jan", revenue: 44800, orders: 163 },
  { month: "Feb", revenue: 61300, orders: 224 },
  { month: "Mar", revenue: 57900, orders: 211 },
  { month: "Apr", revenue: 73600, orders: 267 },
]

const TEAM_PERFORMANCE = [
  { name: "Sarah J.",  revenue: 12450, orders: 48, target: 84 },
  { name: "Aisha P.",  revenue: 16300, orders: 61, target: 97 },
  { name: "Marcus R.", revenue: 8970,  orders: 34, target: 61 },
  { name: "Lena M.",   revenue: 9850,  orders: 39, target: 72 },
  { name: "Carlos T.", revenue: 7620,  orders: 29, target: 55 },
  { name: "Derek O.",  revenue: 4100,  orders: 16, target: 38 },
]

const TRANSACTIONS = [
  { id: "ORD-8845", date: "Apr 17, 2026", amount: 299.00, member: "Aisha Patel",   status: "delivered" as const },
  { id: "ORD-8843", date: "Apr 17, 2026", amount: 149.00, member: "Aisha Patel",   status: "shipped"   as const },
  { id: "ORD-8842", date: "Apr 17, 2026", amount: 79.00,  member: "Carlos Tran",   status: "delivered" as const },
  { id: "ORD-8841", date: "Apr 17, 2026", amount: 599.00, member: "Sarah Johnson", status: "pending"   as const },
  { id: "ORD-8838", date: "Apr 16, 2026", amount: 189.00, member: "Lena Müller",   status: "delivered" as const },
  { id: "ORD-8836", date: "Apr 16, 2026", amount: 89.00,  member: "Aisha Patel",   status: "delivered" as const },
  { id: "ORD-8835", date: "Apr 16, 2026", amount: 129.00, member: "Marcus Rivera", status: "shipped"   as const },
  { id: "ORD-8831", date: "Apr 15, 2026", amount: 199.00, member: "Carlos Tran",   status: "delivered" as const },
  { id: "ORD-8829", date: "Apr 15, 2026", amount: 35.00,  member: "Sarah Johnson", status: "delivered" as const },
  { id: "ORD-8820", date: "Apr 14, 2026", amount: 65.00,  member: "Derek Osei",    status: "cancelled" as const },
]

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "This year"] as const
type DateRange = typeof DATE_RANGES[number]

const TX_STATUS_STYLE = {
  delivered: "border-green-200 bg-green-50 text-green-700",
  shipped:   "border-blue-200  bg-blue-50  text-blue-700",
  pending:   "border-amber-200 bg-amber-50 text-amber-700",
  cancelled: "border-red-200   bg-red-50   text-red-700",
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function RevenueTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-lg shadow-black/8 px-3.5 py-2.5 text-xs">
      <p className="font-semibold text-zinc-500 mb-1.5">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-zinc-900 dark:text-zinc-100 font-medium">
          {p.name === "revenue"
            ? `$${p.value.toLocaleString()}`
            : `${p.value} orders`}
        </p>
      ))}
    </div>
  )
}

function BarTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-lg shadow-black/8 px-3.5 py-2.5 text-xs">
      <p className="font-semibold text-zinc-500 mb-1.5">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-zinc-900 dark:text-zinc-100 font-medium">
          {p.name === "revenue" ? `$${p.value.toLocaleString()}` : `${p.value} orders`}
        </p>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ReportsClient() {
  const [dateRange, setDateRange] = useState<DateRange>("Last 6 months")
  const [rangeOpen, setRangeOpen] = useState(false)

  const summary = useMemo(() => {
    const totalRevenue = REVENUE_TREND.reduce((s, r) => s + r.revenue, 0)
    const totalOrders  = REVENUE_TREND.reduce((s, r) => s + r.orders, 0)
    const prevRevenue  = 38400 + 52100 + 44800  // first 3 months as "prior period"
    const currRevenue  = 61300 + 57900 + 73600
    const revDelta     = Math.round(((currRevenue - prevRevenue) / prevRevenue) * 100)
    const topMember    = [...TEAM_PERFORMANCE].sort((a, b) => b.revenue - a.revenue)[0]
    return { totalRevenue, totalOrders, revDelta, topMember }
  }, [])

  return (
    <div className="space-y-6">

      {/* ── Header toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Date range picker */}
        <div className="relative">
          <button
            onClick={() => setRangeOpen(o => !o)}
            className="flex items-center gap-2 h-9 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300 font-medium hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            {dateRange}
            <ChevronDown className={cn("w-3.5 h-3.5 text-zinc-400 transition-transform", rangeOpen && "rotate-180")} />
          </button>

          {rangeOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-44 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-lg shadow-black/8 py-1 z-20">
              {DATE_RANGES.map(r => (
                <button
                  key={r}
                  onClick={() => { setDateRange(r); setRangeOpen(false) }}
                  className={cn(
                    "w-full text-left px-3.5 py-2 text-sm transition-colors",
                    r === dateRange
                      ? "text-green-600 font-semibold bg-green-50/60"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            className="h-9 gap-2 border-zinc-200 text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
            onClick={() => window.print()}
          >
            <FileText className="w-3.5 h-3.5" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            className="h-9 gap-2 border-zinc-200 text-zinc-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* ── Summary tiles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">Total Revenue</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 tabular-nums">
              ${(summary.totalRevenue / 1000).toFixed(1)}
              <span className="text-sm font-medium text-zinc-400">k</span>
            </p>
            <div className={cn(
              "flex items-center gap-1 mt-1.5 text-xs font-medium",
              summary.revDelta >= 0 ? "text-green-600" : "text-red-500"
            )}>
              {summary.revDelta >= 0
                ? <ArrowUpRight className="w-3.5 h-3.5" />
                : <ArrowDownRight className="w-3.5 h-3.5" />}
              {Math.abs(summary.revDelta)}% vs prior period
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">Total Orders</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 tabular-nums">{summary.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-zinc-400 mt-1.5">
              Avg {Math.round(summary.totalOrders / REVENUE_TREND.length)} / month
            </p>
          </div>
        </div>

        {/* Top Sales Person */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">Top Sales Person</p>
            <p className="text-lg font-bold text-zinc-900 mt-0.5 truncate">{summary.topMember.name}</p>
            <p className="text-xs text-zinc-400 mt-1.5">
              ${summary.topMember.revenue.toLocaleString()} · {summary.topMember.target}% target
            </p>
          </div>
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Area chart — Revenue Trends (wider) */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Revenue Trends</p>
              <p className="text-xs text-zinc-400 mt-0.5">{dateRange}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Revenue
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#22c55e" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "#22c55e", strokeWidth: 1, strokeDasharray: "4 2" }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={{ r: 3.5, fill: "#22c55e", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart — Team Performance (narrower) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Team Performance</p>
              <p className="text-xs text-zinc-400 mt-0.5">Revenue by rep</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              MTD
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TEAM_PERFORMANCE} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "#f4f4f5", radius: 6 }} />
              <Bar
                dataKey="revenue"
                fill="#22c55e"
                radius={[5, 5, 0, 0]}
                opacity={0.85}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Transactions table ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Recent Transactions</p>
            <p className="text-xs text-zinc-400 mt-0.5">Last {TRANSACTIONS.length} orders across all reps</p>
          </div>
          <span className="text-[11px] font-medium text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-full px-2.5 py-1">
            {TRANSACTIONS.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
                {["Order ID", "Date", "Sales Member", "Amount", "Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-zinc-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={cn(
                    "border-b border-zinc-50 dark:border-zinc-800/60 transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40",
                    idx === TRANSACTIONS.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                      {tx.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-zinc-500 whitespace-nowrap">{tx.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0",
                        MEMBER_AVATAR[tx.member] ?? "bg-zinc-100 text-zinc-600"
                      )}>
                        {tx.member.split(" ").map(p => p[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-xs font-medium text-zinc-700">{tx.member}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-zinc-900 tabular-nums text-sm">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize",
                      TX_STATUS_STYLE[tx.status]
                    )}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-800/30">
          <p className="text-xs text-zinc-400">
            Total value:{" "}
            <span className="font-semibold text-zinc-700">
              ${TRANSACTIONS.reduce((s, t) => s + t.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            {(["delivered", "shipped", "pending", "cancelled"] as const).map(s => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  s === "delivered" ? "bg-green-400" :
                  s === "shipped"   ? "bg-blue-400"  :
                  s === "pending"   ? "bg-amber-400" : "bg-red-400"
                )} />
                {TRANSACTIONS.filter(t => t.status === s).length} {s}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

// Avatar color map for member initials chips
const MEMBER_AVATAR: Record<string, string> = {
  "Sarah Johnson": "bg-green-100 text-green-700",
  "Aisha Patel":   "bg-violet-100 text-violet-700",
  "Marcus Rivera": "bg-blue-100 text-blue-700",
  "Lena Müller":   "bg-amber-100 text-amber-700",
  "Carlos Tran":   "bg-cyan-100 text-cyan-700",
  "Derek Osei":    "bg-rose-100 text-rose-700",
}
