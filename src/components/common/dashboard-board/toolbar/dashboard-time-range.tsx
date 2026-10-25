'use client';

import { TimeRangePicker } from '@/components/common/time-range-picker/time-range-picker';

import { DraftActionType } from '../_constants/draft-action-type';
import type { DashboardBoardState } from '../_utils/board-types';

type DashboardTimeRangeProps = {
  board: DashboardBoardState;
};

export function DashboardTimeRange({ board }: DashboardTimeRangeProps) {
  const { filters } = board.draft;

  return (
    <TimeRangePicker
      from={filters.from}
      to={filters.to}
      onApply={(range) =>
        board.dispatch({
          type: DraftActionType.setFilters,
          filters: { ...filters, ...range },
        })
      }
    />
  );
}
