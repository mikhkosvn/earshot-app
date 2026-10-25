'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

export function AccountMenuHeader() {
  const { data: user } = useSuspenseQuery(ShellService.getCurrentUserQuery());

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="flex flex-col gap-0.5">
        <span className="truncate text-xs font-semibold text-foreground">
          {user.email}
        </span>
        <span className="text-xs font-normal text-muted-foreground">
          User Account
        </span>
      </DropdownMenuLabel>
    </DropdownMenuGroup>
  );
}
