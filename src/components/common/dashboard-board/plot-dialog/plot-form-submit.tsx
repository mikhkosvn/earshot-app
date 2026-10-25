'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import type { PlotFormValues } from '../_schemas/plot-form-schema';

type PlotFormSubmitProps = {
  label: string;
};

export function PlotFormSubmit({ label }: PlotFormSubmitProps) {
  const field = useWatch<PlotFormValues, 'field'>({ name: 'field' });

  return (
    <Button type="submit" size="sm" disabled={field === null}>
      {label}
    </Button>
  );
}
