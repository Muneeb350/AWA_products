"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"

export function PageSkeleton() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header skeleton */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-5 w-36 bg-zinc-200 rounded-lg animate-pulse" />
            <div className="h-3.5 w-60 bg-zinc-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-9 w-32 bg-zinc-100 rounded-lg animate-pulse" />
        </div>

        {/* Stats row skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-zinc-100 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="h-72 w-full bg-zinc-100 rounded-xl animate-pulse" />
      </div>
    </DashboardLayout>
  )
}
