'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import type { CreateApiKeyFormValues } from '../../_schemas/create-api-key-form-schema';
import { CreateApiKeySubmitLabel } from './create-api-key-submit-label';

interface CreateApiKeySubmitButtonProps {
  isPending: boolean;
}

export function CreateApiKeySubmitButton({
  isPending,
}: CreateApiKeySubmitButtonProps) {
  const name = useWatch<CreateApiKeyFormValues, 'name'>({ name: 'name' });

  return (
    <Button type="submit" size="sm" disabled={isPending || !name.trim()}>
      <CreateApiKeySubmitLabel isPending={isPending} />
    </Button>
  );
}
