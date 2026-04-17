import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ReportsClient } from "@/components/reports/reports-client"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Reports</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Analyze performance and export business data
          </p>
        </div>
        <ReportsClient />
      </div>
    </DashboardLayout>
  )
}
