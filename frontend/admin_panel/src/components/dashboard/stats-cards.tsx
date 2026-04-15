"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

const stats = [
  {
    title: "Total Sales",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Active Orders",
    value: "567",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$28,450",
    change: "-3.2%",
    trend: "down",
    icon: Users,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="w-4 h-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-zinc-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
