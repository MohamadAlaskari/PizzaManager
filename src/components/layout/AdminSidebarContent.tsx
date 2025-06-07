
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
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
  SidebarMenuSubItem, // Added import
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

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
];

export function AdminSidebarContent() {
  const pathname = usePathname();
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({ "AI Tools": false }); // Changed true to false
  const { state: sidebarState, isMobile } = useSidebar();

  const toggleCollapsible = (label: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [label]: !prev[label] }));
  };
  
  useEffect(() => {
    if (sidebarState === 'collapsed' && !isMobile) {
      // Optionally close all collapsibles when sidebar collapses to icon mode on desktop
      // setOpenCollapsibles(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    }
  }, [sidebarState, isMobile]);


  return (
    <>
      <SidebarHeader className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2 overflow-hidden">
          <CookingPot className="h-8 w-8 text-primary flex-shrink-0" />
          {sidebarState === 'expanded' && (
            <h1 className="text-2xl font-bold font-headline text-sidebar-foreground whitespace-nowrap">PizzaManager</h1>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) =>
            item.subItems ? (
              <SidebarMenuItem key={item.label} className="relative">
                <SidebarMenuButton
                  onClick={() => {
                     if (sidebarState === 'expanded') toggleCollapsible(item.label);
                  }}
                  className="justify-between w-full"
                  isActive={item.subItems.some(sub => pathname.startsWith(sub.href))}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {sidebarState === 'expanded' && (openCollapsibles[item.label] ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />)}
                </SidebarMenuButton>
                {/* Sub-menu is always rendered for tooltips in icon mode, but items only visible if expanded */}
                {openCollapsibles[item.label] && sidebarState === 'expanded' && (
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.href}>
                        <SidebarMenuSubButton
                          href={subItem.href}
                          asChild
                          isActive={pathname === subItem.href}
                        >
                          <Link href={subItem.href} className="flex items-center gap-2 pl-3 overflow-hidden"> {/* Added pl-3 for indentation */}
                            <subItem.icon className="h-4 w-4 flex-shrink-0" />
                             <span className="whitespace-nowrap">{subItem.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  href={item.href}
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <Link href={item.href} className="flex items-center gap-2 overflow-hidden">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                     <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="#" /* TODO: Link to actual settings page */
              asChild 
              tooltip={{ children: "Settings", side: "right", align: "center" }}
            >
              <Link href="#" className="flex items-center gap-2 overflow-hidden">
                <Settings className="h-5 w-5 flex-shrink-0" />
                 <span className="whitespace-nowrap">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
