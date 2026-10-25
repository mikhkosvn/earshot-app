'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { LanguageLabel } from '@/server/agents/constants/language-labels';
import type { EvaluatorListRow } from '@/server/evaluators/types';

import { AgentChip } from './agent-chip';
import { AuthorDate } from './author-date';
import { EvaluatorRowActions } from './evaluator-row-actions';
import { EvaluatorRowDetails } from './evaluator-row-details';
import { PhoneNumberCell } from './phone-number-cell';
import { RowExpandButton } from './row-expand-button';
import { TagList } from './tag-list';

type EvaluatorRowProps = {
  row: EvaluatorListRow;
  isSelected: boolean;
  onSelectToggle: () => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
};

const rowState = (isSelected: boolean) => {
  if (isSelected) return 'selected';
  return undefined;
};

export function EvaluatorRow({
  row,
  isSelected,
  onSelectToggle,
  isExpanded,
  onExpandToggle,
}: EvaluatorRowProps) {
  return (
    <>
      <TableRow data-state={rowState(isSelected)}>
        <TableCell>
          <RowExpandButton isExpanded={isExpanded} onToggle={onExpandToggle} />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label={`Select evaluator ${row.id}`}
              checked={isSelected}
              onCheckedChange={onSelectToggle}
            />
            <span className="font-semibold">{row.id}</span>
          </div>
        </TableCell>
        <TableCell className="max-w-56 truncate font-medium">
          {row.name}
        </TableCell>
        <TableCell className="max-w-40 truncate">
          {row.personalityName ?? '-'}
        </TableCell>
        <TableCell>
          <AgentChip agentId={row.agentId} agentName={row.agentName} />
        </TableCell>
        <TableCell>
          <PhoneNumberCell phoneNumber={row.phoneNumber} />
        </TableCell>
        <TableCell className="max-w-40 truncate">
          {row.testProfileName ?? '--'}
        </TableCell>
        <TableCell>{LanguageLabel[row.language]}</TableCell>
        <TableCell>{row.metricCount}</TableCell>
        <TableCell>
          <TagList tags={row.tags} />
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <AuthorDate date={row.createdAt} author={row.createdByName} />
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <AuthorDate date={row.updatedAt} author={row.updatedByName} />
        </TableCell>
        <TableCell>
          <EvaluatorRowActions row={row} />
        </TableCell>
      </TableRow>
      <EvaluatorRowDetails row={row} isExpanded={isExpanded} />
    </>
  );
}
