
// src/app/admin/users/page.tsx
"use client";

import { PlusCircle, Users as UsersIcon, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { placeholderUsers } from "@/lib/placeholder-data";
import type { User } from "@/types";
import { useState, type ChangeEvent } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(placeholderUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [isViewDetailModalOpen, setIsViewDetailModalOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentUser) return;
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (value: User['role']) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({ ...prev, role: value }));
  };

  const handleStatusChange = (value: User['status']) => {
    if(!currentUser) return;
    setCurrentUser(prev => ({ ...prev, status: value}));
  }

  const openAddModal = () => {
    setCurrentUser({ fullName: "", email: "", role: "customer", status: "active" });
    setIsFormOpen(true);
  };

  const openEditModal = (user: User) => {
    setCurrentUser({ ...user });
    setIsFormOpen(true);
  };
  
  const openViewDetailModal = (user: User) => {
    setSelectedUserForView(user);
    setIsViewDetailModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!currentUser || !currentUser.fullName || !currentUser.email || !currentUser.role || !currentUser.status) {
      alert("Please fill all required fields.");
      return;
    }
  
    if (currentUser?.id) { 
      setUsers(users.map(u => u.id === currentUser.id ? currentUser as User : u));
    } else { 
      const newUser: User = {
        id: `u${(Math.random() * 10000).toFixed(0).padStart(3, '0')}`, 
        createdAt: new Date().toISOString(),
        ...currentUser
      } as User; 
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getStatusBadgeVariant = (status: User['status']): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'active': return 'default'; 
      case 'inactive': return 'secondary'; 
      case 'suspended': return 'destructive'; 
      case 'pending_verification': return 'outline'; 
      default: return 'default';
    }
  };

  const renderDetailItem = (label: string, value?: string | string[] | number | null | Record<string, any> | any[]) => {
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      return null;
    }
    let displayValue: React.ReactNode;
    if (Array.isArray(value)) {
      displayValue = value.join(', ');
    } else if (typeof value === 'object') {
      displayValue = (
        <ul className="list-disc pl-5 space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <li key={key}>
              <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {typeof val === 'object' ? JSON.stringify(val) : String(val)}
            </li>
          ))}
        </ul>
      );
    } else {
      displayValue = String(value);
    }
    return (
      <div>
        <Label className="font-semibold">{label}</Label>
        {typeof value === 'object' && !Array.isArray(value) ? <div className="mt-1">{displayValue}</div> : <p>{displayValue}</p>}
      </div>
    );
  };


  return (
    <>
      <PageTitle
        title="User Management"
        icon={UsersIcon}
        description="Manage all users in the system."
        actions={
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New User
          </Button>
        }
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>View, edit, or add new users.</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'employee' ? 'secondary' : 'outline'}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1).replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
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
                           <DropdownMenuItem onClick={() => openViewDetailModal(user)}>
                            <Eye className="mr-2 h-4 w-4" /> Anzeigen
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditModal(user)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredUsers.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No users found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View User Detail Modal */}
      <Dialog open={isViewDetailModalOpen} onOpenChange={setIsViewDetailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              <DialogHeader>
                <DialogTitle>User Details: {selectedUserForView?.fullName}</DialogTitle>
              </DialogHeader>
              {selectedUserForView && (
                <div className="grid gap-4 py-4">
                  {renderDetailItem("ID", selectedUserForView.id)}
                  {renderDetailItem("Full Name", selectedUserForView.fullName)}
                  {renderDetailItem("Email", selectedUserForView.email)}
                  {renderDetailItem("Role", selectedUserForView.role)}
                  {renderDetailItem("Status", selectedUserForView.status)}
                  {renderDetailItem("Created At", formatDate(selectedUserForView.createdAt))}

                  {selectedUserForView.role === 'admin' && renderDetailItem("Permissions", selectedUserForView.permissions)}

                  {selectedUserForView.role === 'employee' && (
                    <>
                      {renderDetailItem("Position", selectedUserForView.position)}
                      {renderDetailItem("Contract Type", selectedUserForView.contractType)}
                      {renderDetailItem("Salary", selectedUserForView.salary ? `${selectedUserForView.salary.amount} ${selectedUserForView.salary.currency} (${selectedUserForView.salary.type})` : undefined)}
                      {renderDetailItem("Working Hours", selectedUserForView.workingHours)}
                      {renderDetailItem("Vehicle Type", selectedUserForView.vehicleType)}
                      {renderDetailItem("Speciality", selectedUserForView.speciality)}
                      {renderDetailItem("Language Skills", selectedUserForView.languageSkills)}
                      {renderDetailItem("Notes", selectedUserForView.notes)}
                    </>
                  )}

                  {selectedUserForView.role === 'customer' && (
                    <>
                      {renderDetailItem("Phone", selectedUserForView.phone)}
                      {selectedUserForView.address && (
                        <div>
                          <Label className="font-semibold">Address</Label>
                          <p>{selectedUserForView.address.street}, {selectedUserForView.address.postalCode} {selectedUserForView.address.city}</p>
                        </div>
                      )}
                      {selectedUserForView.orderHistory && selectedUserForView.orderHistory.length > 0 && (
                        <div>
                          <Label className="font-semibold">Order History</Label>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            {selectedUserForView.orderHistory.map(order => (
                              <li key={order.orderId}>
                                Order {order.orderId} on {formatDate(order.date)} - Total: €{order.total.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              <DialogFooter className="sm:justify-end sticky bottom-0 bg-background py-4 px-6 border-t -mx-1 -mb-1">
                <DialogClose asChild>
                  <Button variant="outline">Schließen</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>


      {/* Edit/Add User Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentUser?.id ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {currentUser?.id ? "Update the user's details." : "Enter the details for the new user."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">Full Name</Label>
              <Input id="fullName" name="fullName" value={currentUser?.fullName || ""} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" value={currentUser?.email || ""} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Select name="role" value={currentUser?.role || "customer"} onValueChange={handleRoleChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select name="status" value={currentUser?.status || "active"} onValueChange={handleStatusChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending_verification">Pending Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveUser}>Save User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
