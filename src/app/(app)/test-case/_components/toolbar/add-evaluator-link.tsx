'use client';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useRouteFolderPath } from '../../_hooks/folders/use-route-folder-path';

export function AddEvaluatorLink() {
  const projectId = useCurrentProjectId();
  const folderPath = useRouteFolderPath();

  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={
        <Link
          href={UrlGenerator.evaluatorCreate({
            values: { project: projectId, folder: folderPath },
          })}
        />
      }
    >
      <PlusIcon />
      Add an Evaluator
    </Button>
  );
}
