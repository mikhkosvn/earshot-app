'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { parseFilterParam } from '../../_utils/parse-filter-param';
import { useCallListParams } from './use-call-list-params';

export const useCallListScope = () => {
  const projectId = useCurrentProjectId();
  const [{ from, to, filters, search, view }] = useCallListParams();
  return {
    projectId,
    from,
    to,
    conditions: parseFilterParam(filters),
    search,
    viewId: view,
  };
};
