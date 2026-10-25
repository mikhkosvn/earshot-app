'use client';

import { SparklesIcon } from 'lucide-react';
import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { ASSIST_BUTTON_CLASS } from '../_constants/assist-button';
import { useGenerateTrigger } from '../_hooks/trigger/use-generate-trigger';
import { useIsGeneratingTrigger } from '../_hooks/trigger/use-is-generating-trigger';
import { useHasBodyText } from '../_hooks/use-has-body-text';
import { GenerateTriggerLabel } from './generate-trigger-label';

export function GenerateTriggerButton() {
  const hasText = useHasBodyText();
  const isGenerating = useIsGeneratingTrigger();
  const { disabled } = useFormState<MetricDefinitionValues>();
  const generateTrigger = useGenerateTrigger();

  if (!hasText) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled || isGenerating}
      className={ASSIST_BUTTON_CLASS}
      onClick={generateTrigger}
    >
      <SparklesIcon />
      <GenerateTriggerLabel isGenerating={isGenerating} />
    </Button>
  );
}
