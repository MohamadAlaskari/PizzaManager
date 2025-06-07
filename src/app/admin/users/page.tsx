
// src/app/admin/users/page.tsx
"use client";

import { PlusCircle, Users as UsersIcon, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, type BadgeProps } from "@/components/ui/badge";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { placeholderUsers } from "@/lib/placeholder-data";
import type { User } from "@/types";
import { useState, type ChangeEvent, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialUserState: User = {
  id: "",
  role: "customer",
  email: "",
  fullName: "",
  status: "active",
  createdAt: new Date().toISOString(),
  permissions: [],
  position: "",
  contractType: "",
  salary: { type: "hourly", amount: 0, currency: "EUR" },
  workingHours: {},
  vehicleType: "",
  notes: "",
  speciality: [],
  languageSkills: [],
  phone: "",
  address: { street: "", postalCode: "", city: "" },
  orderHistory: [],
};


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(placeholderUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleTab, setSelectedRoleTab] = useState<string>("Alle");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>(JSON.parse(JSON.stringify(initialUserState)));
  const [isViewDetailModalOpen, setIsViewDetailModalOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<User | null>(null);
  const { toast } = useToast();

  const [permissionsInput, setPermissionsInput] = useState("");
  const [specialityInput, setSpecialityInput] = useState("");
  const [languageSkillsInput, setLanguageSkillsInput] = useState("");
  const [workingHoursInput, setWorkingHoursInput] = useState("");

  const userRoles = useMemo(() => {
    const roles = new Set(users.map(user => user.role));
    return ["Alle", ...Array.from(roles).sort()];
  }, [users]);


  useEffect(() => {
    if (currentUser?.permissions) setPermissionsInput(currentUser.permissions.join(', '));
    else setPermissionsInput("");

    if (currentUser?.speciality) setSpecialityInput(currentUser.speciality.join(', '));
    else setSpecialityInput("");

    if (currentUser?.languageSkills) setLanguageSkillsInput(currentUser.languageSkills.join(', '));
    else setLanguageSkillsInput("");
    
    if (currentUser?.workingHours) setWorkingHoursInput(JSON.stringify(currentUser.workingHours, null, 2));
    else setWorkingHoursInput(JSON.stringify({}, null, 2));

  }, [currentUser]);


  const filteredUsers = useMemo(() => {
    let roleFiltered = users;
    if (selectedRoleTab !== "Alle") {
      roleFiltered = users.filter(user => user.role === selectedRoleTab);
    }
    return roleFiltered.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm, selectedRoleTab]);

  const handleGenericInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentUser) return;
    const { name, value } = e.target as { name: keyof User, value: string };
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return;
    const { name, value } = e.target;
    const field = name.split('.')[1] as keyof User['address'];

    setCurrentUser(prev => {
      if (!prev) return null;
      const currentAddress = prev.address || initialUserState.address;
      return {
        ...prev,
        address: {
          ...currentAddress,
          [field]: value,
        },
      };
    });
  };

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentUser) return;
    const { name, value } = e.target;
    const field = name.split('.')[1] as keyof NonNullable<User['salary']>;

    setCurrentUser(prev => {
      if (!prev) return null;
      const currentSalary = prev.salary || initialUserState.salary;
      return {
        ...prev,
        salary: {
          ...currentSalary,
          [field]: field === 'amount' ? parseFloat(value) || 0 : value,
        },
      };
    });
  };
  
  const handleRoleChange = (value: User['role']) => {
    if (!currentUser) return;
    setCurrentUser(prev => ({ 
        ...prev, 
        role: value,
        permissions: value === 'admin' ? prev?.permissions || [] : [],
        position: value === 'employee' ? prev?.position || "" : "",
        contractType: value === 'employee' ? prev?.contractType || "" : "",
        salary: value === 'employee' ? prev?.salary || initialUserState.salary : undefined,
        workingHours: value === 'employee' ? prev?.workingHours || {} : undefined,
        vehicleType: value === 'employee' ? prev?.vehicleType || "" : "",
        notes: value === 'employee' ? prev?.notes || "" : "",
        speciality: value === 'employee' ? prev?.speciality || [] : [],
        languageSkills: value === 'employee' ? prev?.languageSkills || [] : [],
        phone: value === 'customer' ? prev?.phone || "" : "",
        address: value === 'customer' ? prev?.address || initialUserState.address : undefined,
    }));
  };

  const handleStatusChange = (value: User['status']) => {
    if(!currentUser) return;
    setCurrentUser(prev => ({ ...prev, status: value}));
  }

  const openAddModal = () => {
    const newUserScaffold = JSON.parse(JSON.stringify(initialUserState));
    delete newUserScaffold.id; 
    newUserScaffold.createdAt = new Date().toISOString();
    setCurrentUser(newUserScaffold);
    setPermissionsInput("");
    setSpecialityInput("");
    setLanguageSkillsInput("");
    setWorkingHoursInput(JSON.stringify({}, null, 2));
    setIsFormOpen(true);
  };

  const openEditModal = (user: User) => {
    const userToEdit = { ...JSON.parse(JSON.stringify(initialUserState)), ...user };
    setCurrentUser(userToEdit);
    setPermissionsInput(user.permissions?.join(', ') || "");
    setSpecialityInput(user.speciality?.join(', ') || "");
    setLanguageSkillsInput(user.languageSkills?.join(', ') || "");
    setWorkingHoursInput(JSON.stringify(user.workingHours || {}, null, 2));
    setIsFormOpen(true);
  };
  
  const openViewDetailModal = (user: User) => {
    setSelectedUserForView(user);
    setIsViewDetailModalOpen(true);
  };

 const handleSaveUser = () => {
    if (!currentUser || !currentUser.fullName || !currentUser.email || !currentUser.role || !currentUser.status) {
      toast({ title: "Fehler", description: "Bitte füllen Sie alle erforderlichen Felder aus.", variant: "destructive" });
      return;
    }

    let parsedWorkingHours = currentUser.workingHours;
    if (currentUser.role === 'employee' && workingHoursInput) {
        try {
            parsedWorkingHours = JSON.parse(workingHoursInput);
        } catch (error) {
            toast({ title: "Ungültiges JSON", description: "Das Format der Arbeitszeiten ist ungültig.", variant: "destructive" });
            return;
        }
    }
    
    const finalUserData: User = {
      ...initialUserState, 
      ...currentUser,
      id: currentUser.id || `u${(Math.random() * 10000).toFixed(0).padStart(3, '0')}`,
      createdAt: currentUser.createdAt || new Date().toISOString(),
      permissions: currentUser.role === 'admin' ? permissionsInput.split(',').map(s => s.trim()).filter(s => s) : [],
      speciality: currentUser.role === 'employee' ? specialityInput.split(',').map(s => s.trim()).filter(s => s) : [],
      languageSkills: currentUser.role === 'employee' ? languageSkillsInput.split(',').map(s => s.trim()).filter(s => s) : [],
      workingHours: currentUser.role === 'employee' ? parsedWorkingHours : undefined,
      position: currentUser.role === 'employee' ? currentUser.position : undefined,
      contractType: currentUser.role === 'employee' ? currentUser.contractType : undefined,
      salary: currentUser.role === 'employee' ? currentUser.salary : undefined,
      vehicleType: currentUser.role === 'employee' ? currentUser.vehicleType : undefined,
      notes: currentUser.role === 'employee' ? currentUser.notes : undefined,
      phone: currentUser.role === 'customer' ? currentUser.phone : undefined,
      address: currentUser.role === 'customer' ? currentUser.address : undefined,
      orderHistory: currentUser.role === 'customer' ? currentUser.orderHistory || [] : [], 
    };
  
    if (currentUser?.id) { 
      setUsers(users.map(u => u.id === finalUserData.id ? finalUserData : u));
      toast({ title: "Benutzer aktualisiert", description: `${finalUserData.fullName} wurde erfolgreich aktualisiert.` });
    } else { 
      setUsers([...users, finalUserData]);
      toast({ title: "Benutzer hinzugefügt", description: `${finalUserData.fullName} wurde erfolgreich erstellt.` });
    }
    setIsFormOpen(false);
    setCurrentUser(JSON.parse(JSON.stringify(initialUserState))); 
  };


  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({ title: "Benutzer gelöscht", description: `Der Benutzer wurde gelöscht.` });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getStatusBadgeProps = (status?: User['status']): { variant: BadgeProps['variant'], className: string } => {
    const baseClassName = "capitalize";
    switch (status) {
      case 'active':
        return { variant: 'outline', className: cn(baseClassName, 'border-green-500 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400') };
      case 'suspended':
        return { variant: 'destructive', className: baseClassName };
      case 'pending_verification':
        return { variant: 'outline', className: cn(baseClassName, 'border-yellow-500 bg-yellow-100 text-yellow-700 dark:border-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400') };
      case 'inactive':
        return { variant: 'secondary', className: baseClassName };
      default:
        return { variant: 'default', className: baseClassName };
    }
  };


  const renderDetailItem = (label: string, value?: string | string[] | number | null | Record<string, any> | any[]) => {
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === "") || (Array.isArray(value) && value.length === 0)) {
      return null;
    }
    let displayValue: React.ReactNode;
    if (Array.isArray(value)) {
      displayValue = value.join(', ');
    } else if (label === "Status" && typeof value === 'string') {
        const { variant: detailStatusVariant, className: detailStatusClassName } = getStatusBadgeProps(value as User['status']);
        displayValue = <Badge variant={detailStatusVariant} className={detailStatusClassName}>{value.replace(/_/g, ' ')}</Badge>;
    } else if (typeof value === 'object' && value !== null) {
        if(label === "Gehalt" && 'amount' in value && 'currency' in value && 'type' in value) {
            displayValue = `${(value as User['salary'])?.amount} ${(value as User['salary'])?.currency} (${(value as User['salary'])?.type})`;
        } else if (label === "Adresse" && 'street' in value && 'postalCode' in value && 'city' in value) {
            displayValue = `${(value as User['address'])?.street}, ${(value as User['address'])?.postalCode} ${(value as User['address'])?.city}`;
        } else if (label === "Bestellhistorie" && Array.isArray(value)) {
             displayValue = (
                <ul className="list-disc pl-5 mt-1 space-y-1">
                {(value as NonNullable<User['orderHistory']>).map(order => (
                    <li key={order.orderId}>
                    Bestellung {order.orderId} am {formatDate(order.date)} - Gesamt: €{order.total.toFixed(2)}
                    </li>
                ))}
                </ul>
            );
        }
         else {
            displayValue = (
                <ul className="list-disc pl-5 space-y-1">
                {Object.entries(value).map(([key, val]) => (
                    <li key={key}>
                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                    </li>
                ))}
                </ul>
            );
        }
    } else {
      displayValue = String(value);
    }
    return (
      <div>
        <Label className="font-semibold">{label}</Label>
        { (typeof value === 'object' && !Array.isArray(value) && label !== "Gehalt" && label !== "Adresse") || label === "Status" ? <div className="mt-1">{displayValue}</div> : <p className="text-sm">{displayValue}</p>}
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
          <div className="mt-4 flex flex-col gap-4">
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Tabs value={selectedRoleTab} onValueChange={setSelectedRoleTab} className="w-full">
              <TabsList className="flex flex-nowrap h-auto justify-start overflow-x-auto">
                {userRoles.map((role) => (
                  <TabsTrigger key={role} value={role} className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 capitalize">
                    {role}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
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
                {filteredUsers.map((user) => {
                  const { variant: statusVariant, className: statusClassName } = getStatusBadgeProps(user.status);
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'employee' ? 'secondary' : 'outline'} className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant} className={statusClassName}>
                          {user.status.replace(/_/g, ' ')}
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
                  );
                })}
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
                <div className="grid gap-3 py-4 text-sm">
                  {renderDetailItem("ID", selectedUserForView.id)}
                  {renderDetailItem("Vollständiger Name", selectedUserForView.fullName)}
                  {renderDetailItem("Email", selectedUserForView.email)}
                  {renderDetailItem("Rolle", selectedUserForView.role)}
                  {renderDetailItem("Status", selectedUserForView.status)}
                  {renderDetailItem("Erstellt am", formatDate(selectedUserForView.createdAt))}

                  {selectedUserForView.role === 'admin' && renderDetailItem("Berechtigungen", selectedUserForView.permissions)}

                  {selectedUserForView.role === 'employee' && (
                    <>
                      {renderDetailItem("Position", selectedUserForView.position)}
                      {renderDetailItem("Vertragstyp", selectedUserForView.contractType)}
                      {renderDetailItem("Gehalt", selectedUserForView.salary)}
                      {renderDetailItem("Arbeitszeiten", selectedUserForView.workingHours)}
                      {renderDetailItem("Fahrzeugtyp", selectedUserForView.vehicleType)}
                      {renderDetailItem("Spezialgebiet", selectedUserForView.speciality)}
                      {renderDetailItem("Sprachkenntnisse", selectedUserForView.languageSkills)}
                      {renderDetailItem("Notizen", selectedUserForView.notes)}
                    </>
                  )}

                  {selectedUserForView.role === 'customer' && (
                    <>
                      {renderDetailItem("Telefon", selectedUserForView.phone)}
                      {renderDetailItem("Adresse", selectedUserForView.address)}
                      {selectedUserForView.orderHistory && selectedUserForView.orderHistory.length > 0 && 
                        renderDetailItem("Bestellhistorie", selectedUserForView.orderHistory)
                      }
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
        <DialogContent className="sm:max-w-lg">
         <ScrollArea className="max-h-[80vh]">
           <div className="p-1"> 
            <DialogHeader>
                <DialogTitle>{currentUser?.id ? "Benutzer bearbeiten" : "Neuen Benutzer hinzufügen"}</DialogTitle>
                <DialogDescription>
                {currentUser?.id ? "Aktualisieren Sie die Benutzerdaten." : "Geben Sie die Daten für den neuen Benutzer ein."}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Vollständiger Name</Label>
                    <Input id="fullName" name="fullName" value={currentUser?.fullName || ""} onChange={handleGenericInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={currentUser?.email || ""} onChange={handleGenericInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Rolle</Label>
                    <Select name="role" value={currentUser?.role || "customer"} onValueChange={handleRoleChange}>
                        <SelectTrigger id="role"><SelectValue placeholder="Rolle auswählen" /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="employee">Mitarbeiter</SelectItem>
                        <SelectItem value="customer">Kunde</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" value={currentUser?.status || "active"} onValueChange={handleStatusChange}>
                        <SelectTrigger id="status"><SelectValue placeholder="Status auswählen" /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="active">Aktiv</SelectItem>
                        <SelectItem value="inactive">Inaktiv</SelectItem>
                        <SelectItem value="suspended">Gesperrt</SelectItem>
                        <SelectItem value="pending_verification">Verifizierung ausstehend</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {currentUser?.role === 'admin' && (
                    <div className="space-y-2">
                        <Label htmlFor="permissions">Berechtigungen (kommasepariert)</Label>
                        <Textarea id="permissions" name="permissions" value={permissionsInput} onChange={(e) => setPermissionsInput(e.target.value)} placeholder="z.B. manage_users, edit_menu" />
                    </div>
                )}

                {currentUser?.role === 'employee' && (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" value={currentUser.position || ""} onChange={handleGenericInputChange} placeholder="z.B. Fahrer, Bäcker"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contractType">Vertragstyp</Label>
                         <Input id="contractType" name="contractType" value={currentUser.contractType || ""} onChange={handleGenericInputChange} placeholder="z.B. Vollzeit, Teilzeit"/>
                    </div>
                    <fieldset className="border p-4 rounded-md space-y-2">
                        <legend className="text-sm font-medium px-1">Gehalt</legend>
                        <div className="space-y-2">
                            <Label htmlFor="salary.type">Typ</Label>
                            <Select name="salary.type" value={currentUser.salary?.type || "hourly"} onValueChange={(value) => handleSalaryChange({ target: { name: "salary.type", value } } as any)}>
                                <SelectTrigger id="salary.type"><SelectValue placeholder="Gehaltstyp" /></SelectTrigger>
                                <SelectContent>
                                <SelectItem value="hourly">Stündlich</SelectItem>
                                <SelectItem value="monthly">Monatlich</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary.amount">Betrag</Label>
                            <Input id="salary.amount" name="salary.amount" type="number" step="0.01" value={currentUser.salary?.amount || 0} onChange={handleSalaryChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary.currency">Währung</Label>
                            <Input id="salary.currency" name="salary.currency" value={currentUser.salary?.currency || "EUR"} onChange={handleSalaryChange} />
                        </div>
                    </fieldset>
                     <div className="space-y-2">
                        <Label htmlFor="workingHours">Arbeitszeiten (JSON Format)</Label>
                        <Textarea id="workingHours" name="workingHours" value={workingHoursInput} onChange={(e) => setWorkingHoursInput(e.target.value)} placeholder='z.B. {"monday": "10:00-18:00"}' className="font-mono text-xs"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vehicleType">Fahrzeugtyp</Label>
                        <Input id="vehicleType" name="vehicleType" value={currentUser.vehicleType || ""} onChange={handleGenericInputChange} placeholder="z.B. Auto, Roller"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="speciality">Spezialgebiet (kommasepariert)</Label>
                        <Textarea id="speciality" name="speciality" value={specialityInput} onChange={(e) => setSpecialityInput(e.target.value)} placeholder="z.B. Pizza, Pasta"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="languageSkills">Sprachkenntnisse (kommasepariert)</Label>
                        <Textarea id="languageSkills" name="languageSkills" value={languageSkillsInput} onChange={(e) => setLanguageSkillsInput(e.target.value)} placeholder="z.B. Deutsch, Englisch"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notizen</Label>
                        <Textarea id="notes" name="notes" value={currentUser.notes || ""} onChange={handleGenericInputChange} />
                    </div>
                    </>
                )}

                {currentUser?.role === 'customer' && (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" name="phone" value={currentUser.phone || ""} onChange={handleGenericInputChange} />
                    </div>
                    <fieldset className="border p-4 rounded-md space-y-2">
                        <legend className="text-sm font-medium px-1">Adresse</legend>
                        <div className="space-y-2">
                            <Label htmlFor="address.street">Straße</Label>
                            <Input id="address.street" name="address.street" value={currentUser.address?.street || ""} onChange={handleAddressChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address.postalCode">PLZ</Label>
                            <Input id="address.postalCode" name="address.postalCode" value={currentUser.address?.postalCode || ""} onChange={handleAddressChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address.city">Stadt</Label>
                            <Input id="address.city" name="address.city" value={currentUser.address?.city || ""} onChange={handleAddressChange} />
                        </div>
                    </fieldset>
                    </>
                )}
            </div>
            <DialogFooter className="sm:justify-end sticky bottom-0 bg-background py-4 px-6 border-t -mx-1 -mb-1">
                <DialogClose asChild>
                <Button variant="outline">Abbrechen</Button>
                </DialogClose>
                <Button onClick={handleSaveUser}>Benutzer speichern</Button>
            </DialogFooter>
           </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

