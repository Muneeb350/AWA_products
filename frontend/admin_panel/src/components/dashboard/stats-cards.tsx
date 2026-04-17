"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"

const stats = [
  {
    title: "Total Sales",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Package,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Active Orders",
    value: "567",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    title: "Revenue",
    value: "$28,450",
    change: "-3.2%",
    trend: "down",
    icon: Users,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="hover:shadow-md transition-shadow duration-200"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1.5 tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-zinc-400">vs last month</span>
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}
              >
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
