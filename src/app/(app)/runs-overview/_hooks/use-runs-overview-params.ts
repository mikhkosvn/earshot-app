'use client';

import { useQueryStates } from 'nuqs';

import { runsOverviewParsers } from '../_constants/runs-overview-params';

export const useRunsOverviewParams = () => useQueryStates(runsOverviewParsers);
