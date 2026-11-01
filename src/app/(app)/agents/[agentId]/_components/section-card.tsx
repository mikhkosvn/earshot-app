'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { SectionIcon } from './section-icon';

const SECTION_ITEM_VALUE = 'section';

interface SectionCardProps {
  icon?: LucideIcon;
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  children: ReactNode;
}

const openItemsOf = (defaultOpen: boolean) => {
  if (defaultOpen) return [SECTION_ITEM_VALUE];
  return [];
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
    <Accordion
      defaultValue={openItemsOf(defaultOpen)}
      onValueChange={(value) => {
        if (value.includes(SECTION_ITEM_VALUE)) onOpen?.();
      }}
      className="rounded-xl border bg-background"
    >
      <AccordionItem value={SECTION_ITEM_VALUE}>
        <AccordionTrigger className="items-center gap-3 p-3 hover:no-underline">
          <SectionIcon icon={icon} />
          <span className="flex flex-1 flex-col">
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {subtitle}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 border-t p-3">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
