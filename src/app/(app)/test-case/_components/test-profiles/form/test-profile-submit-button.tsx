'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { TestProfileView } from '@/server/test-profiles/types';

import type { TestProfileFormValues } from '../../../_schemas/test-profile-form-schema';
import { TestProfileSubmitLabel } from './test-profile-submit-label';

interface TestProfileSubmitButtonProps {
  profile: TestProfileView | null;
  isPending: boolean;
}

export function TestProfileSubmitButton({
  profile,
  isPending,
}: TestProfileSubmitButtonProps) {
  const { control } = useFormContext<TestProfileFormValues>();
  const agentId = useWatch({ control, name: 'agentId' });

  return (
    <Button type="submit" disabled={isPending || agentId === null}>
      <TestProfileSubmitLabel profile={profile} />
    </Button>
  );
}
