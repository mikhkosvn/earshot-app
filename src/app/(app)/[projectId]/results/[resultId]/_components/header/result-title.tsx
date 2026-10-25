'use client';

import { useResultDetail } from '../../_hooks/use-result-detail';

export function ResultTitle() {
  const result = useResultDetail();

  return (
    <h1 className="truncate text-lg font-semibold">
      {result.name} ({result.id})
    </h1>
  );
}
