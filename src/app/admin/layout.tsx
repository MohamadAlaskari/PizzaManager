import type { PropsWithChildren } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      {/* This div is the main content column, offset from the sidebar. It handles height and scrolling. */}
      <div className="ml-64 h-screen overflow-y-auto flex flex-col">
        <main className="flex-grow p-6 lg:p-8">
          {children}
        </main>
        <footer className="text-center text-xs text-muted-foreground py-4">
          developed bei <a href="https://www.alaskaritech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AlaskariTech</a> alle recht vorhanden
        </footer>
      </div>
    </div>
  );
}
