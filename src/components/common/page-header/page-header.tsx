import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { PageHeaderDescription } from './page-header-description';

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      <PageHeaderDescription description={description} />
    </div>
  );
}
