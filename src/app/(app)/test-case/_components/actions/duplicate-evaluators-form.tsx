'use client';

import { Suspense, useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';

import { useDuplicateEvaluatorsMutation } from '../../_hooks/mutations/evaluator-actions/use-duplicate-evaluators-mutation';
import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';
import { createFolderParam } from '../../_utils/list/create-folder-param';
import { AgentSelect } from '../fields/selects/agent-select';
import { FolderSelect } from '../fields/selects/folder-select';
import { ProjectSelect } from '../fields/selects/project-select';

interface DuplicateEvaluatorsFormProps {
  evaluatorIds: number[];
  onDone: () => void;
}

export function DuplicateEvaluatorsForm({
  evaluatorIds,
  onDone,
}: DuplicateEvaluatorsFormProps) {
  const projectId = useCurrentProjectId();
  const [{ folder }] = useEvaluatorListParams();
  const [targetProjectId, setTargetProjectId] = useState(projectId);
  const [agentId, setAgentId] = useState<number | null>(null);
  const [folderPath, setFolderPath] = useState(createFolderParam(folder));
  const duplicateEvaluators = useDuplicateEvaluatorsMutation();

  return (
    <div className="flex flex-col gap-4">
      <Field className="gap-1.5">
        <FieldLabel htmlFor="duplicate-project">Project</FieldLabel>
        <ProjectSelect
          id="duplicate-project"
          value={targetProjectId}
          onValueChange={(next) => {
            setTargetProjectId(next);
            setAgentId(null);
            setFolderPath(null);
          }}
        />
      </Field>
      <Field className="gap-1.5">
        <FieldLabel htmlFor="duplicate-agent">Agent</FieldLabel>
        <FieldDescription>
          Optional. Leave as is to keep the current agent.
        </FieldDescription>
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          <AgentSelect
            id="duplicate-agent"
            projectId={targetProjectId}
            value={agentId}
            onValueChange={setAgentId}
          />
        </Suspense>
      </Field>
      <Field className="gap-1.5">
        <FieldLabel htmlFor="duplicate-folder">Folder</FieldLabel>
        <FieldDescription>
          Where the duplicated test cases are saved *
        </FieldDescription>
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          <FolderSelect
            id="duplicate-folder"
            projectId={targetProjectId}
            value={folderPath}
            onValueChange={setFolderPath}
          />
        </Suspense>
      </Field>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button
          type="button"
          disabled={folderPath === null || duplicateEvaluators.isPending}
          onClick={() => {
            if (folderPath === null) return;
            duplicateEvaluators.mutate(
              { projectId, evaluatorIds, targetProjectId, agentId, folderPath },
              {
                onSuccess: (result) => {
                  if (!result.ok) return;
                  onDone();
                },
              },
            );
          }}
        >
          Duplicate
        </Button>
      </DialogFooter>
    </div>
  );
}
