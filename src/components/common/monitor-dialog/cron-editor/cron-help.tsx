'use client';

import { ChevronDownIcon, CircleHelpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { CRON_HELP_SECTIONS } from '../_constants/cron-help';

export function CronHelp() {
  return (
    <Collapsible className="rounded-lg border bg-background">
      <h4>
        <CollapsibleTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              className="group w-full justify-between font-medium"
            />
          }
        >
          <span className="flex items-center gap-2">
            <CircleHelpIcon />
            Need Help?
          </span>
          <ChevronDownIcon className="transition-transform group-data-panel-open:rotate-180" />
        </CollapsibleTrigger>
      </h4>
      <CollapsibleContent className="flex flex-col gap-3 border-t p-3">
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
      </CollapsibleContent>
    </Collapsible>
  );
}
