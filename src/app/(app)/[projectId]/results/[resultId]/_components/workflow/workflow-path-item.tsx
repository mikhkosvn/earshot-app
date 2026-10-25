import { cn } from '@/lib/utils';
import type { ResultDetail } from '@/server/results/types';

import { WorkflowPathIcon } from './workflow-path-icon';

type WorkflowPathItemProps = {
  path: ResultDetail['workflow']['paths'][number];
};

export function WorkflowPathItem({ path }: WorkflowPathItemProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 text-sm',
        !path.covered && 'text-muted-foreground',
      )}
    >
      <WorkflowPathIcon covered={path.covered} />
      {path.label}
    </li>
  );
}
