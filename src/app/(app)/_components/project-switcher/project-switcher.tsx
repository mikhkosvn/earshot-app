'use client';

import { useState } from 'react';

import { ProjectDialog } from '@/app/(app)/_constants/project-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { CreateProjectDialog } from './create-project/create-project-dialog';
import { DeleteProjectDialog } from './delete-project-dialog';
import { EditProjectDialog } from './edit-project/edit-project-dialog';
import { ProjectMenuBody } from './project-menu-body';
import { ProjectSwitcherTrigger } from './project-switcher-trigger';

export function ProjectSwitcher() {
  const [openDialog, setOpenDialog] = useState<ProjectDialog | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpenDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <ProjectSwitcherTrigger />
        <DropdownMenuContent align="start" className="w-60">
          <ProjectMenuBody onOpenDialog={setOpenDialog} />
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateProjectDialog
        open={openDialog === ProjectDialog.create}
        onOpenChange={handleOpenChange}
      />
      <EditProjectDialog
        open={openDialog === ProjectDialog.edit}
        onOpenChange={handleOpenChange}
      />
      <DeleteProjectDialog
        open={openDialog === ProjectDialog.delete}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
