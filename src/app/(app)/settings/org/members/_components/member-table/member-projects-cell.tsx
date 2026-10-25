'use client';

import { ChevronDownIcon, FolderIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { MemberRow } from '@/server/members/types';

import { useOrganizationSettings } from '../../../_hooks/use-organization-settings';

type MemberProjectsCellProps = {
  member: MemberRow;
};

export function MemberProjectsCell({ member }: MemberProjectsCellProps) {
  const { projects } = useOrganizationSettings();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={`Show projects for ${member.email}`}
            className="font-normal"
          />
        }
      >
        All projects
        <ChevronDownIcon />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 gap-1 p-2">
        <p className="px-1 pb-1 text-xs text-muted-foreground">
          This person can open every project of the organization.
        </p>
        <ul className="flex flex-col">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center gap-2 rounded-sm p-1 text-sm"
            >
              <FolderIcon className="size-3.5 text-muted-foreground" />
              <span className="truncate">{project.name}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
