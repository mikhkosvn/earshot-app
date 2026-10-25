'use client';

import { useFormContext, useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useApplyProposalMutation } from '../../_hooks/mutations/use-apply-proposal-mutation';
import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import { toLabFormValues } from '../../_utils/lab-form-values';
import { ApplyProposalLabel } from './apply-proposal-label';

type ApplyProposalButtonProps = {
  sessionId: number;
};

export function ApplyProposalButton({ sessionId }: ApplyProposalButtonProps) {
  const { reset } = useFormContext<LabMetricFormInput>();
  const { disabled } = useFormState<LabMetricFormInput>();
  const applyProposal = useApplyProposalMutation();

  return (
    <Button
      type="button"
      disabled={disabled || applyProposal.isPending}
      onClick={() =>
        applyProposal.mutate(
          { sessionId },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              reset(toLabFormValues(result.data));
            },
          },
        )
      }
    >
      <ApplyProposalLabel isPending={applyProposal.isPending} />
    </Button>
  );
}
