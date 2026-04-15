"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Monthly Sales Growth</CardTitle>
        <CardDescription>Sales performance over the past 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#18181b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e4e4e7",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#18181b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
