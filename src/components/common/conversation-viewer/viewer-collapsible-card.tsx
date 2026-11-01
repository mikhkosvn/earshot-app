'use client';

import type { ReactNode } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const VIEWER_CARD_ITEM_VALUE = 'viewer-card';

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
    <Accordion
      defaultValue={[VIEWER_CARD_ITEM_VALUE]}
      className="rounded-lg border bg-card"
    >
      <AccordionItem value={VIEWER_CARD_ITEM_VALUE}>
        <AccordionTrigger className="items-start gap-3 px-4 py-3 hover:no-underline">
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {description}
            </span>
          </span>
          <span className="shrink-0 text-xs font-normal text-muted-foreground">
            {total} total
          </span>
        </AccordionTrigger>
        <AccordionContent className="border-t p-4 [&_p:not(:last-child)]:mb-0">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
