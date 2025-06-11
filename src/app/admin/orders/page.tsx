// src/app/admin/orders/page.tsx
"use client";

import { ListOrdered as ListOrderedIcon, MoreHorizontal, Eye, Edit, PackageSearch } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { placeholderOrders } from "@/lib/placeholder-data";
import type { Order } from "@/types";
import { useState, type ChangeEvent } from "react";
import { Label } from "@/components/ui/label";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(placeholderOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDetailModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };
  
  const handleStatusChange = (newStatus: Order['status']) => {
    if (!selectedOrder) return;
    setSelectedOrder(prev => prev ? {...prev, status: newStatus} : null);
  };

  const handleSaveStatus = () => {
    if (!selectedOrder) return;
    // In a real app, this would involve an API call
    setOrders(orders.map(o => o.id === selectedOrder.id ? selectedOrder : o));
    setIsEditModalOpen(false);
  };

  const getStatusBadgeVariant = (status: Order['status']): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'Pending': return 'default'; // Using primary color
      case 'Preparing': return 'secondary'; // Yellowish accent
      case 'Out for Delivery': return 'outline'; // Bluish
      case 'Delivered': return 'secondary'; // Greenish from default theme (might need custom success variant)
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  };


  return (
    <>
      <PageTitle
        title="Order Tracking"
        icon={ListOrderedIcon}
        description="Monitor and update customer orders."
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>Current and past orders.</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search orders by ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openDetailModal(order)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditModal(order)}>
                            <Edit className="mr-2 h-4 w-4" /> Update Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <PackageSearch className="w-16 h-16 mb-4" />
              <p className="text-lg">No orders found.</p>
              <p>Try adjusting your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Information for order placed by {selectedOrder?.customerName}.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto">
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
              <p><strong>Status:</strong> <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
              <p><strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
              {selectedOrder.deliveryAddress && <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>}
              <div>
                <strong>Items:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {selectedOrder.items.map(item => (
                    <li key={item.productId}>{item.productName} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Status Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status: {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4 space-y-4">
                <Label htmlFor="status">Status</Label>
                <Select value={selectedOrder.status} onValueChange={(value: Order['status']) => handleStatusChange(value)}>
                    <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveStatus}>Save Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
