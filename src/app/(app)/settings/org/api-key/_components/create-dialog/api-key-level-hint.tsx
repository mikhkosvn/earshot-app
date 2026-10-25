'use client';

import { useWatch } from 'react-hook-form';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { FieldDescription } from '@/components/ui/field';
import { ApiKeyLevel } from '@/server/api-keys/constants/api-key-level';

import type { CreateApiKeyFormValues } from '../../_schemas/create-api-key-form-schema';

export function ApiKeyLevelHint() {
  const level = useWatch<CreateApiKeyFormValues, 'level'>({ name: 'level' });
  const project = useCurrentProject();
  if (level !== ApiKeyLevel.project) return null;

  return (
    <FieldDescription className="text-xs">
      The key opens only the project {project.name}.
    </FieldDescription>
  );
}
