// src/components/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Pizza,
  ListOrdered,
  FileText,
  Brain,
  Settings,
  ChevronDown,
  ChevronUp,
  Package,
  CookingPot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Products", icon: Pizza },
  { href: "/admin/orders", label: "Orders", icon: ListOrdered },
  {
    label: "AI Tools",
    icon: Brain,
    subItems: [
      { href: "/admin/reports/ingredients", label: "Ingredients Report", icon: FileText },
      { href: "/admin/procurement/predict-demand", label: "Demand Prediction", icon: Package },
    ],
  },
  // { href: "/admin/settings", label: "Settings", icon: Settings }, // Example for future
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({ "AI Tools": true });

  const toggleCollapsible = (label: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="bg-sidebar text-sidebar-foreground w-64 min-h-screen flex flex-col border-r border-sidebar-border shadow-lg">
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <CookingPot className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-sidebar-foreground">PizzaManager</h1>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-1">
          {navItems.map((item) =>
            item.subItems ? (
              <Collapsible key={item.label} open={openCollapsibles[item.label]} onOpenChange={() => toggleCollapsible(item.label)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-base h-12 px-3",
                      item.subItems.some(sub => pathname.startsWith(sub.href)) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/80"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                    {openCollapsibles[item.label] ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href} legacyBehavior passHref>
                      <a
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          pathname === subItem.href
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <subItem.icon className="h-4 w-4" />
                        {subItem.label}
                      </a>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link key={item.href} href={item.href} legacyBehavior passHref>
                <a
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              </Link>
            )
          )}
        </nav>
      </ScrollArea>
      <div className="p-4 mt-auto border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-base hover:bg-sidebar-accent/80">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
      </div>
    </aside>
  );
}
