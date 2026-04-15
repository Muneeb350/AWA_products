import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
            <p className="text-zinc-500 mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your store.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Chart and Quick Actions Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity Table */}
        <RecentActivityTable />
      </div>
    </DashboardLayout>
  )
}
