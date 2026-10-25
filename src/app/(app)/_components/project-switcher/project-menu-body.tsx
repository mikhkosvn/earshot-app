'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { MenuSearchInput } from '@/app/(app)/_components/menu-search-input';
import { ProjectDialog } from '@/app/(app)/_constants/project-dialog';
import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { ShellService } from '@/app/(app)/_service';
import { filterByName } from '@/app/(app)/_utils/filter-by-name';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { ProjectMenuRow } from './project-menu-row';

interface ProjectMenuBodyProps {
  onOpenDialog: (dialog: ProjectDialog) => void;
}

export function ProjectMenuBody({ onOpenDialog }: ProjectMenuBodyProps) {
  const [query, setQuery] = useState('');
  const project = useCurrentProject();
  const { data: projects } = useSuspenseQuery(
    ShellService.getProjectsQuery({ organizationId: project.organizationId }),
  );

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xs font-semibold text-foreground">
          Projects
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <MenuSearchInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search projects..."
      />
      <DropdownMenuSeparator />
      <div className="flex max-h-50 flex-col gap-1 overflow-y-auto">
        {filterByName(projects, query).map((item) => (
          <ProjectMenuRow key={item.id} project={item} />
        ))}
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="text-xs"
        onClick={() => onOpenDialog(ProjectDialog.create)}
      >
        <PlusIcon />
        Create Project
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-xs"
        onClick={() => onOpenDialog(ProjectDialog.edit)}
      >
        <PencilIcon />
        Edit Project
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        className="text-xs"
        onClick={() => onOpenDialog(ProjectDialog.delete)}
      >
        <Trash2Icon />
        Delete Project
      </DropdownMenuItem>
    </>
  );
}
