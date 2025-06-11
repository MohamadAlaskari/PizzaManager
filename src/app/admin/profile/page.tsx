
// src/app/admin/profile/page.tsx
"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <PageTitle title="My Profile" icon={UserCircle} description="View and manage your profile details." />
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Your personal details and account settings will be displayed here.</p>
            {/* Placeholder for profile form or data display */}
            <div className="mt-6 space-y-4">
                <div>
                    <h3 className="font-semibold">Name:</h3>
                    <p>Mario Rossi (Placeholder)</p>
                </div>
                <div>
                    <h3 className="font-semibold">Email:</h3>
                    <p>admin@pizzaladen.de (Placeholder)</p>
                </div>
                <div>
                    <h3 className="font-semibold">Role:</h3>
                    <p>Admin (Placeholder)</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
