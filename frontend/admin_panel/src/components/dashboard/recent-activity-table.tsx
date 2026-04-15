"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    product: "Premium Headphones",
    amount: "$299.00",
    status: "delivered",
    date: "Apr 14, 2026",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    product: "Wireless Keyboard",
    amount: "$149.00",
    status: "shipped",
    date: "Apr 14, 2026",
  },
  {
    id: "ORD-003",
    customer: "Mike Davis",
    product: "USB-C Hub",
    amount: "$79.00",
    status: "pending",
    date: "Apr 13, 2026",
  },
  {
    id: "ORD-004",
    customer: "Emily Wilson",
    product: "4K Monitor",
    amount: "$599.00",
    status: "delivered",
    date: "Apr 13, 2026",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    product: "Mechanical Keyboard",
    amount: "$189.00",
    status: "shipped",
    date: "Apr 12, 2026",
  },
  {
    id: "ORD-006",
    customer: "Lisa Anderson",
    product: "Webcam Pro",
    amount: "$129.00",
    status: "pending",
    date: "Apr 12, 2026",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "delivered":
      return <Badge variant="success">Delivered</Badge>
    case "shipped":
      return <Badge variant="warning">Shipped</Badge>
    case "pending":
      return <Badge variant="pending">Pending</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export function RecentActivityTable() {
  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
        <CardDescription>Latest orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="hidden md:table-cell">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
