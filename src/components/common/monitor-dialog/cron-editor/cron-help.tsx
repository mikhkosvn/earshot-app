'use client';

import { CircleHelpIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { CRON_HELP_SECTIONS } from '../_constants/cron-help';

const CRON_HELP_ITEM_VALUE = 'cron-help';

export function CronHelp() {
  return (
    <Accordion className="rounded-lg border bg-background">
      <AccordionItem value={CRON_HELP_ITEM_VALUE}>
        <AccordionTrigger className="h-8 items-center px-2.5 py-0 hover:bg-muted hover:no-underline">
          <span className="flex items-center gap-2">
            <CircleHelpIcon className="size-4" />
            Need Help?
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 border-t p-3 [&_p:not(:last-child)]:mb-0">
          {CRON_HELP_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              <h5 className="text-xs font-semibold">{section.title}</h5>
              {section.lines.map((line) => (
                <p key={line} className="text-xs text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
