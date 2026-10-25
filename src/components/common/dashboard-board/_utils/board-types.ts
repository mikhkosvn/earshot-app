import type { Dispatch } from 'react';

import type { DashboardSource } from '@/generated/prisma/enums';

import type { DashboardDraft, DraftAction } from './dashboard-draft';

export interface DashboardBoardState {
  dashboardId: number;
  source: DashboardSource;
  draft: DashboardDraft;
  dispatch: Dispatch<DraftAction>;
  openCreatePlot: () => void;
  openEditPlot: (key: string) => void;
}
