'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { QUICK_MODE_HELP } from '../../_constants/quick-mode-text';
import { useQuickMetricForm } from '../../_hooks/use-quick-metric-form';
import { GenerateMetricButton } from './generate-metric-button';
import { QuickAgentsField } from './quick-agents-field';
import { QuickDescriptionField } from './quick-description-field';

interface QuickModeCardProps {
  onSkip: () => void;
}

export function QuickModeCard({ onSkip }: QuickModeCardProps) {
  const { form, onSubmit } = useQuickMetricForm();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-3 rounded-lg border bg-background p-3"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold">Quick Mode</h2>
          <p className="text-sm text-muted-foreground">{QUICK_MODE_HELP}</p>
        </div>
        <QuickAgentsField />
        <QuickDescriptionField />
        <div className="flex items-center justify-end gap-3 border-t pt-3">
          <Button type="button" variant="ghost" onClick={onSkip}>
            Skip to Detailed Form
          </Button>
          <GenerateMetricButton />
        </div>
      </form>
    </FormProvider>
  );
}
