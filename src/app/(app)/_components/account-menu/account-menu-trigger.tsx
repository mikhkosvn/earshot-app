'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';

import { UserAvatar } from '@/app/(app)/_components/user-avatar';
import { ShellService } from '@/app/(app)/_service';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function AccountMenuTrigger() {
  const { data: user } = useSuspenseQuery(ShellService.getCurrentUserQuery());

  return (
    <DropdownMenuTrigger
      render={
        <Button
          variant="unstyled"
          size="unstyled"
          aria-label="Account menu"
          className="h-10 gap-3 border-none p-0"
        />
      }
    >
      <span className="hidden text-sm font-medium md:block">{user.email}</span>
      <UserAvatar />
      <ChevronDownIcon className="size-4 text-muted-foreground" />
    </DropdownMenuTrigger>
  );
}
