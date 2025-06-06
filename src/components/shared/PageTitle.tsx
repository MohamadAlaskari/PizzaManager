import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  icon?: LucideIcon;
  description?: string;
  actions?: ReactNode;
}

export function PageTitle({ title, icon: Icon, description, actions }: PageTitleProps) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-7 w-7 text-primary" />}
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            {title}
          </h1>
        </div>
        {actions && <div className="mt-4 md:mt-0">{actions}</div>}
      </div>
      {description && (
        <p className="mt-2 text-muted-foreground text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
