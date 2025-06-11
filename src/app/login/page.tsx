
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CookingPot } from "lucide-react"; // LogInIcon removed
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { placeholderUsers } from "@/lib/placeholder-data"; // For simulated auth

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("admin@pizzaladen.de"); // Pre-fill for demo
  const [password, setPassword] = useState("password123"); // Pre-fill for demo (INSECURE)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate authentication against placeholderUsers
    // In a real app, this would be an API call to your backend.
    // IMPORTANT: Comparing passwords directly like this is INSECURE.
    // This is only for frontend prototyping purposes.
    const foundUser = placeholderUsers.find(
      (user) => user.email === email 
      // && user.passwordHash === password // In a real app, compare hashed passwords securely on the backend
    );

    // For prototype, we'll assume if admin email is used, password matches
    const isAdminDemoLogin = email === "admin@pizzaladen.de" && password.length > 0;


    if (isAdminDemoLogin || (foundUser && password.length > 0 /* simplified check */) ) {
      toast({
        title: "Login erfolgreich!",
        description: "Sie werden zum Dashboard weitergeleitet.",
      });
      // Simulate setting an auth token or session
      // localStorage.setItem("authToken", "dummy_token_for_prototype"); 
      router.push("/admin/dashboard");
    } else {
      toast({
        title: "Login fehlgeschlagen",
        description: "Ungültige E-Mail-Adresse oder falsches Passwort.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex flex-col items-center">
            <CookingPot className="h-12 w-12 text-primary" />
            {/* <LogInIcon className="h-8 w-8 text-muted-foreground -mt-2" /> Removed */}
          </div>
          <CardTitle className="text-3xl font-bold font-headline">PizzaManager</CardTitle>
          <CardDescription>Admin Panel Login</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Passwort</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full text-lg py-6">
              Log In
            </Button>
            <p className="text-sm text-muted-foreground">
              Noch kein Konto?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Hier registrieren
              </Link>
            </p>
             <p className="text-xs text-muted-foreground pt-2">
              (Demo: admin@pizzaladen.de / beliebiges Passwort)
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

