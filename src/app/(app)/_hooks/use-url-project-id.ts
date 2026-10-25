'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';
import { projectParser } from '@/lib/url-generator/parsers';

export const useUrlProjectId = () => {
  const params = useParams<{ projectId?: string }>();
  const searchParams = useSearchParams();
  const queryProjectId = projectParser[PROJECT_QUERY_KEY].parseServerSide(
    searchParams.get(PROJECT_QUERY_KEY) ?? undefined,
  );
  return parseProjectId(params.projectId) ?? queryProjectId;
};
