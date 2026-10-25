'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

import { ManualConfigFields } from './manual-config-fields';

type AdditionalConfigurationProps = {
  isManual: boolean;
  onManualChange: (isManual: boolean) => void;
};

export function AdditionalConfiguration({
  isManual,
  onManualChange,
}: AdditionalConfigurationProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Additional Configuration</span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-pressed={isManual}
            className={cn(isManual && 'bg-muted')}
            onClick={() => {
              onManualChange(!isManual);
              setOpen(true);
            }}
          >
            Enter Manually
          </Button>
          <CollapsibleTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Show additional configuration"
              />
            }
          >
            <ChevronDownIcon
              className={cn('transition-transform', isOpen && 'rotate-180')}
            />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="pt-3">
        <fieldset
          disabled={!isManual}
          className="flex flex-col gap-4 disabled:opacity-60"
        >
          <ManualConfigFields />
        </fieldset>
      </CollapsibleContent>
    </Collapsible>
  );
}
