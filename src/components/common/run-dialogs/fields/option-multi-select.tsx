'use client';

import { ChevronDownIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { MultiSelectChips } from './multi-select-chips';

export type MultiSelectOption<TValue extends string | number> = {
  value: TValue;
  label: string;
};

type OptionMultiSelectProps<TValue extends string | number> = {
  id?: string;
  options: MultiSelectOption<TValue>[];
  value: TValue[];
  onValueChange: (value: TValue[]) => void;
  placeholder: string;
};

const toggle = <TValue,>(values: TValue[], value: TValue) => {
  if (values.includes(value)) return values.filter((item) => item !== value);
  return [...values, value];
};

const toggleAll = <TValue extends string | number>(
  options: MultiSelectOption<TValue>[],
  allSelected: boolean,
) => {
  if (allSelected) return [];
  return options.map((option) => option.value);
};

export function OptionMultiSelect<TValue extends string | number>({
  id,
  options,
  value,
  onValueChange,
  placeholder,
}: OptionMultiSelectProps<TValue>) {
  const [isOpen, setOpen] = useState(false);
  const allSelected = options.length > 0 && value.length === options.length;
  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  return (
    <div className="flex w-full items-center gap-1 rounded-lg border bg-background pr-1">
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="unstyled"
              size="unstyled"
              className="min-h-8 min-w-0 flex-1 justify-between gap-2 px-2 py-1 text-left text-sm font-normal"
            />
          }
        >
          <MultiSelectChips labels={selectedLabels} placeholder={placeholder} />
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Options">
                <CommandItem
                  value="(Select All)"
                  data-checked={allSelected}
                  onSelect={() =>
                    onValueChange(toggleAll(options, allSelected))
                  }
                >
                  (Select All)
                </CommandItem>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={`${option.label} ${option.value}`}
                    data-checked={value.includes(option.value)}
                    onSelect={() => onValueChange(toggle(value, option.value))}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex justify-between border-t p-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onValueChange([])}
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Clear selection"
        disabled={value.length === 0}
        onClick={() => onValueChange([])}
      >
        <XIcon />
      </Button>
    </div>
  );
}
