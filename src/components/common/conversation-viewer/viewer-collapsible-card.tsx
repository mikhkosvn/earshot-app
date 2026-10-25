'use client';

import { ChevronUpIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ViewerCollapsibleCardProps {
  title: string;
  description: string;
  total: number;
  children: ReactNode;
}

export function ViewerCollapsibleCard({
  title,
  description,
  total,
  children,
}: ViewerCollapsibleCardProps) {
  return (
    <Collapsible defaultOpen className="rounded-lg border bg-card">
      <div className="flex items-start justify-between gap-3 border-b px-4 py-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
          <span>{total} total</span>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Show or hide ${title}`}
                className="group"
              />
            }
          >
            <ChevronUpIcon className="rotate-180 transition-transform group-data-panel-open:rotate-0" />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="p-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}
