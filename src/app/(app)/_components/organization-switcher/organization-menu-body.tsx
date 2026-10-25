'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { MenuSearchInput } from '@/app/(app)/_components/menu-search-input';
import { ShellService } from '@/app/(app)/_service';
import { filterByName } from '@/app/(app)/_utils/filter-by-name';
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { OrganizationMenuRow } from './organization-menu-row';

export function OrganizationMenuBody() {
  const [query, setQuery] = useState('');
  const { data: organizations } = useSuspenseQuery(
    ShellService.getOrganizationsQuery(),
  );

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xs font-semibold text-foreground">
          Organizations
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <MenuSearchInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search organizations..."
      />
      <DropdownMenuSeparator />
      <div className="flex max-h-50 flex-col gap-1 overflow-y-auto">
        {filterByName(organizations, query).map((organization) => (
          <OrganizationMenuRow
            key={organization.id}
            organization={organization}
          />
        ))}
      </div>
    </>
  );
}
