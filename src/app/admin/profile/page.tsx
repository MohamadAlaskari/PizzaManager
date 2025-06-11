
// src/app/admin/profile/page.tsx
"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Edit3, KeyRound } from "lucide-react";
import { placeholderUsers } from "@/lib/placeholder-data";
import type { User } from "@/types";
import { format } from 'date-fns'; // For consistent date formatting

export default function ProfilePage() {
  // For this prototype, we'll just find the admin user.
  // In a real app, this would come from an authentication context.
  const adminUser = placeholderUsers.find(user => user.id === "u001") as User | undefined;

  if (!adminUser) {
    return (
      <>
        <PageTitle title="My Profile" icon={UserCircle} description="View and manage your profile details." />
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">Admin user data not found.</p>
          </CardContent>
        </Card>
      </>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd.MM.yyyy');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <>
      <PageTitle title="My Profile" icon={UserCircle} description="View and manage your profile details." />
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Details Card */}
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/128x128.png" alt={adminUser.fullName} data-ai-hint="person avatar" />
              <AvatarFallback>{adminUser.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{adminUser.fullName}</CardTitle>
              <CardDescription className="text-md">{adminUser.role.charAt(0).toUpperCase() + adminUser.role.slice(1)}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Full Name:</span>
                  <span className="font-medium">{adminUser.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{adminUser.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium">{adminUser.role.charAt(0).toUpperCase() + adminUser.role.slice(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{adminUser.status.charAt(0).toUpperCase() + adminUser.status.slice(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="font-medium">{formatDate(adminUser.createdAt)}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                <Button variant="outline" className="w-full md:w-auto" disabled>
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile (Not Implemented)
                </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="mr-2 h-5 w-5 text-primary" /> Change Password
            </CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" disabled />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" disabled />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input id="confirmNewPassword" type="password" placeholder="••••••••" disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>Update Password (Not Implemented)</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
