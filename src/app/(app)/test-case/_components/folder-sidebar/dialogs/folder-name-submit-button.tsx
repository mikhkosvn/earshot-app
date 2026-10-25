'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { FolderNameFormValues } from '@/server/folders/types';

type FolderNameSubmitButtonProps = {
  label: string;
  isPending: boolean;
};

export function FolderNameSubmitButton({
  label,
  isPending,
}: FolderNameSubmitButtonProps) {
  const { control } = useFormContext<FolderNameFormValues>();
  const name = useWatch({ control, name: 'name' });

  return (
    <Button type="submit" disabled={isPending || !name.trim()}>
      {label}
    </Button>
  );
}
