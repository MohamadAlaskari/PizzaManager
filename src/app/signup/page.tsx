
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
import { CookingPot, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Fehler bei der Registrierung",
        description: "Die Passwörter stimmen nicht überein.",
        variant: "destructive",
      });
      return;
    }
    if (!fullName || !email || !password) {
      toast({
        title: "Fehler bei der Registrierung",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
        variant: "destructive",
      });
      return;
    }

    // Simulate user creation
    const newUser = {
      id: `u${Date.now().toString().slice(-4)}`, // Simple unique ID for prototype
      role: "customer", // Default role
      email,
      fullName,
      status: "pending_verification", // Default status
      createdAt: new Date().toISOString(),
      // passwordHash would be created and stored securely on a backend
    };

    console.log("New user created (simulated):", newUser);
    toast({
      title: "Registrierung erfolgreich!",
      description: "Sie werden zur Login-Seite weitergeleitet.",
    });

    // In a real app, you'd make an API call here.
    // For prototype, redirect to login.
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex flex-col items-center">
            <CookingPot className="h-12 w-12 text-primary" />
            <UserPlus className="h-8 w-8 text-muted-foreground -mt-2" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">PizzaManager</CardTitle>
          <CardDescription>Neues Konto erstellen</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="fullName">Vollständiger Name</Label>
              <Input 
                id="fullName" 
                type="text" 
                placeholder="Max Mustermann" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
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
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full text-lg py-6">
              Registrieren
            </Button>
            <p className="text-sm text-muted-foreground">
              Sie haben bereits ein Konto?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Hier einloggen
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
