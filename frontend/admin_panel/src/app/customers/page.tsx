import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CustomersClient } from "@/components/customers/customers-client"

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Customers
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your customer base and loyalty tiers
          </p>
        </div>
        <CustomersClient />
      </div>
    </DashboardLayout>
  )
}
