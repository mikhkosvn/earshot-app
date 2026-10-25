'use client';

import { useWatch } from 'react-hook-form';

import { useCurrentSpecCheck } from '../../_hooks/use-current-spec-check';
import type { RunFromFileForm } from '../../_hooks/use-run-from-file-form';
import { SpecErrorList } from './spec-error-list';
import { SpecPlan } from './spec-plan';

type SpecCheckStatusProps = {
  control: RunFromFileForm['control'];
};

export function SpecCheckStatus({ control }: SpecCheckStatusProps) {
  const specText = useWatch({ control, name: 'specText' });
  const check = useCurrentSpecCheck(control);

  if (!specText.trim()) {
    return (
      <p className="text-sm text-muted-foreground">
        Add a spec file to get started.
      </p>
    );
  }
  if (!check) {
    return (
      <p className="text-sm text-muted-foreground">
        Check the spec to enable Run.
      </p>
    );
  }
  if (!check.valid) return <SpecErrorList errors={check.errors} />;
  return <SpecPlan plan={check.plan} />;
}
