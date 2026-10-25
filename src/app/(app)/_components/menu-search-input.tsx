'use client';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

const MENU_CONTROL_KEYS = ['Escape', 'Tab', 'ArrowDown', 'ArrowUp'];

interface MenuSearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

export function MenuSearchInput({
  value,
  onValueChange,
  placeholder,
}: MenuSearchInputProps) {
  return (
    <div className="flex items-center gap-2 px-2">
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-7 border-none bg-transparent px-0 text-xs shadow-none focus-visible:ring-0 md:text-xs dark:bg-transparent"
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          if (MENU_CONTROL_KEYS.includes(event.key)) return;
          event.stopPropagation();
        }}
      />
    </div>
  );
}
