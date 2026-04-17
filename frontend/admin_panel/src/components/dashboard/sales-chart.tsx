"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3500 },
  { month: "Mar", sales: 5200 },
  { month: "Apr", sales: 4800 },
  { month: "May", sales: 6100 },
  { month: "Jun", sales: 5800 },
  { month: "Jul", sales: 7200 },
  { month: "Aug", sales: 6900 },
  { month: "Sep", sales: 8100 },
  { month: "Oct", sales: 7800 },
  { month: "Nov", sales: 9200 },
  { month: "Dec", sales: 8500 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Revenue over the last 12 months</CardDescription>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-zinc-400">Sales</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f4f4f5"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f4f4f5",
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  fontSize: "12px",
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
                dot={false}
                activeDot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
