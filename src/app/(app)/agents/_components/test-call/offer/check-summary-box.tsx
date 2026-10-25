import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react';

import type { ConnectionCheck } from '@/server/agents/types';

import type { TestCallOfferKind } from '../../../_constants/test-call-offer';
import { connectionCountText } from '../../../_utils/test-call-progress';
import { CheckSummaryText } from './check-summary-text';
import { UntestableNote } from './untestable-note';

type CheckSummaryBoxProps = {
  kind: TestCallOfferKind;
  check: ConnectionCheck;
};

export function CheckSummaryBox({ kind, check }: CheckSummaryBoxProps) {
  if (!check.valid) {
    return (
      <div className="flex gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
        <p>{check.message}</p>
      </div>
    );
  }
  const count = connectionCountText(check.connections.length);

  return (
    <div className="flex gap-2 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
      <CircleCheckIcon className="mt-0.5 size-4 shrink-0" />
      <div>
        <CheckSummaryText kind={kind} count={count} />
        <UntestableNote check={check} />
      </div>
    </div>
  );
}
