import { useState } from "react";
import { MoreVertical } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const initialOrders = [
  {
    id: "ORD-001",
    product: "Organic Tomatoes",
    buyer: "John Doe",
    quantity: "50kg",
    total: "KES 5,000",
    status: "pending",
  },
  {
    id: "ORD-002",
    product: "Maize",
    buyer: "Jane Smith",
    quantity: "100kg",
    total: "KES 8,000",
    status: "completed",
  },
  {
    id: "ORD-003",
    product: "Potatoes",
    buyer: "Market Hub Ltd",
    quantity: "200kg",
    total: "KES 12,000",
    status: "cancelled",
  },
];

export default function FarmerOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const getStatus = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Pending", variant: "secondary" };
      case "completed":
        return { label: "Completed", variant: "default" };
      case "cancelled":
        return { label: "Cancelled", variant: "destructive" };
      default:
        return { label: status, variant: "default" };
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage incoming orders from buyers
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => {
              const status = getStatus(order.status);

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.id}
                  </TableCell>

                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.total}</TableCell>

                  <TableCell>
                    <Badge variant={status.variant as any}>
                      {status.label}
                    </Badge>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-muted rounded">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Mark as Completed
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-destructive">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}