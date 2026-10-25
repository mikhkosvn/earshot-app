'use client';

import {
  ActivityIcon,
  CopyIcon,
  FolderInputIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  TagIcon,
} from 'lucide-react';
import { useState } from 'react';

import { CreateMonitorDialog } from '@/components/common/monitor-dialog/create-monitor-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { EvaluatorActionDialog } from '../../../_constants/evaluator-action-dialog';
import { AddTagsDialog } from '../../actions/add-tags-dialog';
import { DuplicateEvaluatorsDialog } from '../../actions/duplicate-evaluators-dialog';
import { ModifyScenariosDialog } from '../../actions/modify/modify-scenarios-dialog';
import { MoveToFolderDialog } from '../../actions/move-to-folder-dialog';

interface ActionsMenuProps {
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

export function ActionsMenu({
  selectedIds,
  onSelectionChange,
}: ActionsMenuProps) {
  const [dialog, setDialog] = useState<EvaluatorActionDialog | null>(null);
  const [monitorOpen, setMonitorOpen] = useState(false);
  const closeDialog = (open: boolean) => {
    if (!open) setDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              size="sm"
              disabled={selectedIds.length === 0}
            />
          }
        >
          <PlusIcon />
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem
            onClick={() => setDialog(EvaluatorActionDialog.addTags)}
          >
            <TagIcon />
            Add Tags
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog(EvaluatorActionDialog.modify)}
          >
            <SlidersHorizontalIcon />
            Modify Scenarios
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog(EvaluatorActionDialog.duplicate)}
          >
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog(EvaluatorActionDialog.move)}
          >
            <FolderInputIcon />
            Move to Folder
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMonitorOpen(true)}>
            <ActivityIcon />
            Create monitor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddTagsDialog
        open={dialog === EvaluatorActionDialog.addTags}
        onOpenChange={closeDialog}
        evaluatorIds={selectedIds}
      />
      <ModifyScenariosDialog
        open={dialog === EvaluatorActionDialog.modify}
        onOpenChange={closeDialog}
        evaluatorIds={selectedIds}
      />
      <DuplicateEvaluatorsDialog
        open={dialog === EvaluatorActionDialog.duplicate}
        onOpenChange={closeDialog}
        evaluatorIds={selectedIds}
      />
      <MoveToFolderDialog
        open={dialog === EvaluatorActionDialog.move}
        onOpenChange={closeDialog}
        evaluatorIds={selectedIds}
        onMoved={() => onSelectionChange([])}
      />
      <CreateMonitorDialog
        open={monitorOpen}
        onOpenChange={setMonitorOpen}
        evaluatorIds={selectedIds}
      />
    </>
  );
}
