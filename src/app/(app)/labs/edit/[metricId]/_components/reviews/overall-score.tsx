'use client';

import { useLab } from '../../_hooks/lab/use-lab';

export function OverallScore() {
  const { score } = useLab();

  return (
    <h2 className="ml-auto text-base font-semibold">
      Overall Score : {score.matched}/{score.total}
    </h2>
  );
}
