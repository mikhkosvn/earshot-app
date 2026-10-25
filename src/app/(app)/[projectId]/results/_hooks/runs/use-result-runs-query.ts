'use client';

import { useResultRunsArgs } from './use-result-runs-args';
import { useRunsQuery } from './use-runs-query';

export const useResultRunsQuery = () => useRunsQuery(useResultRunsArgs());
