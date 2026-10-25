'use client';

import { Button } from '@/components/ui/button';

import { useIsReevaluating } from '../../_hooks/mutations/runs/use-is-reevaluating';
import { ReevaluateSubmitLabel } from './reevaluate-submit-label';

interface ReevaluateSubmitButtonProps {
  count: number;
}

export function ReevaluateSubmitButton({ count }: ReevaluateSubmitButtonProps) {
  const isReevaluating = useIsReevaluating();

  return (
    <Button type="submit" disabled={count === 0 || isReevaluating}>
      <ReevaluateSubmitLabel />
    </Button>
  );
}
