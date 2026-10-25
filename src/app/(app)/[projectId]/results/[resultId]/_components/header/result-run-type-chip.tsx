'use client';

import { InfoIcon, PhoneIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ResultRunTypeLabel } from '@/server/results/constants/result-list';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { HeaderChip } from './header-chip';
import { RunDetailsSummary } from './run-details-summary';

export function ResultRunTypeChip() {
  const result = useResultDetail();

  return (
    <HeaderChip>
      <PhoneIcon className="text-muted-foreground" />
      <span>{ResultRunTypeLabel[result.runType]}</span>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="View run details"
            />
          }
        >
          <InfoIcon />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 text-xs">
          <RunDetailsSummary />
        </PopoverContent>
      </Popover>
    </HeaderChip>
  );
}
