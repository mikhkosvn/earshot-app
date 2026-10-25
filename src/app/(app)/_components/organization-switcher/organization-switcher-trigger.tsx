'use client';

import { BuildingIcon, ChevronsUpDownIcon } from 'lucide-react';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function OrganizationSwitcherTrigger() {
  const project = useCurrentProject();

  return (
    <DropdownMenuTrigger
      render={
        <Button
          variant="ghost"
          size="unstyled"
          className="gap-2 rounded-sm px-1 py-1.5 text-xs font-normal"
        />
      }
    >
      <span className="flex size-5 items-center justify-center rounded-sm border bg-muted text-muted-foreground">
        <BuildingIcon className="size-3.5" />
      </span>
      <span className="max-w-48 truncate">{project.organization.name}</span>
      <ChevronsUpDownIcon className="size-3 text-muted-foreground" />
    </DropdownMenuTrigger>
  );
}
