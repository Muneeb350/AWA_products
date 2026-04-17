"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders and their status</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="pl-5 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Customer
              </TableHead>
              <TableHead className="hidden sm:table-cell text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Product
              </TableHead>
              <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Amount
              </TableHead>
              <TableHead className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="hidden md:table-cell pr-5 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow
                key={order.id}
                className="border-zinc-100 hover:bg-zinc-50/50 transition-colors"
              >
                <TableCell className="pl-5 font-mono text-xs font-medium text-zinc-500">
                  {order.id}
                </TableCell>
                <TableCell className="font-medium text-zinc-800 text-sm">
                  {order.customer}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-zinc-500 text-sm">
                  {order.product}
                </TableCell>
                <TableCell className="font-semibold text-zinc-900 text-sm">
                  {order.amount}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="hidden md:table-cell pr-5 text-zinc-400 text-sm">
                  {order.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
