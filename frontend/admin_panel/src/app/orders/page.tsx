import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { OrdersClient } from "@/components/orders/orders-client"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Orders
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track and manage customer orders
          </p>
        </div>
        <OrdersClient />
      </div>
    </DashboardLayout>
  )
}
