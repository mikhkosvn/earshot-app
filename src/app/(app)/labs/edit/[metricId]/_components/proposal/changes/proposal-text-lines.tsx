import { cn } from '@/lib/utils';

import { DiffLineKind, lineDiff } from '../../../_utils/line-diff';

type ProposalTextLinesProps = {
  before: string;
  after: string;
};

const LINE_CLASS: Record<DiffLineKind, string> = {
  [DiffLineKind.same]: 'text-muted-foreground',
  [DiffLineKind.removed]:
    'bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300',
  [DiffLineKind.added]:
    'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
};

const LINE_PREFIX: Record<DiffLineKind, string> = {
  [DiffLineKind.same]: ' ',
  [DiffLineKind.removed]: '-',
  [DiffLineKind.added]: '+',
};

export function ProposalTextLines({ before, after }: ProposalTextLinesProps) {
  return (
    <div className="max-h-80 overflow-auto rounded-md border py-1 font-mono text-xs">
      {lineDiff(before, after).map((line, index) => (
        <div
          key={`${index}-${line.kind}`}
          className={cn('px-3 whitespace-pre-wrap', LINE_CLASS[line.kind])}
        >
          {LINE_PREFIX[line.kind]} {line.text}
        </div>
      ))}
    </div>
  );
}
