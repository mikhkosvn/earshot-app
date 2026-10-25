'use client';

import { PaletteIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { THEME_OPTIONS } from '@/app/(app)/_constants/theme-mode';
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeSubmenu() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="text-xs">
        <PaletteIcon />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {THEME_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="text-xs"
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
