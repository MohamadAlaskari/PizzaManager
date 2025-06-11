
// src/app/admin/settings/page.tsx
"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react"; // Renamed to avoid conflict with component

export default function SettingsPage() {
  return (
    <>
      <PageTitle title="Application Settings" icon={SettingsIcon} description="Manage global application preferences." />
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Application settings and customization options will be available here.</p>
            {/* Placeholder for settings controls */}
            <div className="mt-6 space-y-4">
                <div>
                    <h3 className="font-semibold">Theme:</h3>
                    <p>Light (Placeholder)</p>
                </div>
                <div>
                    <h3 className="font-semibold">Notifications:</h3>
                    <p>Enabled (Placeholder)</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
