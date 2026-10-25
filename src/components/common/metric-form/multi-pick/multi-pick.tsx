'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { MultiPickChips } from './multi-pick-chips';
import { MultiPickClear } from './multi-pick-clear';
import { MultiPickList } from './multi-pick-list';
import { MultiPickPlaceholder } from './multi-pick-placeholder';
import type { MultiPickItem } from './multi-pick-types';

type MultiPickProps = {
  id?: string;
  label: string;
  placeholder: string;
  items: MultiPickItem[];
  value: number[];
  onValueChange: (value: number[]) => void;
  invalid?: boolean;
  disabled?: boolean;
};

export function MultiPick({
  id,
  label,
  placeholder,
  items,
  value,
  onValueChange,
  invalid,
  disabled,
}: MultiPickProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div
        aria-invalid={invalid}
        className="relative flex min-h-9 w-full flex-wrap items-center gap-1 rounded-lg border border-input py-1 pr-16 pl-1 aria-invalid:border-destructive dark:bg-input/30"
      >
        <MultiPickChips
          items={items}
          value={value}
          disabled={disabled}
          onValueChange={onValueChange}
        />
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="unstyled"
              size="unstyled"
              aria-label={label}
              disabled={disabled}
              className="h-7 min-w-16 flex-1 justify-start px-1.5 text-sm font-normal text-muted-foreground"
            />
          }
        >
          <MultiPickPlaceholder
            count={value.length}
            placeholder={placeholder}
          />
        </PopoverTrigger>
        <MultiPickClear
          label={label}
          count={value.length}
          disabled={disabled}
          onClear={() => onValueChange([])}
        />
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <PopoverContent align="start" className="w-80 p-0">
        <MultiPickList
          items={items}
          value={value}
          onValueChange={onValueChange}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
