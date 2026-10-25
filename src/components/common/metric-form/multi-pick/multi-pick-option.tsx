'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CommandItem } from '@/components/ui/command';

type MultiPickOptionProps = {
  value: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export function MultiPickOption({
  value,
  label,
  checked,
  onToggle,
}: MultiPickOptionProps) {
  return (
    <CommandItem
      value={value}
      aria-checked={checked}
      className="[&>svg:last-child]:hidden"
      onSelect={onToggle}
    >
      <Checkbox
        checked={checked}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none"
      />
      <span className="truncate">{label}</span>
    </CommandItem>
  );
}
