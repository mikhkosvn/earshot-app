'use client';

import { SparklesIcon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import type { MetricEvalType } from '@/generated/prisma/enums';
import type { MetricFormType } from '@/server/metrics/constants/definition/metric-form-type';

import { useApplyImprovedText } from '../_hooks/improve/use-apply-improved-text';
import { useDefaultAgentId } from '../_hooks/improve/use-default-agent-id';
import { useImproveMetricMutation } from '../_hooks/mutations/use-improve-metric-mutation';
import { useMetricBodyText } from '../_hooks/use-metric-body-text';
import { ImproveAgentSelect } from './improve-agent-select';
import { ImproveResult } from './improve-result';
import { ImproveRunLabel } from './improve-run-label';

type ImproveRunnerProps = {
  type: MetricFormType;
  evalType: MetricEvalType;
  onApplied: () => void;
};

export function ImproveRunner({
  type,
  evalType,
  onApplied,
}: ImproveRunnerProps) {
  const projectId = useCurrentProjectId();
  const defaultAgentId = useDefaultAgentId();
  const [pickedAgentId, setPickedAgentId] = useState<number | null>(null);
  const agentId = pickedAgentId ?? defaultAgentId;
  const text = useMetricBodyText();
  const improve = useImproveMetricMutation();
  const applyImprovedText = useApplyImprovedText();

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <div className="flex items-end gap-2">
        <ImproveAgentSelect value={agentId} onValueChange={setPickedAgentId} />
        <Button
          type="button"
          disabled={agentId === null || improve.isPending}
          onClick={() => {
            if (agentId === null) return;
            improve.mutate({ projectId, agentId, type, evalType, text });
          }}
        >
          <SparklesIcon />
          <ImproveRunLabel isPending={improve.isPending} />
        </Button>
      </div>
      <ImproveResult
        result={improve.data}
        currentText={improve.variables?.text ?? ''}
        onUse={(refinedText) => {
          applyImprovedText(refinedText);
          onApplied();
        }}
      />
    </div>
  );
}
