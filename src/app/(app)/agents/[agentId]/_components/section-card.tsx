'use client';

import { ChevronDownIcon, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { SectionIcon } from './section-icon';

type SectionCardProps = {
  icon?: LucideIcon;
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  children: ReactNode;
};

export function SectionCard({
  icon,
  title,
  subtitle,
  defaultOpen = false,
  onOpen,
  children,
}: SectionCardProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      onOpenChange={(open) => {
        if (open) onOpen?.();
      }}
      className="rounded-xl border bg-background"
    >
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="unstyled"
            size="unstyled"
            className="group flex w-full items-center gap-3 p-3 text-left whitespace-normal"
          />
        }
      >
        <SectionIcon icon={icon} />
        <span className="flex flex-1 flex-col">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {subtitle}
          </span>
        </span>
        <ChevronDownIcon className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-3 border-t p-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
