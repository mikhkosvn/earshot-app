import { io } from 'next/cache';
import { redirect } from 'next/navigation';

import { ShellService } from '@/app/(app)/_service';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { legacyFolderUrl } from '@/app/(app)/test-case/_utils/list/legacy-folder-url';
import { loadLegacyFolderParams } from '@/app/(app)/test-case/_utils/list/load-evaluator-list-params';
import getQueryClient from '@/lib/query-client/get-query-client';

import { EvaluatorListData } from './evaluator-list-data';

type SearchParams = Record<string, string | string[] | undefined>;

interface AllEvaluatorsDataProps {
  searchParams: Promise<SearchParams>;
}

const legacyRedirectUrl = async (
  folderPath: string,
  searchParams: SearchParams,
) => {
  const queryClient = getQueryClient();
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  const folders = await queryClient.query({
    ...EvaluatorService.getFoldersQuery({ projectId }),
    retry: false,
  });
  return legacyFolderUrl(folders, folderPath, searchParams);
};

export async function AllEvaluatorsData({
  searchParams,
}: AllEvaluatorsDataProps) {
  await io();

  const query = await searchParams;
  const { folder } = loadLegacyFolderParams(query);
  if (folder !== null) redirect(await legacyRedirectUrl(folder, query));

  return <EvaluatorListData folderId={null} searchParams={query} />;
}
