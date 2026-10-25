'use client';

import { BotIcon } from 'lucide-react';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { useGenerateEvaluatorsForm } from '../../_hooks/generation/use-generate-evaluators-form';
import { AdditionalConfiguration } from './additional-configuration';
import { GenerateBasicFields } from './generate-basic-fields';
import { GenerateExtraFields } from './generate-extra-fields';
import { GenerateTypeFields } from './generate-type-fields';

interface GenerateEvaluatorsFormProps {
  onStarted: () => void;
}

export function GenerateEvaluatorsForm({
  onStarted,
}: GenerateEvaluatorsFormProps) {
  const [isManual, setManual] = useState(false);
  const { form, onSubmit, isPending } = useGenerateEvaluatorsForm(
    isManual,
    onStarted,
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-col">
        <div className="flex min-h-0 flex-col gap-5 overflow-y-auto p-4">
          <GenerateBasicFields />
          <GenerateTypeFields />
          <GenerateExtraFields />
          <AdditionalConfiguration
            isManual={isManual}
            onManualChange={setManual}
          />
        </div>
        <div className="border-t p-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            <BotIcon />
            Generate
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
