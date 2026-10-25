'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';

import { MultiPickOption } from './multi-pick-option';
import type { MultiPickItem } from './multi-pick-types';

type MultiPickListProps = {
  items: MultiPickItem[];
  value: number[];
  onValueChange: (value: number[]) => void;
  onClose: () => void;
};

const SELECT_ALL_VALUE = '(Select All)';

export function MultiPickList({
  items,
  value,
  onValueChange,
  onClose,
}: MultiPickListProps) {
  const isAllChecked =
    items.length > 0 && items.every((item) => value.includes(item.value));

  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <MultiPickOption
          value={SELECT_ALL_VALUE}
          label={SELECT_ALL_VALUE}
          checked={isAllChecked}
          onToggle={() => {
            if (isAllChecked) {
              onValueChange([]);
              return;
            }
            onValueChange(items.map((item) => item.value));
          }}
        />
        {items.map((item) => (
          <MultiPickOption
            key={item.value}
            value={`${item.value} ${item.label}`}
            label={item.label}
            checked={value.includes(item.value)}
            onToggle={() => {
              if (value.includes(item.value)) {
                onValueChange(value.filter((id) => id !== item.value));
                return;
              }
              onValueChange([...value, item.value]);
            }}
          />
        ))}
      </CommandList>
      <div className="grid grid-cols-2 border-t">
        <Button
          type="button"
          variant="ghost"
          className="rounded-none"
          onClick={() => onValueChange([])}
        >
          Clear
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="rounded-none border-l"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Command>
  );
}
