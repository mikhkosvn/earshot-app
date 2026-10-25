'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { OrganizationMenuBody } from './organization-menu-body';
import { OrganizationSwitcherTrigger } from './organization-switcher-trigger';

export function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <OrganizationSwitcherTrigger />
      <DropdownMenuContent align="start" className="w-60">
        <OrganizationMenuBody />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
