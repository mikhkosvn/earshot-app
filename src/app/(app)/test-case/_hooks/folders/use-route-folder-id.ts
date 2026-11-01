'use client';

import { useParams } from 'next/navigation';

import { parseFolderId } from '@/app/(app)/test-case/_utils/list/parse-folder-id';

export const useRouteFolderId = () => {
  const { folderId } = useParams<{ folderId?: string }>();
  return parseFolderId(folderId);
};
