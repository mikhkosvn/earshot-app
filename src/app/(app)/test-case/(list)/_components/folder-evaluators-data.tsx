import { io } from 'next/cache';
import { notFound } from 'next/navigation';

import { parseFolderId } from '@/app/(app)/test-case/_utils/list/parse-folder-id';

import { EvaluatorListData } from './evaluator-list-data';

interface FolderEvaluatorsDataProps {
  params: Promise<{ folderId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function FolderEvaluatorsData({
  params,
  searchParams,
}: FolderEvaluatorsDataProps) {
  await io();

  const folderId = parseFolderId((await params).folderId);
  if (folderId === null) notFound();

  return (
    <EvaluatorListData folderId={folderId} searchParams={await searchParams} />
  );
}
