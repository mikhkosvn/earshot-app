'use client';

import { TagIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import type { DashboardBoardState } from '../../_utils/board-types';
import { MetadataFilterCount } from './metadata-filter-count';
import { MetadataFilterForm } from './metadata-filter-form';

interface MetadataFilterPopoverProps {
  board: DashboardBoardState;
}

export function MetadataFilterPopover({ board }: MetadataFilterPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="text-xs" />}
      >
        <TagIcon />
        Metadata
        <MetadataFilterCount count={board.draft.filters.metadata.length} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 gap-3 p-3">
        <MetadataFilterForm board={board} onApplied={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
