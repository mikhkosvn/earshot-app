'use client';

import { useRouter } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { IdChip } from '@/components/common/clipboard/id-chip';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { ResultRunTypeLabel } from '@/server/results/constants/result-list';
import type { ResultListRow } from '@/server/results/types';

import { runsText } from '../../../_utils/results-list/result-format';
import { ResultAgentCell } from './cells/result-agent-cell';
import { ResultCountChip } from './cells/result-count-chip';
import { ResultCreatedAt } from './cells/result-created-at';
import { ResultScoreCell } from './cells/result-score-cell';
import { ResultStatusBadge } from './cells/result-status-badge';
import { ResultRowMenu } from './result-row-menu';

type ResultRowProps = {
  result: ResultListRow;
  selected: boolean;
  onSelectedChange: (checked: boolean) => void;
  onDeleted: (resultId: number) => void;
};

export function ResultRow({
  result,
  selected,
  onSelectedChange,
  onDeleted,
}: ResultRowProps) {
  const router = useRouter();
  const projectId = useCurrentProjectId();

  return (
    <TableRow
      data-state={selected && 'selected'}
      className="cursor-pointer"
      onClick={() =>
        router.push(UrlGenerator.result({ projectId, resultId: result.id }))
      }
    >
      <TableCell onClick={(event) => event.stopPropagation()}>
        <Checkbox
          aria-label={`Select result ${result.id}`}
          checked={selected}
          onCheckedChange={(checked) => onSelectedChange(checked)}
        />
      </TableCell>
      <TableCell onClick={(event) => event.stopPropagation()}>
        <IdChip id={result.id} />
      </TableCell>
      <TableCell className="max-w-64 truncate font-medium">
        {result.name}
      </TableCell>
      <TableCell>
        <ResultCountChip>{result.evaluatorCount}</ResultCountChip>
      </TableCell>
      <TableCell>
        <ResultCountChip>
          {runsText(result.completedRuns, result.totalRuns)}
        </ResultCountChip>
      </TableCell>
      <TableCell>
        <ResultAgentCell agent={result.agent} />
      </TableCell>
      <TableCell>
        <Badge variant="outline">{ResultRunTypeLabel[result.runType]}</Badge>
      </TableCell>
      <TableCell>
        <ResultStatusBadge status={result.status} />
      </TableCell>
      <TableCell>
        <ResultScoreCell successRate={result.successRate} />
      </TableCell>
      <TableCell>
        <ResultCreatedAt date={result.createdAt} />
      </TableCell>
      <TableCell
        className="text-right"
        onClick={(event) => event.stopPropagation()}
      >
        <ResultRowMenu result={result} onDeleted={onDeleted} />
      </TableCell>
    </TableRow>
  );
}
