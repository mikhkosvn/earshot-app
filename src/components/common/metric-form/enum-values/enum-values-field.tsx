'use client';

import { useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';

import { FieldDescription, FieldError } from '@/components/ui/field';
import { MetricEvalType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { EnumView } from '../_constants/enum-view';
import { EnumValuesEditor } from './enum-values-editor';
import { EnumViewButton } from './enum-view-button';

export function EnumValuesField() {
  const evalType = useWatch<MetricDefinitionValues, 'evalType'>({
    name: 'evalType',
  });
  const { errors } = useFormState<MetricDefinitionValues>({
    name: 'enumValues',
  });
  const [view, setView] = useState<EnumView>(EnumView.list);

  if (evalType !== MetricEvalType.enum) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium">
            Enter the keys for the enum values
            <span className="text-destructive">*</span>
          </p>
          <FieldDescription>
            You can enter values one by one or paste JSON array
          </FieldDescription>
        </div>
        <EnumViewButton view={view} onViewChange={setView} />
      </div>
      <EnumValuesEditor view={view} />
      <FieldError errors={[errors.enumValues?.root, errors.enumValues]} />
    </div>
  );
}
