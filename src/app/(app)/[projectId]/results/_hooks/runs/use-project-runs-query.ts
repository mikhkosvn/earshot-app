'use client';

import { useProjectRunsArgs } from './use-project-runs-args';
import { useRunsQuery } from './use-runs-query';

export const useProjectRunsQuery = () => useRunsQuery(useProjectRunsArgs());
