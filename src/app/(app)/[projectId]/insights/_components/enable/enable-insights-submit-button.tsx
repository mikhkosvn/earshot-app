'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { SaveInsightConfigInput } from '@/server/insights/types';

import { useIsSavingInsightConfig } from '../../_hooks/mutations/use-is-saving-insight-config';

export function EnableInsightsSubmitButton() {
  const isSaving = useIsSavingInsightConfig();
  const metricId = useWatch<SaveInsightConfigInput, 'metricId'>({
    name: 'metricId',
  });

  return (
    <Button type="submit" size="sm" disabled={isSaving || metricId <= 0}>
      Enable insights
    </Button>
  );
}
