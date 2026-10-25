'use client';

import { Controller } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';

import type { RunFromFileForm } from '../../_hooks/use-run-from-file-form';

type SpecPasteFieldProps = {
  control: RunFromFileForm['control'];
};

const SPEC_PLACEHOLDER = '{\n  "version": "1",\n  "scenarios": []\n}';

export function SpecPasteField({ control }: SpecPasteFieldProps) {
  return (
    <Controller
      control={control}
      name="specText"
      render={({ field }) => (
        <Textarea
          {...field}
          aria-label="Test suite JSON"
          placeholder={SPEC_PLACEHOLDER}
          spellCheck={false}
          className="h-56 resize-none bg-background font-mono text-xs"
        />
      )}
    />
  );
}
