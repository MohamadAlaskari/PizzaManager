
import type { PropsWithChildren } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebarContent } from '@/components/layout/AdminSidebarContent';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background"> {/* Added w-full here */}
        <Sidebar
            collapsible="icon"
            className="hidden md:flex border-r border-sidebar-border"
            variant="sidebar"
        >
          <AdminSidebarContent />
        </Sidebar>

        {/* Right Section Wrapper */}
        <div className="flex flex-1 flex-col overflow-hidden"> {/* Ensures this container takes remaining width and handles overflow */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
            {/* Mobile Trigger */}
            <SidebarTrigger asChild>
              <Button size="icon" variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SidebarTrigger>
            <div className="font-semibold">PizzaManager</div>
          </header>

          {/* This inner div will handle the scrolling for main content and footer */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <main className="flex-grow p-6 lg:p-8">
              {children}
            </main>
            <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border mt-auto">
            © 2025 <a href="https://www.alaskaritech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AlaskariTech</a>. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
