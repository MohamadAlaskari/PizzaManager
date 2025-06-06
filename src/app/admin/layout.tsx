import type { PropsWithChildren } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <footer className="text-center text-xs text-muted-foreground py-4 mt-auto">
          developed bei <a href="https://www.alaskaritech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AlaskariTech</a> alle recht vorhanden
        </footer>
      </main>
    </div>
  );
}
