'use client';

import { FilterIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { AlertRow } from '@/server/alerts/types';

import { AlertFilterForm } from './alert-filter-form';
import { AlertFilterLabel } from './alert-filter-label';

type AlertFilterButtonProps = {
  alert: AlertRow;
};

export function AlertFilterButton({ alert }: AlertFilterButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="text-xs" />}
      >
        <FilterIcon />
        <AlertFilterLabel filters={alert.filters} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 gap-3">
        <PopoverHeader>
          <PopoverTitle className="text-sm">Alert filter</PopoverTitle>
          <PopoverDescription className="text-xs">
            The alert checks only the calls that match every filter.
          </PopoverDescription>
        </PopoverHeader>
        <AlertFilterForm alert={alert} onSaved={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
