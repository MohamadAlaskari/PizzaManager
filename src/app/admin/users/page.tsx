
// src/app/admin/users/page.tsx
"use client";

import { PlusCircle, Users as UsersIcon, MoreHorizontal, Edit, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { placeholderUsers } from "@/lib/placeholder-data";
import type { User } from "@/types";
import { useState, type ChangeEvent } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(placeholderUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentUser) return;
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (value: string) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({ ...prev, role: value as User['role'] }));
  };

  const openAddModal = () => {
    setCurrentUser({ name: "", email: "", role: "customer" });
    setIsFormOpen(true);
  };

  const openEditModal = (user: User) => {
    setCurrentUser({ ...user });
    setIsFormOpen(true);
  };

  const handleSaveUser = () => {
    // In a real app, this would involve an API call
    if (currentUser?.id) { // Editing existing user
      setUsers(users.map(u => u.id === currentUser.id ? currentUser as User : u));
    } else { // Adding new user
      const newUser: User = {
        id: (Math.random() * 10000).toString(), // Temporary ID
        createdAt: new Date().toISOString().split('T')[0],
        ...currentUser
      } as User;
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (userId: string) => {
     // In a real app, this would involve an API call and confirmation
    setUsers(users.filter(u => u.id !== userId));
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
              placeholder="Search users..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'employee' ? 'secondary' : 'outline'}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
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
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={currentUser?.name || ""} onChange={handleInputChange} className="col-span-3" />
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
