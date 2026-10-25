import { INLINE_PROPOSAL_FIELDS } from '@/server/metric-optimizer/constants/proposal-field';
import type { ProposalChange as ProposalChangeData } from '@/server/metric-optimizer/types';

import { ProposalTextLines } from './proposal-text-lines';

interface ProposalChangeProps {
  change: ProposalChangeData;
}

export function ProposalChange({ change }: ProposalChangeProps) {
  if (INLINE_PROPOSAL_FIELDS.includes(change.field)) {
    return (
      <div className="flex flex-col gap-1 text-sm">
        <span className="font-medium">{change.label}</span>
        <span className="font-mono text-xs">
          <del className="text-red-600 dark:text-red-400">{change.before}</del>
          {' → '}
          <span className="text-emerald-700 dark:text-emerald-400">
            {change.after}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{change.label}</span>
      <ProposalTextLines before={change.before} after={change.after} />
    </div>
  );
}
