'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { AccountMenuHeader } from './account-menu-header';
import { AccountMenuTrigger } from './account-menu-trigger';
import { SignOutMenuItem } from './sign-out-menu-item';
import { ThemeSubmenu } from './theme-submenu';

export function AccountMenu() {
  return (
    <DropdownMenu>
      <AccountMenuTrigger />
      <DropdownMenuContent align="end" className="w-48">
        <AccountMenuHeader />
        <DropdownMenuSeparator />
        <ThemeSubmenu />
        <SignOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
