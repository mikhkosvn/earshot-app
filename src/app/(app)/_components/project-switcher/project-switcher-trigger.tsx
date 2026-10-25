'use client';

import { ChevronsUpDownIcon } from 'lucide-react';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { ProjectIdBadge } from './project-id-badge';

export function ProjectSwitcherTrigger() {
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
      <ProjectIdBadge projectId={project.id} />
      <span className="max-w-60 truncate">{project.name}</span>
      <ChevronsUpDownIcon className="size-3 text-muted-foreground" />
    </DropdownMenuTrigger>
  );
}
