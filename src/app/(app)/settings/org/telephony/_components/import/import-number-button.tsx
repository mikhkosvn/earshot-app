'use client';

import { Button } from '@/components/ui/button';

import { useImportNumberDisabled } from '../../_hooks/use-import-number-disabled';
import { ImportNumberLabel } from './import-number-label';

export function ImportNumberButton() {
  const isDisabled = useImportNumberDisabled();

  return (
    <Button type="submit" size="sm" disabled={isDisabled}>
      <ImportNumberLabel />
    </Button>
  );
}
