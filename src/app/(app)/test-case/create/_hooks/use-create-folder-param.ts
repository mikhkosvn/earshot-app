'use client';

import { useQueryStates } from 'nuqs';

import { evaluatorCreateParser } from '@/lib/url-generator/parsers';
import { DEFAULT_FOLDER_PATH } from '@/server/folders/constants';

const folderParsers = { folder: evaluatorCreateParser.folder };

export const useCreateFolderParam = () => {
  const [{ folder }] = useQueryStates(folderParsers);
  return folder ?? DEFAULT_FOLDER_PATH;
};
