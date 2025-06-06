
import type { PropsWithChildren } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebarContent } from '@/components/layout/AdminSidebarContent';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen={false}> {/* Set to false for initially collapsed on desktop if preferred */}
      <div className="flex min-h-screen bg-background">
        <Sidebar 
            collapsible="icon" 
            className="hidden md:flex border-r border-sidebar-border" // Hidden on mobile by default, flex on md+
            variant="sidebar" // Standard sidebar variant
        >
          <AdminSidebarContent />
        </Sidebar>
        
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
            {/* Mobile Trigger */}
            <SidebarTrigger asChild>
              <Button size="icon" variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SidebarTrigger>
            {/* You can add a mobile page title or breadcrumbs here if needed */}
            <div className="font-semibold">PizzaManager</div>
          </header>

          <SidebarInset className="flex flex-1 flex-col"> {/* Manages padding/margin for main content area */}
            <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
              {children}
            </main>
            <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border mt-auto">
              developed bei <a href="https://www.alaskaritech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AlaskariTech</a> alle recht vorhanden
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
