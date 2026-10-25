'use client';

import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

import { useMoveEvaluatorsMutation } from '../../_hooks/mutations/evaluator-actions/use-move-evaluators-mutation';
import { FolderSelect } from '../fields/selects/folder-select';

type MoveToFolderFormProps = {
  evaluatorIds: number[];
  onMoved: () => void;
};

export function MoveToFolderForm({
  evaluatorIds,
  onMoved,
}: MoveToFolderFormProps) {
  const projectId = useCurrentProjectId();
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const moveEvaluators = useMoveEvaluatorsMutation();

  return (
    <div className="flex flex-col gap-4">
      <Field className="gap-1.5">
        <FieldLabel htmlFor="move-folder">Folder</FieldLabel>
        <FieldDescription>
          Select the target folder to move the scenario into *
        </FieldDescription>
        <FolderSelect
          id="move-folder"
          value={folderPath}
          onValueChange={setFolderPath}
        />
      </Field>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button
          type="button"
          disabled={folderPath === null || moveEvaluators.isPending}
          onClick={() => {
            if (folderPath === null) return;
            moveEvaluators.mutate(
              { projectId, evaluatorIds, folderPath },
              {
                onSuccess: (result) => {
                  if (!result.ok) return;
                  onMoved();
                },
              },
            );
          }}
        >
          Move
        </Button>
      </DialogFooter>
    </div>
  );
}
