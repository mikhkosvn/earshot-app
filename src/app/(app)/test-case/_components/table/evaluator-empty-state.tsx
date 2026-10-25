'use client';

import { BookCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EmptyState } from '@/components/common/empty-state';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';
import { createFolderParam } from '../../_utils/list/create-folder-param';
import { GenerateEvaluatorsDialog } from '../generate/generate-evaluators-dialog';

interface EvaluatorEmptyStateProps {
  count: number;
}

export function EvaluatorEmptyState({ count }: EvaluatorEmptyStateProps) {
  const projectId = useCurrentProjectId();
  const [{ folder }] = useEvaluatorListParams();
  const [isGenerateOpen, setGenerateOpen] = useState(false);

  if (count > 0) return null;

  return (
    <div className="border-t">
      <EmptyState
        icon={BookCheckIcon}
        title="No evaluators found"
        description="This folder is empty. You can start by adding evaluators or generating scenarios."
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          Available actions:
          <Button
            variant="secondary"
            size="sm"
            nativeButton={false}
            render={
              <Link
                href={UrlGenerator.evaluatorCreate({
                  values: {
                    project: projectId,
                    folder: createFolderParam(folder),
                  },
                })}
              />
            }
          >
            Add an Evaluator
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setGenerateOpen(true)}
          >
            Generate Scenarios
          </Button>
        </div>
      </EmptyState>
      <GenerateEvaluatorsDialog
        open={isGenerateOpen}
        onOpenChange={setGenerateOpen}
      />
    </div>
  );
}
