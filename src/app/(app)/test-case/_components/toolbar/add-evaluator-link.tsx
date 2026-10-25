'use client';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';
import { createFolderParam } from '../../_utils/create-folder-param';

export function AddEvaluatorLink() {
  const projectId = useCurrentProjectId();
  const [{ folder }] = useEvaluatorListParams();

  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={
        <Link
          href={UrlGenerator.evaluatorCreate({
            values: { project: projectId, folder: createFolderParam(folder) },
          })}
        />
      }
    >
      <PlusIcon />
      Add an Evaluator
    </Button>
  );
}
