import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { RecentActivityTable } from "@/components/dashboard/recent-activity-table"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Welcome back — here&apos;s what&apos;s happening with your store.
          </p>
        </div>

        <StatsCards />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <RecentActivityTable />
      </div>
    </DashboardLayout>
  )
}
