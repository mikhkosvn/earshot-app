'use client';

import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

import { useCheckSpec } from '../_hooks/use-check-spec';
import { useCurrentSpecCheck } from '../_hooks/use-current-spec-check';
import { useIsRunningSpec } from '../_hooks/use-is-running-spec';
import type { RunFromFileForm } from '../_hooks/use-run-from-file-form';
import { RunSpecLabel } from './run-spec-label';

type RunFromFileFooterProps = {
  form: RunFromFileForm;
};

export function RunFromFileFooter({ form }: RunFromFileFooterProps) {
  const specText = useWatch({ control: form.control, name: 'specText' });
  const check = useCurrentSpecCheck(form.control);
  const { checkSpec, isChecking } = useCheckSpec(form);
  const isRunning = useIsRunningSpec();
  const hasSpec = specText.trim().length > 0;

  return (
    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        disabled={!hasSpec || isChecking}
        onClick={() => void checkSpec()}
      >
        Check spec
      </Button>
      <Button type="submit" disabled={!check?.valid || isRunning}>
        <RunSpecLabel control={form.control} />
      </Button>
    </DialogFooter>
  );
}
